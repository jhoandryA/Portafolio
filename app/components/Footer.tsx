"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import { profile, socialLinks } from "@/app/lib/constants";

export default function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("es-PE", {
          timeZone: "America/Lima",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return (
    <footer className="site-footer content-width">
      <div className="footer-top">
        <Link
          href="/#home"
          className="footer-name"
          aria-label="Volver al inicio"
        >
          JHOANDRY APAZA<span>.</span>
        </Link>
        <Link
          href="/#home"
          className="back-to-top"
          aria-label="Volver al inicio de la página"
        >
          <FiArrowUp />
        </Link>
      </div>
      <div className="footer-columns">
        <div>
          <span className="footer-label">
            DESDE LIMA, PARA CUALQUIER LUGAR.
          </span>
          <p>
            {profile.location}{" "}
            <span className="peru-flag" aria-label="Bandera de Perú" role="img">
              <i />
              <i />
              <i />
            </span>
          </p>
          <span className="footer-clock">
            {time ? `${time} PET` : "UTC −05:00"}
          </span>
        </div>
        <nav aria-label="Redes sociales" className="footer-socials">
          {socialLinks.map((link) => (
            <a
              href={link.url}
              key={link.name}
              target={link.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              {link.name === "Correo electrónico" ? "Email" : link.name}
              <FiArrowUpRight />
            </a>
          ))}
        </nav>
        <div className="footer-credit">
          <span>
            Diseñado y desarrollado
            <br />
            con curiosidad y propósito.
          </span>
          <Link href="/proyectos">
            Sigue explorando <FiArrowUpRight />
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Jhoandry Apaza</span>
        <span>IDEAS CLARAS. CÓDIGO CON PROPÓSITO.</span>
        <a href={profile.cv} target="_blank" rel="noopener noreferrer">
          Currículum <FiArrowUpRight />
        </a>
      </div>
    </footer>
  );
}
