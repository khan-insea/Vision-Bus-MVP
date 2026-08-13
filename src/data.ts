/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, PressItem, TimelineStation, GalleryItem, FeatureCard, CoreValue } from './types';

// Import local high-quality SVG images from the newly created images folder
import {
  doctorDung,
  doctorNam,
  doctorThu,
  doctorPhap,
  doctorTrang,
  galleryEyeTest,
  galleryBus,
  galleryHappyPatient,
  pressPlaceholder
} from './assets/images';

// Section 02 - Vì sao Vision Bus ra đời (4 Card Icon)
export const featureCards: FeatureCard[] = [
  {
    id: 'f1',
    title: 'Phát hiện sớm bệnh lý về mắt',
    description: 'Phát hiện sớm bệnh lý về mắt',
    icon: 'Eye'
  },
  {
    id: 'f2',
    title: 'Đưa dịch vụ nhãn khoa đến gần người dân',
    description: 'Đưa dịch vụ nhãn khoa đến gần người dân',
    icon: 'MapPin'
  },
  {
    id: 'f3',
    title: 'Hỗ trợ điều trị kịp thời',
    description: 'Hỗ trợ điều trị kịp thời',
    icon: 'Activity'
  },
  {
    id: 'f4',
    title: 'Bảo vệ thị lực và chất lượng cuộc sống',
    description: 'Bảo vệ thị lực và chất lượng cuộc sống',
    icon: 'Heart'
  }
];

// Section 03 - Trạm dừng Vision Bus (4 Counter Animation)
export const statisticsData = [
  { value: 59, suffix: '', label: 'Địa phương triển khai', description: 'Các huyện, thị xã, xã đảo tại Kiên Giang và lân cận' },
  { value: 68082, suffix: '', label: 'Lượt khám miễn phí', description: 'Bà con nông dân, người cao tuổi và trẻ em hoàn cảnh khó khăn' },
  { value: 1283, suffix: '', label: 'Phát hiện bệnh lý nặng', description: 'Kịp thời tư vấn hướng điều trị ngăn biến chứng' },
  { value: 300, suffix: '', label: 'Hỗ trợ phẫu thuật đục thủy tinh thể', description: 'Mang lại ánh sáng cuộc đời cho các hoàn cảnh khó khăn' }
];

// Section 04 - Sự khác biệt (3 giá trị cốt lõi)
export const coreValues: CoreValue[] = [
  {
    title: 'Chuyên môn',
    description: 'Thăm khám trực tiếp bởi đội ngũ Bác sĩ chuyên khoa giàu kinh nghiệm từ Bệnh viện Mắt Sài Gòn Kiên Giang.',
    detail: 'Quy trình khám lâm sàng chuẩn xác, chẩn đoán tận tâm, tư vấn trung thực theo phác đồ nhãn khoa quốc tế.',
    icon: 'Award',
    color: 'from-[#0D5EA6] to-[#5AA9E6]'
  },
  {
    title: 'Công nghệ',
    description: 'Trang bị máy đo khúc xạ tự động, máy soi đáy mắt di động thế hệ mới nhất ngay trên xe khám chuyên dụng.',
    detail: 'Hệ thống thiết bị tinh gọn nhưng hiện đại, đảm bảo độ chính xác tương đương với phòng khám tiêu chuẩn tại bệnh viện trung tâm.',
    icon: 'Cpu',
    color: 'from-[#00B4D8] to-[#5AA9E6]'
  },
  {
    title: 'Tận tâm',
    description: 'Thái độ ân cần, chu đáo, thấu hiểu khó khăn của bà con vùng xa. Khám bệnh bằng cả trái tim người thầy thuốc.',
    detail: 'Hỗ trợ phiên dịch tiếng Khmer tại các vùng đồng bào dân tộc, hỗ trợ dìu dắt người cao tuổi yếu chân, tư vấn dặn dò kỹ lưỡng sau khám.',
    icon: 'Sparkles',
    color: 'from-[#0D5EA6] to-[#00B4D8]'
  }
];

