'use client'

import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '@/app/lib/animations'
import { services } from '@/app/lib/constants'

export default function Services(): JSX.Element {
    return (
        <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="py-20"
            id="services"
        >
            {/* Encabezado */}
            <motion.div variants={textVariant()} className="mb-12">
                <p className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-2">
                    Lo que ofrezco
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Servicios
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 mb-6" />
                <p className="text-slate-400 max-w-2xl leading-relaxed">
                    Soluciones digitales adaptadas a cada necesidad, con enfoque en calidad,
                    rendimiento y buenas prácticas de desarrollo.
                </p>
            </motion.div>

            {/* Grid de servicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                        className="group relative p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300 overflow-hidden"
                    >
                        {/* Glow de fondo al hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-500/0 group-hover:from-blue-600/5 group-hover:to-cyan-500/5 transition-all duration-300 rounded-2xl" />

                        {/* Icono con fondo */}
                        <div className="relative w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 group-hover:bg-blue-500/15 group-hover:border-blue-500/40 transition-all duration-300">
                            <service.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                        </div>

                        {/* Texto */}
                        <h3 className="relative text-base font-semibold mb-2 text-white">
                            {service.title}
                        </h3>
                        <p className="relative text-sm text-slate-400 leading-relaxed">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}