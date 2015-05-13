var {Service}=require('./service')

export default class Log extends Service{
    static get _name(){
        return 'logs'
	}
}
