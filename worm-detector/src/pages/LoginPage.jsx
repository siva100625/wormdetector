import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import { useWindowSize } from '../hooks/useWindowSize'; // --- 1. IMPORT THE HOOK ---

import loginImage from '../assets/login-background.jpg'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const isDarkMode = document.body.classList.contains('dark');
    const size = useWindowSize(); // --- 2. USE THE HOOK ---
    const isMobile = size.width < 1024; // Use 1024 as the breakpoint for this layout

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            if (username && password) {
                login(username);
                navigate('/predict');
            } else {
                setError('Invalid username or password.');
            }
            setIsLoading(false);
        }, 1000);
    };

    // --- STYLES ---
    const pageContainer = {
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: isDarkMode ? 'var(--bg-dark)' : 'var(--secondary-light)',
    };

    // --- 3. FIX: Removed duplicate key and used size.width ---
    const leftSection = {
        flex: 1.2, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        display: isMobile ? 'none' : 'flex', // Hides on mobile, shows on desktop
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '80vh',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        objectFit: 'cover',
    };

    const rightSection = {
        flex: 1, // Will take up full width on mobile since leftSection is hidden
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '1rem' : '2rem', // --- 4. RESPONSIVE PADDING ---
    };

    const formWrapper = {
        width: '100%',
        maxWidth: '28rem',
        padding: isMobile ? '2rem' : '2.5rem', // --- 5. RESPONSIVE PADDING ---
        backgroundColor: 'var(--bg-light)',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    };

    const header = { textAlign: 'center', marginBottom: '2rem' };
    const title = { 
        fontSize: isMobile ? '1.75rem' : '1.875rem', // --- 6. RESPONSIVE FONT ---
        fontWeight: 800, 
        color: 'var(--text-light)' 
    };
    const subtitle = { marginTop: '0.5rem', color: '#6b7280' };
    const form = { display: 'flex', flexDirection: 'column', gap: '1.5rem' };
    const inputGroup = { position: 'relative' };
    const inputIcon = { position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' };
    const input = { width: '100%', boxSizing: 'border-box', padding: '0.75rem 0.75rem 0.75rem 2.5rem', border: '1px solid var(--border-light)', borderRadius: '0.375rem', backgroundColor: 'transparent' };
    const submitButton = { width: '100%', padding: '0.75rem 1rem', fontWeight: 600, color: 'white', backgroundColor: 'var(--primary-light)', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background-color 0.3s' };
    const footerText = { fontSize: '0.875rem', textAlign: 'center', color: '#6b7280', marginTop: '1.5rem' };
    const link = { fontWeight: 500, color: 'var(--primary-light)', textDecoration: 'none' };
    const errorMessage = { fontSize: '0.875rem', color: '#ef4444', textAlign: 'center', marginBottom: '1rem' };
    
    return (
        <AnimatedPage>
            <div style={pageContainer}>
                {/* Left side with a centered image */}
                <div style={leftSection}>
                    <img
                        src={loginImage}
                        alt="A healthy ecosystem with earthworms"
                        style={imageStyle}
                    />
                </div>

                {/* Right side with the centered login form box */}
                <div style={rightSection}>
                    <div style={formWrapper}>
                        <div style={header}>
                            <h1 style={title}>Welcome Back!</h1>
                            <p style={subtitle}>Sign in to continue to WormDetector</p>
                        </div>

                        {error && <p style={errorMessage}>{error}</p>}

                        <form onSubmit={handleSubmit} style={form}>
                            <div style={inputGroup}>
                                <FaUser style={inputIcon} />
                                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={input} />
                            </div>
                            <div style={inputGroup}>
                                <FaLock style={inputIcon} />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={input} />
                            </div>
                            <button type="submit" disabled={isLoading} style={submitButton}>
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                      _   </form>
                        <p style={footerText}>
                  _         Don't have an account?{' '}
                            <Link to="/signup" style={link}>Sign up here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default LoginPage;