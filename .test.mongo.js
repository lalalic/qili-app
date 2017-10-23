import React from "react"
import project from "./package.json"
import QiliApp from "./src"

project.homepage="http://localhost:9082"

const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJyb290IiwidXNlcm5hbWUiOiJyb290MSIsImlhdCI6MTUwNTkyMjkwMiwiZXhwIjoxNTM3NDgwNTAyfQ.g8kZP6BCiL7eoZaTCawxpHabp9objwxxTlVjGE8bg28"
const _render=QiliApp.render
QiliApp.render=function(app){
	_render(React.cloneElement(app, {
		service: "http://localhost:9080/1/graphql",
		user:{token},
		isDev:false
	}))
}

require("./src/main")
