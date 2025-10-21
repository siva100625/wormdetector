import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon, FaLeaf, FaShieldAlt, FaUsers } from 'react-icons/fa';
import Footer from '../components/Footer';

// --- IMAGES ---
import heroImage from '../assets/hero-hand-in-soil.jpg';
import flatwormImg1 from '../assets/flatworm-eating-earthworm-1.jpg';
import flatwormImg2 from '../assets/flatworm-eating-earthworm-2.jpg';
import flatwormImg3 from '../assets/flatworm-eating-earthworm-3.jpg';

// --- COMPONENTS ---
const HomeNavbar = () => {
    const { theme, toggleTheme } = useTheme();
    const scrollToSection = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
    const linkStyle = { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-light)', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', transition: 'color 0.2s ease-in-out' };
    const darkLinkStyle = { color: 'var(--primary-dark)' };
    return (
        <nav style={{ position: 'sticky', top: 0, zIndex: 40, width: '100%', backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem' }}>
                <a href="#top" style={{ fontSize: '1.875rem', fontWeight: 800, textDecoration: 'none', color: theme === 'dark' ? 'var(--primary-dark)' : 'var(--primary-light)' }}>WormDetector 🐛</a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '1rem' }}>
                    <button onClick={() => scrollToSection('features')} style={{ ...linkStyle, ...(theme === 'dark' && darkLinkStyle) }}>Features</button>
                    <button onClick={() => scrollToSection('about')} style={{ ...linkStyle, ...(theme === 'dark' && darkLinkStyle) }}>About</button>
                    <button onClick={() => scrollToSection('contact')} style={{ ...linkStyle, ...(theme === 'dark' && darkLinkStyle) }}>Contact</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/login" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 600, borderRadius: '0.375rem', border: `1px solid ${theme === 'dark' ? 'var(--primary-dark)' : 'var(--primary-light)'}`, color: theme === 'dark' ? 'var(--primary-dark)' : 'var(--primary-light)', textDecoration: 'none' }}>Login</Link>
                    <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', fontSize: '1.25rem' }}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>
                </div>
            </div>
        </nav>
    );
};

