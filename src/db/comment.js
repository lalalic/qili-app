import {Service} from './service'

export default class Comment extends Service{
    static of(type){
        return class TypedComment extends Comment{
            static get _name(){
                return `${type}_comment`
            }
        }
    }
}
