import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOGImage() {
  const logoSvgPath = path.join(process.cwd(), 'src/assets/images/logos/logo-saigon-eye-hospital.svg');
  let logoContent = fs.readFileSync(logoSvgPath, 'utf-8');

  // Remove XML declaration or outer svg tag wrapper if present to embed inside main SVG cleanly
  // Or extract the inner content of logo SVG
  const innerLogoMatch = logoContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  const innerLogo = innerLogoMatch ? innerLogoMatch[1] : '';

  const svgImage = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#F0FDF4" />
    </linearGradient>

    <radialGradient id="green-glow" cx="88%" cy="12%" r="55%">
      <stop offset="0%" stop-color="#009B4E" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#009B4E" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="blue-glow" cx="12%" cy="88%" r="45%">
      <stop offset="0%" stop-color="#0284C7" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#0284C7" stop-opacity="0" />
    </radialGradient>

    <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#0F172A" flood-opacity="0.08" />
      <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#009B4E" flood-opacity="0.05" />
    </filter>

    <filter id="icon-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#009B4E" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="630" fill="url(#bg-gradient)" />
  <rect width="1200" height="630" fill="url(#green-glow)" />
  <rect width="1200" height="630" fill="url(#blue-glow)" />

  <!-- Subtle grid lines -->
  <g stroke="#CBD5E1" stroke-width="1" opacity="0.25">
    <line x1="0" y1="100" x2="1200" y2="100" />
    <line x1="0" y1="200" x2="1200" y2="200" />
    <line x1="0" y1="300" x2="1200" y2="300" />
    <line x1="0" y1="400" x2="1200" y2="400" />
    <line x1="0" y1="500" x2="1200" y2="500" />
    <line x1="200" y1="0" x2="200" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="800" y1="0" x2="800" y2="630" />
    <line x1="1000" y1="0" x2="1000" y2="630" />
  </g>

  <!-- Decorative Medical Eye Concentric Rings Top-Right -->
  <g transform="translate(1060, 110)" opacity="0.18">
    <circle cx="0" cy="0" r="220" fill="none" stroke="#009B4E" stroke-width="2" stroke-dasharray="10 8" />
    <circle cx="0" cy="0" r="160" fill="none" stroke="#009B4E" stroke-width="3" />
    <circle cx="0" cy="0" r="100" fill="none" stroke="#009B4E" stroke-width="2" />
    <circle cx="0" cy="0" r="40" fill="#009B4E" opacity="0.3" />
  </g>

  <!-- Main Card Container -->
  <rect x="50" y="45" width="1100" height="540" rx="28" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#card-shadow)" />

  <!-- Top Accent Bar inside Card -->
  <path d="M 78 45 L 1122 45 C 1137.47 45 1150 57.53 1150 73 L 1150 51 C 1150 47.68 1147.31 45 1144 45 L 84 45 C 80.68 45 78 47.68 78 51 Z" fill="#009B4E" opacity="0.85" />

  <!-- Official Website Logo (Embedded Prominently) -->
  <g transform="translate(90, 85)">
    <svg x="0" y="0" width="340" height="85" viewBox="0 0 400 100">
      ${innerLogo}
    </svg>
  </g>

  <!-- Top Right Category Badge -->
  <g transform="translate(800, 102)">
    <rect x="0" y="0" width="250" height="42" rx="21" fill="#F0FDF4" stroke="#BBF7D0" stroke-width="1.5" />
    <!-- Heart pulse icon -->
    <circle cx="24" cy="21" r="12" fill="#009B4E" />
    <path d="M 18 21 L 21 21 L 22.5 17 L 25.5 25 L 27 21 L 30 21" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <text x="44" y="26" fill="#009B4E" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="700" font-size="12" letter-spacing="0.8">HÀNH TRÌNH Y TẾ LƯU ĐỘNG</text>
  </g>

  <!-- Horizontal Divider -->
  <line x1="90" y1="185" x2="1110" y2="185" stroke="#F1F5F9" stroke-width="2" />

  <!-- Main Title -->
  <text x="90" y="252" fill="#0F172A" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="900" font-size="44" letter-spacing="-0.5">
    Vision Bus - Mắt Sài Gòn Kiên Giang
  </text>

  <!-- Subtitle -->
  <text x="90" y="310" fill="#334155" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="600" font-size="22">
    Hành trình y tế lưu động - Mang dịch vụ khám mắt miễn phí &amp;
  </text>
  <text x="90" y="342" fill="#334155" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="600" font-size="22">
    chăm sóc nhãn khoa chất lượng cao đến tận tay cộng đồng.
  </text>

  <!-- 3 Feature Stat Cards at Bottom -->
  <g transform="translate(90, 415)">
    <!-- Stat 1 -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="310" height="85" rx="18" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2" />
      <circle cx="45" cy="42.5" r="24" fill="#009B4E" filter="url(#icon-shadow)" />
      <!-- Medical Cross -->
      <path d="M 45 30.5 L 45 54.5 M 33 42.5 L 57 42.5" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />
      <text x="82" y="37" fill="#0F172A" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="900" font-size="19">68,082+ Lượt Khám</text>
      <text x="82" y="59" fill="#009B4E" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="700" font-size="13">Khám mắt hoàn toàn miễn phí</text>
    </g>

    <!-- Stat 2 -->
    <g transform="translate(330, 0)">
      <rect x="0" y="0" width="310" height="85" rx="18" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2" />
      <circle cx="45" cy="42.5" r="24" fill="#0284C7" />
      <!-- Location Pin -->
      <path d="M 45 28 C 39.5 28 35 32.5 35 38 C 35 45.5 45 56 45 56 C 45 56 55 45.5 55 38 C 55 32.5 50.5 28 45 28 Z M 45 41.5 C 43 41.5 41.5 40 41.5 38 C 41.5 36 43 34.5 45 34.5 C 47 34.5 48.5 36 48.5 38 C 48.5 40 47 41.5 45 41.5 Z" fill="#FFFFFF" />
      <text x="82" y="37" fill="#0F172A" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="900" font-size="19">59 Địa Phương</text>
      <text x="82" y="59" fill="#0284C7" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="700" font-size="13">Kiên Giang &amp; Các huyện, xã đảo</text>
    </g>

    <!-- Stat 3 -->
    <g transform="translate(660, 0)">
      <rect x="0" y="0" width="360" height="85" rx="18" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.2" />
      <circle cx="45" cy="42.5" r="24" fill="#0D9488" />
      <!-- Eye Icon -->
      <path d="M 33 42.5 C 33 42.5 38 34.5 45 34.5 C 52 34.5 57 42.5 57 42.5 C 57 42.5 52 50.5 45 50.5 C 38 50.5 33 42.5 33 42.5 Z" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linejoin="round" />
      <circle cx="45" cy="42.5" r="4" fill="#FFFFFF" />
      <text x="82" y="37" fill="#0F172A" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="900" font-size="19">Mắt Sáng Cho Bà Con</text>
      <text x="82" y="59" fill="#0D9488" font-family="'Be Vietnam Pro', 'Inter', 'Segoe UI', sans-serif" font-weight="700" font-size="13">Hỗ trợ phẫu thuật đục thủy tinh thể</text>
    </g>
  </g>
</svg>
  `;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPathJpg = path.join(publicDir, 'og-image.jpg');

  await sharp(Buffer.from(svgImage))
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outputPathJpg);

  const stats = fs.statSync(outputPathJpg);
  console.log(`Generated og-image.jpg successfully at ${outputPathJpg}`);
  console.log(`File size: ${(stats.size / 1024).toFixed(2)} KB`);
}

generateOGImage().catch((err) => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
