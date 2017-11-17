const path = require('path');
const {ContextReplacementPlugin} = require("webpack");


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
		new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/)
	],
},env ? require(`./webpack.${env}.js`) : {})
