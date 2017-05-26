/* eslint-disable */

var config = {
  moleUpTime: 100,//地鼠上升动画持续时间（单位: ms）
  moleDelayTime: 350,//地鼠出现停留时长，越小越难，低于300基本不能玩了
  moleHitOutTime: 0.5,//被打中的地鼠移除间隔（单位: s）
  ticker: {
    time: 60,//地鼠上升间隔（单位: ms）
    total: 15//活动计数（单位: 次）
  },
  /**
   * 概率
   *
   * 排队：20m   8~10  60%
   * 堵车：30m   5~6   30%
   * 停用：100m  1~3   5%
   * 支付宝：50m  1~3  5%
   */
  molePreSynNum: 8,//游戏开始前出现的个数
  moleSynNum: [1, 3],//同时出现的个数
  moles: [{
    name: 'pd',//排队
    score: 20,
    prob: [8, 10]
  }, {
    name: 'dc',//堵车
    score: 30,
    prob: [5, 6]
  }, {
    name: 'ty',//停用
    score: 100,
    prob: [1, 3]
  }, {
    name: 'ali',//支付宝
    score: 50,
    prob: [1, 3]
  }]
};
