var {Service}=require('./service'),
    User=require('./user'),
    Promise=require('apromise');

var _apps,_current;

export default class Application extends Service{
    static init(db){
        this.super('init')(db,{url:this.server+this._name})
        if(!User.current)
            return Promise.as()

        var p=new Promise()
        this.cols.find().fetch(function(apps){
            _apps=apps
            _current=_apps[0]
            p.resolve(_apps)
        },function(e){
            p.reject(e.getMessage())
        })
        return p
    }
    static get _name(){
        return 'apps'
    }
    static get all(){
        return _apps
    }
    static get current(){
        return _current
    }
    static set current(v){
        return _current=v
    }
}
