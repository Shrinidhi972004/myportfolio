import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
`;

const CounterCard = styled(motion.div)`
  background: rgba(16,42,67,0.8);
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  text-align: center;
  border: 2px solid rgba(37, 99, 235, 0.2);
  min-width: 150px;
  
  &:hover {
    border-color: rgba(37, 99, 235, 0.5);
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.3);
  }
`;

const CounterNumber = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 800;
  color: #2563eb;
  line-height: 1;
`;

const CounterLabel = styled.div`
  font-size: 1rem;
  color: #b5cdf6;
  margin-top: 0.5rem;
  font-weight: 500;
`;

export default function AnimatedCounter({ 
  endValue, 
  label, 
  duration = 2, 
  suffix = "",
  delay = 0 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <CounterCard
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <CounterNumber
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration }}
      >
        {isInView && (
          <motion.span
            initial={{ textContent: 0 }}
            animate={{ textContent: endValue }}
            transition={{ duration, ease: "easeOut" }}
            onUpdate={(latest) => {
              if (ref.current) {
                ref.current.textContent = Math.round(latest.textContent) + suffix;
              }
            }}
          >
            0{suffix}
          </motion.span>
        )}
      </CounterNumber>
      <CounterLabel>{label}</CounterLabel>
    </CounterCard>
  );
}

export function StatsSection() {
  const stats = [
    { value: 20, label: "Projects Completed", suffix: "+" },
    { value: 5, label: "Technologies Mastered", suffix: "+" },
    { value: 2, label: "Years Experience", suffix: "+" },
    { value: 100, label: "Coffee Cups", suffix: "+" }
  ];

  return (
    <CounterContainer>
      {stats.map((stat, index) => (
        <AnimatedCounter
          key={stat.label}
          endValue={stat.value}
          label={stat.label}
          suffix={stat.suffix}
          delay={index * 0.2}
        />
      ))}
    </CounterContainer>
  );
}
