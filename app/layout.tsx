import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
    title: 'Jhoandry Apaza | Desarrollador de Software',
    description: 'Portafolio personal de desarrollo web y sistemas',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es" className="scroll-smooth">
            <body
                className={`${poppins.className} text-gray-300`}
                style={{ background: '#070c18' }}
            >
                {children}
            </body>
        </html>
    );
}