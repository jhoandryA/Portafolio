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
            className="relative flex flex-col justify-center min-h-[90vh] px-4 sm:px-6 lg:px-8"
            id="home"
        >
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-8 justify-between py-20">

                {/* TEXTO */}
                <motion.div
                    variants={slideIn('left', 'tween', 0.2, 1)}
                    className="md:w-1/2"
                >

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                        Hola, soy{' '}
                        <span className="text-blue-400">
                            Jhoandry Apaza
                        </span>
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-300">
                        Desarrollo de software y sistemas
                    </h2>

                    <p className="text-base text-slate-400 mb-8 leading-relaxed max-w-lg">
                        Desarrollo aplicaciones web modernas, escalables y funcionales,
                        enfocadas en brindar una excelente experiencia de usuario y un
                        alto rendimiento. Soluciones digitales eficientes, seguras y
                        adaptables con buenas prácticas de desarrollo.
                    </p>

                    {/* BOTONES */}
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="#projects"
                            className="px-6 py-3 rounded-full font-medium text-white transition-all duration-200 hover:scale-105"
                            style={{
                                background: '#3b8aee',
                                boxShadow: '0 0 20px rgba(59,138,238,0.4)',
                            }}
                        >
                            Ver proyectos
                        </Link>

                        <a
                            href="/CV_JHOANDRY.pdf"
                            download
                            className="px-6 py-3 rounded-full border border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 transition-colors duration-200"
                        >
                            Descargar CV
                        </a>

                        <a
                            href="https://wa.me/51928806831"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition-colors duration-200"
                        >
                            WhatsApp
                        </a>
                    </div>
                </motion.div>

                {/* IMAGEN */}
                <motion.div
                    variants={slideIn('right', 'tween', 0.2, 1)}
                    className="flex justify-center md:justify-end"
                >
                    <div className="relative">
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(59,138,238,0.2) 0%, transparent 70%)',
                                transform: 'scale(1.3)',
                            }}
                        />
                        <Image
                            src="/Jhoandry.png"
                            alt="Foto de perfil de Jhoandry Apaza"
                            width={350}
                            height={350}
                            className="relative rounded-full object-cover"
                            style={{ border: '2px solid rgba(59,138,238,0.3)' }}
                        />
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}