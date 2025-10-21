import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Removed useAuth import here, as AppLayout handles the check

// Layouts
import AppLayout from './layouts/AppLayout'; // AppLayout handles auth check internally

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PredictPage from './pages/PredictPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes - Rendered inside AppLayout */}
        {/* AppLayout now acts as the element that renders its children if authenticated */}
        <Route element={<AppLayout />}> {/* Use AppLayout directly */}
          <Route path="/predict" element={<PredictPage />} /> {/* Use full paths */}
          <Route path="/history" element={<HistoryPage />} /> {/* Use full paths */}

          {/* Optional: If someone lands on a path handled by AppLayout without a specific child,
               you could redirect them, but usually direct links like /predict are used.
               The index route is removed as AppLayout doesn't have its own base path anymore. */}
        </Route>

        {/* Catch-all for unknown routes (Keep this last) */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;