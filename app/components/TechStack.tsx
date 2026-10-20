import { skills } from "@/app/lib/constants";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import Reveal from "./Reveal";

const rows = [
  skills.slice(0, 6),
  skills.slice(6, 11),
  skills.slice(11, 15),
  skills.slice(15),
];
export default function TechStack() {
  return (
    <section
      className="tech-section"
      id="technologies"
      aria-labelledby="tech-title"
    >
      <div className="tech-universe" aria-hidden="true">
        <div className="tech-orbit orbit-one" />
        <div className="tech-orbit orbit-two" />
        <div className="tech-orbit orbit-three" />
        <div className="tech-globe" />
        <div className="tech-grid" />
      </div>
      <Reveal className="tech-content">
        <h2 id="tech-title">
          Mi caja de
          <br />
          <span className="gradient-text">herramientas.</span>
        </h2>
        <p>
          La tecnología adecuada para cada idea.
          <br />Y las ganas de seguir aprendiendo.
        </p>
        <div className="tech-pyramid">
          {rows.map((row, index) => (
            <div className="tech-row" key={index}>
              {row.map((skill) => (
                <div
                  className="tech-tile"
                  key={skill.name}
                  tabIndex={0}
                  aria-label={`${skill.name}, ${skill.category}`}
                >
                  <skill.icon aria-hidden="true" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Reveal>
      <div className="creative-cta">
        <Link href="/laboratorio" className="outline-button">
          Una pausa creativa <FiArrowUpRight />
        </Link>
        <a href="#contact" className="pill-button">
          Hablemos de tu idea <FiArrowUpRight />
        </a>
      </div>
    </section>
  );
}
