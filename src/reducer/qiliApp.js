import User from "../db/user"

export default function app(state={__inited:false, __user:User.current},action){
    switch(action.type){
    case 'inited':
        return {
            __inited:true
            ,__user:User.current
            ,__tutorialized:action.__tutorialized
        }
    break
    case 'initedError':
        return {
            __inited:false
            ,__user:User.current
            ,__initedError:action.error
        }
    break
    case 'user.changed':
        return Object.assign({},state,{__user:User.current})
    default:
        return state
    }
}
