'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { albumData } from '@/data/albumData';

interface MusicPlayerProps {
  customSongUrl?: string;
}

export function MusicPlayer({ customSongUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songUrl = customSongUrl || albumData.songUrl;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle first user interaction autoplay attempt
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked by browser policy, user will manually click play
          });
      }
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Playback error:', e));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        src={songUrl}
        loop
        preload="auto"
      />

      {/* Main Player Bar */}
      <div className="relative flex items-center gap-3 bg-white/90 backdrop-blur-md border border-pink-200 shadow-xl rounded-full p-2 pr-4 transition-all duration-300 hover:shadow-pink-200/50 hover:shadow-2xl">
        {/* Animated Vinyl Disk */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative group focus:outline-none"
          title="Ver canción"
        >
          <div
            className={`w-11 h-11 rounded-full bg-gradient-to-tr from-gray-900 via-rose-950 to-black flex items-center justify-center border-2 border-pink-300 shadow-md transition-transform duration-500 ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            {/* Inner vinyl grooves */}
            <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-pink-500 flex items-center justify-center text-[8px] text-white">
                💖
              </div>
            </div>
          </div>

          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          )}
        </button>

        {/* Song Info */}
        <div className="flex flex-col text-left max-w-[130px] sm:max-w-[170px] overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 truncate">
            <Music className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span className="truncate">{albumData.songTitle}</span>
          </div>
          <span className="text-[10px] text-pink-700/70 font-medium truncate">
            {albumData.songArtist}
          </span>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform"
          title={isPlaying ? 'Pausar canción' : 'Reproducir Collide'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </button>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-1.5 text-pink-600 hover:text-rose-700 rounded-full hover:bg-pink-50 transition"
          title={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Floating expanded details overlay */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-64 bg-white/95 backdrop-blur-lg border border-pink-200 shadow-2xl rounded-2xl p-4 text-center z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
              Música de Fondo 🎶
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-sm font-extrabold text-gray-800">
            "{albumData.songTitle}"
          </p>
          <p className="text-xs text-rose-600 mb-3 font-medium">
            {albumData.songArtist}
          </p>
          
          <div className="flex items-center gap-2 px-2">
            <VolumeX className="w-3 h-3 text-gray-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-pink-500 h-1.5 bg-pink-100 rounded-lg cursor-pointer"
            />
            <Volume2 className="w-3 h-3 text-pink-500" />
          </div>

          <p className="text-[10px] text-gray-400 mt-3 italic flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> Dedicada especialmente para Shany
          </p>
        </div>
      )}
    </div>
  );
}
