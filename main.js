/* eslint-disable */

;
(function () {
  window.VIEW_HEIGHT = document.documentElement['clientHeight'] * 320 / document.documentElement['clientWidth'];
  var config = {
    showFPS: true,
    dpi: 2,
    canvasId: 'TinyCanvas',
    renderOptions: {
      backgroundColor: 0x7ac9e5
    }
  };
  if (navigator.userAgent.toLowerCase().indexOf('mobile') > -1) {
    config._is4S = window.VIEW_HEIGHT <= 480;
    config._isiPad = window.VIEW_HEIGHT <= 400;
  }
  Tiny.app = new Tiny.Application(config);

  var main = {
    init: function () {
      console.log('init');

      this.resourceLoad();
    },
    resourceLoad: function () {
      var resources = [];
      for (var key in RESOURCES) {
        resources.push(RESOURCES[key]);
      }
      var progress = document.getElementById('progress');
      var percent = document.getElementById('percent');
      var hole = document.getElementById('hole');

      Tiny.Loader.run({
        resources: resources,
        onProgress: function (pre) {
          console.log('percent:', pre + '%');

          var num = ~~pre;
          //更新UI
          percent.innerHTML = num + '%';
          progress.style.marginTop = (100 - num) + '%';
        },
        onAllComplete: function () {
          console.log('all complete');
          //clear DOM
          var body = document.body;
          body.removeChild(hole);
          body.removeChild(percent);
          body.removeChild(progress.parentNode);

          Tiny.app.run(new StartLayer());
        }
      });
    }
  };

  main.init();

  function bridgeInit() {
    document.addEventListener('pause', function (e) {
      Tiny.app.pause();
      window.GAME_BRIDGE && window.GAME_BRIDGE.gamePause();
    }, false);
    document.addEventListener('resume', function (e) {
      Tiny.app.resume();
    }, false);
  }

  window.AlipayJSBridge ? bridgeInit() : document.addEventListener('AlipayJSBridgeReady', function () {
    bridgeInit();
  });
})();
