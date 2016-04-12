var through = require('through2');
module.exports=function(file,options){
    if (!/\.css$|\.less$/.test(file)) {
		return through();
	}

    return through((a,b,next)=>next(), function(done){
        this.push(null)
        done()
    });
}
