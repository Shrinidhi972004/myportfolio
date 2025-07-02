import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/DarkThemeContext';

const SeparatorContainer = styled.div`
  width: 100%;
  height: 120px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;

const WaveContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['initial', 'animate', 'transition'].includes(prop),
})`
  position: absolute;
  width: 120%;
  height: 100%;
  opacity: 0.6;
`;

const WavePath = styled(motion.path).withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  fill: ${props => props.isDark 
    ? 'url(#waveGradientDark)' 
    : 'url(#waveGradientLight)'
  };
`;

const CenterIcon = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['initial', 'animate', 'transition', 'whileHover', 'isDark'].includes(prop),
})`
  position: relative;
  z-index: 2;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.isDark
    ? 'linear-gradient(135deg, #2563eb 0%, #1e90ff 100%)'
    : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.isDark ? '#ffffff' : '#1e293b'};
  box-shadow: ${props => props.isDark
    ? '0 8px 32px rgba(37, 99, 235, 0.3)'
    : '0 8px 32px rgba(59, 130, 246, 0.3)'
  };
  transition: all 0.3s ease;
`;

const FloatingDots = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Dot = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['animate', 'transition', 'isDark'].includes(prop),
})`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${props => props.isDark ? '#2563eb' : '#3b82f6'};
  border-radius: 50%;
  opacity: 0.6;
`;

export default function SectionSeparator({ icon, className }) {
  const { isDark } = useTheme();

  const dots = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <SeparatorContainer className={className}>
      <WaveContainer
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradientDark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(37, 99, 235, 0.1)" />
              <stop offset="50%" stopColor="rgba(30, 144, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(37, 99, 235, 0.1)" />
            </linearGradient>
            <linearGradient id="waveGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(37, 99, 235, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
          </defs>
          <WavePath
            isDark={isDark}
            d="M0,60 C100,20 200,100 400,60 L400,120 L0,120 Z"
          />
        </svg>
      </WaveContainer>

      <FloatingDots>
        {dots.map(dot => (
          <Dot
            key={dot.id}
            isDark={isDark}
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              delay: dot.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </FloatingDots>

      <CenterIcon
        isDark={isDark}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          type: 'spring',
          stiffness: 200,
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: 360,
          transition: { duration: 0.6 }
        }}
      >
        {icon}
      </CenterIcon>
    </SeparatorContainer>
  );
}
