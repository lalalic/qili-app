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

var schemas = {},
    indexes = {},
    _current = null,
    dataDB;

var Application = function (_Service$BuiltIn) {
    (0, _inherits3.default)(Application, _Service$BuiltIn);

    function Application() {
        (0, _classCallCheck3.default)(this, Application);
        return (0, _possibleConstructorReturn3.default)(this, (Application.__proto__ || (0, _getPrototypeOf2.default)(Application)).apply(this, arguments));
    }

    (0, _createClass3.default)(Application, null, [{
        key: 'init',
        value: function init() {
            var _this2 = this;

            this.super('init')();
            return new _promise2.default(function (resolve, reject) {
                _this2.find({/*author:{_id:User.current._id}*/}, { interim: false }).fetch(resolve, reject);
                dataDB = new _minimongo.RemoteDb(_this2.server + 'classes/', {}, function (method, url, params, data, success, error) {
                    this.httpclient(method, url, params, data, success, error, _current.apiKey);
                }.bind(_this2));
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9hcHAuanMiXSwibmFtZXMiOlsic2NoZW1hcyIsImluZGV4ZXMiLCJfY3VycmVudCIsImRhdGFEQiIsIkFwcGxpY2F0aW9uIiwic3VwZXIiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsImludGVyaW0iLCJmZXRjaCIsInNlcnZlciIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJzdWNjZXNzIiwiZXJyb3IiLCJodHRwY2xpZW50IiwiYXBpS2V5IiwiYmluZCIsIl9pZCIsImFqYXgiLCJ0aGVuIiwiZCIsInJlc3VsdHMiLCJuZXdTY2hlbWEiLCJjb2xOYW1lIiwidW5kZWZpbmVkIiwiYSIsImFkZENvbGxlY3Rpb24iLCJ1cHNlcnQiLCJwIiwiYWxsIiwibGV2ZWwiLCJxdWVyeSIsImNvZGVGaWxlIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJhcHAiLCJpc0N1cnJlbnRBcHAiLCJ2IiwiQnVpbHRJbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxVQUFRLEVBQVo7QUFBQSxJQUNFQyxVQUFRLEVBRFY7QUFBQSxJQUVFQyxXQUFTLElBRlg7QUFBQSxJQUdLQyxNQUhMOztJQUtxQkMsVzs7Ozs7Ozs7OzsrQkFDSjtBQUFBOztBQUNULGlCQUFLQyxLQUFMLENBQVcsTUFBWDtBQUNBLG1CQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNqQyx1QkFBS0MsSUFBTCxDQUFVLENBQUMsaUNBQUQsQ0FBVixFQUE4QyxFQUFDQyxTQUFRLEtBQVQsRUFBOUMsRUFDUEMsS0FETyxDQUNESixPQURDLEVBQ09DLE1BRFA7QUFFVEoseUJBQU8sd0JBQWEsT0FBS1EsTUFBTCxHQUFZLFVBQXpCLEVBQW9DLEVBQXBDLEVBQXVDLFVBQVNDLE1BQVQsRUFBaUJDLEdBQWpCLEVBQXNC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LENBQUw7QUFBQSxpQkFIUixFQUdpQ2xCLE1BSGpDO0FBSUgsYUFMTSxDQUFQO0FBTUg7OzttQ0FFZ0IsQ0FFaEI7OzsrQkFFYTZCLFEsRUFBUztBQUNuQixnQkFBSXJCLE9BQUssSUFBSXNCLFFBQUosRUFBVDtBQUNBdEIsaUJBQUt1QixNQUFMLENBQVksWUFBWixFQUF5QkYsUUFBekIsRUFBbUMsYUFBbkM7QUFDQSxtQkFBTyxLQUFLZCxJQUFMLENBQVU7QUFDYlYsd0JBQU8sTUFETTtBQUViQyxxQkFBTyxLQUFLRixNQUFaLGtDQUErQ1QsU0FBU2lCLE1BRjNDO0FBR2JKO0FBSGEsYUFBVixDQUFQO0FBS0g7OztvQ0FFa0J3QixHLEVBQUk7QUFDbkIsbUJBQU8sQ0FBQyxLQUFLQyxZQUFMLENBQWtCRCxJQUFJbEIsR0FBdEIsQ0FBUjtBQUNIOzs7MEJBekZlb0IsQyxFQUFFO0FBQ3BCdkMsdUJBQVN1QyxDQUFUO0FBQ0E7Ozs0QkFFb0I7QUFDZCxtQkFBTyxNQUFQO0FBQ0g7Ozs0QkFFbUI7QUFDaEIsZ0JBQUcsT0FBT3hDLFFBQVFDLFNBQVNtQixHQUFqQixDQUFQLEtBQWdDLFdBQW5DLEVBQ0ksT0FBTyxrQkFBUWYsT0FBUixDQUFnQkwsUUFBUUMsU0FBU21CLEdBQWpCLENBQWhCLENBQVA7QUFDSixtQkFBTyxLQUFLQyxJQUFMLENBQVU7QUFDYlQscUJBQUksS0FBS0YsTUFBTCxHQUFZLHlCQUFaLEdBQXNDVCxTQUFTaUIsTUFEdEM7QUFFdEJQLHdCQUFPO0FBRmUsYUFBVixFQUdKVyxJQUhJLENBR0MsVUFBU0MsQ0FBVCxFQUFXO0FBQ2YsdUJBQU92QixRQUFRQyxTQUFTbUIsR0FBakIsSUFBc0JHLENBQTdCO0FBQ0gsYUFMTSxDQUFQO0FBTUg7OztFQTlCb0MsaUJBQVFrQixPOztrQkFBNUJ0QyxXIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuaW1wb3J0IHtSZW1vdGVEYn0gZnJvbSAnbWluaW1vbmdvJ1xuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZydcblxudmFyIHNjaGVtYXM9e31cblx0LGluZGV4ZXM9e31cblx0LF9jdXJyZW50PW51bGxcbiAgICAsZGF0YURCO1xuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuICAgIHN0YXRpYyBpbml0KCl7XG4gICAgICAgIHRoaXMuc3VwZXIoJ2luaXQnKSgpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmZpbmQoey8qYXV0aG9yOntfaWQ6VXNlci5jdXJyZW50Ll9pZH0qL30se2ludGVyaW06ZmFsc2V9KVxuXHRcdFx0XHQuZmV0Y2gocmVzb2x2ZSxyZWplY3QpXG5cdFx0XHRkYXRhREI9bmV3IFJlbW90ZURiKHRoaXMuc2VydmVyKydjbGFzc2VzLycse30sZnVuY3Rpb24obWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cGNsaWVudChtZXRob2QsIHVybCwgcGFyYW1zLCBkYXRhLCBzdWNjZXNzLCBlcnJvciwgX2N1cnJlbnQuYXBpS2V5KVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG5cdHN0YXRpYyBzZXQgY3VycmVudCh2KXtcblx0XHRfY3VycmVudD12XG5cdH1cblxuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdhcHBzJ1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgaW5kZXhlcygpe1xuICAgICAgICBpZih0eXBlb2YoaW5kZXhlc1tfY3VycmVudC5faWRdKSE9PSd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbmRleGVzW19jdXJyZW50Ll9pZF0pXG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzL2luZGV4ZXM/YXBwbWFuPScrX2N1cnJlbnQuYXBpS2V5LFxuXHRcdFx0bWV0aG9kOidnZXQnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXhlc1tfY3VycmVudC5faWRdPWRcbiAgICAgICAgfSlcbiAgICB9XG5cblx0c3RhdGljIGdldFNjaGVtYSgpe1xuICAgICAgICBpZih0eXBlb2Yoc2NoZW1hc1tfY3VycmVudC5faWRdKSE9PSd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY2hlbWFzW19jdXJyZW50Ll9pZF0pXG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleSxcblx0XHRcdG1ldGhvZDonZ2V0J1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYXNbX2N1cnJlbnQuX2lkXT1kLnJlc3VsdHNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0U2NoZW1hKG5ld1NjaGVtYSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXM/YXBwbWFuPScrX2N1cnJlbnQuYXBpS2V5LFxuXHRcdFx0bWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgIGRhdGE6bmV3U2NoZW1hXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWFzW19jdXJyZW50Ll9pZF09bmV3U2NoZW1hXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbGxlY3Rpb25EYXRhKGNvbE5hbWUsIGRhdGEpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICBcdFx0aWYoZGF0YT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzLycrY29sTmFtZSsnP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGEpPT5yZXNvbHZlKGEucmVzdWx0cyksIHJlamVjdClcbiAgICBcdFx0ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRhREIuYWRkQ29sbGVjdGlvbihjb2xOYW1lKVxuICAgICAgICAgICAgICAgIGRhdGFEQltjb2xOYW1lXS51cHNlcnQoZGF0YSwoYSk9PnJlc29sdmUoYSksIHJlamVjdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICB9XG5cbiAgICBzdGF0aWMgY29sbGVjdGlvbkluZGV4ZXMoY29sTmFtZSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmluZGV4ZXMudGhlbihmdW5jdGlvbihhbGwpe1xuICAgIFx0XHRcdHJlc29sdmUoYWxsW2NvbE5hbWVdIHx8IFtdKVxuICAgIFx0XHR9LCByZWplY3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGdldExvZyhsZXZlbCl7XG4gICAgICAgIHZhciBxdWVyeT1sZXZlbCA/IEpTT04uc3RyaW5naWZ5KHtsZXZlbH0pIDogXCJ7fVwiXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNjaGVtYXMvbG9ncz9hcHBtYW49JHtfY3VycmVudC5hcGlLZXl9JnF1ZXJ5PSR7cXVlcnl9JmxpbWl0PTIwYFxuICAgICAgICAgICAgfSkudGhlbigoYSk9PnJlc29sdmUoYS5yZXN1bHRzKSwgcmVqZWN0KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBkb3dubG9hZCgpe1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHVwbG9hZChjb2RlRmlsZSl7XG4gICAgICAgIHZhciBkYXRhPW5ldyBGb3JtRGF0YSgpXG4gICAgICAgIGRhdGEuYXBwZW5kKCdjbGllbnRjb2RlJyxjb2RlRmlsZSwgXCJhbGxpbjEuaHRtbFwiKVxuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9c2NoZW1hcy9jbGllbnRjb2RlP2FwcG1hbj0ke19jdXJyZW50LmFwaUtleX1gLFxuICAgICAgICAgICAgZGF0YVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBpc1JlbW92YWJsZShhcHApe1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNDdXJyZW50QXBwKGFwcC5faWQpXG4gICAgfVxufVxuIl19