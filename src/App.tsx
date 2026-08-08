/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Critical Above-the-fold components (Static Import)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionJourney from './components/SectionJourney';
import SectionWhy from './components/SectionWhy';
import SectionStats from './components/SectionStats';
import SectionValues from './components/SectionValues';
import Footer from './components/Footer';

// Below-the-fold components (Lazy Loaded for Bundle Optimization)
const SectionDoctors = lazy(() => import('./components/SectionDoctors'));
const SectionGallery = lazy(() => import('./components/SectionGallery'));
const SectionPress = lazy(() => import('./components/SectionPress'));
const SectionNextStations = lazy(() => import('./components/SectionNextStations'));
const SectionContact = lazy(() => import('./components/SectionContact'));
const BookingModal = lazy(() => import('./components/BookingModal'));

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<string | undefined>(undefined);
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  // Monitor scroll for Floating CTA with rAF throttle & passive listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowFloatingCta(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBooking = useCallback((stationId?: string) => {
    setSelectedStationId(stationId);
    setIsBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsBookingOpen(false);
    setSelectedStationId(undefined);
  }, []);

  return (
    <div id="landing-page-root" className="min-h-screen flex flex-col relative select-text">
      
      {/* Structural Meta description and structured data for search engine simulation */}
      <h1 className="sr-only">Vision Bus - Sáng Mắt, Sáng Cả Niềm Tin - Bệnh viện Mắt Sài Gòn Kiên Giang</h1>

      {/* Sticky Navbar */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* HERO SECTION */}
        <Hero onOpenBooking={openBooking} />

        {/* SECTION 01: Hành trình mang ánh sáng */}
        <SectionJourney />

        {/* SECTION 02: Vì sao Vision Bus ra đời */}
        <SectionWhy />

        {/* SECTION 03: Trạm dừng Vision Bus (Counters) */}
        <SectionStats />

        {/* SECTION 04: Điều gì tạo nên sự khác biệt? */}
        <SectionValues />

        <Suspense fallback={<div className="min-h-[200px]" />}>
          {/* SECTION 05: Những người giữ ánh sáng (Doctors) */}
          <SectionDoctors />

          {/* SECTION 06: Khoảnh khắc của niềm tin (Gallery + Lightbox) */}
          <SectionGallery />

          {/* SECTION 07: Báo chí nói gì về chúng tôi? */}
          <SectionPress />

          {/* SECTION 08: Trạm dừng kế tiếp (Timeline Schedule) */}
          <SectionNextStations onOpenBookingWithStation={openBooking} />

          {/* SECTION 09: Kết nối cùng Vision Bus (Hospital info + Maps + Booking) */}
          <SectionContact />
        </Suspense>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING CONVERSION CTA (Bottom left or right pulsing pill) */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.button
            id="floating-cta-booking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={() => openBooking()}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 h-[46px] sm:h-[48px] px-4 sm:px-5 bg-gradient-to-r from-primary to-accent hover:brightness-105 active:scale-95 text-white font-bold text-xs rounded-full shadow-lg hover:shadow-primary/20 transition-all cursor-pointer flex items-center gap-2"
          >
            {/* Pulsing ring indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <Calendar className="w-4 h-4" />
            <span>Đăng ký khám miễn phí</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* LIGHTBOX / BOOKING REGISTRATION SYSTEM MODAL */}
      <Suspense fallback={null}>
        {isBookingOpen && (
          <BookingModal
            isOpen={isBookingOpen}
            onClose={closeBooking}
            preselectedStationId={selectedStationId}
          />
        )}
      </Suspense>

    </div>
  );
}

