import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useMemories } from '../context/MemoryContext';
import { useLanguage } from '../context/LanguageContext';

export default function MapScreen() {
  const { memories } = useMemories();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const center = [19.4326, -99.1332]; // Mexico City center

  return (
    <div className="page" style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="app-header">
        <h1>{t('nav_map')}</h1>
      </div>
      
      <div style={{ flex: 1, position: 'relative' }}>
        {mounted && (
          <MapContainer 
            center={center} 
            zoom={11} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {memories.map((memory) => (
              <Marker 
                key={memory.id} 
                position={memory.coordinates}
                eventHandlers={{
                  click: () => {
                    navigate(`/memory/${memory.id}`);
                  },
                }}
              >
                <Popup>
                  <div style={{ textAlign: 'center' }}>
                    <strong>{memory.placeName}</strong><br/>
                    <button 
                      onClick={() => navigate(`/memory/${memory.id}`)}
                      style={{
                        marginTop: '8px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {t('see_details')}
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
