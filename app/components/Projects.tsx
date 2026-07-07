'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, textVariant } from '@/app/lib/animations'
import { projects } from '@/app/lib/constants'
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi'
import Image from 'next/image'
import { useState } from 'react'

export default function Projects(): JSX.Element {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-20"
            id="projects"
        >
            {/* Encabezado */}
            <motion.div variants={textVariant()} className="mb-12">
                <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-2">
                    Mi trabajo
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Proyectos
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mb-6" />
                <p className="text-slate-400 max-w-2xl leading-relaxed">
                    Sitios y sistemas que he desarrollado, aplicando buenas prácticas,
                    diseño de bases de datos y construcción de aplicaciones web modernas.
                </p>
            </motion.div>

            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.name}
                        variants={fadeIn('up', 'spring', index * 0.15, 0.75)}
                        className="group flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300"
                    >
                        {/* Mockup de navegador + imagen */}
                        <div className="relative overflow-hidden">
                            {/* Barra superior estilo navegador */}
                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 border-b border-slate-700/60">
                                <div className="flex gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                </div>
                                <div className="flex-1 min-w-0 mx-2">
                                    <div className="bg-slate-900/70 rounded-md px-2.5 py-1 text-center">
                                        <span className="text-[11px] text-slate-400 truncate block">
                                            {project.url || 'proyecto local'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Imagen */}
                            <div
                                className="relative h-44 overflow-hidden cursor-pointer bg-slate-800"
                                onClick={() => setSelectedImage(project.image)}
                            >
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    width={500}
                                    height={300}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Overlay al hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-xs text-slate-200 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Badge demo en vivo */}
                                {project.liveUrl !== '#' && (
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-500/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                        En vivo
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="flex flex-col flex-1 p-5 gap-3">
                            {/* Título + iconos */}
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="text-base font-semibold text-white leading-snug">
                                    {project.name}
                                </h3>
                                <div className="flex gap-2 flex-shrink-0">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                                            title="Ver código"
                                        >
                                            <FiGithub size={15} />
                                        </a>
                                    )}
                                    {project.liveUrl !== '#' && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all"
                                            title="Ver sitio en vivo"
                                        >
                                            <FiExternalLink size={15} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Descripción */}
                            <p className="text-sm text-slate-400 leading-relaxed flex-1">
                                {project.description}
                            </p>

                            {/* Tags de tecnologías */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal imagen */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FiX size={18} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="preview"
                                width={900}
                                height={600}
                                className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    )
}