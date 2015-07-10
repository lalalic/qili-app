var {Service}=require('./service'),
    Promise=require('apromise');

export default class File extends Service{
    static get _name(){
        return 'files'
	}
    
    static upload(url){
        return Promise.as(url)
    }
}
