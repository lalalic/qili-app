const chalk=require("chalk")
const fs=require("fs")

const Cloud=exports.Cloud=require("./cloud")
const tryRequireProject=exports.tryRequireProject=function (a){
	try{
		return require(a)
	}catch(e){
		return {config:{}}
	}
}

exports.getInstance=function(MyCloud, {version,name, description=name}){
	const NAME=MyCloud.NAME
	console.assert(NAME,"Cloud must have a name")
	const program = require('commander')
	const path=require("path")
	const cwd=process.cwd()

	const project=tryRequireProject(path.resolve(cwd, "package.json"))

	const rc=(function getRc(name){
		let rc=require("rc")(name,{})
		try{
			const {config:{service,appId}}={config:{}, ...project}
			if(service && !rc.service){
				rc.service=service
			}
			if(appId && !rc.appId){
				rc.appId=appId
			}
		}catch(e){

		}
		return rc
	})(NAME);

	if(!!!rc.verbose){
		console.trace=console.debug=()=>{}
	}

	(function getProgram(){
		program
			.version(version, '-v, --version')
			.description(description)
			.option('-s, --service <endpoint>', 'server endpoint', rc.service)
			.option('--token <token>','token')
			.option('--contact <contact>','account contact')
			.option("--verbose", !!rc.verbose)

		program
			.command("setting")
			.description("get current command settings")
			.option('--clear','clear ',false)
			.action(function({clear}){
				if(clear){
					return Promise.all((rc.configs||[]).map(a=>new Promise((resolve,reject)=>fs.unlink(a, e=>e?reject(a):resolve(a)))))
						.catch(es=>{
							console.log(chalk.red("the following config can't be removed"))
							es.forEach(a=>console.log(" - "+a))
						})
				}else{
					console.dir(rc)
				}
			})

		return program
	})(rc);

	return {
		rc, program, project, tryRequireProject,
		getCloud(){
			return new MyCloud(program.service, ...arguments)
				.getToken(rc)
				.then(cloud=>{
					console.log(`initialized [AppID=${chalk.blue(cloud.xApplicationID)}][rc=${MyCloud.NAME}]`)
					return cloud
				})
		}
	}
}
