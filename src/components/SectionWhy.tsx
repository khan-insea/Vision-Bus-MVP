/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo, ComponentType } from 'react';
import { motion } from 'motion/react';
import { Eye, MapPin, Activity, Heart, HelpCircle } from 'lucide-react';
import { featureCards } from '../data';

const iconMap: Record<string, ComponentType<any>> = {
  Eye,
  MapPin,
  Activity,
  Heart
};

function SectionWhy() {
  return (
    <section
      id="why"
      className="pt-5 pb-8 sm:pt-6 sm:pb-12 lg:py-24 bg-white relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-16">
          <h4 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-dark tracking-tight leading-tight mb-3 whitespace-nowrap">
            Vì Sao Vision Bus Ra Đời?
          </h4>
          <p className="text-slate-600 text-[11px] xs:text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto mb-6 whitespace-nowrap sm:whitespace-normal overflow-hidden text-ellipsis">
            Vision Bus - Bởi mỗi đôi mắt sáng là một cuộc đời trọn vẹn hơn.
          </p>
        </div>

        {/* 4 Cards Grid - 2x2 Grid on Mobile & Tablet / 4-Col Grid on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-8 items-stretch w-full">
          {featureCards.map((card) => {
            const IconComponent = iconMap[card.icon] || HelpCircle;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="w-full min-w-0 overflow-hidden bg-bg-custom rounded-[16px] sm:rounded-[20px] lg:rounded-3xl p-3 sm:p-5 lg:p-6 border border-slate-100 flex flex-col items-center text-center justify-center gap-2 sm:gap-3 lg:gap-4 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group min-h-[110px] sm:min-h-[130px] lg:min-h-[150px] h-full"
              >
                <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-white shadow-md flex items-center justify-center shrink-0 border border-slate-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 stroke-[2.2]" />
                </div>
                <div className="space-y-1 sm:space-y-1.5 lg:space-y-2 w-full min-w-0">
                  <h4 className="text-[13px] sm:text-[16px] lg:text-lg font-bold text-dark font-heading leading-tight line-clamp-2">
                    {card.title}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vision Bus Quote */}
        <div className="mt-6 sm:mt-10 lg:mt-16 text-center max-w-3xl mx-auto bg-primary/5 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 border border-primary/10 shadow-sm">
          <p className="text-xs sm:text-base font-bold text-primary italic leading-relaxed">
            "Vision Bus - Bởi mỗi đôi mắt sáng là một cuộc đời trọn vẹn hơn."
          </p>
        </div>

      </div>
    </section>
  );
}

export default memo(SectionWhy);
