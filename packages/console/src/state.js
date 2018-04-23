export const ACTION={
	CURRENT_APP: payload=>({
		type:`console/CURRENT_APP`,
		payload,
	})
}

export const reducer=(state={},{type,payload})=>{
	switch(type){
	case `console/CURRENT_APP`:
		return {...state, current:payload}
	}
	return state
}