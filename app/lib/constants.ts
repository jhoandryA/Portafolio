import {
    FiGithub,
    FiLinkedin,
    FiMail,
    FiLayers,
    FiSmartphone
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
    SiSpringboot,
    SiMysql,
    SiPostgresql,
    SiOracle,
    SiMicrosoftsqlserver
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

// 🔹 SKILLS (LIMPIO Y CON ICONOS)
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
    { name: 'MySQL', icon: SiMysql },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'Oracle', icon: SiOracle },
    { name: 'SQL Server', icon: SiMicrosoftsqlserver }
]

// 🔹 PROYECTOS
export const projects = [
    {
        name: 'Sistema de Gestión',
        image: '/images/proyecto-1.png',
        description: 'Sistema web para gestión de datos con operaciones CRUD y base de datos.',
        technologies: ['Java', 'SQL', 'HTML', 'CSS'],
        githubUrl: 'https://github.com/jhoandryA',
        liveUrl: '#'
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
        icon: SiMysql
    }
]