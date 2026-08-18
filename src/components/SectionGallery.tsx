/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback, memo, MouseEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Play, Pause, ZoomIn } from 'lucide-react';
import { galleryItems } from '../data';

function SectionGallery() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const sliderRef = useRef<HTMLDivElement>(null);

  const items = galleryItems;

  // Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const maxSlide = useMemo(() => {
    return Math.max(0, items.length - itemsPerPage);
  }, [items.length, itemsPerPage]);

  // Ensure currentSlide is within bounds
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [maxSlide, currentSlide]);

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev <= 0 ? maxSlide : prev - 1));
  }, [maxSlide]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay || isHovered || items.length <= itemsPerPage) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, items.length, itemsPerPage, nextSlide]);

  // Lightbox navigation across album photos
  const handlePrevLightbox = useCallback((e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex(prev => {
      if (prev === null) return 0;
      return prev === 0 ? items.length - 1 : prev - 1;
    });
  }, [items.length]);

  const handleNextLightbox = useCallback((e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedPhotoIndex(prev => {
      if (prev === null) return 0;
      return prev === items.length - 1 ? 0 : prev + 1;
    });
  }, [items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      } else {
        if (e.key === 'ArrowLeft') handlePrevLightbox();
        if (e.key === 'ArrowRight') handleNextLightbox();
        if (e.key === 'Escape') setSelectedPhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, prevSlide, nextSlide, handlePrevLightbox, handleNextLightbox]);

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  }, []);

  const activePhoto = selectedPhotoIndex !== null ? items[selectedPhotoIndex] : null;

  return (
    <section
      id="gallery"
      className="py-12 sm:py-16 lg:py-24 bg-bg-custom relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h4 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-dark tracking-tight leading-tight whitespace-nowrap">
            Khoảnh Khắc Của Niềm Tin
          </h4>
        </div>

        {/* Slider Carousel Container */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slide Track */}
          <div ref={sliderRef} className="overflow-hidden rounded-3xl p-1">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              animate={{
                x: `-${currentSlide * (100 / itemsPerPage)}%`
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            >
              {items.map((item, index) => {
                const isLoaded = loadedImages[item.id];
                return (
                  <div
                    key={item.id}
                    className="shrink-0 px-3 w-full sm:w-1/2 lg:w-1/3"
                  >
                    <div
                      onClick={() => setSelectedPhotoIndex(index)}
                      className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white border border-slate-100"
                    >
                      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                        <img
                          src={item.image}
                          alt={`Khoảnh khắc ${index + 1}`}
                          width={600}
                          height={450}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => handleImageLoad(item.id)}
                          className={`w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ${
                            isLoaded ? 'opacity-100' : 'opacity-90'
                          }`}
                          referrerPolicy="no-referrer"
                        />

                        {/* Hover Overlay with Zoom Icon */}
                        <div className="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm text-primary flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <ZoomIn className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Navigation Controls */}
          {items.length > itemsPerPage && (
            <>
              {/* Left Arrow Button */}
              <button
                id="gallery-slide-prev-btn"
                onClick={prevSlide}
                aria-label="Ảnh trước"
                className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 bg-white/95 hover:bg-white text-dark shadow-xl hover:shadow-2xl rounded-full flex items-center justify-center transition-all duration-200 hover:scale-108 border border-slate-100 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 text-slate-700" />
              </button>

              {/* Right Arrow Button */}
              <button
                id="gallery-slide-next-btn"
                onClick={nextSlide}
                aria-label="Ảnh sau"
                className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 bg-white/95 hover:bg-white text-dark shadow-xl hover:shadow-2xl rounded-full flex items-center justify-center transition-all duration-200 hover:scale-108 border border-slate-100 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6 text-slate-700" />
              </button>
            </>
          )}

          {/* Bottom Controls Bar: Dots Indicator & Auto-play toggle */}
          {items.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              {/* Dots */}
              {items.length > itemsPerPage && (
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: maxSlide + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Chuyển tới slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlide
                          ? 'w-8 bg-primary shadow-sm'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* AutoPlay Toggle */}
              {items.length > itemsPerPage && (
                <button
                  id="gallery-slide-autoplay-toggle"
                  onClick={() => setIsAutoPlay(prev => !prev)}
                  title={isAutoPlay ? 'Tạm dừng tự động trượt' : 'Bật tự động trượt'}
                  className="p-1.5 text-slate-400 hover:text-dark bg-white border border-slate-200 rounded-full text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                >
                  {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && activePhoto && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark/95 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto">
            
            {/* Close Button */}
            <button
              id="close-lightbox-btn"
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 z-55 p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer shadow-lg"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              id="prev-lightbox-btn"
              onClick={handlePrevLightbox}
              className="absolute left-4 sm:left-8 z-55 p-3.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer hidden md:flex shadow-lg"
              aria-label="Trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Content */}
            <div className="relative max-w-5xl w-full flex flex-col items-center justify-center">
              
              <div className="relative w-full h-[55vh] sm:h-[65vh] flex items-center justify-center overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={selectedPhotoIndex}
                    src={activePhoto.image}
                    alt={`Khoảnh khắc ${selectedPhotoIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    decoding="async"
                    className="absolute max-h-full max-w-full object-contain rounded-2xl shadow-2xl select-none"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Mobile Prev / Next overlay buttons */}
                <button
                  onClick={handlePrevLightbox}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 bg-dark/60 hover:bg-dark/80 text-white rounded-full md:hidden cursor-pointer backdrop-blur-sm shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNextLightbox}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-dark/60 hover:bg-dark/80 text-white rounded-full md:hidden cursor-pointer backdrop-blur-sm shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Thumbnails Strip */}
              <div className="w-full max-w-4xl mt-6 px-4">
                <div className="flex gap-2.5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x justify-start sm:justify-center">
                  {items.map((imgItem, idx) => (
                    <button
                      key={imgItem.id}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer snap-center ${
                        idx === selectedPhotoIndex
                          ? 'border-primary scale-105 shadow-lg shadow-primary/40 ring-2 ring-primary/40 opacity-100'
                          : 'border-white/20 hover:border-white/50 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgItem.image}
                        alt={`Thumbnail ${idx + 1}`}
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Counter Pill */}
              <div className="text-xs text-slate-300 mt-3 font-mono bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
                Ảnh {selectedPhotoIndex + 1} / {items.length}
              </div>

            </div>

            {/* Next Button */}
            <button
              id="next-lightbox-btn"
              onClick={handleNextLightbox}
              className="absolute right-4 sm:right-8 z-55 p-3.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer hidden md:flex shadow-lg"
              aria-label="Sau"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default memo(SectionGallery);
