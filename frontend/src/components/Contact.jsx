import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/DarkThemeContext";

// ---- Animated blue blob background ----
const AnimatedBlob = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['animate', 'transition', 'isDark'].includes(prop),
})`
  position: absolute;
  right: -100px;
  bottom: -110px;
  width: 410px;
  height: 410px;
  z-index: 0;
  background: ${props => props.isDark
    ? 'radial-gradient(circle at 80% 90%, #2563eb 0%, #1e40af 70%, #091a28 100%)'
    : 'radial-gradient(circle at 80% 90%, #3b82f6 0%, #2563eb 70%, #e0f2fe 100%)'
  };
  filter: blur(80px);
  opacity: 0.19;
  animation: blobMove 12s infinite alternate;
  @keyframes blobMove {
    0% { transform: scale(1) translateY(0px);}
    100% { transform: scale(1.11) translateY(20px);}
  }
`;

const ContactSection = styled.section.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  width: 100vw;
  min-height: 90vh;
  background: ${props => props.isDark ? '#091a28' : '#f8fafc'};
  padding: 7rem 0 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease;
`;

const SpreadRow = styled.div`
  width: 94vw;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4rem;
  position: relative;
  z-index: 2;

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: stretch;
    gap: 2.8rem;
    width: 98vw;
    max-width: 98vw;
  }
`;

const LeftInfo = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  flex: 1;
  min-width: 330px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${props => props.isDark 
    ? 'rgba(16,42,67,0.75)' 
    : 'rgba(255,255,255,0.85)'
  };
  border-radius: 2rem;
  box-shadow: ${props => props.isDark
    ? '0 4px 30px #2563eb18'
    : '0 4px 30px rgba(0,0,0,0.1)'
  };
  border: ${props => props.isDark
    ? '2px solid #1e293b'
    : '2px solid #e2e8f0'
  };
  padding: 2.4rem 2.2rem 2.2rem 2.2rem;
`;

const ContactHeading = styled.h2.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.isDark ? '#fff' : '#1e293b'};
  margin-bottom: 1.15rem;
`;

const ContactBlurb = styled.p.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  font-size: 1.12rem;
  color: ${props => props.isDark ? '#aac8f5' : '#64748b'};
  margin-bottom: 2.2rem;
  line-height: 1.65;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.6rem;
`;

const ContactIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  background: ${props => props.isDark ? '#2563eb18' : '#3b82f615'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  margin-right: 1.2rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${props => props.isDark ? '#2563eb25' : '#3b82f625'};
  }
`;

const DetailBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  font-size: 1.13rem;
  font-weight: bold;
  color: ${props => props.isDark ? '#fff' : '#1e293b'};
  margin-bottom: 0.15rem;
`;

const DetailValue = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  font-size: 1.06rem;
  color: ${props => props.isDark ? '#b5cdf6' : '#64748b'};
`;

const ContactSocials = styled.div`
  display: flex;
  gap: 1.12rem;
  margin-top: 2.2rem;
`;

const SocialBtn = styled.a.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isDark ? '#1e293b' : '#f1f5f9'};
  color: ${props => props.isDark ? '#2563eb' : '#3b82f6'};
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.25rem;
  transition: all 0.17s ease;
  text-decoration: none;
  box-shadow: ${props => props.isDark
    ? '0 1px 6px rgba(37,99,235,0.09)'
    : '0 1px 6px rgba(0,0,0,0.1)'
  };
  
  &:hover {
    background: ${props => props.isDark ? '#2563eb' : '#3b82f6'};
    color: #fff;
    transform: translateY(-2px);
  }
`;

const RightForm = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  flex: 2;
  min-width: 350px;
  max-width: 680px;
  background: ${props => props.isDark 
    ? 'rgba(16,42,67,0.62)' 
    : 'rgba(255,255,255,0.75)'
  };
  border-radius: 2rem;
  border: ${props => props.isDark
    ? '2px solid #1e293b'
    : '2px solid #e2e8f0'
  };
  box-shadow: ${props => props.isDark
    ? '0 6px 38px #2563eb16'
    : '0 6px 38px rgba(0,0,0,0.08)'
  };
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2.5rem 2.7rem;
`;

const RightHeading = styled.h2.withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  font-size: 2rem;
  font-weight: 800;
  color: ${props => props.isDark ? '#fff' : '#1e293b'};
  margin-bottom: 2.2rem;
  text-align: left;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1.1rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.7rem;
  }
`;

