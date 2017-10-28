const AppComment=Cloud.buildComment("App")

Cloud.typeDefs=`
    ${AppComment.typeDefs}
`

Cloud.resolver=Cloud.merge(AppComment.resolver)

Cloud.persistedQuery=require("./persisted-query")
