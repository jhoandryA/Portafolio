"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiGithub,
  FiMaximize2,
} from "react-icons/fi";
import { projects } from "@/app/lib/constants";
import ImageViewer from "./ImageViewer";
import Reveal from "./Reveal";

const filters = ["Todos", "Web y e-commerce", "Backend", "Aplicaciones"];
export default function AllProjects() {
  const [filter, setFilter] = useState("Todos");
  const [image, setImage] = useState<{ src: string; name: string } | null>(
    null,
  );
  const filtered =
    filter === "Todos"
      ? projects
      : projects.filter((project) => project.group === filter);
  return (
    <>
      <main id="main-content" className="all-projects-page content-width">
        <Link href="/" className="back-link">
          <FiArrowLeft /> Volver al inicio
        </Link>
        <Reveal className="all-projects-heading">
          <span className="section-index">
            EL CÓDIGO TAMBIÉN CUENTA HISTORIAS
          </span>
          <h1>
            Cada idea,
            <br />
            <span className="gradient-text">un proyecto.</span>
          </h1>
          <p>
            Una selección de sitios web, aplicaciones y sistemas.
            <br />
            Del primer boceto a una solución que funciona.
          </p>
        </Reveal>
        <div className="project-filters" aria-label="Filtrar proyectos">
          {filters.map((item) => (
            <button
              key={item}
              className={filter === item ? "is-active" : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
              {item === "Todos" && <span>{projects.length}</span>}
            </button>
          ))}
        </div>
        <p className="filter-status" role="status">
          {filtered.length} {filtered.length === 1 ? "proyecto" : "proyectos"}
        </p>
        <div className="all-project-grid">
          {filtered.map((project) => (
            <article key={project.slug} className="all-project-card">
              <button
                className="all-project-cover"
                aria-label={`Ampliar imagen de ${project.name}`}
                onClick={() =>
                  setImage({ src: project.image, name: project.name })
                }
              >
                <Image
                  src={project.image}
                  alt={`Captura de ${project.name}`}
                  width={800}
                  height={500}
                  sizes="(max-width: 600px) 92vw, (max-width: 1100px) 46vw, 32vw"
                />
                <span className="all-project-number">
                  {String(projects.indexOf(project) + 1).padStart(2, "0")}
                </span>
                <span className="all-project-zoom">
                  <FiMaximize2 />
                </span>
              </button>
              <div className="all-project-body">
                <span className="project-category">{project.category}</span>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <div className="tool-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="all-project-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visitar sitio <FiArrowUpRight />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver código <FiGithub />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="projects-bottom-cta">
          <p>¿Creamos el siguiente?</p>
          <Link href="/#contact" className="pill-button">
            Hablemos de tu idea <FiArrowUpRight />
          </Link>
        </div>
      </main>
      <ImageViewer image={image} onClose={() => setImage(null)} />
    </>
  );
}
