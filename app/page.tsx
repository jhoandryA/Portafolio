import Header from '@/app/components/Header'
import Hero from '@/app/components/Hero'
import About from '@/app/components/About'
import Projects from '@/app/components/Projects'
import Services from '@/app/components/Services'
import CTA from '@/app/components/CTA'
import Footer from '@/app/components/Footer'
import StarBackground from '@/app/components/StarBackground'

export default function Home() {
  return (
    <main>
      {/* Sección con estrellas — fade out al fondo */}
      <div className="relative overflow-hidden">
        <StarBackground />
        <Header />
        <Hero />

        {/* Gradiente de transición invisible hacia el fondo del body */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, #0a0e1a)'
          }}
        />
      </div>

      {/* Resto de secciones — mismo color de fondo */}
      <div style={{ background: '#0a0e1a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <About />
          <Projects />
          <Services />
          <CTA />
          <Footer />
        </div>
      </div>
    </main>
  )
}