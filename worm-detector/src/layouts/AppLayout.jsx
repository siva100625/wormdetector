import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LoggedInNavbar from '../components/LoggedinNavbar'; // <-- Import the new Navbar

const AppLayout = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // --- STYLES ---
    const layoutStyle = {
        minHeight: '100vh',
        // Background color for the whole logged-in area
        backgroundColor: isDarkMode ? 'var(--bg-dark)' : 'var(--secondary-light)',
        transition: 'background-color 0.3s',
        // Add padding top to account for the fixed navbar height
        paddingTop: '60px', // Adjust this value based on your navbar's actual height
    };
    // --- END STYLES ---

    return (
        <div style={layoutStyle}>
            {/* Render the new Navbar which includes the UserMenu */}
            <LoggedInNavbar />
            <main> {/* No specific style needed here now */}
                <Outlet /> {/* Child routes (PredictPage, HistoryPage) render here */}
            </main>
        </div>
    );
};

export default AppLayout;