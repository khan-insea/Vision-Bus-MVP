/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, ChevronLeft, ChevronRight, ExternalLink, Calendar } from 'lucide-react';
import { pressItems } from '../data';

function SectionPress() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? pressItems.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev === pressItems.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <section
      id="press"
      className="py-12 sm:py-16 lg:py-24 bg-white relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-12 lg:mb-16 gap-4">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide uppercase mb-3">
              <Newspaper className="w-3.5 h-3.5" />
              <span>08 . Truyền Thông & Báo Chí</span>
            </div>
            <h4 className="text-lg xs:text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-dark tracking-tight leading-tight whitespace-nowrap">
              Báo Chí Nói Gì Về Chúng Tôi?
            </h4>
            <p className="text-slate-600 text-base sm:text-lg mt-2 font-medium">
              Sự đồng hành, ghi nhận khách quan từ các đơn vị thông tin chính thống tiếp thêm sức mạnh cho hành trình gieo mầm hy vọng.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              id="press-prev-btn"
              onClick={handlePrev}
              className="p-3 border border-slate-200 hover:border-primary text-slate-500 hover:text-primary rounded-full bg-white shadow-sm transition-all cursor-pointer"
              aria-label="Tin trước"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="press-next-btn"
              onClick={handleNext}
              className="p-3 border border-slate-200 hover:border-primary text-slate-500 hover:text-primary rounded-full bg-white shadow-sm transition-all cursor-pointer"
              aria-label="Tin kế tiếp"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Slider Showcase Container */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-50/70 p-6 md:p-10 rounded-3xl border border-slate-100"
              >
                <div className="md:col-span-5 relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                    <img
                      src={pressItems[currentIndex].image}
                      alt={pressItems[currentIndex].title}
                      width={600}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-primary text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    {pressItems[currentIndex].newspaperName}
                  </div>
                </div>

                <div className="md:col-span-7 text-left space-y-4">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>Ngày đăng: {pressItems[currentIndex].date}</span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-dark font-heading leading-snug">
                    "{pressItems[currentIndex].title}"
                  </h4>

                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    {pressItems[currentIndex].summary}
                  </p>

                  <div className="pt-4 flex items-center gap-4">
                    <a
                      id={`press-read-more-${pressItems[currentIndex].id}`}
                      href={pressItems[currentIndex].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:brightness-105 hover:shadow text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      <span>Đọc bài viết đầy đủ</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      Nguồn: <span className="text-primary">{pressItems[currentIndex].newspaperName}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-1.5 mt-8">
            {pressItems.map((_, idx) => (
              <button
                key={idx}
                id={`press-dot-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Đi tới slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(SectionPress);
