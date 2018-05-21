const path = require('path')
const {ContextReplacementPlugin} = require("webpack")
const nodeExternals = require('webpack-node-externals')

module.exports=(base,HTML,port)=>{
    return {
		...base,
		entry:["./packages/qili-app/src/index.js"],
        output:{
			filename:"index.js",
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
