'use client'

import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/app/lib/animations'
import { projects } from '@/app/lib/constants'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import Image from 'next/image'

export default function Projects(): JSX.Element {
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-20"
            id="projects"
        >
            <motion.div variants={textVariant()}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-200">
                    Proyectos
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-500 mb-8"></div>

                <p className="text-gray-500 max-w-3xl mb-12">
                    Estos son algunos de los proyectos que he desarrollado a lo largo de mi formación, en los cuales he aplicado buenas prácticas de desarrollo, diseño de bases de datos y construcción de aplicaciones web modernas. En cada proyecto busco optimizar el rendimiento, mantener un código limpio y estructurado, y ofrecer soluciones funcionales, escalables y orientadas a resolver necesidades reales.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.name}
                        variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
                        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors shadow-sm"
                    >
                        {/* IMAGEN */}
                        <div className="h-48 bg-gray-700 overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.name}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* CONTENIDO */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-gray-200">
                                    {project.name}
                                </h3>

                                <div className="flex gap-3">
                                    {/* GitHub */}
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-purple-500 transition-colors"
                                    >
                                        <FiGithub className="w-5 h-5" />
                                    </a>

                                    {/* Demo solo si existe */}
                                    {project.liveUrl !== '#' && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-blue-500 transition-colors"
                                        >
                                            <FiExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-500 mb-4">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-xs bg-gray-700 rounded-full text-gray-400 border border-gray-600"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}