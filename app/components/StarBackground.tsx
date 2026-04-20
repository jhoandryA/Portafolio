'use client'

import { useEffect, useRef } from 'react'

export default function StarBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationId: number

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const STAR_COUNT = 350

        interface Star {
            x: number
            y: number
            size: number
            opacity: number
            speed: number
            twinkleOffset: number
            driftX: number
            driftY: number
        }

        const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 1.6 + 0.2,
            opacity: Math.random() * 0.7 + 0.1,
            speed: Math.random() * 0.015 + 0.005,
            twinkleOffset: Math.random() * Math.PI * 2,
            driftX: (Math.random() - 0.5) * 0.12,
            driftY: (Math.random() - 0.5) * 0.08,
        }))

        let frame = 0

        function animate() {
            if (!ctx || !canvas) return
            const W = canvas.width
            const H = canvas.height

            ctx.clearRect(0, 0, W, H)

            // Fondo degradado tipo espacio profundo
            const bg = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.5, W * 0.9)
            bg.addColorStop(0, '#17213a')
            bg.addColorStop(0.45, '#0e1525')
            bg.addColorStop(1, '#070c18')
            ctx.fillStyle = bg
            ctx.fillRect(0, 0, W, H)

            // Resplandor azul sutil al centro
            const glow = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.5, W * 0.5)
            glow.addColorStop(0, 'rgba(59,138,238,0.06)')
            glow.addColorStop(1, 'transparent')
            ctx.fillStyle = glow
            ctx.fillRect(0, 0, W, H)

            frame++

            stars.forEach((star) => {
                star.x += star.driftX
                star.y += star.driftY

                // wrap
                if (star.x < 0) star.x = W
                if (star.x > W) star.x = 0
                if (star.y < 0) star.y = H
                if (star.y > H) star.y = 0

                const twinkle = 0.4 + 0.6 * Math.sin(frame * star.speed * 4 + star.twinkleOffset)
                const finalOpacity = star.opacity * twinkle

                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(210, 225, 255, ${finalOpacity})`
                ctx.fill()

                // Cruz de luz para estrellas grandes
                if (star.size > 1.3) {
                    ctx.strokeStyle = `rgba(180, 210, 255, ${finalOpacity * 0.4})`
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.moveTo(star.x - star.size * 2.5, star.y)
                    ctx.lineTo(star.x + star.size * 2.5, star.y)
                    ctx.moveTo(star.x, star.y - star.size * 2.5)
                    ctx.lineTo(star.x, star.y + star.size * 2.5)
                    ctx.stroke()
                }
            })

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                display: 'block',
            }}
        />
    )
}