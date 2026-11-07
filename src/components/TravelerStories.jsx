import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/destinationsData';
import { Star, Quote, ChevronLeft, ChevronRight, Award, ShieldCheck, Heart } from 'lucide-react';

export default function TravelerStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevStory = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="stories" className="py-20 relative bg-[#f5f1e8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Voices of Our Voyagers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#05233e] tracking-tight">
            Journeys that Leave an Eternal Imprint
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Read authentic accounts from travelers who trusted Traverse Egypt with their once-in-a-lifetime pharaonic voyages.
          </p>
        </div>

        {/* Testimonial Spotlight Card */}
        <div className="max-w-4xl mx-auto relative">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-300/80 shadow-xl relative">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-amber-100 pointer-events-none" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>

            {/* Review text */}
            <p className="font-display text-base sm:text-lg text-[#05233e] leading-relaxed italic mb-8 font-medium">
              “{current.text}”
            </p>

            {/* Author info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400"
                />
                <div>
                  <h4 className="font-bold text-[#05233e] text-sm">{current.name}</h4>
                  <p className="text-xs text-sky-700 font-semibold">{current.location}</p>
                  <p className="text-[11px] text-amber-700 font-bold mt-0.5">{current.trip}</p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={prevStory}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextStory}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === idx ? 'w-8 bg-amber-500' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

        </div>

        {/* Trust Badges Bar */}
        <div className="mt-16 pt-10 border-t border-slate-300/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="p-3">
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-amber-600 block">4.98 / 5</span>
            <span className="text-xs text-slate-600 font-medium mt-1 block">2,400+ Verified Explorers</span>
          </div>
          <div className="p-3">
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#05233e] block">100%</span>
            <span className="text-xs text-slate-600 font-medium mt-1 block">Private Egyptologist Guided</span>
          </div>
          <div className="p-3">
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-sky-700 block">No. 1</span>
            <span className="text-xs text-slate-600 font-medium mt-1 block">Boutique Nile Dahabiya Fleet</span>
          </div>
          <div className="p-3">
            <span className="text-2xl sm:text-3xl font-display font-extrabold text-amber-600 block">Ministry</span>
            <span className="text-xs text-slate-600 font-medium mt-1 block">Tourism License #A-8942</span>
          </div>
        </div>

      </div>
    </section>
  );
}
