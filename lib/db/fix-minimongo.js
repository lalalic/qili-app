'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fix;

var _minimongo = require('minimongo');

var _fixed = false; /**
                    
                    options:{
                        cacheFind(true),
                        cacheOne(true),
                        interim(true),
                        useLocalOnRemoteError (only when interim=false)
                        shortcut(false)
                    }
                    HybridDb:{
                        addCollection(name, options, success(), error(err)): LocalDB and remoteDb must already have same name collection
                            *1. auto add same name collections on localDb, remoteDb, and HybridDb
                        removeCollection(name,success()):not remove same name collection of either localCol or remoteCol
                    
                        upload(success(),error(err)):
                    }
                    HybridDb.Collection:{
                        upsert(docs, bases, success, error):it only upsert on localDb
                            * overwrite it to upsert to remoteDb
                                * then cacheOne it
                        remove(id, success, eror):it only removes on localCol
                        find(selector, options).fetch(success, error):
                        findOne(selector,options, success, error):
                        upload(success,error):
                    }
                    
                    localDb.Collection{
                        ...
                        seed(docs,success, error): no then cache
                        cacheOne(doc, success, error): no or "cached" only
                        cache(docs, selector, options, success, error): same with above
                    
                        pendingUpserts(success, error):
                        resolveUpserts(docs, success, error): "upserted" only
                            > same with that in db, then update status only as "cached"
                            > not same, then update base only, and status leaves as "upserted"
                        pendingRemoves(success, error):
                        resolveRemove():
                    }
                    
                    MOST important:
                    Qili server is not fully aligned with minimongo about
                    : It can also be used with a simple server that just OVERWRITE documents COMPLETELY on upsert
                        >createdAt and updatedAt
                        >author
                        >_id
                    
                    so qili-app doesn't support local upsert
                    */
