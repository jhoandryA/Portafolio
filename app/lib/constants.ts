import {
    FiGithub,
    FiLinkedin,
    FiMail,
    FiLayers,
    FiDatabase
} from 'react-icons/fi'

import {
    FaJava,
    FaNodeJs,
    FaPython,
    FaPhp
} from 'react-icons/fa'

import {
    SiNextdotjs,
    SiTypescript,
    SiSpringboot
} from 'react-icons/si'

// 🔹 NAV
export const navLinks = [
    { name: 'Inicio', href: 'home' },
    { name: 'Sobre mí', href: 'about' },
    { name: 'Proyectos', href: 'projects' },
    { name: 'Servicios', href: 'services' },
    { name: 'Contacto', href: 'contact' },
];

// 🔹 REDES
export const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/jhoandryA', icon: FiGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/TU_LINKEDIN', icon: FiLinkedin },
    { name: 'Email', url: 'mailto:TU_CORREO@gmail.com', icon: FiMail },
]

// 🔹 SKILLS (SIMPLIFICADO)
export const skills = [
    // Lenguajes
    { name: 'Java', icon: FaJava },
    { name: 'PHP', icon: FaPhp },
    { name: 'Python', icon: FaPython },
    { name: 'TypeScript', icon: SiTypescript },

    // Backend
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'Spring Boot', icon: SiSpringboot },
    { name: 'Next.js', icon: SiNextdotjs },

    // Base de datos
    { name: 'SQL', icon: FiDatabase }
]

// 🔹 PROYECTOS
export const projects = [
    {
        name: 'PostulaPe - Sistema de Reclutamiento',
        image: '/images/postulape.jpeg',
        description: 'Sistema backend para la gestión de procesos de reclutamiento que permite administrar postulantes, convocatorias y etapas de selección, optimizando el flujo de contratación en recursos humanos.',
        technologies: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
        githubUrl: 'https://github.com/jhoandryA/postulape_backend',
        liveUrl: '#'
    },
    {
        name: 'Sistema Académico Universitario',
        image: '/images/universidad.jpeg',
        description: 'Backend para la gestión académica de una universidad, enfocado en un diseño relacional robusto con integridad referencial, auditoría y control de matrículas mediante reglas en base de datos.',
        technologies: ['Node.js', 'MySQL', 'API REST'],
        githubUrl: 'https://github.com/jhoandryA/universidad_backend',
        liveUrl: '#'
    },
    {
        name: 'EquilibrioS - Finanzas Personales',
        image: '/images/equilibrios.jpeg',
        description: 'Aplicación web para gestionar ingresos y gastos mensuales con visualización gráfica, control de presupuesto y almacenamiento local sin necesidad de backend.',
        technologies: ['JavaScript', 'HTML', 'CSS', 'LocalStorage'],
        githubUrl: 'https://github.com/jhoandryA/EquilibrioS',
        liveUrl: 'https://jhoandrya.github.io/EquilibrioS/'
    }
]

// 🔹 SERVICIOS
export const services = [
    {
        title: 'Desarrollo Web',
        description: 'Creación de aplicaciones web modernas y funcionales.',
        icon: FaNodeJs
    },
    {
        title: 'Diseño UI/UX',
        description: 'Interfaces intuitivas y atractivas para mejorar la experiencia del usuario.',
        icon: FiLayers
    },
    {
        title: 'Desarrollo Backend',
        description: 'Lógica de negocio, APIs y conexión con bases de datos.',
        icon: SiSpringboot
    },
    {
        title: 'Bases de Datos',
        description: 'Diseño y gestión de bases de datos relacionales.',
        icon: FiDatabase
    }
]