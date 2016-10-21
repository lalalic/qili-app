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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztRQXVJZ0I7O0FBdkloQjs7QUFZQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBaEJDLENBQUMsVUFBUyxJQUFULEVBQWM7QUFDWix5QkFBYSxTQUFiLENBQXVCLElBQXZCLEdBQTRCLFlBQVU7QUFDbEMsWUFBRztBQUNDLGlCQUFLLElBQUwsY0FBVSx3Q0FBUyxXQUFuQixFQUREO1NBQUgsQ0FFQyxPQUFNLENBQU4sRUFBUTtBQUNMLG9CQUFRLEtBQVIsMEJBQXFDLEVBQUUsT0FBRixDQUFyQyxDQURLO1NBQVI7S0FIdUIsQ0FEaEI7Q0FBZCxDQUFELENBUUUscUJBQWEsU0FBYixDQUF1QixJQUF2QixDQVJGOztBQW1CRCxJQUFJLFFBQUosRUFDSyxLQURMLEVBRUssTUFGTCxFQUdLLGlCQUhMLEVBSUssRUFKTCxFQUtLLFNBTEwsRUFNSyxjQU5MOztBQVFBLFNBQVMsWUFBVCxHQUF1QjtBQUNuQixLQUFDLFVBQVMsTUFBVCxFQUFnQjtBQUNiLFlBQUcsT0FBTyxPQUFPLE9BQVAsSUFBaUIsV0FBeEIsSUFBdUMsT0FBTyxPQUFPLFlBQVAsSUFBcUIsV0FBNUIsRUFBd0M7QUFDOUUsbUJBQU8sY0FBUCxHQUFzQixPQUFPLFlBQVAsQ0FBb0IsY0FBcEIsQ0FEd0Q7QUFFOUUsbUJBQU8sWUFBUCxHQUFvQixVQUFTLElBQVQsRUFBYztBQUM5QixvQkFBSSxLQUFHLE9BQU8sWUFBUCxDQUFvQixZQUFwQixDQUFpQyxFQUFDLFVBQUQsRUFBTSxVQUFTLFNBQVQsRUFBdkMsQ0FBSCxDQUQwQjtBQUU5QixtQkFBRyxPQUFILEdBQVcsYUFBYSxTQUFiLElBQXdCLEVBQXhCLENBRm1CO0FBRzlCLG1CQUFHLGFBQUgsR0FBaUIsVUFBUyxVQUFULEVBQW9CLFVBQXBCLEVBQStCLGFBQS9CLEVBQThDLEtBQTlDLEVBQXFELE9BQXJELEVBQTZEO0FBQzFFLHdCQUFHLEtBQUssT0FBTCxLQUFlLFVBQWYsRUFDQyxPQUFPLFFBQVEsTUFBTSxFQUFOLENBQVIsR0FBb0IsSUFBcEIsQ0FEWDs7QUFHQSx3QkFBRyxhQUFILEVBQWlCO0FBQ2IsNkJBQUssV0FBTCxDQUFpQixhQUFqQixFQUFnQyxLQUFoQyxFQUF1QyxZQUFVO0FBQzdDLCtCQUFHLE9BQUgsR0FBVyxhQUFhLFNBQWIsR0FBdUIsVUFBdkIsQ0FEa0M7QUFFN0MsbUNBQU8sT0FBUCxJQUFpQixXQUFqQixJQUFnQyxTQUFoQyxDQUY2Qzt5QkFBVixDQUF2QyxDQURhO3FCQUFqQixNQUtLO0FBQ0QsNkJBQUssT0FBTCxHQUFhLGFBQWEsU0FBYixHQUF1QixVQUF2QixDQURaO0FBRUQsK0JBQU8sT0FBUCxJQUFpQixXQUFqQixJQUFnQyxTQUFoQyxDQUZDO3FCQUxMO2lCQUphLENBSGE7QUFpQjlCLHVCQUFPLEVBQVAsQ0FqQjhCO2FBQWQsQ0FGMEQ7U0FBbEY7S0FESCxDQUFELENBdUJHLE9BQU8sTUFBUCxJQUFnQixXQUFoQixHQUE2QixPQUFPLE1BQVAsR0FBYyxFQUFkLEdBQW1CLE1BQWhELENBdkJILENBRG1CO0NBQXZCOztBQTRCQSxTQUFTLFlBQVQsQ0FBc0IsRUFBdEIsRUFBeUI7QUFDckIsWUFBUSxpQkFBUixFQUEyQixFQUEzQixFQURxQjtDQUF6Qjs7QUFJQSxTQUFTLFdBQVQsR0FBNkY7UUFBeEUsK0RBQU8scUJBQWlFO1FBQTFELG1CQUEwRDtRQUFyRCxzQkFBcUQ7UUFBN0Msb0JBQTZDO1FBQXZDLHVCQUF1QztRQUE5QixxQkFBOEI7UUFBdkIsc0JBQXVCO1FBQWYsNkJBQWU7O0FBQ3pGLFFBQUcsQ0FBQyxLQUFELEVBQ0MsTUFBTSxJQUFJLEtBQUosQ0FBVSxzQ0FBVixDQUFOLENBREo7QUFFQSxhQUFPLE9BQU8sV0FBUCxFQUFQLENBSHlGO0FBSXpGLG1CQUFlLElBQWYsR0FKeUY7QUFLekYsUUFBRztBQUNDLFlBQUcsTUFBSCxFQUFVO0FBQ04sbUJBQU8sUUFBUCxJQUFtQixPQUFPLFFBQVAsSUFBaUIsSUFBakIsS0FBMEIsT0FBTyxLQUFQLEdBQWEsT0FBTyxRQUFQLENBQTFELENBRE07QUFFTixnQkFBSSxJQUFFLEVBQUYsQ0FGRTtBQUdOLDRDQUFnQyxLQUFoQyxDQUFzQyxHQUF0QyxFQUEyQyxPQUEzQyxDQUFtRCxVQUFTLEdBQVQsRUFBYTtBQUM1RCx1QkFBTyxHQUFQLEtBQWUsRUFBRSxJQUFGLENBQU8sTUFBSSxHQUFKLEdBQVEsT0FBTyxHQUFQLENBQVIsQ0FBdEIsQ0FENEQ7YUFBYixDQUFuRCxDQUhNO0FBTU4sbUJBQU8sT0FBTyxLQUFQLENBTkQ7O0FBUU4sa0JBQUksQ0FBQyxFQUFFLE1BQUYsR0FBVyxHQUFaLEdBQWtCLE9BQUssSUFBSSxPQUFKLENBQVksR0FBWixLQUFrQixDQUFDLENBQUQsR0FBSyxHQUF2QixHQUE2QixHQUE3QixDQUFMLEdBQXVDLEVBQUUsSUFBRixDQUFPLEdBQVAsQ0FBdkMsQ0FSaEI7U0FBVjs7QUFXQSxZQUFJLE1BQUksSUFBSSxjQUFKLEVBQUosQ0FaTDs7QUFjQyxZQUFJLGtCQUFKLEdBQXlCLFlBQVk7QUFDakMsZ0JBQUksSUFBSSxVQUFKLEtBQW1CLENBQW5CLEVBQXNCO0FBQ3RCLG9CQUFHO0FBQ0gsd0JBQUksT0FBSyxJQUFJLGlCQUFKLENBQXNCLGNBQXRCLENBQUw7d0JBQ0EsQ0FESixDQURHO0FBR0gsd0JBQUcsUUFBUSxLQUFLLE9BQUwsQ0FBYSxPQUFiLEtBQXVCLENBQUMsQ0FBRCxFQUFHO0FBQ2pDLDRCQUFFLEtBQUssS0FBTCxDQUFXLElBQUksWUFBSixDQUFiLENBRGlDO3FCQUFyQyxNQUdJLElBQUUsSUFBSSxZQUFKLENBSE47QUFJSSxtQ0FBZSxLQUFmLEdBUEQ7aUJBQUgsQ0FRQyxPQUFNLENBQU4sRUFBUTtBQUNMLG1DQUFlLEtBQWYsR0FESztpQkFBUjs7QUFJRCxvQkFBSSxJQUFJLE1BQUosSUFBYyxHQUFkLElBQXFCLElBQUksTUFBSixHQUFhLEdBQWIsRUFBa0I7QUFDdkMsOEJBQVEsS0FBUixJQUFpQixtQkFBcUIsVUFBUSxRQUFSLEdBQW1CLFNBQW5CLEdBQThCLE9BQTlCLG1CQUFyQixFQUEwRSxNQUExRSxDQUFqQixDQUR1QztBQUV2QywrQkFBVyxRQUFRLENBQVIsQ0FBWCxDQUZ1QztpQkFBM0MsTUFHTztBQUNILHdCQUFJLElBQUUsS0FBSSxJQUFJLE1BQUosSUFBWSxDQUFaLElBQWUsWUFBZixJQUE4QixlQUFsQyxDQURIO0FBRUgsNkJBQVMsTUFBTSxDQUFOLEtBQVUsQ0FBVixJQUFlLGtCQUFrQixDQUFsQixDQUF4QixDQUZHO2lCQUhQO2FBYko7U0FEcUIsQ0FkMUI7O0FBdUNDLFlBQUksSUFBSixDQUFTLE1BQVQsRUFBZ0IsR0FBaEIsRUFBb0IsSUFBcEIsRUF2Q0Q7QUF3Q0MsWUFBSSxnQkFBSixDQUFxQixrQkFBckIsRUFBeUMsZ0JBQXpDLEVBeENEOztBQTBDQyxZQUFJLFNBQU8sS0FBUCxDQTFDTDs7QUE0Q0MsWUFBRyxVQUFRLFFBQVIsRUFDQyxJQUFJLGdCQUFKLENBQXFCLGNBQXJCLEVBQW9DLFlBQXBDLEVBREosS0FFSyxJQUFHLGdCQUFnQixRQUFoQixFQUNKO0FBREMsYUFFRDtBQUNBLG9CQUFJLGdCQUFKLENBQXFCLGNBQXJCLEVBQXFDLGlDQUFyQyxFQURBO0FBRUEseUJBQU8sSUFBUCxDQUZBO2FBRkM7O0FBU0wsWUFBSSxnQkFBSixDQUFxQixrQkFBckIsRUFBd0MsVUFBUSxLQUFSLENBQXhDLENBdkREO0FBd0RDLFlBQUcsZUFBSyxPQUFMLEVBQ0MsSUFBSSxnQkFBSixDQUFxQixpQkFBckIsRUFBdUMsZUFBSyxPQUFMLENBQWEsWUFBYixDQUF2QyxDQURKO0FBeERELFlBMERJLGFBQUgsRUFDSSxJQUFJLGdCQUFKLENBQXFCLGlCQUFyQixFQUF1QyxhQUF2QyxFQURKOztBQUdBLFlBQUksSUFBSixDQUFTLE9BQU8sSUFBUCxJQUFjLFFBQWQsSUFBMEIsQ0FBQyxNQUFELEdBQVUsSUFBcEMsR0FBMkMsS0FBSyxTQUFMLENBQWUsSUFBZixDQUEzQyxDQUFULENBN0REO0tBQUgsQ0E4REMsT0FBTSxDQUFOLEVBQVE7QUFDTCxnQkFBUSxLQUFSLENBQWMsRUFBRSxPQUFGLENBQWQsQ0FESztBQUVMLHVCQUFlLEtBQWYsR0FGSztLQUFSO0FBSUQsV0FBTyxHQUFQLENBdkV5RjtDQUE3Rjs7QUEwRU8sU0FBUyxJQUFULENBQWMsT0FBZCxFQUFzQixNQUF0QixFQUE4QixPQUE5QixFQUF1QyxTQUF2QyxFQUFrRCxlQUFsRCxFQUFrRTtBQUNyRSxtQkFEcUU7O0FBR3JFLFlBQU0sTUFBTixDQUhxRTtBQUlyRSxhQUFPLE9BQVAsQ0FKcUU7QUFLckUsd0JBQWtCLGFBQWMsVUFBQyxDQUFELEVBQUksSUFBSjtlQUFXLFFBQVEsS0FBUiw2QkFBd0MsY0FBUyxDQUFqRDtLQUFYLENBTHFDO0FBTXJFLHFCQUFlLG1CQUFtQjtBQUFDLDhCQUFNLEVBQVA7QUFBVSxnQ0FBTyxFQUFqQjtLQUFuQixDQU5zRDs7QUFRckUsV0FBTyxZQUFVLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBbUI7QUFDNUMseUJBQU0saUJBQU4sQ0FBd0IsRUFBQyxxQkFBa0IsTUFBbEIsRUFBekIsRUFBcUQsVUFBUyxPQUFULEVBQWlCO0FBQ2xFLGlCQUFHLHdCQUFhLE9BQWIsRUFBcUIsd0JBQWEsU0FBTyxVQUFQLEVBQWtCLEVBQS9CLEVBQWtDLFdBQWxDLENBQXJCLENBQUgsQ0FEa0U7QUFFbEUseUJBQWEsRUFBYixFQUZrRTs7QUFJbEUsZ0JBQUksZUFBYSxpQkFBaUIsT0FBakIsQ0FBYixDQUo4RDs7QUFNbEUsNkJBQVEsSUFBUixDQUFhLElBQWIsRUFBa0IsRUFBbEIsRUFBc0IsV0FBdEIsRUFBa0MsTUFBbEMsRUFBMEMsWUFBMUMsRUFOa0U7QUFPbEUsNkJBQVEsWUFBUixHQUFxQixVQUFTLE9BQVQsRUFBaUI7QUFDbEMsdUJBQU8sVUFBUSxPQUFSLENBRDJCO2FBQWpCLENBUDZDOztBQVdsRSwyQkFBSyxJQUFMLEdBQVksSUFBWixDQUFpQixZQUFVO0FBQ3ZCLCtCQUFLLElBQUwsR0FEdUI7QUFFdkIsK0JBQUssSUFBTCxHQUZ1QjtBQUd2Qiw4QkFBSSxJQUFKLEdBSHVCOztBQUt2QixvQkFBRyxPQUFILEVBQVc7QUFDUCxtQ0FBSyxFQUFMLENBQVEsUUFBUixFQUFpQjsrQkFBSSxRQUFRLEVBQVI7cUJBQUosQ0FBakIsQ0FETztBQUVQLDRCQUFRLGVBQUssT0FBTCxHQUFlLFFBQVEsT0FBUixDQUFnQixRQUFRLEVBQVIsS0FBYSxFQUFiLENBQWhCLENBQWlDLElBQWpDLENBQXNDOytCQUFHLGVBQWUsWUFBZjtxQkFBSCxDQUFyRCxHQUF3RixFQUF4RixDQUFSLENBRk87aUJBQVgsTUFJSSxRQUFRLGVBQWUsWUFBZixDQUFSLEVBSko7O0FBTUEsOEJBQWMsT0FBZCxFQUF1QixNQUF2QixFQVh1Qjs7QUFhdkIsaUNBQVEsSUFBUixDQUFhLFFBQWIsRUFidUI7YUFBVixFQWNmLE1BZEYsRUFYa0U7U0FBakIsRUEyQm5ELE1BM0JGLEVBRDRDO0tBQW5CLENBQXRCLENBUjhEO0NBQWxFOztBQXdDUCxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsS0FBL0IsRUFBcUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFyQzs7QUFnREEsU0FBUyxnQkFBVCxDQUEwQixPQUExQixFQUFrQztBQUM5QixZQUFRLGFBQVIsQ0FBc0IsZ0JBQXRCLEVBRDhCO0FBRTlCLFdBQU87QUFDQyxrQ0FBUSxLQUFJLGNBQWE7QUFDckIsbUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVjt1QkFDZixRQUFRLGNBQVIsQ0FBdUIsT0FBdkIsQ0FBK0IsRUFBQyxLQUFJLEdBQUosRUFBaEMsRUFBeUM7MkJBQUcsUUFBUSxLQUFLLEVBQUUsS0FBRjtpQkFBaEIsRUFDckMsT0FBTyxZQUFQLElBQXNCLFdBQXRCLEdBQW9DLE1BQXBDLEdBQTZDOzJCQUFHLFFBQVEsWUFBUjtpQkFBSDthQUZsQyxDQUFuQixDQURxQjtTQUQxQjtBQU1DLGtDQUFRLEtBQUssT0FBTTtBQUNmLG1CQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVY7dUJBQ2YsUUFBUSxjQUFSLENBQXVCLE1BQXZCLENBQThCLEVBQUMsS0FBSSxHQUFKLEVBQVEsWUFBVCxFQUE5QixFQUE4QyxPQUE5QyxFQUF1RCxNQUF2RDthQURlLENBQW5CLENBRGU7U0FOcEI7QUFVQyx3Q0FBVyxLQUFJO0FBQ1gsbUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVjt1QkFDZixRQUFRLGNBQVIsQ0FBdUIsTUFBdkIsQ0FBOEIsR0FBOUIsRUFBa0MsT0FBbEMsRUFBMkMsTUFBM0M7YUFEZSxDQUFuQixDQURXO1NBVmhCO0tBQVAsQ0FGOEI7Q0FBbEM7O0FBbUJBLFNBQVMsY0FBVCxDQUF3QixZQUF4QixFQUFxQztBQUNqQyxXQUFPLGFBQWEsT0FBYixDQUFxQixnQkFBckIsRUFDRixJQURFLENBQ0csYUFBRztBQUNMLFlBQUcsQ0FBQyxDQUFELEVBQUc7QUFDRix5QkFBYSxPQUFiLENBQXFCLGdCQUFyQixFQUFzQyxNQUF0QyxFQURFO0FBRUYsbUJBQU8sS0FBUCxDQUZFO1NBQU47QUFJQSxlQUFPLENBQVAsQ0FMSztLQUFILENBRFYsQ0FEaUM7Q0FBckM7O0FBV0EsUUFBUSxJQUFSO0FBQ0EsUUFBUSxJQUFSO0FBQ0EsUUFBUSxJQUFSO0FBQ0EsUUFBUSxHQUFSO0FBQ0EsUUFBUSxLQUFSIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cydcblxuOyhmdW5jdGlvbihlbWl0KXtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oKXtcbiAgICAgICAgdHJ5e1xuICAgICAgICAgICAgZW1pdC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXZlbnRFbWl0dGVyIGVycm9yOiAke2UubWVzc2FnZX1gKVxuICAgICAgICB9XG4gICAgfVxufSkoRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0KTtcblxuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZydcbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcbmltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuXG5pbXBvcnQge1JlbW90ZURiLCBIeWJyaWREYiwgdXRpbHN9IGZyb20gJ21pbmltb25nbydcblxuXG52YXIgX193b3JrZXJcbiAgICAsYXBwSWRcbiAgICAsc2VydmVyXG4gICAgLGdIdHRwRXJyb3JIYW5kbGVyXG4gICAgLGRiXG4gICAgLGRiUHJvbWlzZVxuICAgICxsb2FkaW5nSGFuZGxlcjtcblxuZnVuY3Rpb24gbWFrZUVudlJlYWR5KCl7XG4gICAgKGZ1bmN0aW9uKHdpbmRvdyl7XG4gICAgICAgIGlmKHR5cGVvZih3aW5kb3cuY29yZG92YSkhPSd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuc3FsaXRlUGx1Z2luIT0ndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICB3aW5kb3cuZGVsZXRlRGF0YWJhc2U9d2luZG93LnNxbGl0ZVBsdWdpbi5kZWxldGVEYXRhYmFzZVxuICAgICAgICAgICAgd2luZG93Lm9wZW5EYXRhYmFzZT1mdW5jdGlvbihuYW1lKXtcbiAgICAgICAgICAgICAgICB2YXIgZGI9d2luZG93LnNxbGl0ZVBsdWdpbi5vcGVuRGF0YWJhc2Uoe25hbWUsbG9jYXRpb246XCJkZWZhdWx0XCJ9KVxuICAgICAgICAgICAgICAgIGRiLnZlcnNpb249bG9jYWxTdG9yYWdlLmRiVmVyc2lvbnx8XCJcIlxuICAgICAgICAgICAgICAgIGRiLmNoYW5nZVZlcnNpb249ZnVuY3Rpb24ob2xkVmVyc2lvbixuZXdWZXJzaW9uLHRyYW5zQ2FsbGJhY2ssIGVycm9yLCBzdWNjZXNzKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy52ZXJzaW9uIT09b2xkVmVyc2lvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvciA/IGVycm9yKFwiXCIpIDogbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpZih0cmFuc0NhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb24odHJhbnNDYWxsYmFjaywgZXJyb3IsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGIudmVyc2lvbj1sb2NhbFN0b3JhZ2UuZGJWZXJzaW9uPW5ld1ZlcnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Yoc3VjY2VzcykhPSd1bmRlZmluZWQnICYmIHN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJzaW9uPWxvY2FsU3RvcmFnZS5kYlZlcnNpb249bmV3VmVyc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mKHN1Y2Nlc3MpIT0ndW5kZWZpbmVkJyAmJiBzdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRiXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSh0eXBlb2Yod2luZG93KT09J3VuZGVmaW5lZCcgP2dsb2JhbC53aW5kb3c9e30gOiB3aW5kb3cpO1xuXG59XG5cbmZ1bmN0aW9uIGZpeE1pbmltb25nbyhkYil7XG4gICAgcmVxdWlyZSgnLi9maXgtbWluaW1vbmdvJykoZGIpXG59XG5cbmZ1bmN0aW9uIGFqYXhSZXF1ZXN0KG1ldGhvZD0nZ2V0JywgdXJsLCBwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yLCBfYXBwSWQsIF9zZXNzaW9uVG9rZW4pIHtcbiAgICBpZighYXBwSWQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBzcGVjaWZ5IGFwcGxpY2F0aW9uIEtleSBmaXJzdFwiKVxuICAgIG1ldGhvZD1tZXRob2QudG9Mb3dlckNhc2UoKVxuICAgIGxvYWRpbmdIYW5kbGVyLnNob3coKVxuICAgIHRyeXtcbiAgICAgICAgaWYocGFyYW1zKXtcbiAgICAgICAgICAgIHBhcmFtcy5zZWxlY3RvciAmJiBwYXJhbXMuc2VsZWN0b3IhPVwie31cIiAmJiAocGFyYW1zLnF1ZXJ5PXBhcmFtcy5zZWxlY3Rvcik7XG4gICAgICAgICAgICB2YXIgcD1bXVxuICAgICAgICAgICAgJ3NvcnQsbGltaXQsc2tpcHQsZmllbGRzLHF1ZXJ5Jy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgICAgICAgICBwYXJhbXNba2V5XSAmJiBwLnB1c2goa2V5Kyc9JytwYXJhbXNba2V5XSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIHBhcmFtcy5xdWVyeTtcblxuICAgICAgICAgICAgdXJsPSFwLmxlbmd0aCA/IHVybCA6IHVybCsodXJsLmluZGV4T2YoJz8nKT09LTEgPyAnPycgOiAnJicpK3Auam9pbignJicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3QoKVxuXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGU9eGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSxcbiAgICAgICAgICAgICAgICAgICAgcjtcbiAgICAgICAgICAgICAgICBpZih0eXBlICYmIHR5cGUuaW5kZXhPZignL2pzb24nKSE9LTEpe1xuICAgICAgICAgICAgICAgICAgICByPUpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgICAgICByPXhoci5yZXNwb25zZVRleHRcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCE9J2dldCcgJiYgZ0h0dHBFcnJvckhhbmRsZXIoYCR7bWV0aG9kPT0nZGVsZXRlJyA/ICdEZWxldGVkJyA6J1NhdmVkJ30gc3VjY2Vzc2Z1bGx5YCwnSW5mbycpO1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MocilcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbT1yfHwoeGhyLnN0YXR1cz09MCYmXCJObyBuZXR3b3JrXCIpfHxcImVycm9yIGhhcHBlbnNcIjtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IobSk9PTAgJiYgZ0h0dHBFcnJvckhhbmRsZXIobSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLm9wZW4obWV0aG9kLHVybCx0cnVlKVxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpXG5cbiAgICAgICAgdmFyIGlzSnNvbj1mYWxzZVxuXG4gICAgICAgIGlmKG1ldGhvZD09J2RlbGV0ZScpXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywndGV4dC9wbGFpbicpO1xuICAgICAgICBlbHNlIGlmKGRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSlcbiAgICAgICAgICAgIDsvL3hoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCdtdWx0aXBhcnQvZm9ybS1kYXRhJylcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpXG4gICAgICAgICAgICBpc0pzb249dHJ1ZVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYLUFwcGxpY2F0aW9uLUlkJyxfYXBwSWR8fGFwcElkKVxuICAgICAgICBpZihVc2VyLmN1cnJlbnQpXG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignWC1TZXNzaW9uLVRva2VuJyxVc2VyLmN1cnJlbnQuc2Vzc2lvblRva2VuKS8vY3VycmVudCB1c2VybmFtZSwgc2FtZSB3aXRoIF9pZFxuICAgICAgICBpZihfc2Vzc2lvblRva2VuKVxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtU2Vzc2lvbi1Ub2tlbicsX3Nlc3Npb25Ub2tlbilcblxuICAgICAgICB4aHIuc2VuZCh0eXBlb2YoZGF0YSk9PSdzdHJpbmcnIHx8ICFpc0pzb24gPyBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG4gICAgfWNhdGNoKGUpe1xuICAgICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSlcbiAgICAgICAgbG9hZGluZ0hhbmRsZXIuY2xvc2UoKVxuICAgIH1cbiAgICByZXR1cm4geGhyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KF9zZXJ2ZXIsX2FwcElkLCBzdWNjZXNzLCBodHRwRXJyb3IsIF9sb2FkaW5nSGFuZGxlcil7XG4gICAgbWFrZUVudlJlYWR5KClcblxuICAgIGFwcElkPV9hcHBJZFxuICAgIHNlcnZlcj1fc2VydmVyXG4gICAgZ0h0dHBFcnJvckhhbmRsZXI9aHR0cEVycm9yIHx8ICgoZSwgY29kZSk9PmNvbnNvbGUuZXJyb3IoYGh0dHAgZXJyb3Igd2l0aCBzdGF0dXMgJHtjb2RlfTogJHtlfWApKTtcbiAgICBsb2FkaW5nSGFuZGxlcj1fbG9hZGluZ0hhbmRsZXIgfHwge3Nob3coKXt9LGNsb3NlKCl7fX1cblxuICAgIHJldHVybiBkYlByb21pc2U9bmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgdXRpbHMuYXV0b3NlbGVjdExvY2FsRGIoe25hbWVzcGFjZTpgcWlsaS4ke19hcHBJZH1gfSxmdW5jdGlvbihsb2NhbERiKXtcbiAgICAgICAgICAgIGRiPW5ldyBIeWJyaWREYihsb2NhbERiLG5ldyBSZW1vdGVEYihzZXJ2ZXIrXCJjbGFzc2VzL1wiLHt9LGFqYXhSZXF1ZXN0KSk7XG4gICAgICAgICAgICBmaXhNaW5pbW9uZ28oZGIpXG5cbiAgICAgICAgICAgIGxldCBsb2NhbFN0b3JhZ2U9bWFrZUxvY2FsU3RvcmFnZShsb2NhbERiKVxuXG4gICAgICAgICAgICBTZXJ2aWNlLmluaXQobnVsbCxkYiwgYWpheFJlcXVlc3Qsc2VydmVyLCBsb2NhbFN0b3JhZ2UpXG4gICAgICAgICAgICBTZXJ2aWNlLmlzQ3VycmVudEFwcD1mdW5jdGlvbihfX2FwcElkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2FwcElkPT1fX2FwcElkXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFVzZXIuaW5pdCgpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBSb2xlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBGaWxlLmluaXQoKTtcbiAgICAgICAgICAgICAgICBMb2cuaW5pdCgpO1xuXG4gICAgICAgICAgICAgICAgaWYoc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsKCk9PnN1Y2Nlc3MoZGIpKVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKFVzZXIuY3VycmVudCA/IFByb21pc2UucmVzb2x2ZShzdWNjZXNzKGRiKXx8ZGIpLnRoZW4oYT0+aXNUdXRvcmlhbGl6ZWQobG9jYWxTdG9yYWdlKSkgOiBkYilcbiAgICAgICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGlzVHV0b3JpYWxpemVkKGxvY2FsU3RvcmFnZSkpXG5cbiAgICAgICAgICAgICAgICBzdXBwb3J0V29ya2VyKF9zZXJ2ZXIsIF9hcHBJZClcblxuICAgICAgICAgICAgICAgIFNlcnZpY2UuZW1pdCgnaW5pdGVkJylcbiAgICAgICAgICAgIH0scmVqZWN0KVxuXG4gICAgICAgIH0scmVqZWN0KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRXb3JrZXIoc2VydmVyLCBhcHBJZCl7LypcbiAgICByZXR1cm4gZmFsc2VcbiAgICBfX3dvcmtlciBmcm9tICd3ZWJ3b3JraWZ5JykocmVxdWlyZSgnLi93b3JrZXIuanMnKSlcbiAgICA7KGZ1bmN0aW9uKHBvc3RNZXNzYWdlKXtcbiAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2U9ZnVuY3Rpb24obSwgLi4uZGF0YSl7XG4gICAgICAgICAgICBwb3N0TWVzc2FnZS5jYWxsKF9fd29ya2VyLCB7dHlwZTptLCBhcmdzOkpTT04uc3RyaW5naWZ5KGRhdGEpfSlcbiAgICAgICAgfVxuICAgIH0pKF9fd29ya2VyLnBvc3RNZXNzYWdlKTtcblxuXG4gICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ2luaXQnLCBzZXJ2ZXIsIGFwcElkKVxuXG5cblxuXG4gICAgVXNlci5vbignY2hhbmdlJywoKT0+X193b3JrZXIucG9zdE1lc3NhZ2UoJ3VzZXInLFVzZXIuY3VycmVudCkpXG4gICAgaWYoVXNlci5jdXJyZW50KVxuICAgICAgICBfX3dvcmtlci5wb3N0TWVzc2FnZSgndXNlcicsIFVzZXIuY3VycmVudClcblxuICAgIDsoZnVuY3Rpb24oX2FkZENvbGxlY3Rpb24pe1xuICAgICAgICBmdW5jdGlvbiB3cmFwKHN1Y2Nlc3Msc3RhdGUsIHR5cGUpe1xuICAgICAgICAgICAgcmV0dXJuICgpPT57XG4gICAgICAgICAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2Uoc3RhdGUsdHlwZSlcbiAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uPWZ1bmN0aW9uKG5hbWUsIG9wdCl7XG4gICAgICAgICAgICBfYWRkQ29sbGVjdGlvbi5jYWxsKHRoaXMsLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgdmFyIHI9dGhpc1tuYW1lXVxuXG4gICAgICAgICAgICA7KGZ1bmN0aW9uKHVwc2VydCl7XG4gICAgICAgICAgICAgICAgci51cHNlcnQ9ZnVuY3Rpb24oZG9jcywgYmFzZXMsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwc2VydC5jYWxsKHRoaXMsIGRvY3MsIGJhc2VzLCB3cmFwKHN1Y2Nlc3MsJ3Vwc2VydCcsbmFtZSksIGVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKHIudXBzZXJ0KVxuXG4gICAgICAgICAgICA7KGZ1bmN0aW9uKHJlbW92ZSl7XG4gICAgICAgICAgICAgICAgci5yZW1vdmU9ZnVuY3Rpb24oaWQsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW92ZS5jYWxsKHRoaXMsaWQsIHdyYXAoc3VjY2VzcywncmVtb3ZlJyxuYW1lKSxlcnJvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KShyLnJlbW92ZSlcblxuICAgICAgICAgICAgX193b3JrZXIucG9zdE1lc3NhZ2UoJ2FkZENvbGxlY3Rpb24nLG5hbWUpXG4gICAgICAgICAgICByZXR1cm4gclxuICAgICAgICB9XG4gICAgfSkoSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb24pOyovXG59XG5cbmZ1bmN0aW9uIG1ha2VMb2NhbFN0b3JhZ2UobG9jYWxEYil7XG4gICAgbG9jYWxEYi5hZGRDb2xsZWN0aW9uKFwiX19sb2NhbFN0b3JhZ2VcIilcbiAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0SXRlbShrZXksZGVmYXVsdFZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLmZpbmRPbmUoe19pZDprZXl9LGE9PnJlc29sdmUoYSAmJiBhLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihkZWZhdWx0VmFsdWUpPT0ndW5kZWZpbmVkJyA/IHJlamVjdCA6IGU9PnJlc29sdmUoZGVmYXVsdFZhbHVlKSkpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SXRlbShrZXksIHZhbHVlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PlxuICAgICAgICAgICAgICAgICAgICBsb2NhbERiLl9fbG9jYWxTdG9yYWdlLnVwc2VydCh7X2lkOmtleSx2YWx1ZX0scmVzb2x2ZSwgcmVqZWN0KSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVJdGVtKGtleSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT5cbiAgICAgICAgICAgICAgICAgICAgbG9jYWxEYi5fX2xvY2FsU3RvcmFnZS5yZW1vdmUoa2V5LHJlc29sdmUsIHJlamVjdCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbn1cblxuZnVuY3Rpb24gaXNUdXRvcmlhbGl6ZWQobG9jYWxTdG9yYWdlKXtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJfX3R1dG9yaWFsaXplZFwiKVxuICAgICAgICAudGhlbihhPT57XG4gICAgICAgICAgICBpZighYSl7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJfX3R1dG9yaWFsaXplZFwiLFwidHJ1ZVwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFcbiAgICAgICAgfSlcbn1cblxuZXhwb3J0cy5Vc2VyPVVzZXJcbmV4cG9ydHMuUm9sZT1Sb2xlXG5leHBvcnRzLkZpbGU9RmlsZVxuZXhwb3J0cy5Mb2c9TG9nXG5leHBvcnRzLk1vZGVsPVNlcnZpY2VcblxuLyoqXG4qIGFqYXggcmVxdWVzdFxuKiBjbGllbnQgX2lkXG4gICAgKiBkb25lOiBva1xuKiBjbGllbnQgY3JlYXRlZEF0LCB1cGRhdGVkQXRcbiAgICAqIGRvbmVcbiAgICAqIHNlcnZlciBzaWRlIHdvdWxkIGdpdmUgaXRzIG93biBjcmVhdGVkQXQgYW5kIHVwZGF0ZWRBdFxuICAgICAgICAqIGNhY2hlIG9wZXJhdGlvbiBJbnZhbGlkXG4gICAgICAgICAgICAqIGRlbGV0ZSB0aGVuIGNhY2hlXG4gICAgICAgICAgICAgICAgKiBzYW1lIHRyYW5zYWN0aW9uXG5cbiAgICAqIGhhY2sgaW4gYWpheFxuICAgICAgICAqIHVwZGF0ZTogY3JlYXRlZEF0IT11cGRhdGVkQXRcbiAgICAgICAgICAgICogY2xpZW50IGluc2VydCB0aGVuIHVwZGF0ZVxuICAgICAgICAqIGNyZWF0ZTogY3JlYXRlZEF0PT11cGRhdGVkQXRcblxuKiByZXR1cm4gYXBwZW5kZWQgcGFydCBvbmx5IFZTIHdob2xlIG9iamVjdFxuICAgICogbWVyZ2UgY2xpZW50IG9iamVjdCBhbmQgc2VydmVyIHJldHVybiBvYmplY3RcblxuKiBhbnkgdXBzZXJ0IGFuZCBkZWxldGUgbXVzdCBhY3QgdG8gc2VydmVyIGRpcmVjdGx5XG4gICAgKiBjYWNoZSBpbiBsb2NhbFxuKiBhbnkgZmluZC9maW5kT25lIG11c3RcbiAgICAqIGZpcnN0IG9uIGxvY2FsXG4gICAgKiB0aGVuIHRvIHJlbW90ZVxuICAgICAgICAqIHNhbWUgd2l0aCBsb2NhbCwgd2l0aG91dCBjYWxsIHRvIHN1Y2Nlc3NcbiAgICAgICAgKiBub3Qgc2FtZSB3aXRoIGxvY2FsLCBjYWxsIHRvIHN1Y2Nlc3NcblxuKi9cbiJdfQ==