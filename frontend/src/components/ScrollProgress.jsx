import styled from "styled-components";
import { motion, useScroll, useSpring } from "framer-motion";

const ProgressContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 4px;
  background: rgba(16,42,67,0.3);
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 50%, #2563eb 100%);
  transform-origin: 0%;
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.3);
`;

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ProgressContainer>
      <ProgressBar style={{ scaleX }} />
    </ProgressContainer>
  );
}
