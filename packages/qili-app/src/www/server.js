import React from "react"
import {renderToString} from "react-dom/server"
import {match, Router} from "react-router"

import {Environment, Network, RecordSource,  Store} from 'relay-runtime'
import withGraphql from "../graphql/relay/withGraphqlClient"

function createServerEnvironment({app,user}){
	const store=new Store(new RecordSource())
	let fetchPayload, resolve, _SSRReady=new Promise(r=>resolve=r)
	function fetchQuery(operation, variables){
		return app.runQL(typeof(operation)=="string" ? operation : operation.text,variables)
			.then(data=>fetchPayload=data)
	}

	return Object.assign(new Environment({
		handlerProvider:null,
		network:Network.create(fetchQuery),
		store,
	}),{
		SSRReady(query){
			if(query){
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

export default (routes,template)=>({path:location,app},res)=>{
    match({routes,location}, (err, redirect, props)=>{
        if(props){
            const environment=createServerEnvironment({app})
            const Context=withGraphql({environment})(Router)
            //to fire query
            renderToString(<Context {...props}/>)
            //when data fetched then it's ready for server side render
            environment.SSRReady().then(data=>{
                const content=renderToString(<Context {...props}/>)
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