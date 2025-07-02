import styled from "styled-components";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/DarkThemeContext";
import authImg from "../assets/auth.jpg";
import galleryImg from "../assets/gallery.jpg";


// Animated blue blob
const AnimatedBlob = styled(motion.div)`
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

const ProjectsGrid = styled.div`
  display: grid;
  gap: 2.2rem;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  width: 100%;
  max-width: 1040px;
  position: relative;
  z-index: 2;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme?.colors?.backgroundCard || 'rgba(16,42,67,0.86)'};
  border-radius: 1.5rem;
  box-shadow: 0 2px 22px ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.14)'};
  padding: 2.3rem 1.3rem 2.1rem 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 2.2px solid ${props => props.theme?.colors?.border || '#1e293b'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
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
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 50px ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.25)'};
    border: 2.2px solid ${props => props.theme?.colors?.primary || '#2563eb'};
    
    &::before {
      left: 100%;
    }
  }
`;

const ProjectImage = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 2rem;
  border-radius: 1.3rem;
  object-fit: cover;
  box-shadow: 0 4px 16px rgba(37,99,235,0.12);
  background: #1e293b;
  align-self: center;
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
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1.4rem;
  align-items: center;
  margin-bottom: 1.3rem;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  color: ${props => props.theme?.colors?.textSecondary || '#b5cdf6'};
  font-weight: 600;
  text-decoration: none;
  gap: 0.4rem;
  font-size: 1.09rem;
  transition: color 0.17s;
  &:hover {
    color: ${props => props.theme?.colors?.primary || '#2563eb'};
  }
`;

const DetailsText = styled.div`
  margin-top: 0.9rem;
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
const ModalOverlay = styled(motion.div)`
  position: fixed;
  z-index: 1200;
  inset: 0;
  background: rgba(13, 23, 48, 0.68);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalCard = styled(motion.div)`
  background: rgba(20, 32, 66, 0.98);
  border-radius: 2.1rem;
  box-shadow: 0 8px 48px #2563eb27;
  padding: 2.4rem 2.2rem 2rem 2.2rem;
  min-width: 330px;
  max-width: 98vw;
  width: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2.5px solid #2563eb;
  position: relative;
  z-index: 1300;
`;

const ModalImg = styled.img`
  width: 320px;
  height: 320px;
  border-radius: 1.5rem;
  object-fit: cover;
  background: #f1f5f9;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(37,99,235,0.13);

  @media (max-width: 600px) {
    width: 180px;
    height: 180px;
  }
`;


const ModalTitle = styled.h3`
  font-size: 1.45rem;
  font-weight: 700;
  color: #1e90ff;
  margin-bottom: 0.6rem;
  text-align: center;
`;

const ModalDesc = styled.p`
  font-size: 1.07rem;
  color: #b5cdf6;
  margin-bottom: 1.4rem;
  text-align: center;
  white-space: pre-line;
`;

const ModalLinks = styled.div`
  display: flex;
  gap: 1.3rem;
  justify-content: center;
  margin-bottom: 0.9rem;
`;

const ModalDetail = styled.div`
  color: #60a5fa;
  font-size: 0.98rem;
  font-style: italic;
  margin-bottom: 0.3rem;
  text-align: center;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 1.25rem;
  top: 1rem;
  background: none;
  border: none;
  color: #b5cdf6;
  font-size: 2.1rem;
  cursor: pointer;
  transition: color 0.14s;
  &:hover { color: #2563eb; }
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
    desc: "Secure authentication using magic links for frictionless login.",
    longDesc: "This project implements passwordless authentication using secure magic links sent to the user’s email. Features include JWT-based validation, user management, rate-limiting, and a user-friendly UI built with React and Node.js. Fully open-source and ready for production environments.",
    github: "https://github.com/Shrinidhi972004/passwordless-password-authentication-system.git",
    demo: "https://passwordless-password-authentication.onrender.com",
    details: "A secure, production-ready authentication flow using magic links (email).",
    img: authImg
  },
  {
    title: "Cloud Gallery",
    desc: "A cloud-based gallery for secure photo and video management.",
    longDesc: "A full-stack gallery app to upload, organize, and securely store photos/videos. AWS S3 integration, user authentication, responsive React UI, and Node.js backend. Great for photographers, teams, or anyone needing cloud media storage.",
    github: "https://github.com/Shrinidhi972004/Shrinidhi972004-cloud-media-gallery-using-mern-stack-and-aws-s3.git",
    demo: "https://cloud-gallery-demo.vercel.app/",
    details: "Upload and organize media securely, with AWS S3 integration and user authentication.",
    img: galleryImg
  }
];

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const { currentTheme } = useTheme();

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
      <ProjectsTitle theme={currentTheme}>Projects</ProjectsTitle>
      <ProjectsGrid>
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            theme={currentTheme}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: idx * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.05,
              rotate: [0, 1, -1, 0],
              transition: { duration: 0.3 }
            }}
            onClick={() => setSelected(project)}
          >
            {project.img && <ProjectImage src={project.img} alt={project.title + " logo"} />}
            <ProjectTitle theme={currentTheme}>{project.title}</ProjectTitle>
            <ProjectDesc theme={currentTheme}>{project.desc}</ProjectDesc>
            <ProjectLinks>
              <IconLink theme={currentTheme} href={project.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon />
                GitHub
              </IconLink>
              <IconLink theme={currentTheme} href={project.demo} target="_blank" rel="noopener noreferrer">
                <LiveDemoIcon />
                Live Demo
              </IconLink>
            </ProjectLinks>
            <DetailsText>
              {project.details}<br/>
              <b>Click to see full details.</b>
            </DetailsText>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <AnimatePresence>
        {selected && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <ModalCard
              initial={{ scale: 0.91, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 60 }}
              transition={{ duration: 0.24, type: "spring" }}
              onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
            >
              <CloseBtn onClick={() => setSelected(null)} title="Close">&times;</CloseBtn>
              <ModalImg src={selected.img} alt={selected.title + " logo"} />
              <ModalTitle>{selected.title}</ModalTitle>
              <ModalDesc>{selected.longDesc}</ModalDesc>
              <ModalLinks>
                <IconLink href={selected.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon /> GitHub
                </IconLink>
                <IconLink href={selected.demo} target="_blank" rel="noopener noreferrer">
                  <LiveDemoIcon /> Live Demo
                </IconLink>
              </ModalLinks>
              <ModalDetail>{selected.details}</ModalDetail>
            </ModalCard>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
}
