import {EventEmitter} from 'events'
import {Schema} from "normalizr"

var _httpclient,
    _server,
    _db,
    __localStorage,
    __emitter=new EventEmitter();

export class Service {
    constructor(){
        this.db=_db
        this.cols=Service.cols
    }

    static upsert(doc,base, success, error){
        return this.cols.upsert(...arguments)
            .then(function(updated){
                this.emit('upserted',updated,base, error)
                return updated
            }.bind(this))
    }

    static remove(id, success,error){
        if(typeof(id)=='object')
            throw new Error(`id should be string, instead of object when removing`)

        return this.cols.remove(id, success, error)
            .then(function(){
                this.emit('removed', id, error)
            }.bind(this))
    }

    static find(){
        return this.cols.find(...arguments)
    }

    static findOne(){
        return this.cols.findOne(...arguments)
    }

    static ajax(o){
        return new Promise((resolve, reject)=>{
            var {context, method,url,params,data, _success, _error,_apiKey, _sessionToken}=o

            function success(r){
                resolve(_success && _success.apply(context,arguments) || r);
            }

            function error(r,status){
                reject(_error && _error.apply(context, arguments) || new Error(r))
            }

            _httpclient(method, url, params, data, success, error, _apiKey, _sessionToken)
        })
    }

    static get server(){
        return _server
    }

    static httpclient(){
        return _httpclient.apply(this, arguments)
    }

    static init(opt, db, httpclient,server, tempStorage){
        if(db){
            _db=db
            __localStorage=tempStorage
            httpclient && (_httpclient=httpclient);
            server && (_server=server);
        }

        if(this._name){
            if(opt===true){//local only
                _db.localDb.addCollection(this._name)
                this._cols=_db.localDb[this._name]
				this._localOnly=true
            }else{
                _db.addCollection(this._name,opt)
                this._cols=_db[this._name]
            }
			this._schema=new Schema(this._name, {idAttribute:"_id"})
        }
    }

    static get cols(){
        if(this._cols)
            return this._cols;
        if(this._name){
            _db.addCollection(this._name)
            this._cols=_db[this._name]
        }
        return this._cols
    }
	
	static get Schema(){
		return this._schema
	}

    static super(f){
        return this.__proto__[f].bind(this)
    }

    static get localStorage(){
        return __localStorage
    }

    static emit(type, ...others){
        __emitter.emit(`${this._name}.${type}`,...others,this)
        __emitter.emit(type,...others,this)
    }

    static on(type,...others){
        __emitter.on(`${this._name ? this._name+'.' :''}${type}`,...others)
    }

    static removeListener(type, ...others){
        __emitter.removeListener(`${this._name ? this._name+'.' :''}${type}`,...others)
    }
}

class BuiltIn extends Service{
    static init(){
        Service.init.call(this,{url:this.server+this._name,interim:false})
    }
}

Service.BuiltIn=BuiltIn
