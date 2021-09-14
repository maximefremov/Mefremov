export default class HeroParallax {

  constructor(windowHeight) {
    this.heroClass = 'hero__content';

    this.$parallaxEl = $('.' + this.heroClass);

    this.windowHeight = windowHeight;
    this.opacityRatio = 1.5;
    this.blurRatio = 1.5;
    this.translateRatio = 0.4;

    this.scrollTop = 0;
    this.translateValue = 0;
    this.opacityValue = 0;
    this.blurValue = 0;
  }

  _translate() {
    this.translateValue = this.scrollTop * this.translateRatio;
  }

  _opacity() {
    this.opacityValue = 1 - (this.scrollTop / (this.windowHeight / this.opacityRatio));
  }

  _blur() {
    this.blurValue = this.scrollTop / (this.windowHeight / this.blurRatio);
  }

  transform(scrollTop) {
    this.scrollTop = scrollTop;
    this._translate();
    this._opacity();
    this._blur();

    this.$parallaxEl.css({
      'opacity': this.opacityValue,
      'filter': "blur(" + this.blurValue * 2 + "px)",
      'transform': "translate3d(0, " + this.translateValue + "px, 0)"
    });
  }

  remove() {
    this.$parallaxEl.removeAttr('style');
  }

}
