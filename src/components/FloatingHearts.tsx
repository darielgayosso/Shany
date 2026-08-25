'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
}

export function FloatingHearts() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const symbols = ['💖', '💕', '💗', '✨', '🌸', '💘', '⭐'];
    const newParticles: Particle[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 95, // %
      size: Math.random() * 1.4 + 0.8, // rem
      duration: Math.random() * 8 + 7, // seconds
      delay: Math.random() * 6,
      opacity: Math.random() * 0.5 + 0.35,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft gradient background radial glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-300/20 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-400/20 blur-[120px]" />
      
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-up"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}rem`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            bottom: '-50px',
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
}
