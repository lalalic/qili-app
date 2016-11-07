'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = fix;

var _minimongo = require('minimongo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            return new _promise2.default(function (resolve, reject) {
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
                            result = (0, _assign2.default)(doc, result);
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

            return new _promise2.default(function (resolve, reject) {
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
                    interim = (0, _assign2.default)({}, this.options, options).interim;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maXgtbWluaW1vbmdvLmpzIl0sIm5hbWVzIjpbImZpeCIsIl9maXhlZCIsImRiIiwidGVtcENvbE5hbWUiLCJEYXRlIiwibm93IiwibG9jYWxEYiIsInJlbW90ZURiIiwiX2FkZENvbGxlY3Rpb24iLCJwcm90b3R5cGUiLCJhZGRDb2xsZWN0aW9uIiwibmFtZSIsIm9wdCIsImFwcGx5IiwiYXJndW1lbnRzIiwiSHlicmlkQ29sbGVjdGlvbiIsImNvbnN0cnVjdG9yIiwiTG9jYWxDb2xsZWN0aW9uIiwiUmVtb3RlQ29sbGVjdGlvbiIsInVwc2VydCIsImRvYyIsImJhc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJiYXRjaE1vZGUiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmFpbCIsImUiLCJBcnJheSIsImlzQXJyYXkiLCJjb25zb2xlIiwid2FybiIsInBhcmFtcyIsImNsaWVudCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsIl8iLCJnZXRUaW1lIiwicmVtb3RlQ29sIiwiaHR0cENsaWVudCIsInVybCIsIm4iLCJhZmZlY3RlZCIsImxvY2FsQ29sIiwiY2FjaGUiLCJyZXN1bHQiLCJfaWQiLCJjYWNoZU9uZSIsImNyZWF0ZVVpZCIsInVuZGVmaW5lZCIsInJlbW92ZSIsImlkIiwicmVzb2x2ZVJlbW92ZSIsInVwbG9hZCIsIkVycm9yIiwiZmluZCIsInNlbGVjdG9yIiwib3B0aW9ucyIsImZpbmRlciIsImNhbGwiLCJpbnRlcmltIiwiZmV0Y2hlciIsImZldGNoIiwidGltZSIsImNhbGxlZCIsImRvY3MiLCJsZW5ndGgiLCJfbmV2ZXJIYXNUaGlzIiwiZGF0YSIsInJlc3VsdHMiLCJyZW1vdmVDb2xsZWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztrQkFvRHdCQSxHOztBQUh4Qjs7OztBQUVBLElBQUlDLFNBQU8sS0FBWCxDLENBbkRBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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Qyw2QkFBaUJULFNBQWpCLENBQTJCaUQsSUFBM0IsR0FBZ0MsVUFBU0MsUUFBVCxFQUE2QjtBQUFBLG9CQUFYQyxPQUFXLHVFQUFILEVBQUc7O0FBQ3pELG9CQUFJSSxVQUFRTixLQUFLSSxJQUFMLENBQVUsSUFBVixFQUFlSCxRQUFmLEVBQXdCQyxPQUF4QixFQUFpQ0ssS0FBN0M7QUFDQSx1QkFBTztBQUNIQSwyQkFBTyxlQUFTM0MsT0FBVCxFQUFpQkMsS0FBakIsRUFBdUI7QUFDMUJ5QyxnQ0FBUSxnQkFBTTtBQUMvQixnQ0FBRzFDLE9BQUgsRUFBVztBQUNWQSx3Q0FBUSxPQUFPaUQsS0FBS0MsT0FBWixJQUFzQixXQUF0QixHQUFvQ0QsS0FBS0MsT0FBekMsR0FBb0QzQyxNQUFNQyxPQUFOLENBQWN5QyxJQUFkLElBQXNCQSxJQUF0QixHQUE2QixDQUFDQSxJQUFELENBQXpGO0FBQ0E7QUFDaUIseUJBSkQsRUFJRWhELEtBSkY7QUFLSDtBQVBFLGlCQUFQO0FBU0gsYUFYRDtBQVlILFNBYkQsRUFhR0wsaUJBQWlCVCxTQUFqQixDQUEyQmlELElBYjlCOztBQWVBeEQsV0FBR3VFLGdCQUFILENBQW9CdEUsV0FBcEI7QUFDQUcsZ0JBQVFtRSxnQkFBUixDQUF5QnRFLFdBQXpCO0FBQ0FJLGlCQUFTa0UsZ0JBQVQsQ0FBMEJ0RSxXQUExQjtBQUNILEtBekhEO0FBMEhBRixhQUFPLElBQVA7QUFDSCIsImZpbGUiOiJmaXgtbWluaW1vbmdvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG5cbm9wdGlvbnM6e1xuICAgIGNhY2hlRmluZCh0cnVlKSxcbiAgICBjYWNoZU9uZSh0cnVlKSxcbiAgICBpbnRlcmltKHRydWUpLFxuICAgIHVzZUxvY2FsT25SZW1vdGVFcnJvciAob25seSB3aGVuIGludGVyaW09ZmFsc2UpXG4gICAgc2hvcnRjdXQoZmFsc2UpXG59XG5IeWJyaWREYjp7XG4gICAgYWRkQ29sbGVjdGlvbihuYW1lLCBvcHRpb25zLCBzdWNjZXNzKCksIGVycm9yKGVycikpOiBMb2NhbERCIGFuZCByZW1vdGVEYiBtdXN0IGFscmVhZHkgaGF2ZSBzYW1lIG5hbWUgY29sbGVjdGlvblxuICAgICAgICAqMS4gYXV0byBhZGQgc2FtZSBuYW1lIGNvbGxlY3Rpb25zIG9uIGxvY2FsRGIsIHJlbW90ZURiLCBhbmQgSHlicmlkRGJcbiAgICByZW1vdmVDb2xsZWN0aW9uKG5hbWUsc3VjY2VzcygpKTpub3QgcmVtb3ZlIHNhbWUgbmFtZSBjb2xsZWN0aW9uIG9mIGVpdGhlciBsb2NhbENvbCBvciByZW1vdGVDb2xcblxuICAgIHVwbG9hZChzdWNjZXNzKCksZXJyb3IoZXJyKSk6XG59XG5IeWJyaWREYi5Db2xsZWN0aW9uOntcbiAgICB1cHNlcnQoZG9jcywgYmFzZXMsIHN1Y2Nlc3MsIGVycm9yKTppdCBvbmx5IHVwc2VydCBvbiBsb2NhbERiXG4gICAgICAgICogb3ZlcndyaXRlIGl0IHRvIHVwc2VydCB0byByZW1vdGVEYlxuICAgICAgICAgICAgKiB0aGVuIGNhY2hlT25lIGl0XG4gICAgcmVtb3ZlKGlkLCBzdWNjZXNzLCBlcm9yKTppdCBvbmx5IHJlbW92ZXMgb24gbG9jYWxDb2xcbiAgICBmaW5kKHNlbGVjdG9yLCBvcHRpb25zKS5mZXRjaChzdWNjZXNzLCBlcnJvcik6XG4gICAgZmluZE9uZShzZWxlY3RvcixvcHRpb25zLCBzdWNjZXNzLCBlcnJvcik6XG4gICAgdXBsb2FkKHN1Y2Nlc3MsZXJyb3IpOlxufVxuXG5sb2NhbERiLkNvbGxlY3Rpb257XG4gICAgLi4uXG4gICAgc2VlZChkb2NzLHN1Y2Nlc3MsIGVycm9yKTogbm8gdGhlbiBjYWNoZVxuICAgIGNhY2hlT25lKGRvYywgc3VjY2VzcywgZXJyb3IpOiBubyBvciBcImNhY2hlZFwiIG9ubHlcbiAgICBjYWNoZShkb2NzLCBzZWxlY3Rvciwgb3B0aW9ucywgc3VjY2VzcywgZXJyb3IpOiBzYW1lIHdpdGggYWJvdmVcblxuICAgIHBlbmRpbmdVcHNlcnRzKHN1Y2Nlc3MsIGVycm9yKTpcbiAgICByZXNvbHZlVXBzZXJ0cyhkb2NzLCBzdWNjZXNzLCBlcnJvcik6IFwidXBzZXJ0ZWRcIiBvbmx5XG4gICAgICAgID4gc2FtZSB3aXRoIHRoYXQgaW4gZGIsIHRoZW4gdXBkYXRlIHN0YXR1cyBvbmx5IGFzIFwiY2FjaGVkXCJcbiAgICAgICAgPiBub3Qgc2FtZSwgdGhlbiB1cGRhdGUgYmFzZSBvbmx5LCBhbmQgc3RhdHVzIGxlYXZlcyBhcyBcInVwc2VydGVkXCJcbiAgICBwZW5kaW5nUmVtb3ZlcyhzdWNjZXNzLCBlcnJvcik6XG4gICAgcmVzb2x2ZVJlbW92ZSgpOlxufVxuXG5NT1NUIGltcG9ydGFudDpcblFpbGkgc2VydmVyIGlzIG5vdCBmdWxseSBhbGlnbmVkIHdpdGggbWluaW1vbmdvIGFib3V0XG46IEl0IGNhbiBhbHNvIGJlIHVzZWQgd2l0aCBhIHNpbXBsZSBzZXJ2ZXIgdGhhdCBqdXN0IE9WRVJXUklURSBkb2N1bWVudHMgQ09NUExFVEVMWSBvbiB1cHNlcnRcbiAgICA+Y3JlYXRlZEF0IGFuZCB1cGRhdGVkQXRcbiAgICA+YXV0aG9yXG4gICAgPl9pZFxuXG5zbyBxaWxpLWFwcCBkb2Vzbid0IHN1cHBvcnQgbG9jYWwgdXBzZXJ0XG4qL1xuaW1wb3J0IHtIeWJyaWREYiwgdXRpbHN9IGZyb20gJ21pbmltb25nbydcblxudmFyIF9maXhlZD1mYWxzZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZml4KGRiKXtcbiAgICBpZihfZml4ZWQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgdGVtcENvbE5hbWU9J18nK0RhdGUubm93KClcblxuICAgIHZhciBsb2NhbERiPWRiLmxvY2FsRGIsXG4gICAgICAgIHJlbW90ZURiPWRiLnJlbW90ZURiO1xuXG4gICAgKGZ1bmN0aW9uKF9hZGRDb2xsZWN0aW9uKXtcbiAgICAgICAgSHlicmlkRGIucHJvdG90eXBlLmFkZENvbGxlY3Rpb249ZnVuY3Rpb24obmFtZSwgb3B0KXtcbiAgICAgICAgICAgIGlmKCF0aGlzLmxvY2FsRGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbERiLmFkZENvbGxlY3Rpb24obmFtZSlcblxuICAgICAgICAgICAgaWYoIXRoaXMucmVtb3RlRGJbbmFtZV0pXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVEYi5hZGRDb2xsZWN0aW9uKG5hbWUsb3B0KVxuXG4gICAgICAgICAgICByZXR1cm4gX2FkZENvbGxlY3Rpb24uYXBwbHkodGhpcyxhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICB9KShIeWJyaWREYi5wcm90b3R5cGUuYWRkQ29sbGVjdGlvbik7XG5cbiAgICAoZnVuY3Rpb24oKXtcbiAgICAgICAgZGIuYWRkQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICAgICAgbGV0IEh5YnJpZENvbGxlY3Rpb249ZGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgTG9jYWxDb2xsZWN0aW9uPWxvY2FsRGJbdGVtcENvbE5hbWVdLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgUmVtb3RlQ29sbGVjdGlvbj1yZW1vdGVEYlt0ZW1wQ29sTmFtZV0uY29uc3RydWN0b3I7XG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUudXBzZXJ0PWZ1bmN0aW9uKGRvYyxiYXNlLHN1Y2Nlc3MsZXJyb3IsYmF0Y2hNb2RlKXtcbiAgICAgICAgICAgIGlmKHR5cGVvZihiYXNlKT09J2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICAgICAgYmFzZT1udWxsXG4gICAgICAgICAgICAgICAgc3VjY2Vzcz1hcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgICBlcnJvcj1hcmd1bWVudHNbMl1cbiAgICAgICAgICAgICAgICBiYXRjaE1vZGU9YXJndW1lbnRzWzNdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgICAgICB2YXIgZmFpbD0oZSk9PntcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IgJiYgZXJyb3IoZSlcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZG9jKSAmJiBiYXRjaE1vZGUpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJ5b3UgYXJlIGJhdGNoIHVwc2VydGluZywgd2hpbGUgc2VydmVyIHNpZGUgd2lsbCBvbmx5IHJldHVybiB0aGUgTlVNQkVSIG9mIGNoYW5nZWRcIilcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtcz0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudDogdGhpcy5jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICBpZiAoKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgbmF2aWdhdG9yICE9PSBudWxsKSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYW5kcm9pZCAyLjMnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5fID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC5odHRwQ2xpZW50KFwiUE9TVFwiLHRoaXMucmVtb3RlQ29sLnVybCxwYXJhbXMsIGRvYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICh7YWZmZWN0ZWQ6bn0pPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzIChuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobilcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIGU9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvciAmJiBlcnJvcihlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVDb2wudXBzZXJ0KGRvYyxiYXNlLHJlc3VsdD0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkb2MpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsQ29sLmNhY2hlKHJlc3VsdCx7X2lkOlwibmV2ZXJSZW1vdmVGcm9tQ2FjaGUgd2hlbiB1cHNlcnRpbmdcIn0se30sKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyAmJiBzdWNjZXNzKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdD1PYmplY3QuYXNzaWduKGRvYyxyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2NhbENvbC5jYWNoZU9uZShyZXN1bHQsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MmJnN1Y2Nlc3MocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sZmFpbClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICAvL25vIGNsaWVudCBpZFxuICAgICAgICB1dGlscy5jcmVhdGVVaWQ9KCk9PnVuZGVmaW5lZFxuXG4gICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZT1mdW5jdGlvbihpZCxzdWNjZXNzLGVycm9yKXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmFpbD0oZSk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yICYmIGVycm9yKGUpXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZUNvbC5yZW1vdmUoaWQsKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxDb2wucmVzb2x2ZVJlbW92ZShpZCwoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MmJnN1Y2Nlc3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxmYWlsKVxuICAgICAgICAgICAgICAgICAgICB9LGZhaWwpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgSHlicmlkQ29sbGVjdGlvbi5wcm90b3R5cGUudXBsb2FkPWZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBzdXBwb3J0JylcbiAgICAgICAgfVxuXG4gICAgICAgIDsoZnVuY3Rpb24oZmluZCl7XG4gICAgICAgICAgICAvL2Rvbid0IGNhbGwgc3VjY2VzcyB3aGVuIGxvY2FsIGludGVyaW0gZmluZCB3aXRob3V0IHJlc3VsdHNcbiAgICAgICAgICAgIEh5YnJpZENvbGxlY3Rpb24ucHJvdG90eXBlLmZpbmQ9ZnVuY3Rpb24oc2VsZWN0b3Isb3B0aW9ucz17fSl7XG4gICAgICAgICAgICAgICAgdmFyIGZpbmRlcj1maW5kLmNhbGwodGhpcyxzZWxlY3RvcixvcHRpb25zKSxcbiAgICAgICAgICAgICAgICAgICAgaW50ZXJpbT1PYmplY3QuYXNzaWduKHt9LHRoaXMub3B0aW9ucyxvcHRpb25zKS5pbnRlcmltXG4gICAgICAgICAgICAgICAgaWYoIWludGVyaW0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaW5kZXJcblxuICAgICAgICAgICAgICAgIHZhciBmZXRjaGVyPWZpbmRlci5mZXRjaCxcbiAgICAgICAgICAgICAgICAgICAgdGltZT0wLCBjYWxsZWQ9ZmFsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBmZXRjaDogZnVuY3Rpb24oc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hlcigoZG9jcyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lKytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aW1lPT0xICYmIGRvY3MubGVuZ3RoPT0wKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ASEFDSzogbW9kaWZ5IGxvY2FsIERhdGEgdG8gbWFrZSBhbHdheXMgY2FsbCBzdWNjZXNzIHdpdGggcmVtb3RlIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2NzWzBdPXtfbmV2ZXJIYXNUaGlzOnRlbXBDb2xOYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKGRvY3MpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LGVycm9yKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KShIeWJyaWRDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kKTtcblxuICAgICAgICAoZnVuY3Rpb24oZmluZCl7Ly9xaWxpIHNlcnZlciByZXR1cm4ge3Jlc3VsdHM6Wy4uLl19XG4gICAgICAgICAgICBSZW1vdGVDb2xsZWN0aW9uLnByb3RvdHlwZS5maW5kPWZ1bmN0aW9uKHNlbGVjdG9yLG9wdGlvbnM9e30pe1xuICAgICAgICAgICAgICAgIHZhciBmZXRjaGVyPWZpbmQuY2FsbCh0aGlzLHNlbGVjdG9yLG9wdGlvbnMpLmZldGNoXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2g6IGZ1bmN0aW9uKHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2hlcihkYXRhPT57XG5cdFx0XHRcdFx0XHRcdGlmKHN1Y2Nlc3Mpe1xuXHRcdFx0XHRcdFx0XHRcdHN1Y2Nlc3ModHlwZW9mKGRhdGEucmVzdWx0cykhPSd1bmRlZmluZWQnID8gZGF0YS5yZXN1bHRzIDogKEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogW2RhdGFdKSlcblx0XHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoUmVtb3RlQ29sbGVjdGlvbi5wcm90b3R5cGUuZmluZCk7XG5cbiAgICAgICAgZGIucmVtb3ZlQ29sbGVjdGlvbih0ZW1wQ29sTmFtZSlcbiAgICAgICAgbG9jYWxEYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgICAgICByZW1vdGVEYi5yZW1vdmVDb2xsZWN0aW9uKHRlbXBDb2xOYW1lKVxuICAgIH0pKCk7XG4gICAgX2ZpeGVkPXRydWVcbn1cbiJdfQ==