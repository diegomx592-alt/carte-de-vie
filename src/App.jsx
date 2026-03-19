import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MemoryProvider } from './context/MemoryContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { ViewProvider } from './context/ViewContext';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import MapScreen from './pages/MapScreen';
import AddMemory from './pages/AddMemory';
import MemoryDetail from './pages/MemoryDetail';

export default function App() {
  return (
    <ViewProvider>
      <ThemeProvider>
        <LanguageProvider>
          <MemoryProvider>
            <BrowserRouter>
              <div className="app-container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/map" element={<MapScreen />} />
                  <Route path="/add" element={<AddMemory />} />
                  <Route path="/memory/:id" element={<MemoryDetail />} />
                </Routes>
              </div>
              <BottomNav />
            </BrowserRouter>
          </MemoryProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ViewProvider>
  );
}
