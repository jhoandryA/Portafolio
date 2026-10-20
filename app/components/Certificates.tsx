import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { certificates } from "@/app/lib/constants";
import Reveal from "./Reveal";

export default function Certificates() {
  return (
    <section
      className="certificates-section content-width"
      id="certifications"
      aria-labelledby="certificates-title"
    >
      <Reveal className="certificate-heading">
        <h2 id="certificates-title">
          Mis <span className="gradient-text">certificaciones.</span>
        </h2>
        <p>Dos pasos más en mi formación como desarrollador.</p>
      </Reveal>
      <div className="certificate-grid">
        {certificates.map((certificate, index) => (
          <Reveal key={certificate.name} delay={index * 0.08}>
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="certificate-card"
              aria-label={`Ver certificado: ${certificate.name}`}
            >
              <div className="certificate-preview">
                <Image
                  src={certificate.image}
                  alt={`Certificado de ${certificate.name} a nombre de Jhoandry Apaza`}
                  width={1400}
                  height={990}
                  sizes="(max-width: 700px) 90vw, 45vw"
                />
                <span className="certificate-open" aria-hidden="true">
                  <FiArrowUpRight />
                </span>
              </div>
              <div className="certificate-details">
                <h3>{certificate.name}</h3>
                <p>
                  {certificate.issuer} · {certificate.date}
                </p>
                {"detail" in certificate && <p>{certificate.detail}</p>}
                <span className="certificate-action">
                  Ver certificado en PDF <FiArrowUpRight />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
