import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType} from './helper'
import MyList from '../../lib/components/list'
import {Table as RawTable} from 'reactable'

describe("List", function(){
    class Item extends Component{
        constructor(){
            super(...arguments)
        }

        render(){
            return (<div className="item"/>)
        }
    }

    let List, Table;

    beforeEach(() => {
      List = injectTheme(MyList);
      Table=injectTheme(MyList.Table)
    });

    it("create with static children",()=>{
        [
            null,
            (<Item/>),
            [(<Item key={uuid()}/>),(<Item key={uuid()}/>)],
            "Hello",
            [(<Item key={uuid()}/>),"Hello"]
        ].forEach((children)=>TestUtils.renderIntoDocument(<List>{children}</List>))
    })

    it("create with model without template",()=>{
        let props={model:[{name:"1"},{name:"2"}]}
        TestUtils.renderIntoDocument(<List {...props}/>);
    })

    it("create with model with template",()=>{
        let props={template:Item, model:[{name:"1"},{name:"2"}]}
        TestUtils.renderIntoDocument(<List {...props}/>);
    })

    it("should merge static items and model data",()=>{
        let props={template:Item, model:[{name:"1"},{name:"2"}]},
            render=TestUtils.renderIntoDocument(<List {...props}/>),
            items=TestUtils.scryRenderedComponentsWithType(render,Item);

        expect(items.length).toBe(2)

        render=TestUtils.renderIntoDocument(<List {...props}><Item/></List>)
        items=TestUtils.scryRenderedComponentsWithType(render,Item)
        expect(items.length).toBe(3)

        render=TestUtils.renderIntoDocument(<List {...props}>Hello</List>)
        items=TestUtils.scryRenderedComponentsWithType(render,Item)
        expect(items.length).toBe(2)

        render=TestUtils.renderIntoDocument(<List {...props}><Item/>Hello</List>)
        items=TestUtils.scryRenderedComponentsWithType(render,Item)
        expect(items.length).toBe(3)

        render=TestUtils.renderIntoDocument(<List {...props}><Item/>Hello<Item/></List>)
        items=TestUtils.scryRenderedComponentsWithType(render,Item)
        expect(items.length).toBe(4)
    })

    it("should support <table model={[] or promise}/>",(done)=>{
        spyOn(MyList.Table.prototype,"renderContent").and.callThrough()

        let rowData=[{name:"1"},{name:"2"}]
            ,props={model:rowData}
            ,render=TestUtils.renderIntoDocument(<Table {...props}/>)
            ,table=TestUtils.findRenderedComponentWithType(render,MyList.Table)
            ,rawTable=TestUtils.findRenderedComponentWithType(table,RawTable)

        expect(rawTable.props.data).toBe(rowData)
        expect(MyList.Table.prototype.renderContent).toHaveBeenCalled()
        var count=MyList.Table.prototype.renderContent.calls.count()


        let model=newPromise()
        props={model}
        debugger
        render=TestUtils.renderIntoDocument(<Table {...props}/>)
        table=TestUtils.findRenderedComponentWithType(render,MyList.Table)
        model.resolve(rowData)
        setTimeout(()=>{
            rawTable=TestUtils.findRenderedComponentWithType(table,RawTable)
            expect(MyList.Table.prototype.renderContent.calls.count()).toBe(count+1)
            expect(table.state.data).toBe(rowData)
            expect(rawTable.props.data).toBe(rowData)
            done()
        },500)
    })
})
