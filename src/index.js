import 'babel-polyfill'

export {init,Model,User,Role,File,Log} from "./db"
export {QiliApp} from "./qiliApp"
export const UI={
    Empty:require('./components/empty'),
    Loading:require('./components/loading'),
    Comment:require('./components/comment'),
    CommandBar: require('./components/command-bar'),
    Photo: require('./components/photo'),
    Messager: require('./components/messager'),
	fileSelector: require('./components/file-selector'),
	Account: require("./components/account")
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

Date.prototype.toString=function(){
    var h=this.getHours(),m=this.getMinutes(),
        time=h||m ? ` ${h}:${m}` :''
    return `${this.getFullYear()}-${this.getMonth()+1}-${this.getDate()}${time}`
}
