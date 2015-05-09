export class Service{
    constructor(){
        this.db=Service.db
        this.cols=this.prototype.constructor.cols
    }
    static init(db,opt, httpclient,server){
        this.db=db
        if(this._name){
            db.addCollection(this._name,opt)
            this.cols=db[this._name]
        }
        if(httpclient){
            this.ajax=function(o){
                var {context, method,url,params,data, _success, _error}=o,
                    p=new Promise();
                success=function(r){
                    p.resolve(_success && _success.apply(context,arguments) || r);
                }
                error=function(r,status){
                    p.reject(_error && _error.apply(context, arguments) || new Error(r))
                }

                httpclient(method, url, params, data, success, error)
                return p
            }
        }
        if(server){
            this.getServer=function(name){
                return server+name||''
            }
        }
    }
}
