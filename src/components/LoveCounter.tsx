'use client';

import React, { useState, useEffect } from 'react';
import { albumData, LoveEnvelope } from '@/data/albumData';
import { Heart, Clock, Mail, Sparkles, Shuffle, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '@/lib/soundUtils';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function LoveCounter() {
  const [timeElapsed, setTimeElapsed] = useState<TimeElapsed>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [activeEnvelope, setActiveEnvelope] = useState<LoveEnvelope | null>(null);
  const [currentReasonIndex, setCurrentReasonIndex] = useState<number>(0);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(albumData.startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNextReason = () => {
    sounds.playPop();
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ff69b4', '#ff1493', '#ff6b6b'],
    });
    setCurrentReasonIndex((prev) => (prev + 1) % albumData.loveReasons.length);
  };

  const handleOpenEnvelope = (env: LoveEnvelope) => {
    sounds.playWinSound();
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
    });
    setActiveEnvelope(env);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Real-time Days Counter */}
      <div className="bg-gradient-to-tr from-pink-500 via-rose-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl text-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-4 shadow-sm">
          <Clock className="w-3.5 h-3.5" />
          <span>Tiempo Amándote</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">
          Llevamos juntos 💕
        </h2>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
            <span className="block text-4xl sm:text-5xl font-black">
              {timeElapsed.days}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider opacity-90">
              Días
            </span>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
            <span className="block text-4xl sm:text-5xl font-black">
              {timeElapsed.hours}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider opacity-90">
              Horas
            </span>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
            <span className="block text-4xl sm:text-5xl font-black">
              {timeElapsed.minutes}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider opacity-90">
              Minutos
            </span>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner">
            <span className="block text-4xl sm:text-5xl font-black text-yellow-200">
              {timeElapsed.seconds}
            </span>
            <span className="text-xs uppercase font-bold tracking-wider opacity-90">
              Segundos
            </span>
          </div>
        </div>

        <p className="text-xs text-white/80 mt-6 italic">
          ...y los que siguen corazon 💖
        </p>
      </div>

      {/* Secret Envelopes ("Abre esto cuando...") */}
      <div>
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-2 shadow-xs">
            <Mail className="w-3.5 h-3.5 text-pink-500" />
            <span>Cartas Especiales</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-gray-800">
            Sobres para Abrir 💌
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Haz clic en una carta cuando te sientas de esa manera...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {albumData.loveEnvelopes.map((env) => (
            <button
              key={env.id}
              onClick={() => handleOpenEnvelope(env)}
              className="group text-left bg-white p-6 rounded-2xl border border-pink-100 shadow-md hover:shadow-xl hover:border-pink-300 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-pink-100/60 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-gray-800 text-base group-hover:text-rose-600 transition-colors">
                  {env.title}
                </h4>
              </div>

              <p className="text-xs text-gray-500 font-medium italic">
                📌 {env.openWhen}
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-rose-500">
                <span>Abrir sobre</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Reasons Why I Love You Generator */}
      <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-3 shadow-xs">
          <Gift className="w-3.5 h-3.5 text-rose-500" />
          <span>Razones para Amarte</span>
        </div>
        <h3 className="text-2xl font-black text-gray-800 mb-2">
          ¿Por qué te amo {albumData.recipientName}? 💕
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Razón #{currentReasonIndex + 1} de {albumData.loveReasons.length}
        </p>

        <div className="min-h-[100px] flex items-center justify-center p-6 bg-pink-50/60 rounded-2xl border border-pink-100/80 mb-6">
          <p className="text-base sm:text-lg font-bold text-rose-700 italic">
            "{albumData.loveReasons[currentReasonIndex]}"
          </p>
        </div>

        <button
          onClick={handleNextReason}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition"
        >
          <Shuffle className="w-4 h-4" />
          <span>Ver otra razón</span>
        </button>
      </div>

      {/* Envelope Modal */}
      {activeEnvelope && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveEnvelope(null)}
        >
          <div
            className="relative bg-gradient-to-b from-amber-50 to-pink-50 border-2 border-pink-300 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveEnvelope(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Heart className="w-4 h-4 fill-rose-500" />
              Carta para Shany
            </div>

            <h3 className="text-xl font-extrabold text-gray-900 mb-4">
              {activeEnvelope.title}
            </h3>

            <div className="p-4 bg-white/80 rounded-2xl border border-pink-200/80 shadow-inner mb-6">
              <p className="text-sm sm:text-base font-serif italic text-gray-700 leading-relaxed">
                "{activeEnvelope.message}"
              </p>
            </div>

            <div className="text-right text-xs text-rose-600 font-semibold italic">
              Con todo mi corazón, {albumData.authorName} ✨
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
