"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiGithub,
  FiMaximize2,
} from "react-icons/fi";
import { featuredProjects, projects } from "@/app/lib/constants";
import { useMediaQuery } from "@/app/lib/hooks";
import ImageViewer from "./ImageViewer";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery(
    "(min-width: 901px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)",
  );
  const [travel, setTravel] = useState(0);
  const [image, setImage] = useState<{ src: string; name: string } | null>(
    null,
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 38,
    mass: 0.6,
    restDelta: 0.0001,
  });
  const x = useTransform(smoothProgress, [0, 1], [0, -travel]);
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () =>
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth + 100));
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [desktop]);
  const move = (direction: number) => {
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + window.scrollY;
      const current = Math.max(0, window.scrollY - top);
      window.scrollTo({
        top: top + Math.max(0, Math.min(travel, current + direction * 500)),
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <section
        ref={ref}
        id="projects"
        className={`projects-section ${desktop ? "is-horizontal" : ""}`}
        style={desktop ? { height: `calc(100svh + ${travel}px)` } : undefined}
        aria-labelledby="projects-title"
      >
        <div className="projects-sticky">
          <div className="projects-heading page-width">
            <div>
              <h2 id="projects-title">
                Menos promesas.
                <br />
                <span className="gradient-text">Más proyectos.</span>
              </h2>
            </div>
            <div className="project-navigation">
              <button
                onClick={() => move(-1)}
                aria-label="Ver proyectos anteriores"
              >
                <FiArrowLeft />
              </button>
              <button
                onClick={() => move(1)}
                aria-label="Ver siguientes proyectos"
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
          <div className="project-track-clip">
            <motion.div
              ref={row}
              className="project-track"
              style={desktop ? { x } : undefined}
            >
              {featuredProjects.map((project, index) => (
                <article className="featured-project" key={project.slug}>
                  <div className="project-card-heading">
                    <span className="project-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{project.name}</h3>
                      <span>{project.category}</span>
                    </div>
                    <a
                      className="project-go"
                      href={project.liveUrl || project.githubUrl || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ${project.name}${project.liveUrl ? "" : " en GitHub"}`}
                    >
                      <FiArrowUpRight />
                    </a>
                  </div>
                  <button
                    className="project-cover"
                    onClick={() =>
                      setImage({ src: project.image, name: project.name })
                    }
                    aria-label={`Ampliar imagen de ${project.name}`}
                  >
                    <div className="browser-bar">
                      <span />
                      <span />
                      <span />
                      <span className="browser-address">
                        {project.url ||
                          `${project.group.toLowerCase()} / ${project.slug}`}
                      </span>
                    </div>
                    <Image
                      src={project.image}
                      alt={`Captura de ${project.name}`}
                      width={800}
                      height={520}
                      sizes="(max-width: 600px) 90vw, 500px"
                    />
                    <span className="project-cover-overlay">
                      <FiMaximize2 />
                      <span>VER DE CERCA</span>
                    </span>
                  </button>
                  <div className="project-card-info">
                    <p>{project.description}</p>
                    <div className="project-tools">
                      <p>{project.technologies.join(" · ")}</p>
                    </div>
                    <a
                      href={project.liveUrl || project.githubUrl || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                    >
                      {project.liveUrl ? "Visitar proyecto" : "Explorar código"}{" "}
                      {project.liveUrl ? <FiArrowUpRight /> : <FiGithub />}
                    </a>
                  </div>
                </article>
              ))}
              <article className="project-more">
                <span className="project-index">
                  +
                  {String(projects.length - featuredProjects.length).padStart(
                    2,
                    "0",
                  )}
                </span>
                <h3>
                  Las ideas no
                  <br />
                  terminan aquí<span className="accent">.</span>
                </h3>
                <p>
                  Explora todos los sitios, aplicaciones y sistemas que he
                  construido.
                </p>
                <Link href="/proyectos" className="pill-button">
                  Todos los proyectos <FiArrowUpRight />
                </Link>
                <span className="more-caption">
                  07 PROYECTOS / UNA MISMA CURIOSIDAD
                </span>
              </article>
            </motion.div>
          </div>
          {desktop && (
            <div className="project-progress" aria-hidden="true">
              <motion.span style={{ scaleX: scrollYProgress }} />
            </div>
          )}
        </div>
      </section>
      <ImageViewer image={image} onClose={() => setImage(null)} />
    </>
  );
}