const HomePage = () => {
    const { theme } = useTheme();

    const slideshowImages = [flatwormImg1, flatwormImg2, flatwormImg3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slideshowImages.length]);

    // --- STYLES ---
    const heroSectionStyle = { paddingTop: 0, paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', backgroundColor: theme === 'dark' ? 'var(--secondary-dark)' : 'var(--secondary-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', minHeight: 'calc(90vh - 60px)' };
    const heroContentStyle = { textAlign: 'center', maxWidth: '48rem' };
    const heroTitleStyle = { fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem', color: theme === 'dark' ? 'var(--text-dark)' : 'var(--text-light)' };
    const heroSubtitleStyle = { fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.6', color: theme === 'dark' ? '#d1d5db' : '#4b5563' };
    const heroButtonHoverStyle = { transform: 'scale(1.05)', boxShadow: '0 6px 12px -2px rgba(0,0,0,0.2)' };
    const heroButtonStyle = { padding: '1rem 2rem', color: 'white', fontSize: '1.125rem', fontWeight: 700, borderRadius: '0.5rem', textDecoration: 'none', display: 'inline-block', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out', backgroundColor: theme === 'dark' ? 'var(--primary-dark)' : 'var(--primary-light)' };
    const desktopHeroStyle = { flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 0, paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' };
    const desktopHeroContentStyle = { textAlign: 'left', maxWidth: '32rem', flex: 1 };
    const imageContainerStyle = { width: '100%', maxWidth: '300px', flexShrink: 0, marginBottom: '2rem', borderRadius: '0.75rem', overflow: 'hidden' };
    const desktopImageContainerStyle = { maxWidth: '500px', flex: 1.5, marginBottom: '0' };
    const applyHoverStyle = (baseStyle, hoverStyle, isHovered) => isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const sectionTitleStyle = { fontSize: '2.25rem', fontWeight: 700, marginBottom: '3rem', color: theme === 'dark' ? 'var(--text-dark)' : 'var(--text-light)' };
    const featureBlockBaseStyle = { padding: '1.5rem', backgroundColor: 'var(--bg-light)', borderRadius: '0.5rem', boxShadow: theme === 'dark' ? '0 4px 6px rgba(0,0,0,0.4)' : '0 4px 6px rgba(0,0,0,0.1)' };
    const featureBlockIconStyle = { fontSize: '3rem', margin: '0 auto 1rem auto', color: 'var(--primary-light)' };
    const featureBlockTitleStyle = { fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-light)' };
    const featureBlockTextStyle = { color: '#4b5563' };

    const slideshowSection = { margin: '6rem 0', textAlign: 'center' };
    const slideshowBox = { position: 'relative', maxWidth: '48rem', height: '24rem', margin: '0 auto', borderRadius: '0.75rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', overflow: 'hidden', backgroundColor: theme === 'dark' ? 'var(--secondary-dark)' : '#e5e7eb' };
    const slideshowImage = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 1s ease-in-out' };
    const slideshowActiveImage = { opacity: 1 };

    // --- CORRECTED STYLES FOR ABOUT SECTION ---
    const aboutSectionBox = {
        maxWidth: '60rem',
        margin: '0 auto',
        padding: '2.5rem',
        backgroundColor: 'var(--bg-light)',
        borderRadius: '0.75rem',
        boxShadow: theme === 'dark' ? '0 4px 6px rgba(0,0,0,0.4)' : '0 4px 6px rgba(0,0,0,0.1)',
    };
    const aboutSectionTitle = {
        textAlign: 'center',
        fontSize: '2.25rem',
        fontWeight: 700,
        marginBottom: '2rem', // Space between title and paragraph
        color: 'var(--text-light)', // Always dark text for white background
    };
    const aboutSectionText = {
        textAlign: 'center',
        fontSize: '1.125rem',
        lineHeight: '1.8',
        color: '#4b5563',
    };
    // --- END CORRECTED STYLES ---

    const contactButtonStyle = { padding: '0.75rem 2rem', backgroundColor: '#374151', color: 'white', fontWeight: 700, borderRadius: '0.5rem', textDecoration: 'none', display: 'inline-block', transition: 'background-color 0.2s ease-in-out', ...(theme === 'dark' && { backgroundColor: '#5b6b7b' }) };

    return (
        <AnimatedPage>
            <HomeNavbar />
            <header style={window.innerWidth >= 768 ? { ...heroSectionStyle, ...desktopHeroStyle } : heroSectionStyle}>
                <div style={window.innerWidth >= 768 ? { ...imageContainerStyle, ...desktopImageContainerStyle } : imageContainerStyle}>
                    <img src={heroImage} alt="Hand holding soil with a worm, symbolizing soil health" style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
                </div>
                <div style={window.innerWidth >= 768 ? { ...heroContentStyle, ...desktopHeroContentStyle } : heroContentStyle}>
                    <h1 style={heroTitleStyle}>Distinguish Invasive Flatworms. Safeguard Soil Health.</h1>
                    <p style={heroSubtitleStyle}>Our AI helps you quickly identify earthworms from harmful flatworms, crucial for protecting local ecosystems.</p>
                    <Link to="/predict" style={applyHoverStyle(heroButtonStyle, heroButtonHoverStyle, isButtonHovered)} onMouseEnter={() => setIsButtonHovered(true)} onMouseLeave={() => setIsButtonHovered(false)}>Protect Earthworms 🪱</Link>
                </div>
            </header>

            <main className="container">
                <section id="features" style={{ margin: '4rem 0', textAlign: 'center' }}>
                    <h2 style={sectionTitleStyle}>Why WormDetector?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                        <div style={featureBlockBaseStyle}><FaLeaf style={featureBlockIconStyle} /><h3 style={featureBlockTitleStyle}>Ecological Protection</h3><p style={featureBlockTextStyle}>Safeguard local biodiversity by identifying and managing invasive flatworm species.</p></div>
                        <div style={featureBlockBaseStyle}><FaShieldAlt style={featureBlockIconStyle} /><h3 style={featureBlockTitleStyle}>Accurate & Instant</h3><p style={featureBlockTextStyle}>Our fine-tuned AI model provides reliable classifications in seconds from a single image.</p></div>
                        <div style={featureBlockBaseStyle}><FaUsers style={featureBlockIconStyle} /><h3 style={featureBlockTitleStyle}>For Everyone</h3><p style={featureBlockTextStyle}>Designed for gardeners, farmers, researchers, and nature enthusiasts. No expertise required.</p></div>
                    </div>
                </section>

                <section style={slideshowSection}>
                    <h2 style={sectionTitleStyle}>Visualizing the Threat</h2>
                    <div style={slideshowBox}>{slideshowImages.map((imgSrc, index) => (<img key={index} src={imgSrc} alt={`Invasive flatworm attacking an earthworm ${index + 1}`} style={{ ...slideshowImage, ...(currentImageIndex === index && slideshowActiveImage) }} />))}</div>
                </section>

                {/* --- CORRECTED ABOUT SECTION JSX --- */}
                <section id="about" style={{ margin: '6rem 0' }}>
                    <div style={aboutSectionBox}>
                        <h2 style={aboutSectionTitle}>About Us</h2>
                        <p style={aboutSectionText}>
                            WormDetector was born from a passion for ecological balance and the power of artificial intelligence. We noticed a growing concern among environmentalists and gardeners about the spread of invasive flatworms, which pose a significant threat to native earthworm populations crucial for soil health.To empower individuals with an easy, accurate tool to identify these species, enabling timely intervention and contributing to healthier ecosystems.
                        </p>
                    </div>
                </section>
                {/* --- END CORRECTED SECTION --- */}

                <section id="contact" style={{ margin: '6rem 0', textAlign: 'center' }}>
                    <h2 style={sectionTitleStyle}>Have Questions?</h2>
                    <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: theme === 'dark' ? '#d1d5db' : '#4b5563' }}>
                        Reach out for support or inquiries about WormDetector.
                    </p>
<a href="mailto:shiva19072005@gmail.com" style={contactButtonStyle}>
    Contact Us
</a>
                </section>
            </main>
            <Footer />
        </AnimatedPage>
    );
};

export default HomePage;