import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "../contexts/DarkThemeContext";

const FloatingButton = styled(motion.button).withConfig({
  shouldForwardProp: (prop) => !['whileHover', 'whileTap', 'initial', 'animate', 'exit', 'transition', 'theme'].includes(prop),
})`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme?.isDark 
    ? 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)'
    : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  };
  border: none;
  color: ${props => props.theme?.isDark ? '#ffffff' : '#ffffff'};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 20px ${props => props.theme?.colors?.shadow || 'rgba(37, 99, 235, 0.4)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px ${props => props.theme?.colors?.shadow || 'rgba(37, 99, 235, 0.5)'};
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
`;

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path 
      d="M12 19V5M5 12L12 5L19 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <FloatingButton
          theme={currentTheme}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowIcon />
        </FloatingButton>
      )}
    </AnimatePresence>
  );
}
