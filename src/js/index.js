// Vendors CSS
import '../scss/vendor/bootstrap.scss';
import '../scss/vendor/fancybox.scss';

// Styles
import '../scss/style.scss';

// Vendors JS
import 'waypoints/lib/jquery.waypoints';
import '@fancyapps/fancybox';

// JS
import App from './app.js';

// Init
$(function() {
  new App();
});

// Preloader
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('.body').classList.remove('compensate-for-scrollbar');
    document.querySelector('.preloader').classList.remove('preloader--active');
  }, 1000);
});
