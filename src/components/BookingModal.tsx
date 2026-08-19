/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback, memo, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, User, Phone, Award, CheckCircle, Ticket, Heart, Printer, ShieldCheck } from 'lucide-react';
import { stationsTimeline } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedStationId?: string;
}

function BookingModal({ isOpen, onClose, preselectedStationId }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    age: '',
    stationId: preselectedStationId || stationsTimeline[0]?.id || '',
    preferredTime: 'Sáng (07:30 - 11:30)',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Update selected station when prop changes
  useEffect(() => {
    if (preselectedStationId) {
      setFormData(prev => ({ ...prev, stationId: preselectedStationId }));
    }
  }, [preselectedStationId]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.age) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Generate unique ticket format: VB-2026-XXXXX
      const randomId = Math.floor(10000 + Math.random() * 90000);
      setTicketId(`VB-26-${randomId}`);
    }, 1200);
  }, [formData.fullName, formData.phone, formData.age]);

  const selectedStation = useMemo(() => {
    return stationsTimeline.find(s => s.id === formData.stationId);
  }, [formData.stationId]);

  // Custom localized printable voucher print action
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          id="booking-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-dark/80 backdrop-blur-md"
        />

        {/* Modal Body */}
        <motion.div
          id="booking-modal-container"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100"
        >
          {/* Close button */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-all duration-200"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSuccess ? (
            <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
              {/* Visual Sidebar */}
              <div className="md:w-5/12 bg-gradient-to-br from-primary to-secondary p-8 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-44 h-44 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold mb-6 tracking-wide uppercase">
                    <Heart className="w-3.5 h-3.5 text-red-300 fill-red-300" /> Chương Trình Nhân Đạo
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-4 leading-tight">Đăng Ký Khám Mắt Miễn Phí</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    Chuyến xe lưu động Vision Bus mang trang thiết bị hiện đại cùng bác sĩ giàu kinh nghiệm đến tận địa phương phục vụ bà con.
                  </p>
                </div>

                <div className="relative z-10 border-t border-white/20 pt-6">
                  <div className="space-y-4 text-xs text-white/80">
                    <div className="flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-accent shrink-0" />
                      <span>Thăm khám 1-1 bởi bác sĩ chuyên khoa nhãn khoa</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                      <span>An toàn, chuẩn y khoa, miễn phí 100%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="md:w-7/12 p-8 md:p-10">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-dark font-heading">Thông Tin Đăng Ký</h4>
                  <p className="text-slate-500 text-xs mt-1">Xin vui lòng cung cấp thông tin chính xác để nhận mã vé.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-slate-700 text-xs font-bold mb-1.5" htmlFor="fullName">
                      Họ và tên bệnh nhân <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Nguyễn Văn A"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Phone & Age row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 text-xs font-bold mb-1.5" htmlFor="phone">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                          <Phone className="w-4 h-4" />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="0912345678"
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 text-xs font-bold mb-1.5" htmlFor="age">
                        Tuổi <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="age"
                        id="age"
                        required
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Ví dụ: 65"
                        className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-slate-700 text-xs font-bold mb-1.5" htmlFor="notes">
                      Tình trạng mắt hiện tại / Ghi chú khác
                    </label>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Ví dụ: Mắt mờ, nhìn lóa, nghi ngờ đục thủy tinh thể..."
                      className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="submit-booking-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl hover:shadow-lg hover:brightness-105 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Đang gửi thông tin...
                        </span>
                      ) : (
                        'Xác Nhận Đăng Ký Khám'
                      )}
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-2">
                      (*) Thông tin được cam kết bảo mật tuyệt đối theo tiêu chuẩn Bộ Y Tế.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Success Ticket view - Boarding Pass style */
            <div className="p-8 text-center bg-slate-50 relative">
              {/* Confetti particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ['#0D5EA6', '#5AA9E6', '#00B4D8', '#4CAF50', '#FFC107'][i % 5],
                      top: '10%',
                      left: `${15 + i * 7}%`,
                    }}
                    animate={{
                      y: [0, 150 + Math.random() * 200],
                      x: [0, (Math.random() - 0.5) * 50],
                      opacity: [1, 0],
                      scale: [1, 0.5]
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 1.5,
                      repeat: Infinity,
                      delay: Math.random() * 0.5
                    }}
                  />
                ))}
              </div>

              <div className="max-w-md mx-auto relative z-10">
                <div className="w-16 h-16 bg-success/15 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-bold text-dark font-heading mb-1">Đăng Ký Thành Công!</h3>
                <p className="text-slate-500 text-xs mb-6">Chúng tôi đã ghi nhận lịch khám miễn phí của quý khách.</p>

                {/* Simulated physical ticket pass */}
                <motion.div
                  id="success-ticket-pass"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border-2 border-dashed border-slate-200 rounded-2xl shadow-md p-6 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-4 h-4 bg-slate-50 rounded-br-full border-r border-b border-slate-200" />
                  <div className="absolute top-0 right-0 w-4 h-4 bg-slate-50 rounded-bl-full border-l border-b border-slate-200" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 bg-slate-50 rounded-tr-full border-r border-t border-slate-200" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-slate-50 rounded-tl-full border-l border-t border-slate-200" />

                  {/* Ticket Header */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1.5 text-primary font-bold">
                      <Ticket className="w-4 h-4" /> VISION BUS TICKET
                    </span>
                    <span>HỆ THỐNG MẮT SÀI GÒN</span>
                  </div>

                  {/* Patient detail */}
                  <div className="space-y-3">
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400 tracking-wider">Họ tên bệnh nhân</span>
                      <span className="text-sm font-bold text-dark">{formData.fullName} ({formData.age} tuổi)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[10px] uppercase text-slate-400 tracking-wider">Số điện thoại</span>
                        <span className="text-xs font-semibold text-dark">{formData.phone}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-slate-400 tracking-wider">Mã số vé khám</span>
                        <span className="text-xs font-bold text-primary font-mono">{ticketId}</span>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase text-slate-400 tracking-wider">Chương trình</span>
                      <span className="text-xs font-semibold text-slate-700 flex items-start gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>Khám mắt lưu động miễn phí - Vision Bus</span>
                      </span>
                    </div>

                    <div className="border-t border-slate-100 pt-3">
                      <span className="block text-[10px] uppercase text-slate-400 tracking-wider">Hình thức tiếp nhận</span>
                      <span className="text-xs font-semibold text-slate-700">Nhân viên y tế sẽ liên hệ hướng dẫn lịch khám chi tiết</span>
                    </div>
                  </div>

                  {/* Ticket Footer / Note */}
                  <div className="mt-4 pt-3 border-t-2 border-dashed border-slate-100 flex items-center justify-between">
                    <div className="text-[9px] text-slate-400 leading-tight pr-4">
                      * Chụp màn hình hoặc in vé này mang theo khi khám.<br />
                      * Vui lòng có mặt đúng khung giờ đăng ký.
                    </div>
                    {/* Mock QR code styling */}
                    <div className="w-12 h-12 bg-slate-100 border border-slate-200 p-1 rounded shrink-0 flex flex-wrap gap-px">
                      {[...Array(64)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1"
                          style={{
                            backgroundColor: (i * 7 + 13) % 5 === 0 || (i % 8 === 0) || (i > 50 && i < 58) ? '#123458' : '#ffffff'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                <div className="mt-6 flex gap-3 justify-center">
                  <button
                    id="print-ticket-btn"
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> In Vé Khám
                  </button>
                  <button
                    id="finish-booking-btn"
                    onClick={() => {
                      setIsSuccess(false);
                      onClose();
                    }}
                    className="px-6 py-2 bg-primary text-white hover:bg-opacity-95 rounded-xl text-xs font-medium shadow transition-all duration-200 cursor-pointer"
                  >
                    Hoàn Tất
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default memo(BookingModal);
