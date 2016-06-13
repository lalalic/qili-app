var Model=require(".").Model;

Model.on('upserted', (doc, base, error,Service)=>{
    Service.cols.upload(()=>console.info(`remote ${Service._name} updated`),(e)=>console.error(e.message))
})

Model.on('removed',(id, error,Service)=>{
    Service.cols.upload(()=>console.info(`remote ${Service._name} removed`),(e)=>console.error(e.message))
})

Model.on('inited',function(Service){
    new Service().db.upload(()=>console.log('synced to server'),(e)=>console.error(`synced error: ${e.message}`))
})

/*


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
*/