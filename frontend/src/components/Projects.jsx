import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/DarkThemeContext";
import hostelImg from "../assets/hostel.jpg";
import galleryImg from "../assets/gallery.jpg";
import passwordImg from "../assets/password.jpg";
import rootsTechImg from "../assets/RootsTech.jpg";
import portfolioImg from "../assets/portfolio.jpg";
import { shouldForwardProp } from '../utils/propFilter';


// Animated blue blob
const AnimatedBlob = styled(motion.div).withConfig({
  shouldForwardProp,
})`
  position: absolute;
  left: -100px;
  bottom: -100px;
  width: 410px;
  height: 410px;
  z-index: 0;
  background: ${props => props.theme?.isDark 
    ? 'radial-gradient(circle at 25% 70%, #2563eb 0%, #1e40af 80%, #091a28 100%)'
    : 'radial-gradient(circle at 25% 70%, #3b82f6 0%, #2563eb 80%, #f8fafc 100%)'
  };
  filter: blur(80px);
  opacity: 0.21;
  animation: blobMove 12s infinite alternate;
  @keyframes blobMove {
    0% { transform: scale(1) translateY(0px);}
    100% { transform: scale(1.11) translateY(20px);}
  }
`;

const ProjectsSection = styled.section`
  min-height: 90vh;
  background: ${props => props.theme?.colors?.background || '#091a28'};
  position: relative;
  padding: 6.2rem 0 4.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  transition: background 0.3s ease;
`;

const ProjectsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.theme?.colors?.text || '#fff'};
  margin-bottom: 2.5rem;
  z-index: 2;
  transition: color 0.3s ease;
`;

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 2;
  overflow: hidden;
`;

const CarouselTrack = styled(motion.div)`
  display: flex;
  gap: 2rem;
  padding: 0 1rem;
  width: fit-content;
  user-select: none;
  touch-action: pan-y pinch-zoom;
`;

const ProjectCard = styled(motion.div).withConfig({
  shouldForwardProp,
})`
  background: ${props => props.theme?.colors?.backgroundCard || 'rgba(16,42,67,0.86)'};
  border-radius: 1.5rem;
  box-shadow: 0 2px 22px ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.14)'};
  padding: 2.3rem 1.3rem 2.1rem 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2.2px solid ${props => props.theme?.colors?.border || '#1e293b'};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  width: 550px;
  height: 700px;
  flex-shrink: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme?.isDark 
      ? 'linear-gradient(90deg, transparent, rgba(37,99,235,0.1), transparent)'
      : 'linear-gradient(90deg, transparent, rgba(59,130,246,0.1), transparent)'
    };
    transition: left 0.5s;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme?.colors?.primary || '#2563eb'}08;
    border-radius: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02) rotateX(2deg) rotateY(2deg);
    box-shadow: 
      0 20px 50px ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.25)'},
      0 0 30px ${props => props.theme?.colors?.primary || '#2563eb'}20;
    border: 2.2px solid ${props => props.theme?.colors?.primary || '#2563eb'};
    
    &::before {
      left: 100%;
    }
    
    &::after {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    width: 350px;
    height: 550px;
  }
  
  @media (max-width: 480px) {
    width: 300px;
    height: 500px;
  }
`;

const ImageWrapper = styled.div`
  width: 450px;
  height: 350px;
  margin-bottom: 2rem;
  border-radius: 1.3rem;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(37,99,235,0.12);
  background: #1e293b;
  align-self: center;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 320px;
    height: 320px;
  }
  
  @media (max-width: 480px) {
    width: 280px;
    height: 280px;
  }
`;

const ProjectImage = styled(motion.img)`
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme?.colors?.primary || '#2563eb'};
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
`;

const ProjectDesc = styled.p`
  color: ${props => props.theme?.colors?.textSecondary || '#aac8f5'};
  margin-bottom: 1.15rem;
  font-size: 1.01rem;
  transition: color 0.3s ease;
  line-height: 1.5;
  flex-grow: 1;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  margin-bottom: 1.3rem;
`;

