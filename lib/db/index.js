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
                        }, reject);
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
                return localDb.__localStorage.remove(key, function () {
                    localDb.__localStorage.resolveRemove(key, resolve, reject);
                }, reject);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiZW1pdCIsInByb3RvdHlwZSIsImNhbGwiLCJhcmd1bWVudHMiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsIl9fd29ya2VyIiwiYXBwSWQiLCJzZXJ2ZXIiLCJnSHR0cEVycm9ySGFuZGxlciIsImRiIiwiZGJQcm9taXNlIiwibG9hZGluZ0hhbmRsZXIiLCJtYWtlRW52UmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwic3FsaXRlUGx1Z2luIiwiZGVsZXRlRGF0YWJhc2UiLCJvcGVuRGF0YWJhc2UiLCJuYW1lIiwibG9jYXRpb24iLCJ2ZXJzaW9uIiwibG9jYWxTdG9yYWdlIiwiZGJWZXJzaW9uIiwiY2hhbmdlVmVyc2lvbiIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwidHJhbnNDYWxsYmFjayIsInN1Y2Nlc3MiLCJ0cmFuc2FjdGlvbiIsImdsb2JhbCIsImZpeE1pbmltb25nbyIsInJlcXVpcmUiLCJhamF4UmVxdWVzdCIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJfYXBwSWQiLCJfc2Vzc2lvblRva2VuIiwiRXJyb3IiLCJ0b0xvd2VyQ2FzZSIsInNob3ciLCJzZWxlY3RvciIsInF1ZXJ5IiwicCIsInNwbGl0IiwiZm9yRWFjaCIsImtleSIsInB1c2giLCJsZW5ndGgiLCJpbmRleE9mIiwiam9pbiIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsInIiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJjbG9zZSIsInN0YXR1cyIsIm0iLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImlzSnNvbiIsIkZvcm1EYXRhIiwiY3VycmVudCIsInNlc3Npb25Ub2tlbiIsInNlbmQiLCJzdHJpbmdpZnkiLCJfc2VydmVyIiwiaHR0cEVycm9yIiwiX2xvYWRpbmdIYW5kbGVyIiwiY29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYXV0b3NlbGVjdExvY2FsRGIiLCJuYW1lc3BhY2UiLCJsb2NhbERiIiwibWFrZUxvY2FsU3RvcmFnZSIsImlzQ3VycmVudEFwcCIsIl9fYXBwSWQiLCJ0aGVuIiwicFR1dG9yaWFsIiwiaXNUdXRvcmlhbGl6ZWQiLCJvbiIsInN1cHBvcnRXb3JrZXIiLCJhZGRDb2xsZWN0aW9uIiwiZ2V0SXRlbSIsImRlZmF1bHRWYWx1ZSIsIl9fbG9jYWxTdG9yYWdlIiwiZmluZE9uZSIsIl9pZCIsImEiLCJ2YWx1ZSIsInNldEl0ZW0iLCJ1cHNlcnQiLCJyZW1vdmVJdGVtIiwicmVtb3ZlIiwicmVzb2x2ZVJlbW92ZSIsImV4cG9ydHMiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUF1SWdCQSxJLEdBQUFBLEk7O0FBdkloQjs7QUFZQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBaEJDLENBQUMsVUFBU0MsSUFBVCxFQUFjO0FBQ1oseUJBQWFDLFNBQWIsQ0FBdUJELElBQXZCLEdBQTRCLFlBQVU7QUFDbEMsWUFBRztBQUNDQSxpQkFBS0UsSUFBTCxjQUFVLElBQVYsb0NBQW1CQyxTQUFuQjtBQUNILFNBRkQsQ0FFQyxPQUFNQyxDQUFOLEVBQVE7QUFDTEMsb0JBQVFDLEtBQVIsMEJBQXFDRixFQUFFRyxPQUF2QztBQUNIO0FBQ0osS0FORDtBQU9ILENBUkEsRUFRRSxxQkFBYU4sU0FBYixDQUF1QkQsSUFSekI7O0FBbUJELElBQUlRLFFBQUosRUFDS0MsS0FETCxFQUVLQyxNQUZMLEVBR0tDLGlCQUhMLEVBSUtDLEVBSkwsRUFLS0MsU0FMTCxFQU1LQyxjQU5MOztBQVFBLFNBQVNDLFlBQVQsR0FBdUI7QUFDbkIsS0FBQyxVQUFTQyxNQUFULEVBQWdCO0FBQ2IsWUFBRyxPQUFPQSxPQUFPQyxPQUFkLElBQXdCLFdBQXhCLElBQXVD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VjtBQUFBLHVCQUNmRyxRQUFRWSxjQUFSLENBQXVCUSxNQUF2QixDQUE4QnZELEdBQTlCLEVBQWtDLFlBQUk7QUFDbkRtQyw0QkFBUVksY0FBUixDQUF1QlMsYUFBdkIsQ0FBcUN4RCxHQUFyQyxFQUEwQytCLE9BQTFDLEVBQWtEQyxNQUFsRDtBQUNBLGlCQUZhLEVBRVhBLE1BRlcsQ0FEZTtBQUFBLGFBQVosQ0FBUDtBQUlIO0FBZkYsS0FBUDtBQWlCSDs7QUFFRHlCLFFBQVFDLElBQVI7QUFDQUQsUUFBUUUsSUFBUjtBQUNBRixRQUFRRyxJQUFSO0FBQ0FILFFBQVFJLEdBQVI7QUFDQUosUUFBUUssS0FBUjs7QUFFQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnXHJcblxyXG47KGZ1bmN0aW9uKGVtaXQpe1xyXG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICBlbWl0LmNhbGwodGhpcywgLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXZlbnRFbWl0dGVyIGVycm9yOiAke2UubWVzc2FnZX1gKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0KTtcclxuXHJcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcclxuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xyXG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJ1xyXG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnXHJcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xyXG5cclxuaW1wb3J0IHtSZW1vdGVEYiwgSHlicmlkRGIsIHV0aWxzfSBmcm9tICdtaW5pbW9uZ28nXHJcblxyXG5cclxudmFyIF9fd29ya2VyXHJcbiAgICAsYXBwSWRcclxuICAgICxzZXJ2ZXJcclxuICAgICxnSHR0cEVycm9ySGFuZGxlclxyXG4gICAgLGRiXHJcbiAgICAsZGJQcm9taXNlXHJcbiAgICAsbG9hZGluZ0hhbmRsZXI7XHJcblxyXG5mdW5jdGlvbiBtYWtlRW52UmVhZHkoKXtcclxuICAgIChmdW5jdGlvbih3aW5kb3cpe1xyXG4gICAgICAgIGlmKHR5cGVvZih3aW5kb3cuY29yZG92YSkhPSd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuc3FsaXRlUGx1Z2luIT0ndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIHdpbmRvdy5kZWxldGVEYXRhYmFzZT13aW5kb3cuc3FsaXRlUGx1Z2luLmRlbGV0ZURhdGFiYXNlXHJcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuRGF0YWJhc2U9ZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGI9d2luZG93LnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2Uoe25hbWUsbG9jYXRpb246XCJkZWZhdWx0XCJ9KVxyXG4gICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9ufHxcIlwiXHJcbiAgICAgICAgICAgICAgICBkYi5jaGFuZ2VWZXJzaW9uPWZ1bmN0aW9uKG9sZFZlcnNpb24sbmV3VmVyc2lvbix0cmFuc0NhbGxiYWNrLCBlcnJvciwgc3VjY2Vzcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52ZXJzaW9uIT09b2xkVmVyc2lvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yID8gZXJyb3IoXCJcIikgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih0cmFuc0NhbGxiYWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbih0cmFuc0NhbGxiYWNrLCBlcnJvciwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRiLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbj1uZXdWZXJzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb249bmV3VmVyc2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pKHR5cGVvZih3aW5kb3cpPT0ndW5kZWZpbmVkJyA/Z2xvYmFsLndpbmRvdz17fSA6IHdpbmRvdyk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBmaXhNaW5pbW9uZ28oZGIpe1xyXG4gICAgcmVxdWlyZSgnLi9maXgtbWluaW1vbmdvJykoZGIpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFqYXhSZXF1ZXN0KG1ldGhvZD0nZ2V0JywgdXJsLCBwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yLCBfYXBwSWQsIF9zZXNzaW9uVG9rZW4pIHtcclxuICAgIGlmKCFhcHBJZClcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2Ugc3BlY2lmeSBhcHBsaWNhdGlvbiBLZXkgZmlyc3RcIilcclxuICAgIG1ldGhvZD1tZXRob2QudG9Mb3dlckNhc2UoKVxyXG4gICAgbG9hZGluZ0hhbmRsZXIuc2hvdygpXHJcbiAgICB0cnl7XHJcbiAgICAgICAgaWYocGFyYW1zKXtcclxuICAgICAgICAgICAgcGFyYW1zLnNlbGVjdG9yICYmIHBhcmFtcy5zZWxlY3RvciE9XCJ7fVwiICYmIChwYXJhbXMucXVlcnk9cGFyYW1zLnNlbGVjdG9yKTtcclxuICAgICAgICAgICAgdmFyIHA9W11cclxuICAgICAgICAgICAgJ3NvcnQsbGltaXQsc2tpcHQsZmllbGRzLHF1ZXJ5Jy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICAgICAgICAgIHBhcmFtc1trZXldICYmIHAucHVzaChrZXkrJz0nK3BhcmFtc1trZXldKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5xdWVyeTtcclxuXHJcbiAgICAgICAgICAgIHVybD0hcC5sZW5ndGggPyB1cmwgOiB1cmwrKHVybC5pbmRleE9mKCc/Jyk9PS0xID8gJz8nIDogJyYnKStwLmpvaW4oJyYnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuXHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZT14aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIHI7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlICYmIHR5cGUuaW5kZXhPZignL2pzb24nKSE9LTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHI9SlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KVxyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgICAgICByPXhoci5yZXNwb25zZVRleHRcclxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kIT0nZ2V0JyAmJiBnSHR0cEVycm9ySGFuZGxlcihgJHttZXRob2Q9PSdkZWxldGUnID8gJ0RlbGV0ZWQnIDonU2F2ZWQnfSBzdWNjZXNzZnVsbHlgLCdJbmZvJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKHIpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtPXJ8fCh4aHIuc3RhdHVzPT0wJiZcIk5vIG5ldHdvcmtcIil8fFwiZXJyb3IgaGFwcGVuc1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKG0pPT0wICYmIGdIdHRwRXJyb3JIYW5kbGVyKG0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vcGVuKG1ldGhvZCx1cmwsdHJ1ZSlcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpXHJcblxyXG4gICAgICAgIHZhciBpc0pzb249ZmFsc2VcclxuXHJcbiAgICAgICAgaWYobWV0aG9kPT0nZGVsZXRlJylcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ3RleHQvcGxhaW4nKTtcclxuICAgICAgICBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSlcclxuICAgICAgICAgICAgOy8veGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ211bHRpcGFydC9mb3JtLWRhdGEnKVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpXHJcbiAgICAgICAgICAgIGlzSnNvbj10cnVlXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUFwcGxpY2F0aW9uLUlkJyxfYXBwSWR8fGFwcElkKVxyXG4gICAgICAgIGlmKFVzZXIuY3VycmVudClcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtU2Vzc2lvbi1Ub2tlbicsVXNlci5jdXJyZW50LnNlc3Npb25Ub2tlbikvL2N1cnJlbnQgdXNlcm5hbWUsIHNhbWUgd2l0aCBfaWRcclxuICAgICAgICBpZihfc2Vzc2lvblRva2VuKVxyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxfc2Vzc2lvblRva2VuKVxyXG5cclxuICAgICAgICB4aHIuc2VuZCh0eXBlb2YoZGF0YSk9PSdzdHJpbmcnIHx8ICFpc0pzb24gPyBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgICB9Y2F0Y2goZSl7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlLm1lc3NhZ2UpXHJcbiAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHhoclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdChfc2VydmVyLF9hcHBJZCwgc3VjY2VzcywgaHR0cEVycm9yLCBfbG9hZGluZ0hhbmRsZXIpe1xyXG4gICAgbWFrZUVudlJlYWR5KClcclxuXHJcbiAgICBhcHBJZD1fYXBwSWRcclxuICAgIHNlcnZlcj1fc2VydmVyXHJcbiAgICBnSHR0cEVycm9ySGFuZGxlcj1odHRwRXJyb3IgfHwgKChlLCBjb2RlKT0+Y29uc29sZS5lcnJvcihgaHR0cCBlcnJvciB3aXRoIHN0YXR1cyAke2NvZGV9OiAke2V9YCkpO1xyXG4gICAgbG9hZGluZ0hhbmRsZXI9X2xvYWRpbmdIYW5kbGVyIHx8IHtzaG93KCl7fSxjbG9zZSgpe319XHJcblxyXG4gICAgcmV0dXJuIGRiUHJvbWlzZT1uZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgIHV0aWxzLmF1dG9zZWxlY3RMb2NhbERiKHtuYW1lc3BhY2U6YHFpbGkuJHtfYXBwSWR9YH0sZnVuY3Rpb24obG9jYWxEYil7XHJcbiAgICAgICAgICAgIGRiPW5ldyBIeWJyaWREYihsb2NhbERiLG5ldyBSZW1vdGVEYihzZXJ2ZXIrXCJjbGFzc2VzL1wiLHt9LGFqYXhSZXF1ZXN0KSk7XHJcbiAgICAgICAgICAgIGZpeE1pbmltb25nbyhkYilcclxuXHJcbiAgICAgICAgICAgIGxldCBsb2NhbFN0b3JhZ2U9bWFrZUxvY2FsU3RvcmFnZShsb2NhbERiKVxyXG5cclxuICAgICAgICAgICAgU2VydmljZS5pbml0KG51bGwsZGIsIGFqYXhSZXF1ZXN0LHNlcnZlciwgbG9jYWxTdG9yYWdlKVxyXG4gICAgICAgICAgICBTZXJ2aWNlLmlzQ3VycmVudEFwcD1mdW5jdGlvbihfX2FwcElkKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfYXBwSWQ9PV9fYXBwSWRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgVXNlci5pbml0KCkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgUm9sZS5pbml0KCk7XHJcbiAgICAgICAgICAgICAgICBGaWxlLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIExvZy5pbml0KCk7XHJcblxyXG5cdFx0XHRcdGxldCBwVHV0b3JpYWw9VXNlci5pc1R1dG9yaWFsaXplZCgpXHJcbiAgICAgICAgICAgICAgICBpZihzdWNjZXNzKXtcclxuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCgpPT5zdWNjZXNzKGRiKSlcclxuXHRcdFx0XHRcdGlmKFVzZXIuY3VycmVudCl7XHJcblx0XHRcdFx0XHRcdFByb21pc2UucmVzb2x2ZShzdWNjZXNzKGRiKXx8ZGIpXHJcblx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+cmVzb2x2ZShwVHV0b3JpYWwpLHJlamVjdClcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKHBUdXRvcmlhbClcclxuXHRcdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwVHV0b3JpYWwpXHJcblxyXG4gICAgICAgICAgICAgICAgc3VwcG9ydFdvcmtlcihfc2VydmVyLCBfYXBwSWQpXHJcblxyXG4gICAgICAgICAgICAgICAgU2VydmljZS5lbWl0KCdpbml0ZWQnKVxyXG4gICAgICAgICAgICB9LHJlamVjdClcclxuXHJcbiAgICAgICAgfSxyZWplY3QpXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdXBwb3J0V29ya2VyKHNlcnZlciwgYXBwSWQpey8qXHJcbiAgICByZXR1cm4gZmFsc2VcclxuICAgIF9fd29ya2VyIGZyb20gJ3dlYndvcmtpZnknKShyZXF1aXJlKCcuL3dvcmtlci5qcycpKVxyXG4gICAgOyhmdW5jdGlvbihwb3N0TWVzc2FnZSl7XHJcbiAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2U9ZnVuY3Rpb24obSwgLi4uZGF0YSl7XHJcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlLmNhbGwoX193b3JrZXIsIHt0eXBlOm0sIGFyZ3M6SlNPTi5zdHJpbmdpZnkoZGF0YSl9KVxyXG4gICAgICAgIH1cclxuICAgIH0pKF9fd29ya2VyLnBvc3RNZXNzYWdlKTtcclxuXHJcblxyXG4gICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ2luaXQnLCBzZXJ2ZXIsIGFwcElkKVxyXG5cclxuXHJcblxyXG5cclxuICAgIFVzZXIub24oJ2NoYW5nZScsKCk9Pl9fd29ya2VyLnBvc3RNZXNzYWdlKCd1c2VyJyxVc2VyLmN1cnJlbnQpKVxyXG4gICAgaWYoVXNlci5jdXJyZW50KVxyXG4gICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCd1c2VyJywgVXNlci5jdXJyZW50KVxyXG5cclxuICAgIDsoZnVuY3Rpb24oX2FkZENvbGxlY3Rpb24pe1xyXG4gICAgICAgIGZ1bmN0aW9uIHdyYXAoc3VjY2VzcyxzdGF0ZSwgdHlwZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAoKT0+e1xyXG4gICAgICAgICAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2Uoc3RhdGUsdHlwZSlcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb249ZnVuY3Rpb24obmFtZSwgb3B0KXtcclxuICAgICAgICAgICAgX2FkZENvbGxlY3Rpb24uY2FsbCh0aGlzLC4uLmFyZ3VtZW50cylcclxuICAgICAgICAgICAgdmFyIHI9dGhpc1tuYW1lXVxyXG5cclxuICAgICAgICAgICAgOyhmdW5jdGlvbih1cHNlcnQpe1xyXG4gICAgICAgICAgICAgICAgci51cHNlcnQ9ZnVuY3Rpb24oZG9jcywgYmFzZXMsIHN1Y2Nlc3MsIGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBzZXJ0LmNhbGwodGhpcywgZG9jcywgYmFzZXMsIHdyYXAoc3VjY2VzcywndXBzZXJ0JyxuYW1lKSwgZXJyb3IpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKHIudXBzZXJ0KVxyXG5cclxuICAgICAgICAgICAgOyhmdW5jdGlvbihyZW1vdmUpe1xyXG4gICAgICAgICAgICAgICAgci5yZW1vdmU9ZnVuY3Rpb24oaWQsIHN1Y2Nlc3MsIGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlLmNhbGwodGhpcyxpZCwgd3JhcChzdWNjZXNzLCdyZW1vdmUnLG5hbWUpLGVycm9yKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KShyLnJlbW92ZSlcclxuXHJcbiAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdhZGRDb2xsZWN0aW9uJyxuYW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gclxyXG4gICAgICAgIH1cclxuICAgIH0pKEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uKTsqL1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlTG9jYWxTdG9yYWdlKGxvY2FsRGIpe1xyXG4gICAgbG9jYWxEYi5hZGRDb2xsZWN0aW9uKFwiX19sb2NhbFN0b3JhZ2VcIilcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldEl0ZW0oa2V5LGRlZmF1bHRWYWx1ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UuZmluZE9uZSh7X2lkOmtleX0sYT0+cmVzb2x2ZShhICYmIGEudmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YoZGVmYXVsdFZhbHVlKT09J3VuZGVmaW5lZCcgPyByZWplY3QgOiBlPT5yZXNvbHZlKGRlZmF1bHRWYWx1ZSkpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRJdGVtKGtleSwgdmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLnVwc2VydCh7X2lkOmtleSx2YWx1ZX0scmVzb2x2ZSwgcmVqZWN0KSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVtb3ZlSXRlbShrZXkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLnJlbW92ZShrZXksKCk9PntcclxuXHRcdFx0XHRcdFx0XHRsb2NhbERiLl9fbG9jYWxTdG9yYWdlLnJlc29sdmVSZW1vdmUoa2V5LCByZXNvbHZlLHJlamVjdClcclxuXHRcdFx0XHRcdFx0fSwgcmVqZWN0KSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0cy5Vc2VyPVVzZXJcclxuZXhwb3J0cy5Sb2xlPVJvbGVcclxuZXhwb3J0cy5GaWxlPUZpbGVcclxuZXhwb3J0cy5Mb2c9TG9nXHJcbmV4cG9ydHMuTW9kZWw9U2VydmljZVxyXG5cclxuLyoqXHJcbiogYWpheCByZXF1ZXN0XHJcbiogY2xpZW50IF9pZFxyXG4gICAgKiBkb25lOiBva1xyXG4qIGNsaWVudCBjcmVhdGVkQXQsIHVwZGF0ZWRBdFxyXG4gICAgKiBkb25lXHJcbiAgICAqIHNlcnZlciBzaWRlIHdvdWxkIGdpdmUgaXRzIG93biBjcmVhdGVkQXQgYW5kIHVwZGF0ZWRBdFxyXG4gICAgICAgICogY2FjaGUgb3BlcmF0aW9uIEludmFsaWRcclxuICAgICAgICAgICAgKiBkZWxldGUgdGhlbiBjYWNoZVxyXG4gICAgICAgICAgICAgICAgKiBzYW1lIHRyYW5zYWN0aW9uXHJcblxyXG4gICAgKiBoYWNrIGluIGFqYXhcclxuICAgICAgICAqIHVwZGF0ZTogY3JlYXRlZEF0IT11cGRhdGVkQXRcclxuICAgICAgICAgICAgKiBjbGllbnQgaW5zZXJ0IHRoZW4gdXBkYXRlXHJcbiAgICAgICAgKiBjcmVhdGU6IGNyZWF0ZWRBdD09dXBkYXRlZEF0XHJcblxyXG4qIHJldHVybiBhcHBlbmRlZCBwYXJ0IG9ubHkgVlMgd2hvbGUgb2JqZWN0XHJcbiAgICAqIG1lcmdlIGNsaWVudCBvYmplY3QgYW5kIHNlcnZlciByZXR1cm4gb2JqZWN0XHJcblxyXG4qIGFueSB1cHNlcnQgYW5kIGRlbGV0ZSBtdXN0IGFjdCB0byBzZXJ2ZXIgZGlyZWN0bHlcclxuICAgICogY2FjaGUgaW4gbG9jYWxcclxuKiBhbnkgZmluZC9maW5kT25lIG11c3RcclxuICAgICogZmlyc3Qgb24gbG9jYWxcclxuICAgICogdGhlbiB0byByZW1vdGVcclxuICAgICAgICAqIHNhbWUgd2l0aCBsb2NhbCwgd2l0aG91dCBjYWxsIHRvIHN1Y2Nlc3NcclxuICAgICAgICAqIG5vdCBzYW1lIHdpdGggbG9jYWwsIGNhbGwgdG8gc3VjY2Vzc1xyXG5cclxuKi9cclxuIl19