const nodeExternals = require('webpack-node-externals')
module.exports=()=>({
    entry:["./cloud/index.js"],
    target:"node",
    externals: [nodeExternals()],
    output:{
        path:`${__dirname}/cloud`,
        filename:"__generated.js",
    },
    module: {
        rules: [
          { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
})