const IconLink = styled(motion.a)`
  display: flex;
  align-items: center;
  color: ${props => props.theme?.colors?.textSecondary || '#b5cdf6'};
  font-weight: 600;
  text-decoration: none;
  gap: 0.4rem;
  font-size: 1.09rem;
  transition: all 0.3s ease;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme?.colors?.primary || '#2563eb'}15;
    transition: left 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme?.colors?.primary || '#2563eb'};
    transform: translateY(-2px);
    
    &::before {
      left: 0;
    }
  }
`;

const DetailsText = styled.div`
  margin-top: auto;
  color: ${props => props.theme?.colors?.textSecondary || '#7dd3fc'};
  font-size: 0.99rem;
  font-style: italic;
  border-top: 1px dashed ${props => props.theme?.colors?.primary || '#1e90ff'}44;
  padding-top: 0.7rem;
  width: 100%;
  text-align: left;
  transition: color 0.3s ease;
`;

// Modal
const ModalOverlay = styled(motion.div).withConfig({
  shouldForwardProp,
})`
  position: fixed;
  z-index: 1200;
  inset: 0;
  background: rgba(9, 26, 40, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalCard = styled(motion.div).withConfig({
  shouldForwardProp,
})`
  background: rgba(16, 42, 67, 0.95);
  border-radius: 2.1rem;
  box-shadow: 
    0 20px 60px rgba(37, 99, 235, 0.3),
    0 0 40px rgba(37, 99, 235, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  padding: 3rem 2.5rem 2.5rem 2.5rem;
  min-width: 500px;
  max-width: 95vw;
  width: 700px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(37, 99, 235, 0.3);
  position: relative;
  z-index: 1300;
  backdrop-filter: blur(12px);
  overflow-y: auto;
  
  @media (max-width: 768px) {
    width: 95vw;
    min-width: 300px;
    padding: 2rem 1.5rem 1.5rem 1.5rem;
  }
`;

const ModalImg = styled.img`
  width: 500px;
  height: 400px;
  border-radius: 1.5rem;
  object-fit: cover;
  background: #f1f5f9;
  margin-bottom: 2rem;
  box-shadow: 
    0 12px 40px rgba(37,99,235,0.2),
    0 0 20px rgba(37,99,235,0.1);
  border: 2px solid rgba(37, 99, 235, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
  
  @media (max-width: 480px) {
    height: 200px;
  }
`;


const ModalTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #1e90ff;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ModalDesc = styled.p`
  font-size: 1.2rem;
  color: #b5cdf6;
  margin-bottom: 2rem;
  text-align: center;
  white-space: pre-line;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 1.3rem;
  justify-content: center;
  margin-bottom: 0.9rem;
`;

const ModalDetail = styled.div`
  color: #60a5fa;
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 0.5rem;
  text-align: center;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 1.25rem;
  top: 1rem;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b5cdf6;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover { 
    color: #2563eb; 
    background: rgba(37, 99, 235, 0.2);
    border-color: rgba(37, 99, 235, 0.4);
    transform: scale(1.1);
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  z-index: 3;
`;

const NavButton = styled(motion.button)`
  background: ${props => props.theme?.colors?.primary || '#2563eb'};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(37,99,235,0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme?.colors?.primaryHover || '#1d4ed8'};
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(37,99,235,0.4);
  }
  
  &:disabled {
    background: ${props => props.theme?.colors?.textSecondary || '#64748b'};
    cursor: not-allowed;
    transform: scale(1);
    box-shadow: none;
  }
`;



const DotsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0 1rem;
`;

const Dot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active 
    ? props.theme?.colors?.primary || '#2563eb'
    : props.theme?.colors?.textSecondary || '#64748b'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme?.colors?.primary || '#2563eb'};
    transform: scale(1.2);
  }
