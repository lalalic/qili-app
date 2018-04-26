const path = require('path')
const {ContextReplacementPlugin, DefinePlugin} = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const HTML={
	template:'./node_modules/qili-app/index.tmpl',
	title:"QiLi App",
	favicon: "./dist/favicon.ico",
}

module.exports=env=>{
	const base={
		entry:{
			index:["babel-polyfill","./src/index.js"],
		},
		output:{
			filename:"[name].js",
			path:path.resolve(__dirname, 'dist'),
			chunkFilename: '[name].js'
		},
		devtool:false,
		module:{
			rules:[{
				test: /.js?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
				include: /src/,
			},{
				test:/.less?$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader',
				]
			},{
				test:/.graphql?$/,
				use: 'text-loader'
			},{
				test:path.resolve("./cloud","index.js"),
				use: "imports-loader?Cloud=qili-app/makeOfflineSchema"//path relative to test
			}]
		},
		plugins:[
			new UglifyJsPlugin(),
			new DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
			new ContextReplacementPlugin(/transformation[\/\\]file/, /\.js$/),
			new ContextReplacementPlugin(/source-map[\/\\]lib/, /\.js$/),
			new HtmlWebpackPlugin({
				...HTML,
				inlineSource: 'index.js$'
			}),

			new HtmlWebpackPlugin({
				...HTML,
				extra:'<script type="text/javascript" src="cordova.js"></script>',
				inlineSource: 'index.js$',
				filename:"cordova.html",
			}),

			new HtmlWebpackInlineSourcePlugin(),

		]
	}

	if(env){
		return require(`./webpack.${env}.js`)(base,HTML)
	}

	return base
}