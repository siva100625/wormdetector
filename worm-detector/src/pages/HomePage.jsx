import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { useTheme } from '../contexts/ThemeContext';
// Added FaBars and FaTimes for the mobile menu
import { FaSun, FaMoon, FaLeaf, FaShieldAlt, FaUsers, FaBars, FaTimes } from 'react-icons/fa';
import Footer from '../components/Footer';

// --- IMAGES ---
import heroImage from '../assets/hero-hand-in-soil.jpg';
import flatwormImg1 from '../assets/flatworm-eating-earthworm-1.jpg';
import flatwormImg2 from '../assets/flatworm-eating-earthworm-2.jpg';
import flatwormImg3 from '../assets/flatworm-eating-earthworm-3.jpg';

// --- ADDED ---
// A custom hook to get window size reliably.
// You can also move this to its own file (e.g., hooks/useWindowSize.js)
const useWindowSize = () => {
    const [size, setSize] = useState({ 
        width: window.innerWidth, 
        height: window.innerHeight 
    });
    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return size;
};


// --- COMPONENTS ---

// --- HEAVILY REFACTORED HomeNavbar for responsiveness ---
const HomeNavbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const size = useWindowSize(); // Use the custom hook

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false); // Close mobile menu on link click
    };

    const linkStyle = { 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer', 
        color: 'var(--primary-light)', 
        fontWeight: 600, 
        fontSize: '1rem', 
        textDecoration: 'none', 
        transition: 'color 0.2s ease-in-out',
        padding: '0.5rem 0' // Added padding for mobile
    };
    const darkLinkStyle = { color: 'var(--primary-dark)' };

    const navStyle = {
        position: 'sticky', 
        top: 0, 
        zIndex: 40, 
        width: '100%', 
        backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(4px)', 
        WebkitBackdropFilter: 'blur(4px)', 
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    };

    const navContainerStyle = {
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 1.5rem',
        maxWidth: '1280px', // Added container max-width for consistency
        margin: '0 auto'
    };

    const logoStyle = {
        fontSize: '1.875rem', 
        fontWeight: 800, 
        textDecoration: 'none', 
        color: theme === 'dark' ? 'var(--primary-dark)' : 'var(--primary-light)',
        flexShrink: 0 // Prevents logo from shrinking
    };
    
    const desktopLinksStyle = {
        display: 'flex', 
        alignItems: 'center', 
        gap: '2rem', 
        fontSize: '1rem'
    };

    const mobileIconStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'inherit',
        fontSize: '1.5rem',
        display: 'block' // Will be hidden by media query in parent
    };

    const mobileMenuContainerStyle = {
        position: 'absolute',
        top: '100%', // Positioned right below the navbar
        left: 0,
        width: '100%',
        backgroundColor: theme === 'dark' ? 'rgb(15, 23, 42)' : 'rgb(255, 255, 255)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem 0 2rem 0',
        gap: '1.5rem',
    };

    const rightSectionStyle = {
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem'
    };

    return (
        <nav style={navStyle}>
            <div style={navContainerStyle}>
                <a href="#top" style={logoStyle}>WormDetector 🐛</a>
                
                {/* --- Desktop Menu --- */}
                {/* This uses conditional rendering, fixing the duplicate 'display' key warning */}
                {size.width >= 768 && (
                    <div style={desktopLinksStyle}>
                        <button onClick={() => scrollToSection('features')} style={{ ...linkStyle, ...(theme === 'dark' && darkLinkStyle) }}>Features</button>
                        <button onClick={() => scrollToSection('about')} style={{ ...linkStyle, ...(theme === 'dark' && darkLinkStyle) }}>About</button>
                        <button onClick={() => scrollToSection('contact')} style={{ ...linkStyle, ...(theme === 'dark' && darkLinkStyle) }}>Contact</button>
                    </div>
                )}
                
                <div style={rightSectionStyle}>
                    <Link to="/login" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 600, borderRadius: '0.375rem', border: `1px solid ${theme === 'dark' ? 'var(--primary-dark)' : 'var(--primary-light)'}`, color: theme === 'dark' ? 'var(--primary-dark)' : 'var(--primary-light)', textDecoration: 'none' }}>Login</Link>
                    <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: '1.25rem' }}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>
                    
                    {/* --- Mobile Menu Button --- */}
                    {size.width < 768 && (
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={mobileIconStyle}>
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    )}
                </div>
            </div>

            {/* --- Mobile Menu Dropdown --- */}
            {size.width < 768 && isMobileMenuOpen && (
                <div style={mobileMenuContainerStyle}>
                    <button onClick={() => scrollToSection('features')} style={{ ...linkStyle, ...(theme === 'dark' && darkLinkStyle) }}>Features</button>
                    <button onClick={() => scrollToSection('about')} style={{ ...linkStyle, ...(theme === 'dark' && darkLinkStyle) }}>About</button>
                    <button onClick={() => scrollToSection('contact')} style={{ ...linkStyle, ...(theme === 'dark' && darkLinkStyle) }}>Contact</button>
                </div>
            )}
        </nav>
    );
};


