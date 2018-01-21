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

    createEntity(cols,doc){

    }

    updateEntity(cols,query,doc){

    }

    patchEntity(cols,query,patch){

    }

    remove1Entity(cols,query){

    }

    get1Entity(cols,query){

    }

    findEntity(cols,query,filter=cursor=>cursor){

    }

    nextPage(cols, {first, after}, filter){
        return this.findEntity(cols, {}, filter)
    }

    prevPage(cols, {last, before},filter){
        return this.findEntity(cols, {}, filter)
    }
}
