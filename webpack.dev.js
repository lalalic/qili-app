const path = require('path');

module.exports=(base,HTML,port)=>{
	return {
		...base,
		entry:["babel-polyfill","./.test.mongo.js","./packages/console/src/index.js"],
		devtool: 'source-map',
		resolve:{
			alias:{
				"qili-app": path.resolve(__dirname,"packages/qili-app/src")
			}
		},
		devServer:{
			contentBase: path.join(__dirname, "packages/console/dist"),
			port,
			host:"0.0.0.0",
			disableHostCheck:true,
			before(app){
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
