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
            <motion.div variants={textVariant()}>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-200">
                    Servicios
                </h2>

                <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-500 mb-8"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                        className="p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
                    >
                        <service.icon className="w-8 h-8 text-purple-500 mb-4" />

                        <h3 className="text-lg font-semibold mb-2 text-gray-200">
                            {service.title}
                        </h3>

                        <p className="text-gray-500">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}