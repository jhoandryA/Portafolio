import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section
      id="about"
      className="about-section page-width"
      aria-labelledby="about-title"
    >
      <div className="about-visual">
        <span className="section-index">01 / SOBRE MÍ</span>
        <div className="about-visual-note">
          <span>La curiosidad es el inicio.</span>
          <span>Construir es el siguiente paso. ↗</span>
        </div>
      </div>
      <Reveal className="about-copy">
        <span className="eyebrow" id="about-title">
          MÁS ALLÁ DEL CÓDIGO
        </span>
        <h2>
          Me gusta entender.
          <br />
          <span className="accent">Me mueve crear.</span>
        </h2>
        <p>
          Soy <strong>Jhoandry Apaza</strong>, desarrollador de software en
          Lima, Perú. Transformo ideas en sitios web, aplicaciones y sistemas
          que resuelven necesidades reales.
        </p>
        <p>
          Conecto el diseño con la lógica: trabajo con{" "}
          <strong>React, Next.js, Java, Node.js y WordPress</strong>, desde lo
          que ves en pantalla hasta lo que ocurre detrás.
        </p>
        <p className="about-secondary">
          Me formo en Desarrollo de Sistemas en SISE. Disfruto aprender,
          trabajar en equipo y encontrar la solución que hace que todo encaje.
        </p>
        <div className="about-meta">
          <span>
            <FiMapPin /> Lima, Perú
          </span>
          <a href="/CV_JHOANDRY.pdf" target="_blank" rel="noopener noreferrer">
            Conoce mi recorrido <FiArrowUpRight />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
