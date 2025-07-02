import styled from "styled-components";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import myPhoto from "../assets/myprofile.jpeg";
import FloatingTechIcons from "./FloatingTechIcons";

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

const ResumeButton = styled.a`
  margin-top: 1.4rem;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  background: #2563eb;
  color: #fff;
  font-weight: 600;
  padding: 0.9rem 2rem;
  border-radius: 2rem;
  text-decoration: none;
  font-size: 1.08rem;
  box-shadow: 0 2px 8px rgba(37,99,235,0.10);
  transition: background 0.17s, box-shadow 0.16s;
  cursor: pointer;
  border: none;
  &:hover {
    background: #1e40af;
    box-shadow: 0 4px 18px rgba(37,99,235,0.16);
  }
`;
const DownloadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12m0 0l4-4m-4 4l-4-4" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="4.7" y="18.5" width="14.6" height="2" rx="1" fill="currentColor" opacity="0.24"/>
  </svg>
);

const AnimatedBlob = styled(motion.div)`
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
  background: linear-gradient(120deg, #091a28 0%, #1e293b 100%);
  overflow: hidden;
`;

const GlassCard = styled(motion.div)`
  display: flex;
  align-items: center;
  background: rgba(16,42,67,0.62);
  box-shadow: 0 12px 64px 0 rgba(37,99,235,0.15);
  border-radius: 2.3rem;
  padding: 4.5rem 4rem 4.5rem 2.5rem;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(18px) saturate(1.25);
  border: 2.5px solid rgba(37,99,235,0.17);

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 2.5rem 1.4rem;
  }
`;

const ProfileTilt = styled(Tilt)`
  margin-right: 4rem;
  @media (max-width: 900px) { margin-right: 0; margin-bottom: 2rem; }
`;

const ProfilePhoto = styled(motion.img)`
  width: 400px;
  height: 450px;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid #2563eb;
  background: #fff;
  box-shadow: 0 8px 30px rgba(37,99,235,0.14), 0 2px 16px rgba(16,42,67,0.13);
  display: block;
`;

const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
`;

const Name = styled(motion.h1)`
  font-size: 3.3rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
  letter-spacing: -0.03em;
`;

const AnimatedSubtitle = styled(motion.p)`
  font-size: 1.38rem;
  color: #b5cdf6;
  margin-bottom: 2rem;
  max-width: 480px;
  line-height: 1.4;
  font-weight: 500;
  span {
    color: #2563eb;
    font-weight: 700;
  }
`;

const CTA = styled(motion.button)`
  padding: 1.1rem 2.3rem;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  color: #fff;
  border-radius: 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  box-shadow: 0 3px 28px rgba(37,99,235,0.14);
  transition: background 0.18s;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover { background: linear-gradient(100deg, #1e40af 0%, #2563eb 100%);}
`;

export default function Hero({ setActiveSection }) {
  const handleProjectsClick = () => {
    const target = document.getElementById("projects");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection && setActiveSection("projects");
    }
  };

  return (
    <HeroWrapper>
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
        initial={{ opacity: 0, y: 80, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.01, boxShadow: "0 24px 72px 0 rgba(37,99,235,0.19)" }}
      >
        <ProfileTilt
          glareEnable={true}
          glareMaxOpacity={0.18}
          glareColor="#2563eb"
          tiltMaxAngleX={18}
          tiltMaxAngleY={18}
          style={{ borderRadius: "50%" }}
          transitionSpeed={1700}
        >
          <ProfilePhoto
            src={myPhoto}
            alt="Shrinidhi Upadhyaya"
            whileHover={{ scale: 1.08, boxShadow: "0 12px 60px 0 #2563eb77" }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </ProfileTilt>
        <HeroInfo>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <Name
              variants={slideFromRight}
            >
              Hi, I'm Shrinidhi Upadhyaya
            </Name>
          </motion.div>
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <AnimatedSubtitle>
              A developer & DevOps enthusiast who crafts clean, interactive web apps.<br />
              <span>
                React, Java, Node.js, Cloud & 3D UI enthusiast.
              </span>
            </AnimatedSubtitle>
          </motion.div>
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <CTA
              as="button"
              type="button"
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleProjectsClick}
            >
              See My Projects
            </CTA>
          </motion.div>
          <motion.div
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <ResumeButton href="/resume.pdf" download>
              <DownloadIcon />
              Download Resume
            </ResumeButton>
          </motion.div>
        </HeroInfo>
      </GlassCard>
    </HeroWrapper>
  );
}
