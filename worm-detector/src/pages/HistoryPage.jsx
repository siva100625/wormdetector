import React, { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { useTheme } from '../contexts/ThemeContext';
import apiClient from '../api/apiClient';
import { FaHistory, FaSpinner, FaExclamationCircle } from 'react-icons/fa'; // Added FaExclamationCircle

// --- STYLES ---
const keyframes = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
    fontSize: '2.25rem',
    fontWeight: 800,
  },
  // --- Enhanced Card Style ---
  cardContainer: { // General style for table container and feedback boxes
    backgroundColor: 'var(--bg-light)', // Always white card
    padding: '1.5rem', // More internal padding
    borderRadius: '1rem',
    overflow: 'hidden', // Ensures shadows/borders respect rounding
    marginBottom: '2rem', // Space below the card
  },
  table: {
    minWidth: '100%',
    borderCollapse: 'separate', // Use separate for spacing/border-radius
    borderSpacing: 0, // Reset default spacing
    textAlign: 'left', // Ensure text aligns left by default
  },
  thead: { // Style for the table header section
    backgroundColor: '#f9fafb', // Light gray header bg
  },
  th: {
    padding: '1rem 1.5rem',
    fontSize: '0.75rem',
    fontWeight: 600, // Slightly bolder
    color: '#6b7280', // Gray text
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '2px solid #e5e7eb', // Slightly stronger border below header
  },
  tbodyTr: { // Style for table body rows
     transition: 'background-color 0.15s ease-in-out', // Smooth hover transition
  },
  td: {
    padding: '1rem 1.5rem',
    fontSize: '0.875rem',
    color: 'var(--text-light)', // Always dark text on white bg
    borderTop: '1px solid #e5e7eb', // Light border between rows
  },
  trHover: {
    backgroundColor: '#f3f4f6', // Slightly darker gray on hover
  },
  classEarthworm: { color: '#8b4513', fontWeight: 600 },
  classFlatworm: { color: '#ef4444', fontWeight: 600 },

  // --- Enhanced Feedback Box ---
  feedbackBox: { // Inherits from cardContainer for consistency
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 1.5rem', // Adjusted padding
    textAlign: 'center',
    gap: '1rem',
  },
  feedbackIcon: { fontSize: '3rem', color: '#9ca3af' },
  feedbackText: { fontSize: '1.125rem', fontWeight: 500, color: '#6b7280' },
  errorText: { color: '#ef4444' }, // Specific color for error text
  spinner: { animation: 'spin 1s linear infinite' },

  // --- Dynamic Styles ---
  darkTitle: { color: 'var(--text-dark)' },
  darkCardShadow: { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)' },
  lightCardShadow: { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' },
  // Dark mode table specifics (borders, header bg)
  darkTHead: { backgroundColor: '#374151' }, // Darker header bg
  darkTh: { color: '#d1d5db', borderBottomColor: '#4b5563'}, // Lighter text, darker border
  darkTd: { borderTopColor: '#4b5563' }, // Darker row border
  darkTrHover: { backgroundColor: '#374151' }, // Darker hover
};

const HistoryPage = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    // --- State for data, loading, and errors ---
    const [predictions, setPredictions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row index

    // --- Inject animations ---
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);
        return () => { document.head.removeChild(styleElement); };
    }, []);

    // --- Data fetching ---
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setIsLoading(true);
                const response = await apiClient.get('/all/'); // Your backend endpoint
                console.log('Fetched history data:', response.data); // Log the received object

                // Check if the response is an object AND has the 'predictions' key which IS an array
                if (response.data && Array.isArray(response.data.predictions)) {
                    setPredictions(response.data.predictions); // Access the array using the 'predictions' key
                    setError(''); // Clear any previous error
                } else {
                    // Handle cases where the structure is wrong or the 'predictions' key is missing/not an array
                    console.error("API response did not contain a 'predictions' array:", response.data);
                    setError('Received invalid data format from server.');
                    setPredictions([]); // Set to empty array to prevent map errors
                }

            } catch (err) {
                // Handle network errors or non-2xx responses from the API
                setError('Failed to load prediction history.');
                console.error('API Error:', err.response || err.message || err); // Log more detailed error info
                setPredictions([]); // Clear predictions on error
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []); // Empty array ensures this runs only once when the component mounts

    // --- Helper function to format date ---
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Invalid Date'; // Handle potential null/undefined timestamps
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

    // --- Dynamic Shadow Style ---
    const cardShadowStyle = isDarkMode ? styles.darkCardShadow : styles.lightCardShadow;

    // --- Render Functions for Feedback States ---
    const renderLoading = () => (
        <div style={{...styles.cardContainer, ...styles.feedbackBox, ...cardShadowStyle}}>
            <FaSpinner style={{...styles.feedbackIcon, ...styles.spinner}} />
            <p style={styles.feedbackText}>Loading History...</p>
        </div>
    );
    const renderError = () => (
         <div style={{...styles.cardContainer, ...styles.feedbackBox, ...cardShadowStyle}}>
            <FaExclamationCircle style={{...styles.feedbackIcon, color: '#ef4444'}} /> {/* Error Icon */}
            <p style={{...styles.feedbackText, ...styles.errorText}}>{error}</p>
        </div>
    );
     const renderEmpty = () => (
        <div style={{...styles.cardContainer, ...styles.feedbackBox, ...cardShadowStyle}}>
            <FaHistory style={styles.feedbackIcon} />
            <p style={styles.feedbackText}>No predictions found.</p>
        </div>
    );

    // --- Main Render Function for the Table ---
    const renderTable = () => (
        <div style={{...styles.cardContainer, ...cardShadowStyle}}> {/* Apply card style and shadow */}
            <div style={{ overflowX: 'auto' }}> {/* Add horizontal scroll for smaller screens */}
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
                              key={index} // Using index as key because 'id' is not guaranteed
                              style={{
                                  ...styles.tbodyTr,
                                  ...(hoveredRow === index && (isDarkMode ? styles.darkTrHover : styles.trHover)) // Apply hover style
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
            {/* Consistent padding with PredictPage */}
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <h1 style={{...styles.header, ...(isDarkMode && styles.darkTitle)}}>
                    Prediction History
                </h1>
                {/* --- Adjusted Render Logic --- */}
                {isLoading ? renderLoading() : error ? renderError() : predictions.length === 0 ? renderEmpty() : renderTable()}
            </div>
        </AnimatedPage>
    );
};

export default HistoryPage;