const Input = styled(motion.input).withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  flex: 1;
  padding: 1.4rem;
  border: ${props => props.isDark 
    ? '1px solid #2563eb33' 
    : '1px solid #cbd5e1'
  };
  border-radius: 0.8rem;
  font-size: 1.15rem;
  background: ${props => props.isDark ? '#091a28' : '#ffffff'};
  color: ${props => props.isDark ? '#fff' : '#1e293b'};
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${props => props.isDark ? '#2563eb' : '#3b82f6'};
    box-shadow: ${props => props.isDark
      ? '0 0 0 3px rgba(37, 99, 235, 0.1)'
      : '0 0 0 3px rgba(59, 130, 246, 0.1)'
    };
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: ${props => props.isDark ? '#64748b' : '#94a3b8'};
    transition: all 0.3s ease;
  }
  
  &:focus::placeholder {
    opacity: 0.7;
    transform: translateY(-5px);
  }
`;

const Textarea = styled(motion.textarea).withConfig({
  shouldForwardProp: (prop) => !['isDark'].includes(prop),
})`
  padding: 1.4rem;
  border: ${props => props.isDark 
    ? '1px solid #2563eb33' 
    : '1px solid #cbd5e1'
  };
  border-radius: 0.8rem;
  font-size: 1.15rem;
  background: ${props => props.isDark ? '#091a28' : '#ffffff'};
  color: ${props => props.isDark ? '#fff' : '#1e293b'};
  min-height: 180px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${props => props.isDark ? '#2563eb' : '#3b82f6'};
    box-shadow: ${props => props.isDark
      ? '0 0 0 3px rgba(37, 99, 235, 0.1)'
      : '0 0 0 3px rgba(59, 130, 246, 0.1)'
    };
    transform: translateY(-2px);
  }
  
  &::placeholder {
    color: ${props => props.isDark ? '#64748b' : '#94a3b8'};
    transition: all 0.3s ease;
  }
  
  &:focus::placeholder {
    opacity: 0.7;
    transform: translateY(-5px);
  }
