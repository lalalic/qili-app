'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _service = require('./service');

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _minimongo = require('minimongo');

var _role = require('./role');

var _role2 = _interopRequireDefault(_role);

var _file = require('./file');

var _file2 = _interopRequireDefault(_file);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _apps = [],
    _current = null,
    _last = null,
    schemas = {},
    indexes = {},
    dataDB;

var Application = function (_Service$BuiltIn) {
    (0, _inherits3.default)(Application, _Service$BuiltIn);

    function Application() {
        (0, _classCallCheck3.default)(this, Application);
        return (0, _possibleConstructorReturn3.default)(this, (Application.__proto__ || (0, _getPrototypeOf2.default)(Application)).apply(this, arguments));
    }

    (0, _createClass3.default)(Application, null, [{
        key: 'init',
        value: function init(name) {
            var _this2 = this;

            this.super('init')();
            return new _promise2.default(function (resolve, reject) {
                _this2.find({}, { interim: false }).fetch(function (d) {
                    _apps = d;
                    resolve(_apps);
                    if (!_current) Application.current = name ? d.find(function (a) {
                        return a.name == name;
                    }) || _apps[0] : _apps[0];
                }, reject);

                dataDB = new _minimongo.RemoteDb(_this2.server + 'classes/', {}, function (method, url, params, data, success, error) {
                    this.httpclient(method, url, params, data, success, error, _current.apiKey);
                }.bind(_this2));
            });
        }
    }, {
        key: 'upsert',
        value: function upsert(doc, base, success, error) {
            return this.super('upsert').apply(undefined, arguments).then(function (updated) {
                if (_apps.filter(function (a) {
                    return a._id == updated._id;
                }).length == 0) _apps.push(updated);
                return updated;
            }.bind(this));
        }
    }, {
        key: 'remove',
        value: function remove(id, success, error) {
            return this.super('remove').apply(undefined, arguments).then(function () {
                _apps = _apps.filter(function (a) {
                    return a._id != id;
                });
                this.current = _apps[0];
            }.bind(this));
        }
    }, {
        key: 'getSchema',
        value: function getSchema() {
            if (typeof schemas[_current._id] !== 'undefined') return _promise2.default.resolve(schemas[_current._id]);
            return this.ajax({
                url: this.server + 'schemas?appman=' + _current.apiKey,
                method: 'get'
            }).then(function (d) {
                return schemas[_current._id] = d.results;
            });
        }
    }, {
        key: 'setSchema',
        value: function setSchema(newSchema) {
            return this.ajax({
                url: this.server + 'schemas?appman=' + _current.apiKey,
                method: 'post',
                data: newSchema
            }).then(function () {
                return schemas[_current._id] = newSchema;
            });
        }
    }, {
        key: 'collectionData',
        value: function collectionData(colName, data) {
            var _this3 = this;

            return new _promise2.default(function (resolve, reject) {
                if (data == undefined) _this3.ajax({
                    method: 'get',
                    url: _this3.server + 'schemas/' + colName + '?appman=' + _current.apiKey
                }).then(function (a) {
                    return resolve(a.results);
                }, reject);else {
                    dataDB.addCollection(colName);
                    dataDB[colName].upsert(data, function (a) {
                        return resolve(a);
                    }, reject);
                }
            });
            return p;
        }
    }, {
        key: 'collectionIndexes',
        value: function collectionIndexes(colName) {
            var _this4 = this;

            return new _promise2.default(function (resolve, reject) {
                _this4.indexes.then(function (all) {
                    resolve(all[colName] || []);
                }, reject);
            });
        }
    }, {
        key: 'getLog',
        value: function getLog(level) {
            var _this5 = this;

            var query = level ? (0, _stringify2.default)({ level: level }) : "{}";
            return new _promise2.default(function (resolve, reject) {
                _this5.ajax({
                    method: 'get',
                    url: _this5.server + 'schemas/logs?appman=' + _current.apiKey + '&query=' + query + '&limit=20'
                }).then(function (a) {
                    return resolve(a.results);
                }, reject);
            });
        }
    }, {
        key: 'download',
        value: function download() {}
    }, {
        key: 'upload',
        value: function upload(codeFile) {
            var data = new FormData();
            data.append('clientcode', codeFile, "allin1.html");
            return this.ajax({
                method: 'post',
                url: this.server + 'schemas/clientcode?appman=' + _current.apiKey,
                data: data
            });
        }
    }, {
        key: 'isRemovable',
        value: function isRemovable(app) {
            return !this.isCurrentApp(app._id);
        }
    }, {
        key: '_name',
        get: function get() {
            return 'apps';
        }
    }, {
        key: 'all',
        get: function get() {
            return _apps;
        }
    }, {
        key: 'current',
        get: function get() {
            return _current;
        },
        set: function set(v) {
            if (typeof v == 'string') v = _apps.find(function (a) {
                return a.name == v;
            });

            v = v || null;

            if (v != _current) {
                _last = _current;
                _current = v;
                this.emit('change', _current, _last);
            }
            return _current;
        }
    }, {
        key: 'last',
        get: function get() {
            return _last;
        }
    }, {
        key: 'indexes',
        get: function get() {
            if (typeof indexes[_current._id] !== 'undefined') return _promise2.default.resolve(indexes[_current._id]);
            return this.ajax({
                url: this.server + 'schemas/indexes?appman=' + _current.apiKey,
                method: 'get'
            }).then(function (d) {
                return indexes[_current._id] = d;
            });
        }
    }]);
    return Application;
}(_service.Service.BuiltIn);

