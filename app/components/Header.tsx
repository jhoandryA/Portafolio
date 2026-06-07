'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '@/app/lib/constants'
import { fadeIn } from '@/app/lib/animations'
import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { smoothScrollTo } from '@/app/utils/scroll'

export default function Header(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeSection, setActiveSection] = useState<string>('home')
    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const sections = navLinks.map(l => l.href)
        const observers: IntersectionObserver[] = []

        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
                { threshold: 0.4 }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => observers.forEach(o => o.disconnect())
    }, [])

    const handleNavClick = (id: string): void => {
        smoothScrollTo(id)
        setIsOpen(false)
    }

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={fadeIn as any}
            className="sticky top-0 z-50 transition-all duration-300"
            style={{
                background: scrolled
                    ? 'rgba(10, 14, 26, 0.85)'
                    : 'rgba(10, 14, 26, 0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: scrolled
                    ? '1px solid rgba(148,163,184,0.08)'
                    : '1px solid transparent',
            }}
        >
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">

                {/* LOGO */}
                <button
                    onClick={() => smoothScrollTo('home')}
                    className="flex items-center gap-2.5 group"
                >
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm group-hover:bg-blue-500 transition-colors">
                        JA
                    </div>
                    <span className="text-white font-semibold text-sm tracking-tight hidden sm:block">
                        Jhoandry<span className="text-blue-400"> Apaza</span>
                    </span>
                </button>

                {/* NAV DESKTOP */}
                <ul className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href
                        return (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleNavClick(link.href)}
                                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                                    style={{
                                        color: isActive ? '#fff' : '#94a3b8',
                                    }}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="active-pill"
                                            className="absolute inset-0 rounded-full bg-blue-600/20"
                                            transition={{ type: 'spring', duration: 0.4 }}
                                        />
                                    )}
                                    <span className="relative z-10 hover:text-white transition-colors">
                                        {link.name}
                                    </span>
                                </button>
                            </li>
                        )
                    })}
                </ul>

                {/* BOTÓN CTA + MENÚ MOBILE */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => smoothScrollTo('contact')}
                        className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-200 hover:scale-105"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Contáctame
                    </button>

                    <button
                        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menú"
                    >
                        {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
                    </button>
                </div>
            </nav>

            {/* NAV MOBILE */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden"
                        style={{
                            background: 'rgba(10, 14, 26, 0.97)',
                            borderTop: '1px solid rgba(148,163,184,0.08)',
                        }}
                    >
                        <div className="px-4 pb-6 pt-4 flex flex-col gap-1">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href
                                return (
                                    <button
                                        key={link.name}
                                        onClick={() => handleNavClick(link.href)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                                        style={{
                                            color: isActive ? '#fff' : '#94a3b8',
                                            background: isActive ? 'rgba(59,138,238,0.12)' : 'transparent',
                                        }}
                                    >
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                        )}
                                        <span className={isActive ? '' : 'ml-4'}>{link.name}</span>
                                    </button>
                                )
                            })}

                            <div className="mt-3 pt-3 border-t border-white/5">
                                <button
                                    onClick={() => handleNavClick('contact')}
                                    className="w-full py-3 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-500 transition-colors"
                                >
                                    Contáctame
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}