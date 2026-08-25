'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, ArrowRight, Sparkles, Heart, Play } from 'lucide-react';
import { sounds } from '@/lib/soundUtils';

interface HeartCatcherGameProps {
  onComplete: () => void;
  onNavigateHome: () => void;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'heart' | 'gold' | 'arrow' | 'broken';
  symbol: string;
  points: number;
  size: number;
}

const TARGET_SCORE = 100;

export function HeartCatcherGame({ onComplete, onNavigateHome }: HeartCatcherGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'gameover'>('idle');
  const [basketX, setBasketX] = useState(50); // percentage 0 to 100
  const [items, setItems] = useState<FallingItem[]>([]);

  const requestRef = useRef<number | null>(null);
  const lastSpawnRef = useRef<number>(0);
  const nextIdRef = useRef<number>(0);
  const scoreRef = useRef<number>(0);
  const livesRef = useRef<number>(3);
  const basketXRef = useRef<number>(50);

  // Sync refs with state
  useEffect(() => {
    scoreRef.current = score;
    livesRef.current = lives;
    basketXRef.current = basketX;
  }, [score, lives, basketX]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setItems([]);
    setBasketX(50);
    scoreRef.current = 0;
    livesRef.current = 3;
    basketXRef.current = 50;
    setGameState('playing');
    sounds.playPop();
  };

  // Main game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const gameLoop = (time: number) => {
      // Spawn new items
      if (time - lastSpawnRef.current > 750) {
        lastSpawnRef.current = time;

        const rand = Math.random();
        let type: FallingItem['type'] = 'heart';
        let symbol = '💖';
        let points = 10;

        if (rand > 0.85) {
          type = 'gold';
          symbol = '⭐';
          points = 25;
        } else if (rand > 0.7) {
          type = 'arrow';
          symbol = '💘';
          points = 15;
        } else if (rand < 0.25) {
          type = 'broken';
          symbol = '💔';
          points = -5;
        }

        const newItem: FallingItem = {
          id: nextIdRef.current++,
          x: Math.random() * 85 + 7, // 7% to 92%
          y: -10,
          speed: Math.random() * 0.8 + 0.9, // speed
          type,
          symbol,
          points,
          size: type === 'gold' ? 32 : 28,
        };

        setItems((prev) => [...prev, newItem]);
      }

      // Move items down and check collision with basket (at y = 82% to 92%)
      setItems((prevItems) => {
        const remaining: FallingItem[] = [];

        prevItems.forEach((item) => {
          const newY = item.y + item.speed;

          // Check if near basket collision zone
          if (newY >= 78 && newY <= 90) {
            const distance = Math.abs(item.x - basketXRef.current);
            if (distance < 14) {
              // CAUGHT!
              if (item.type === 'broken') {
                sounds.playBadCatchSound();
                const newLives = livesRef.current - 1;
                setLives(newLives);
                livesRef.current = newLives;
                if (newLives <= 0) {
                  setGameState('gameover');
                }
              } else {
                sounds.playCatchSound();
                const newScore = scoreRef.current + item.points;
                setScore(newScore);
                scoreRef.current = newScore;

                if (newScore >= TARGET_SCORE) {
                  setGameState('won');
                  sounds.playWinSound();
                  setTimeout(() => {
                    onComplete();
                  }, 0);
                  confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 },
                  });
                }
              }
              return; // item caught, omit from remaining
            }
          }

          // If reached bottom without being caught
          if (newY > 96) {
            return; // dropped past screen
          }

          remaining.push({ ...item, y: newY });
        });

        return remaining;
      });

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, onComplete]);

  // Touch and Mouse Movement Handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gameState !== 'playing' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = e.clientX - rect.left;
    const percentage = Math.max(8, Math.min(92, (touchX / rect.width) * 100));
    setBasketX(percentage);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full bg-white/85 backdrop-blur-md border border-pink-200/70 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-pink-100/80 text-pink-700 rounded-full text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Juego 3: Atrapa los Corazones</span>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 ${
                  i < lives ? 'text-rose-500 fill-rose-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress & Score Bar */}
        <div className="w-full bg-pink-50 border border-pink-100 rounded-full p-1.5 mb-4 flex items-center gap-3 px-4">
          <span className="text-xs font-extrabold text-pink-700 whitespace-nowrap">
            Puntos: {score}/{TARGET_SCORE}
          </span>
          <div className="flex-1 bg-pink-200/60 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 h-full rounded-full"
              style={{ width: `${Math.min(100, (score / TARGET_SCORE) * 100)}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Canvas / Playground Container */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              const rect = containerRef.current?.getBoundingClientRect();
              if (rect) {
                const touchX = e.touches[0].clientX - rect.left;
                const percentage = Math.max(8, Math.min(92, (touchX / rect.width) * 100));
                setBasketX(percentage);
              }
            }
          }}
          className="relative w-full h-[320px] sm:h-[380px] bg-gradient-to-b from-pink-50/70 via-rose-50/40 to-pink-100/60 rounded-2xl border border-pink-200/80 overflow-hidden cursor-crosshair touch-none select-none"
        >
          {gameState === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 bg-white/70 backdrop-blur-xs">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white mb-3 shadow-lg animate-bounce">
                <Heart className="w-8 h-8 fill-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">¡Caza del Amor! 🏹💘</h3>
              <p className="text-xs text-gray-600 mb-5 max-w-xs">
                Mueve la canasta deslizando tu dedo o ratón para atrapar corazones (💖, ⭐, 💘) y evita los corazones rotos (💔).
              </p>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold rounded-full shadow-md flex items-center gap-2 hover:shadow-pink-300/50 transition active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Iniciar Juego</span>
              </button>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 bg-white/90 backdrop-blur-xs">
              <span className="text-4xl mb-2">💔</span>
              <h3 className="text-xl font-bold text-rose-600 mb-1">¡Casi lo logras!</h3>
              <p className="text-xs text-gray-600 mb-4">
                Puntuación alcanzada: <span className="font-bold text-pink-600">{score} pts</span>
              </p>
              <button
                onClick={startGame}
                className="px-6 py-2.5 bg-rose-500 text-white font-bold rounded-full shadow-md flex items-center gap-2 hover:bg-rose-600 transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Intentar de nuevo</span>
              </button>
            </div>
          )}

          {gameState === 'won' && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 bg-white/90 backdrop-blur-xs"
              >
                <div className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-pink-500 rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
                  <Trophy className="w-8 h-8 text-yellow-100" />
                </div>
                <h3 className="text-2xl font-black text-rose-600 mb-1">¡CORAZÓN ATRAPADO! 🎉💘</h3>
                <p className="text-xs text-gray-600 mb-5">
                  ¡Atrapaste todos los corazones con éxito! Eres un/a maestro/a del amor.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={startGame}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full flex items-center gap-1 hover:bg-gray-200 transition"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Rejugar</span>
                  </button>
                  <button
                    onClick={() => {
                      sounds.playPop();
                      onNavigateHome();
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md hover:shadow-pink-300/50 transition active:scale-95"
                  >
                    <span>Ir al Menú</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Falling items rendering */}
          {items.map((item) => (
            <div
              key={item.id}
              className="absolute transform -translate-x-1/2 select-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: `${item.size}px`,
              }}
            >
              {item.symbol}
            </div>
          ))}

          {/* Basket Container (Player) */}
          <div
            className="absolute bottom-3 transform -translate-x-1/2 flex items-center justify-center transition-transform duration-75"
            style={{ left: `${basketX}%` }}
          >
            <div className="w-16 h-10 bg-gradient-to-r from-pink-500 via-rose-500 to-red-400 rounded-b-2xl rounded-t-lg shadow-lg border-2 border-white/80 flex items-center justify-center text-white font-extrabold text-sm">
              🧺
            </div>
          </div>
        </div>

        {/* Mobile touch controls buttons */}
        <div className="flex items-center justify-between mt-3 px-2">
          <button
            onPointerDown={() => setBasketX((prev) => Math.max(10, prev - 12))}
            className="px-4 py-2 bg-pink-100 active:bg-pink-200 text-pink-700 font-extrabold text-xs rounded-xl shadow-xs"
          >
            ◀ Izquierda
          </button>
          <span className="text-[11px] text-gray-400 font-medium">Desliza o usa botones</span>
          <button
            onPointerDown={() => setBasketX((prev) => Math.min(90, prev + 12))}
            className="px-4 py-2 bg-pink-100 active:bg-pink-200 text-pink-700 font-extrabold text-xs rounded-xl shadow-xs"
          >
            Derecha ▶
          </button>
        </div>

      </div>
    </div>
  );
}
