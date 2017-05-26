/* eslint-disable */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var exec = require('child_process').exec;

var gameDir = './';
var paths = {
  game: [
    gameDir + 'config.js',
    gameDir + 'src/Resource.js',
    gameDir + 'src/GameData.js',
    gameDir + 'src/Bottom.js',
    gameDir + 'src/Score.js',
    gameDir + 'src/Countdown.js',
    gameDir + 'src/Guide.js',
    gameDir + 'src/Launcher.js',
    gameDir + 'src/Pause.js',
    gameDir + 'src/Background.js',
    gameDir + 'src/Hole.js',
    gameDir + 'src/Mask.js',
    gameDir + 'src/Mole.js',
    gameDir + 'src/Hammer.js',
    gameDir + 'src/StartLayer.js',
    gameDir + 'main.js'
  ]
};

// 游戏静态资源合并压缩任务
gulp.task('game', function () {
  gulp.src(paths['game'])
    .pipe(concat('game.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['game']);
