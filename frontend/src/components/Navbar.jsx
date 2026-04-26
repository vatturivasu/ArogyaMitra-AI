import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/ThemeLangContext';
import { Moon, Sun, HeartPulse, LogOut } from 'lucide-react';

const Navbar = () => {
  const { theme, toggleTheme, lang, setLang, t } = useApp();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <HeartPulse size={28} />
        {t('appTitle')}
      </Link>
      
      <div className="nav-controls">
        <select 
          className="lang-select" 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="te">తెలుగు</option>
        </select>
        
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {token && (
          <button className="icon-btn" onClick={handleLogout} title={t('logout')}>
            <LogOut size={20} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