`;

// Icons
function GithubIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
      0-.53.63-.01 1.08.58 1.23.82.72 1.2 1.87.85 2.33.65.07-.52.28-.85.5-1.05-1.78-.2-3.64-.89-3.64-3.95
      0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27
      2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82
      1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01
      2.2 0 .21.15.46.55.38A8.001 8.001 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
function LiveDemoIcon() {
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"></path>
      <path d="M5 5v14h14v-7h-2v5H7V7h5V5H5z"></path>
    </svg>
  );
}

const projects = [
  {
    title: "Passwordless Auth System",
    desc: "Secure authentication using magic links.",
    longDesc: "This project implements passwordless authentication using secure magic links sent to the user’s email. Features include JWT-based validation, user management, rate-limiting, and a user-friendly UI built with React and Node.js. Fully open-source and ready for production environments.",
    github: "https://github.com/Shrinidhi972004/passwordless-password-authentication-system.git",
    demo: "https://passwordless-password-authentication.onrender.com",
    details: "A secure, production-ready authentication flow using magic links (email).",
    img: passwordImg
  },
  {
    title: "Cloud Gallery",
    desc: "Cloud-based gallery for photo management.",
    longDesc: "A full-stack gallery app to upload, organize, and securely store photos/videos. AWS S3 integration, user authentication, responsive React UI, and Node.js backend. Great for photographers, teams, or anyone needing cloud media storage.",
    github: "https://github.com/Shrinidhi972004/Shrinidhi972004-cloud-media-gallery-using-mern-stack-and-aws-s3.git",
    demo: "https://cloud-gallery-demo.vercel.app/",
    details: "Upload and organize media securely, with AWS S3 integration and user authentication.",
    img: galleryImg
  },
  {
    title: "Hostel Room Booking System",
    desc: "Hostel room booking system.",
    longDesc: "A full-stack hostel room booking system for students. It is a web application that allows students to book rooms in a hostel. It is a web application that allows students to book rooms in a hostel.",
    github: "https://github.com/Shrinidhi972004/hostel-room-booking.git/",
    demo: "https://hostel-room-booking-system-demo.vercel.app/",
    details: "A full-stack hostel room booking system for students. It is a web application that allows students to book rooms in a hostel.",
    img: hostelImg
  },
  {
    title: "Roots-Tech",
    desc: "Ecommerce website for products.",
    longDesc: "A full-stack ecommerce website for selling products. It is a web application that allows users to buy and sell products. It is a web application that allows users to buy and sell products.",
    github: "https://github.com/Shrinidhi972004/Roots-Tech.git/",
    demo: "https://roots-tech.vercel.app/",
    details: "A full-stack ecommerce website for selling products. It is a web application that allows users to buy and sell products.",
    img: rootsTechImg
  },
  {
    title: "Personal Portfolio",
    desc: "A modern, responsive developer portfolio.",
    longDesc: "Portfolio site to showcase my projects, skills, and experience. Built with React and styled-components.",
    github: "https://github.com/Shrinidhi972004/myportfolio",
    demo: "https://shrinidhi-portfolio.vercel.app/",
    details: "A visually appealing and responsive portfolio website built with React and styled-components. Features include About, Skills, Projects, and Contact sections, as well as interactive UI elements and smooth animations. The site allows visitors to learn more about my background, explore my work, and connect easily.",
    img: portfolioImg
  }
  

];

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentTheme } = useTheme();
  const carouselRef = useRef(null);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(projects.length - 1, prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Touch/Swipe functionality
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50; // Minimum distance to trigger swipe
    const velocityThreshold = 500; // Minimum velocity to trigger swipe

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      // Swipe right - go to previous
      handlePrevious();
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      // Swipe left - go to next
      handleNext();
    }
  };

  const cardWidth = 470; // Width of each card including gap
  const translateX = -currentIndex * cardWidth;

  return (
    <ProjectsSection theme={currentTheme} id="projects">
      <AnimatedBlob
        theme={currentTheme}
        animate={{
          scale: [1, 1.09, 1],
          y: [0, 28, 0],
          x: [0, 15, -8, 0],
          rotate: [0, 9, -6, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <ProjectsTitle theme={currentTheme}>Projects</ProjectsTitle>
      </motion.div>
      <CarouselContainer>
        <CarouselTrack
          ref={carouselRef}
          animate={{ x: translateX }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          style={{ cursor: "grab" }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              theme={currentTheme}
              initial={{ opacity: 0, y: 80, scale: 0.85, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.03,
                rotateY: [0, 2, -2, 0],
                transition: { duration: 0.4 }
              }}
              onClick={() => setSelected(project)}
            >
              {project.img && (
                <ImageWrapper>
                  <ProjectImage 
                    src={project.img} 
                    alt={project.title + " logo"}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.3 }
                  }}
                  />
                </ImageWrapper>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ProjectTitle theme={currentTheme}>{project.title}</ProjectTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ProjectDesc theme={currentTheme}>{project.desc}</ProjectDesc>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ProjectLinks>
                  <IconLink 
                    theme={currentTheme} 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <GithubIcon />
                    GitHub
                  </IconLink>
                  <IconLink 
                    theme={currentTheme} 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LiveDemoIcon />
                    Live Demo
                  </IconLink>
                </ProjectLinks>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 + idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <DetailsText>
                  {project.details}<br/>
                  <b>Click to see full details.</b>
                </DetailsText>
              </motion.div>
            </ProjectCard>
          ))}
        </CarouselTrack>
      </CarouselContainer>

      <NavigationContainer>
        <NavButton
          theme={currentTheme}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          whileHover={{ scale: currentIndex === 0 ? 1 : 1.1 }}
          whileTap={{ scale: currentIndex === 0 ? 1 : 0.95 }}
        >
          &lt;
        </NavButton>
        <DotsContainer>
          {projects.map((_, idx) => (
            <Dot
              key={idx}
              theme={currentTheme}
              active={idx === currentIndex}
              onClick={() => handleDotClick(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </DotsContainer>
        <NavButton
          theme={currentTheme}
          onClick={handleNext}
          disabled={currentIndex === projects.length - 1}
          whileHover={{ scale: currentIndex === projects.length - 1 ? 1 : 1.1 }}
          whileTap={{ scale: currentIndex === projects.length - 1 ? 1 : 0.95 }}
        >
          &gt;
        </NavButton>
      </NavigationContainer>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          textAlign: 'center',
          marginTop: '1rem',
          color: currentTheme?.colors?.textSecondary || '#aac8f5',
          fontSize: '0.9rem',
          fontStyle: 'italic'
        }}
      >
        
      </motion.div>

      <AnimatePresence>
        {selected && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setSelected(null)}
          >
            <ModalCard
              initial={{ 
                scale: 0.8, 
                opacity: 0, 
                y: 80,
                rotateX: 15,
                rotateY: -5
              }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                rotateX: 0,
                rotateY: 0
              }}
              exit={{ 
                scale: 0.9, 
                opacity: 0, 
                y: 40,
                rotateX: -10,
                rotateY: 5
              }}
              transition={{ 
                duration: 0.4, 
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <CloseBtn onClick={() => setSelected(null)} title="Close">&times;</CloseBtn>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              >
                <ModalImg src={selected.img} alt={selected.title + " logo"} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
              >
                <ModalTitle>{selected.title}</ModalTitle>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
              >
                <ModalDesc>{selected.longDesc}</ModalDesc>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
              >
                <ModalLinks>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <IconLink href={selected.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon /> GitHub
                    </IconLink>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <IconLink href={selected.demo} target="_blank" rel="noopener noreferrer">
                      <LiveDemoIcon /> Live Demo
                    </IconLink>
                  </motion.div>
                </ModalLinks>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
              >
                <ModalDetail>{selected.details}</ModalDetail>
              </motion.div>
            </ModalCard>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
}
