import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

// --- STYLES OBJECT ---
const styles = {
  footer: {
    paddingTop: '2rem',    // Corresponds to py-8
    paddingBottom: '2rem', // Corresponds to py-8
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem',   // Corresponds to px-6
    textAlign: 'center',
  },
  socialsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',          // Corresponds to space-x-6
    marginBottom: '1rem',   // Corresponds to mb-4
  },
  socialLink: {
    fontSize: '1.5rem',    // Corresponds to text-2xl
    transition: 'color 0.2s ease-in-out',
  },
  copyrightText: {
    margin: 0,
  },
  // --- DYNAMIC STYLES ---
  lightFooter: { backgroundColor: 'var(--secondary-light)' },
  darkFooter: { backgroundColor: 'var(--secondary-dark)' },
  lightText: { color: '#4b5563' }, // text-gray-600
  darkText: { color: '#9ca3af' },  // dark:text-gray-400
  lightHover: { color: 'var(--primary-light)' },
  darkHover: { color: 'var(--primary-dark)' },
};
// --- END STYLES ---

const Footer = () => {
    const currentYear = new Date().getFullYear();
    // State to manage hover effects for each social link
    const [hoveredIcon, setHoveredIcon] = useState(null);

    // Determine the current theme
    const isDarkMode = document.body.classList.contains('dark');

    // Combine base and dynamic styles
    const footerStyle = {
        ...styles.footer,
        ...(isDarkMode ? styles.darkFooter : styles.lightFooter),
    };

    const containerStyle = {
        ...styles.container,
        ...(isDarkMode ? styles.darkText : styles.lightText),
    };

    // Function to get styles for social links, including hover effect
    const getSocialLinkStyle = (iconName) => ({
        ...styles.socialLink,
        ...(hoveredIcon === iconName && (isDarkMode ? styles.darkHover : styles.lightHover)),
    });

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>

                <p style={styles.copyrightText}> WormDetector</p>
            </div>
        </footer>
    );
};

export default Footer;