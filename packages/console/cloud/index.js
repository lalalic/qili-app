const AppComment=Cloud.buildComment("App")

Cloud.addModule({
    typeDefs:`
        ${AppComment.typeDefs}
        type Anonymous{
            name:String
        }
    `,
    resolver:Cloud.merge(AppComment.resolver,{
        Anonymous:{
            name:()=>"anonymous"
        }
    }),
    static(service){
        service.on(/.*/,require("../src/www/server").default)
    },
    indexes:{
        
    }
})

Cloud.logVariables=function(variables){
    if(variables.cloudCode){
        variables.cloudCode="..."
    }
    return variables
}

//to support offline
module.exports=Cloud
