import Application from "./db/app"

export const getCurrentApp=state=>{
    try{
        return state.entities[Application._name][state.qiliAdmin.app]
    }catch(e){
        return null
    }
}

export const getApp=(state,id)=>{
    try{
        return state.entities[Application._name][id]
    }catch(e){
        return null
    }
}
