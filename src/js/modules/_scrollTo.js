export default class ScrollTo {

  constructor() {
    this._offset = 0
    this._easeInOutCubic()
    this._init()
  }

  _init() {
    const self = this
    let blockEl = null
    let scrollTop = 0

    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault()
      blockEl = $(this).attr('href')

      if (blockEl === '#') scrollTop = 0
      else scrollTop = $(blockEl).offset().top - self._offset

      $('html, body').animate({scrollTop: scrollTop}, 820, 'easeInOutCubic')
    })
  }

  _easeInOutCubic() {
    $.easing.easeInOutCubic = function (x) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }
  }

  set offset(offset) {
    this._offset = offset
  }

}
