/* eslint-disable */

var Launcher = function (parent) {
  Tiny.Container.call(this);

  var black = Tiny.Sprite.fromImage(RESOURCES['s_black_square_png']);
  black.setScale(Tiny.WIN_SIZE.width / 7, Tiny.WIN_SIZE.height / 7);
  this.addChild(black);

  var btn = Tiny.Sprite.fromImage(RESOURCES['s_btn_start_png']);
  btn.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  btn.setAnchor(0.5);
  btn.setOpacity(0);
  this.addChild(btn);

  var self = this;
  var fadeToAction = Tiny.FadeTo(300, 0.8);
  fadeToAction.onComplete = function () {
    self.setEventEnabled(true);
  };
  black.runAction(fadeToAction);

  var fadeInAction = Tiny.FadeIn(300);
  btn.runAction(fadeInAction);

  var fadeOutAction = Tiny.FadeOut(300);
  fadeOutAction.onComplete = function () {
    parent.run();
    parent.removeChild(self);
    Tiny.isFunction(window.GAME_BRIDGE.gameStart) && window.GAME_BRIDGE.gameStart();
  };

  this.touchstart = this.mousedown = function (e) {
    if (self._clicked) {
      return;
    }
    self._clicked = true;
    self.runAction(fadeOutAction);
  }
};

Launcher.prototype = Object.create(Tiny.Container.prototype);
Launcher.prototype.constructor = Launcher;
