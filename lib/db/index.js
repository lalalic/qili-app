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
                    if (_user2.default.current) {
                        _promise2.default.resolve(success(db) || db).then(function (a) {
                            return resolve(isTutorialized(localStorage));
                        });
                    } else {
                        resolve(isTutorialized(localStorage));
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiZW1pdCIsInByb3RvdHlwZSIsImNhbGwiLCJhcmd1bWVudHMiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsIl9fd29ya2VyIiwiYXBwSWQiLCJzZXJ2ZXIiLCJnSHR0cEVycm9ySGFuZGxlciIsImRiIiwiZGJQcm9taXNlIiwibG9hZGluZ0hhbmRsZXIiLCJtYWtlRW52UmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwic3FsaXRlUGx1Z2luIiwiZGVsZXRlRGF0YWJhc2UiLCJvcGVuRGF0YWJhc2UiLCJuYW1lIiwibG9jYXRpb24iLCJ2ZXJzaW9uIiwibG9jYWxTdG9yYWdlIiwiZGJWZXJzaW9uIiwiY2hhbmdlVmVyc2lvbiIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwidHJhbnNDYWxsYmFjayIsInN1Y2Nlc3MiLCJ0cmFuc2FjdGlvbiIsImdsb2JhbCIsImZpeE1pbmltb25nbyIsInJlcXVpcmUiLCJhamF4UmVxdWVzdCIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJfYXBwSWQiLCJfc2Vzc2lvblRva2VuIiwiRXJyb3IiLCJ0b0xvd2VyQ2FzZSIsInNob3ciLCJzZWxlY3RvciIsInF1ZXJ5IiwicCIsInNwbGl0IiwiZm9yRWFjaCIsImtleSIsInB1c2giLCJsZW5ndGgiLCJpbmRleE9mIiwiam9pbiIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsInIiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJjbG9zZSIsInN0YXR1cyIsIm0iLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImlzSnNvbiIsIkZvcm1EYXRhIiwiY3VycmVudCIsInNlc3Npb25Ub2tlbiIsInNlbmQiLCJfc2VydmVyIiwiaHR0cEVycm9yIiwiX2xvYWRpbmdIYW5kbGVyIiwiY29kZSIsInJlc29sdmUiLCJyZWplY3QiLCJhdXRvc2VsZWN0TG9jYWxEYiIsIm5hbWVzcGFjZSIsImxvY2FsRGIiLCJtYWtlTG9jYWxTdG9yYWdlIiwiaXNDdXJyZW50QXBwIiwiX19hcHBJZCIsInRoZW4iLCJvbiIsImlzVHV0b3JpYWxpemVkIiwic3VwcG9ydFdvcmtlciIsImFkZENvbGxlY3Rpb24iLCJnZXRJdGVtIiwiZGVmYXVsdFZhbHVlIiwiX19sb2NhbFN0b3JhZ2UiLCJmaW5kT25lIiwiX2lkIiwiYSIsInZhbHVlIiwic2V0SXRlbSIsInVwc2VydCIsInJlbW92ZUl0ZW0iLCJyZW1vdmUiLCJleHBvcnRzIiwiVXNlciIsIlJvbGUiLCJGaWxlIiwiTG9nIiwiTW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O1FBdUlnQkEsSSxHQUFBQSxJOztBQXZJaEI7O0FBWUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQWhCQyxDQUFDLFVBQVNDLElBQVQsRUFBYztBQUNaLHlCQUFhQyxTQUFiLENBQXVCRCxJQUF2QixHQUE0QixZQUFVO0FBQ2xDLFlBQUc7QUFDQ0EsaUJBQUtFLElBQUwsY0FBVSxJQUFWLG9DQUFtQkMsU0FBbkI7QUFDSCxTQUZELENBRUMsT0FBTUMsQ0FBTixFQUFRO0FBQ0xDLG9CQUFRQyxLQUFSLDBCQUFxQ0YsRUFBRUcsT0FBdkM7QUFDSDtBQUNKLEtBTkQ7QUFPSCxDQVJBLEVBUUUscUJBQWFOLFNBQWIsQ0FBdUJELElBUnpCOztBQW1CRCxJQUFJUSxRQUFKLEVBQ0tDLEtBREwsRUFFS0MsTUFGTCxFQUdLQyxpQkFITCxFQUlLQyxFQUpMLEVBS0tDLFNBTEwsRUFNS0MsY0FOTDs7QUFRQSxTQUFTQyxZQUFULEdBQXVCO0FBQ25CLEtBQUMsVUFBU0MsTUFBVCxFQUFnQjtBQUNiLFlBQUcsT0FBT0EsT0FBT0MsT0FBZCxJQUF3QixXQUF4QixJQUF1QyxPQUFPRCxPQUFPRSxZQUFkLElBQTRCLFdBQXRFLEVBQWtGO0FBQzlF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QWJGLEtBQVA7QUFlSDs7QUFFRCxTQUFTUyxjQUFULENBQXdCakUsWUFBeEIsRUFBcUM7QUFDakMsV0FBT0EsYUFBYW9FLE9BQWIsQ0FBcUIsZ0JBQXJCLEVBQ0ZMLElBREUsQ0FDRyxhQUFHO0FBQ0wsWUFBRyxDQUFDVSxDQUFKLEVBQU07QUFDRnpFLHlCQUFhMkUsT0FBYixDQUFxQixnQkFBckIsRUFBc0MsTUFBdEM7QUFDQSxtQkFBTyxLQUFQO0FBQ0g7QUFDRCxlQUFPRixDQUFQO0FBQ0gsS0FQRSxDQUFQO0FBUUg7O0FBRURNLFFBQVFDLElBQVI7QUFDQUQsUUFBUUUsSUFBUjtBQUNBRixRQUFRRyxJQUFSO0FBQ0FILFFBQVFJLEdBQVI7QUFDQUosUUFBUUssS0FBUjs7QUFFQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnXG5cbjsoZnVuY3Rpb24oZW1pdCl7XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKCl7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGVtaXQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXG4gICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEV2ZW50RW1pdHRlciBlcnJvcjogJHtlLm1lc3NhZ2V9YClcbiAgICAgICAgfVxuICAgIH1cbn0pKEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCk7XG5cbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcbmltcG9ydCBSb2xlIGZyb20gJy4vcm9sZSdcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnXG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnXG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vc2VydmljZSdcblxuaW1wb3J0IHtSZW1vdGVEYiwgSHlicmlkRGIsIHV0aWxzfSBmcm9tICdtaW5pbW9uZ28nXG5cblxudmFyIF9fd29ya2VyXG4gICAgLGFwcElkXG4gICAgLHNlcnZlclxuICAgICxnSHR0cEVycm9ySGFuZGxlclxuICAgICxkYlxuICAgICxkYlByb21pc2VcbiAgICAsbG9hZGluZ0hhbmRsZXI7XG5cbmZ1bmN0aW9uIG1ha2VFbnZSZWFkeSgpe1xuICAgIChmdW5jdGlvbih3aW5kb3cpe1xuICAgICAgICBpZih0eXBlb2Yod2luZG93LmNvcmRvdmEpIT0ndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LnNxbGl0ZVBsdWdpbiE9J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgd2luZG93LmRlbGV0ZURhdGFiYXNlPXdpbmRvdy5zcWxpdGVQbHVnaW4uZGVsZXRlRGF0YWJhc2VcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuRGF0YWJhc2U9ZnVuY3Rpb24obmFtZSl7XG4gICAgICAgICAgICAgICAgdmFyIGRiPXdpbmRvdy5zcWxpdGVQbHVnaW4ub3BlbkRhdGFiYXNlKHtuYW1lLGxvY2F0aW9uOlwiZGVmYXVsdFwifSlcbiAgICAgICAgICAgICAgICBkYi52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb258fFwiXCJcbiAgICAgICAgICAgICAgICBkYi5jaGFuZ2VWZXJzaW9uPWZ1bmN0aW9uKG9sZFZlcnNpb24sbmV3VmVyc2lvbix0cmFuc0NhbGxiYWNrLCBlcnJvciwgc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudmVyc2lvbiE9PW9sZFZlcnNpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3IgPyBlcnJvcihcIlwiKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodHJhbnNDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uKHRyYW5zQ2FsbGJhY2ssIGVycm9yLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRiLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbj1uZXdWZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mKHN1Y2Nlc3MpIT0ndW5kZWZpbmVkJyAmJiBzdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9uPW5ld1ZlcnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihzdWNjZXNzKSE9J3VuZGVmaW5lZCcgJiYgc3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkodHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID9nbG9iYWwud2luZG93PXt9IDogd2luZG93KTtcblxufVxuXG5mdW5jdGlvbiBmaXhNaW5pbW9uZ28oZGIpe1xuICAgIHJlcXVpcmUoJy4vZml4LW1pbmltb25nbycpKGRiKVxufVxuXG5mdW5jdGlvbiBhamF4UmVxdWVzdChtZXRob2Q9J2dldCcsIHVybCwgcGFyYW1zLCBkYXRhLCBzdWNjZXNzLCBlcnJvciwgX2FwcElkLCBfc2Vzc2lvblRva2VuKSB7XG4gICAgaWYoIWFwcElkKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2Ugc3BlY2lmeSBhcHBsaWNhdGlvbiBLZXkgZmlyc3RcIilcbiAgICBtZXRob2Q9bWV0aG9kLnRvTG93ZXJDYXNlKClcbiAgICBsb2FkaW5nSGFuZGxlci5zaG93KClcbiAgICB0cnl7XG4gICAgICAgIGlmKHBhcmFtcyl7XG4gICAgICAgICAgICBwYXJhbXMuc2VsZWN0b3IgJiYgcGFyYW1zLnNlbGVjdG9yIT1cInt9XCIgJiYgKHBhcmFtcy5xdWVyeT1wYXJhbXMuc2VsZWN0b3IpO1xuICAgICAgICAgICAgdmFyIHA9W11cbiAgICAgICAgICAgICdzb3J0LGxpbWl0LHNraXB0LGZpZWxkcyxxdWVyeScuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSl7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleV0gJiYgcC5wdXNoKGtleSsnPScrcGFyYW1zW2tleV0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMucXVlcnk7XG5cbiAgICAgICAgICAgIHVybD0hcC5sZW5ndGggPyB1cmwgOiB1cmwrKHVybC5pbmRleE9mKCc/Jyk9PS0xID8gJz8nIDogJyYnKStwLmpvaW4oJyYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIHZhciB0eXBlPXhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyksXG4gICAgICAgICAgICAgICAgICAgIHI7XG4gICAgICAgICAgICAgICAgaWYodHlwZSAmJiB0eXBlLmluZGV4T2YoJy9qc29uJykhPS0xKXtcbiAgICAgICAgICAgICAgICAgICAgcj1KU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAgICAgcj14aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdIYW5kbGVyLmNsb3NlKClcbiAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdIYW5kbGVyLmNsb3NlKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QhPSdnZXQnICYmIGdIdHRwRXJyb3JIYW5kbGVyKGAke21ldGhvZD09J2RlbGV0ZScgPyAnRGVsZXRlZCcgOidTYXZlZCd9IHN1Y2Nlc3NmdWxseWAsJ0luZm8nKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKHIpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG09cnx8KHhoci5zdGF0dXM9PTAmJlwiTm8gbmV0d29ya1wiKXx8XCJlcnJvciBoYXBwZW5zXCI7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKG0pPT0wICYmIGdIdHRwRXJyb3JIYW5kbGVyKG0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vcGVuKG1ldGhvZCx1cmwsdHJ1ZSlcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKVxuXG4gICAgICAgIHZhciBpc0pzb249ZmFsc2VcblxuICAgICAgICBpZihtZXRob2Q9PSdkZWxldGUnKVxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ3RleHQvcGxhaW4nKTtcbiAgICAgICAgZWxzZSBpZihkYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpXG4gICAgICAgICAgICA7Ly94aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKVxuICAgICAgICAgICAgaXNKc29uPXRydWVcbiAgICAgICAgfVxuXG5cblxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1BcHBsaWNhdGlvbi1JZCcsX2FwcElkfHxhcHBJZClcbiAgICAgICAgaWYoVXNlci5jdXJyZW50KVxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtU2Vzc2lvbi1Ub2tlbicsVXNlci5jdXJyZW50LnNlc3Npb25Ub2tlbikvL2N1cnJlbnQgdXNlcm5hbWUsIHNhbWUgd2l0aCBfaWRcbiAgICAgICAgaWYoX3Nlc3Npb25Ub2tlbilcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVNlc3Npb24tVG9rZW4nLF9zZXNzaW9uVG9rZW4pXG5cbiAgICAgICAgeGhyLnNlbmQodHlwZW9mKGRhdGEpPT0nc3RyaW5nJyB8fCAhaXNKc29uID8gZGF0YSA6IEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgIH1jYXRjaChlKXtcbiAgICAgICAgY29uc29sZS5lcnJvcihlLm1lc3NhZ2UpXG4gICAgICAgIGxvYWRpbmdIYW5kbGVyLmNsb3NlKClcbiAgICB9XG4gICAgcmV0dXJuIHhoclxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChfc2VydmVyLF9hcHBJZCwgc3VjY2VzcywgaHR0cEVycm9yLCBfbG9hZGluZ0hhbmRsZXIpe1xuICAgIG1ha2VFbnZSZWFkeSgpXG5cbiAgICBhcHBJZD1fYXBwSWRcbiAgICBzZXJ2ZXI9X3NlcnZlclxuICAgIGdIdHRwRXJyb3JIYW5kbGVyPWh0dHBFcnJvciB8fCAoKGUsIGNvZGUpPT5jb25zb2xlLmVycm9yKGBodHRwIGVycm9yIHdpdGggc3RhdHVzICR7Y29kZX06ICR7ZX1gKSk7XG4gICAgbG9hZGluZ0hhbmRsZXI9X2xvYWRpbmdIYW5kbGVyIHx8IHtzaG93KCl7fSxjbG9zZSgpe319XG5cbiAgICByZXR1cm4gZGJQcm9taXNlPW5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIHV0aWxzLmF1dG9zZWxlY3RMb2NhbERiKHtuYW1lc3BhY2U6YHFpbGkuJHtfYXBwSWR9YH0sZnVuY3Rpb24obG9jYWxEYil7XG4gICAgICAgICAgICBkYj1uZXcgSHlicmlkRGIobG9jYWxEYixuZXcgUmVtb3RlRGIoc2VydmVyK1wiY2xhc3Nlcy9cIix7fSxhamF4UmVxdWVzdCkpO1xuICAgICAgICAgICAgZml4TWluaW1vbmdvKGRiKVxuXG4gICAgICAgICAgICBsZXQgbG9jYWxTdG9yYWdlPW1ha2VMb2NhbFN0b3JhZ2UobG9jYWxEYilcblxuICAgICAgICAgICAgU2VydmljZS5pbml0KG51bGwsZGIsIGFqYXhSZXF1ZXN0LHNlcnZlciwgbG9jYWxTdG9yYWdlKVxuICAgICAgICAgICAgU2VydmljZS5pc0N1cnJlbnRBcHA9ZnVuY3Rpb24oX19hcHBJZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9hcHBJZD09X19hcHBJZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBVc2VyLmluaXQoKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgUm9sZS5pbml0KCk7XG4gICAgICAgICAgICAgICAgRmlsZS5pbml0KCk7XG4gICAgICAgICAgICAgICAgTG9nLmluaXQoKTtcblxuICAgICAgICAgICAgICAgIGlmKHN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCgpPT5zdWNjZXNzKGRiKSlcblx0XHRcdFx0XHRpZihVc2VyLmN1cnJlbnQpe1xuXHRcdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKHN1Y2Nlc3MoZGIpfHxkYilcblx0XHRcdFx0XHRcdFx0LnRoZW4oYT0+cmVzb2x2ZShpc1R1dG9yaWFsaXplZChsb2NhbFN0b3JhZ2UpKSlcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHJlc29sdmUoaXNUdXRvcmlhbGl6ZWQobG9jYWxTdG9yYWdlKSlcblx0XHRcdFx0XHR9ICAgICAgIFxuICAgICAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoaXNUdXRvcmlhbGl6ZWQobG9jYWxTdG9yYWdlKSlcblxuICAgICAgICAgICAgICAgIHN1cHBvcnRXb3JrZXIoX3NlcnZlciwgX2FwcElkKVxuXG4gICAgICAgICAgICAgICAgU2VydmljZS5lbWl0KCdpbml0ZWQnKVxuICAgICAgICAgICAgfSxyZWplY3QpXG5cbiAgICAgICAgfSxyZWplY3QpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc3VwcG9ydFdvcmtlcihzZXJ2ZXIsIGFwcElkKXsvKlxuICAgIHJldHVybiBmYWxzZVxuICAgIF9fd29ya2VyIGZyb20gJ3dlYndvcmtpZnknKShyZXF1aXJlKCcuL3dvcmtlci5qcycpKVxuICAgIDsoZnVuY3Rpb24ocG9zdE1lc3NhZ2Upe1xuICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZT1mdW5jdGlvbihtLCAuLi5kYXRhKXtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlLmNhbGwoX193b3JrZXIsIHt0eXBlOm0sIGFyZ3M6SlNPTi5zdHJpbmdpZnkoZGF0YSl9KVxuICAgICAgICB9XG4gICAgfSkoX193b3JrZXIucG9zdE1lc3NhZ2UpO1xuXG5cbiAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgnaW5pdCcsIHNlcnZlciwgYXBwSWQpXG5cblxuXG5cbiAgICBVc2VyLm9uKCdjaGFuZ2UnLCgpPT5fX3dvcmtlci5wb3N0TWVzc2FnZSgndXNlcicsVXNlci5jdXJyZW50KSlcbiAgICBpZihVc2VyLmN1cnJlbnQpXG4gICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCd1c2VyJywgVXNlci5jdXJyZW50KVxuXG4gICAgOyhmdW5jdGlvbihfYWRkQ29sbGVjdGlvbil7XG4gICAgICAgIGZ1bmN0aW9uIHdyYXAoc3VjY2VzcyxzdGF0ZSwgdHlwZSl7XG4gICAgICAgICAgICByZXR1cm4gKCk9PntcbiAgICAgICAgICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZShzdGF0ZSx0eXBlKVxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb249ZnVuY3Rpb24obmFtZSwgb3B0KXtcbiAgICAgICAgICAgIF9hZGRDb2xsZWN0aW9uLmNhbGwodGhpcywuLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB2YXIgcj10aGlzW25hbWVdXG5cbiAgICAgICAgICAgIDsoZnVuY3Rpb24odXBzZXJ0KXtcbiAgICAgICAgICAgICAgICByLnVwc2VydD1mdW5jdGlvbihkb2NzLCBiYXNlcywgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBzZXJ0LmNhbGwodGhpcywgZG9jcywgYmFzZXMsIHdyYXAoc3VjY2VzcywndXBzZXJ0JyxuYW1lKSwgZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoci51cHNlcnQpXG5cbiAgICAgICAgICAgIDsoZnVuY3Rpb24ocmVtb3ZlKXtcbiAgICAgICAgICAgICAgICByLnJlbW92ZT1mdW5jdGlvbihpZCwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3ZlLmNhbGwodGhpcyxpZCwgd3JhcChzdWNjZXNzLCdyZW1vdmUnLG5hbWUpLGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKHIucmVtb3ZlKVxuXG4gICAgICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgnYWRkQ29sbGVjdGlvbicsbmFtZSlcbiAgICAgICAgICAgIHJldHVybiByXG4gICAgICAgIH1cbiAgICB9KShIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbik7Ki9cbn1cblxuZnVuY3Rpb24gbWFrZUxvY2FsU3RvcmFnZShsb2NhbERiKXtcbiAgICBsb2NhbERiLmFkZENvbGxlY3Rpb24oXCJfX2xvY2FsU3RvcmFnZVwiKVxuICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXRJdGVtKGtleSxkZWZhdWx0VmFsdWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UuZmluZE9uZSh7X2lkOmtleX0sYT0+cmVzb2x2ZShhICYmIGEudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mKGRlZmF1bHRWYWx1ZSk9PSd1bmRlZmluZWQnID8gcmVqZWN0IDogZT0+cmVzb2x2ZShkZWZhdWx0VmFsdWUpKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRJdGVtKGtleSwgdmFsdWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UudXBzZXJ0KHtfaWQ6a2V5LHZhbHVlfSxyZXNvbHZlLCByZWplY3QpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUl0ZW0oa2V5KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLnJlbW92ZShrZXkscmVzb2x2ZSwgcmVqZWN0KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxufVxuXG5mdW5jdGlvbiBpc1R1dG9yaWFsaXplZChsb2NhbFN0b3JhZ2Upe1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIpXG4gICAgICAgIC50aGVuKGE9PntcbiAgICAgICAgICAgIGlmKCFhKXtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIsXCJ0cnVlXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYVxuICAgICAgICB9KVxufVxuXG5leHBvcnRzLlVzZXI9VXNlclxuZXhwb3J0cy5Sb2xlPVJvbGVcbmV4cG9ydHMuRmlsZT1GaWxlXG5leHBvcnRzLkxvZz1Mb2dcbmV4cG9ydHMuTW9kZWw9U2VydmljZVxuXG4vKipcbiogYWpheCByZXF1ZXN0XG4qIGNsaWVudCBfaWRcbiAgICAqIGRvbmU6IG9rXG4qIGNsaWVudCBjcmVhdGVkQXQsIHVwZGF0ZWRBdFxuICAgICogZG9uZVxuICAgICogc2VydmVyIHNpZGUgd291bGQgZ2l2ZSBpdHMgb3duIGNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0XG4gICAgICAgICogY2FjaGUgb3BlcmF0aW9uIEludmFsaWRcbiAgICAgICAgICAgICogZGVsZXRlIHRoZW4gY2FjaGVcbiAgICAgICAgICAgICAgICAqIHNhbWUgdHJhbnNhY3Rpb25cblxuICAgICogaGFjayBpbiBhamF4XG4gICAgICAgICogdXBkYXRlOiBjcmVhdGVkQXQhPXVwZGF0ZWRBdFxuICAgICAgICAgICAgKiBjbGllbnQgaW5zZXJ0IHRoZW4gdXBkYXRlXG4gICAgICAgICogY3JlYXRlOiBjcmVhdGVkQXQ9PXVwZGF0ZWRBdFxuXG4qIHJldHVybiBhcHBlbmRlZCBwYXJ0IG9ubHkgVlMgd2hvbGUgb2JqZWN0XG4gICAgKiBtZXJnZSBjbGllbnQgb2JqZWN0IGFuZCBzZXJ2ZXIgcmV0dXJuIG9iamVjdFxuXG4qIGFueSB1cHNlcnQgYW5kIGRlbGV0ZSBtdXN0IGFjdCB0byBzZXJ2ZXIgZGlyZWN0bHlcbiAgICAqIGNhY2hlIGluIGxvY2FsXG4qIGFueSBmaW5kL2ZpbmRPbmUgbXVzdFxuICAgICogZmlyc3Qgb24gbG9jYWxcbiAgICAqIHRoZW4gdG8gcmVtb3RlXG4gICAgICAgICogc2FtZSB3aXRoIGxvY2FsLCB3aXRob3V0IGNhbGwgdG8gc3VjY2Vzc1xuICAgICAgICAqIG5vdCBzYW1lIHdpdGggbG9jYWwsIGNhbGwgdG8gc3VjY2Vzc1xuXG4qL1xuIl19