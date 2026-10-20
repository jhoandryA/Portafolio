"use client";
import { useState } from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiChevronDown,
} from "react-icons/fi";
import Reveal from "./Reveal";

const areas = [
  {
    title: "DESARROLLO WEB",
    subtitle: "Experiencias que conectan.",
    description:
      "Sitios web, e-commerce e interfaces intuitivas. Desarrollo y diseño UI/UX para que cada interacción tenga sentido, en cualquier pantalla.",
    tools: [
      "React",
      "Next.js",
      "WordPress",
      "WooCommerce",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
    ],
    number: "01",
  },
  {
    title: "BACKEND & SISTEMAS",
    subtitle: "La lógica que lo hace posible.",
    description:
      "APIs, sistemas de gestión y bases de datos bien diseñadas. Conecto procesos con soluciones en Java, C#, PHP, Python y Node.js.",
    tools: [
      "Java",
      "Spring Boot",
      "Node.js",
      "MySQL",
      "PostgreSQL",
      "SQL Server",
      "API REST",
      "Python",
    ],
    number: "02",
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <section
      id="services"
      className="services-section page-width"
      aria-labelledby="services-title"
    >
      <div className="services-heading">
        <span className="section-index">02 / LO QUE HAGO</span>
        <Reveal>
          <h2 id="services-title">
            IDEAS.
            <br />
            CÓDIGO.
            <br />
            <span className="accent">SOLUCIONES.</span>
          </h2>
          <p>
            Un buen resultado empieza
            <br />
            por entender lo que necesitas.
          </p>
          <FiArrowDownRight className="section-arrow" />
        </Reveal>
      </div>
      <div className="service-panels">
        {areas.map((area, index) => (
          <div
            className={`service-panel ${active === index ? "is-open" : ""}`}
            key={area.title}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) setActive(index);
            }}
          >
            <span className="panel-corner panel-corner-tl" aria-hidden="true" />
            <span className="panel-corner panel-corner-tr" aria-hidden="true" />
            <span className="panel-corner panel-corner-bl" aria-hidden="true" />
            <span className="panel-corner panel-corner-br" aria-hidden="true" />
            <button
              className="service-trigger"
              aria-expanded={active === index}
              aria-controls={`service-body-${index}`}
              onClick={() => setActive(active === index ? null : index)}
            >
              <span className="service-number">/{area.number}</span>
              <span>
                <h3>{area.title}</h3>
                <span className="service-subtitle">{area.subtitle}</span>
              </span>
              <FiChevronDown />
            </button>
            <div
              className="service-body"
              id={`service-body-${index}`}
              inert={active !== index ? true : undefined}
            >
              <div>
                <p>{area.description}</p>
                <span className="tools-label">CON QUÉ LO CONSTRUYO</span>
                <div className="tool-tags">
                  {area.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <a href="#contact" className="text-link services-contact">
          ¿Tienes algo en mente? Conversemos <FiArrowUpRight />
        </a>
      </div>
    </section>
  );
}
