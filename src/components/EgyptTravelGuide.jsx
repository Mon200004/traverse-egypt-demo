import React, { useState } from 'react';
import { TRAVEL_TIPS } from '../data/destinationsData';
import { ShieldCheck, Coins, Sun, Shirt, Check, ArrowRight, HelpCircle } from 'lucide-react';

export default function EgyptTravelGuide() {
  const [selectedNationality, setSelectedNationality] = useState('us');
  const [exchangeAmountUSD, setExchangeAmountUSD] = useState(100);

  const visaData = {
    us: { eligible: true, type: 'eVisa / Visa on Arrival', fee: '$25 USD', duration: '30 Days Single / 90 Days Multi', notes: 'Instant processing online or at Cairo Airport bank kiosks before passport control.' },
    uk: { eligible: true, type: 'eVisa / Visa on Arrival', fee: '$25 USD (£20)', duration: '30 Days', notes: 'Eligible for both official online portal and arrival stamp at all international airports.' },
    eu: { eligible: true, type: 'eVisa / Visa on Arrival', fee: '€25 EUR', duration: '30 Days', notes: 'European national ID cards accepted for some citizens (e.g. France, Germany, Italy, Belgium).' },
    ca: { eligible: true, type: 'Electronic Visa (eVisa)', fee: '$25 USD', duration: '30 Days', notes: 'Can obtain official single-entry or multiple-entry visa online with valid passport.' },
    au: { eligible: true, type: 'eVisa / Visa on Arrival', fee: '$25 USD', duration: '30 Days', notes: 'Australian passport holders receive entry stamp upon arrival or can apply online.' },
    gcc: { eligible: true, type: 'Visa-Free Entry', fee: 'Free ($0)', duration: 'Up to 90 Days', notes: 'Citizens of Saudi Arabia, UAE, Kuwait, Bahrain, and Oman enjoy visa-exempt entry.' },
    other: { eligible: true, type: 'Consular / eVisa', fee: 'Varies', duration: '30 Days', notes: 'Contact Traverse Egypt concierge for bespoke assistance and invitation letter support.' }
  };

  const currentVisa = visaData[selectedNationality] || visaData.other;

  return (
    <section id="guide" className="py-20 relative bg-[#fcfaf6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Essential Voyager Intelligence</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#05233e] tracking-tight">
            Egypt Travel Essentials & Visa Guide
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Everything you need for a seamless, luxurious arrival into the Land of the Pharaohs.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Interactive Tools (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Interactive Visa Checker */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <h3 className="font-display font-bold text-base text-[#05233e]">
                  Live Egypt Visa Requirements Checker
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Select your passport country to check entry permits and visa rules:
              </p>

              {/* Country Selector */}
              <div className="mb-4">
                <select
                  value={selectedNationality}
                  onChange={(e) => setSelectedNationality(e.target.value)}
                  className="w-full bg-[#fbf9f5] text-slate-800 text-xs font-bold rounded-xl px-3.5 py-2.5 border border-slate-300 focus:border-amber-500 focus:bg-white focus:outline-none"
                >
                  <option value="us">United States (US Passport)</option>
                  <option value="uk">United Kingdom (British Citizen)</option>
                  <option value="eu">European Union Member States</option>
                  <option value="ca">Canada</option>
                  <option value="au">Australia & New Zealand</option>
                  <option value="gcc">GCC Countries (Saudi Arabia, UAE, Kuwait, etc.)</option>
                  <option value="other">Other Global Nationalities</option>
                </select>
              </div>

              {/* Result Box */}
              <div className="p-4 rounded-xl bg-[#fbf9f5] border border-amber-200 space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Entry Status:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{currentVisa.type}</span>
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Official Visa Fee:</span>
                  <span className="font-bold text-amber-700">{currentVisa.fee}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Permitted Stay:</span>
                  <span className="font-bold text-slate-800">{currentVisa.duration}</span>
                </div>
                <p className="text-[11px] text-slate-600 pt-1 leading-relaxed">
                  💡 {currentVisa.notes}
                </p>
              </div>
            </div>

            {/* Currency Converter */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="font-display font-bold text-base text-[#05233e]">
                  Egyptian Pound (EGP) Quick Converter
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Current approximate bank rate (1 USD ≈ 50.00 EGP):
              </p>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold block mb-1">Amount (USD $)</label>
                  <input
                    type="number"
                    min="1"
                    value={exchangeAmountUSD}
                    onChange={(e) => setExchangeAmountUSD(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#fbf9f5] text-slate-900 font-bold text-sm rounded-xl px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-amber-800 block mb-1 font-bold">Equivalent in EGP (ج.م)</label>
                  <div className="w-full bg-amber-50 text-amber-800 font-display font-black text-lg rounded-xl px-3 py-2 border border-amber-300 flex items-center">
                    E£ {(exchangeAmountUSD * 50).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Expert Guidance Cards (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {TRAVEL_TIPS.map((tip, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-colors shadow-sm"
              >
                <h4 className="font-display font-bold text-sm text-[#05233e] mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{tip.title}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
