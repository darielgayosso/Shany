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
  startDate: '2026-08-16', // Inicio de su relación: 16 de Agosto de 2026
  songTitle: 'Collide',
  songArtist: 'Paris Jackson',
  songUrl: '/audio/collide.mp3', // MP3 oficial
  youtubeUrl: 'https://youtu.be/7lSFLDQkQKs',
  polaroids: [
    {
      id: 'pol-1',
      title: 'El Inicio de Shariel 💕',
      image: '/photos/15.jpeg',
      date: '16 de Agosto',
      location: 'Nuestro lugar especial',
      category: 'especiales',
      backNote: 'Ese 16 de agosto cambió mi vida para siempre. Contigo todo cobró sentido y comenzó nuestra hermosa historia de amor.',
      rotation: '-rotate-2',
    },
    {
      id: 'pol-2',
      title: 'Nuestra Primera Escapada 🚗',
      image: '/photos/Primera escapada.jpeg',
      date: 'Primera Salida',
      location: 'De camino juntos',
      category: 'viajes',
      backNote: 'Esa primera escapada juntos donde no podíamos dejar de sonreír, cantar y platicar de absolutamente todo.',
      rotation: 'rotate-3',
    },
    {
      id: 'pol-3',
      title: 'Visita al Mariposario 🦋',
      image: '/photos/Mariposario.jpeg',
      date: 'Un día mágico',
      location: 'El Mariposario',
      category: 'especiales',
      backNote: 'Había mariposas volando por todos lados, pero la más hermosa y radiante de todas eras tú frente a mis ojos.',
      rotation: '-rotate-3',
    },
    {
      id: 'pol-4',
      title: 'Festejando Juntos 🎂',
      image: '/photos/Pastel.jpeg',
      date: 'Día de Celebración',
      location: 'Momento dulce',
      category: 'risas',
      backNote: 'Celebrar cualquier detalle contigo es la mayor alegría. Nada sabe mejor que un momento compartido a tu lado.',
      rotation: 'rotate-2',
    },
    {
      id: 'pol-5',
      title: 'Paseo en IKEA 🛋️',
      image: '/photos/IKEA.jpeg',
      date: 'Tarde divertida',
      location: 'IKEA',
      category: 'risas',
      backNote: 'Imaginando nuestro futuro espacio mientras caminamos por los pasillos riendo sin parar. Amo cada momento a tu lado.',
      rotation: '-rotate-1',
    },
    {
      id: 'pol-6',
      title: 'Tarde en Forum 🛍️',
      image: '/photos/Forum.jpeg',
      date: 'Cita Romántica',
      location: 'Forum',
      category: 'citas',
      backNote: 'Caminar agarrados de la mano, platicar horas y disfrutar de tu presencia incomparable. Eres mi lugar favorito.',
      rotation: 'rotate-4',
    },
    {
      id: 'pol-7',
      title: 'Juntos en Clases 📚',
      image: '/photos/Clases.jpeg',
      date: 'Día a día',
      location: 'En clases',
      category: 'citas',
      backNote: 'Incluso los días ordinarios de estudio se vuelven extraordinarios cuando estás tú a mi lado iluminando la tarde.',
      rotation: '-rotate-2',
    },
    {
      id: 'pol-8',
      title: 'Momentos Especiales 💖',
      image: '/photos/Familia.jpeg',
      date: 'Familia & Amor',
      location: 'Momento inolvidable',
      category: 'especiales',
      backNote: 'Compartir momentos bonitos y verte sonreír me llena el alma por completo. Gracias por existir, mi amor.',
      rotation: 'rotate-2',
    },
  ],
  timeline: [
    {
      id: 'time-1',
      title: 'El Día que comenzó Shariel 💕',
      date: '16 de Agosto',
      location: 'Nuestro primer momento',
      description: 'Una mirada bastó para saber que nuestras vidas se unirían para siempre. La coincidencia más bonita del mundo.',
      image: '/photos/15.jpeg',
      icon: 'sparkles',
    },
    {
      id: 'time-2',
      title: 'Nuestra Primera Escapada Juntos 🚗',
      date: 'Primeros Recuerdos',
      location: 'En el camino',
      description: 'Salimos a explorar el mundo y descubrí que cualquier lugar a tu lado es el destino perfecto.',
      image: '/photos/Primera escapada.jpeg',
      icon: 'plane',
    },
    {
      id: 'time-3',
      title: 'Un Día Mágico en el Mariposario 🦋',
      date: 'Paseo Inolvidable',
      location: 'El Mariposario',
      description: 'Un día lleno de magia, risas y momentos inolvidables rodeados de belleza y amor.',
      image: '/photos/Mariposario.jpeg',
      icon: 'heart',
    },
    {
      id: 'time-4',
      title: 'Construyendo Recuerdos Juntos 🛋️',
      date: 'Paseos y Risas',
      location: 'Forum e IKEA',
      description: 'Caminar juntos, hacer planes a futuro y disfrutar la sencillez de estar juntos todos los días.',
      image: '/photos/IKEA.jpeg',
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
