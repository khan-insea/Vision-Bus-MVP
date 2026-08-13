import fs from 'fs';
import path from 'path';

async function generateOGImage() {
  const sourceBannerPath = path.join(process.cwd(), 'src/assets/images/banner.png');
  const publicDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const targetBannerPath = path.join(publicDir, 'banner.png');

  if (fs.existsSync(sourceBannerPath)) {
    fs.copyFileSync(sourceBannerPath, targetBannerPath);
    console.log(`Copied OG image from ${sourceBannerPath} to ${targetBannerPath}`);
  } else {
    console.warn(`Source OG image not found at ${sourceBannerPath}`);
  }
}

generateOGImage().catch((err) => {
  console.error('Error handling OG image:', err);
  process.exit(1);
});