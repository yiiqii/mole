/* eslint-disable */

/**
 * Mask
 * @constructor
 */
var Mask = function (p, scale) {
  var g = new Tiny.Graphics();
  g.lineStyle(0);
  g.beginFill(0xFF0000);
  g.moveTo(0, 63);
  g.lineTo(64, 130);
  //g.lineTo(102, 148);
  g.lineTo(80, 166);
  g.lineTo(132, 180);
  g.lineTo(164, 158);
  g.lineTo(184, 180);
  g.lineTo(180, 168);
  g.lineTo(230, 158);
  g.lineTo(222, 138);
  g.lineTo(266, 50);
  g.quadraticCurveTo(133, -50, 0, 63);
  g.endFill();

  g.setScale(scale * 2);
  g.setPosition(p.x * 2, p.y * 2);
  g.setOpacity(0);

  return g;
};

/**
 * MaskScene
 * @constructor
 */
var MaskScene = function () {
  Tiny.Container.call(this);

  var self = this;
  GameData.getMaskData().forEach(function (item) {
    self.addChild(new Mask(Tiny.point(item.x, item.y), item.s));
  });
};

MaskScene.prototype = Object.create(Tiny.Container.prototype);
MaskScene.prototype.constructor = MaskScene;
