/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FullLogo } from './Logo';

interface NavbarProps {
  onOpenBooking: () => void;
}

const menuItems = [
  { name: 'Hành trình', href: '#journey' },
  { name: 'Sứ mệnh', href: '#why' },
  { name: 'Thành quả', href: '#stats' },
  { name: 'Bác sĩ', href: '#doctors' },
  { name: 'Thư viện', href: '#gallery' },
  { name: 'Báo chí', href: '#press' },
  { name: 'Lịch trình', href: '#schedule' },
  { name: 'Liên hệ', href: '#contact' },
];

function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          // Simple active section detection
          const scrollPosition = window.scrollY + 120;
          for (const item of menuItems) {
            const id = item.href.substring(1);
            const element = document.getElementById(id);
            if (element) {
              const top = element.offsetTop;
              const height = element.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(id);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    const id = href.substring(1);
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
    <>
      <header
        id="app-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 flex items-center ${
          isScrolled
            ? 'glass-panel shadow-md h-20 lg:h-[88px] border-b border-white/20'
            : 'bg-transparent h-20 lg:h-[96px] border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between h-full gap-2 lg:gap-4">
          {/* Logo Brand - Zone 1 (Left) */}
          <a
            id="nav-logo"
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center shrink-0 cursor-pointer py-1"
          >
            <FullLogo className="h-9 sm:h-10 lg:h-11 xl:h-12 2xl:h-[50px] w-auto transition-all duration-200" />
          </a>

          {/* Desktop Navigation - Zone 2 (Center) */}
          <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-2 xl:px-6">
            <nav id="desktop-nav" className="flex items-center justify-center gap-1.5 lg:gap-2.5 xl:gap-5 2xl:gap-7">
              {menuItems.map((item) => {
                const id = item.href.substring(1);
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`relative py-1 text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 group shrink-0 ${
                      isActive
                        ? 'text-primary font-bold'
                        : 'text-slate-700 hover:text-primary'
                    }`}
                  >
                    <span>{item.name}</span>
                    {/* Hover and Active Underline Effect */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2.5px] bg-primary rounded-full transition-transform duration-200 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons - Zone 3 (Right - Desktop) */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-4 shrink-0">
            <a
              id="navbar-contact-btn"
              href="tel:0388498969"
              className="flex items-center justify-center gap-1.5 xl:gap-2 px-3.5 lg:px-4 xl:px-5 h-[42px] xl:h-[46px] 2xl:h-[48px] bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white text-xs lg:text-[13px] xl:text-sm 2xl:text-[16px] font-semibold rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 xl:w-[18px] xl:h-[18px] shrink-0" />
              <span>Liên hệ</span>
            </a>
            <button
              id="navbar-cta-btn"
              onClick={onOpenBooking}
              className="flex items-center justify-center gap-1.5 xl:gap-2 px-4 lg:px-5 xl:px-6 h-[42px] xl:h-[46px] 2xl:h-[48px] bg-gradient-to-r from-primary to-secondary hover:shadow-md hover:scale-[1.02] active:scale-[0.98] text-white text-xs lg:text-[13px] xl:text-sm 2xl:text-[16px] font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 xl:w-[18px] xl:h-[18px] shrink-0" />
              <span>Đăng ký khám</span>
            </button>
          </div>

          {/* Mobile & Tablet Actions - Zone 3 (Right - Mobile/Tablet) */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden shrink-0">
            <a
              id="navbar-hotline-mobile"
              href="tel:0388498969"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-full transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="hidden sm:inline">0388 498 969</span>
              <span className="sm:hidden">Hotline</span>
            </a>
            <button
              id="navbar-cta-btn-mobile"
              onClick={onOpenBooking}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 bg-gradient-to-r from-primary to-secondary text-white text-xs sm:text-sm font-bold rounded-full shadow hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Đăng ký khám"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Đăng ký khám</span>
              <span className="sm:hidden">Khám</span>
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-slate-700 hover:text-primary hover:bg-slate-100 rounded-xl transition-all cursor-pointer shrink-0"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="mobile-drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-dark/60 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-out Drawer */}
            <motion.div
              id="mobile-drawer-container"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full bg-white shadow-2xl p-6 flex flex-col justify-between lg:hidden"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
                  <div className="flex items-center">
                    <FullLogo size="sm" />
                  </div>
                  <button
                    id="close-drawer-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
                    aria-label="Đóng menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav id="mobile-nav-links" className="space-y-1.5">
                  {menuItems.map((item) => {
                    const id = item.href.substring(1);
                    const isActive = activeSection === id;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                        }`}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="border-t border-slate-100 pt-6 space-y-4">
                <a
                  id="drawer-hotline"
                  href="tel:0388498969"
                  className="flex items-center justify-center gap-2 py-3 border border-slate-200 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Tổng đài: 0388 498 969</span>
                </a>
                <button
                  id="drawer-cta-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl shadow-md hover:brightness-150 transition-all text-center cursor-pointer"
                >
                  Đăng ký khám miễn phí
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(Navbar);
