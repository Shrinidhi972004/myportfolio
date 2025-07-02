import styled from "styled-components";
import { motion } from "framer-motion";
import { FaJava, FaReact, FaNodeJs, FaAws, FaLinux } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiDocker, SiSpringboot } from "react-icons/si";
import { SlideUpText } from "./TextAnimations";
import FloatingElements from "./FloatingElements";
import Enhanced3DSkillCard from "./Enhanced3DSkillCard";
import AnimatedCounter from "./AnimatedCounter";
import { useTheme } from "../contexts/DarkThemeContext";

// --- Styles ---
const AboutSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  background: ${props => props.theme?.colors?.background || '#091a28'};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow-x: hidden;
  padding: 7rem 0 4.7rem 0;
  transition: background 0.3s ease;
`;

const GlassCard = styled(motion.div)`
  background: ${props => props.theme?.colors?.backgroundCard || 'rgba(16,42,67,0.72)'};
  box-shadow: 0 7px 36px 0 ${props => props.theme?.colors?.shadow || '#2563eb21'};
  border-radius: 2.2rem;
  padding: 3.6rem 3.2rem 3.3rem 3.2rem;
  max-width: 820px;
  width: 96vw;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(18px) saturate(1.12);
  border: 2.3px solid ${props => props.theme?.colors?.border || '#1e293b'};
  text-align: center;
  transition: all 0.3s ease;
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: ${props => props.theme?.colors?.text || '#fff'};
  margin-bottom: 2.1rem;
  transition: color 0.3s ease;
`;

const AboutText = styled(motion.p)`
  font-size: 1.17rem;
  color: ${props => props.theme?.colors?.textSecondary || '#b5cdf6'};
  line-height: 1.65;
  margin-bottom: 2.4rem;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.3s ease;
`;

const StatsContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0 3rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  
  .number {
    font-size: 2.5rem;
    font-weight: 900;
    color: ${props => props.theme?.colors?.primary || '#1e90ff'};
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 0.95rem;
    color: ${props => props.theme?.colors?.textMuted || '#718096'};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.3rem 2.1rem;
  margin-top: 1.1rem;
`;

const skills = [
  { name: "Java", icon: <FaJava color="#e76f00" /> },
  { name: "Spring Boot", icon: <SiSpringboot color="#0fa76f" /> },
  { name: "React", icon: <FaReact color="#61dafb" /> },
  { name: "Node.js", icon: <FaNodeJs color="#65b94b" /> },
  { name: "AWS", icon: <FaAws color="#ff9900" /> },
  { name: "Linux", icon: <FaLinux color="#333" /> },
  { name: "Docker", icon: <SiDocker color="#2496ed" /> },
  { name: "MongoDB", icon: <SiMongodb color="#4fa13e" /> },
  { name: "PostgreSQL", icon: <SiPostgresql color="#336791" /> }
];

export default function About() {
  const { currentTheme } = useTheme();

  const stats = [
    { number: 3, label: "Years Experience", suffix: "+" },
    { number: 15, label: "Projects Built", suffix: "+" },
    { number: 8, label: "Technologies", suffix: "" },
    { number: 2, label: "Cloud Platforms", suffix: "" }
  ];

  return (
    <AboutSection theme={currentTheme} id="about">
      <FloatingElements count={6} />
      <GlassCard
        theme={currentTheme}
        initial={{ opacity: 0, y: 70, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
      >
        <Heading theme={currentTheme}>About Me</Heading>
        <AboutText
          theme={currentTheme}
          initial={{ opacity: 0, x: 56 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Hey! I'm a backend developer who's happiest working under the hood—whether I'm architecting scalable APIs with Java and Spring Boot, writing clever SQL in PostgreSQL, or debugging those stubborn errors in production.<br/><br/>
          Linux is my second home; I love the power it gives me to automate, configure, and control every part of my workflow. I'm also diving deeper into AWS Cloud, deploying projects that don't just work on my machine but scale reliably in the real world.<br/><br/>
          As a passionate DevOps learner, I'm fascinated by everything that makes software delivery smoother and more efficient—CI/CD, containerization, monitoring, you name it. My favorite thing about tech? There's always something new to learn or optimize!
        </AboutText>

        <StatsContainer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              theme={currentTheme}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter 
                className="number"
                end={stat.number} 
                suffix={stat.suffix}
                duration={2}
              />
              <span className="label">{stat.label}</span>
            </StatItem>
          ))}
        </StatsContainer>

        <SkillsGrid>
          {skills.map((skill, idx) => (
            <Enhanced3DSkillCard
              key={idx}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.44, delay: 0.22 + idx * 0.07 }}
              viewport={{ once: true }}
            >
              {skill.icon}
              {skill.name}
            </Enhanced3DSkillCard>
          ))}
        </SkillsGrid>
      </GlassCard>
    </AboutSection>
  );
}
