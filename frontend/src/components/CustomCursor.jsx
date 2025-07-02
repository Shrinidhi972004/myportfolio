import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../contexts/DarkThemeContext';

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: ${props => props.isDark ? '#2563eb' : '#3b82f6'};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorRing = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  border: 2px solid ${props => props.isDark ? '#1e90ff' : '#2563eb'};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.6;
`;

const CursorTrail = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 4px;
  height: 4px;
  background: ${props => props.isDark ? '#1e90ff' : '#2563eb'};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9997;
  opacity: 0.4;
`;

export default function CustomCursor() {
  // All hooks in consistent order
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState([]);
  const [trailCounter, setTrailCounter] = useState(0);

  // Motion values and springs
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const ringXSpring = useSpring(cursorX, { damping: 20, stiffness: 300 });
  const ringYSpring = useSpring(cursorY, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
      setIsVisible(true);

      // Add trail effect with unique key
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setTrails(prev => [
        { x: e.clientX - 2, y: e.clientY - 2, id: uniqueId },
        ...prev.slice(0, 8)
      ]);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hovering over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.matches('a, button, [role="button"], input, textarea, select') ||
                           target.closest('a, button, [role="button"], input, textarea, select');
      setIsHovering(isInteractive);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Remove old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails(prev => prev.filter(trail => {
        const timestamp = parseInt(trail.id.split('-')[0]);
        return Date.now() - timestamp < 500;
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Hide on mobile devices
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail dots */}
      {trails.map((trail, index) => (
        <CursorTrail
          key={trail.id}
          isDark={isDark}
          style={{
            x: trail.x,
            y: trail.y,
          }}
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{ 
            scale: 0,
            opacity: 0,
            transition: { duration: 0.5, delay: index * 0.05 }
          }}
        />
      ))}

      {/* Main cursor dot */}
      <CursorDot
        isDark={isDark}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Cursor ring */}
      <CursorRing
        isDark={isDark}
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </>
  );
}
