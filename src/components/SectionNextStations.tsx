/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, memo } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Hourglass, CheckCircle2 } from 'lucide-react';
import { stationsTimeline } from '../data';
import { TimelineStation } from '../types';

interface SectionNextStationsProps {
  onOpenBookingWithStation: (stationId: string) => void;
}

/**
 * Calculates station status based on current date:
 * - 'completed' (Đã kết thúc): passed the station date
 * - 'current' (Đang diễn ra): within 2 days before station date up to station date
 * - 'upcoming' (Sắp diễn ra): more than 2 days before station date
 */
function getStationStatus(station: TimelineStation): 'completed' | 'current' | 'upcoming' {
  if (station.status) return station.status;

  let year: number, month: number, day: number;

  if (station.rawDate) {
    const parts = station.rawDate.split('-').map(Number);
    year = parts[0];
    month = parts[1] - 1;
    day = parts[2];
  } else {
    const parts = station.date.split('/').map(Number);
    if (parts.length === 3) {
      day = parts[0];
      month = parts[1] - 1;
      year = parts[2];
    } else {
      const d = new Date(station.date);
      year = d.getFullYear();
      month = d.getMonth();
      day = d.getDate();
    }
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventDate = new Date(year, month, day);

  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return 'completed';
  } else if (diffDays <= 2) {
    return 'current';
  } else {
    return 'upcoming';
  }
}

function SectionNextStations({ onOpenBookingWithStation: _onOpenBookingWithStation }: SectionNextStationsProps) {
  const stationsWithStatus = useMemo(() => {
    return stationsTimeline.map((station) => ({
      ...station,
      computedStatus: getStationStatus(station)
    }));
  }, []);
  return (
    <section
      id="schedule"
      className="py-12 sm:py-16 lg:py-24 bg-bg-custom relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-0 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide uppercase mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>09 . Lịch Trình Hoạt Động</span>
          </div>
          <h4 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-dark tracking-tight leading-tight whitespace-nowrap">
            Trạm Dừng Kế Tiếp
          </h4>
          <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-xl mx-auto font-medium">
            Hãy tra cứu thời gian chiếc xe Vision Bus cập bến địa phương bạn để sắp xếp đăng ký nhận vé khám kịp thời.
          </p>
        </div>

        {/* Timeline structure */}
        <div className="relative border-l border-slate-200/80 ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-10 text-left">
          {stationsWithStatus.map((station) => {
            const status = station.computedStatus;
            const isCurrent = status === 'current';
            const isCompleted = status === 'completed';
            
            return (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <span className={`absolute -left-[45px] sm:-left-[53px] top-1.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white border shadow-sm ${
                  isCompleted ? 'border-slate-300' : isCurrent ? 'border-primary' : 'border-slate-200'
                }`}>
                  {isCurrent ? (
                    <span className="relative flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                    </span>
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Calendar className="w-4 h-4 text-slate-400" />
                  )}
                </span>

                <div className={`bg-white rounded-3xl p-6 sm:p-8 border shadow-sm transition-all duration-300 hover:shadow-xl ${
                  isCurrent
                    ? 'border-primary/45 ring-4 ring-primary/5 bg-gradient-to-r from-white to-primary/2'
                    : isCompleted
                    ? 'border-slate-200 bg-slate-50/60 opacity-85'
                    : 'border-slate-100'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    
                    <div className="space-y-3 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                          isCompleted ? 'text-slate-500 bg-slate-200/70' : 'text-primary bg-primary/10'
                        }`}>
                          <Hourglass className="w-3.5 h-3.5" />
                          <span>{station.date}</span>
                        </span>

                        {isCurrent ? (
                          <span className="text-[10px] font-bold text-white bg-red-500 px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                            Đang diễn ra
                          </span>
                        ) : isCompleted ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Đã kết thúc
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Sắp diễn ra
                          </span>
                        )}
                      </div>

                      <h4 className="text-lg sm:text-xl font-bold text-dark font-heading leading-tight flex items-start gap-2">
                        <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${isCompleted ? 'text-slate-400' : 'text-red-500'}`} />
                        <span>{station.location}</span>
                      </h4>

                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-semibold">
                        {station.details}
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default memo(SectionNextStations);
