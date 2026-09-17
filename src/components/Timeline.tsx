'use client';

import React from 'react';
import { albumData, TimelineEvent } from '@/data/albumData';
import { Heart, Star, Plane, Camera, Sparkles, MapPin, Calendar } from 'lucide-react';

export function Timeline() {
  const getIcon = (iconType?: TimelineEvent['icon']) => {
    switch (iconType) {
      case 'heart':
        return <Heart className="w-5 h-5 text-white fill-white" />;
      case 'plane':
        return <Plane className="w-5 h-5 text-white" />;
      case 'star':
        return <Star className="w-5 h-5 text-white fill-white" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-white" />;
      case 'sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-3 shadow-xs">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Nuestra Historia de Amor</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent">
          Línea del Tiempo ⏳
        </h2>
        <p className="text-sm text-pink-800/80 mt-2 max-w-md mx-auto">
          Cada momento importante que nos ha traído hasta aquí... y los miles que nos faltan por escribir juntos.
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative border-l-2 border-pink-200 ml-4 sm:ml-32 space-y-10">
        {albumData.timeline.map((event, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div key={event.id} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-5 top-1.5 w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                {getIcon(event.icon)}
              </div>

              {/* Event Date Badge (Visible on large screens to left) */}
              <div className="hidden sm:block absolute -left-36 top-3 text-right w-24">
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 shadow-xs">
                  {event.date}
                </span>
              </div>

              {/* Card Body */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-pink-100 p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Mobile Date Header */}
                <div className="sm:hidden mb-2">
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-gray-800">
                  {event.title}
                </h3>

                {event.location && (
                  <p className="text-xs font-semibold text-rose-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.location}</span>
                  </p>
                )}

                <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Photo Preview */}
                {event.image && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-pink-100 max-h-56 bg-pink-50 shadow-inner">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
