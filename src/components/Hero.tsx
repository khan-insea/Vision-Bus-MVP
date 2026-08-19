/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useMemo, memo } from 'react';
import { motion } from 'motion/react';
import { MousePointerClick, Play, PhoneCall, HeartHandshake } from 'lucide-react';
import { heroLandscape, bus } from '../assets/images';
import { getSpecificAssetImage } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
}

function Hero({ onOpenBooking }: HeroProps) {
  const heroImage = useMemo(() => {
    return heroLandscape || bus;
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 80;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-b from-[#e8f6f0] to-[#f4faf7]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Header */}
          <div className="lg:col-span-7 text-left space-y-4 sm:space-y-6">
            
            <div className="space-y-2 sm:space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading text-dark tracking-tight leading-none"
              >
                VISION <span className="text-primary">BUS</span>
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-2xl lg:text-3xl font-bold text-primary tracking-tight"
              >
                Sáng mắt - Sáng cả niềm tin
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal"
              >
                Hành trình đưa dịch vụ nhãn khoa chất lượng cao trực thuộc Bệnh viện Mắt Sài Gòn Kiên Giang đến tận từng huyện xã, vùng xa.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2.5 sm:gap-4 pt-1 sm:pt-2"
            >
              <button
                id="hero-cta-booking"
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 bg-primary hover:bg-primary/95 text-white text-xs sm:text-base font-bold rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all cursor-pointer"
              >
                <MousePointerClick className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                <span>Đăng ký khám miễn phí</span>
              </button>

              <button
                id="hero-cta-journey"
                onClick={() => scrollToSection('journey')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-3.5 sm:py-4 bg-white border border-slate-200 hover:border-primary text-slate-700 hover:text-primary text-xs sm:text-base font-bold rounded-2xl shadow-sm active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary fill-primary/20" />
                <span>Xem hành trình</span>
              </button>

              <button
                id="hero-cta-contact"
                onClick={() => scrollToSection('contact')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-3.5 sm:py-4 bg-dark text-white text-xs sm:text-base font-bold rounded-2xl shadow-md hover:bg-dark/90 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-accent" />
                <span>Liên hệ</span>
              </button>
            </motion.div>

            {/* Trust badge stats row */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-4 sm:gap-8 border-t border-slate-200/60 text-xs sm:text-base font-semibold text-slate-600">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs sm:text-base">50+</div>
                <span>Điểm dừng chân</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-extrabold text-xs sm:text-base">68k+</div>
                <span>Lượt khám miễn phí</span>
              </div>
            </div>

          </div>

          {/* Bus Landscape Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
              <img
                src={heroImage}
                alt="Vision Bus Kiên Giang"
                width={800}
                height={600}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white text-[11px] sm:text-xs font-bold flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-accent shrink-0" />
                <span className="truncate">Bệnh viện Mắt Sài Gòn Kiên Giang</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
