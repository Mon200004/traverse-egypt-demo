import React, { useState } from 'react';
import { X, Check, Calendar, Users, Hotel, ShieldCheck, ArrowRight, ArrowLeft, Printer, Sparkles, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ tour, currency, onClose }) {
  const [step, setStep] = useState(1);
  const [departureDate, setDepartureDate] = useState('2026-11-15');
  const [adults, setAdults] = useState(2);
  const [roomType, setRoomType] = useState('suite');
  const [selectedAddons, setSelectedAddons] = useState(['airport-fasttrack']);
  
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestCountry, setGuestCountry] = useState('United States');
  const [specialNotes, setSpecialNotes] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  if (!tour) return null;

  const roomOptions = [
    { id: 'suite', name: 'Nile / Pyramid View Deluxe Suite', surcharge: 0 },
    { id: 'presidential', name: 'Royal Heritage Presidential Suite', surcharge: 450 },
    { id: 'classic', name: 'Classic Pharaonic Room', surcharge: -120 }
  ];

  const availableAddons = [
    { id: 'airport-fasttrack', name: 'VIP Airport Meet & Assist with Fast-Track', price: 90 },
    { id: 'balloon', name: 'Sunrise Hot-Air Balloon over Valley of the Kings', price: 180 },
    { id: 'sound-light', name: 'Private Giza Sound & Light VIP Lounge Access', price: 85 },
    { id: 'private-dinner', name: 'Romantic Nile Riverboat Candlelit Dinner', price: 140 }
  ];

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const basePrice = tour.priceUSD;
  const roomSurcharge = roomOptions.find(r => r.id === roomType)?.surcharge || 0;
  const addonsTotal = selectedAddons.reduce((sum, aId) => {
    const addon = availableAddons.find(a => a.id === aId);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalUSD = (basePrice + roomSurcharge) * adults + (addonsTotal * adults);
  const depositUSD = Math.round(totalUSD * 0.15);

  const formatPrice = (usd) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(usd * 0.92).toLocaleString()}`;
      case 'GBP': return `£${Math.round(usd * 0.79).toLocaleString()}`;
      case 'EGP': return `E£${Math.round(usd * 50).toLocaleString()}`;
      default: return `$${usd.toLocaleString()}`;
    }
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const ref = `TE-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setStep(3);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#fbf9f5]">
          <div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block">
              Reservation Concierge
            </span>
            <h3 className="font-display font-bold text-lg text-[#05233e]">
              {tour.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        {step < 3 && (
          <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="text-[#05233e] font-bold">Step {step} of 2: {step === 1 ? 'Trip Options' : 'Guest Details'}</span>
            <div className="flex gap-2">
              <div className={`w-8 h-1 rounded-full ${step >= 1 ? 'bg-amber-500' : 'bg-slate-300'}`} />
              <div className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-amber-500' : 'bg-slate-300'}`} />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {step === 1 && (
            <div className="space-y-5">
              
              {/* Date & Guests Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#05233e] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>Preferred Departure Date</span>
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-[#fbf9f5] text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2.5 border border-slate-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#05233e] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>Travelers (Adults)</span>
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-[#fbf9f5] text-slate-900 text-xs font-bold rounded-xl px-3.5 py-2.5 border border-slate-300 focus:border-amber-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Room Tier */}
              <div>
                <label className="text-xs font-bold text-[#05233e] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-amber-600" />
                  <span>Suite Category</span>
                </label>
                <div className="space-y-2">
                  {roomOptions.map(room => (
                    <div
                      key={room.id}
                      onClick={() => setRoomType(room.id)}
                      className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between text-xs ${
                        roomType === room.id
                          ? 'bg-amber-50 border-amber-500 text-[#05233e] shadow-sm'
                          : 'bg-[#fbf9f5] border-slate-200 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                          roomType === room.id ? 'border-amber-500 bg-amber-500' : 'border-slate-400'
                        }`}>
                          {roomType === room.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="font-bold">{room.name}</span>
                      </div>
                      <span className="text-amber-700 font-bold">
                        {room.surcharge > 0 ? `+${formatPrice(room.surcharge)}` : room.surcharge < 0 ? `-${formatPrice(Math.abs(room.surcharge))}` : 'Included'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-on Excursions */}
              <div>
                <label className="text-xs font-bold text-[#05233e] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Optional Pharaonic Upgrades</span>
                </label>
                <div className="space-y-2">
                  {availableAddons.map(addon => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl cursor-pointer border transition-all flex items-center justify-between text-xs ${
                          isChecked
                            ? 'bg-amber-50 border-amber-500 text-[#05233e]'
                            : 'bg-[#fbf9f5] border-slate-200 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-400'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="font-medium">{addon.name}</span>
                        </div>
                        <span className="text-amber-700 font-bold font-display">
                          +{formatPrice(addon.price)} / guest
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {step === 2 && (
            <form id="booking-form" onSubmit={handleConfirmBooking} className="space-y-4">
              
              {/* Cost Overview */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-900 uppercase tracking-wider block font-bold">Total Estimated Investment</span>
                  <span className="text-2xl font-black text-amber-700 font-display">
                    {formatPrice(totalUSD)}
                  </span>
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    Deposit due today: <strong className="text-slate-900">{formatPrice(depositUSD)}</strong> (15%)
                  </span>
                </div>
                <div className="text-right text-xs text-sky-800 font-bold">
                  <span>{adults} Guests</span>
                  <span className="block text-[11px] text-slate-500">{tour.duration}</span>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Lead Passenger Name *</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Dr. Catherine Morland"
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
                    placeholder="name@domain.com"
                    className="w-full bg-[#fbf9f5] text-slate-900 rounded-lg px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#fbf9f5] text-slate-900 rounded-lg px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-bold">Country of Residence</label>
                  <input
                    type="text"
                    value={guestCountry}
                    onChange={(e) => setGuestCountry(e.target.value)}
                    className="w-full bg-[#fbf9f5] text-slate-900 rounded-lg px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-bold text-xs">Special Requests / Dietary Preferences</label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Vegetarian, early airport check-in, anniversary cake..."
                  className="w-full bg-[#fbf9f5] text-slate-900 text-xs rounded-lg px-3 py-2 border border-slate-300 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  No immediate charge. Your reservation is held for 48 hours while your dedicated Traverse Egypt concierge confirms hotel allocations and sends secure payment link.
                </span>
              </div>

            </form>
          )}

          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-700 mx-auto flex items-center justify-center shadow-lg">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                  Official Traverse Egypt Voucher
                </span>
                <h3 className="font-display text-2xl font-black text-[#05233e] mt-0.5">
                  Reservation Provisional Confirmation
                </h3>
              </div>

              {/* Printable Voucher Card */}
              <div className="p-5 rounded-2xl bg-[#fcfaf6] border border-amber-300 text-left max-w-lg mx-auto text-xs space-y-2.5 shadow-md">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Booking Reference</span>
                    <p className="font-mono font-bold text-base text-amber-700">{bookingRef}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Status</span>
                    <p className="font-bold text-emerald-700">Confirmed & Reserved</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-1">
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">Primary Guest:</span>
                    <strong className="text-slate-900">{guestName || 'Valued Guest'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">Departure Date:</span>
                    <strong className="text-slate-900">{departureDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">Expedition:</span>
                    <strong className="text-slate-900">{tour.title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px] font-medium">Party Size:</span>
                    <strong className="text-slate-900">{adults} Guests</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Total Price:</span>
                  <span className="text-base font-black text-amber-700 font-display">{formatPrice(totalUSD)}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#05233e] flex items-center gap-2 border border-slate-300"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Voucher</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 3 && (
          <div className="px-6 py-3 border-t border-slate-200 bg-[#fbf9f5] flex items-center justify-between">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-300 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5"
              >
                <span>Continue to Guest Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-form"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Confirm Reservation</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
