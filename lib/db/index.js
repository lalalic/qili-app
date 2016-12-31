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
                    if (_user2.default.current) {
                        Promise.resolve(success(db) || db).then(function (a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbml0IiwiZW1pdCIsInByb3RvdHlwZSIsImNhbGwiLCJhcmd1bWVudHMiLCJlIiwiY29uc29sZSIsImVycm9yIiwibWVzc2FnZSIsIl9fd29ya2VyIiwiYXBwSWQiLCJzZXJ2ZXIiLCJnSHR0cEVycm9ySGFuZGxlciIsImRiIiwiZGJQcm9taXNlIiwibG9hZGluZ0hhbmRsZXIiLCJtYWtlRW52UmVhZHkiLCJ3aW5kb3ciLCJjb3Jkb3ZhIiwic3FsaXRlUGx1Z2luIiwiZGVsZXRlRGF0YWJhc2UiLCJvcGVuRGF0YWJhc2UiLCJuYW1lIiwibG9jYXRpb24iLCJ2ZXJzaW9uIiwibG9jYWxTdG9yYWdlIiwiZGJWZXJzaW9uIiwiY2hhbmdlVmVyc2lvbiIsIm9sZFZlcnNpb24iLCJuZXdWZXJzaW9uIiwidHJhbnNDYWxsYmFjayIsInN1Y2Nlc3MiLCJ0cmFuc2FjdGlvbiIsImdsb2JhbCIsImZpeE1pbmltb25nbyIsInJlcXVpcmUiLCJhamF4UmVxdWVzdCIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJfYXBwSWQiLCJfc2Vzc2lvblRva2VuIiwiRXJyb3IiLCJ0b0xvd2VyQ2FzZSIsInNob3ciLCJzZWxlY3RvciIsInF1ZXJ5IiwicCIsInNwbGl0IiwiZm9yRWFjaCIsImtleSIsInB1c2giLCJsZW5ndGgiLCJpbmRleE9mIiwiam9pbiIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsInIiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJjbG9zZSIsInN0YXR1cyIsIm0iLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsImlzSnNvbiIsIkZvcm1EYXRhIiwiY3VycmVudCIsInNlc3Npb25Ub2tlbiIsInNlbmQiLCJzdHJpbmdpZnkiLCJfc2VydmVyIiwiaHR0cEVycm9yIiwiX2xvYWRpbmdIYW5kbGVyIiwiY29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiYXV0b3NlbGVjdExvY2FsRGIiLCJuYW1lc3BhY2UiLCJsb2NhbERiIiwibWFrZUxvY2FsU3RvcmFnZSIsImlzQ3VycmVudEFwcCIsIl9fYXBwSWQiLCJ0aGVuIiwib24iLCJpc1R1dG9yaWFsaXplZCIsInN1cHBvcnRXb3JrZXIiLCJhZGRDb2xsZWN0aW9uIiwiZ2V0SXRlbSIsImRlZmF1bHRWYWx1ZSIsIl9fbG9jYWxTdG9yYWdlIiwiZmluZE9uZSIsIl9pZCIsImEiLCJ2YWx1ZSIsInNldEl0ZW0iLCJ1cHNlcnQiLCJyZW1vdmVJdGVtIiwicmVtb3ZlIiwiZXhwb3J0cyIsIlVzZXIiLCJSb2xlIiwiRmlsZSIsIkxvZyIsIk1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7OztRQXVJZ0JBLEksR0FBQUEsSTs7QUF2SWhCOztBQVlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFoQkMsQ0FBQyxVQUFTQyxJQUFULEVBQWM7QUFDWix5QkFBYUMsU0FBYixDQUF1QkQsSUFBdkIsR0FBNEIsWUFBVTtBQUNsQyxZQUFHO0FBQ0NBLGlCQUFLRSxJQUFMLGNBQVUsSUFBVixvQ0FBbUJDLFNBQW5CO0FBQ0gsU0FGRCxDQUVDLE9BQU1DLENBQU4sRUFBUTtBQUNMQyxvQkFBUUMsS0FBUiwwQkFBcUNGLEVBQUVHLE9BQXZDO0FBQ0g7QUFDSixLQU5EO0FBT0gsQ0FSQSxFQVFFLHFCQUFhTixTQUFiLENBQXVCRCxJQVJ6Qjs7QUFtQkQsSUFBSVEsUUFBSixFQUNLQyxLQURMLEVBRUtDLE1BRkwsRUFHS0MsaUJBSEwsRUFJS0MsRUFKTCxFQUtLQyxTQUxMLEVBTUtDLGNBTkw7O0FBUUEsU0FBU0MsWUFBVCxHQUF1QjtBQUNuQixLQUFDLFVBQVNDLE1BQVQsRUFBZ0I7QUFDYixZQUFHLE9BQU9BLE9BQU9DLE9BQWQsSUFBd0IsV0FBeEIsSUFBdUMsT0FBT0QsT0FBT0UsWUFBZCxJQUE0QixXQUF0RSxFQUFrRjtBQUM5RUYsbUJBQU9HLGNBQVAsR0FBc0JILE9BQU9FLFlBQVAsQ0FBb0JDLGNBQTFDO0FBQ0FILG1CQUFPSSxZQUFQLEdBQW9CLFVBQVNDLElBQVQsRUFBYztBQUM5QixvQkFBSVQsS0FBR0ksT0FBT0UsWUFBUCxDQUFvQkUsWUFBcEIsQ0FBaUMsRUFBQ0MsVUFBRCxFQUFNQyxVQUFTLFNBQWYsRUFBakMsQ0FBUDtBQUNBVixtQkFBR1csT0FBSCxHQUFXQyxhQUFhQyxTQUFiLElBQXdCLEVBQW5DO0FBQ0FiLG1CQUFHYyxhQUFILEdBQWlCLFVBQVNDLFVBQVQsRUFBb0JDLFVBQXBCLEVBQStCQyxhQUEvQixFQUE4Q3ZCLEtBQTlDLEVBQXFEd0IsT0FBckQsRUFBNkQ7QUFDMUUsd0JBQUcsS0FBS1AsT0FBTCxLQUFlSSxVQUFsQixFQUNJLE9BQU9yQixRQUFRQSxNQUFNLEVBQU4sQ0FBUixHQUFvQixJQUEzQjs7QUFFSix3QkFBR3VCLGFBQUgsRUFBaUI7QUFDYiw2QkFBS0UsV0FBTCxDQUFpQkYsYUFBakIsRUFBZ0N2QixLQUFoQyxFQUF1QyxZQUFVO0FBQzdDTSwrQkFBR1csT0FBSCxHQUFXQyxhQUFhQyxTQUFiLEdBQXVCRyxVQUFsQztBQUNBLG1DQUFPRSxPQUFQLElBQWlCLFdBQWpCLElBQWdDQSxTQUFoQztBQUNILHlCQUhEO0FBSUgscUJBTEQsTUFLSztBQUNELDZCQUFLUCxPQUFMLEdBQWFDLGFBQWFDLFNBQWIsR0FBdUJHLFVBQXBDO0FBQ0EsK0JBQU9FLE9BQVAsSUFBaUIsV0FBakIsSUFBZ0NBLFNBQWhDO0FBQ0g7QUFDSixpQkFiRDtBQWNBLHVCQUFPbEIsRUFBUDtBQUNILGFBbEJEO0FBbUJIO0FBQ0osS0F2QkQsRUF1QkcsT0FBT0ksTUFBUCxJQUFnQixXQUFoQixHQUE2QmdCLE9BQU9oQixNQUFQLEdBQWMsRUFBM0MsR0FBZ0RBLE1BdkJuRDtBQXlCSDs7QUFFRCxTQUFTaUIsWUFBVCxDQUFzQnJCLEVBQXRCLEVBQXlCO0FBQ3JCc0IsWUFBUSxpQkFBUixFQUEyQnRCLEVBQTNCO0FBQ0g7O0FBRUQsU0FBU3VCLFdBQVQsR0FBNkY7QUFBQSxRQUF4RUMsTUFBd0UsdUVBQWpFLEtBQWlFO0FBQUEsUUFBMURDLEdBQTBEO0FBQUEsUUFBckRDLE1BQXFEO0FBQUEsUUFBN0NDLElBQTZDO0FBQUEsUUFBdkNULE9BQXVDO0FBQUEsUUFBOUJ4QixLQUE4QjtBQUFBLFFBQXZCa0MsTUFBdUI7QUFBQSxRQUFmQyxhQUFlOztBQUN6RixRQUFHLENBQUNoQyxLQUFKLEVBQ0ksTUFBTSxJQUFJaUMsS0FBSixDQUFVLHNDQUFWLENBQU47QUFDSk4sYUFBT0EsT0FBT08sV0FBUCxFQUFQO0FBQ0E3QixtQkFBZThCLElBQWY7QUFDQSxRQUFHO0FBQ0MsWUFBR04sTUFBSCxFQUFVO0FBQ05BLG1CQUFPTyxRQUFQLElBQW1CUCxPQUFPTyxRQUFQLElBQWlCLElBQXBDLEtBQTZDUCxPQUFPUSxLQUFQLEdBQWFSLE9BQU9PLFFBQWpFO0FBQ0EsZ0JBQUlFLElBQUUsRUFBTjtBQUNBLDRDQUFnQ0MsS0FBaEMsQ0FBc0MsR0FBdEMsRUFBMkNDLE9BQTNDLENBQW1ELFVBQVNDLEdBQVQsRUFBYTtBQUM1RFosdUJBQU9ZLEdBQVAsS0FBZUgsRUFBRUksSUFBRixDQUFPRCxNQUFJLEdBQUosR0FBUVosT0FBT1ksR0FBUCxDQUFmLENBQWY7QUFDSCxhQUZEO0FBR0EsbUJBQU9aLE9BQU9RLEtBQWQ7O0FBRUFULGtCQUFJLENBQUNVLEVBQUVLLE1BQUgsR0FBWWYsR0FBWixHQUFrQkEsT0FBS0EsSUFBSWdCLE9BQUosQ0FBWSxHQUFaLEtBQWtCLENBQUMsQ0FBbkIsR0FBdUIsR0FBdkIsR0FBNkIsR0FBbEMsSUFBdUNOLEVBQUVPLElBQUYsQ0FBTyxHQUFQLENBQTdEO0FBQ0g7O0FBRUQsWUFBSUMsTUFBSSxJQUFJQyxjQUFKLEVBQVI7O0FBRUFELFlBQUlFLGtCQUFKLEdBQXlCLFlBQVk7QUFDakMsZ0JBQUlGLElBQUlHLFVBQUosS0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsb0JBQUc7QUFDSCx3QkFBSUMsT0FBS0osSUFBSUssaUJBQUosQ0FBc0IsY0FBdEIsQ0FBVDtBQUFBLHdCQUNJQyxDQURKO0FBRUEsd0JBQUdGLFFBQVFBLEtBQUtOLE9BQUwsQ0FBYSxPQUFiLEtBQXVCLENBQUMsQ0FBbkMsRUFBcUM7QUFDakNRLDRCQUFFQyxLQUFLQyxLQUFMLENBQVdSLElBQUlTLFlBQWYsQ0FBRjtBQUNILHFCQUZELE1BR0lILElBQUVOLElBQUlTLFlBQU47QUFDQWxELG1DQUFlbUQsS0FBZjtBQUNILGlCQVJELENBUUMsT0FBTTdELENBQU4sRUFBUTtBQUNMVSxtQ0FBZW1ELEtBQWY7QUFDSDs7QUFFRCxvQkFBSVYsSUFBSVcsTUFBSixJQUFjLEdBQWQsSUFBcUJYLElBQUlXLE1BQUosR0FBYSxHQUF0QyxFQUEyQztBQUN2QzlCLDhCQUFRLEtBQVIsSUFBaUJ6QixtQkFBcUJ5QixVQUFRLFFBQVIsR0FBbUIsU0FBbkIsR0FBOEIsT0FBbkQscUJBQTBFLE1BQTFFLENBQWpCO0FBQ0FOLCtCQUFXQSxRQUFRK0IsQ0FBUixDQUFYO0FBQ0gsaUJBSEQsTUFHTztBQUNILHdCQUFJTSxJQUFFTixLQUFJTixJQUFJVyxNQUFKLElBQVksQ0FBWixJQUFlLFlBQW5CLElBQWtDLGVBQXhDO0FBQ0E1RCw2QkFBU0EsTUFBTTZELENBQU4sS0FBVSxDQUFuQixJQUF3QnhELGtCQUFrQndELENBQWxCLENBQXhCO0FBRUg7QUFDSjtBQUNKLFNBdkJEOztBQXlCQVosWUFBSWEsSUFBSixDQUFTaEMsTUFBVCxFQUFnQkMsR0FBaEIsRUFBb0IsSUFBcEI7QUFDQWtCLFlBQUljLGdCQUFKLENBQXFCLGtCQUFyQixFQUF5QyxnQkFBekM7O0FBRUEsWUFBSUMsU0FBTyxLQUFYOztBQUVBLFlBQUdsQyxVQUFRLFFBQVgsRUFDSW1CLElBQUljLGdCQUFKLENBQXFCLGNBQXJCLEVBQW9DLFlBQXBDLEVBREosS0FFSyxJQUFHOUIsZ0JBQWdCZ0MsUUFBbkIsRUFDRCxDQURDLENBQ0E7QUFEQSxhQUVEO0FBQ0FoQixvQkFBSWMsZ0JBQUosQ0FBcUIsY0FBckIsRUFBcUMsaUNBQXJDO0FBQ0FDLHlCQUFPLElBQVA7QUFDSDs7QUFJRGYsWUFBSWMsZ0JBQUosQ0FBcUIsa0JBQXJCLEVBQXdDN0IsVUFBUS9CLEtBQWhEO0FBQ0EsWUFBRyxlQUFLK0QsT0FBUixFQUNJakIsSUFBSWMsZ0JBQUosQ0FBcUIsaUJBQXJCLEVBQXVDLGVBQUtHLE9BQUwsQ0FBYUMsWUFBcEQsRUF6REwsQ0F5RHNFO0FBQ3JFLFlBQUdoQyxhQUFILEVBQ0ljLElBQUljLGdCQUFKLENBQXFCLGlCQUFyQixFQUF1QzVCLGFBQXZDOztBQUVKYyxZQUFJbUIsSUFBSixDQUFTLE9BQU9uQyxJQUFQLElBQWMsUUFBZCxJQUEwQixDQUFDK0IsTUFBM0IsR0FBb0MvQixJQUFwQyxHQUEyQ3VCLEtBQUthLFNBQUwsQ0FBZXBDLElBQWYsQ0FBcEQ7QUFDSCxLQTlERCxDQThEQyxPQUFNbkMsQ0FBTixFQUFRO0FBQ0xDLGdCQUFRQyxLQUFSLENBQWNGLEVBQUVHLE9BQWhCO0FBQ0FPLHVCQUFlbUQsS0FBZjtBQUNIO0FBQ0QsV0FBT1YsR0FBUDtBQUNIOztBQUVNLFNBQVN4RCxJQUFULENBQWM2RSxPQUFkLEVBQXNCcEMsTUFBdEIsRUFBOEJWLE9BQTlCLEVBQXVDK0MsU0FBdkMsRUFBa0RDLGVBQWxELEVBQWtFO0FBQ3JFL0Q7O0FBRUFOLFlBQU0rQixNQUFOO0FBQ0E5QixhQUFPa0UsT0FBUDtBQUNBakUsd0JBQWtCa0UsYUFBYyxVQUFDekUsQ0FBRCxFQUFJMkUsSUFBSjtBQUFBLGVBQVcxRSxRQUFRQyxLQUFSLDZCQUF3Q3lFLElBQXhDLFVBQWlEM0UsQ0FBakQsQ0FBWDtBQUFBLEtBQWhDO0FBQ0FVLHFCQUFlZ0UsbUJBQW1CO0FBQUNsQyxZQUFELGtCQUFPLENBQUUsQ0FBVDtBQUFVcUIsYUFBVixtQkFBaUIsQ0FBRTtBQUFuQixLQUFsQzs7QUFFQSxXQUFPcEQsWUFBVSxJQUFJbUUsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUM1Qyx5QkFBTUMsaUJBQU4sQ0FBd0IsRUFBQ0MscUJBQWtCNUMsTUFBbkIsRUFBeEIsRUFBcUQsVUFBUzZDLE9BQVQsRUFBaUI7QUFDbEV6RSxpQkFBRyx3QkFBYXlFLE9BQWIsRUFBcUIsd0JBQWEzRSxTQUFPLFVBQXBCLEVBQStCLEVBQS9CLEVBQWtDeUIsV0FBbEMsQ0FBckIsQ0FBSDtBQUNBRix5QkFBYXJCLEVBQWI7O0FBRUEsZ0JBQUlZLGVBQWE4RCxpQkFBaUJELE9BQWpCLENBQWpCOztBQUVBLDZCQUFRdEYsSUFBUixDQUFhLElBQWIsRUFBa0JhLEVBQWxCLEVBQXNCdUIsV0FBdEIsRUFBa0N6QixNQUFsQyxFQUEwQ2MsWUFBMUM7QUFDQSw2QkFBUStELFlBQVIsR0FBcUIsVUFBU0MsT0FBVCxFQUFpQjtBQUNsQyx1QkFBT2hELFVBQVFnRCxPQUFmO0FBQ0gsYUFGRDs7QUFJQSwyQkFBS3pGLElBQUwsR0FBWTBGLElBQVosQ0FBaUIsWUFBVTtBQUN2QiwrQkFBSzFGLElBQUw7QUFDQSwrQkFBS0EsSUFBTDtBQUNBLDhCQUFJQSxJQUFKOztBQUVBLG9CQUFHK0IsT0FBSCxFQUFXO0FBQ1AsbUNBQUs0RCxFQUFMLENBQVEsUUFBUixFQUFpQjtBQUFBLCtCQUFJNUQsUUFBUWxCLEVBQVIsQ0FBSjtBQUFBLHFCQUFqQjtBQUNmLHdCQUFHLGVBQUs0RCxPQUFSLEVBQWdCO0FBQ2ZRLGdDQUFRQyxPQUFSLENBQWdCbkQsUUFBUWxCLEVBQVIsS0FBYUEsRUFBN0IsRUFDRTZFLElBREYsQ0FDTztBQUFBLG1DQUFHUixRQUFRVSxlQUFlbkUsWUFBZixDQUFSLENBQUg7QUFBQSx5QkFEUDtBQUVBLHFCQUhELE1BR0s7QUFDSnlELGdDQUFRVSxlQUFlbkUsWUFBZixDQUFSO0FBQ0E7QUFDVyxpQkFSRCxNQVNJeUQsUUFBUVUsZUFBZW5FLFlBQWYsQ0FBUjs7QUFFSm9FLDhCQUFjaEIsT0FBZCxFQUF1QnBDLE1BQXZCOztBQUVBLGlDQUFReEMsSUFBUixDQUFhLFFBQWI7QUFDSCxhQW5CRCxFQW1CRWtGLE1BbkJGO0FBcUJILFNBaENELEVBZ0NFQSxNQWhDRjtBQWlDSCxLQWxDZ0IsQ0FBakI7QUFtQ0g7O0FBRUQsU0FBU1UsYUFBVCxDQUF1QmxGLE1BQXZCLEVBQStCRCxLQUEvQixFQUFxQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4Q3JDOztBQUVELFNBQVM2RSxnQkFBVCxDQUEwQkQsT0FBMUIsRUFBa0M7QUFDOUJBLFlBQVFRLGFBQVIsQ0FBc0IsZ0JBQXRCO0FBQ0EsV0FBTztBQUNDQyxlQURELG1CQUNTNUMsR0FEVCxFQUNhNkMsWUFEYixFQUMwQjtBQUNyQixtQkFBTyxJQUFJZixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWO0FBQUEsdUJBQ2ZHLFFBQVFXLGNBQVIsQ0FBdUJDLE9BQXZCLENBQStCLEVBQUNDLEtBQUloRCxHQUFMLEVBQS9CLEVBQXlDO0FBQUEsMkJBQUcrQixRQUFRa0IsS0FBS0EsRUFBRUMsS0FBZixDQUFIO0FBQUEsaUJBQXpDLEVBQ0ksT0FBT0wsWUFBUCxJQUFzQixXQUF0QixHQUFvQ2IsTUFBcEMsR0FBNkM7QUFBQSwyQkFBR0QsUUFBUWMsWUFBUixDQUFIO0FBQUEsaUJBRGpELENBRGU7QUFBQSxhQUFaLENBQVA7QUFHSCxTQUxGO0FBTUNNLGVBTkQsbUJBTVNuRCxHQU5ULEVBTWNrRCxLQU5kLEVBTW9CO0FBQ2YsbUJBQU8sSUFBSXBCLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVY7QUFBQSx1QkFDZkcsUUFBUVcsY0FBUixDQUF1Qk0sTUFBdkIsQ0FBOEIsRUFBQ0osS0FBSWhELEdBQUwsRUFBU2tELFlBQVQsRUFBOUIsRUFBOENuQixPQUE5QyxFQUF1REMsTUFBdkQsQ0FEZTtBQUFBLGFBQVosQ0FBUDtBQUVILFNBVEY7QUFVQ3FCLGtCQVZELHNCQVVZckQsR0FWWixFQVVnQjtBQUNYLG1CQUFPLElBQUk4QixPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWO0FBQUEsdUJBQ2ZHLFFBQVFXLGNBQVIsQ0FBdUJRLE1BQXZCLENBQThCdEQsR0FBOUIsRUFBa0MrQixPQUFsQyxFQUEyQ0MsTUFBM0MsQ0FEZTtBQUFBLGFBQVosQ0FBUDtBQUVIO0FBYkYsS0FBUDtBQWVIOztBQUVELFNBQVNTLGNBQVQsQ0FBd0JuRSxZQUF4QixFQUFxQztBQUNqQyxXQUFPQSxhQUFhc0UsT0FBYixDQUFxQixnQkFBckIsRUFDRkwsSUFERSxDQUNHLGFBQUc7QUFDTCxZQUFHLENBQUNVLENBQUosRUFBTTtBQUNGM0UseUJBQWE2RSxPQUFiLENBQXFCLGdCQUFyQixFQUFzQyxNQUF0QztBQUNBLG1CQUFPLEtBQVA7QUFDSDtBQUNELGVBQU9GLENBQVA7QUFDSCxLQVBFLENBQVA7QUFRSDs7QUFFRE0sUUFBUUMsSUFBUjtBQUNBRCxRQUFRRSxJQUFSO0FBQ0FGLFFBQVFHLElBQVI7QUFDQUgsUUFBUUksR0FBUjtBQUNBSixRQUFRSyxLQUFSOztBQUVBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cydcblxuOyhmdW5jdGlvbihlbWl0KXtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oKXtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZW1pdC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXZlbnRFbWl0dGVyIGVycm9yOiAke2UubWVzc2FnZX1gKVxuICAgICAgICB9XG4gICAgfVxufSkoRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0KTtcblxuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZydcbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuXG5pbXBvcnQge1JlbW90ZURiLCBIeWJyaWREYiwgdXRpbHN9IGZyb20gJ21pbmltb25nbydcblxuXG52YXIgX193b3JrZXJcbiAgICAsYXBwSWRcbiAgICAsc2VydmVyXG4gICAgLGdIdHRwRXJyb3JIYW5kbGVyXG4gICAgLGRiXG4gICAgLGRiUHJvbWlzZVxuICAgICxsb2FkaW5nSGFuZGxlcjtcblxuZnVuY3Rpb24gbWFrZUVudlJlYWR5KCl7XG4gICAgKGZ1bmN0aW9uKHdpbmRvdyl7XG4gICAgICAgIGlmKHR5cGVvZih3aW5kb3cuY29yZG92YSkhPSd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuc3FsaXRlUGx1Z2luIT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICB3aW5kb3cuZGVsZXRlRGF0YWJhc2U9d2luZG93LnNxbGl0ZVBsdWdpbi5kZWxldGVEYXRhYmFzZVxuICAgICAgICAgICAgd2luZG93Lm9wZW5EYXRhYmFzZT1mdW5jdGlvbihuYW1lKXtcbiAgICAgICAgICAgICAgICB2YXIgZGI9d2luZG93LnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2Uoe25hbWUsbG9jYXRpb246XCJkZWZhdWx0XCJ9KVxuICAgICAgICAgICAgICAgIGRiLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbnx8XCJcIlxuICAgICAgICAgICAgICAgIGRiLmNoYW5nZVZlcnNpb249ZnVuY3Rpb24ob2xkVmVyc2lvbixuZXdWZXJzaW9uLHRyYW5zQ2FsbGJhY2ssIGVycm9yLCBzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52ZXJzaW9uIT09b2xkVmVyc2lvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvciA/IGVycm9yKFwiXCIpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZih0cmFuc0NhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb24odHJhbnNDYWxsYmFjaywgZXJyb3IsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9uPW5ld1ZlcnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb249bmV3VmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mKHN1Y2Nlc3MpIT0ndW5kZWZpbmVkJyAmJiBzdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSh0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgP2dsb2JhbC53aW5kb3c9e30gOiB3aW5kb3cpO1xuXG59XG5cbmZ1bmN0aW9uIGZpeE1pbmltb25nbyhkYil7XG4gICAgcmVxdWlyZSgnLi9maXgtbWluaW1vbmdvJykoZGIpXG59XG5cbmZ1bmN0aW9uIGFqYXhSZXF1ZXN0KG1ldGhvZD0nZ2V0JywgdXJsLCBwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yLCBfYXBwSWQsIF9zZXNzaW9uVG9rZW4pIHtcbiAgICBpZighYXBwSWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBzcGVjaWZ5IGFwcGxpY2F0aW9uIEtleSBmaXJzdFwiKVxuICAgIG1ldGhvZD1tZXRob2QudG9Mb3dlckNhc2UoKVxuICAgIGxvYWRpbmdIYW5kbGVyLnNob3coKVxuICAgIHRyeXtcbiAgICAgICAgaWYocGFyYW1zKXtcbiAgICAgICAgICAgIHBhcmFtcy5zZWxlY3RvciAmJiBwYXJhbXMuc2VsZWN0b3IhPVwie31cIiAmJiAocGFyYW1zLnF1ZXJ5PXBhcmFtcy5zZWxlY3Rvcik7XG4gICAgICAgICAgICB2YXIgcD1bXVxuICAgICAgICAgICAgJ3NvcnQsbGltaXQsc2tpcHQsZmllbGRzLHF1ZXJ5Jy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5XSAmJiBwLnB1c2goa2V5Kyc9JytwYXJhbXNba2V5XSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5xdWVyeTtcblxuICAgICAgICAgICAgdXJsPSFwLmxlbmd0aCA/IHVybCA6IHVybCsodXJsLmluZGV4T2YoJz8nKT09LTEgPyAnPycgOiAnJicpK3Auam9pbignJicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGU9eGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSxcbiAgICAgICAgICAgICAgICAgICAgcjtcbiAgICAgICAgICAgICAgICBpZih0eXBlICYmIHR5cGUuaW5kZXhPZignL2pzb24nKSE9LTEpe1xuICAgICAgICAgICAgICAgICAgICByPUpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgICAgICByPXhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCE9J2dldCcgJiYgZ0h0dHBFcnJvckhhbmRsZXIoYCR7bWV0aG9kPT0nZGVsZXRlJyA/ICdEZWxldGVkJyA6J1NhdmVkJ30gc3VjY2Vzc2Z1bGx5YCwnSW5mbycpO1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MocilcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbT1yfHwoeGhyLnN0YXR1cz09MCYmXCJObyBuZXR3b3JrXCIpfHxcImVycm9yIGhhcHBlbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IobSk9PTAgJiYgZ0h0dHBFcnJvckhhbmRsZXIobSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLHVybCx0cnVlKVxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpXG5cbiAgICAgICAgdmFyIGlzSnNvbj1mYWxzZVxuXG4gICAgICAgIGlmKG1ldGhvZD09J2RlbGV0ZScpXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywndGV4dC9wbGFpbicpO1xuICAgICAgICBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSlcbiAgICAgICAgICAgIDsvL3hoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCdtdWx0aXBhcnQvZm9ybS1kYXRhJylcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpXG4gICAgICAgICAgICBpc0pzb249dHJ1ZVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUFwcGxpY2F0aW9uLUlkJyxfYXBwSWR8fGFwcElkKVxuICAgICAgICBpZihVc2VyLmN1cnJlbnQpXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxVc2VyLmN1cnJlbnQuc2Vzc2lvblRva2VuKS8vY3VycmVudCB1c2VybmFtZSwgc2FtZSB3aXRoIF9pZFxuICAgICAgICBpZihfc2Vzc2lvblRva2VuKVxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtU2Vzc2lvbi1Ub2tlbicsX3Nlc3Npb25Ub2tlbilcblxuICAgICAgICB4aHIuc2VuZCh0eXBlb2YoZGF0YSk9PSdzdHJpbmcnIHx8ICFpc0pzb24gPyBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgfWNhdGNoKGUpe1xuICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSlcbiAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgIH1cbiAgICByZXR1cm4geGhyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KF9zZXJ2ZXIsX2FwcElkLCBzdWNjZXNzLCBodHRwRXJyb3IsIF9sb2FkaW5nSGFuZGxlcil7XG4gICAgbWFrZUVudlJlYWR5KClcblxuICAgIGFwcElkPV9hcHBJZFxuICAgIHNlcnZlcj1fc2VydmVyXG4gICAgZ0h0dHBFcnJvckhhbmRsZXI9aHR0cEVycm9yIHx8ICgoZSwgY29kZSk9PmNvbnNvbGUuZXJyb3IoYGh0dHAgZXJyb3Igd2l0aCBzdGF0dXMgJHtjb2RlfTogJHtlfWApKTtcbiAgICBsb2FkaW5nSGFuZGxlcj1fbG9hZGluZ0hhbmRsZXIgfHwge3Nob3coKXt9LGNsb3NlKCl7fX1cblxuICAgIHJldHVybiBkYlByb21pc2U9bmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgdXRpbHMuYXV0b3NlbGVjdExvY2FsRGIoe25hbWVzcGFjZTpgcWlsaS4ke19hcHBJZH1gfSxmdW5jdGlvbihsb2NhbERiKXtcbiAgICAgICAgICAgIGRiPW5ldyBIeWJyaWREYihsb2NhbERiLG5ldyBSZW1vdGVEYihzZXJ2ZXIrXCJjbGFzc2VzL1wiLHt9LGFqYXhSZXF1ZXN0KSk7XG4gICAgICAgICAgICBmaXhNaW5pbW9uZ28oZGIpXG5cbiAgICAgICAgICAgIGxldCBsb2NhbFN0b3JhZ2U9bWFrZUxvY2FsU3RvcmFnZShsb2NhbERiKVxuXG4gICAgICAgICAgICBTZXJ2aWNlLmluaXQobnVsbCxkYiwgYWpheFJlcXVlc3Qsc2VydmVyLCBsb2NhbFN0b3JhZ2UpXG4gICAgICAgICAgICBTZXJ2aWNlLmlzQ3VycmVudEFwcD1mdW5jdGlvbihfX2FwcElkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2FwcElkPT1fX2FwcElkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFVzZXIuaW5pdCgpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBSb2xlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBGaWxlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBMb2cuaW5pdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYoc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsKCk9PnN1Y2Nlc3MoZGIpKVxuXHRcdFx0XHRcdGlmKFVzZXIuY3VycmVudCl7XG5cdFx0XHRcdFx0XHRQcm9taXNlLnJlc29sdmUoc3VjY2VzcyhkYil8fGRiKVxuXHRcdFx0XHRcdFx0XHQudGhlbihhPT5yZXNvbHZlKGlzVHV0b3JpYWxpemVkKGxvY2FsU3RvcmFnZSkpKVxuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShpc1R1dG9yaWFsaXplZChsb2NhbFN0b3JhZ2UpKVxuXHRcdFx0XHRcdH0gICAgICAgXG4gICAgICAgICAgICAgICAgfWVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpc1R1dG9yaWFsaXplZChsb2NhbFN0b3JhZ2UpKVxuXG4gICAgICAgICAgICAgICAgc3VwcG9ydFdvcmtlcihfc2VydmVyLCBfYXBwSWQpXG5cbiAgICAgICAgICAgICAgICBTZXJ2aWNlLmVtaXQoJ2luaXRlZCcpXG4gICAgICAgICAgICB9LHJlamVjdClcblxuICAgICAgICB9LHJlamVjdClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzdXBwb3J0V29ya2VyKHNlcnZlciwgYXBwSWQpey8qXG4gICAgcmV0dXJuIGZhbHNlXG4gICAgX193b3JrZXIgZnJvbSAnd2Vid29ya2lmeScpKHJlcXVpcmUoJy4vd29ya2VyLmpzJykpXG4gICAgOyhmdW5jdGlvbihwb3N0TWVzc2FnZSl7XG4gICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlPWZ1bmN0aW9uKG0sIC4uLmRhdGEpe1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UuY2FsbChfX3dvcmtlciwge3R5cGU6bSwgYXJnczpKU09OLnN0cmluZ2lmeShkYXRhKX0pXG4gICAgICAgIH1cbiAgICB9KShfX3dvcmtlci5wb3N0TWVzc2FnZSk7XG5cblxuICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdpbml0Jywgc2VydmVyLCBhcHBJZClcblxuXG5cblxuICAgIFVzZXIub24oJ2NoYW5nZScsKCk9Pl9fd29ya2VyLnBvc3RNZXNzYWdlKCd1c2VyJyxVc2VyLmN1cnJlbnQpKVxuICAgIGlmKFVzZXIuY3VycmVudClcbiAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ3VzZXInLCBVc2VyLmN1cnJlbnQpXG5cbiAgICA7KGZ1bmN0aW9uKF9hZGRDb2xsZWN0aW9uKXtcbiAgICAgICAgZnVuY3Rpb24gd3JhcChzdWNjZXNzLHN0YXRlLCB0eXBlKXtcbiAgICAgICAgICAgIHJldHVybiAoKT0+e1xuICAgICAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKHN0YXRlLHR5cGUpXG4gICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbj1mdW5jdGlvbihuYW1lLCBvcHQpe1xuICAgICAgICAgICAgX2FkZENvbGxlY3Rpb24uY2FsbCh0aGlzLC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIHZhciByPXRoaXNbbmFtZV1cblxuICAgICAgICAgICAgOyhmdW5jdGlvbih1cHNlcnQpe1xuICAgICAgICAgICAgICAgIHIudXBzZXJ0PWZ1bmN0aW9uKGRvY3MsIGJhc2VzLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1cHNlcnQuY2FsbCh0aGlzLCBkb2NzLCBiYXNlcywgd3JhcChzdWNjZXNzLCd1cHNlcnQnLG5hbWUpLCBlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KShyLnVwc2VydClcblxuICAgICAgICAgICAgOyhmdW5jdGlvbihyZW1vdmUpe1xuICAgICAgICAgICAgICAgIHIucmVtb3ZlPWZ1bmN0aW9uKGlkLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdmUuY2FsbCh0aGlzLGlkLCB3cmFwKHN1Y2Nlc3MsJ3JlbW92ZScsbmFtZSksZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoci5yZW1vdmUpXG5cbiAgICAgICAgICAgIF9fd29ya2VyLnBvc3RNZXNzYWdlKCdhZGRDb2xsZWN0aW9uJyxuYW1lKVxuICAgICAgICAgICAgcmV0dXJuIHJcbiAgICAgICAgfVxuICAgIH0pKEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uKTsqL1xufVxuXG5mdW5jdGlvbiBtYWtlTG9jYWxTdG9yYWdlKGxvY2FsRGIpe1xuICAgIGxvY2FsRGIuYWRkQ29sbGVjdGlvbihcIl9fbG9jYWxTdG9yYWdlXCIpXG4gICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldEl0ZW0oa2V5LGRlZmF1bHRWYWx1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5maW5kT25lKHtfaWQ6a2V5fSxhPT5yZXNvbHZlKGEgJiYgYS52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YoZGVmYXVsdFZhbHVlKT09J3VuZGVmaW5lZCcgPyByZWplY3QgOiBlPT5yZXNvbHZlKGRlZmF1bHRWYWx1ZSkpKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEl0ZW0oa2V5LCB2YWx1ZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS51cHNlcnQoe19pZDprZXksdmFsdWV9LHJlc29sdmUsIHJlamVjdCkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlSXRlbShrZXkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsRGIuX19sb2NhbFN0b3JhZ2UucmVtb3ZlKGtleSxyZXNvbHZlLCByZWplY3QpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG59XG5cbmZ1bmN0aW9uIGlzVHV0b3JpYWxpemVkKGxvY2FsU3RvcmFnZSl7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiX190dXRvcmlhbGl6ZWRcIilcbiAgICAgICAgLnRoZW4oYT0+e1xuICAgICAgICAgICAgaWYoIWEpe1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX190dXRvcmlhbGl6ZWRcIixcInRydWVcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhXG4gICAgICAgIH0pXG59XG5cbmV4cG9ydHMuVXNlcj1Vc2VyXG5leHBvcnRzLlJvbGU9Um9sZVxuZXhwb3J0cy5GaWxlPUZpbGVcbmV4cG9ydHMuTG9nPUxvZ1xuZXhwb3J0cy5Nb2RlbD1TZXJ2aWNlXG5cbi8qKlxuKiBhamF4IHJlcXVlc3RcbiogY2xpZW50IF9pZFxuICAgICogZG9uZTogb2tcbiogY2xpZW50IGNyZWF0ZWRBdCwgdXBkYXRlZEF0XG4gICAgKiBkb25lXG4gICAgKiBzZXJ2ZXIgc2lkZSB3b3VsZCBnaXZlIGl0cyBvd24gY3JlYXRlZEF0IGFuZCB1cGRhdGVkQXRcbiAgICAgICAgKiBjYWNoZSBvcGVyYXRpb24gSW52YWxpZFxuICAgICAgICAgICAgKiBkZWxldGUgdGhlbiBjYWNoZVxuICAgICAgICAgICAgICAgICogc2FtZSB0cmFuc2FjdGlvblxuXG4gICAgKiBoYWNrIGluIGFqYXhcbiAgICAgICAgKiB1cGRhdGU6IGNyZWF0ZWRBdCE9dXBkYXRlZEF0XG4gICAgICAgICAgICAqIGNsaWVudCBpbnNlcnQgdGhlbiB1cGRhdGVcbiAgICAgICAgKiBjcmVhdGU6IGNyZWF0ZWRBdD09dXBkYXRlZEF0XG5cbiogcmV0dXJuIGFwcGVuZGVkIHBhcnQgb25seSBWUyB3aG9sZSBvYmplY3RcbiAgICAqIG1lcmdlIGNsaWVudCBvYmplY3QgYW5kIHNlcnZlciByZXR1cm4gb2JqZWN0XG5cbiogYW55IHVwc2VydCBhbmQgZGVsZXRlIG11c3QgYWN0IHRvIHNlcnZlciBkaXJlY3RseVxuICAgICogY2FjaGUgaW4gbG9jYWxcbiogYW55IGZpbmQvZmluZE9uZSBtdXN0XG4gICAgKiBmaXJzdCBvbiBsb2NhbFxuICAgICogdGhlbiB0byByZW1vdGVcbiAgICAgICAgKiBzYW1lIHdpdGggbG9jYWwsIHdpdGhvdXQgY2FsbCB0byBzdWNjZXNzXG4gICAgICAgICogbm90IHNhbWUgd2l0aCBsb2NhbCwgY2FsbCB0byBzdWNjZXNzXG5cbiovXG4iXX0=