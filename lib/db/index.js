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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiZW1pdCIsInByb3RvdHlwZSIsImNhbGwiLCJhcmd1bWVudHMiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsIl9fd29ya2VyIiwiYXBwSWQiLCJzZXJ2ZXIiLCJnSHR0cEVycm9ySGFuZGxlciIsImRiIiwiZGJQcm9taXNlIiwibG9hZGluZ0hhbmRsZXIiLCJtYWtlRW52UmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwic3FsaXRlUGx1Z2luIiwiZGVsZXRlRGF0YWJhc2UiLCJvcGVuRGF0YWJhc2UiLCJuYW1lIiwibG9jYXRpb24iLCJ2ZXJzaW9uIiwibG9jYWxTdG9yYWdlIiwiZGJWZXJzaW9uIiwiY2hhbmdlVmVyc2lvbiIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwidHJhbnNDYWxsYmFjayIsInN1Y2Nlc3MiLCJ0cmFuc2FjdGlvbiIsImdsb2JhbCIsImZpeE1pbmltb25nbyIsInJlcXVpcmUiLCJhamF4UmVxdWVzdCIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJfYXBwSWQiLCJfc2Vzc2lvblRva2VuIiwiRXJyb3IiLCJ0b0xvd2VyQ2FzZSIsInNob3ciLCJzZWxlY3RvciIsInF1ZXJ5IiwicCIsInNwbGl0IiwiZm9yRWFjaCIsImtleSIsInB1c2giLCJsZW5ndGgiLCJpbmRleE9mIiwiam9pbiIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsInIiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJjbG9zZSIsInN0YXR1cyIsIm0iLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImlzSnNvbiIsIkZvcm1EYXRhIiwiY3VycmVudCIsInNlc3Npb25Ub2tlbiIsInNlbmQiLCJzdHJpbmdpZnkiLCJfc2VydmVyIiwiaHR0cEVycm9yIiwiX2xvYWRpbmdIYW5kbGVyIiwiY29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYXV0b3NlbGVjdExvY2FsRGIiLCJuYW1lc3BhY2UiLCJsb2NhbERiIiwibWFrZUxvY2FsU3RvcmFnZSIsImlzQ3VycmVudEFwcCIsIl9fYXBwSWQiLCJ0aGVuIiwicFR1dG9yaWFsIiwiaXNUdXRvcmlhbGl6ZWQiLCJvbiIsInN1cHBvcnRXb3JrZXIiLCJhZGRDb2xsZWN0aW9uIiwiZ2V0SXRlbSIsImRlZmF1bHRWYWx1ZSIsIl9fbG9jYWxTdG9yYWdlIiwiZmluZE9uZSIsIl9pZCIsImEiLCJ2YWx1ZSIsInNldEl0ZW0iLCJ1cHNlcnQiLCJyZW1vdmVJdGVtIiwicmVtb3ZlIiwicmVzb2x2ZVJlbW92ZSIsImV4cG9ydHMiLCJVc2VyIiwiUm9sZSIsIkZpbGUiLCJMb2ciLCJNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUF1SWdCQSxJLEdBQUFBLEk7O0FBdkloQjs7QUFZQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBaEJDLENBQUMsVUFBU0MsSUFBVCxFQUFjO0FBQ1oseUJBQWFDLFNBQWIsQ0FBdUJELElBQXZCLEdBQTRCLFlBQVU7QUFDbEMsWUFBRztBQUNDQSxpQkFBS0UsSUFBTCxjQUFVLElBQVYsb0NBQW1CQyxTQUFuQjtBQUNILFNBRkQsQ0FFQyxPQUFNQyxDQUFOLEVBQVE7QUFDTEMsb0JBQVFDLEtBQVIsMEJBQXFDRixFQUFFRyxPQUF2QztBQUNIO0FBQ0osS0FORDtBQU9ILENBUkEsRUFRRSxxQkFBYU4sU0FBYixDQUF1QkQsSUFSekI7O0FBbUJELElBQUlRLFFBQUosRUFDS0MsS0FETCxFQUVLQyxNQUZMLEVBR0tDLGlCQUhMLEVBSUtDLEVBSkwsRUFLS0MsU0FMTCxFQU1LQyxjQU5MOztBQVFBLFNBQVNDLFlBQVQsR0FBdUI7QUFDbkIsS0FBQyxVQUFTQyxNQUFULEVBQWdCO0FBQ2IsWUFBRyxPQUFPQSxPQUFPQyxPQUFkLElBQXdCLFdBQXhCLElBQXVD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LFFBQVFZLGNBQVIsQ0FBdUJRLE1BQXZCLENBQThCdkQsR0FBOUIsRUFBa0MsWUFBSTtBQUNuRG1DLDRCQUFRWSxjQUFSLENBQXVCUyxhQUF2QixDQUFxQ3hELEdBQXJDLEVBQTBDK0IsT0FBMUMsRUFBa0RDLE1BQWxEO0FBQ0EsaUJBRmEsRUFFWEEsTUFGVyxDQURlO0FBQUEsYUFBWixDQUFQO0FBSUg7QUFmRixLQUFQO0FBaUJIOztBQUVEeUIsUUFBUUMsSUFBUjtBQUNBRCxRQUFRRSxJQUFSO0FBQ0FGLFFBQVFHLElBQVI7QUFDQUgsUUFBUUksR0FBUjtBQUNBSixRQUFRSyxLQUFSOztBQUVBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cydcclxuXHJcbjsoZnVuY3Rpb24oZW1pdCl7XHJcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oKXtcclxuICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgIGVtaXQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXHJcbiAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFdmVudEVtaXR0ZXIgZXJyb3I6ICR7ZS5tZXNzYWdlfWApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KShFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQpO1xyXG5cclxuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xyXG5pbXBvcnQgUm9sZSBmcm9tICcuL3JvbGUnXHJcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnXHJcbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcclxuaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnXHJcblxyXG5pbXBvcnQge1JlbW90ZURiLCBIeWJyaWREYiwgdXRpbHN9IGZyb20gJ21pbmltb25nbydcclxuXHJcblxyXG52YXIgX193b3JrZXJcclxuICAgICxhcHBJZFxyXG4gICAgLHNlcnZlclxyXG4gICAgLGdIdHRwRXJyb3JIYW5kbGVyXHJcbiAgICAsZGJcclxuICAgICxkYlByb21pc2VcclxuICAgICxsb2FkaW5nSGFuZGxlcjtcclxuXHJcbmZ1bmN0aW9uIG1ha2VFbnZSZWFkeSgpe1xyXG4gICAgKGZ1bmN0aW9uKHdpbmRvdyl7XHJcbiAgICAgICAgaWYodHlwZW9mKHdpbmRvdy5jb3Jkb3ZhKSE9J3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5zcWxpdGVQbHVnaW4hPSd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgd2luZG93LmRlbGV0ZURhdGFiYXNlPXdpbmRvdy5zcWxpdGVQbHVnaW4uZGVsZXRlRGF0YWJhc2VcclxuICAgICAgICAgICAgd2luZG93Lm9wZW5EYXRhYmFzZT1mdW5jdGlvbihuYW1lKXtcclxuICAgICAgICAgICAgICAgIHZhciBkYj13aW5kb3cuc3FsaXRlUGx1Z2luLm9wZW5EYXRhYmFzZSh7bmFtZSxsb2NhdGlvbjpcImRlZmF1bHRcIn0pXHJcbiAgICAgICAgICAgICAgICBkYi52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb258fFwiXCJcclxuICAgICAgICAgICAgICAgIGRiLmNoYW5nZVZlcnNpb249ZnVuY3Rpb24ob2xkVmVyc2lvbixuZXdWZXJzaW9uLHRyYW5zQ2FsbGJhY2ssIGVycm9yLCBzdWNjZXNzKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnZlcnNpb24hPT1vbGRWZXJzaW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3IgPyBlcnJvcihcIlwiKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYW5zQ2FsbGJhY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uKHRyYW5zQ2FsbGJhY2ssIGVycm9yLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9uPW5ld1ZlcnNpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihzdWNjZXNzKSE9J3VuZGVmaW5lZCcgJiYgc3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbj1uZXdWZXJzaW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihzdWNjZXNzKSE9J3VuZGVmaW5lZCcgJiYgc3VjY2VzcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBkYlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkodHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID9nbG9iYWwud2luZG93PXt9IDogd2luZG93KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpeE1pbmltb25nbyhkYil7XHJcbiAgICByZXF1aXJlKCcuL2ZpeC1taW5pbW9uZ28nKShkYilcclxufVxyXG5cclxuZnVuY3Rpb24gYWpheFJlcXVlc3QobWV0aG9kPSdnZXQnLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9hcHBJZCwgX3Nlc3Npb25Ub2tlbikge1xyXG4gICAgaWYoIWFwcElkKVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBzcGVjaWZ5IGFwcGxpY2F0aW9uIEtleSBmaXJzdFwiKVxyXG4gICAgbWV0aG9kPW1ldGhvZC50b0xvd2VyQ2FzZSgpXHJcbiAgICBsb2FkaW5nSGFuZGxlci5zaG93KClcclxuICAgIHRyeXtcclxuICAgICAgICBpZihwYXJhbXMpe1xyXG4gICAgICAgICAgICBwYXJhbXMuc2VsZWN0b3IgJiYgcGFyYW1zLnNlbGVjdG9yIT1cInt9XCIgJiYgKHBhcmFtcy5xdWVyeT1wYXJhbXMuc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB2YXIgcD1bXVxyXG4gICAgICAgICAgICAnc29ydCxsaW1pdCxza2lwdCxmaWVsZHMscXVlcnknLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleV0gJiYgcC5wdXNoKGtleSsnPScrcGFyYW1zW2tleV0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkZWxldGUgcGFyYW1zLnF1ZXJ5O1xyXG5cclxuICAgICAgICAgICAgdXJsPSFwLmxlbmd0aCA/IHVybCA6IHVybCsodXJsLmluZGV4T2YoJz8nKT09LTEgPyAnPycgOiAnJicpK3Auam9pbignJicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3QoKVxyXG5cclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlPXhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgcjtcclxuICAgICAgICAgICAgICAgIGlmKHR5cGUgJiYgdHlwZS5pbmRleE9mKCcvanNvbicpIT0tMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcj1KU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpXHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHI9eGhyLnJlc3BvbnNlVGV4dFxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdIYW5kbGVyLmNsb3NlKClcclxuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2QhPSdnZXQnICYmIGdIdHRwRXJyb3JIYW5kbGVyKGAke21ldGhvZD09J2RlbGV0ZScgPyAnRGVsZXRlZCcgOidTYXZlZCd9IHN1Y2Nlc3NmdWxseWAsJ0luZm8nKTtcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MocilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG09cnx8KHhoci5zdGF0dXM9PTAmJlwiTm8gbmV0d29ya1wiKXx8XCJlcnJvciBoYXBwZW5zXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IobSk9PTAgJiYgZ0h0dHBFcnJvckhhbmRsZXIobSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLHVybCx0cnVlKVxyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ1hNTEh0dHBSZXF1ZXN0JylcclxuXHJcbiAgICAgICAgdmFyIGlzSnNvbj1mYWxzZVxyXG5cclxuICAgICAgICBpZihtZXRob2Q9PSdkZWxldGUnKVxyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywndGV4dC9wbGFpbicpO1xyXG4gICAgICAgIGVsc2UgaWYoZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKVxyXG4gICAgICAgICAgICA7Ly94aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpXHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JylcclxuICAgICAgICAgICAgaXNKc29uPXRydWVcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtQXBwbGljYXRpb24tSWQnLF9hcHBJZHx8YXBwSWQpXHJcbiAgICAgICAgaWYoVXNlci5jdXJyZW50KVxyXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxVc2VyLmN1cnJlbnQuc2Vzc2lvblRva2VuKS8vY3VycmVudCB1c2VybmFtZSwgc2FtZSB3aXRoIF9pZFxyXG4gICAgICAgIGlmKF9zZXNzaW9uVG9rZW4pXHJcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVNlc3Npb24tVG9rZW4nLF9zZXNzaW9uVG9rZW4pXHJcblxyXG4gICAgICAgIHhoci5zZW5kKHR5cGVvZihkYXRhKT09J3N0cmluZycgfHwgIWlzSnNvbiA/IGRhdGEgOiBKU09OLnN0cmluZ2lmeShkYXRhKSlcclxuICAgIH1jYXRjaChlKXtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSlcclxuICAgICAgICBsb2FkaW5nSGFuZGxlci5jbG9zZSgpXHJcbiAgICB9XHJcbiAgICByZXR1cm4geGhyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0KF9zZXJ2ZXIsX2FwcElkLCBzdWNjZXNzLCBodHRwRXJyb3IsIF9sb2FkaW5nSGFuZGxlcil7XHJcbiAgICBtYWtlRW52UmVhZHkoKVxyXG5cclxuICAgIGFwcElkPV9hcHBJZFxyXG4gICAgc2VydmVyPV9zZXJ2ZXJcclxuICAgIGdIdHRwRXJyb3JIYW5kbGVyPWh0dHBFcnJvciB8fCAoKGUsIGNvZGUpPT5jb25zb2xlLmVycm9yKGBodHRwIGVycm9yIHdpdGggc3RhdHVzICR7Y29kZX06ICR7ZX1gKSk7XHJcbiAgICBsb2FkaW5nSGFuZGxlcj1fbG9hZGluZ0hhbmRsZXIgfHwge3Nob3coKXt9LGNsb3NlKCl7fX1cclxuXHJcbiAgICByZXR1cm4gZGJQcm9taXNlPW5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgdXRpbHMuYXV0b3NlbGVjdExvY2FsRGIoe25hbWVzcGFjZTpgcWlsaS4ke19hcHBJZH1gfSxmdW5jdGlvbihsb2NhbERiKXtcclxuICAgICAgICAgICAgZGI9bmV3IEh5YnJpZERiKGxvY2FsRGIsbmV3IFJlbW90ZURiKHNlcnZlcitcImNsYXNzZXMvXCIse30sYWpheFJlcXVlc3QpKTtcclxuICAgICAgICAgICAgZml4TWluaW1vbmdvKGRiKVxyXG5cclxuICAgICAgICAgICAgbGV0IGxvY2FsU3RvcmFnZT1tYWtlTG9jYWxTdG9yYWdlKGxvY2FsRGIpXHJcblxyXG4gICAgICAgICAgICBTZXJ2aWNlLmluaXQobnVsbCxkYiwgYWpheFJlcXVlc3Qsc2VydmVyLCBsb2NhbFN0b3JhZ2UpXHJcbiAgICAgICAgICAgIFNlcnZpY2UuaXNDdXJyZW50QXBwPWZ1bmN0aW9uKF9fYXBwSWQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9hcHBJZD09X19hcHBJZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBVc2VyLmluaXQoKS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBSb2xlLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIEZpbGUuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgTG9nLmluaXQoKTtcclxuXHJcblx0XHRcdFx0bGV0IHBUdXRvcmlhbD1Vc2VyLmlzVHV0b3JpYWxpemVkKClcclxuICAgICAgICAgICAgICAgIGlmKHN1Y2Nlc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsKCk9PnN1Y2Nlc3MoZGIpKVxyXG5cdFx0XHRcdFx0aWYoVXNlci5jdXJyZW50KXtcclxuXHRcdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKHN1Y2Nlc3MoZGIpfHxkYilcclxuXHRcdFx0XHRcdFx0XHQudGhlbihhPT5yZXNvbHZlKHBUdXRvcmlhbCkpXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShwVHV0b3JpYWwpXHJcblx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocFR1dG9yaWFsKVxyXG5cclxuICAgICAgICAgICAgICAgIHN1cHBvcnRXb3JrZXIoX3NlcnZlciwgX2FwcElkKVxyXG5cclxuICAgICAgICAgICAgICAgIFNlcnZpY2UuZW1pdCgnaW5pdGVkJylcclxuICAgICAgICAgICAgfSxyZWplY3QpXHJcblxyXG4gICAgICAgIH0scmVqZWN0KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc3VwcG9ydFdvcmtlcihzZXJ2ZXIsIGFwcElkKXsvKlxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgICBfX3dvcmtlciBmcm9tICd3ZWJ3b3JraWZ5JykocmVxdWlyZSgnLi93b3JrZXIuanMnKSlcclxuICAgIDsoZnVuY3Rpb24ocG9zdE1lc3NhZ2Upe1xyXG4gICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlPWZ1bmN0aW9uKG0sIC4uLmRhdGEpe1xyXG4gICAgICAgICAgICBwb3N0TWVzc2FnZS5jYWxsKF9fd29ya2VyLCB7dHlwZTptLCBhcmdzOkpTT04uc3RyaW5naWZ5KGRhdGEpfSlcclxuICAgICAgICB9XHJcbiAgICB9KShfX3dvcmtlci5wb3N0TWVzc2FnZSk7XHJcblxyXG5cclxuICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdpbml0Jywgc2VydmVyLCBhcHBJZClcclxuXHJcblxyXG5cclxuXHJcbiAgICBVc2VyLm9uKCdjaGFuZ2UnLCgpPT5fX3dvcmtlci5wb3N0TWVzc2FnZSgndXNlcicsVXNlci5jdXJyZW50KSlcclxuICAgIGlmKFVzZXIuY3VycmVudClcclxuICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgndXNlcicsIFVzZXIuY3VycmVudClcclxuXHJcbiAgICA7KGZ1bmN0aW9uKF9hZGRDb2xsZWN0aW9uKXtcclxuICAgICAgICBmdW5jdGlvbiB3cmFwKHN1Y2Nlc3Msc3RhdGUsIHR5cGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gKCk9PntcclxuICAgICAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKHN0YXRlLHR5cGUpXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uPWZ1bmN0aW9uKG5hbWUsIG9wdCl7XHJcbiAgICAgICAgICAgIF9hZGRDb2xsZWN0aW9uLmNhbGwodGhpcywuLi5hcmd1bWVudHMpXHJcbiAgICAgICAgICAgIHZhciByPXRoaXNbbmFtZV1cclxuXHJcbiAgICAgICAgICAgIDsoZnVuY3Rpb24odXBzZXJ0KXtcclxuICAgICAgICAgICAgICAgIHIudXBzZXJ0PWZ1bmN0aW9uKGRvY3MsIGJhc2VzLCBzdWNjZXNzLCBlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwc2VydC5jYWxsKHRoaXMsIGRvY3MsIGJhc2VzLCB3cmFwKHN1Y2Nlc3MsJ3Vwc2VydCcsbmFtZSksIGVycm9yKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KShyLnVwc2VydClcclxuXHJcbiAgICAgICAgICAgIDsoZnVuY3Rpb24ocmVtb3ZlKXtcclxuICAgICAgICAgICAgICAgIHIucmVtb3ZlPWZ1bmN0aW9uKGlkLCBzdWNjZXNzLCBlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZS5jYWxsKHRoaXMsaWQsIHdyYXAoc3VjY2VzcywncmVtb3ZlJyxuYW1lKSxlcnJvcilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkoci5yZW1vdmUpXHJcblxyXG4gICAgICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgnYWRkQ29sbGVjdGlvbicsbmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHJcclxuICAgICAgICB9XHJcbiAgICB9KShIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbik7Ki9cclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUxvY2FsU3RvcmFnZShsb2NhbERiKXtcclxuICAgIGxvY2FsRGIuYWRkQ29sbGVjdGlvbihcIl9fbG9jYWxTdG9yYWdlXCIpXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXRJdGVtKGtleSxkZWZhdWx0VmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cclxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLmZpbmRPbmUoe19pZDprZXl9LGE9PnJlc29sdmUoYSAmJiBhLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mKGRlZmF1bHRWYWx1ZSk9PSd1bmRlZmluZWQnID8gcmVqZWN0IDogZT0+cmVzb2x2ZShkZWZhdWx0VmFsdWUpKSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0SXRlbShrZXksIHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS51cHNlcnQoe19pZDprZXksdmFsdWV9LHJlc29sdmUsIHJlamVjdCkpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlbW92ZUl0ZW0oa2V5KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5yZW1vdmUoa2V5LCgpPT57XHJcblx0XHRcdFx0XHRcdFx0bG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5yZXNvbHZlUmVtb3ZlKGtleSwgcmVzb2x2ZSxyZWplY3QpXHJcblx0XHRcdFx0XHRcdH0sIHJlamVjdCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydHMuVXNlcj1Vc2VyXHJcbmV4cG9ydHMuUm9sZT1Sb2xlXHJcbmV4cG9ydHMuRmlsZT1GaWxlXHJcbmV4cG9ydHMuTG9nPUxvZ1xyXG5leHBvcnRzLk1vZGVsPVNlcnZpY2VcclxuXHJcbi8qKlxyXG4qIGFqYXggcmVxdWVzdFxyXG4qIGNsaWVudCBfaWRcclxuICAgICogZG9uZTogb2tcclxuKiBjbGllbnQgY3JlYXRlZEF0LCB1cGRhdGVkQXRcclxuICAgICogZG9uZVxyXG4gICAgKiBzZXJ2ZXIgc2lkZSB3b3VsZCBnaXZlIGl0cyBvd24gY3JlYXRlZEF0IGFuZCB1cGRhdGVkQXRcclxuICAgICAgICAqIGNhY2hlIG9wZXJhdGlvbiBJbnZhbGlkXHJcbiAgICAgICAgICAgICogZGVsZXRlIHRoZW4gY2FjaGVcclxuICAgICAgICAgICAgICAgICogc2FtZSB0cmFuc2FjdGlvblxyXG5cclxuICAgICogaGFjayBpbiBhamF4XHJcbiAgICAgICAgKiB1cGRhdGU6IGNyZWF0ZWRBdCE9dXBkYXRlZEF0XHJcbiAgICAgICAgICAgICogY2xpZW50IGluc2VydCB0aGVuIHVwZGF0ZVxyXG4gICAgICAgICogY3JlYXRlOiBjcmVhdGVkQXQ9PXVwZGF0ZWRBdFxyXG5cclxuKiByZXR1cm4gYXBwZW5kZWQgcGFydCBvbmx5IFZTIHdob2xlIG9iamVjdFxyXG4gICAgKiBtZXJnZSBjbGllbnQgb2JqZWN0IGFuZCBzZXJ2ZXIgcmV0dXJuIG9iamVjdFxyXG5cclxuKiBhbnkgdXBzZXJ0IGFuZCBkZWxldGUgbXVzdCBhY3QgdG8gc2VydmVyIGRpcmVjdGx5XHJcbiAgICAqIGNhY2hlIGluIGxvY2FsXHJcbiogYW55IGZpbmQvZmluZE9uZSBtdXN0XHJcbiAgICAqIGZpcnN0IG9uIGxvY2FsXHJcbiAgICAqIHRoZW4gdG8gcmVtb3RlXHJcbiAgICAgICAgKiBzYW1lIHdpdGggbG9jYWwsIHdpdGhvdXQgY2FsbCB0byBzdWNjZXNzXHJcbiAgICAgICAgKiBub3Qgc2FtZSB3aXRoIGxvY2FsLCBjYWxsIHRvIHN1Y2Nlc3NcclxuXHJcbiovXHJcbiJdfQ==