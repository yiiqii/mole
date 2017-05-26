/* eslint-disable */

var Bottom = function (parent) {
  this._parent = parent;

  Tiny.Container.call(this);

  if (Tiny.config._is4S) {
    this.render4SSprite(this);
  } else {
    this.renderSprite(this);
  }

};

Bottom.prototype = Object.create(Tiny.Container.prototype);
Bottom.prototype.constructor = Bottom;

Bottom.prototype.renderSprite = function (self) {
  var bbSprite = new Tiny.Sprite.fromImage(RESOURCES['s_btn_bottom_png']);
  var fbSprite = new Tiny.Sprite.fromImage(RESOURCES['s_front_bottom_png']);
  bbSprite.setPositionX(Tiny.WIN_SIZE.width / 2 - bbSprite.width / 2);
  bbSprite.setPositionY(Tiny.WIN_SIZE.height - bbSprite.height + 10);
  fbSprite.setPositionY(Tiny.WIN_SIZE.height - fbSprite.height);

  this.addChild(bbSprite);
  this.addChild(fbSprite);

  fbSprite.setEventEnabled(true);
  fbSprite.touchstart = fbSprite.mousedown = function (e) {
    var gp = e.data.global;
    if (gp.x < window.innerWidth / 2) {
      console.log('查看奖品');
      self.viewPrizeHandler();
    } else {
      console.log('分享');
      self.shareHandler();
    }
  };
};

Bottom.prototype.render4SSprite = function (self) {
  var shareSprite = new Tiny.Sprite.fromImage(RESOURCES['s_btn_share_png']);
  var prizeSprite = new Tiny.Sprite.fromImage(RESOURCES['s_btn_prize_png']);

  shareSprite.setScale(2);
  prizeSprite.setScale(2);
  shareSprite.setPositionX(Tiny.WIN_SIZE.width - shareSprite.width);
  shareSprite.setPositionY(70);
  prizeSprite.setPositionY(70);

  this.addChild(shareSprite);
  this.addChild(prizeSprite);

  shareSprite.setEventEnabled(true);
  prizeSprite.setEventEnabled(true);
  shareSprite.touchstart = shareSprite.mousedown = function (e) {
    self.shareHandler();
  };
  prizeSprite.touchstart = prizeSprite.mousedown = function (e) {
    self.viewPrizeHandler();
  };
};

Bottom.prototype.shareHandler = function () {
  if (!this._parent._start) {
    return;
  }
  Tiny.isFunction(window.GAME_BRIDGE.shareHandler) && window.GAME_BRIDGE.shareHandler();
};

Bottom.prototype.viewPrizeHandler = function () {
  if (!this._parent._start) {
    return;
  }
  Tiny.isFunction(window.GAME_BRIDGE.viewPrizeHandler) && window.GAME_BRIDGE.viewPrizeHandler();
};

