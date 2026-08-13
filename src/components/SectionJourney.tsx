/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, memo } from 'react';
import { motion } from 'motion/react';
import { HeartHandshake } from 'lucide-react';
import { galleryBus, journeyBusMobile } from '../assets/images';
import { getThematicImages, getSpecificAssetImage } from '../data';

function SectionJourney() {
  const journeyImage = useMemo(() => {
    return getSpecificAssetImage(
      ['bus.jpg', 'bus.jpeg', 'bus.png', 'bus.svg', 'bus', 'bus_1.webp'],
      getThematicImages('địa phương', journeyBusMobile)[0] || journeyBusMobile || galleryBus
    );
  }, []);

  return (
    <section
      id="journey"
      className="py-12 sm:py-16 lg:py-24 bg-bg-custom relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <h4 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-dark tracking-tight leading-tight whitespace-nowrap">
            Hành Trình Mang Ánh Sáng
          </h4>
        </div>

        {/* Concise Emotional Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-xl border border-slate-100 space-y-4 sm:space-y-6 text-left max-w-4xl mx-auto"
        >
          <div className="space-y-3 sm:space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            <p className="text-base sm:text-lg font-bold text-slate-800">
              Có những ánh nhìn dần mờ đi theo năm tháng. Có những hành trình đến bệnh viện còn xa hơn cả hy vọng.
            </p>
            <p className="font-semibold text-primary text-base sm:text-lg">
              Và rồi, Vision Bus bắt đầu lăn bánh.
            </p>
            <p className="text-slate-600">
              Đồng hành cùng đội ngũ y bác sĩ, chúng tôi rong ruổi mọi cung đường để rút ngắn khoảng cách y tế. Bởi chúng tôi tin, mỗi đôi mắt sáng là một cuộc đời giữ lại được trọn vẹn khoảnh khắc bên cạnh người thân yêu.
            </p>
          </div>

          <div className="rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/9] mt-6 sm:mt-8 border border-slate-100 shadow-md relative group">
            <img
              src={journeyImage}
              alt="Hành trình xe Vision Bus"
              width={800}
              height={450}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default memo(SectionJourney);