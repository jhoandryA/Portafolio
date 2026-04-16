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
import { SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'

// 🔹 NAV
export const navLinks = [
    { name: 'Inicio', href: 'home' },
    { name: 'Sobre mí', href: 'about' },
    { name: 'Proyectos', href: 'projects' },
    { name: 'Servicios', href: 'services' },
    { name: 'Contacto', href: 'contact' },
];

// 🔹 REDES (CAMBIA TU LINKEDIN Y CORREO)
export const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/jhoandryA', icon: FiGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/TU_LINKEDIN', icon: FiLinkedin },
    { name: 'Email', url: 'mailto:TU_CORREO@gmail.com', icon: FiMail },
]

// 🔹 SKILLS
export const skills = [
    // Lenguajes
    { name: 'Java', icon: FiCode },
    { name: 'C#', icon: FiCode },
    { name: 'PHP', icon: FiCode },
    { name: 'Python', icon: FiCode },
    { name: 'JavaScript', icon: SiTypescript },
    { name: 'TypeScript', icon: SiTypescript },

    // Frontend
    { name: 'React', icon: FaReact },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Tailwind CSS', icon: SiTailwindcss },

    // Backend
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'Spring Boot', icon: FiCpu },

    // Base de datos
    { name: 'MySQL', icon: FiDatabase },
    { name: 'PostgreSQL', icon: FiDatabase },
    { name: 'Oracle', icon: FiDatabase },
    { name: 'SQL Server', icon: FiDatabase }
]

// 🔹 PROYECTOS (puedes agregar más luego)
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
        icon: FiCode
    },
    {
        title: 'Diseño UI/UX',
        description: 'Interfaces intuitivas y atractivas para mejorar la experiencia del usuario.',
        icon: FiLayers
    },
    {
        title: 'Desarrollo Backend',
        description: 'Lógica de negocio, APIs y conexión con bases de datos.',
        icon: FiDatabase
    },
    {
        title: 'Bases de Datos',
        description: 'Diseño y gestión de bases de datos relacionales.',
        icon: FiCpu
    }
]