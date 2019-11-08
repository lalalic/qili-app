const cloud=require("./webpack.cloud")
module.exports=()=>({
    ...cloud(),
    plugins:[
        new (require("webpack")).EvalSourceMapDevToolPlugin({
            exclude:/node_modules/,
            moduleFilenameTemplate: 'webpack://qili-console/[resource-path]?[loaders]'
        })
    ]
})