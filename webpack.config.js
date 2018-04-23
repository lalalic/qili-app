const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const {ContextReplacementPlugin} = require("webpack");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const HTML={
	template:'./packages/qili-app/index.tmpl',
	title:"七里云",
	favicon: "./packages/console/dist/favicon.ico",
}

module.exports=env=>{
	const base={
		entry:["babel-polyfill","./packages/console/src/index.js"],
		output:{
			filename:"index.js",
			path:path.resolve(__dirname, 'packages/console/dist')
		},
		module:{
			rules:[{
				test: /.js?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
				include:/src/
			},{
				test:/.less?$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'less-loader'
				]
			},{
				test:/.css?$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } }
				]
			},{
				test:/.graphql?$/,
				use: 'text-loader'
			},{
				test:path.resolve("./packages/console/cloud","index.js"),
				use: "imports-loader?Cloud=../../qili-app/makeOfflineSchema"//path relative to test
			}]
		},
		plugins:[
			new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
			new ContextReplacementPlugin(/transformation[\/\\]file/, /\.js$/),
			new ContextReplacementPlugin(/source-map[\/\\]lib/, /\.js$/),
			new UglifyJsPlugin(),
			new HtmlWebpackPlugin({
				...HTML,
				inlineSource: '.(js|css)$'
			}),
			
			new HtmlWebpackPlugin({
				...HTML,
				extra:'<script type="text/javascript" src="cordova.js"></script>',
				inlineSource: '.(js|css)$',
				filename:"cordova.html",
			}),
			
			new HtmlWebpackInlineSourcePlugin(),
		],
	}
	
	if(env){
		return require(`./webpack.${env}.js`)(base,HTML,9081)
	}
	
	return base
}
