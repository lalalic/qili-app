const AppComment=Cloud.buildComment("App")

Cloud.supportAnonymous=true

Cloud.addModule({
    typeDefs:`${AppComment.typeDefs}`,
    resolver:AppComment.resolver,
    static(service){
        service.on(/.*/,function({path},res){
            require("../src/www/server")(path,res)
        })
    },
})

//to support offline
module.exports=Cloud
