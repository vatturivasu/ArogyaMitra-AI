import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeLangProvider } from './context/ThemeLangContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HealthGuidance from './pages/HealthGuidance';
import Schemes from './pages/Schemes';
import Centers from './pages/Centers';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeLangProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/guidance" 
                element={
                  <PrivateRoute>
                    <HealthGuidance />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/schemes" 
                element={
                  <PrivateRoute>
                    <Schemes />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/centers" 
                element={
                  <PrivateRoute>
                    <Centers />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeLangProvider>
  );
};

export default App;
