import { FiArrowUpRight, FiAward } from "react-icons/fi";
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
        <span className="section-index">
          06 / APRENDER ES PARTE DEL PROCESO
        </span>
        <h2 id="certificates-title">
          Siempre hay
          <br />
          <span className="gradient-text">algo por descubrir.</span>
        </h2>
        <p>Formación que se convierte en mejores soluciones.</p>
      </Reveal>
      <div className="certificate-list">
        {certificates.map((certificate, index) => (
          <Reveal key={certificate.name} delay={index * 0.08}>
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="certificate-row"
            >
              <div className="certificate-seal">
                <FiAward />
                <span>0{index + 1}</span>
              </div>
              <div className="certificate-details">
                <span>
                  {certificate.issuer}{" "}
                  <span className="certificate-date">/ {certificate.date}</span>
                </span>
                <h3>{certificate.name}</h3>
                {"detail" in certificate && <p>{certificate.detail}</p>}
              </div>
              <span className="certificate-action">
                VER CERTIFICADO <FiArrowUpRight />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
