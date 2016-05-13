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
//# sourceMappingURL=data:application/json;base64,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QyxPQUFELEVBQVUsTUFBVjt1QkFDZixRQUFRLGNBQVIsQ0FBdUIsTUFBdkIsQ0FBOEIsRUFBQyxLQUFJLEdBQUosRUFBUSxZQUFULEVBQTlCLEVBQThDLE9BQTlDLEVBQXVELE1BQXZEO2FBRGUsQ0FBbkIsQ0FEZTtTQUxwQjtBQVNDLHdDQUFXLEtBQUk7QUFDWCxtQkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWO3VCQUNmLFFBQVEsY0FBUixDQUF1QixNQUF2QixDQUE4QixHQUE5QixFQUFrQyxPQUFsQyxFQUEyQyxNQUEzQzthQURlLENBQW5CLENBRFc7U0FUaEI7S0FBUCxDQUY4QjtDQUFsQzs7QUFrQkEsUUFBUSxJQUFSLEdBQWEsSUFBYjtBQUNBLFFBQVEsSUFBUixHQUFhLElBQWI7QUFDQSxRQUFRLElBQVIsR0FBYSxJQUFiO0FBQ0EsUUFBUSxHQUFSLEdBQVksR0FBWjtBQUNBLFFBQVEsS0FBUixHQUFjLE9BQWQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJ1xuXG47KGZ1bmN0aW9uKGVtaXQpe1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbigpe1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBlbWl0LmNhbGwodGhpcywgLi4uYXJndW1lbnRzKVxuICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFdmVudEVtaXR0ZXIgZXJyb3I6ICR7ZS5tZXNzYWdlfWApXG4gICAgICAgIH1cbiAgICB9XG59KShFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQpO1xuXG52YXIgVXNlcj1yZXF1aXJlKCcuL3VzZXInKSxcbiAgICBSb2xlPXJlcXVpcmUoJy4vcm9sZScpLFxuICAgIExvZz1yZXF1aXJlKCcuL2xvZycpLFxuICAgIEZpbGU9cmVxdWlyZSgnLi9maWxlJyksXG4gICAge1NlcnZpY2V9PXJlcXVpcmUoJy4vc2VydmljZScpLFxuICAgIF9fd29ya2VyO1xuXG52YXIge1JlbW90ZURiLCBIeWJyaWREYiwgdXRpbHN9PXJlcXVpcmUoJ21pbmltb25nbycpLFxuICAgIGRiLGRiUHJvbWlzZTtcblxudmFyIGFwcElkLFxuICAgIHNlcnZlcixcbiAgICBnSHR0cEVycm9ySGFuZGxlcixcbiAgICBsb2FkaW5nSGFuZGxlcjtcblxuZnVuY3Rpb24gbWFrZUVudlJlYWR5KCl7XG4gICAgKGZ1bmN0aW9uKHdpbmRvdyl7XG4gICAgICAgIGlmKHR5cGVvZih3aW5kb3cuY29yZG92YSkhPSd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuc3FsaXRlUGx1Z2luIT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICB3aW5kb3cuZGVsZXRlRGF0YWJhc2U9d2luZG93LnNxbGl0ZVBsdWdpbi5kZWxldGVEYXRhYmFzZVxuICAgICAgICAgICAgd2luZG93Lm9wZW5EYXRhYmFzZT1mdW5jdGlvbihuYW1lKXtcbiAgICAgICAgICAgICAgICB2YXIgZGI9d2luZG93LnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2Uoe25hbWUsbG9jYXRpb246XCJkZWZhdWx0XCJ9KVxuICAgICAgICAgICAgICAgIGRiLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbnx8XCJcIlxuICAgICAgICAgICAgICAgIGRiLmNoYW5nZVZlcnNpb249ZnVuY3Rpb24ob2xkVmVyc2lvbixuZXdWZXJzaW9uLHRyYW5zQ2FsbGJhY2ssIGVycm9yLCBzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52ZXJzaW9uIT09b2xkVmVyc2lvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvciA/IGVycm9yKFwiXCIpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZih0cmFuc0NhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb24odHJhbnNDYWxsYmFjaywgZXJyb3IsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9uPW5ld1ZlcnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb249bmV3VmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mKHN1Y2Nlc3MpIT0ndW5kZWZpbmVkJyAmJiBzdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSh0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgP2dsb2JhbC53aW5kb3c9e30gOiB3aW5kb3cpO1xuXG59XG5cbmZ1bmN0aW9uIGZpeE1pbmltb25nbyhkYil7XG4gICAgcmVxdWlyZSgnLi9maXgtbWluaW1vbmdvJykoZGIpXG59XG5cbmZ1bmN0aW9uIGFqYXhSZXF1ZXN0KG1ldGhvZD0nZ2V0JywgdXJsLCBwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yLCBfYXBwSWQsIF9zZXNzaW9uVG9rZW4pIHtcbiAgICBpZighYXBwSWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBzcGVjaWZ5IGFwcGxpY2F0aW9uIEtleSBmaXJzdFwiKVxuICAgIG1ldGhvZD1tZXRob2QudG9Mb3dlckNhc2UoKVxuICAgIGxvYWRpbmdIYW5kbGVyLnNob3coKVxuICAgIHRyeXtcbiAgICAgICAgaWYocGFyYW1zKXtcbiAgICAgICAgICAgIHBhcmFtcy5zZWxlY3RvciAmJiBwYXJhbXMuc2VsZWN0b3IhPVwie31cIiAmJiAocGFyYW1zLnF1ZXJ5PXBhcmFtcy5zZWxlY3Rvcik7XG4gICAgICAgICAgICB2YXIgcD1bXVxuICAgICAgICAgICAgJ3NvcnQsbGltaXQsc2tpcHQsZmllbGRzLHF1ZXJ5Jy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5XSAmJiBwLnB1c2goa2V5Kyc9JytwYXJhbXNba2V5XSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5xdWVyeTtcblxuICAgICAgICAgICAgdXJsPSFwLmxlbmd0aCA/IHVybCA6IHVybCsodXJsLmluZGV4T2YoJz8nKT09LTEgPyAnPycgOiAnJicpK3Auam9pbignJicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGU9eGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSxcbiAgICAgICAgICAgICAgICAgICAgcjtcbiAgICAgICAgICAgICAgICBpZih0eXBlICYmIHR5cGUuaW5kZXhPZignL2pzb24nKSE9LTEpe1xuICAgICAgICAgICAgICAgICAgICByPUpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgICAgICByPXhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCE9J2dldCcgJiYgZ0h0dHBFcnJvckhhbmRsZXIoYCR7bWV0aG9kPT0nZGVsZXRlJyA/ICdEZWxldGVkJyA6J1NhdmVkJ30gc3VjY2Vzc2Z1bGx5YCwnSW5mbycpO1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MocilcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbT1yfHwoeGhyLnN0YXR1cz09MCYmXCJObyBuZXR3b3JrXCIpfHxcImVycm9yIGhhcHBlbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IobSk9PTAgJiYgZ0h0dHBFcnJvckhhbmRsZXIobSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLHVybCx0cnVlKVxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpXG5cbiAgICAgICAgdmFyIGlzSnNvbj1mYWxzZVxuXG4gICAgICAgIGlmKG1ldGhvZD09J2RlbGV0ZScpXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywndGV4dC9wbGFpbicpO1xuICAgICAgICBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSlcbiAgICAgICAgICAgIDsvL3hoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCdtdWx0aXBhcnQvZm9ybS1kYXRhJylcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpXG4gICAgICAgICAgICBpc0pzb249dHJ1ZVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUFwcGxpY2F0aW9uLUlkJyxfYXBwSWR8fGFwcElkKVxuICAgICAgICBpZihVc2VyLmN1cnJlbnQpXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxVc2VyLmN1cnJlbnQuc2Vzc2lvblRva2VuKS8vY3VycmVudCB1c2VybmFtZSwgc2FtZSB3aXRoIF9pZFxuICAgICAgICBpZihfc2Vzc2lvblRva2VuKVxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtU2Vzc2lvbi1Ub2tlbicsX3Nlc3Npb25Ub2tlbilcblxuICAgICAgICB4aHIuc2VuZCh0eXBlb2YoZGF0YSk9PSdzdHJpbmcnIHx8ICFpc0pzb24gPyBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgfWNhdGNoKGUpe1xuICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSlcbiAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgIH1cbiAgICByZXR1cm4geGhyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KF9zZXJ2ZXIsX2FwcElkLCBzdWNjZXNzLCBodHRwRXJyb3IsIF9sb2FkaW5nSGFuZGxlcil7XG4gICAgbWFrZUVudlJlYWR5KClcblxuICAgIGFwcElkPV9hcHBJZFxuICAgIHNlcnZlcj1fc2VydmVyXG4gICAgZ0h0dHBFcnJvckhhbmRsZXI9aHR0cEVycm9yIHx8ICgoZSwgY29kZSk9PmNvbnNvbGUuZXJyb3IoYGh0dHAgZXJyb3Igd2l0aCBzdGF0dXMgJHtjb2RlfTogJHtlfWApKTtcbiAgICBsb2FkaW5nSGFuZGxlcj1fbG9hZGluZ0hhbmRsZXIgfHwge3Nob3coKXt9LGNsb3NlKCl7fX1cblxuICAgIHJldHVybiBkYlByb21pc2U9bmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgdXRpbHMuYXV0b3NlbGVjdExvY2FsRGIoe25hbWVzcGFjZTpgcWlsaS4ke19hcHBJZH1gfSxmdW5jdGlvbihsb2NhbERiKXtcbiAgICAgICAgICAgIGRiPW5ldyBIeWJyaWREYihsb2NhbERiLG5ldyBSZW1vdGVEYihzZXJ2ZXIrXCJjbGFzc2VzL1wiLHt9LGFqYXhSZXF1ZXN0KSk7XG4gICAgICAgICAgICBmaXhNaW5pbW9uZ28oZGIpXG5cbiAgICAgICAgICAgIFNlcnZpY2UuaW5pdChudWxsLGRiLCBhamF4UmVxdWVzdCxzZXJ2ZXIsIG1ha2VMb2NhbFN0b3JhZ2UobG9jYWxEYikpXG4gICAgICAgICAgICBTZXJ2aWNlLmlzQ3VycmVudEFwcD1mdW5jdGlvbihfX2FwcElkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2FwcElkPT1fX2FwcElkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBVc2VyLmluaXQoKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgUm9sZS5pbml0KCk7XG4gICAgICAgICAgICAgICAgRmlsZS5pbml0KCk7XG4gICAgICAgICAgICAgICAgTG9nLmluaXQoKTtcblxuICAgICAgICAgICAgICAgIGlmKHN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCgpPT5zdWNjZXNzKGRiKSlcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShVc2VyLmN1cnJlbnQgPyBzdWNjZXNzKGRiKXx8ZGIgOiBkYilcbiAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRiKVxuXG4gICAgICAgICAgICAgICAgc3VwcG9ydFdvcmtlcihfc2VydmVyLCBfYXBwSWQpXG5cbiAgICAgICAgICAgICAgICBTZXJ2aWNlLmVtaXQoJ2luaXRlZCcpXG4gICAgICAgICAgICB9LHJlamVjdClcblxuICAgICAgICB9LHJlamVjdClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzdXBwb3J0V29ya2VyKHNlcnZlciwgYXBwSWQpey8qXG4gICAgcmV0dXJuIGZhbHNlXG4gICAgX193b3JrZXI9cmVxdWlyZSgnd2Vid29ya2lmeScpKHJlcXVpcmUoJy4vd29ya2VyLmpzJykpXG4gICAgOyhmdW5jdGlvbihwb3N0TWVzc2FnZSl7XG4gICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlPWZ1bmN0aW9uKG0sIC4uLmRhdGEpe1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UuY2FsbChfX3dvcmtlciwge3R5cGU6bSwgYXJnczpKU09OLnN0cmluZ2lmeShkYXRhKX0pXG4gICAgICAgIH1cbiAgICB9KShfX3dvcmtlci5wb3N0TWVzc2FnZSk7XG5cblxuICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdpbml0Jywgc2VydmVyLCBhcHBJZClcblxuXG5cblxuICAgIFVzZXIub24oJ2NoYW5nZScsKCk9Pl9fd29ya2VyLnBvc3RNZXNzYWdlKCd1c2VyJyxVc2VyLmN1cnJlbnQpKVxuICAgIGlmKFVzZXIuY3VycmVudClcbiAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ3VzZXInLCBVc2VyLmN1cnJlbnQpXG5cbiAgICA7KGZ1bmN0aW9uKF9hZGRDb2xsZWN0aW9uKXtcbiAgICAgICAgZnVuY3Rpb24gd3JhcChzdWNjZXNzLHN0YXRlLCB0eXBlKXtcbiAgICAgICAgICAgIHJldHVybiAoKT0+e1xuICAgICAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKHN0YXRlLHR5cGUpXG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbj1mdW5jdGlvbihuYW1lLCBvcHQpe1xuICAgICAgICAgICAgX2FkZENvbGxlY3Rpb24uY2FsbCh0aGlzLC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIHZhciByPXRoaXNbbmFtZV1cblxuICAgICAgICAgICAgOyhmdW5jdGlvbih1cHNlcnQpe1xuICAgICAgICAgICAgICAgIHIudXBzZXJ0PWZ1bmN0aW9uKGRvY3MsIGJhc2VzLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1cHNlcnQuY2FsbCh0aGlzLCBkb2NzLCBiYXNlcywgd3JhcChzdWNjZXNzLCd1cHNlcnQnLG5hbWUpLCBlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KShyLnVwc2VydClcblxuICAgICAgICAgICAgOyhmdW5jdGlvbihyZW1vdmUpe1xuICAgICAgICAgICAgICAgIHIucmVtb3ZlPWZ1bmN0aW9uKGlkLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdmUuY2FsbCh0aGlzLGlkLCB3cmFwKHN1Y2Nlc3MsJ3JlbW92ZScsbmFtZSksZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoci5yZW1vdmUpXG5cbiAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdhZGRDb2xsZWN0aW9uJyxuYW1lKVxuICAgICAgICAgICAgcmV0dXJuIHJcbiAgICAgICAgfVxuICAgIH0pKEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uKTsqL1xufVxuXG5mdW5jdGlvbiBtYWtlTG9jYWxTdG9yYWdlKGxvY2FsRGIpe1xuICAgIGxvY2FsRGIuYWRkQ29sbGVjdGlvbihcIl9fbG9jYWxTdG9yYWdlXCIpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldEl0ZW0oa2V5KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLmZpbmRPbmUoe19pZDprZXl9LChhKT0+cmVzb2x2ZShhICYmIGEudmFsdWUpLCByZWplY3QpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEl0ZW0oa2V5LCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS51cHNlcnQoe19pZDprZXksdmFsdWV9LHJlc29sdmUsIHJlamVjdCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlSXRlbShrZXkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UucmVtb3ZlKGtleSxyZXNvbHZlLCByZWplY3QpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG59XG5cbmV4cG9ydHMuVXNlcj1Vc2VyXG5leHBvcnRzLlJvbGU9Um9sZVxuZXhwb3J0cy5GaWxlPUZpbGVcbmV4cG9ydHMuTG9nPUxvZ1xuZXhwb3J0cy5Nb2RlbD1TZXJ2aWNlXG5cbi8qKlxuKiBhamF4IHJlcXVlc3RcbiogY2xpZW50IF9pZFxuICAgICogZG9uZTogb2tcbiogY2xpZW50IGNyZWF0ZWRBdCwgdXBkYXRlZEF0XG4gICAgKiBkb25lXG4gICAgKiBzZXJ2ZXIgc2lkZSB3b3VsZCBnaXZlIGl0cyBvd24gY3JlYXRlZEF0IGFuZCB1cGRhdGVkQXRcbiAgICAgICAgKiBjYWNoZSBvcGVyYXRpb24gSW52YWxpZFxuICAgICAgICAgICAgKiBkZWxldGUgdGhlbiBjYWNoZVxuICAgICAgICAgICAgICAgICogc2FtZSB0cmFuc2FjdGlvblxuXG4gICAgKiBoYWNrIGluIGFqYXhcbiAgICAgICAgKiB1cGRhdGU6IGNyZWF0ZWRBdCE9dXBkYXRlZEF0XG4gICAgICAgICAgICAqIGNsaWVudCBpbnNlcnQgdGhlbiB1cGRhdGVcbiAgICAgICAgKiBjcmVhdGU6IGNyZWF0ZWRBdD09dXBkYXRlZEF0XG5cbiogcmV0dXJuIGFwcGVuZGVkIHBhcnQgb25seSBWUyB3aG9sZSBvYmplY3RcbiAgICAqIG1lcmdlIGNsaWVudCBvYmplY3QgYW5kIHNlcnZlciByZXR1cm4gb2JqZWN0XG5cbiogYW55IHVwc2VydCBhbmQgZGVsZXRlIG11c3QgYWN0IHRvIHNlcnZlciBkaXJlY3RseVxuICAgICogY2FjaGUgaW4gbG9jYWxcbiogYW55IGZpbmQvZmluZE9uZSBtdXN0XG4gICAgKiBmaXJzdCBvbiBsb2NhbFxuICAgICogdGhlbiB0byByZW1vdGVcbiAgICAgICAgKiBzYW1lIHdpdGggbG9jYWwsIHdpdGhvdXQgY2FsbCB0byBzdWNjZXNzXG4gICAgICAgICogbm90IHNhbWUgd2l0aCBsb2NhbCwgY2FsbCB0byBzdWNjZXNzXG5cbiovXG4iXX0=