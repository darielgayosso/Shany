export interface PolaroidMemory {
  id: string;
  title: string;
  image: string;
  date: string;
  location?: string;
  category: 'citas' | 'viajes' | 'risas' | 'especiales';
  backNote: string;
  rotation?: string; // e.g. '-rotate-2', 'rotate-3'
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  location?: string;
  description: string;
  image?: string;
  icon?: 'heart' | 'star' | 'plane' | 'camera' | 'sparkles';
}

export interface LoveEnvelope {
  id: string;
  title: string;
  openWhen: string;
  message: string;
}

export interface AlbumConfig {
  recipientName: string;
  authorName: string;
  startDate: string; // YYYY-MM-DD
  songTitle: string;
  songArtist: string;
  songUrl: string; // URL or path to audio file
  youtubeUrl?: string;
  polaroids: PolaroidMemory[];
  timeline: TimelineEvent[];
  loveEnvelopes: LoveEnvelope[];
  loveReasons: string[];
}

export const albumData: AlbumConfig = {
  recipientName: 'Shany',
  authorName: 'Dariel',
  startDate: '2023-08-16', // Inicio de su relación: 16 de Agosto
  songTitle: 'Collide',
  songArtist: 'Paris Jackson',
  songUrl: '/audio/collide.mp3', // MP3 oficial copiado a public/audio/collide.mp3
  youtubeUrl: 'https://youtu.be/7lSFLDQkQKs',
  polaroids: [
    {
      id: 'pol-1',
      title: 'Nuestra Primera Cita',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      date: '16 de Agosto',
      location: 'Nuestro lugar favorito',
      category: 'citas',
      backNote: 'Ese 16 de agosto supe que mi vida cambiaba para siempre. No podía dejar de mirarte y tu sonrisa hizo todo perfecto.',
      rotation: '-rotate-2',
    },
    {
      id: 'pol-2',
      title: 'Escapada a la Playa',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      date: '20 de Agosto',
      location: 'Atardecer en la Costa',
      category: 'viajes',
      backNote: 'Ver el atardecer juntos abrazados escuchando las olas. Nada se compara a estar a tu lado en un lugar tan mágico.',
      rotation: 'rotate-3',
    },
    {
      id: 'pol-3',
      title: 'Risas sin Sentido',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      date: '10 de Octubre',
      location: 'Tarde de café',
      category: 'risas',
      backNote: 'Nos dio un ataque de risa por una bobada y terminaste con lágrimas en los ojos de tanto reír. Amo tu risa contagiosa.',
      rotation: '-rotate-3',
    },
    {
      id: 'pol-4',
      title: 'Noche de Películas',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
      date: '14 de Febrero',
      location: 'En casa',
      category: 'especiales',
      backNote: 'Cobijas, palomitas y tú acurrucada junto a mí. Los momentos más sencillos contigo son los más valiosos.',
      rotation: 'rotate-2',
    },
    {
      id: 'pol-5',
      title: 'Tu Sonrisa Radiante',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      date: '03 de Diciembre',
      location: 'En el parque',
      category: 'especiales',
      backNote: 'Te tomé esta foto sin que te dieras cuenta y quedaste hermosa. Tienes una luz bonita que ilumina todo a tu alrededor.',
      rotation: '-rotate-1',
    },
    {
      id: 'pol-6',
      title: 'Viaje Inolvidable',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      date: '18 de Enero',
      location: 'Camino a las montañas',
      category: 'viajes',
      backNote: 'Música a todo volumen en el auto, cantando feo pero felices. Viajar contigo es la mejor aventura de la vida.',
      rotation: 'rotate-4',
    }
  ],
  timeline: [
    {
      id: 'time-1',
      title: 'El Día que comenzó nuestra historia',
      date: '16 de Agosto',
      location: 'Nuestro primer momento juntos',
      description: 'Una mirada bastó para saber que nuestras vidas iban a cambiar para siempre. La mejor coincidencia de mi vida.',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      icon: 'sparkles',
    },
    {
      id: 'time-2',
      title: 'Nuestro Primer "Te Amo"',
      date: '24 de Septiembre',
      location: 'Bajo las estrellas',
      description: 'Las palabras salieron del corazón sin pensarlo. Y sentir que tú sentías lo mismo fue el regalo más hermoso.',
      image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      icon: 'heart',
    },
    {
      id: 'time-3',
      title: 'Nuestro Primer Viaje Juntos',
      date: '20 de Noviembre',
      location: 'La Playa',
      description: 'Días llenos de sol, mar, comida deliciosa y conversaciones profundas de noche mirando las estrellas.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      icon: 'plane',
    },
    {
      id: 'time-4',
      title: 'Celebrando Nuestro Aniversario',
      date: '16 de Agosto',
      location: 'Cena Romántica',
      description: 'Un año de sonrisas, apoyo mutuo, momentos increíbles y la certeza de que quiero seguir a tu lado miles de días más.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      icon: 'star',
    },
  ],
  loveEnvelopes: [
    {
      id: 'env-1',
      title: 'Abre esto cuando me extrañes',
      openWhen: 'Cuando sientas que la distancia es grande o me extrañes mucho',
      message: 'Cierra los ojos un segundo. Recuerda mi abrazo apretado y la forma en que te sostengo. No importa la distancia, mi corazón está siempre contigo. Llámame o mándame un mensaje, siempre tengo tiempo para ti. Te amo profundamente.',
    },
    {
      id: 'env-2',
      title: 'Abre esto cuando tengas un día difícil',
      openWhen: 'Cuando algo en el trabajo/escuela no salga como esperabas',
      message: 'Respira profundo, mi amor. Eres infinitamente capaz, fuerte, inteligente y hermosa. Los días difíciles pasan, pero tu valentía se queda. Estoy increíblemente orgulloso de ti y aquí estoy para escucharte o consentirte.',
    },
    {
      id: 'env-3',
      title: 'Abre esto cuando quieras sonreír',
      openWhen: 'Cualquier momento en que necesites una chispa de alegría',
      message: '¿Sabías que cada vez que sonríes iluminas todo a tu alrededor? Tienes la risa más bonita del universo y la mitad de las cosas tontas que hago son solo para ver esa sonrisa en tu carita. ¡Gracias por hacerme el hombre más afortunado!',
    },
    {
      id: 'env-4',
      title: 'Abre esto cuando dudes de lo mucho que te amo',
      openWhen: 'Si alguna vez te preguntas cuánto significas para mí',
      message: 'Si contara las estrellas en el cielo, aún me faltarían números para expresar lo mucho que te amo. Eres mi hogar, mi paz, mi cómplice y mi futura historia favorita. Eres y serás siempre el amor de mi vida.',
    },
  ],
  loveReasons: [
    'Tu sonrisa ilumina incluso mis días más oscuros.',
    'La forma tan bonita y dulce en que me miras.',
    'Tu voz me transmite paz al instante.',
    'Cómo te preocupas amorosamente por las personas que quieres.',
    'Tus abrazos son mi lugar seguro en el mundo.',
    'Lo divertida que eres cuando te sientes con confianza.',
    'Cómo me apoyas e impulsas a ser mejor persona.',
    'Tus ocurrencias y los chistes locales que solo tú y yo entendemos.',
    'El brillo especial que tienen tus ojos cuando estás feliz.',
    'Simplemente porque ser tu novio es lo mejor que me ha pasado.',
  ],
};
