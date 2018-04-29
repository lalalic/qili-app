const merge=require("lodash.merge")
const {makeExecutableSchema}=require('graphql-tools')

const Scalar={
	Date:{
		parseValue(value) {
		  return new Date(value); // value from the client
		},
		serialize(value) {
		  return new Date(value); // value sent to the client
		},
		parseLiteral(ast) {
		  if (ast.kind === Kind.INT) {
			return parseInt(ast.value, 10); // ast value is always in string format
		  }
		  return null;
		}
	},

	ObjectID: {
		description:"mongodb ID",
		parseValue(value) {
			let [name,...id]=value.split(":")
			id=id.join(":")
			return id||name
		}
	},
	JSON: require("graphql-type-json"),
	Node: {
		__resolveType(obj, context, {variableValues:{id}}){
			let [colName]=id.split(":")
			return colName[0].toUpperCase()+colName.substring(1,colName.length-1)
		}
	}
}
module.exports={
	merge,
	"static":{
		on(path, callback){

		},

		reply(req, res){

		}
	},
	wechat:{
		on(event, callback){

		},

		reply(req, res){

		}
	},
	buildPagination:()=>({
		typeDefs:"",
		resolver:{}
	}),
	buildComment:()=>({
		typeDefs:"",
		resolver:{}
	}),
	isDev:false,
	typeDefs:"",
	resolver:{},
	persistedQuery:{},
	makeSchema(typeDefs, resolvers={}){
		return makeExecutableSchema({
			resolverValidationOptions:{
				requireResolversForResolveType: false
			},
			typeDefs: typeDefs||this.typeDefs,
			resolvers: merge({}, this.resolver,{
				User: {
					name:({username,name})=>username||name,
					username: ({username,name})=>username||name||"",
				},
				Query: {
					me:(_,a,{app,user})=>{
						return user
					}
				},
			},resolvers, Scalar)
		})
	}
}
