/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Star, CheckCircle, X, Users } from 'lucide-react';
import { doctorsData } from '../data';
import { Doctor } from '../types';

function SectionDoctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  return (
    <section
      id="doctors"
      className="py-12 sm:py-16 lg:py-24 bg-bg-custom relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide uppercase mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>06 . Đội Ngũ Chuyên Gia</span>
          </div>
          <h4 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-dark tracking-tight leading-tight whitespace-nowrap">
            Những Người Giữ Ánh Sáng
          </h4>
          <p className="text-slate-600 text-base sm:text-lg mt-2 max-w-xl mx-auto font-medium">
            Gặp gỡ những bác sĩ chuyên khoa nhãn khoa đầu ngành của Mắt Sài Gòn luôn tận tâm đồng hành trên mọi dặm hành trình lưu động.
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
          {doctorsData.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-5 border border-slate-100 flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Doctor Image Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-5 shadow-sm border border-slate-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span>{doc.experience}</span>
                  </div>
                </div>

                {/* Info block */}
                <div className="text-left space-y-1.5">
                  <span className="text-primary font-bold text-[10px] uppercase tracking-wider block">
                    {doc.role}
                  </span>
                  <h4 className="text-lg font-bold text-dark font-heading leading-tight">
                    {doc.name}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm font-bold">
                    {doc.specialty}
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed pt-2 line-clamp-3 font-medium">
                    {doc.bio}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-4 border-t border-slate-100 text-left">
                <button
                  id={`view-doc-profile-${doc.id}`}
                  onClick={() => setSelectedDoctor(doc)}
                  className="w-full py-2.5 bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white rounded-xl text-xs font-bold tracking-wide transition-all duration-200 text-center cursor-pointer"
                >
                  Xem hồ sơ chuyên môn
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Doctor Portfolio Drawer / Modal (AnimatePresence) */}
      <AnimatePresence>
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              id="doctor-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoctor(null)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              id="doctor-modal-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                id="close-doctor-modal-btn"
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-4 right-4 z-20 p-1.5 text-slate-400 hover:text-dark hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Profile card */}
              <div className="md:w-5/12 bg-slate-50 p-6 flex flex-col items-center justify-center text-center border-r border-slate-100">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 shrink-0">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    width={128}
                    height={128}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-primary font-bold bg-primary/10 px-3 py-1 rounded-full mb-2">
                  {selectedDoctor.role}
                </span>
                <h4 className="font-bold text-lg text-dark font-heading leading-tight">{selectedDoctor.name}</h4>
                <p className="text-slate-500 text-xs font-bold mt-1">{selectedDoctor.specialty}</p>
                <p className="text-slate-400 text-[11px] font-bold mt-1">{selectedDoctor.experience}</p>
              </div>

              {/* Right Profile Details */}
              <div className="md:w-7/12 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[90vh] space-y-6 text-left flex flex-col justify-center">
                <div>
                  <h5 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Award className="w-4 h-4 text-primary" /> Bằng cấp & Chứng chỉ chuyên môn
                  </h5>
                  <ul className="space-y-2.5">
                    {selectedDoctor.credentials.map((cred, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default memo(SectionDoctors);
