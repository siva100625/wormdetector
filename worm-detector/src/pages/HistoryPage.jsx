import React, { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { useTheme } from '../contexts/ThemeContext';
import apiClient from '../api/apiClient';
import { FaHistory, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { useWindowSize } from '../hooks/useWindowSize'; // --- 1. IMPORT THE HOOK ---

// --- STYLES ---
const keyframes = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// --- MODIFIED: styles is now a function that accepts the size ---
const getStyles = (size, isDarkMode) => {
    const isMobile = size.width < 768; // Mobile breakpoint
    return {
        header: {
            textAlign: 'center',
            marginBottom: '2.5rem',
            fontSize: isMobile ? '1.75rem' : '2.25rem', // Responsive font size
            fontWeight: 800,
        },
        cardContainer: {
            backgroundColor: 'var(--bg-light)',
            padding: isMobile ? '1rem' : '1.5rem', // Responsive padding
            borderRadius: '1rem',
            overflow: 'hidden',
            marginBottom: '2rem',
        },
        table: {
            minWidth: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            textAlign: 'left',
        },
        thead: {
            backgroundColor: '#f9fafb',
        },
        th: {
            padding: isMobile ? '0.75rem' : '1rem 1.5rem', // Responsive padding
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '2px solid #e5e7eb',
        },
        tbodyTr: {
            transition: 'background-color 0.15s ease-in-out',
        },
        td: {
            padding: isMobile ? '0.75rem' : '1rem 1.5rem', // Responsive padding
            fontSize: '0.875rem',
            color: 'var(--text-light)',
            borderTop: '1px solid #e5e7eb',
        },
        trHover: {
            backgroundColor: '#f3f4f6',
        },
        classEarthworm: { color: '#8b4513', fontWeight: 600 },
        classFlatworm: { color: '#ef4444', fontWeight: 600 },
        feedbackBox: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '2.5rem 1rem' : '4rem 1.5rem', // Responsive padding
            textAlign: 'center',
            gap: '1rem',
        },
        feedbackIcon: { fontSize: '3rem', color: '#9ca3af' },
        feedbackText: { fontSize: '1.125rem', fontWeight: 500, color: '#6b7280' },
        errorText: { color: '#ef4444' },
        spinner: { animation: 'spin 1s linear infinite' },
        darkTitle: { color: 'var(--text-dark)' },
        darkCardShadow: { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)' },
        lightCardShadow: { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' },
        darkTHead: { backgroundColor: '#374151' },
        darkTh: { color: '#d1d5db', borderBottomColor: '#4b5563' },
        darkTd: { borderTopColor: '#4b5563' },
        darkTrHover: { backgroundColor: '#374151' },
    };
};


const HistoryPage = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const size = useWindowSize(); // --- 2. USE THE HOOK ---
    const styles = getStyles(size, isDarkMode); // --- 3. GET DYNAMIC STYLES ---

    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoveredRow, setHoveredRow] = useState(null);

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);
        return () => { document.head.removeChild(styleElement); };
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setIsLoading(true);
                const response = await apiClient.get('/all/'); 
                console.log('Fetched history data:', response.data); 

                if (response.data && Array.isArray(response.data.predictions)) {
                    setPredictions(response.data.predictions); 
                    setError(''); 
                } else {
                    console.error("API response did not contain a 'predictions' array:", response.data);
                    setError('Received invalid data format from server.');
                    setPredictions([]); 
                }
            } catch (err) {
                setError('Failed to load prediction history.');
                console.error('API Error:', err.response || err.message || err); 
                setPredictions([]); 
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []); 

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Invalid Date';
        try {
            return new Date(timestamp).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
            });
        } catch (e) {
            console.error("Error formatting date:", timestamp, e);
            return 'Invalid Date';
        }
    };

    const cardShadowStyle = isDarkMode ? styles.darkCardShadow : styles.lightCardShadow;

    const renderLoading = () => (
        <div style={{...styles.cardContainer, ...styles.feedbackBox, ...cardShadowStyle}}>
            <FaSpinner style={{...styles.feedbackIcon, ...styles.spinner}} />
            <p style={styles.feedbackText}>Loading History...</p>
        </div>
    );
    const renderError = () => (
         <div style={{...styles.cardContainer, ...styles.feedbackBox, ...cardShadowStyle}}>
            <FaExclamationCircle style={{...styles.feedbackIcon, color: '#ef4444'}} />
            <p style={{...styles.feedbackText, ...styles.errorText}}>{error}</p>
        </div>
    );
     const renderEmpty = () => (
        <div style={{...styles.cardContainer, ...styles.feedbackBox, ...cardShadowStyle}}>
            <FaHistory style={styles.feedbackIcon} />
            <p style={styles.feedbackText}>No predictions found.</p>
        </div>
    );

    const renderTable = () => (
        <div style={{...styles.cardContainer, ...cardShadowStyle}}>
            {/* This div is crucial for mobile responsiveness */}
            <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                    <thead style={isDarkMode ? styles.darkTHead : styles.thead}>
                        <tr>
                            <th style={{...styles.th, ...(isDarkMode && styles.darkTh)}}>Predicted Class</th>
                            <th style={{...styles.th, ...(isDarkMode && styles.darkTh)}}>Confidence</th>
                            <th style={{...styles.th, textAlign: 'right', ...(isDarkMode && styles.darkTh)}}>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {predictions.map((pred, index) => (
                            <tr
                              key={index} 
                              style={{
                                  ...styles.tbodyTr,
                                  ...(hoveredRow === index && (isDarkMode ? styles.darkTrHover : styles.trHover))
                              }}
                              onMouseEnter={() => setHoveredRow(index)}
                              onMouseLeave={() => setHoveredRow(null)}
                            >
                                <td style={{
                                    ...styles.td, ...(isDarkMode && styles.darkTd),
                                    ...(pred.predicted_class === 'earthworm' ? styles.classEarthworm : styles.classFlatworm)
                                }}>
                                    {pred.predicted_class || 'N/A'}
                                </td>
                                <td style={{...styles.td, ...(isDarkMode && styles.darkTd)}}>
                                    {typeof pred.confidence === 'number' ? `${(pred.confidence * 100).toFixed(2)}%` : 'N/A'}
                                </td>
                                <td style={{...styles.td, textAlign: 'right', ...(isDarkMode && styles.darkTd)}}>
                                    {formatDate(pred.timestamp)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <AnimatedPage>
            <div className="container" style={{ padding: size.width < 768 ? '1.5rem 1rem' : '2rem 1.5rem' }}> {/* --- 4. RESPONSIVE PADDING --- */}
                <h1 style={{...styles.header, ...(isDarkMode && styles.darkTitle)}}>
                    Prediction History
                </h1>
                {isLoading ? renderLoading() : error ? renderError() : predictions.length === 0 ? renderEmpty() : renderTable()}
            </div>
        </AnimatedPage>
    );
};

export default HistoryPage;