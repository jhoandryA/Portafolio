"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !window.matchMedia(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const cursor = ref.current;
    if (!cursor) return;
    let x = 0,
      y = 0,
      tx = 0,
      ty = 0,
      frame = 0;
    const move = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      cursor.classList.add("is-visible");
      cursor.classList.toggle(
        "is-link",
        !!(event.target as HTMLElement).closest("a, button, input, textarea"),
      );
    };
    const leave = () => cursor.classList.remove("is-visible");
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    tick();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);
  return (
    <div ref={ref} className="cursor-aura" aria-hidden="true">
      <span />
    </div>
  );
}
