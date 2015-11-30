var _httpclient,
    _server,
    _db,
    __localStorage;

export class Service{
    constructor(){
        this.db=_db
        this.cols=Service.cols
    }

    static upsert(docs,...others){
        (Array.isArray(docs) ? docs : [docs]).forEach((doc)=>{
            if(!doc._id){
                let user=require('./user').current
                doc.author={_id:user._id, username:user.username}
                doc.createdAt=docs.updatedAt=new Date()
            }else {
                doc.updatedAt=new Date()
            }
        })

        return this.cols.upsert(docs, ...others)
    }

    static remove(id, success,error){
        if(!error)
            error=()=>0
        return this.cols.remove(id, success, error)
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

    static isWorker(){
        return typeof(document)=='undefined'
    }
}

class BuiltIn extends Service{
    static init(){
        Service.init.call(this,{url:this.server+this._name,interim:false})
    }
}

Service.BuiltIn=BuiltIn
