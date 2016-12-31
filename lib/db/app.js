'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var schemas = {},
    indexes = {},
    _current = null,
    dataDB;

var Application = function (_Service$BuiltIn) {
    _inherits(Application, _Service$BuiltIn);

    function Application() {
        _classCallCheck(this, Application);

        return _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).apply(this, arguments));
    }

    _createClass(Application, null, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.super('init')();
            return new Promise(function (resolve, reject) {
                _this2.find({/*author:{_id:User.current._id}*/}, { interim: false }).fetch(resolve, reject);
                dataDB = new _minimongo.RemoteDb(_this2.server + 'classes/', {}, function (method, url, params, data, success, error) {
                    this.httpclient(method, url, params, data, success, error, _current.apiKey);
                }.bind(_this2));
            });
        }
    }, {
        key: 'getSchema',
        value: function getSchema() {
            if (typeof schemas[_current._id] !== 'undefined') return Promise.resolve(schemas[_current._id]);
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

            return new Promise(function (resolve, reject) {
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

            return new Promise(function (resolve, reject) {
                _this4.indexes.then(function (all) {
                    resolve(all[colName] || []);
                }, reject);
            });
        }
    }, {
        key: 'getLog',
        value: function getLog(level) {
            var _this5 = this;

            var query = level ? JSON.stringify({ level: level }) : "{}";
            return new Promise(function (resolve, reject) {
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
        value: function isRemovable(id) {
            return !this.isCurrentApp(id);
        }
    }, {
        key: 'current',
        set: function set(v) {
            _current = v;
        }
    }, {
        key: '_name',
        get: function get() {
            return 'apps';
        }
    }, {
        key: 'indexes',
        get: function get() {
            if (typeof indexes[_current._id] !== 'undefined') return Promise.resolve(indexes[_current._id]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9hcHAuanMiXSwibmFtZXMiOlsic2NoZW1hcyIsImluZGV4ZXMiLCJfY3VycmVudCIsImRhdGFEQiIsIkFwcGxpY2F0aW9uIiwic3VwZXIiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZpbmQiLCJpbnRlcmltIiwiZmV0Y2giLCJzZXJ2ZXIiLCJtZXRob2QiLCJ1cmwiLCJwYXJhbXMiLCJkYXRhIiwic3VjY2VzcyIsImVycm9yIiwiaHR0cGNsaWVudCIsImFwaUtleSIsImJpbmQiLCJfaWQiLCJhamF4IiwidGhlbiIsImQiLCJyZXN1bHRzIiwibmV3U2NoZW1hIiwiY29sTmFtZSIsInVuZGVmaW5lZCIsImEiLCJhZGRDb2xsZWN0aW9uIiwidXBzZXJ0IiwicCIsImFsbCIsImxldmVsIiwicXVlcnkiLCJKU09OIiwic3RyaW5naWZ5IiwiY29kZUZpbGUiLCJGb3JtRGF0YSIsImFwcGVuZCIsImlkIiwiaXNDdXJyZW50QXBwIiwidiIsIkJ1aWx0SW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFVBQVEsRUFBWjtBQUFBLElBQ0VDLFVBQVEsRUFEVjtBQUFBLElBRUVDLFdBQVMsSUFGWDtBQUFBLElBR0tDLE1BSEw7O0lBS3FCQyxXOzs7Ozs7Ozs7OzsrQkFDSjtBQUFBOztBQUNULGlCQUFLQyxLQUFMLENBQVcsTUFBWDtBQUNBLG1CQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDakMsdUJBQUtDLElBQUwsQ0FBVSxDQUFDLGlDQUFELENBQVYsRUFBOEMsRUFBQ0MsU0FBUSxLQUFULEVBQTlDLEVBQ1BDLEtBRE8sQ0FDREosT0FEQyxFQUNPQyxNQURQO0FBRVRMLHlCQUFPLHdCQUFhLE9BQUtTLE1BQUwsR0FBWSxVQUF6QixFQUFvQyxFQUFwQyxFQUF1QyxVQUFTQyxNQUFU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ZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuaW1wb3J0IHtSZW1vdGVEYn0gZnJvbSAnbWluaW1vbmdvJ1xuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZydcblxudmFyIHNjaGVtYXM9e31cblx0LGluZGV4ZXM9e31cblx0LF9jdXJyZW50PW51bGxcbiAgICAsZGF0YURCO1xuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuICAgIHN0YXRpYyBpbml0KCl7XG4gICAgICAgIHRoaXMuc3VwZXIoJ2luaXQnKSgpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmZpbmQoey8qYXV0aG9yOntfaWQ6VXNlci5jdXJyZW50Ll9pZH0qL30se2ludGVyaW06ZmFsc2V9KVxuXHRcdFx0XHQuZmV0Y2gocmVzb2x2ZSxyZWplY3QpXG5cdFx0XHRkYXRhREI9bmV3IFJlbW90ZURiKHRoaXMuc2VydmVyKydjbGFzc2VzLycse30sZnVuY3Rpb24obWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cGNsaWVudChtZXRob2QsIHVybCwgcGFyYW1zLCBkYXRhLCBzdWNjZXNzLCBlcnJvciwgX2N1cnJlbnQuYXBpS2V5KVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG5cdHN0YXRpYyBzZXQgY3VycmVudCh2KXtcblx0XHRfY3VycmVudD12XG5cdH1cblxuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdhcHBzJ1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgaW5kZXhlcygpe1xuICAgICAgICBpZih0eXBlb2YoaW5kZXhlc1tfY3VycmVudC5faWRdKSE9PSd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbmRleGVzW19jdXJyZW50Ll9pZF0pXG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzL2luZGV4ZXM/YXBwbWFuPScrX2N1cnJlbnQuYXBpS2V5LFxuXHRcdFx0bWV0aG9kOidnZXQnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXhlc1tfY3VycmVudC5faWRdPWRcbiAgICAgICAgfSlcbiAgICB9XG5cblx0c3RhdGljIGdldFNjaGVtYSgpe1xuICAgICAgICBpZih0eXBlb2Yoc2NoZW1hc1tfY3VycmVudC5faWRdKSE9PSd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY2hlbWFzW19jdXJyZW50Ll9pZF0pXG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleSxcblx0XHRcdG1ldGhvZDonZ2V0J1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYXNbX2N1cnJlbnQuX2lkXT1kLnJlc3VsdHNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0U2NoZW1hKG5ld1NjaGVtYSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXM/YXBwbWFuPScrX2N1cnJlbnQuYXBpS2V5LFxuXHRcdFx0bWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgIGRhdGE6bmV3U2NoZW1hXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWFzW19jdXJyZW50Ll9pZF09bmV3U2NoZW1hXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbGxlY3Rpb25EYXRhKGNvbE5hbWUsIGRhdGEpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICBcdFx0aWYoZGF0YT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzLycrY29sTmFtZSsnP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGEpPT5yZXNvbHZlKGEucmVzdWx0cyksIHJlamVjdClcbiAgICBcdFx0ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRhREIuYWRkQ29sbGVjdGlvbihjb2xOYW1lKVxuICAgICAgICAgICAgICAgIGRhdGFEQltjb2xOYW1lXS51cHNlcnQoZGF0YSwoYSk9PnJlc29sdmUoYSksIHJlamVjdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICB9XG5cbiAgICBzdGF0aWMgY29sbGVjdGlvbkluZGV4ZXMoY29sTmFtZSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmluZGV4ZXMudGhlbihmdW5jdGlvbihhbGwpe1xuICAgIFx0XHRcdHJlc29sdmUoYWxsW2NvbE5hbWVdIHx8IFtdKVxuICAgIFx0XHR9LCByZWplY3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGdldExvZyhsZXZlbCl7XG4gICAgICAgIHZhciBxdWVyeT1sZXZlbCA/IEpTT04uc3RyaW5naWZ5KHtsZXZlbH0pIDogXCJ7fVwiXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNjaGVtYXMvbG9ncz9hcHBtYW49JHtfY3VycmVudC5hcGlLZXl9JnF1ZXJ5PSR7cXVlcnl9JmxpbWl0PTIwYFxuICAgICAgICAgICAgfSkudGhlbigoYSk9PnJlc29sdmUoYS5yZXN1bHRzKSwgcmVqZWN0KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBkb3dubG9hZCgpe1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHVwbG9hZChjb2RlRmlsZSl7XG4gICAgICAgIHZhciBkYXRhPW5ldyBGb3JtRGF0YSgpXG4gICAgICAgIGRhdGEuYXBwZW5kKCdjbGllbnRjb2RlJyxjb2RlRmlsZSwgXCJhbGxpbjEuaHRtbFwiKVxuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9c2NoZW1hcy9jbGllbnRjb2RlP2FwcG1hbj0ke19jdXJyZW50LmFwaUtleX1gLFxuICAgICAgICAgICAgZGF0YVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBpc1JlbW92YWJsZShpZCl7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0N1cnJlbnRBcHAoaWQpXG4gICAgfVxufVxuIl19