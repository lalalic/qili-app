import DB from "./data-service-websql"

export {default as DataService} from "./data-service"
export {default as Collection} from "./collection"
export {default as Cursor} from "./cursor"
export {default as Memory} from "./data-service-memory"
export {default as Websql} from "./data-service-websql"

let db=null

export default function supportOffline(mutableRecordSource, user, appID){
    if(typeof(mutableRecordSource.supportOffline)=="undefined"){
        mutableRecordSource.supportOffline=true
        db=new DB(appID)

        function createOrUpdateEntity({id, data}){
            if(!id)
                return Promise.resolve()
            const [cols, _id]=id.split(":")

            if(!_id)
                return Promise.resolve()

            return db.get1Entity(cols,{_id})
                .then(doc=>{
                    if(doc){
                        return db.patchEntity(cols, {_id}, data)
                    }else{
                        return db.createEntity(cols, {_id, ...data})
                    }
                })
                .catch(console.error)
        }

        function createReferer(id, refs){
            let [refName, _parentId]=id.split(":")
            if(refName=="users")
                refName="authors"
            refName=refName.substring(0, refName.length-1)

            if(!Array.isArray(refs)){
                refs=[refs]
            }

            return refs.map(ref=>createOrUpdateEntity({id:ref,[refName]:_parentId}))
        }



        const set=(dataID, record)=>{
            let hasData=false
            let data=Object.keys(record)
                .reduce((data,k,v)=>{
                    if(k=="_id" || k=="__typename"){

                    }else if(typeof(v=record[k])=="object" && (v._ref || v._refs)){
                        createReferer(dataID, v._ref||v._refs)
                    }else {
                        hasData=true
                        data[k]=v
                    }
                    return data
                },{})
            if(hasData)
                createOrUpdateEntity(data)
        }

        const remove=dataID=>{
            const [colName, _id]=dataID.split(":")
            return db.get1Entity(colName, {_id})
                .then(a=>!!a && db.remove1Entity(colName, {_id}))
        }

        const support=(key, fn)=>{
            let _fn=mutableRecordSource[key]
            mutableRecordSource[key]=function(){
                let r=_fn.apply(this,arguments)
                fn.apply(null,arguments)
                return r
            }
        }

        support("set", set)
        support("delete", remove)
        support("remove", remove)

    }

    return function(query, variables, root={}, context={app:db,user:db.get1Entity("users",user)}){

    }
}



export class Offline{

}
