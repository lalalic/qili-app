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

Cloud.logVariables=function(operationName, variables){
    if(typeof(variables)=="object" && variables.cloudCode){
        const {cloudCode, ...a}=variables
        return a
    }
    return variables
}

//to support offline
module.exports=Cloud
