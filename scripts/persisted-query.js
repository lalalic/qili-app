#!/usr/bin/env node
const fs =require('fs')
const path =require('path')
const GENERATED="__generated__"

const [src="src", dest="."]=process.argv.slice(2)

const collect=root=>{
	try{
		return fs.readdirSync(root)
			.reduce((found,a)=>{
				let current=path.join(root,a)
				if(a===GENERATED){
					found.push(current)
				}else if(fs.statSync(current).isDirectory()){
					found.splice(found.length-1,0,...collect(current))
				}
				return found
			},[])
	}catch(e){
		console.warn(`ignored error: ${e.message}`)
		return []
	}
}

const schema=src.split(",").filter(a=>a)
	.reduce((found,a)=>[...found,...collect(path.resolve(a))],[])
	.reduce((schema,root)=>{
		fs.readdirSync(root)
			.forEach(file=>{
				file=path.join(root,file)
				const {kind,text,name}=require(file)
				if(kind=="Batch"){
					if(schema[name]){
						console.error(`operation[${name}] already exists in ${file}`)
					}
					schema[name]=text
				}
			})
		return schema
	},{})
	
fs.writeFileSync(
	path.join(path.resolve(dest),"persisted-query.js"),
`//generated from persisted-query.js, don't edit it	
module.exports=${JSON.stringify(schema,null,4)}`,
	{encoding:"utf8"}
)