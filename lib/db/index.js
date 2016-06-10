'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;

var _events = require('events');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _service = require('./service');

var _minimongo = require('minimongo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (emit) {
    _events.EventEmitter.prototype.emit = function () {
        try {
            emit.call.apply(emit, [this].concat(Array.prototype.slice.call(arguments)));
        } catch (e) {
            console.error('EventEmitter error: ' + e.message);
        }
    };
})(_events.EventEmitter.prototype.emit);

var __worker, appId, server, gHttpErrorHandler, db, dbPromise, loadingHandler;

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
        if (_user2.default.current) xhr.setRequestHeader('X-Session-Token', _user2.default.current.sessionToken); //current username, same with _id
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
        _minimongo.utils.autoselectLocalDb({ namespace: 'qili.' + _appId }, function (localDb) {
            db = new _minimongo.HybridDb(localDb, new _minimongo.RemoteDb(server + "classes/", {}, ajaxRequest));
            fixMinimongo(db);

            var localStorage = makeLocalStorage(localDb);

            _service.Service.init(null, db, ajaxRequest, server, localStorage);
            _service.Service.isCurrentApp = function (__appId) {
                return _appId == __appId;
            };

            _user2.default.init().then(function () {
                _role2.default.init();
                _file2.default.init();
                _log2.default.init();

                if (success) {
                    _user2.default.on('change', function () {
                        return success(db);
                    });
                    resolve(_user2.default.current ? Promise.resolve(success(db) || db).then(function (a) {
                        return isTutorialized(localStorage);
                    }) : db);
                } else resolve(isTutorialized(localStorage));

                supportWorker(_server, _appId);

                _service.Service.emit('inited');
            }, reject);
        }, reject);
    });
}

