import styled from "styled-components";
import { motion } from "framer-motion";
import { FaJava, FaReact, FaNodeJs, FaAws, FaLinux, FaDocker } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiSpringboot, SiKubernetes } from "react-icons/si";

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(16,42,67,0.92);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(37, 99, 235, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
    border-color: rgba(37, 99, 235, 0.5);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const SkillIcon = styled.div`
  font-size: 1.5rem;
  color: #2563eb;
`;

const SkillName = styled.h4`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const SkillLevel = styled.span`
  color: #b5cdf6;
  font-size: 0.9rem;
  margin-left: auto;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  border-radius: 3px;
`;

const skills = [
  { name: "Java", icon: FaJava, level: 90 },
  { name: "React", icon: FaReact, level: 85 },
  { name: "Node.js", icon: FaNodeJs, level: 80 },
  { name: "Spring Boot", icon: SiSpringboot, level: 85 },
  { name: "MongoDB", icon: SiMongodb, level: 75 },
  { name: "PostgreSQL", icon: SiPostgresql, level: 80 },
  { name: "AWS", icon: FaAws, level: 70 },
  { name: "Docker", icon: FaDocker, level: 75 },
  { name: "Kubernetes", icon: SiKubernetes, level: 65 },
  { name: "Linux", icon: FaLinux, level: 80 },
];

export default function EnhancedSkills() {
  return (
    <SkillsContainer>
      {skills.map((skill, idx) => (
        <SkillCard
          key={skill.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <SkillHeader>
            <SkillIcon>
              <skill.icon />
            </SkillIcon>
            <SkillName>{skill.name}</SkillName>
            <SkillLevel>{skill.level}%</SkillLevel>
          </SkillHeader>
          
          <ProgressBarContainer>
            <ProgressBar
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
              viewport={{ once: true }}
            />
          </ProgressBarContainer>
        </SkillCard>
      ))}
    </SkillsContainer>
  );
}
