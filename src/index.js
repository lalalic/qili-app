export {init,Model,User,Role,File,Log} from "./db"
export {QiliApp} from "./qiliApp"

import Account from "./components/account"
import Empty from "./components/empty"
import Loading from "./components/loading"
import Comment from "./components/comment"
import CommandBar  from "./components/command-bar"
import Photo  from "./components/photo"
import Messager  from "./components/messager"
import fileSelector  from "./components/file-selector"
import {combineReducers} from "redux"
import Setting from "./setting"
import Profile from "./user-profile"
import TextFieldx from "./components/text-field"


export const UI={
    Empty
    ,Loading
    ,Comment
    ,CommandBar
    ,Photo
    ,Messager
	,fileSelector
	,Account
    ,Setting
    ,Profile
    ,TextFieldx
}
export const compact=(o,...keys)=>o ? keys.reduce((a,k)=>(a[k]=o[k],a),{}) : {}

export function enhancedCombineReducers(...reducers){
	const combineArrayReducer=reducers=>(state,action)=>reducers.reduce((state,next)=>{
        return next(state,action)
    }, state)

	const functions=reducers.slice(1).reduce((combined,a)=>{
        const lastTrunk=combined[combined.length-1]
        const type=typeof(lastTrunk[0])
        if(type!=typeof(a)){
            combined.push([a])
        }else{
            lastTrunk.push(a)
        }
        return combined
    },[[reducers[0]]]).map(a=>{
        if(typeof(a[0])=='object'){
			//merge {ui:a},{ui,b} ==> {ui: [a,b]}
			return combineReducers(
				a.reduce((combined,b)=>{
					return Object.assign(
						combined,
						b,
						Object.keys(combined).reduce((withSameKeyReducers,key)=>{//merge with same key
							if(b.hasOwnProperty(key)){
								withSameKeyReducers[key]=combineArrayReducer([combined[key],b[key]])
							}
							return withSameKeyReducers
						},{})
					)
				},{})
			)
        }else{
            return combineArrayReducer(a)
        }
    })
    return combineArrayReducer(functions)
}

export function ENTITIES(data){
	return {type:'NORMALIZED_DATA', payload:data}
}

export function REMOVE_ENTITIES(type, ...ids){
    return {type:'NORMALIZED_DATA', payload:{[type]:{$remove:ids}}}
}

;(function(_raw){
    var r=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):((\d{2})(?:\.(\d*))?)Z$/,ds
    JSON.parse=(a,reviver)=>{
        return _raw.call(JSON,a,(k,v)=>{
            if(typeof(v)=='string' && v[v.length-1]=='Z' && v[10]=='T' && (ds=r.exec(v))){
                return new Date(Date.UTC(+ds[1], +ds[2] - 1, +ds[3], +ds[4],  +ds[5], +ds[7], +ds[8]));
			}
            return reviver ? reviver(k,v) : v
        })
    }
})(JSON.parse);

Object.assign(Date.prototype,{
	toDate(){
		let d=new Date(this.getTime())
		d.setHours(0,0,0,0)
		return d
	},
	isSameDate(d){
		return this.relative(d)==0
	},
	relative(d){
		return Math.floor((this.toDate().getTime()-d.toDate().getTime())/(24*60*60*1000))
	},
	relativeDate(days){
		return new Date(this.getTime()+24*60*60*1000*days)
	},
	isFuture(){
		return this.relative(new Date())>0
	},
	format(tmpl="y-M-d"){
		let value={
			y:this.getFullYear(),
			M:this.getMonth()+1,
			d:this.getDate(),
			h:this.getHours(),
			m:this.getMinutes(),
			s:this.getSeconds()
		}
		return tmpl.replace(/([ymdhs])+/ig, function(match,type){
			return value[type!='M' ? type.toLowerCase() : type] || ""
		})
	},
	smartFormat(reToday="今天 HH:mm", reThisYear="MM月DD日", reYearsAgo="YYYY年MM月DD日"){
		let now=new Date()
		return this.format(this.isSameDate(now) ? reToday :
							this.getFullYear()==now.getFullYear() ? reThisYear : reYearsAgo)
	},
	getWeek(){
		var date = new Date(this.getTime())
		date.setHours(0, 0, 0, 0);
		// Thursday in current week decides the year.
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		// January 4 is always in week 1.
		var week1 = new Date(date.getFullYear(), 0, 4);
		// Adjust to Thursday in week 1 and count number of weeks from date to week1.
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
						- 3 + (week1.getDay() + 6) % 7) / 7);
	}
})
