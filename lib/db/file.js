var {Service}=require('./service')

export default class File extends Service.BuiltIn{
    static get _name(){
        return 'files'
	}

    static upload(url){
        return Promise.resolve(url)
    }
}
