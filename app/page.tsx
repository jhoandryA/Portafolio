import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Certificates from "./components/Certificates";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import DeveloperScene from "./components/DeveloperScene";
import SideRail from "./components/SideRail";
import CustomCursor from "./components/CustomCursor";
import Intro from "./components/Intro";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <SideRail />
      <CustomCursor />
      <main id="main-content">
        <div className="story-section" id="story">
          <DeveloperScene />
          <Hero />
          <About />
          <Services />
        </div>
        <Projects />
        <Certificates />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
