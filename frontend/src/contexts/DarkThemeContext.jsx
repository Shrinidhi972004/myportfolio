import { createContext, useContext } from 'react';

const DarkThemeContext = createContext();

export const useTheme = () => {
  return {
    isDark: true,
    currentTheme: {
      name: 'dark',
      colors: {
        primary: '#1e90ff',
        primaryHover: '#2563eb', 
        secondary: '#aac8f5',
        background: '#091a28',
        backgroundSecondary: 'rgba(16,42,67,0.92)',
        backgroundCard: 'rgba(16,42,67,0.85)',
        backgroundNavbar: 'rgba(9,26,40,0.97)',
        text: '#ffffff',
        textSecondary: '#aac8f5',
        textMuted: '#718096',
        border: 'rgba(37,99,235,0.10)',
        shadow: 'rgba(37,99,235,0.10)',
        accent: '#2563eb',
        gradient: 'linear-gradient(135deg, #091a28 0%, #102a43 100%)',
        cardGradient: 'linear-gradient(145deg, rgba(16,42,67,0.8) 0%, rgba(37,99,235,0.1) 100%)',
      }
    },
    toggleTheme: () => {}, // No-op function since we're locked to dark mode
  };
};

// Simple provider that just passes children through since we're using the hook above
export const DarkThemeProvider = ({ children }) => {
  return (
    <DarkThemeContext.Provider value={{}}>
      {children}
    </DarkThemeContext.Provider>
  );
};