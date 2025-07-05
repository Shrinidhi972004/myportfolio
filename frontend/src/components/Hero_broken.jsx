import styled from "styled-components";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import myPhoto from "../assets/myprofile.jpeg";
import FloatingTechIcons from "./FloatingTechIcons";
import { useTheme } from "../contexts/DarkThemeContext";
import { CharacterReveal, TypewriterText } from "./TextAnimations";
import { shouldForwardProp } from '../utils/propFilter';

const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const ResumeButton = styled(motion.a).withConfig({
  shouldForwardProp,
})`
  margin-top: 1.4rem;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  background: ${props => props.theme?.colors?.primary || '#2563eb'};
  color: ${props => props.theme?.colors?.text || '#fff'};
  font-weight: 600;
  padding: 0.9rem 2rem;
  border-radius: 2rem;
  text-decoration: none;
  font-size: 1.08rem;
  box-shadow: 0 2px 8px ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.10)'};
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  
  &:hover {
    background: ${props => props.theme?.colors?.primaryHover || '#1e40af'};
    box-shadow: 0 4px 18px ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.16)'};
    transform: translateY(-2px);
  }
`;

const DownloadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="4.7" y="18.5" width="14.6" height="2" rx="1" fill="currentColor" opacity="0.24"/>
  </svg>
);

const AnimatedBlob = styled(motion.div).withConfig({
  shouldForwardProp,
})`
  position: absolute;
  left: -120px;
  top: -80px;
  width: 430px;
  height: 430px;
  z-index: 0;
  background: radial-gradient(circle at 40% 40%, #2563eb 0%, #1e40af 80%, #091a28 100%);
  filter: blur(90px);
  opacity: 0.33;
  animation: blobMove 8s infinite linear alternate;
  @keyframes blobMove {
    0% { transform: scale(1) translateY(0px);}
    100% { transform: scale(1.10) translateY(30px);}
  }
`;

const HeroWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme?.colors?.background || 'linear-gradient(120deg, #091a28 0%, #1e293b 100%)'};
  overflow: hidden;
`;

const GlassCard = styled(motion.div).withConfig({
  shouldForwardProp,
})`
  display: flex;
  align-items: center;
  gap: 3.5rem;
  background: ${props => props.theme?.colors?.backgroundCard || 'rgba(16,42,67,0.72)'};
  box-shadow: 0 7px 36px 0 ${props => props.theme?.colors?.shadow || '#2563eb21'};
  border-radius: 2.2rem;
  padding: 3.6rem 3.2rem 3.3rem 3.2rem;
  max-width: 1000px;
  width: 96vw;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(18px) saturate(1.12);
  border: 2.3px solid ${props => props.theme?.colors?.border || '#1e293b'};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2.5rem;
    padding: 2.5rem 2rem;
  }
`;

const ProfileTilt = styled(Tilt)`
  border-radius: 50%;
  position: relative;
`;

const ProfilePhoto = styled(motion.img).withConfig({
  shouldForwardProp,
})`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 12px 60px 0 ${props => props.theme?.colors?.primary || '#2563eb'}44;
  border: 4px solid ${props => props.theme?.colors?.border || '#1e293b'};
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const HeroInfo = styled.div`
  flex: 1;
  text-align: left;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Name = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${props => props.theme?.colors?.text || '#fff'};
  margin-bottom: 1.2rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const AnimatedSubtitle = styled.p`
  font-size: 1.35rem;
  color: ${props => props.theme?.colors?.textSecondary || '#b5cdf6'};
  line-height: 1.6;
  margin-bottom: 2rem;
  letter-spacing: 0.03em;
  font-weight: 400;
  
  span {
    color: ${props => props.theme?.colors?.primary || '#1e90ff'};
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const CTA = styled(motion.button).withConfig({
  shouldForwardProp,
})`
  background: ${props => props.theme?.colors?.primary || '#2563eb'};
  color: ${props => props.theme?.colors?.text || '#fff'};
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 20px ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.15)'};
  transition: all 0.3s ease;
  margin-right: 1rem;
  
  &:hover {
    background: ${props => props.theme?.colors?.primaryHover || '#1e40af'};
    box-shadow: 0 6px 30px ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.25)'};
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

function Hero({ setActiveSection }) {
  const { currentTheme } = useTheme();

  const handleProjectsClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('projects');
    }
  };

  return (
    <HeroWrapper theme={currentTheme}>
      <FloatingTechIcons />
      <AnimatedBlob
        animate={{
          scale: [1, 1.10, 1],
          y: [0, 30, 0],
          x: [0, 10, -8, 0],
          rotate: [0, 9, -4, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <GlassCard
        theme={currentTheme}
        initial={{ opacity: 0, y: 80, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.01, boxShadow: `0 24px 72px 0 ${currentTheme.colors.shadow}` }}
      >
        <ProfileTilt
          glareEnable={true}
          glareMaxOpacity={0.18}
          glareColor={currentTheme.colors.primary}
          tiltMaxAngleX={18}
          tiltMaxAngleY={18}
          style={{ borderRadius: "50%" }}
          transitionSpeed={1700}
        >
          <ProfilePhoto
            theme={currentTheme}
            src={myPhoto}
            alt="Shrinidhi Upadhyaya"
            whileHover={{ scale: 1.08, boxShadow: `0 12px 60px 0 ${currentTheme.colors.primary}77` }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </ProfileTilt>
        <HeroInfo>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <Name theme={currentTheme}>
              <CharacterReveal delay={0.2}>
                Hi, I'm Shrinidhi Upadhyaya
              </CharacterReveal>
            </Name>
          </motion.div>
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <AnimatedSubtitle theme={currentTheme}>
              A developer & DevOps enthusiast who crafts clean, interactive web apps.<br />
              <span>
                React, Java, Node.js, Cloud & 3D UI enthusiast.
              </span>
            </AnimatedSubtitle>
          </motion.div>
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <CTA
              theme={currentTheme}
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleProjectsClick}
            >
              See My Projects
            </CTA>
            <ResumeButton 
              theme={currentTheme}
              href="/resume.pdf" 
              download
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: `0 8px 25px ${currentTheme.colors.shadow}` 
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <DownloadIcon />
              Download Resume
            </ResumeButton>
          </motion.div>
        </HeroInfo>
      </GlassCard>
    </HeroWrapper>
  );
}

export default Hero;
