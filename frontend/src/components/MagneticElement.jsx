import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const MagneticContainer = styled(motion.div)`
  position: relative;
  display: inline-block;
`;

export default function MagneticElement({ 
  children, 
  strength = 0.3, 
  range = 100,
  className,
  ...props 
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < range) {
        const magnetStrength = (range - distance) / range;
        setPosition({
          x: deltaX * strength * magnetStrength,
          y: deltaY * strength * magnetStrength
        });
        setIsHovering(true);
      } else {
        setPosition({ x: 0, y: 0 });
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
      setIsHovering(false);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, range]);

  return (
    <MagneticContainer
      ref={elementRef}
      className={className}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovering ? 1.05 : 1
      }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        mass: 0.5
      }}
      {...props}
    >
      {children}
    </MagneticContainer>
  );
}
