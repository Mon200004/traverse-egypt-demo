import React, { useState } from 'react';
import { X, Sparkles, Check, Compass, Calendar, Users, Hotel, Award, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CustomTourBuilder({ isOpen, onClose, currency }) {
  const [step, setStep] = useState(1);
  const [selectedDestinations, setSelectedDestinations] = useState(['cairo', 'luxor']);
  const [travelStyle, setTravelStyle] = useState('dahabiya');
  const [hotelTier, setHotelTier] = useState('heritage');
  const [selectedPerks, setSelectedPerks] = useState(['sphinx-access', 'balloon']);
  const [durationDays, setDurationDays] = useState(9);
  const [adults, setAdults] = useState(2);
  const [departureMonth, setDepartureMonth] = useState('November 2026');
  
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const destinationsList = [
    { id: 'cairo', name: 'Cairo & Giza Pyramids', desc: 'Museums, Khan el-Khalili & Great Sphinx' },
    { id: 'luxor', name: 'Luxor & Valley of Kings', desc: 'Karnak, Hatshepsut & Royal Tombs' },
    { id: 'aswan', name: 'Aswan & Philae Temple', desc: 'Nubian Cataracts & Old Cataract Hotel' },
    { id: 'nile-sail', name: 'Private Nile Dahabiya Sail', desc: 'Wind-powered silent sailing along the Nile' },
    { id: 'siwa', name: 'Siwa Oasis & Salt Lakes', desc: 'Cleopatra springs, Great Sand Sea dunes' },
    { id: 'red-sea', name: 'Red Sea (Sharm / Dahab)', desc: 'Ras Mohammed reefs, turquoise beaches' },
    { id: 'white-desert', name: 'White Desert Camping', desc: 'Surreal chalk sculptures & starry nights' },
    { id: 'alexandria', name: 'Alexandria Mediterranean', desc: 'Qaitbay Citadel & Library of Alexandria' },
  ];

  const toggleDestination = (id) => {
    if (selectedDestinations.includes(id)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter(d => d !== id));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, id]);
    }
  };

  const perksList = [
    { id: 'sphinx-access', name: 'Private Access Between Sphinx Paws', price: 250 },
    { id: 'balloon', name: 'Sunrise Hot-Air Balloon Over Luxor', price: 180 },
    { id: 'bedouin-feast', name: 'Private Starlit Bedouin Feast in Desert', price: 120 },
    { id: 'curator-walk', name: 'Grand Egyptian Museum Curator Walk', price: 190 },
    { id: 'felucca-sunset', name: 'Private Nile Felucca Sunset Champagne', price: 95 },
  ];

  const togglePerk = (id) => {
    if (selectedPerks.includes(id)) {
      setSelectedPerks(selectedPerks.filter(p => p !== id));
    } else {
      setSelectedPerks([...selectedPerks, id]);
    }
  };

  const baseRatePerDay = hotelTier === 'palatial' ? 360 : hotelTier === 'heritage' ? 290 : 210;
  const styleMultiplier = travelStyle === 'dahabiya' ? 1.25 : travelStyle === 'archaeology' ? 1.15 : 1.0;
  const perksTotal = selectedPerks.reduce((sum, pId) => {
    const perk = perksList.find(p => p.id === pId);
    return sum + (perk ? perk.price : 0);
  }, 0);

  const estimatedUSD = Math.round(
    (durationDays * baseRatePerDay * styleMultiplier + perksTotal) * adults
  );

  const formatPrice = (usd) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(usd * 0.92).toLocaleString()}`;
      case 'GBP': return `£${Math.round(usd * 0.79).toLocaleString()}`;
      case 'EGP': return `E£${Math.round(usd * 50).toLocaleString()}`;
      default: return `$${usd.toLocaleString()}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-800">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#fbf9f5]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-display font-bold text-lg text-[#05233e]">
              Design Your Bespoke Traverse
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Bar */}
        {!isSubmitted && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-amber-700">Step {step} of 4</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map(s => (
                <div
                  key={s}
                  className={`w-10 h-1.5 rounded-full transition-colors ${
                    step >= s ? 'bg-amber-500' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[#05233e] font-bold">
              {step === 1 && 'Destinations'}
              {step === 2 && 'Pace & Style'}
              {step === 3 && 'VIP Add-Ons'}
              {step === 4 && 'Review & Reserve'}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-500 text-amber-700 mx-auto flex items-center justify-center shadow-md">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-black text-[#05233e]">
                Bespoke Expedition Proposal Created!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-amber-800">{guestName || 'Esteemed Guest'}</strong>. Your custom itinerary has been logged with reference <span className="font-mono text-sky-800 font-bold">#TE-2026-{Math.floor(1000 + Math.random() * 9000)}</span>.
              </p>

              <div className="p-4 rounded-xl bg-[#fbf9f5] border border-amber-300 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Duration & Target:</span>
                  <span className="font-bold text-slate-900">{durationDays} Days • {departureMonth}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Party Size:</span>
                  <span className="font-bold text-slate-900">{adults} Guests</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Estimated Total:</span>
                  <span className="font-black text-amber-700 text-sm font-display">{formatPrice(estimatedUSD)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Regions Selected:</span>
                  <span className="font-bold text-sky-800">{selectedDestinations.length} Key Egyptian Hubs</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                A Senior Traverse Egyptologist Concierge will contact you at <span className="text-sky-800 font-bold">{guestEmail || 'your email'}</span> within 2 hours with a comprehensive illustrated PDF dossier.
              </p>

              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-400 transition-colors"
              >
                Close & Return to Site
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1: DESTINATIONS */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#05233e] uppercase tracking-wider">
                      Select Your Egyptian Regions
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose all the destinations you wish to experience on this bespoke voyage.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {destinationsList.map((dest) => {
                      const isSelected = selectedDestinations.includes(dest.id);
                      return (
                        <div
                          key={dest.id}
                          onClick={() => toggleDestination(dest.id)}
                          className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-50 border-amber-500 text-[#05233e] shadow-sm'
                              : 'bg-[#fbf9f5] border-slate-200 text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          <div>
                            <span className="font-display font-bold text-sm block">
                              {dest.name}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              {dest.desc}
                            </span>
                          </div>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            isSelected ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-400'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: PACE & STYLE */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-[#05233e] uppercase tracking-wider">
                        Trip Duration
                      </label>
                      <span className="font-display font-extrabold text-amber-700 text-sm">
                        {durationDays} Days / {durationDays - 1} Nights
                      </span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="16"
                      value={durationDays}
                      onChange={(e) => setDurationDays(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>4 Days (Express)</span>
                      <span>10 Days (Classic)</span>
                      <span>16 Days (Grand Expedition)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#05233e] uppercase tracking-wider block mb-2">
                      Travel Style
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'dahabiya', title: 'Royal Dahabiya Sail', desc: 'Serene wind-powered private sailing boat' },
                        { id: 'archaeology', title: 'Archaeological VIP', desc: 'Master Egyptologist tomb access focus' },
                        { id: 'oasis-luxe', title: 'Desert Glamping & Sea', desc: 'Siwa salt pools & Red Sea luxury' },
                      ].map(style => (
                        <div
                          key={style.id}
                          onClick={() => setTravelStyle(style.id)}
                          className={`p-3 rounded-xl cursor-pointer border transition-all ${
                            travelStyle === style.id
                              ? 'bg-amber-50 border-amber-500 text-[#05233e] shadow-sm'
                              : 'bg-[#fbf9f5] border-slate-200 text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          <span className="font-display font-bold text-xs block text-[#05233e]">
                            {style.title}
                          </span>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {style.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#05233e] uppercase tracking-wider block mb-2">
                      Accommodation Standard
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'palatial', title: 'Historic Palace & Presidential', desc: 'Mena House Pyramid Suite & Old Cataract' },
                        { id: 'heritage', title: '5-Star Luxury Boutique', desc: 'Four Seasons & Boutique Nile suites' },
                        { id: 'eco-luxe', title: 'Boutique Eco-Lodge', desc: 'Handcrafted mudbrick & desert luxury' },
                      ].map(tier => (
                        <div
                          key={tier.id}
                          onClick={() => setHotelTier(tier.id)}
                          className={`p-3 rounded-xl cursor-pointer border transition-all ${
                            hotelTier === tier.id
                              ? 'bg-amber-50 border-amber-500 text-[#05233e] shadow-sm'
                              : 'bg-[#fbf9f5] border-slate-200 text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          <span className="font-display font-bold text-xs block text-[#05233e]">
                            {tier.title}
                          </span>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            {tier.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: VIP PERKS */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-[#05233e] uppercase tracking-wider">
                      Curated VIP Pharaonic Enhancements
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tailor your journey with once-in-a-lifetime private access and signature moments.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {perksList.map(perk => {
                      const isChecked = selectedPerks.includes(perk.id);
                      return (
                        <div
                          key={perk.id}
                          onClick={() => togglePerk(perk.id)}
                          className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                            isChecked
                              ? 'bg-amber-50 border-amber-500 text-[#05233e]'
                              : 'bg-[#fbf9f5] border-slate-200 text-slate-700 hover:border-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                              isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-400'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-bold">{perk.name}</span>
                          </div>
                          <span className="text-xs text-amber-700 font-display font-black">
                            +${perk.price} / person
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: GUEST DETAILS & ESTIMATE */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-900 uppercase tracking-wider block font-bold">
                        Calculated Estimate ({adults} Guests • {durationDays} Days)
                      </span>
                      <span className="text-2xl font-black text-amber-700 font-display">
                        {formatPrice(estimatedUSD)}
                      </span>
                      <span className="text-[11px] text-slate-600 block mt-0.5">
                        Includes hotels, VIP guide, domestic transfers & selected perks
                      </span>
                    </div>
                    <div className="text-right text-xs text-sky-800 font-bold hidden sm:block">
                      <span className="block font-bold">100% Tailor-Made</span>
                      <span className="text-[10px] text-slate-500">Zero Obligation Quote</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Lord / Lady / Dr. / Mr. / Ms."
                        className="w-full bg-[#fbf9f5] text-slate-900 rounded-lg px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full bg-[#fbf9f5] text-slate-900 rounded-lg px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+1 / +44 / +49..."
                        className="w-full bg-[#fbf9f5] text-slate-900 rounded-lg px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-1 font-bold">Travelers Count</label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full bg-[#fbf9f5] text-slate-900 rounded-lg px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="1">1 Solo Traveler</option>
                        <option value="2">2 Guests (Couple / Friends)</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6+ Guests (Private Charter)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-bold text-xs">Special Wishes / Dietary / Accessibility</label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Vegetarian dining, anniversary celebration, private photography permit..."
                      className="w-full bg-[#fbf9f5] text-slate-900 text-xs rounded-lg px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Submit & Receive Custom Dossier</span>
                  </button>
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {!isSubmitted && (
          <div className="px-6 py-3 border-t border-slate-200 bg-[#fbf9f5] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-300 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        )}

      </div>
    </div>
  );
}
