require('babel-polyfill')
require('../style/index.less')


import {init,Model,User,Role,File,Log} from "./db"
import React, {Component} from 'react'

Date.Helper=require('material-ui/lib/utils/date-time')

exports.React=React
exports.Component=Component
exports.AsyncComponent=require('./components/async')
exports.Router=require('react-router')
exports.immutable=require('immutable')

exports.init=init
exports.Model=Model
exports.User=User
exports.Role=Role
exports.File=File
exports.Log=Log

exports.QiliApp=require('./qiliApp')

exports.UI={
    Empty:require('./components/empty'),
    Loading:require('./components/loading'),
    List: require('./components/list'),
    Comment:require('./components/comment'),
    CommandBar: require('./components/command-bar'),
    Photo: require('./components/photo'),
    Messager: require('./components/messager'),
	fileSelector: require('./components/file-selector')
}

;(function(_raw){
    var len=(new Date()).toJSON().length,
        r=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/,ds
    JSON.parse=(a,reviver)=>{
        return _raw.call(JSON,a,(k,v)=>{
            if(typeof(v)=='string' && v.length==len && v[len-1]=='Z' && (ds=r.exec(v)))
                return new Date(Date.UTC(+ds[1], +ds[2] - 1, +ds[3], +ds[4],  +ds[5], +ds[6]));
            return reviver ? reviver(k,v) : v
        })
    }
})(JSON.parse);

Date.prototype.toString=function(){
    var h=this.getHours(),m=this.getMinutes(),
        time=h||m ? ` ${h}:${m}` :''
    return `${this.getFullYear()}-${this.getMonth()+1}-${this.getDate()}${time}`
}
