const program = require('commander')
const path=require("path")
const cwd=process.cwd()

function tryRequireProject(a){
	try{
		return require(a)
	}catch(e){
		return {config:{}}
	}
}

const project=tryRequireProject(path.resolve(cwd, "package.json"))

exports.getRc=function(name){
    return require("rc")(name,{service:"http://qili2.com/1/graphql"})
}

exports.getProgram=function(rc, project){
    program
    	.version(project.version, '-v, --version')
        .description(project.description)
    	.option('-s, --service <endpoint>', 'server endpoint', rc.service)
		.option('--token <token>','qili2 token')
		.option('--contact <contact>','qili2 account contact')

	program
		.command("info")
		.description("get current command settings")
		.action(function(){
			console.dir(rc)
		})

	return program
}

exports.tryRequireProject=tryRequireProject
exports.project=project

exports.Cloud=require("./cloud")
