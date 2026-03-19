import React, { createContext, useState, useContext } from 'react';

const translations = {
  fr: {
    app_title: 'Carte de Vie',
    my_memories: 'Mes souvenirs à Mexico City',
    new_memory: 'Nouveau Souvenir',
    add_photo: 'Ajouter une photo (URL)',
    img_url: "URL de l'image",
    place_name: "Nom du lieu",
    your_name: "Votre Nom (Auteur)",
    latitude: "Latitude",
    longitude: "Longitude",
    desc_label: "Description (Passé Composé)",
    desc_placeholder: "Je suis allé au musée. J'ai vu...",
    positive_points: "Les Points Positifs",
    negative_point: "Le Point Négatif",
    negative_placeholder: "Qu'est-ce qui n'était pas bien ?",
    save_memory: "Enregistrer le souvenir",
    my_experience: "Mon Expérience",
    nav_home: "Accueil",
    nav_map: "Carte",
    nav_add: "Ajouter",
    pub_by: "Publication créée par",
    pub_by: "Publication créée par",
    not_found: "Souvenir introuvable",
    see_details: "Voir les détails",
    translating_saving: "Traduction et sauvegarde...",
    cd_mx: "Mexico City",
    souvenirs_explored: "souvenirs explorés"
  },
  en: {
    app_title: 'Map of Life',
    my_memories: 'My memories in Mexico City',
    new_memory: 'New Memory',
    add_photo: 'Add a photo (URL)',
    img_url: "Image URL",
    place_name: "Place Name",
    your_name: "Your Name (Author)",
    latitude: "Latitude",
    longitude: "Longitude",
    desc_label: "Description",
    desc_placeholder: "I went to the museum. I saw...",
    positive_points: "The Highlights",
    negative_point: "The Lowlight",
    negative_placeholder: "What wasn't so great?",
    save_memory: "Save memory",
    my_experience: "My Experience",
    nav_home: "Home",
    nav_map: "Map",
    nav_add: "Add",
    pub_by: "Post created by",
    pub_by: "Post created by",
    not_found: "Memory not found",
    see_details: "See details",
    translating_saving: "Translating and saving...",
    cd_mx: "Mexico City",
    souvenirs_explored: "memories explored"
  },
  es: {
    app_title: 'Mapa de Vida',
    my_memories: 'Mis recuerdos en CDMX',
    new_memory: 'Nuevo Recuerdo',
    add_photo: 'Añadir una foto (URL)',
    img_url: "URL de la imagen",
    place_name: "Nombre del lugar",
    your_name: "Tu Nombre (Autor)",
    latitude: "Latitud",
    longitude: "Longitud",
    desc_label: "Descripción",
    desc_placeholder: "Fui al museo. Vi...",
    positive_points: "Lo Bueno",
    negative_point: "Lo Malo",
    negative_placeholder: "¿Qué no estuvo tan bien?",
    save_memory: "Guardar recuerdo",
    my_experience: "Mi Experiencia",
    nav_home: "Inicio",
    nav_map: "Mapa",
    nav_add: "Agregar",
    pub_by: "Publicación creada por",
    pub_by: "Publicación creada por",
    not_found: "Recuerdo no encontrado",
    see_details: "Ver detalles",
    translating_saving: "Traduciendo y guardando...",
    cd_mx: "Ciudad de México",
    souvenirs_explored: "recuerdos explorados"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
