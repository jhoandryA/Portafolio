import {
  FiCode,
  FiDatabase,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMonitor,
  FiServer,
} from "react-icons/fi";
import {
  FaCss3Alt,
  FaHtml5,
  FaJava,
  FaJs,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import {
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";

export const profile = {
  name: "Jhoandry Apaza",
  fullName: "Jhoandry Apaza Sandagorda",
  role: "Desarrollador de software",
  email: "jhoandryoficial@gmail.com",
  location: "Lima, Perú",
  whatsapp: "https://wa.me/51928806831",
  cv: "/CV_JHOANDRY.pdf",
  github: "https://github.com/jhoandryA",
  linkedin: "https://www.linkedin.com/in/jhoandry-apaza-sandagorda-61b852357/",
};

export const navLinks = [
  { name: "Sobre mí", href: "about" },
  { name: "Proyectos", href: "projects" },
  { name: "Contacto", href: "contact" },
];

export const socialLinks = [
  { name: "GitHub", url: profile.github, icon: FiGithub },
  { name: "LinkedIn", url: profile.linkedin, icon: FiLinkedin },
  { name: "Correo electrónico", url: `mailto:${profile.email}`, icon: FiMail },
];

export const skills = [
  { name: "Java", icon: FaJava, category: "Lenguajes" },
  { name: "JavaScript", icon: FaJs, category: "Lenguajes" },
  { name: "TypeScript", icon: SiTypescript, category: "Lenguajes" },
  { name: "Python", icon: FaPython, category: "Lenguajes" },
  { name: "PHP", icon: FaPhp, category: "Lenguajes" },
  { name: "C#", icon: FiCode, category: "Lenguajes" },
  { name: "React", icon: FaReact, category: "Desarrollo web" },
  { name: "Next.js", icon: SiNextdotjs, category: "Desarrollo web" },
  { name: "HTML", icon: FaHtml5, category: "Desarrollo web" },
  { name: "CSS", icon: FaCss3Alt, category: "Desarrollo web" },
  { name: "WordPress", icon: FaWordpress, category: "Desarrollo web" },
  { name: "Node.js", icon: FaNodeJs, category: "Backend y datos" },
  { name: "Spring Boot", icon: SiSpringboot, category: "Backend y datos" },
  { name: "MySQL", icon: SiMysql, category: "Backend y datos" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Backend y datos" },
  { name: "SQL Server", icon: FiDatabase, category: "Backend y datos" },
  { name: "Git", icon: FiCode, category: "Herramientas" },
  { name: "GitHub", icon: FiGithub, category: "Herramientas" },
];

export const projects = [
  {
    slug: "fortexman360",
    name: "FortexMan360",
    category: "Desarrollo web",
    group: "Web y e-commerce",
    image: "/images/fortexman360.png",
    url: "fortexman360.com.pe",
    description:
      "Sitio web para una empresa de seguridad privada. Desarrollé sus secciones principales y una experiencia adaptable a todos los dispositivos.",
    technologies: ["WordPress", "JavaScript", "CSS"],
    githubUrl: null,
    liveUrl: "https://fortexman360.com.pe/",
  },
  {
    slug: "shiyan",
    name: "Shiyan Ryans",
    category: "E-commerce",
    group: "Web y e-commerce",
    image: "/images/shiyan.png",
    url: "shiyan.pe",
    description:
      "E-commerce de repuestos importados que desarrollé de principio a fin: catálogo por marca y categoría, y un flujo de cotización conectado a WhatsApp.",
    technologies: ["WordPress", "WooCommerce", "JavaScript", "CSS"],
    githubUrl: null,
    liveUrl: "https://shiyan.pe/",
  },
  {
    slug: "cody-motors",
    name: "Cody Motors",
    category: "E-commerce",
    group: "Web y e-commerce",
    image: "/images/codymotors.png",
    url: "codymotors.pe",
    description:
      "Página principal para una tienda de repuestos automotrices, con categorías destacadas, presentación de productos y secciones de confianza.",
    technologies: ["WordPress", "WooCommerce", "JavaScript", "CSS"],
    githubUrl: null,
    liveUrl: "https://codymotors.pe/",
  },
  {
    slug: "foccadi",
    name: "FOCCADI",
    category: "Sitio institucional",
    group: "Web y e-commerce",
    image: "/images/foccadi.png",
    url: "foccadi.consigueventas.com",
    description:
      "Colaboré en el sitio de esta ONGD dedicada al cuidado del Alzheimer: servicios, testimonios, preguntas frecuentes y formulario de contacto.",
    technologies: ["WordPress", "JavaScript", "CSS"],
    githubUrl: null,
    liveUrl: "https://foccadi.consigueventas.com/",
  },
  {
    slug: "postulape",
    name: "PostulaPe",
    category: "Sistema de reclutamiento",
    group: "Backend",
    image: "/images/postulape.jpg",
    url: null,
    description:
      "Backend para administrar postulantes, convocatorias y etapas de selección. Un flujo organizado para la gestión de procesos de reclutamiento.",
    technologies: ["Java", "Spring Boot", "MySQL", "API REST"],
    githubUrl: "https://github.com/jhoandryA/postulape_backend",
    liveUrl: null,
  },
  {
    slug: "sistema-academico",
    name: "Sistema académico",
    category: "Gestión universitaria",
    group: "Backend",
    image: "/images/universidad.jpg",
    url: null,
    description:
      "Backend de gestión académica con un modelo relacional robusto, integridad referencial, auditoría y reglas para el control de matrículas.",
    technologies: ["Node.js", "MySQL", "API REST"],
    githubUrl: "https://github.com/jhoandryA/universidad_backend",
    liveUrl: null,
  },
  {
    slug: "equilibrios",
    name: "EquilibrioS",
    category: "Finanzas personales",
    group: "Aplicaciones",
    image: "/images/equilibrios.jpg",
    url: "jhoandrya.github.io/EquilibrioS",
    description:
      "Aplicación para organizar ingresos, gastos y presupuestos mensuales, con visualización gráfica y almacenamiento local en el navegador.",
    technologies: ["JavaScript", "HTML", "CSS", "LocalStorage"],
    githubUrl: "https://github.com/jhoandryA/EquilibrioS",
    liveUrl: "https://jhoandrya.github.io/EquilibrioS/",
  },
];
export type Project = (typeof projects)[number];
export const featuredProjects = [
  projects[0],
  projects[1],
  projects[4],
  projects[5],
  projects[6],
];

export const certificates = [
  {
    name: "WordPress para Desarrollo Web",
    issuer: "Consigue Ventas",
    date: "Junio 2026",
    pdfUrl: "/certificates/CertificadoWordpress.pdf",
    image: "/images/certificates/wordpress.webp",
  },
  {
    name: "Fundamentos del Desarrollo Web Moderno",
    detail: "HTML, CSS y JavaScript",
    issuer: "Consigue Ventas",
    date: "Marzo 2026",
    pdfUrl: "/certificates/certificado-fundamentos-web.pdf",
    image: "/images/certificates/fundamentos-web.webp",
  },
];

export const services = [
  {
    title: "Desarrollo web",
    description:
      "Aplicaciones y sitios modernos, rápidos y adaptables. Desde la primera pantalla hasta una experiencia lista para tus usuarios.",
    icon: FiMonitor,
  },
  {
    title: "Diseño UI/UX",
    description:
      "Interfaces claras, intuitivas y consistentes que ponen a las personas en el centro de cada decisión.",
    icon: FiLayers,
  },
  {
    title: "Desarrollo backend",
    description:
      "APIs, lógica de negocio y aplicaciones con Spring Boot y Node.js, pensadas para crecer.",
    icon: FiServer,
  },
  {
    title: "Bases de datos",
    description:
      "Modelado relacional, consultas y gestión de datos con MySQL, PostgreSQL y SQL Server.",
    icon: FiDatabase,
  },
  {
    title: "Sistemas de gestión",
    description:
      "Soluciones para ventas, reclutamiento y gestión académica, conectando procesos y personas.",
    icon: FiCode,
  },
  {
    title: "Programación multilenguaje",
    description:
      "Java, C#, PHP, Python, JavaScript y TypeScript al servicio del problema que necesitamos resolver.",
    icon: FiCode,
  },
];
