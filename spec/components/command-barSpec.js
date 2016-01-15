import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType,Any} from './helper'
import MyComponent from '../../lib/components/command-bar'

describe("command bar", ()=>{
    let CommandBar, Command=MyComponent.Command;

    beforeAll(() => {
      CommandBar = injectTheme(MyComponent);
    });

    it("can create with empty items, string only, {action,...}",()=>{
        let render, commands;

        render=TestUtils.renderIntoDocument(<CommandBar/>)

        render=TestUtils.renderIntoDocument(<CommandBar items={[]}/>)
        commands=TestUtils.scryRenderedComponentsWithType(render,Command)
        expect(commands.length).toBe(0)

        render=TestUtils.renderIntoDocument(<CommandBar items={["Hello","World"]}/>)
        commands=TestUtils.scryRenderedComponentsWithType(render,Command)
        expect(commands.length).toBe(2)

        //string, {}, and element
        render=TestUtils.renderIntoDocument(<CommandBar items={[{action:"hello"},"World", (<Any/>)]}/>)
        commands=TestUtils.scryRenderedComponentsWithType(render,Command)
        expect(commands.length).toBe(2)
        TestUtils.findRenderedComponentWithType(render,Any)
    })

    it("label, action as label",()=>{
        let render, command, commands;
        render=TestUtils.renderIntoDocument(<CommandBar items={["hello"]}/>)
        command=TestUtils.findRenderedComponentWithType(render,Command)
        let A=TestUtils.findRenderedDOMComponentWithTag(command, 'a')
        expect(A.getDOMNode().text).toBe("hello")

        render=TestUtils.renderIntoDocument(<CommandBar items={[{action:"hello"}]}/>)
        command=TestUtils.findRenderedComponentWithType(render,Command)
        A=TestUtils.findRenderedDOMComponentWithTag(command, 'a')
        expect(A.getDOMNode().text).toBe("hello")

        render=TestUtils.renderIntoDocument(<CommandBar items={[{action:"hello",label:"world"}]}/>)
        command=TestUtils.findRenderedComponentWithType(render,Command)
        A=TestUtils.findRenderedDOMComponentWithTag(command, 'a')
        expect(A.getDOMNode().text).toBe("world")
    })

    it("support bar.onSelect(action)",()=>{
        let holder={onSelect(action){}},
            props={items:["hello"], onSelect:(a)=>holder.onSelect(a)},
            render=TestUtils.renderIntoDocument(<CommandBar {...props}/>),
            command=TestUtils.findRenderedComponentWithType(render,Command),
            A=TestUtils.findRenderedDOMComponentWithTag(command, 'a');

        //bar onSelect
        spyOn(holder,"onSelect")
        TestUtils.Simulate.click(A)
        expect(holder.onSelect).toHaveBeenCalledWith("hello")
    })

    it("support command.onSelect(action)",()=>{
        let holder={onSelect(action){}},
            props={items:[{action:"hello", onSelect:(a)=>holder.onSelect(a)}]},
            render=TestUtils.renderIntoDocument(<CommandBar {...props}/>),
            command=TestUtils.findRenderedComponentWithType(render,Command),
            A=TestUtils.findRenderedDOMComponentWithTag(command, 'a')

        spyOn(holder,"onSelect")
        TestUtils.Simulate.click(A)
        expect(holder.onSelect).toHaveBeenCalledWith("hello")
    })


    it("should call command onSelect even with bar onSelect",()=>{
        let holder={onSelect(action){}},
            anotherHolder={onSelect(action){}},
            props={
                items:[{action:"hello", onSelect:(a)=>anotherHolder.onSelect(a)}, "world"],
                onSelect:(a)=>holder.onSelect(a)
            },
            render=TestUtils.renderIntoDocument(<CommandBar {...props}/>),
            commands=TestUtils.scryRenderedComponentsWithType(render,Command)
        expect(commands.length).toBe(2)

        spyOn(anotherHolder,"onSelect")
        spyOn(holder,"onSelect")

        let command=commands[0],
            A=TestUtils.findRenderedDOMComponentWithTag(command, 'a')
        expect(A.getDOMNode().text).toBe("hello")
        TestUtils.Simulate.click(A)
        expect(anotherHolder.onSelect).toHaveBeenCalledWith("hello")
        expect(holder.onSelect).not.toHaveBeenCalled()
        holder.onSelect.calls.reset()
        anotherHolder.onSelect.calls.reset()


        command=commands[1]
        A=TestUtils.findRenderedDOMComponentWithTag(command, 'a')
        expect(A.getDOMNode().text).toBe("world")
        TestUtils.Simulate.click(A)
        expect(holder.onSelect).toHaveBeenCalledWith("world")
        expect(anotherHolder.onSelect).not.toHaveBeenCalled()

    })

    it("support smart Back, back to home if no history, otherwise last", ()=>{
        var length=1
        spyOn(MyComponent.prototype,'historyLength').and.callFake(()=>length)
        let props={items:["Back"]},
            render=TestUtils.renderIntoDocument(<CommandBar {...props}/>),
            command=TestUtils.findRenderedComponentWithType(render,Command),
            A=TestUtils.findRenderedDOMComponentWithTag(command, 'a');

        expect(A.getDOMNode().text).toBe("Home")

        length=3
        render=TestUtils.renderIntoDocument(<CommandBar {...props}/>),
        command=TestUtils.findRenderedComponentWithType(render,Command),
        A=TestUtils.findRenderedDOMComponentWithTag(command, 'a');
        expect(A.getDOMNode().text).toBe("Back")
    })

    it("dialog command",()=>{
        let DialogCommand=injectTheme(MyComponent.DialogCommand)
        let Overlay=require('material-ui/lib/overlay')
        let render=TestUtils.renderIntoDocument(<DialogCommand/>)
        let overlay=TestUtils.findRenderedComponentWithType(render,Overlay)

        /*
        //@TODO:hide when click
        render.setState({open:true})
        TestUtils.Simulate.click(overlay)
        expect(render.state.open).toBe(false)
        */

        render=TestUtils.renderIntoDocument(<DialogCommand><Any/></DialogCommand>)
        overlay=TestUtils.findRenderedComponentWithType(render,Overlay)
        TestUtils.findRenderedComponentWithType(overlay,Any)
    })

    it("comment dialog",()=>{
        class Book{
            constructor(){
                this._id="hello"
            }
        }
        Book._name="book"

        let Comment=injectTheme(MyComponent.Comment)
        let comment=(<Comment type={Book} model={new Book()}/>),
            props={items:[comment]},
            render=TestUtils.renderIntoDocument(<CommandBar {...props}/>),
            command=TestUtils.findRenderedComponentWithType(render,Comment),
            A=TestUtils.findRenderedDOMComponentWithTag(command, 'a');

        expect(A.getDOMNode().text).toBe("Comment")
        try{
            TestUtils.Simulate.click(A)
            fail("no router, so should throw error")
        }catch(e){//command.context.[no router].transitionTo("command",{type:"book",_id:"hello"})
            expect(e.message).toMatch(/transitionTo/)
        }
    })

    it("share to wechat",()=>{
        let Share=injectTheme(MyComponent.Share),
            message="hello share!",
            holder={
                    message(){
                        return message
                    }
            },
            props={items:[(<Share message={()=>holder.message()} />)]},
            render=TestUtils.renderIntoDocument(<CommandBar {...props}/>),
            command=TestUtils.findRenderedComponentWithType(render,Command),
            A=TestUtils.findRenderedDOMComponentWithTag(command, 'a');

        expect(A.getDOMNode().text).toBe("Share")
        spyOn(holder,'message').and.callThrough()
        window.WeChat=jasmine.createSpyObj('WeChat',['share'])
        TestUtils.Simulate.click(A)
        expect(holder.message).toHaveBeenCalled()
        expect(window.WeChat.share).toHaveBeenCalled()
        expect(window.WeChat.share.calls.argsFor(0)).toEqual(jasmine.arrayContaining([message]))
        delete window.WeChat
    })
})
