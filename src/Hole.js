/* eslint-disable */

var HoleScene = function () {
};

HoleScene.prototype.init = function () {
  var texture = Tiny.Texture.fromImage(RESOURCES['s_hole_png']);

  var sprite = new Tiny.Sprite(texture);
  sprite.width = Tiny.WIN_SIZE.width;
  sprite.height = 239 * 2;
  sprite.setPositionY(184 * 2);

  return sprite;
};

HoleScene.create = function () {
  var scene = new HoleScene();
  return scene.init();
};
