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
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'get';
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

                var pTutorial = _user2.default.isTutorialized();
                if (success) {
                    _user2.default.on('change', function () {
                        return success(db);
                    });
                    if (_user2.default.current) {
                        Promise.resolve(success(db) || db).then(function (a) {
                            return resolve(pTutorial);
                        });
                    } else {
                        resolve(pTutorial);
                    }
                } else resolve(pTutorial);

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
        getItem: function getItem(key, defaultValue) {
            return new Promise(function (resolve, reject) {
                return localDb.__localStorage.findOne({ _id: key }, function (a) {
                    return resolve(a && a.value);
                }, typeof defaultValue == 'undefined' ? reject : function (e) {
                    return resolve(defaultValue);
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiZW1pdCIsInByb3RvdHlwZSIsImNhbGwiLCJhcmd1bWVudHMiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsIl9fd29ya2VyIiwiYXBwSWQiLCJzZXJ2ZXIiLCJnSHR0cEVycm9ySGFuZGxlciIsImRiIiwiZGJQcm9taXNlIiwibG9hZGluZ0hhbmRsZXIiLCJtYWtlRW52UmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwic3FsaXRlUGx1Z2luIiwiZGVsZXRlRGF0YWJhc2UiLCJvcGVuRGF0YWJhc2UiLCJuYW1lIiwibG9jYXRpb24iLCJ2ZXJzaW9uIiwibG9jYWxTdG9yYWdlIiwiZGJWZXJzaW9uIiwiY2hhbmdlVmVyc2lvbiIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwidHJhbnNDYWxsYmFjayIsInN1Y2Nlc3MiLCJ0cmFuc2FjdGlvbiIsImdsb2JhbCIsImZpeE1pbmltb25nbyIsInJlcXVpcmUiLCJhamF4UmVxdWVzdCIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJfYXBwSWQiLCJfc2Vzc2lvblRva2VuIiwiRXJyb3IiLCJ0b0xvd2VyQ2FzZSIsInNob3ciLCJzZWxlY3RvciIsInF1ZXJ5IiwicCIsInNwbGl0IiwiZm9yRWFjaCIsImtleSIsInB1c2giLCJsZW5ndGgiLCJpbmRleE9mIiwiam9pbiIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsInIiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJjbG9zZSIsInN0YXR1cyIsIm0iLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImlzSnNvbiIsIkZvcm1EYXRhIiwiY3VycmVudCIsInNlc3Npb25Ub2tlbiIsInNlbmQiLCJzdHJpbmdpZnkiLCJfc2VydmVyIiwiaHR0cEVycm9yIiwiX2xvYWRpbmdIYW5kbGVyIiwiY29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYXV0b3NlbGVjdExvY2FsRGIiLCJuYW1lc3BhY2UiLCJsb2NhbERiIiwibWFrZUxvY2FsU3RvcmFnZSIsImlzQ3VycmVudEFwcCIsIl9fYXBwSWQiLCJ0aGVuIiwicFR1dG9yaWFsIiwiaXNUdXRvcmlhbGl6ZWQiLCJvbiIsInN1cHBvcnRXb3JrZXIiLCJhZGRDb2xsZWN0aW9uIiwiZ2V0SXRlbSIsImRlZmF1bHRWYWx1ZSIsIl9fbG9jYWxTdG9yYWdlIiwiZmluZE9uZSIsIl9pZCIsImEiLCJ2YWx1ZSIsInNldEl0ZW0iLCJ1cHNlcnQiLCJyZW1vdmVJdGVtIiwicmVtb3ZlIiwiZXhwb3J0cyIsIlVzZXIiLCJSb2xlIiwiRmlsZSIsIkxvZyIsIk1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7OztRQXVJZ0JBLEksR0FBQUEsSTs7QUF2SWhCOztBQVlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFoQkMsQ0FBQyxVQUFTQyxJQUFULEVBQWM7QUFDWix5QkFBYUMsU0FBYixDQUF1QkQsSUFBdkIsR0FBNEIsWUFBVTtBQUNsQyxZQUFHO0FBQ0NBLGlCQUFLRSxJQUFMLGNBQVUsSUFBVixvQ0FBbUJDLFNBQW5CO0FBQ0gsU0FGRCxDQUVDLE9BQU1DLENBQU4sRUFBUTtBQUNMQyxvQkFBUUMsS0FBUiwwQkFBcUNGLEVBQUVHLE9BQXZDO0FBQ0g7QUFDSixLQU5EO0FBT0gsQ0FSQSxFQVFFLHFCQUFhTixTQUFiLENBQXVCRCxJQVJ6Qjs7QUFtQkQsSUFBSVEsUUFBSixFQUNLQyxLQURMLEVBRUtDLE1BRkwsRUFHS0MsaUJBSEwsRUFJS0MsRUFKTCxFQUtLQyxTQUxMLEVBTUtDLGNBTkw7O0FBUUEsU0FBU0MsWUFBVCxHQUF1QjtBQUNuQixLQUFDLFVBQVNDLE1BQVQsRUFBZ0I7QUFDYixZQUFHLE9BQU9BLE9BQU9DLE9BQWQsSUFBd0IsV0FBeEIsSUFBdUMsT0FBT0QsT0FBT0UsWUFB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QlEsTUFBdkIsQ0FBOEJ2RCxHQUE5QixFQUFrQytCLE9BQWxDLEVBQTJDQyxNQUEzQyxDQURlO0FBQUEsYUFBWixDQUFQO0FBRUg7QUFiRixLQUFQO0FBZUg7O0FBRUR3QixRQUFRQyxJQUFSO0FBQ0FELFFBQVFFLElBQVI7QUFDQUYsUUFBUUcsSUFBUjtBQUNBSCxRQUFRSSxHQUFSO0FBQ0FKLFFBQVFLLEtBQVI7O0FBRUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJ1xuXG47KGZ1bmN0aW9uKGVtaXQpe1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbigpe1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBlbWl0LmNhbGwodGhpcywgLi4uYXJndW1lbnRzKVxuICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFdmVudEVtaXR0ZXIgZXJyb3I6ICR7ZS5tZXNzYWdlfWApXG4gICAgICAgIH1cbiAgICB9XG59KShFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQpO1xuXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5pbXBvcnQgUm9sZSBmcm9tICcuL3JvbGUnXG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJ1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnXG5cbmltcG9ydCB7UmVtb3RlRGIsIEh5YnJpZERiLCB1dGlsc30gZnJvbSAnbWluaW1vbmdvJ1xuXG5cbnZhciBfX3dvcmtlclxuICAgICxhcHBJZFxuICAgICxzZXJ2ZXJcbiAgICAsZ0h0dHBFcnJvckhhbmRsZXJcbiAgICAsZGJcbiAgICAsZGJQcm9taXNlXG4gICAgLGxvYWRpbmdIYW5kbGVyO1xuXG5mdW5jdGlvbiBtYWtlRW52UmVhZHkoKXtcbiAgICAoZnVuY3Rpb24od2luZG93KXtcbiAgICAgICAgaWYodHlwZW9mKHdpbmRvdy5jb3Jkb3ZhKSE9J3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5zcWxpdGVQbHVnaW4hPSd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgIHdpbmRvdy5kZWxldGVEYXRhYmFzZT13aW5kb3cuc3FsaXRlUGx1Z2luLmRlbGV0ZURhdGFiYXNlXG4gICAgICAgICAgICB3aW5kb3cub3BlbkRhdGFiYXNlPWZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICAgICAgICAgIHZhciBkYj13aW5kb3cuc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7bmFtZSxsb2NhdGlvbjpcImRlZmF1bHRcIn0pXG4gICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9ufHxcIlwiXG4gICAgICAgICAgICAgICAgZGIuY2hhbmdlVmVyc2lvbj1mdW5jdGlvbihvbGRWZXJzaW9uLG5ld1ZlcnNpb24sdHJhbnNDYWxsYmFjaywgZXJyb3IsIHN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnZlcnNpb24hPT1vbGRWZXJzaW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yID8gZXJyb3IoXCJcIikgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYW5zQ2FsbGJhY2spe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbih0cmFuc0NhbGxiYWNrLCBlcnJvciwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYi52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb249bmV3VmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihzdWNjZXNzKSE9J3VuZGVmaW5lZCcgJiYgc3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbj1uZXdWZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZGJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pKHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/Z2xvYmFsLndpbmRvdz17fSA6IHdpbmRvdyk7XG5cbn1cblxuZnVuY3Rpb24gZml4TWluaW1vbmdvKGRiKXtcbiAgICByZXF1aXJlKCcuL2ZpeC1taW5pbW9uZ28nKShkYilcbn1cblxuZnVuY3Rpb24gYWpheFJlcXVlc3QobWV0aG9kPSdnZXQnLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9hcHBJZCwgX3Nlc3Npb25Ub2tlbikge1xuICAgIGlmKCFhcHBJZClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHNwZWNpZnkgYXBwbGljYXRpb24gS2V5IGZpcnN0XCIpXG4gICAgbWV0aG9kPW1ldGhvZC50b0xvd2VyQ2FzZSgpXG4gICAgbG9hZGluZ0hhbmRsZXIuc2hvdygpXG4gICAgdHJ5e1xuICAgICAgICBpZihwYXJhbXMpe1xuICAgICAgICAgICAgcGFyYW1zLnNlbGVjdG9yICYmIHBhcmFtcy5zZWxlY3RvciE9XCJ7fVwiICYmIChwYXJhbXMucXVlcnk9cGFyYW1zLnNlbGVjdG9yKTtcbiAgICAgICAgICAgIHZhciBwPVtdXG4gICAgICAgICAgICAnc29ydCxsaW1pdCxza2lwdCxmaWVsZHMscXVlcnknLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xuICAgICAgICAgICAgICAgIHBhcmFtc1trZXldICYmIHAucHVzaChrZXkrJz0nK3BhcmFtc1trZXldKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xuXG4gICAgICAgICAgICB1cmw9IXAubGVuZ3RoID8gdXJsIDogdXJsKyh1cmwuaW5kZXhPZignPycpPT0tMSA/ICc/JyA6ICcmJykrcC5qb2luKCcmJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZT14aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpLFxuICAgICAgICAgICAgICAgICAgICByO1xuICAgICAgICAgICAgICAgIGlmKHR5cGUgJiYgdHlwZS5pbmRleE9mKCcvanNvbicpIT0tMSl7XG4gICAgICAgICAgICAgICAgICAgIHI9SlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHI9eGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kIT0nZ2V0JyAmJiBnSHR0cEVycm9ySGFuZGxlcihgJHttZXRob2Q9PSdkZWxldGUnID8gJ0RlbGV0ZWQnIDonU2F2ZWQnfSBzdWNjZXNzZnVsbHlgLCdJbmZvJyk7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhyKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtPXJ8fCh4aHIuc3RhdHVzPT0wJiZcIk5vIG5ldHdvcmtcIil8fFwiZXJyb3IgaGFwcGVuc1wiO1xuICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihtKT09MCAmJiBnSHR0cEVycm9ySGFuZGxlcihtKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB4aHIub3BlbihtZXRob2QsdXJsLHRydWUpXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0JylcblxuICAgICAgICB2YXIgaXNKc29uPWZhbHNlXG5cbiAgICAgICAgaWYobWV0aG9kPT0nZGVsZXRlJylcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCd0ZXh0L3BsYWluJyk7XG4gICAgICAgIGVsc2UgaWYoZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKVxuICAgICAgICAgICAgOy8veGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ211bHRpcGFydC9mb3JtLWRhdGEnKVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JylcbiAgICAgICAgICAgIGlzSnNvbj10cnVlXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXBwbGljYXRpb24tSWQnLF9hcHBJZHx8YXBwSWQpXG4gICAgICAgIGlmKFVzZXIuY3VycmVudClcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVNlc3Npb24tVG9rZW4nLFVzZXIuY3VycmVudC5zZXNzaW9uVG9rZW4pLy9jdXJyZW50IHVzZXJuYW1lLCBzYW1lIHdpdGggX2lkXG4gICAgICAgIGlmKF9zZXNzaW9uVG9rZW4pXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxfc2Vzc2lvblRva2VuKVxuXG4gICAgICAgIHhoci5zZW5kKHR5cGVvZihkYXRhKT09J3N0cmluZycgfHwgIWlzSnNvbiA/IGRhdGEgOiBKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICB9Y2F0Y2goZSl7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlKVxuICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXG4gICAgfVxuICAgIHJldHVybiB4aHJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoX3NlcnZlcixfYXBwSWQsIHN1Y2Nlc3MsIGh0dHBFcnJvciwgX2xvYWRpbmdIYW5kbGVyKXtcbiAgICBtYWtlRW52UmVhZHkoKVxuXG4gICAgYXBwSWQ9X2FwcElkXG4gICAgc2VydmVyPV9zZXJ2ZXJcbiAgICBnSHR0cEVycm9ySGFuZGxlcj1odHRwRXJyb3IgfHwgKChlLCBjb2RlKT0+Y29uc29sZS5lcnJvcihgaHR0cCBlcnJvciB3aXRoIHN0YXR1cyAke2NvZGV9OiAke2V9YCkpO1xuICAgIGxvYWRpbmdIYW5kbGVyPV9sb2FkaW5nSGFuZGxlciB8fCB7c2hvdygpe30sY2xvc2UoKXt9fVxuXG4gICAgcmV0dXJuIGRiUHJvbWlzZT1uZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICB1dGlscy5hdXRvc2VsZWN0TG9jYWxEYih7bmFtZXNwYWNlOmBxaWxpLiR7X2FwcElkfWB9LGZ1bmN0aW9uKGxvY2FsRGIpe1xuICAgICAgICAgICAgZGI9bmV3IEh5YnJpZERiKGxvY2FsRGIsbmV3IFJlbW90ZURiKHNlcnZlcitcImNsYXNzZXMvXCIse30sYWpheFJlcXVlc3QpKTtcbiAgICAgICAgICAgIGZpeE1pbmltb25nbyhkYilcblxuICAgICAgICAgICAgbGV0IGxvY2FsU3RvcmFnZT1tYWtlTG9jYWxTdG9yYWdlKGxvY2FsRGIpXG5cbiAgICAgICAgICAgIFNlcnZpY2UuaW5pdChudWxsLGRiLCBhamF4UmVxdWVzdCxzZXJ2ZXIsIGxvY2FsU3RvcmFnZSlcbiAgICAgICAgICAgIFNlcnZpY2UuaXNDdXJyZW50QXBwPWZ1bmN0aW9uKF9fYXBwSWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBfYXBwSWQ9PV9fYXBwSWRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgVXNlci5pbml0KCkudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIFJvbGUuaW5pdCgpO1xuICAgICAgICAgICAgICAgIEZpbGUuaW5pdCgpO1xuICAgICAgICAgICAgICAgIExvZy5pbml0KCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRsZXQgcFR1dG9yaWFsPVVzZXIuaXNUdXRvcmlhbGl6ZWQoKVx0XG4gICAgICAgICAgICAgICAgaWYoc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsKCk9PnN1Y2Nlc3MoZGIpKVxuXHRcdFx0XHRcdGlmKFVzZXIuY3VycmVudCl7XG5cdFx0XHRcdFx0XHRQcm9taXNlLnJlc29sdmUoc3VjY2VzcyhkYil8fGRiKVxuXHRcdFx0XHRcdFx0XHQudGhlbihhPT5yZXNvbHZlKHBUdXRvcmlhbCkpXG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHBUdXRvcmlhbClcblx0XHRcdFx0XHR9ICAgICAgIFxuICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocFR1dG9yaWFsKVxuXG4gICAgICAgICAgICAgICAgc3VwcG9ydFdvcmtlcihfc2VydmVyLCBfYXBwSWQpXG5cbiAgICAgICAgICAgICAgICBTZXJ2aWNlLmVtaXQoJ2luaXRlZCcpXG4gICAgICAgICAgICB9LHJlamVjdClcblxuICAgICAgICB9LHJlamVjdClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzdXBwb3J0V29ya2VyKHNlcnZlciwgYXBwSWQpey8qXG4gICAgcmV0dXJuIGZhbHNlXG4gICAgX193b3JrZXIgZnJvbSAnd2Vid29ya2lmeScpKHJlcXVpcmUoJy4vd29ya2VyLmpzJykpXG4gICAgOyhmdW5jdGlvbihwb3N0TWVzc2FnZSl7XG4gICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlPWZ1bmN0aW9uKG0sIC4uLmRhdGEpe1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UuY2FsbChfX3dvcmtlciwge3R5cGU6bSwgYXJnczpKU09OLnN0cmluZ2lmeShkYXRhKX0pXG4gICAgICAgIH1cbiAgICB9KShfX3dvcmtlci5wb3N0TWVzc2FnZSk7XG5cblxuICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdpbml0Jywgc2VydmVyLCBhcHBJZClcblxuXG5cblxuICAgIFVzZXIub24oJ2NoYW5nZScsKCk9Pl9fd29ya2VyLnBvc3RNZXNzYWdlKCd1c2VyJyxVc2VyLmN1cnJlbnQpKVxuICAgIGlmKFVzZXIuY3VycmVudClcbiAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ3VzZXInLCBVc2VyLmN1cnJlbnQpXG5cbiAgICA7KGZ1bmN0aW9uKF9hZGRDb2xsZWN0aW9uKXtcbiAgICAgICAgZnVuY3Rpb24gd3JhcChzdWNjZXNzLHN0YXRlLCB0eXBlKXtcbiAgICAgICAgICAgIHJldHVybiAoKT0+e1xuICAgICAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKHN0YXRlLHR5cGUpXG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbj1mdW5jdGlvbihuYW1lLCBvcHQpe1xuICAgICAgICAgICAgX2FkZENvbGxlY3Rpb24uY2FsbCh0aGlzLC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIHZhciByPXRoaXNbbmFtZV1cblxuICAgICAgICAgICAgOyhmdW5jdGlvbih1cHNlcnQpe1xuICAgICAgICAgICAgICAgIHIudXBzZXJ0PWZ1bmN0aW9uKGRvY3MsIGJhc2VzLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1cHNlcnQuY2FsbCh0aGlzLCBkb2NzLCBiYXNlcywgd3JhcChzdWNjZXNzLCd1cHNlcnQnLG5hbWUpLCBlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KShyLnVwc2VydClcblxuICAgICAgICAgICAgOyhmdW5jdGlvbihyZW1vdmUpe1xuICAgICAgICAgICAgICAgIHIucmVtb3ZlPWZ1bmN0aW9uKGlkLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdmUuY2FsbCh0aGlzLGlkLCB3cmFwKHN1Y2Nlc3MsJ3JlbW92ZScsbmFtZSksZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoci5yZW1vdmUpXG5cbiAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdhZGRDb2xsZWN0aW9uJyxuYW1lKVxuICAgICAgICAgICAgcmV0dXJuIHJcbiAgICAgICAgfVxuICAgIH0pKEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uKTsqL1xufVxuXG5mdW5jdGlvbiBtYWtlTG9jYWxTdG9yYWdlKGxvY2FsRGIpe1xuICAgIGxvY2FsRGIuYWRkQ29sbGVjdGlvbihcIl9fbG9jYWxTdG9yYWdlXCIpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldEl0ZW0oa2V5LGRlZmF1bHRWYWx1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5maW5kT25lKHtfaWQ6a2V5fSxhPT5yZXNvbHZlKGEgJiYgYS52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YoZGVmYXVsdFZhbHVlKT09J3VuZGVmaW5lZCcgPyByZWplY3QgOiBlPT5yZXNvbHZlKGRlZmF1bHRWYWx1ZSkpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEl0ZW0oa2V5LCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS51cHNlcnQoe19pZDprZXksdmFsdWV9LHJlc29sdmUsIHJlamVjdCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlSXRlbShrZXkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UucmVtb3ZlKGtleSxyZXNvbHZlLCByZWplY3QpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG59XG5cbmV4cG9ydHMuVXNlcj1Vc2VyXG5leHBvcnRzLlJvbGU9Um9sZVxuZXhwb3J0cy5GaWxlPUZpbGVcbmV4cG9ydHMuTG9nPUxvZ1xuZXhwb3J0cy5Nb2RlbD1TZXJ2aWNlXG5cbi8qKlxuKiBhamF4IHJlcXVlc3RcbiogY2xpZW50IF9pZFxuICAgICogZG9uZTogb2tcbiogY2xpZW50IGNyZWF0ZWRBdCwgdXBkYXRlZEF0XG4gICAgKiBkb25lXG4gICAgKiBzZXJ2ZXIgc2lkZSB3b3VsZCBnaXZlIGl0cyBvd24gY3JlYXRlZEF0IGFuZCB1cGRhdGVkQXRcbiAgICAgICAgKiBjYWNoZSBvcGVyYXRpb24gSW52YWxpZFxuICAgICAgICAgICAgKiBkZWxldGUgdGhlbiBjYWNoZVxuICAgICAgICAgICAgICAgICogc2FtZSB0cmFuc2FjdGlvblxuXG4gICAgKiBoYWNrIGluIGFqYXhcbiAgICAgICAgKiB1cGRhdGU6IGNyZWF0ZWRBdCE9dXBkYXRlZEF0XG4gICAgICAgICAgICAqIGNsaWVudCBpbnNlcnQgdGhlbiB1cGRhdGVcbiAgICAgICAgKiBjcmVhdGU6IGNyZWF0ZWRBdD09dXBkYXRlZEF0XG5cbiogcmV0dXJuIGFwcGVuZGVkIHBhcnQgb25seSBWUyB3aG9sZSBvYmplY3RcbiAgICAqIG1lcmdlIGNsaWVudCBvYmplY3QgYW5kIHNlcnZlciByZXR1cm4gb2JqZWN0XG5cbiogYW55IHVwc2VydCBhbmQgZGVsZXRlIG11c3QgYWN0IHRvIHNlcnZlciBkaXJlY3RseVxuICAgICogY2FjaGUgaW4gbG9jYWxcbiogYW55IGZpbmQvZmluZE9uZSBtdXN0XG4gICAgKiBmaXJzdCBvbiBsb2NhbFxuICAgICogdGhlbiB0byByZW1vdGVcbiAgICAgICAgKiBzYW1lIHdpdGggbG9jYWwsIHdpdGhvdXQgY2FsbCB0byBzdWNjZXNzXG4gICAgICAgICogbm90IHNhbWUgd2l0aCBsb2NhbCwgY2FsbCB0byBzdWNjZXNzXG5cbiovXG4iXX0=