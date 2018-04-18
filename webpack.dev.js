const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin=require('html-webpack-harddisk-plugin')
const thisIP=require("ip").address()

module.exports=(base,HTML,port)=>{
	return {
		...base,
		entry:["./.test.mongo.js",base.entry],
		devtool: 'source-map',
		devServer:{
			contentBase: path.join(__dirname, "dist"),
			compress: true,
			port,
			host:"0.0.0.0",
			disableHostCheck:true,
			hot:true,
			inline:true,//false,//for apk
			before(app){
				app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
			}
		}
	}
}
