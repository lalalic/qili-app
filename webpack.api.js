const path = require('path')
const {ContextReplacementPlugin} = require("webpack")
const nodeExternals = require('webpack-node-externals')

module.exports=(base,HTML,port)=>{
    return {
		...base,
		entry:{
			index:["./packages/qili-app/src/index.js"],
			graphql: "./packages/qili-app/src/tools/recompose.js",
		},
        output:{
			filename:"[name].js",
			path:path.resolve(__dirname, 'packages/qili-app'),
            libraryTarget: "commonjs2",
		},
        target:"node",
        externals:[nodeExternals()],
		plugins:[
            new ContextReplacementPlugin(/graphql-language-service-interface[\/\\]dist/, /\.js$/),
			new ContextReplacementPlugin(/transformation[\/\\]file/, /\.js$/),
			new ContextReplacementPlugin(/source-map[\/\\]lib/, /\.js$/),
		]
	}
}
