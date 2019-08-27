import React from "react"
import {hydrate,render} from "react-dom"
import {browserHistory, match,Router} from "react-router"
import withGraphql from "../graphql/relay/withGraphqlClient"

export default (routes,container,history=browserHistory)=>{
    const Context=withGraphql()(Router)
    match({history, routes}, (error, redirect, props) => {
        if(props && !props.routes.find(a=>a.onlyBrowser)){
            hydrate(<Context {...props}/>, container)
        }else if(props){
            render(<Context {...props} />, container)
        }
    })
}