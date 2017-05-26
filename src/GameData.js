/* eslint-disable */

var MASK_DATA = [
  {
    x: 22,
    y: 148,
    s: 0.5 * 0.78
  },
  {
    x: 102,
    y: 148,
    s: 0.5 * 0.78
  },
  {
    x: 180,
    y: 148,
    s: 0.5 * 0.78
  },
  {
    x: 0,
    y: 221,
    s: 0.5 * 0.925
  },
  {
    x: 90,
    y: 221,
    s: 0.5 * 0.925
  },
  {
    x: 178,
    y: 221,
    s: 0.5 * 0.925
  },
  {
    x: -13,
    y: 305,
    s: 0.5
  },
  {
    x: 84,
    y: 305,
    s: 0.5
  },
  {
    x: 180,
    y: 305,
    s: 0.5
  }
];

var MOLE_DATA = [
  {
    x: 52,
    y: 164,
    s: 0.5 * 0.8
  },
  {
    x: 132,
    y: 164,
    s: 0.5 * 0.8
  },
  {
    x: 210,
    y: 164,
    s: 0.5 * 0.8
  },
  {
    x: 37,
    y: 240,
    s: 0.5 * 0.925
  },
  {
    x: 127,
    y: 240,
    s: 0.5 * 0.925
  },
  {
    x: 215,
    y: 240,
    s: 0.5 * 0.925
  },
  {
    x: 27,
    y: 326,
    s: 0.5
  },
  {
    x: 124,
    y: 326,
    s: 0.5
  },
  {
    x: 220,
    y: 326,
    s: 0.5
  }
];

var GameData = {
  getMaskData: function () {
    return MASK_DATA;
  },
  getMoleData: function (md, type) {
    md.oy = 55;
    switch (type) {
      case 'ty':
        md.s *= 1.12;
        md.x -= 6;
        md.y -= 10;
        break;
      case 'pd':
        md.s *= 1.1;
        md.x -= 6;
        md.y -= 6;
        break;
      case 'dc':
        md.s *= 1.05;
        md.x -= 6;
        md.y -= 3;
        break;
      default :
        break;
    }
    return md;
  }
};
