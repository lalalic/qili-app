var {init,Model,User,Role,File,Log}=require("./lib/db"),
    React=require('react/addons'),
    {Component}=React;

exports.React=React
exports.Component=Component
exports.Router=require('react-router')

exports.init=init
exports.Model=Model
exports.User=User
exports.Role=Role
exports.File=File
exports.Log=Log

exports.Main=require('./lib/main')

exports.UI={
    Empty:require('./lib/components/empty'),
    Loading:require('./lib/components/loading'),
    List: require('./lib/components/list'),
    Comment:require('./lib/components/comment'),
    CommandBar: require('./lib/components/command-bar'),
	DialogCommand: require('./lib/components/dialog-command'),
    Photo: require('./lib/components/photo')
}
