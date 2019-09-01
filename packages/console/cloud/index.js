const AppComment=Cloud.buildComment("App")

Cloud.supportAnonymous=true

Cloud.addModule({
    typeDefs:`${AppComment.typeDefs}`,
    resolver:AppComment.resolver,
    static(service){
        service.on(/.*/,require("../src/www/server").default)
    },
})

//to support offline
module.exports=Cloud
