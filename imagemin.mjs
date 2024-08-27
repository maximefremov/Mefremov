import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

const srcPath = 'src_img/portfolio/**/*.png';
const destPath = 'docs/assets/portfolio';

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
