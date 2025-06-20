import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";

// ---- Animated blue blob background ----
const AnimatedBlob = styled(motion.div)`
  position: absolute;
  right: -100px;
  bottom: -110px;
  width: 410px;
  height: 410px;
  z-index: 0;
  background: radial-gradient(circle at 80% 90%, #2563eb 0%, #1e40af 70%, #091a28 100%);
  filter: blur(80px);
  opacity: 0.19;
  animation: blobMove 12s infinite alternate;
  @keyframes blobMove {
    0% { transform: scale(1) translateY(0px);}
    100% { transform: scale(1.11) translateY(20px);}
  }
`;

const ContactSection = styled.section`
  width: 100vw;
  min-height: 90vh;
  background: #091a28;
  padding: 7rem 0 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
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

const LeftInfo = styled.div`
  flex: 1;
  min-width: 330px;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: rgba(16,42,67,0.75);
  border-radius: 2rem;
  box-shadow: 0 4px 30px #2563eb18;
  border: 2px solid #1e293b;
  padding: 2.4rem 2.2rem 2.2rem 2.2rem;
`;

const ContactHeading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.15rem;
`;

const ContactBlurb = styled.p`
  font-size: 1.12rem;
  color: #aac8f5;
  margin-bottom: 2.2rem;
  line-height: 1.65;
`;

const ContactDetail = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.6rem;
`;

const ContactIcon = styled.div`
  background: #2563eb18;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  margin-right: 1.2rem;
`;

const DetailBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.div`
  font-size: 1.13rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.15rem;
`;

const DetailValue = styled.div`
  font-size: 1.06rem;
  color: #b5cdf6;
`;

const ContactSocials = styled.div`
  display: flex;
  gap: 1.12rem;
  margin-top: 2.2rem;
`;

const SocialBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e293b;
  color: #2563eb;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.25rem;
  transition: background 0.17s, color 0.17s, box-shadow 0.17s;
  text-decoration: none;
  box-shadow: 0 1px 6px rgba(37,99,235,0.09);
  &:hover {
    background: #2563eb;
    color: #fff;
  }
`;

const RightForm = styled.div`
  flex: 2;
  min-width: 350px;
  max-width: 680px;
  background: rgba(16,42,67,0.62);
  border-radius: 2rem;
  border: 2px solid #1e293b;
  box-shadow: 0 6px 38px #2563eb16;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 2.5rem 2.7rem;
`;

const RightHeading = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
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

const Input = styled.input`
  flex: 1;
  padding: 1.09rem;
  border: 1px solid #2563eb33;
  border-radius: 0.7rem;
  font-size: 1.09rem;
  background: #091a28;
  color: #fff;
`;

const Textarea = styled.textarea`
  padding: 1.09rem;
  border: 1px solid #2563eb33;
  border-radius: 0.7rem;
  font-size: 1.09rem;
  background: #091a28;
  color: #fff;
  min-height: 130px;
  resize: vertical;
`;

const SubmitBtn = styled.button`
  padding: 1.12rem;
  background: linear-gradient(90deg, #2563eb 0%, #1e40af 100%);
  color: #fff;
  border: none;
  border-radius: 0.7rem;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  justify-content: center;
  transition: background 0.18s;
  &:hover { background: linear-gradient(90deg, #1e40af 0%, #2563eb 100%);}
`;

const SendIcon = (
  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3.4,20.29,21.39,13a2,2,0,0,0,0-3.82L3.4,3.71A2,2,0,0,0,1,5.53V18.47A2,2,0,0,0,3.4,20.29ZM3,18.47V5.53L21,12Z" />
  </svg>
);

