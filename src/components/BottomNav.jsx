import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, PlusSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;
  const { t } = useLanguage();

  // Don't show bottom nav on detail pages to maintain full screen feel
  if (path.startsWith('/memory/')) return null;

  return (
    <div className="bottom-nav">
      <Link to="/" className={`nav-item ${path === '/' ? 'active' : ''}`}>
        <Home size={24} color={path === '/' ? 'var(--primary)' : 'var(--text-secondary)'} />
        <span>{t('nav_home')}</span>
      </Link>
      
      <Link to="/map" className={`nav-item ${path === '/map' ? 'active' : ''}`}>
        <MapIcon size={24} color={path === '/map' ? 'var(--primary)' : 'var(--text-secondary)'} />
        <span>{t('nav_map')}</span>
      </Link>
      
      <Link to="/add" className={`nav-item ${path === '/add' ? 'active' : ''}`}>
        <PlusSquare size={24} color={path === '/add' ? 'var(--primary)' : 'var(--text-secondary)'} />
        <span>{t('nav_add')}</span>
      </Link>
    </div>
  );
}
