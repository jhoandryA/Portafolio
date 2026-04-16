'use client'

import { motion } from 'framer-motion'
import { slideIn, staggerContainer } from '@/app/lib/animations'
import { socialLinks } from '@/app/lib/constants'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero(): JSX.Element {

    return (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col justify-center pt-10 md:pt-20 pb-32"
            id="home"
        >
            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">

                {/* TEXTO */}
                <motion.div
                    variants={slideIn('left', 'tween', 0.2, 1)}
                    className="md:w-1/2"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-200">
                        Hola, soy <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Jhoandry Apaza
                        </span>
                    </h1>

                    <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-gray-400">
                        Desarrollador de Software y Sistemas
                    </h2>

                    <p className="text-lg text-gray-500 mb-8">
                        Desarrollo aplicaciones web modernas, escalables y funcionales con tecnologías actuales.
                    </p>

                    {/* BOTONES */}
                    <div className="flex flex-wrap gap-4">

                        {/* PROYECTOS */}
                        <Link
                            href="#projects"
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition-opacity"
                        >
                            Ver proyectos
                        </Link>

                        {/* CV DESCARGA */}
                        <a
                            href="/CV_JHOANDRY.pdf"
                            download
                            className="px-6 py-3 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
                        >
                            Descargar CV
                        </a>

                        {/* WHATSAPP */}
                        <a
                            href="https://wa.me/51928806831"
                            target="_blank"
                            className="px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                            WhatsApp
                        </a>

                    </div>
                </motion.div>

                {/* IMAGEN */}
                <motion.div
                    variants={slideIn('right', 'tween', 0.2, 1)}
                    className="flex justify-end"
                >
                    <Image
                        src="/jhoandry.jpg"
                        alt="perfil"
                        width={350}
                        height={350}
                        className="rounded-full object-cover"
                    />
                </motion.div>

            </div>
        </motion.section>
    )
}