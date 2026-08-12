/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { memo } from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { statisticsData } from '../data';

function SectionStats() {
  return (
    <section
      id="stats"
      className="py-12 sm:py-16 lg:py-20 bg-bg-custom relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h4 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-dark tracking-tight whitespace-nowrap">
            Trạm Dừng Vision Bus
          </h4>
        </div>

        {/* Counters Grid - 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {statisticsData.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-100 flex flex-col justify-center items-center text-center shadow-sm"
            >
              <div className="text-2xl sm:text-4xl font-black text-primary mb-1 sm:mb-2">
                {stat.value.toLocaleString('vi-VN')}{stat.suffix}
              </div>

              <h4 className="text-xs sm:text-base font-bold text-dark font-heading leading-tight">
                {stat.label}
              </h4>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default memo(SectionStats);

