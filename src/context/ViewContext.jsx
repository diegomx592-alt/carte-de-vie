import React, { createContext, useState, useEffect, useContext } from 'react';

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState(() => {
    return localStorage.getItem('carte_de_vie_view') || 'phone';
  });

  useEffect(() => {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.setAttribute('data-view', view);
    }
    document.body.setAttribute('data-view', view);
    localStorage.setItem('carte_de_vie_view', view);
  }, [view]);

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => useContext(ViewContext);
