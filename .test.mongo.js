import React from "react"
import project from "./package.json"
import Qili from "./src"
import File from "./src/components/file"

const _upload=File.upload
File.upload=function(){
	return _upload(...arguments).catch(a=>a).then(a=>"images/icon.svg")
}

const host=window.host||'localhost';
project.homepage=`http://${host}:9082`

const _render=Qili.render
Qili.render=function(app){
	_render(React.cloneElement(app, {
		service:`http://${host}:9080/1/graphql`,
		isDev:true
	}))
}
