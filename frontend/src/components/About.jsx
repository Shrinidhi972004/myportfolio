import styled from "styled-components";
import { motion } from "framer-motion";
import { FaJava, FaReact, FaNodeJs, FaAws, FaLinux } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiDocker, SiSpringboot } from "react-icons/si";

// --- Styles ---
const AboutSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  background: #091a28;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow-x: hidden;
  padding: 7rem 0 4.7rem 0;
`;

const GlassCard = styled(motion.div)`
  background: rgba(16,42,67,0.72);
  box-shadow: 0 7px 36px 0 #2563eb21;
  border-radius: 2.2rem;
  padding: 3.6rem 3.2rem 3.3rem 3.2rem;
  max-width: 820px;
  width: 96vw;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(18px) saturate(1.12);
  border: 2.3px solid #1e293b;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #fff;
  margin-bottom: 2.1rem;
`;

const AboutText = styled(motion.p)`
  font-size: 1.17rem;
  color: #b5cdf6;
  line-height: 1.65;
  margin-bottom: 2.4rem;
  text-align: center;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.3rem 2.1rem;
  margin-top: 1.1rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(16,42,67,0.92);
  border-radius: 1.25rem;
  box-shadow: 0 2px 14px #2563eb18;
  padding: 1.2rem 1.5rem;
  min-width: 122px;
  min-height: 92px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  font-weight: 700;
  color: #2563eb;
  font-size: 1.07rem;
  transition: transform 0.17s, box-shadow 0.17s, color 0.17s;
  &:hover {
    transform: translateY(-7px) scale(1.10);
    box-shadow: 0 8px 28px #2563eb33;
    color: #1e90ff;
  }
  svg {
    font-size: 2.13rem;
    margin-bottom: 0.12rem;
    transition: color 0.18s;
  }
`;

const SkillIconWrapper = styled.span`
  background: #2563eb;
  border-radius: 50%;
  padding: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const skills = [
  { name: "Java", icon: <FaJava color="#e76f00" /> },
  { name: "Spring Boot", icon: <SiSpringboot color="#0fa76f" /> },
  { name: "React", icon: <FaReact color="#61dafb" /> },
  { name: "Node.js", icon: <FaNodeJs color="#65b94b" /> },
  { name: "AWS", icon: <FaAws color="#ff9900" /> },
  { name: "Linux", icon: (
      <SkillIconWrapper>
        <FaLinux color="#fff" />
      </SkillIconWrapper>
    )
  },
  { name: "Docker", icon: <SiDocker color="#2496ed" /> },
  { name: "MongoDB", icon: <SiMongodb color="#4fa13e" /> },
  { name: "PostgreSQL", icon: (
      <SkillIconWrapper>
        <SiPostgresql color="#fff" />
      </SkillIconWrapper>
    )
  }
];

export default function About() {
  return (
    <AboutSection id="about">
      <GlassCard
        initial={{ opacity: 0, y: 70, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
      >
        <Heading>About Me</Heading>
        <AboutText
          initial={{ opacity: 0, x: 56 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Hey! I’m a backend developer who’s happiest working under the hood—whether I’m architecting scalable APIs with Java and Spring Boot, writing clever SQL in PostgreSQL, or debugging those stubborn errors in production.<br/>
          Linux is my second home; I love the power it gives me to automate, configure, and control every part of my workflow. I’m also diving deeper into AWS Cloud, deploying projects that don’t just work on my machine but scale reliably in the real world. As a passionate DevOps learner, I’m fascinated by everything that makes software delivery smoother and more efficient—CI/CD, containerization, monitoring, you name it.<br/>
          My favorite thing about tech? There’s always something new to learn or optimize, and I love helping teams move faster (and break less stuff!). Whether I’m tinkering with infrastructure as code, setting up pipelines, or building a passwordless authentication system, I always aim for robust, maintainable solutions.<br/>
          Outside of work, you’ll find me geeking out over new tools, sharing tips with friends, or just enjoying the process of turning an idea into a real, working project.<br/>
          Let’s connect—especially if you love building, learning, or talking DevOps!<br/>
        </AboutText>
        <SkillsGrid>
          {skills.map((skill, idx) => (
            <SkillCard
              key={idx}
              whileHover={{ scale: 1.12, color: "#2563eb" }}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.44, delay: 0.22 + idx * 0.07 }}
              viewport={{ once: true }}
            >
              {skill.icon}
              {skill.name}
            </SkillCard>
          ))}
        </SkillsGrid>
      </GlassCard>
    </AboutSection>
  );
}
