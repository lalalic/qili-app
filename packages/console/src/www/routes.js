import React from "react"
import {Route, IndexRoute} from "react-router"
import {withQuery} from "qili-app/graphql"

export default (
    <Route path="/">
        <IndexRoute component={
            withQuery({
                variables:{},
                query:graphql`query routes_apps_Query($name: String) {
                    anonymous_apps(name: $name) {
                        id
                        name
                        uname
                    }
                  }
                  `
            })
            (({data})=>{
                function hello(){
                    alert("hello")
                }
                return (<div onClick={hello}>{data.anonymous_apps.map(a=>a.name).join(",")}</div>)
            })
        }/>
    </Route>
)