// Single centralized glob import for all images in assets
const allImages = import.meta.glob('/src/assets/images/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,svg,SVG,webp,WEBP,avif,AVIF,gif,GIF}', { eager: true, import: 'default' });

export const getSpecificAssetImage = (keywords: string[], fallbackImage: string): string => {
  const keys = Object.keys(allImages);
  for (const keyword of keywords) {
    const matchedKey = keys.find(k => k.toLowerCase().includes(keyword.toLowerCase()));
    if (matchedKey && allImages[matchedKey]) {
      return allImages[matchedKey] as string;
    }
  }
  return fallbackImage;
};

const getDoctorImage = (keywords: string[], defaultImage: string): string => {
  return getSpecificAssetImage(keywords, defaultImage);
};

// Section 05 - Những người giữ ánh sáng (Bác sĩ)
export const doctorsData: Doctor[] = [
  {
    id: 'doc1',
    name: 'BS. Lê Viết Pháp',
    role: 'Phó Giám Đốc Chuyên Môn',
    specialty: 'Bệnh Viện Mắt Sài Gòn Kiên Giang',
    image: doctorPhap,
    bio: 'Gương mặt lãnh đạo chuyên môn tâm huyết, chỉ đạo trực tiếp công tác thăm khám, chẩn đoán và phẫu thuật tái tạo thị lực cho bà con.',
    experience: '18 năm kinh nghiệm',
    credentials: [
      'Phó Giám Đốc Chuyên Môn - Bệnh Viện Mắt Sài Gòn Kiên Giang',
      'Thành viên Hội Nhãn khoa Việt Nam',
      'Chuyên gia chẩn đoán và điều trị bệnh lý nhãn khoa'
    ]
  },
  {
    id: 'doc2',
    name: 'ThS. BS. Trần Võ Thùy Trang',
    role: 'Bác Sĩ Chuyên Khoa Mắt',
    specialty: 'Bệnh Viện Mắt Sài Gòn Kiên Giang',
    image: doctorTrang,
    bio: 'Bác sĩ chuyên khoa tận tâm, giàu kinh nghiệm trong thăm khám, tầm soát và tư vấn điều trị các bệnh lý về mắt cho cộng đồng.',
    experience: '12 năm kinh nghiệm',
    credentials: [
      'Thạc sĩ Bác sĩ Chuyên Khoa Mắt - Bệnh Viện Mắt Sài Gòn Kiên Giang',
      'Chứng chỉ chuyên sâu khám & tầm soát khúc xạ, bệnh lý đáy mắt',
      'Bác sĩ tình nguyện xông xáo trong các chuyến xe Vision Bus'
    ]
  }
];

const categoryFolders: Record<string, string> = {
  'khám và tầm soát': 'kham_va_tam_soat',
  'hoạt động bác sĩ': 'hoat_dong_bac_si',
  'người dân tham gia': 'nguoi_dan_tham_gia',
  'địa phương': 'dia_phuong',
  'hậu trường': 'hau_truong',
  'khoảnh khắc đáng nhớ': 'khoankhac_dang_nho'
};

// Helper to generate thematic images for each gallery item using allImages map
export const getThematicImages = (category: string, primaryImage: string): string[] => {
  const folder = categoryFolders[category] || 'kham_va_tam_soat';
  
  // Get matching files (case-insensitive search for folder and img_ prefix)
  const matchingKeys = Object.keys(allImages).filter(key => {
    const lowerKey = key.toLowerCase();
    return lowerKey.includes(`/gallery/${folder.toLowerCase()}/img_`);
  });
  
  // Sort them numerically (e.g. img_2.JPG before img_10.JPG)
  matchingKeys.sort((a, b) => {
    const numA = parseInt(a.match(/img_(\d+)\./i)?.[1] || '0', 10);
    const numB = parseInt(b.match(/img_(\d+)\./i)?.[1] || '0', 10);
    return numA - numB;
  });

  const urls = matchingKeys.map(key => allImages[key] as string);
  
  if (urls.length > 0) {
    return urls;
  }
  
  return [primaryImage];
};

