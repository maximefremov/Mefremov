export default class ScrollTo {

  constructor() {
    const self = this;

    this.offset = 0;
    this.scrollTop = 0;

    $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      const sectionName = $(this).attr('href');

      if (sectionName === '#') {
        self.scrollTop = 0;
      } else {
        const $blockEl = $(sectionName);
        if (!$blockEl.length) return;
        self.scrollTop = $blockEl.offset().top - self.offset;
      }

      $('html, body').animate({scrollTop: self.scrollTop}, 820, 'easeInOutCubic');
    });

    this._easeInOutCubic();
  }

  _easeInOutCubic() {
    $.easing.easeInOutCubic = function (x) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }
  }

  set setOffset(offset) {
    this.offset = offset;
  }

}
