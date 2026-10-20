"use client";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import {
  enterPortfolio,
  getSceneLoading,
  getServerLoading,
  subscribeScene,
} from "@/app/lib/sceneLoading";

const subscribeHydration = () => () => {};
function shouldSkip() {
  try {
    return (
      window.matchMedia("(max-width: 1099px), (prefers-reduced-motion: reduce)")
        .matches ||
      Boolean(window.location.hash) ||
      getSceneLoading().entered
    );
  } catch {
    return true;
  }
}
const subscribePreference = (callback: () => void) => {
  const media = window.matchMedia(
    "(max-width: 1099px), (prefers-reduced-motion: reduce)",
  );
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
export default function Intro() {
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );
  const skip = useSyncExternalStore(
    subscribePreference,
    shouldSkip,
    () => true,
  );
  const scene = useSyncExternalStore(
    subscribeScene,
    getSceneLoading,
    getServerLoading,
  );
  const [closed, setClosed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const dismiss = useCallback(() => {
    setClosed(true);
    enterPortfolio();
    document.documentElement.dataset.intro = "complete";
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    if (skip || closed) {
      enterPortfolio();
      document.documentElement.dataset.intro = "complete";
      return;
    }
    document.documentElement.dataset.intro = "playing";
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", escape);
    const min = window.setTimeout(() => setMinimumElapsed(true), 1400);
    const max = window.setTimeout(() => setTimedOut(true), 8000);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", escape);
      clearTimeout(min);
      clearTimeout(max);
    };
  }, [skip, closed, hydrated, dismiss]);
  useEffect(() => {
    if (skip || closed || !minimumElapsed || (!scene.ready && !timedOut))
      return;
    const start = window.setTimeout(() => setLeaving(true), 250);
    const finish = window.setTimeout(() => {
      setClosed(true);
      enterPortfolio();
      document.documentElement.dataset.intro = "complete";
    }, 1250);
    return () => {
      clearTimeout(start);
      clearTimeout(finish);
    };
  }, [skip, closed, minimumElapsed, scene.ready, timedOut]);
  if (!hydrated || skip || closed) return null;
  return (
    <div
      className={`intro-screen ${leaving ? "is-leaving" : ""}`}
      aria-label="Bienvenida al portafolio"
      data-lenis-prevent
    >
      <div className="intro-top">
        <span>
          jhoandry<span>.</span>
        </span>
        <div className="intro-mark" aria-hidden="true">
          <i />
          <i />
          <i />
          <b />
        </div>
      </div>
      <div className="intro-marquee" aria-hidden="true">
        <span>DESARROLLADOR · JHOANDRY APAZA · </span>
        <span>DESARROLLADOR · JHOANDRY APAZA · </span>
      </div>
      <div className="intro-pill">
        <span>
          {scene.ready
            ? "Bienvenido"
            : timedOut
              ? "Vamos a empezar"
              : "Cargando"}
        </span>
        <span
          className="intro-percent"
          role="progressbar"
          aria-label="Carga del portafolio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scene.progress)}
        >
          {Math.round(scene.progress)}
          <small>%</small>
        </span>
        <i aria-hidden="true" />
      </div>
      <span className="intro-location">Desde Lima, Perú.</span>
      <button className="intro-skip" onClick={dismiss}>
        Saltar introducción <FiArrowUpRight />
      </button>
      <div className="intro-wipe" aria-hidden="true" />
    </div>
  );
}