exports.default = Application;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9hcHAuanMiXSwibmFtZXMiOlsiX2FwcHMiLCJfY3VycmVudCIsIl9sYXN0Iiwic2NoZW1hcyIsImluZGV4ZXMiLCJkYXRhREIiLCJBcHBsaWNhdGlvbiIsIm5hbWUiLCJzdXBlciIsInJlc29sdmUiLCJyZWplY3QiLCJmaW5kIiwiaW50ZXJpbSIsImZldGNoIiwiZCIsImN1cnJlbnQiLCJhIiwic2VydmVyIiwibWV0aG9kIiwidXJsIiwicGFyYW1zIiwiZGF0YSIsInN1Y2Nlc3MiLCJlcnJvciIsImh0dHBjbGllbnQiLCJhcGlLZXkiLCJiaW5kIiwiZG9jIiwiYmFzZSIsImFyZ3VtZW50cyIsInRoZW4iLCJ1cGRhdGVkIiwiZmlsdGVyIiwiX2lkIiwibGVuZ3RoIiwicHVzaCIsImlkIiwiYWpheCIsInJlc3VsdHMiLCJuZXdTY2hlbWEiLCJjb2xOYW1lIiwidW5kZWZpbmVkIiwiYWRkQ29sbGVjdGlvbiIsInVwc2VydCIsInAiLCJhbGwiLCJsZXZlbCIsInF1ZXJ5IiwiY29kZUZpbGUiLCJGb3JtRGF0YSIsImFwcGVuZCIsImFwcCIsImlzQ3VycmVudEFwcCIsInYiLCJlbWl0IiwiQnVpbHRJbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxRQUFNLEVBQVY7QUFBQSxJQUNJQyxXQUFTLElBRGI7QUFBQSxJQUVJQyxRQUFNLElBRlY7QUFBQSxJQUdJQyxVQUFRLEVBSFo7QUFBQSxJQUlDQyxVQUFRLEVBSlQ7QUFBQSxJQUtJQyxNQUxKOztJQU9xQkMsVzs7Ozs7Ozs7Ozs2QkFDTEMsSSxFQUFLO0FBQUE7O0FBQ2IsaUJBQUtDLEtBQUwsQ0FBVyxNQUFYO0FBQ0EsbUJBQU8sc0JBQVksVUFBQ0MsT0FBRCxFQUFTQyxNQUFULEVBQWtCO0FBQ2pDLHVCQUFLQyxJQUFMLENBQVUsRUFBVixFQUFh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UUFBUUgsU0FBU2dDLEdBQWpCLENBQVAsS0FBZ0MsV0FBbkMsRUFDSSxPQUFPLGtCQUFReEIsT0FBUixDQUFnQkwsUUFBUUgsU0FBU2dDLEdBQWpCLENBQWhCLENBQVA7QUFDSixtQkFBTyxLQUFLSSxJQUFMLENBQVU7QUFDYmxCLHFCQUFJLEtBQUtGLE1BQUwsR0FBWSx5QkFBWixHQUFzQ2hCLFNBQVN3QixNQUR0QztBQUV0QlAsd0JBQU87QUFGZSxhQUFWLEVBR0pZLElBSEksQ0FHQyxVQUFTaEIsQ0FBVCxFQUFXO0FBQ2YsdUJBQU9WLFFBQVFILFNBQVNnQyxHQUFqQixJQUFzQm5CLENBQTdCO0FBQ0gsYUFMTSxDQUFQO0FBTUg7OztFQXRFb0MsaUJBQVF5QyxPOztrQkFBNUJqRCxXIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuaW1wb3J0IHtSZW1vdGVEYn0gZnJvbSAnbWluaW1vbmdvJ1xuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZydcblxudmFyIF9hcHBzPVtdLFxuICAgIF9jdXJyZW50PW51bGwsXG4gICAgX2xhc3Q9bnVsbCxcbiAgICBzY2hlbWFzPXt9LFxuXHRpbmRleGVzPXt9LFxuICAgIGRhdGFEQjtcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcbiAgICBzdGF0aWMgaW5pdChuYW1lKXtcbiAgICAgICAgdGhpcy5zdXBlcignaW5pdCcpKClcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMuZmluZCh7fSx7aW50ZXJpbTpmYWxzZX0pLmZldGNoKChkKT0+e1xuICAgICAgICAgICAgICAgIF9hcHBzPWRcbiAgICAgICAgICAgICAgICByZXNvbHZlKF9hcHBzKVxuXHRcdFx0XHRpZighX2N1cnJlbnQpXG5cdFx0XHRcdFx0QXBwbGljYXRpb24uY3VycmVudD0obmFtZSA/IChkLmZpbmQoYT0+YS5uYW1lPT1uYW1lKXx8X2FwcHNbMF0pIDogX2FwcHNbMF0pO1xuICAgICAgICAgICAgfSxyZWplY3QpXG5cbiAgICAgICAgICAgIGRhdGFEQj1uZXcgUmVtb3RlRGIodGhpcy5zZXJ2ZXIrJ2NsYXNzZXMvJyx7fSxmdW5jdGlvbihtZXRob2QsIHVybCwgcGFyYW1zLCBkYXRhLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgICAgICAgICAgdGhpcy5odHRwY2xpZW50KG1ldGhvZCwgdXJsLCBwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yLCBfY3VycmVudC5hcGlLZXkpXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIHVwc2VydChkb2MsIGJhc2UsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VwZXIoJ3Vwc2VydCcpKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVwZGF0ZWQpe1xuICAgICAgICAgICAgICAgIGlmKF9hcHBzLmZpbHRlcihhPT5hLl9pZD09dXBkYXRlZC5faWQpLmxlbmd0aD09MClcbiAgICAgICAgICAgICAgICAgICAgX2FwcHMucHVzaCh1cGRhdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZShpZCwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICByZXR1cm4gdGhpcy5zdXBlcigncmVtb3ZlJykoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBfYXBwcz1fYXBwcy5maWx0ZXIoKGEpPT5hLl9pZCE9aWQpXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50PV9hcHBzWzBdXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ2FwcHMnXG4gICAgfVxuICAgIHN0YXRpYyBnZXQgYWxsKCl7XG4gICAgICAgIHJldHVybiBfYXBwc1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGN1cnJlbnQoKXtcbiAgICAgICAgcmV0dXJuIF9jdXJyZW50XG4gICAgfVxuICAgIHN0YXRpYyBzZXQgY3VycmVudCh2KXtcblx0XHRpZih0eXBlb2Yodik9PSdzdHJpbmcnKVxuXHRcdFx0dj1fYXBwcy5maW5kKGE9PmEubmFtZT09dilcblxuXHRcdHY9diB8fCBudWxsXG5cbiAgICAgICAgaWYodiE9X2N1cnJlbnQpe1xuXHRcdFx0X2xhc3Q9X2N1cnJlbnRcblx0XHRcdF9jdXJyZW50PXZcblx0XHRcdHRoaXMuZW1pdCgnY2hhbmdlJyxfY3VycmVudCxfbGFzdClcblx0XHR9XG4gICAgICAgIHJldHVybiBfY3VycmVudFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbGFzdCgpe1xuICAgICAgICByZXR1cm4gX2xhc3RcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGluZGV4ZXMoKXtcbiAgICAgICAgaWYodHlwZW9mKGluZGV4ZXNbX2N1cnJlbnQuX2lkXSkhPT0ndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5kZXhlc1tfY3VycmVudC5faWRdKVxuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIHVybDp0aGlzLnNlcnZlcisnc2NoZW1hcy9pbmRleGVzP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleSxcblx0XHRcdG1ldGhvZDonZ2V0J1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ZXNbX2N1cnJlbnQuX2lkXT1kXG4gICAgICAgIH0pXG4gICAgfVxuXG5cdHN0YXRpYyBnZXRTY2hlbWEoKXtcbiAgICAgICAgaWYodHlwZW9mKHNjaGVtYXNbX2N1cnJlbnQuX2lkXSkhPT0ndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2NoZW1hc1tfY3VycmVudC5faWRdKVxuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIHVybDp0aGlzLnNlcnZlcisnc2NoZW1hcz9hcHBtYW49JytfY3VycmVudC5hcGlLZXksXG5cdFx0XHRtZXRob2Q6J2dldCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWFzW19jdXJyZW50Ll9pZF09ZC5yZXN1bHRzXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIHNldFNjaGVtYShuZXdTY2hlbWEpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleSxcblx0XHRcdG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICBkYXRhOm5ld1NjaGVtYVxuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gc2NoZW1hc1tfY3VycmVudC5faWRdPW5ld1NjaGVtYVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBjb2xsZWN0aW9uRGF0YShjb2xOYW1lLCBkYXRhKXtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgXHRcdGlmKGRhdGE9PXVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDp0aGlzLnNlcnZlcisnc2NoZW1hcy8nK2NvbE5hbWUrJz9hcHBtYW49JytfY3VycmVudC5hcGlLZXlcbiAgICAgICAgICAgICAgICB9KS50aGVuKChhKT0+cmVzb2x2ZShhLnJlc3VsdHMpLCByZWplY3QpXG4gICAgXHRcdGVsc2V7XG4gICAgICAgICAgICAgICAgZGF0YURCLmFkZENvbGxlY3Rpb24oY29sTmFtZSlcbiAgICAgICAgICAgICAgICBkYXRhREJbY29sTmFtZV0udXBzZXJ0KGRhdGEsKGEpPT5yZXNvbHZlKGEpLCByZWplY3QpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBwXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbGxlY3Rpb25JbmRleGVzKGNvbE5hbWUpe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5pbmRleGVzLnRoZW4oZnVuY3Rpb24oYWxsKXtcbiAgICBcdFx0XHRyZXNvbHZlKGFsbFtjb2xOYW1lXSB8fCBbXSlcbiAgICBcdFx0fSwgcmVqZWN0KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRMb2cobGV2ZWwpe1xuICAgICAgICB2YXIgcXVlcnk9bGV2ZWwgPyBKU09OLnN0cmluZ2lmeSh7bGV2ZWx9KSA6IFwie31cIlxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMuYWpheCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOidnZXQnLFxuICAgICAgICAgICAgICAgIHVybDpgJHt0aGlzLnNlcnZlcn1zY2hlbWFzL2xvZ3M/YXBwbWFuPSR7X2N1cnJlbnQuYXBpS2V5fSZxdWVyeT0ke3F1ZXJ5fSZsaW1pdD0yMGBcbiAgICAgICAgICAgIH0pLnRoZW4oKGEpPT5yZXNvbHZlKGEucmVzdWx0cyksIHJlamVjdClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZG93bmxvYWQoKXtcblxuICAgIH1cblxuICAgIHN0YXRpYyB1cGxvYWQoY29kZUZpbGUpe1xuICAgICAgICB2YXIgZGF0YT1uZXcgRm9ybURhdGEoKVxuICAgICAgICBkYXRhLmFwcGVuZCgnY2xpZW50Y29kZScsY29kZUZpbGUsIFwiYWxsaW4xLmh0bWxcIilcbiAgICAgICAgcmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxuICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNjaGVtYXMvY2xpZW50Y29kZT9hcHBtYW49JHtfY3VycmVudC5hcGlLZXl9YCxcbiAgICAgICAgICAgIGRhdGFcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNSZW1vdmFibGUoYXBwKXtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzQ3VycmVudEFwcChhcHAuX2lkKVxuICAgIH1cbn1cbiJdfQ==