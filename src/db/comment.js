import {Service} from './service'

const types={}
export default class Comment extends Service{
    static of(type){
        if(types[type])
            return types[type]
        return types[type]=class TypedComment extends Comment{
            static get _name(){
                return `${type}_comment`
            }
        }
    }
}
