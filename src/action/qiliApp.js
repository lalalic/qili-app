export function INIT_APP(error,__tutorialized){
    if(!!error){
        return {
            type:"initedError"
            ,user
            ,error
        }
    }else{
        return {
            type:"inited"
            ,__tutorialized
        }
    }
}

export var USER_CHANGED={
    type:"user.changed"
}
