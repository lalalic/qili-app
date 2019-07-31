let _uuid=Date.now()
export default class{
    makeId(){
        return `${_uuid++}`
    }

    getDataLoader(type,f){
        const load=_id=>this.get1Entity(type,{_id})
        return {
            load
        }
    }

    collection(...names){

    }

    createEntity(Type,doc){

    }

    updateEntity(Type,query,doc){

    }

    patchEntity(Type,query,patch){

    }

    remove1Entity(Type,query){

    }

    get1Entity(Type,query){

    }

    findEntity(Type,query,filter=cursor=>cursor){

    }

    nextPage(Type, {first, after}, filter){
        return this.findEntity(Type, {}, filter)
    }

    prevPage(Type, {last, before},filter){
        return this.findEntity(Type, {}, filter)
    }
}
