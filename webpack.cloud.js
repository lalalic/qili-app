const nodeExternals = require('webpack-node-externals')
module.exports=()=>({
    entry:["./packages/console/cloud/index.js"],
    target:"node",
    externals: [nodeExternals()],
    output:{
        path:`${__dirname}/packages/console/cloud`,
        filename:"__generated.js",
    },
    module: {
        rules: [
          { test: /\.(js)$/, use: 'babel-loader' }
        ]
    },
})