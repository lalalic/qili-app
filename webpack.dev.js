const webpack=require("webpack")

module.exports={
	entry:{
		entry:["./style/index.less","./style/console.less","./.test.mongo.js","./src/main.js"],
	},
	devtool: 'source-map'
}
