'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, Edit2, Check, Camera, Clock, Sparkles, Gamepad2 } from 'lucide-react';
import { sounds } from '@/lib/soundUtils';

export type ScreenView = 'album' | 'timeline' | 'counter' | 'arcade' | 'game1' | 'game2' | 'game3' | 'letter';

interface NavbarProps {
  currentScreen: ScreenView;
  onNavigate: (screen: ScreenView) => void;
  recipientName: string;
  onUpdateRecipientName: (name: string) => void;
}

export function Navbar({
  currentScreen,
  onNavigate,
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

  const navItems = [
    { id: 'album' as ScreenView, label: 'Fotos', icon: Camera },
    { id: 'timeline' as ScreenView, label: 'Historia', icon: Sparkles },
    { id: 'counter' as ScreenView, label: 'Amor', icon: Clock },
    { id: 'arcade' as ScreenView, label: 'Arcade 🎮', icon: Gamepad2 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-pink-100/80 shadow-xs px-4 py-2.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            sounds.playPop();
            onNavigate('album');
          }}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="font-black text-base sm:text-lg bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent">
              Álbum de {recipientName} 💕
            </span>
          </div>
        </button>

        {/* Center Tabs Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-pink-50/80 p-1 rounded-full border border-pink-100 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentScreen === item.id ||
              (item.id === 'arcade' && ['game1', 'game2', 'game3', 'letter'].includes(currentScreen));

            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playPop();
                  onNavigate(item.id);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-rose-600 shadow-sm'
                    : 'text-gray-600 hover:text-rose-600 hover:bg-white/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side controls */}
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
                  className="w-20 text-xs font-semibold text-rose-700 outline-none bg-transparent"
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
                className="flex items-center gap-1 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 px-2.5 py-1 rounded-full text-xs font-semibold shadow-2xs transition"
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
            title={isMuted ? 'Activar efectos de sonido' : 'Silenciar efectos'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="flex md:hidden items-center justify-around mt-2 pt-2 border-t border-pink-100/60">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentScreen === item.id ||
            (item.id === 'arcade' && ['game1', 'game2', 'game3', 'letter'].includes(currentScreen));

          return (
            <button
              key={item.id}
              onClick={() => {
                sounds.playPop();
                onNavigate(item.id);
              }}
              className={`flex flex-col items-center gap-0.5 text-[11px] font-bold ${
                isActive ? 'text-rose-600' : 'text-gray-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
