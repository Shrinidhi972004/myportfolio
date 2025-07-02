import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const float1 = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(-3deg); }
  75% { transform: translateY(-15px) rotate(2deg); }
`;

const float2 = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-15px) translateX(10px); }
  66% { transform: translateY(-5px) translateX(-8px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const FloatingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.gradient || 'linear-gradient(135deg, #2563eb40, #1e40af40)'};
  animation: ${props => props.animationType === 'pulse' ? pulse : props.animationType === 'float2' ? float2 : float1} 
             ${props => props.duration || 6}s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
  filter: blur(${props => props.blur || 1}px);
`;

const GeometricShape = styled(motion.div)`
  position: absolute;
  border: 2px solid rgba(37, 99, 235, 0.2);
  background: transparent;
  animation: ${float1} ${props => props.duration || 8}s linear infinite;
  animation-delay: ${props => props.delay || 0}s;
`;

export default function FloatingElements({ density = 'medium' }) {
  const elementCount = density === 'low' ? 8 : density === 'high' ? 20 : 14;
  
  const elements = Array.from({ length: elementCount }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 3,
    animationType: ['float1', 'float2', 'pulse'][Math.floor(Math.random() * 3)],
    shape: Math.random() > 0.7 ? 'geometric' : 'circle',
    blur: Math.random() * 2 + 0.5
  }));

  return (
    <FloatingContainer>
      {elements.map(element => (
        element.shape === 'geometric' ? (
          <GeometricShape
            key={element.id}
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              top: `${element.top}%`,
              left: `${element.left}%`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%'
            }}
            duration={element.duration}
            delay={element.delay}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2, delay: element.delay }}
          />
        ) : (
          <FloatingElement
            key={element.id}
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              top: `${element.top}%`,
              left: `${element.left}%`
            }}
            duration={element.duration}
            delay={element.delay}
            animationType={element.animationType}
            blur={element.blur}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 2, delay: element.delay }}
          />
        )
      ))}
    </FloatingContainer>
  );
}
