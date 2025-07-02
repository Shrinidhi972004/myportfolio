import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TextContainer = styled.div`
  overflow: hidden;
  position: relative;
`;

const AnimatedText = styled(motion.span)`
  display: inline-block;
`;

const Cursor = styled(motion.span)`
  display: inline-block;
  background: #2563eb;
  width: 3px;
  height: 1.2em;
  margin-left: 2px;
`;

// Typewriter Effect
export function TypewriterText({ text, speed = 100, delay = 0, className }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, delay);

    return () => clearTimeout(startTimer);
  }, [currentIndex, text, speed, delay]);

  return (
    <TextContainer className={className}>
      <AnimatedText>{displayText}</AnimatedText>
      {showCursor && (
        <Cursor
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
      )}
    </TextContainer>
  );
}

// Slide Up Text Reveal
export function SlideUpText({ children, delay = 0, className }) {
  const words = children.split(" ");
  
  return (
    <TextContainer className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.3em" }}
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + (i * 0.1),
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true }}
        >
          {word}
        </motion.span>
      ))}
    </TextContainer>
  );
}

// Character by character reveal
export function CharacterReveal({ children, delay = 0, className }) {
  const characters = children.split("");
  
  return (
    <TextContainer className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, rotateY: 90 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + (i * 0.03),
            ease: "easeOut"
          }}
          viewport={{ once: true }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </TextContainer>
  );
}
