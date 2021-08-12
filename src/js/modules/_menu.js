export default class Menu {

  constructor(menuEl, toggleEl) {
    this._menuEl = $(menuEl)
    this._toggleEl = $(toggleEl)
    this._init()
  }

  _init() {
    const self = this

    this._menuEl.on('click', function () {
      self.hide()
    })

    this._toggleEl.on('click', function (e) {
      e.preventDefault()
      $(this).toggleClass('active')
      self._menuEl.toggleClass('active')
    })
  }

  hide() {
    if (this._menuEl.hasClass('active')) {
      this._toggleEl.removeClass('active')
      this._menuEl.removeClass('active')
    }
  }

}
