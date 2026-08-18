/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useCallback, memo, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Globe, MessageSquare, Check, Heart, Printer } from 'lucide-react';
import { stationsTimeline } from '../data';

function SectionContact() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    age: '',
    stationId: stationsTimeline[0]?.id || '',
    preferredTime: 'Sáng (07:30 - 11:30)',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.age) {
      alert('Vui lòng cung cấp đầy đủ thông tin bắt buộc.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const randomId = Math.floor(10000 + Math.random() * 90000);
      setTicketId(`VB-26-${randomId}`);
    }, 1200);
  }, [formData.fullName, formData.phone, formData.age]);

  const selectedStation = useMemo(() => {
    return stationsTimeline.find(s => s.id === formData.stationId);
  }, [formData.stationId]);

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/95 to-dark text-white relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <h4 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight leading-tight whitespace-nowrap">
            Kết Nối Cùng Vision Bus
          </h4>
          <p className="text-slate-200 text-sm mt-2 max-w-xl mx-auto">
            Đặt lịch hẹn khám mắt trực tiếp tại đây hoặc kết nối với chúng tôi qua các kênh truyền thông chính thống.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Panel: Contact Info & Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 text-dark shadow-xl border border-white/10 text-left relative overflow-hidden"
            >
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-white fill-white/20" />
                </div>
                <div>
                  <h4 className="text-xl font-bold font-heading text-primary leading-tight">
                    BỆNH VIỆN MẮT SÀI GÒN KIÊN GIANG
                  </h4>
                  <p className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase mt-1 leading-relaxed">
                    Tự hào trực thuộc Hệ thống Mắt Sài Gòn – Hệ thống Bệnh viện Mắt lớn nhất Việt Nam
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-0.5">Địa chỉ trụ sở chính</h5>
                      <p className="text-slate-700 font-semibold text-xs leading-relaxed">
                        228 Đường 3 Tháng 2, Phường Rạch Giá, Tỉnh An Giang
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-0.5">Thời gian hoạt động</h5>
                      <p className="text-slate-700 font-semibold text-xs leading-normal">
                        7h30 - 16h00 Thứ 2 - Thứ 7<br />
                        7h30 - 11h30 Chủ nhật
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-0.5">Tổng đài hỗ trợ 24/7</h5>
                      <p className="text-primary font-extrabold text-sm leading-tight">
                        <a href="tel:0388498969" className="hover:underline">0388 498 969</a>
                      </p>
                      <p className="text-[10px] text-slate-400 leading-normal mt-0.5">Phím nóng tư vấn đăng ký khám xe lưu động</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-0.5">Kênh thông tin số</h5>
                      <div className="text-slate-700 font-semibold text-xs space-y-1 mt-0.5">
                        <a
                          href="https://matsaigonkiengiang.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline block"
                        >
                          matsaigonkiengiang.com
                        </a>
                        <a
                          href="https://www.tiktok.com/@matsaigonkiengiang"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline block"
                        >
                          TikTok: @matsaigonkiengiang
                        </a>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>

            {/* Google Map iframe */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="relative h-80 bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-white/10"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.2409568418702!2d105.08201197490918!3d9.996944490108316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0b5007095dec5%3A0x42526f3d6ad80eda!2zQuG7h25oIHZp4buHbiBN4bqvdCBTw6BpIEfDsm4gS2nDqm4gR2lhbmc!5e0!3m2!1svi!2s!4v1783581120363!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Bản đồ Bệnh viện Mắt Sài Gòn Kiên Giang"
                className="absolute inset-0 w-full h-full"
              />

              <a
                id="maps-directions-link"
                href="https://maps.app.goo.gl/oY2Fm7Pz2oKkG6EKA"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-white text-primary hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all duration-200 cursor-pointer z-10"
              >
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Mở bản đồ lớn</span>
              </a>
            </motion.div>

          </div>

          {/* Right Panel: Booking Form (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="bg-white text-dark rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-left relative"
            >
              {!isSuccess ? (
                <>
                  <div className="mb-6">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-primary uppercase bg-primary/10 px-2.5 py-0.5 rounded-md mb-2">
                      Đăng ký trực tuyến
                    </span>
                    <h4 className="text-xl font-bold font-heading text-dark">Lấy Vé Khám Miễn Phí</h4>
                    <p className="text-slate-400 text-xs mt-1 leading-normal">
                      Cung cấp thông tin bên dưới để đăng ký giữ chỗ trực tiếp trên xe lưu động.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                      <label className="block text-slate-700 text-xs font-bold mb-1" htmlFor="contact-name">
                        Họ và tên bệnh nhân <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="contact-name"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Ví dụ: Nguyễn Văn A"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-1" htmlFor="contact-phone">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="contact-phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0912345678"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold mb-1" htmlFor="contact-age">
                          Tuổi <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="age"
                          id="contact-age"
                          required
                          min="1"
                          max="115"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="68"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold mb-1" htmlFor="contact-notes">
                        Ghi chú triệu chứng bệnh mắt
                      </label>
                      <textarea
                        name="notes"
                        id="contact-notes"
                        rows={1}
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Mắt mờ, chảy nước mắt sống..."
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        id="contact-submit-booking-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-primary to-secondary hover:brightness-105 hover:shadow-lg text-white font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-1.5">
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Đang lấy vé mời...
                          </span>
                        ) : (
                          'Xác nhận lấy vé mời miễn phí'
                        )}
                      </button>
                    </div>

                  </form>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-bold font-heading text-dark">Đặt vé thành công!</h4>
                  <p className="text-slate-400 text-xs">Hãy mang vé khám kỹ thuật số này đến địa điểm đã đăng ký.</p>

                  <div className="bg-slate-50 rounded-2xl p-5 text-xs text-left border border-dashed border-slate-200 relative overflow-hidden">
                    <div className="space-y-2">
                      <div>
                        <span className="block text-[9px] uppercase text-slate-400 font-bold">Mã số vé của bạn</span>
                        <span className="text-sm font-extrabold text-primary font-mono">{ticketId}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase text-slate-400 font-bold">Bệnh nhân</span>
                        <span className="font-bold text-dark">{formData.fullName} ({formData.age} tuổi)</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase text-slate-400 font-bold">Địa điểm hẹn khám</span>
                        <span className="font-bold text-slate-700 leading-tight block mt-0.5">{selectedStation?.location}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-2 mt-2">
                        <div>
                          <span className="block text-[9px] uppercase text-slate-400 font-bold">Ngày hẹn</span>
                          <span className="font-bold text-slate-700">{selectedStation?.date}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase text-slate-400 font-bold">Khung giờ</span>
                          <span className="font-bold text-slate-700">{formData.preferredTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2.5 justify-center">
                    <button
                      id="contact-ticket-print"
                      onClick={() => window.print()}
                      className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-[10px] rounded-xl transition-all cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" /> In phiếu khám
                    </button>
                    <button
                      id="contact-ticket-register-another"
                      onClick={() => {
                        setFormData({
                          fullName: '',
                          phone: '',
                          age: '',
                          stationId: stationsTimeline[0]?.id || '',
                          preferredTime: 'Sáng (07:30 - 11:30)',
                          notes: ''
                        });
                        setIsSuccess(false);
                      }}
                      className="px-4 py-2 bg-primary text-white hover:bg-opacity-95 text-[10px] font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      Đăng ký thêm ca mới
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default memo(SectionContact);
