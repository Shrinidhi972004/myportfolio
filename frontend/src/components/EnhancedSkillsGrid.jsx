import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaJava, FaReact, FaNodeJs, FaAws, FaLinux } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiDocker, SiSpringboot } from "react-icons/si";

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(16,42,67,0.92);
  border-radius: 1.25rem;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
  
  &:hover {
    border-color: rgba(37, 99, 235, 0.5);
  }
`;

const SkillIcon = styled(motion.div)`
  font-size: 2.5rem;
  position: relative;
  z-index: 2;
`;

const SkillName = styled(motion.div)`
  font-weight: 700;
  color: #2563eb;
  font-size: 1rem;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const SkillLevel = styled(motion.div)`
  font-size: 0.8rem;
  color: #b5cdf6;
  opacity: 0;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

const SkillBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(30, 64, 175, 0.1));
  border-radius: 1.25rem;
`;

const GlowEffect = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.3), transparent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(20px);
`;

const skills = [
  { name: "Java", icon: FaJava, color: "#e76f00", level: "Expert" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#0fa76f", level: "Advanced" },
  { name: "React", icon: FaReact, color: "#61dafb", level: "Advanced" },
  { name: "Node.js", icon: FaNodeJs, color: "#65b94b", level: "Intermediate" },
  { name: "AWS", icon: FaAws, color: "#ff9900", level: "Intermediate" },
  { name: "Linux", icon: FaLinux, color: "#000", level: "Advanced" },
  { name: "Docker", icon: SiDocker, color: "#2496ed", level: "Intermediate" },
  { name: "MongoDB", icon: SiMongodb, color: "#4fa13e", level: "Intermediate" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", level: "Advanced" }
];

export default function EnhancedSkillsGrid() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <SkillsContainer>
      {skills.map((skill, idx) => (
        <SkillCard
          key={skill.name}
          initial={{ opacity: 0, y: 50, rotateY: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          onHoverStart={() => setHoveredSkill(skill.name)}
          onHoverEnd={() => setHoveredSkill(null)}
          whileHover={{ 
            scale: 1.1, 
            rotateY: 5,
            rotateX: 5,
            transformPerspective: 1000
          }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence>
            {hoveredSkill === skill.name && (
              <>
                <SkillBackground
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <GlowEffect
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </>
            )}
          </AnimatePresence>
          
          <SkillIcon
            animate={hoveredSkill === skill.name ? {
              rotate: [0, -10, 10, 0],
              scale: [1, 1.2, 1.2, 1]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <skill.icon style={{ color: skill.color }} />
          </SkillIcon>
          
          <SkillName
            animate={hoveredSkill === skill.name ? {
              color: "#fff",
              scale: 1.1
            } : {
              color: "#2563eb",
              scale: 1
            }}
          >
            {skill.name}
          </SkillName>
          
          <SkillLevel
            animate={hoveredSkill === skill.name ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 10
            }}
          >
            {skill.level}
          </SkillLevel>
        </SkillCard>
      ))}
    </SkillsContainer>
  );
}
