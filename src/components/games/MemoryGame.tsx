'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, ArrowRight, Star, Clock, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/soundUtils';

interface MemoryGameProps {
  onComplete: () => void;
  onNavigateHome: () => void;
}

interface CardItem {
  id: number;
  pairId: number;
  icon: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MEMORY_PAIRS = [
  { pairId: 1, icon: '💌', label: 'Carta' },
  { pairId: 2, icon: '💍', label: 'Anillo' },
  { pairId: 3, icon: '🌹', label: 'Rosa' },
  { pairId: 4, icon: '🧸', label: 'Osito' },
  { pairId: 5, icon: '👑', label: 'Corona' },
  { pairId: 6, icon: '🎁', label: 'Regalo' },
];

export function MemoryGame({ onComplete, onNavigateHome }: MemoryGameProps) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Initialize and shuffle deck
  const initializeDeck = () => {
    const deck: CardItem[] = [];
    let idCounter = 0;

    MEMORY_PAIRS.forEach((pair) => {
      deck.push({
        id: idCounter++,
        pairId: pair.pairId,
        icon: pair.icon,
        label: pair.label,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        id: idCounter++,
        pairId: pair.pairId,
        icon: pair.icon,
        label: pair.label,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setMatchesCount(0);
    setTimer(0);
    setIsPlaying(true);
    setIsWon(false);
  };

  useEffect(() => {
    initializeDeck();
  }, []);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isWon) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);

  const handleCardClick = (index: number) => {
    if (!isPlaying || isWon) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;
    if (flippedCards.length >= 2) return;

    sounds.playPop();

    // Flip target card
    const updated = [...cards];
    updated[index].isFlipped = true;
    setCards(updated);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const card1 = updated[firstIdx];
      const card2 = updated[secondIdx];

      if (card1.pairId === card2.pairId) {
        // MATCH!
        setTimeout(() => {
          sounds.playMatchSound();
          const matchUpdated = [...cards];
          matchUpdated[firstIdx].isMatched = true;
          matchUpdated[secondIdx].isMatched = true;
          setCards(matchUpdated);
          setFlippedCards([]);

          const newMatchCount = matchesCount + 1;
          setMatchesCount(newMatchCount);

          if (newMatchCount === MEMORY_PAIRS.length) {
            handleWin();
          }
        }, 400);
      } else {
        // NO MATCH -> Flip back
        setTimeout(() => {
          const resetUpdated = [...cards];
          resetUpdated[firstIdx].isFlipped = false;
          resetUpdated[secondIdx].isFlipped = false;
          setCards(resetUpdated);
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  const handleWin = () => {
    setIsWon(true);
    setIsPlaying(false);
    sounds.playWinSound();
    setTimeout(() => {
      onComplete();
    }, 0);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const getStars = () => {
    if (moves <= 8) return 3;
    if (moves <= 13) return 2;
    return 1;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full bg-white/80 backdrop-blur-md border border-pink-200/70 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        
        {/* Header section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-pink-100/80 text-pink-700 rounded-full text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Juego 2: Memorama 💖</span>
          </div>

          <button
            onClick={initializeDeck}
            className="p-1.5 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition"
            title="Reiniciar partida"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-around bg-pink-50/80 border border-pink-100 rounded-2xl py-2.5 px-4 mb-6 text-sm font-semibold text-gray-700">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-pink-500" />
            <span>Tiempo: <span className="text-pink-600 font-bold">{formatTime(timer)}</span></span>
          </div>
          <div className="h-4 w-px bg-pink-200" />
          <div>
            <span>Movimientos: <span className="text-pink-600 font-bold">{moves}</span></span>
          </div>
          <div className="h-4 w-px bg-pink-200" />
          <div>
            <span>Parejas: <span className="text-pink-600 font-bold">{matchesCount}/6</span></span>
          </div>
        </div>

        {!isWon ? (
          /* Cards Grid */
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 mb-2">
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCardClick(idx)}
                className="aspect-square cursor-pointer perspective-1000"
              >
                <div
                  className={`w-full h-full rounded-2xl flex flex-col items-center justify-center transition-all duration-300 transform-gpu shadow-md border ${
                    card.isFlipped || card.isMatched
                      ? 'bg-gradient-to-tr from-pink-100 to-rose-50 border-pink-300 rotate-y-180'
                      : 'bg-gradient-to-tr from-pink-400 via-rose-400 to-red-400 border-pink-300 hover:shadow-pink-300/40'
                  }`}
                >
                  {card.isFlipped || card.isMatched ? (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <span className="text-2xl sm:text-3xl select-none mb-0.5">{card.icon}</span>
                      <span className="text-[10px] sm:text-xs font-bold text-rose-700">{card.label}</span>
                    </motion.div>
                  ) : (
                    <span className="text-xl sm:text-2xl text-white opacity-80 select-none">💖</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Victory Overlay */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg text-white">
                <Trophy className="w-10 h-10 text-yellow-100" />
              </div>

              <h2 className="text-2xl font-black text-rose-600 mb-1">
                ¡MEMORIA PERFECTA! 🎉💌
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Completaste las 6 parejas en <span className="font-bold text-rose-600">{moves} movimientos</span> y <span className="font-bold text-rose-600">{formatTime(timer)}</span>.
              </p>

              {/* Rating Stars */}
              <div className="flex items-center justify-center gap-1.5 mb-6">
                {[1, 2, 3].map((star) => (
                  <Star
                    key={star}
                    className={`w-7 h-7 ${
                      star <= getStars()
                        ? 'text-yellow-400 fill-yellow-400 drop-shadow-xs'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={initializeDeck}
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

      </div>
    </div>
  );
}
