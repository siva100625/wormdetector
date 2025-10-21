import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

// --- STYLES OBJECT ---
const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 40,
    width: '100%',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)', // For Safari support
  },
  navContainer: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0.75rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: 700,
    textDecoration: 'none',
  },
  navLinksContainer: {
    // In a real-world scenario without CSS classes, making this responsive 
    // would require a JS-based media query listener.
    // For this conversion, we'll assume a desktop view.
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    fontSize: '1.125rem',
  },
  navButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'inherit',
    fontSize: 'inherit',
    padding: 0,
    transition: 'color 0.2s',
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  themeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'inherit',
    fontSize: '1.25rem',
    padding: 0,
    display: 'flex',
  },
  // --- DYNAMIC STYLES ---
  lightNav: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
  darkNav: { backgroundColor: 'rgba(15, 23, 42, 0.8)' },
  lightBrand: { color: 'var(--primary-light)' },
  darkBrand: { color: 'var(--primary-dark)' },
  lightHover: { color: 'var(--primary-light)' },
  darkHover: { color: 'var(--primary-dark)' },
};
// --- END STYLES ---

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    // State to manage hover effects for each button
    const [hoveredButton, setHoveredButton] = useState(null);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const isDarkMode = theme === 'dark';

    // Combine base and dynamic styles
    const navStyle = {
        ...styles.nav,
        ...(isDarkMode ? styles.darkNav : styles.lightNav),
    };

    const brandStyle = {
        ...styles.brand,
        ...(isDarkMode ? styles.darkBrand : styles.lightBrand),
    };

    // Function to get styles for nav buttons, including hover effect
    const getNavButtonStyle = (buttonName) => ({
        ...styles.navButton,
        ...(hoveredButton === buttonName && (isDarkMode ? styles.darkHover : styles.lightHover)),
    });

    return (
        <nav style={navStyle}>
            <div style={styles.navContainer}>
                <Link to="/" style={brandStyle}>
                    WormDetector 🐛
                </Link>

                <div style={styles.navLinksContainer}>
                    <button 
                        style={getNavButtonStyle('what-we-do')}
                        onClick={() => scrollToSection('what-we-do')}
                        onMouseEnter={() => setHoveredButton('what-we-do')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        What We Do
                    </button>
                    <button 
                        style={getNavButtonStyle('how-it-helps')}
                        onClick={() => scrollToSection('how-it-helps')}
                        onMouseEnter={() => setHoveredButton('how-it-helps')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        How It Helps
                    </button>
                    <button 
                        style={getNavButtonStyle('about')}
                        onClick={() => scrollToSection('about')}
                        onMouseEnter={() => setHoveredButton('about')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        About
                    </button>
                </div>

                <div style={styles.actionsContainer}>
                    <button onClick={toggleTheme} style={styles.themeButton}>
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;