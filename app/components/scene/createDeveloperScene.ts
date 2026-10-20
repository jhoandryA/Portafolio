import * as THREE from "three";

// The portrait was rendered from Jhoandry's own photograph. Its baked lighting
// sits on a shallow relief, with limited parallax; this is not a scanned head.
export async function createDeveloperScene(
  container: HTMLElement,
  story: HTMLElement,
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute("aria-hidden", "true");
  let texture: THREE.Texture;
  try {
    texture = await new THREE.TextureLoader().loadAsync(
      "/images/jhoandry-avatar.webp",
    );
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2000);
  camera.position.z = 1000;
  const portrait = new THREE.Group();
  scene.add(portrait);
  const geometry = new THREE.PlaneGeometry(1, 1, 44, 52);
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i),
      y = positions.getY(i);
    positions.setZ(i, 0.055 * Math.exp(-(x * x * 14 + (y - 0.2) ** 2 * 10)));
  }
  geometry.computeVertexNormals();
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  portrait.add(mesh);

  let width = 1,
    height = 1,
    aboutStart = 1,
    servicesStart = 2;
  let heroWidth = 440,
    heroX = 0,
    heroY = 0;
  const portraitRatio = texture.image.height / texture.image.width;
  let scrollTarget = 0,
    scrollCurrent = 0,
    pointerX = 0,
    pointerY = 0;
  let frame = 0,
    stopped = false,
    inView = true,
    lastTime = 0;
  const measureScroll = () => {
    scrollTarget = Math.max(0, -story.getBoundingClientRect().top);
  };
  const resize = () => {
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    camera.left = -width / 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    aboutStart = document.getElementById("about")?.offsetTop || height;
    servicesStart =
      document.getElementById("services")?.offsetTop || height * 2;
    const poster = story
      .querySelector(".hero-portrait > img")
      ?.getBoundingClientRect();
    if (poster) {
      heroWidth = poster.width;
      heroX = poster.left + poster.width / 2 - width / 2;
      heroY = height / 2 - (poster.top + window.scrollY + poster.height / 2);
    }
    measureScroll();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resizeObserver.observe(story);
  resize();
  scrollCurrent = scrollTarget;
  const visibility = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
  });
  visibility.observe(story);
  const pointer = (event: PointerEvent) => {
    pointerX = (event.clientX / width) * 2 - 1;
    pointerY = (event.clientY / height) * 2 - 1;
  };
  window.addEventListener("pointermove", pointer, { passive: true });
  window.addEventListener("scroll", measureScroll, { passive: true });
  const ease = (n: number) => THREE.MathUtils.smoothstep(n, 0, 1);
  const update = (time: number) => {
    const dt = Math.min((time - lastTime) / 1000 || 1 / 60, 0.05);
    lastTime = time;
    if (!inView || document.hidden) return;
    // Time-based damping follows the display refresh rate, including 120 Hz.
    scrollCurrent = THREE.MathUtils.damp(scrollCurrent, scrollTarget, 14, dt);
    const about = ease(scrollCurrent / aboutStart);
    const services = ease(
      (scrollCurrent - aboutStart) / (servicesStart - aboutStart),
    );
    const baseWidth = heroWidth;
    const scale = THREE.MathUtils.lerp(1, 1.1, about) - services * 0.3;
    mesh.scale.set(
      baseWidth * scale,
      baseWidth * scale * portraitRatio,
      baseWidth * scale,
    );
    portrait.position.x =
      THREE.MathUtils.lerp(heroX, -width * 0.247, about) +
      services * width * 0.225;
    portrait.position.y = THREE.MathUtils.lerp(heroY, 0, about) - services * 20;
    portrait.rotation.y = THREE.MathUtils.damp(
      portrait.rotation.y,
      pointerX * 0.055,
      9,
      dt,
    );
    portrait.rotation.x = THREE.MathUtils.damp(
      portrait.rotation.x,
      pointerY * 0.025,
      9,
      dt,
    );
    renderer.render(scene, camera);
  };
  const tick = (time: number) => {
    if (stopped) return;
    update(time);
    frame = requestAnimationFrame(tick);
  };
  const lost = () => story.classList.remove("has-scene");
  const restored = () => {
    lastTime = 0;
    story.classList.add("has-scene");
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  container.appendChild(renderer.domElement);
  update(performance.now());
  frame = requestAnimationFrame(tick);
  return () => {
    stopped = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibility.disconnect();
    window.removeEventListener("pointermove", pointer);
    window.removeEventListener("scroll", measureScroll);
    renderer.domElement.removeEventListener("webglcontextlost", lost);
    renderer.domElement.removeEventListener("webglcontextrestored", restored);
    geometry.dispose();
    material.dispose();
    texture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
