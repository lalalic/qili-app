import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType,Any} from './helper'
import MyComment from '../../lib/components/comment'
import DbComment from '../../lib/db/comment'
import {initWithUser,failx} from '../db/helper'
import CommandBar from '../../lib/components/command-bar'

describe("comment ui", ()=>{
    let Comment=injectTheme(MyComment)

    class Book{
        static get _name(){
            return "book"
        }
    }
    beforeAll((done)=>{
        initWithUser(`app${uuid()}`,a=>1).then(done,failx(done))
    })

    beforeEach(function(done){
        let p=newPromise();
        let holder=this.holder={upsert(){}}
        spyOn(DbComment,"of").and.returnValue({
            find(){
                return {
                    fetch(success,error){
                        p.then(success,error)
                    }
                }
            },
            upsert(){
                return holder.upsert(...arguments)
            }
        });

        let _id=`comment${uuid()}`
            ,props={
                params:{
                    type:Book,
                    _id
                },
                template:Any
            }
            ,render=this.render=TestUtils.renderIntoDocument(<Comment {...props}/>)
            ,comments=this.comments=TestUtils.scryRenderedComponentsWithType(render,Any)
            ,input=this.input=TestUtils.findRenderedDOMComponentWithTag(render,"textarea")
            ,commands=this.commands=TestUtils.scryRenderedComponentsWithType(render,CommandBar.Command)

        expect(comments.length).toBe(0)
        expect(commands.length).toBe(2)
        expect(TestUtils.findRenderedDOMComponentWithTag(commands[0],'a').getDOMNode().text).toMatch(/Back|Home/)
        expect(TestUtils.findRenderedDOMComponentWithTag(commands[1],'a').getDOMNode().text).toBe("Save")
        this.saveCommand=commands[1]
        p.resolve([{},{}])

        setTimeout(()=>{
            comments=this.comments=TestUtils.scryRenderedComponentsWithType(render,Any)
            expect(comments.length).toBe(2)
            done()
        },100)
    })

    it("can show comment", function(){
        let {render,comments,input,saveCommand}=this

        comments=TestUtils.scryRenderedComponentsWithType(render,Any)
        expect(comments.length).toBe(2)
    })

    it("can create new comment, able to save to server, and then UI updated",function(done){
        let {render,comments,input,saveCommand,holder}=this,
            len=comments.length,
            value=`comment${uuid()}`,
            p=newPromise()

        spyOn(holder, "upsert").and.callFake((comment,func)=>{
            expect(comment.content).toBe(value)
            expect(comment.type).toBeDefined()
            expect(comment.parent).toBeDefined()
            func(Object.assign(comment,{_id:`comment${uuid()}`, createdAt:new Date()}))
        })

        input.getDOMNode().value=value
        var link=TestUtils.findRenderedDOMComponentWithTag(saveCommand,'a')
        TestUtils.Simulate.click(link)
        expect(holder.upsert).toHaveBeenCalled()

        setTimeout(()=>{
            expect(input.getDOMNode().value).toBe("")
            comments=TestUtils.scryRenderedComponentsWithType(render,Any)
            expect(comments.length).toBe(len+1)
            done()
        },100)
    })
})
