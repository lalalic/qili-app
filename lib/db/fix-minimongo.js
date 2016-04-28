'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fix;
/**

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

var _require = require('minimongo');

var HybridDb = _require.HybridDb;
var utils = _require.utils;

var _fixed = false;
function fix(db) {
    if (_fixed) return;
    var tempColName = '_' + Date.now();

    var localDb = db.localDb,
        remoteDb = db.remoteDb;

    (function (_addCollection) {
        HybridDb.prototype.addCollection = function (name, opt) {
            if (!this.localDb[name]) this.localDb.addCollection(name);

            if (!this.remoteDb[name]) this.remoteDb.addCollection(name, opt);

            return _addCollection.apply(this, arguments);
        };
    })(HybridDb.prototype.addCollection);

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
        utils.createUid = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maXgtbWluaW1vbmdvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQW1Ed0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUZGLFFBQVEsV0FBUjs7SUFBakI7SUFBVTs7QUFDZixJQUFJLFNBQU8sS0FBUDtBQUNXLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBZ0I7QUFDM0IsUUFBRyxNQUFILEVBQ0ksT0FESjtBQUVBLFFBQUksY0FBWSxNQUFJLEtBQUssR0FBTCxFQUFKLENBSFc7O0FBSzNCLFFBQUksVUFBUSxHQUFHLE9BQUg7UUFDUixXQUFTLEdBQUcsUUFBSCxDQU5jOztBQVEzQixLQUFDLFVBQVMsY0FBVCxFQUF3QjtBQUNyQixpQkFBUyxTQUFULENBQW1CLGFBQW5CLEdBQWlDLFVBQVMsSUFBVCxFQUFlLEdBQWYsRUFBbUI7QUFDaEQsZ0JBQUcsQ0FBQyxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQUQsRUFDQyxLQUFLLE9BQUwsQ0FBYSxhQUFiLENBQTJCLElBQTNCLEVBREo7O0FBR0EsZ0JBQUcsQ0FBQyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQUQsRUFDQyxLQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLEVBQWlDLEdBQWpDLEVBREo7O0FBR0EsbUJBQU8sZUFBZSxLQUFmLENBQXFCLElBQXJCLEVBQTBCLFNBQTFCLENBQVAsQ0FQZ0Q7U0FBbkIsQ0FEWjtLQUF4QixDQUFELENBVUcsU0FBUyxTQUFULENBQW1CLGFBQW5CLENBVkgsQ0FSMkI7O0FBb0IzQixLQUFDLFlBQVU7QUFDUCxXQUFHLGFBQUgsQ0FBaUIsV0FBakIsRUFETztBQUVQLFlBQUksbUJBQWlCLEdBQUcsV0FBSCxFQUFnQixXQUFoQjtZQUNqQixrQkFBZ0IsUUFBUSxXQUFSLEVBQXFCLFdBQXJCO1lBQ2hCLG1CQUFpQixTQUFTLFdBQVQsRUFBc0IsV0FBdEIsQ0FKZDs7QUFNUCx5QkFB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ekIsdUNBSHlCOzZCQUE3Qjs7QUFNQSxvQ0FBUSxJQUFSLEVBUlk7eUJBQVIsRUFTTixLQVRGLEVBRDJCO3FCQUF4QjtpQkFEWCxDQVJ5RDthQUE3QixDQUZwQjtTQUFkLENBQUQsQ0F5QkUsaUJBQWlCLFNBQWpCLENBQTJCLElBQTNCLENBekJGLENBakRNOztBQTRFUCxTQUFDLFVBQVMsSUFBVCxFQUFjOztBQUNYLDZCQUFpQixTQUFqQixDQUEyQixJQUEzQixHQUFnQyxVQUFTLFFBQVQsRUFBNkI7b0JBQVgsZ0VBQVEsa0JBQUc7O0FBQ3pELG9CQUFJLFVBQVEsS0FBSyxJQUFMLENBQVUsSUFBVixFQUFlLFFBQWYsRUFBd0IsT0FBeEIsRUFBaUMsS0FBakMsQ0FENkM7QUFFekQsdUJBQU87QUFDSCwyQkFBTyxlQUFTLE9BQVQsRUFBaUIsS0FBakIsRUFBdUI7QUFDMUIsZ0NBQVEsVUFBQyxJQUFELEVBQVE7QUFDWix1Q0FBVyxRQUFRLE9BQU8sS0FBSyxPQUFMLElBQWUsV0FBdEIsR0FBb0MsS0FBSyxPQUFMLEdBQWUsSUFBbkQsQ0FBbkIsQ0FEWTt5QkFBUixFQUVOLEtBRkYsRUFEMEI7cUJBQXZCO2lCQURYLENBRnlEO2FBQTdCLENBRHJCO1NBQWQsQ0FBRCxDQVdHLGlCQUFpQixTQUFqQixDQUEyQixJQUEzQixDQVhILENBNUVPOztBQXlGUCxXQUFHLGdCQUFILENBQW9CLFdBQXBCLEVBekZPO0FBMEZQLGdCQUFRLGdCQUFSLENBQXlCLFdBQXpCLEVBMUZPO0FBMkZQLGlCQUFTLGdCQUFULENBQTBCLFdBQTFCLEVBM0ZPO0tBQVYsQ0FBRCxHQXBCMkI7QUFpSDNCLGFBQU8sSUFBUCxDQWpIMkI7Q0FBaEIiLCJmaWxlIjoiZml4LW1pbmltb25nby5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuXG5vcHRpb25zOntcbiAgICBjYWNoZUZpbmQodHJ1ZSksXG4gICAgY2FjaGVPbmUodHJ1ZSksXG4gICAgaW50ZXJpbSh0cnVlKSxcbiAgICB1c2VMb2NhbE9uUmVtb3RlRXJyb3IgKG9ubHkgd2hlbiBpbnRlcmltPWZhbHNlKVxuICAgIHNob3J0Y3V0KGZhbHNlKVxufVxuSHlicmlkRGI6e1xuICAgIGFkZENvbGxlY3Rpb24obmFtZSwgb3B0aW9ucywgc3VjY2VzcygpLCBlcnJvcihlcnIpKTogTG9jYWxEQiBhbmQgcmVtb3RlRGIgbXVzdCBhbHJlYWR5IGhhdmUgc2FtZSBuYW1lIGNvbGxlY3Rpb25cbiAgICAgICAgKjEuIGF1dG8gYWRkIHNhbWUgbmFtZSBjb2xsZWN0aW9ucyBvbiBsb2NhbERiLCByZW1vdGVEYiwgYW5kIEh5YnJpZERiXG4gICAgcmVtb3ZlQ29sbGVjdGlvbihuYW1lLHN1Y2Nlc3MoKSk6bm90IHJlbW92ZSBzYW1lIG5hbWUgY29sbGVjdGlvbiBvZiBlaXRoZXIgbG9jYWxDb2wgb3IgcmVtb3RlQ29sXG5cbiAgICB1cGxvYWQoc3VjY2VzcygpLGVycm9yKGVycikpOlxufVxuSHlicmlkRGIuQ29sbGVjdGlvbjp7XG4gICAgdXBzZXJ0KGRvY3MsIGJhc2VzLCBzdWNjZXNzLCBlcnJvcik6aXQgb25seSB1cHNlcnQgb24gbG9jYWxEYlxuICAgICAgICAqIG92ZXJ3cml0ZSBpdCB0byB1cHNlcnQgdG8gcmVtb3RlRGJcbiAgICAgICAgICAgICogdGhlbiBjYWNoZU9uZSBpdFxuICAgIHJlbW92ZShpZCwgc3VjY2VzcywgZXJvcik6aXQgb25seSByZW1vdmVzIG9uIGxvY2FsQ29sXG4gICAgZmluZChzZWxlY3Rvciwgb3B0aW9ucykuZmV0Y2goc3VjY2VzcywgZXJyb3IpOlxuICAgIGZpbmRPbmUoc2VsZWN0b3Isb3B0aW9ucywgc3VjY2VzcywgZXJyb3IpOlxuICAgIHVwbG9hZChzdWNjZXNzLGVycm9yKTpcbn1cblxubG9jYWxEYi5Db2xsZWN0aW9ue1xuICAgIC4uLlxuICAgIHNlZWQoZG9jcyxzdWNjZXNzLCBlcnJvcik6IG5vIHRoZW4gY2FjaGVcbiAgICBjYWNoZU9uZShkb2MsIHN1Y2Nlc3MsIGVycm9yKTogbm8gb3IgXCJjYWNoZWRcIiBvbmx5XG4gICAgY2FjaGUoZG9jcywgc2VsZWN0b3IsIG9wdGlvbnMsIHN1Y2Nlc3MsIGVycm9yKTogc2FtZSB3aXRoIGFib3ZlXG5cbiAgICBwZW5kaW5nVXBzZXJ0cyhzdWNjZXNzLCBlcnJvcik6XG4gICAgcmVzb2x2ZVVwc2VydHMoZG9jcywgc3VjY2VzcywgZXJyb3IpOiBcInVwc2VydGVkXCIgb25seVxuICAgICAgICA+IHNhbWUgd2l0aCB0aGF0IGluIGRiLCB0aGVuIHVwZGF0ZSBzdGF0dXMgb25seSBhcyBcImNhY2hlZFwiXG4gICAgICAgID4gbm90IHNhbWUsIHRoZW4gdXBkYXRlIGJhc2Ugb25seSwgYW5kIHN0YXR1cyBsZWF2ZXMgYXMgXCJ1cHNlcnRlZFwiXG4gICAgcGVuZGluZ1JlbW92ZXMoc3VjY2VzcywgZXJyb3IpOlxuICAgIHJlc29sdmVSZW1vdmUoKTpcbn1cblxuTU9TVCBpbXBvcnRhbnQ6XG5RaWxpIHNlcnZlciBpcyBub3QgZnVsbHkgYWxpZ25lZCB3aXRoIG1pbmltb25nbyBhYm91dFxuOiBJdCBjYW4gYWxzbyBiZSB1c2VkIHdpdGggYSBzaW1wbGUgc2VydmVyIHRoYXQganVzdCBPVkVSV1JJVEUgZG9jdW1lbnRzIENPTVBMRVRFTFkgb24gdXBzZXJ0XG4gICAgPmNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0XG4gICAgPmF1dGhvclxuICAgID5faWRcblxuc28gcWlsaS1hcHAgZG9lc24ndCBzdXBwb3J0IGxvY2FsIHVwc2VydFxuKi9cbnZhciB7SHlicmlkRGIsIHV0aWxzfT1yZXF1aXJlKCdtaW5pbW9uZ28nKVxudmFyIF9maXhlZD1mYWxzZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZml4KGRiKXtcbiAgICBpZihfZml4ZWQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgdGVtcENvbE5hbWU9J18nK0RhdGUubm93KClcblxuICAgIHZhciBsb2NhbERiPWRiLmxvY2FsRGIsXG4gICAgICAgIHJlbW90ZURiPWRiLnJlbW90ZURiO1xuXG4gICAgKGZ1bmN0aW9uKF9hZGRDb2xsZWN0aW9uKXtcbiAgICAgICAgSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb249ZnVuY3Rpb24obmFtZSwgb3B0KXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmxvY2FsRGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbERiLmFkZENvbGxlY3Rpb24obmFtZSlcblxuICAgICAgICAgICAgaWYoIXRoaXMucmVtb3RlRGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVEYi5hZGRDb2xsZWN0aW9uKG5hbWUsb3B0KVxuXG4gICAgICAgICAgICByZXR1cm4gX2FkZENvbGxlY3Rpb24uYXBwbHkodGhpcyxhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICB9KShIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbik7XG5cbiAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgZGIuYWRkQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICAgICAgbGV0IEh5YnJpZENvbGxlY3Rpb249ZGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgTG9jYWxDb2xsZWN0aW9uPWxvY2FsRGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgUmVtb3RlQ29sbGVjdGlvbj1yZW1vdGVEYlt0ZW1wQ29sTmFtZV0uY29uc3RydWN0b3I7XG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUudXBzZXJ0PWZ1bmN0aW9uKGRvYyxiYXNlLHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICAgICAgaWYodHlwZW9mKGJhc2UpPT0nZnVuY3Rpb24nKXtcbiAgICAgICAgICAgICAgICBiYXNlPW51bGxcbiAgICAgICAgICAgICAgICBzdWNjZXNzPWFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgICAgIGVycm9yPWFyZ3VtZW50c1syXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICAgICAgdmFyIGZhaWw9KGUpPT57XG4gICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKGUpXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC51cHNlcnQoZG9jLGJhc2UsKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0PU9iamVjdC5hc3NpZ24oZG9jLHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5jYWNoZU9uZShyZXN1bHQsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzJiZzdWNjZXNzKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICAgICAgfSxmYWlsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm8gY2xpZW50IGlkXG4gICAgICAgIHV0aWxzLmNyZWF0ZVVpZD0oKT0+dW5kZWZpbmVkXG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKGlkLHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWlsPShlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlQ29sLnJlbW92ZShpZCwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5yZXNvbHZlUmVtb3ZlKGlkLCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyYmc3VjY2VzcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS51cGxvYWQ9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHN1cHBvcnQnKVxuICAgICAgICB9XG5cbiAgICAgICAgOyhmdW5jdGlvbihmaW5kKXtcbiAgICAgICAgICAgIC8vZG9uJ3QgY2FsbCBzdWNjZXNzIHdoZW4gbG9jYWwgaW50ZXJpbSBmaW5kIHdpdGhvdXQgcmVzdWx0c1xuICAgICAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZD1mdW5jdGlvbihzZWxlY3RvcixvcHRpb25zPXt9KXtcbiAgICAgICAgICAgICAgICB2YXIgZmluZGVyPWZpbmQuY2FsbCh0aGlzLHNlbGVjdG9yLG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgICAgICBpbnRlcmltPU9iamVjdC5hc3NpZ24oe30sdGhpcy5vcHRpb25zLG9wdGlvbnMpLmludGVyaW1cbiAgICAgICAgICAgICAgICBpZighaW50ZXJpbSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRlclxuXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZGVyLmZldGNoLFxuICAgICAgICAgICAgICAgICAgICB0aW1lPTAsIGNhbGxlZD1mYWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoOiBmdW5jdGlvbihzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyKChkb2NzKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUrK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWU9PTEgJiYgZG9jcy5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0BIQUNLOiBtb2RpZnkgbG9jYWwgRGF0YSB0byBtYWtlIGFsd2F5cyBjYWxsIHN1Y2Nlc3Mgd2l0aCByZW1vdGUgcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3NbMF09e19uZXZlckhhc1RoaXM6dGVtcENvbE5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZG9jcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQpO1xuXG4gICAgICAgIChmdW5jdGlvbihmaW5kKXsvL3FpbGkgc2VydmVyIHJldHVybiB7cmVzdWx0czpbLi4uXX1cbiAgICAgICAgICAgIFJlbW90ZUNvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQ9ZnVuY3Rpb24oc2VsZWN0b3Isb3B0aW9ucz17fSl7XG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZC5jYWxsKHRoaXMsc2VsZWN0b3Isb3B0aW9ucykuZmV0Y2hcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaDogZnVuY3Rpb24oc3VjY2VzcyxlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyKChkYXRhKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2Vzcyh0eXBlb2YoZGF0YS5yZXN1bHRzKSE9J3VuZGVmaW5lZCcgPyBkYXRhLnJlc3VsdHMgOiBkYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoUmVtb3RlQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZCk7XG5cbiAgICAgICAgZGIucmVtb3ZlQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICAgICAgbG9jYWxEYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgICAgICByZW1vdGVEYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgIH0pKCk7XG4gICAgX2ZpeGVkPXRydWVcbn1cbiJdfQ==