import React from 'react';
import { Wind, Anchor, Sunset, Award, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function NileCruiseExperience({ onExploreDahabiya }) {
  const dahabiyaFeatures = [
    {
      icon: Wind,
      title: 'Silent Wind Propulsion',
      desc: 'Powered exclusively by traditional twin white lateen sails. No engine vibrations or diesel fumes, only the whispering Nile breeze.'
    },
    {
      icon: Anchor,
      title: 'Private Island Moorings',
      desc: 'Because of their shallow draft, our Dahabiyas moor at secluded uninhabited Nile islands far away from massive commercial cruise ships.'
    },
    {
      icon: Sunset,
      title: 'Unrivaled Stargazing & Chef Dining',
      desc: 'Savor gourmet 5-course dinners prepared by your private onboard chef, followed by candlelit evenings under the Saharan stars.'
    },
    {
      icon: Award,
      title: 'Max 12 Discerning Guests',
      desc: 'Enjoy unprecedented exclusivity, tailored pace, and private sunrise visits to temples before tourist crowds arrive.'
    }
  ];

  return (
    <section id="nile-cruises" className="py-20 relative bg-gradient-to-b from-[#fbf9f5] via-[#f5eee0] to-[#fbf9f5] overflow-hidden">
      
      {/* Decorative Wave Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-amber-400 to-sky-500 opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Storytelling */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-300 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Egyptian Dahabiya Sailing on the Nile"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Floating Quote Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 border border-amber-300 text-xs text-slate-800 backdrop-blur-md shadow-lg">
                <p className="font-display italic text-[#05233e] font-semibold text-sm">
                  “Sailing on the Nile aboard a Dahabiya is not merely travel—it is a dream from a golden age, revived with modern luxury.”
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Traverse Egypt Heritage Fleet</span>
                  <span className="text-amber-700 font-bold">100% Private Charter Available</span>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Stamp */}
            <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 shadow-xl">
              <img
                src="/assets/logo-icon.png"
                alt="Traverse Emblem"
                className="w-8 h-8 object-contain"
              />
              <div>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block">Signature</span>
                <span className="text-xs font-bold text-[#05233e]">Traverse Dahabiya</span>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Distinctive Perks */}
          <div className="lg:col-span-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Timeless Nile Royalty</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#05233e] tracking-tight leading-snug">
              The Art of Sailing the Nile by <span className="text-gold-gradient">Royal Dahabiya</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Long before massive motorized cruise liners existed, royal travelers explored Egypt on handcrafted wooden Dahabiyas. Traverse Egypt has meticulously restored this romantic, peaceful journey.
            </p>

            {/* Feature List (Light Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {dahabiyaFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-400 transition-colors shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-display font-bold text-sm text-[#05233e] mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreDahabiya}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
              >
                <span>View 8-Day Royal Dahabiya Itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Private Charter & Small Group Departures</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
