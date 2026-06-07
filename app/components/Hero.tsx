'use client'

import { motion } from 'framer-motion'
import { slideIn, staggerContainer } from '@/app/lib/animations'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero(): JSX.Element {
    return (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative flex flex-col justify-center min-h-[90vh] px-4 sm:px-6 lg:px-8 overflow-hidden"
            id="home"
        >
            {/* Fondo con gradiente sutil */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 justify-between py-20">

                {/* TEXTO */}
                <motion.div
                    variants={slideIn('left', 'tween', 0.2, 1)}
                    className="md:w-1/2 flex flex-col gap-6"
                >
                    {/* Badge de disponibilidad */}
                    <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400 text-sm font-medium">Disponible para proyectos</span>
                    </div>

                    {/* Título principal */}
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Hola, soy{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            Jhoandry Apaza
                        </span>
                    </h1>

                    {/* Subtítulo */}
                    <h2 className="text-xl md:text-2xl font-medium text-slate-300">
                        Desarrollador de Software & Sistemas
                    </h2>

                    {/* Descripción */}
                    <p className="text-base text-slate-400 leading-relaxed max-w-lg">
                        Desarrollo aplicaciones web modernas, escalables y funcionales,
                        enfocadas en brindar una excelente experiencia de usuario y alto
                        rendimiento. Soluciones digitales eficientes con buenas prácticas
                        de desarrollo.
                    </p>

                    {/* BOTONES con jerarquía clara */}
                    <div className="flex flex-wrap gap-3 pt-2">
                        {/* Primario */}
                        <Link
                            href="#projects"
                            className="px-6 py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/30"
                        >
                            Ver proyectos
                        </Link>

                        {/* Secundario */}
                        <a
                            href="/CV_JHOANDRY.pdf"
                            download
                            className="px-6 py-3 rounded-full font-medium border border-slate-600 text-slate-200 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/5 transition-all duration-200"
                        >
                            Descargar CV
                        </a>

                        {/* Terciario */}
                        <a
                            href="https://wa.me/51928806831"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full font-medium text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-200"
                        >
                            WhatsApp
                        </a>
                    </div>

                    {/* Stats rápidos */}
                    <div className="flex gap-8 pt-4 border-t border-slate-800">
                        <div>
                            <p className="text-2xl font-bold text-white">3+</p>
                            <p className="text-xs text-slate-500 mt-0.5">Proyectos</p>
                        </div>
                        <div className="w-px bg-slate-800" />
                        <div>
                            <p className="text-2xl font-bold text-white">8+</p>
                            <p className="text-xs text-slate-500 mt-0.5">Tecnologías</p>
                        </div>
                        <div className="w-px bg-slate-800" />
                        <div>
                            <p className="text-2xl font-bold text-white">100%</p>
                            <p className="text-xs text-slate-500 mt-0.5">Compromiso</p>
                        </div>
                    </div>
                </motion.div>

                {/* IMAGEN */}
                <motion.div
                    variants={slideIn('right', 'tween', 0.2, 1)}
                    className="flex justify-center md:justify-end"
                >
                    <div className="relative">
                        {/* Anillo exterior decorativo */}
                        <div className="absolute inset-0 rounded-full border border-blue-400/20 scale-110" />
                        <div className="absolute inset-0 rounded-full border border-blue-400/10 scale-125" />

                        {/* Glow de fondo */}
                        <div className="absolute inset-0 rounded-full bg-blue-500/15 blur-2xl scale-125" />

                        {/* Imagen */}
                        <Image
                            src="/Jhoandry.png"
                            alt="Foto de perfil de Jhoandry Apaza"
                            width={340}
                            height={340}
                            className="relative rounded-full object-cover ring-2 ring-blue-500/40"
                            priority
                        />

                        {/* Badge flotante — stack principal */}
                        <div className="absolute -bottom-2 -left-4 flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
                            <span className="text-lg">⚡</span>
                            <div>
                                <p className="text-xs font-semibold text-white leading-none">Full Stack</p>
                                <p className="text-xs text-slate-400 leading-none mt-0.5">Java · Node · React</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}