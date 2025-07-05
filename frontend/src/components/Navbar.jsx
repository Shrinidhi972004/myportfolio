import styled from "styled-components";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../contexts/DarkThemeContext";

// Nav links config
const navLinks = [
  { label: "Home", to: "#home", id: "home" },
  { label: "About", to: "#about", id: "about" },
  { label: "Projects", to: "#projects", id: "projects" },
  { label: "Contact", to: "#contact", id: "contact" }
];

const NAVBAR_HEIGHT = 72; // Adjust if your navbar height is different

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${NAVBAR_HEIGHT}px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme?.colors?.backgroundNavbar || 'rgba(9,26,40,0.95)'};
  box-shadow: 0 4px 32px 0 ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.15)'};
  backdrop-filter: blur(20px) saturate(1.1);
  border-bottom: 1px solid ${props => props.theme?.colors?.border || 'rgba(37,99,235,0.15)'};
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  width: 94vw;
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(motion.a)`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${props => props.theme?.colors?.primary || '#1e90ff'};
  text-decoration: none;
  letter-spacing: -0.01em;
  margin-right: 3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, ${props => props.theme?.colors?.primary || '#1e90ff'}, ${props => props.theme?.colors?.primaryHover || '#2563eb'});
    border-radius: 2px;
    transition: width 0.4s ease;
  }
  
  &:hover { 
    color: ${props => props.theme?.colors?.primaryHover || '#2563eb'};
    transform: scale(1.02);
    text-shadow: 0 0 20px ${props => props.theme?.colors?.primary || '#1e90ff'}40;
    
    &::after {
      width: 100%;
    }
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 800px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(motion.a)`
  color: ${props => props.theme?.colors?.secondary || '#aac8f5'};
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.02em;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme?.colors?.primary || '#1e90ff'}10;
    transition: left 0.4s ease;
  }
  
  &:hover {
    color: ${props => props.theme?.colors?.primary || '#1e90ff'};
    background: ${props => props.theme?.colors?.backgroundSecondary || '#102a43'}40;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${props => props.theme?.colors?.primary || '#1e90ff'}20;
    
    &::before {
      left: 0;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  left: 0; right: 0;
  bottom: -2px;
  height: 3px;
  border-radius: 4px;
  background: ${props => props.theme?.isDark 
    ? 'linear-gradient(90deg,#2563eb 0%,#1e90ff 50%,#2563eb 100%)'
    : 'linear-gradient(90deg,#3b82f6 0%,#2563eb 50%,#3b82f6 100%)'
  };
  box-shadow: 0 0 10px ${props => props.theme?.colors?.primary || '#1e90ff'}40;
`;

// Hamburger menu for mobile
const Hamburger = styled.div`
  width: 40px;
  height: 40px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme?.colors?.backgroundSecondary || '#102a43'}40;
  }
  
  @media (max-width: 800px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 24px;
  height: 2px;
  background: ${props => props.theme?.colors?.primary || '#2563eb'};
  margin: 2px 0;
  border-radius: 1px;
  transition: all 0.3s ease;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: ${NAVBAR_HEIGHT}px;
  left: 0;
  width: 100vw;
  background: rgba(9,26,40,0.97);
  box-shadow: 0 3px 24px 0 rgba(37,99,235,0.08);
  backdrop-filter: blur(13px);
  padding: 2.2rem 0 1.8rem 0;
  z-index: 1111;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

// --- Utility to smooth scroll with offset ---
function scrollToSectionWithOffset(hash, offset = NAVBAR_HEIGHT) {
  const elem = document.querySelector(hash);
  if (elem) {
    const rect = elem.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - offset + 1;
    
    // Use requestAnimationFrame for smoother scrolling
    window.scrollTo({ 
      top: targetY, 
      behavior: "smooth" 
    });
  } else {
    // Fallback: scroll to top if section not found
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  }
}

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  const { currentTheme, isDark } = useTheme();
  const { scrollY } = useScroll();
  
  // Enhanced scroll effect for navbar
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.97, 0.85]);
  const navbarBlur = useTransform(scrollY, [0, 100], [18, 25]);

  // --- SCROLL SPY LOGIC ---
  useEffect(() => {
    const sectionIds = navLinks.map(link => link.id);

    function onScroll() {
      if (isManualNavigation) return; // Skip if we're manually navigating
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // If we're at the bottom of the page, highlight Contact
      if (scrollTop + windowHeight >= documentHeight - 10) {
        setActive("Contact");
        return;
      }

      // Find the section that's currently most visible
      let activeSection = "Home";
      let maxVisibility = 0;

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;
        
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const sectionHeight = rect.height;
        
        // Calculate how much of the section is visible
        const viewportTop = NAVBAR_HEIGHT;
        const viewportBottom = windowHeight;
        
        const visibleTop = Math.max(sectionTop, viewportTop);
        const visibleBottom = Math.min(sectionBottom, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Calculate visibility percentage
        const visibility = visibleHeight / sectionHeight;
        
        // Special handling for Contact section - activate it when it starts coming into view
        if (sectionId === 'contact' && sectionTop <= viewportTop + 100) {
          setActive("Contact");
          return;
        }
        
        // For other sections, use the one with maximum visibility
        if (visibility > maxVisibility && visibility > 0.3) {
          maxVisibility = visibility;
          const linkObj = navLinks.find(link => link.id === sectionId);
          if (linkObj) activeSection = linkObj.label;
        }
      }
      
      setActive(activeSection);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Call once at start
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line
  }, []);

  const handleNavClick = (label, to) => {
    setIsManualNavigation(true);
    setActive(label);
    setMenuOpen(false);
    
    // Immediate scroll without delay
    scrollToSectionWithOffset(to);
    
    // Reset manual navigation flag after scroll completes
    setTimeout(() => {
      setIsManualNavigation(false);
    }, 1000);
  };

  return (
    <>
      <NavbarContainer
        theme={currentTheme}
        style={{
          backdropFilter: `blur(18px) saturate(1.05)`,
          background: isDark 
            ? 'rgba(9,26,40,0.97)'
            : 'rgba(255,255,255,0.97)'
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <NavContent>
          <Logo 
            theme={currentTheme} 
            href="#home" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Home", "#home");
            }}
          >
            Shrinidhi
          </Logo>
          <NavLinks>
            {navLinks.map(({ label, to }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <NavItem>
                  <NavLink
                    theme={currentTheme}
                    onClick={e => {
                      e.preventDefault();
                      handleNavClick(label, to);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    style={active === label ? { color: currentTheme.colors.primary } : {}}
                  >
                    {label}
                    {active === label && (
                      <Underline
                        theme={currentTheme}
                        layoutId="nav-underline"
                        initial={false}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </NavLink>
                </NavItem>
              </motion.div>
            ))}
          </NavLinks>
          <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
            <Bar theme={currentTheme} style={{ transform: menuOpen ? "rotate(42deg) translate(5px, 6px)" : "none" }} />
            <Bar theme={currentTheme} style={{ opacity: menuOpen ? 0 : 1 }} />
            <Bar theme={currentTheme} style={{ transform: menuOpen ? "rotate(-42deg) translate(5px, -7px)" : "none" }} />
          </Hamburger>
        </NavContent>
      </NavbarContainer>
      {menuOpen && (
        <MobileMenu
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={label}
              theme={currentTheme}
              style={{
                fontSize: "1.21rem",
                color: active === label ? currentTheme.colors.primary : currentTheme.colors.secondary,
                fontWeight: active === label ? 900 : 700
              }}
              onClick={e => {
                e.preventDefault();
                handleNavClick(label, to);
              }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </NavLink>
          ))}
        </MobileMenu>
      )}
    </>
  );
}
