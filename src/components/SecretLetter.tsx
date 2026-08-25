'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Mail, Edit3, Check, RotateCcw, ArrowLeft } from 'lucide-react';
import { sounds } from '@/lib/soundUtils';

interface SecretLetterProps {
  recipientName: string;
  customLetter: string;
  onUpdateLetter: (text: string) => void;
  onNavigateHome: () => void;
}

export function SecretLetter({
  recipientName,
  customLetter,
  onUpdateLetter,
  onNavigateHome,
}: SecretLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [letterText, setLetterText] = useState(customLetter);

  useEffect(() => {
    setLetterText(customLetter);
  }, [customLetter]);

  const handleOpenEnvelope = () => {
    sounds.playLoveChimes();
    setIsOpen(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FF6B8B', '#FF8EAF', '#FFD700', '#D81B60'],
    });
  };

  const handleSaveLetter = () => {
    onUpdateLetter(letterText);
    setIsEditing(false);
    sounds.playPop();
  };

  const handleTriggerConfetti = () => {
    sounds.playPop();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center justify-center min-h-[85vh]">
      
      {!isOpen ? (
        /* Envelope State */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center cursor-pointer group"
          onClick={handleOpenEnvelope}
        >
          <div className="relative w-72 sm:w-80 h-52 bg-gradient-to-tr from-pink-400 via-rose-400 to-red-400 rounded-3xl shadow-2xl p-6 border-4 border-white flex flex-col items-center justify-center text-white transform transition-transform group-hover:scale-105 group-hover:rotate-1">
            <div className="absolute -top-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-md">
              <Mail className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black mb-1 mt-2">
              Para: {recipientName} 💌
            </h3>
            <p className="text-xs text-pink-100 font-medium mb-4">
              Has desbloqueado la carta secreta moooor!
            </p>
            
            <div className="px-5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-xs font-bold tracking-wide uppercase border border-white/40 flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
              <span>Toca para abrir</span>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Opened Letter Content */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-amber-50/90 backdrop-blur-md border border-amber-200/80 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden"
        >
          {/* Heart watermark decoration */}
          <div className="absolute top-4 right-4 text-rose-200/40 pointer-events-none">
            <Heart className="w-32 h-32 fill-current" />
          </div>

          <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-200/60">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-gray-800">
                  Carta Secreta 💖
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Para: <span className="text-rose-600 font-bold">{recipientName}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold rounded-full flex items-center gap-1 transition"
                  title="Editar carta"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
              ) : (
                <button
                  onClick={handleSaveLetter}
                  className="px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1 hover:bg-green-600 transition"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
              )}
            </div>
          </div>

          {/* Letter Body */}
          {isEditing ? (
            <textarea
              value={letterText}
              onChange={(e) => setLetterText(e.target.value)}
              rows={8}
              className="w-full p-4 bg-white/80 border border-amber-300 rounded-2xl text-sm text-gray-800 outline-none focus:ring-2 focus:ring-rose-400 font-serif leading-relaxed mb-6 shadow-inner"
            />
          ) : (
            <div className="prose prose-pink text-gray-800 font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8 bg-white/40 p-4 sm:p-6 rounded-2xl border border-amber-100/70 shadow-xs">
              {letterText}
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-amber-200/60">
            <button
              onClick={handleTriggerConfetti}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:shadow-pink-300/50 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Lanzar Corazones 🎉</span>
            </button>

            <button
              onClick={() => {
                sounds.playPop();
                onNavigateHome();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver al Menú</span>
            </button>
          </div>

        </motion.div>
      )}

    </div>
  );
}
