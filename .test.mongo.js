import React from "react"
import project from "qili-app-console/package.json"
import {QiliApp, File} from "qili-app"

project.homepage=`http://localhost:9081`

const _upload=File.upload
File.upload=function(data,host){
	return Promise.resolve({url:`${project.homepage}/images/splash.svg`,_id:`tests:${Date.now()}`})
}



const _render=QiliApp.render
QiliApp.render=function(app){
	_render(React.cloneElement(app, {
		service:`http://localhost:9080/1/graphql`,
		isDev:true
	}))
}
