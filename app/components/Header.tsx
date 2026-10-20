"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { navLinks, profile } from "@/app/lib/constants";

export default function Header() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    navLinks.forEach((item) => {
      const el = document.getElementById(item.href);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link href="/" className="wordmark" aria-label="Jhoandry Apaza, inicio">
        jhoandry<span>.</span>
        <span className="wordmark-mark">/</span>
      </Link>
      <a href={`mailto:${profile.email}`} className="header-email">
        {profile.email}
        <FiArrowUpRight />
      </a>
      <nav aria-label="Navegación principal">
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={`${pathname === "/" ? "" : "/"}#${link.href}`}
                className={`nav-link ${active === link.href && pathname === "/" ? "is-active" : ""}`}
                aria-current={
                  active === link.href && pathname === "/"
                    ? "location"
                    : undefined
                }
              >
                <span className="nav-label">
                  <span>{link.name}</span>
                  <span aria-hidden="true">{link.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <a
        className="mobile-cv"
        href={profile.cv}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir currículum en PDF"
      >
        CV <FiArrowUpRight />
      </a>
    </header>
  );
}
