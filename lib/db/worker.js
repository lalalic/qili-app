import init,{Service, User} from "."

var db;

module.exports=function(self){
    self.addEventListener('message', function(e){
        var {type,args}=e.data
        console.log(`work ${type}`)
        args=JSON.parse(args)
        switch(e.data.type){
        case 'init':
            init(...args)
            db=new Service().db
        break
        case 'addCollection':
            db.addCollection(args[0],()=>console.log(`add collection ${args[0]} to worker db`))
        break
        case 'user':
            User.setCurrent(args[0])
            if(!user)
                break;
            db.upload()
        break
        case 'upsert':
        case 'remove':
            db[args[0]].upload()
        }

        console.log(`work ${type} done`)
    })
}
