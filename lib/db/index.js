'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

        xhr.send(typeof data == 'string' || !isJson ? data : (0, _stringify2.default)(data));
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

    return dbPromise = new _promise2.default(function (resolve, reject) {
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
                    resolve(_user2.default.current ? _promise2.default.resolve(success(db) || db).then(function (a) {
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
        getItem: function getItem(key, defaultValue) {
            return new _promise2.default(function (resolve, reject) {
                return localDb.__localStorage.findOne({ _id: key }, function (a) {
                    return resolve(a && a.value);
                }, typeof defaultValue == 'undefined' ? reject : function (e) {
                    return resolve(defaultValue);
                });
            });
        },
        setItem: function setItem(key, value) {
            return new _promise2.default(function (resolve, reject) {
                return localDb.__localStorage.upsert({ _id: key, value: value }, resolve, reject);
            });
        },
        removeItem: function removeItem(key) {
            return new _promise2.default(function (resolve, reject) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiZW1pdCIsInByb3RvdHlwZSIsImNhbGwiLCJhcmd1bWVudHMiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsIl9fd29ya2VyIiwiYXBwSWQiLCJzZXJ2ZXIiLCJnSHR0cEVycm9ySGFuZGxlciIsImRiIiwiZGJQcm9taXNlIiwibG9hZGluZ0hhbmRsZXIiLCJtYWtlRW52UmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwic3FsaXRlUGx1Z2luIiwiZGVsZXRlRGF0YWJhc2UiLCJvcGVuRGF0YWJhc2UiLCJuYW1lIiwibG9jYXRpb24iLCJ2ZXJzaW9uIiwibG9jYWxTdG9yYWdlIiwiZGJWZXJzaW9uIiwiY2hhbmdlVmVyc2lvbiIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwidHJhbnNDYWxsYmFjayIsInN1Y2Nlc3MiLCJ0cmFuc2FjdGlvbiIsImdsb2JhbCIsImZpeE1pbmltb25nbyIsInJlcXVpcmUiLCJhamF4UmVxdWVzdCIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJfYXBwSWQiLCJfc2Vzc2lvblRva2VuIiwiRXJyb3IiLCJ0b0xvd2VyQ2FzZSIsInNob3ciLCJzZWxlY3RvciIsInF1ZXJ5IiwicCIsInNwbGl0IiwiZm9yRWFjaCIsImtleSIsInB1c2giLCJsZW5ndGgiLCJpbmRleE9mIiwiam9pbiIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsInIiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJjbG9zZSIsInN0YXR1cyIsIm0iLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImlzSnNvbiIsIkZvcm1EYXRhIiwiY3VycmVudCIsInNlc3Npb25Ub2tlbiIsInNlbmQiLCJfc2VydmVyIiwiaHR0cEVycm9yIiwiX2xvYWRpbmdIYW5kbGVyIiwiY29kZSIsInJlc29sdmUiLCJyZWplY3QiLCJhdXRvc2VsZWN0TG9jYWxEYiIsIm5hbWVzcGFjZSIsImxvY2FsRGIiLCJtYWtlTG9jYWxTdG9yYWdlIiwiaXNDdXJyZW50QXBwIiwiX19hcHBJZCIsInRoZW4iLCJvbiIsImlzVHV0b3JpYWxpemVkIiwic3VwcG9ydFdvcmtlciIsImFkZENvbGxlY3Rpb24iLCJnZXRJdGVtIiwiZGVmYXVsdFZhbHVlIiwiX19sb2NhbFN0b3JhZ2UiLCJmaW5kT25lIiwiX2lkIiwiYSIsInZhbHVlIiwic2V0SXRlbSIsInVwc2VydCIsInJlbW92ZUl0ZW0iLCJyZW1vdmUiLCJleHBvcnRzIiwiVXNlciIsIlJvbGUiLCJGaWxlIiwiTG9nIiwiTW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1FBdUlnQkEsSSxHQUFBQSxJOztBQXZJaEI7O0FBWUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQWhCQyxDQUFDLFVBQVNDLElBQVQsRUFBYztBQUNaLHlCQUFhQyxTQUFiLENBQXVCRCxJQUF2QixHQUE0QixZQUFVO0FBQ2xDLFlBQUc7QUFDQ0EsaUJBQUtFLElBQUwsY0FBVSxJQUFWLG9DQUFtQkMsU0FBbkI7QUFDSCxTQUZELENBRUMsT0FBTUMsQ0FBTixFQUFRO0FBQ0xDLG9CQUFRQyxLQUFSLDBCQUFxQ0YsRUFBRUcsT0FBdkM7QUFDSDtBQUNKLEtBTkQ7QUFPSCxDQVJBLEVBUUUscUJBQWFOLFNBQWIsQ0FBdUJELElBUnpCOztBQW1CRCxJQUFJUSxRQUFKLEVBQ0tDLEtBREwsRUFFS0MsTUFGTCxFQUdLQyxpQkFITCxFQUlLQyxFQUpMLEVBS0tDLFNBTEwsRUFNS0MsY0FOTDs7QUFRQSxTQUFTQyxZQUFULEdBQXVCO0FBQ25CLEtBQUMsVUFBU0MsTUFBVCxFQUFnQjtBQUNiLFlBQUcsT0FBT0EsT0FBT0MsT0FBZCxJQUF3QixXQUF4QixJQUF1QyxPQUFPRCxPQUFPRSxZQUFkLElBQTRCLFdBQXRFLEVBQWtGO0FBQzlF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QztBQUNqQyxXQUFPQSxhQUFhb0UsT0FBYixDQUFxQixnQkFBckIsRUFDRkwsSUFERSxDQUNHLGFBQUc7QUFDTCxZQUFHLENBQUNVLENBQUosRUFBTTtBQUNGekUseUJBQWEyRSxPQUFiLENBQXFCLGdCQUFyQixFQUFzQyxNQUF0QztBQUNBLG1CQUFPLEtBQVA7QUFDSDtBQUNELGVBQU9GLENBQVA7QUFDSCxLQVBFLENBQVA7QUFRSDs7QUFFRE0sUUFBUUMsSUFBUjtBQUNBRCxRQUFRRSxJQUFSO0FBQ0FGLFFBQVFHLElBQVI7QUFDQUgsUUFBUUksR0FBUjtBQUNBSixRQUFRSyxLQUFSOztBQUVBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cydcblxuOyhmdW5jdGlvbihlbWl0KXtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oKXtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZW1pdC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXZlbnRFbWl0dGVyIGVycm9yOiAke2UubWVzc2FnZX1gKVxuICAgICAgICB9XG4gICAgfVxufSkoRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0KTtcblxuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZydcbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuXG5pbXBvcnQge1JlbW90ZURiLCBIeWJyaWREYiwgdXRpbHN9IGZyb20gJ21pbmltb25nbydcblxuXG52YXIgX193b3JrZXJcbiAgICAsYXBwSWRcbiAgICAsc2VydmVyXG4gICAgLGdIdHRwRXJyb3JIYW5kbGVyXG4gICAgLGRiXG4gICAgLGRiUHJvbWlzZVxuICAgICxsb2FkaW5nSGFuZGxlcjtcblxuZnVuY3Rpb24gbWFrZUVudlJlYWR5KCl7XG4gICAgKGZ1bmN0aW9uKHdpbmRvdyl7XG4gICAgICAgIGlmKHR5cGVvZih3aW5kb3cuY29yZG92YSkhPSd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuc3FsaXRlUGx1Z2luIT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICB3aW5kb3cuZGVsZXRlRGF0YWJhc2U9d2luZG93LnNxbGl0ZVBsdWdpbi5kZWxldGVEYXRhYmFzZVxuICAgICAgICAgICAgd2luZG93Lm9wZW5EYXRhYmFzZT1mdW5jdGlvbihuYW1lKXtcbiAgICAgICAgICAgICAgICB2YXIgZGI9d2luZG93LnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2Uoe25hbWUsbG9jYXRpb246XCJkZWZhdWx0XCJ9KVxuICAgICAgICAgICAgICAgIGRiLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbnx8XCJcIlxuICAgICAgICAgICAgICAgIGRiLmNoYW5nZVZlcnNpb249ZnVuY3Rpb24ob2xkVmVyc2lvbixuZXdWZXJzaW9uLHRyYW5zQ2FsbGJhY2ssIGVycm9yLCBzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52ZXJzaW9uIT09b2xkVmVyc2lvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvciA/IGVycm9yKFwiXCIpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZih0cmFuc0NhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb24odHJhbnNDYWxsYmFjaywgZXJyb3IsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9uPW5ld1ZlcnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb249bmV3VmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mKHN1Y2Nlc3MpIT0ndW5kZWZpbmVkJyAmJiBzdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSh0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgP2dsb2JhbC53aW5kb3c9e30gOiB3aW5kb3cpO1xuXG59XG5cbmZ1bmN0aW9uIGZpeE1pbmltb25nbyhkYil7XG4gICAgcmVxdWlyZSgnLi9maXgtbWluaW1vbmdvJykoZGIpXG59XG5cbmZ1bmN0aW9uIGFqYXhSZXF1ZXN0KG1ldGhvZD0nZ2V0JywgdXJsLCBwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yLCBfYXBwSWQsIF9zZXNzaW9uVG9rZW4pIHtcbiAgICBpZighYXBwSWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBzcGVjaWZ5IGFwcGxpY2F0aW9uIEtleSBmaXJzdFwiKVxuICAgIG1ldGhvZD1tZXRob2QudG9Mb3dlckNhc2UoKVxuICAgIGxvYWRpbmdIYW5kbGVyLnNob3coKVxuICAgIHRyeXtcbiAgICAgICAgaWYocGFyYW1zKXtcbiAgICAgICAgICAgIHBhcmFtcy5zZWxlY3RvciAmJiBwYXJhbXMuc2VsZWN0b3IhPVwie31cIiAmJiAocGFyYW1zLnF1ZXJ5PXBhcmFtcy5zZWxlY3Rvcik7XG4gICAgICAgICAgICB2YXIgcD1bXVxuICAgICAgICAgICAgJ3NvcnQsbGltaXQsc2tpcHQsZmllbGRzLHF1ZXJ5Jy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5XSAmJiBwLnB1c2goa2V5Kyc9JytwYXJhbXNba2V5XSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5xdWVyeTtcblxuICAgICAgICAgICAgdXJsPSFwLmxlbmd0aCA/IHVybCA6IHVybCsodXJsLmluZGV4T2YoJz8nKT09LTEgPyAnPycgOiAnJicpK3Auam9pbignJicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGU9eGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSxcbiAgICAgICAgICAgICAgICAgICAgcjtcbiAgICAgICAgICAgICAgICBpZih0eXBlICYmIHR5cGUuaW5kZXhPZignL2pzb24nKSE9LTEpe1xuICAgICAgICAgICAgICAgICAgICByPUpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgICAgICByPXhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCE9J2dldCcgJiYgZ0h0dHBFcnJvckhhbmRsZXIoYCR7bWV0aG9kPT0nZGVsZXRlJyA/ICdEZWxldGVkJyA6J1NhdmVkJ30gc3VjY2Vzc2Z1bGx5YCwnSW5mbycpO1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MocilcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbT1yfHwoeGhyLnN0YXR1cz09MCYmXCJObyBuZXR3b3JrXCIpfHxcImVycm9yIGhhcHBlbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IobSk9PTAgJiYgZ0h0dHBFcnJvckhhbmRsZXIobSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLHVybCx0cnVlKVxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpXG5cbiAgICAgICAgdmFyIGlzSnNvbj1mYWxzZVxuXG4gICAgICAgIGlmKG1ldGhvZD09J2RlbGV0ZScpXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywndGV4dC9wbGFpbicpO1xuICAgICAgICBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSlcbiAgICAgICAgICAgIDsvL3hoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCdtdWx0aXBhcnQvZm9ybS1kYXRhJylcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpXG4gICAgICAgICAgICBpc0pzb249dHJ1ZVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUFwcGxpY2F0aW9uLUlkJyxfYXBwSWR8fGFwcElkKVxuICAgICAgICBpZihVc2VyLmN1cnJlbnQpXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxVc2VyLmN1cnJlbnQuc2Vzc2lvblRva2VuKS8vY3VycmVudCB1c2VybmFtZSwgc2FtZSB3aXRoIF9pZFxuICAgICAgICBpZihfc2Vzc2lvblRva2VuKVxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtU2Vzc2lvbi1Ub2tlbicsX3Nlc3Npb25Ub2tlbilcblxuICAgICAgICB4aHIuc2VuZCh0eXBlb2YoZGF0YSk9PSdzdHJpbmcnIHx8ICFpc0pzb24gPyBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgfWNhdGNoKGUpe1xuICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSlcbiAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgIH1cbiAgICByZXR1cm4geGhyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KF9zZXJ2ZXIsX2FwcElkLCBzdWNjZXNzLCBodHRwRXJyb3IsIF9sb2FkaW5nSGFuZGxlcil7XG4gICAgbWFrZUVudlJlYWR5KClcblxuICAgIGFwcElkPV9hcHBJZFxuICAgIHNlcnZlcj1fc2VydmVyXG4gICAgZ0h0dHBFcnJvckhhbmRsZXI9aHR0cEVycm9yIHx8ICgoZSwgY29kZSk9PmNvbnNvbGUuZXJyb3IoYGh0dHAgZXJyb3Igd2l0aCBzdGF0dXMgJHtjb2RlfTogJHtlfWApKTtcbiAgICBsb2FkaW5nSGFuZGxlcj1fbG9hZGluZ0hhbmRsZXIgfHwge3Nob3coKXt9LGNsb3NlKCl7fX1cblxuICAgIHJldHVybiBkYlByb21pc2U9bmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgdXRpbHMuYXV0b3NlbGVjdExvY2FsRGIoe25hbWVzcGFjZTpgcWlsaS4ke19hcHBJZH1gfSxmdW5jdGlvbihsb2NhbERiKXtcbiAgICAgICAgICAgIGRiPW5ldyBIeWJyaWREYihsb2NhbERiLG5ldyBSZW1vdGVEYihzZXJ2ZXIrXCJjbGFzc2VzL1wiLHt9LGFqYXhSZXF1ZXN0KSk7XG4gICAgICAgICAgICBmaXhNaW5pbW9uZ28oZGIpXG5cbiAgICAgICAgICAgIGxldCBsb2NhbFN0b3JhZ2U9bWFrZUxvY2FsU3RvcmFnZShsb2NhbERiKVxuXG4gICAgICAgICAgICBTZXJ2aWNlLmluaXQobnVsbCxkYiwgYWpheFJlcXVlc3Qsc2VydmVyLCBsb2NhbFN0b3JhZ2UpXG4gICAgICAgICAgICBTZXJ2aWNlLmlzQ3VycmVudEFwcD1mdW5jdGlvbihfX2FwcElkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2FwcElkPT1fX2FwcElkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFVzZXIuaW5pdCgpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBSb2xlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBGaWxlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBMb2cuaW5pdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYoc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsKCk9PnN1Y2Nlc3MoZGIpKVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFVzZXIuY3VycmVudCA/IFByb21pc2UucmVzb2x2ZShzdWNjZXNzKGRiKXx8ZGIpLnRoZW4oYT0+aXNUdXRvcmlhbGl6ZWQobG9jYWxTdG9yYWdlKSkgOiBkYilcbiAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGlzVHV0b3JpYWxpemVkKGxvY2FsU3RvcmFnZSkpXG5cbiAgICAgICAgICAgICAgICBzdXBwb3J0V29ya2VyKF9zZXJ2ZXIsIF9hcHBJZClcblxuICAgICAgICAgICAgICAgIFNlcnZpY2UuZW1pdCgnaW5pdGVkJylcbiAgICAgICAgICAgIH0scmVqZWN0KVxuXG4gICAgICAgIH0scmVqZWN0KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRXb3JrZXIoc2VydmVyLCBhcHBJZCl7LypcbiAgICByZXR1cm4gZmFsc2VcbiAgICBfX3dvcmtlciBmcm9tICd3ZWJ3b3JraWZ5JykocmVxdWlyZSgnLi93b3JrZXIuanMnKSlcbiAgICA7KGZ1bmN0aW9uKHBvc3RNZXNzYWdlKXtcbiAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2U9ZnVuY3Rpb24obSwgLi4uZGF0YSl7XG4gICAgICAgICAgICBwb3N0TWVzc2FnZS5jYWxsKF9fd29ya2VyLCB7dHlwZTptLCBhcmdzOkpTT04uc3RyaW5naWZ5KGRhdGEpfSlcbiAgICAgICAgfVxuICAgIH0pKF9fd29ya2VyLnBvc3RNZXNzYWdlKTtcblxuXG4gICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ2luaXQnLCBzZXJ2ZXIsIGFwcElkKVxuXG5cblxuXG4gICAgVXNlci5vbignY2hhbmdlJywoKT0+X193b3JrZXIucG9zdE1lc3NhZ2UoJ3VzZXInLFVzZXIuY3VycmVudCkpXG4gICAgaWYoVXNlci5jdXJyZW50KVxuICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgndXNlcicsIFVzZXIuY3VycmVudClcblxuICAgIDsoZnVuY3Rpb24oX2FkZENvbGxlY3Rpb24pe1xuICAgICAgICBmdW5jdGlvbiB3cmFwKHN1Y2Nlc3Msc3RhdGUsIHR5cGUpe1xuICAgICAgICAgICAgcmV0dXJuICgpPT57XG4gICAgICAgICAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2Uoc3RhdGUsdHlwZSlcbiAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uPWZ1bmN0aW9uKG5hbWUsIG9wdCl7XG4gICAgICAgICAgICBfYWRkQ29sbGVjdGlvbi5jYWxsKHRoaXMsLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgdmFyIHI9dGhpc1tuYW1lXVxuXG4gICAgICAgICAgICA7KGZ1bmN0aW9uKHVwc2VydCl7XG4gICAgICAgICAgICAgICAgci51cHNlcnQ9ZnVuY3Rpb24oZG9jcywgYmFzZXMsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwc2VydC5jYWxsKHRoaXMsIGRvY3MsIGJhc2VzLCB3cmFwKHN1Y2Nlc3MsJ3Vwc2VydCcsbmFtZSksIGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKHIudXBzZXJ0KVxuXG4gICAgICAgICAgICA7KGZ1bmN0aW9uKHJlbW92ZSl7XG4gICAgICAgICAgICAgICAgci5yZW1vdmU9ZnVuY3Rpb24oaWQsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZS5jYWxsKHRoaXMsaWQsIHdyYXAoc3VjY2VzcywncmVtb3ZlJyxuYW1lKSxlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KShyLnJlbW92ZSlcblxuICAgICAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ2FkZENvbGxlY3Rpb24nLG5hbWUpXG4gICAgICAgICAgICByZXR1cm4gclxuICAgICAgICB9XG4gICAgfSkoSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb24pOyovXG59XG5cbmZ1bmN0aW9uIG1ha2VMb2NhbFN0b3JhZ2UobG9jYWxEYil7XG4gICAgbG9jYWxEYi5hZGRDb2xsZWN0aW9uKFwiX19sb2NhbFN0b3JhZ2VcIilcbiAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0SXRlbShrZXksZGVmYXVsdFZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLmZpbmRPbmUoe19pZDprZXl9LGE9PnJlc29sdmUoYSAmJiBhLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihkZWZhdWx0VmFsdWUpPT0ndW5kZWZpbmVkJyA/IHJlamVjdCA6IGU9PnJlc29sdmUoZGVmYXVsdFZhbHVlKSkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SXRlbShrZXksIHZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLnVwc2VydCh7X2lkOmtleSx2YWx1ZX0scmVzb2x2ZSwgcmVqZWN0KSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVJdGVtKGtleSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5yZW1vdmUoa2V5LHJlc29sdmUsIHJlamVjdCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbn1cblxuZnVuY3Rpb24gaXNUdXRvcmlhbGl6ZWQobG9jYWxTdG9yYWdlKXtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJfX3R1dG9yaWFsaXplZFwiKVxuICAgICAgICAudGhlbihhPT57XG4gICAgICAgICAgICBpZighYSl7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJfX3R1dG9yaWFsaXplZFwiLFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFcbiAgICAgICAgfSlcbn1cblxuZXhwb3J0cy5Vc2VyPVVzZXJcbmV4cG9ydHMuUm9sZT1Sb2xlXG5leHBvcnRzLkZpbGU9RmlsZVxuZXhwb3J0cy5Mb2c9TG9nXG5leHBvcnRzLk1vZGVsPVNlcnZpY2VcblxuLyoqXG4qIGFqYXggcmVxdWVzdFxuKiBjbGllbnQgX2lkXG4gICAgKiBkb25lOiBva1xuKiBjbGllbnQgY3JlYXRlZEF0LCB1cGRhdGVkQXRcbiAgICAqIGRvbmVcbiAgICAqIHNlcnZlciBzaWRlIHdvdWxkIGdpdmUgaXRzIG93biBjcmVhdGVkQXQgYW5kIHVwZGF0ZWRBdFxuICAgICAgICAqIGNhY2hlIG9wZXJhdGlvbiBJbnZhbGlkXG4gICAgICAgICAgICAqIGRlbGV0ZSB0aGVuIGNhY2hlXG4gICAgICAgICAgICAgICAgKiBzYW1lIHRyYW5zYWN0aW9uXG5cbiAgICAqIGhhY2sgaW4gYWpheFxuICAgICAgICAqIHVwZGF0ZTogY3JlYXRlZEF0IT11cGRhdGVkQXRcbiAgICAgICAgICAgICogY2xpZW50IGluc2VydCB0aGVuIHVwZGF0ZVxuICAgICAgICAqIGNyZWF0ZTogY3JlYXRlZEF0PT11cGRhdGVkQXRcblxuKiByZXR1cm4gYXBwZW5kZWQgcGFydCBvbmx5IFZTIHdob2xlIG9iamVjdFxuICAgICogbWVyZ2UgY2xpZW50IG9iamVjdCBhbmQgc2VydmVyIHJldHVybiBvYmplY3RcblxuKiBhbnkgdXBzZXJ0IGFuZCBkZWxldGUgbXVzdCBhY3QgdG8gc2VydmVyIGRpcmVjdGx5XG4gICAgKiBjYWNoZSBpbiBsb2NhbFxuKiBhbnkgZmluZC9maW5kT25lIG11c3RcbiAgICAqIGZpcnN0IG9uIGxvY2FsXG4gICAgKiB0aGVuIHRvIHJlbW90ZVxuICAgICAgICAqIHNhbWUgd2l0aCBsb2NhbCwgd2l0aG91dCBjYWxsIHRvIHN1Y2Nlc3NcbiAgICAgICAgKiBub3Qgc2FtZSB3aXRoIGxvY2FsLCBjYWxsIHRvIHN1Y2Nlc3NcblxuKi9cbiJdfQ==