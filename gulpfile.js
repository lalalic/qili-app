var gulp=require('gulp'),
    shell=require('gulp-shell');

gulp.task('javascript',shell.task('watchify -d -g uglifyify index.js -o www/index.js -i jquery'))
    .task('minify', shell.task('node_modules/.bin/uglifyjs www/index.js > www/index.min.js'))
    .task('product', function(){
        gulp.watch(['www/index.js'],['minify']).on('change', function(){
            var fs=require('fs'), root="www/";

            fs.readFile(root+"index.html", 'utf8', function(error, html){
                if(error)
                    return console.log(error);
                var js=fs.readFileSync(root+'index.min.js','utf8')

                html=html.replace('<script type="text/javascript" src="index.js"></script>',
                        '<script type="text/javascript">'+js+'</script>');
                fs.writeFile(root+"allin1.html", html, 'utf8', function(error){
                    if(error)
                        console.log(error)
                })
            })
        })
    })
    .task('watchmock', function(){
		 gulp.watch(['mock.json'],['javascript']).on('change', function(){
			console.log("mock.json changed, rebuild javascript")
		 })
	})
    .task('mock',['watchmock'], shell.task('"node_modules/.bin/restmock"'))
    .task('default',['mock','javascript'],function(){
        /*
         * can't be here since it's blocked by mock and javascript,
         * so make seperated watch task, and make default task dependent
         * on watch tasks
         */
    })
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
