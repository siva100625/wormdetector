import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context
const ThemeContext = createContext();

// 2. Create a custom hook for easy access
export const useTheme = () => useContext(ThemeContext);

// 3. Create the Provider component
export const ThemeProvider = ({ children }) => {
    // State to hold the current theme, defaulting to 'light' from localStorage
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    // This is the most important part.
    // This effect runs whenever the 'theme' state changes.
    useEffect(() => {
        const body = document.body;

        // Remove the old theme class before adding the new one
        body.classList.remove(theme === 'light' ? 'dark' : 'light');
        
        // Add the new theme class ('light' or 'dark') to the <body> tag
        body.classList.add(theme);

        // Save the current theme preference to the browser's local storage
        localStorage.setItem('theme', theme);

    }, [theme]); // The effect re-runs only when 'theme' changes

    // The function to toggle the theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Provide the theme and toggleTheme function to all child components
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};