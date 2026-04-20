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
            const parent = canvas.parentElement
            if (!parent) return
            canvas.width = parent.clientWidth
            canvas.height = parent.clientHeight
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

            const bg = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.5, W * 0.9)
            bg.addColorStop(0, '#17213a')
            bg.addColorStop(0.45, '#0e1525')
            bg.addColorStop(1, '#070c18')
            ctx.fillStyle = bg
            ctx.fillRect(0, 0, W, H)

            frame++

            stars.forEach((star) => {
                star.x += star.driftX
                star.y += star.driftY

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
            className="absolute inset-0 -z-10 w-full h-full pointer-events-none"
        />
    )
}