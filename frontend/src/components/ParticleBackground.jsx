import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(circle, ${props => props.color}40 0%, transparent 70%);
  border-radius: 50%;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

export default function ParticleBackground({ particleCount = 50 }) {
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: Math.random() > 0.5 ? "#2563eb" : "#1e40af",
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <ParticleContainer>
      {particles.map(particle => (
        <Particle
          key={particle.id}
          size={particle.size}
          color={particle.color}
          duration={particle.duration}
          delay={particle.delay}
          initial={{ 
            opacity: 0,
            x: `${particle.x}vw`,
            y: `${particle.y}vh`
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: particle.duration + 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </ParticleContainer>
  );
}
