import {init,Model,User,Role,File,Log} from "./db"
import React, {Component} from 'react'

Date.Helper=require('material-ui/lib/utils/date-time')

exports.React=React
exports.Component=Component
exports.AsyncComponent=require('./components/async')
exports.Router=require('react-router')

exports.init=init
exports.Model=Model
exports.User=User
exports.Role=Role
exports.File=File
exports.Log=Log

exports.QiliApp=require('./main')

exports.UI={
    Empty:require('./components/empty'),
    Loading:require('./components/loading'),
    List: require('./components/list'),
    Comment:require('./components/comment'),
    CommandBar: require('./components/command-bar'),
    Photo: require('./components/photo'),
    Messager: require('./components/messager'),
	selectFile: require('./components/file-selector')
}

exports.Position=(function(dl, right, left){
        right=left=(x)=>x+(dl>0? dl : 0)
        return {right,left, rightAsLeft:(x)=>window.innerWidth-(dl>0 ? dl :0)-x}
    })(Math.ceil((window.innerWidth-960)/2));
