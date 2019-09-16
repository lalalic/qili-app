const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports=(base,HTML,port)=>{
    return {
		...base,
		entry:{
			index:["./packages/qili-app/src/index.js"],
			graphql: "./packages/qili-app/src/graphql/index.js",
			"www/client":"./packages/qili-app/src/www/client.js",
			"www/server":"./packages/qili-app/src/www/server.js",
			"components/tutorial":"./packages/qili-app/src/components/tutorial.js",
			"components/profile":"./packages/qili-app/src/components/profile.js",
			"components/setting":"./packages/qili-app/src/components/setting.js",
			"components/comment":"./packages/qili-app/src/components/comment.js",
			"components/command-bar":"./packages/qili-app/src/components/command-bar.js",
			"components/empty":"./packages/qili-app/src/components/empty.js",
			"components/file":"./packages/qili-app/src/components/file.js",
			"components/photo":"./packages/qili-app/src/components/photo.js",
			"components/account":"./packages/qili-app/src/components/account.js",
			"components/info-form":"./packages/qili-app/src/components/info-form.js",
			"components/pull-to-refresh":"./packages/qili-app/src/components/pull-to-refresh.js",
			"components/tutorial":"./packages/qili-app/src/components/tutorial.js",
			"components/offline":"./packages/qili-app/src/components/offline.js",
			"components/wechat":"./packages/qili-app/src/components/wechat.js",
			"components/check-update":"./packages/qili-app/src/components/check-update.js",
		},

        output:{
			filename:"[name].js",
			path:`${__dirname}/packages/qili-app`,
            libraryTarget: "commonjs2",
		},
		target:"node",
		externals:[nodeExternals()],
		plugins:[]
	}
}
