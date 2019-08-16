import React from "react"
import {Route, IndexRoute} from "react-router"

export default (
    <Route path="/">
        <IndexRoute component={()=><div>hello</div>}/>
    </Route>
)