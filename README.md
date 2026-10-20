# Jhoandry Apaza · Desarrollo con propósito

Portafolio personal en español, desde Lima, Perú. Desarrollado con Next.js 16, React y TypeScript, con un personaje tridimensional original modelado en Blender a partir de su fotografía y animado con Three.js.

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

Las pruebas cubren navegación, acceso a documentos, servicios con teclado, galería, filtros, vista ampliada, móvil, tablet, movimiento reducido, la introducción y el personaje 3D. Las pruebas del formulario interceptan EmailJS y simulan éxito y error; no envían correos reales.

## Contenidos y estructura

- `/`: presentación, sobre mí, servicios, proyectos seleccionados, dos certificaciones con vista previa, tecnologías y contacto.
- `/proyectos`: catálogo de los siete proyectos, filtros y vistas ampliadas.

Los textos, proyectos, enlaces y datos de contacto están centralizados en `app/lib/constants.ts`. Los certificados y capturas de los proyectos se conservan en `public`.

El personaje usa geometría volumétrica GLB: rostro, ojos, cabello, cuerpo, manos, ropa y escritorio. La cabeza sigue al puntero, los ojos parpadean y las manos se animan al revelar la pose de trabajo con el desplazamiento. No utiliza una fotografía como superficie del rostro. El código de modelado reproducible está en `scripts/build-character.py`; se ejecuta con Blender 4.3 o posterior. El mismo modelo genera el retrato de reserva para móvil, tablet, movimiento reducido o ausencia de WebGL.

La entrada de escritorio muestra el progreso de carga del personaje y permite saltar la introducción. La presentación se omite en móvil, tablet, movimiento reducido y enlaces directos a secciones. Lenis suaviza la rueda y las anclas en escritorio; las pantallas táctiles y el movimiento reducido conservan el desplazamiento nativo. Los proyectos pasan de una galería horizontal a una distribución vertical según el espacio disponible y la preferencia de movimiento.
