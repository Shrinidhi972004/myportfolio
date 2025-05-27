import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

// Optionally, add GlobalStyle here if using styled-components for scroll-padding
// import GlobalStyle from "./components/GlobalStyle";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <>
      {/* <GlobalStyle /> */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Wrap each section in a <section> with a unique id */}
      <section id="home">
        <Hero setActiveSection={setActiveSection} />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
