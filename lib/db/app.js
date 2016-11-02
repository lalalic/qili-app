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

var _apps = [],
    _current = null,
    _last = null,
    schemas = {},
    indexes = {},
    dataDB;

var Application = function (_Service$BuiltIn) {
    _inherits(Application, _Service$BuiltIn);

    function Application() {
        _classCallCheck(this, Application);

        return _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).apply(this, arguments));
    }

    _createClass(Application, null, [{
        key: 'init',
        value: function init(name) {
            var _this2 = this;

            this.super('init')();
            return new Promise(function (resolve, reject) {
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
            if (typeof indexes[_current._id] !== 'undefined') return Promise.resolve(indexes[_current._id]);
            return this.ajax({
                url: this.server + 'schemas/indexes?appman=' + _current.apiKey,
                method: 'get'
            }).then(function (d) {
                return indexes[_current._id] = d;
            });
        }
    }, {
        key: 'schema',
        get: function get() {
            if (typeof schemas[_current._id] !== 'undefined') return Promise.resolve(schemas[_current._id]);
            return this.ajax({
                url: this.server + 'schemas?appman=' + _current.apiKey,
                method: 'get'
            }).then(function (d) {
                return schemas[_current._id] = d.results;
            });
        }
    }]);

    return Application;
}(_service.Service.BuiltIn);

exports.default = Application;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9hcHAuanMiXSwibmFtZXMiOlsiX2FwcHMiLCJfY3VycmVudCIsIl9sYXN0Iiwic2NoZW1hcyIsImluZGV4ZXMiLCJkYXRhREIiLCJBcHBsaWNhdGlvbiIsIm5hbWUiLCJzdXBlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsImludGVyaW0iLCJmZXRjaCIsImQiLCJjdXJyZW50IiwiYSIsInNlcnZlciIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJzdWNjZXNzIiwiZXJyb3IiLCJodHRwY2xpZW50IiwiYXBpS2V5IiwiYmluZCIsImRvYyIsImJhc2UiLCJhcmd1bWVudHMiLCJ0aGVuIiwidXBkYXRlZCIsImZpbHRlciIsIl9pZCIsImxlbmd0aCIsInB1c2giLCJpZCIsIm5ld1NjaGVtYSIsImFqYXgiLCJjb2xOYW1lIiwidW5kZWZpbmVkIiwicmVzdWx0cyIsImFkZENvbGxlY3Rpb24iLCJ1cHNlcnQiLCJwIiwiYWxsIiwibGV2ZWwiLCJxdWVyeSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb2RlRmlsZSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiYXBwIiwiaXNDdXJyZW50QXBwIiwidiIsImVtaXQiLCJCdWlsdEluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxRQUFNLEVBQVY7QUFBQSxJQUNJQyxXQUFTLElBRGI7QUFBQSxJQUVJQyxRQUFNLElBRlY7QUFBQSxJQUdJQyxVQUFRLEVBSFo7QUFBQSxJQUlDQyxVQUFRLEVBSlQ7QUFBQSxJQUtJQyxNQUxKOztJQU9xQkMsVzs7Ozs7Ozs7Ozs7NkJBQ0xDLEksRUFBSztBQUFBOztBQUNiLGlCQUFLQyxLQUFMLENBQVcsTUFBWDtBQUNBLG1CQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDakMsdUJBQUtD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c0JuQixDQUE3QjtBQUNILGFBTE0sQ0FBUDtBQU1IOzs7NEJBRWU7QUFDWixnQkFBRyxPQUFPWixRQUFRRixTQUFTaUMsR0FBakIsQ0FBUCxLQUFnQyxXQUFuQyxFQUNJLE9BQU96QixRQUFRQyxPQUFSLENBQWdCUCxRQUFRRixTQUFTaUMsR0FBakIsQ0FBaEIsQ0FBUDtBQUNKLG1CQUFPLEtBQUtLLElBQUwsQ0FBVTtBQUNibkIscUJBQUksS0FBS0YsTUFBTCxHQUFZLGlCQUFaLEdBQThCakIsU0FBU3lCLE1BRDlCO0FBRXRCUCx3QkFBTztBQUZlLGFBQVYsRUFHSlksSUFISSxDQUdDLFVBQVNoQixDQUFULEVBQVc7QUFDZix1QkFBT1osUUFBUUYsU0FBU2lDLEdBQWpCLElBQXNCbkIsRUFBRTJCLE9BQS9CO0FBQ0gsYUFMTSxDQUFQO0FBTUg7Ozs7RUFqRm9DLGlCQUFRZ0IsTzs7a0JBQTVCcEQsVyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vc2VydmljZSdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcbmltcG9ydCB7UmVtb3RlRGJ9IGZyb20gJ21pbmltb25nbydcbmltcG9ydCBSb2xlIGZyb20gJy4vcm9sZSdcbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnXG5cbnZhciBfYXBwcz1bXSxcbiAgICBfY3VycmVudD1udWxsLFxuICAgIF9sYXN0PW51bGwsXG4gICAgc2NoZW1hcz17fSxcblx0aW5kZXhlcz17fSxcbiAgICBkYXRhREI7XG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBTZXJ2aWNlLkJ1aWx0SW57XG4gICAgc3RhdGljIGluaXQobmFtZSl7XG4gICAgICAgIHRoaXMuc3VwZXIoJ2luaXQnKSgpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmZpbmQoe30se2ludGVyaW06ZmFsc2V9KS5mZXRjaCgoZCk9PntcbiAgICAgICAgICAgICAgICBfYXBwcz1kXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShfYXBwcylcblx0XHRcdFx0aWYoIV9jdXJyZW50KVxuXHRcdFx0XHRcdEFwcGxpY2F0aW9uLmN1cnJlbnQ9KG5hbWUgPyAoZC5maW5kKGE9PmEubmFtZT09bmFtZSl8fF9hcHBzWzBdKSA6IF9hcHBzWzBdKTtcbiAgICAgICAgICAgIH0scmVqZWN0KVxuXG4gICAgICAgICAgICBkYXRhREI9bmV3IFJlbW90ZURiKHRoaXMuc2VydmVyKydjbGFzc2VzLycse30sZnVuY3Rpb24obWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cGNsaWVudChtZXRob2QsIHVybCwgcGFyYW1zLCBkYXRhLCBzdWNjZXNzLCBlcnJvciwgX2N1cnJlbnQuYXBpS2V5KVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyB1cHNlcnQoZG9jLCBiYXNlLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIHJldHVybiB0aGlzLnN1cGVyKCd1cHNlcnQnKSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih1cGRhdGVkKXtcbiAgICAgICAgICAgICAgICBpZihfYXBwcy5maWx0ZXIoYT0+YS5faWQ9PXVwZGF0ZWQuX2lkKS5sZW5ndGg9PTApXG4gICAgICAgICAgICAgICAgICAgIF9hcHBzLnB1c2godXBkYXRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmUoaWQsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VwZXIoJ3JlbW92ZScpKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgX2FwcHM9X2FwcHMuZmlsdGVyKChhKT0+YS5faWQhPWlkKVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudD1fYXBwc1swXVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdhcHBzJ1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGFsbCgpe1xuICAgICAgICByZXR1cm4gX2FwcHNcbiAgICB9XG4gICAgc3RhdGljIGdldCBjdXJyZW50KCl7XG4gICAgICAgIHJldHVybiBfY3VycmVudFxuICAgIH1cbiAgICBzdGF0aWMgc2V0IGN1cnJlbnQodil7XG5cdFx0aWYodHlwZW9mKHYpPT0nc3RyaW5nJylcblx0XHRcdHY9X2FwcHMuZmluZChhPT5hLm5hbWU9PXYpXG5cblx0XHR2PXYgfHwgbnVsbFxuXG4gICAgICAgIGlmKHYhPV9jdXJyZW50KXtcblx0XHRcdF9sYXN0PV9jdXJyZW50XG5cdFx0XHRfY3VycmVudD12XG5cdFx0XHR0aGlzLmVtaXQoJ2NoYW5nZScsX2N1cnJlbnQsX2xhc3QpXG5cdFx0fVxuICAgICAgICByZXR1cm4gX2N1cnJlbnRcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGxhc3QoKXtcbiAgICAgICAgcmV0dXJuIF9sYXN0XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBpbmRleGVzKCl7XG4gICAgICAgIGlmKHR5cGVvZihpbmRleGVzW19jdXJyZW50Ll9pZF0pIT09J3VuZGVmaW5lZCcpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluZGV4ZXNbX2N1cnJlbnQuX2lkXSlcbiAgICAgICAgcmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXMvaW5kZXhlcz9hcHBtYW49JytfY3VycmVudC5hcGlLZXksXG5cdFx0XHRtZXRob2Q6J2dldCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIHJldHVybiBpbmRleGVzW19jdXJyZW50Ll9pZF09ZFxuICAgICAgICB9KVxuICAgIH1cblxuXHRzdGF0aWMgZ2V0IHNjaGVtYSgpe1xuICAgICAgICBpZih0eXBlb2Yoc2NoZW1hc1tfY3VycmVudC5faWRdKSE9PSd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY2hlbWFzW19jdXJyZW50Ll9pZF0pXG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleSxcblx0XHRcdG1ldGhvZDonZ2V0J1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYXNbX2N1cnJlbnQuX2lkXT1kLnJlc3VsdHNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0U2NoZW1hKG5ld1NjaGVtYSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXM/YXBwbWFuPScrX2N1cnJlbnQuYXBpS2V5LFxuXHRcdFx0bWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgIGRhdGE6bmV3U2NoZW1hXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWFzW19jdXJyZW50Ll9pZF09bmV3U2NoZW1hXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbGxlY3Rpb25EYXRhKGNvbE5hbWUsIGRhdGEpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICBcdFx0aWYoZGF0YT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzLycrY29sTmFtZSsnP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGEpPT5yZXNvbHZlKGEucmVzdWx0cyksIHJlamVjdClcbiAgICBcdFx0ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRhREIuYWRkQ29sbGVjdGlvbihjb2xOYW1lKVxuICAgICAgICAgICAgICAgIGRhdGFEQltjb2xOYW1lXS51cHNlcnQoZGF0YSwoYSk9PnJlc29sdmUoYSksIHJlamVjdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICB9XG5cbiAgICBzdGF0aWMgY29sbGVjdGlvbkluZGV4ZXMoY29sTmFtZSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmluZGV4ZXMudGhlbihmdW5jdGlvbihhbGwpe1xuICAgIFx0XHRcdHJlc29sdmUoYWxsW2NvbE5hbWVdIHx8IFtdKVxuICAgIFx0XHR9LCByZWplY3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGdldExvZyhsZXZlbCl7XG4gICAgICAgIHZhciBxdWVyeT1sZXZlbCA/IEpTT04uc3RyaW5naWZ5KHtsZXZlbH0pIDogXCJ7fVwiXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNjaGVtYXMvbG9ncz9hcHBtYW49JHtfY3VycmVudC5hcGlLZXl9JnF1ZXJ5PSR7cXVlcnl9JmxpbWl0PTIwYFxuICAgICAgICAgICAgfSkudGhlbigoYSk9PnJlc29sdmUoYS5yZXN1bHRzKSwgcmVqZWN0KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBkb3dubG9hZCgpe1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHVwbG9hZChjb2RlRmlsZSl7XG4gICAgICAgIHZhciBkYXRhPW5ldyBGb3JtRGF0YSgpXG4gICAgICAgIGRhdGEuYXBwZW5kKCdjbGllbnRjb2RlJyxjb2RlRmlsZSwgXCJhbGxpbjEuaHRtbFwiKVxuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9c2NoZW1hcy9jbGllbnRjb2RlP2FwcG1hbj0ke19jdXJyZW50LmFwaUtleX1gLFxuICAgICAgICAgICAgZGF0YVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBpc1JlbW92YWJsZShhcHApe1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNDdXJyZW50QXBwKGFwcC5faWQpXG4gICAgfVxufVxuIl19