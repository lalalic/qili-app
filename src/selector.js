import Application from "./db/app"

export const getCurrentApp=state=>{
    try{
        return state.entities[Application._name][state.qiliAdmin.app]
    }catch(e){
        return null
    }
}
