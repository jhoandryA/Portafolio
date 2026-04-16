'use client'

import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/app/lib/animations'
import { skills } from '@/app/lib/constants'

export default function About() {
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="pb-20 pt-5"
            id="about"
        >
            <motion.div variants={textVariant()}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-200">
                    Sobre mí
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-500 mb-8"></div>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-12">
                <motion.div
                    variants={fadeIn('right', 'spring', 0.1, 1)}
                    className="md:w-1/2"
                >
                    <p className="text-gray-500 mb-6">
                        Soy estudiante de Desarrollo de Software y Sistemas, con interés en la creación
                        de aplicaciones web modernas y soluciones tecnológicas eficientes.
                    </p>
                    <p className="text-gray-500 mb-6">
                        Actualmente desarrollo proyectos utilizando tecnologías como JavaScript, React,
                        Next.js y bases de datos, fortaleciendo mis habilidades tanto en frontend como backend.
                    </p>
                    <p className="text-gray-500">
                        Me apasiona aprender constantemente, resolver problemas y construir sistemas funcionales
                        aplicando buenas prácticas de desarrollo.
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeIn('left', 'spring', 0.1, 1)}
                    className="md:w-1/2"
                >
                    <h3 className="text-xl font-semibold mb-6 text-gray-300">
                        Skills 
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        {skills.map((skill) => (
                            <div
                                key={skill.name}
                                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full flex items-center gap-2 hover:border-purple-500 transition-colors"
                            >
                                <skill.icon className="w-5 h-5 text-purple-500" />
                                <span className="text-gray-300">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}