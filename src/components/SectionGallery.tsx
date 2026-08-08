/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback, memo, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, X, ChevronLeft, ChevronRight, Eye, Grid } from 'lucide-react';
import { galleryItems } from '../data';

const tabs = [
  'tất cả',
  'khám và tầm soát',
  'hoạt động bác sĩ',
  'người dân tham gia',
  'địa phương',
  'hậu trường',
  'khoảnh khắc đáng nhớ'
];

function SectionGallery() {
  const [activeTab, setActiveTab] = useState<string>('tất cả');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [, setSlideDirection] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    if (activeTab === 'tất cả') return galleryItems;
    return galleryItems.filter(item => item.category === activeTab);
  }, [activeTab]);

  const handlePrev = useCallback((e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedItemIndex === null) return;
    const item = filteredItems[selectedItemIndex];
    if (!item) return;
    const imgs = item.images || [item.image];
    setSlideDirection(-1);
    setCurrentImageIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
  }, [selectedItemIndex, filteredItems]);

  const handleNext = useCallback((e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedItemIndex === null) return;
    const item = filteredItems[selectedItemIndex];
    if (!item) return;
    const imgs = item.images || [item.image];
    setSlideDirection(1);
    setCurrentImageIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
  }, [selectedItemIndex, filteredItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setSelectedItemIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, currentImageIndex, handlePrev, handleNext]);

  const handleImageLoad = useCallback((id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  }, []);

  const slideVariants = {
    enter: {
      opacity: 0
    },
    center: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  };

  const activeItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;
  const currentImages = activeItem ? (activeItem.images || [activeItem.image]) : [];

  return (
    <section
      id="gallery"
      className="py-12 sm:py-16 lg:py-24 bg-bg-custom relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide uppercase mb-3">
            <Image className="w-3.5 h-3.5" />
            <span>07 . Thư Viện Hình Ảnh</span>
          </div>
          <h4 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-dark tracking-tight leading-tight whitespace-nowrap">
            Khoảnh Khắc Của Niềm Tin
          </h4>
          <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-xl mx-auto font-medium">
            Ghi lại những nụ cười, giọt nước mắt hạnh phúc và những dặm đường không mỏi của đoàn xe Vision Bus cứu giúp thị lực cộng đồng.
          </p>
        </div>

        {/* Tab Navigation Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto px-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              id={`tab-btn-${tab.replace(/\s+/g, '-')}`}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold tracking-wide transition-all duration-200 capitalize cursor-pointer ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-102'
                  : 'bg-white border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid Layout */}
        <motion.div
          id="gallery-grid"
          layout
          className={`grid gap-6 max-w-6xl mx-auto ${
            filteredItems.length === 1
              ? 'grid-cols-1 max-w-md'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isLoaded = loadedImages[item.id];
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setSelectedItemIndex(index);
                    setCurrentImageIndex(0);
                    setSlideDirection(0);
                  }}
                  className="relative bg-white rounded-3xl overflow-hidden border border-slate-100 p-2.5 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer w-full"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3]">
                    {!isLoaded && (
                      <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
                        <Grid className="w-8 h-8 text-slate-300 animate-spin" />
                      </div>
                    )}
                    
                    <img
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => handleImageLoad(item.id)}
                      className={`w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                      <span className="text-[10px] uppercase font-extrabold text-accent tracking-widest mb-1">
                        {item.category}
                      </span>
                      <h4 className="font-bold text-sm text-white font-heading leading-tight flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-primary-light" /> {item.title}
                      </h4>
                      <p className="text-xs text-slate-200 leading-snug mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 text-sm">Chưa có hình ảnh nào được cập nhật trong danh mục này.</p>
          </div>
        )}

      </div>

      {/* Lightbox Slider */}
      <AnimatePresence>
        {selectedItemIndex !== null && activeItem && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
            
            <button
              id="close-lightbox-btn"
              onClick={() => setSelectedItemIndex(null)}
              className="absolute top-6 right-6 z-55 p-2.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              id="prev-lightbox-btn"
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-55 p-3.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer hidden md:flex"
              aria-label="Trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative max-w-4xl w-full flex flex-col items-center justify-center">
              
              <div className="text-center mb-6 text-white max-w-xl px-4">
                <span className="text-[10px] uppercase tracking-widest text-accent font-black bg-accent/10 px-2.5 py-1 rounded-full">
                  {activeItem.category}
                </span>
                <h4 className="font-extrabold text-xl sm:text-2xl font-heading mt-3">
                  {activeItem.title}
                </h4>
                <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {activeItem.description}
                </p>
              </div>

              <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-black/40 rounded-2xl border border-white/5">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentImageIndex}
                    src={currentImages[currentImageIndex]}
                    alt={`${activeItem.title} - ${currentImageIndex + 1}`}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ opacity: { duration: 0.25 } }}
                    className="absolute max-h-full max-w-full object-contain rounded-xl shadow-xl select-none"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full md:hidden cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full md:hidden cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full max-w-3xl mt-6 px-4">
                <div className="flex gap-2.5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x justify-start sm:justify-center">
                  {currentImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSlideDirection(idx > currentImageIndex ? 1 : -1);
                        setCurrentImageIndex(idx);
                      }}
                      className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer snap-center ${
                        idx === currentImageIndex
                          ? 'border-primary scale-105 shadow-lg shadow-primary/25 ring-2 ring-primary/30 opacity-100'
                          : 'border-white/10 hover:border-white/30 opacity-40 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
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

              <div className="text-xs text-white/50 mt-4 font-mono bg-white/5 px-3 py-1 rounded-full">
                Hình ảnh {currentImageIndex + 1} / {currentImages.length}
              </div>

            </div>

            <button
              id="next-lightbox-btn"
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-55 p-3.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer hidden md:flex"
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
