/* eslint-disable */

var Pause = function (parent) {
  Tiny.Container.call(this);

  var black = Tiny.Sprite.fromImage(RESOURCES['s_black_square_png']);
  black.setScale(Tiny.WIN_SIZE.width / 7, Tiny.WIN_SIZE.height / 7);
  this.addChild(black);

  var btn = Tiny.Sprite.fromImage(RESOURCES['s_btn_pause_png']);
  btn.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  btn.setAnchor(0.5);
  btn.setOpacity(1);
  this.addChild(btn);

  var self = this;

  var fadeToAction = Tiny.FadeTo(300, 0.8);
  fadeToAction.onComplete = function () {
    self.setEventEnabled(true);
  };
  black.runAction(fadeToAction);

  this.touchstart = this.mousedown = function (e) {
    if (self._clicked) {
      return;
    }
    self._clicked = true;
    parent._start = true;
    self.hide();
    Tiny.isFunction(window.GAME_BRIDGE.gameResume) && window.GAME_BRIDGE.gameResume();
  };

  this.hide();

};

Pause.prototype = Object.create(Tiny.Container.prototype);
Pause.prototype.constructor = Pause;

Pause.prototype.hide = function () {
  this.setPositionX(Tiny.WIN_SIZE.width);
  this._clicked = false;
};

Pause.prototype.show = function () {
  this.setPositionX(0);
};
