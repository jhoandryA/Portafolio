'use client'

import { motion } from 'framer-motion'
import { navLinks } from '@/app/lib/constants'
import { fadeIn } from '@/app/lib/animations'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { smoothScrollTo } from '@/app/utils/scroll'

export default function Header(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleNavClick = (id: string): void => {
        smoothScrollTo(id)
        setIsOpen(false)
    }

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={fadeIn as any}
            className="sticky top-0 z-50 border-b border-white/5"
            style={{
                background: 'rgba(7, 12, 24, 0.55)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
        >
            <nav className="max-w-7xl mx-auto flex justify-between items-center py-5 px-4 sm:px-6 lg:px-8">

                {/* LOGO */}
                <button
                    onClick={() => smoothScrollTo('home')}
                    className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors tracking-tight"
                >
                    Portafolio
                </button>

                {/* NAV DESKTOP */}
                <ul className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => handleNavClick(link.href)}
                                className="text-slate-400 hover:text-white transition-colors font-medium text-sm tracking-wide"
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* BOTÓN + MENÚ */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => smoothScrollTo('contact')}
                        className="hidden sm:inline-block px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                        style={{
                            background: '#3b8aee',
                            boxShadow: '0 0 16px rgba(59,138,238,0.35)',
                        }}
                    >
                        Contáctame
                    </button>

                    <button
                        className="md:hidden text-slate-400 hover:text-white focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </nav>

            {/* NAV MOBILE */}
            {isOpen && (
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25 }}
                    className="md:hidden border-t border-white/5"
                    style={{
                        background: 'rgba(7, 12, 24, 0.92)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="flex flex-col p-6">
                        <ul className="flex flex-col space-y-5">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <button
                                        onClick={() => handleNavClick(link.href)}
                                        className="text-slate-400 hover:text-white text-lg transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 pt-4 border-t border-white/5">
                            <button
                                onClick={() => handleNavClick('contact')}
                                className="block w-full text-center px-4 py-3 rounded-full text-white font-medium"
                                style={{ background: '#3b8aee' }}
                            >
                                Contáctame
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    )
}