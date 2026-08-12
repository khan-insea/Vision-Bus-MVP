/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from 'react';
import { motion } from 'motion/react';
import { Bookmark, ArrowRight } from 'lucide-react';

// Optimized background image representing mobile eye clinic & medical mission
const bgImage = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=75&w=1200&auto=format&fit=crop';

function SectionValues() {
  return (
    <section
      id="values"
      className="relative w-full py-16 sm:py-24 lg:py-36 overflow-hidden bg-slate-100 text-slate-900 scroll-mt-20"
    >
      {/* Layer 1: Background Image Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src={bgImage}
          alt="Vision Bus Eye Care Mission"
          width={1200}
          height={800}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        {/* Layer 2: Frosted Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/65 to-white/85 backdrop-blur-[6px] z-10" />
      </div>

      {/* Layer 3: Content Layer (Top - Foreground) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Heading #0F172A */}
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-lg xs:text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-heading text-[#0F172A] tracking-tight leading-tight mb-6 drop-shadow-sm whitespace-nowrap"
        >
          Điều Gì Tạo Nên Sự Khác Biệt?
        </motion.h4>

        {/* Description #334155 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-[#334155] text-sm sm:text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-10 drop-shadow-sm"
        >
          Vision Bus không chỉ mang y tế đến gần hơn với cộng đồng. Chúng tôi mang theo{' '}
          <strong className="text-primary font-extrabold">
            chuyên môn, trách nhiệm và ngọn lửa yêu thương
          </strong>{' '}
          sưởi ấm vẹn tròn hai từ “Y Đức”.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="inline-flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#schedule"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] text-white font-bold text-base rounded-full shadow-md transition-all duration-200 cursor-pointer"
          >
            <span>Xem lịch trình Vision Bus</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(SectionValues);

