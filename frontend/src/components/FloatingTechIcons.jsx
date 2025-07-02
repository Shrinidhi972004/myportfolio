import styled from "styled-components";
import { motion } from "framer-motion";

const FloatingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '24px'};
  color: ${props => props.color || '#2563eb'};
  opacity: 0.4;
`;

const TechIcon = ({ children, ...props }) => (
  <FloatingIcon {...props}>
    {children}
  </FloatingIcon>
);

export default function FloatingTechIcons() {
  const icons = [
    { id: 1, icon: "⚛️", x: "10%", y: "20%" },
    { id: 2, icon: "☕", x: "85%", y: "15%" },
    { id: 3, icon: "🐳", x: "15%", y: "70%" },
    { id: 4, icon: "☁️", x: "80%", y: "65%" },
    { id: 5, icon: "🚀", x: "50%", y: "10%" },
    { id: 6, icon: "⚡", x: "90%", y: "40%" },
  ];

  return (
    <FloatingContainer>
      {icons.map((item) => (
        <TechIcon
          key={item.id}
          style={{ left: item.x, top: item.y }}
          size="28px"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          {item.icon}
        </TechIcon>
      ))}
    </FloatingContainer>
  );
}
