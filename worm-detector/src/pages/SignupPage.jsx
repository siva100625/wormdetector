import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'; // Added FaEnvelope
import apiClient from '../api/apiClient';
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme

// --- Import the image for the left side ---
import loginImage from '../assets/sign-background.jpg'; // <-- Make sure path is correct

const SignupPage = () => {
    // --- State and Hooks ---
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(''); // Email state
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { theme } = useTheme(); // Use theme hook
    const isDarkMode = theme === 'dark';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // --- Validation ---
        if (!username || !email || !password || !confirmPassword) { // Check email
            setError('Please fill in all fields.');
            return;
        }
        // Basic email format validation using a simple regex
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
            // Send username, email, and password to backend
            await apiClient.post('/signup/', { username, email, password });
            setSuccessMessage('Account created successfully! Redirecting to login...');

            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            // Display error from the backend (e.g., "Username already exists", "Email already registered")
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
        backgroundColor: isDarkMode ? 'var(--bg-dark)' : 'var(--secondary-light)', // Use theme value
    };

    const leftSection = {
        flex: 1.2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        display: window.innerWidth < 1024 ? 'none' : 'flex',
    };

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '80vh',
        borderRadius: '1rem',
        boxShadow: isDarkMode // Shadow adapts to theme
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        objectFit: 'cover',
    };

    const rightSection = {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
    };

    const formWrapper = {
        width: '100%',
        maxWidth: '28rem',
        padding: '2.5rem',
        backgroundColor: 'var(--bg-light)', // Always white card
        borderRadius: '1rem',
        boxShadow: isDarkMode // Shadow adapts to theme
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    };

    const header = { textAlign: 'center', marginBottom: '2rem' };
    const title = { fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-light)' }; // Text always dark on white card
    const subtitle = { marginTop: '0.5rem', color: '#6b7280' }; // Subtitle text color
    const form = { display: 'flex', flexDirection: 'column', gap: '1rem' }; // Reduced gap slightly
    const inputGroup = { position: 'relative' };
    const inputIcon = { position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' };
    // Input styles adapt slightly for dark mode borders if needed, though background is transparent
    const input = {
        width: '100%', boxSizing: 'border-box',
        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
        border: `1px solid ${isDarkMode ? 'var(--border-dark)' : 'var(--border-light)'}`, // Border adapts
        borderRadius: '0.375rem', backgroundColor: 'transparent',
        color: 'var(--text-light)' // Input text color
    };
    const submitButton = {
        width: '100%', padding: '0.75rem 1rem', fontWeight: 600,
        color: 'white', backgroundColor: 'var(--primary-light)', // Button always green
        border: 'none', borderRadius: '0.375rem', cursor: 'pointer',
        transition: 'background-color 0.3s, opacity 0.3s', // Added opacity transition for disabled state
        opacity: (isLoading || successMessage) ? 0.7 : 1, // Dim button when disabled
    };
    const footerText = { fontSize: '0.875rem', textAlign: 'center', color: '#6b7280', marginTop: '1.5rem' };
    const link = { fontWeight: 500, color: 'var(--primary-light)', textDecoration: 'none' }; // Link color always green
    const messageStyle = { fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' };
    const errorMessage = { ...messageStyle, color: '#ef4444' }; // Red error
    const successMessageStyle = { ...messageStyle, color: '#22c55e' }; // Green success

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