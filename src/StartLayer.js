/* eslint-disable */

var StartLayer = function () {
  this.moleProb = [];
  this._speed = 1;
  this._currentTime = 0;
  this._time = config.ticker.time; //定时
  this._prePos = [];

  this._start = false;
  this._timeOut = false;
  this._count = 0;

  //背景
  this._background = BackgroundScene.create();

  //活动攻略
  this._guide = new Guide(this);

  //洞
  this._hole = HoleScene.create();

  //锤子
  this._hammer = new Hammber(this);

  //mask
  this._masks = new MaskScene();

  //地鼠
  this._moleCell = new Tiny.Container();

  //得分
  this._score = new Score();

  //倒计时
  this._countdown = new Countdown(this);

  //bottom
  this._bottom = new Bottom(this);

  //launcher
  this._launcher = new Launcher(this);

  this._pauser = new Pause(this);

  Tiny.Container.call(this);
  this.init();

  //设置当前layer可点击
  this.interactive = true;

  this.touchstart = this.mousedown = function (e) {
    var self = e.target;
    var gp = e.data.global;
    if (!self._start) {
      return;
    }
    self._hammer.updatePos(gp);
    self._moleCell.children.forEach(function (m) {
      var bounds = m.getBounds();
      bounds.height -= 20;
      var collide = Tiny.rectContainsPoint(bounds, gp);
      if (collide) {
        m.hit();
        self._score.update(m.getScore());
      }
    });
  };

  var self = this;
  window.GAME_BRIDGE.gamePause = function () {
    if (self._start) {
      self.pause();
    }
  }
};
StartLayer.prototype = Object.create(Tiny.Container.prototype);
StartLayer.prototype.constructor = StartLayer;

StartLayer.prototype.init = function () {
  this.addChild(this._background);
  this.addChild(this._hole);
  this.addChild(this._moleCell);
  this.addChild(this._masks);
  this.addChild(this._countdown);
  this.addChild(this._bottom);
  this.addChild(this._guide);
  this.addChild(this._hammer);
  this.addChild(this._launcher);
  this.addChild(this._pauser);

  this.reset();
  //创建游戏开始前出现的地鼠
  var moleList = this.generateMoleList();
  for (var i = 0; i < config.molePreSynNum; i++) {

    var index = Tiny.randomFromArray(moleList);
    Tiny.arrayRemoveObject(moleList, index);

    this.createMole(index, true);
  }

  Tiny.isFunction(window.GAME_BRIDGE.gameInit) && window.GAME_BRIDGE.gameInit();
};

StartLayer.prototype.run = function () {
  var self = this;
  self.reset();
  this._moleCell.children.forEach(function (m, i) {
    m.down(function () {
      if (i == 0) {
        self._start = true;
      }
    });
  });
};

StartLayer.prototype.reset = function () {
  this._prePos = [];
  this._start = false;
  this._currentTime = 0;
  this._count = 0;
  this.moleProbInit();
};

//OVERWRITE
StartLayer.prototype.updateTransform = function () {
  if (this._start) {
    if (this.moleProb.length < 3 ||
      this._count > config.ticker.total) {
      this._timeOut = true;
    }

    this._speed = 1 * this.getRealSpeed();

    if (!this._timeOut) {
      this.tick();
      this._countdown.update(this._count - 1);
    } else {
      this.gameOver();
    }
  }
  if (this._timeOut && !this._start) {
    return;
  }

  //定时移除打中的地鼠
  this._moleCell.children.forEach(function (m) {
    if (m.hitTime && Tiny.getTime() - m.hitTime > config.moleHitOutTime * 1000) {
      m.hitTime = 0;
      m.actions.forEach(function (a) {
        if (a.name == 'down') {
          a.start();
        }
      });
    }
  });

  this.containerUpdateTransform();
};

//此处要注意了，因为设备的渲染能力，必须要通过帧频换算
StartLayer.prototype.getRealSpeed = function () {
  return (Tiny.settings.TARGET_FPMS * 1000 / (Math.ceil(Tiny.ticker.shared.FPS / 10) * 10 || 60)).toFixed(0);
};

StartLayer.prototype.tick = function () {
  this._currentTime += Number(this._speed);

  var round = (this._currentTime + 0.5) | 0;

  this._currentTime = this._currentTime % this._time;

  if (round >= this._time) {
    var moleList = this.generateMoleList();
    var pos = [];
    for (var i = 0; i < Tiny.randomFromArray(config.moleSynNum); i++) {

      //出现多个地鼠的时候，要保证不能出现在同一个洞里
      var index = Tiny.randomFromArray(moleList);
      Tiny.arrayRemoveObject(moleList, index);

      pos.push(index);

      this.createMole(index);
    }
    this._prePos = pos;
    this._count++;
  }

};

//创建一个地鼠
StartLayer.prototype.createMole = function (index, isStatic) {
  var moleCell = this._moleCell;
  var i = Tiny.random(0, this.moleProb.length - 1);

  var type = this.moleProb.splice(i, 1);
  var mole = new Mole(type, index, this);
  moleCell.addChild(mole);
  mole.up(function () {
    if (!isStatic) {
      mole.down();
    }
  });
};

//地鼠概率初始化
StartLayer.prototype.moleProbInit = function () {
  var self = this;
  self.moleProb = [];
  config.moles.forEach(function (m) {
    for (var i = 0; i < Tiny.randomFromArray(m.prob) * config.moleSynNum[config.moleSynNum.length - 1]; i++) {
      self.moleProb.push(m.name);
    }
  });
  console.log('地鼠出现概率:', self.moleProb);
};

//序列化一个moleList
StartLayer.prototype.generateMoleList = function () {
  var arr = [];
  for (var j = 0; j < MOLE_DATA.length; j++) {
    arr.push(j);
  }
  //移除上一时间点的位置
  for (var k = 0; k < this._prePos.length; k++) {
    Tiny.arrayRemoveObject(arr, this._prePos[k]);
  }
  return arr;
};

StartLayer.prototype.pause = function () {
  console.log('游戏暂停');
  this._start = false;
  this._pauser.show();
};

//游戏结束
StartLayer.prototype.gameOver = function () {
  this._start = false;
  console.log('游戏结束');
  Tiny.isFunction(window.GAME_BRIDGE.gameOver) && window.GAME_BRIDGE.gameOver(this._score.getScores());
};
