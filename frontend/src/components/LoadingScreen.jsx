import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #091a28 0%, #1e293b 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LogoContainer = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
  margin-bottom: 2rem;
`;

const Logo = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #2563eb;
  text-shadow: 0 0 30px rgba(37, 99, 235, 0.5);
  letter-spacing: -0.02em;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 4px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1rem;
`;

const Progress = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  border-radius: 2px;
`;

const LoadingText = styled.p`
  color: #b5cdf6;
  font-size: 1.1rem;
  margin-top: 1rem;
  font-weight: 500;
`;

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 300);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <LoaderContainer
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <LogoContainer>
            <Logo>SU</Logo>
          </LogoContainer>
          
          <ProgressBar>
            <Progress
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </ProgressBar>
          
          <LoadingText>
            Loading Portfolio... {Math.round(progress)}%
          </LoadingText>
        </LoaderContainer>
      )}
    </AnimatePresence>
  );
}
