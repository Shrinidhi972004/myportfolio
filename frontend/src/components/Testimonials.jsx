import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../contexts/DarkThemeContext";

const TestimonialsSection = styled.section`
  width: 100vw;
  min-height: 80vh;
  background: #091a28;
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${props => props.isDark ? '#fff' : '#1e293b'};
  margin-bottom: 3rem;
  text-align: center;
`;

const TestimonialContainer = styled.div`
  max-width: 800px;
  width: 90vw;
  margin: 0 auto;
  position: relative;
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(16,42,67,0.8);
  border-radius: 2rem;
  padding: 3rem 2.5rem;
  text-align: center;
  border: 2px solid rgba(37, 99, 235, 0.2);
  backdrop-filter: blur(10px);
`;

const TestimonialText = styled.p`
  font-size: 1.3rem;
  color: #b5cdf6;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-style: italic;
  
  &::before, &::after {
    content: '"';
    color: #2563eb;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.isDark ? '#ffffff' : '#ffffff'};
  font-weight: bold;
  font-size: 1.2rem;
`;

const AuthorDetails = styled.div`
  text-align: left;
`;

const AuthorName = styled.h4`
  color: ${props => props.isDark ? '#fff' : '#1e293b'};
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

const AuthorRole = styled.p`
  color: #2563eb;
  margin: 0.2rem 0 0 0;
  font-size: 0.9rem;
`;

const Navigation = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
`;

const NavDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.active ? '#2563eb' : 'rgba(37, 99, 235, 0.3)'};
  
  &:hover {
    background: #2563eb;
    transform: scale(1.2);
  }
`;

const testimonials = [
  {
    text: "Shrinidhi delivered an exceptional web application with clean code and excellent user experience. His attention to detail and technical skills are outstanding.",
    author: "John Smith",
    role: "Project Manager at TechCorp",
    avatar: "JS"
  },
  {
    text: "Working with Shrinidhi was a great experience. He understood our requirements perfectly and delivered ahead of schedule with high-quality code.",
    author: "Sarah Johnson",
    role: "Lead Developer at StartupXYZ",
    avatar: "SJ"
  },
  {
    text: "Shrinidhi's expertise in full-stack development and DevOps practices helped us streamline our deployment process significantly.",
    author: "Mike Chen",
    role: "CTO at InnovateLab",
    avatar: "MC"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDark } = useTheme();

  return (
    <TestimonialsSection>
      <Title isDark={isDark}>What People Say</Title>
      
      <TestimonialContainer>
        <TestimonialCard
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TestimonialText>
            {testimonials[currentIndex].text}
          </TestimonialText>
          
          <AuthorInfo>
            <AuthorAvatar isDark={isDark}>
              {testimonials[currentIndex].avatar}
            </AuthorAvatar>
            <AuthorDetails>
              <AuthorName isDark={isDark}>{testimonials[currentIndex].author}</AuthorName>
              <AuthorRole>{testimonials[currentIndex].role}</AuthorRole>
            </AuthorDetails>
          </AuthorInfo>
        </TestimonialCard>
        
        <Navigation>
          {testimonials.map((_, index) => (
            <NavDot
              key={index}
              active={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Navigation>
      </TestimonialContainer>
    </TestimonialsSection>
  );
}
