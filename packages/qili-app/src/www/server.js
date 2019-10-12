import React from "react"
import {renderToString} from "react-dom/server"
import {match, Router} from "react-router"

import {Environment, Network, RecordSource,  Store} from 'relay-runtime'
import withGraphql from "../graphql/relay/withGraphqlClient"

function createServerEnvironment({app,user}){
	const store=new Store(new RecordSource())
	let fetchPayload, resolve, _SSRReady=new Promise(r=>resolve=r)
	let hasQuery=false
	function fetchQuery(operation, variables){
		hasQuery=true
		return app.runQL(typeof(operation)=="string" ? operation : operation.text,variables)
			.then(data=>fetchPayload=data)
	}

	return Object.assign(new Environment({
		handlerProvider:null,
		network:Network.create(fetchQuery),
		store,
	}),{
		SSRReady(query){
			if(!hasQuery){
				delete this.SSRReady//to make it ready for render content, check withQuery
				resolve()
			}else if(query){
				delete this.SSRReady//to make it ready for render content, check withQuery
				resolve({...query, data:fetchPayload})
			}
			return _SSRReady
		},
		changeToken(){

		},
		fetcher(){

		},
		runQL:fetchQuery
	})

}

export default (routes,template,App)=>(req,res)=>{
	const {url:location,app}=req
    match({routes,location}, (err, redirect, props)=>{
        if(props){
			debugger
            const environment=createServerEnvironment({app})
			const Context=withGraphql({environment})(Router)
			const ctx=<Context {...props}/>
			const element=App ? <App req={req}>{ctx}</App> : ctx
            //to fire query
            renderToString(element)
            //when data fetched then it's ready for server side render
            environment.SSRReady().then(data=>{
				const content=renderToString(element)
				res.reply(template({content, data}))
            }).catch(e=>{
                res.reply(e.message)
            })
        }else if(redirect){
            res.redirect(302, redirect.pathname + redirect.search)
        }else{
            res.reply(err)
        }
    })
}