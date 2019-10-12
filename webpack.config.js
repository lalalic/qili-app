const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const {ContextReplacementPlugin} = require("webpack");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

const HTML={
	template:'./packages/qili-app/index.tmpl',
	title:"七里云",
	favicon: "./packages/console/dist/favicon.ico",
}

module.exports=env=>{
	const base={
		entry:{
			app:["@babel/polyfill","./packages/console/src/index.js"],
			www:["@babel/polyfill","./packages/console/src/www/client.js"]
		},
		output:{
			filename:"[name].js",
			path:path.resolve(__dirname, 'packages/console/dist')
		},
		module:{
			rules:[{
				test: /.js?$/,
				use: 'source-map-loader',
				enforce:"pre",
				exclude: /node_modules/,
			},{
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
			new HtmlWebpackPlugin({
				...HTML,
				inlineSource: '.(js|css)$',
				chunks:["app"]
			}),

			new HtmlWebpackPlugin({
				...HTML,
				extra:'<script type="text/javascript" src="cordova.js"></script>',
				inlineSource: '.(js|css)$',
				filename:"cordova.html",
				chunks:["app"]
			}),

			new HtmlWebpackInlineSourcePlugin(),
		],
		mode:"production"
	}

	if(env){
		return require(`./webpack.${env}.js`)(base,HTML,9081)
	}
	
	return base
}
