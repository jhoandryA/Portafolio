import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import {
  finishSceneLoading,
  getSceneLoading,
  reportSceneProgress,
} from "@/app/lib/sceneLoading";

// A solid GLB character modeled in Blender. Head, facial features, hands,
// clothing and workstation all have actual depth and separate animation pivots.
export async function createDeveloperScene(
  container: HTMLElement,
  story: HTMLElement,
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.domElement.setAttribute("aria-hidden", "true");
  let model: THREE.Group;
  reportSceneProgress(4);
  try {
    const gltf = await new GLTFLoader().loadAsync(
      "/models/jhoandry-clay.glb",
      (event) =>
        reportSceneProgress(
          event.total ? 5 + (event.loaded / event.total) * 80 : 12,
        ),
    );
    model = gltf.scene;
    reportSceneProgress(88);
  } catch (error) {
    renderer.dispose();
    throw error;
  }
  const scene = new THREE.Scene();
  scene.add(model);
  const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 60);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.65;
  room.dispose();
  pmrem.dispose();
  const hemisphere = new THREE.HemisphereLight("#eee8e5", "#292329", 1.25);
  scene.add(hemisphere);
  const key = new THREE.DirectionalLight("#fff2e7", 2.8);
  key.position.set(-3, 6, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight("#e6d8df", 1.1);
  fill.position.set(4, 3, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight("#eea082", 3.1);
  rim.position.set(3, 4, -3);
  scene.add(rim);

  const head = model.getObjectByName("HeadPivot");
  const eyes = [
    model.getObjectByName("EyeLeft"),
    model.getObjectByName("EyeRight"),
  ].filter((node): node is THREE.Object3D => Boolean(node));
  const brows = [
    model.getObjectByName("BrowLeft"),
    model.getObjectByName("BrowRight"),
  ].filter((node): node is THREE.Object3D => Boolean(node));
  const hands = [
    model.getObjectByName("HandLeft"),
    model.getObjectByName("HandRight"),
  ].filter((node): node is THREE.Object3D => Boolean(node));
  const workstation = model.getObjectByName("Workstation");
  const browHeights = brows.map((brow) => brow.position.y);
  const handHeights = hands.map((hand) => hand.position.y);
  const deskMaterials = new Set<THREE.Material>();
  const originalDeskMaterials = new Set<THREE.Material>();
  workstation?.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    const copy = (material: THREE.Material) => {
      originalDeskMaterials.add(material);
      const next = material.clone();
      next.transparent = true;
      next.opacity = 0;
      deskMaterials.add(next);
      return next;
    };
    object.material = Array.isArray(object.material)
      ? object.material.map(copy)
      : copy(object.material);
  });
  let entrance = getSceneLoading().entered ? 1 : 0;
  let width = 1,
    height = 1,
    aboutStart = 1,
    servicesStart = 2;
  let scrollTarget = 0,
    scrollCurrent = 0,
    pointerX = 0,
    pointerY = 0;
  let frame = 0,
    stopped = false,
    inView = true,
    lastTime = 0;
  let renderDirty = true,
    lastBlink = 1;
  const measureScroll = () => {
    scrollTarget = Math.max(0, -story.getBoundingClientRect().top);
  };
  const resize = () => {
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderDirty = true;
    aboutStart = document.getElementById("about")?.offsetTop || height;
    servicesStart =
      document.getElementById("services")?.offsetTop || height * 2;
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
    renderDirty = true;
  };
  window.addEventListener("pointermove", pointer, { passive: true });
  window.addEventListener("scroll", measureScroll, { passive: true });
  const ease = (n: number) => THREE.MathUtils.smoothstep(n, 0, 1);
  const lookAt = new THREE.Vector3();
  const update = (time: number) => {
    const dt = Math.min((time - lastTime) / 1000 || 1 / 60, 0.05);
    lastTime = time;
    if (!inView || document.hidden) return;
    scrollCurrent = THREE.MathUtils.damp(scrollCurrent, scrollTarget, 12, dt);
    const about = ease(scrollCurrent / aboutStart);
    const working = ease(
      (scrollCurrent - aboutStart) / (servicesStart - aboutStart),
    );
    entrance = THREE.MathUtils.damp(
      entrance,
      getSceneLoading().entered ? 1 : 0,
      3.5,
      dt,
    );
    const distance =
      THREE.MathUtils.lerp(6.7, 7.2, about) +
      working * 6.4 +
      (1 - entrance) * 0.6;
    const focusHeight = THREE.MathUtils.lerp(3.3, 2.2, working);
    camera.position.set(0, focusHeight + 0.09 + working * 0.5, distance);
    lookAt.set(0, focusHeight, 0);
    camera.lookAt(lookAt);
    const aspectFactor = Math.min(width / 1440, 1.25);
    model.position.x =
      -about * 1.95 * aspectFactor + working * 1.9 * aspectFactor;
    model.position.y = -(1 - entrance) * 0.16;
    model.rotation.y =
      THREE.MathUtils.lerp(-0.025, 0.25, about) -
      working * 0.78 -
      (1 - entrance) * 0.16;
    const headPitch =
      pointerY * 0.075 * (1 - working) + working * 0.11 + (1 - entrance) * 0.16;
    if (head) {
      head.rotation.y = THREE.MathUtils.damp(
        head.rotation.y,
        pointerX * 0.23 * (1 - working),
        10,
        dt,
      );
      head.rotation.x = THREE.MathUtils.damp(
        head.rotation.x,
        headPitch,
        10,
        dt,
      );
    }
    // A short, natural blink every ~4.8 seconds; each eyeball has a real iris,
    // cornea, eyelids and catchlights, instead of a face image.
    const blinkPhase = (time % 4800) / 4800;
    const blink =
      blinkPhase > 0.958
        ? 1 - Math.sin(((blinkPhase - 0.958) / 0.042) * Math.PI) * 0.95
        : 1;
    eyes.forEach((eye) => {
      eye.scale.y = Math.max(0.05, blink);
    });
    brows.forEach((brow, i) => {
      brow.position.y =
        browHeights[i] + Math.max(0, -pointerY) * 0.022 * (1 - working);
    });
    hands.forEach((hand, i) => {
      hand.position.y =
        handHeights[i] +
        Math.max(0, Math.sin(time * 0.008 + i * 2.1)) * 0.018 * working;
      hand.rotation.x = Math.sin(time * 0.008 + i * 2.1) * 0.045 * working;
    });
    const deskOpacity = ease(working / 0.22);
    deskMaterials.forEach((material) => {
      material.opacity = deskOpacity;
      material.depthWrite = deskOpacity > 0.99;
    });
    if (workstation) workstation.visible = deskOpacity > 0.005;
    const moving =
      Math.abs(scrollCurrent - scrollTarget) > 0.1 ||
      (head &&
        (Math.abs(head.rotation.y - pointerX * 0.23 * (1 - working)) > 0.0004 ||
          Math.abs(head.rotation.x - headPitch) > 0.0004));
    // Render every display frame during interaction, blinking or typing.
    // An idle portrait does not continuously consume GPU time.
    if (
      renderDirty ||
      moving ||
      (getSceneLoading().entered && entrance < 0.999) ||
      working > 0.01 ||
      blink !== lastBlink
    ) {
      renderer.render(scene, camera);
      renderDirty = false;
    }
    lastBlink = blink;
  };
  const tick = (time: number) => {
    if (stopped) return;
    update(time);
    frame = requestAnimationFrame(tick);
  };
  const lost = (event: Event) => {
    event.preventDefault();
    story.classList.remove("has-scene");
  };
  const restored = () => {
    lastTime = 0;
    renderDirty = true;
    story.classList.add("has-scene");
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  await renderer.compileAsync(scene, camera);
  reportSceneProgress(97);
  container.appendChild(renderer.domElement);
  update(performance.now());
  finishSceneLoading();
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
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        (Array.isArray(object.material)
          ? object.material
          : [object.material]
        ).forEach((material) => materials.add(material));
      }
    });
    geometries.forEach((geometry) => geometry.dispose());
    originalDeskMaterials.forEach((material) => materials.add(material));
    materials.forEach((material) => material.dispose());
    environment.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
