import React, { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { 
    FaUpload, FaTimes, FaBrain, 
    FaSpinner, FaCheckCircle, FaExclamationTriangle 
} from 'react-icons/fa';
import apiClient from '../api/apiClient';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext'; // <-- 1. IMPORT YOUR AUTH HOOK

// --- Define our new keyframe animations ---
const keyframes = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes slideUpFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// --- STYLES ---
const styles = {
  header: { textAlign: 'center', marginBottom: '2.5rem' },
  title: { fontSize: '2.25rem', fontWeight: 800 },
  subtitle: { marginTop: '0.5rem', fontSize: '1.125rem', color: '#6b7280' },
  uploadBox: {
    maxWidth: '42rem',
    margin: 'auto',
    backgroundColor: 'var(--bg-light)',
    padding: '2rem',
    borderRadius: '1rem',
  },
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '16rem',
    border: '2px dashed #d1d5db',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    backgroundColor: 'var(--secondary-light)',
    transition: 'background-color 0.2s',
  },
  dropzoneHover: {
    backgroundColor: '#e5e7eb',
  },
  dropzoneIcon: {
    fontSize: '3rem',
    color: '#9ca3af',
    marginBottom: '1rem',
  },
  dropzoneText: {
    color: '#6b7280',
    fontWeight: 500,
  },
  previewContainer: {
    position: 'relative',
    width: '100%',
    minHeight: '20rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  previewImage: {
    width: '100%',
    maxHeight: '20rem',
    objectFit: 'contain',
    borderRadius: '0.5rem',
    border: '1px solid var(--border-light)'
  },
  clearButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '2rem',
    height: '2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  predictButton: {
    width: '100%',
    padding: '0.75rem 1rem',
    fontWeight: 600,
    color: 'white',
    backgroundColor: 'var(--primary-light)',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '1rem',
    transition: 'all 0.3s',
  },
  predictButtonHover: {
    backgroundColor: '#16a34a',
    transform: 'scale(1.02)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  predictButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  resultBox: {
    marginTop: '2rem',
    padding: '1.5rem',
    borderTop: '4px solid var(--primary-light)',
    backgroundColor: 'var(--secondary-light)',
    textAlign: 'center',
  },
  resultBoxAnimated: {
    animation: 'slideUpFadeIn 0.5s ease-out',
  },
  resultClass: {
    margin: '0.5rem 0',
    fontSize: '2.25rem',
    fontWeight: 700,
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
  },
  resultClassEarthworm: {
    color: 'var(--primary-light)',
  },
  resultClassFlatworm: {
    color: '#ef4444',
  },
  resultConfidence: { fontSize: '1.25rem', color: 'var(--text-light)' },
  errorMessage: {
    marginTop: '1rem',
    color: '#ef4444',
    textAlign: 'center',
    fontWeight: 500,
  },
  spinner: {
    animation: 'spin 1s linear infinite',
  },
  darkTitle: { color: 'var(--text-dark)' },
  darkSubtitle: { color: '#9ca3af' },
  darkUploadBoxShadow: { boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)' },
  lightUploadBoxShadow: { boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }
};

const PredictPage = () => {
    const { theme } = useTheme();
    const { user } = useAuth(); // <-- 2. GET THE USER FROM CONTEXT
    const isDarkMode = theme === 'dark';

    // --- State for the component ---
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isHovering, setIsHovering] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    // --- useEffect to inject keyframes ---
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = keyframes;
        document.head.appendChild(styleElement);
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    // --- Event Handlers ---
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setResult(null);
            setError('');
            const reader = new FileReader();
            reader.onloadend = () => { setPreview(reader.result); };
            reader.readAsDataURL(selectedFile);
        }
    };
    
    const clearFile = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setError('');
    };

    const handlePredict = async () => {
        if (!file) return;
        setIsLoading(true);
        setError('');
        setResult(null);
        
        const formData = new FormData();
        formData.append('image', file);

        // --- 3. ADD THE USERNAME TO THE REQUEST ---
        if (user && user.username) {
            formData.append('username', user.username);
        }
        // ----------------------------------------

        try {
            const response = await apiClient.post('/predict/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data);
        } catch (err) {
            setError('Prediction failed. Please try another image.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- Dynamic Styles ---
    const dropzoneStyle = {
      ...styles.dropzone,
      ...(isHovering && styles.dropzoneHover),
    };
    const buttonStyle = {
      ...styles.predictButton,
      ...((isLoading || !file) && styles.predictButtonDisabled),
      ...(isButtonHovered && !isLoading && file && styles.predictButtonHover),
    };

    return (
        <AnimatedPage>
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <div style={styles.header}>
                    <h1 style={{...styles.title, ...(isDarkMode && styles.darkTitle)}}>AI Worm Classifier</h1>
                    <p style={{...styles.subtitle, ...(isDarkMode && styles.darkSubtitle)}}>Upload an image to get a prediction.</p>
                </div>

                <div style={{...styles.uploadBox, ...(isDarkMode ? styles.darkUploadBoxShadow : styles.lightUploadBoxShadow)}}>
                    {!preview ? (
                        <label
                          htmlFor="image-upload"
                          style={dropzoneStyle}
                          onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
                          onDragLeave={() => setIsHovering(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsHovering(false);
                            handleFileChange({ target: { files: e.dataTransfer.files } });
                          }}
                        >
                            <FaUpload style={styles.dropzoneIcon} />
                            <p style={styles.dropzoneText}>Click to upload or drag and drop</p>
                            <input id="image-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                        </label>
                    ) : (
                        <div style={styles.previewContainer}>
                            <img src={preview} alt="Preview" style={styles.previewImage} />
                            <button onClick={clearFile} style={styles.clearButton} aria-label="Remove image">
                                <FaTimes />
                            </button>
                            
                            <button 
                              onClick={handlePredict} 
                              style={buttonStyle} 
                              disabled={isLoading || !file}
                              onMouseEnter={() => setIsButtonHovered(true)}
                              onMouseLeave={() => setIsButtonHovered(false)}
                            >
                                {isLoading ? <FaSpinner style={styles.spinner} /> : <FaBrain />}
                                {isLoading ? 'Analyzing...' : 'Classify Worm'}
                            </button>
                        </div>
                    )}
                    
                    {error && <p style={styles.errorMessage}>{error}</p>}

                    {result && (
                        <div style={{...styles.resultBox, ...styles.resultBoxAnimated}}>
                            <h3 style={{
                                ...styles.resultClass, 
                                ...(result.predicted_class === 'earthworm' ? styles.resultClassEarthworm : styles.resultClassFlatworm)
                            }}>
                                {result.predicted_class === 'earthworm' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                <span>{result.predicted_class}</span>
                            </h3>
                            <p style={styles.resultConfidence}>
                                Confidence: <strong>{(result.confidence * 100).toFixed(2)}%</strong>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default PredictPage;