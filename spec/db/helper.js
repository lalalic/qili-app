require('babel/polyfill')

import {init, User, Model} from "../../lib/db"
var XMLHttpRequest=window.XMLHttpRequest=require('fakexmlhttprequest')

export var root="http://localhost/1/"


export function failx(done){
    return (e)=>{
        console.error(e.message||e)
        fail(e.message||e)
        done()
    }
}

export function spyOnXHR(result,expected,headers={"Content-Type":'application/json'},status=200){
    var _send=XMLHttpRequest.prototype.send
    spyOn(XMLHttpRequest.prototype,"send").and.callFake(function(data){
        expected && expected(this,data);
        _send.apply(this,arguments)
        this.respond(status,headers,JSON.stringify(result), 200)
    })
}

export function ajaxHaveBeenCalled(n=1){
    expect(XMLHttpRequest.prototype.send.calls.count()).toBe(n)
}

export function initWithUser(appId,done=()=>1,username="test",password="test",
    _id="test",sessionToken="test"){
    (function hack(_init,_send,_done){
        User.init=function(){
            return User.signin({username,password})
        }

        XMLHttpRequest.prototype.send=function(){
            this.respond(200,{"Content-Type":'application/json'},
                JSON.stringify({username,sessionToken,_id}))
        }

        done=function(){
            User.init=_init
            XMLHttpRequest.prototype.send=_send
            _done()
        }
    })(User.init, XMLHttpRequest.prototype.send,done);

    return init(root,appId).catch(failx(done)).then(()=>{
                expect(User.current).toBeDefined()
                expect(User.current.sessionToken).toBe(sessionToken)
                done()
            })
}

export function injectLocalStorageWithoutInit(storage={removeItem:()=>1,setItem:()=>1}){
    (function(init){
        spyOn(Model,"init").and.callFake(function(opt, db, httpclient,server, tempStorage){
            init.call(Model,null,{},null,null,storage)
        })
    })(Model.init)
    Model.init()
}

export function clearCurrentUser(){
    injectLocalStorageWithoutInit()
    spyOn(Promise,"all").and.returnValue(Promise.resolve())
    return User.logout()
}

var _now=Date.now()
export function uuid(){
    return _now++
}
