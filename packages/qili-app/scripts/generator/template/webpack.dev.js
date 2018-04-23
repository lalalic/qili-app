const path = require('path');

module.exports=(base,HTML,port=require("./package.json").config.devPort)=>{
	return {
		...base,
		entry:{
			index: ["babel-polyfill","./.test.js","./src/index.js"],
		},
		devtool: 'source-map',
		devServer:{
			contentBase: path.join(__dirname, "dist"),
			port,
			host:"0.0.0.0",
			disableHostCheck:true,
			setup(app){
				app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
			}
		},
		module:{
			...base.module,
			rules:[
				{
					test: /.js?$/,
					use: 'react-hot-loader',
					exclude: /node_modules/,
					include:/src/
				},
				...base.module.rules
			]
		},
		plugins:base.plugins.slice(2)
	}
}
