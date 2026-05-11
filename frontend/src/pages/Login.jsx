import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/ThemeLangContext';

// DEMO credentials
const DEMO_USER = 'demo';
const DEMO_PASS = 'demo123';

const Login = () => {
  const { t } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Check demo credentials OR any user registered via signup
    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const found = savedUsers.find(u => u.username === username && u.password === password);
    const isDemo = username === DEMO_USER && password === DEMO_PASS;

    if (isDemo || found) {
      localStorage.setItem('token', username + '_token');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem('token', 'demo_token');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>{t('login')}</h2>
      {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>{t('username')}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>{t('password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">{t('login')}</button>
      </form>

      {/* Demo Login Banner */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'var(--card-bg)',
        border: '2px dashed var(--secondary-color)',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
          🎯 Try the demo without signing up
        </p>
        <button
          onClick={handleDemoLogin}
          className="btn-primary"
          style={{ backgroundColor: 'var(--secondary-color)', width: 'auto', padding: '0.6rem 1.5rem' }}
        >
          ▶ Launch Demo
        </button>
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>
          Demo credentials: <strong>demo / demo123</strong>
        </p>
      </div>

      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--secondary-color)' }}>{t('signup')}</Link>
      </p>
    </div>
  );
};

export default Login;