const HomePage = () => {
    const { theme } = useTheme();
    const size = useWindowSize(); // Use the hook for responsive styles

    const slideshowImages = [flatwormImg1, flatwormImg2, flatwormImg3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slideshowImages.length]);

    // --- STYLES ---
    const heroSectionStyle = { 
        paddingTop: '2rem', // Added padding top
        paddingBottom: '4rem', 
        paddingLeft: '1.5rem', 
        paddingRight: '1.5rem', 
        backgroundColor: theme === 'dark' ? 'var(--secondary-dark)' : 'var(--secondary-light)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '2rem', 
        minHeight: 'calc(90vh - 60px)' 
    };
    const heroContentStyle = { textAlign: 'center', maxWidth: '48rem' };
    const heroTitleStyle = { 
        // Responsive font size
        fontSize: size.width >= 768 ? '2.8rem' : '2rem', 
        fontWeight: 800, 
        marginBottom: '1rem', 
        color: theme === 'dark' ? 'var(--text-dark)' : 'var(--text-light)' 
    };
    const heroSubtitleStyle = { 
        // Responsive font size
        fontSize: size.width >= 768 ? '1.25rem' : '1.1rem', 
        marginBottom: '2rem', 
        lineHeight: '1.6', 
        color: theme === 'dark' ? '#d1d5db' : '#4b5563' 
    };
    const heroButtonHoverStyle = { transform: 'scale(1.05)', boxShadow: '0 6px 12px -2px rgba(0,0,0,0.2)' };
    const heroButtonStyle = { padding: '1rem 2rem', color: 'white', fontSize: '1.125rem', fontWeight: 700, borderRadius: '0.5rem', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out', backgroundColor: theme === 'dark' ? 'var(--primary-dark)' : 'var(--primary-light)' };
    
    // Responsive desktop styles
    const desktopHeroStyle = { 
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        paddingTop: '2rem',
        paddingBottom: '6rem', 
        paddingLeft: '1.5rem', 
        paddingRight: '1.5rem',
        gap: '3rem' // Added gap
    };
    const desktopHeroContentStyle = { textAlign: 'left', maxWidth: '32rem', flex: 1 };
    const imageContainerStyle = { 
        width: '90%', // Sized for mobile
        maxWidth: '350px', // Max size on mobile
        flexShrink: 0, 
        marginBottom: '2rem', 
        borderRadius: '0.75rem', 
        overflow: 'hidden' 
    };
    const desktopImageContainerStyle = { 
        width: '100%',
        maxWidth: '500px', 
        flex: 1.5, 
        marginBottom: '0' 
    };
    const applyHoverStyle = (baseStyle, hoverStyle, isHovered) => isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const sectionTitleStyle = { 
        // Responsive font size
        fontSize: size.width >= 768 ? '2.25rem' : '1.75rem', 
        fontWeight: 700, 
        marginBottom: '3rem', 
        color: theme === 'dark' ? 'var(--text-dark)' : 'var(--text-light)' 
    };
    const featureBlockBaseStyle = { padding: '1.5rem', backgroundColor: 'var(--bg-light)', borderRadius: '0.5rem', boxShadow: theme === 'dark' ? '0 4px 6px rgba(0,0,0,0.4)' : '0 4px 6px rgba(0,0,0,0.1)' };
    const featureBlockIconStyle = { fontSize: '3rem', margin: '0 auto 1rem auto', color: 'var(--primary-light)' };
    const featureBlockTitleStyle = { fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-light)' };
    const featureBlockTextStyle = { color: '#4b5563' };

    const slideshowSection = { margin: '4rem 0 6rem 0', textAlign: 'center' }; // Reduced top margin
    const slideshowBox = { 
        position: 'relative', 
        maxWidth: '48rem', 
        // Responsive height
        height: size.width >= 768 ? '24rem' : '15rem', 
        margin: '0 auto', 
        borderRadius: '0.75rem', 
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)', 
        overflow: 'hidden', 
        backgroundColor: theme === 'dark' ? 'var(--secondary-dark)' : '#e5e7eb',
        width: '90%' // Ensures it doesn't break out on mobile
    };
    const slideshowImage = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 1s ease-in-out' };
    const slideshowActiveImage = { opacity: 1 };

    // --- STYLES FOR ABOUT SECTION ---
    const aboutSectionBox = {
        maxWidth: '60rem',
        margin: '0 auto',
        // Responsive padding
        padding: size.width >= 768 ? '2.5rem' : '1.5rem',
        backgroundColor: 'var(--bg-light)',
        borderRadius: '0.75rem',
        boxShadow: theme === 'dark' ? '0 4px 6px rgba(0,0,0,0.4)' : '0 4px 6px rgba(0,0,0,0.1)',
        width: '90%' // Ensures it doesn't break out on mobile
    };
    const aboutSectionTitle = {
        textAlign: 'center',
        // Responsive font size
        fontSize: size.width >= 768 ? '2.25rem' : '1.75rem',
        fontWeight: 700,
        marginBottom: '2rem', 
        color: 'var(--text-light)', 
    };
    const aboutSectionText = {
        textAlign: 'center',
        fontSize: '1.125rem',
        lineHeight: '1.8',
        color: '#4b5563',
    };
    // --- END STYLES ---

    const contactButtonStyle = { padding: '0.75rem 2rem', backgroundColor: '#374151', color: 'white', fontWeight: 700, borderRadius: '0.5rem', textDecoration: 'none', display: 'inline-block', transition: 'background-color 0.2s ease-in-out', ...(theme === 'dark' && { backgroundColor: '#5b6b7b' }) };

    return (
        <AnimatedPage>
            <HomeNavbar />
            {/* Replaced window.innerWidth with size.width from hook */}
            <header style={size.width >= 768 ? { ...heroSectionStyle, ...desktopHeroStyle } : heroSectionStyle}>
                <div style={size.width >= 768 ? { ...imageContainerStyle, ...desktopImageContainerStyle } : imageContainerStyle}>
                    <img src={heroImage} alt="Hand holding soil with a worm, symbolizing soil health" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '0.75rem' }} /> 
                </div>
                <div style={size.width >= 768 ? { ...heroContentStyle, ...desktopHeroContentStyle } : heroContentStyle}>
                    <h1 style={heroTitleStyle}>Distinguish Invasive Flatworms. Safeguard Soil Health.</h1>
                    <p style={heroSubtitleStyle}>Our AI helps you quickly identify earthworms from harmful flatworms, crucial for protecting local ecosystems.</p>
                    <Link to="/predict" style={applyHoverStyle(heroButtonStyle, heroButtonHoverStyle, isButtonHovered)} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)}>Protect Earthworms 🪱</Link>
                </div>
            </header>

            {/* Added padding and overflow control to main */}
            <main style={{ paddingLeft: '1rem', paddingRight: '1rem', overflow: 'hidden' }}>
                <section id="features" style={{ margin: '4rem 0', textAlign: 'center' }}>
                    <h2 style={sectionTitleStyle}>Why WormDetector?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div style={featureBlockBaseStyle}><FaLeaf style={featureBlockIconStyle} /><h3 style={featureBlockTitleStyle}>Ecological Protection</h3><p style={featureBlockTextStyle}>Safeguard local biodiversity by identifying and managing invasive flatworm species.</p></div>
                        <div style={featureBlockBaseStyle}><FaShieldAlt style={featureBlockIconStyle} /><h3 style={featureBlockTitleStyle}>Accurate & Instant</h3><p style={featureBlockTextStyle}>Our fine-tuned AI model provides reliable classifications in seconds from a single image.</p></div>
                        <div style={featureBlockBaseStyle}><FaUsers style={featureBlockIconStyle} /><h3 style={featureBlockTitleStyle}>For Everyone</h3><p style={featureBlockTextStyle}>Designed for gardeners, farmers, researchers, and nature enthusiasts. No expertise required.</p></div>
                    </div>
                </section>

                <section style={slideshowSection}>
                    <h2 style={sectionTitleStyle}>Visualizing the Threat</h2>
                    <div style={slideshowBox}>{slideshowImages.map((imgSrc, index) => (<img key={index} src={imgSrc} alt={`Invasive flatworm attacking an earthworm ${index + 1}`} style={{ ...slideshowImage, ...(currentImageIndex === index && slideshowActiveImage) }} />))}</div>
                </section>

                <section id="about" style={{ margin: '6rem 0' }}>
                   <div style={aboutSectionBox}>
                        <h2 style={aboutSectionTitle}>About Us</h2>
                        <p style={aboutSectionText}>
                            WormDetector was born from a passion for ecological balance and the power of artificial intelligence. We noticed a growing concern among environmentalists and gardeners about the spread of invasive flatworms, which pose a significant threat to native earthworm populations crucial for soil health.To empower individuals with an easy, accurate tool to identify these species, enabling timely intervention and contributing to healthier ecosystems.
                     </p>
                    </div>
                </section>

                <section id="contact" style={{ margin: '6rem 0', textAlign: 'center' }}>
                    <h2 style={sectionTitleStyle}>Have Questions?</h2>
                    <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>

                    </p>
<a href="mailto:shiva19072005@gmail.com" style={contactButtonStyle}>
Click here to Mail Us
</a>
                </section>
            </main>
            <Footer />
        </AnimatedPage>
    );
};

export default HomePage;