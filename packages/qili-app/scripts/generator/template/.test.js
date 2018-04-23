import React from "react"
import project from "./package.json"
import {QiliApp, File} from "qili-app"

const _upload=File.upload
File.upload=function(){
	return _upload(...arguments).catch(a=>a).then(a=>"images/icon.svg")
}

project.homepage=`http://localhost:${project.config.devPort}`
