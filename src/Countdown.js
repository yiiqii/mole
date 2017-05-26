/* eslint-disable */

var Countdown = function (parent) {
  this._parent = parent;
  this._prevNum = 0;
  this._tickNum = 0;
  this._speed = Tiny.settings.TARGET_FPMS * 1000 / parent._speed;

  Tiny.Container.call(this);

  var track = Tiny.Sprite.fromFrame('track.png');
  this.addChild(track);

  var bar = Tiny.Sprite.fromFrame('bar.png');
  this.addChild(bar);

  var g = new Tiny.Graphics();
  g.lineStyle(0);
  g.beginFill(0xFFFFFF);
  g.moveTo(12, 6);
  g.lineTo(490, 6);
  g.lineTo(490, 22);
  g.lineTo(12, 22);
  g.quadraticCurveTo(2, 16, 12, 6);
  g.endFill();
  g.setPosition(0, 0);
  this.addChild(g);

  var label = Tiny.Sprite.fromFrame('label.png');
  label.setPosition(-100, -6);
  this.addChild(label);

  this.setPosition(Tiny.WIN_SIZE.width / 2 - this.width / 2 + 100, 420 * 2 - this.height / 2);

  if (Tiny.config._isiPad || Tiny.config._is4S) {
    this.setPosition(Tiny.WIN_SIZE.width / 2 - this.width * 0.75 / 2 + 88, 330 - this.height / 2);
    this.setScale(0.75);
  }

  bar.mask = g;
  this._masker = g;
};
Countdown.prototype = Object.create(Tiny.Container.prototype);
Countdown.prototype.constructor = Countdown;

Countdown.prototype.update = function (num) {
  var total = config.ticker.total;

  if (num != this._prevNum) {
    this._prevNum = num;
    this._tickNum = num;
    this._speed = Tiny.settings.TARGET_FPMS * 1000 / this._parent._speed;
  } else {
    this._tickNum += 1 / this._speed;
  }
  var radio = (total - this._tickNum) / total;
  this._masker.setPositionX(460 * (1 - radio.toFixed(4)));
};
