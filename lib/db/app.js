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
                    resolve();
                    if (!_current) Application.current = name ? d.find(function (a) {
                        return a.name == name;
                    }) : _apps[0];
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
                    url: _this5.server + 'schemas/logs?appman=' + _current.apiKey + '&query=' + query
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9hcHAuanMiXSwibmFtZXMiOlsiX2FwcHMiLCJfY3VycmVudCIsIl9sYXN0Iiwic2NoZW1hcyIsImluZGV4ZXMiLCJkYXRhREIiLCJBcHBsaWNhdGlvbiIsIm5hbWUiLCJzdXBlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmluZCIsImludGVyaW0iLCJmZXRjaCIsImQiLCJjdXJyZW50IiwiYSIsInNlcnZlciIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJzdWNjZXNzIiwiZXJyb3IiLCJodHRwY2xpZW50IiwiYXBpS2V5IiwiYmluZCIsImRvYyIsImJhc2UiLCJhcmd1bWVudHMiLCJ0aGVuIiwidXBkYXRlZCIsImZpbHRlciIsIl9pZCIsImxlbmd0aCIsInB1c2giLCJpZCIsIm5ld1NjaGVtYSIsImFqYXgiLCJjb2xOYW1lIiwidW5kZWZpbmVkIiwicmVzdWx0cyIsImFkZENvbGxlY3Rpb24iLCJ1cHNlcnQiLCJwIiwiYWxsIiwibGV2ZWwiLCJxdWVyeSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb2RlRmlsZSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiYXBwIiwiaXNDdXJyZW50QXBwIiwidiIsImVtaXQiLCJCdWlsdEluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxRQUFNLEVBQVY7QUFBQSxJQUNJQyxXQUFTLElBRGI7QUFBQSxJQUVJQyxRQUFNLElBRlY7QUFBQSxJQUdJQyxVQUFRLEVBSFo7QUFBQSxJQUlDQyxVQUFRLEVBSlQ7QUFBQSxJQUtJQyxNQUxKOztJQU9xQkMsVzs7Ozs7Ozs7Ozs7NkJBQ0xDLEksRUFBSztBQUFBOztBQUNiLGlCQUFLQyxLQUFMLENBQVcsTUFBWDtBQUNBLG1CQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDakMsdUJBQUtD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QUVlO0FBQ1osZ0JBQUcsT0FBT1osUUFBUUYsU0FBU2lDLEdBQWpCLENBQVAsS0FBZ0MsV0FBbkMsRUFDSSxPQUFPekIsUUFBUUMsT0FBUixDQUFnQlAsUUFBUUYsU0FBU2lDLEdBQWpCLENBQWhCLENBQVA7QUFDSixtQkFBTyxLQUFLSyxJQUFMLENBQVU7QUFDYm5CLHFCQUFJLEtBQUtGLE1BQUwsR0FBWSxpQkFBWixHQUE4QmpCLFNBQVN5QixNQUQ5QjtBQUV0QlAsd0JBQU87QUFGZSxhQUFWLEVBR0pZLElBSEksQ0FHQyxVQUFTaEIsQ0FBVCxFQUFXO0FBQ2YsdUJBQU9aLFFBQVFGLFNBQVNpQyxHQUFqQixJQUFzQm5CLEVBQUUyQixPQUEvQjtBQUNILGFBTE0sQ0FBUDtBQU1IOzs7O0VBakZvQyxpQkFBUWdCLE87O2tCQUE1QnBELFciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnXG5pbXBvcnQgVXNlciBmcm9tICcuL3VzZXInXG5pbXBvcnQge1JlbW90ZURifSBmcm9tICdtaW5pbW9uZ28nXG5pbXBvcnQgUm9sZSBmcm9tICcuL3JvbGUnXG5pbXBvcnQgRmlsZSBmcm9tICcuL2ZpbGUnXG5pbXBvcnQgTG9nIGZyb20gJy4vbG9nJ1xuXG52YXIgX2FwcHM9W10sXG4gICAgX2N1cnJlbnQ9bnVsbCxcbiAgICBfbGFzdD1udWxsLFxuICAgIHNjaGVtYXM9e30sXG5cdGluZGV4ZXM9e30sXG4gICAgZGF0YURCO1xuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuICAgIHN0YXRpYyBpbml0KG5hbWUpe1xuICAgICAgICB0aGlzLnN1cGVyKCdpbml0JykoKVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5maW5kKHt9LHtpbnRlcmltOmZhbHNlfSkuZmV0Y2goKGQpPT57XG4gICAgICAgICAgICAgICAgX2FwcHM9ZFxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuXHRcdFx0XHRpZighX2N1cnJlbnQpXG5cdFx0XHRcdFx0QXBwbGljYXRpb24uY3VycmVudD1uYW1lID8gZC5maW5kKGE9PmEubmFtZT09bmFtZSkgOiBfYXBwc1swXTtcbiAgICAgICAgICAgIH0scmVqZWN0KVxuXG4gICAgICAgICAgICBkYXRhREI9bmV3IFJlbW90ZURiKHRoaXMuc2VydmVyKydjbGFzc2VzLycse30sZnVuY3Rpb24obWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cGNsaWVudChtZXRob2QsIHVybCwgcGFyYW1zLCBkYXRhLCBzdWNjZXNzLCBlcnJvciwgX2N1cnJlbnQuYXBpS2V5KVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyB1cHNlcnQoZG9jLCBiYXNlLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIHJldHVybiB0aGlzLnN1cGVyKCd1cHNlcnQnKSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih1cGRhdGVkKXtcbiAgICAgICAgICAgICAgICBpZihfYXBwcy5maWx0ZXIoYT0+YS5faWQ9PXVwZGF0ZWQuX2lkKS5sZW5ndGg9PTApXG4gICAgICAgICAgICAgICAgICAgIF9hcHBzLnB1c2godXBkYXRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmUoaWQsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VwZXIoJ3JlbW92ZScpKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgX2FwcHM9X2FwcHMuZmlsdGVyKChhKT0+YS5faWQhPWlkKVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudD1fYXBwc1swXVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdhcHBzJ1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGFsbCgpe1xuICAgICAgICByZXR1cm4gX2FwcHNcbiAgICB9XG4gICAgc3RhdGljIGdldCBjdXJyZW50KCl7XG4gICAgICAgIHJldHVybiBfY3VycmVudFxuICAgIH1cbiAgICBzdGF0aWMgc2V0IGN1cnJlbnQodil7XG5cdFx0aWYodHlwZW9mKHYpPT0nc3RyaW5nJylcblx0XHRcdHY9X2FwcHMuZmluZChhPT5hLm5hbWU9PXYpXG5cdFx0XG5cdFx0dj12IHx8IG51bGxcblx0XHRcbiAgICAgICAgaWYodiE9X2N1cnJlbnQpe1xuXHRcdFx0X2xhc3Q9X2N1cnJlbnRcblx0XHRcdF9jdXJyZW50PXZcblx0XHRcdHRoaXMuZW1pdCgnY2hhbmdlJyxfY3VycmVudCxfbGFzdClcblx0XHR9XG4gICAgICAgIHJldHVybiBfY3VycmVudFxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbGFzdCgpe1xuICAgICAgICByZXR1cm4gX2xhc3RcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGluZGV4ZXMoKXtcbiAgICAgICAgaWYodHlwZW9mKGluZGV4ZXNbX2N1cnJlbnQuX2lkXSkhPT0ndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5kZXhlc1tfY3VycmVudC5faWRdKVxuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIHVybDp0aGlzLnNlcnZlcisnc2NoZW1hcy9pbmRleGVzP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleSxcblx0XHRcdG1ldGhvZDonZ2V0J1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ZXNbX2N1cnJlbnQuX2lkXT1kXG4gICAgICAgIH0pXG4gICAgfVxuXG5cdHN0YXRpYyBnZXQgc2NoZW1hKCl7XG4gICAgICAgIGlmKHR5cGVvZihzY2hlbWFzW19jdXJyZW50Ll9pZF0pIT09J3VuZGVmaW5lZCcpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNjaGVtYXNbX2N1cnJlbnQuX2lkXSlcbiAgICAgICAgcmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXM/YXBwbWFuPScrX2N1cnJlbnQuYXBpS2V5LFxuXHRcdFx0bWV0aG9kOidnZXQnXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZCl7XG4gICAgICAgICAgICByZXR1cm4gc2NoZW1hc1tfY3VycmVudC5faWRdPWQucmVzdWx0c1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBzZXRTY2hlbWEobmV3U2NoZW1hKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIHVybDp0aGlzLnNlcnZlcisnc2NoZW1hcz9hcHBtYW49JytfY3VycmVudC5hcGlLZXksXG5cdFx0XHRtZXRob2Q6J3Bvc3QnLFxuICAgICAgICAgICAgZGF0YTpuZXdTY2hlbWFcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYXNbX2N1cnJlbnQuX2lkXT1uZXdTY2hlbWFcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgY29sbGVjdGlvbkRhdGEoY29sTmFtZSwgZGF0YSl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgIFx0XHRpZihkYXRhPT11bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidnZXQnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXMvJytjb2xOYW1lKyc/YXBwbWFuPScrX2N1cnJlbnQuYXBpS2V5XG4gICAgICAgICAgICAgICAgfSkudGhlbigoYSk9PnJlc29sdmUoYS5yZXN1bHRzKSwgcmVqZWN0KVxuICAgIFx0XHRlbHNle1xuICAgICAgICAgICAgICAgIGRhdGFEQi5hZGRDb2xsZWN0aW9uKGNvbE5hbWUpXG4gICAgICAgICAgICAgICAgZGF0YURCW2NvbE5hbWVdLnVwc2VydChkYXRhLChhKT0+cmVzb2x2ZShhKSwgcmVqZWN0KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcFxuICAgIH1cblxuICAgIHN0YXRpYyBjb2xsZWN0aW9uSW5kZXhlcyhjb2xOYW1lKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlcy50aGVuKGZ1bmN0aW9uKGFsbCl7XG4gICAgXHRcdFx0cmVzb2x2ZShhbGxbY29sTmFtZV0gfHwgW10pXG4gICAgXHRcdH0sIHJlamVjdClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0TG9nKGxldmVsKXtcbiAgICAgICAgdmFyIHF1ZXJ5PWxldmVsID8gSlNPTi5zdHJpbmdpZnkoe2xldmVsfSkgOiBcInt9XCJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcbiAgICAgICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9c2NoZW1hcy9sb2dzP2FwcG1hbj0ke19jdXJyZW50LmFwaUtleX0mcXVlcnk9JHtxdWVyeX1gXG4gICAgICAgICAgICB9KS50aGVuKChhKT0+cmVzb2x2ZShhLnJlc3VsdHMpLCByZWplY3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGRvd25sb2FkKCl7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgdXBsb2FkKGNvZGVGaWxlKXtcbiAgICAgICAgdmFyIGRhdGE9bmV3IEZvcm1EYXRhKClcbiAgICAgICAgZGF0YS5hcHBlbmQoJ2NsaWVudGNvZGUnLGNvZGVGaWxlLCBcImFsbGluMS5odG1sXCIpXG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgIHVybDpgJHt0aGlzLnNlcnZlcn1zY2hlbWFzL2NsaWVudGNvZGU/YXBwbWFuPSR7X2N1cnJlbnQuYXBpS2V5fWAsXG4gICAgICAgICAgICBkYXRhXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGlzUmVtb3ZhYmxlKGFwcCl7XG4gICAgICAgIHJldHVybiAhdGhpcy5pc0N1cnJlbnRBcHAoYXBwLl9pZClcbiAgICB9XG59XG4iXX0=