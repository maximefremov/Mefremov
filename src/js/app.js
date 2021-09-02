import ScrollTo from './modules/_scrollTo'
import Menu     from './modules/_menu'
import Header   from './modules/_header'
import Parallax from './modules/_parallax'
import vhCheck  from 'vh-check'

export default class App {

  constructor() {
    // Для мобильных устройств (для отступа адресной строки)
    vhCheck('browser-address-bar')

    // Константы
    const self = this
    const TABLET_WIDTH = 768
    const MOBILE_WIDTH = 575

    // Переменные
    let isTablet = false
    let isMobile = false
    let isSticky = false
    let thisHeight, thisWidth, scrollTop

    // Свойства
    this.headerHeightSticky = 70

    // Объекты
    this.scrollTo = new ScrollTo(this.headerHeightSticky)
    this.menu = new Menu('.header__menu-wrapper', '.header__menu_toggle')
    this.header = new Header('.header-top')
    this.parallax = new Parallax('.header__hero', $(window).outerHeight())

    // Методы
    this.fancyBox()
    this.portfolioWebp()
    this.sendMessage()
    this.wayPoints()

    // События
    $(window).on('resize', function () {
      thisHeight = $(this).outerHeight()
      thisWidth = $(this).outerWidth()

      if (thisWidth <= MOBILE_WIDTH && isMobile === false) {
        isTablet = false
        isMobile = true
        self.isMobile()
      } else if (thisWidth > MOBILE_WIDTH && thisWidth <= TABLET_WIDTH && isTablet === false) {
        isTablet = true
        isMobile = false
        self.isTablet()
      } else if (thisWidth > TABLET_WIDTH && (isTablet === true || isMobile === true)) {
        isTablet = false
        isMobile = false
        self.isDesktop()
      }

      if (!isMobile)
        self.parallax.height = thisHeight
    })
    $(window).trigger('resize')

    $(window).on('scroll', function () {
      scrollTop = $(this).scrollTop()

      // Header Sticky
      let offsetSticky = (isTablet || isMobile) ? 0 : 10
      if (scrollTop >= thisHeight - self.headerHeightSticky - offsetSticky && isSticky === false) {
        isSticky = true
        self.header.showSticky()
      } else if (scrollTop < thisHeight - self.headerHeightSticky - offsetSticky && isSticky === true) {
        isSticky = false
        self.header.hideSticky()
      }

      // Mobile Menu
      if (scrollTop >= thisHeight && isMobile)
        self.menu.hide()

      // Hero Parallax
      if (!isMobile && scrollTop < thisHeight)
        self.parallax.transform(scrollTop)

    })
    $(window).trigger('scroll')

    $(window).on('load', function () {
      self.removePreloader()
    })
  }

  isDesktop() {
    this.scrollTo.offset = this.headerHeightSticky
    this.menu.hide()
  }

  isTablet() {
    this.scrollTo.offset = this.headerHeightSticky
  }

  isMobile() {
    this.scrollTo.offset = 0
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
      $this.attr('srcset', getJpg($this.attr('srcset')))
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
    const messagesEng = {
      process: 'Please wait...',
      success: 'Message sent successfully!',
      error: 'Failed to send message!'
    }
    const formEl = $('.contact__form')
    const alertEl = $('.contact__form_alert')
    const buttonEl = $('.contact__form_submit')
    let buttonElVal = buttonEl.val()

    const lang = $('html').attr('lang')
    if (lang === 'en') messages = messagesEng

    formEl.submit(function (e) {
      e.preventDefault()

      formEl.addClass('inactive')
      buttonEl.val(messages.process)

      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'https://formcarry.com/s/r1L5qvKGX',
        data: $(this).serialize(),
        success: function (response) {
          if (response.status === 'success') alertEl.addClass('active success').text(messages.success)
          else this.error()
        },
        error: function () {
          alertEl.addClass('active error').text(messages.error)
        },
        complete: function () {
          setTimeout(function () {
            alertEl.removeClass('active success error')
            buttonEl.val(buttonElVal)
            formEl.trigger('reset').removeClass('inactive')
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
