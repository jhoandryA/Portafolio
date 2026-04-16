import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
});

// ✏️ CAMBIA AQUÍ: tu nombre y descripción para SEO/pestaña del navegador
export const metadata: Metadata = {
    title: 'Tu Nombre | Full Stack Developer',
    description: 'Portafolio personal de desarrollo web',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
        <body className={`${poppins.className} bg-gray-900 text-gray-300`}>
        {children}
        </body>
        </html>
    );
}
