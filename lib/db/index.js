'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

var _events = require('events');

(function (emit) {
    _events.EventEmitter.prototype.emit = function () {
        try {
            emit.call.apply(emit, [this].concat(Array.prototype.slice.call(arguments)));
        } catch (e) {
            console.error('EventEmitter error: ' + e.message);
        }
    };
})(_events.EventEmitter.prototype.emit);

var User = require('./user');
var Role = require('./role');
var Log = require('./log');
var File = require('./file');

var _require = require('./service');

var Service = _require.Service;
var __worker;
var _require2 = require('minimongo');

var RemoteDb = _require2.RemoteDb;
var HybridDb = _require2.HybridDb;
var utils = _require2.utils;
var db;var dbPromise;

var appId, server, gHttpErrorHandler, loadingHandler;

function makeEnvReady() {
    (function (window) {
        if (typeof window.cordova != 'undefined' && typeof window.sqlitePlugin != 'undefined') {
            window.deleteDatabase = window.sqlitePlugin.deleteDatabase;
            window.openDatabase = function (name) {
                var db = window.sqlitePlugin.openDatabase({ name: name, location: "default" });
                db.version = localStorage.dbVersion || "";
                db.changeVersion = function (oldVersion, newVersion, transCallback, error, success) {
                    if (this.version !== oldVersion) return error ? error("") : null;

                    if (transCallback) {
                        this.transaction(transCallback, error, function () {
                            db.version = localStorage.dbVersion = newVersion;
                            typeof success != 'undefined' && success();
                        });
                    } else {
                        this.version = localStorage.dbVersion = newVersion;
                        typeof success != 'undefined' && success();
                    }
                };
                return db;
            };
        }
    })(typeof window == 'undefined' ? global.window = {} : window);
}

function fixMinimongo(db) {
    require('./fix-minimongo')(db);
}

function ajaxRequest() {
    var method = arguments.length <= 0 || arguments[0] === undefined ? 'get' : arguments[0];
    var url = arguments[1];
    var params = arguments[2];
    var data = arguments[3];
    var success = arguments[4];
    var error = arguments[5];
    var _appId = arguments[6];
    var _sessionToken = arguments[7];

    if (!appId) throw new Error("Please specify application Key first");
    method = method.toLowerCase();
    loadingHandler.show();
    try {
        if (params) {
            params.selector && params.selector != "{}" && (params.query = params.selector);
            var p = [];
            'sort,limit,skipt,fields,query'.split(',').forEach(function (key) {
                params[key] && p.push(key + '=' + params[key]);
            });
            delete params.query;

            url = !p.length ? url : url + (url.indexOf('?') == -1 ? '?' : '&') + p.join('&');
        }

        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                try {
                    var type = xhr.getResponseHeader('Content-Type'),
                        r;
                    if (type && type.indexOf('/json') != -1) {
                        r = JSON.parse(xhr.responseText);
                    } else r = xhr.responseText;
                    loadingHandler.close();
                } catch (e) {
                    loadingHandler.close();
                }

                if (xhr.status >= 200 && xhr.status < 300) {
                    method != 'get' && gHttpErrorHandler((method == 'delete' ? 'Deleted' : 'Saved') + ' successfully', 'Info');
                    success && success(r);
                } else {
                    var m = r || xhr.status == 0 && "No network" || "error happens";
                    error && error(m) == 0 && gHttpErrorHandler(m);
                }
            }
        };

        xhr.open(method, url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        var isJson = false;

        if (method == 'delete') xhr.setRequestHeader('Content-type', 'text/plain');else if (data instanceof FormData) ; //xhr.setRequestHeader('Content-type','multipart/form-data')
        else {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                isJson = true;
            }

        xhr.setRequestHeader('X-Application-Id', _appId || appId);
        if (User.current) xhr.setRequestHeader('X-Session-Token', User.current.sessionToken); //current username, same with _id
        if (_sessionToken) xhr.setRequestHeader('X-Session-Token', _sessionToken);

        xhr.send(typeof data == 'string' || !isJson ? data : JSON.stringify(data));
    } catch (e) {
        console.error(e.message);
        loadingHandler.close();
    }
    return xhr;
}

