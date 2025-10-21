import React, { useEffect } from 'react';

// Define the CSS keyframe animations as a string.
// This is the only way to embed keyframes without a separate CSS file.
const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes drawWorm {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

// Define the styles as JavaScript objects
const styles = {
  // Styles for the full-screen container
  loaderContainer: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    // The animation name 'fadeIn' will be recognized from the injected style tag
    animation: 'fadeIn 0.5s ease-in-out',
  },

  // Styles for the SVG worm path
  wormPath: {
    fill: 'none',
    strokeWidth: 5,
    strokeLinecap: 'round',
    // The "drawing" effect setup
    strokeDasharray: 157,
    strokeDashoffset: 157,
    // The animation name 'drawWorm' will be recognized
    animation: 'drawWorm 2s ease-in-out infinite alternate',
  },
};

const WormLoader = () => {
  // This effect injects the keyframes into the document's head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = keyframes;
    document.head.appendChild(styleElement);

    // This cleanup function runs when the component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // The empty array ensures this effect runs only once

  // Determine the current theme to apply conditional colors
  const isDarkMode = document.body.classList.contains('dark');

  // Dynamically set background and stroke colors based on the theme
  const containerStyle = {
    ...styles.loaderContainer,
    backgroundColor: isDarkMode ? 'var(--bg-dark)' : 'var(--bg-light)',
  };

  const pathStyle = {
    ...styles.wormPath,
    stroke: isDarkMode ? 'var(--primary-dark)' : 'var(--primary-light)',
  };

  return (
    <div style={containerStyle}>
      <svg
        width="100"
        height="50"
        viewBox="0 0 100 50"
      >
        <path
          style={pathStyle}
          d="M 10 25 C 20 10, 30 10, 40 25 S 50 40, 60 25 S 70 10, 80 25 S 90 40, 100 25"
        />
      </svg>
    </div>
  );
};

export default WormLoader;