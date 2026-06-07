import Link from 'next/link'
import { socialLinks } from '@/app/lib/constants'

export default function Footer(): JSX.Element {
    return (
        <footer className="border-t border-slate-800 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                {/* NOMBRE + tagline */}
                <div className="text-center md:text-left">
                    <Link
                        href="/"
                        className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
                    >
                        Jhoandry Apaza
                    </Link>
                    <p className="text-slate-500 text-sm mt-1">
                        Desarrollador de Software & Sistemas
                    </p>
                </div>

                {/* REDES + COPYRIGHT */}
                <div className="flex flex-col items-center md:items-end gap-3">
                    <div className="flex gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.name}
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-800 text-slate-500 hover:text-blue-400 hover:border-blue-500/40 transition-all duration-200"
                            >
                                <link.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                    <p className="text-slate-600 text-xs">
                        © {new Date().getFullYear()} Jhoandry Apaza. Todos los derechos reservados.
                    </p>
                </div>

            </div>
        </footer>
    )
}