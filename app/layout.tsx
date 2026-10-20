import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jhoandry Apaza — Desarrollo con propósito",
    template: "%s | Jhoandry Apaza",
  },
  description:
    "Desarrollador de software en Lima, Perú. Transformo ideas en sitios web, aplicaciones y sistemas: React, Next.js, Java, Node.js y WordPress.",
  keywords: [
    "Jhoandry Apaza",
    "desarrollador de software",
    "desarrollo web",
    "Lima",
    "Perú",
    "full stack",
  ],
  openGraph: {
    title: "Jhoandry Apaza — Desarrollo con propósito",
    description:
      "Ideas claras. Código que las hace realidad. Conoce mis proyectos de desarrollo web y sistemas.",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-PE" className={geist.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Saltar al contenido
        </a>
        <Providers>{children}</Providers>
        <noscript>
          <style>
            {
              ".reveal{opacity:1!important;transform:none!important;filter:none!important}"
            }
          </style>
        </noscript>
      </body>
    </html>
  );
}
