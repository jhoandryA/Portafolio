import {
    FiGithub,
    FiLinkedin,
    FiMail,
    FiCode,
    FiLayers,
    FiSmartphone,
    FiDatabase,
    FiCpu
} from 'react-icons/fi'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiGraphql } from 'react-icons/si'

// ─────────────────────────────────────────────
// ✏️ SECCIÓN 1: LINKS DE NAVEGACIÓN
// Cambia los nombres si quieres traducirlos al español
// ─────────────────────────────────────────────
export const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Projects', href: 'projects' },
    { name: 'Services', href: 'services' },
    { name: 'Contact', href: 'contact' },
];

// ─────────────────────────────────────────────
// ✏️ SECCIÓN 2: TUS REDES SOCIALES
// Cambia las URLs por las tuyas
// Para agregar Twitter: { name: 'Twitter', url: 'https://twitter.com/tuusuario', icon: FiTwitter }
// (importa FiTwitter al inicio si lo necesitas)
// ─────────────────────────────────────────────
export const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/TU_USUARIO_GITHUB', icon: FiGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/TU_PERFIL/', icon: FiLinkedin },
    { name: 'Email', url: 'mailto:tuemail@gmail.com', icon: FiMail },
]

// ─────────────────────────────────────────────
// ✏️ SECCIÓN 3: TUS SKILLS / TECNOLOGÍAS
// Puedes agregar o quitar skills. Los íconos vienen de:
//   react-icons/fi → FiXxx  (Feather Icons)
//   react-icons/fa → FaXxx  (Font Awesome)
//   react-icons/si → SiXxx  (Simple Icons - marcas como Next.js, etc.)
// Busca íconos en: https://react-icons.github.io/react-icons
// ─────────────────────────────────────────────
export const skills = [
    { name: 'React', icon: FaReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'GraphQL', icon: SiGraphql },
]

// ─────────────────────────────────────────────
// ✏️ SECCIÓN 4: TUS PROYECTOS ← LA MÁS IMPORTANTE
//
// Para cada proyecto:
//   name       → nombre del proyecto
//   image      → ruta de la imagen en /public/images/tu-imagen.png
//   description → descripción corta (1-2 oraciones)
//   technologies → array de tecnologías usadas
//   githubUrl  → URL de tu repositorio en GitHub (se muestra el ícono 🔗)
//   liveUrl    → URL del sitio desplegado (se muestra el ícono ↗)
//
// ¿Cómo agregar la imagen del proyecto?
//   1. Saca un screenshot del proyecto
//   2. Guárdalo en /public/images/nombre-proyecto.png
//   3. Pon '/images/nombre-proyecto.png' en el campo image
// ─────────────────────────────────────────────
export const projects = [
    {
        name: 'Nombre de tu Proyecto 1',
        image: '/images/proyecto-1.png',
        description: 'Descripción corta de lo que hace este proyecto y qué problema resuelve.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com/TU_USUARIO/nombre-repo-1',
        liveUrl: 'https://tu-proyecto-1.vercel.app/'
    },
    {
        name: 'Nombre de tu Proyecto 2',
        image: '/images/proyecto-2.png',
        description: 'Descripción corta de lo que hace este proyecto y qué problema resuelve.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        githubUrl: 'https://github.com/TU_USUARIO/nombre-repo-2',
        liveUrl: 'https://tu-proyecto-2.vercel.app/'
    },
    {
        name: 'Nombre de tu Proyecto 3',
        image: '/images/proyecto-3.png',
        description: 'Descripción corta de lo que hace este proyecto y qué problema resuelve.',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        githubUrl: 'https://github.com/TU_USUARIO/nombre-repo-3',
        liveUrl: 'https://tu-proyecto-3.vercel.app/'
    }
]

// ─────────────────────────────────────────────
// ✏️ SECCIÓN 5: SERVICIOS QUE OFRECES
// Cambia los títulos y descripciones según lo que hagas
// Íconos disponibles: FiCode, FiLayers, FiSmartphone, FiDatabase, FiCpu, FiGlobe, etc.
// ─────────────────────────────────────────────
export const services = [
    {
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies for optimal performance.',
        icon: FiCode
    },
    {
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces that enhance user experience and drive engagement.',
        icon: FiLayers
    },
    {
        title: 'Mobile Development',
        description: 'Cross-platform mobile apps that work seamlessly on iOS and Android devices.',
        icon: FiSmartphone
    },
    {
        title: 'Backend Development',
        description: 'Robust server-side solutions with scalable architecture and secure APIs.',
        icon: FiDatabase
    },
    {
        title: 'DevOps',
        description: 'CI/CD pipelines, cloud infrastructure, and deployment automation for your projects.',
        icon: FiCpu
    }
]