// Section 06 - Khoảnh khắc của niềm tin (Gallery Masonry)
export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    category: 'khám và tầm soát',
    image: getThematicImages('khám và tầm soát', galleryEyeTest)[0] || galleryEyeTest,
    images: getThematicImages('khám và tầm soát', galleryEyeTest)
  },
  {
    id: 'g2',
    category: 'hoạt động bác sĩ',
    image: getThematicImages('hoạt động bác sĩ', galleryEyeTest)[0] || galleryEyeTest,
    images: getThematicImages('hoạt động bác sĩ', galleryEyeTest)
  },
  {
    id: 'g3',
    category: 'người dân tham gia',
    image: getThematicImages('người dân tham gia', galleryHappyPatient)[0] || galleryHappyPatient,
    images: getThematicImages('người dân tham gia', galleryHappyPatient)
  },
  {
    id: 'g4',
    category: 'địa phương',
    image: getThematicImages('địa phương', galleryBus)[0] || galleryBus,
    images: getThematicImages('địa phương', galleryBus)
  },
  {
    id: 'g5',
    category: 'hậu trường',
    image: getThematicImages('hậu trường', galleryEyeTest)[0] || galleryEyeTest,
    images: getThematicImages('hậu trường', galleryEyeTest)
  },
  {
    id: 'g6',
    category: 'khoảnh khắc đáng nhớ',
    image: getThematicImages('khoảnh khắc đáng nhớ', galleryHappyPatient)[0] || galleryHappyPatient,
    images: getThematicImages('khoảnh khắc đáng nhớ', galleryHappyPatient)
  }
];

// Section 07 - Báo chí nói gì về chúng tôi
export const pressItems: PressItem[] = [
  {
    id: 'p1',
    newspaperName: 'Báo An Giang Online',
    logo: 'An Giang Online',
    title: 'Tầm soát bệnh về mắt miễn phí cho 300 người dân xã Châu Thành',
    summary: 'Ngày 18 và 19/12, Công ty Cổ phần Bệnh viện mắt Sài Gòn Kiên Giang (phường Rạch Giá, tỉnh An Giang) tổ chức khám tầm soát các bệnh về mắt miễn phí, tư vấn và phát thuốc cho người dân ở xã Châu Thành.',
    date: '18/12/2025',
    image: 'https://images.baoangiang.com.vn/image/fckeditor/upload/2025/20251218/images/Kham%20mat.jpg',
    url: 'https://baoangiang.com.vn/tam-soat-benh-ve-mat-mien-phi-cho-300-nguoi-dan-xa-chau-thanh-a470711.html'
  },
  {
    id: 'p2',
    newspaperName: 'Báo An Giang Online',
    logo: 'An Giang Online',
    title: 'Khám mắt và cấp phát thuốc miễn phí cho 600 người dân xã Nhơn Mỹ',
    summary: 'Ngày 28/7, gần 200 hội viên nông dân, người cao tuổi và các gia đình có hoàn cảnh khó khăn, mắc bệnh về mắt ở xã Nhơn Mỹ (An Giang) được khám, tư vấn và cấp thuốc miễn phí.',
    date: '28/07/2026',
    image: 'https://images.baoangiang.com.vn/image/fckeditor/upload/2026/20260728/images/HC-NMOKDjc-logo-20260728-115942-1.jpg',
    url: 'https://baoangiang.com.vn/kham-mat-va-cap-phat-thuoc-mien-phi-cho-600-nguoi-dan-xa-nhon-my-a493678.html'
  },
  {
    id: 'p3',
    newspaperName: 'Báo An Giang Online',
    logo: 'An Giang Online',
    title: 'Khám mắt và phát thuốc miễn phí cho 150 người dân xã Bình An',
    summary: 'Sáng 6/6, Bệnh viện Mắt Sài Gòn Kiên Giang phối hợp Hội Nông dân tỉnh An Giang tổ chức khám các bệnh về mắt và phát thuốc miễn phí cho 150 người dân xã Bình An.',
    date: '06/06/2026',
    image: 'https://images.baoangiang.com.vn/image/fckeditor/upload/2026/20260606/images/kham%20mat%201_.jpg',
    url: 'https://baoangiang.com.vn/kham-mat-va-phat-thuoc-mien-phi-cho-150-nguoi-dan-xa-binh-an-a488040.html'
  }
];

