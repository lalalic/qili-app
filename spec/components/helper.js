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
    expectHasType(el,type,n=1){
        var a
        try {
            a=TestUtils.findRenderedComponentWithType(el,type)
        } catch (e) {
            console.info(`can't find type`)
        }
        return expect(a)
    },
    Any
}
