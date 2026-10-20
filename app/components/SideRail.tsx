import { FiArrowDownRight, FiDownload } from "react-icons/fi";
import { profile, socialLinks } from "@/app/lib/constants";

export default function SideRail() {
  return (
    <>
      <aside className="social-rail" aria-label="Redes y contacto">
        {socialLinks.map((link) => (
          <a
            href={link.url}
            key={link.name}
            aria-label={link.name}
            title={link.name}
            target={link.url.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
          >
            <link.icon />
          </a>
        ))}
        <span />
      </aside>
      <a className="resume-rail" href={profile.cv} download>
        <span>DESCARGAR CV</span>
        <FiDownload />
      </a>
      <span className="edition-mark" aria-hidden="true">
        PORTAFOLIO — 2026 <FiArrowDownRight />
      </span>
    </>
  );
}
