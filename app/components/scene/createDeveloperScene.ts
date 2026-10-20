import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

// Original procedural artwork: no third-party character or model is required.
export function createDeveloperScene(
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
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 80);
  const character = new THREE.Group();
  scene.add(character);

  const skin = new THREE.MeshStandardMaterial({
    color: "#c6977b",
    roughness: 0.65,
  });
  const skinWarm = new THREE.MeshStandardMaterial({
    color: "#ae765f",
    roughness: 0.8,
  });
  const hair = new THREE.MeshStandardMaterial({
    color: "#111318",
    roughness: 0.4,
  });
  const jacket = new THREE.MeshStandardMaterial({
    color: "#172a3c",
    roughness: 0.65,
    metalness: 0.1,
  });
  const jacketDark = new THREE.MeshStandardMaterial({
    color: "#0d1824",
    roughness: 0.7,
  });
  const shirt = new THREE.MeshStandardMaterial({
    color: "#e5edf0",
    roughness: 0.9,
  });
  const cyan = new THREE.MeshStandardMaterial({
    color: "#5adeef",
    emissive: "#137b91",
    emissiveIntensity: 0.5,
    roughness: 0.4,
    metalness: 0.35,
  });
  const darkMetal = new THREE.MeshStandardMaterial({
    color: "#1d2b37",
    metalness: 0.55,
    roughness: 0.38,
  });
  const ivory = new THREE.MeshStandardMaterial({
    color: "#d6e3e8",
    roughness: 0.55,
    metalness: 0.15,
  });
  const black = new THREE.MeshStandardMaterial({
    color: "#111018",
    roughness: 0.5,
  });
  const white = new THREE.MeshStandardMaterial({
    color: "#f5f4ef",
    roughness: 0.55,
  });
  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: "#392b26",
    roughness: 0.25,
  });

  const box = (
    w: number,
    h: number,
    d: number,
    radius: number,
    material: THREE.Material,
    parent: THREE.Object3D,
    x: number,
    y: number,
    z: number,
  ) => {
    const mesh = new THREE.Mesh(
      new RoundedBoxGeometry(w, h, d, 4, radius),
      material,
    );
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  };
  const sphere = (
    radius: number,
    material: THREE.Material,
    parent: THREE.Object3D,
    position: number[],
    scale: number[] = [1, 1, 1],
  ) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 28, 20),
      material,
    );
    mesh.position.set(position[0], position[1], position[2]);
    mesh.scale.set(scale[0], scale[1], scale[2]);
    parent.add(mesh);
    return mesh;
  };
  const capsuleBetween = (
    a: THREE.Vector3,
    b: THREE.Vector3,
    radius: number,
    material: THREE.Material,
    parent: THREE.Object3D,
  ) => {
    const delta = b.clone().sub(a);
    const mesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(
        radius,
        Math.max(0.01, delta.length() - radius * 2),
        6,
        12,
      ),
      material,
    );
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      delta.normalize(),
    );
    parent.add(mesh);
    return mesh;
  };

  // The avatar is constructed from smooth, lightweight geometry.
  const head = new THREE.Group();
  head.position.set(0, 3.24, 0);
  character.add(head);
  box(1.42, 1.65, 1.27, 0.45, skin, head, 0, 0, 0);
  sphere(0.23, skin, head, [-0.77, -0.03, 0], [0.6, 1, 0.7]);
  sphere(0.23, skin, head, [0.77, -0.03, 0], [0.6, 1, 0.7]);
  sphere(0.13, skinWarm, head, [-0.8, -0.04, 0.06], [0.45, 0.8, 0.6]);
  sphere(0.13, skinWarm, head, [0.8, -0.04, 0.06], [0.45, 0.8, 0.6]);
  sphere(0.15, skin, head, [0, -0.05, 0.69], [0.68, 1.2, 0.92]);
  sphere(0.08, skinWarm, head, [-0.07, -0.12, 0.74], [0.8, 0.32, 0.8]);
  sphere(0.08, skinWarm, head, [0.07, -0.12, 0.74], [0.8, 0.32, 0.8]);

  const eyes: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const eye = new THREE.Group();
    eye.position.set(side * 0.31, 0.13, 0.61);
    head.add(eye);
    eyes.push(eye);
    sphere(0.183, white, eye, [0, 0, 0], [1.08, 0.71, 0.48]);
    sphere(0.095, eyeMaterial, eye, [0, -0.005, 0.08], [0.85, 1, 0.36]);
    sphere(0.052, black, eye, [0, -0.005, 0.106], [0.8, 1, 0.25]);
    sphere(0.023, white, eye, [0.025, 0.025, 0.119], [1, 1, 0.3]);
    const brow = capsuleBetween(
      new THREE.Vector3(side * 0.31 - 0.18, 0.39, 0.61),
      new THREE.Vector3(side * 0.31 + 0.18, 0.4 - side * 0.025, 0.61),
      0.045,
      hair,
      head,
    );
    brow.rotation.y = side * 0.04;
  }
  const smile = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-0.19, -0.37, 0.62),
    new THREE.Vector3(0, -0.45, 0.7),
    new THREE.Vector3(0.19, -0.37, 0.62),
  );
  head.add(
    new THREE.Mesh(
      new THREE.TubeGeometry(smile, 24, 0.018, 6, false),
      skinWarm,
    ),
  );
  sphere(0.19, skin, head, [0, -0.51, 0.42], [1.7, 0.7, 0.6]);

  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.88, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.43),
    hair,
  );
  hairCap.position.set(0, 0.25, -0.035);
  hairCap.scale.set(0.92, 0.89, 0.83);
  head.add(hairCap);
  const quiff = sphere(
    0.56,
    hair,
    head,
    [-0.14, 0.72, 0.25],
    [1.35, 0.62, 0.92],
  );
  quiff.rotation.z = -0.16;
  sphere(0.39, hair, head, [0.4, 0.58, 0.15], [0.7, 0.9, 1]);
  sphere(0.3, hair, head, [-0.6, 0.31, -0.06], [0.35, 1.45, 1]);
  sphere(0.26, hair, head, [0.6, 0.24, -0.07], [0.35, 1.5, 1]);
  // Fine strands add shape to the swept hairstyle without external textures.
  const strandMaterial = new THREE.MeshStandardMaterial({
    color: "#242830",
    roughness: 0.65,
  });
  for (let i = 0; i < 5; i++) {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.6 + i * 0.15, 0.63, 0.55),
      new THREE.Vector3(-0.2 + i * 0.14, 1.04, 0.4),
      new THREE.Vector3(0.46 + i * 0.02, 0.66, 0.08),
    );
    head.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curve, 16, 0.009, 3, false),
        strandMaterial,
      ),
    );
  }

  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.23, 0.27, 0.48, 24),
    skin,
  );
  neck.position.set(0, 2.31, 0);
  character.add(neck);
  box(1.55, 1.35, 0.83, 0.28, jacket, character, 0, 1.59, -0.04);
  box(0.63, 1.1, 0.14, 0.1, shirt, character, 0, 1.69, 0.4);
  const leftLapel = box(
    0.23,
    0.95,
    0.13,
    0.05,
    jacketDark,
    character,
    -0.4,
    1.75,
    0.48,
  );
  leftLapel.rotation.z = 0.18;
  const rightLapel = box(
    0.23,
    0.95,
    0.13,
    0.05,
    jacketDark,
    character,
    0.4,
    1.75,
    0.48,
  );
  rightLapel.rotation.z = -0.18;
  box(0.12, 0.04, 0.04, 0.01, cyan, character, -0.51, 1.96, 0.56);
  for (const side of [-1, 1]) {
    capsuleBetween(
      new THREE.Vector3(side * 0.72, 1.98, 0),
      new THREE.Vector3(side * 0.95, 1.2, 0.28),
      0.24,
      jacket,
      character,
    );
    capsuleBetween(
      new THREE.Vector3(side * 0.95, 1.2, 0.28),
      new THREE.Vector3(side * 0.55, 1.04, 0.95),
      0.2,
      jacket,
      character,
    );
    sphere(
      0.19,
      skin,
      character,
      [side * 0.53, 1.04, 1.03],
      [0.85, 0.48, 1.25],
    );
    box(0.52, 0.75, 0.58, 0.16, jacketDark, character, side * 0.42, 0.52, 0.02);
    box(0.45, 0.27, 0.75, 0.12, darkMetal, character, side * 0.43, 0.02, 0.3);
  }
  // Desk, chair and laptop are revealed as the camera pulls back on scroll.
  box(3.7, 0.13, 1.75, 0.06, ivory, character, 0, 0.85, 0.65);
  for (const side of [-1, 1])
    box(0.09, 0.9, 0.9, 0.025, darkMetal, character, side * 1.5, 0.35, 0.65);
  box(1.22, 1.72, 0.27, 0.15, darkMetal, character, 0, 1.21, -0.57);
  box(1.5, 0.15, 0.94, 0.1, darkMetal, character, 0, 0.48, -0.15);
  box(1.33, 0.055, 0.91, 0.035, darkMetal, character, 0, 0.96, 0.95);
  const screen = new THREE.Group();
  screen.position.set(0, 1.45, 1.18);
  screen.rotation.x = -0.12;
  character.add(screen);
  box(1.48, 0.94, 0.065, 0.055, darkMetal, screen, 0, 0, 0);
  box(1.38, 0.84, 0.01, 0.035, black, screen, 0, 0, 0.04);
  const screenCanvas = document.createElement("canvas");
  screenCanvas.width = 768;
  screenCanvas.height = 440;
  const ctx = screenCanvas.getContext("2d")!;
  ctx.fillStyle = "#0a1620";
  ctx.fillRect(0, 0, 768, 440);
  ctx.fillStyle = "#122635";
  ctx.fillRect(0, 0, 768, 44);
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = ["#ff8e80", "#f4d07b", "#5edecc"][i];
    ctx.beginPath();
    ctx.arc(24 + i * 24, 22, 6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.font = "22px monospace";
  ctx.fillStyle = "#8196a6";
  ctx.fillText("ideas.ts", 115, 30);
  const lines = [
    ["#5de4e7", "const idea = {"],
    ["#adc5d4", '  origen: "Lima, Perú",'],
    ["#adc5d4", "  curiosidad: Infinity,"],
    ["#adc5d4", '  propósito: "crear"'],
    ["#5de4e7", "};"],
    ["#87a8ff", "construir(idea);"],
  ];
  lines.forEach(([color, text], i) => {
    ctx.fillStyle = "#41596b";
    ctx.fillText(String(i + 1).padStart(2, " "), 22, 98 + i * 45);
    ctx.fillStyle = color;
    ctx.fillText(text, 78, 98 + i * 45);
  });
  const screenTexture = new THREE.CanvasTexture(screenCanvas);
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  const codePlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.32, 0.75),
    new THREE.MeshBasicMaterial({ map: screenTexture }),
  );
  codePlane.position.z = 0.05;
  screen.add(codePlane);
  box(0.78, 0.006, 0.28, 0.02, jacketDark, character, 0, 0.992, 1.05);
  for (let row = 0; row < 3; row++)
    for (let col = 0; col < 10; col++)
      box(
        0.065,
        0.012,
        0.055,
        0.008,
        ivory,
        character,
        -0.38 + col * 0.084,
        1,
        0.75 + row * 0.09,
      );

  const hemisphere = new THREE.HemisphereLight("#d9f4ff", "#233040", 2.4);
  scene.add(hemisphere);
  const key = new THREE.DirectionalLight("#fff0dc", 3.4);
  key.position.set(-3, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight("#58d8f0", 5.5);
  rim.position.set(3, 4, -3);
  scene.add(rim);
  const fill = new THREE.DirectionalLight("#6098ff", 1.2);
  fill.position.set(-4, 1, -1);
  scene.add(fill);
  const glow = new THREE.PointLight("#38d9e9", 9, 8);
  glow.position.set(0, 2, -1.4);
  scene.add(glow);

  let pointerX = 0,
    pointerY = 0,
    frame = 0,
    stopped = false,
    inView = true;
  let smoothProgress = 0,
    lastTime = 0;
  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();
  const visibility = new IntersectionObserver((entries) => {
    inView = entries[0]?.isIntersecting ?? true;
  });
  visibility.observe(story);
  const pointer = (event: MouseEvent) => {
    pointerX = (event.clientX / window.innerWidth) * 2 - 1;
    pointerY = (event.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("mousemove", pointer, { passive: true });
  const smoothstep = (x: number) => {
    const t = THREE.MathUtils.clamp(x, 0, 1);
    return t * t * (3 - 2 * t);
  };
  const tick = (time: number) => {
    if (stopped) return;
    frame = requestAnimationFrame(tick);
    // Cap at 30 fps, and suspend rendering while the scene is offscreen.
    if (!inView || document.hidden || time - lastTime < 32) return;
    lastTime = time;
    const p = Math.max(
      0,
      -story.getBoundingClientRect().top / window.innerHeight,
    );
    smoothProgress = THREE.MathUtils.lerp(smoothProgress, p, 0.11);
    const about = smoothstep(smoothProgress);
    const desk = smoothstep(smoothProgress - 1);
    const cameraZ = THREE.MathUtils.lerp(6.1, 6.8, about) + desk * 4.2;
    const targetY = THREE.MathUtils.lerp(3.03, 1.92, desk);
    camera.position.set(0, targetY + 0.15, cameraZ);
    camera.lookAt(0, targetY, 0);
    character.position.x =
      THREE.MathUtils.lerp(0.0, -1.68, about) + desk * 1.85;
    character.position.y = Math.sin(time * 0.0008) * 0.015;
    character.rotation.y =
      THREE.MathUtils.lerp(-0.03, 0.22, about) - desk * 0.35;
    head.rotation.y = THREE.MathUtils.lerp(
      head.rotation.y,
      pointerX * 0.17 * (1 - desk),
      0.065,
    );
    head.rotation.x = THREE.MathUtils.lerp(
      head.rotation.x,
      pointerY * 0.055,
      0.065,
    );
    const blink = Math.sin(time * 0.0011) > 0.998 ? 0.1 : 1;
    eyes.forEach((eye) => {
      eye.scale.y = THREE.MathUtils.lerp(eye.scale.y, blink, 0.65);
    });
    renderer.render(scene, camera);
  };
  frame = requestAnimationFrame(tick);
  renderer.domElement.addEventListener("webglcontextlost", () =>
    story.classList.remove("has-scene"),
  );
  return () => {
    stopped = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    visibility.disconnect();
    window.removeEventListener("mousemove", pointer);
    const geometries = new Set<THREE.BufferGeometry>(),
      materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        (Array.isArray(object.material)
          ? object.material
          : [object.material]
        ).forEach((m) => materials.add(m));
      }
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    screenTexture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
