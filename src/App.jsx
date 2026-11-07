import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero3DCanvas from './components/Hero3DCanvas';
import QuickSearchWidget from './components/QuickSearchWidget';
import FeaturedTours from './components/FeaturedTours';
import NileCruiseExperience from './components/NileCruiseExperience';
import EgyptInteractiveMap from './components/EgyptInteractiveMap';
import EgyptTravelGuide from './components/EgyptTravelGuide';
import TravelerStories from './components/TravelerStories';
import TourDetailModal from './components/TourDetailModal';
import BookingModal from './components/BookingModal';
import CustomTourBuilder from './components/CustomTourBuilder';
import WishlistDrawer from './components/WishlistDrawer';
import LiveChatWidget from './components/LiveChatWidget';
import Footer from './components/Footer';
import { TOURS_DATA } from './data/toursData';

export default function App() {
  const [currency, setCurrency] = useState('USD');
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('traverse_wishlist');
      return saved ? JSON.parse(saved) : ['grand-pharaohs-odyssey'];
    } catch {
      return ['grand-pharaohs-odyssey'];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const [selectedTourForModal, setSelectedTourForModal] = useState(null);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState(null);
  const [searchFilter, setSearchFilter] = useState(null);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('traverse_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const toggleWishlist = (tourId) => {
    setWishlist(prev => 
      prev.includes(tourId) ? prev.filter(id => id !== tourId) : [...prev, tourId]
    );
  };

  const handleSearch = (filters) => {
    setSearchFilter(filters);
    // Smooth scroll down to tours grid
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDestinationFromMap = (destName) => {
    setSearchFilter({ destination: destName });
    scrollToSection('tours');
  };

  const handleExploreDahabiya = () => {
    const dahabiyaTour = TOURS_DATA.find(t => t.id === 'royal-dahabiya-nile-sail');
    if (dahabiyaTour) {
      setSelectedTourForModal(dahabiyaTour);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-slate-800 selection:bg-amber-400 selection:text-slate-950">
      
      {/* Sticky Glass Navbar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* Main Content */}
      <main>
        {/* 3D Hero Section */}
        <Hero3DCanvas
          onExploreClick={() => scrollToSection('tours')}
          onCustomPlanClick={() => setIsCustomBuilderOpen(true)}
        />

        {/* Quick Search & Filter Widget */}
        <QuickSearchWidget onSearch={handleSearch} />

        {/* Curated Tour Packages Grid */}
        <FeaturedTours
          currency={currency}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onSelectTour={(tour) => setSelectedTourForModal(tour)}
          onBookTour={(tour) => setSelectedTourForBooking(tour)}
          searchFilter={searchFilter}
        />

        {/* The Art of Sailing the Nile: Royal Dahabiya Showcase */}
        <NileCruiseExperience onExploreDahabiya={handleExploreDahabiya} />

        {/* Interactive Egypt Regional Map & Explorer */}
        <EgyptInteractiveMap onSelectDestination={handleSelectDestinationFromMap} />

        {/* Egypt Travel Essentials & Visa Guide */}
        <EgyptTravelGuide />

        {/* Traveler Stories & Verified Testimonials */}
        <TravelerStories />
      </main>

      {/* Footer */}
      <Footer
        onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)}
        onNavigate={scrollToSection}
      />

      {/* 24/7 Egyptologist Concierge Live Chat */}
      <LiveChatWidget onOpenCustomBuilder={() => setIsCustomBuilderOpen(true)} />

      {/* Slide-over Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={toggleWishlist}
        onSelectTour={(tour) => setSelectedTourForModal(tour)}
        currency={currency}
      />

      {/* Tour Detail & Day-by-Day Modal */}
      {selectedTourForModal && (
        <TourDetailModal
          tour={selectedTourForModal}
          currency={currency}
          onClose={() => setSelectedTourForModal(null)}
          onBookNow={(tour) => setSelectedTourForBooking(tour)}
        />
      )}

      {/* Multi-step Booking Checkout Modal */}
      {selectedTourForBooking && (
        <BookingModal
          tour={selectedTourForBooking}
          currency={currency}
          onClose={() => setSelectedTourForBooking(null)}
        />
      )}

      {/* Tailor-Made Custom Tour Builder */}
      <CustomTourBuilder
        isOpen={isCustomBuilderOpen}
        onClose={() => setIsCustomBuilderOpen(false)}
        currency={currency}
      />

    </div>
  );
}
