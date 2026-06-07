'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/app/lib/animations'
import Link from 'next/link'
import { FiMail, FiArrowRight } from 'react-icons/fi'
import { smoothScrollTo } from '@/app/utils/scroll'

export default function CTA(): JSX.Element {
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-20"
            id="contact"
        >
            <motion.div
                variants={fadeIn('up', 'spring', 0.1, 1)}
                className="relative rounded-2xl overflow-hidden border border-blue-500/20 bg-slate-900/80"
            >
                {/* Fondos decorativos internos */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-3xl mx-auto text-center px-8 md:px-12 py-16">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-blue-300 text-sm font-medium">Disponible ahora</span>
                    </div>

                    {/* Título */}
                    <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white leading-tight">
                        Trabajemos{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            juntos
                        </span>
                    </h2>

                    {/* Descripción — más corta y directa */}
                    <p className="text-slate-400 mb-10 text-base leading-relaxed max-w-xl mx-auto">
                        Estoy disponible para proyectos freelance, prácticas profesionales
                        o colaboración en desarrollo de software. Si tienes una idea,
                        hablemos.
                    </p>

                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link
                            href="mailto:jhoandryoficial@gmail.com"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-200 hover:scale-105"
                        >
                            <FiMail size={16} />
                            Envíame un correo
                        </Link>

                        <Link
                            href="#projects"
                            onClick={(e) => { e.preventDefault(); smoothScrollTo('projects') }}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-slate-700 text-slate-200 hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 font-medium transition-all duration-200"
                        >
                            Ver proyectos
                            <FiArrowRight size={15} />
                        </Link>
                    </div>

                    {/* Info de contacto directo */}
                    <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                            <FiMail size={14} className="text-slate-600" />
                            jhoandryoficial@gmail.com
                        </span>
                        <span className="hidden sm:block w-px h-4 bg-slate-800" />
                        <a
                            href="https://wa.me/51928806831"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-500/70 hover:text-emerald-400 transition-colors"
                        >
                            WhatsApp disponible
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    )
}