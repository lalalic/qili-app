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
                    _this.httpclient("POST", _this.url, params, doc, function (n) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maXgtbWluaW1vbmdvLmpzIl0sIm5hbWVzIjpbImZpeCIsIl9maXhlZCIsImRiIiwidGVtcENvbE5hbWUiLCJEYXRlIiwibm93IiwibG9jYWxEYiIsInJlbW90ZURiIiwiX2FkZENvbGxlY3Rpb24iLCJwcm90b3R5cGUiLCJhZGRDb2xsZWN0aW9uIiwibmFtZSIsIm9wdCIsImFwcGx5IiwiYXJndW1lbnRzIiwiSHlicmlkQ29sbGVjdGlvbiIsImNvbnN0cnVjdG9yIiwiTG9jYWxDb2xsZWN0aW9uIiwiUmVtb3RlQ29sbGVjdGlvbiIsInVwc2VydCIsImRvYyIsImJhc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJiYXRjaE1vZGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZhaWwiLCJlIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uc29sZSIsIndhcm4iLCJwYXJhbXMiLCJjbGllbnQiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJfIiwiZ2V0VGltZSIsImh0dHBjbGllbnQiLCJ1cmwiLCJuIiwicmVtb3RlQ29sIiwibG9jYWxDb2wiLCJjYWNoZSIsInJlc3VsdCIsIl9pZCIsIk9iamVjdCIsImFzc2lnbiIsImNhY2hlT25lIiwiY3JlYXRlVWlkIiwidW5kZWZpbmVkIiwicmVtb3ZlIiwiaWQiLCJyZXNvbHZlUmVtb3ZlIiwidXBsb2FkIiwiRXJyb3IiLCJmaW5kIiwic2VsZWN0b3IiLCJvcHRpb25zIiwiZmluZGVyIiwiY2FsbCIsImludGVyaW0iLCJmZXRjaGVyIiwiZmV0Y2giLCJ0aW1lIiwiY2FsbGVkIiwiZG9jcyIsImxlbmd0aCIsIl9uZXZlckhhc1RoaXMiLCJkYXRhIiwicmVzdWx0cyIsInJlbW92ZUNvbGxlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7O2tCQW9Ed0JBLEc7O0FBSHhCOztBQUVBLElBQUlDLFNBQU8sS0FBWCxDLENBbkRBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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Z0MsVUFBU0MsUUFBVCxFQUE2QjtBQUFBLG9CQUFYQyxPQUFXLHVFQUFILEVBQUc7O0FBQ3pELG9CQUFJSSxVQUFRTixLQUFLSSxJQUFMLENBQVUsSUFBVixFQUFlSCxRQUFmLEVBQXdCQyxPQUF4QixFQUFpQ0ssS0FBN0M7QUFDQSx1QkFBTztBQUNIQSwyQkFBTyxlQUFTN0MsT0FBVCxFQUFpQkMsS0FBakIsRUFBdUI7QUFDMUIyQyxnQ0FBUSxnQkFBTTtBQUMvQixnQ0FBRzVDLE9BQUgsRUFBVztBQUNWQSx3Q0FBUSxPQUFPbUQsS0FBS0MsT0FBWixJQUFzQixXQUF0QixHQUFvQ0QsS0FBS0MsT0FBekMsR0FBb0Q1QyxNQUFNQyxPQUFOLENBQWMwQyxJQUFkLElBQXNCQSxJQUF0QixHQUE2QixDQUFDQSxJQUFELENBQXpGO0FBQ0E7QUFDaUIseUJBSkQsRUFJRWxELEtBSkY7QUFLSDtBQVBFLGlCQUFQO0FBU0gsYUFYRDtBQVlILFNBYkQsRUFhR0wsaUJBQWlCVCxTQUFqQixDQUEyQm1ELElBYjlCOztBQWVBMUQsV0FBR3lFLGdCQUFILENBQW9CeEUsV0FBcEI7QUFDQUcsZ0JBQVFxRSxnQkFBUixDQUF5QnhFLFdBQXpCO0FBQ0FJLGlCQUFTb0UsZ0JBQVQsQ0FBMEJ4RSxXQUExQjtBQUNILEtBeEhEO0FBeUhBRixhQUFPLElBQVA7QUFDSCIsImZpbGUiOiJmaXgtbWluaW1vbmdvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG5cbm9wdGlvbnM6e1xuICAgIGNhY2hlRmluZCh0cnVlKSxcbiAgICBjYWNoZU9uZSh0cnVlKSxcbiAgICBpbnRlcmltKHRydWUpLFxuICAgIHVzZUxvY2FsT25SZW1vdGVFcnJvciAob25seSB3aGVuIGludGVyaW09ZmFsc2UpXG4gICAgc2hvcnRjdXQoZmFsc2UpXG59XG5IeWJyaWREYjp7XG4gICAgYWRkQ29sbGVjdGlvbihuYW1lLCBvcHRpb25zLCBzdWNjZXNzKCksIGVycm9yKGVycikpOiBMb2NhbERCIGFuZCByZW1vdGVEYiBtdXN0IGFscmVhZHkgaGF2ZSBzYW1lIG5hbWUgY29sbGVjdGlvblxuICAgICAgICAqMS4gYXV0byBhZGQgc2FtZSBuYW1lIGNvbGxlY3Rpb25zIG9uIGxvY2FsRGIsIHJlbW90ZURiLCBhbmQgSHlicmlkRGJcbiAgICByZW1vdmVDb2xsZWN0aW9uKG5hbWUsc3VjY2VzcygpKTpub3QgcmVtb3ZlIHNhbWUgbmFtZSBjb2xsZWN0aW9uIG9mIGVpdGhlciBsb2NhbENvbCBvciByZW1vdGVDb2xcblxuICAgIHVwbG9hZChzdWNjZXNzKCksZXJyb3IoZXJyKSk6XG59XG5IeWJyaWREYi5Db2xsZWN0aW9uOntcbiAgICB1cHNlcnQoZG9jcywgYmFzZXMsIHN1Y2Nlc3MsIGVycm9yKTppdCBvbmx5IHVwc2VydCBvbiBsb2NhbERiXG4gICAgICAgICogb3ZlcndyaXRlIGl0IHRvIHVwc2VydCB0byByZW1vdGVEYlxuICAgICAgICAgICAgKiB0aGVuIGNhY2hlT25lIGl0XG4gICAgcmVtb3ZlKGlkLCBzdWNjZXNzLCBlcm9yKTppdCBvbmx5IHJlbW92ZXMgb24gbG9jYWxDb2xcbiAgICBmaW5kKHNlbGVjdG9yLCBvcHRpb25zKS5mZXRjaChzdWNjZXNzLCBlcnJvcik6XG4gICAgZmluZE9uZShzZWxlY3RvcixvcHRpb25zLCBzdWNjZXNzLCBlcnJvcik6XG4gICAgdXBsb2FkKHN1Y2Nlc3MsZXJyb3IpOlxufVxuXG5sb2NhbERiLkNvbGxlY3Rpb257XG4gICAgLi4uXG4gICAgc2VlZChkb2NzLHN1Y2Nlc3MsIGVycm9yKTogbm8gdGhlbiBjYWNoZVxuICAgIGNhY2hlT25lKGRvYywgc3VjY2VzcywgZXJyb3IpOiBubyBvciBcImNhY2hlZFwiIG9ubHlcbiAgICBjYWNoZShkb2NzLCBzZWxlY3Rvciwgb3B0aW9ucywgc3VjY2VzcywgZXJyb3IpOiBzYW1lIHdpdGggYWJvdmVcblxuICAgIHBlbmRpbmdVcHNlcnRzKHN1Y2Nlc3MsIGVycm9yKTpcbiAgICByZXNvbHZlVXBzZXJ0cyhkb2NzLCBzdWNjZXNzLCBlcnJvcik6IFwidXBzZXJ0ZWRcIiBvbmx5XG4gICAgICAgID4gc2FtZSB3aXRoIHRoYXQgaW4gZGIsIHRoZW4gdXBkYXRlIHN0YXR1cyBvbmx5IGFzIFwiY2FjaGVkXCJcbiAgICAgICAgPiBub3Qgc2FtZSwgdGhlbiB1cGRhdGUgYmFzZSBvbmx5LCBhbmQgc3RhdHVzIGxlYXZlcyBhcyBcInVwc2VydGVkXCJcbiAgICBwZW5kaW5nUmVtb3ZlcyhzdWNjZXNzLCBlcnJvcik6XG4gICAgcmVzb2x2ZVJlbW92ZSgpOlxufVxuXG5NT1NUIGltcG9ydGFudDpcblFpbGkgc2VydmVyIGlzIG5vdCBmdWxseSBhbGlnbmVkIHdpdGggbWluaW1vbmdvIGFib3V0XG46IEl0IGNhbiBhbHNvIGJlIHVzZWQgd2l0aCBhIHNpbXBsZSBzZXJ2ZXIgdGhhdCBqdXN0IE9WRVJXUklURSBkb2N1bWVudHMgQ09NUExFVEVMWSBvbiB1cHNlcnRcbiAgICA+Y3JlYXRlZEF0IGFuZCB1cGRhdGVkQXRcbiAgICA+YXV0aG9yXG4gICAgPl9pZFxuXG5zbyBxaWxpLWFwcCBkb2Vzbid0IHN1cHBvcnQgbG9jYWwgdXBzZXJ0XG4qL1xuaW1wb3J0IHtIeWJyaWREYiwgdXRpbHN9IGZyb20gJ21pbmltb25nbydcblxudmFyIF9maXhlZD1mYWxzZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZml4KGRiKXtcbiAgICBpZihfZml4ZWQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgdGVtcENvbE5hbWU9J18nK0RhdGUubm93KClcblxuICAgIHZhciBsb2NhbERiPWRiLmxvY2FsRGIsXG4gICAgICAgIHJlbW90ZURiPWRiLnJlbW90ZURiO1xuXG4gICAgKGZ1bmN0aW9uKF9hZGRDb2xsZWN0aW9uKXtcbiAgICAgICAgSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb249ZnVuY3Rpb24obmFtZSwgb3B0KXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmxvY2FsRGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbERiLmFkZENvbGxlY3Rpb24obmFtZSlcblxuICAgICAgICAgICAgaWYoIXRoaXMucmVtb3RlRGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVEYi5hZGRDb2xsZWN0aW9uKG5hbWUsb3B0KVxuXG4gICAgICAgICAgICByZXR1cm4gX2FkZENvbGxlY3Rpb24uYXBwbHkodGhpcyxhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICB9KShIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbik7XG5cbiAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgZGIuYWRkQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICAgICAgbGV0IEh5YnJpZENvbGxlY3Rpb249ZGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgTG9jYWxDb2xsZWN0aW9uPWxvY2FsRGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgUmVtb3RlQ29sbGVjdGlvbj1yZW1vdGVEYlt0ZW1wQ29sTmFtZV0uY29uc3RydWN0b3I7XG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUudXBzZXJ0PWZ1bmN0aW9uKGRvYyxiYXNlLHN1Y2Nlc3MsZXJyb3IsYmF0Y2hNb2RlKXtcbiAgICAgICAgICAgIGlmKHR5cGVvZihiYXNlKT09J2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICAgICAgYmFzZT1udWxsXG4gICAgICAgICAgICAgICAgc3VjY2Vzcz1hcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgICBlcnJvcj1hcmd1bWVudHNbMl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgIHZhciBmYWlsPShlKT0+e1xuICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihlKVxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkb2MpICYmIGJhdGNoTW9kZSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcInlvdSBhcmUgYmF0Y2ggdXBzZXJ0aW5nLCB3aGlsZSBzZXJ2ZXIgc2lkZSB3aWxsIG9ubHkgcmV0dXJuIHRoZSBOVU1CRVIgb2YgY2hhbmdlZFwiKVxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1zPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50OiB0aGlzLmNsaWVudFxuICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgIGlmICgodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJiBuYXZpZ2F0b3IgIT09IG51bGwpICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhbmRyb2lkIDIuMycpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLl8gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cGNsaWVudChcIlBPU1RcIix0aGlzLnVybCxwYXJhbXMsIGRvYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG49PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MgKG4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShuKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgZT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC51cHNlcnQoZG9jLGJhc2UscmVzdWx0PT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KGRvYykpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxDb2wuY2FjaGUocmVzdWx0LHtfaWQ6XCJuZXZlclJlbW92ZUZyb21DYWNoZSB3aGVuIHVwc2VydGluZ1wifSx7fSwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzICYmIHN1Y2Nlc3MocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0PU9iamVjdC5hc3NpZ24oZG9jLHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsQ29sLmNhY2hlT25lKHJlc3VsdCwgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyYmc3VjY2VzcyhyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxmYWlsKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm8gY2xpZW50IGlkXG4gICAgICAgIHV0aWxzLmNyZWF0ZVVpZD0oKT0+dW5kZWZpbmVkXG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKGlkLHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWlsPShlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IoZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlQ29sLnJlbW92ZShpZCwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5yZXNvbHZlUmVtb3ZlKGlkLCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyYmc3VjY2VzcygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS51cGxvYWQ9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IHN1cHBvcnQnKVxuICAgICAgICB9XG5cbiAgICAgICAgOyhmdW5jdGlvbihmaW5kKXtcbiAgICAgICAgICAgIC8vZG9uJ3QgY2FsbCBzdWNjZXNzIHdoZW4gbG9jYWwgaW50ZXJpbSBmaW5kIHdpdGhvdXQgcmVzdWx0c1xuICAgICAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZD1mdW5jdGlvbihzZWxlY3RvcixvcHRpb25zPXt9KXtcbiAgICAgICAgICAgICAgICB2YXIgZmluZGVyPWZpbmQuY2FsbCh0aGlzLHNlbGVjdG9yLG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgICAgICBpbnRlcmltPU9iamVjdC5hc3NpZ24oe30sdGhpcy5vcHRpb25zLG9wdGlvbnMpLmludGVyaW1cbiAgICAgICAgICAgICAgICBpZighaW50ZXJpbSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRlclxuXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZGVyLmZldGNoLFxuICAgICAgICAgICAgICAgICAgICB0aW1lPTAsIGNhbGxlZD1mYWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoOiBmdW5jdGlvbihzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyKChkb2NzKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWUrK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpbWU9PTEgJiYgZG9jcy5sZW5ndGg9PTApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0BIQUNLOiBtb2RpZnkgbG9jYWwgRGF0YSB0byBtYWtlIGFsd2F5cyBjYWxsIHN1Y2Nlc3Mgd2l0aCByZW1vdGUgcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3NbMF09e19uZXZlckhhc1RoaXM6dGVtcENvbE5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MoZG9jcylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQpO1xuXG4gICAgICAgIChmdW5jdGlvbihmaW5kKXsvL3FpbGkgc2VydmVyIHJldHVybiB7cmVzdWx0czpbLi4uXX1cbiAgICAgICAgICAgIFJlbW90ZUNvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQ9ZnVuY3Rpb24oc2VsZWN0b3Isb3B0aW9ucz17fSl7XG4gICAgICAgICAgICAgICAgdmFyIGZldGNoZXI9ZmluZC5jYWxsKHRoaXMsc2VsZWN0b3Isb3B0aW9ucykuZmV0Y2hcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaDogZnVuY3Rpb24oc3VjY2VzcyxlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaGVyKGRhdGE9Pntcblx0XHRcdFx0XHRcdFx0aWYoc3VjY2Vzcyl7XG5cdFx0XHRcdFx0XHRcdFx0c3VjY2Vzcyh0eXBlb2YoZGF0YS5yZXN1bHRzKSE9J3VuZGVmaW5lZCcgPyBkYXRhLnJlc3VsdHMgOiAoQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbZGF0YV0pKVxuXHRcdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KShSZW1vdGVDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kKTtcblxuICAgICAgICBkYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgICAgICBsb2NhbERiLnJlbW92ZUNvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgICAgIHJlbW90ZURiLnJlbW92ZUNvbGxlY3Rpb24odGVtcENvbE5hbWUpXG4gICAgfSkoKTtcbiAgICBfZml4ZWQ9dHJ1ZVxufVxuIl19