/* eslint-disable */

var Guide = function (parent) {
  this._parent = parent;

  Tiny.Container.call(this);

  var blank = Tiny.Sprite.fromImage(RESOURCES['s_black_square_png']);
  blank.setScale(143 / 7, 52 / 7);
  blank.setPosition(120, 20);
  blank.setOpacity(0);

  this.addChild(blank);

  this.setEventEnabled(true);

  this.touchstart = this.mousedown = function (e) {
    if (!this._parent._start) {
      return;
    }
    Tiny.isFunction(window.GAME_BRIDGE.guideHandler) && window.GAME_BRIDGE.guideHandler();
  };
};

Guide.prototype = Object.create(Tiny.Container.prototype);
Guide.prototype.constructor = Guide;
