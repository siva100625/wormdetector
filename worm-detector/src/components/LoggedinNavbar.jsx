import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom'; // Added Link for Logo
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaSignOutAlt, FaBars, FaSun, FaMoon } from 'react-icons/fa'; // Added Sun/Moon
import apiClient from '../api/apiClient';

const LoggedInNavbar = () => {
    // --- Hooks ---
    const { theme, toggleTheme } = useTheme(); // Get toggleTheme
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isDarkMode = theme === 'dark';

    // --- State ---
    const [isOpen, setIsOpen] = useState(false);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false); // Renamed for clarity
    const menuRef = useRef(null);

    // --- Handlers ---
    const handleLogout = async () => {
        try {
            // Optional: Call backend logout endpoint
            // await apiClient.post('/logout/');
        } catch (error) {
            console.error("Logout API call failed, logging out client-side.", error);
        } finally {
            logout(); // Clear auth state
            navigate('/login'); // Redirect to login
        }
     };

    useEffect(() => {
         const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
     }, [menuRef]);

    // --- STYLES ---
    const navStyle = {
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 40,
        backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '0.75rem 0',
    };
    const containerStyle = {
        maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    };
    // Simplified left section - just the logo
    const logoStyle = {
        fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', flexShrink: 0,
        color: isDarkMode ? 'var(--primary-dark)' : 'var(--primary-light)',
    };
    // Center links container style
    const linksContainerStyle = {
        display: 'flex', gap: '2.5rem',
        flexGrow: 1, // Allow this container to take up available space
        justifyContent: 'center', // Center the links within this growing container
    };
    const linkBaseStyle = {
        fontSize: '1rem', fontWeight: 600, textDecoration: 'none',
        padding: '0.5rem 0.75rem',
        borderRadius: '0.375rem',
        borderBottom: '2px solid transparent',
        transition: 'color 0.2s, background-color 0.2s',
        color: isDarkMode ? '#cbd5e1' : '#4b5563',
    };
    const linkActiveStyle = {
        color: isDarkMode ? 'var(--primary-dark)' : 'var(--primary-light)',
        backgroundColor: isDarkMode ? 'rgba(49, 196, 141, 0.1)' : 'rgba(22, 163, 74, 0.08)',
    };
    const linkHoverStyle = {
         backgroundColor: isDarkMode ? 'rgba(49, 196, 141, 0.1)' : 'rgba(22, 163, 74, 0.08)',
         color: isDarkMode ? 'var(--primary-dark)' : 'var(--primary-light)',
    };

    // Styles for Right Section (Theme Toggle + User Menu)
    const rightSectionStyle = { display: 'flex', alignItems: 'center', gap: '1rem' };
    const themeToggleButton = {
        background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem',
        fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isDarkMode ? 'var(--text-dark)' : 'var(--text-light)',
    };

    // Styles for Embedded User Menu
    const userMenuStyle = { position: 'relative' };
    const menuButton = {
        background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', color: isDarkMode ? 'var(--text-dark)' : 'var(--text-light)',
    };
    const dropdown = {
        position: 'absolute', right: 0, top: '100%', marginTop: '0.5rem', width: '12rem',
        backgroundColor: 'var(--bg-light)', borderRadius: '0.375rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        padding: '0.5rem 0', zIndex: 50
    };
    const userInfo = { padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-light)' };
    const usernameStyle = { fontWeight: 600, color: 'var(--text-light)' };
    const logoutButton = {
        width: '100%', textAlign: 'left', padding: '0.75rem 1rem', display: 'flex',
        alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none',
        cursor: 'pointer', color: 'var(--text-light)', transition: 'background-color 0.2s'
    };
    // Dynamic styles for dropdown
    const darkDropdown = { backgroundColor: '#374151' };
    const darkUserInfo = { borderColor: '#4b5563' };
    const darkUsername = { color: 'var(--text-dark)'};
    const darkLogoutButton = { color: 'var(--text-dark)' };
    const logoutButtonHover = { backgroundColor: '#f3f4f6' };
    const darkLogoutButtonHover = { backgroundColor: '#4b5563' };
    // --- END STYLES ---

     // Component for NavLink with hover state
    const NavLinkWithHover = ({ to, children }) => {
        const [isHovered, setIsHovered] = useState(false);
        // Calculate style based on active state and hover state
        const calculateStyle = ({ isActive }) => ({
            ...linkBaseStyle,
            ...(isActive && linkActiveStyle),
            ...(isHovered && !isActive && linkHoverStyle) // Apply hover only if not active
        });
        return (
            <NavLink
                to={to}
                style={calculateStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </NavLink>
        );
    };

    // Calculate dynamic style for logout button
    const logoutButtonStyle = {
        ...logoutButton,
        ...(isDarkMode && darkLogoutButton),
        ...(isLogoutHovered && (isDarkMode ? darkLogoutButtonHover : logoutButtonHover)),
    };

    return (
        <nav style={navStyle}>
            <div style={containerStyle}>
                {/* Left Side: Logo */}
                <Link to="/predict" style={logoStyle}>
                    WormDetector 🐛
                </Link>

                {/* Center Links */}
                <div style={linksContainerStyle}>
                    <NavLinkWithHover to="/predict">Predict</NavLinkWithHover>
                    <NavLinkWithHover to="/history">History</NavLinkWithHover>
                </div>

                {/* Right Side: Theme Toggle and User Menu */}
                <div style={rightSectionStyle}>
                    <button onClick={toggleTheme} style={themeToggleButton} aria-label="Toggle theme">
                        {isDarkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    <div style={userMenuStyle} ref={menuRef}>
                        <button onClick={() => setIsOpen(!isOpen)} style={menuButton}>
                            <FaBars />
                        </button>
                        {isOpen && (
                            <div style={{...dropdown, ...(isDarkMode && darkDropdown)}}>
                                <div style={{...userInfo, ...(isDarkMode && darkUserInfo)}}>
                                    <FaUser style={{ color: isDarkMode ? '#d1d5db' : '#6b7280' }} />
                                    <span style={{...usernameStyle, ...(isDarkMode && darkUsername)}}>
                                        {user ? user.username : 'User'}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    style={logoutButtonStyle}
                                    onMouseEnter={() => setIsLogoutHovered(true)}
                                    onMouseLeave={() => setIsLogoutHovered(false)}
                                >
                                    <FaSignOutAlt style={{ color: '#ef4444' }} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LoggedInNavbar;