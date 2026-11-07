import React, { useState } from 'react';
import { X, Star, Clock, Users, MapPin, Check, AlertCircle, ChevronDown, ChevronUp, Calendar, ShieldCheck, ArrowRight, Plane, Coffee, Hotel } from 'lucide-react';

export default function TourDetailModal({ tour, currency, onClose, onBookNow }) {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedImage, setSelectedImage] = useState(tour?.heroImage);
  const [expandedDays, setExpandedDays] = useState({ 1: true, 2: true });

  if (!tour) return null;

  const toggleDay = (dayNum) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  const formatPrice = () => {
    switch (currency) {
      case 'EUR': return `€${tour.priceEUR.toLocaleString()}`;
      case 'GBP': return `£${tour.priceGBP.toLocaleString()}`;
      case 'EGP': return `E£${tour.priceEGP.toLocaleString()}`;
      default: return `$${tour.priceUSD.toLocaleString()}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden text-slate-800">
        
        {/* Top Header Bar */}
        <div className="relative px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#fbf9f5]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase">
              {tour.badge}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{tour.rating}</span>
              <span className="text-slate-500">({tour.reviewsCount} reviews)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          
          {/* Main Title & Gallery */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#05233e]">
              {tour.title}
            </h2>
            <p className="text-sm text-amber-800 font-semibold mt-1">
              {tour.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>{tour.duration}</span>
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-sky-600" />
                <span>{tour.groupSize}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>{tour.locations.join(' → ')}</span>
              </span>
            </div>
          </div>

          {/* Interactive Image Gallery */}
          <div className="space-y-2">
            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden border border-slate-200">
              <img
                src={selectedImage || tour.heroImage}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
            </div>
            {tour.gallery && tour.gallery.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {tour.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-16 w-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === img ? 'border-amber-500 scale-95' : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Highlights Box */}
          <div className="p-4 rounded-xl bg-[#fbf9f5] border border-amber-300">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>✦ Signature Traverse Experiences</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {tour.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200 flex gap-4 text-sm font-bold">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`pb-2 transition-all ${
                activeTab === 'itinerary'
                  ? 'text-amber-600 border-b-2 border-amber-500'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Day-by-Day Itinerary ({tour.itinerary?.length} Days)
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`pb-2 transition-all ${
                activeTab === 'inclusions'
                  ? 'text-amber-600 border-b-2 border-amber-500'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              What's Included & Excluded
            </button>
            <button
              onClick={() => setActiveTab('gear-faq')}
              className={`pb-2 transition-all ${
                activeTab === 'gear-faq'
                  ? 'text-amber-600 border-b-2 border-amber-500'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Essential Traveler Notes
            </button>
          </div>

          {/* TAB 1: Itinerary */}
          {activeTab === 'itinerary' && (
            <div className="space-y-3">
              {tour.itinerary?.map((item) => {
                const isExpanded = expandedDays[item.day];
                return (
                  <div
                    key={item.day}
                    className="rounded-xl bg-[#fbf9f5] border border-slate-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleDay(item.day)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-amber-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow-sm">
                          D{item.day}
                        </span>
                        <span className="font-display font-bold text-sm text-[#05233e]">
                          {item.title}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-amber-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-200 text-xs space-y-2 text-slate-600">
                        <p className="leading-relaxed text-slate-700">{item.desc}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-amber-800 font-semibold">
                          {item.stay && (
                            <span className="flex items-center gap-1">
                              <Hotel className="w-3.5 h-3.5 text-sky-600" />
                              <span>Accommodations: {item.stay}</span>
                            </span>
                          )}
                          {item.meals && (
                            <span className="flex items-center gap-1">
                              <Coffee className="w-3.5 h-3.5 text-sky-600" />
                              <span>Meals: {item.meals}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: Inclusions / Exclusions */}
          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Traverse All-Inclusive Amenities</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {tour.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Not Included / Optional</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {tour.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Travel Notes */}
          {activeTab === 'gear-faq' && (
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-[#fbf9f5] border border-slate-200">
                <h5 className="font-bold text-[#05233e] mb-1">VIP Egyptologist Guidance</h5>
                <p>Every Traverse Egypt journey is accompanied by a licensed Egyptologist holding a Master’s degree or PhD in Pharaonic Antiquities. You gain access to closed tomb chambers and historical insight unavailable to general tours.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#fbf9f5] border border-slate-200">
                <h5 className="font-bold text-[#05233e] mb-1">Flexible Cancellation & Rebooking</h5>
                <p>Full refund or penalty-free date reschedule up to 30 days prior to departure. 100% financial protection under Egyptian Ministry of Tourism escrow bonding.</p>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Booking Action Bar */}
        <div className="p-4 px-6 border-t border-slate-200 bg-[#fbf9f5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Price per guest</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-600 font-display">
                {formatPrice()}
              </span>
              <span className="text-xs text-slate-500 font-medium">All Taxes & Permits Included</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-700"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(tour);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <span>Reserve Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
