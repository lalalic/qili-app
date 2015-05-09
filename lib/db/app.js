var {Service}=require('./service')
var User=require('./user')

var _apps,_current;

export default class Application extends Service{
    static init(db){
        Service.init(db,{url:this.getServer(this.name)})
        if(!User.current)
            return require('apromise').as()
        return this.ajax({
            url:this.getServer()+'app'
        }).then(function(apps){
            _apps=apps
            _current=apps[0]
            return apps
        })
    }
}

Object.defineProperties(Application, {
    all:{
        get(){
            return _apps
        }
    },
    current:{
        get(){
            return _current
        },
        set(v){
            return _current=v
        }
    },
    _name:{value:'app'}
})
