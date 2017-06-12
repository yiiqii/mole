/* eslint-disable */

var Hammber = function (parent) {
  this._parent = parent;

  Tiny.Sprite.call(this, Tiny.Texture.fromImage(RESOURCES['s_hammer_png']));

  this.anchor = Tiny.point(0, 1);
  this.setAnchor(1);
};

Hammber.prototype = Object.create(Tiny.Sprite.prototype);
Hammber.prototype.constructor = Hammber;

Hammber.prototype.updatePos = function (pos) {
  var radio = window.innerWidth / Tiny.WIN_SIZE.width;
  var hole = this._parent._hole;
  var min = hole.getPositionY() * radio;
  var max = hole.height * radio + min;

  //区域内才能出现锤子
  if (pos.y < min - 20 || pos.y > max + 20) {
    return;
  }
  this.setPosition(pos.x / radio + this.width / 2 + 20 || 0, pos.y / radio + this.height / 2 - 40 || 0);
  this.beat();
};

Hammber.prototype.beat = function () {
  var self = this;
  var rotateAction = Tiny.RotateTo(100, {rotation: Tiny.deg2radian(-30)});
  var fadeOutAction = Tiny.FadeOut(300);
  fadeOutAction.setDelay(500);
  rotateAction.onComplete = function () {
    self.runAction(fadeOutAction);
  };

  Tiny.Action.cleanup(this);
  this.setRotation(0);
  this.setOpacity(1);
  this.runAction(Tiny.Back(rotateAction));
};