function supportWorker(server, appId) {/*
                                       return false
                                       __worker from 'webworkify')(require('./worker.js'))
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

exports.User = _user2.default;
exports.Role = _role2.default;
exports.File = _file2.default;
exports.Log = _log2.default;
exports.Model = _service.Service;

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
//# sourceMappingURL=data:application/json;base64,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LGNBQVIsQ0FBdUIsTUFBdkIsQ0FBOEIsRUFBQyxLQUFJLEdBQUosRUFBUSxZQUFULEVBQTlCLEVBQThDLE9BQTlDLEVBQXVELE1BQXZEO2FBRGUsQ0FBbkIsQ0FEZTtTQUxwQjtBQVNDLHdDQUFXLEtBQUk7QUFDWCxtQkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWO3VCQUNmLFFBQVEsY0FBUixDQUF1QixNQUF2QixDQUE4QixHQUE5QixFQUFrQyxPQUFsQyxFQUEyQyxNQUEzQzthQURlLENBQW5CLENBRFc7U0FUaEI7S0FBUCxDQUY4QjtDQUFsQzs7QUFrQkEsU0FBUyxjQUFULENBQXdCLFlBQXhCLEVBQXFDO0FBQ2pDLFdBQU8sYUFBYSxPQUFiLENBQXFCLGdCQUFyQixFQUNGLElBREUsQ0FDRyxhQUFHO0FBQ0wsWUFBRyxDQUFDLENBQUQsRUFBRztBQUNGLHlCQUFhLE9BQWIsQ0FBcUIsZ0JBQXJCLEVBQXNDLE1BQXRDLEVBREU7QUFFRixtQkFBTyxLQUFQLENBRkU7U0FBTjtBQUlBLGVBQU8sQ0FBUCxDQUxLO0tBQUgsQ0FEVixDQURpQztDQUFyQzs7QUFXQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLElBQVI7QUFDQSxRQUFRLEdBQVI7QUFDQSxRQUFRLEtBQVIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJ1xuXG47KGZ1bmN0aW9uKGVtaXQpe1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbigpe1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBlbWl0LmNhbGwodGhpcywgLi4uYXJndW1lbnRzKVxuICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFdmVudEVtaXR0ZXIgZXJyb3I6ICR7ZS5tZXNzYWdlfWApXG4gICAgICAgIH1cbiAgICB9XG59KShFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQpO1xuXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5pbXBvcnQgUm9sZSBmcm9tICcuL3JvbGUnXG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJ1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnXG5cbmltcG9ydCB7UmVtb3RlRGIsIEh5YnJpZERiLCB1dGlsc30gZnJvbSAnbWluaW1vbmdvJ1xuXG5cbnZhciBfX3dvcmtlclxuICAgICxhcHBJZFxuICAgICxzZXJ2ZXJcbiAgICAsZ0h0dHBFcnJvckhhbmRsZXJcbiAgICAsZGJcbiAgICAsZGJQcm9taXNlXG4gICAgLGxvYWRpbmdIYW5kbGVyO1xuXG5mdW5jdGlvbiBtYWtlRW52UmVhZHkoKXtcbiAgICAoZnVuY3Rpb24od2luZG93KXtcbiAgICAgICAgaWYodHlwZW9mKHdpbmRvdy5jb3Jkb3ZhKSE9J3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5zcWxpdGVQbHVnaW4hPSd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHdpbmRvdy5kZWxldGVEYXRhYmFzZT13aW5kb3cuc3FsaXRlUGx1Z2luLmRlbGV0ZURhdGFiYXNlXG4gICAgICAgICAgICB3aW5kb3cub3BlbkRhdGFiYXNlPWZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICAgICAgICAgIHZhciBkYj13aW5kb3cuc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7bmFtZSxsb2NhdGlvbjpcImRlZmF1bHRcIn0pXG4gICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9ufHxcIlwiXG4gICAgICAgICAgICAgICAgZGIuY2hhbmdlVmVyc2lvbj1mdW5jdGlvbihvbGRWZXJzaW9uLG5ld1ZlcnNpb24sdHJhbnNDYWxsYmFjaywgZXJyb3IsIHN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnZlcnNpb24hPT1vbGRWZXJzaW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yID8gZXJyb3IoXCJcIikgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYW5zQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbih0cmFuc0NhbGxiYWNrLCBlcnJvciwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYi52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb249bmV3VmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihzdWNjZXNzKSE9J3VuZGVmaW5lZCcgJiYgc3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbj1uZXdWZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/Z2xvYmFsLndpbmRvdz17fSA6IHdpbmRvdyk7XG5cbn1cblxuZnVuY3Rpb24gZml4TWluaW1vbmdvKGRiKXtcbiAgICByZXF1aXJlKCcuL2ZpeC1taW5pbW9uZ28nKShkYilcbn1cblxuZnVuY3Rpb24gYWpheFJlcXVlc3QobWV0aG9kPSdnZXQnLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9hcHBJZCwgX3Nlc3Npb25Ub2tlbikge1xuICAgIGlmKCFhcHBJZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHNwZWNpZnkgYXBwbGljYXRpb24gS2V5IGZpcnN0XCIpXG4gICAgbWV0aG9kPW1ldGhvZC50b0xvd2VyQ2FzZSgpXG4gICAgbG9hZGluZ0hhbmRsZXIuc2hvdygpXG4gICAgdHJ5e1xuICAgICAgICBpZihwYXJhbXMpe1xuICAgICAgICAgICAgcGFyYW1zLnNlbGVjdG9yICYmIHBhcmFtcy5zZWxlY3RvciE9XCJ7fVwiICYmIChwYXJhbXMucXVlcnk9cGFyYW1zLnNlbGVjdG9yKTtcbiAgICAgICAgICAgIHZhciBwPVtdXG4gICAgICAgICAgICAnc29ydCxsaW1pdCxza2lwdCxmaWVsZHMscXVlcnknLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xuICAgICAgICAgICAgICAgIHBhcmFtc1trZXldICYmIHAucHVzaChrZXkrJz0nK3BhcmFtc1trZXldKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuXG4gICAgICAgICAgICB1cmw9IXAubGVuZ3RoID8gdXJsIDogdXJsKyh1cmwuaW5kZXhPZignPycpPT0tMSA/ICc/JyA6ICcmJykrcC5qb2luKCcmJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZT14aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpLFxuICAgICAgICAgICAgICAgICAgICByO1xuICAgICAgICAgICAgICAgIGlmKHR5cGUgJiYgdHlwZS5pbmRleE9mKCcvanNvbicpIT0tMSl7XG4gICAgICAgICAgICAgICAgICAgIHI9SlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHI9eGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kIT0nZ2V0JyAmJiBnSHR0cEVycm9ySGFuZGxlcihgJHttZXRob2Q9PSdkZWxldGUnID8gJ0RlbGV0ZWQnIDonU2F2ZWQnfSBzdWNjZXNzZnVsbHlgLCdJbmZvJyk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhyKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtPXJ8fCh4aHIuc3RhdHVzPT0wJiZcIk5vIG5ldHdvcmtcIil8fFwiZXJyb3IgaGFwcGVuc1wiO1xuICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihtKT09MCAmJiBnSHR0cEVycm9ySGFuZGxlcihtKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub3BlbihtZXRob2QsdXJsLHRydWUpXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0JylcblxuICAgICAgICB2YXIgaXNKc29uPWZhbHNlXG5cbiAgICAgICAgaWYobWV0aG9kPT0nZGVsZXRlJylcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCd0ZXh0L3BsYWluJyk7XG4gICAgICAgIGVsc2UgaWYoZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKVxuICAgICAgICAgICAgOy8veGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ211bHRpcGFydC9mb3JtLWRhdGEnKVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JylcbiAgICAgICAgICAgIGlzSnNvbj10cnVlXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXBwbGljYXRpb24tSWQnLF9hcHBJZHx8YXBwSWQpXG4gICAgICAgIGlmKFVzZXIuY3VycmVudClcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVNlc3Npb24tVG9rZW4nLFVzZXIuY3VycmVudC5zZXNzaW9uVG9rZW4pLy9jdXJyZW50IHVzZXJuYW1lLCBzYW1lIHdpdGggX2lkXG4gICAgICAgIGlmKF9zZXNzaW9uVG9rZW4pXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxfc2Vzc2lvblRva2VuKVxuXG4gICAgICAgIHhoci5zZW5kKHR5cGVvZihkYXRhKT09J3N0cmluZycgfHwgIWlzSnNvbiA/IGRhdGEgOiBKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICB9Y2F0Y2goZSl7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKVxuICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgfVxuICAgIHJldHVybiB4aHJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoX3NlcnZlcixfYXBwSWQsIHN1Y2Nlc3MsIGh0dHBFcnJvciwgX2xvYWRpbmdIYW5kbGVyKXtcbiAgICBtYWtlRW52UmVhZHkoKVxuXG4gICAgYXBwSWQ9X2FwcElkXG4gICAgc2VydmVyPV9zZXJ2ZXJcbiAgICBnSHR0cEVycm9ySGFuZGxlcj1odHRwRXJyb3IgfHwgKChlLCBjb2RlKT0+Y29uc29sZS5lcnJvcihgaHR0cCBlcnJvciB3aXRoIHN0YXR1cyAke2NvZGV9OiAke2V9YCkpO1xuICAgIGxvYWRpbmdIYW5kbGVyPV9sb2FkaW5nSGFuZGxlciB8fCB7c2hvdygpe30sY2xvc2UoKXt9fVxuXG4gICAgcmV0dXJuIGRiUHJvbWlzZT1uZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICB1dGlscy5hdXRvc2VsZWN0TG9jYWxEYih7bmFtZXNwYWNlOmBxaWxpLiR7X2FwcElkfWB9LGZ1bmN0aW9uKGxvY2FsRGIpe1xuICAgICAgICAgICAgZGI9bmV3IEh5YnJpZERiKGxvY2FsRGIsbmV3IFJlbW90ZURiKHNlcnZlcitcImNsYXNzZXMvXCIse30sYWpheFJlcXVlc3QpKTtcbiAgICAgICAgICAgIGZpeE1pbmltb25nbyhkYilcblxuICAgICAgICAgICAgbGV0IGxvY2FsU3RvcmFnZT1tYWtlTG9jYWxTdG9yYWdlKGxvY2FsRGIpXG5cbiAgICAgICAgICAgIFNlcnZpY2UuaW5pdChudWxsLGRiLCBhamF4UmVxdWVzdCxzZXJ2ZXIsIGxvY2FsU3RvcmFnZSlcbiAgICAgICAgICAgIFNlcnZpY2UuaXNDdXJyZW50QXBwPWZ1bmN0aW9uKF9fYXBwSWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBfYXBwSWQ9PV9fYXBwSWRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVXNlci5pbml0KCkudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIFJvbGUuaW5pdCgpO1xuICAgICAgICAgICAgICAgIEZpbGUuaW5pdCgpO1xuICAgICAgICAgICAgICAgIExvZy5pbml0KCk7XG5cbiAgICAgICAgICAgICAgICBpZihzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywoKT0+c3VjY2VzcyhkYikpXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoVXNlci5jdXJyZW50ID8gUHJvbWlzZS5yZXNvbHZlKHN1Y2Nlc3MoZGIpfHxkYikudGhlbihhPT5pc1R1dG9yaWFsaXplZChsb2NhbFN0b3JhZ2UpKSA6IGRiKVxuICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaXNUdXRvcmlhbGl6ZWQobG9jYWxTdG9yYWdlKSlcblxuICAgICAgICAgICAgICAgIHN1cHBvcnRXb3JrZXIoX3NlcnZlciwgX2FwcElkKVxuXG4gICAgICAgICAgICAgICAgU2VydmljZS5lbWl0KCdpbml0ZWQnKVxuICAgICAgICAgICAgfSxyZWplY3QpXG5cbiAgICAgICAgfSxyZWplY3QpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc3VwcG9ydFdvcmtlcihzZXJ2ZXIsIGFwcElkKXsvKlxuICAgIHJldHVybiBmYWxzZVxuICAgIF9fd29ya2VyIGZyb20gJ3dlYndvcmtpZnknKShyZXF1aXJlKCcuL3dvcmtlci5qcycpKVxuICAgIDsoZnVuY3Rpb24ocG9zdE1lc3NhZ2Upe1xuICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZT1mdW5jdGlvbihtLCAuLi5kYXRhKXtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlLmNhbGwoX193b3JrZXIsIHt0eXBlOm0sIGFyZ3M6SlNPTi5zdHJpbmdpZnkoZGF0YSl9KVxuICAgICAgICB9XG4gICAgfSkoX193b3JrZXIucG9zdE1lc3NhZ2UpO1xuXG5cbiAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgnaW5pdCcsIHNlcnZlciwgYXBwSWQpXG5cblxuXG5cbiAgICBVc2VyLm9uKCdjaGFuZ2UnLCgpPT5fX3dvcmtlci5wb3N0TWVzc2FnZSgndXNlcicsVXNlci5jdXJyZW50KSlcbiAgICBpZihVc2VyLmN1cnJlbnQpXG4gICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCd1c2VyJywgVXNlci5jdXJyZW50KVxuXG4gICAgOyhmdW5jdGlvbihfYWRkQ29sbGVjdGlvbil7XG4gICAgICAgIGZ1bmN0aW9uIHdyYXAoc3VjY2VzcyxzdGF0ZSwgdHlwZSl7XG4gICAgICAgICAgICByZXR1cm4gKCk9PntcbiAgICAgICAgICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZShzdGF0ZSx0eXBlKVxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb249ZnVuY3Rpb24obmFtZSwgb3B0KXtcbiAgICAgICAgICAgIF9hZGRDb2xsZWN0aW9uLmNhbGwodGhpcywuLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB2YXIgcj10aGlzW25hbWVdXG5cbiAgICAgICAgICAgIDsoZnVuY3Rpb24odXBzZXJ0KXtcbiAgICAgICAgICAgICAgICByLnVwc2VydD1mdW5jdGlvbihkb2NzLCBiYXNlcywgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBzZXJ0LmNhbGwodGhpcywgZG9jcywgYmFzZXMsIHdyYXAoc3VjY2VzcywndXBzZXJ0JyxuYW1lKSwgZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoci51cHNlcnQpXG5cbiAgICAgICAgICAgIDsoZnVuY3Rpb24ocmVtb3ZlKXtcbiAgICAgICAgICAgICAgICByLnJlbW92ZT1mdW5jdGlvbihpZCwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlLmNhbGwodGhpcyxpZCwgd3JhcChzdWNjZXNzLCdyZW1vdmUnLG5hbWUpLGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKHIucmVtb3ZlKVxuXG4gICAgICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgnYWRkQ29sbGVjdGlvbicsbmFtZSlcbiAgICAgICAgICAgIHJldHVybiByXG4gICAgICAgIH1cbiAgICB9KShIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbik7Ki9cbn1cblxuZnVuY3Rpb24gbWFrZUxvY2FsU3RvcmFnZShsb2NhbERiKXtcbiAgICBsb2NhbERiLmFkZENvbGxlY3Rpb24oXCJfX2xvY2FsU3RvcmFnZVwiKVxuICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRJdGVtKGtleSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5maW5kT25lKHtfaWQ6a2V5fSwoYSk9PnJlc29sdmUoYSAmJiBhLnZhbHVlKSwgcmVqZWN0KSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRJdGVtKGtleSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UudXBzZXJ0KHtfaWQ6a2V5LHZhbHVlfSxyZXNvbHZlLCByZWplY3QpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUl0ZW0oa2V5KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLnJlbW92ZShrZXkscmVzb2x2ZSwgcmVqZWN0KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxufVxuXG5mdW5jdGlvbiBpc1R1dG9yaWFsaXplZChsb2NhbFN0b3JhZ2Upe1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIpXG4gICAgICAgIC50aGVuKGE9PntcbiAgICAgICAgICAgIGlmKCFhKXtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIsXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYVxuICAgICAgICB9KVxufVxuXG5leHBvcnRzLlVzZXI9VXNlclxuZXhwb3J0cy5Sb2xlPVJvbGVcbmV4cG9ydHMuRmlsZT1GaWxlXG5leHBvcnRzLkxvZz1Mb2dcbmV4cG9ydHMuTW9kZWw9U2VydmljZVxuXG4vKipcbiogYWpheCByZXF1ZXN0XG4qIGNsaWVudCBfaWRcbiAgICAqIGRvbmU6IG9rXG4qIGNsaWVudCBjcmVhdGVkQXQsIHVwZGF0ZWRBdFxuICAgICogZG9uZVxuICAgICogc2VydmVyIHNpZGUgd291bGQgZ2l2ZSBpdHMgb3duIGNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0XG4gICAgICAgICogY2FjaGUgb3BlcmF0aW9uIEludmFsaWRcbiAgICAgICAgICAgICogZGVsZXRlIHRoZW4gY2FjaGVcbiAgICAgICAgICAgICAgICAqIHNhbWUgdHJhbnNhY3Rpb25cblxuICAgICogaGFjayBpbiBhamF4XG4gICAgICAgICogdXBkYXRlOiBjcmVhdGVkQXQhPXVwZGF0ZWRBdFxuICAgICAgICAgICAgKiBjbGllbnQgaW5zZXJ0IHRoZW4gdXBkYXRlXG4gICAgICAgICogY3JlYXRlOiBjcmVhdGVkQXQ9PXVwZGF0ZWRBdFxuXG4qIHJldHVybiBhcHBlbmRlZCBwYXJ0IG9ubHkgVlMgd2hvbGUgb2JqZWN0XG4gICAgKiBtZXJnZSBjbGllbnQgb2JqZWN0IGFuZCBzZXJ2ZXIgcmV0dXJuIG9iamVjdFxuXG4qIGFueSB1cHNlcnQgYW5kIGRlbGV0ZSBtdXN0IGFjdCB0byBzZXJ2ZXIgZGlyZWN0bHlcbiAgICAqIGNhY2hlIGluIGxvY2FsXG4qIGFueSBmaW5kL2ZpbmRPbmUgbXVzdFxuICAgICogZmlyc3Qgb24gbG9jYWxcbiAgICAqIHRoZW4gdG8gcmVtb3RlXG4gICAgICAgICogc2FtZSB3aXRoIGxvY2FsLCB3aXRob3V0IGNhbGwgdG8gc3VjY2Vzc1xuICAgICAgICAqIG5vdCBzYW1lIHdpdGggbG9jYWwsIGNhbGwgdG8gc3VjY2Vzc1xuXG4qL1xuIl19