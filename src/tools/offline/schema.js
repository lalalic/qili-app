import merge from "lodash.merge"
import {makeExecutableSchema} from 'graphql-tools'

module.exports={
	merge,
	static:{
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
			typeDefs: typeDefs||this.typeDefs,
			resolvers: merge({}, this.resolver,{
				User: {
					name:({username,name})=>username||name,
					username: ({username,name})=>username||name,
				},
				Query: {
					me:(_,a,{app,user})=>{
						return user
					}
				},
			},resolvers)
		})
	}
}