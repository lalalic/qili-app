import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType} from './Helper'
import MyList from '../../lib/components/list'

describe("List", function(){
    class Item extends Component{
        constructor(){
            super(...arguments)
        }

        render(){
            return (<div className="item"/>)
        }
    }

    let List;

    beforeEach(() => {
      List = injectTheme(MyList);
    });

    it("create with nothing",()=>{
        let render=TestUtils.renderIntoDocument(<List/>)
    })

    xit("create with children",()=>{
        let render=TestUtils.renderIntoDocument(<List><List.Item/></List>)
    })

    xit("show static list",()=>{
        spyOn(MyList.Item.prototype,'render').and.callThrough()

        let props={template:Item, model:[{name:"1"},{name:"2"}]},
            render=TestUtils.renderIntoDocument(<List {...props}/>)

        //var items=TestUtils.findRenderedComponentWithType(render,Item)
        expect(MyList.Item.prototype.render.calls.count()).toBe(2)
    })

    describe("sync mode", function(){

    })
})
