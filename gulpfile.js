var gulp=require('gulp'),
    shell=require('gulp-shell'),
    isMac=process.platform.indexOf('darwin')!=-1;

function safe(x){
    return isMac ? `"${x}"` : x
}


gulp.task("allin1", function(){
	 var fileName="dist/allin1.html";
        console.log("Starting merge all into "+fileName)
        var fs=require('fs')

        var html=fs.readFileSync("dist/index.html", 'utf8')
		var js=fs.readFileSync("dist/index.js",'utf8')
        try{
            var data=html.split(/<script.*\/script>/i)
            data.splice(1,0,`<script>/*${new Date()}*/${js}</script>`)

            fs.writeFileSync(fileName, data.join(''), 'utf8')
            console.log("Finished merge")
        }catch(error){
            console.error(error.message)
            return
        }
	})
	.task('upload', ['allin1'], function(){
        var secret=require(process.cwd()+"/__secret")

        require('request').post({
            url:'http://qili2.com/1/schemas/clientcode?appman='+secret.apiKey,
            formData:{
                clientcode: require('fs').createReadStream(__dirname+'/dist/allin1.html')
            },
            headers:{
                "X-Application-Id":secret.apiKey,
                "Authorization":`Basic ${new Buffer(`${secret.username}:${secret.password}`).toString('base64')}`
            }
        },(e, res)=>{
            console.log(e||res.statusCode!=200 ? `uploading error: ${e ? e.message:res.statusCode}` : "uploaded")
        })

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
                'cordova plugin add cordova-plugin-wechat --variable APP_ID=xxxxx'
            ],{cwd:"cordova"}))

function upload2Qiniu(){
    var qiniu=require('qiniu')
    var secret=require(process.cwd()+"/__secret")
    qiniu.conf.ACCESS_KEY=secret.qiniu.ACCESS_KEY
	qiniu.conf.SECRET_KEY=secret.qiniu.SECRET_KEY

    var policy=new qiniu.rs.PutPolicy(secret.qiniu.bucket+":"+secret.qiniu.appIndexFile)
    console.log("Starting upload to "+secret.qiniu.bucket)
    qiniu.io.putFile(policy.token(),secret.qiniu.appIndexFile,fileName, null, function(e,ret){
        e ? console.error(e.error) : console.info(secret.qiniu.appIndexFile+" is uploaded.")
    })
}
