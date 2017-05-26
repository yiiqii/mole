/* eslint-disable */

/**
 * Score
 * @constructor
 */
var Score = function () {

  //得分
  //{dc: {time: 6, score: 180}, pd: {time: 3, score: 60}, ali: {time: 2, score: 100}}
  this.scores = {};

  //Tiny.Sprite.call(this);

  //var txt = new Tiny.Text('共节省：000 分', {
  //    font: '32px Snippet',
  //    fill: '#76392c'
  //});
  //txt.setPosition(Tiny.WIN_SIZE.width / 2, 415 * 2);
  //if (Tiny.config._isiPad || Tiny.config._is4S) {
  //    txt.setPositionY(330);
  //}
  //txt.setPivot(0.5, 0.5);
  //this.addChild(txt);
  //this.txt = txt;
};

//Score.prototype = Object.create(Tiny.Sprite.prototype);
Score.prototype.constructor = Score;

Score.prototype.update = function (s) {
  if (!this.scores[s.type]) {
    this.scores[s.type] = {
      time: 0,
      score: 0
    }
  }
  this.scores[s.type].time++;
  this.scores[s.type].score += Number(s.score);

  console.log(this.scores);
  //this.txt.text = '共节省：' + String(this.goal).split('').join(' ') + ' 分';
};

Score.prototype.getScores = function () {
  return this.scores;
};
