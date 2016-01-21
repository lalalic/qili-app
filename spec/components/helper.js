require('babel/polyfill')

import React, {addons} from 'react/addons'
import {Styles} from 'material-ui'
import stubContext from 'react-stub-context'

var {TestUtils}=addons,
    _now=Date.now(),
    {ThemeManager}=Styles;


class Any extends React.Component{
    constructor(){
        super(...arguments)
    }
    render(){
        return null
    }
}

const Manager = new ThemeManager();

module.exports={
    React,
    TestUtils,
    Component:React.Component,
    newPromise(a){
        return Object.assign(new Promise((resolve,reject)=>a={resolve,reject}),a)
    },
    uuid(){
        return _now++
    },
    injectTheme: function(Component, theme){
        let injectedTheme = theme || Manager.getCurrentTheme();
        return stubContext(Component, {muiTheme: injectedTheme});
    },

    injectContext(Component, context={}){
        let injectedTheme = Manager.getCurrentTheme();
        return stubContext(Component, Object.assign({muiTheme: injectedTheme},context));
    },
    expectHasType(el,type,n=1){
        var a
        try {
            a=TestUtils.findRenderedComponentWithType(el,type)
        } catch (e) {
            console.info(`can't find type`)
        }
        return expect(a)
    },
    Any,
    findCommand(render,action){
        return TestUtils.scryRenderedDOMComponentsWithTag(render,"a").filter((a)=>{
            return a.getDOMNode().text==action
        })[0]
    },
    /**
    * textfield, onChange to setState({[key]:{...}}), and onBlur to save by Book.upsert({})
    */
    testTextField(field, keyName, newValue, stateSpy, stateCalledWith, upsertSpy, upsertCalledWith){
        let inName=field,
            input=TestUtils.findRenderedDOMComponentWithTag(inName,'input'),
            defaultCalledWith=jasmine.objectContaining({[keyName]:newValue})

        if(!upsertCalledWith)
            upsertCalledWith=defaultCalledWith

        if(typeof(stateCalledWith)=='string')
            stateCalledWith=jasmine.objectContaining({[stateCalledWith]:defaultCalledWith})
        else if(!stateCalledWith)
            stateCalledWith=defaultCalledWith

        input.getDOMNode().value=newValue
        TestUtils.Simulate.change(input)
        expect(stateSpy).toHaveBeenCalledWith(stateCalledWith)
        stateSpy.calls.reset()

        TestUtils.Simulate.blur(input)
        expect(upsertSpy).toHaveBeenCalledWith(upsertCalledWith)
        upsertSpy.calls.reset()
    },

    render(A,props={}, context){
        let B=module.exports.injectContext(A,context),
            render=TestUtils.renderIntoDocument(<B {...props}/>)
        return TestUtils.findRenderedComponentWithType(render, A)
    }
}
