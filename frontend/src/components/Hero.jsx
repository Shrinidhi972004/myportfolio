import styled from "styled-components";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import myPhoto from "../assets/myprofile.jpeg";
import FloatingTechIcons from "./FloatingTechIcons";
import { useTheme } from "../contexts/DarkThemeContext";
import { CharacterReveal, TypewriterText, SlideUpText } from "./TextAnimations";
import { shouldForwardProp } from '../utils/propFilter';
import './no-wrap-override.css';

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

// Enhanced animated text components
const RotatingRoleText = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme?.colors?.primary || '#2563eb'};
  margin-bottom: 1rem;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const GlowingTagline = styled(motion.div)`
  font-size: 1.1rem;
  color: ${props => props.theme?.colors?.textSecondary || '#b5cdf6'};
  margin-bottom: 1.5rem;
  text-align: left;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const BouncingWelcome = styled(motion.div)`
  font-size: 1.2rem;
  color: ${props => props.theme?.colors?.textSecondary || '#b5cdf6'};
  margin-bottom: 1rem;
  text-align: left;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
  }
`;

const GradientText = styled(motion.span)`
  background: linear-gradient(45deg, 
    ${props => props.theme?.colors?.primary || '#2563eb'}, 
    ${props => props.theme?.colors?.primary || '#1e90ff'}80,
    ${props => props.theme?.colors?.primary || '#00bfff'}
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;



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
  gap: 4rem;
  background: ${props => props.theme?.colors?.backgroundCard || 'rgba(16,42,67,0.72)'};
  box-shadow: 0 7px 36px 0 ${props => props.theme?.colors?.shadow || '#2563eb21'};
  border-radius: 2.2rem;
  padding: 3.5rem 5rem 3.5rem 5rem;
  max-width: 1400px;
  min-width: 600px;
  width: 90vw;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(18px) saturate(1.12);
  border: 2.3px solid ${props => props.theme?.colors?.border || '#1e293b'};

  @media (max-width: 1600px) {
    max-width: 1200px;
    padding: 3rem 4rem;
    gap: 3.5rem;
  }

  @media (max-width: 1400px) {
    max-width: 1000px;
    padding: 2.8rem 3.5rem;
    gap: 3rem;
    min-width: 0;
  }

  @media (max-width: 1200px) {
    max-width: 900px;
    padding: 2.5rem 3rem;
    gap: 2.5rem;
  }

  @media (max-width: 1024px) {
    max-width: 800px;
    padding: 2.2rem 2.5rem;
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem 1.5rem;
    max-width: 92vw;
    min-width: 0;
  }
`;

const ProfileTilt = styled(Tilt)`
  border-radius: 50%;
  position: relative;
`;

const ProfilePhoto = styled(motion.img).withConfig({
  shouldForwardProp,
})`
  width: 320px;
  height: 420px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 15px 80px 0 ${props => props.theme?.colors?.primary || '#2563eb'}55,
              0 0 0 4px ${props => props.theme?.colors?.border || '#1e293b'},
              0 0 30px rgba(255, 255, 255, 0.3),
              0 0 60px rgba(255, 255, 255, 0.1);
  border: 4px solid transparent;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.2));
  flex-shrink: 0;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 25px 100px 0 ${props => props.theme?.colors?.primary || '#2563eb'}77,
                0 0 0 4px ${props => props.theme?.colors?.primary || '#2563eb'}88,
                0 0 50px rgba(255, 255, 255, 0.6),
                0 0 80px rgba(255, 255, 255, 0.3);
    filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.4));
    transform: translateY(-20px) scale(1.06);
  }
  
  @media (max-width: 1200px) {
    width: 280px;
    height: 370px;
  }
  
  @media (max-width: 968px) {
    width: 260px;
    height: 340px;
  }
  
  @media (max-width: 768px) {
    width: 240px;
    height: 320px;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    height: 260px;
  }
`;

const HeroInfo = styled.div`
  flex: 1;
  text-align: left;
  min-width: 0;
  width: 100%;
  max-width: none;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 1;
  flex-grow: 1;
  
  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
  }
