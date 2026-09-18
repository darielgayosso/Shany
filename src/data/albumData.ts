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
      title: 'Nuestra Primera Escapada jsjs',
      image: '/photos/Primera escapada.jpeg',
      date: 'Primera Salida',
      location: 'bosques',
      category: 'especiales',
      backNote: 'Esa primera escapada juntos donde no podíamos dejar de sonreír y de estar en el pasto solo tu y yo',
      rotation: 'rotate-3',
    },
    {
      id: 'pol-2',
      title: 'Visita al Mariposario ',
      image: '/photos/Mariposario.jpeg',
      date: 'Un día muy bonito',
      location: 'El Mariposario',
      category: 'citas',
      backNote: 'Había mariposas volando por todos lados y tambien fuimos al insectario, pero me guto mas el mariposario, volveria a ir contigo',
      rotation: '-rotate-3',
    },
    {
      id: 'pol-3',
      title: 'Festejando Juntos jsjs',
      image: '/photos/Pastel.jpeg',
      date: 'Un pastelito',
      location: 'Mi casa/ tu casa',
      category: 'risas',
      backNote: 'Fuie muy repentino pero al final fuiste y me la pase muy bien a tu lada, gracias por haber estado ese dia',
      rotation: 'rotate-2',
    },
    {
      id: 'pol-4',
      title: 'Paseo en IKEA ',
      image: '/photos/IKEA.jpeg',
      date: 'Tarde divertida',
      location: 'IKEA',
      category: 'citas',
      backNote: 'Imaginando nuestro futuro juntos jsjsjs despues de ir con tus amigos a ver a la bebe, de verdad que me la paso muy bien y me diverti',
      rotation: '-rotate-1',
    },
    {
      id: 'pol-5',
      title: 'Buenavista',
      image: '/photos/Forum.jpeg',
      date: 'Cita al Recorcholis',
      location: 'Forum',
      category: 'citas',
      backNote: 'Me sorprende que nunca habias ido a un Recorcholis, pero eso no importa, lo importante es que fuimos y espero te hayas divertido como yo me diverti mi amor',
      rotation: 'rotate-4',
    },
    {
      id: 'pol-6',
      title: 'Comer Sushi',
      image: '/photos/Familia.jpeg',
      date: 'Comer Sushi',
      location: 'Mi casa/tu casa',
      category: 'citas',
      backNote: 'Me recomendaste un lugar para pedir sushi y la verdad estaban muy ricos, y nos pusimos la camisa de las Chivas jajaja',
      rotation: '-rotate-2',
    },
    {
      id: 'pol-7',
      title: 'Clases de Disecado',
      image: '/photos/Clases.jpeg',
      date: 'Disecar una mariposa',
      location: 'Mi casa/tu casa',
      category: 'citas',
      backNote: 'Me enseñaste a disecar una mariposa, y me compartiste un hobbie que la verdad se me hace muy sorprendente, me encantas',
      rotation: '-rotate-3',
    },
    {
      id: 'pol-8',
      title: 'Viva Shariel, Vivaaaaaa!!!',
      image: '/photos/15.jpeg',
      date: 'Grito de Independencia',
      location: 'Casa de mi abuelita',
      category: 'risas',
      backNote: 'Nuetro primer dia festivo festejando, y espero que sigamos festejando los que siguen , te amo mucho mi cielo <3',
      rotation: 'rotate-1',
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
    'Me siento muy amado por ti',
    'Tu voz me transmite paz',
    'Eres mi paz, mi lugar seguro. mi refugio, mi todo',
    'Tus abrazos son mi lugar seguro en el mundo',
    'Lo divertida que eres cuando te sientes con confianza',
    'Cómo me apoyas e impulsas a ser mejor persona',
    'Tus ocurrencias y los chistes locales que solo tú y yo entendemos',
    'Siempre me pierdo en esos ojitos bonitos',
    'Simplemente porque ser tu novio es lo mejor que me ha pasado',
  ],
};
