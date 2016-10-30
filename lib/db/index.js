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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiZW1pdCIsInByb3RvdHlwZSIsImNhbGwiLCJhcmd1bWVudHMiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsIl9fd29ya2VyIiwiYXBwSWQiLCJzZXJ2ZXIiLCJnSHR0cEVycm9ySGFuZGxlciIsImRiIiwiZGJQcm9taXNlIiwibG9hZGluZ0hhbmRsZXIiLCJtYWtlRW52UmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwic3FsaXRlUGx1Z2luIiwiZGVsZXRlRGF0YWJhc2UiLCJvcGVuRGF0YWJhc2UiLCJuYW1lIiwibG9jYXRpb24iLCJ2ZXJzaW9uIiwibG9jYWxTdG9yYWdlIiwiZGJWZXJzaW9uIiwiY2hhbmdlVmVyc2lvbiIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwidHJhbnNDYWxsYmFjayIsInN1Y2Nlc3MiLCJ0cmFuc2FjdGlvbiIsImdsb2JhbCIsImZpeE1pbmltb25nbyIsInJlcXVpcmUiLCJhamF4UmVxdWVzdCIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJfYXBwSWQiLCJfc2Vzc2lvblRva2VuIiwiRXJyb3IiLCJ0b0xvd2VyQ2FzZSIsInNob3ciLCJzZWxlY3RvciIsInF1ZXJ5IiwicCIsInNwbGl0IiwiZm9yRWFjaCIsImtleSIsInB1c2giLCJsZW5ndGgiLCJpbmRleE9mIiwiam9pbiIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsInIiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJjbG9zZSIsInN0YXR1cyIsIm0iLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImlzSnNvbiIsIkZvcm1EYXRhIiwiY3VycmVudCIsInNlc3Npb25Ub2tlbiIsInNlbmQiLCJzdHJpbmdpZnkiLCJfc2VydmVyIiwiaHR0cEVycm9yIiwiX2xvYWRpbmdIYW5kbGVyIiwiY29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYXV0b3NlbGVjdExvY2FsRGIiLCJuYW1lc3BhY2UiLCJsb2NhbERiIiwibWFrZUxvY2FsU3RvcmFnZSIsImlzQ3VycmVudEFwcCIsIl9fYXBwSWQiLCJ0aGVuIiwib24iLCJpc1R1dG9yaWFsaXplZCIsInN1cHBvcnRXb3JrZXIiLCJhZGRDb2xsZWN0aW9uIiwiZ2V0SXRlbSIsImRlZmF1bHRWYWx1ZSIsIl9fbG9jYWxTdG9yYWdlIiwiZmluZE9uZSIsIl9pZCIsImEiLCJ2YWx1ZSIsInNldEl0ZW0iLCJ1cHNlcnQiLCJyZW1vdmVJdGVtIiwicmVtb3ZlIiwiZXhwb3J0cyIsIlVzZXIiLCJSb2xlIiwiRmlsZSIsIkxvZyIsIk1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7OztRQXVJZ0JBLEksR0FBQUEsSTs7QUF2SWhCOztBQVlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFoQkMsQ0FBQyxVQUFTQyxJQUFULEVBQWM7QUFDWix5QkFBYUMsU0FBYixDQUF1QkQsSUFBdkIsR0FBNEIsWUFBVTtBQUNsQyxZQUFHO0FBQ0NBLGlCQUFLRSxJQUFMLGNBQVUsSUFBVixvQ0FBbUJDLFNBQW5CO0FBQ0gsU0FGRCxDQUVDLE9BQU1DLENBQU4sRUFBUTtBQUNMQyxvQkFBUUMsS0FBUiwwQkFBcUNGLEVBQUVHLE9BQXZDO0FBQ0g7QUFDSixLQU5EO0FBT0gsQ0FSQSxFQVFFLHFCQUFhTixTQUFiLENBQXVCRCxJQVJ6Qjs7QUFtQkQsSUFBSVEsUUFBSixFQUNLQyxLQURMLEVBRUtDLE1BRkwsRUFHS0MsaUJBSEwsRUFJS0MsRUFKTCxFQUtLQyxTQUxMLEVBTUtDLGNBTkw7O0FBUUEsU0FBU0MsWUFBVCxHQUF1QjtBQUNuQixLQUFDLFVBQVNDLE1BQVQsRUFBZ0I7QUFDYixZQUFHLE9BQU9BLE9BQU9DLE9BQWQsSUFBd0IsV0FBeEIsSUFBdUMsT0FBT0QsT0FBT0UsWUFBZCxJQUE0QixXQUF0RSxFQUFrRjtBQUM5RUYsbUJBQU9HLGNBQVAsR0FBc0JILE9BQU9FLFlBQVAsQ0FBb0JDLGNBQTFDO0FBQ0FILG1CQUFPSSxZQUFQLEdBQW9CLFVBQVNDLElBQVQsRUFBYztBQUM5QixvQkFBSVQsS0FBR0ksT0FBT0UsWUFBUCxDQUFvQkUsWUFBcEIsQ0FBaUMsRUFBQ0MsVUFBRCxFQUFNQyxVQUFTLFNBQWYsRUFBakMsQ0FBUDtBQUNBVixtQkFBR1csT0FBSCxHQUFXQyxhQUFhQyxTQUFiLElBQXdCLEVBQW5DO0FBQ0FiLG1CQUFHYyxhQUFILEdBQWlCLFVBQVNDLFVBQVQsRUFBb0JDLFVBQXBCLEVBQStCQyxhQUEvQixFQUE4Q3ZCLEtBQTlDLEVBQXFEd0IsT0FBckQsRUFBNkQ7QUFDMUUsd0JBQUcsS0FBS1AsT0FBTCxLQUFlSSxVQUFsQixFQUNJLE9BQU9yQixRQUFRQSxNQUFNLEVBQU4sQ0FBUixHQUFvQixJQUEzQjs7QUFFSix3QkFBR3VCLGFBQUgsRUFBaUI7QUFDYiw2QkFBS0UsV0FBTCxDQUFpQkYsYUFBakIsRUFBZ0N2QixLQUFoQyxFQUF1QyxZQUFVO0FBQzdDTSwrQkFBR1csT0FBSCxHQUFXQyxhQUFhQyxTQUFiLEdBQXVCRyxVQUFsQztBQUNBLG1DQUFPRSxPQUFQLElBQWlCLFdBQWpCLElBQWdDQSxTQUFoQztBQUNILHlCQUhEO0FBSUgscUJBTEQsTUFLSztBQUNELDZCQUFLUCxPQUFMLEdBQWFDLGFBQWFDLFNBQWIsR0FBdUJHLFVBQXBDO0FBQ0EsK0JBQU9FLE9BQVAsSUFBaUIsV0FBakIsSUFBZ0NBLFNBQWhDO0FBQ0g7QUFDSixpQkFiRDtBQWNBLHVCQUFPbEIsRUFBUDtBQUNILGFBbEJEO0FBbUJIO0FBQ0osS0F2QkQsRUF1QkcsT0FBT0ksTUFBUCxJQUFnQixXQUFoQixHQUE2QmdCLE9BQU9oQixNQUFQLEdBQWMsRUFBM0MsR0FBZ0RBLE1BdkJuRDtBQXlCSDs7QUFFRCxTQUFTaUIsWUFBVCxDQUFzQnJCLEVBQXRCLEVBQXlCO0FBQ3JCc0IsWUFBUSxpQkFBUixFQUEyQnRCLEVBQTNCO0FBQ0g7O0FBRUQsU0FBU3VCLFdBQVQsR0FBNkY7QUFBQSxRQUF4RUMsTUFBd0UsdUVBQWpFLEtBQWlFO0FBQUEsUUFBMURDLEdBQTBEO0FBQUEsUUFBckRDLE1BQXFEO0FBQUEsUUFBN0NDLElBQTZDO0FBQUEsUUFBdkNULE9BQXVDO0FBQUEsUUFBOUJ4QixLQUE4QjtBQUFBLFFBQXZCa0MsTUFBdUI7QUFBQSxRQUFmQyxhQUFlOztBQUN6RixRQUFHLENBQUNoQyxLQUFKLEVBQ0ksTUFBTSxJQUFJaUMsS0FBSixDQUFVLHNDQUFWLENBQU47QUFDSk4sYUFBT0EsT0FBT08sV0FBUCxFQUFQO0FBQ0E3QixtQkFBZThCLElBQWY7QUFDQSxRQUFHO0FBQ0MsWUFBR04sTUFBSCxFQUFVO0FBQ05BLG1CQUFPTyxRQUFQLElBQW1CUCxPQUFPTyxRQUFQLElBQWlCLElBQXBDLEtBQTZDUCxPQUFPUSxLQUFQLEdBQWFSLE9BQU9PLFFBQWpFO0FBQ0EsZ0JBQUlFLElBQUUsRUFBTjtBQUNBLDRDQUFnQ0MsS0FBaEMsQ0FBc0MsR0FBdEMsRUFBMkNDLE9BQTNDLENBQW1ELFVBQVNDLEdBQVQsRUFBYTtBQUM1RFosdUJBQU9ZLEdBQVAsS0FBZUgsRUFBRUksSUFBRixDQUFPRCxNQUFJLEdBQUosR0FBUVosT0FBT1ksR0FBUCxDQUFmLENBQWY7QUFDSCxhQUZEO0FBR0EsbUJBQU9aLE9BQU9RLEtBQWQ7O0FBRUFULGtCQUFJLENBQUNVLEVBQUVLLE1BQUgsR0FBWWYsR0FBWixHQUFrQkEsT0FBS0EsSUFBSWdCLE9BQUosQ0FBWSxHQUFaLEtBQWtCLENBQUMsQ0FBbkIsR0FBdUIsR0FBdkIsR0FBNkIsR0FBbEMsSUFBdUNOLEVBQUVPLElBQUYsQ0FBTyxHQUFQLENBQTdEO0FBQ0g7O0FBRUQsWUFBSUMsTUFBSSxJQUFJQyxjQUFKLEVBQVI7O0FBRUFELFlBQUlFLGtCQUFKLEdBQXlCLFlBQVk7QUFDakMsZ0JBQUlGLElBQUlHLFVBQUosS0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsb0JBQUc7QUFDSCx3QkFBSUMsT0FBS0osSUFBSUssaUJBQUosQ0FBc0IsY0FBdEIsQ0FBVDtBQUFBLHdCQUNJQyxDQURKO0FBRUEsd0JBQUdGLFFBQVFBLEtBQUtOLE9BQUwsQ0FBYSxPQUFiLEtBQXVCLENBQUMsQ0FBbkMsRUFBcUM7QUFDakNRLDRCQUFFQyxLQUFLQyxLQUFMLENBQVdSLElBQUlTLFlBQWYsQ0FBRjtBQUNILHFCQUZELE1BR0lILElBQUVOLElBQUlTLFlBQU47QUFDQWxELG1DQUFlbUQsS0FBZjtBQUNILGlCQVJELENBUUMsT0FBTTdELENBQU4sRUFBUTtBQUNMVSxtQ0FBZW1ELEtBQWY7QUFDSDs7QUFFRCxvQkFBSVYsSUFBSVcsTUFBSixJQUFjLEdBQWQsSUFBcUJYLElBQUlXLE1BQUosR0FBYSxHQUF0QyxFQUEyQztBQUN2QzlCLDhCQUFRLEtBQVIsSUFBaUJ6QixtQkFBcUJ5QixVQUFRLFFBQVIsR0FBbUIsU0FBbkIsR0FBOEIsT0FBbkQscUJBQTBFLE1BQTFFLENBQWpCO0FBQ0FOLCtCQUFXQSxRQUFRK0IsQ0FBUixDQUFYO0FBQ0gsaUJBSEQsTUFHTztBQUNILHdCQUFJTSxJQUFFTixLQUFJTixJQUFJVyxNQUFKLElBQVksQ0FBWixJQUFlLFlBQW5CLElBQWtDLGVBQXhDO0FBQ0E1RCw2QkFBU0EsTUFBTTZELENBQU4sS0FBVSxDQUFuQixJQUF3QnhELGtCQUFrQndELENBQWxCLENBQXhCO0FBRUg7QUFDSjtBQUNKLFNBdkJEOztBQXlCQVosWUFBSWEsSUFBSixDQUFTaEMsTUFBVCxFQUFnQkMsR0FBaEIsRUFBb0IsSUFBcEI7QUFDQWtCLFlBQUljLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxnQkFBekM7O0FBRUEsWUFBSUMsU0FBTyxLQUFYOztBQUVBLFlBQUdsQyxVQUFRLFFBQVgsRUFDSW1CLElBQUljLGdCQUFKLENBQXFCLGNBQXJCLEVBQW9DLFlBQXBDLEVBREosS0FFSyxJQUFHOUIsZ0JBQWdCZ0MsUUFBbkIsRUFDRCxDQURDLENBQ0E7QUFEQSxhQUVEO0FBQ0FoQixvQkFBSWMsZ0JBQUosQ0FBcUIsY0FBckIsRUFBcUMsaUNBQXJDO0FBQ0FDLHlCQUFPLElBQVA7QUFDSDs7QUFJRGYsWUFBSWMsZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXdDN0IsVUFBUS9CLEtBQWhEO0FBQ0EsWUFBRyxlQUFLK0QsT0FBUixFQUNJakIsSUFBSWMsZ0JBQUosQ0FBcUIsaUJBQXJCLEVBQXVDLGVBQUtHLE9BQUwsQ0FBYUMsWUFBcEQsRUF6REwsQ0F5RHNFO0FBQ3JFLFlBQUdoQyxhQUFILEVBQ0ljLElBQUljLGdCQUFKLENBQXFCLGlCQUFyQixFQUF1QzVCLGFBQXZDOztBQUVKYyxZQUFJbUIsSUFBSixDQUFTLE9BQU9uQyxJQUFQLElBQWMsUUFBZCxJQUEwQixDQUFDK0IsTUFBM0IsR0FBb0MvQixJQUFwQyxHQUEyQ3VCLEtBQUthLFNBQUwsQ0FBZXBDLElBQWYsQ0FBcEQ7QUFDSCxLQTlERCxDQThEQyxPQUFNbkMsQ0FBTixFQUFRO0FBQ0xDLGdCQUFRQyxLQUFSLENBQWNGLEVBQUVHLE9BQWhCO0FBQ0FPLHVCQUFlbUQsS0FBZjtBQUNIO0FBQ0QsV0FBT1YsR0FBUDtBQUNIOztBQUVNLFNBQVN4RCxJQUFULENBQWM2RSxPQUFkLEVBQXNCcEMsTUFBdEIsRUFBOEJWLE9BQTlCLEVBQXVDK0MsU0FBdkMsRUFBa0RDLGVBQWxELEVBQWtFO0FBQ3JFL0Q7O0FBRUFOLFlBQU0rQixNQUFOO0FBQ0E5QixhQUFPa0UsT0FBUDtBQUNBakUsd0JBQWtCa0UsYUFBYyxVQUFDekUsQ0FBRCxFQUFJMkUsSUFBSjtBQUFBLGVBQVcxRSxRQUFRQyxLQUFSLDZCQUF3Q3lFLElBQXhDLFVBQWlEM0UsQ0FBakQsQ0FBWDtBQUFBLEtBQWhDO0FBQ0FVLHFCQUFlZ0UsbUJBQW1CO0FBQUNsQyxZQUFELGtCQUFPLENBQUUsQ0FBVDtBQUFVcUIsYUFBVixtQkFBaUIsQ0FBRTtBQUFuQixLQUFsQzs7QUFFQSxXQUFPcEQsWUFBVSxJQUFJbUUsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUM1Qyx5QkFBTUMsaUJBQU4sQ0FBd0IsRUFBQ0MscUJBQWtCNUMsTUFBbkIsRUFBeEIsRUFBcUQsVUFBUzZDLE9BQVQsRUFBaUI7QUFDbEV6RSxpQkFBRyx3QkFBYXlFLE9BQWIsRUFBcUIsd0JBQWEzRSxTQUFPLFVBQXBCLEVBQStCLEVBQS9CLEVBQWtDeUIsV0FBbEMsQ0FBckIsQ0FBSDtBQUNBRix5QkFBYXJCLEVBQWI7O0FBRUEsZ0JBQUlZLGVBQWE4RCxpQkFBaUJELE9BQWpCLENBQWpCOztBQUVBLDZCQUFRdEYsSUFBUixDQUFhLElBQWIsRUFBa0JhLEVBQWxCLEVBQXNCdUIsV0FBdEIsRUFBa0N6QixNQUFsQyxFQUEwQ2MsWUFBMUM7QUFDQSw2QkFBUStELFlBQVIsR0FBcUIsVUFBU0MsT0FBVCxFQUFpQjtBQUNsQyx1QkFBT2hELFVBQVFnRCxPQUFmO0FBQ0gsYUFGRDs7QUFJQSwyQkFBS3pGLElBQUwsR0FBWTBGLElBQVosQ0FBaUIsWUFBVTtBQUN2QiwrQkFBSzFGLElBQUw7QUFDQSwrQkFBS0EsSUFBTDtBQUNBLDhCQUFJQSxJQUFKOztBQUVBLG9CQUFHK0IsT0FBSCxFQUFXO0FBQ1AsbUNBQUs0RCxFQUFMLENBQVEsUUFBUixFQUFpQjtBQUFBLCtCQUFJNUQsUUFBUWxCLEVBQVIsQ0FBSjtBQUFBLHFCQUFqQjtBQUNBcUUsNEJBQVEsZUFBS1QsT0FBTCxHQUFlUSxRQUFRQyxPQUFSLENBQWdCbkQsUUFBUWxCLEVBQVIsS0FBYUEsRUFBN0IsRUFBaUM2RSxJQUFqQyxDQUFzQztBQUFBLCtCQUFHRSxlQUFlbkUsWUFBZixDQUFIO0FBQUEscUJBQXRDLENBQWYsR0FBd0ZaLEVBQWhHO0FBQ0gsaUJBSEQsTUFJSXFFLFFBQVFVLGVBQWVuRSxZQUFmLENBQVI7O0FBRUpvRSw4QkFBY2hCLE9BQWQsRUFBdUJwQyxNQUF2Qjs7QUFFQSxpQ0FBUXhDLElBQVIsQ0FBYSxRQUFiO0FBQ0gsYUFkRCxFQWNFa0YsTUFkRjtBQWdCSCxTQTNCRCxFQTJCRUEsTUEzQkY7QUE0QkgsS0E3QmdCLENBQWpCO0FBOEJIOztBQUVELFNBQVNVLGFBQVQsQ0FBdUJsRixNQUF2QixFQUErQkQsS0FBL0IsRUFBcUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOENyQzs7QUFFRCxTQUFTNkUsZ0JBQVQsQ0FBMEJELE9BQTFCLEVBQWtDO0FBQzlCQSxZQUFRUSxhQUFSLENBQXNCLGdCQUF0QjtBQUNBLFdBQU87QUFDQ0MsZUFERCxtQkFDUzVDLEdBRFQsRUFDYTZDLFlBRGIsRUFDMEI7QUFDckIsbUJBQU8sSUFBSWYsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVjtBQUFBLHVCQUNmRyxRQUFRVyxjQUFSLENBQXVCQyxPQUF2QixDQUErQixFQUFDQyxLQUFJaEQsR0FBTCxFQUEvQixFQUF5QztBQUFBLDJCQUFHK0IsUUFBUWtCLEtBQUtBLEVBQUVDLEtBQWYsQ0FBSDtBQUFBLGlCQUF6QyxFQUNJLE9BQU9MLFlBQVAsSUFBc0IsV0FBdEIsR0FBb0NiLE1BQXBDLEdBQTZDO0FBQUEsMkJBQUdELFFBQVFjLFlBQVIsQ0FBSDtBQUFBLGlCQURqRCxDQURlO0FBQUEsYUFBWixDQUFQO0FBR0gsU0FMRjtBQU1DTSxlQU5ELG1CQU1TbkQsR0FOVCxFQU1ja0QsS0FOZCxFQU1vQjtBQUNmLG1CQUFPLElBQUlwQixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWO0FBQUEsdUJBQ2ZHLFFBQVFXLGNBQVIsQ0FBdUJNLE1BQXZCLENBQThCLEVBQUNKLEtBQUloRCxHQUFMLEVBQVNrRCxZQUFULEVBQTlCLEVBQThDbkIsT0FBOUMsRUFBdURDLE1BQXZELENBRGU7QUFBQSxhQUFaLENBQVA7QUFFSCxTQVRGO0FBVUNxQixrQkFWRCxzQkFVWXJELEdBVlosRUFVZ0I7QUFDWCxtQkFBTyxJQUFJOEIsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVjtBQUFBLHVCQUNmRyxRQUFRVyxjQUFSLENBQXVCUSxNQUF2QixDQUE4QnRELEdBQTlCLEVBQWtDK0IsT0FBbEMsRUFBMkNDLE1BQTNDLENBRGU7QUFBQSxhQUFaLENBQVA7QUFFSDtBQWJGLEtBQVA7QUFlSDs7QUFFRCxTQUFTUyxjQUFULENBQXdCbkUsWUFBeEIsRUFBcUM7QUFDakMsV0FBT0EsYUFBYXNFLE9BQWIsQ0FBcUIsZ0JBQXJCLEVBQ0ZMLElBREUsQ0FDRyxhQUFHO0FBQ0wsWUFBRyxDQUFDVSxDQUFKLEVBQU07QUFDRjNFLHlCQUFhNkUsT0FBYixDQUFxQixnQkFBckIsRUFBc0MsTUFBdEM7QUFDQSxtQkFBTyxLQUFQO0FBQ0g7QUFDRCxlQUFPRixDQUFQO0FBQ0gsS0FQRSxDQUFQO0FBUUg7O0FBRURNLFFBQVFDLElBQVI7QUFDQUQsUUFBUUUsSUFBUjtBQUNBRixRQUFRRyxJQUFSO0FBQ0FILFFBQVFJLEdBQVI7QUFDQUosUUFBUUssS0FBUjs7QUFFQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnXG5cbjsoZnVuY3Rpb24oZW1pdCl7XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKCl7XG4gICAgICAgIHRyeXtcbiAgICAgICAgICAgIGVtaXQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXG4gICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEV2ZW50RW1pdHRlciBlcnJvcjogJHtlLm1lc3NhZ2V9YClcbiAgICAgICAgfVxuICAgIH1cbn0pKEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCk7XG5cbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcbmltcG9ydCBSb2xlIGZyb20gJy4vcm9sZSdcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnXG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnXG5pbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vc2VydmljZSdcblxuaW1wb3J0IHtSZW1vdGVEYiwgSHlicmlkRGIsIHV0aWxzfSBmcm9tICdtaW5pbW9uZ28nXG5cblxudmFyIF9fd29ya2VyXG4gICAgLGFwcElkXG4gICAgLHNlcnZlclxuICAgICxnSHR0cEVycm9ySGFuZGxlclxuICAgICxkYlxuICAgICxkYlByb21pc2VcbiAgICAsbG9hZGluZ0hhbmRsZXI7XG5cbmZ1bmN0aW9uIG1ha2VFbnZSZWFkeSgpe1xuICAgIChmdW5jdGlvbih3aW5kb3cpe1xuICAgICAgICBpZih0eXBlb2Yod2luZG93LmNvcmRvdmEpIT0ndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LnNxbGl0ZVBsdWdpbiE9J3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgd2luZG93LmRlbGV0ZURhdGFiYXNlPXdpbmRvdy5zcWxpdGVQbHVnaW4uZGVsZXRlRGF0YWJhc2VcbiAgICAgICAgICAgIHdpbmRvdy5vcGVuRGF0YWJhc2U9ZnVuY3Rpb24obmFtZSl7XG4gICAgICAgICAgICAgICAgdmFyIGRiPXdpbmRvdy5zcWxpdGVQbHVnaW4ub3BlbkRhdGFiYXNlKHtuYW1lLGxvY2F0aW9uOlwiZGVmYXVsdFwifSlcbiAgICAgICAgICAgICAgICBkYi52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb258fFwiXCJcbiAgICAgICAgICAgICAgICBkYi5jaGFuZ2VWZXJzaW9uPWZ1bmN0aW9uKG9sZFZlcnNpb24sbmV3VmVyc2lvbix0cmFuc0NhbGxiYWNrLCBlcnJvciwgc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMudmVyc2lvbiE9PW9sZFZlcnNpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3IgPyBlcnJvcihcIlwiKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodHJhbnNDYWxsYmFjayl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uKHRyYW5zQ2FsbGJhY2ssIGVycm9yLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRiLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbj1uZXdWZXJzaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mKHN1Y2Nlc3MpIT0ndW5kZWZpbmVkJyAmJiBzdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9uPW5ld1ZlcnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihzdWNjZXNzKSE9J3VuZGVmaW5lZCcgJiYgc3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkodHlwZW9mKHdpbmRvdyk9PSd1bmRlZmluZWQnID9nbG9iYWwud2luZG93PXt9IDogd2luZG93KTtcblxufVxuXG5mdW5jdGlvbiBmaXhNaW5pbW9uZ28oZGIpe1xuICAgIHJlcXVpcmUoJy4vZml4LW1pbmltb25nbycpKGRiKVxufVxuXG5mdW5jdGlvbiBhamF4UmVxdWVzdChtZXRob2Q9J2dldCcsIHVybCwgcGFyYW1zLCBkYXRhLCBzdWNjZXNzLCBlcnJvciwgX2FwcElkLCBfc2Vzc2lvblRva2VuKSB7XG4gICAgaWYoIWFwcElkKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2Ugc3BlY2lmeSBhcHBsaWNhdGlvbiBLZXkgZmlyc3RcIilcbiAgICBtZXRob2Q9bWV0aG9kLnRvTG93ZXJDYXNlKClcbiAgICBsb2FkaW5nSGFuZGxlci5zaG93KClcbiAgICB0cnl7XG4gICAgICAgIGlmKHBhcmFtcyl7XG4gICAgICAgICAgICBwYXJhbXMuc2VsZWN0b3IgJiYgcGFyYW1zLnNlbGVjdG9yIT1cInt9XCIgJiYgKHBhcmFtcy5xdWVyeT1wYXJhbXMuc2VsZWN0b3IpO1xuICAgICAgICAgICAgdmFyIHA9W11cbiAgICAgICAgICAgICdzb3J0LGxpbWl0LHNraXB0LGZpZWxkcyxxdWVyeScuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSl7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleV0gJiYgcC5wdXNoKGtleSsnPScrcGFyYW1zW2tleV0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlbGV0ZSBwYXJhbXMucXVlcnk7XG5cbiAgICAgICAgICAgIHVybD0hcC5sZW5ndGggPyB1cmwgOiB1cmwrKHVybC5pbmRleE9mKCc/Jyk9PS0xID8gJz8nIDogJyYnKStwLmpvaW4oJyYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIHZhciB0eXBlPXhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyksXG4gICAgICAgICAgICAgICAgICAgIHI7XG4gICAgICAgICAgICAgICAgaWYodHlwZSAmJiB0eXBlLmluZGV4T2YoJy9qc29uJykhPS0xKXtcbiAgICAgICAgICAgICAgICAgICAgcj1KU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAgICAgcj14aHIucmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdIYW5kbGVyLmNsb3NlKClcbiAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmdIYW5kbGVyLmNsb3NlKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QhPSdnZXQnICYmIGdIdHRwRXJyb3JIYW5kbGVyKGAke21ldGhvZD09J2RlbGV0ZScgPyAnRGVsZXRlZCcgOidTYXZlZCd9IHN1Y2Nlc3NmdWxseWAsJ0luZm8nKTtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKHIpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG09cnx8KHhoci5zdGF0dXM9PTAmJlwiTm8gbmV0d29ya1wiKXx8XCJlcnJvciBoYXBwZW5zXCI7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKG0pPT0wICYmIGdIdHRwRXJyb3JIYW5kbGVyKG0pO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5vcGVuKG1ldGhvZCx1cmwsdHJ1ZSlcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKVxuXG4gICAgICAgIHZhciBpc0pzb249ZmFsc2VcblxuICAgICAgICBpZihtZXRob2Q9PSdkZWxldGUnKVxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsJ3RleHQvcGxhaW4nKTtcbiAgICAgICAgZWxzZSBpZihkYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpXG4gICAgICAgICAgICA7Ly94aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywnbXVsdGlwYXJ0L2Zvcm0tZGF0YScpXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKVxuICAgICAgICAgICAgaXNKc29uPXRydWVcbiAgICAgICAgfVxuXG5cblxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1BcHBsaWNhdGlvbi1JZCcsX2FwcElkfHxhcHBJZClcbiAgICAgICAgaWYoVXNlci5jdXJyZW50KVxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtU2Vzc2lvbi1Ub2tlbicsVXNlci5jdXJyZW50LnNlc3Npb25Ub2tlbikvL2N1cnJlbnQgdXNlcm5hbWUsIHNhbWUgd2l0aCBfaWRcbiAgICAgICAgaWYoX3Nlc3Npb25Ub2tlbilcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLVNlc3Npb24tVG9rZW4nLF9zZXNzaW9uVG9rZW4pXG5cbiAgICAgICAgeGhyLnNlbmQodHlwZW9mKGRhdGEpPT0nc3RyaW5nJyB8fCAhaXNKc29uID8gZGF0YSA6IEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICAgIH1jYXRjaChlKXtcbiAgICAgICAgY29uc29sZS5lcnJvcihlLm1lc3NhZ2UpXG4gICAgICAgIGxvYWRpbmdIYW5kbGVyLmNsb3NlKClcbiAgICB9XG4gICAgcmV0dXJuIHhoclxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChfc2VydmVyLF9hcHBJZCwgc3VjY2VzcywgaHR0cEVycm9yLCBfbG9hZGluZ0hhbmRsZXIpe1xuICAgIG1ha2VFbnZSZWFkeSgpXG5cbiAgICBhcHBJZD1fYXBwSWRcbiAgICBzZXJ2ZXI9X3NlcnZlclxuICAgIGdIdHRwRXJyb3JIYW5kbGVyPWh0dHBFcnJvciB8fCAoKGUsIGNvZGUpPT5jb25zb2xlLmVycm9yKGBodHRwIGVycm9yIHdpdGggc3RhdHVzICR7Y29kZX06ICR7ZX1gKSk7XG4gICAgbG9hZGluZ0hhbmRsZXI9X2xvYWRpbmdIYW5kbGVyIHx8IHtzaG93KCl7fSxjbG9zZSgpe319XG5cbiAgICByZXR1cm4gZGJQcm9taXNlPW5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIHV0aWxzLmF1dG9zZWxlY3RMb2NhbERiKHtuYW1lc3BhY2U6YHFpbGkuJHtfYXBwSWR9YH0sZnVuY3Rpb24obG9jYWxEYil7XG4gICAgICAgICAgICBkYj1uZXcgSHlicmlkRGIobG9jYWxEYixuZXcgUmVtb3RlRGIoc2VydmVyK1wiY2xhc3Nlcy9cIix7fSxhamF4UmVxdWVzdCkpO1xuICAgICAgICAgICAgZml4TWluaW1vbmdvKGRiKVxuXG4gICAgICAgICAgICBsZXQgbG9jYWxTdG9yYWdlPW1ha2VMb2NhbFN0b3JhZ2UobG9jYWxEYilcblxuICAgICAgICAgICAgU2VydmljZS5pbml0KG51bGwsZGIsIGFqYXhSZXF1ZXN0LHNlcnZlciwgbG9jYWxTdG9yYWdlKVxuICAgICAgICAgICAgU2VydmljZS5pc0N1cnJlbnRBcHA9ZnVuY3Rpb24oX19hcHBJZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9hcHBJZD09X19hcHBJZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBVc2VyLmluaXQoKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgUm9sZS5pbml0KCk7XG4gICAgICAgICAgICAgICAgRmlsZS5pbml0KCk7XG4gICAgICAgICAgICAgICAgTG9nLmluaXQoKTtcblxuICAgICAgICAgICAgICAgIGlmKHN1Y2Nlc3Mpe1xuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCgpPT5zdWNjZXNzKGRiKSlcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShVc2VyLmN1cnJlbnQgPyBQcm9taXNlLnJlc29sdmUoc3VjY2VzcyhkYil8fGRiKS50aGVuKGE9PmlzVHV0b3JpYWxpemVkKGxvY2FsU3RvcmFnZSkpIDogZGIpXG4gICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpc1R1dG9yaWFsaXplZChsb2NhbFN0b3JhZ2UpKVxuXG4gICAgICAgICAgICAgICAgc3VwcG9ydFdvcmtlcihfc2VydmVyLCBfYXBwSWQpXG5cbiAgICAgICAgICAgICAgICBTZXJ2aWNlLmVtaXQoJ2luaXRlZCcpXG4gICAgICAgICAgICB9LHJlamVjdClcblxuICAgICAgICB9LHJlamVjdClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzdXBwb3J0V29ya2VyKHNlcnZlciwgYXBwSWQpey8qXG4gICAgcmV0dXJuIGZhbHNlXG4gICAgX193b3JrZXIgZnJvbSAnd2Vid29ya2lmeScpKHJlcXVpcmUoJy4vd29ya2VyLmpzJykpXG4gICAgOyhmdW5jdGlvbihwb3N0TWVzc2FnZSl7XG4gICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlPWZ1bmN0aW9uKG0sIC4uLmRhdGEpe1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UuY2FsbChfX3dvcmtlciwge3R5cGU6bSwgYXJnczpKU09OLnN0cmluZ2lmeShkYXRhKX0pXG4gICAgICAgIH1cbiAgICB9KShfX3dvcmtlci5wb3N0TWVzc2FnZSk7XG5cblxuICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdpbml0Jywgc2VydmVyLCBhcHBJZClcblxuXG5cblxuICAgIFVzZXIub24oJ2NoYW5nZScsKCk9Pl9fd29ya2VyLnBvc3RNZXNzYWdlKCd1c2VyJyxVc2VyLmN1cnJlbnQpKVxuICAgIGlmKFVzZXIuY3VycmVudClcbiAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ3VzZXInLCBVc2VyLmN1cnJlbnQpXG5cbiAgICA7KGZ1bmN0aW9uKF9hZGRDb2xsZWN0aW9uKXtcbiAgICAgICAgZnVuY3Rpb24gd3JhcChzdWNjZXNzLHN0YXRlLCB0eXBlKXtcbiAgICAgICAgICAgIHJldHVybiAoKT0+e1xuICAgICAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKHN0YXRlLHR5cGUpXG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbj1mdW5jdGlvbihuYW1lLCBvcHQpe1xuICAgICAgICAgICAgX2FkZENvbGxlY3Rpb24uY2FsbCh0aGlzLC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIHZhciByPXRoaXNbbmFtZV1cblxuICAgICAgICAgICAgOyhmdW5jdGlvbih1cHNlcnQpe1xuICAgICAgICAgICAgICAgIHIudXBzZXJ0PWZ1bmN0aW9uKGRvY3MsIGJhc2VzLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1cHNlcnQuY2FsbCh0aGlzLCBkb2NzLCBiYXNlcywgd3JhcChzdWNjZXNzLCd1cHNlcnQnLG5hbWUpLCBlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KShyLnVwc2VydClcblxuICAgICAgICAgICAgOyhmdW5jdGlvbihyZW1vdmUpe1xuICAgICAgICAgICAgICAgIHIucmVtb3ZlPWZ1bmN0aW9uKGlkLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdmUuY2FsbCh0aGlzLGlkLCB3cmFwKHN1Y2Nlc3MsJ3JlbW92ZScsbmFtZSksZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoci5yZW1vdmUpXG5cbiAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdhZGRDb2xsZWN0aW9uJyxuYW1lKVxuICAgICAgICAgICAgcmV0dXJuIHJcbiAgICAgICAgfVxuICAgIH0pKEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uKTsqL1xufVxuXG5mdW5jdGlvbiBtYWtlTG9jYWxTdG9yYWdlKGxvY2FsRGIpe1xuICAgIGxvY2FsRGIuYWRkQ29sbGVjdGlvbihcIl9fbG9jYWxTdG9yYWdlXCIpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldEl0ZW0oa2V5LGRlZmF1bHRWYWx1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5maW5kT25lKHtfaWQ6a2V5fSxhPT5yZXNvbHZlKGEgJiYgYS52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YoZGVmYXVsdFZhbHVlKT09J3VuZGVmaW5lZCcgPyByZWplY3QgOiBlPT5yZXNvbHZlKGRlZmF1bHRWYWx1ZSkpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEl0ZW0oa2V5LCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS51cHNlcnQoe19pZDprZXksdmFsdWV9LHJlc29sdmUsIHJlamVjdCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlSXRlbShrZXkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UucmVtb3ZlKGtleSxyZXNvbHZlLCByZWplY3QpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG59XG5cbmZ1bmN0aW9uIGlzVHV0b3JpYWxpemVkKGxvY2FsU3RvcmFnZSl7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiX190dXRvcmlhbGl6ZWRcIilcbiAgICAgICAgLnRoZW4oYT0+e1xuICAgICAgICAgICAgaWYoIWEpe1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX190dXRvcmlhbGl6ZWRcIixcInRydWVcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhXG4gICAgICAgIH0pXG59XG5cbmV4cG9ydHMuVXNlcj1Vc2VyXG5leHBvcnRzLlJvbGU9Um9sZVxuZXhwb3J0cy5GaWxlPUZpbGVcbmV4cG9ydHMuTG9nPUxvZ1xuZXhwb3J0cy5Nb2RlbD1TZXJ2aWNlXG5cbi8qKlxuKiBhamF4IHJlcXVlc3RcbiogY2xpZW50IF9pZFxuICAgICogZG9uZTogb2tcbiogY2xpZW50IGNyZWF0ZWRBdCwgdXBkYXRlZEF0XG4gICAgKiBkb25lXG4gICAgKiBzZXJ2ZXIgc2lkZSB3b3VsZCBnaXZlIGl0cyBvd24gY3JlYXRlZEF0IGFuZCB1cGRhdGVkQXRcbiAgICAgICAgKiBjYWNoZSBvcGVyYXRpb24gSW52YWxpZFxuICAgICAgICAgICAgKiBkZWxldGUgdGhlbiBjYWNoZVxuICAgICAgICAgICAgICAgICogc2FtZSB0cmFuc2FjdGlvblxuXG4gICAgKiBoYWNrIGluIGFqYXhcbiAgICAgICAgKiB1cGRhdGU6IGNyZWF0ZWRBdCE9dXBkYXRlZEF0XG4gICAgICAgICAgICAqIGNsaWVudCBpbnNlcnQgdGhlbiB1cGRhdGVcbiAgICAgICAgKiBjcmVhdGU6IGNyZWF0ZWRBdD09dXBkYXRlZEF0XG5cbiogcmV0dXJuIGFwcGVuZGVkIHBhcnQgb25seSBWUyB3aG9sZSBvYmplY3RcbiAgICAqIG1lcmdlIGNsaWVudCBvYmplY3QgYW5kIHNlcnZlciByZXR1cm4gb2JqZWN0XG5cbiogYW55IHVwc2VydCBhbmQgZGVsZXRlIG11c3QgYWN0IHRvIHNlcnZlciBkaXJlY3RseVxuICAgICogY2FjaGUgaW4gbG9jYWxcbiogYW55IGZpbmQvZmluZE9uZSBtdXN0XG4gICAgKiBmaXJzdCBvbiBsb2NhbFxuICAgICogdGhlbiB0byByZW1vdGVcbiAgICAgICAgKiBzYW1lIHdpdGggbG9jYWwsIHdpdGhvdXQgY2FsbCB0byBzdWNjZXNzXG4gICAgICAgICogbm90IHNhbWUgd2l0aCBsb2NhbCwgY2FsbCB0byBzdWNjZXNzXG5cbiovXG4iXX0=