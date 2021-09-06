export default class HeaderMenu {

  constructor(headerMenuEl, toggleEl) {
    this.$headerMenuEl = $(headerMenuEl)
    this.$toggleEl = $(toggleEl)

    this.$toggleEl.on('click', () => {
      this._toggle()
    })
    this.$headerMenuEl.find('a[href^="#"]').on('click', () => {
      this.hide()
    })
  }

  _toggle() {
    $([this.$headerMenuEl, this.$toggleEl]).toggleClass('active')
  }

  hide() {
    if (this.$headerMenuEl.hasClass('active')) this._toggle()
  }

  get getHeight() {
    return this.$headerMenuEl.outerHeight()
  }

}
