import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/ThemeLangContext';
import { Stethoscope, FileText, MapPin } from 'lucide-react';

const Home = () => {
  const { t } = useApp();
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>
        {t('home')}
      </h1>
      <p style={{ opacity: 0.8 }}>Welcome to ArogyaMitra AI. Please select a service below.</p>

      <div className="card-grid">
        <div className="card" onClick={() => navigate('/guidance')}>
          <div className="card-icon">
            <Stethoscope size={40} />
          </div>
          <h3>{t('healthGuidance')}</h3>
          <p>{t('healthGuidanceDesc')}</p>
        </div>

        <div className="card" onClick={() => navigate('/schemes')}>
          <div className="card-icon">
            <FileText size={40} />
          </div>
          <h3>{t('schemes')}</h3>
          <p>{t('schemesDesc')}</p>
        </div>

        <div className="card" onClick={() => navigate('/centers')}>
          <div className="card-icon">
            <MapPin size={40} />
          </div>
          <h3>{t('centers')}</h3>
          <p>{t('centersDesc')}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
