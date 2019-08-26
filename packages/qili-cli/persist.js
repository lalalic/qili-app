module.exports=function persist(src,dest){
	const fs =require('fs')
	const path =require('path')
	const GENERATED="__generated__"
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

	return src.split(",").filter(a=>a)
		.reduce((found,a)=>[...found,...collect(path.resolve(a))],[])
		.reduce((schema,root)=>{
			fs.readdirSync(root)
				.forEach(file=>{
					file=path.join(root,file)
					const {kind,params:{text,name}={}}=require(file)
					if(kind!=="Fragment"){
						if(schema[name]){
							console.error(`operation[${name}] already exists in ${file}`)
						}
						schema[name]=text
					}
				})
			return schema
		},{})
}
