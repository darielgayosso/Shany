'use client';

import React, { useState, useEffect } from 'react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { Navbar } from '@/components/Navbar';
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
  const [currentScreen, setCurrentScreen] = useState<
    'dashboard' | 'game1' | 'game2' | 'game3' | 'letter'
  >('dashboard');

  useEffect(() => {
    // Sync progress from localStorage on client render
    const initialProgress = getProgress();
    setProgress(initialProgress);
  }, []);

  if (!progress) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin text-3xl">💖</div>
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

  const handleResetProgress = () => {
    const reset = resetAllProgress();
    setProgress(reset);
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background Animated Hearts */}
      <FloatingHearts />

      {/* Header Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigateHome={() => setCurrentScreen('dashboard')}
        onReset={handleResetProgress}
        recipientName={progress.recipientName}
        onUpdateRecipientName={handleUpdateRecipient}
      />

      {/* Main Container Views */}
      <main className="flex-1 flex items-center justify-center relative z-10 py-6">
        {currentScreen === 'dashboard' && (
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
            onNavigateHome={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'game2' && (
          <MemoryGame
            onComplete={() => handleGameComplete('game2')}
            onNavigateHome={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'game3' && (
          <HeartCatcherGame
            onComplete={() => handleGameComplete('game3')}
            onNavigateHome={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'letter' && (
          <SecretLetter
            recipientName={progress.recipientName}
            customLetter={progress.customLetter}
            onUpdateLetter={handleUpdateLetter}
            onNavigateHome={() => setCurrentScreen('dashboard')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-pink-700/60 font-medium relative z-10">
        Hecho con 💖 para ti • Mini Arcade Romántico
      </footer>
    </div>
  );
}
