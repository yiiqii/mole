/* eslint-disable */

/**
 * Mole
 * @constructor
 */
var Mole = function (type, index, parent) {
  this._parent = parent;
  this._type = type;
  this._index = index;
  this._hit = false;
  this.hitTime = 0;

  var texture = Tiny.Texture.fromFrame(type + '_mole.png');
  Tiny.Sprite.call(this, texture);

  console.log('地鼠出现的位置:', index);

  var md = MOLE_DATA[index];
  md = GameData.getMoleData(md, type);
  this.oy = md.oy * 2;
  this.scale = Tiny.point(md.s * 2);
  this.setPosition(md.x * 2, (md.y + md.oy) * 2);
  this.mask = parent._masks.getChildAt(index);
};

Mole.prototype = Object.create(Tiny.Sprite.prototype);
Mole.prototype.constructor = Mole;

//上升动画
Mole.prototype.up = function (callback) {
  var upAction = Tiny.MoveTo(config.moleUpTime, Tiny.point(this.x, this.y - this.oy));
  upAction.onComplete = function () {
    callback && callback();
  };
  this.runAction(upAction);
};

//下降动画
Mole.prototype.down = function (callback) {
  var downAction = Tiny.MoveTo(config.moleUpTime, Tiny.point(this.x, this.y + this.oy));
  downAction.setName('down');
  var self = this;
  //延迟500ms再下降
  downAction.setDelay(config.moleDelayTime);
  //动画完成后移除精灵
  downAction.onComplete = function () {
    self._parent._moleCell.removeChild(self);
    callback && callback();
  };
  this.runAction(downAction);
};

//被打中
Mole.prototype.hit = function () {
  if (this._hit) {
    return;
  }
  console.log(this._type + this._index + '被打中了');
  this._hit = true;
  this.hitTime = Tiny.getTime();
  this.actions.forEach(function (a) {
    if (a.name == 'down') {
      a.stop();
    }
  });
  this.texture = Tiny.Texture.fromFrame(this._type + '_mole_hit.png');
};

//通过type获取被打中地鼠的得分
Mole.prototype.getScore = function () {
  var score = {};
  var self = this;
  config.moles.forEach(function (m) {
    if (m.name == self._type) {
      score = {
        type: [self._type],
        score: m.score
      };
    }
  });

  return score;
};
