import React, { useState } from 'react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { MapPin, Sun, Calendar, Sparkles, ArrowRight, Compass } from 'lucide-react';

export default function EgyptInteractiveMap({ onSelectDestination }) {
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS_DATA[0]);

  const mapPins = [
    { id: 'alexandria', label: 'Alexandria', x: 42, y: 15, dest: DESTINATIONS_DATA[6] },
    { id: 'cairo-giza', label: 'Cairo & Giza', x: 48, y: 27, dest: DESTINATIONS_DATA[0] },
    { id: 'siwa', label: 'Siwa Oasis', x: 18, y: 35, dest: DESTINATIONS_DATA[4] },
    { id: 'white-desert', label: 'White Desert', x: 34, y: 46, dest: DESTINATIONS_DATA[5] },
    { id: 'red-sea', label: 'Sharm & Dahab', x: 74, y: 38, dest: DESTINATIONS_DATA[3] },
    { id: 'luxor', label: 'Luxor (Thebes)', x: 62, y: 64, dest: DESTINATIONS_DATA[1] },
    { id: 'aswan', label: 'Aswan & Philae', x: 63, y: 78, dest: DESTINATIONS_DATA[2] },
  ];

  return (
    <section id="egypt-map" className="py-20 relative bg-[#f7f4ee] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Egypt Territory</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#05233e] tracking-tight">
            Discover the Realms of Ancient & Modern Egypt
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            From the Mediterranean shores of Alexandria and the golden pyramids of Giza down the sacred Nile to Nubia and the azure depths of the Red Sea.
          </p>
        </div>

        {/* Interactive Map & Spotlight Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Stylized Interactive Map (7 cols) */}
          <div className="lg:col-span-7 relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            
            <div className="relative aspect-[4/3] w-full bg-[#eef6fc] rounded-2xl overflow-hidden border border-sky-200 p-4 flex items-center justify-center">
              
              {/* SVG Stylized Egypt Map Graphic */}
              <svg
                viewBox="0 0 500 420"
                className="w-full h-full filter drop-shadow-sm"
              >
                {/* Mediterranean Sea Water Tone */}
                <path
                  d="M 0,0 L 500,0 L 500,70 Q 350,75 240,65 Q 150,55 0,70 Z"
                  fill="#0284c7"
                  fillOpacity="0.28"
                />

                {/* Red Sea & Gulf Tone */}
                <path
                  d="M 330,120 Q 370,160 400,240 Q 420,320 460,420 L 500,420 L 500,100 Q 440,80 370,100 Z"
                  fill="#0284c7"
                  fillOpacity="0.28"
                />

                {/* Land Mass Boundary Contour */}
                <path
                  d="M 30,70 L 450,70 L 470,110 L 370,115 L 340,160 L 360,250 L 410,400 L 30,400 Z"
                  fill="#f6eee1"
                  stroke="#dfb776"
                  strokeWidth="1.5"
                />

                {/* The Majestic Nile River */}
                <path
                  d="M 315,360 Q 315,310 310,270 Q 285,250 295,210 Q 255,160 245,120 Q 240,100 240,85"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 240,85 Q 215,70 195,50 M 240,85 Q 260,70 280,50"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Sand Dunes Contour Waves */}
                <path
                  d="M 80,180 Q 140,195 190,175"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <path
                  d="M 60,230 Q 130,245 180,225"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <path
                  d="M 90,290 Q 150,305 200,285"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />

                {/* Compass Rose */}
                <g transform="translate(60, 110)">
                  <circle cx="0" cy="0" r="18" fill="none" stroke="#d97706" strokeWidth="1" strokeOpacity="0.6" />
                  <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="#d97706" fillOpacity="0.9" />
                  <text x="-4" y="-20" fill="#05233e" fontSize="10" fontWeight="bold">N</text>
                </g>
              </svg>

              {/* Interactive City Pins */}
              {mapPins.map((pin) => {
                const isSelected = selectedDest?.id === pin.dest.id;
                return (
                  <div
                    key={pin.id}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
                    onClick={() => setSelectedDest(pin.dest)}
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="absolute w-8 h-8 rounded-full bg-amber-400 animate-ping opacity-75" />
                      )}
                      
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 scale-125 shadow-lg shadow-amber-500/50 ring-2 ring-white'
                          : 'bg-white border-2 border-[#05233e] text-[#05233e] hover:scale-110 hover:border-amber-500 hover:text-amber-600 shadow'
                      }`}>
                        <MapPin className="w-3.5 h-3.5" />
                      </div>

                      <span className={`absolute top-7 whitespace-nowrap text-[11px] font-bold px-2 py-0.5 rounded-md pointer-events-none transition-all ${
                        isSelected
                          ? 'bg-[#05233e] text-white shadow-md'
                          : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                      }`}>
                        {pin.label}
                      </span>
                    </div>
                  </div>
                );
              })}

            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block animate-pulse" />
                <span>Click any golden pin on the map to inspect destination</span>
              </span>
              <span className="text-sky-700 font-bold hidden sm:inline">Nile River & Coastlines</span>
            </div>

          </div>

          {/* Destination Spotlight Card (5 cols) */}
          <div className="lg:col-span-5">
            {selectedDest && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-300 shadow-xl relative overflow-hidden animate-fadeIn">
                
                <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 border border-slate-200">
                  <img
                    src={selectedDest.image}
                    alt={selectedDest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-amber-800 text-xs font-bold flex items-center gap-1.5 shadow">
                      <Sun className="w-3.5 h-3.5 text-amber-600" />
                      <span>{selectedDest.weather}</span>
                    </span>
                    <span className="text-xs font-arabic text-amber-900 font-bold px-2.5 py-1 rounded-full bg-white/95 shadow">
                      {selectedDest.arabicName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-extrabold text-2xl text-[#05233e]">
                    {selectedDest.name}
                  </h3>
                  <span className="text-xs font-bold text-amber-800 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300">
                    {selectedDest.tourCount} Expeditions
                  </span>
                </div>

                <p className="text-xs font-bold text-sky-700 mb-3">
                  {selectedDest.tagline}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {selectedDest.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1.5 mb-5 p-3.5 rounded-xl bg-[#fbf9f5] border border-slate-200 text-xs">
                  <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Signature Highlights:</span>
                  </div>
                  {selectedDest.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-5 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Best Season:</span>
                  </span>
                  <span className="text-slate-800 font-bold">{selectedDest.bestTime}</span>
                </div>

                <button
                  onClick={() => onSelectDestination(selectedDest.name)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore {selectedDest.name} Itineraries</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
