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
  background: ${props => props.theme?.colors?.backgroundNavbar || 'rgba(9,26,40,0.97)'};
  box-shadow: 0 3px 24px 0 ${props => props.theme?.colors?.shadow || 'rgba(37,99,235,0.10)'};
  backdrop-filter: blur(18px) saturate(1.05);
  border-bottom: 1.5px solid ${props => props.theme?.colors?.border || 'rgba(37,99,235,0.10)'};
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  width: 94vw;
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 2rem;
  font-weight: 900;
  color: ${props => props.theme?.colors?.primary || '#1e90ff'};
  text-decoration: none;
  letter-spacing: -0.02em;
  margin-right: 2.7rem;
  cursor: pointer;
  transition: color 0.17s;
  &:hover { color: ${props => props.theme?.colors?.primaryHover || '#2563eb'}; }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.6rem;
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
  font-size: 1.13rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  padding: 6px 2px;
  border-radius: 8px;
  transition: color 0.15s, background 0.16s;
  &:hover {
    color: ${props => props.theme?.colors?.primary || '#1e90ff'};
    background: ${props => props.theme?.colors?.backgroundSecondary || '#102a43'};
  }
`;

const Underline = styled(motion.div)`
  position: absolute;
  left: 0; right: 0;
  bottom: -3px;
  height: 3px;
  border-radius: 2px;
  background: ${props => props.theme?.isDark 
    ? 'linear-gradient(90deg,#2563eb 30%,#1e90ff 100%)'
    : 'linear-gradient(90deg,#3b82f6 30%,#2563eb 100%)'
  };
`;

// Hamburger menu for mobile
const Hamburger = styled.div`
  width: 34px;
  height: 34px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 800px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 22px;
  height: 3px;
  background: ${props => props.theme?.colors?.primary || '#2563eb'};
  margin: 3px 0;
  border-radius: 2px;
  transition: all 0.18s;
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
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }
}

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentTheme, isDark } = useTheme();
  const { scrollY } = useScroll();
  
  // Enhanced scroll effect for navbar
  const navbarOpacity = useTransform(scrollY, [0, 100], [0.97, 0.85]);
  const navbarBlur = useTransform(scrollY, [0, 100], [18, 25]);

  // --- SCROLL SPY LOGIC ---
  useEffect(() => {
    const sectionIds = navLinks.map(link => link.id);

    function onScroll() {
      let found = false;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        // Consider section active if it's in viewport's top half or top
        if (rect.top <= NAVBAR_HEIGHT + 20 && rect.bottom > NAVBAR_HEIGHT + 20) {
          setActive(navLinks[i].label);
          found = true;
          break;
        }
      }
      // Fallback: if at very top, always Home
      if (!found && window.scrollY < 80) setActive("Home");
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
    setActive(label);
    scrollToSectionWithOffset(to);
    setMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer
        theme={currentTheme}
        style={{
          backdropFilter: useTransform(navbarBlur, latest => `blur(${latest}px) saturate(1.05)`),
          background: isDark 
            ? `rgba(9,26,40,${useTransform(navbarOpacity, latest => latest).get()})`
            : `rgba(255,255,255,${useTransform(navbarOpacity, latest => latest).get()})`
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <NavContent>
          <Logo theme={currentTheme} href="#home" onClick={() => handleNavClick("Home", "#home")}>Shrinidhi</Logo>
          <NavLinks>
            {navLinks.map(({ label, to }) => (
              <NavItem key={label}>
                <NavLink
                  theme={currentTheme}
                  onClick={e => {
                    e.preventDefault();
                    handleNavClick(label, to);
                  }}
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
