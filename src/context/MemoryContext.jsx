import React, { createContext, useState, useContext } from 'react';

const initialMemories = [
  {
    id: '1',
    placeName: 'Museo Soumaya',
    coordinates: [19.4407, -99.2047],
    description: {
      fr: "Je suis allé au Museo Soumaya le week-end dernier. J'ai vu beaucoup d'œuvres d'art intéressantes. Le bâtiment était impressionnant !",
      en: "I went to the Museo Soumaya last weekend. I saw many interesting works of art. The building was impressive!",
      es: "Fui al Museo Soumaya el fin de semana pasado. Vi muchas obras de arte interesantes. ¡El edificio era impresionante!"
    },
    highlights: [
      { fr: "L'architecture magnifique", en: "Magnificent architecture", es: "La arquitectura magnífica" },
      { fr: "La collection de Rodin", en: "The Rodin collection", es: "La colección de Rodin" },
      { fr: "C'est gratuit", en: "It's free", es: "Es gratis" }
    ],
    negativePoint: {
      fr: "Il y a eu trop de monde l'après-midi.",
      en: "It was too crowded in the afternoon.",
      es: "Hubo demasiada gente por la tarde."
    },
    imageUrl: "https://image-tc.galaxy.tf/wijpeg-erd4s3e5ns9yjx8uvtc5zxb3s/museo-soumaya-1-orig_standard.jpg?crop=59%2C0%2C933%2C700",
    author: "Diego"
  },
  {
    id: '2',
    placeName: 'Parque La Mexicana',
    coordinates: [19.3562, -99.2678],
    description: {
      fr: "Nous nous sommes promenés dans le parc. Nous avons mangé des glaces au soleil. C'était très relaxant après les cours.",
      en: "We walked in the park. We ate ice cream in the sun. It was very relaxing after classes.",
      es: "Paseamos por el parque. Comimos helados al sol. Fue muy relajante después de clases."
    },
    highlights: [
      { fr: "Les grands espaces verts", en: "Large green spaces", es: "Los grandes espacios verdes" },
      { fr: "Le lac artificiel", en: "The artificial lake", es: "El lago artificial" },
      { fr: "Parfait pour se reposer", en: "Perfect for resting", es: "Perfecto para descansar" }
    ],
    negativePoint: {
      fr: "C'était un peu loin de chez moi.",
      en: "It was a bit far from my house.",
      es: "Estaba un poco lejos de mi casa."
    },
    imageUrl: "https://gdu.com.mx/wp-content/uploads/2025/05/FGS-LM-DJI_0689.jpg",
    author: "Axl"
  },
  {
    id: '3',
    placeName: 'Bosque de Chapultepec',
    coordinates: [19.4206, -99.1895],
    description: {
      fr: "J'ai visité le château avec mes amis. J'ai pris de belles photos de la ville. J'ai beaucoup marché.",
      en: "I visited the castle with my friends. I took beautiful photos of the city. I walked a lot.",
      es: "Visité el castillo con mis amigos. Tomé hermosas fotos de la ciudad. Caminé mucho."
    },
    highlights: [
      { fr: "Le Castillo de Chapultepec", en: "Chapultepec Castle", es: "El Castillo de Chapultepec" },
      { fr: "La vue sur la ville", en: "City view", es: "La vista de la ciudad" },
      { fr: "La faune et la flore", en: "Flora and fauna", es: "La fauna y flora" }
    ],
    negativePoint: {
      fr: "Nous avons été très fatigués à la fin.",
      en: "We were very tired at the end.",
      es: "Estuvimos muy cansados al final."
    },
    imageUrl: "https://www.civitatis.com/f/mexico/ciudad-de-mexico/free-tour-chapultepec-589x392.jpg",
    author: "Diego"
  },
  {
    id: '4',
    placeName: 'Xochimilco',
    coordinates: [19.2635, -99.1025],
    description: {
      fr: "Nous avons loué une trajinera colorée. Nous avons écouté des mariachis et nous avons dansé. Nous avons passé un super moment.",
      en: "We rented a colorful trajinera. We listened to mariachis and danced. We had a great time.",
      es: "Alquilamos una trajinera colorida. Escuchamos mariachis y bailamos. Lo pasamos genial."
    },
    highlights: [
      { fr: "La musique traditionnelle", en: "Traditional music", es: "La música tradicional" },
      { fr: "L'ambiance festive", en: "Festive atmosphere", es: "El ambiente festivo" },
      { fr: "La nourriture sur les bateaux", en: "Food on the boats", es: "La comida en las trajineras" }
    ],
    negativePoint: {
      fr: "J'ai dépensé beaucoup d'argent.",
      en: "I spent a lot of money.",
      es: "Gasté mucho dinero."
    },
    imageUrl: "https://escapadas.mexicodesconocido.com.mx/wp-content/uploads/2024/03/mexico-1354388_1280.jpg",
    author: "Axl"
  },
  {
    id: '5',
    placeName: 'Coyoacán - Casa Azul',
    coordinates: [19.3551, -99.1627],
    description: {
      fr: "Je suis allé à la Casa Azul. J'ai admiré les peintures de Frida Kahlo. Ensuite, j'ai acheté du café au marché.",
      en: "I went to Casa Azul. I admired Frida Kahlo's paintings. Then, I bought coffee at the market.",
      es: "Fui a la Casa Azul. Admiré las pinturas de Frida Kahlo. Luego, compré café en el mercado."
    },
    highlights: [
      { fr: "L'histoire de Frida", en: "Frida's history", es: "La historia de Frida" },
      { fr: "L'art mexicain", en: "Mexican art", es: "El arte mexicano" },
      { fr: "Le café délicieux", en: "Delicious coffee", es: "El café delicioso" }
    ],
    negativePoint: {
      fr: "J'ai dû attendre une heure pour entrer.",
      en: "I had to wait an hour to get in.",
      es: "Tuve que esperar una hora para entrar."
    },
    imageUrl: "https://mexicocity.cdmx.gob.mx/wp-content/uploads/2019/12/1024px-Frida’s_museum.jpg",
    author: "Diego"
  }
];

const MemoryContext = createContext();

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('carte_de_vie_memories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    return initialMemories;
  });

  const addMemory = (memory) => {
    setMemories(prevMemories => {
      const newMemories = [{ ...memory, id: Date.now().toString() }, ...prevMemories];
      localStorage.setItem('carte_de_vie_memories', JSON.stringify(newMemories));
      return newMemories;
    });
  };

  return (
    <MemoryContext.Provider value={{ memories, addMemory }}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemories = () => useContext(MemoryContext);
