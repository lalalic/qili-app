const AppComment=Cloud.buildComment("App")

Cloud.supportAnonymous=true

Cloud.addModule({
    typeDefs:`${AppComment.typeDefs}`,
    resolver:AppComment.resolver,
    static(service){
        service.on(/.*/,require("../src/www/server").default)
    },
    indexes:{
        
    }
})

//to support offline
module.exports=Cloud
