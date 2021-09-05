export default class HeaderTop {

  constructor(headerTopEl) {
    this.$headerTopEl = $(headerTopEl)
    this.height = this.getHeight
  }

  showSticky() {
    this.$headerTopEl.addClass('sticky')
  }

  hideSticky() {
    this.$headerTopEl.removeClass('sticky')
  }

  get getHeight() {
    return this.$headerTopEl.outerHeight()
  }

}
