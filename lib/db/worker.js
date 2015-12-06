var Model=qiliDB.Model;

Model.on('upserted', (docs, bases, error,Service)=>{
    service.cols.remoteCol.upsert(docs, bases, ()=>console.log(`${Service._name} upserted to server`), error)
})

Model.on('removed',(id, error,Service)=>{
    service.cols.remoteCol.remove(id,()=>console.log(`${Service._name}(${id}) removed`),error)
})

Model.on('inited',function(Service){
    new Service().db.upload()
})




module.exports=function(self){
    self.addEventListener('message', function(e){
        var {type,args}=e.data
        console.log(`work ${type}`)
        if(type!='init' && !db){
            console.error(`db has not be ready for ${type}`)
            return
        }
        args=JSON.parse(args)
        try{
            switch(type){
            case 'init':
                init(args[0], args[1])
                db=new Service().db
            break
            case 'addCollection':
                db.addCollection(args[0],()=>console.log(`add collection ${args[0]} to worker db`))
            break
            case 'user':
                let user=args[0]
                User.setCurrent(args[0])
                if(!user)
                    break;
                db.upload(()=>console.log("backend updated"),
                    (e)=>console.error(`backend updating with error:e.message`))
            break
            case 'upsert':
            case 'remove':
                db[args[0]].upload()
            }
            console.log(`work ${type} done`)
        }catch(e){
            console.error(`webworker error: ${e.message}`)
            self.postMessage({type:'error',error: e.message})
        }
    })
}
