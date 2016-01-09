require('babel/polyfill')

import {init, User} from "../../lib/db"
var XMLHttpRequest=window.XMLHttpRequest=require('fakexmlhttprequest')

export var root="http://localhost/1"


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
        console.info('spiedXHR.send calling')
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
            console.info(`init user service...`)
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
                console.info(`init data service successfully with user: ${JSON.stringify(User.current)}`)
                done()
            })
}

var _now=Date.now()
export function uuid(){
    return _now++
}