function init(_server, _appId, success, httpError, _loadingHandler) {
    makeEnvReady();

    appId = _appId;
    server = _server;
    gHttpErrorHandler = httpError || function (e, code) {
        return console.error('http error with status ' + code + ': ' + e);
    };
    loadingHandler = _loadingHandler || {
        show: function show() {},
        close: function close() {}
    };

    return dbPromise = new Promise(function (resolve, reject) {
        utils.autoselectLocalDb({ namespace: 'qili.' + _appId }, function (localDb) {
            db = new HybridDb(localDb, new RemoteDb(server + "classes/", {}, ajaxRequest));
            fixMinimongo(db);

            var localStorage = makeLocalStorage(localDb);

            Service.init(null, db, ajaxRequest, server, localStorage);
            Service.isCurrentApp = function (__appId) {
                return _appId == __appId;
            };

            User.init().then(function () {
                Role.init();
                File.init();
                Log.init();

                if (success) {
                    User.on('change', function () {
                        return success(db);
                    });
                    resolve(User.current ? Promise.resolve(success(db) || db).then(function (a) {
                        return isTutorialized(localStorage);
                    }) : db);
                } else resolve(isTutorialized(localStorage));

                supportWorker(_server, _appId);

                Service.emit('inited');
            }, reject);
        }, reject);
    });
}

function supportWorker(server, appId) {/*
                                       return false
                                       __worker=require('webworkify')(require('./worker.js'))
                                       ;(function(postMessage){
                                       __worker.postMessage=function(m, ...data){
                                       postMessage.call(__worker, {type:m, args:JSON.stringify(data)})
                                       }
                                       })(__worker.postMessage);
                                       __worker.postMessage('init', server, appId)
                                       User.on('change',()=>__worker.postMessage('user',User.current))
                                       if(User.current)
                                       __worker.postMessage('user', User.current)
                                       ;(function(_addCollection){
                                       function wrap(success,state, type){
                                       return ()=>{
                                       __worker.postMessage(state,type)
                                       success && success(...arguments)
                                       }
                                       }
                                       HybridDb.prototype.addCollection=function(name, opt){
                                       _addCollection.call(this,...arguments)
                                       var r=this[name]
                                       ;(function(upsert){
                                       r.upsert=function(docs, bases, success, error){
                                       return upsert.call(this, docs, bases, wrap(success,'upsert',name), error)
                                       }
                                       })(r.upsert)
                                       ;(function(remove){
                                       r.remove=function(id, success, error){
                                       return remove.call(this,id, wrap(success,'remove',name),error)
                                       }
                                       })(r.remove)
                                       __worker.postMessage('addCollection',name)
                                       return r
                                       }
                                       })(HybridDb.prototype.addCollection);*/
}

function makeLocalStorage(localDb) {
    localDb.addCollection("__localStorage");
    return {
        getItem: function getItem(key) {
            return new Promise(function (resolve, reject) {
                return localDb.__localStorage.findOne({ _id: key }, function (a) {
                    return resolve(a && a.value);
                }, reject);
            });
        },
        setItem: function setItem(key, value) {
            return new Promise(function (resolve, reject) {
                return localDb.__localStorage.upsert({ _id: key, value: value }, resolve, reject);
            });
        },
        removeItem: function removeItem(key) {
            return new Promise(function (resolve, reject) {
                return localDb.__localStorage.remove(key, resolve, reject);
            });
        }
    };
}

function isTutorialized(localStorage) {
    return localStorage.getItem("__tutorialized").then(function (a) {
        if (!a) {
            localStorage.setItem("__tutorialized", "true");
            return false;
        }
        return a;
    });
}

exports.User = User;
exports.Role = Role;
exports.File = File;
exports.Log = Log;
exports.Model = Service;