function fix(db) {
    if (_fixed) return;
    var tempColName = '_' + Date.now();

    var localDb = db.localDb,
        remoteDb = db.remoteDb;

    (function (_addCollection) {
        _minimongo.HybridDb.prototype.addCollection = function (name, opt) {
            if (!this.localDb[name]) this.localDb.addCollection(name);

            if (!this.remoteDb[name]) this.remoteDb.addCollection(name, opt);

            return _addCollection.apply(this, arguments);
        };
    })(_minimongo.HybridDb.prototype.addCollection);

    (function () {
        db.addCollection(tempColName);
        var HybridCollection = db[tempColName].constructor,
            LocalCollection = localDb[tempColName].constructor,
            RemoteCollection = remoteDb[tempColName].constructor;

        HybridCollection.prototype.upsert = function (doc, base, success, error, batchMode) {
            var _this = this;

            if (typeof base == 'function') {
                base = null;
                success = arguments[1];
                error = arguments[2];
                batchMode = arguments[3];
            }
            return new Promise(function (resolve, reject) {
                var fail = function fail(e) {
                    error && error(e);
                    reject(e);
                };
                if (Array.isArray(doc) && batchMode) {
                    console.warn("you are batch upserting, while server side will only return the NUMBER of changed");
                    var params = {
                        client: _this.client
                    };
                    if (typeof navigator !== "undefined" && navigator !== null && navigator.userAgent.toLowerCase().indexOf('android 2.3') !== -1) {
                        params._ = new Date().getTime();
                    }
                    _this.remoteCol.httpClient("POST", _this.remoteCol.url, params, doc, function (_ref) {
                        var n = _ref.affected;

                        success && success(n);
                        resolve(n);
                    }, function (e) {
                        error && error(e);
                        reject(e);
                    });
                } else {
                    _this.remoteCol.upsert(doc, base, function (result) {
                        if (Array.isArray(doc)) {
                            _this.localCol.cache(result, { _id: "neverRemoveFromCache when upserting" }, {}, function () {
                                success && success(result);
                                resolve(result);
                            }, error);
                        } else {
                            result = Object.assign(doc, result);
                            _this.localCol.cacheOne(result, function () {
                                success && success(result);
                                resolve(result);
                            }, fail);
                        }
                    }, fail);
                }
            });
        };

        //no client id
        _minimongo.utils.createUid = function () {
            return undefined;
        };

        HybridCollection.prototype.remove = function (id, success, error) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                var fail = function fail(e) {
                    error && error(e);
                    reject(e);
                };
                _this2.remoteCol.remove(id, function () {
                    _this2.localCol.resolveRemove(id, function () {
                        success && success();
                        resolve();
                    }, fail);
                }, fail);
            });
        };

        HybridCollection.prototype.upload = function () {
            throw new Error('Not support');
        };(function (find) {
            //don't call success when local interim find without results
            HybridCollection.prototype.find = function (selector) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var finder = find.call(this, selector, options),
                    interim = Object.assign({}, this.options, options).interim;
                if (!interim) return finder;

                var fetcher = finder.fetch,
                    time = 0,
                    called = false;
                return {
                    fetch: function fetch(success, error) {
                        fetcher(function (docs) {
                            time++;
                            if (time == 1 && docs.length == 0) {
                                //@HACK: modify local Data to make always call success with remote result
                                docs[0] = { _neverHasThis: tempColName };
                                return;
                            }

                            success(docs);
                        }, error);
                    }
                };
            };
        })(HybridCollection.prototype.find);

        (function (find) {
            //qili server return {results:[...]}
            RemoteCollection.prototype.find = function (selector) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var fetcher = find.call(this, selector, options).fetch;
                return {
                    fetch: function fetch(success, error) {
                        fetcher(function (data) {
                            if (success) {
                                success(typeof data.results != 'undefined' ? data.results : Array.isArray(data) ? data : [data]);
                            }
                        }, error);
                    }
                };
            };
        })(RemoteCollection.prototype.find);

        db.removeCollection(tempColName);
        localDb.removeCollection(tempColName);
        remoteDb.removeCollection(tempColName);
    })();
    _fixed = true;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maXgtbWluaW1vbmdvLmpzIl0sIm5hbWVzIjpbImZpeCIsIl9maXhlZCIsImRiIiwidGVtcENvbE5hbWUiLCJEYXRlIiwibm93IiwibG9jYWxEYiIsInJlbW90ZURiIiwiX2FkZENvbGxlY3Rpb24iLCJwcm90b3R5cGUiLCJhZGRDb2xsZWN0aW9uIiwibmFtZSIsIm9wdCIsImFwcGx5IiwiYXJndW1lbnRzIiwiSHlicmlkQ29sbGVjdGlvbiIsImNvbnN0cnVjdG9yIiwiTG9jYWxDb2xsZWN0aW9uIiwiUmVtb3RlQ29sbGVjdGlvbiIsInVwc2VydCIsImRvYyIsImJhc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJiYXRjaE1vZGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZhaWwiLCJlIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uc29sZSIsIndhcm4iLCJwYXJhbXMiLCJjbGllbnQiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJfIiwiZ2V0VGltZSIsInJlbW90ZUNvbCIsImh0dHBDbGllbnQiLCJ1cmwiLCJuIiwiYWZmZWN0ZWQiLCJsb2NhbENvbCIsImNhY2hlIiwicmVzdWx0IiwiX2lkIiwiT2JqZWN0IiwiYXNzaWduIiwiY2FjaGVPbmUiLCJjcmVhdGVVaWQiLCJ1bmRlZmluZWQiLCJyZW1vdmUiLCJpZCIsInJlc29sdmVSZW1vdmUiLCJ1cGxvYWQiLCJFcnJvciIsImZpbmQiLCJzZWxlY3RvciIsIm9wdGlvbnMiLCJmaW5kZXIiLCJjYWxsIiwiaW50ZXJpbSIsImZldGNoZXIiLCJmZXRjaCIsInRpbWUiLCJjYWxsZWQiLCJkb2NzIiwibGVuZ3RoIiwiX25ldmVySGFzVGhpcyIsImRhdGEiLCJyZXN1bHRzIiwicmVtb3ZlQ29sbGVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBb0R3QkEsRzs7QUFIeEI7O0FBRUEsSUFBSUMsU0FBTyxLQUFYLEMsQ0FuREE7Ozs7Ozs7Ozs7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U0FBakIsQ0FBMkJvRCxJQXpCN0I7O0FBMkJELFNBQUMsVUFBU0EsSUFBVCxFQUFjO0FBQUM7QUFDWjNDLDZCQUFpQlQsU0FBakIsQ0FBMkJvRCxJQUEzQixHQUFnQyxVQUFTQyxRQUFULEVBQTZCO0FBQUEsb0JBQVhDLE9BQVcsdUVBQUgsRUFBRzs7QUFDekQsb0JBQUlJLFVBQVFOLEtBQUtJLElBQUwsQ0FBVSxJQUFWLEVBQWVILFFBQWYsRUFBd0JDLE9BQXhCLEVBQWlDSyxLQUE3QztBQUNBLHVCQUFPO0FBQ0hBLDJCQUFPLGVBQVM5QyxPQUFULEVBQWlCQyxLQUFqQixFQUF1QjtBQUMxQjRDLGdDQUFRLGdCQUFNO0FBQy9CLGdDQUFHN0MsT0FBSCxFQUFXO0FBQ1ZBLHdDQUFRLE9BQU9vRCxLQUFLQyxPQUFaLElBQXNCLFdBQXRCLEdBQW9DRCxLQUFLQyxPQUF6QyxHQUFvRDdDLE1BQU1DLE9BQU4sQ0FBYzJDLElBQWQsSUFBc0JBLElBQXRCLEdBQTZCLENBQUNBLElBQUQsQ0FBekY7QUFDQTtBQUNpQix5QkFKRCxFQUlFbkQsS0FKRjtBQUtIO0FBUEUsaUJBQVA7QUFTSCxhQVhEO0FBWUgsU0FiRCxFQWFHTCxpQkFBaUJULFNBQWpCLENBQTJCb0QsSUFiOUI7O0FBZUEzRCxXQUFHMEUsZ0JBQUgsQ0FBb0J6RSxXQUFwQjtBQUNBRyxnQkFBUXNFLGdCQUFSLENBQXlCekUsV0FBekI7QUFDQUksaUJBQVNxRSxnQkFBVCxDQUEwQnpFLFdBQTFCO0FBQ0gsS0F6SEQ7QUEwSEFGLGFBQU8sSUFBUDtBQUNIIiwiZmlsZSI6ImZpeC1taW5pbW9uZ28uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcblxub3B0aW9uczp7XG4gICAgY2FjaGVGaW5kKHRydWUpLFxuICAgIGNhY2hlT25lKHRydWUpLFxuICAgIGludGVyaW0odHJ1ZSksXG4gICAgdXNlTG9jYWxPblJlbW90ZUVycm9yIChvbmx5IHdoZW4gaW50ZXJpbT1mYWxzZSlcbiAgICBzaG9ydGN1dChmYWxzZSlcbn1cbkh5YnJpZERiOntcbiAgICBhZGRDb2xsZWN0aW9uKG5hbWUsIG9wdGlvbnMsIHN1Y2Nlc3MoKSwgZXJyb3IoZXJyKSk6IExvY2FsREIgYW5kIHJlbW90ZURiIG11c3QgYWxyZWFkeSBoYXZlIHNhbWUgbmFtZSBjb2xsZWN0aW9uXG4gICAgICAgICoxLiBhdXRvIGFkZCBzYW1lIG5hbWUgY29sbGVjdGlvbnMgb24gbG9jYWxEYiwgcmVtb3RlRGIsIGFuZCBIeWJyaWREYlxuICAgIHJlbW92ZUNvbGxlY3Rpb24obmFtZSxzdWNjZXNzKCkpOm5vdCByZW1vdmUgc2FtZSBuYW1lIGNvbGxlY3Rpb24gb2YgZWl0aGVyIGxvY2FsQ29sIG9yIHJlbW90ZUNvbFxuXG4gICAgdXBsb2FkKHN1Y2Nlc3MoKSxlcnJvcihlcnIpKTpcbn1cbkh5YnJpZERiLkNvbGxlY3Rpb246e1xuICAgIHVwc2VydChkb2NzLCBiYXNlcywgc3VjY2VzcywgZXJyb3IpOml0IG9ubHkgdXBzZXJ0IG9uIGxvY2FsRGJcbiAgICAgICAgKiBvdmVyd3JpdGUgaXQgdG8gdXBzZXJ0IHRvIHJlbW90ZURiXG4gICAgICAgICAgICAqIHRoZW4gY2FjaGVPbmUgaXRcbiAgICByZW1vdmUoaWQsIHN1Y2Nlc3MsIGVyb3IpOml0IG9ubHkgcmVtb3ZlcyBvbiBsb2NhbENvbFxuICAgIGZpbmQoc2VsZWN0b3IsIG9wdGlvbnMpLmZldGNoKHN1Y2Nlc3MsIGVycm9yKTpcbiAgICBmaW5kT25lKHNlbGVjdG9yLG9wdGlvbnMsIHN1Y2Nlc3MsIGVycm9yKTpcbiAgICB1cGxvYWQoc3VjY2VzcyxlcnJvcik6XG59XG5cbmxvY2FsRGIuQ29sbGVjdGlvbntcbiAgICAuLi5cbiAgICBzZWVkKGRvY3Msc3VjY2VzcywgZXJyb3IpOiBubyB0aGVuIGNhY2hlXG4gICAgY2FjaGVPbmUoZG9jLCBzdWNjZXNzLCBlcnJvcik6IG5vIG9yIFwiY2FjaGVkXCIgb25seVxuICAgIGNhY2hlKGRvY3MsIHNlbGVjdG9yLCBvcHRpb25zLCBzdWNjZXNzLCBlcnJvcik6IHNhbWUgd2l0aCBhYm92ZVxuXG4gICAgcGVuZGluZ1Vwc2VydHMoc3VjY2VzcywgZXJyb3IpOlxuICAgIHJlc29sdmVVcHNlcnRzKGRvY3MsIHN1Y2Nlc3MsIGVycm9yKTogXCJ1cHNlcnRlZFwiIG9ubHlcbiAgICAgICAgPiBzYW1lIHdpdGggdGhhdCBpbiBkYiwgdGhlbiB1cGRhdGUgc3RhdHVzIG9ubHkgYXMgXCJjYWNoZWRcIlxuICAgICAgICA+IG5vdCBzYW1lLCB0aGVuIHVwZGF0ZSBiYXNlIG9ubHksIGFuZCBzdGF0dXMgbGVhdmVzIGFzIFwidXBzZXJ0ZWRcIlxuICAgIHBlbmRpbmdSZW1vdmVzKHN1Y2Nlc3MsIGVycm9yKTpcbiAgICByZXNvbHZlUmVtb3ZlKCk6XG59XG5cbk1PU1QgaW1wb3J0YW50OlxuUWlsaSBzZXJ2ZXIgaXMgbm90IGZ1bGx5IGFsaWduZWQgd2l0aCBtaW5pbW9uZ28gYWJvdXRcbjogSXQgY2FuIGFsc28gYmUgdXNlZCB3aXRoIGEgc2ltcGxlIHNlcnZlciB0aGF0IGp1c3QgT1ZFUldSSVRFIGRvY3VtZW50cyBDT01QTEVURUxZIG9uIHVwc2VydFxuICAgID5jcmVhdGVkQXQgYW5kIHVwZGF0ZWRBdFxuICAgID5hdXRob3JcbiAgICA+X2lkXG5cbnNvIHFpbGktYXBwIGRvZXNuJ3Qgc3VwcG9ydCBsb2NhbCB1cHNlcnRcbiovXG5pbXBvcnQge0h5YnJpZERiLCB1dGlsc30gZnJvbSAnbWluaW1vbmdvJ1xuXG52YXIgX2ZpeGVkPWZhbHNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaXgoZGIpe1xuICAgIGlmKF9maXhlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciB0ZW1wQ29sTmFtZT0nXycrRGF0ZS5ub3coKVxuXG4gICAgdmFyIGxvY2FsRGI9ZGIubG9jYWxEYixcbiAgICAgICAgcmVtb3RlRGI9ZGIucmVtb3RlRGI7XG5cbiAgICAoZnVuY3Rpb24oX2FkZENvbGxlY3Rpb24pe1xuICAgICAgICBIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbj1mdW5jdGlvbihuYW1lLCBvcHQpe1xuICAgICAgICAgICAgaWYoIXRoaXMubG9jYWxEYltuYW1lXSlcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsRGIuYWRkQ29sbGVjdGlvbihuYW1lKVxuXG4gICAgICAgICAgICBpZighdGhpcy5yZW1vdGVEYltuYW1lXSlcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZURiLmFkZENvbGxlY3Rpb24obmFtZSxvcHQpXG5cbiAgICAgICAgICAgIHJldHVybiBfYWRkQ29sbGVjdGlvbi5hcHBseSh0aGlzLGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgIH0pKEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uKTtcblxuICAgIChmdW5jdGlvbigpe1xuICAgICAgICBkYi5hZGRDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgICAgICBsZXQgSHlicmlkQ29sbGVjdGlvbj1kYlt0ZW1wQ29sTmFtZV0uY29uc3RydWN0b3IsXG4gICAgICAgICAgICBMb2NhbENvbGxlY3Rpb249bG9jYWxEYlt0ZW1wQ29sTmFtZV0uY29uc3RydWN0b3IsXG4gICAgICAgICAgICBSZW1vdGVDb2xsZWN0aW9uPXJlbW90ZURiW3RlbXBDb2xOYW1lXS5jb25zdHJ1Y3RvcjtcblxuICAgICAgICBIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS51cHNlcnQ9ZnVuY3Rpb24oZG9jLGJhc2Usc3VjY2VzcyxlcnJvcixiYXRjaE1vZGUpe1xuICAgICAgICAgICAgaWYodHlwZW9mKGJhc2UpPT0nZnVuY3Rpb24nKXtcbiAgICAgICAgICAgICAgICBiYXNlPW51bGxcbiAgICAgICAgICAgICAgICBzdWNjZXNzPWFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgICAgIGVycm9yPWFyZ3VtZW50c1syXVxuICAgICAgICAgICAgICAgIGJhdGNoTW9kZT1hcmd1bWVudHNbM11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgIHZhciBmYWlsPShlKT0+e1xuICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihlKVxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkb2MpICYmIGJhdGNoTW9kZSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcInlvdSBhcmUgYmF0Y2ggdXBzZXJ0aW5nLCB3aGlsZSBzZXJ2ZXIgc2lkZSB3aWxsIG9ubHkgcmV0dXJuIHRoZSBOVU1CRVIgb2YgY2hhbmdlZFwiKVxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1zPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50OiB0aGlzLmNsaWVudFxuICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgIGlmICgodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJiBuYXZpZ2F0b3IgIT09IG51bGwpICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhbmRyb2lkIDIuMycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLl8gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlQ29sLmh0dHBDbGllbnQoXCJQT1NUXCIsdGhpcy5yZW1vdGVDb2wudXJsLHBhcmFtcywgZG9jLFxuICAgICAgICAgICAgICAgICAgICAgICAgKHthZmZlY3RlZDpufSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MgKG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC51cHNlcnQoZG9jLGJhc2UscmVzdWx0PT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KGRvYykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxDb2wuY2FjaGUocmVzdWx0LHtfaWQ6XCJuZXZlclJlbW92ZUZyb21DYWNoZSB3aGVuIHVwc2VydGluZ1wifSx7fSwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0PU9iamVjdC5hc3NpZ24oZG9jLHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsQ29sLmNhY2hlT25lKHJlc3VsdCwgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyYmc3VjY2VzcyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxmYWlsKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm8gY2xpZW50IGlkXG4gICAgICAgIHV0aWxzLmNyZWF0ZVVpZD0oKT0+dW5kZWZpbmVkXG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKGlkLHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWlsPShlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlQ29sLnJlbW92ZShpZCwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5yZXNvbHZlUmVtb3ZlKGlkLCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyYmc3VjY2VzcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS51cGxvYWQ9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHN1cHBvcnQnKVxuICAgICAgICB9XG5cbiAgICAgICAgOyhmdW5jdGlvbihmaW5kKXtcbiAgICAgICAgICAgIC8vZG9uJ3QgY2FsbCBzdWNjZXNzIHdoZW4gbG9jYWwgaW50ZXJpbSBmaW5kIHdpdGhvdXQgcmVzdWx0c1xuICAgICAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZD1mdW5jdGlvbihzZWxlY3RvcixvcHRpb25zPXt9KXtcbiAgICAgICAgICAgICAgICB2YXIgZmluZGVyPWZpbmQuY2FsbCh0aGlzLHNlbGVjdG9yLG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgICAgICBpbnRlcmltPU9iamVjdC5hc3NpZ24oe30sdGhpcy5vcHRpb25zLG9wdGlvbnMpLmludGVyaW1cbiAgICAgICAgICAgICAgICBpZighaW50ZXJpbSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRlclxuXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZGVyLmZldGNoLFxuICAgICAgICAgICAgICAgICAgICB0aW1lPTAsIGNhbGxlZD1mYWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoOiBmdW5jdGlvbihzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyKChkb2NzKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUrK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWU9PTEgJiYgZG9jcy5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0BIQUNLOiBtb2RpZnkgbG9jYWwgRGF0YSB0byBtYWtlIGFsd2F5cyBjYWxsIHN1Y2Nlc3Mgd2l0aCByZW1vdGUgcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3NbMF09e19uZXZlckhhc1RoaXM6dGVtcENvbE5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZG9jcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQpO1xuXG4gICAgICAgIChmdW5jdGlvbihmaW5kKXsvL3FpbGkgc2VydmVyIHJldHVybiB7cmVzdWx0czpbLi4uXX1cbiAgICAgICAgICAgIFJlbW90ZUNvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQ9ZnVuY3Rpb24oc2VsZWN0b3Isb3B0aW9ucz17fSl7XG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZC5jYWxsKHRoaXMsc2VsZWN0b3Isb3B0aW9ucykuZmV0Y2hcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaDogZnVuY3Rpb24oc3VjY2VzcyxlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyKGRhdGE9Pntcblx0XHRcdFx0XHRcdFx0aWYoc3VjY2Vzcyl7XG5cdFx0XHRcdFx0XHRcdFx0c3VjY2Vzcyh0eXBlb2YoZGF0YS5yZXN1bHRzKSE9J3VuZGVmaW5lZCcgPyBkYXRhLnJlc3VsdHMgOiAoQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV0pKVxuXHRcdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KShSZW1vdGVDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kKTtcblxuICAgICAgICBkYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgICAgICBsb2NhbERiLnJlbW92ZUNvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgICAgIHJlbW90ZURiLnJlbW92ZUNvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgfSkoKTtcbiAgICBfZml4ZWQ9dHJ1ZVxufVxuIl19