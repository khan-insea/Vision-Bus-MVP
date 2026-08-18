/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, memo } from 'react';
import { ChevronUp, Facebook, Globe, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { logoSaigonEyeHospitalWhiteFooter } from '../assets/images';
import { hospitalInfo } from '../data';

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
    <footer id="app-footer" className="bg-dark text-slate-300 pt-16 pb-12 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-12 text-left">
          
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <a
              id="footer-brand"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-block hover:opacity-90 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <img
                src={logoSaigonEyeHospitalWhiteFooter}
                alt="Bệnh viện Mắt Sài Gòn"
                width={180}
                height={50}
                loading="eager"
                decoding="async"
                className="h-10 sm:h-11 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Chương trình y tế cộng đồng lưu động thuộc <strong className="text-white font-semibold">Bệnh viện Mắt Sài Gòn Kiên Giang</strong>. Mang dịch vụ nhãn khoa chất lượng cao đến tận các vùng sâu, vùng xa Kiên Giang.
            </p>

            <div className="pt-2">
              <p className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wider">Kênh truyền thông chính thức</p>
              <div className="flex items-center gap-2.5">
                <a
                  id="footer-social-fb"
                  href={hospitalInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                  aria-label="Facebook Bệnh viện Mắt Sài Gòn Kiên Giang"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  id="footer-social-tiktok"
                  href={hospitalInfo.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                  aria-label="TikTok Bệnh viện Mắt Sài Gòn Kiên Giang"
                  title="TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.04z"/>
                  </svg>
                </a>

                <a
                  id="footer-social-web"
                  href={hospitalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                  aria-label="Website Bệnh viện Mắt Sài Gòn Kiên Giang"
                  title="Website"
                >
                  <Globe className="w-4 h-4" />
                </a>

                <a
                  id="footer-social-mail"
                  href={`mailto:${hospitalInfo.email}`}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                  aria-label="Email Bệnh viện Mắt Sài Gòn Kiên Giang"
                  title="Gửi Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">Đường dẫn nhanh</h5>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="#journey" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary">•</span> Hành trình mang ánh sáng
                </a>
              </li>
              <li>
                <a href="#why" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary">•</span> Sứ mệnh ra đời
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary">•</span> Thành quả đạt được
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary">•</span> Đội ngũ y bác sĩ
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary">•</span> Thư viện hình ảnh
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary">•</span> Lịch trình Vision Bus
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest border-b border-white/10 pb-2">Bệnh viện Mắt Sài Gòn Kiên Giang</h5>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">{hospitalInfo.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>Tổng đài: <strong className="text-white font-medium">{hospitalInfo.phone}</strong> | Hotline: <strong className="text-white font-medium">{hospitalInfo.hotline}</strong></span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href={`mailto:${hospitalInfo.email}`} className="text-slate-300 hover:text-white transition-colors break-all">
                  {hospitalInfo.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-primary shrink-0" />
                <a href={hospitalInfo.website} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors">
                  matsaigonkiengiang.com
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-1 text-slate-400">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Giờ làm việc: {hospitalInfo.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Designer Credit */}
        <div id="footer-designer-credit" className="text-center text-xs text-slate-400 font-medium pb-6">
          Thiết kế bởi <span className="text-slate-200 font-semibold">A96 Agency</span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Vision Bus - Bệnh viện Mắt Sài Gòn Kiên Giang. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Đồng hành thắp sáng đôi mắt Việt</span>
            <span className="text-red-500">❤️</span>
          </div>
        </div>

      </div>

      {/* Float Back To Top Button */}
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
