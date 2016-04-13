var {Service}=require('./service')

export default class Role extends Service.BuiltIn{
    static get _name(){
        return 'roles'
    }
}
