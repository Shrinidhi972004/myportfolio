import { useState } from "react";
import { DarkThemeProvider } from "./contexts/DarkThemeContext";
import CustomCursor from "./components/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import ParticleBackground from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SectionSeparator from "./components/SectionSeparator";
import { FiUser, FiCode, FiMail } from 'react-icons/fi';

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <DarkThemeProvider>
        <LoadingScreen onComplete={handleLoadingComplete} />
      </DarkThemeProvider>
    );
  }

  return (
    <DarkThemeProvider>
      <CustomCursor />
      <ScrollProgress />
      <ParticleBackground particleCount={30} />
      <ScrollToTop />
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <section id="home">
          <Hero setActiveSection={setActiveSection} />
        </section>
        
        <SectionSeparator icon={<FiUser />} />
        
        <section id="about">
          <About />
        </section>
        
        <SectionSeparator icon={<FiCode />} />
        
        <section id="projects">
          <Projects />
        </section>
        
        <SectionSeparator icon={<FiMail />} />
        
        <section id="contact">
          <Contact />
        </section>
    </DarkThemeProvider>
  );
}
