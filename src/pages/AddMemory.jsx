import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemories } from '../context/MemoryContext';
import { useLanguage } from '../context/LanguageContext';
import { ImagePlus } from 'lucide-react';
import { translateToAll } from '../utils/translate';

export default function AddMemory() {
  const { addMemory } = useMemories();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isTranslating, setIsTranslating] = useState(false);

  const [formData, setFormData] = useState({
    author: '',
    placeName: '',
    description: '',
    lat: '19.4326',
    lng: '-99.1332',
    highlight1: '',
    highlight2: '',
    highlight3: '',
    negativePoint: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTranslating(true);
    
    // Translate text fields
    const translatedDesc = await translateToAll(formData.description);
    const translatedNegative = await translateToAll(formData.negativePoint);
    
    const highlights = [];
    if (formData.highlight1.trim()) highlights.push(await translateToAll(formData.highlight1));
    if (formData.highlight2.trim()) highlights.push(await translateToAll(formData.highlight2));
    if (formData.highlight3.trim()) highlights.push(await translateToAll(formData.highlight3));

    const newMemory = {
      placeName: formData.placeName,
      coordinates: [parseFloat(formData.lat), parseFloat(formData.lng)],
      description: translatedDesc,
      highlights: highlights,
      negativePoint: translatedNegative,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1518104593124-ac2e697eeeee?w=600&h=400&fit=crop',
      author: formData.author || (Math.random() > 0.5 ? "Diego" : "Axl")
    };

    addMemory(newMemory);
    setIsTranslating(false);
    navigate('/');
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid var(--glass-border)',
    marginBottom: '16px',
    fontSize: '1rem',
    backgroundColor: 'var(--card-bg)',
    backdropFilter: 'var(--glass-blur)',
    WebkitBackdropFilter: 'var(--glass-blur)',
    color: 'var(--text-primary)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--text-primary)'
  };

  return (
    <div className="page split-view" style={{ padding: 0, height: '100%' }}>
      <div className="app-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <h1>{t('new_memory')}</h1>
      </div>

      <div className="split-left" style={{ padding: '80px 16px 16px', display: 'flex', flexDirection: 'column' }}>
        {formData.imageUrl ? (
          <img 
            src={formData.imageUrl} 
            alt="Preview" 
            className="social-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518104593124-ac2e697eeeee?w=600&h=400&fit=crop' }} 
          />
        ) : (
          <div style={{ flex: 1, backgroundColor: 'var(--card-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <ImagePlus size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
            <span>Image Preview</span>
          </div>
        )}
      </div>

      <div className="split-right" style={{ padding: '80px 16px 16px' }}>
        <form onSubmit={handleSubmit}>
          
          <label style={labelStyle}>{t('img_url')}</label>
          <input 
            type="text" 
            name="imageUrl" 
            value={formData.imageUrl} 
            onChange={handleChange} 
            placeholder="https://..."
            style={inputStyle}
          />

          <label style={labelStyle}>{t('place_name')}</label>
          <input 
            type="text" 
            name="placeName" 
            value={formData.placeName} 
            onChange={handleChange} 
            required 
            placeholder=""
            style={inputStyle}
          />

          <label style={labelStyle}>{t('your_name')}</label>
          <input 
            type="text" 
            name="author" 
            value={formData.author} 
            onChange={handleChange} 
            placeholder=""
            style={inputStyle}
          />

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t('latitude')}</label>
              <input type="text" name="lat" value={formData.lat} onChange={handleChange} required style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>{t('longitude')}</label>
              <input type="text" name="lng" value={formData.lng} onChange={handleChange} required style={inputStyle} />
            </div>
          </div>

          <label style={labelStyle}>{t('desc_label')}</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required
            rows="4"
            placeholder={t('desc_placeholder')}
            style={{ ...inputStyle, resize: 'none' }}
          />

          <h3 style={{ margin: '24px 0 16px', fontSize: '1.2rem', fontWeight: 'bold' }}>{t('positive_points')}</h3>
          <input type="text" name="highlight1" value={formData.highlight1} onChange={handleChange} placeholder="1." style={inputStyle} required />
          <input type="text" name="highlight2" value={formData.highlight2} onChange={handleChange} placeholder="2." style={inputStyle} />
          <input type="text" name="highlight3" value={formData.highlight3} onChange={handleChange} placeholder="3." style={inputStyle} />

          <h3 style={{ margin: '24px 0 16px', fontSize: '1.2rem', fontWeight: 'bold' }}>{t('negative_point')}</h3>
          <input 
            type="text" 
            name="negativePoint" 
            value={formData.negativePoint} 
            onChange={handleChange} 
            placeholder={t('negative_placeholder')}
            style={inputStyle} 
            required 
          />

          <button type="submit" disabled={isTranslating} className="btn" style={{ marginTop: '16px', marginBottom: '32px', opacity: isTranslating ? 0.7 : 1 }}>
            {isTranslating ? t('translating_saving') || "Translating..." : t('save_memory')}
          </button>
        </form>
      </div>
    </div>
  );
}
