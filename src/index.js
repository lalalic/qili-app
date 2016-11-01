import 'babel-polyfill'

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

export const UI={
    Empty
    ,Loading
    ,Comment
    ,CommandBar
    ,Photo
    ,Messager
	,fileSelector
	,Account
}

;(function(_raw){
    var r=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/,ds
    JSON.parse=(a,reviver)=>{
        return _raw.call(JSON,a,(k,v)=>{
            if(typeof(v)=='string' && v[v.length-1]=='Z' && v[10]=='T' && (ds=r.exec(v)))
                return new Date(Date.UTC(+ds[1], +ds[2] - 1, +ds[3], +ds[4],  +ds[5], +ds[6]));
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
	}
})
