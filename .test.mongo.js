import React from "react"
import project from "qili-app-console/package.json"
import {QiliApp, File} from "qili-app"

const _upload=File.upload
File.upload=function(){
	return _upload(...arguments).catch(a=>a).then(a=>"images/icon.svg")
}

project.homepage=`http://localhost:9081`

const _render=QiliApp.render
QiliApp.render=function(app){
	_render(React.cloneElement(app, {
		service:`http://localhost:9080/1/graphql`,
		isDev:false
	}))
}
