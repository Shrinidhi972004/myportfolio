import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { shouldForwardProp } from '../utils/propFilter';

const TiltCard = styled(motion.div).withConfig({
  shouldForwardProp,
})`
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
  cursor: pointer;
  perspective: 1000px;
  transform-style: preserve-3d;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(37,99,235,0.1) 50%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  svg {
    font-size: 2.13rem;
    margin-bottom: 0.12rem;
    transition: all 0.3s ease;
  }
`;

export default function Enhanced3DSkillCard({ 
  children, 
  onHover, 
  className,
  ...motionProps 
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / centerY * -15;
    const tiltY = (x - centerX) / centerX * 15;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <TiltCard
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(20px)`,
      }}
      whileHover={{ 
        scale: 1.1,
        color: "#1e90ff",
        boxShadow: "0 15px 35px rgba(37,99,235,0.4)",
        transition: { duration: 0.2 }
      }}
      {...motionProps}
    >
      {children}
    </TiltCard>
  );
}
