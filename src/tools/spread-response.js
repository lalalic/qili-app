export function spreadResponse(res, spread, props){
	let values=res
	if(typeof(spread)=="function"){
		values=spread(res, props)
	}else if(typeof(spread)=="string"){
		values=res[spread]
	}else if(spread!==false){
		let keys=Object.keys(res)
		if(keys.length==1){
			let v=res[keys[0]]
			if(typeof(v)=="object"){
				values=v		
			}
		}
	}
	return values
}

export default spreadResponse