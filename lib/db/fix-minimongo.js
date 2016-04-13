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
                            success && success(data && data.results);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maXgtbWluaW1vbmdvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQW1Ed0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQUZGLFFBQVEsV0FBUjs7SUFBakI7SUFBVTs7QUFDZixJQUFJLFNBQU8sS0FBUDtBQUNXLFNBQVMsR0FBVCxDQUFhLEVBQWIsRUFBZ0I7QUFDM0IsUUFBRyxNQUFILEVBQ0ksT0FESjtBQUVBLFFBQUksY0FBWSxNQUFJLEtBQUssR0FBTCxFQUFKLENBSFc7O0FBSzNCLFFBQUksVUFBUSxHQUFHLE9BQUg7UUFDUixXQUFTLEdBQUcsUUFBSCxDQU5jOztBQVEzQixLQUFDLFVBQVMsY0FBVCxFQUF3QjtBQUNyQixpQkFBUyxTQUFULENBQW1CLGFBQW5CLEdBQWlDLFVBQVMsSUFBVCxFQUFlLEdBQWYsRUFBbUI7QUFDaEQsZ0JBQUcsQ0FBQyxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQUQsRUFDQyxLQUFLLE9BQUwsQ0FBYSxhQUFiLENBQTJCLElBQTNCLEVBREo7O0FBR0EsZ0JBQUcsQ0FBQyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQUQsRUFDQyxLQUFLLFFBQUwsQ0FBYyxhQUFkLENBQTRCLElBQTVCLEVBQWlDLEdBQWpDLEVBREo7O0FBR0EsbUJBQU8sZUFBZSxLQUFmLENBQXFCLElBQXJCLEVBQTBCLFNBQTFCLENBQVAsQ0FQZ0Q7U0FBbkIsQ0FEWjtLQUF4QixDQUFELENBVUcsU0FBUyxTQUFULENBQW1CLGFBQW5CLENBVkgsQ0FSMkI7O0FBb0IzQixLQUFDLFlBQVU7QUFDUCxXQUFHLGFBQUgsQ0FBaUIsV0FBakIsRUFETztBQUVQLFlBQUksbUJBQWlCLEdBQUcsV0FBSCxFQUFnQixXQUFoQjtZQUNqQixrQkFBZ0IsUUFBUSxXQUFSLEVBQXFCLFdBQXJCO1lBQ2hCLG1CQUFpQixTQUFTLFdBQVQsRUFBc0IsV0FBdEIsQ0FKZDs7QUFNUCx5QkFB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ekIsdUNBSHlCOzZCQUE3Qjs7QUFNQSxvQ0FBUSxJQUFSLEVBUlk7eUJBQVIsRUFTTixLQVRGLEVBRDJCO3FCQUF4QjtpQkFEWCxDQVJ5RDthQUE3QixDQUZwQjtTQUFkLENBQUQsQ0F5QkUsaUJBQWlCLFNBQWpCLENBQTJCLElBQTNCLENBekJGLENBakRNOztBQTRFUCxTQUFDLFVBQVMsSUFBVCxFQUFjOztBQUNYLDZCQUFpQixTQUFqQixDQUEyQixJQUEzQixHQUFnQyxVQUFTLFFBQVQsRUFBNkI7b0JBQVgsZ0VBQVEsa0JBQUc7O0FBQ3pELG9CQUFJLFVBQVEsS0FBSyxJQUFMLENBQVUsSUFBVixFQUFlLFFBQWYsRUFBd0IsT0FBeEIsRUFBaUMsS0FBakMsQ0FENkM7QUFFekQsdUJBQU87QUFDSCwyQkFBTyxlQUFTLE9BQVQsRUFBaUIsS0FBakIsRUFBdUI7QUFDMUIsZ0NBQVEsVUFBQyxJQUFELEVBQVE7QUFDWix1Q0FBVyxRQUFRLFFBQVEsS0FBSyxPQUFMLENBQTNCLENBRFk7eUJBQVIsRUFFTixLQUZGLEVBRDBCO3FCQUF2QjtpQkFEWCxDQUZ5RDthQUE3QixDQURyQjtTQUFkLENBQUQsQ0FXRyxpQkFBaUIsU0FBakIsQ0FBMkIsSUFBM0IsQ0FYSCxDQTVFTzs7QUF5RlAsV0FBRyxnQkFBSCxDQUFvQixXQUFwQixFQXpGTztBQTBGUCxnQkFBUSxnQkFBUixDQUF5QixXQUF6QixFQTFGTztBQTJGUCxpQkFBUyxnQkFBVCxDQUEwQixXQUExQixFQTNGTztLQUFWLENBQUQsR0FwQjJCO0FBaUgzQixhQUFPLElBQVAsQ0FqSDJCO0NBQWhCIiwiZmlsZSI6ImZpeC1taW5pbW9uZ28uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcblxub3B0aW9uczp7XG4gICAgY2FjaGVGaW5kKHRydWUpLFxuICAgIGNhY2hlT25lKHRydWUpLFxuICAgIGludGVyaW0odHJ1ZSksXG4gICAgdXNlTG9jYWxPblJlbW90ZUVycm9yIChvbmx5IHdoZW4gaW50ZXJpbT1mYWxzZSlcbiAgICBzaG9ydGN1dChmYWxzZSlcbn1cbkh5YnJpZERiOntcbiAgICBhZGRDb2xsZWN0aW9uKG5hbWUsIG9wdGlvbnMsIHN1Y2Nlc3MoKSwgZXJyb3IoZXJyKSk6IExvY2FsREIgYW5kIHJlbW90ZURiIG11c3QgYWxyZWFkeSBoYXZlIHNhbWUgbmFtZSBjb2xsZWN0aW9uXG4gICAgICAgICoxLiBhdXRvIGFkZCBzYW1lIG5hbWUgY29sbGVjdGlvbnMgb24gbG9jYWxEYiwgcmVtb3RlRGIsIGFuZCBIeWJyaWREYlxuICAgIHJlbW92ZUNvbGxlY3Rpb24obmFtZSxzdWNjZXNzKCkpOm5vdCByZW1vdmUgc2FtZSBuYW1lIGNvbGxlY3Rpb24gb2YgZWl0aGVyIGxvY2FsQ29sIG9yIHJlbW90ZUNvbFxuXG4gICAgdXBsb2FkKHN1Y2Nlc3MoKSxlcnJvcihlcnIpKTpcbn1cbkh5YnJpZERiLkNvbGxlY3Rpb246e1xuICAgIHVwc2VydChkb2NzLCBiYXNlcywgc3VjY2VzcywgZXJyb3IpOml0IG9ubHkgdXBzZXJ0IG9uIGxvY2FsRGJcbiAgICAgICAgKiBvdmVyd3JpdGUgaXQgdG8gdXBzZXJ0IHRvIHJlbW90ZURiXG4gICAgICAgICAgICAqIHRoZW4gY2FjaGVPbmUgaXRcbiAgICByZW1vdmUoaWQsIHN1Y2Nlc3MsIGVyb3IpOml0IG9ubHkgcmVtb3ZlcyBvbiBsb2NhbENvbFxuICAgIGZpbmQoc2VsZWN0b3IsIG9wdGlvbnMpLmZldGNoKHN1Y2Nlc3MsIGVycm9yKTpcbiAgICBmaW5kT25lKHNlbGVjdG9yLG9wdGlvbnMsIHN1Y2Nlc3MsIGVycm9yKTpcbiAgICB1cGxvYWQoc3VjY2VzcyxlcnJvcik6XG59XG5cbmxvY2FsRGIuQ29sbGVjdGlvbntcbiAgICAuLi5cbiAgICBzZWVkKGRvY3Msc3VjY2VzcywgZXJyb3IpOiBubyB0aGVuIGNhY2hlXG4gICAgY2FjaGVPbmUoZG9jLCBzdWNjZXNzLCBlcnJvcik6IG5vIG9yIFwiY2FjaGVkXCIgb25seVxuICAgIGNhY2hlKGRvY3MsIHNlbGVjdG9yLCBvcHRpb25zLCBzdWNjZXNzLCBlcnJvcik6IHNhbWUgd2l0aCBhYm92ZVxuXG4gICAgcGVuZGluZ1Vwc2VydHMoc3VjY2VzcywgZXJyb3IpOlxuICAgIHJlc29sdmVVcHNlcnRzKGRvY3MsIHN1Y2Nlc3MsIGVycm9yKTogXCJ1cHNlcnRlZFwiIG9ubHlcbiAgICAgICAgPiBzYW1lIHdpdGggdGhhdCBpbiBkYiwgdGhlbiB1cGRhdGUgc3RhdHVzIG9ubHkgYXMgXCJjYWNoZWRcIlxuICAgICAgICA+IG5vdCBzYW1lLCB0aGVuIHVwZGF0ZSBiYXNlIG9ubHksIGFuZCBzdGF0dXMgbGVhdmVzIGFzIFwidXBzZXJ0ZWRcIlxuICAgIHBlbmRpbmdSZW1vdmVzKHN1Y2Nlc3MsIGVycm9yKTpcbiAgICByZXNvbHZlUmVtb3ZlKCk6XG59XG5cbk1PU1QgaW1wb3J0YW50OlxuUWlsaSBzZXJ2ZXIgaXMgbm90IGZ1bGx5IGFsaWduZWQgd2l0aCBtaW5pbW9uZ28gYWJvdXRcbjogSXQgY2FuIGFsc28gYmUgdXNlZCB3aXRoIGEgc2ltcGxlIHNlcnZlciB0aGF0IGp1c3QgT1ZFUldSSVRFIGRvY3VtZW50cyBDT01QTEVURUxZIG9uIHVwc2VydFxuICAgID5jcmVhdGVkQXQgYW5kIHVwZGF0ZWRBdFxuICAgID5hdXRob3JcbiAgICA+X2lkXG5cbnNvIHFpbGktYXBwIGRvZXNuJ3Qgc3VwcG9ydCBsb2NhbCB1cHNlcnRcbiovXG52YXIge0h5YnJpZERiLCB1dGlsc309cmVxdWlyZSgnbWluaW1vbmdvJylcbnZhciBfZml4ZWQ9ZmFsc2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpeChkYil7XG4gICAgaWYoX2ZpeGVkKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIHRlbXBDb2xOYW1lPSdfJytEYXRlLm5vdygpXG5cbiAgICB2YXIgbG9jYWxEYj1kYi5sb2NhbERiLFxuICAgICAgICByZW1vdGVEYj1kYi5yZW1vdGVEYjtcblxuICAgIChmdW5jdGlvbihfYWRkQ29sbGVjdGlvbil7XG4gICAgICAgIEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uPWZ1bmN0aW9uKG5hbWUsIG9wdCl7XG4gICAgICAgICAgICBpZighdGhpcy5sb2NhbERiW25hbWVdKVxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxEYi5hZGRDb2xsZWN0aW9uKG5hbWUpXG5cbiAgICAgICAgICAgIGlmKCF0aGlzLnJlbW90ZURiW25hbWVdKVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlRGIuYWRkQ29sbGVjdGlvbihuYW1lLG9wdClcblxuICAgICAgICAgICAgcmV0dXJuIF9hZGRDb2xsZWN0aW9uLmFwcGx5KHRoaXMsYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgfSkoSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb24pO1xuXG4gICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgIGRiLmFkZENvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgICAgIGxldCBIeWJyaWRDb2xsZWN0aW9uPWRiW3RlbXBDb2xOYW1lXS5jb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIExvY2FsQ29sbGVjdGlvbj1sb2NhbERiW3RlbXBDb2xOYW1lXS5jb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIFJlbW90ZUNvbGxlY3Rpb249cmVtb3RlRGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yO1xuXG4gICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLnVwc2VydD1mdW5jdGlvbihkb2MsYmFzZSxzdWNjZXNzLGVycm9yKXtcbiAgICAgICAgICAgIGlmKHR5cGVvZihiYXNlKT09J2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICAgICAgYmFzZT1udWxsXG4gICAgICAgICAgICAgICAgc3VjY2Vzcz1hcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgICBlcnJvcj1hcmd1bWVudHNbMl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgIHZhciBmYWlsPShlKT0+e1xuICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihlKVxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVDb2wudXBzZXJ0KGRvYyxiYXNlLChyZXN1bHQpPT57XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdD1PYmplY3QuYXNzaWduKGRvYyxyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxDb2wuY2FjaGVPbmUocmVzdWx0LCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyYmc3VjY2VzcyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgfSxmYWlsKVxuICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICAvL25vIGNsaWVudCBpZFxuICAgICAgICB1dGlscy5jcmVhdGVVaWQ9KCk9PnVuZGVmaW5lZFxuXG4gICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZT1mdW5jdGlvbihpZCxzdWNjZXNzLGVycm9yKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbD0oZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKGUpXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC5yZW1vdmUoaWQsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxDb2wucmVzb2x2ZVJlbW92ZShpZCwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MmJnN1Y2Nlc3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxmYWlsKVxuICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUudXBsb2FkPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBzdXBwb3J0JylcbiAgICAgICAgfVxuXG4gICAgICAgIDsoZnVuY3Rpb24oZmluZCl7XG4gICAgICAgICAgICAvL2Rvbid0IGNhbGwgc3VjY2VzcyB3aGVuIGxvY2FsIGludGVyaW0gZmluZCB3aXRob3V0IHJlc3VsdHNcbiAgICAgICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQ9ZnVuY3Rpb24oc2VsZWN0b3Isb3B0aW9ucz17fSl7XG4gICAgICAgICAgICAgICAgdmFyIGZpbmRlcj1maW5kLmNhbGwodGhpcyxzZWxlY3RvcixvcHRpb25zKSxcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJpbT1PYmplY3QuYXNzaWduKHt9LHRoaXMub3B0aW9ucyxvcHRpb25zKS5pbnRlcmltXG4gICAgICAgICAgICAgICAgaWYoIWludGVyaW0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5kZXJcblxuICAgICAgICAgICAgICAgIHZhciBmZXRjaGVyPWZpbmRlci5mZXRjaCxcbiAgICAgICAgICAgICAgICAgICAgdGltZT0wLCBjYWxsZWQ9ZmFsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaDogZnVuY3Rpb24oc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hlcigoZG9jcyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lKytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aW1lPT0xICYmIGRvY3MubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ASEFDSzogbW9kaWZ5IGxvY2FsIERhdGEgdG8gbWFrZSBhbHdheXMgY2FsbCBzdWNjZXNzIHdpdGggcmVtb3RlIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NzWzBdPXtfbmV2ZXJIYXNUaGlzOnRlbXBDb2xOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKGRvY3MpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KShIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kKTtcblxuICAgICAgICAoZnVuY3Rpb24oZmluZCl7Ly9xaWxpIHNlcnZlciByZXR1cm4ge3Jlc3VsdHM6Wy4uLl19XG4gICAgICAgICAgICBSZW1vdGVDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kPWZ1bmN0aW9uKHNlbGVjdG9yLG9wdGlvbnM9e30pe1xuICAgICAgICAgICAgICAgIHZhciBmZXRjaGVyPWZpbmQuY2FsbCh0aGlzLHNlbGVjdG9yLG9wdGlvbnMpLmZldGNoXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uKHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hlcigoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MoZGF0YSAmJiBkYXRhLnJlc3VsdHMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KShSZW1vdGVDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kKTtcblxuICAgICAgICBkYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgICAgICBsb2NhbERiLnJlbW92ZUNvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgICAgIHJlbW90ZURiLnJlbW92ZUNvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgfSkoKTtcbiAgICBfZml4ZWQ9dHJ1ZVxufVxuIl19