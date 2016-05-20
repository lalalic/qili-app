/*
var gulp=require('gulp'),
    shell=require('gulp-shell'),
    isMac=process.platform.indexOf('darwin')!=-1;

function safe(x){
    return isMac ? `"${x}"` : x
}


gulp
    .task('cordovaCreate',shell.task(['cordova create cordova lalalic.superdaddy superdaddy --link-to=dist']))
    .task('cordovaConfig', ['cordovaCreate'], function(){
        var fs=require('fs'),
            path="cordova/config.xml"
            content=fs.readFileSync(path,'utf8');
        fs.writeFileSync(path, content.replace('src="index.html"','src="cordova.html"'));
    })
    .task('cordova', ['cordovaConfig'],
                shell.task([
                'cordova platform add android',
                'cordova plugin add cordova-plugin-file',
                'cordova plugin add cordova-plugin-file-transfer',
                'cordova plugin add https://github.com/litehelpers/Cordova-sqlite-storage',
                'cordova plugin add cordova-plugin-camera',
                'cordova plugin add cordova-plugin-wechat --variable APP_ID=xxxxx'
            ],{cwd:"cordova"}))

*/