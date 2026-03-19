import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MemoryCard({ memory }) {
  const { t, language } = useLanguage();
  return (
    <Link to={`/memory/${memory.id}`} style={{ textDecoration: 'none' }}>
      <div className="memory-card">
        <div className="image-container">
          <img 
            className="social-image"
            src={memory.imageUrl} 
            alt={memory.placeName} 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518104593124-ac2e697eeeee?w=600&h=400&fit=crop' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 16px 16px',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            color: 'white'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '4px' }}>
              {memory.placeName}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', opacity: 0.9 }}>
              <MapPin size={14} />
              <span>{t('cd_mx', 'Mexico City')}</span>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '12px 16px 0', display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontSize: '0.8rem', color: '#9CA3AF', letterSpacing: '0.2px' }}>
            {t('pub_by')} {memory.author || 'Diego'}
          </span>
        </div>

        <div style={{ padding: '8px 16px 16px' }}>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.95rem',
            lineHeight: '1.5',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {typeof memory.description === 'object' ? memory.description[language] || memory.description.fr : memory.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
