import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import apiClient from '../api/apiClient';
import { useTheme } from '../contexts/ThemeContext';
import { useWindowSize } from '../hooks/useWindowSize'; // --- 1. IMPORT THE HOOK ---

// --- Import the image for the left side ---
import loginImage from '../assets/sign-background.jpg'; // <-- Make sure path is correct

const SignupPage = () => {
    // --- State and Hooks ---
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const size = useWindowSize(); // --- 2. USE THE HOOK ---
    const isMobile = size.width < 1024; // Breakpoint for this layout

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
             setError('Please enter a valid email address.');
             return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setIsLoading(true);
        try {
            await apiClient.post('/signup/', { username, email, password });
            setSuccessMessage('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during signup.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- STYLES ---
    const pageContainer = {
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: isDarkMode ? 'var(--bg-dark)' : 'var(--secondary-light)',
    };

    const leftSection = {
        flex: 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        display: isMobile ? 'none' : 'flex', // --- 3. MADE RESPONSIVE ---
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '80vh',
        borderRadius: '1rem',
        boxShadow: isDarkMode
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        objectFit: 'cover',
    };

    const rightSection = {
        flex: 1, // Takes full width on mobile
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
        boxShadow: isDarkMode
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    };

    const header = { textAlign: 'center', marginBottom: '2rem' };
    const title = { 
        fontSize: isMobile ? '1.75rem' : '1.875rem', // --- 6. RESPONSIVE FONT ---
        fontWeight: 800, 
        color: 'var(--text-light)' 
    };
    const subtitle = { marginTop: '0.5rem', color: '#6b7280' };
    const form = { display: 'flex', flexDirection: 'column', gap: '1rem' };
    const inputGroup = { position: 'relative' };
    const inputIcon = { position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' };
    const input = {
        width: '100%', boxSizing: 'border-box',
        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
        border: `1px solid ${isDarkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
        borderRadius: '0.375rem', backgroundColor: 'transparent',
        color: 'var(--text-light)'
    };
    const submitButton = {
        width: '100%', padding: '0.75rem 1rem', fontWeight: 600,
        color: 'white', backgroundColor: 'var(--primary-light)',
        border: 'none', borderRadius: '0.375rem', cursor: 'pointer',
        transition: 'background-color 0.3s, opacity 0.3s',
        opacity: (isLoading || successMessage) ? 0.7 : 1,
    };
    const footerText = { fontSize: '0.875rem', textAlign: 'center', color: '#6b7280', marginTop: '1.5rem' };
    const link = { fontWeight: 500, color: 'var(--primary-light)', textDecoration: 'none' };
    const messageStyle = { fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' };
    const errorMessage = { ...messageStyle, color: '#ef4444' };
    const successMessageStyle = { ...messageStyle, color: '#22c55e' };

    return (
        <AnimatedPage>
            <div style={pageContainer}>
               {/* Left side */}
                <div style={leftSection}>
                    <img src={loginImage} alt="Signup background illustration" style={imageStyle} />
                </div>

                {/* Right side */}
                <div style={rightSection}>
                    <div style={formWrapper}>
                    <div style={header}>
                            <h1 style={title}>Create Your Account</h1>
                            <p style={subtitle}>Join to start identifying worms</p>
                        </div>

                        {error && <p style={errorMessage}>{error}</p>}
                        {successMessage && <p style={successMessageStyle}>{successMessage}</p>}

                        <form onSubmit={handleSubmit} style={form}>
                            {/* Username Field */}
                            <div style={inputGroup}>
                                <FaUser style={inputIcon} />
                          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={input} aria-label="Username" />
                            </div>

                            {/* Email Field */}
                            <div style={inputGroup}>
                                <FaEnvelope style={inputIcon} />
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={input} aria-label="Email Address" />
                            </div>

                            {/* Password Field */}
                            <div style={inputGroup}>
                                <FaLock style={inputIcon} />
                                <input type="password" placeholder="Password (min. 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required style={input} aria-label="Password" />
                      </div>

                            {/* Confirm Password Field */}
                           <div style={inputGroup}>
                                <FaLock style={inputIcon} />
                                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={input} aria-label="Confirm Password" />
                            </div>

                            <button type="submit" disabled={isLoading || !!successMessage} style={submitButton}>
                                {isLoading ? 'Creating...' : 'Create Account'}
                            </button>
                        </form>
                        <p style={footerText}>
                            Already have an account?{' '}
                            <Link to="/login" style={link}>Log in</Link>
                        </p>
                    </div>
                </div>
           </div>
        </AnimatedPage>
    );
};

export default SignupPage;