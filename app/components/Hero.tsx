'use client'

import { motion } from 'framer-motion'
import { slideIn, staggerContainer } from '@/app/lib/animations'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

function StarCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number
        let width = canvas.offsetWidth
        let height = canvas.offsetHeight
        canvas.width = width
        canvas.height = height

        const STAR_COUNT = 180

        interface Star {
            x: number
            y: number
            z: number
            px: number
            py: number
            size: number
            speed: number
            opacity: number
            twinkleOffset: number
        }

        const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
            z: Math.random() * width,
            px: 0,
            py: 0,
            size: Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.3 + 0.05,
            opacity: Math.random(),
            twinkleOffset: Math.random() * Math.PI * 2,
        }))

        let frame = 0

        function drawStar(x: number, y: number, size: number, opacity: number) {
            if (!ctx) return
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(200, 220, 255, ${opacity})`
            ctx.fill()
        }

        function animate() {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, width, height)

            // fondo oscuro tipo espacio
            const bg = ctx.createRadialGradient(
                width * 0.5, height * 0.4, 0,
                width * 0.5, height * 0.5, width * 0.85
            )
            bg.addColorStop(0, '#1a2235')
            bg.addColorStop(0.5, '#0f1624')
            bg.addColorStop(1, '#080d18')
            ctx.fillStyle = bg
            ctx.fillRect(0, 0, width, height)

            frame++

            stars.forEach((star) => {
                // movimiento lento flotante
                star.x += Math.sin(frame * 0.003 + star.twinkleOffset) * star.speed * 0.4
                star.y += Math.cos(frame * 0.002 + star.twinkleOffset * 1.3) * star.speed * 0.3

                // wrap bordes
                if (star.x < -width / 2) star.x = width / 2
                if (star.x > width / 2) star.x = -width / 2
                if (star.y < -height / 2) star.y = height / 2
                if (star.y > height / 2) star.y = -height / 2

                const sx = (star.x / star.z) * width + width / 2
                const sy = (star.y / star.z) * height + height / 2

                const twinkle = 0.5 + 0.5 * Math.sin(frame * 0.03 + star.twinkleOffset)
                const opacity = (0.3 + twinkle * 0.7) * (1 - star.z / width)
                const size = star.size * (1 - star.z / width) * 1.5

                drawStar(sx, sy, Math.max(0.2, size), opacity)
            })

            animationId = requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            width = canvas.offsetWidth
            height = canvas.offsetHeight
            canvas.width = width
            canvas.height = height
        }
        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
        />
    )
}

export default function Hero(): JSX.Element {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden"
        >
            {/* Fondo de estrellas animadas */}
            <StarCanvas />

            {/* Resplandor azul sutil al centro */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,138,238,0.07) 0%, transparent 70%)',
                }}
            />

            {/* Contenido */}
            <motion.div
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8 justify-between"
            >
                {/* TEXTO */}
                <motion.div
                    variants={slideIn('left', 'tween', 0.2, 1)}
                    className="md:w-1/2"
                >
                    <p className="text-sm font-mono tracking-widest text-blue-400 mb-3 uppercase">
                        Bienvenido a mi portafolio
                    </p>

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
                            className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-400 text-white font-medium transition-colors duration-200"
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
                        {/* Halo azul detrás de la imagen */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(59,138,238,0.25) 0%, transparent 70%)',
                                transform: 'scale(1.2)',
                            }}
                        />
                        <Image
                            src="/Jhoandry.png"
                            alt="Foto de perfil de Jhoandry Apaza"
                            width={350}
                            height={350}
                            className="relative rounded-full object-cover ring-2 ring-blue-500/30"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}