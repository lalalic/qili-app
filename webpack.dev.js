const path = require('path')
const {ContextReplacementPlugin} = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports=(base,HTML,port)=>{
	return {
		...base,
		entry:{
			...base.entry,
			app:["@babel/polyfill","./.test.mongo.js","./packages/console/src/index.js"],
		},
		devtool: 'source-map',
		mode: "development",
		resolve:{
			alias:{
				"qili-app": `${__dirname}/packages/qili-app/src`,
			}
		},
		devServer:{
			contentBase: path.join(__dirname, "packages/console/dist"),
			port,
			host:"0.0.0.0",
			disableHostCheck:true,
			historyApiFallback:true,
			before(app){
				app.get("/app.apk.version",(req, res)=>res.json(require("./package.json").version))
			},
			proxy:{
				"/www":{
					target:"http://localhost:9080",
					pathRewrite:{
						"/www":"/1/qiliAdmin/static"
					},
					changeOrigin: true
				}
			}
		},
		plugins:[
			new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
			new ContextReplacementPlugin(/transformation[\/\\]file/, /\.js$/),
			new ContextReplacementPlugin(/source-map[\/\\]lib/, /\.js$/),
			new HtmlWebpackPlugin({
				...HTML,
				chunks:["app"]
			}),

			new HtmlWebpackPlugin({
				...HTML,
				extra:'<script type="text/javascript" src="cordova.js"></script>',
				filename:"cordova.html",
				chunks:["app"]
			})
		],
		watchOptions:{
			ignored: /node_modules/
		}
	}
}
