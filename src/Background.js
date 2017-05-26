/* eslint-disable */

var BackgroundScene = function () {
};

BackgroundScene.prototype.init = function () {
  var texture = Tiny.Texture.fromImage(RESOURCES['s_bg_jpg']);

  var sprite = new Tiny.Sprite(texture);
  sprite.width = Tiny.WIN_SIZE.width;
  sprite.height = 569 * 2;

  return sprite;
};

BackgroundScene.create = function () {
  var scene = new BackgroundScene();
  return scene.init();
};
