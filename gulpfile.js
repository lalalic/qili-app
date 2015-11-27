var gulp=require('gulp'),
    shell=require('gulp-shell');


gulp.task('build4test', shell.task('watchify -d testonly.js -o www/index.js -i jquery'))
    .task('build', shell.task('"node_modules/watchify/node_modules/.bin/browserify" index.js -o www/index.dist.js -i jquery'))
    .task('upload', ['build'], function(){
        var fileName="www/allin1.html";
        console.log("Starting merge all into "+fileName)
        var fs=require('fs')

        var html=fs.readFileSync("www/index.html", 'utf8')
        try{
            var js=require('uglify-js').minify('www/index.dist.js').code
            var data=html.split(/<script.*\/script>/i)
            data.splice(1,0,'<script>'+js+'</script>')

            fs.writeFileSync(fileName, data.join(''), 'utf8')
            console.log("Finished merge")
        }catch(error){
            console.error(error.message)
            return
        }

        var qiniu=require('qiniu')
        var secret=require(process.cwd()+"/secret")
        qiniu.conf.ACCESS_KEY=secret.qiniu.ACCESS_KEY
		qiniu.conf.SECRET_KEY=secret.qiniu.SECRET_KEY

        var policy=new qiniu.rs.PutPolicy(secret.qiniu.bucket+":"+secret.qiniu.appIndexFile)
        console.log("Starting upload to "+secret.qiniu.bucket)
        qiniu.io.putFile(policy.token(),secret.qiniu.appIndexFile,fileName, null, function(e,ret){
            e ? console.error(e.error) : console.info(secret.qiniu.appIndexFile+" is uploaded.")
        })
    })
    .task('default', shell.task('restmock'))
    .task('karma', shell.task('karma start'))

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