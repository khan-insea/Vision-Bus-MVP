/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, memo } from 'react';
import { ChevronUp, Facebook, Youtube, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoIcon } from './Logo';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer id="app-footer" className="bg-dark text-slate-300 py-16 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 text-left">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a
              id="footer-brand"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-block bg-white px-4 py-2.5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-sm shadow-white/5 border border-slate-100/10"
            >
              <LogoIcon size="md" className="h-9 sm:h-10 w-auto" />
            </a>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Chương trình sức khỏe cộng đồng lưu động của <strong className="text-white font-semibold">Bệnh viện Mắt Sài Gòn Kiên Giang</strong>. Đồng hành thắp sáng đôi mắt Việt, mang niềm tin nhãn khoa chuẩn 5 sao đến mọi miền quê hương.
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Đường dẫn nhanh</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#journey" className="hover:text-primary hover:underline transition-colors block">Hành trình mang ánh sáng</a>
              </li>
              <li>
                <a href="#why" className="hover:text-primary hover:underline transition-colors block">Sứ mệnh ra đời</a>
              </li>
              <li>
                <a href="#stats" className="hover:text-primary hover:underline transition-colors block">Thành quả đạt được</a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-primary hover:underline transition-colors block">Đội ngũ chuyên gia bác sĩ</a>
              </li>
            </ul>
          </div>

          {/* Quick Links Part 2 (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest">Đồng hành & Chia sẻ</h5>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Chia sẻ câu chuyện hoặc đăng ký tham gia đóng góp cho quỹ hỗ trợ mổ mắt nhân đạo của chúng tôi.
            </p>
            {/* Social shares handles */}
            <div className="flex items-center gap-3">
              <a
                id="footer-social-fb"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                id="footer-social-yt"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                id="footer-social-tiktok"
                href="https://www.tiktok.com/@matsaigonkiengiang"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-xs"
                aria-label="TikTok"
              >
                <span className="font-sans">𝄡</span>
              </a>
              <a
                id="footer-social-web"
                href="https://matsaigonkiengiang.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Website"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Vision Bus. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Thiết kế tận tâm bởi Bệnh viện Mắt Sài Gòn Kiên Giang</span>
            <span className="text-red-500">❤️</span>
          </div>
        </div>

      </div>

      {/* Float Back To Top Button (AnimatePresence) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            id="back-to-top-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-[84px] sm:bottom-6 right-4 sm:right-6 z-40 p-3 bg-gradient-to-tr from-primary to-secondary hover:brightness-105 active:scale-95 text-white rounded-full shadow-lg transition-all cursor-pointer"
            aria-label="Lên đầu trang"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default memo(Footer);
