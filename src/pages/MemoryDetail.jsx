import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemories } from '../context/MemoryContext';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, ArrowLeft, Star, ThumbsDown } from 'lucide-react';

export default function MemoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { memories } = useMemories();
  const { t, language } = useLanguage();
  
  const memory = memories.find(m => m.id === id);

  if (!memory) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>{t('not_found')}</div>;
  }

  return (
    <div className="page split-view" style={{ padding: 0, backgroundColor: 'var(--bg-color)', minHeight: '100%' }}>
      
      {/* Header with image */}
      <div className="split-left">
        <button 
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
            background: 'var(--card-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '1px solid var(--glass-border)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--glass-shadow)',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={24} color="var(--text-primary)" />
        </button>
        
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
          padding: '40px 20px 20px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          color: 'white'
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px', lineHeight: '1.2' }}>
            {memory.placeName}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', opacity: 0.9 }}>
            <MapPin size={18} />
            <span>{t('cd_mx', 'Mexico City')}</span>
          </div>
        </div>
      </div>

      <div className="split-right">
        <div style={{ padding: '12px 20px 0', display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.85rem', color: '#9CA3AF', letterSpacing: '0.2px' }}>
          {t('pub_by')} {memory.author || 'Diego'}
        </span>
      </div>

      <div style={{ padding: '16px 20px' }}>
        
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-primary)' }}>
            {t('my_experience')}
          </h2>
          <p style={{ 
            fontSize: '1.05rem', 
            lineHeight: '1.6', 
            color: 'var(--text-secondary)'
          }}>
            {typeof memory.description === 'object' ? memory.description[language] || memory.description.fr : memory.description}
          </p>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Star color="#F59E0B" fill="#F59E0B" size={24}/>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {t('positive_points')}
            </h2>
          </div>
          
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(typeof memory.highlights?.[0] === 'object' ? memory.highlights.map(h => h[language] || h.fr) : memory.highlights).map((highlight, index) => (
              <li key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                backgroundColor: 'var(--card-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--glass-border)',
                padding: '12px 16px',
                borderRadius: '12px',
                color: 'var(--text-secondary)',
                boxShadow: 'var(--glass-shadow)',
                fontWeight: '500'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 158, 11, 0.2)',
                  color: '#F59E0B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </div>
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <ThumbsDown color="#EF4444" size={24}/>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              {t('negative_point')}
            </h2>
          </div>
          
          <div style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            padding: '16px',
            borderRadius: '12px',
            color: '#B91C1C',
            fontWeight: '500',
            borderLeft: '4px solid #EF4444',
            border: '1px solid var(--glass-border)'
          }}>
            {typeof memory.negativePoint === 'object' ? memory.negativePoint[language] || memory.negativePoint.fr : memory.negativePoint}
          </div>
        </section>

      </div>
      </div>
    </div>
  );
}
