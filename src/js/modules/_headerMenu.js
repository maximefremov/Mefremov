export default class HeaderMenu {

  constructor() {
    this.headerMenuClass = 'header__menu';
    this.headerMenuActiveClass = this.headerMenuClass + '--active';
    this.headerMenuLinkClass = this.headerMenuClass + '-link';
    this.headerToggleClass = 'header__toggle';
    this.headerToggleActiveClass = this.headerToggleClass + '--active';

    this.$headerMenuEl = $('.' + this.headerMenuClass);
    this.$headerToggleEl = $('.' + this.headerToggleClass);

    this.$headerMenuEl.find('.' + this.headerMenuLinkClass).on('click', () => {
      this.hide();
    });
    this.$headerToggleEl.on('click', () => {
      this.toggle();
    });
  }

  toggle() {
    $(this.$headerMenuEl).toggleClass(this.headerMenuActiveClass);
    $(this.$headerToggleEl).toggleClass(this.headerToggleActiveClass);
  }

  hide() {
    if (this.$headerMenuEl.hasClass(this.headerMenuActiveClass)) this.toggle();
  }

  get getHeight() {
    return this.$headerMenuEl.outerHeight();
  }

}
