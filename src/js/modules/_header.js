export default class Header {

  constructor() {
    this.headerClass = 'header';
    this.headerStickyClass = this.headerClass + '--sticky';

    this.$headerEl = $('.' + this.headerClass);
  }

  showSticky() {
    this.$headerEl.addClass(this.headerStickyClass)
  }

  hideSticky() {
    this.$headerEl.removeClass(this.headerStickyClass)
  }

  get getHeight() {
    return this.$headerEl.outerHeight()
  }

}
