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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maXgtbWluaW1vbmdvLmpzIl0sIm5hbWVzIjpbImZpeCIsIl9maXhlZCIsImRiIiwidGVtcENvbE5hbWUiLCJEYXRlIiwibm93IiwibG9jYWxEYiIsInJlbW90ZURiIiwiX2FkZENvbGxlY3Rpb24iLCJwcm90b3R5cGUiLCJhZGRDb2xsZWN0aW9uIiwibmFtZSIsIm9wdCIsImFwcGx5IiwiYXJndW1lbnRzIiwiSHlicmlkQ29sbGVjdGlvbiIsImNvbnN0cnVjdG9yIiwiTG9jYWxDb2xsZWN0aW9uIiwiUmVtb3RlQ29sbGVjdGlvbiIsInVwc2VydCIsImRvYyIsImJhc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJiYXRjaE1vZGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZhaWwiLCJlIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uc29sZSIsIndhcm4iLCJwYXJhbXMiLCJjbGllbnQiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJfIiwiZ2V0VGltZSIsInJlbW90ZUNvbCIsImh0dHBDbGllbnQiLCJ1cmwiLCJuIiwiYWZmZWN0ZWQiLCJsb2NhbENvbCIsImNhY2hlIiwicmVzdWx0IiwiX2lkIiwiT2JqZWN0IiwiYXNzaWduIiwiY2FjaGVPbmUiLCJjcmVhdGVVaWQiLCJ1bmRlZmluZWQiLCJyZW1vdmUiLCJpZCIsInJlc29sdmVSZW1vdmUiLCJ1cGxvYWQiLCJFcnJvciIsImZpbmQiLCJzZWxlY3RvciIsIm9wdGlvbnMiLCJmaW5kZXIiLCJjYWxsIiwiaW50ZXJpbSIsImZldGNoZXIiLCJmZXRjaCIsInRpbWUiLCJjYWxsZWQiLCJkb2NzIiwibGVuZ3RoIiwiX25ldmVySGFzVGhpcyIsImRhdGEiLCJyZXN1bHRzIiwicmVtb3ZlQ29sbGVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBb0R3QkEsRzs7QUFIeEI7O0FBRUEsSUFBSUMsU0FBTyxLQUFYLEMsQ0FuREE7Ozs7Ozs7Ozs7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U0FBakIsQ0FBMkJvRCxJQXpCN0I7O0FBMkJELFNBQUMsVUFBU0EsSUFBVCxFQUFjO0FBQUM7QUFDWjNDLDZCQUFpQlQsU0FBakIsQ0FBMkJvRCxJQUEzQixHQUFnQyxVQUFTQyxRQUFULEVBQTZCO0FBQUEsb0JBQVhDLE9BQVcsdUVBQUgsRUFBRzs7QUFDekQsb0JBQUlJLFVBQVFOLEtBQUtJLElBQUwsQ0FBVSxJQUFWLEVBQWVILFFBQWYsRUFBd0JDLE9BQXhCLEVBQWlDSyxLQUE3QztBQUNBLHVCQUFPO0FBQ0hBLDJCQUFPLGVBQVM5QyxPQUFULEVBQWlCQyxLQUFqQixFQUF1QjtBQUMxQjRDLGdDQUFRLGdCQUFNO0FBQy9CLGdDQUFHN0MsT0FBSCxFQUFXO0FBQ1ZBLHdDQUFRLE9BQU9vRCxLQUFLQyxPQUFaLElBQXNCLFdBQXRCLEdBQW9DRCxLQUFLQyxPQUF6QyxHQUFvRDdDLE1BQU1DLE9BQU4sQ0FBYzJDLElBQWQsSUFBc0JBLElBQXRCLEdBQTZCLENBQUNBLElBQUQsQ0FBekY7QUFDQTtBQUNpQix5QkFKRCxFQUlFbkQsS0FKRjtBQUtIO0FBUEUsaUJBQVA7QUFTSCxhQVhEO0FBWUgsU0FiRCxFQWFHTCxpQkFBaUJULFNBQWpCLENBQTJCb0QsSUFiOUI7O0FBZUEzRCxXQUFHMEUsZ0JBQUgsQ0FBb0J6RSxXQUFwQjtBQUNBRyxnQkFBUXNFLGdCQUFSLENBQXlCekUsV0FBekI7QUFDQUksaUJBQVNxRSxnQkFBVCxDQUEwQnpFLFdBQTFCO0FBQ0gsS0F6SEQ7QUEwSEFGLGFBQU8sSUFBUDtBQUNIIiwiZmlsZSI6ImZpeC1taW5pbW9uZ28uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuXHJcbm9wdGlvbnM6e1xyXG4gICAgY2FjaGVGaW5kKHRydWUpLFxyXG4gICAgY2FjaGVPbmUodHJ1ZSksXHJcbiAgICBpbnRlcmltKHRydWUpLFxyXG4gICAgdXNlTG9jYWxPblJlbW90ZUVycm9yIChvbmx5IHdoZW4gaW50ZXJpbT1mYWxzZSlcclxuICAgIHNob3J0Y3V0KGZhbHNlKVxyXG59XHJcbkh5YnJpZERiOntcclxuICAgIGFkZENvbGxlY3Rpb24obmFtZSwgb3B0aW9ucywgc3VjY2VzcygpLCBlcnJvcihlcnIpKTogTG9jYWxEQiBhbmQgcmVtb3RlRGIgbXVzdCBhbHJlYWR5IGhhdmUgc2FtZSBuYW1lIGNvbGxlY3Rpb25cclxuICAgICAgICAqMS4gYXV0byBhZGQgc2FtZSBuYW1lIGNvbGxlY3Rpb25zIG9uIGxvY2FsRGIsIHJlbW90ZURiLCBhbmQgSHlicmlkRGJcclxuICAgIHJlbW92ZUNvbGxlY3Rpb24obmFtZSxzdWNjZXNzKCkpOm5vdCByZW1vdmUgc2FtZSBuYW1lIGNvbGxlY3Rpb24gb2YgZWl0aGVyIGxvY2FsQ29sIG9yIHJlbW90ZUNvbFxyXG5cclxuICAgIHVwbG9hZChzdWNjZXNzKCksZXJyb3IoZXJyKSk6XHJcbn1cclxuSHlicmlkRGIuQ29sbGVjdGlvbjp7XHJcbiAgICB1cHNlcnQoZG9jcywgYmFzZXMsIHN1Y2Nlc3MsIGVycm9yKTppdCBvbmx5IHVwc2VydCBvbiBsb2NhbERiXHJcbiAgICAgICAgKiBvdmVyd3JpdGUgaXQgdG8gdXBzZXJ0IHRvIHJlbW90ZURiXHJcbiAgICAgICAgICAgICogdGhlbiBjYWNoZU9uZSBpdFxyXG4gICAgcmVtb3ZlKGlkLCBzdWNjZXNzLCBlcm9yKTppdCBvbmx5IHJlbW92ZXMgb24gbG9jYWxDb2xcclxuICAgIGZpbmQoc2VsZWN0b3IsIG9wdGlvbnMpLmZldGNoKHN1Y2Nlc3MsIGVycm9yKTpcclxuICAgIGZpbmRPbmUoc2VsZWN0b3Isb3B0aW9ucywgc3VjY2VzcywgZXJyb3IpOlxyXG4gICAgdXBsb2FkKHN1Y2Nlc3MsZXJyb3IpOlxyXG59XHJcblxyXG5sb2NhbERiLkNvbGxlY3Rpb257XHJcbiAgICAuLi5cclxuICAgIHNlZWQoZG9jcyxzdWNjZXNzLCBlcnJvcik6IG5vIHRoZW4gY2FjaGVcclxuICAgIGNhY2hlT25lKGRvYywgc3VjY2VzcywgZXJyb3IpOiBubyBvciBcImNhY2hlZFwiIG9ubHlcclxuICAgIGNhY2hlKGRvY3MsIHNlbGVjdG9yLCBvcHRpb25zLCBzdWNjZXNzLCBlcnJvcik6IHNhbWUgd2l0aCBhYm92ZVxyXG5cclxuICAgIHBlbmRpbmdVcHNlcnRzKHN1Y2Nlc3MsIGVycm9yKTpcclxuICAgIHJlc29sdmVVcHNlcnRzKGRvY3MsIHN1Y2Nlc3MsIGVycm9yKTogXCJ1cHNlcnRlZFwiIG9ubHlcclxuICAgICAgICA+IHNhbWUgd2l0aCB0aGF0IGluIGRiLCB0aGVuIHVwZGF0ZSBzdGF0dXMgb25seSBhcyBcImNhY2hlZFwiXHJcbiAgICAgICAgPiBub3Qgc2FtZSwgdGhlbiB1cGRhdGUgYmFzZSBvbmx5LCBhbmQgc3RhdHVzIGxlYXZlcyBhcyBcInVwc2VydGVkXCJcclxuICAgIHBlbmRpbmdSZW1vdmVzKHN1Y2Nlc3MsIGVycm9yKTpcclxuICAgIHJlc29sdmVSZW1vdmUoKTpcclxufVxyXG5cclxuTU9TVCBpbXBvcnRhbnQ6XHJcblFpbGkgc2VydmVyIGlzIG5vdCBmdWxseSBhbGlnbmVkIHdpdGggbWluaW1vbmdvIGFib3V0XHJcbjogSXQgY2FuIGFsc28gYmUgdXNlZCB3aXRoIGEgc2ltcGxlIHNlcnZlciB0aGF0IGp1c3QgT1ZFUldSSVRFIGRvY3VtZW50cyBDT01QTEVURUxZIG9uIHVwc2VydFxyXG4gICAgPmNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0XHJcbiAgICA+YXV0aG9yXHJcbiAgICA+X2lkXHJcblxyXG5zbyBxaWxpLWFwcCBkb2Vzbid0IHN1cHBvcnQgbG9jYWwgdXBzZXJ0XHJcbiovXHJcbmltcG9ydCB7SHlicmlkRGIsIHV0aWxzfSBmcm9tICdtaW5pbW9uZ28nXHJcblxyXG52YXIgX2ZpeGVkPWZhbHNlXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpeChkYil7XHJcbiAgICBpZihfZml4ZWQpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgdmFyIHRlbXBDb2xOYW1lPSdfJytEYXRlLm5vdygpXHJcblxyXG4gICAgdmFyIGxvY2FsRGI9ZGIubG9jYWxEYixcclxuICAgICAgICByZW1vdGVEYj1kYi5yZW1vdGVEYjtcclxuXHJcbiAgICAoZnVuY3Rpb24oX2FkZENvbGxlY3Rpb24pe1xyXG4gICAgICAgIEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uPWZ1bmN0aW9uKG5hbWUsIG9wdCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmxvY2FsRGJbbmFtZV0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsRGIuYWRkQ29sbGVjdGlvbihuYW1lKVxyXG5cclxuICAgICAgICAgICAgaWYoIXRoaXMucmVtb3RlRGJbbmFtZV0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZURiLmFkZENvbGxlY3Rpb24obmFtZSxvcHQpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gX2FkZENvbGxlY3Rpb24uYXBwbHkodGhpcyxhcmd1bWVudHMpXHJcbiAgICAgICAgfVxyXG4gICAgfSkoSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb24pO1xyXG5cclxuICAgIChmdW5jdGlvbigpe1xyXG4gICAgICAgIGRiLmFkZENvbGxlY3Rpb24odGVtcENvbE5hbWUpXHJcbiAgICAgICAgbGV0IEh5YnJpZENvbGxlY3Rpb249ZGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yLFxyXG4gICAgICAgICAgICBMb2NhbENvbGxlY3Rpb249bG9jYWxEYlt0ZW1wQ29sTmFtZV0uY29uc3RydWN0b3IsXHJcbiAgICAgICAgICAgIFJlbW90ZUNvbGxlY3Rpb249cmVtb3RlRGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yO1xyXG5cclxuICAgICAgICBIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS51cHNlcnQ9ZnVuY3Rpb24oZG9jLGJhc2Usc3VjY2VzcyxlcnJvcixiYXRjaE1vZGUpe1xyXG4gICAgICAgICAgICBpZih0eXBlb2YoYmFzZSk9PSdmdW5jdGlvbicpe1xyXG4gICAgICAgICAgICAgICAgYmFzZT1udWxsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzPWFyZ3VtZW50c1sxXVxyXG4gICAgICAgICAgICAgICAgZXJyb3I9YXJndW1lbnRzWzJdXHJcbiAgICAgICAgICAgICAgICBiYXRjaE1vZGU9YXJndW1lbnRzWzNdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgICAgICAgICB2YXIgZmFpbD0oZSk9PntcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkb2MpICYmIGJhdGNoTW9kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwieW91IGFyZSBiYXRjaCB1cHNlcnRpbmcsIHdoaWxlIHNlcnZlciBzaWRlIHdpbGwgb25seSByZXR1cm4gdGhlIE5VTUJFUiBvZiBjaGFuZ2VkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtcz0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50OiB0aGlzLmNsaWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICBpZiAoKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgbmF2aWdhdG9yICE9PSBudWxsKSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYW5kcm9pZCAyLjMnKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLl8gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC5odHRwQ2xpZW50KFwiUE9TVFwiLHRoaXMucmVtb3RlQ29sLnVybCxwYXJhbXMsIGRvYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHthZmZlY3RlZDpufSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyAobilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IoZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVDb2wudXBzZXJ0KGRvYyxiYXNlLHJlc3VsdD0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KGRvYykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5jYWNoZShyZXN1bHQse19pZDpcIm5ldmVyUmVtb3ZlRnJvbUNhY2hlIHdoZW4gdXBzZXJ0aW5nXCJ9LHt9LCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0PU9iamVjdC5hc3NpZ24oZG9jLHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxDb2wuY2FjaGVPbmUocmVzdWx0LCAoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MmJnN1Y2Nlc3MocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxmYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxmYWlsKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbm8gY2xpZW50IGlkXHJcbiAgICAgICAgdXRpbHMuY3JlYXRlVWlkPSgpPT51bmRlZmluZWRcclxuXHJcbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKGlkLHN1Y2Nlc3MsZXJyb3Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbD0oZSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IoZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlQ29sLnJlbW92ZShpZCwoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsQ29sLnJlc29sdmVSZW1vdmUoaWQsKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MmJnN1Y2Nlc3MoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sZmFpbClcclxuICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS51cGxvYWQ9ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3Qgc3VwcG9ydCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICA7KGZ1bmN0aW9uKGZpbmQpe1xyXG4gICAgICAgICAgICAvL2Rvbid0IGNhbGwgc3VjY2VzcyB3aGVuIGxvY2FsIGludGVyaW0gZmluZCB3aXRob3V0IHJlc3VsdHNcclxuICAgICAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZD1mdW5jdGlvbihzZWxlY3RvcixvcHRpb25zPXt9KXtcclxuICAgICAgICAgICAgICAgIHZhciBmaW5kZXI9ZmluZC5jYWxsKHRoaXMsc2VsZWN0b3Isb3B0aW9ucyksXHJcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJpbT1PYmplY3QuYXNzaWduKHt9LHRoaXMub3B0aW9ucyxvcHRpb25zKS5pbnRlcmltXHJcbiAgICAgICAgICAgICAgICBpZighaW50ZXJpbSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluZGVyXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZGVyLmZldGNoLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWU9MCwgY2FsbGVkPWZhbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoOiBmdW5jdGlvbihzdWNjZXNzLCBlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoZXIoKGRvY3MpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lKytcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWU9PTEgJiYgZG9jcy5sZW5ndGg9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQEhBQ0s6IG1vZGlmeSBsb2NhbCBEYXRhIHRvIG1ha2UgYWx3YXlzIGNhbGwgc3VjY2VzcyB3aXRoIHJlbW90ZSByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NzWzBdPXtfbmV2ZXJIYXNUaGlzOnRlbXBDb2xOYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZG9jcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxlcnJvcilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KShIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kKTtcclxuXHJcbiAgICAgICAgKGZ1bmN0aW9uKGZpbmQpey8vcWlsaSBzZXJ2ZXIgcmV0dXJuIHtyZXN1bHRzOlsuLi5dfVxyXG4gICAgICAgICAgICBSZW1vdGVDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kPWZ1bmN0aW9uKHNlbGVjdG9yLG9wdGlvbnM9e30pe1xyXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZC5jYWxsKHRoaXMsc2VsZWN0b3Isb3B0aW9ucykuZmV0Y2hcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uKHN1Y2Nlc3MsZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyKGRhdGE9PntcclxuXHRcdFx0XHRcdFx0XHRpZihzdWNjZXNzKXtcclxuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3ModHlwZW9mKGRhdGEucmVzdWx0cykhPSd1bmRlZmluZWQnID8gZGF0YS5yZXN1bHRzIDogKEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW2RhdGFdKSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoUmVtb3RlQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZCk7XHJcblxyXG4gICAgICAgIGRiLnJlbW92ZUNvbGxlY3Rpb24odGVtcENvbE5hbWUpXHJcbiAgICAgICAgbG9jYWxEYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxyXG4gICAgICAgIHJlbW90ZURiLnJlbW92ZUNvbGxlY3Rpb24odGVtcENvbE5hbWUpXHJcbiAgICB9KSgpO1xyXG4gICAgX2ZpeGVkPXRydWVcclxufVxyXG4iXX0=