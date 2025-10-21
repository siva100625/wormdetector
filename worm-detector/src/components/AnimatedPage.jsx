import React, { useEffect } from 'react';

// Define the CSS keyframe animation as a multi-line string.
// This animation will fade the component in and slide it up slightly.
const keyframes = `
  @keyframes fadeInUp {
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

// Define the inline styles for the component's wrapper div.
const styles = {
  wrapper: {
    // Apply the animation defined in the keyframes string.
    animation: 'fadeInUp 0.5s ease-out',
  },
};

const AnimatedPage = ({ children }) => {
  // This effect injects the keyframes into the document's head
  // so the 'animation' property in the style object can find it.
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = keyframes;
    document.head.appendChild(styleElement);

    // This cleanup function runs when the component unmounts,
    // removing the styles to keep the document clean.
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // The empty array ensures this effect runs only once per component mount.

  return (
    <div style={styles.wrapper}>
      {children}
    </div>
  );
};

export default AnimatedPage;