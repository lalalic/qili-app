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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Application).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,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VCxFQUFXO0FBQ2YsdUJBQU8sUUFBUSxTQUFTLEdBQVQsQ0FBUixHQUFzQixDQUF0QixDQURRO2FBQVgsQ0FIUixDQUhnQjs7Ozs0QkFXSjtBQUNaLGdCQUFHLE9BQU8sUUFBUSxTQUFTLEdBQVQsQ0FBZixLQUFnQyxXQUFoQyxFQUNDLE9BQU8sUUFBUSxPQUFSLENBQWdCLFFBQVEsU0FBUyxHQUFULENBQXhCLENBQVAsQ0FESjtBQUVBLG1CQUFPLEtBQUssSUFBTCxDQUFVO0FBQ2IscUJBQUksS0FBSyxNQUFMLEdBQVksaUJBQVosR0FBOEIsU0FBUyxNQUFUO0FBQzNDLHdCQUFPLEtBQVA7YUFGWSxFQUdKLElBSEksQ0FHQyxVQUFTLENBQVQsRUFBVztBQUNmLHVCQUFPLFFBQVEsU0FBUyxHQUFULENBQVIsR0FBc0IsRUFBRSxPQUFGLENBRGQ7YUFBWCxDQUhSLENBSFk7Ozs7V0F4RUM7RUFBb0IsaUJBQVEsT0FBUjs7a0JBQXBCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuaW1wb3J0IFVzZXIgZnJvbSAnLi91c2VyJ1xuaW1wb3J0IHtSZW1vdGVEYn0gZnJvbSAnbWluaW1vbmdvJ1xuaW1wb3J0IFJvbGUgZnJvbSAnLi9yb2xlJ1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlJ1xuaW1wb3J0IExvZyBmcm9tICcuL2xvZydcblxudmFyIF9hcHBzPVtdLFxuICAgIF9jdXJyZW50PW51bGwsXG4gICAgX2xhc3Q9bnVsbCxcbiAgICBzY2hlbWFzPXt9LFxuXHRpbmRleGVzPXt9LFxuICAgIGRhdGFEQjtcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcbiAgICBzdGF0aWMgaW5pdChuYW1lKXtcbiAgICAgICAgdGhpcy5zdXBlcignaW5pdCcpKClcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMuZmluZCh7fSx7aW50ZXJpbTpmYWxzZX0pLmZldGNoKChkKT0+e1xuICAgICAgICAgICAgICAgIF9hcHBzPWRcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcblx0XHRcdFx0aWYoIV9jdXJyZW50KVxuXHRcdFx0XHRcdEFwcGxpY2F0aW9uLmN1cnJlbnQ9bmFtZSA/IGQuZmluZChhPT5hLm5hbWU9PW5hbWUpIDogX2FwcHNbMF07XG4gICAgICAgICAgICB9LHJlamVjdClcblxuICAgICAgICAgICAgZGF0YURCPW5ldyBSZW1vdGVEYih0aGlzLnNlcnZlcisnY2xhc3Nlcy8nLHt9LGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHBjbGllbnQobWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9jdXJyZW50LmFwaUtleSlcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBzZXJ0KGRvYywgYmFzZSwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICByZXR1cm4gdGhpcy5zdXBlcigndXBzZXJ0JykoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXBkYXRlZCl7XG4gICAgICAgICAgICAgICAgaWYoX2FwcHMuZmlsdGVyKGE9PmEuX2lkPT11cGRhdGVkLl9pZCkubGVuZ3RoPT0wKVxuICAgICAgICAgICAgICAgICAgICBfYXBwcy5wdXNoKHVwZGF0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlKGlkLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIHJldHVybiB0aGlzLnN1cGVyKCdyZW1vdmUnKSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIF9hcHBzPV9hcHBzLmZpbHRlcigoYSk9PmEuX2lkIT1pZClcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQ9X2FwcHNbMF1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAnYXBwcydcbiAgICB9XG4gICAgc3RhdGljIGdldCBhbGwoKXtcbiAgICAgICAgcmV0dXJuIF9hcHBzXG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY3VycmVudCgpe1xuICAgICAgICByZXR1cm4gX2N1cnJlbnRcbiAgICB9XG4gICAgc3RhdGljIHNldCBjdXJyZW50KHYpe1xuXHRcdGlmKHR5cGVvZih2KT09J3N0cmluZycpXG5cdFx0XHR2PV9hcHBzLmZpbmQoYT0+YS5uYW1lPT12KVxuXHRcdFxuXHRcdHY9diB8fCBudWxsXG5cdFx0XG4gICAgICAgIGlmKHYhPV9jdXJyZW50KXtcblx0XHRcdF9sYXN0PV9jdXJyZW50XG5cdFx0XHRfY3VycmVudD12XG5cdFx0XHR0aGlzLmVtaXQoJ2NoYW5nZScsX2N1cnJlbnQsX2xhc3QpXG5cdFx0fVxuICAgICAgICByZXR1cm4gX2N1cnJlbnRcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGxhc3QoKXtcbiAgICAgICAgcmV0dXJuIF9sYXN0XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBpbmRleGVzKCl7XG4gICAgICAgIGlmKHR5cGVvZihpbmRleGVzW19jdXJyZW50Ll9pZF0pIT09J3VuZGVmaW5lZCcpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluZGV4ZXNbX2N1cnJlbnQuX2lkXSlcbiAgICAgICAgcmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXMvaW5kZXhlcz9hcHBtYW49JytfY3VycmVudC5hcGlLZXksXG5cdFx0XHRtZXRob2Q6J2dldCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIHJldHVybiBpbmRleGVzW19jdXJyZW50Ll9pZF09ZFxuICAgICAgICB9KVxuICAgIH1cblxuXHRzdGF0aWMgZ2V0IHNjaGVtYSgpe1xuICAgICAgICBpZih0eXBlb2Yoc2NoZW1hc1tfY3VycmVudC5faWRdKSE9PSd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY2hlbWFzW19jdXJyZW50Ll9pZF0pXG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleSxcblx0XHRcdG1ldGhvZDonZ2V0J1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYXNbX2N1cnJlbnQuX2lkXT1kLnJlc3VsdHNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0U2NoZW1hKG5ld1NjaGVtYSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXM/YXBwbWFuPScrX2N1cnJlbnQuYXBpS2V5LFxuXHRcdFx0bWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgIGRhdGE6bmV3U2NoZW1hXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWFzW19jdXJyZW50Ll9pZF09bmV3U2NoZW1hXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbGxlY3Rpb25EYXRhKGNvbE5hbWUsIGRhdGEpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICBcdFx0aWYoZGF0YT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzLycrY29sTmFtZSsnP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGEpPT5yZXNvbHZlKGEucmVzdWx0cyksIHJlamVjdClcbiAgICBcdFx0ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRhREIuYWRkQ29sbGVjdGlvbihjb2xOYW1lKVxuICAgICAgICAgICAgICAgIGRhdGFEQltjb2xOYW1lXS51cHNlcnQoZGF0YSwoYSk9PnJlc29sdmUoYSksIHJlamVjdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICB9XG5cbiAgICBzdGF0aWMgY29sbGVjdGlvbkluZGV4ZXMoY29sTmFtZSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmluZGV4ZXMudGhlbihmdW5jdGlvbihhbGwpe1xuICAgIFx0XHRcdHJlc29sdmUoYWxsW2NvbE5hbWVdIHx8IFtdKVxuICAgIFx0XHR9LCByZWplY3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGdldExvZyhsZXZlbCl7XG4gICAgICAgIHZhciBxdWVyeT1sZXZlbCA/IEpTT04uc3RyaW5naWZ5KHtsZXZlbH0pIDogXCJ7fVwiXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNjaGVtYXMvbG9ncz9hcHBtYW49JHtfY3VycmVudC5hcGlLZXl9JnF1ZXJ5PSR7cXVlcnl9YFxuICAgICAgICAgICAgfSkudGhlbigoYSk9PnJlc29sdmUoYS5yZXN1bHRzKSwgcmVqZWN0KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBkb3dubG9hZCgpe1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHVwbG9hZChjb2RlRmlsZSl7XG4gICAgICAgIHZhciBkYXRhPW5ldyBGb3JtRGF0YSgpXG4gICAgICAgIGRhdGEuYXBwZW5kKCdjbGllbnRjb2RlJyxjb2RlRmlsZSwgXCJhbGxpbjEuaHRtbFwiKVxuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9c2NoZW1hcy9jbGllbnRjb2RlP2FwcG1hbj0ke19jdXJyZW50LmFwaUtleX1gLFxuICAgICAgICAgICAgZGF0YVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBpc1JlbW92YWJsZShhcHApe1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNDdXJyZW50QXBwKGFwcC5faWQpXG4gICAgfVxufVxuIl19