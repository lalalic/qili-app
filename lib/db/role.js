var {Service}=require('./service')

export default class Role extends Service{
    static init(db){
        Service.init(db,{url:this.getServer(this._name)})
    }
}
Object.defineProperties(Role,{
    _name:{value:'role'}
})
