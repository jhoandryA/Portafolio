"use client";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/app/lib/hooks";

export default function DeveloperScene() {
  const host = useRef<HTMLDivElement>(null);
  const supported = useMediaQuery(
    "(min-width: 1100px) and (prefers-reduced-motion: no-preference)",
  );
  useEffect(() => {
    const container = host.current;
    const story = document.getElementById("story");
    if (!supported || !container || !story) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;
    import("./scene/createDeveloperScene")
      .then(async ({ createDeveloperScene }) => {
        if (cancelled) return;
        try {
          const destroy = await createDeveloperScene(container, story);
          if (cancelled) {
            destroy();
            return;
          }
          dispose = destroy;
          story.classList.add("has-scene");
        } catch (error) {
          console.warn("Scene initialization failed", error);
          story.classList.remove("has-scene");
        }
      })
      .catch((error) => {
        console.warn("Scene import failed", error);
        story.classList.remove("has-scene");
      });
    return () => {
      cancelled = true;
      dispose?.();
      story.classList.remove("has-scene");
    };
  }, [supported]);
  return (
    <div className="scene-track" aria-hidden="true">
      <div className="scene-sticky" ref={host} />
    </div>
  );
}
