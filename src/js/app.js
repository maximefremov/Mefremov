import Header         from './modules/_header';
import HeaderMenu     from './modules/_headerMenu';
import HeroParallax   from './modules/_heroParallax';
import ScrollTo       from './modules/_scrollTo';
import vhCheck        from 'vh-check';

export default class App {

  constructor() {
    // Для мобильных устройств (для отступа адресной строки)
    vhCheck('browser-address-bar');

    // Константы
    const self = this;

    let windowHeight = 0,
        windowWidth = 0;

    let headerHeight = 0,
        headerMenuHeight = 0;

    const scrollOffset = 70;
    let scrollTop = 0;

    let isSticky = false;
    let isXS = false;
    let isSM = false;

    this.BREAKPOINTS = {
      'XS': 575.98,
      'SM': 768.98,
      'MD': 991.98,
      'LG': 1199.98
    };

    // Объекты
    this.header = new Header();
    this.headerMenu = new HeaderMenu();
    this.heroParallax = new HeroParallax($(window).outerHeight());
    this.scrollTo = new ScrollTo();

    // Методы
    this.fancyBox();
    this.wayPoints();
    this.sendMessage();

    // События
    $(window).on('resize', function () {
      windowHeight = $(this).outerHeight();
      windowWidth = $(this).outerWidth();

      if (windowWidth <= self.BREAKPOINTS.XS) {
        if (!isXS) {
          self.heroParallax.remove();
          self.scrollTo.setOffset = 0;
        }
        isXS = true;
      }
      if (windowWidth >= self.BREAKPOINTS.XS) {
        self.scrollTo.setOffset = scrollOffset;
        isXS = false;
      }

      if (windowWidth <= self.BREAKPOINTS.SM) {
        isSM = false;
      }
      if (windowWidth >= self.BREAKPOINTS.SM) {
        if (!isSM) {
          self.headerMenu.hide();
        }
        isSM = true;
      }

      headerHeight = self.header.getHeight;
      headerMenuHeight = self.headerMenu.getHeight;
    }).trigger('resize');

    $(window).on('scroll', function () {
      scrollTop = $(this).scrollTop();

      if (windowWidth <= self.BREAKPOINTS.XS) {
        // Hide mobile menu
        if (scrollTop > headerMenuHeight) {
          self.headerMenu.hide();
        }
      }
      if (windowWidth >= self.BREAKPOINTS.XS) {
        // Hero parallax
        if (scrollTop < windowHeight) {
          self.heroParallax.transform(scrollTop);
        }

        // Sticky header
        if (scrollTop >= windowHeight - headerHeight && !isSticky) {
          isSticky = true;
          self.header.showSticky();
        } else if (scrollTop < windowHeight - headerHeight && isSticky) {
          isSticky = false;
          self.header.hideSticky();
        }
      }
    }).trigger('scroll');
  }

  fancyBox() {
    const pixelRatio = window.devicePixelRatio || 1

    $('button[value="gallery"]').on('click', function () {
      const imgEl = $(this).closest('.portfolio__item').find('.portfolio__gallery_img')

      let arrImg = []
      let img = null
      for (let i = 0; i < imgEl.length; i++) {
        if (pixelRatio > 1.5) img = $(imgEl[i]).data('retina')
        else img = $(imgEl[i]).data('src')
        arrImg.push({src: img})
      }

      $.fancybox.open(arrImg, {
        image: {
          preload: true
        },
        transitionEffect: 'slide',
        transitionDuration: 620,
        wheel: false,
        afterLoad: function (instance, current) {
          if (pixelRatio > 1.5) {
            current.width = current.width / pixelRatio
            current.height = current.height / pixelRatio
          }
        }
      })
    })
  }

  sendMessage() {
    let messages = {
      process: 'Идёт отправка...',
      success: 'Сообщение успешно отправлено!',
      error: 'Ошибка отправки сообщения!'
    }
    const $formEl = $('.contact__form')
    const $alertEl = $('.contact__form_alert')
    const $buttonEl = $('.contact__form_submit')
    let buttonElVal = $buttonEl.val()

    $formEl.on('submit', function (e) {
      e.preventDefault()

      $formEl.addClass('inactive')
      $buttonEl.val(messages.process)

      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'https://formcarry.com/s/r1L5qvKGX',
        data: $(this).serialize(),
        success: (response) => {
          if (response.status === 'success') $alertEl.addClass('active success').text(messages.success)
          else this.error()
        },
        error: () => {
          $alertEl.addClass('active error').text(messages.error)
        },
        complete: () => {
          setTimeout(() => {
            $alertEl.removeClass('active success error')
            $buttonEl.val(buttonElVal)
            $formEl.trigger('reset').removeClass('inactive')
          }, 3500)
        }
      })
    })
  }

  wayPoints() {
    let trigger

    function onScrollInit(items, triggerEl) {
      let offset = $(window).height() / 1.2

      items.each(function () {
        let elem           = $(this),
            animationClass = elem.attr('data-animation'),
            animationDelay = elem.attr('data-delay')

        elem.css({'animationDelay': animationDelay})

        trigger = (triggerEl) ? trigger : elem

        trigger.waypoint(function () {
          elem.addClass(animationClass)
        }, {
          triggerOnce: true,
          offset: offset
        })
      })
    }

    setTimeout(() => {
      onScrollInit($('.animated'))
    }, 10)
  }

}
