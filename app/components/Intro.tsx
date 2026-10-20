"use client";
import { useEffect, useState, useSyncExternalStore } from "react";

function getPreference() {
  let seen = false;
  try {
    seen = sessionStorage.getItem("jhoandry-intro") === "seen";
  } catch {
    /* Storage is optional. */
  }
  return (
    seen ||
    window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)")
      .matches
  );
}
function subscribe(callback: () => void) {
  const media = window.matchMedia(
    "(max-width: 768px), (prefers-reduced-motion: reduce)",
  );
  media.addEventListener("change", callback);
  window.addEventListener("storage", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
  };
}
export default function Intro() {
  const skip = useSyncExternalStore(subscribe, getPreference, () => true);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("jhoandry-intro", "seen");
    } catch {
      /* Storage is optional. */
    }
  };
  useEffect(() => {
    if (skip) return;
    const start = performance.now();
    let frame = 0;
    const tick = (time: number) => {
      setProgress(Math.min(100, Math.round((time - start) / 12)));
      if (time - start < 1200) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const fade = window.setTimeout(() => setLeaving(true), 1550);
    const finish = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("jhoandry-intro", "seen");
      } catch {
        /* Storage is optional. */
      }
    }, 2200);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fade);
      clearTimeout(finish);
    };
  }, [skip]);
  if (skip || !visible) return null;
  return (
    <div
      className={`intro-screen ${leaving ? "is-leaving" : ""}`}
      aria-label="Bienvenida al portafolio"
    >
      <div className="intro-top">
        <span>
          jhoandry<span className="accent">.</span>
        </span>
        <span>
          LIMA, PERÚ <span aria-hidden="true">↗</span>
        </span>
      </div>
      <div className="intro-marquee" aria-hidden="true">
        <span>IDEAS EN CÓDIGO · DESARROLLO CON PROPÓSITO · </span>
        <span>IDEAS EN CÓDIGO · DESARROLLO CON PROPÓSITO · </span>
      </div>
      <div className="intro-pill">
        <span>{progress === 100 ? "¡BIENVENIDO!" : "PREPARANDO IDEAS"}</span>
        <span className="intro-percent" aria-hidden="true">
          {progress}
          <small>%</small>
        </span>
      </div>
      <button className="intro-skip" onClick={dismiss}>
        Saltar introducción ↗
      </button>
    </div>
  );
}
