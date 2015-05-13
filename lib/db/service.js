var Promise=require('apromise'),
    _httpclient,
    _server,
    _db;

export class Service{
    constructor(){
        this.db=_db
        this.cols=this.prototype.constructor.cols
    }
    static ajax(o){
        var {context, method,url,params,data, _success, _error}=o,
            p=new Promise();
        function success(r){
            p.resolve(_success && _success.apply(context,arguments) || r);
        }

        function error(r,status){
            p.reject(_error && _error.apply(context, arguments) || new Error(r))
        }

        _httpclient(method, url, params, data, success, error)
        return p
    }

    static get server(){
        return _server
    }

    static init(db,opt, httpclient,server){
        db && (_db=db);
        httpclient && (_httpclient=httpclient);
        server && (_server=server);
        if(this._name){
            db.addCollection(this._name,opt)
            this.cols=db[this._name]
        }
    }
    static super(f){
        return this.__proto__[f].bind(this)
    }
}
