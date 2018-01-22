const AppComment=Cloud.buildComment("App")

Cloud.typeDefs=`${AppComment.typeDefs}`

Cloud.resolver=AppComment.resolver

module.exports=Cloud
