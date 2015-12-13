var Model=require(".").Model;

Model.on('upserted', (docs, bases, error,Service)=>{
    Service.cols.remoteCol.upsert(docs,bases,(doc)=>{
        var local=Service.cols.localCol,
            name=local.name
        local.db.transaction((tx)=>{
            tx.executeSql('update cols set doc=? and state=? where col=? and id=? and state=?',
                [JSON.stringify(doc),'cached',name, doc._id,'upserted'],
                ()=>1,
                (e)=>console.error(e.message)
            )
        })
        console.info(`remote ${name} updated`)
    })
    Service.xupsert(docs,bases,()=>console.log(`${Service._name} upserted to server`))
})

Model.on('removed',(id, error,Service)=>{
    Service.xremove(id,()=>console.log(`${Service._name}(${id}) removed`))
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
