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

// Centralized helper for generating instant SVG Data URIs for placeholders (0 HTTP requests)
const generatePlaceholderDataUri = (category: string, title: string, index: number): string => {
  const bgColors = ['#EEF2FF', '#ECFDF5', '#FFF7ED', '#FEF2F2', '#F0FDF4', '#FAF5FF'];
  const textColors = ['#312E81', '#064E3B', '#7C2D12', '#7F1D1D', '#14532D', '#581C87'];
  const accentColors = ['#6366F1', '#10B981', '#F97316', '#EF4444', '#22C55E', '#A855F7'];

  const bg = bgColors[index % bgColors.length];
  const text = textColors[index % textColors.length];
  const accent = accentColors[index % accentColors.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%"><rect width="100%" height="100%" fill="${bg}"/><circle cx="400" cy="300" r="180" fill="${accent}" opacity="0.15"/><text x="50%" y="42%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="bold" font-size="28" fill="${text}">${category.toUpperCase()}</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="32" fill="${text}">${title} - Ảnh ${index + 1}</text></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const getSpecificAssetImage = (keywords: string[], fallbackImage: string): string => {
  return fallbackImage;
};

// Section 05 - Những người giữ ánh sáng (Bác sĩ)
export const doctorsData: Doctor[] = [
  {
    id: 'doc1',
    name: 'BSNT. Lê Viết Pháp',
    role: 'Phó Giám Đốc Chuyên Môn',
    specialty: 'Bệnh Viện Mắt Sài Gòn Kiên Giang',
    image: doctorPhap,
    bio: 'Gương mặt lãnh đạo chuyên môn tâm huyết, chỉ đạo trực tiếp công tác thăm khám, chẩn đoán và phẫu thuật tái tạo thị lực cho bà con.',
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
    credentials: [
      'Thạc sĩ Bác sĩ Chuyên Khoa Mắt - Bệnh Viện Mắt Sài Gòn Kiên Giang',
      'Chứng chỉ chuyên sâu khám & tầm soát khúc xạ, bệnh lý đáy mắt',
      'Bác sĩ tình nguyện xông xáo trong các chuyến xe Vision Bus'
    ]
  }
];

// Dynamically import all images in src/assets/images/gallery/album/ (e.g., img_1.webp, img_2.webp, etc.)
const albumImagesGlob = import.meta.glob<string>(
  './assets/images/gallery/album/*.{webp,png,jpg,jpeg,svg,avif}',
  { eager: true, import: 'default' }
);

// Sort image keys in natural numeric order (img_1.webp, img_2.webp, img_3.webp, ..., img_10.webp)
const sortedAlbumEntries = Object.entries(albumImagesGlob).sort(([pathA], [pathB]) =>
  pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: 'base' })
);

export const albumImagesList: string[] = sortedAlbumEntries.map(([, url]) => url);

// Helper to generate thematic images for gallery items (instant Data URIs)
export const getThematicImages = (category: string, primaryImage: string, title: string = 'Khoảnh khắc'): string[] => {
  const placeholders = Array.from({ length: 5 }, (_, idx) => 
    generatePlaceholderDataUri(category, title, idx)
  );
  return [primaryImage, ...placeholders];
};

