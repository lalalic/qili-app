import React from "react"
import {hydrate,render} from "react-dom"
import {browserHistory, match,Router} from "react-router"
import withGraphql from "../graphql/relay/withGraphqlClient"

export default (routes,container,environment={},App=React.Fragment,history=browserHistory)=>{
    const Context=withGraphql({...environment})(Router)
    match({history, routes}, (error, redirect, props) => {
        debugger
        if(props){
            const element=<App><Context {...props}/></App>
            if(!props.routes.find(a=>a.onlyBrowser)){
                hydrate(element, container)
            }else{
                render(element, container)
            }
        }
    })
}