const LocationIcon = (
  <svg width="28" height="28" fill="#2563eb" viewBox="0 0 24 24">
    <path d="M12 2C7.03 2 3 6.03 3 11c0 5.25 7.3 10.59 8.02 11.1a1.002 1.002 0 0 0 1.24 0C13.7 21.59 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 17.88C10.07 18.15 5 13.89 5 11c0-3.86 3.14-7 7-7s7 3.14 7 7c0 2.89-5.07 7.15-7 8.88z"/>
    <circle cx="12" cy="11" r="2" />
  </svg>
);
const EmailIcon = (
  <svg width="28" height="28" fill="#2563eb" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13l8-6.99V6H4zm16 2.25-7.09 6.18c-.3.26-.7.26-1 0L4 8.25V18h16V8.25z"/>
  </svg>
);
const PhoneIcon = (
  <svg width="28" height="28" fill="#2563eb" viewBox="0 0 24 24">
    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20c0 1.1-.9 2-2 2C6.48 22 2 17.52 2 12c0-1.1.9-2 2-2h3a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1.003 1.003 0 0 1-.24 1.01l-2.2 2.2z"/>
  </svg>
);

const socials = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/shrinidhi-upadhyaya-82114a26a/",
    icon: (
      <svg width="22" height="22" fill="#2563eb" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.804-1.75-1.732s.784-1.732 1.75-1.732c.965 0 1.75.804 1.75 1.732s-.785 1.732-1.75 1.732zm13.5 10.268h-3v-4.604c0-1.1-.021-2.516-1.533-2.516-1.535 0-1.77 1.198-1.77 2.434v4.686h-3v-9h2.881v1.232h.041c.401-.762 1.379-1.564 2.838-1.564 3.037 0 3.6 2 3.6 4.59v4.742z"/>
      </svg>
    )
  },
  {
    label: "GitHub",
    url: "https://github.com/Shrinidhi972004",
    icon: (
      <svg width="22" height="22" fill="#2563eb" viewBox="0 0 24 24">
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

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

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
    <ContactSection id="contact">
      <AnimatedBlob
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
        <LeftInfo>
          <ContactHeading>Contact Information</ContactHeading>
          <ContactBlurb>
            Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
          </ContactBlurb>
          <ContactDetail>
            <ContactIcon
              as="a"
              href="https://www.google.com/maps/place/Mangalore,+Karnataka"
              target="_blank"
              rel="noopener noreferrer"
              title="View on Google Maps"
              style={{ display: "flex" }}
            >
              {LocationIcon}
            </ContactIcon>
            <DetailBody>
              <DetailLabel>Location</DetailLabel>
              <DetailValue>Mangalore, Karnataka, India</DetailValue>
            </DetailBody>
          </ContactDetail>
          <ContactDetail>
            <ContactIcon
              as="a"
              href="mailto:shrinidhiupadhyaya00@gmail.com"
              title="Send Email"
              style={{ display: "flex" }}
            >
              {EmailIcon}
            </ContactIcon>
            <DetailBody>
              <DetailLabel>Email</DetailLabel>
              <DetailValue>shrinidhiupadhyaya00@gmail.com</DetailValue>
            </DetailBody>
          </ContactDetail>
          <ContactDetail>
            <ContactIcon>{PhoneIcon}</ContactIcon>
            <DetailBody>
              <DetailLabel>Phone</DetailLabel>
              <DetailValue>+91 7204200386</DetailValue>
            </DetailBody>
          </ContactDetail>
          <ContactSocials>
            {socials.map((social, idx) => (
              <SocialBtn
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.label}
              >
                {social.icon}
              </SocialBtn>
            ))}
          </ContactSocials>
        </LeftInfo>

        <RightForm>
          <RightHeading>Get In Touch</RightHeading>
          <ContactForm onSubmit={handleSubmit}>
            <Row>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Row>
            <Input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <SubmitBtn type="submit" disabled={loading}>
              {SendIcon} {loading ? "Sending..." : "Send Message"}
            </SubmitBtn>
          </ContactForm>
        </RightForm>
      </SpreadRow>
    </ContactSection>
  );
}

