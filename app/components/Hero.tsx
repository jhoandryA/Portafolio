"use client";
import Image from "next/image";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import { projects } from "@/app/lib/constants";

export default function Hero() {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid page-width">
        <div className="hero-intro">
          <h1 id="hero-title">
            JHOANDRY
            <br />
            <span>
              APAZA<span className="name-dot">.</span>
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
            src="/images/jhoandry-character.webp"
            alt="Personaje 3D de Jhoandry Apaza, basado en su fotografía"
            width={760}
            height={920}
            sizes="(max-width: 600px) 90vw, (max-width: 1100px) 400px, 460px"
            priority
          />
        </div>
        <div className="hero-role">
          <h2>
            DESARROLLADOR
            <br />
            <span className="role-rotator">
              <span>DE SOFTWARE.</span>
              <span>FULL STACK.</span>
            </span>
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
