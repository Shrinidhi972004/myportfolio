import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { shouldForwardProp } from '../utils/propFilter';

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const BaseButton = styled(motion.button).withConfig({
  shouldForwardProp,
})`
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  outline: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:hover::before {
    width: 300px;
    height: 300px;
  }
`;

const GlowButton = styled(BaseButton)`
  background: transparent;
  color: #2563eb;
  padding: 1rem 2rem;
  border: 2px solid #2563eb;
  border-radius: 8px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.4), transparent);
    animation: ${shimmer} 2s infinite;
  }
  
  &:hover {
    box-shadow: 0 0 30px rgba(37, 99, 235, 0.5);
    color: white;
    background: rgba(37, 99, 235, 0.1);
  }
`;

const RippleEffect = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  animation: ${ripple} 0.6s linear;
`;

export function AnimatedButton({ 
  children, 
  variant = "primary", 
  onClick, 
  disabled = false,
  className,
  ...props 
}) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    if (disabled) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    if (onClick) onClick(e);
  };

  const ButtonComponent = variant === "glow" ? GlowButton : PrimaryButton;

  return (
    <ButtonComponent
      className={className}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <RippleEffect
          key={ripple.id}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
        />
      ))}
    </ButtonComponent>
  );
}

export function FloatingActionButton({ children, onClick, className, ...props }) {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #2563eb, #1e40af)',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)'
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: '0 6px 25px rgba(37, 99, 235, 0.5)'
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
