import "./index.less"
import React from "react"

import {withInit, QiliApp, ACTION as qiliACTION} from "qili"

import {graphql} from "react-relay"
import {Router, Route, IndexRoute, Direct, IndexRedirect, hashHistory} from "react-router"

const DOMAIN="myQili"

export const ACTION={

}

function reducer(state={},{type,payload}){
	switch(type){

	}

	return state
}

const MyQili=compose(
	withProps(()=>({
		project: require("../package.json"),
		appId:"",//get from app.qili2.com
		reducers:{
			[DOMAIN]:reducer
		}
	})),
	withInit({
		query:graphql`
			query src_prefetch_Query{
				me{
					id
					token
				}
			}
		`,
		onSuccess(response,dispatch){
			const {me:{ token, id}}=response
			dispatch(qiliACTION.CURRENT_USER({id,token}))
			//@TODO: to initialize your qili
		},
		onError(error,dispatch){
			dispatch(qiliACTION.LOGOUT)
		}
	}),
)(QiliApp)

QiliApp.render(
    <MyQili>
        <Router history={hashHistory}>
            <Route path="/" component={({children})=><div>{children}</div>)}>

            </Route>
        </Router>
    </MyQili>
)
