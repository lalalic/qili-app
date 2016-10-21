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
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
                var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maXgtbWluaW1vbmdvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQW9Ed0I7O0FBSHhCOztBQUVBLElBQUksU0FBTyxLQUFQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNXLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBZ0I7QUFDM0IsUUFBRyxNQUFILEVBQ0ksT0FESjtBQUVBLFFBQUksY0FBWSxNQUFJLEtBQUssR0FBTCxFQUFKLENBSFc7O0FBSzNCLFFBQUksVUFBUSxHQUFHLE9BQUg7UUFDUixXQUFTLEdBQUcsUUFBSCxDQU5jOztBQVEzQixLQUFDLFVBQVMsY0FBVCxFQUF3QjtBQUNyQiw0QkFBUyxTQUFULENBQW1CLGFBQW5CLEdBQWlDLFVBQVMsSUFBVCxFQUFlLEdBQWYsRUFBbUI7QUFDaEQsZ0JBQUcsQ0FBQyxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQUQsRUFDQyxLQUFLLE9BQUwsQ0FBYSxhQUFiLENBQTJCLElBQTNCLEVBREo7O0FBR0EsZ0JBQUcsQ0FBQyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQUQsRUFDQyxLQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLEVBQWlDLEdBQWpDLEVBREo7O0FBR0EsbUJBQU8sZUFBZSxLQUFmLENBQXFCLElBQXJCLEVBQTBCLFNBQTFCLENBQVAsQ0FQZ0Q7U0FBbkIsQ0FEWjtLQUF4QixDQUFELENBVUcsb0JBQVMsU0FBVCxDQUFtQixhQUFuQixDQVZILENBUjJCOztBQW9CM0IsS0FBQyxZQUFVO0FBQ1AsV0FBRyxhQUFILENBQWlCLFdBQWpCLEVBRE87QUFFUCxZQUFJLG1CQUFpQixHQUFHLFdBQUgsRUFBZ0IsV0FBaEI7WUFDakIsa0JBQWdCLFFBQVEsV0FBUixFQUFxQixXQUFyQjtZQUNoQixtQkFBaUIsU0FBUyxXQUFULEVBQXNCLFdBQXRCLENBSmQ7O0FBTVAseUJBQWlCLFNBQWpCLENBQTJCLE1BQTNC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RCxDQXlCRSxpQkFBaUIsU0FBakIsQ0FBMkIsSUFBM0IsQ0F6QkYsQ0EzRU07O0FBc0dQLFNBQUMsVUFBUyxJQUFULEVBQWM7O0FBQ1gsNkJBQWlCLFNBQWpCLENBQTJCLElBQTNCLEdBQWdDLFVBQVMsUUFBVCxFQUE2QjtvQkFBWCxnRUFBUSxrQkFBRzs7QUFDekQsb0JBQUksVUFBUSxLQUFLLElBQUwsQ0FBVSxJQUFWLEVBQWUsUUFBZixFQUF3QixPQUF4QixFQUFpQyxLQUFqQyxDQUQ2QztBQUV6RCx1QkFBTztBQUNILDJCQUFPLGVBQVMsT0FBVCxFQUFpQixLQUFqQixFQUF1QjtBQUMxQixnQ0FBUSxnQkFBTTtBQUMvQixnQ0FBRyxPQUFILEVBQVc7QUFDVix3Q0FBUSxPQUFPLEtBQUssT0FBTCxJQUFlLFdBQXRCLEdBQW9DLEtBQUssT0FBTCxHQUFnQixNQUFNLE9BQU4sQ0FBYyxJQUFkLElBQXNCLElBQXRCLEdBQTZCLENBQUMsSUFBRCxDQUE3QixDQUE1RCxDQURVOzZCQUFYO3lCQUR5QixFQUlOLEtBSkYsRUFEMEI7cUJBQXZCO2lCQURYLENBRnlEO2FBQTdCLENBRHJCO1NBQWQsQ0FBRCxDQWFHLGlCQUFpQixTQUFqQixDQUEyQixJQUEzQixDQWJILENBdEdPOztBQXFIUCxXQUFHLGdCQUFILENBQW9CLFdBQXBCLEVBckhPO0FBc0hQLGdCQUFRLGdCQUFSLENBQXlCLFdBQXpCLEVBdEhPO0FBdUhQLGlCQUFTLGdCQUFULENBQTBCLFdBQTFCLEVBdkhPO0tBQVYsQ0FBRCxHQXBCMkI7QUE2STNCLGFBQU8sSUFBUCxDQTdJMkI7Q0FBaEIiLCJmaWxlIjoiZml4LW1pbmltb25nby5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuXG5vcHRpb25zOntcbiAgICBjYWNoZUZpbmQodHJ1ZSksXG4gICAgY2FjaGVPbmUodHJ1ZSksXG4gICAgaW50ZXJpbSh0cnVlKSxcbiAgICB1c2VMb2NhbE9uUmVtb3RlRXJyb3IgKG9ubHkgd2hlbiBpbnRlcmltPWZhbHNlKVxuICAgIHNob3J0Y3V0KGZhbHNlKVxufVxuSHlicmlkRGI6e1xuICAgIGFkZENvbGxlY3Rpb24obmFtZSwgb3B0aW9ucywgc3VjY2VzcygpLCBlcnJvcihlcnIpKTogTG9jYWxEQiBhbmQgcmVtb3RlRGIgbXVzdCBhbHJlYWR5IGhhdmUgc2FtZSBuYW1lIGNvbGxlY3Rpb25cbiAgICAgICAgKjEuIGF1dG8gYWRkIHNhbWUgbmFtZSBjb2xsZWN0aW9ucyBvbiBsb2NhbERiLCByZW1vdGVEYiwgYW5kIEh5YnJpZERiXG4gICAgcmVtb3ZlQ29sbGVjdGlvbihuYW1lLHN1Y2Nlc3MoKSk6bm90IHJlbW92ZSBzYW1lIG5hbWUgY29sbGVjdGlvbiBvZiBlaXRoZXIgbG9jYWxDb2wgb3IgcmVtb3RlQ29sXG5cbiAgICB1cGxvYWQoc3VjY2VzcygpLGVycm9yKGVycikpOlxufVxuSHlicmlkRGIuQ29sbGVjdGlvbjp7XG4gICAgdXBzZXJ0KGRvY3MsIGJhc2VzLCBzdWNjZXNzLCBlcnJvcik6aXQgb25seSB1cHNlcnQgb24gbG9jYWxEYlxuICAgICAgICAqIG92ZXJ3cml0ZSBpdCB0byB1cHNlcnQgdG8gcmVtb3RlRGJcbiAgICAgICAgICAgICogdGhlbiBjYWNoZU9uZSBpdFxuICAgIHJlbW92ZShpZCwgc3VjY2VzcywgZXJvcik6aXQgb25seSByZW1vdmVzIG9uIGxvY2FsQ29sXG4gICAgZmluZChzZWxlY3Rvciwgb3B0aW9ucykuZmV0Y2goc3VjY2VzcywgZXJyb3IpOlxuICAgIGZpbmRPbmUoc2VsZWN0b3Isb3B0aW9ucywgc3VjY2VzcywgZXJyb3IpOlxuICAgIHVwbG9hZChzdWNjZXNzLGVycm9yKTpcbn1cblxubG9jYWxEYi5Db2xsZWN0aW9ue1xuICAgIC4uLlxuICAgIHNlZWQoZG9jcyxzdWNjZXNzLCBlcnJvcik6IG5vIHRoZW4gY2FjaGVcbiAgICBjYWNoZU9uZShkb2MsIHN1Y2Nlc3MsIGVycm9yKTogbm8gb3IgXCJjYWNoZWRcIiBvbmx5XG4gICAgY2FjaGUoZG9jcywgc2VsZWN0b3IsIG9wdGlvbnMsIHN1Y2Nlc3MsIGVycm9yKTogc2FtZSB3aXRoIGFib3ZlXG5cbiAgICBwZW5kaW5nVXBzZXJ0cyhzdWNjZXNzLCBlcnJvcik6XG4gICAgcmVzb2x2ZVVwc2VydHMoZG9jcywgc3VjY2VzcywgZXJyb3IpOiBcInVwc2VydGVkXCIgb25seVxuICAgICAgICA+IHNhbWUgd2l0aCB0aGF0IGluIGRiLCB0aGVuIHVwZGF0ZSBzdGF0dXMgb25seSBhcyBcImNhY2hlZFwiXG4gICAgICAgID4gbm90IHNhbWUsIHRoZW4gdXBkYXRlIGJhc2Ugb25seSwgYW5kIHN0YXR1cyBsZWF2ZXMgYXMgXCJ1cHNlcnRlZFwiXG4gICAgcGVuZGluZ1JlbW92ZXMoc3VjY2VzcywgZXJyb3IpOlxuICAgIHJlc29sdmVSZW1vdmUoKTpcbn1cblxuTU9TVCBpbXBvcnRhbnQ6XG5RaWxpIHNlcnZlciBpcyBub3QgZnVsbHkgYWxpZ25lZCB3aXRoIG1pbmltb25nbyBhYm91dFxuOiBJdCBjYW4gYWxzbyBiZSB1c2VkIHdpdGggYSBzaW1wbGUgc2VydmVyIHRoYXQganVzdCBPVkVSV1JJVEUgZG9jdW1lbnRzIENPTVBMRVRFTFkgb24gdXBzZXJ0XG4gICAgPmNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0XG4gICAgPmF1dGhvclxuICAgID5faWRcblxuc28gcWlsaS1hcHAgZG9lc24ndCBzdXBwb3J0IGxvY2FsIHVwc2VydFxuKi9cbmltcG9ydCB7SHlicmlkRGIsIHV0aWxzfSBmcm9tICdtaW5pbW9uZ28nXG5cbnZhciBfZml4ZWQ9ZmFsc2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpeChkYil7XG4gICAgaWYoX2ZpeGVkKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIHRlbXBDb2xOYW1lPSdfJytEYXRlLm5vdygpXG5cbiAgICB2YXIgbG9jYWxEYj1kYi5sb2NhbERiLFxuICAgICAgICByZW1vdGVEYj1kYi5yZW1vdGVEYjtcblxuICAgIChmdW5jdGlvbihfYWRkQ29sbGVjdGlvbil7XG4gICAgICAgIEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uPWZ1bmN0aW9uKG5hbWUsIG9wdCl7XG4gICAgICAgICAgICBpZighdGhpcy5sb2NhbERiW25hbWVdKVxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxEYi5hZGRDb2xsZWN0aW9uKG5hbWUpXG5cbiAgICAgICAgICAgIGlmKCF0aGlzLnJlbW90ZURiW25hbWVdKVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlRGIuYWRkQ29sbGVjdGlvbihuYW1lLG9wdClcblxuICAgICAgICAgICAgcmV0dXJuIF9hZGRDb2xsZWN0aW9uLmFwcGx5KHRoaXMsYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgfSkoSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb24pO1xuXG4gICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgIGRiLmFkZENvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgICAgIGxldCBIeWJyaWRDb2xsZWN0aW9uPWRiW3RlbXBDb2xOYW1lXS5jb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIExvY2FsQ29sbGVjdGlvbj1sb2NhbERiW3RlbXBDb2xOYW1lXS5jb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIFJlbW90ZUNvbGxlY3Rpb249cmVtb3RlRGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yO1xuXG4gICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLnVwc2VydD1mdW5jdGlvbihkb2MsYmFzZSxzdWNjZXNzLGVycm9yLGJhdGNoTW9kZSl7XG4gICAgICAgICAgICBpZih0eXBlb2YoYmFzZSk9PSdmdW5jdGlvbicpe1xuICAgICAgICAgICAgICAgIGJhc2U9bnVsbFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M9YXJndW1lbnRzWzFdXG4gICAgICAgICAgICAgICAgZXJyb3I9YXJndW1lbnRzWzJdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgICAgICB2YXIgZmFpbD0oZSk9PntcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IoZSlcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZG9jKSAmJiBiYXRjaE1vZGUpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJ5b3UgYXJlIGJhdGNoIHVwc2VydGluZywgd2hpbGUgc2VydmVyIHNpZGUgd2lsbCBvbmx5IHJldHVybiB0aGUgTlVNQkVSIG9mIGNoYW5nZWRcIilcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtcz0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudDogdGhpcy5jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICBpZiAoKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgbmF2aWdhdG9yICE9PSBudWxsKSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYW5kcm9pZCAyLjMnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5fID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC5odHRwQ2xpZW50KFwiUE9TVFwiLHRoaXMucmVtb3RlQ29sLnVybCxwYXJhbXMsIGRvYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICh7YWZmZWN0ZWQ6bn0pPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzIChuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobilcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGU9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVDb2wudXBzZXJ0KGRvYyxiYXNlLHJlc3VsdD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkb2MpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsQ29sLmNhY2hlKHJlc3VsdCx7X2lkOlwibmV2ZXJSZW1vdmVGcm9tQ2FjaGUgd2hlbiB1cHNlcnRpbmdcIn0se30sKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdD1PYmplY3QuYXNzaWduKGRvYyxyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5jYWNoZU9uZShyZXN1bHQsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MmJnN1Y2Nlc3MocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICAvL25vIGNsaWVudCBpZFxuICAgICAgICB1dGlscy5jcmVhdGVVaWQ9KCk9PnVuZGVmaW5lZFxuXG4gICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZT1mdW5jdGlvbihpZCxzdWNjZXNzLGVycm9yKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbD0oZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKGUpXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC5yZW1vdmUoaWQsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxDb2wucmVzb2x2ZVJlbW92ZShpZCwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MmJnN1Y2Nlc3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxmYWlsKVxuICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUudXBsb2FkPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBzdXBwb3J0JylcbiAgICAgICAgfVxuXG4gICAgICAgIDsoZnVuY3Rpb24oZmluZCl7XG4gICAgICAgICAgICAvL2Rvbid0IGNhbGwgc3VjY2VzcyB3aGVuIGxvY2FsIGludGVyaW0gZmluZCB3aXRob3V0IHJlc3VsdHNcbiAgICAgICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQ9ZnVuY3Rpb24oc2VsZWN0b3Isb3B0aW9ucz17fSl7XG4gICAgICAgICAgICAgICAgdmFyIGZpbmRlcj1maW5kLmNhbGwodGhpcyxzZWxlY3RvcixvcHRpb25zKSxcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJpbT1PYmplY3QuYXNzaWduKHt9LHRoaXMub3B0aW9ucyxvcHRpb25zKS5pbnRlcmltXG4gICAgICAgICAgICAgICAgaWYoIWludGVyaW0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5kZXJcblxuICAgICAgICAgICAgICAgIHZhciBmZXRjaGVyPWZpbmRlci5mZXRjaCxcbiAgICAgICAgICAgICAgICAgICAgdGltZT0wLCBjYWxsZWQ9ZmFsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaDogZnVuY3Rpb24oc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hlcigoZG9jcyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lKytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aW1lPT0xICYmIGRvY3MubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ASEFDSzogbW9kaWZ5IGxvY2FsIERhdGEgdG8gbWFrZSBhbHdheXMgY2FsbCBzdWNjZXNzIHdpdGggcmVtb3RlIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NzWzBdPXtfbmV2ZXJIYXNUaGlzOnRlbXBDb2xOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKGRvY3MpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KShIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kKTtcblxuICAgICAgICAoZnVuY3Rpb24oZmluZCl7Ly9xaWxpIHNlcnZlciByZXR1cm4ge3Jlc3VsdHM6Wy4uLl19XG4gICAgICAgICAgICBSZW1vdGVDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kPWZ1bmN0aW9uKHNlbGVjdG9yLG9wdGlvbnM9e30pe1xuICAgICAgICAgICAgICAgIHZhciBmZXRjaGVyPWZpbmQuY2FsbCh0aGlzLHNlbGVjdG9yLG9wdGlvbnMpLmZldGNoXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uKHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hlcihkYXRhPT57XG5cdFx0XHRcdFx0XHRcdGlmKHN1Y2Nlc3Mpe1xuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3ModHlwZW9mKGRhdGEucmVzdWx0cykhPSd1bmRlZmluZWQnID8gZGF0YS5yZXN1bHRzIDogKEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW2RhdGFdKSlcblx0XHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoUmVtb3RlQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZCk7XG5cbiAgICAgICAgZGIucmVtb3ZlQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICAgICAgbG9jYWxEYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgICAgICByZW1vdGVEYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgIH0pKCk7XG4gICAgX2ZpeGVkPXRydWVcbn1cbiJdfQ==