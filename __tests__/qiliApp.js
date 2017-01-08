jest.mock("../src/db/user")
const React=require("react")
const {ACTION,DOMAIN,REDUCER,QiliApp}=require("../src/qiliApp")

describe("qili application", function(){
    const {Carousel}=require("../src/components/tutorial")
    const {Account}=require("../src/account")
    const {shallow}=require("enzyme")

    describe("component", function(){
        /**
         * {
            service: PropTypes.string.isRequired,//with default
            appId:PropTypes.string.isRequired,
            theme: PropTypes.object.isRequired, //with default
            init:PropTypes.func,
            tutorial:PropTypes.array,
            title: PropTypes.string,
            project: PropTypes.object
        }
         *
         * */

        let props={
            appId: "test",
 			tutorial:["a.jpg"],
 			title: "test",
 			project: {
                homepage:"http://homepage"
            }
        }

        it("{inited:false}", function(){
            let app=shallow(<QiliApp {...props} {...{inited:false}}/>)
            expect(app.find("#container").text()).toContain("initializing")
        })

        it("{inited:false,initedError:'no network'}", function(){
            let app=shallow(<QiliApp {...props} {...{inited:false,initedError:'no network'}}/>)
            expect(app.find("#container").text()).toContain("no network")
        })

        it("{inited:true,tutorialized:false,tutorial:[...]}", function(){
            let app=shallow(<QiliApp {...props} {...{inited:true,tutorialized:false}}/>)
            expect(app.find(Carousel).props().slides).toBe(props.tutorial)
        })

        it("{inited:true,tutorialized:true,user:null}", function(){
            let app=shallow(<QiliApp {...props} {...{inited:true,tutorialized:true,user:null}}/>)
            expect(app.find(Account).props().user).toBeFalsy()
        })

        it("{inited:true,tutorialized:true,user:{username:'test'}}", function(){
            let app=shallow(<QiliApp {...props} {...{inited:true,tutorialized:true,user:{username:'test'}}}/>)
            expect(app.find(Account).props().user.username).toBe('test')
        })
    })

    describe("actions",function(){

        const User=require("../src/db/user")

        const {configureStore}=require('redux-mock-store')
        const {thunk}=require('redux-thunk')




        describe("INIT_APP",function(){
            it("('no network')",function(){
                let initedError="no network"
                let action=ACTION.INIT_APP(initedError)
                expect(action.type).toBe(`@@${DOMAIN}/initedError`)
                expect(action.payload.error).toBe(initedError)
                let initState={}
                let state=REDUCER(initState,action)
                expect(state.initedError).toBe(initedError)
                expect(state.inited).toBe(initState.inited)
                expect(state).not.toBe(initState)
            })

            it("(null[succeed],tutorialized=false)",function(){
                let action=ACTION.INIT_APP(null,false)
                expect(action.type).toBe(`@@${DOMAIN}/inited`)
                expect(action.payload.tutorialized).toBe(false)
                let initState={}
                let state=REDUCER(initState,action)
                expect(state.inited).toBe(true)
                expect(state.tutorialized).toBe(false)
                expect(state).not.toBe(initState)
            })

            it("(null[succeed],tutorialized=true)",()=>{
                let action=ACTION.INIT_APP(null,true)
                expect(action.type).toBe(`@@${DOMAIN}/inited`)
                expect(action.payload.tutorialized).toBe(false)
                let initState={}
                let state=REDUCER(initState,action)
                expect(state.inited).toBe(true)
                expect(state.tutorialized).toBe(true)
                expect(state).not.toBe(initState)
            })
        })

        it("can LOGOUT",()=>{
            ACTION.LOGOUT()
            expect(User.logout).toHaveBeenCalled()
        })

        it("can USER_CHANGED",()=>{
            let user={username:"test"}
            expect(REDUCER({},ACTION.USER_CHANGED(user)).user).toBe(user)
        })

        it.skip("can CHECK_VERSION",()=>{

        })

        it("can TUTORIALIZED",()=>{
            expect(REDUCER({},ACTION.TUTORIALIZED).tutorialized).toBe(true)
        })
    })
})
