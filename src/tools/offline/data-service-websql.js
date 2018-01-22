import DataService from "./data-service"

export default class extends DataService{
    constructor(id){
        super(...arguments)
        this.db=window.openDatabase(id,"1.0",id,5*1024*1024)
        this.db.transaction(tx=>tx.executeSql(
            `create table  if not exists docs(
                col TEXT NOT NULL,
                id TEXT NOT NULL,
                state TEXT NOT NULL,
                doc TEXT,
                PRIMARY KEY (col, id)
            )`,
			[], 
			null,
            (tx, error)=>console.error(error)))
    }

    collection(cols){
        return this.findEntity(cols)
    }

    createEntity(cols,{_id, ...doc}){
        _id=_id||this.makeId()
        const data={_id, ...doc}
		return new Promise((resolve, reject)=>{
                this.db.transaction(tx=>tx.executeSql(
                    `insert or replace into docs(col,id,doc,state) values(?, ?, ?, ?)`,
                    [cols, _id, JSON.stringify(data), "upserted"],
                    ()=>resolve(data),
                    (tx,e)=>reject(e)
                ))
            })
    }

    updateEntity(cols,query,doc){
        let {_id}=this.get1Entity(cols,query)
        let updatedAt=new Date()
        const data={...doc, _id, updatedAt}
        return new Promise((resolve, reject)=>this.db.transaction(tx=>tx.executeSql(
                `replace into docs(col, id, doc,state) values(?,?,?,?)`,
                [cols, _id, JSON.stringify(data),"upserted"],
                ()=>resolve(updatedAt),
                (tx,e)=>reject(e))))
    }

    patchEntity(cols,query,patch){
        let {_id, ...raw}=this.get1Entity(cols,query)
        let updatedAt=new Date()
        const data={...raw, ...patch, _id, updatedAt}
        return new Promise((resolve, reject)=>this.db.transaction(tx=>tx.executeSql(
                `replace into docs(col, id, doc,state) values(?,?,?,?)`,
                [cols, _id, JSON.stringify(data),"upserted"],
                ()=>resolve(updatedAt),
                (tx,e)=>reject(e))))
    }

    remove1Entity(cols,query){
        let {_id,...raw}=this.get1Entity(cols,query)
        const data={_id,...raw}
        return new Promise((resolve,reject)=>this.db.transaction(tx=>tx.executeSql(
                `delete from docs where col=? and id=?`,
                [cols, _id],
                resolve,
                (tx,e)=>reject(e))))
    }

    get1Entity(cols,{_id, ...query}){
        if(_id){
            return new Promise((resolve,reject)=>this.db.transaction(tx=>tx.executeSql(
                    `select doc from docs where col=? and id=?`,
                    [cols, _id],
                    (tx,{rows})=>{
                        resolve(rows.length>0 ? JSON.parse(rows[0].doc) : undefined)
                    },
                    (tx,e)=>reject(e))))
        }else{
            return this.findEntity(cols, query).then(docs=>docs[0])
        }
    }

    findEntity(cols,query={},filter=cursor=>cursor){
        return new Promise((resolve, reject)=>this.db.transaction(tx=>tx.executeSql(
                `select doc from docs where col=?`,
                [cols],
                (tx, {rows})=>{
                        let filtered=[]
                        for(let i=0;i<rows.length;i++){
                            let doc=JSON.parse(rows[i].doc)
                            if(Object.keys(query)
                                .reduce((state,k)=>doc[k]===query[k]&&state,true))
                                filtered.push(doc)
                        }
                    resolve(filtered)
                },
                (tx,e)=>reject(e))))
    }
}
