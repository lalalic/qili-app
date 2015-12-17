import {EventEmitter} from 'events'

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

    //local -> remote
    static upsert(doc,base, success, error){

        return this.xupsert(...arguments)

        if(typeof(base)=='function'){
            error=success
            success=base
            base=null
        }

        ;((a)=>{
            if(!a._id){
                let user=require('./user').current
                a.author={_id:user._id, username:user.username}
                a.createdAt=a.updatedAt=new Date()
            }else {
                a.updatedAt=new Date()
            }
        })(doc);

        return this.cols.upsert(doc, base, function(updated){//only local upserted
            success && success(updated);
            this.emit('upserted',updated, base, error)
        }.bind(this), error)
    }

    //remote -> local
    static xupsert(doc, base, success, error){
        if(Array.isArray(doc))
            throw new Error('remote upsert does not support array')
        if(typeof(base)=='function'){
            error=success
            success=base
            base=null
        }

        return this.cols.remoteCol.upsert(doc,base,(a)=>{
            this.cols.localCol.cacheOne(Object.assign(doc,a),success, error)
        },error)
    }

    static remove(id, success,error){
        if(!error)//must since cols.remove must need it
            error=()=>0
        if(typeof(id)=='object')
            id=id._id
        return this.cols.remove(id, function(){
            success && success(id)
            this.emit('removed', id, error)
        }.bind(this), error)
    }

    static xremove(id,success,error){
        if(!error)//must since cols.remove must need it
            error=()=>0
        if(typeof(id)=='object')
            id=id._id
        return this.cols.remoteCol.remove(id, ()=>{
            this.cols.localCol.resolveRemove(id, success,error)
        }, error)
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
            _db.addCollection(this._name,opt)
            this._cols=_db[this._name]
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
}

class BuiltIn extends Service{
    static init(){
        Service.init.call(this,{url:this.server+this._name,interim:false})
    }
}

Service.BuiltIn=BuiltIn
