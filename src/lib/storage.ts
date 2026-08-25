export interface ArcadeProgress {
  game1: boolean;
  game2: boolean;
  game3: boolean;
  recipientName: string;
  customLetter: string;
}

const STORAGE_KEY = 'mini_arcade_romantico_progress_v1';

const DEFAULT_LETTER = `Mi amor,

Si estás leyendo esto es porque superaste todos los retos de este pequeñito juego. 💖

Quería sacarte una sonrisa y recordarte lo inmensamente feliz que me haces todos los días. Eres mi persona favorita en todo el mundo, el amor de mi vida, mi risa preferida y la razón por la que mi corazón late tan fuerte.

Gracias por ser exactamente como eres y por llenar mi vida de luz y alegría. Prometo amarte, cuidarte y estar contigo por siempre

Para mi media Pitaya

departe de...
Dariel ✨`;

const DEFAULT_PROGRESS: ArcadeProgress = {
  game1: false,
  game2: false,
  game3: false,
  recipientName: 'Shany',
  customLetter: DEFAULT_LETTER,
};

export function getProgress(): ArcadeProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: ArcadeProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress:', e);
  }
}

export function completeGame(game: 'game1' | 'game2' | 'game3'): ArcadeProgress {
  const current = getProgress();
  const updated = { ...current, [game]: true };
  saveProgress(updated);
  return updated;
}

export function updateRecipientName(name: string): ArcadeProgress {
  const current = getProgress();
  const updated = { ...current, recipientName: name };
  saveProgress(updated);
  return updated;
}

export function updateCustomLetter(letter: string): ArcadeProgress {
  const current = getProgress();
  const updated = { ...current, customLetter: letter };
  saveProgress(updated);
  return updated;
}

export function resetAllProgress(): ArcadeProgress {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  return DEFAULT_PROGRESS;
}
