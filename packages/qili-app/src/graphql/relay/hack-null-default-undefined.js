//////hack: make query/mutation/subscription variables default undefined as undefined
export default operate=>{
    operate().operation.argumentDefinitions.forEach(def=>{
        if(def.defaultValue===null){
            def.defaultValue=undefined
        }
    })
    return operate
}