/**
* ajax request
* client _id
    * done: ok
* client createdAt, updatedAt
    * done
    * server side would give its own createdAt and updatedAt
        * cache operation Invalid
            * delete then cache
                * same transaction

    * hack in ajax
        * update: createdAt!=updatedAt
            * client insert then update
        * create: createdAt==updatedAt

* return appended part only VS whole object
    * merge client object and server return object

* any upsert and delete must act to server directly
    * cache in local
* any find/findOne must
    * first on local
    * then to remote
        * same with local, without call to success
        * not same with local, call to success

*/
//# sourceMappingURL=data:application/json;base64,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QVEsS0FBSyxFQUFFLEtBQUY7aUJBQWxCLEVBQTRCLE1BQXJFO2FBRGUsQ0FBbkIsQ0FEUTtTQURiO0FBS0Msa0NBQVEsS0FBSyxPQUFNO0FBQ2YsbUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVjt1QkFDZixRQUFRLGNBQVIsQ0FBdUIsTUFBdkIsQ0FBOEIsRUFBQyxLQUFJLEdBQUosRUFBUSxZQUFULEVBQTlCLEVBQThDLE9BQTlDLEVBQXVELE1BQXZEO2FBRGUsQ0FBbkIsQ0FEZTtTQUxwQjtBQVNDLHdDQUFXLEtBQUk7QUFDWCxtQkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWO3VCQUNmLFFBQVEsY0FBUixDQUF1QixNQUF2QixDQUE4QixHQUE5QixFQUFrQyxPQUFsQyxFQUEyQyxNQUEzQzthQURlLENBQW5CLENBRFc7U0FUaEI7S0FBUCxDQUY4QjtDQUFsQzs7QUFrQkEsU0FBUyxjQUFULENBQXdCLFlBQXhCLEVBQXFDO0FBQ2pDLFdBQU8sYUFBYSxPQUFiLENBQXFCLGdCQUFyQixFQUNGLElBREUsQ0FDRyxhQUFHO0FBQ0wsWUFBRyxDQUFDLENBQUQsRUFBRztBQUNGLHlCQUFhLE9BQWIsQ0FBcUIsZ0JBQXJCLEVBQXNDLE1BQXRDLEVBREU7QUFFRixtQkFBTyxLQUFQLENBRkU7U0FBTjtBQUlBLGVBQU8sQ0FBUCxDQUxLO0tBQUgsQ0FEVixDQURpQztDQUFyQzs7QUFXQSxRQUFRLElBQVIsR0FBYSxJQUFiO0FBQ0EsUUFBUSxJQUFSLEdBQWEsSUFBYjtBQUNBLFFBQVEsSUFBUixHQUFhLElBQWI7QUFDQSxRQUFRLEdBQVIsR0FBWSxHQUFaO0FBQ0EsUUFBUSxLQUFSLEdBQWMsT0FBZCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnXG5cbjsoZnVuY3Rpb24oZW1pdCl7XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKCl7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGVtaXQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXG4gICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEV2ZW50RW1pdHRlciBlcnJvcjogJHtlLm1lc3NhZ2V9YClcbiAgICAgICAgfVxuICAgIH1cbn0pKEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCk7XG5cbnZhciBVc2VyPXJlcXVpcmUoJy4vdXNlcicpLFxuICAgIFJvbGU9cmVxdWlyZSgnLi9yb2xlJyksXG4gICAgTG9nPXJlcXVpcmUoJy4vbG9nJyksXG4gICAgRmlsZT1yZXF1aXJlKCcuL2ZpbGUnKSxcbiAgICB7U2VydmljZX09cmVxdWlyZSgnLi9zZXJ2aWNlJyksXG4gICAgX193b3JrZXI7XG5cbnZhciB7UmVtb3RlRGIsIEh5YnJpZERiLCB1dGlsc309cmVxdWlyZSgnbWluaW1vbmdvJyksXG4gICAgZGIsZGJQcm9taXNlO1xuXG52YXIgYXBwSWQsXG4gICAgc2VydmVyLFxuICAgIGdIdHRwRXJyb3JIYW5kbGVyLFxuICAgIGxvYWRpbmdIYW5kbGVyO1xuXG5mdW5jdGlvbiBtYWtlRW52UmVhZHkoKXtcbiAgICAoZnVuY3Rpb24od2luZG93KXtcbiAgICAgICAgaWYodHlwZW9mKHdpbmRvdy5jb3Jkb3ZhKSE9J3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5zcWxpdGVQbHVnaW4hPSd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHdpbmRvdy5kZWxldGVEYXRhYmFzZT13aW5kb3cuc3FsaXRlUGx1Z2luLmRlbGV0ZURhdGFiYXNlXG4gICAgICAgICAgICB3aW5kb3cub3BlbkRhdGFiYXNlPWZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICAgICAgICAgIHZhciBkYj13aW5kb3cuc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7bmFtZSxsb2NhdGlvbjpcImRlZmF1bHRcIn0pXG4gICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9ufHxcIlwiXG4gICAgICAgICAgICAgICAgZGIuY2hhbmdlVmVyc2lvbj1mdW5jdGlvbihvbGRWZXJzaW9uLG5ld1ZlcnNpb24sdHJhbnNDYWxsYmFjaywgZXJyb3IsIHN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnZlcnNpb24hPT1vbGRWZXJzaW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yID8gZXJyb3IoXCJcIikgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYW5zQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbih0cmFuc0NhbGxiYWNrLCBlcnJvciwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYi52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb249bmV3VmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihzdWNjZXNzKSE9J3VuZGVmaW5lZCcgJiYgc3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbj1uZXdWZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/Z2xvYmFsLndpbmRvdz17fSA6IHdpbmRvdyk7XG5cbn1cblxuZnVuY3Rpb24gZml4TWluaW1vbmdvKGRiKXtcbiAgICByZXF1aXJlKCcuL2ZpeC1taW5pbW9uZ28nKShkYilcbn1cblxuZnVuY3Rpb24gYWpheFJlcXVlc3QobWV0aG9kPSdnZXQnLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9hcHBJZCwgX3Nlc3Npb25Ub2tlbikge1xuICAgIGlmKCFhcHBJZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHNwZWNpZnkgYXBwbGljYXRpb24gS2V5IGZpcnN0XCIpXG4gICAgbWV0aG9kPW1ldGhvZC50b0xvd2VyQ2FzZSgpXG4gICAgbG9hZGluZ0hhbmRsZXIuc2hvdygpXG4gICAgdHJ5e1xuICAgICAgICBpZihwYXJhbXMpe1xuICAgICAgICAgICAgcGFyYW1zLnNlbGVjdG9yICYmIHBhcmFtcy5zZWxlY3RvciE9XCJ7fVwiICYmIChwYXJhbXMucXVlcnk9cGFyYW1zLnNlbGVjdG9yKTtcbiAgICAgICAgICAgIHZhciBwPVtdXG4gICAgICAgICAgICAnc29ydCxsaW1pdCxza2lwdCxmaWVsZHMscXVlcnknLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xuICAgICAgICAgICAgICAgIHBhcmFtc1trZXldICYmIHAucHVzaChrZXkrJz0nK3BhcmFtc1trZXldKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuXG4gICAgICAgICAgICB1cmw9IXAubGVuZ3RoID8gdXJsIDogdXJsKyh1cmwuaW5kZXhPZignPycpPT0tMSA/ICc/JyA6ICcmJykrcC5qb2luKCcmJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZT14aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpLFxuICAgICAgICAgICAgICAgICAgICByO1xuICAgICAgICAgICAgICAgIGlmKHR5cGUgJiYgdHlwZS5pbmRleE9mKCcvanNvbicpIT0tMSl7XG4gICAgICAgICAgICAgICAgICAgIHI9SlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHI9eGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kIT0nZ2V0JyAmJiBnSHR0cEVycm9ySGFuZGxlcihgJHttZXRob2Q9PSdkZWxldGUnID8gJ0RlbGV0ZWQnIDonU2F2ZWQnfSBzdWNjZXNzZnVsbHlgLCdJbmZvJyk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhyKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtPXJ8fCh4aHIuc3RhdHVzPT0wJiZcIk5vIG5ldHdvcmtcIil8fFwiZXJyb3IgaGFwcGVuc1wiO1xuICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihtKT09MCAmJiBnSHR0cEVycm9ySGFuZGxlcihtKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub3BlbihtZXRob2QsdXJsLHRydWUpXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0JylcblxuICAgICAgICB2YXIgaXNKc29uPWZhbHNlXG5cbiAgICAgICAgaWYobWV0aG9kPT0nZGVsZXRlJylcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCd0ZXh0L3BsYWluJyk7XG4gICAgICAgIGVsc2UgaWYoZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKVxuICAgICAgICAgICAgOy8veGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ211bHRpcGFydC9mb3JtLWRhdGEnKVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JylcbiAgICAgICAgICAgIGlzSnNvbj10cnVlXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXBwbGljYXRpb24tSWQnLF9hcHBJZHx8YXBwSWQpXG4gICAgICAgIGlmKFVzZXIuY3VycmVudClcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVNlc3Npb24tVG9rZW4nLFVzZXIuY3VycmVudC5zZXNzaW9uVG9rZW4pLy9jdXJyZW50IHVzZXJuYW1lLCBzYW1lIHdpdGggX2lkXG4gICAgICAgIGlmKF9zZXNzaW9uVG9rZW4pXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxfc2Vzc2lvblRva2VuKVxuXG4gICAgICAgIHhoci5zZW5kKHR5cGVvZihkYXRhKT09J3N0cmluZycgfHwgIWlzSnNvbiA/IGRhdGEgOiBKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICB9Y2F0Y2goZSl7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKVxuICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgfVxuICAgIHJldHVybiB4aHJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoX3NlcnZlcixfYXBwSWQsIHN1Y2Nlc3MsIGh0dHBFcnJvciwgX2xvYWRpbmdIYW5kbGVyKXtcbiAgICBtYWtlRW52UmVhZHkoKVxuXG4gICAgYXBwSWQ9X2FwcElkXG4gICAgc2VydmVyPV9zZXJ2ZXJcbiAgICBnSHR0cEVycm9ySGFuZGxlcj1odHRwRXJyb3IgfHwgKChlLCBjb2RlKT0+Y29uc29sZS5lcnJvcihgaHR0cCBlcnJvciB3aXRoIHN0YXR1cyAke2NvZGV9OiAke2V9YCkpO1xuICAgIGxvYWRpbmdIYW5kbGVyPV9sb2FkaW5nSGFuZGxlciB8fCB7c2hvdygpe30sY2xvc2UoKXt9fVxuXG4gICAgcmV0dXJuIGRiUHJvbWlzZT1uZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICB1dGlscy5hdXRvc2VsZWN0TG9jYWxEYih7bmFtZXNwYWNlOmBxaWxpLiR7X2FwcElkfWB9LGZ1bmN0aW9uKGxvY2FsRGIpe1xuICAgICAgICAgICAgZGI9bmV3IEh5YnJpZERiKGxvY2FsRGIsbmV3IFJlbW90ZURiKHNlcnZlcitcImNsYXNzZXMvXCIse30sYWpheFJlcXVlc3QpKTtcbiAgICAgICAgICAgIGZpeE1pbmltb25nbyhkYilcblxuICAgICAgICAgICAgbGV0IGxvY2FsU3RvcmFnZT1tYWtlTG9jYWxTdG9yYWdlKGxvY2FsRGIpXG5cbiAgICAgICAgICAgIFNlcnZpY2UuaW5pdChudWxsLGRiLCBhamF4UmVxdWVzdCxzZXJ2ZXIsIGxvY2FsU3RvcmFnZSlcbiAgICAgICAgICAgIFNlcnZpY2UuaXNDdXJyZW50QXBwPWZ1bmN0aW9uKF9fYXBwSWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBfYXBwSWQ9PV9fYXBwSWRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVXNlci5pbml0KCkudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIFJvbGUuaW5pdCgpO1xuICAgICAgICAgICAgICAgIEZpbGUuaW5pdCgpO1xuICAgICAgICAgICAgICAgIExvZy5pbml0KCk7XG5cbiAgICAgICAgICAgICAgICBpZihzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywoKT0+c3VjY2VzcyhkYikpXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoVXNlci5jdXJyZW50ID8gUHJvbWlzZS5yZXNvbHZlKHN1Y2Nlc3MoZGIpfHxkYikudGhlbihhPT5pc1R1dG9yaWFsaXplZChsb2NhbFN0b3JhZ2UpKSA6IGRiKVxuICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaXNUdXRvcmlhbGl6ZWQobG9jYWxTdG9yYWdlKSlcblxuICAgICAgICAgICAgICAgIHN1cHBvcnRXb3JrZXIoX3NlcnZlciwgX2FwcElkKVxuXG4gICAgICAgICAgICAgICAgU2VydmljZS5lbWl0KCdpbml0ZWQnKVxuICAgICAgICAgICAgfSxyZWplY3QpXG5cbiAgICAgICAgfSxyZWplY3QpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc3VwcG9ydFdvcmtlcihzZXJ2ZXIsIGFwcElkKXsvKlxuICAgIHJldHVybiBmYWxzZVxuICAgIF9fd29ya2VyPXJlcXVpcmUoJ3dlYndvcmtpZnknKShyZXF1aXJlKCcuL3dvcmtlci5qcycpKVxuICAgIDsoZnVuY3Rpb24ocG9zdE1lc3NhZ2Upe1xuICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZT1mdW5jdGlvbihtLCAuLi5kYXRhKXtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlLmNhbGwoX193b3JrZXIsIHt0eXBlOm0sIGFyZ3M6SlNPTi5zdHJpbmdpZnkoZGF0YSl9KVxuICAgICAgICB9XG4gICAgfSkoX193b3JrZXIucG9zdE1lc3NhZ2UpO1xuXG5cbiAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgnaW5pdCcsIHNlcnZlciwgYXBwSWQpXG5cblxuXG5cbiAgICBVc2VyLm9uKCdjaGFuZ2UnLCgpPT5fX3dvcmtlci5wb3N0TWVzc2FnZSgndXNlcicsVXNlci5jdXJyZW50KSlcbiAgICBpZihVc2VyLmN1cnJlbnQpXG4gICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCd1c2VyJywgVXNlci5jdXJyZW50KVxuXG4gICAgOyhmdW5jdGlvbihfYWRkQ29sbGVjdGlvbil7XG4gICAgICAgIGZ1bmN0aW9uIHdyYXAoc3VjY2VzcyxzdGF0ZSwgdHlwZSl7XG4gICAgICAgICAgICByZXR1cm4gKCk9PntcbiAgICAgICAgICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZShzdGF0ZSx0eXBlKVxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb249ZnVuY3Rpb24obmFtZSwgb3B0KXtcbiAgICAgICAgICAgIF9hZGRDb2xsZWN0aW9uLmNhbGwodGhpcywuLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB2YXIgcj10aGlzW25hbWVdXG5cbiAgICAgICAgICAgIDsoZnVuY3Rpb24odXBzZXJ0KXtcbiAgICAgICAgICAgICAgICByLnVwc2VydD1mdW5jdGlvbihkb2NzLCBiYXNlcywgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBzZXJ0LmNhbGwodGhpcywgZG9jcywgYmFzZXMsIHdyYXAoc3VjY2VzcywndXBzZXJ0JyxuYW1lKSwgZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoci51cHNlcnQpXG5cbiAgICAgICAgICAgIDsoZnVuY3Rpb24ocmVtb3ZlKXtcbiAgICAgICAgICAgICAgICByLnJlbW92ZT1mdW5jdGlvbihpZCwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlLmNhbGwodGhpcyxpZCwgd3JhcChzdWNjZXNzLCdyZW1vdmUnLG5hbWUpLGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKHIucmVtb3ZlKVxuXG4gICAgICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgnYWRkQ29sbGVjdGlvbicsbmFtZSlcbiAgICAgICAgICAgIHJldHVybiByXG4gICAgICAgIH1cbiAgICB9KShIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbik7Ki9cbn1cblxuZnVuY3Rpb24gbWFrZUxvY2FsU3RvcmFnZShsb2NhbERiKXtcbiAgICBsb2NhbERiLmFkZENvbGxlY3Rpb24oXCJfX2xvY2FsU3RvcmFnZVwiKVxuICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRJdGVtKGtleSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5maW5kT25lKHtfaWQ6a2V5fSwoYSk9PnJlc29sdmUoYSAmJiBhLnZhbHVlKSwgcmVqZWN0KSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRJdGVtKGtleSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UudXBzZXJ0KHtfaWQ6a2V5LHZhbHVlfSxyZXNvbHZlLCByZWplY3QpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUl0ZW0oa2V5KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLnJlbW92ZShrZXkscmVzb2x2ZSwgcmVqZWN0KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxufVxuXG5mdW5jdGlvbiBpc1R1dG9yaWFsaXplZChsb2NhbFN0b3JhZ2Upe1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIpXG4gICAgICAgIC50aGVuKGE9PntcbiAgICAgICAgICAgIGlmKCFhKXtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIsXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYVxuICAgICAgICB9KVxufVxuXG5leHBvcnRzLlVzZXI9VXNlclxuZXhwb3J0cy5Sb2xlPVJvbGVcbmV4cG9ydHMuRmlsZT1GaWxlXG5leHBvcnRzLkxvZz1Mb2dcbmV4cG9ydHMuTW9kZWw9U2VydmljZVxuXG4vKipcbiogYWpheCByZXF1ZXN0XG4qIGNsaWVudCBfaWRcbiAgICAqIGRvbmU6IG9rXG4qIGNsaWVudCBjcmVhdGVkQXQsIHVwZGF0ZWRBdFxuICAgICogZG9uZVxuICAgICogc2VydmVyIHNpZGUgd291bGQgZ2l2ZSBpdHMgb3duIGNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0XG4gICAgICAgICogY2FjaGUgb3BlcmF0aW9uIEludmFsaWRcbiAgICAgICAgICAgICogZGVsZXRlIHRoZW4gY2FjaGVcbiAgICAgICAgICAgICAgICAqIHNhbWUgdHJhbnNhY3Rpb25cblxuICAgICogaGFjayBpbiBhamF4XG4gICAgICAgICogdXBkYXRlOiBjcmVhdGVkQXQhPXVwZGF0ZWRBdFxuICAgICAgICAgICAgKiBjbGllbnQgaW5zZXJ0IHRoZW4gdXBkYXRlXG4gICAgICAgICogY3JlYXRlOiBjcmVhdGVkQXQ9PXVwZGF0ZWRBdFxuXG4qIHJldHVybiBhcHBlbmRlZCBwYXJ0IG9ubHkgVlMgd2hvbGUgb2JqZWN0XG4gICAgKiBtZXJnZSBjbGllbnQgb2JqZWN0IGFuZCBzZXJ2ZXIgcmV0dXJuIG9iamVjdFxuXG4qIGFueSB1cHNlcnQgYW5kIGRlbGV0ZSBtdXN0IGFjdCB0byBzZXJ2ZXIgZGlyZWN0bHlcbiAgICAqIGNhY2hlIGluIGxvY2FsXG4qIGFueSBmaW5kL2ZpbmRPbmUgbXVzdFxuICAgICogZmlyc3Qgb24gbG9jYWxcbiAgICAqIHRoZW4gdG8gcmVtb3RlXG4gICAgICAgICogc2FtZSB3aXRoIGxvY2FsLCB3aXRob3V0IGNhbGwgdG8gc3VjY2Vzc1xuICAgICAgICAqIG5vdCBzYW1lIHdpdGggbG9jYWwsIGNhbGwgdG8gc3VjY2Vzc1xuXG4qL1xuIl19