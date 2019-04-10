const fs = require('fs')
const path = require('path')
const version = '0.01'
const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const del = require('del')
const runSequence = require('run-sequence')
const inquirer = require('inquirer')
const generatePage = require('generate-weapp-page')
const exec = require('child_process').exec;
var gulpSequence = require('gulp-sequence')
var argv = require('minimist')(process.argv.slice(2));

const plugins = gulpLoadPlugins()

gulp.task('compress-js', (callback) => {
  gulp.src(['src/**/*.js'])
    .pipe(plugins.babel())
    .pipe(plugins.uglify())
    .pipe(plugins.rev())
    .pipe(gulp.dest('dist'))
    .pipe(plugins.rev.manifest())                       //- 生成一个rev-manifest.json
    .pipe(gulp.dest('rev-js'))                  //- 将rev-manifest.json保存到 rev-js 目录内
    .on('end',function () {
      console.log('compress-js has been completed');
      callback();
    });
})

gulp.task('compress-css', function(callback) {      //- 创建一个名为compress-css的task
  gulp.src(['src/**/*.less'])           //- 需要处理的css文件，放到一个字符串数组里
  // .pipe(concat('css/wap.min.css'))         //- 合并后的文件名
    .pipe(plugins.less())
    .pipe(plugins.cssnano({ compatibility: '*' }))                     //- 压缩处理成一行
    // .pipe(plugins.rename({ extname: '.css' }))
    .pipe(plugins.rev())                                //- 文件名加MD5后缀
    .pipe(gulp.dest('dist'))                //- 输出文件到dist/css目录下
    .pipe(plugins.rev.manifest())                       //- 生成一个rev-manifest.json
    .pipe(gulp.dest('rev-css'))                 //- 将rev-manifest.json保存到rev-css目录内
    .on('end',function () {
      console.log('compress-css has been completed');
      callback();
    });
});

gulp.task('rev-html',['compress-css','compress-js'], function() {          //- compress-css和compress-js任务执行完毕再执行rev-index任务
  /*修改其它html文件的link标签和script标签引用的css和js文件名，并把html文件输出到指定的位置*/
  gulp.src(['rev-css/*.json','rev-js/*.json', 'src/**/*.html'])     //- 读取两个rev-manifest.json文件以及需要进行css和js名替换的html文件
    .pipe(plugins.revCollector())                                                      //- 执行文件内css和js名的替换
    .pipe(gulp.dest('dist'));                                            //- 替换后的html文件输出的目录
});


gulp.task('add', function (cb) {
  exec('git add *', function (err, stdout, stderr) {
    cb(err);
  });
});

var commitdefault='s'
gulp.task('commit', function (cb) {
  if(!argv.a){
    commitcon=commitdefault
  }else {
    var commitcon=argv.a
  }
  exec('git commit -m '+commitcon, function (err, stdout, stderr) {
    cb(err);
  });
});

gulp.task('push', function (cb) {
  exec('git push', function (err, stdout, stderr) {
    cb(err);
  });
});


gulp.task('rev', gulpSequence( 'rev-html','add', 'commit', 'push'));