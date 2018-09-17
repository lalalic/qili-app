export const DOMAIN="qili"

export const ACTION={
	CHECK_VERSION:(homepage,currentVersion)=>dispatch=>{
		fetch(`${homepage}/app.apk.version`)
			.then(res=>res.text())
			.then(version=>dispatch({type:`@@${DOMAIN}/LASTEST_VERSION`, payload:ver}))
			.catch(e=>e)
	},
	CURRENT_USER:user=>({
        type:`@@${DOMAIN}/USER_CHANGED`
		,payload:user
	}),
	TUTORIALIZED:({type:`@@${DOMAIN}/TUTORIALIZED`}),
	LOGOUT:({type:`@@${DOMAIN}/LOGOUT`}),
	LOADING: payload=>({type:`@@${DOMAIN}/LOADING`,payload}),
	MESSAGE: payload=>({
		type:`@@${DOMAIN}/MESSAGE`,
		payload: typeof(payload)=="string" ? {message:payload}:payload
	}),
	AD_DONE: ({type:`@@${DOMAIN}/ADDONE`}),
	READY:({type:`@@${DOMAIN}/INITED`}),
	REPORT: report=>({type:`@@${DOMAIN}/OPTICS`,payload:report}),
	ONLINE: ()=>({type:`@@${DOMAIN}/ONLINE`}),
	OFFLINE: ()=>({type:`@@${DOMAIN}/OFFLINE`}),
}

export const REDUCER=(state={networkStatus:"online"},{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/OPTICS`:
		return {...state, optics:{toJSON:()=>undefined,...payload}}
	case `@@${DOMAIN}/INITED`:
		return {...state, inited:true}
	case `@@${DOMAIN}/ADDONE`:
		return {...state, AD:true}
	case `@@${DOMAIN}/USER_CHANGED`:
		return {...state,user:payload}
	case `@@${DOMAIN}/TUTORIALIZED`:
		return {...state,tutorialized:true}
	case `@@${DOMAIN}/LOGOUT`:
		return {...state, user:{...state.user, token:undefined}}
	case `@@${DOMAIN}/LASTEST_VERSION`:
		return {...state,latestVersion:payload}
	case `@@${DOMAIN}/LOADING`:
		return {...state,loading:!!payload}
	case `@@${DOMAIN}/MESSAGE`:
		return {...state, message:payload}
	case `@@${DOMAIN}/OFFLINE`:
		return {...state, networkStatus:"offline"}
	case `@@${DOMAIN}/ONLINE`:
		return {...state, networkStatus:"online"}
	}

	return state
}
