'use client'

import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/app/lib/animations'
import { projects } from '@/app/lib/constants'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import Image from 'next/image'

export default function Projects() {
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-20"
            id="projects"
        >
            <motion.div variants={textVariant()}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-200">My Projects</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-500 mb-8"></div>
                {/* ✏️ CAMBIA AQUÍ: descripción de la sección proyectos (opcional) */}
                <p className="text-gray-500 max-w-3xl mb-12">
                    Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.
                </p>
            </motion.div>

            {/* Los proyectos se cargan desde app/lib/constants.ts → export const projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.name}
                        variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
                        className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors shadow-sm"
                    >
                        <div className="h-48 bg-gray-700 flex items-center justify-center overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.name}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-gray-200">{project.name}</h3>
                                <div className="flex gap-3">
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-purple-500 transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <FiGithub className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:text-blue-500 transition-colors"
                                        aria-label="Live Demo"
                                    >
                                        <FiExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                            <p className="text-gray-500 mb-4">{project.description}</p>
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
