import { join } from 'path';
import { readdirSync, renameSync } from 'fs';

import imagemin from 'imagemin';
import imageminPngToJpeg from 'png-to-jpeg';
import imageminWebp from 'imagemin-webp';

const srcPath = 'src_img/portfolio/**/*.png';
const destPath = 'docs/assets/portfolio';

// Jpeg
(async () => {
  await imagemin([srcPath], {
    destination: destPath,
    plugins: [
      imageminPngToJpeg({quality: 70})
    ]
  });

  const match = RegExp('.png', 'g');
  const files = readdirSync(destPath);

  files.filter(file => file.match(match)).forEach(file => {
    const filePath = join(destPath, file);
    const newFilePath = join(destPath, file.replace(match, '.jpg'));
    renameSync(filePath, newFilePath);
  });
  console.log('Jpeg converted');
})();

// Webp
(async () => {
  await imagemin([srcPath], {
    destination: destPath,
    plugins: [
      imageminWebp({quality: 65})
    ]
  });
  console.log('Webp converted');
})();
