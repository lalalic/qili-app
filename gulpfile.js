var gulp=require('gulp'),
    shell=require('gulp-shell'),
    allin1;

gulp.task('javascript', shell.task('browserify -d index.js -o www/index.js -i jquery'))
    .task('allin1', allin1=function(){
        var fs=require('fs')

        var html=fs.readFileSync("www/index.html", 'utf8')
        var js=require('uglifyjs').minify('www/index.js').code

        var data=html.split(/<script.*\/script>/i)
        data.splice(1,1,'<script type="text/javascript">'+js+'</script>')

        fs.writeFileSync("www/allin1.html", data.join(''), 'utf8')
    })
    .task('watch', ['javascript'], function(){
		 gulp.watch(['mock.json','index.js','lib/**/*.*'],['javascript'])

         gulp.watch(['www/index.js','www/index.html'],['allin1'])

         console.log('Starting allin1...')
         allin1()
         console.log('Finished allin1...')

	})
    .task('default',['watch'], shell.task('"node_modules/.bin/restmock"'))

    .task('cordovaCreate',shell.task(['cordova create cordova lalalic.superdaddy superdaddy --link-to=www']))
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
                'cordova plugin add https://github.com/vilic/cordova-plugin-wechat --variable APP_ID=xxxxx'
            ],{cwd:"cordova"}))
