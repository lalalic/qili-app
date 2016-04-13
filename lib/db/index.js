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
            window.openDatabase = function () {
                var db = window.sqlitePlugin.openDatabase.apply(window.sqlitePlugin, arguments);
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

            Service.init(null, db, ajaxRequest, server, makeLocalStorage(localDb));
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
                    resolve(User.current ? success(db) || db : db);
                } else resolve(db);

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
//# sourceMappingURL=data:application/json;base64,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QUFVLE1BQVY7dUJBQ2YsUUFBUSxjQUFSLENBQXVCLE1BQXZCLENBQThCLEVBQUMsS0FBSSxHQUFKLEVBQVEsWUFBVCxFQUE5QixFQUE4QyxPQUE5QyxFQUF1RCxNQUF2RDthQURlLENBQW5CLENBRGU7U0FMcEI7QUFTQyx3Q0FBVyxLQUFJO0FBQ1gsbUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVjt1QkFDZixRQUFRLGNBQVIsQ0FBdUIsTUFBdkIsQ0FBOEIsR0FBOUIsRUFBa0MsT0FBbEMsRUFBMkMsTUFBM0M7YUFEZSxDQUFuQixDQURXO1NBVGhCO0tBQVAsQ0FGOEI7Q0FBbEM7O0FBa0JBLFFBQVEsSUFBUixHQUFhLElBQWI7QUFDQSxRQUFRLElBQVIsR0FBYSxJQUFiO0FBQ0EsUUFBUSxJQUFSLEdBQWEsSUFBYjtBQUNBLFFBQVEsR0FBUixHQUFZLEdBQVo7QUFDQSxRQUFRLEtBQVIsR0FBYyxPQUFkIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cydcblxuOyhmdW5jdGlvbihlbWl0KXtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oKXtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZW1pdC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXZlbnRFbWl0dGVyIGVycm9yOiAke2UubWVzc2FnZX1gKVxuICAgICAgICB9XG4gICAgfVxufSkoRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0KTtcblxudmFyIFVzZXI9cmVxdWlyZSgnLi91c2VyJyksXG4gICAgUm9sZT1yZXF1aXJlKCcuL3JvbGUnKSxcbiAgICBMb2c9cmVxdWlyZSgnLi9sb2cnKSxcbiAgICBGaWxlPXJlcXVpcmUoJy4vZmlsZScpLFxuICAgIHtTZXJ2aWNlfT1yZXF1aXJlKCcuL3NlcnZpY2UnKSxcbiAgICBfX3dvcmtlcjtcblxudmFyIHtSZW1vdGVEYiwgSHlicmlkRGIsIHV0aWxzfT1yZXF1aXJlKCdtaW5pbW9uZ28nKSxcbiAgICBkYixkYlByb21pc2U7XG5cbnZhciBhcHBJZCxcbiAgICBzZXJ2ZXIsXG4gICAgZ0h0dHBFcnJvckhhbmRsZXIsXG4gICAgbG9hZGluZ0hhbmRsZXI7XG5cbmZ1bmN0aW9uIG1ha2VFbnZSZWFkeSgpe1xuICAgIChmdW5jdGlvbih3aW5kb3cpe1xuICAgICAgICBpZih0eXBlb2Yod2luZG93LmNvcmRvdmEpIT0ndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LnNxbGl0ZVBsdWdpbiE9J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgd2luZG93LmRlbGV0ZURhdGFiYXNlPXdpbmRvdy5zcWxpdGVQbHVnaW4uZGVsZXRlRGF0YWJhc2VcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuRGF0YWJhc2U9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgZGI9d2luZG93LnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2UuYXBwbHkod2luZG93LnNxbGl0ZVBsdWdpbixhcmd1bWVudHMpXG4gICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9ufHxcIlwiXG4gICAgICAgICAgICAgICAgZGIuY2hhbmdlVmVyc2lvbj1mdW5jdGlvbihvbGRWZXJzaW9uLG5ld1ZlcnNpb24sdHJhbnNDYWxsYmFjaywgZXJyb3IsIHN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnZlcnNpb24hPT1vbGRWZXJzaW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yID8gZXJyb3IoXCJcIikgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYW5zQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbih0cmFuc0NhbGxiYWNrLCBlcnJvciwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYi52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb249bmV3VmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihzdWNjZXNzKSE9J3VuZGVmaW5lZCcgJiYgc3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbj1uZXdWZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/Z2xvYmFsLndpbmRvdz17fSA6IHdpbmRvdyk7XG5cbn1cblxuZnVuY3Rpb24gZml4TWluaW1vbmdvKGRiKXtcbiAgICByZXF1aXJlKCcuL2ZpeC1taW5pbW9uZ28nKShkYilcbn1cblxuZnVuY3Rpb24gYWpheFJlcXVlc3QobWV0aG9kPSdnZXQnLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9hcHBJZCwgX3Nlc3Npb25Ub2tlbikge1xuICAgIGlmKCFhcHBJZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHNwZWNpZnkgYXBwbGljYXRpb24gS2V5IGZpcnN0XCIpXG4gICAgbWV0aG9kPW1ldGhvZC50b0xvd2VyQ2FzZSgpXG4gICAgbG9hZGluZ0hhbmRsZXIuc2hvdygpXG4gICAgdHJ5e1xuICAgICAgICBpZihwYXJhbXMpe1xuICAgICAgICAgICAgcGFyYW1zLnNlbGVjdG9yICYmIHBhcmFtcy5zZWxlY3RvciE9XCJ7fVwiICYmIChwYXJhbXMucXVlcnk9cGFyYW1zLnNlbGVjdG9yKTtcbiAgICAgICAgICAgIHZhciBwPVtdXG4gICAgICAgICAgICAnc29ydCxsaW1pdCxza2lwdCxmaWVsZHMscXVlcnknLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xuICAgICAgICAgICAgICAgIHBhcmFtc1trZXldICYmIHAucHVzaChrZXkrJz0nK3BhcmFtc1trZXldKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuXG4gICAgICAgICAgICB1cmw9IXAubGVuZ3RoID8gdXJsIDogdXJsKyh1cmwuaW5kZXhPZignPycpPT0tMSA/ICc/JyA6ICcmJykrcC5qb2luKCcmJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZT14aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpLFxuICAgICAgICAgICAgICAgICAgICByO1xuICAgICAgICAgICAgICAgIGlmKHR5cGUgJiYgdHlwZS5pbmRleE9mKCcvanNvbicpIT0tMSl7XG4gICAgICAgICAgICAgICAgICAgIHI9SlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHI9eGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kIT0nZ2V0JyAmJiBnSHR0cEVycm9ySGFuZGxlcihgJHttZXRob2Q9PSdkZWxldGUnID8gJ0RlbGV0ZWQnIDonU2F2ZWQnfSBzdWNjZXNzZnVsbHlgLCdJbmZvJyk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhyKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtPXJ8fCh4aHIuc3RhdHVzPT0wJiZcIk5vIG5ldHdvcmtcIil8fFwiZXJyb3IgaGFwcGVuc1wiO1xuICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihtKT09MCAmJiBnSHR0cEVycm9ySGFuZGxlcihtKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub3BlbihtZXRob2QsdXJsLHRydWUpXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0JylcblxuICAgICAgICB2YXIgaXNKc29uPWZhbHNlXG5cbiAgICAgICAgaWYobWV0aG9kPT0nZGVsZXRlJylcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCd0ZXh0L3BsYWluJyk7XG4gICAgICAgIGVsc2UgaWYoZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKVxuICAgICAgICAgICAgOy8veGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ211bHRpcGFydC9mb3JtLWRhdGEnKVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JylcbiAgICAgICAgICAgIGlzSnNvbj10cnVlXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXBwbGljYXRpb24tSWQnLF9hcHBJZHx8YXBwSWQpXG4gICAgICAgIGlmKFVzZXIuY3VycmVudClcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVNlc3Npb24tVG9rZW4nLFVzZXIuY3VycmVudC5zZXNzaW9uVG9rZW4pLy9jdXJyZW50IHVzZXJuYW1lLCBzYW1lIHdpdGggX2lkXG4gICAgICAgIGlmKF9zZXNzaW9uVG9rZW4pXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxfc2Vzc2lvblRva2VuKVxuXG4gICAgICAgIHhoci5zZW5kKHR5cGVvZihkYXRhKT09J3N0cmluZycgfHwgIWlzSnNvbiA/IGRhdGEgOiBKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICB9Y2F0Y2goZSl7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKVxuICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgfVxuICAgIHJldHVybiB4aHJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoX3NlcnZlcixfYXBwSWQsIHN1Y2Nlc3MsIGh0dHBFcnJvciwgX2xvYWRpbmdIYW5kbGVyKXtcbiAgICBtYWtlRW52UmVhZHkoKVxuXG4gICAgYXBwSWQ9X2FwcElkXG4gICAgc2VydmVyPV9zZXJ2ZXJcbiAgICBnSHR0cEVycm9ySGFuZGxlcj1odHRwRXJyb3IgfHwgKChlLCBjb2RlKT0+Y29uc29sZS5lcnJvcihgaHR0cCBlcnJvciB3aXRoIHN0YXR1cyAke2NvZGV9OiAke2V9YCkpO1xuICAgIGxvYWRpbmdIYW5kbGVyPV9sb2FkaW5nSGFuZGxlciB8fCB7c2hvdygpe30sY2xvc2UoKXt9fVxuXG4gICAgcmV0dXJuIGRiUHJvbWlzZT1uZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICB1dGlscy5hdXRvc2VsZWN0TG9jYWxEYih7bmFtZXNwYWNlOmBxaWxpLiR7X2FwcElkfWB9LGZ1bmN0aW9uKGxvY2FsRGIpe1xuICAgICAgICAgICAgZGI9bmV3IEh5YnJpZERiKGxvY2FsRGIsbmV3IFJlbW90ZURiKHNlcnZlcitcImNsYXNzZXMvXCIse30sYWpheFJlcXVlc3QpKTtcbiAgICAgICAgICAgIGZpeE1pbmltb25nbyhkYilcblxuICAgICAgICAgICAgU2VydmljZS5pbml0KG51bGwsZGIsIGFqYXhSZXF1ZXN0LHNlcnZlciwgbWFrZUxvY2FsU3RvcmFnZShsb2NhbERiKSlcbiAgICAgICAgICAgIFNlcnZpY2UuaXNDdXJyZW50QXBwPWZ1bmN0aW9uKF9fYXBwSWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBfYXBwSWQ9PV9fYXBwSWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFVzZXIuaW5pdCgpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBSb2xlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBGaWxlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBMb2cuaW5pdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYoc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsKCk9PnN1Y2Nlc3MoZGIpKVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFVzZXIuY3VycmVudCA/IHN1Y2Nlc3MoZGIpfHxkYiA6IGRiKVxuICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGIpXG5cbiAgICAgICAgICAgICAgICBzdXBwb3J0V29ya2VyKF9zZXJ2ZXIsIF9hcHBJZClcblxuICAgICAgICAgICAgICAgIFNlcnZpY2UuZW1pdCgnaW5pdGVkJylcbiAgICAgICAgICAgIH0scmVqZWN0KVxuXG4gICAgICAgIH0scmVqZWN0KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRXb3JrZXIoc2VydmVyLCBhcHBJZCl7LypcbiAgICByZXR1cm4gZmFsc2VcbiAgICBfX3dvcmtlcj1yZXF1aXJlKCd3ZWJ3b3JraWZ5JykocmVxdWlyZSgnLi93b3JrZXIuanMnKSlcbiAgICA7KGZ1bmN0aW9uKHBvc3RNZXNzYWdlKXtcbiAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2U9ZnVuY3Rpb24obSwgLi4uZGF0YSl7XG4gICAgICAgICAgICBwb3N0TWVzc2FnZS5jYWxsKF9fd29ya2VyLCB7dHlwZTptLCBhcmdzOkpTT04uc3RyaW5naWZ5KGRhdGEpfSlcbiAgICAgICAgfVxuICAgIH0pKF9fd29ya2VyLnBvc3RNZXNzYWdlKTtcblxuXG4gICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ2luaXQnLCBzZXJ2ZXIsIGFwcElkKVxuXG5cblxuXG4gICAgVXNlci5vbignY2hhbmdlJywoKT0+X193b3JrZXIucG9zdE1lc3NhZ2UoJ3VzZXInLFVzZXIuY3VycmVudCkpXG4gICAgaWYoVXNlci5jdXJyZW50KVxuICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgndXNlcicsIFVzZXIuY3VycmVudClcblxuICAgIDsoZnVuY3Rpb24oX2FkZENvbGxlY3Rpb24pe1xuICAgICAgICBmdW5jdGlvbiB3cmFwKHN1Y2Nlc3Msc3RhdGUsIHR5cGUpe1xuICAgICAgICAgICAgcmV0dXJuICgpPT57XG4gICAgICAgICAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2Uoc3RhdGUsdHlwZSlcbiAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uPWZ1bmN0aW9uKG5hbWUsIG9wdCl7XG4gICAgICAgICAgICBfYWRkQ29sbGVjdGlvbi5jYWxsKHRoaXMsLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgdmFyIHI9dGhpc1tuYW1lXVxuXG4gICAgICAgICAgICA7KGZ1bmN0aW9uKHVwc2VydCl7XG4gICAgICAgICAgICAgICAgci51cHNlcnQ9ZnVuY3Rpb24oZG9jcywgYmFzZXMsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwc2VydC5jYWxsKHRoaXMsIGRvY3MsIGJhc2VzLCB3cmFwKHN1Y2Nlc3MsJ3Vwc2VydCcsbmFtZSksIGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKHIudXBzZXJ0KVxuXG4gICAgICAgICAgICA7KGZ1bmN0aW9uKHJlbW92ZSl7XG4gICAgICAgICAgICAgICAgci5yZW1vdmU9ZnVuY3Rpb24oaWQsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZS5jYWxsKHRoaXMsaWQsIHdyYXAoc3VjY2VzcywncmVtb3ZlJyxuYW1lKSxlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KShyLnJlbW92ZSlcblxuICAgICAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ2FkZENvbGxlY3Rpb24nLG5hbWUpXG4gICAgICAgICAgICByZXR1cm4gclxuICAgICAgICB9XG4gICAgfSkoSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb24pOyovXG59XG5cbmZ1bmN0aW9uIG1ha2VMb2NhbFN0b3JhZ2UobG9jYWxEYil7XG4gICAgbG9jYWxEYi5hZGRDb2xsZWN0aW9uKFwiX19sb2NhbFN0b3JhZ2VcIilcbiAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0SXRlbShrZXkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UuZmluZE9uZSh7X2lkOmtleX0sKGEpPT5yZXNvbHZlKGEgJiYgYS52YWx1ZSksIHJlamVjdCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SXRlbShrZXksIHZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLnVwc2VydCh7X2lkOmtleSx2YWx1ZX0scmVzb2x2ZSwgcmVqZWN0KSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVJdGVtKGtleSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5yZW1vdmUoa2V5LHJlc29sdmUsIHJlamVjdCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbn1cblxuZXhwb3J0cy5Vc2VyPVVzZXJcbmV4cG9ydHMuUm9sZT1Sb2xlXG5leHBvcnRzLkZpbGU9RmlsZVxuZXhwb3J0cy5Mb2c9TG9nXG5leHBvcnRzLk1vZGVsPVNlcnZpY2VcblxuLyoqXG4qIGFqYXggcmVxdWVzdFxuKiBjbGllbnQgX2lkXG4gICAgKiBkb25lOiBva1xuKiBjbGllbnQgY3JlYXRlZEF0LCB1cGRhdGVkQXRcbiAgICAqIGRvbmVcbiAgICAqIHNlcnZlciBzaWRlIHdvdWxkIGdpdmUgaXRzIG93biBjcmVhdGVkQXQgYW5kIHVwZGF0ZWRBdFxuICAgICAgICAqIGNhY2hlIG9wZXJhdGlvbiBJbnZhbGlkXG4gICAgICAgICAgICAqIGRlbGV0ZSB0aGVuIGNhY2hlXG4gICAgICAgICAgICAgICAgKiBzYW1lIHRyYW5zYWN0aW9uXG5cbiAgICAqIGhhY2sgaW4gYWpheFxuICAgICAgICAqIHVwZGF0ZTogY3JlYXRlZEF0IT11cGRhdGVkQXRcbiAgICAgICAgICAgICogY2xpZW50IGluc2VydCB0aGVuIHVwZGF0ZVxuICAgICAgICAqIGNyZWF0ZTogY3JlYXRlZEF0PT11cGRhdGVkQXRcblxuKiByZXR1cm4gYXBwZW5kZWQgcGFydCBvbmx5IFZTIHdob2xlIG9iamVjdFxuICAgICogbWVyZ2UgY2xpZW50IG9iamVjdCBhbmQgc2VydmVyIHJldHVybiBvYmplY3RcblxuKiBhbnkgdXBzZXJ0IGFuZCBkZWxldGUgbXVzdCBhY3QgdG8gc2VydmVyIGRpcmVjdGx5XG4gICAgKiBjYWNoZSBpbiBsb2NhbFxuKiBhbnkgZmluZC9maW5kT25lIG11c3RcbiAgICAqIGZpcnN0IG9uIGxvY2FsXG4gICAgKiB0aGVuIHRvIHJlbW90ZVxuICAgICAgICAqIHNhbWUgd2l0aCBsb2NhbCwgd2l0aG91dCBjYWxsIHRvIHN1Y2Nlc3NcbiAgICAgICAgKiBub3Qgc2FtZSB3aXRoIGxvY2FsLCBjYWxsIHRvIHN1Y2Nlc3NcblxuKi9cbiJdfQ==