import React from 'react';
import { useMemories } from '../context/MemoryContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useView } from '../context/ViewContext';
import { Moon, Sun, Smartphone, Tablet, Monitor } from 'lucide-react';
import MemoryCard from '../components/MemoryCard';

export default function Home() {
  const { memories } = useMemories();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { view, setView } = useView();

  const cycleView = () => {
    if (view === 'phone') setView('tablet');
    else if (view === 'tablet') setView('desktop');
    else setView('phone');
  };

  return (
    <div className="page" style={{ padding: 0 }}>
      {/* Instagram-like header */}
      <div className="app-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '-0.5px' }}>{t('app_title')}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={cycleView}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {view === 'phone' && <Smartphone size={18} color="var(--text-primary)" />}
            {view === 'tablet' && <Tablet size={18} color="var(--text-primary)" />}
            {view === 'desktop' && <Monitor size={18} color="var(--text-primary)" />}
          </button>
          
          <button 
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {theme === 'dark' ? <Sun size={20} color="var(--text-primary)" /> : <Moon size={20} color="var(--text-primary)" />}
          </button>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '0.8rem',
              background: 'var(--card-bg)',
              outline: 'none',
              color: 'var(--text-primary)'
            }}
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>
      </div>
      
      <div style={{ padding: '20px 16px', backgroundColor: 'var(--bg-color)' }}>
        <p style={{ 
          fontSize: '1rem', 
          color: 'var(--text-secondary)',
          marginBottom: '20px',
          fontWeight: 500
        }}>
          {t('my_memories')}
        </p>

        <div className="memory-grid">
          {memories.map((memory) => (
             <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      </div>
    </div>
  );
}
