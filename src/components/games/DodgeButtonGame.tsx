'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Trophy, ArrowRight, RefreshCw } from 'lucide-react';
import { sounds } from '@/lib/soundUtils';

interface DodgeButtonGameProps {
  recipientName: string;
  onComplete: () => void;
  onNavigateHome: () => void;
}

const NO_MESSAGES = [
  'No 🙈',
  '¿Segura? 🤔',
  'Muejejeje! ',
  'No vale 😜',
  '¡Hey hey pequeña jsjs',
  'Casi',
  'Inténtalo otra vez muejeje',
  'Nop 💕',
];

export function DodgeButtonGame({ recipientName, onComplete, onNavigateHome }: DodgeButtonGameProps) {
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [noIndex, setNoIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const dodgeNoButton = () => {
    sounds.playDodgeSound();
    
    // Pick random percentage position within safe bounds
    const randomX = Math.floor(Math.random() * 65) + 15; // 15% to 80%
    const randomY = Math.floor(Math.random() * 60) + 20; // 20% to 80%
    
    setNoPos({ x: randomX, y: randomY });
    setNoIndex((prev) => (prev + 1) % NO_MESSAGES.length);
    setAttempts((prev) => prev + 1);
  };

  const handleSayYes = () => {
    sounds.playWinSound();
    setIsWon(true);
    setTimeout(() => {
      onComplete();
    }, 0);

    // Burst confetti!
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF6B8B', '#FF8EAF', '#FFD700', '#D81B60', '#FFF5F5'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 flex flex-col items-center justify-center min-h-[75vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white/80 backdrop-blur-md border border-pink-200/70 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center"
      >
        {/* Background glow decoration */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl pointer-events-none" />

        {!isWon ? (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-100/80 text-pink-700 rounded-full text-xs font-bold mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Juego 1: El Botón Travieso</span>
            </div>

            <motion.div 
              animate={{ scale: [1, 1.08, 1] }} 
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-pink-500 via-rose-500 to-red-400 rounded-full flex items-center justify-center shadow-lg text-white"
            >
              <Heart className="w-10 h-10 fill-white" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2 leading-tight">
              ¿Me amas, <span className="text-rose-500 underline decoration-pink-300">{recipientName}</span>? 💖
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Responde con la verdad absoluta de tu corazón... ✨
            </p>

            {/* Container for buttons */}
            <div className="relative min-h-[160px] flex items-center justify-center gap-6">
              
              {/* SÍ Button */}
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSayYes}
                className="px-8 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-extrabold text-lg sm:text-xl rounded-full shadow-lg hover:shadow-pink-300/50 transition flex items-center gap-2 z-10"
              >
                <span>¡SÍ, TE AMO!</span>
                <Heart className="w-5 h-5 fill-white animate-bounce" />
              </motion.button>

              {/* NO Button (Dodging) */}
              <motion.button
                onMouseEnter={dodgeNoButton}
                onTouchStart={dodgeNoButton}
                onClick={dodgeNoButton}
                style={
                  noPos
                    ? {
                        position: 'absolute',
                        left: `${noPos.x}%`,
                        top: `${noPos.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }
                    : { position: 'relative' }
                }
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm sm:text-base rounded-full shadow-md transition-all duration-150 z-20 whitespace-nowrap"
              >
                {NO_MESSAGES[noIndex]}
              </motion.button>

            </div>

            {attempts > 3 && (
              <p className="text-xs text-rose-400 font-medium mt-6 animate-pulse">
                (El botón NO es demasiado esquivo... ¡mejor presiona SÍ! 😉)
              </p>
            )}
          </div>
        ) : (
          /* Victory View */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-yellow-400 via-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-xl text-white">
                <Trophy className="w-12 h-12 text-yellow-100" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-rose-600 mb-2">
                ¡SABÍA QUE DIRÍAS QUE SÍ! 🎉💘
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
                ¡Has completado el primer desafío con éxito! Mi corazón salta de alegría por ti, <span className="font-bold text-pink-600">{recipientName}</span>. ✨
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setIsWon(false);
                    setNoPos(null);
                    setAttempts(0);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Jugar otra vez</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playPop();
                    onNavigateHome();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-pink-300/50 transition active:scale-95"
                >
                  <span>Siguiente Juego</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
}
