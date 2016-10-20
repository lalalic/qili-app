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
                    if (Array.isArray(doc)) {
                        _this.localCol.cache(result, { _id: "neverRemoveFromCache when upserting" }, null, function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maXgtbWluaW1vbmdvLmpzIl0sIm5hbWVzIjpbImZpeCIsIl9maXhlZCIsImRiIiwidGVtcENvbE5hbWUiLCJEYXRlIiwibm93IiwibG9jYWxEYiIsInJlbW90ZURiIiwiX2FkZENvbGxlY3Rpb24iLCJwcm90b3R5cGUiLCJhZGRDb2xsZWN0aW9uIiwibmFtZSIsIm9wdCIsImFwcGx5IiwiYXJndW1lbnRzIiwiSHlicmlkQ29sbGVjdGlvbiIsImNvbnN0cnVjdG9yIiwiTG9jYWxDb2xsZWN0aW9uIiwiUmVtb3RlQ29sbGVjdGlvbiIsInVwc2VydCIsImRvYyIsImJhc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZhaWwiLCJlIiwicmVtb3RlQ29sIiwiQXJyYXkiLCJpc0FycmF5IiwibG9jYWxDb2wiLCJjYWNoZSIsInJlc3VsdCIsIl9pZCIsIk9iamVjdCIsImFzc2lnbiIsImNhY2hlT25lIiwiY3JlYXRlVWlkIiwidW5kZWZpbmVkIiwicmVtb3ZlIiwiaWQiLCJyZXNvbHZlUmVtb3ZlIiwidXBsb2FkIiwiRXJyb3IiLCJmaW5kIiwic2VsZWN0b3IiLCJvcHRpb25zIiwiZmluZGVyIiwiY2FsbCIsImludGVyaW0iLCJmZXRjaGVyIiwiZmV0Y2giLCJ0aW1lIiwiY2FsbGVkIiwiZG9jcyIsImxlbmd0aCIsIl9uZXZlckhhc1RoaXMiLCJkYXRhIiwicmVzdWx0cyIsInJlbW92ZUNvbGxlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7O2tCQW9Ed0JBLEc7O0FBSHhCOztBQUVBLElBQUlDLFNBQU8sS0FBWCxDLENBbkRBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0RlLFNBQVNELEdBQVQsQ0FBYUUsRUFBYixFQUFnQjtBQUMzQixRQUFHRCxNQUFILEVBQ0k7QUFDSixRQUFJRSxjQUFZLE1BQUlDLEtBQUtDLEdBQUwsRUFBcEI7O0FBRUEsUUFB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QixvQ0FBUWtDLElBQVI7QUFDSCx5QkFURCxFQVNFakMsS0FURjtBQVVIO0FBWkUsaUJBQVA7QUFjSCxhQXRCRDtBQXVCSCxTQXpCQSxFQXlCRVIsaUJBQWlCTixTQUFqQixDQUEyQnFDLElBekI3Qjs7QUEyQkQsU0FBQyxVQUFTQSxJQUFULEVBQWM7QUFBQztBQUNaNUIsNkJBQWlCVCxTQUFqQixDQUEyQnFDLElBQTNCLEdBQWdDLFVBQVNDLFFBQVQsRUFBNkI7QUFBQSxvQkFBWEMsT0FBVyx1RUFBSCxFQUFHOztBQUN6RCxvQkFBSUksVUFBUU4sS0FBS0ksSUFBTCxDQUFVLElBQVYsRUFBZUgsUUFBZixFQUF3QkMsT0FBeEIsRUFBaUNLLEtBQTdDO0FBQ0EsdUJBQU87QUFDSEEsMkJBQU8sZUFBUy9CLE9BQVQsRUFBaUJDLEtBQWpCLEVBQXVCO0FBQzFCNkIsZ0NBQVEsZ0JBQU07QUFDL0IsZ0NBQUc5QixPQUFILEVBQVc7QUFDVkEsd0NBQVEsT0FBT3FDLEtBQUtDLE9BQVosSUFBc0IsV0FBdEIsR0FBb0NELEtBQUtDLE9BQXpDLEdBQW9EOUIsTUFBTUMsT0FBTixDQUFjNEIsSUFBZCxJQUFzQkEsSUFBdEIsR0FBNkIsQ0FBQ0EsSUFBRCxDQUF6RjtBQUNBO0FBQ2lCLHlCQUpELEVBSUVwQyxLQUpGO0FBS0g7QUFQRSxpQkFBUDtBQVNILGFBWEQ7QUFZSCxTQWJELEVBYUdMLGlCQUFpQlQsU0FBakIsQ0FBMkJxQyxJQWI5Qjs7QUFlQTVDLFdBQUcyRCxnQkFBSCxDQUFvQjFELFdBQXBCO0FBQ0FHLGdCQUFRdUQsZ0JBQVIsQ0FBeUIxRCxXQUF6QjtBQUNBSSxpQkFBU3NELGdCQUFULENBQTBCMUQsV0FBMUI7QUFDSCxLQXJHRDtBQXNHQUYsYUFBTyxJQUFQO0FBQ0giLCJmaWxlIjoiZml4LW1pbmltb25nby5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuXG5vcHRpb25zOntcbiAgICBjYWNoZUZpbmQodHJ1ZSksXG4gICAgY2FjaGVPbmUodHJ1ZSksXG4gICAgaW50ZXJpbSh0cnVlKSxcbiAgICB1c2VMb2NhbE9uUmVtb3RlRXJyb3IgKG9ubHkgd2hlbiBpbnRlcmltPWZhbHNlKVxuICAgIHNob3J0Y3V0KGZhbHNlKVxufVxuSHlicmlkRGI6e1xuICAgIGFkZENvbGxlY3Rpb24obmFtZSwgb3B0aW9ucywgc3VjY2VzcygpLCBlcnJvcihlcnIpKTogTG9jYWxEQiBhbmQgcmVtb3RlRGIgbXVzdCBhbHJlYWR5IGhhdmUgc2FtZSBuYW1lIGNvbGxlY3Rpb25cbiAgICAgICAgKjEuIGF1dG8gYWRkIHNhbWUgbmFtZSBjb2xsZWN0aW9ucyBvbiBsb2NhbERiLCByZW1vdGVEYiwgYW5kIEh5YnJpZERiXG4gICAgcmVtb3ZlQ29sbGVjdGlvbihuYW1lLHN1Y2Nlc3MoKSk6bm90IHJlbW92ZSBzYW1lIG5hbWUgY29sbGVjdGlvbiBvZiBlaXRoZXIgbG9jYWxDb2wgb3IgcmVtb3RlQ29sXG5cbiAgICB1cGxvYWQoc3VjY2VzcygpLGVycm9yKGVycikpOlxufVxuSHlicmlkRGIuQ29sbGVjdGlvbjp7XG4gICAgdXBzZXJ0KGRvY3MsIGJhc2VzLCBzdWNjZXNzLCBlcnJvcik6aXQgb25seSB1cHNlcnQgb24gbG9jYWxEYlxuICAgICAgICAqIG92ZXJ3cml0ZSBpdCB0byB1cHNlcnQgdG8gcmVtb3RlRGJcbiAgICAgICAgICAgICogdGhlbiBjYWNoZU9uZSBpdFxuICAgIHJlbW92ZShpZCwgc3VjY2VzcywgZXJvcik6aXQgb25seSByZW1vdmVzIG9uIGxvY2FsQ29sXG4gICAgZmluZChzZWxlY3Rvciwgb3B0aW9ucykuZmV0Y2goc3VjY2VzcywgZXJyb3IpOlxuICAgIGZpbmRPbmUoc2VsZWN0b3Isb3B0aW9ucywgc3VjY2VzcywgZXJyb3IpOlxuICAgIHVwbG9hZChzdWNjZXNzLGVycm9yKTpcbn1cblxubG9jYWxEYi5Db2xsZWN0aW9ue1xuICAgIC4uLlxuICAgIHNlZWQoZG9jcyxzdWNjZXNzLCBlcnJvcik6IG5vIHRoZW4gY2FjaGVcbiAgICBjYWNoZU9uZShkb2MsIHN1Y2Nlc3MsIGVycm9yKTogbm8gb3IgXCJjYWNoZWRcIiBvbmx5XG4gICAgY2FjaGUoZG9jcywgc2VsZWN0b3IsIG9wdGlvbnMsIHN1Y2Nlc3MsIGVycm9yKTogc2FtZSB3aXRoIGFib3ZlXG5cbiAgICBwZW5kaW5nVXBzZXJ0cyhzdWNjZXNzLCBlcnJvcik6XG4gICAgcmVzb2x2ZVVwc2VydHMoZG9jcywgc3VjY2VzcywgZXJyb3IpOiBcInVwc2VydGVkXCIgb25seVxuICAgICAgICA+IHNhbWUgd2l0aCB0aGF0IGluIGRiLCB0aGVuIHVwZGF0ZSBzdGF0dXMgb25seSBhcyBcImNhY2hlZFwiXG4gICAgICAgID4gbm90IHNhbWUsIHRoZW4gdXBkYXRlIGJhc2Ugb25seSwgYW5kIHN0YXR1cyBsZWF2ZXMgYXMgXCJ1cHNlcnRlZFwiXG4gICAgcGVuZGluZ1JlbW92ZXMoc3VjY2VzcywgZXJyb3IpOlxuICAgIHJlc29sdmVSZW1vdmUoKTpcbn1cblxuTU9TVCBpbXBvcnRhbnQ6XG5RaWxpIHNlcnZlciBpcyBub3QgZnVsbHkgYWxpZ25lZCB3aXRoIG1pbmltb25nbyBhYm91dFxuOiBJdCBjYW4gYWxzbyBiZSB1c2VkIHdpdGggYSBzaW1wbGUgc2VydmVyIHRoYXQganVzdCBPVkVSV1JJVEUgZG9jdW1lbnRzIENPTVBMRVRFTFkgb24gdXBzZXJ0XG4gICAgPmNyZWF0ZWRBdCBhbmQgdXBkYXRlZEF0XG4gICAgPmF1dGhvclxuICAgID5faWRcblxuc28gcWlsaS1hcHAgZG9lc24ndCBzdXBwb3J0IGxvY2FsIHVwc2VydFxuKi9cbmltcG9ydCB7SHlicmlkRGIsIHV0aWxzfSBmcm9tICdtaW5pbW9uZ28nXG5cbnZhciBfZml4ZWQ9ZmFsc2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpeChkYil7XG4gICAgaWYoX2ZpeGVkKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIHRlbXBDb2xOYW1lPSdfJytEYXRlLm5vdygpXG5cbiAgICB2YXIgbG9jYWxEYj1kYi5sb2NhbERiLFxuICAgICAgICByZW1vdGVEYj1kYi5yZW1vdGVEYjtcblxuICAgIChmdW5jdGlvbihfYWRkQ29sbGVjdGlvbil7XG4gICAgICAgIEh5YnJpZERiLnByb3RvdHlwZS5hZGRDb2xsZWN0aW9uPWZ1bmN0aW9uKG5hbWUsIG9wdCl7XG4gICAgICAgICAgICBpZighdGhpcy5sb2NhbERiW25hbWVdKVxuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxEYi5hZGRDb2xsZWN0aW9uKG5hbWUpXG5cbiAgICAgICAgICAgIGlmKCF0aGlzLnJlbW90ZURiW25hbWVdKVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlRGIuYWRkQ29sbGVjdGlvbihuYW1lLG9wdClcblxuICAgICAgICAgICAgcmV0dXJuIF9hZGRDb2xsZWN0aW9uLmFwcGx5KHRoaXMsYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgfSkoSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb24pO1xuXG4gICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgIGRiLmFkZENvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgICAgIGxldCBIeWJyaWRDb2xsZWN0aW9uPWRiW3RlbXBDb2xOYW1lXS5jb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIExvY2FsQ29sbGVjdGlvbj1sb2NhbERiW3RlbXBDb2xOYW1lXS5jb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIFJlbW90ZUNvbGxlY3Rpb249cmVtb3RlRGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yO1xuXG4gICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLnVwc2VydD1mdW5jdGlvbihkb2MsYmFzZSxzdWNjZXNzLGVycm9yKXtcbiAgICAgICAgICAgIGlmKHR5cGVvZihiYXNlKT09J2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICAgICAgYmFzZT1udWxsXG4gICAgICAgICAgICAgICAgc3VjY2Vzcz1hcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgICBlcnJvcj1hcmd1bWVudHNbMl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgIHZhciBmYWlsPShlKT0+e1xuICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihlKVxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVDb2wudXBzZXJ0KGRvYyxiYXNlLHJlc3VsdD0+e1xuICAgICAgICAgICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KGRvYykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5jYWNoZShyZXN1bHQse19pZDpcIm5ldmVyUmVtb3ZlRnJvbUNhY2hlIHdoZW4gdXBzZXJ0aW5nXCJ9LG51bGwsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ9T2JqZWN0LmFzc2lnbihkb2MscmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5jYWNoZU9uZShyZXN1bHQsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyYmc3VjY2VzcyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy9ubyBjbGllbnQgaWRcbiAgICAgICAgdXRpbHMuY3JlYXRlVWlkPSgpPT51bmRlZmluZWRcblxuICAgICAgICBIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oaWQsc3VjY2VzcyxlcnJvcil7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZhaWw9KGUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihlKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVDb2wucmVtb3ZlKGlkLCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsQ29sLnJlc29sdmVSZW1vdmUoaWQsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzJiZzdWNjZXNzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgICAgICAgICAgfSxmYWlsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLnVwbG9hZD1mdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3Qgc3VwcG9ydCcpXG4gICAgICAgIH1cblxuICAgICAgICA7KGZ1bmN0aW9uKGZpbmQpe1xuICAgICAgICAgICAgLy9kb24ndCBjYWxsIHN1Y2Nlc3Mgd2hlbiBsb2NhbCBpbnRlcmltIGZpbmQgd2l0aG91dCByZXN1bHRzXG4gICAgICAgICAgICBIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kPWZ1bmN0aW9uKHNlbGVjdG9yLG9wdGlvbnM9e30pe1xuICAgICAgICAgICAgICAgIHZhciBmaW5kZXI9ZmluZC5jYWxsKHRoaXMsc2VsZWN0b3Isb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgICAgIGludGVyaW09T2JqZWN0LmFzc2lnbih7fSx0aGlzLm9wdGlvbnMsb3B0aW9ucykuaW50ZXJpbVxuICAgICAgICAgICAgICAgIGlmKCFpbnRlcmltKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluZGVyXG5cbiAgICAgICAgICAgICAgICB2YXIgZmV0Y2hlcj1maW5kZXIuZmV0Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRpbWU9MCwgY2FsbGVkPWZhbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uKHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoZXIoKGRvY3MpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZSsrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGltZT09MSAmJiBkb2NzLmxlbmd0aD09MCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQEhBQ0s6IG1vZGlmeSBsb2NhbCBEYXRhIHRvIG1ha2UgYWx3YXlzIGNhbGwgc3VjY2VzcyB3aXRoIHJlbW90ZSByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jc1swXT17X25ldmVySGFzVGhpczp0ZW1wQ29sTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzcyhkb2NzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZCk7XG5cbiAgICAgICAgKGZ1bmN0aW9uKGZpbmQpey8vcWlsaSBzZXJ2ZXIgcmV0dXJuIHtyZXN1bHRzOlsuLi5dfVxuICAgICAgICAgICAgUmVtb3RlQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZD1mdW5jdGlvbihzZWxlY3RvcixvcHRpb25zPXt9KXtcbiAgICAgICAgICAgICAgICB2YXIgZmV0Y2hlcj1maW5kLmNhbGwodGhpcyxzZWxlY3RvcixvcHRpb25zKS5mZXRjaFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoOiBmdW5jdGlvbihzdWNjZXNzLGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoZXIoZGF0YT0+e1xuXHRcdFx0XHRcdFx0XHRpZihzdWNjZXNzKXtcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzKHR5cGVvZihkYXRhLnJlc3VsdHMpIT0ndW5kZWZpbmVkJyA/IGRhdGEucmVzdWx0cyA6IChBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXSkpXG5cdFx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKFJlbW90ZUNvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQpO1xuXG4gICAgICAgIGRiLnJlbW92ZUNvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgICAgIGxvY2FsRGIucmVtb3ZlQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICAgICAgcmVtb3RlRGIucmVtb3ZlQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICB9KSgpO1xuICAgIF9maXhlZD10cnVlXG59XG4iXX0=