jest.mock("../../src/db/user")
jest.mock("../../src/components/file-selector")

const React=require("react")
const {mount}=require("enzyme")
const CommandBar=require("../../src/components/command-bar")
const {Command}=CommandBar
const {CommentUI,ACTION,REDUCER}=require("../../src/components/comment")
const User=require("../../src/db/user")
const muiTheme=require("../../src/qiliApp").QiliApp.defaultProps.theme
const shallow=node=>mount(node,{context:{muiTheme}})
const dispatch=jest.fn()
const Template=CommentUI.defaultProps.template
const fileSelector=require("../../src/components/file-selector")
const File=require("../../src/db/file")
const Comment=require("../../src/db/comment")

describe("comment", function(){
    beforeAll(()=>{
        User.current={_id:"21"}
    })

    describe("component", function(){
        let props={
            dispatch
            ,params:{type:"book",_id:"ouiere"}
        }

        it("can show to add photo, and send non-empty comment", function(){
            let ui=shallow(<CommentUI {...props}/>)
            expect(ui.find(".comment").length).toBe(1)
            expect(ui.find(Template).length).toBe(0)
            expect(ui.find(Command).length).toBe(2)
            expect(ui.find(CommandBar).props().items[2].action).toBe("photo")
            ui.setState({comment:"hello"})
            expect(ui.find(CommandBar).props().items[2].action).toBe("Save")
        })

        it("can show book comments", function(){
            let ui=shallow(<CommentUI {...{...props, data:[
                {_id:"1",content:"hello",author:{_id:"test"}}
                ,{_id:"2",content:"world",author:{_id:User.current._id}}
            ]}}/>)
            let comments=ui.find(Template)
            expect(comments.length).toBe(2)
            let owner=ui.find("p.owner")
            expect(owner.length).toBe(1)
            expect(owner.text()).toBe("world")
        })

        it("can add photo", function(){
            let ui=shallow(<CommentUI {...props}/>)
            let photoAction=ui.find(Command).at(1)
            spyOn(fileSelector,"select").and.callFake(function(){
                return {
                    then(){
                        return {
                            then(){}
                        }
                    }
                }
            })

            photoAction.find("span").simulate("click")
            expect(fileSelector.select).toHaveBeenCalled()
        })
    })

    describe("Action and Reducer", function(){
        it("can fetch comment data", function(){
            let dispatch=jest.fn()
            spyOn(Comment,"of").and.returnValue({
                find(){
                    return {
                        fetch(f){
                            f([])
                            return Promise.resolve()
                        }
                    }
                }
            })
            let type="book",id="asdf"
            return ACTION.FETCH(type,id)(dispatch)
                    .then(a=>{
                        expect(dispatch).toHaveBeenCalled()
                    })
        })

        it("can CREATE",function(){
            let content="I like it"
            let type="book", id="id333"
            spyOn(Comment,"of").and.returnValue({
                upsert(comment){
                    expect(comment.content).toBe(content)
                    expect(comment.parent).toBe(id)
                    expect(comment.type).toBe(type)
                    return Promise.resolve(comment)
                }
            })
            let dispatch=jest.fn()
            return ACTION.CREATE(type,id,content)(dispatch)
                .then(a=>{
                    expect(dispatch).toHaveBeenCalled()
                })
        })
    })
})
