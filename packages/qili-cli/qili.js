#!/usr/bin/env node
const prompts=require("prompts")
const chalk=require("chalk")
const fs=require("fs")
const path=require("path")
const cwd=process.cwd()
const AdminCloud=require("./admin")
AdminCloud.RC_NAME=".qilirc"
const { execSync } = require('child_process')
const {getRc, getProgram, project,tryRequireProject}=require(".")
const rc=getRc("qili")
const program=getProgram(rc, require("./package.json"))


try{
	const {config:{service,appId}}={config:{}, ...project}
	if(service){
		rc.service=service
	}
	if(appId){
		rc.appId=appId
	}
}catch(e){

}


function run(cmd, stdio="ignore"){
	execSync(cmd, {stdio})
}

function getQili(){
	return new AdminCloud(program.service, "qiliAdmin", program.appId)
		.getToken(rc)
}

program
	.usage('[options] <command>')
	.option('-a, --appId <appId>', 'application id', rc.appId)

program
	.command("init [dest]")
	.description("initialize this QiliApp project, default dest=.")
	.action(function(dest="."){
		dest=path.resolve(cwd,dest)
		const copy=require("ncp").ncp

		function mergePackageJson(read, write, name){
			try{
				let that=require("./generator/template/package.json")
				let merged={...project, ...that}
				merged.devDependencies={...project.devDependencies, ...that.devDependencies}
				if(program.appId){
					merged.config.appId=program.appId
				}

				if(program.service){
					merged.config.service=program.service
				}

				write.write(JSON.stringify(merged, null, 2))
				write.end()
			}catch(e){
				write.write(JSON.stringify(project, null, 2))
				write.end()
			}
		}

		copy(path.resolve(__dirname,"generator/template"), dest, {
				clobber:true,
				transform(read,write,{name}){
					name=path.basename(name)
					switch(name){
						case "package.json":
							mergePackageJson(read, write, name)
						break
						default:
							read.pipe(write)
					}

				}
			}, error=>{
			if(error)
				console.log(chalk.red(error.message))
		})
	})

program
	.command("persist <src> <dest>")
	.description("persist graphql to <dest>/persist-query.js")
	.action(function(src,dest="."){
		let schema=require("./persist")(src)
		fs.writeFileSync(
			path.resolve(dest,"persisted-query.js"),
`//generated from persisted-query.js, don't edit it
module.exports={
	${
		Object.keys(schema).map(k=>`"${k}":\`${schema[k].replace(/\n/g,"\n\t\t")}\``).join(',\n\t')
	}
}`,
			{encoding:"utf8"}
		)
		console.log(chalk.blue(`${dest}/persisted-query.js updated`))
	})

program
	.command('publish [codeFilePath]')
	.description("publish cloud code change to server, default codeFilePath=cloud/__generated.js")
	.option('-r, --relay-compile', "relay compile")
	.option('--no-relay-compile', "don't relay compile")
	.option('-p, --persist-query', "persist graphql query")
	.option('--no-persist-query', "don't persist graphql query")
	.option('-b, --build-cloud',"build cloud code")
	.option('--no-build-cloud',"don't build cloud code")
	.option('-f, --schema-file <schemaFile>', "schema file path,which will be updated after publish, default [schema.graphql]")
	.action(async function(codeFilePath="cloud/__generated.js", {
			relayCompile, persistQuery,buildCloud, schemaFile="schema.graphql"}){
		codeFilePath=path.resolve(cwd,codeFilePath)

		function build(){
			if(relayCompile){
				try{
					run("npm run relay","pipe")
					console.log(chalk.blue("relay compiled"))
				}catch(e){
					console.log(chalk.red("failed compiling relay"))
					console.log(chalk.red(e.message))
					console.log(chalk.yellow("ignore this eror and continue"))
				}
			}else{
				console.log(chalk.yellow("ignore relay compile"))
			}

			if(persistQuery){
				run("npm run persist")
				console.log(chalk.blue("graphql query persisted"))
			}else{
				console.log(chalk.yellow("ignore persit graph query"))
			}

			if(buildCloud){
				run("npm run cloud")
				console.log(chalk.blue("cloud code is ready"))
			}else{
				console.log(chalk.yellow("ignore build cloud code"))
			}
		}

		return
			new Promise((resolve,reject)=>{
				try{
					build()
					resolve()
				}catch(e){
					reject(e)
				}
			})
			.then(getQili)
			.publish(codeFilePath)
			.then(schema=>{
				fs.writeFileSync(path.resolve(cwd,schemaFile),schema,{encoding:"utf8"})
				let i=schema.indexOf("scalar AAError")
				if(i!=-1){
					let error=schema.substring(0,i-1)
					console.log("schema is updated with error: "+chalk.red(error))
				}else{
					console.log(`schema[${schemaFile}] is updated`)
				}
			})
			.catch(e=>{
				console.log(chalk.red(e.message))
				process.exit(1)
			})
	})

program
	.command('log')
	.description("application logs on server")
	.action(async function(cmd){
		return (await getQili())
			.log()
			.then(logs=>console.dir(logs))
			.catch(e=>{
				console.log(chalk.red(e.message))
			})
	})

program
	.command('dev [flag]')
	.description("set/unset this QiliApp development node, support true[default]|false")
	.action(async function(flag){
		return (await getQili())
			.dev(flag=="false" ? false : true)
			.catch(e=>{
				console.log(chalk.red(e.message))
			})
	})


program.parse(process.argv);
