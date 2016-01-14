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


    fit("should call command onSelect even with bar onSelect",()=>{
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

    it("support smart Back", ()=>{
        let props={items:[]},
            render=TestUtils.renderIntoDocument(<CommandBar {...props}/>)
    })

    it("support default icon of Refresh, Save, icon unspecifed",()=>{

    })

    it("support dialog command",()=>{

    })

    it("comment dialog",()=>{

    })

    it("share dialog",()=>{

    })
})
