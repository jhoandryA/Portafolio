'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/app/lib/animations'
import Link from 'next/link'
import { smoothScrollTo } from '@/app/utils/scroll'

export default function CTA(): JSX.Element {

    const handleScroll = (id: string): void => {
        smoothScrollTo(id)
    }

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
                className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 border border-purple-800/40"
            >
                <div className="max-w-4xl mx-auto text-center">

                    {/* TÍTULO */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-200">
                        Trabajemos juntos
                    </h2>

                    {/* DESCRIPCIÓN */}
                    <p className="text-gray-400 mb-8 text-lg">
                        Estoy disponible para proyectos freelance, prácticas profesionales o colaboración en desarrollo de software, brindando soluciones eficientes y adaptadas a cada necesidad. Me motiva trabajar en proyectos que impliquen nuevos desafíos y crecimiento profesional. Si tienes una idea o proyecto en mente, no dudes en contactarme para poder ayudarte a desarrollarlo y llevarlo a un resultado sólido y de calidad.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">

                        {/* EMAIL */}
                        <Link
                            href="mailto:jhoandryoficial@gmail.com"
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition-opacity font-medium"
                        >
                            Contáctame
                        </Link>

                        {/* PROYECTOS */}
                        <Link
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault()
                                handleScroll('projects')
                            }}
                            className="px-8 py-4 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors font-medium"
                        >
                            Ver proyectos
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    )
}