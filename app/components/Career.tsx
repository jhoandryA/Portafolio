"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { experience } from "@/app/lib/constants";
import Reveal from "./Reveal";

export default function Career() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const reduced = useReducedMotion();
  return (
    <section
      ref={ref}
      className="career-section content-width"
      id="experience"
      aria-labelledby="career-title"
    >
      <Reveal className="section-heading centered">
        <span className="section-index">03 / MI RECORRIDO</span>
        <h2 id="career-title">
          Cada paso, una
          <br />
          <span className="gradient-text">nueva perspectiva.</span>
        </h2>
        <p>La experiencia, la formación y las ganas de seguir aprendiendo.</p>
      </Reveal>
      <div className="career-timeline">
        <div className="timeline-track" aria-hidden="true">
          <motion.div style={{ scaleY: reduced ? 1 : progress }}>
            <span />
          </motion.div>
        </div>
        {experience.map((item, index) => (
          <Reveal
            className="career-entry"
            key={`${item.year}-${item.title}`}
            delay={index * 0.025}
          >
            <div className="career-role">
              <span className="career-period">{item.period}</span>
              <h3>{item.title}</h3>
              <span className="career-organization">{item.organization}</span>
            </div>
            <span className="career-year">{item.year}</span>
            <div className="career-description">
              <span className="timeline-node" aria-hidden="true" />
              <p>{item.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
