import React, { useState } from 'react';
import { Search, MapPin, Compass, Calendar, Users, SlidersHorizontal } from 'lucide-react';

export default function QuickSearchWidget({ onSearch }) {
  const [destination, setDestination] = useState('all');
  const [travelStyle, setTravelStyle] = useState('all');
  const [duration, setDuration] = useState('all');
  const [guests, setGuests] = useState('2');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ destination, travelStyle, duration, guests });
    }
  };

  return (
    <div className="relative -mt-10 sm:-mt-14 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white/95 backdrop-blur-xl p-5 sm:p-6 rounded-2xl shadow-xl border border-amber-300/40">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
          
          {/* Destination */}
          <div>
            <label className="block text-[11px] font-bold text-[#05233e] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Destination</span>
            </label>
            <div className="relative">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#fbf9f5] text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 border border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">Entire Egypt (All Regions)</option>
                <option value="cairo">Cairo & Giza Plateau</option>
                <option value="luxor">Luxor & Theban Tombs</option>
                <option value="nile">Nile Cruise (Luxor ↔ Aswan)</option>
                <option value="red-sea">Red Sea (Sharm / Dahab)</option>
                <option value="siwa">Siwa Oasis & Great Sand Sea</option>
                <option value="white-desert">White Desert & Bahariya</option>
              </select>
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-[11px] font-bold text-[#05233e] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Travel Style</span>
            </label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full bg-[#fbf9f5] text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 border border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">All Journey Styles</option>
              <option value="nile-cruise">Wind-Powered Dahabiya & Cruise</option>
              <option value="cultural">Pharaonic VIP Antiquities</option>
              <option value="safari-oasis">Desert Safari & Starlight Glamping</option>
              <option value="red-sea">Coral Diving & Coastal Relaxation</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-[11px] font-bold text-[#05233e] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>Trip Duration</span>
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-[#fbf9f5] text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 border border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all">Any Duration</option>
              <option value="short">3 – 5 Days (Highlights)</option>
              <option value="medium">6 – 8 Days (Classic Journey)</option>
              <option value="long">9 – 12 Days (Grand Expedition)</option>
            </select>
          </div>

          {/* Travelers */}
          <div>
            <label className="block text-[11px] font-bold text-[#05233e] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>Travelers</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-[#fbf9f5] text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 border border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none appearance-none cursor-pointer"
            >
              <option value="1">Solo Explorer (1)</option>
              <option value="2">Couples / Duo (2)</option>
              <option value="family">Small Family (3–5)</option>
              <option value="group">Private Entourage (6+)</option>
            </select>
          </div>

          {/* Submit Search Button */}
          <div>
            <button
              type="submit"
              className="w-full h-[42px] rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-slate-950" />
              <span>Find Journeys</span>
            </button>
          </div>

        </form>

        {/* Quick Filter Tags */}
        <div className="mt-3.5 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-sky-600" />
            <span>Popular Expeditions:</span>
          </span>
          <button
            onClick={() => onSearch({ travelStyle: 'nile-cruise', destination: 'all' })}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 border border-slate-200 transition-colors font-medium"
          >
            ⛵ Private Dahabiya Nile Sail
          </button>
          <button
            onClick={() => onSearch({ destination: 'cairo', travelStyle: 'cultural' })}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 border border-slate-200 transition-colors font-medium"
          >
            🏛️ King Tut & Giza VIP
          </button>
          <button
            onClick={() => onSearch({ destination: 'siwa', travelStyle: 'safari-oasis' })}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 border border-slate-200 transition-colors font-medium"
          >
            🌴 Siwa Floating Salt Lakes
          </button>
        </div>
      </div>
    </div>
  );
}
