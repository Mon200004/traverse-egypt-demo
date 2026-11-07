import React from 'react';
import { X, Heart, Trash2, ArrowRight } from 'lucide-react';
import { TOURS_DATA } from '../data/toursData';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemoveFromWishlist, onSelectTour, currency }) {
  if (!isOpen) return null;

  const savedTours = TOURS_DATA.filter(t => wishlist.includes(t.id));

  const formatPrice = (tour) => {
    switch (currency) {
      case 'EUR': return `€${tour.priceEUR.toLocaleString()}`;
      case 'GBP': return `£${tour.priceGBP.toLocaleString()}`;
      case 'EGP': return `E£${tour.priceEGP.toLocaleString()}`;
      default: return `$${tour.priceUSD.toLocaleString()}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 p-6 flex flex-col shadow-2xl text-slate-800">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h3 className="font-display font-bold text-lg text-[#05233e]">
                Saved Expeditions ({savedTours.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {savedTours.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3 stroke-[1]" />
                <p className="font-semibold text-slate-700">No saved expeditions yet.</p>
                <p className="mt-1">Click the heart icon on any tour card to curate your wishlist.</p>
              </div>
            ) : (
              savedTours.map(tour => (
                <div
                  key={tour.id}
                  className="p-3.5 rounded-xl bg-[#fbf9f5] border border-slate-200 hover:border-amber-400 transition-all flex gap-3 group"
                >
                  <img
                    src={tour.heroImage}
                    alt={tour.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        onClose();
                        onSelectTour(tour);
                      }}
                      className="font-display font-bold text-xs text-[#05233e] hover:text-amber-600 cursor-pointer truncate"
                    >
                      {tour.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">{tour.duration}</span>
                    <span className="text-sm font-black text-amber-600 font-display block mt-1">
                      {formatPrice(tour)}
                    </span>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectTour(tour);
                        }}
                        className="text-[11px] text-sky-700 hover:text-amber-700 font-bold flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(tour.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {savedTours.length > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs tracking-wide shadow-md"
              >
                Continue Exploring Egypt
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
