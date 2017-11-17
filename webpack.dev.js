const webpack=require("webpack")

module.exports={
	entry:{
		index:["./style/index.less","./style/console.less","./.test.mongo.js","./src/main.js"],
	},
	devtool: 'source-map',
	devServer:{
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9082,
		host:"0.0.0.0",
		setup(app){
			app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
		}
	}
}
