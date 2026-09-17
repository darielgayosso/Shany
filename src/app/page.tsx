'use client';

import React, { useState, useEffect } from 'react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Navbar, ScreenView } from '@/components/Navbar';
import { PolaroidGallery } from '@/components/PolaroidGallery';
import { Timeline } from '@/components/Timeline';
import { LoveCounter } from '@/components/LoveCounter';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Dashboard } from '@/components/Dashboard';
import { DodgeButtonGame } from '@/components/games/DodgeButtonGame';
import { MemoryGame } from '@/components/games/MemoryGame';
import { HeartCatcherGame } from '@/components/games/HeartCatcherGame';
import { SecretLetter } from '@/components/SecretLetter';
import {
  getProgress,
  completeGame,
  updateRecipientName,
  updateCustomLetter,
  resetAllProgress,
  ArcadeProgress,
} from '@/lib/storage';

export default function Home() {
  const [progress, setProgress] = useState<ArcadeProgress | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('album');

  useEffect(() => {
    // Sync progress from localStorage on client render
    const initialProgress = getProgress();
    setProgress(initialProgress);
  }, []);

  if (!progress) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-rose-50">
        <div className="animate-spin text-4xl">💖</div>
      </div>
    );
  }

  const handleGameComplete = (gameKey: 'game1' | 'game2' | 'game3') => {
    const updated = completeGame(gameKey);
    setProgress(updated);
  };

  const handleUpdateRecipient = (name: string) => {
    const updated = updateRecipientName(name);
    setProgress(updated);
  };

  const handleUpdateLetter = (letterText: string) => {
    const updated = updateCustomLetter(letterText);
    setProgress(updated);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-[#FFF5F7]">
      {/* Background Animated Floating Hearts */}
      <FloatingHearts />

      {/* Floating Background Music Player (Collide - Paris Jackson) */}
      <MusicPlayer />

      {/* Header Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        recipientName={progress.recipientName}
        onUpdateRecipientName={handleUpdateRecipient}
      />

      {/* Main Container Views */}
      <main className="flex-1 flex flex-col items-center justify-start relative z-10 py-6 px-4">
        {currentScreen === 'album' && <PolaroidGallery />}

        {currentScreen === 'timeline' && <Timeline />}

        {currentScreen === 'counter' && <LoveCounter />}

        {currentScreen === 'arcade' && (
          <Dashboard
            progress={progress}
            recipientName={progress.recipientName}
            onSelectScreen={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === 'game1' && (
          <DodgeButtonGame
            recipientName={progress.recipientName}
            onComplete={() => handleGameComplete('game1')}
            onNavigateHome={() => setCurrentScreen('arcade')}
          />
        )}

        {currentScreen === 'game2' && (
          <MemoryGame
            onComplete={() => handleGameComplete('game2')}
            onNavigateHome={() => setCurrentScreen('arcade')}
          />
        )}

        {currentScreen === 'game3' && (
          <HeartCatcherGame
            onComplete={() => handleGameComplete('game3')}
            onNavigateHome={() => setCurrentScreen('arcade')}
          />
        )}

        {currentScreen === 'letter' && (
          <SecretLetter
            recipientName={progress.recipientName}
            customLetter={progress.customLetter}
            onUpdateLetter={handleUpdateLetter}
            onNavigateHome={() => setCurrentScreen('arcade')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-xs text-pink-800/70 font-medium relative z-10 border-t border-pink-100/60 bg-white/50 backdrop-blur-xs">
        <p>Hecho con 💖 por Dariel para Shany • Álbum de Recuerdos Inolvidables</p>
      </footer>
    </div>
  );
}
