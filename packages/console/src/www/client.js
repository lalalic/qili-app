import React from "react"
import {hydrate} from "react-dom"
import routes from "./routes"

hydrate(routes, document.querySelector("#app"))
