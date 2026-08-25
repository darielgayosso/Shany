'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowLeft, RotateCcw, Heart, Edit2, Check } from 'lucide-react';
import { sounds } from '@/lib/soundUtils';

interface NavbarProps {
  currentScreen: 'dashboard' | 'game1' | 'game2' | 'game3' | 'letter';
  onNavigateHome: () => void;
  onReset: () => void;
  recipientName: string;
  onUpdateRecipientName: (name: string) => void;
}

export function Navbar({
  currentScreen,
  onNavigateHome,
  onReset,
  recipientName,
  onUpdateRecipientName,
}: NavbarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(recipientName);

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sounds.playPop();
    }
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateRecipientName(tempName.trim());
    }
    setIsEditingName(false);
    sounds.playPop();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 border-b border-pink-100/60 shadow-sm px-4 py-3 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Back button or Logo */}
        <div className="flex items-center gap-2">
          {currentScreen !== 'dashboard' ? (
            <button
              onClick={() => {
                sounds.playPop();
                onNavigateHome();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-full border border-rose-200 shadow-sm transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md animate-pulse">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-extrabold text-base sm:text-lg bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent">
                Mini Arcade 💖
              </span>
            </div>
          )}
        </div>

        {/* Center / Right: Personalization & Controls */}
        <div className="flex items-center gap-2">
          
          {/* Recipient Name Tag */}
          <div className="relative flex items-center">
            {isEditingName ? (
              <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1 border border-pink-300 shadow-inner">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength={18}
                  className="w-24 text-xs font-semibold text-rose-700 outline-none bg-transparent"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                />
                <button
                  onClick={handleSaveName}
                  className="p-1 bg-pink-500 text-white rounded-full hover:bg-pink-600"
                >
                  <Check className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setTempName(recipientName);
                  setIsEditingName(true);
                }}
                title="Cambiar nombre de tu amor"
                className="flex items-center gap-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs transition"
              >
                <span>Para: <span className="underline decoration-pink-300">{recipientName}</span></span>
                <Edit2 className="w-3 h-3 text-pink-400" />
              </button>
            )}
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-full text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition active:scale-90"
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset Progress */}
          {currentScreen === 'dashboard' && (
            <button
              onClick={() => {
                if (window.confirm('¿Quieres reiniciar el progreso del arcade?')) {
                  onReset();
                }
              }}
              className="p-2 rounded-full text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Reiniciar progreso"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
