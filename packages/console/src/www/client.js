import React from "react"
import render from "qili-app/www/client"
import routes from "./routes"

render(React.cloneElement(routes,{path:"/www"}), document.querySelector('#app'))