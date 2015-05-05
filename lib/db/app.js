var {Service}=require('./index');
var _apps,_current;
class Application extends Service{
    static all(){
        
    }
    static current(){

    }
    static init(db){
        Service.init(db)
        this.all()
    }
}
Application.name='apps'

exports=Application
