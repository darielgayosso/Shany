'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, Unlock, Play, Sparkles, CheckCircle2, Trophy, Star } from 'lucide-react';
import { ArcadeProgress } from '@/lib/storage';
import { sounds } from '@/lib/soundUtils';

interface DashboardProps {
  progress: ArcadeProgress;
  recipientName: string;
  onSelectScreen: (screen: 'game1' | 'game2' | 'game3' | 'letter') => void;
}

export function Dashboard({ progress, recipientName, onSelectScreen }: DashboardProps) {
  const completedCount = [progress.game1, progress.game2, progress.game3].filter(Boolean).length;
  const isAllCompleted = completedCount === 3;

  const handleCardClick = (screen: 'game1' | 'game2' | 'game3' | 'letter') => {
    sounds.playPop();
    onSelectScreen(screen);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col items-center">
      
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden mb-8 text-center"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mb-3 border border-white/30">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Para Shany</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 leading-tight">
          Mi cielo hermoso 💖
        </h1>
        <p className="text-sm sm:text-base text-pink-100 max-w-md mx-auto mb-6">
          Bienvenida mi niña hermosa. Supera los 3 minijuegos para desbloquear una carta secreta.
        </p>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto bg-black/20 backdrop-blur-md rounded-2xl p-3 border border-white/20">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5 px-1">
            <span>Progreso General</span>
            <span className="text-yellow-300">{completedCount} / 3 Completados</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-yellow-300 to-amber-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / 3) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Minigames Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        
        {/* Game 1 Card */}
        <motion.div
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCardClick('game1')}
          className="bg-white/80 backdrop-blur-md border border-pink-200/70 rounded-3xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col justify-between relative overflow-hidden group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl shadow-inner">
                💘
              </div>
              {progress.game1 ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Superado
                </span>
              ) : (
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
                  Nivel 1
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-pink-600 transition">
              El Botón Travieso
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              ¿Me amas? Pon a prueba tu respuesta frente al botón esquivo jsjsjs.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-pink-100">
            <span className="text-xs font-semibold text-rose-500 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              Reto Evasivo
            </span>
            <button className="p-2 bg-pink-500 group-hover:bg-pink-600 text-white rounded-full shadow-md transition">
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </motion.div>

        {/* Game 2 Card */}
        <motion.div
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCardClick('game2')}
          className="bg-white/80 backdrop-blur-md border border-pink-200/70 rounded-3xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col justify-between relative overflow-hidden group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl shadow-inner">
                💌
              </div>
              {progress.game2 ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Superado
                </span>
              ) : (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  Nivel 2
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-rose-600 transition">
              Memorama 💖
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Empareja las 12 cartas mi amor.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-pink-100">
            <span className="text-xs font-semibold text-rose-500 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              12 Cartas
            </span>
            <button className="p-2 bg-rose-500 group-hover:bg-rose-600 text-white rounded-full shadow-md transition">
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </motion.div>

        {/* Game 3 Card */}
        <motion.div
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleCardClick('game3')}
          className="bg-white/80 backdrop-blur-md border border-pink-200/70 rounded-3xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer flex flex-col justify-between relative overflow-hidden group"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl shadow-inner">
                🧺
              </div>
              {progress.game3 ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Superado
                </span>
              ) : (
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                  Nivel 3
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-red-600 transition">
              Atrapa los Corazones
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Atrapa todos los corazones que caen usando tu canasta del amor uwu.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-pink-100">
            <span className="text-xs font-semibold text-rose-500 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              Acción Canvas
            </span>
            <button className="p-2 bg-red-500 group-hover:bg-red-600 text-white rounded-full shadow-md transition">
              <Play className="w-4 h-4 fill-white" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* Final Reward Unlock Card */}
      <motion.div
        whileHover={{ scale: isAllCompleted ? 1.02 : 1 }}
        onClick={() => {
          if (isAllCompleted) {
            handleCardClick('letter');
          }
        }}
        className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 text-center transition shadow-xl relative overflow-hidden border ${
          isAllCompleted
            ? 'bg-gradient-to-tr from-amber-400 via-pink-500 to-rose-500 text-white cursor-pointer ring-4 ring-pink-300 animate-pulse'
            : 'bg-gray-100/90 text-gray-400 border-gray-200'
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg ${
            isAllCompleted ? 'bg-white text-rose-500' : 'bg-gray-200 text-gray-400'
          }`}>
            {isAllCompleted ? (
              <Unlock className="w-8 h-8 text-yellow-500" />
            ) : (
              <Lock className="w-8 h-8" />
            )}
          </div>

          <h3 className={`text-xl sm:text-2xl font-black mb-1 ${isAllCompleted ? 'text-white' : 'text-gray-700'}`}>
            {isAllCompleted ? '✨ ¡CARTA SECRETA DESBLOQUEADA! ✨' : '🔒 Carta Secreta Recompensa'}
          </h3>

          <p className={`text-xs sm:text-sm max-w-sm mx-auto mb-4 ${isAllCompleted ? 'text-pink-100 font-semibold' : 'text-gray-500'}`}>
            {isAllCompleted
              ? 'Toca aquí para leer tu dedicatoria romántica y ver los recuerdos de nuestro amor.'
              : `Completa los 3 minijuegos para abrir esta recompensa especial (${completedCount}/3).`}
          </p>

          {isAllCompleted && (
            <div className="px-6 py-2.5 bg-white text-rose-600 rounded-full font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Abrir Recompensa</span>
            </div>
          )}
        </div>
      </motion.div>

    </div>
  );
}
