module.exports=()=>({
    entry:["./packages/console/cloud/index.js"],
    target:"node",
    externals: [
        function(context, request, callback){
            switch(request){
                case "react":
                case "react-dom/server":
                case "react-router":
                    return callback(null, 'commonjs '+request)
            }

            callback()
        }
    ],
    resolve:{
        alias:{
            "qili-app": `${__dirname}/packages/qili-app/src`,
        }
    },
    output:{
        path:`${__dirname}/packages/console/cloud`,
        filename:"__generated.js",
        devtoolNamespace:"qili-console"
    },
    mode:"production",
    module: {
        rules: [
          { 
              test: /\.(js)$/, 
              use:'babel-loader'
        }
        ]
    }
})