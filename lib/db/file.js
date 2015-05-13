var {Service}=require('./service')

export default class File extends Service{
    static get _name(){
        return 'files'
	}
}
