# Jhoandry Apaza · Desarrollo con propósito

Portafolio personal en español, desde Lima, Perú. Desarrollado con Next.js 16, React y TypeScript, con un retrato estilizado basado en su fotografía, presentado en un relieve con paralaje mediante Three.js.

## Desarrollo

Requiere Node.js 20.9 o posterior y npm. El entorno actual utiliza Node.js 24.

```bash
npm ci
npm run dev
```

El proyecto se sirve en el puerto 3000. Los recursos de las fuentes se descargan desde Google Fonts al preparar la compilación y se sirven localmente al visitante.

## Configuración de contacto

El formulario conserva la integración con EmailJS. Usa `.env.example` como referencia para las tres variables `NEXT_PUBLIC_EMAILJS_*` en `.env.local`. Los valores existentes del entorno deben conservarse. No subas `.env.local` al repositorio ni uses claves privadas en variables públicas. Configura en EmailJS los orígenes autorizados para tu dominio de producción.

Sin estos valores, el resto del portafolio funciona y el formulario ofrece los canales directos de correo y WhatsApp si no puede enviar el mensaje.

## Comprobaciones

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`npm run lint` usa la configuración de ESLint para Next.js 16; no depende del comando retirado `next lint`.

Las pruebas de navegador preparan una compilación de producción y un servidor temporal en el puerto 3100:

```bash
npx playwright install chromium
npm run test:e2e
```

Si existe Chromium en `/usr/bin/chromium`, las pruebas lo reutilizan. También se puede indicar `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Para probar un servidor ya iniciado, usa `E2E_BASE_URL`.

Las pruebas cubren navegación, acceso a documentos, servicios con teclado, galería, filtros, vista ampliada, móvil, tablet, movimiento reducido, ajedrez y la guía del portafolio. Las pruebas del formulario interceptan EmailJS y simulan éxito y error; no envían correos reales.

## Contenidos y estructura

- `/`: presentación, sobre mí, servicios, proyectos seleccionados, dos certificaciones con vista previa, tecnologías y contacto.
- `/proyectos`: catálogo de los siete proyectos, filtros y vistas ampliadas.
- `/laboratorio`: ajedrez de práctica y guía interactiva sobre el portafolio.

Los textos, proyectos, enlaces y datos de contacto están centralizados en `app/lib/constants.ts`. Los certificados y capturas de los proyectos se conservan en `public`.

La guía del laboratorio responde a preguntas frecuentes a partir del contenido del portafolio; no usa una API generativa ni requiere nuevas credenciales. El ajedrez utiliza `chess.js` para las reglas y un motor de práctica propio en un Web Worker. No se le atribuye una puntuación ELO.

El retrato se generó a partir de la foto de Jhoandry y se presenta en un relieve de poca profundidad con iluminación precalculada: no es una reconstrucción facial ni un modelo humano completo. La escena evita geometría facial genérica y conserva un paralaje moderado. En móvil y tablet, cuando se solicita movimiento reducido o si WebGL no está disponible, se conserva una presentación con retrato. El contenido aparece directamente, sin pantalla de carga. Lenis suaviza la rueda y las anclas en escritorio; las pantallas táctiles y el movimiento reducido conservan el desplazamiento nativo. Los proyectos pasan de una galería horizontal a una distribución vertical según el espacio disponible y la preferencia de movimiento.
