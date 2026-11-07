import React, { useState, useMemo } from 'react';
import { TOURS_DATA } from '../data/toursData';
import { Star, Clock, Users, MapPin, Heart, ArrowRight, Check, Sparkles, Filter } from 'lucide-react';

export default function FeaturedTours({
  currency,
  wishlist,
  onToggleWishlist,
  onSelectTour,
  onBookTour,
  searchFilter
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');

  const categories = [
    { id: 'all', label: 'All Expeditions' },
    { id: 'cultural', label: 'Pharaonic Heritage' },
    { id: 'nile-cruise', label: 'Nile Dahabiyas' },
    { id: 'safari-oasis', label: 'Desert & Oases' },
    { id: 'red-sea', label: 'Red Sea Coastal' },
  ];

  const formatPrice = (tour) => {
    switch (currency) {
      case 'EUR':
        return `€${tour.priceEUR.toLocaleString()}`;
      case 'GBP':
        return `£${tour.priceGBP.toLocaleString()}`;
      case 'EGP':
        return `E£${tour.priceEGP.toLocaleString()}`;
      case 'USD':
      default:
        return `$${tour.priceUSD.toLocaleString()}`;
    }
  };

  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      if (activeCategory !== 'all' && tour.category !== activeCategory) {
        return false;
      }
      if (searchFilter) {
        if (searchFilter.travelStyle && searchFilter.travelStyle !== 'all') {
          if (tour.category !== searchFilter.travelStyle) return false;
        }
        if (searchFilter.destination && searchFilter.destination !== 'all') {
          const matchLoc = tour.locations.some(loc => 
            loc.toLowerCase().includes(searchFilter.destination.toLowerCase())
          );
          if (!matchLoc) return false;
        }
        if (searchFilter.duration && searchFilter.duration !== 'all') {
          if (searchFilter.duration === 'short' && tour.daysCount > 5) return false;
          if (searchFilter.duration === 'medium' && (tour.daysCount < 6 || tour.daysCount > 8)) return false;
          if (searchFilter.duration === 'long' && tour.daysCount < 9) return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-high') return b.priceUSD - a.priceUSD;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, searchFilter, sortBy]);

  return (
    <section id="tours" className="py-20 relative bg-[#fcfaf6] pharaoh-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Tailored For Discerning Voyagers</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#05233e] tracking-tight">
              Curated Egyptian Expeditions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              From the inner chambers of Giza’s Pyramids to private Nile Dahabiyas and glowing Siwa salt lagoons, every journey is handcrafted with bespoke luxury and scholarly depth.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-sky-600" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg px-3 py-1.5 focus:border-amber-500 focus:outline-none shadow-sm"
            >
              <option value="recommended">Featured / Curated</option>
              <option value="rating">Highest Rated (4.9+)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 hover:text-[#05233e] hover:bg-amber-50/60 border border-slate-200 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => {
            const isWishlisted = wishlist.includes(tour.id);
            return (
              <div
                key={tour.id}
                className="group rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-amber-400/80 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col shadow-sm"
              >
                {/* Tour Card Image Banner */}
                <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => onSelectTour(tour)}>
                  <img
                    src={tour.heroImage}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider shadow">
                      {tour.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#05233e] text-[11px] font-bold shadow-sm">
                      {tour.groupSize}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(tour.id);
                    }}
                    title={isWishlisted ? "Remove from saved" : "Save expedition"}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-amber-500 transition-colors shadow"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-semibold">{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold">{tour.rating}</span>
                      <span className="text-slate-200 text-[11px]">({tour.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Tour Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Destinations covered */}
                    <div className="flex items-center gap-1 text-[11px] text-sky-700 font-bold mb-2 truncate">
                      <MapPin className="w-3 h-3 text-amber-600 flex-shrink-0" />
                      <span>{tour.locations.slice(0, 4).join(' • ')}</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onSelectTour(tour)}
                      className="font-display font-bold text-lg text-[#05233e] hover:text-amber-600 cursor-pointer transition-colors line-clamp-1 mb-1.5"
                    >
                      {tour.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-normal">
                      {tour.subtitle}
                    </p>

                    {/* Highlights Preview */}
                    <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                      {tour.highlights.slice(0, 2).map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">From per person</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold text-amber-600 font-display">
                          {formatPrice(tour)}
                        </span>
                        <span className="text-[11px] text-slate-400 line-through">
                          ${tour.originalPriceUSD}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectTour(tour)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#05233e] transition-all"
                      >
                        Itinerary
                      </button>
                      <button
                        onClick={() => onBookTour(tour)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center gap-1"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
