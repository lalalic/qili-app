const path = require('path');

module.exports=(base,HTML,port)=>{
	return {
		...base,
		entry:["babel-polyfill","./.test.mongo.js","./src/main.js"],
		devtool: 'source-map',
		devServer:{
			contentBase: path.join(__dirname, "dist"),
			port,
			host:"0.0.0.0",
			disableHostCheck:true,
			before(app){
				app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
			}
		}
	}
}
