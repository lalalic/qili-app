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

        HybridCollection.prototype.upsert = function (doc, base, success, error) {
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
                _this.remoteCol.upsert(doc, base, function (result) {
                    result = Object.assign(doc, result);
                    _this.localCol.cacheOne(result, function () {
                        success && success(result);
                        resolve(result);
                    }, fail);
                }, fail);
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
                            success && success(typeof data.results != 'undefined' ? data.results : data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maXgtbWluaW1vbmdvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQW9Ed0I7O0FBSHhCOztBQUVBLElBQUksU0FBTyxLQUFQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNXLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBZ0I7QUFDM0IsUUFBRyxNQUFILEVBQ0ksT0FESjtBQUVBLFFBQUksY0FBWSxNQUFJLEtBQUssR0FBTCxFQUFKLENBSFc7O0FBSzNCLFFBQUksVUFBUSxHQUFHLE9BQUg7UUFDUixXQUFTLEdBQUcsUUFBSCxDQU5jOztBQVEzQixLQUFDLFVBQVMsY0FBVCxFQUF3QjtBQUNyQiw0QkFBUyxTQUFULENBQW1CLGFBQW5CLEdBQWlDLFVBQVMsSUFBVCxFQUFlLEdBQWYsRUFBbUI7QUFDaEQsZ0JBQUcsQ0FBQyxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQUQsRUFDQyxLQUFLLE9BQUwsQ0FBYSxhQUFiLENBQTJCLElBQTNCLEVBREo7O0FBR0EsZ0JBQUcsQ0FBQyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQUQsRUFDQyxLQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLEVBQWlDLEdBQWpDLEVBREo7O0FBR0EsbUJBQU8sZUFBZSxLQUFmLENBQXFCLElBQXJCLEVBQTBCLFNBQTFCLENBQVAsQ0FQZ0Q7U0FBbkIsQ0FEWjtLQUF4QixDQUFELENBVUcsb0JBQVMsU0FBVCxDQUFtQixhQUFuQixDQVZILENBUjJCOztBQW9CM0IsS0FBQyxZQUFVO0FBQ1AsV0FBRyxhQUFILENBQWlCLFdBQWpCLEVBRE87QUFFUCxZQUFJLG1CQUFpQixHQUFHLFdBQUgsRUFBZ0IsV0FBaEI7WUFDakIsa0JBQWdCLFFBQVEsV0FBUixFQUFxQixXQUFyQjtZQUNoQixtQkFBaUIsU0FBUyxXQUFULEVBQXNCLFdBQXRCLENBSmQ7O0FBTVAseUJBQWlCLFNBQWpCLENBQTJCLE1BQTNC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QU1BLG9DQUFRLElBQVIsRUFSWTt5QkFBUixFQVNOLEtBVEYsRUFEMkI7cUJBQXhCO2lCQURYLENBUnlEO2FBQTdCLENBRnBCO1NBQWQsQ0FBRCxDQXlCRSxpQkFBaUIsU0FBakIsQ0FBMkIsSUFBM0IsQ0F6QkYsQ0FqRE07O0FBNEVQLFNBQUMsVUFBUyxJQUFULEVBQWM7O0FBQ1gsNkJBQWlCLFNBQWpCLENBQTJCLElBQTNCLEdBQWdDLFVBQVMsUUFBVCxFQUE2QjtvQkFBWCxnRUFBUSxrQkFBRzs7QUFDekQsb0JBQUksVUFBUSxLQUFLLElBQUwsQ0FBVSxJQUFWLEVBQWUsUUFBZixFQUF3QixPQUF4QixFQUFpQyxLQUFqQyxDQUQ2QztBQUV6RCx1QkFBTztBQUNILDJCQUFPLGVBQVMsT0FBVCxFQUFpQixLQUFqQixFQUF1QjtBQUMxQixnQ0FBUSxVQUFDLElBQUQsRUFBUTtBQUNaLHVDQUFXLFFBQVEsT0FBTyxLQUFLLE9BQUwsSUFBZSxXQUF0QixHQUFvQyxLQUFLLE9BQUwsR0FBZSxJQUFuRCxDQUFuQixDQURZO3lCQUFSLEVBRU4sS0FGRixFQUQwQjtxQkFBdkI7aUJBRFgsQ0FGeUQ7YUFBN0IsQ0FEckI7U0FBZCxDQUFELENBV0csaUJBQWlCLFNBQWpCLENBQTJCLElBQTNCLENBWEgsQ0E1RU87O0FBeUZQLFdBQUcsZ0JBQUgsQ0FBb0IsV0FBcEIsRUF6Rk87QUEwRlAsZ0JBQVEsZ0JBQVIsQ0FBeUIsV0FBekIsRUExRk87QUEyRlAsaUJBQVMsZ0JBQVQsQ0FBMEIsV0FBMUIsRUEzRk87S0FBVixDQUFELEdBcEIyQjtBQWlIM0IsYUFBTyxJQUFQLENBakgyQjtDQUFoQiIsImZpbGUiOiJmaXgtbWluaW1vbmdvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG5cbm9wdGlvbnM6e1xuICAgIGNhY2hlRmluZCh0cnVlKSxcbiAgICBjYWNoZU9uZSh0cnVlKSxcbiAgICBpbnRlcmltKHRydWUpLFxuICAgIHVzZUxvY2FsT25SZW1vdGVFcnJvciAob25seSB3aGVuIGludGVyaW09ZmFsc2UpXG4gICAgc2hvcnRjdXQoZmFsc2UpXG59XG5IeWJyaWREYjp7XG4gICAgYWRkQ29sbGVjdGlvbihuYW1lLCBvcHRpb25zLCBzdWNjZXNzKCksIGVycm9yKGVycikpOiBMb2NhbERCIGFuZCByZW1vdGVEYiBtdXN0IGFscmVhZHkgaGF2ZSBzYW1lIG5hbWUgY29sbGVjdGlvblxuICAgICAgICAqMS4gYXV0byBhZGQgc2FtZSBuYW1lIGNvbGxlY3Rpb25zIG9uIGxvY2FsRGIsIHJlbW90ZURiLCBhbmQgSHlicmlkRGJcbiAgICByZW1vdmVDb2xsZWN0aW9uKG5hbWUsc3VjY2VzcygpKTpub3QgcmVtb3ZlIHNhbWUgbmFtZSBjb2xsZWN0aW9uIG9mIGVpdGhlciBsb2NhbENvbCBvciByZW1vdGVDb2xcblxuICAgIHVwbG9hZChzdWNjZXNzKCksZXJyb3IoZXJyKSk6XG59XG5IeWJyaWREYi5Db2xsZWN0aW9uOntcbiAgICB1cHNlcnQoZG9jcywgYmFzZXMsIHN1Y2Nlc3MsIGVycm9yKTppdCBvbmx5IHVwc2VydCBvbiBsb2NhbERiXG4gICAgICAgICogb3ZlcndyaXRlIGl0IHRvIHVwc2VydCB0byByZW1vdGVEYlxuICAgICAgICAgICAgKiB0aGVuIGNhY2hlT25lIGl0XG4gICAgcmVtb3ZlKGlkLCBzdWNjZXNzLCBlcm9yKTppdCBvbmx5IHJlbW92ZXMgb24gbG9jYWxDb2xcbiAgICBmaW5kKHNlbGVjdG9yLCBvcHRpb25zKS5mZXRjaChzdWNjZXNzLCBlcnJvcik6XG4gICAgZmluZE9uZShzZWxlY3RvcixvcHRpb25zLCBzdWNjZXNzLCBlcnJvcik6XG4gICAgdXBsb2FkKHN1Y2Nlc3MsZXJyb3IpOlxufVxuXG5sb2NhbERiLkNvbGxlY3Rpb257XG4gICAgLi4uXG4gICAgc2VlZChkb2NzLHN1Y2Nlc3MsIGVycm9yKTogbm8gdGhlbiBjYWNoZVxuICAgIGNhY2hlT25lKGRvYywgc3VjY2VzcywgZXJyb3IpOiBubyBvciBcImNhY2hlZFwiIG9ubHlcbiAgICBjYWNoZShkb2NzLCBzZWxlY3Rvciwgb3B0aW9ucywgc3VjY2VzcywgZXJyb3IpOiBzYW1lIHdpdGggYWJvdmVcblxuICAgIHBlbmRpbmdVcHNlcnRzKHN1Y2Nlc3MsIGVycm9yKTpcbiAgICByZXNvbHZlVXBzZXJ0cyhkb2NzLCBzdWNjZXNzLCBlcnJvcik6IFwidXBzZXJ0ZWRcIiBvbmx5XG4gICAgICAgID4gc2FtZSB3aXRoIHRoYXQgaW4gZGIsIHRoZW4gdXBkYXRlIHN0YXR1cyBvbmx5IGFzIFwiY2FjaGVkXCJcbiAgICAgICAgPiBub3Qgc2FtZSwgdGhlbiB1cGRhdGUgYmFzZSBvbmx5LCBhbmQgc3RhdHVzIGxlYXZlcyBhcyBcInVwc2VydGVkXCJcbiAgICBwZW5kaW5nUmVtb3ZlcyhzdWNjZXNzLCBlcnJvcik6XG4gICAgcmVzb2x2ZVJlbW92ZSgpOlxufVxuXG5NT1NUIGltcG9ydGFudDpcblFpbGkgc2VydmVyIGlzIG5vdCBmdWxseSBhbGlnbmVkIHdpdGggbWluaW1vbmdvIGFib3V0XG46IEl0IGNhbiBhbHNvIGJlIHVzZWQgd2l0aCBhIHNpbXBsZSBzZXJ2ZXIgdGhhdCBqdXN0IE9WRVJXUklURSBkb2N1bWVudHMgQ09NUExFVEVMWSBvbiB1cHNlcnRcbiAgICA+Y3JlYXRlZEF0IGFuZCB1cGRhdGVkQXRcbiAgICA+YXV0aG9yXG4gICAgPl9pZFxuXG5zbyBxaWxpLWFwcCBkb2Vzbid0IHN1cHBvcnQgbG9jYWwgdXBzZXJ0XG4qL1xuaW1wb3J0IHtIeWJyaWREYiwgdXRpbHN9IGZyb20gJ21pbmltb25nbydcblxudmFyIF9maXhlZD1mYWxzZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZml4KGRiKXtcbiAgICBpZihfZml4ZWQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgdGVtcENvbE5hbWU9J18nK0RhdGUubm93KClcblxuICAgIHZhciBsb2NhbERiPWRiLmxvY2FsRGIsXG4gICAgICAgIHJlbW90ZURiPWRiLnJlbW90ZURiO1xuXG4gICAgKGZ1bmN0aW9uKF9hZGRDb2xsZWN0aW9uKXtcbiAgICAgICAgSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb249ZnVuY3Rpb24obmFtZSwgb3B0KXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmxvY2FsRGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbERiLmFkZENvbGxlY3Rpb24obmFtZSlcblxuICAgICAgICAgICAgaWYoIXRoaXMucmVtb3RlRGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVEYi5hZGRDb2xsZWN0aW9uKG5hbWUsb3B0KVxuXG4gICAgICAgICAgICByZXR1cm4gX2FkZENvbGxlY3Rpb24uYXBwbHkodGhpcyxhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICB9KShIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbik7XG5cbiAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgZGIuYWRkQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICAgICAgbGV0IEh5YnJpZENvbGxlY3Rpb249ZGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgTG9jYWxDb2xsZWN0aW9uPWxvY2FsRGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgUmVtb3RlQ29sbGVjdGlvbj1yZW1vdGVEYlt0ZW1wQ29sTmFtZV0uY29uc3RydWN0b3I7XG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUudXBzZXJ0PWZ1bmN0aW9uKGRvYyxiYXNlLHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICAgICAgaWYodHlwZW9mKGJhc2UpPT0nZnVuY3Rpb24nKXtcbiAgICAgICAgICAgICAgICBiYXNlPW51bGxcbiAgICAgICAgICAgICAgICBzdWNjZXNzPWFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgICAgIGVycm9yPWFyZ3VtZW50c1syXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICAgICAgdmFyIGZhaWw9KGUpPT57XG4gICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKGUpXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC51cHNlcnQoZG9jLGJhc2UsKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0PU9iamVjdC5hc3NpZ24oZG9jLHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5jYWNoZU9uZShyZXN1bHQsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzJiZzdWNjZXNzKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICAgICAgfSxmYWlsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm8gY2xpZW50IGlkXG4gICAgICAgIHV0aWxzLmNyZWF0ZVVpZD0oKT0+dW5kZWZpbmVkXG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKGlkLHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWlsPShlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlQ29sLnJlbW92ZShpZCwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5yZXNvbHZlUmVtb3ZlKGlkLCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyYmc3VjY2VzcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS51cGxvYWQ9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHN1cHBvcnQnKVxuICAgICAgICB9XG5cbiAgICAgICAgOyhmdW5jdGlvbihmaW5kKXtcbiAgICAgICAgICAgIC8vZG9uJ3QgY2FsbCBzdWNjZXNzIHdoZW4gbG9jYWwgaW50ZXJpbSBmaW5kIHdpdGhvdXQgcmVzdWx0c1xuICAgICAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZD1mdW5jdGlvbihzZWxlY3RvcixvcHRpb25zPXt9KXtcbiAgICAgICAgICAgICAgICB2YXIgZmluZGVyPWZpbmQuY2FsbCh0aGlzLHNlbGVjdG9yLG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgICAgICBpbnRlcmltPU9iamVjdC5hc3NpZ24oe30sdGhpcy5vcHRpb25zLG9wdGlvbnMpLmludGVyaW1cbiAgICAgICAgICAgICAgICBpZighaW50ZXJpbSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRlclxuXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZGVyLmZldGNoLFxuICAgICAgICAgICAgICAgICAgICB0aW1lPTAsIGNhbGxlZD1mYWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoOiBmdW5jdGlvbihzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyKChkb2NzKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUrK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWU9PTEgJiYgZG9jcy5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0BIQUNLOiBtb2RpZnkgbG9jYWwgRGF0YSB0byBtYWtlIGFsd2F5cyBjYWxsIHN1Y2Nlc3Mgd2l0aCByZW1vdGUgcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3NbMF09e19uZXZlckhhc1RoaXM6dGVtcENvbE5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZG9jcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQpO1xuXG4gICAgICAgIChmdW5jdGlvbihmaW5kKXsvL3FpbGkgc2VydmVyIHJldHVybiB7cmVzdWx0czpbLi4uXX1cbiAgICAgICAgICAgIFJlbW90ZUNvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQ9ZnVuY3Rpb24oc2VsZWN0b3Isb3B0aW9ucz17fSl7XG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZC5jYWxsKHRoaXMsc2VsZWN0b3Isb3B0aW9ucykuZmV0Y2hcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaDogZnVuY3Rpb24oc3VjY2VzcyxlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyKChkYXRhKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2Vzcyh0eXBlb2YoZGF0YS5yZXN1bHRzKSE9J3VuZGVmaW5lZCcgPyBkYXRhLnJlc3VsdHMgOiBkYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoUmVtb3RlQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZCk7XG5cbiAgICAgICAgZGIucmVtb3ZlQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICAgICAgbG9jYWxEYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgICAgICByZW1vdGVEYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgIH0pKCk7XG4gICAgX2ZpeGVkPXRydWVcbn1cbiJdfQ==