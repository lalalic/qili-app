import {React, Component, TestUtils, newPromise,uuid, injectTheme,expectHasType,Any} from './components/helper'
import {initWithUser,failx} from './db/helper'
import QiliApp from '../lib/main'
import User from './db/user'

describe("qiliApp frame", ()=>{
    let appId=`app${uuid()}`
    fit("should init db automatically",()=>{
        let props={appId},
            render=TestUtils.renderIntoDocument(<QiliApp {...props}/>)
    })

    it("should support customized initialization",()=>{

    })

    it("should show signup when no user cache",()=>{
        let props={appId},
            render=TestUtils.renderIntoDocument(<QiliApp {...props}/>)
        expect(User.current) 
    })

    it("should show content when user cache session able to be verified", ()=>{

    })

    it("should update when current user changed",()=>{

    })

    it("should support UIMessager.show, and Loading.show after render first",()=>{

    })
})
