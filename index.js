var {init,Model,User,Role,File,Log}=require("./lib/db"),
    React=require('react/addons'),
    {Component}=React;


exports.React=React
exports.Component=Component

exports.init=init
exports.Model=Model
exports.User=User
exports.Role=Role
exports.File=File
exports.Log=Log

exports.Main=require('./lib/main')
