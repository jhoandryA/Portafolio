import Link from 'next/link'
import { socialLinks } from '@/app/lib/constants'

export default function Footer(): JSX.Element {
    return (
        <footer className="border-t border-gray-800 py-12">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* LOGO / NOMBRE */}
                    <div className="text-center md:text-left">

                        <Link
                            href="/"
                            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
                        >
                            Jhoandry Apaza
                        </Link>

                        <p className="text-gray-500 mt-2">
                            Desarrollo de software y sistemas
                        </p>

                    </div>

                    {/* REDES SOCIALES */}
                    <div className="flex flex-col items-center md:items-end gap-4">

                        <div className="flex gap-6">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-purple-500 transition-colors"
                                    aria-label={link.name}
                                >
                                    <link.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>

                        {/* COPYRIGHT */}
                        <p className="text-gray-600 text-sm">
                            © {new Date().getFullYear()} Jhoandry Apaza. Todos los derechos reservados.
                        </p>

                    </div>

                </div>
            </div>
        </footer>
    )
}