var path = require('path');
var webpack = require("webpack");
var webpack = require("webpack");

function envwebpack(env){
	try{
		return require(`./webpack.${env}.js`)
	}catch(e){
		return {}
	}
}

module.exports=env=>Object.assign({
	entry:["babel-polyfill","./style/index.less","./style/console.less","./src/main.js"],
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
	plugins:[new webpack.ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/)],
	devServer:{
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9082
	}
},envwebpack(env))
