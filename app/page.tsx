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
      {/* Sección hero con estrellas — sin contenedor, Hero se gestiona solo */}
      <div className="relative overflow-hidden">
        <StarBackground />
        <Header />
        <Hero />
      </div>

      {/* Resto de secciones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <About />
        <Projects />
        <Services />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}