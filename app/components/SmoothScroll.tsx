"use client";
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 1100px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let dispose: (() => void) | undefined;
    let generation = 0;
    const update = async () => {
      const current = ++generation;
      dispose?.();
      dispose = undefined;
      if (!media.matches) return;
      const { default: Lenis } = await import("lenis");
      if (current !== generation) return;
      const lenis = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -100 },
        prevent: (element) =>
          Boolean(element.closest("dialog, [data-lenis-prevent]")),
      });
      dispose = () => lenis.destroy();
    };
    void update();
    media.addEventListener("change", update);
    return () => {
      generation++;
      media.removeEventListener("change", update);
      dispose?.();
    };
  }, []);
  return null;
}
