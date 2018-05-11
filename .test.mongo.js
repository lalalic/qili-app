import React from "react"
import project from "qili-app-console/package.json"
import {QiliApp, File} from "qili-app"

const _upload=File.upload
File.upload=function(data,host){
	return Promise.resolve({url:"images/icon.svg",id:`tests:${Date.now()}`})
}

project.homepage=`http://localhost:9081`

const _render=QiliApp.render
QiliApp.render=function(app){
	_render(React.cloneElement(app, {
		service:`http://localhost:9080/1/graphql`,
		isDev:false
	}))
}