`;

const SubmitBtn = styled(motion.button)`
  padding: 1.4rem 2.5rem;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  color: #fff;
  border: none;
  border-radius: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 180px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover { 
    background: linear-gradient(90deg, #1e40af 0%, #2563eb 100%);
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(37,99,235,0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const SendIcon = (
  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3.4,20.29,21.39,13a2,2,0,0,0,0-3.82L3.4,3.71A2,2,0,0,0,1,5.53V18.47A2,2,0,0,0,3.4,20.29ZM3,18.47V5.53L21,12Z" />
  </svg>
);

const LocationIcon = ({ isDark }) => (
  <svg width="28" height="28" fill={isDark ? "#2563eb" : "#3b82f6"} viewBox="0 0 24 24">
    <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.3 10.59 8.02 11.1a1.002 1.002 0 0 0 1.24 0C13.7 21.59 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C10.07 18.15 5 13.89 5 11c0-3.86 3.14-7 7-7s7 3.14 7 7c0 2.89-5.07 7.15-7 8.88z"/>
    <circle cx="12" cy="11" r="2" />
  </svg>
);

const EmailIcon = ({ isDark }) => (
  <svg width="28" height="28" fill={isDark ? "#2563eb" : "#3b82f6"} viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13l8-6.99V6H4zm16 2.25-7.09 6.18c-.3.26-.7.26-1 0L4 8.25V18h16V8.25z"/>
  </svg>
);

const PhoneIcon = ({ isDark }) => (
  <svg width="28" height="28" fill={isDark ? "#2563eb" : "#3b82f6"} viewBox="0 0 24 24">
    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20c0 1.1-.9 2-2 2C6.48 22 2 17.52 2 12c0-1.1.9-2 2-2h3a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1.003 1.003 0 0 1-.24 1.01l-2.2 2.2z"/>
  </svg>
);

const getSocialIcons = (isDark) => [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/shrinidhi-upadhyaya-82114a26a/",
    icon: (
      <svg width="22" height="22" fill={isDark ? "#2563eb" : "#3b82f6"} viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.804-1.75-1.732s.784-1.732 1.75-1.732c.965 0 1.75.804 1.75 1.732s-.785 1.732-1.75 1.732zm13.5 10.268h-3v-4.604c0-1.1-.021-2.516-1.533-2.516-1.535 0-1.77 1.198-1.77 2.434v4.686h-3v-9h2.881v1.232h.041c.401-.762 1.379-1.564 2.838-1.564 3.037 0 3.6 2 3.6 4.59v4.742z"/>
      </svg>
    )
  },
  {
    label: "GitHub",
    url: "https://github.com/Shrinidhi972004",
    icon: (
      <svg width="22" height="22" fill={isDark ? "#2563eb" : "#3b82f6"} viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.236 1.839 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.305-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.649.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/Sh_ri_ni_dhi/",
    icon: (
      <svg width="22" height="22" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="instagram-gradient" cx="32%" cy="106%" r="150%">
            <stop offset="0%" stopColor="#ffd600"/>
            <stop offset="10%" stopColor="#ff8a00"/>
            <stop offset="50%" stopColor="#ff0069"/>
            <stop offset="100%" stopColor="#d300c5"/>
          </radialGradient>
          <radialGradient id="purple-overlay" cx="70%" cy="10%" r="100%">
            <stop offset="0%" stopColor="#4f5bd5" stopOpacity="0.8"/>
            <stop offset="40%" stopColor="#962fbf" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#d300c5" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect x="25" y="25" width="150" height="150" rx="40" ry="40" fill="url(#instagram-gradient)"/>
        <rect x="25" y="25" width="150" height="150" rx="40" ry="40" fill="url(#purple-overlay)"/>
        <rect x="50" y="50" width="100" height="100" rx="20" ry="20" fill="none" stroke="white" strokeWidth="6"/>
        <circle cx="100" cy="100" r="25" fill="none" stroke="white" strokeWidth="6"/>
        <circle cx="130" cy="70" r="6" fill="white"/>
      </svg>
    )
  }
];

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://myportfolio-9n19.onrender.com";

export default function Contact() {
  const { isDark } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  
  const socials = getSocialIcons(isDark);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      alert("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("There was an error sending your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ContactSection id="contact" isDark={isDark}>
      <AnimatedBlob
        isDark={isDark}
        animate={{
          scale: [1, 1.09, 1],
          y: [0, 18, 0],
          x: [0, 13, -7, 0],
          rotate: [0, 8, -5, 0],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <SpreadRow>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <LeftInfo isDark={isDark}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ContactHeading isDark={isDark}>Contact Information</ContactHeading>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <ContactBlurb isDark={isDark}>
                Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
              </ContactBlurb>
            </motion.div>
          {[
            {
              icon: <LocationIcon isDark={isDark} />,
              label: "Location",
              value: "Mangalore, Karnataka, India",
              href: "https://www.google.com/maps/place/Mangalore,+Karnataka",
              title: "View on Google Maps"
            },
            {
              icon: <EmailIcon isDark={isDark} />,
              label: "Email",
              value: "shrinidhiupadhyaya00@gmail.com",
              href: "mailto:shrinidhiupadhyaya00@gmail.com",
              title: "Send Email"
            },
            {
              icon: <PhoneIcon isDark={isDark} />,
              label: "Phone",
              value: "+91 7204200386"
            }
          ].map((detail, idx) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
              viewport={{ once: true }}
            >
              <ContactDetail>
                <ContactIcon
                  isDark={isDark}
                  as={detail.href ? "a" : "div"}
                  href={detail.href}
                  target={detail.href ? "_blank" : undefined}
                  rel={detail.href ? "noopener noreferrer" : undefined}
                  title={detail.title}
                  style={{ display: "flex" }}
                >
                  {detail.icon}
                </ContactIcon>
                <DetailBody>
                  <DetailLabel isDark={isDark}>{detail.label}</DetailLabel>
                  <DetailValue isDark={isDark}>{detail.value}</DetailValue>
                </DetailBody>
              </ContactDetail>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <ContactSocials>
              {socials.map((social, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.0 + idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SocialBtn
                    isDark={isDark}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.label}
                  >
                    {social.icon}
                  </SocialBtn>
                </motion.div>
              ))}
            </ContactSocials>
          </motion.div>
        </LeftInfo>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <RightForm isDark={isDark}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <RightHeading isDark={isDark}>Get In Touch</RightHeading>
            </motion.div>
                        <ContactForm onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Row>
                  <Input
                    isDark={isDark}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  <Input
                    isDark={isDark}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </Row>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Input
                  isDark={isDark}
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <Textarea
                  isDark={isDark}
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <SubmitBtn 
                  type="submit" 
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {SendIcon} {loading ? "Sending..." : "Send Message"}
                </SubmitBtn>
              </motion.div>
            </ContactForm>
          </RightForm>
        </motion.div>
      </SpreadRow>
    </ContactSection>
  );
}

