export default class Header {

    constructor(headerEl) {
        this._headerEl = $(headerEl);
    }

    showSticky() {
        this._headerEl.addClass('sticky');
    }

    hideSticky() {
        this._headerEl.removeClass('sticky');
    }

}
