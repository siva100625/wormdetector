import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaSignOutAlt, FaBars, FaSun, FaMoon } from 'react-icons/fa';
import apiClient from '../api/apiClient';
import { useWindowSize } from '../hooks/useWindowSize'; // --- CHANGED: 1. Import useWindowSize ---

const LoggedInNavbar = () => {
    // --- Hooks ---
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isDarkMode = theme === 'dark';

    // --- CHANGED: 2. Use window size to detect mobile ---
    const size = useWindowSize();
    const isMobile = size.width < 768; // Mobile breakpoint

    // --- State ---
    const [isOpen, setIsOpen] = useState(false);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);
    const menuRef = useRef(null);

    // --- Handlers ---
    const handleLogout = async () => {
        try {
            // ... (logout logic)
        } catch (error) {
            console.error("Logout API call failed, logging out client-side.", error);
        } finally {
            logout();
            navigate('/login');
        }
    };

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    // Close menu on link click (for mobile)
    const handleLinkClick = () => {
        if (isMobile) {
            setIsOpen(false);
        }
    };

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
    const logoStyle = {
        fontSize: '1.5rem', fontWeight: 700, textDecoration: 'none', flexShrink: 0,
        color: isDarkMode ? 'var(--primary-dark)' : 'var(--primary-light)',
    };
    // Center links container style
    const linksContainerStyle = {
        display: 'flex', gap: '2.5rem',
        flexGrow: 1,
        justifyContent: 'center',
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

    // Styles for User Menu
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
        padding: '0.5rem 0', zIndex: 50,
        overflow: 'hidden', // --- CHANGED: Added for cleaner look
    };
    const userInfo = { padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-light)' };
    const usernameStyle = { fontWeight: 600, color: 'var(--text-light)' };
    const logoutButton = {
        width: '100%', textAlign: 'left', padding: '0.75rem 1rem', display: 'flex',
        alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none',
        cursor: 'pointer', color: 'var(--text-light)', transition: 'background-color 0.2s'
    };

    // --- CHANGED: 3. Added styles for links inside the dropdown menu ---
    const menuLinkStyle = {
        ...linkBaseStyle,
        display: 'block',
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: 0,
        borderBottom: 'none',
        color: isDarkMode ? 'var(--text-dark)' : 'var(--text-light)',
    };
    const menuLinkActiveStyle = {
        ...linkActiveStyle,
        borderBottom: 'none',
    };
    const menuLinkHoverStyle = {
        ...linkHoverStyle,
        color: isDarkMode ? 'var(--primary-dark)' : 'var(--primary-light)',
    };

    // Dynamic styles for dropdown
    const darkDropdown = { backgroundColor: '#374151' };
    const darkUserInfo = { borderColor: '#4b5563' };
    const darkUsername = { color: 'var(--text-dark)'};
    const darkLogoutButton = { color: 'var(--text-dark)' };
    const logoutButtonHover = { backgroundColor: '#f3f4f6' };
    const darkLogoutButtonHover = { backgroundColor: '#4b5563' };
    // --- END STYLES ---

    // Component for NavLink with hover state (for desktop)
    const NavLinkWithHover = ({ to, children }) => {
        const [isHovered, setIsHovered] = useState(false);
        const calculateStyle = ({ isActive }) => ({
            ...linkBaseStyle,
            ...(isActive && linkActiveStyle),
            ...(isHovered && !isActive && linkHoverStyle)
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

    // --- CHANGED: 4. New component for links inside the menu ---
    const MenuNavLink = ({ to, children }) => {
        const [isHovered, setIsHovered] = useState(false);
        const calculateStyle = ({ isActive }) => ({
            ...menuLinkStyle,
            ...(isDarkMode && { color: 'var(--text-dark)' }),
            ...(isActive && menuLinkActiveStyle),
            ...(isHovered && !isActive && (isDarkMode ? darkLogoutButtonHover : logoutButtonHover)),
        });
        return (
            <NavLink
                to={to}
                style={calculateStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleLinkClick} // Close menu on click
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

                {/* --- CHANGED: 5. Show center links only on desktop --- */}
                {!isMobile && (
                    <div style={linksContainerStyle}>
                        <NavLinkWithHover to="/predict">Predict</NavLinkWithHover>
                        <NavLinkWithHover to="/history">History</NavLinkWithHover>
                    </div>
                )}

                {/* Right Side: Theme Toggle and User Menu */}
                <div style={rightSectionStyle}>
                    {/* --- CHANGED: 6. Show theme toggle only on desktop --- */}
                    {!isMobile && (
                        <button onClick={toggleTheme} style={themeToggleButton} aria-label="Toggle theme">
                            {isDarkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    )}

                    {/* --- CHANGED: 7. This is now the MAIN menu button on mobile --- */}
                    <div style={userMenuStyle} ref={menuRef}>
                        <button onClick={() => setIsOpen(!isOpen)} style={menuButton}>
                            <FaBars />
                        </button>
                        
                        {isOpen && (
                            <div style={{...dropdown, ...(isDarkMode && darkDropdown)}}>
                                
                                {/* --- CHANGED: 8. Add mobile-only links and theme toggle --- */}
                                {isMobile && (
                                    <div style={{ borderBottom: '1px solid var(--border-light)', ...(isDarkMode && darkUserInfo) }}>
                                        <MenuNavLink to="/predict">Predict</MenuNavLink>
                                        <MenuNavLink to="/history">History</MenuNavLink>
                                        <button
                                            onClick={() => { toggleTheme(); handleLinkClick(); }}
                                            style={{ ...menuLinkStyle, ...(isDarkMode && { color: 'var(--text-dark)' }), display: 'flex', justifyContent: 'space-between' }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? darkLogoutButtonHover.backgroundColor : logoutButtonHover.backgroundColor}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <span>Toggle Theme</span>
                                            {isDarkMode ? <FaSun /> : <FaMoon />}
                                        </button>
                                    </div>
                                )}
                                
                                {/* User Info (always shown in dropdown) */}
                                <div style={{...userInfo, ...(isDarkMode && darkUserInfo)}}>
                                    <FaUser style={{ color: isDarkMode ? '#d1d5db' : '#6b7280' }} />
                                    <span style={{...usernameStyle, ...(isDarkMode && darkUsername)}}>
                                        {user ? user.username : 'User'}
                                    </span>
                                </div>
                                
                                {/* Logout Button (always shown in dropdown) */}
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