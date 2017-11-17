const path = require('path');
const {ContextReplacementPlugin} = require("webpack");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackHarddiskPlugin=require('html-webpack-harddisk-plugin')

const HTML={
	template:'./dist/index.tmpl',
	title:"七里云",
	favicon: "./dist/favicon.ico",
}

module.exports=env=>Object.assign({
	entry:{
		index:["babel-polyfill","./style/index.less","./style/console.less","./src/main.js"],
	},
	output:{
		filename:"index.js",
		path:path.resolve(__dirname, 'dist')
	},
	module:{
		rules:[{
			test: /.js?$/,
			use: ['react-hot-loader','babel-loader'],
			exclude: /node_modules/,
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
		}]
	},
	plugins:[
		new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
		new HtmlWebpackPlugin({
			...HTML,
			inlineSource: '.(js|css)$'
		}),
		
		new HtmlWebpackPlugin({
			...HTML,
			extra: `<script type="text/javascript" src="cordova.js"></script>`,
			filename:"cordova.html",
			alwaysWriteToDisk: true,
		}),
		
		new HtmlWebpackInlineSourcePlugin(),
		new HtmlWebpackHarddiskPlugin(),
	],
},env ? require(`./webpack.${env}.js`) : {})
