const path=require("path")
const copy=require("ncp").ncp
const project=require(path.resolve(process.cwd(),"package.json"))

function mergePackageJson(read, write, name){
	try{
		const that=require("./template/package.json")
		let merged={...project, ...that}
		write.write(JSON.stringify(merged, null, 2))
		write.end()
	}catch(e){
		write.write(JSON.stringify(project, null, 2))
		write.end()
	}
}

new Promise((resolve, reject)=>{
	copy(path.resolve(__dirname,"template"), process.cwd(), {
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
			reject(error)
		else
			resolve()
	})
}).catch(e=>{
	console.error(e)
})