"use client";
import Image from "next/image";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { projects } from "@/app/lib/constants";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getSceneLoading, subscribeScene } from "@/app/lib/sceneLoading";

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {Array.from(text).map((letter, index) => (
        <span
          key={index}
          className="hero-character"
          style={{ "--char-order": offset + index } as React.CSSProperties}
        >
          {letter}
        </span>
      ))}
    </>
  );
}

function Role() {
  const reduced = useReducedMotion();
  const entered = useSyncExternalStore(
    subscribeScene,
    () => getSceneLoading().entered,
    () => false,
  );
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduced || !entered) return;
    const timer = window.setInterval(
      () => setIndex((current) => 1 - current),
      5500,
    );
    return () => clearInterval(timer);
  }, [reduced, entered]);
  return (
    <span className="role-rotator" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          initial={
            reduced ? false : { y: "24%", opacity: 0, filter: "blur(4px)" }
          }
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={
            reduced ? undefined : { y: "-24%", opacity: 0, filter: "blur(4px)" }
          }
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {index === 0 ? "DE SOFTWARE." : "FULL STACK."}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid page-width">
        <div className="hero-intro">
          <h1 id="hero-title" aria-label="Jhoandry Apaza">
            <span className="hero-name-line" aria-hidden="true">
              <Letters text="JHOANDRY" />
            </span>
            <br />
            <span>
              <span aria-hidden="true">
                <Letters text="APAZA" offset={8} />
                <span className="name-dot">.</span>
              </span>
            </span>
          </h1>
          <p>
            Ideas claras.
            <br />
            Código que las hace realidad.
          </p>
          <a href="#projects" className="text-link hero-project-link">
            Explora mi trabajo <FiArrowUpRight />
          </a>
        </div>
        <div className="hero-portrait">
          <div className="portrait-halo" />
          <Image
            src="/images/jhoandry-clay.webp"
            alt="Personaje 3D de Jhoandry Apaza, basado en su fotografía"
            width={760}
            height={920}
            sizes="(max-width: 600px) 90vw, (max-width: 1100px) 400px, 460px"
            priority
          />
        </div>
        <div className="hero-role">
          <h2 aria-label="Desarrollador de software y full stack">
            DESARROLLADOR
            <br />
            <Role />
          </h2>
          <p>
            De la primera idea a la última línea de código.
            <br className="desktop-only" /> Web, sistemas y soluciones que
            funcionan.
          </p>
          <a href="#contact" className="availability">
            <span className="status-dot" /> Disponible para nuevos proyectos{" "}
            <FiArrowUpRight />
          </a>
        </div>
      </div>
      <div className="hero-bottom page-width">
        <a href="#about" className="scroll-cue">
          <span className="scroll-icon">
            <FiArrowDown />
          </span>
          <span>UN POCO MÁS SOBRE MÍ</span>
        </a>
        <span className="hero-project-count">
          <strong>{String(projects.length).padStart(2, "0")}</strong> PROYECTOS
          CON PROPÓSITO
        </span>
      </div>
      <div className="hero-watermark" aria-hidden="true">
        IDEAS EN CÓDIGO
      </div>
    </section>
  );
}
