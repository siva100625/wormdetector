import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaUser, FaSignOutAlt } from 'react-icons/fa';
import apiClient from '../api/apiClient';
import { useTheme } from '../contexts/ThemeContext'; // <-- 1. IMPORT useTheme

// --- STYLES OBJECT ---
// All styles are defined here as JavaScript objects.
const styles = {
  menuContainer: {
    position: 'fixed',
    top: '20px', // Corresponds to top-5
    right: '20px', // Corresponds to right-5
    zIndex: 50,
  },
  menuButton: {
    padding: '0.75rem', // p-3
    color: 'white',
    borderRadius: '9999px', // rounded-full
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)', // shadow-lg
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    marginTop: '0.5rem', // mt-2
    width: '12rem', // w-48
    backgroundColor: 'var(--bg-light)',
    borderRadius: '0.375rem', // rounded-md
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', // shadow-xl
    paddingTop: '0.5rem', // py-2
    paddingBottom: '0.5rem', // py-2
  },
  userInfo: {
    padding: '0.5rem 1rem', // px-4 py-2
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem', // space-x-2
    borderBottom: '1px solid var(--border-light)',
  },
  username: {
    fontWeight: 600, // font-semibold
  },
  logoutButton: {
    width: '100%',
    textAlign: 'left',
    padding: '0.5rem 1rem', // px-4 py-2
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem', // space-x-2
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-light)',
    transition: 'background-color 0.2s',
  },
  // --- Dynamic Styles ---
  darkDropdown: { backgroundColor: '#374151' }, // Corresponds to dark:bg-gray-700
  darkUserInfo: { borderColor: '#4b5563' }, // Corresponds to dark:border-gray-600
  darkUsername: { color: 'var(--text-dark)'},
  darkLogoutButton: { color: 'var(--text-dark)' },
  logoutButtonHover: { backgroundColor: '#f3f4f6' }, // Corresponds to hover:bg-gray-100
  darkLogoutButtonHover: { backgroundColor: '#4b5563' }, // Corresponds to dark:hover:bg-gray-600
};
// --- END STYLES ---

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // State for hover effect
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    // --- 2. USE the hook to get the theme ---
    const { theme } = useTheme();
    // 3. CHECK the theme from the hook
    const isDarkMode = theme === 'dark';

    const handleLogout = async () => {
        try {
            await apiClient.post('/logout/');
        } catch (error) {
            console.error("Logout API call failed, logging out client-side.", error);
        } finally {
            logout();
            navigate('/login');
        }
    };

    // Close menu if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    // Combine base and dynamic styles
    // These will now re-run and update whenever 'isDarkMode' changes
    const buttonStyle = {
        ...styles.menuButton,
        backgroundColor: isDarkMode ? 'var(--primary-dark)' : 'var(--primary-light)',
    };

    const dropdownStyle = {
        ...styles.dropdown,
        ...(isDarkMode && styles.darkDropdown),
    };
    
    const userInfoStyle = {
      ...styles.userInfo,
      ...(isDarkMode && styles.darkUserInfo),
    };

    const logoutButtonStyle = {
        ...styles.logoutButton,
        ...(isDarkMode && styles.darkLogoutButton),
        ...(isHovered && (isDarkMode ? styles.darkLogoutButtonHover : styles.logoutButtonHover)),
    };

    return (
        <div style={styles.menuContainer} ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} style={buttonStyle}>
                <FaBars />
            </button>
            {isOpen && (
                <div style={dropdownStyle}>
                    <div style={userInfoStyle}>
                        <FaUser style={{ color: isDarkMode ? '#d1d5db' : '#6b7280' }} />
                        <span style={{...styles.username, ...(isDarkMode && styles.darkUsername)}}>
                          {user ? user.username : 'User'}
                        </span>
                    </div>
                    <button 
                      onClick={handleLogout} 
                      style={logoutButtonStyle}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                        <FaSignOutAlt style={{ color: '#ef4444' }} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;