// Section 06 - Khoảnh khắc của niềm tin (Gallery Carousel from album folder)
export const galleryItems: GalleryItem[] = albumImagesList.length > 0
  ? albumImagesList.map((imgUrl, idx) => ({
      id: `album-img-${idx + 1}`,
      category: 'khoảnh khắc',
      title: `Khoảnh khắc ${idx + 1}`,
      image: imgUrl,
      images: [imgUrl]
    }))
  : [
      {
        id: 'g1',
        category: 'khoảnh khắc',
        title: 'Hành trình Vision Bus',
        image: galleryBus,
        images: [galleryBus]
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
    image: "https://images.baoangiang.com.vn/image/fckeditor/upload/2025/20251218/images/Kham%20mat.jpg",
    url: 'https://baoangiang.com.vn/tam-soat-benh-ve-mat-mien-phi-cho-300-nguoi-dan-xa-chau-thanh-a470711.html'
  },
  {
    id: 'p2',
    newspaperName: 'Báo An Giang Online',
    logo: 'An Giang Online',
    title: 'Khám mắt và cấp phát thuốc miễn phí cho 600 người dân xã Nhơn Mỹ',
    summary: 'Ngày 28/7, gần 200 hội viên nông dân, người cao tuổi và các gia đình có hoàn cảnh khó khăn, mắc bệnh về mắt ở xã Nhơn Mỹ (An Giang) được khám, tư vấn và cấp thuốc miễn phí.',
    date: '28/07/2026',
    image: "https://images.baoangiang.com.vn/image/fckeditor/upload/2026/20260728/images/HC-NMOKDjc-logo-20260728-115942-1.jpg",
    url: 'https://baoangiang.com.vn/kham-mat-va-cap-phat-thuoc-mien-phi-cho-600-nguoi-dan-xa-nhon-my-a493678.html'
  },
  {
    id: 'p3',
    newspaperName: 'Báo An Giang Online',
    logo: 'An Giang Online',
    title: 'Khám mắt và phát thuốc miễn phí cho 150 người dân xã Bình An',
    summary: 'Sáng 6/6, Bệnh viện Mắt Sài Gòn Kiên Giang phối hợp Hội Nông dân tỉnh An Giang tổ chức khám các bệnh về mắt và phát thuốc miễn phí cho 150 người dân xã Bình An.',
    date: '06/06/2026',
    image: "https://images.baoangiang.com.vn/image/fckeditor/upload/2026/20260606/images/kham%20mat%201_.jpg",
    url: 'https://baoangiang.com.vn/kham-mat-va-phat-thuoc-mien-phi-cho-150-nguoi-dan-xa-binh-an-a488040.html'
  }
];

// Section 08 - Trạm dừng kế tiếp (Timeline)
export const stationsTimeline: TimelineStation[] = [
  {
    id: 'st1',
    date: '20/08/2026',
    rawDate: '2026-08-20',
    location: 'TYT Thạnh Phước (3 trạm)',
    province: 'Kiên Giang',
    details: 'Địa điểm: Xã Thạnh Hưng - Khám mắt và phát thuốc miễn phí',
    slotsAvailable: 300
  },
  {
    id: 'st2',
    date: '21/08/2026',
    rawDate: '2026-08-21',
    location: 'TYT Thạnh Hưng (3 trạm)',
    province: 'Kiên Giang',
    details: 'Địa điểm: Xã Thạnh Hưng - Khám mắt và phát thuốc miễn phí',
    slotsAvailable: 300
  },
  {
    id: 'st3',
    date: '28/08/2026',
    rawDate: '2026-08-28',
    location: 'Hội trường UBND xã Châu Phong - Xã Đoàn (2 trạm)',
    province: 'Kiên Giang',
    details: 'Địa điểm: Ấp Phú Hữu 1, xã Châu Phong - Khám mắt và phát thuốc miễn phí',
    slotsAvailable: 200
  },
  {
    id: 'st4',
    date: '04/09/2026',
    rawDate: '2026-09-04',
    location: 'Tỉnh Đoàn - TYT Tân An',
    province: 'Kiên Giang',
    details: 'Địa điểm: TYT Tân An - Khám mắt và phát thuốc miễn phí',
    slotsAvailable: 250
  }
];


export const hospitalInfo = {
  name: 'Bệnh viện Mắt Sài Gòn Kiên Giang',
  address: 'Số 228 Đường 3 Tháng 2, Phường Rạch Giá, Tỉnh An Giang',
  phone: '0388 498 969',
  hotline: '0388 498 969',
  email: 'contact.msgkg@matsaigon.com',
  website: 'https://matsaigonkiengiang.com/',
  workingHours: '7h30 - 16h00 Thứ 2 - Thứ 7 | 7h30 - 11h30 Chủ nhật',
  socials: {
    facebook: 'https://www.facebook.com/matsaigonkiengiang',
    tiktok: 'https://www.tiktok.com/@matsaigonkiengiang',
    website: 'https://matsaigonkiengiang.com/'
  }
};

