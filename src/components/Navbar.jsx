import React, { useState, useEffect } from 'react';
import { Heart, Compass, Phone, Globe, Menu, X, ChevronDown, Sparkles } from 'lucide-react';

export default function Navbar({
  currency,
  setCurrency,
  wishlistCount,
  onOpenWishlist,
  onOpenCustomBuilder,
  onNavigate
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies = [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'EGP', symbol: 'E£', label: 'EGP (ج.م)' },
  ];

  const navItems = [
    { name: 'Destinations', id: 'destinations' },
    { name: 'Curated Tours', id: 'tours' },
    { name: 'Nile Dahabiyas', id: 'nile-cruises' },
    { name: 'Egypt Map', id: 'egypt-map' },
    { name: 'Travel Guide', id: 'guide' },
    { name: 'Stories', id: 'stories' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative h-11 sm:h-12 flex items-center">
              <img
                src="/assets/logo-horizontal.png"
                alt="Traverse Egypt"
                className="h-10 sm:h-11 w-auto object-contain filter group-hover:scale-[1.02] transition-transform"
              />
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="px-3.5 py-2 text-sm font-semibold text-[#05233e] hover:text-amber-600 hover:bg-amber-50/80 rounded-lg transition-colors"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Actions: Currency, Wishlist & CTA */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-[#05233e] hover:border-amber-400 hover:bg-amber-50/50 transition-all shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-white p-1 shadow-2xl border border-slate-200 z-50 animate-fadeIn">
                  {currencies.map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setCurrency(curr.code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg flex items-center justify-between ${
                        currency === curr.code
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{curr.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Wishlist Trips */}
            <button
              onClick={onOpenWishlist}
              title="Saved Expeditions"
              className="relative p-2 rounded-lg bg-slate-50 border border-slate-200 text-[#05233e] hover:text-amber-600 hover:border-amber-400 transition-all shadow-sm"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-amber-500 text-amber-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Tailor-Made Trip Customizer CTA */}
            <button
              onClick={onOpenCustomBuilder}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Tailor Your Journey</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-lg bg-slate-50 border border-slate-200 text-[#05233e]"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-amber-500 text-amber-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-slate-950 text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[#05233e] hover:text-amber-600"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-600">Display Currency:</span>
            <div className="flex gap-1.5">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => setCurrency(curr.code)}
                  className={`px-2 py-1 text-xs rounded font-bold ${
                    currency === curr.code
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {curr.code}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 rounded-lg bg-slate-50 text-sm font-semibold text-[#05233e] hover:text-amber-600 hover:bg-amber-50"
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenCustomBuilder();
              setIsMobileMenuOpen(false);
            }}
            className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm text-center shadow-lg shadow-amber-500/20"
          >
            Design Custom Expedition
          </button>
        </div>
      )}
    </header>
  );
}
