function tryRequireProject(a){
	try{
		return require(a)
	}catch(e){
		return {config:{}}
	}
}

const program = require('commander')
const path=require("path")
const cwd=process.cwd()

const project=exports.project=tryRequireProject(path.resolve(cwd, "package.json"))

exports.Cloud=require("./cloud")

exports.getRc=function(name){
    return require("rc")(name,{service:"http://qili2.com/1/graphql"})
}

exports.getProgram=function(rc){
    return program
    	.version(project.version, '-v, --version')
        .description(project.description)
    	.option('-s, --service <endpoint>', 'server endpoint', rc.service)
}