`;

const Name = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${props => props.theme?.colors?.text || '#fff'};
  margin-bottom: 1rem;
  line-height: 1.1;
  white-space: nowrap !important;
  min-width: max-content !important;
  overflow: visible !important;
  width: max-content !important;
  flex-shrink: 0 !important;
  display: inline-block !important;
  text-wrap: nowrap !important;
  word-break: keep-all !important;
  word-wrap: normal !important;
  text-overflow: visible !important;
  max-width: none !important;
  flex-grow: 0 !important;
  flex-basis: auto !important;
  
  @media (max-width: 1400px) {
    font-size: 3rem;
  }
  
  @media (max-width: 1200px) {
    font-size: 2.8rem;
  }
  
  @media (max-width: 1024px) {
    font-size: 2.6rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
    white-space: normal !important;
    width: auto !important;
    text-wrap: wrap !important;
    word-break: normal !important;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const AnimatedSubtitle = styled.div`
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

  const handleResumeDownload = async () => {
    try {
      const response = await fetch('/shrinidhi_resume.pdf');
      
      if (!response.ok) {
        throw new Error('PDF not found');
      }
      
      const blob = await response.blob();
      
      if (blob.type !== 'application/pdf') {
        throw new Error('Not a PDF file');
      }
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Shrinidhi_Upadhyaya_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading resume:', error);
      window.open('/shrinidhi_resume.pdf', '_blank');
    }
  };

  return (
    <HeroWrapper theme={currentTheme}>
      <FloatingTechIcons />
      <GlassCard
        theme={currentTheme}
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 100, delay: 0.3 }}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: `0 30px 90px 0 ${currentTheme.colors.shadow}`,
          y: -5
        }}
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
            src={myPhoto}
            alt="Shrinidhi Upadhyaya"
            theme={currentTheme}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.5 }}
          />
        </ProfileTilt>
        <HeroInfo>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hero-name-no-wrap"
          >
            <Name 
              theme={currentTheme}
              className="hero-name-no-wrap"
              style={{
                whiteSpace: 'nowrap !important',
                minWidth: 'max-content !important',
                width: 'max-content !important',
                overflow: 'visible !important',
                flexShrink: '0 !important',
                display: 'inline-block !important',
                textWrap: 'nowrap !important',
                wordBreak: 'keep-all !important',
                maxWidth: 'none !important',
                wordWrap: 'normal !important',
                textOverflow: 'visible !important',
                flexGrow: '0 !important',
                flexBasis: 'auto !important'
              }}
            >
              <div 
                className="hero-name-no-wrap"
                style={{ 
                  whiteSpace: 'nowrap !important', 
                  minWidth: 'max-content !important',
                  width: 'max-content !important',
                  overflow: 'visible !important',
                  display: 'inline-block !important',
                  textWrap: 'nowrap !important',
                  wordBreak: 'keep-all !important',
                  maxWidth: 'none !important',
                  wordWrap: 'normal !important',
                  textOverflow: 'visible !important',
                  flexShrink: '0 !important',
                  flexGrow: '0 !important',
                  flexBasis: 'auto !important',
                  fontSize: 'inherit !important'
                }}
              >
                <CharacterReveal delay={0.5}>
                  Hi, I'm Shrinidhi Upadhyaya
                </CharacterReveal>
              </div>
            </Name>
          </motion.div>
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <AnimatedSubtitle theme={currentTheme}>
              <TypewriterText 
                text="A developer & DevOps enthusiast who crafts clean, interactive web apps."
                speed={50}
                delay={1.0}
              />
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                style={{ color: currentTheme.colors.primary }}
              >
                React, Java, Node.js, Cloud & 3D UI enthusiast.
              </motion.span>
            </AnimatedSubtitle>
          </motion.div>
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            <CTA
              theme={currentTheme}
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleProjectsClick}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                See My Projects
              </motion.span>
            </CTA>
            <ResumeButton 
              theme={currentTheme}
              href="/shrinidhi_resume.pdf"
              onClick={(e) => {
                e.preventDefault();
                handleResumeDownload();
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: `0 8px 25px ${currentTheme.colors.shadow}` 
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <DownloadIcon />
              </motion.div>
              Download Resume
            </ResumeButton>
          </motion.div>
        </HeroInfo>
      </GlassCard>
    </HeroWrapper>
  );
}

export default Hero;
