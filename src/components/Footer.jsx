import React, { useState } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Sparkles, Send, Check } from 'lucide-react';

export default function Footer({ onOpenCustomBuilder, onNavigate }) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#05233e] text-slate-300 pt-16 pb-12 border-t border-sky-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card */}
        <div className="bg-gradient-to-r from-[#031b30] to-[#073259] rounded-3xl p-6 sm:p-10 border border-amber-400/40 mb-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Traverse Pharaonic Gazette</span>
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Receive $150 Credit Towards Your First Expedition
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Subscribe for private invitations to newly restored tomb openings, archaeological discoveries, and secret seasonal Dahabiya sailings.
              </p>
            </div>

            {/* Subscription Form */}
            <div className="w-full lg:w-auto min-w-[320px]">
              {subscribed ? (
                <div className="p-4 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Welcome! Use voucher code <strong className="font-mono text-white">TRAVERSE150</strong> on your next reservation.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-white text-slate-900 text-xs rounded-xl px-4 py-3 border border-slate-300 focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Claim Voucher</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14 text-xs">
          
          {/* Col 1: Brand Info & Logo (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 inline-block p-2 rounded-xl">
              <img
                src="/assets/logo-horizontal.png"
                alt="Traverse Egypt"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-slate-300 leading-relaxed max-w-sm">
              Traverse Egypt is Egypt’s premier bespoke travel atelier, crafting immersive private Pharaonic expeditions, authentic wooden Dahabiya cruises, and luxury Sahara oasis camps since 2012.
            </p>
            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ministry of Tourism & Antiquities License #A-8942</span>
            </div>
          </div>

          {/* Col 2: Signature Expeditions */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Curated Expeditions
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><button onClick={() => onNavigate('tours')} className="hover:text-amber-400 transition-colors">The Grand Pharaoh's Odyssey</button></li>
              <li><button onClick={() => onNavigate('nile-cruises')} className="hover:text-amber-400 transition-colors">Royal Dahabiya Nile Sanctuary</button></li>
              <li><button onClick={() => onNavigate('tours')} className="hover:text-amber-400 transition-colors">Red Sea Coral & Sinai</button></li>
              <li><button onClick={() => onNavigate('tours')} className="hover:text-amber-400 transition-colors">Siwa Salt Lakes & Sand Sea</button></li>
              <li><button onClick={() => onNavigate('tours')} className="hover:text-amber-400 transition-colors">White Desert Stargazing</button></li>
            </ul>
          </div>

          {/* Col 3: Key Destinations */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Destinations
            </h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><button onClick={() => onNavigate('egypt-map')} className="hover:text-amber-400 transition-colors">Cairo & Great Pyramids</button></li>
              <li><button onClick={() => onNavigate('egypt-map')} className="hover:text-amber-400 transition-colors">Luxor Valley of the Kings</button></li>
              <li><button onClick={() => onNavigate('egypt-map')} className="hover:text-amber-400 transition-colors">Aswan & Philae Temple</button></li>
              <li><button onClick={() => onNavigate('egypt-map')} className="hover:text-amber-400 transition-colors">Sharm El Sheikh & Dahab</button></li>
              <li><button onClick={() => onNavigate('egypt-map')} className="hover:text-amber-400 transition-colors">Siwa Oasis & Great Sand Sea</button></li>
            </ul>
          </div>

          {/* Col 4: Concierge Offices */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Offices & Concierge
            </h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Cairo HQ: 14 Hassan Assem St, Zamalek, Cairo, Egypt</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Luxor Marina: Corniche el-Nile, Private Dahabiya Pier</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>+20 (2) 2735-8900 / VIP Hotline</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>concierge@traverseegypt.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sky-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Traverse Egypt. All Rights Reserved. Designed with Pharaonic Splendor.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Escorted Travel</a>
            <a href="#" className="hover:text-white">Ministry Accreditation</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
