var {Service}=require('./service')

export default class Role extends Service{
    static init(db){
        this.super('init')(db,{url:this.server+this._name})
    }
    static get _name(){
        return 'roles'
    }
}
