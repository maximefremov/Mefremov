import HeaderMenu     from './modules/_headerMenu'
import HeaderParallax from './modules/_headerParallax'
import HeaderTop      from './modules/_headerTop'
import ScrollTo       from './modules/_scrollTo'
import vhCheck        from 'vh-check'

export default class App {

  constructor() {
    // Для мобильных устройств (для отступа адресной строки)
    vhCheck('browser-address-bar')

    // Константы
    const self = this

    let windowHeight = 0
    let windowWidth = 0

    let headerTopHeight = 0
    let headerMenuHeight = 0

    const scrollOffset = 70
    let scrollTop = 0

    let isSticky = false
    let isXS = false
    let isSM = false

    this.BREAKPOINTS = {
      'XS': 575.98,
      'SM': 768.98,
      'MD': 991.98,
      'LG': 1199.98
    }

    // Объекты
    this.headerMenu = new HeaderMenu('.header__menu-wrapper', '.header__menu_toggle')
    this.headerParallax = new HeaderParallax('.header__hero', $(window).outerHeight())
    this.headerTop = new HeaderTop('.header-top')
    this.scrollTo = new ScrollTo()

    // События
    $(window).on('load', ()=> {
      this.removePreloader()
    })

    $(window).on('resize', function () {
      windowHeight = $(this).outerHeight()
      windowWidth = $(this).outerWidth()

      if (windowWidth <= self.BREAKPOINTS.XS) {
        if (!isXS) {
          self.headerParallax.remove()
          self.scrollTo.offset = 0
        }
        isXS = true
      }
      if (windowWidth >= self.BREAKPOINTS.XS) {
        self.scrollTo.offset = scrollOffset
        isXS = false
      }

      if (windowWidth <= self.BREAKPOINTS.SM) {
        isSM = false
      }
      if (windowWidth >= self.BREAKPOINTS.SM) {
        if (!isSM) {
          self.headerMenu.hide()
        }
        isSM = true
      }

      headerTopHeight = self.headerTop.getHeight
      headerMenuHeight = self.headerMenu.getHeight
    }).trigger('resize')

    $(window).on('scroll', function () {
      scrollTop = $(this).scrollTop()

      if (windowWidth <= self.BREAKPOINTS.XS) {
        // Hide mobile menu
        if (scrollTop > headerMenuHeight) {
          self.headerMenu.hide()
        }
      }
      if (windowWidth >= self.BREAKPOINTS.XS) {
        // Hero parallax
        if (scrollTop < windowHeight) {
          self.headerParallax.transform(scrollTop)
        }

        // Sticky header
        if (scrollTop >= windowHeight - headerTopHeight && !isSticky) {
          isSticky = true
          self.headerTop.showSticky()
        } else if (scrollTop < windowHeight - headerTopHeight && isSticky) {
          isSticky = false
          self.headerTop.hideSticky()
        }
      }
    }).trigger('scroll')

    // Методы
    this.fancyBox()
    this.portfolioWebp()
    this.sendMessage()
    this.wayPoints()
  }

  portfolioWebp() {
    function supportWebp() {
      const elem = document.createElement('canvas')

      if (!!(elem.getContext && elem.getContext('2d')))
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
      else
        return false
    }

    if (supportWebp) return

    function getJpg(url) {
      return url.replace(/\.[^/.]+$/, "") + '.jpg'
    }

    $('.portfolio__cover').each(function() {
      const $this = $(this)
      $this.attr('src', getJpg($this.attr('src')))
      if ($this.is('[srcset]')) $this.attr('srcset', getJpg($this.attr('srcset')))
    })

    $('.portfolio__gallery_img').each(function() {
      const $this = $(this)
      $this.attr('data-src', getJpg($this.attr('data-src')))
      $this.attr('data-retina', getJpg($this.attr('data-retina')))
    })
  }

  removePreloader() {
    setTimeout(function () {
      $('body').removeClass('compensate-for-scrollbar')
      $('.preloader').removeClass('visible')
    }, 1000)
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
        success: function (response) {
          if (response.status === 'success') $alertEl.addClass('active success').text(messages.success)
          else this.error()
        },
        error: function () {
          $alertEl.addClass('active error').text(messages.error)
        },
        complete: function () {
          setTimeout(function () {
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

    setTimeout(function () {
      onScrollInit($('.animated'))
    }, 10)
  }

}