// Section 08 - Trạm dừng kế tiếp (Timeline)
export const stationsTimeline: TimelineStation[] = [
  {
    id: 'st1',
    date: '13/08/2026',
    rawDate: '2026-08-13',
    location: 'Trường THCS Đông Hòa 2',
    province: 'Kiên Giang',
    details: 'Chuyến xe Vision Bus tổ chức khám tầm soát bệnh lý mắt, đo khúc xạ và cấp phát thuốc miễn phí cho các em học sinh và người dân.',
    slotsAvailable: 150
  },
  {
    id: 'st2',
    date: '14/08/2026',
    rawDate: '2026-08-14',
    location: 'TYT xã Vĩnh Điều',
    province: 'Kiên Giang',
    details: 'Chương trình thăm khám nhãn khoa toàn diện, tư vấn chăm sóc mắt và cấp thuốc miễn phí tại Trạm Y Tế xã Vĩnh Điều.',
    slotsAvailable: 180
  },
  {
    id: 'st3',
    date: '14/08/2026',
    rawDate: '2026-08-14',
    location: 'Thanh niên - Trường TH & THCS Hòa Chánh 3',
    province: 'Kiên Giang',
    details: 'Phối hợp lực lượng Thanh niên tổ chức tầm soát tật khúc xạ học đường và kiểm tra sức khỏe thị lực tại Trường TH & THCS Hòa Chánh 3.',
    slotsAvailable: 200
  },
  {
    id: 'st4',
    date: '15/08/2026',
    rawDate: '2026-08-15',
    location: 'Xã Đoàn Đông Thái (TYT Nam Thái A)',
    province: 'Kiên Giang',
    details: 'Phối hợp cùng Xã Đoàn Đông Thái tổ chức khám tầm soát mắt và phát thuốc miễn phí cho bà con tại Trạm Y Tế Nam Thái A.',
    slotsAvailable: 200
  },
  {
    id: 'st5',
    date: '15/08/2026',
    rawDate: '2026-08-15',
    location: 'Khu phố Rạch Sỏi 1',
    province: 'Kiên Giang',
    details: 'Chương trình khám mắt lưu động, tư vấn sức khỏe thị lực và hỗ trợ đăng ký mổ đục thủy tinh thể tại Khu phố Rạch Sỏi 1.',
    slotsAvailable: 180
  },
  {
    id: 'st6',
    date: '16/08/2026',
    rawDate: '2026-08-16',
    location: 'Xã Đoàn Đông Thái (TYT Nam Thái A)',
    province: 'Kiên Giang',
    details: 'Chuyến xe Vision Bus tiếp tục ngày khám thứ 2 phối hợp cùng Xã Đoàn Đông Thái tại Trạm Y Tế Nam Thái A.',
    slotsAvailable: 200
  }
];


export const hospitalInfo = {
  name: 'Bệnh viện Mắt Sài Gòn Kiên Giang',
  address: 'Số 228 Nguyễn Trung Trực, P. Vĩnh Lạc, TP. Rạch Giá, Tỉnh Kiên Giang',
  phone: '038 849 8969',
  hotline: '038 849 8969',
  email: 'contact.msgkg@matsaigon.com', // <-- Email mới
  website: 'https://matsaigonkiengiang.com/', // <-- Website mới
  workingHours: '7h30 - 16h00 (Thứ 2 - Thứ 6)  7h30 - 11h30 (Thứ 7)',
  socials: {
    facebook: 'https://www.facebook.com/matsaigonkiengiang', // <-- Link Facebook mới
    tiktok: 'https://www.tiktok.com/@matsaigonkiengiang',   // <-- Link TikTok mới
    website: 'https://matsaigonkiengiang.com/'
  }
};