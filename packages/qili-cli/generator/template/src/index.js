import "./index.less"
import React from "react"
import {graphql} from "react-relay"
import {compose, withProps} from "recompose"

import {withInit, QiliApp, ACTION as qiliACTION} from "qili-app"
import project from "../package.json"

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
		project,
		appId:project.config.appId,//get from app.qili2.com
		reducers:{[DOMAIN]:reducer},
		//supportOffline:
		//tutorials:["",""]
		//adUrl:""
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

QiliApp.render(<MyQili>Hello Qili</MyQili>)
