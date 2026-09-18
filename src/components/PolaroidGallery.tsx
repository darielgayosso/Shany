'use client';

import React, { useState } from 'react';
import { PolaroidMemory, albumData } from '@/data/albumData';
import { Heart, MapPin, Calendar, RotateCw, Maximize2, Sparkles, Filter } from 'lucide-react';
import { sounds } from '@/lib/soundUtils';

export function PolaroidGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeModalPhoto, setActiveModalPhoto] = useState<PolaroidMemory | null>(null);

  const categories = [
    { id: 'todas', label: 'Todas ' },
    { id: 'citas', label: 'Citas ' },
    { id: 'viajes', label: 'Viajes ' },
    { id: 'risas', label: 'Risas ' },
    { id: 'especiales', label: 'Especiales ' },
  ];

  const filteredMemories =
    selectedCategory === 'todas'
      ? albumData.polaroids
      : albumData.polaroids.filter((m) => m.category === selectedCategory);

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sounds.playPop();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Álbum de Recuerdos Polaroid</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent">
          Nuestras Fotos
        </h2>
        <p className="text-sm text-pink-800/80 mt-2 max-w-md mx-auto">
          Haz clic en cualquier foto para girarla y leer el secreto o dedicatoria escrita al reverso 💌
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        <Filter className="w-4 h-4 text-pink-400 mr-1 hidden sm:inline" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sounds.playPop();
              setSelectedCategory(cat.id);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all transform active:scale-95 shadow-sm ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-200 shadow-md scale-105'
                : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-pink-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Polaroid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {filteredMemories.map((memory) => {
          const isFlipped = flippedCards[memory.id] || false;

          return (
            <div
              key={memory.id}
              className={`group perspective cursor-pointer transition-transform duration-300 hover:scale-[1.02] ${
                memory.rotation || ''
              }`}
              onClick={() => toggleFlip(memory.id)}
            >
              <div
                className={`relative w-full h-[400px] transition-transform duration-700 transform-style-3d shadow-xl hover:shadow-2xl rounded-2xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF POLAROID */}
                <div className="absolute inset-0 w-full h-full bg-white border border-pink-100 p-4 rounded-2xl shadow-inner flex flex-col justify-between backface-hidden">
                  {/* Decorative Washi Tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/60 backdrop-blur-xs border border-pink-300/40 rotate-1 rounded-sm shadow-xs z-20 pointer-events-none flex items-center justify-center">
                    <span className="text-[10px] text-pink-700/60 font-mono">
                      {memory.date}
                    </span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative w-full h-64 bg-pink-50 rounded-lg overflow-hidden border border-pink-100/50 mt-2">
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 flex gap-1 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sounds.playPop();
                          setActiveModalPhoto(memory);
                        }}
                        className="p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-xs transition"
                        title="Ver en pantalla completa"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Polaroid Bottom Label */}
                  <div className="pt-3 pb-1 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-bold text-gray-800 text-base leading-tight truncate">
                        {memory.title}
                      </h3>
                      {memory.location && (
                        <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span>{memory.location}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-pink-100/60 text-[11px] text-pink-600 font-semibold">
                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-3 h-3 text-pink-400" />
                        {memory.date}
                      </span>
                      <span className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                        Girar nota <RotateCw className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* BACK OF POLAROID (Secret Note) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-amber-50 to-pink-50/80 border-2 border-pink-200 p-6 rounded-2xl shadow-xl flex flex-col justify-between rotate-y-180 backface-hidden overflow-hidden">
                  <div className="flex items-center justify-between border-b border-pink-200/70 pb-2">
                    <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      Mensaje Secreto
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {memory.date}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center my-4 px-2">
                    <p className="text-sm sm:text-base font-serif italic text-gray-700 leading-relaxed text-center">
                      "{memory.backNote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-pink-200/70 flex items-center justify-between text-xs text-pink-600 font-medium">
                    <span className="italic text-gray-500">Con todo mi amor, Dariel</span>
                    <button
                      onClick={(e) => toggleFlip(memory.id, e)}
                      className="flex items-center gap-1 px-3 py-1 bg-white hover:bg-pink-100 rounded-full border border-pink-200 shadow-xs text-rose-600 text-xs font-bold"
                    >
                      Volver a foto <RotateCw className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeModalPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-pink-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalPhoto(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
            >
              ✕
            </button>
            <div className="max-h-[70vh] w-full bg-black flex items-center justify-center">
              <img
                src={activeModalPhoto.image}
                alt={activeModalPhoto.title}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-extrabold text-gray-900">
                {activeModalPhoto.title}
              </h3>
              <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-2">
                <span>📅 {activeModalPhoto.date}</span>
                {activeModalPhoto.location && <span>📍 {activeModalPhoto.location}</span>}
              </p>
              <div className="mt-4 p-4 rounded-xl bg-pink-50 border border-pink-100">
                <p className="text-sm italic text-gray-700 font-serif">
                  "{activeModalPhoto.backNote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
