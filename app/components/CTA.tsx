'use client'

import { motion } from 'framer-motion'
import { fadeIn } from '@/app/lib/animations'
import Link from 'next/link'
import { FiMail, FiArrowRight, FiUser, FiMessageSquare, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { smoothScrollTo } from '@/app/utils/scroll'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function CTA(): JSX.Element {
    const formRef = useRef<HTMLFormElement>(null)
    const [formState, setFormState] = useState<FormState>('idle')
    const [form, setForm] = useState({ name: '', email: '', message: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name || !form.email || !form.message) return
        setFormState('sending')

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                formRef.current!,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            )
            setFormState('success')
            setForm({ name: '', email: '', message: '' })
            setTimeout(() => setFormState('idle'), 5000)
        } catch {
            setFormState('error')
            setTimeout(() => setFormState('idle'), 4000)
        }
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
                className="relative rounded-2xl overflow-hidden border border-blue-500/20 bg-slate-900/80"
            >
                {/* Fondos decorativos */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative px-6 md:px-12 py-14">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                        {/* COLUMNA IZQUIERDA — info */}
                        <div className="flex flex-col gap-5">
                            <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-blue-300 text-sm font-medium">Disponible ahora</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                Trabajemos{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                    juntos
                                </span>
                            </h2>

                            <p className="text-slate-400 leading-relaxed text-sm">
                                Estoy disponible para proyectos freelance, prácticas profesionales
                                o colaboración en desarrollo de software. Si tienes una idea, hablemos.
                            </p>

                            {/* Contacto directo */}
                            <div className="flex flex-col gap-3 pt-2">
                                <a
                                    href="mailto:jhoandryoficial@gmail.com"
                                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                                        <FiMail size={14} />
                                    </div>
                                    jhoandryoficial@gmail.com
                                </a>
                                <a
                                    href="https://wa.me/51928806831"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                                        <FiMessageSquare size={14} />
                                    </div>
                                    WhatsApp disponible
                                </a>
                            </div>

                            <div className="pt-2">
                                <Link
                                    href="#projects"
                                    onClick={(e) => { e.preventDefault(); smoothScrollTo('projects') }}
                                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors"
                                >
                                    Ver mis proyectos
                                    <FiArrowRight size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* COLUMNA DERECHA — formulario */}
                        <div>
                            {formState === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center gap-4 py-12 text-center"
                                >
                                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                                        <FiCheck className="text-emerald-400" size={24} />
                                    </div>
                                    <h3 className="text-white font-semibold text-lg">¡Mensaje enviado!</h3>
                                    <p className="text-slate-400 text-sm max-w-xs">
                                        Gracias por contactarme. Te responderé lo antes posible.
                                    </p>
                                </motion.div>
                            ) : (
                                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

                                    {/* Nombre */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                                            <FiUser size={12} /> Nombre
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Tu nombre"
                                            className="px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                                            <FiMail size={12} /> Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="tu@correo.com"
                                            className="px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all"
                                        />
                                    </div>

                                    {/* Mensaje */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                                            <FiMessageSquare size={12} /> Mensaje
                                        </label>
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            placeholder="Cuéntame sobre tu proyecto o idea..."
                                            className="px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:bg-slate-800 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Error */}
                                    {formState === 'error' && (
                                        <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                            <FiAlertCircle size={13} />
                                            Hubo un error al enviar. Intenta de nuevo o escríbeme directo.
                                        </div>
                                    )}

                                    {/* Botón enviar */}
                                    <button
                                        type="submit"
                                        disabled={formState === 'sending'}
                                        className="mt-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
                                    >
                                        {formState === 'sending' ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend size={15} />
                                                Enviar mensaje
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    )
}