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
    _current,
    _last,
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
        value: function init() {
            var _this2 = this;

            this.super('init')();
            return new Promise(function (resolve, reject) {
                _this2.find({}, { interim: false }).fetch(function (d) {
                    _apps = d;
                    resolve();
                    Application.current = _apps[0];
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
            if (!old && !v) return _current = v;

            var _ref = _current || {};

            var old = _ref._id;
            var next = v._id;

            _last = _current;
            _current = v;
            this.emit('change', _current, _last);
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
//# sourceMappingURL=data:application/json;base64,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aEMsRUFDQyxPQUFPLFFBQVEsT0FBUixDQUFnQixRQUFRLFNBQVMsR0FBVCxDQUF4QixDQUFQLENBREo7QUFFQSxtQkFBTyxLQUFLLElBQUwsQ0FBVTtBQUNiLHFCQUFJLEtBQUssTUFBTCxHQUFZLGlCQUFaLEdBQThCLFNBQVMsTUFBVDtBQUMzQyx3QkFBTyxLQUFQO2FBRlksRUFHSixJQUhJLENBR0MsVUFBUyxDQUFULEVBQVc7QUFDZix1QkFBTyxRQUFRLFNBQVMsR0FBVCxDQUFSLEdBQXNCLEVBQUUsT0FBRixDQURkO2FBQVgsQ0FIUixDQUhZOzs7O1dBckVDO0VBQW9CLGlCQUFRLE9BQVI7O2tCQUFwQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vc2VydmljZSdcbmltcG9ydCBVc2VyIGZyb20gJy4vdXNlcidcbmltcG9ydCB7UmVtb3RlRGJ9IGZyb20gJ21pbmltb25nbydcbmltcG9ydCBSb2xlIGZyb20gJy4vcm9sZSdcbmltcG9ydCBGaWxlIGZyb20gJy4vZmlsZSdcbmltcG9ydCBMb2cgZnJvbSAnLi9sb2cnXG5cbnZhciBfYXBwcz1bXSxcbiAgICBfY3VycmVudCxcbiAgICBfbGFzdCxcbiAgICBzY2hlbWFzPXt9LFxuXHRpbmRleGVzPXt9LFxuICAgIGRhdGFEQjtcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcbiAgICBzdGF0aWMgaW5pdCgpe1xuICAgICAgICB0aGlzLnN1cGVyKCdpbml0JykoKVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5maW5kKHt9LHtpbnRlcmltOmZhbHNlfSkuZmV0Y2goKGQpPT57XG4gICAgICAgICAgICAgICAgX2FwcHM9ZFxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uLmN1cnJlbnQ9X2FwcHNbMF07XG4gICAgICAgICAgICB9LHJlamVjdClcblxuICAgICAgICAgICAgZGF0YURCPW5ldyBSZW1vdGVEYih0aGlzLnNlcnZlcisnY2xhc3Nlcy8nLHt9LGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgICAgICAgICB0aGlzLmh0dHBjbGllbnQobWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9jdXJyZW50LmFwaUtleSlcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBzZXJ0KGRvYywgYmFzZSwgc3VjY2VzcywgZXJyb3Ipe1xuICAgICAgICByZXR1cm4gdGhpcy5zdXBlcigndXBzZXJ0JykoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXBkYXRlZCl7XG4gICAgICAgICAgICAgICAgaWYoX2FwcHMuZmlsdGVyKGE9PmEuX2lkPT11cGRhdGVkLl9pZCkubGVuZ3RoPT0wKVxuICAgICAgICAgICAgICAgICAgICBfYXBwcy5wdXNoKHVwZGF0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlKGlkLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIHJldHVybiB0aGlzLnN1cGVyKCdyZW1vdmUnKSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIF9hcHBzPV9hcHBzLmZpbHRlcigoYSk9PmEuX2lkIT1pZClcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQ9X2FwcHNbMF1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAnYXBwcydcbiAgICB9XG4gICAgc3RhdGljIGdldCBhbGwoKXtcbiAgICAgICAgcmV0dXJuIF9hcHBzXG4gICAgfVxuICAgIHN0YXRpYyBnZXQgY3VycmVudCgpe1xuICAgICAgICByZXR1cm4gX2N1cnJlbnRcbiAgICB9XG4gICAgc3RhdGljIHNldCBjdXJyZW50KHYpe1xuICAgICAgICBpZiAoIW9sZCAmJiAhdilcbiAgICAgICAgICAgIHJldHVybiBfY3VycmVudD12XG5cbiAgICAgICAgdmFyIHtfaWQ6b2xkfT1fY3VycmVudHx8e30sXG4gICAgICAgICAgICB7X2lkOm5leHR9PXY7XG4gICAgICAgIF9sYXN0PV9jdXJyZW50XG4gICAgICAgIF9jdXJyZW50PXZcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLF9jdXJyZW50LF9sYXN0KVxuICAgICAgICByZXR1cm4gX2N1cnJlbnRcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGxhc3QoKXtcbiAgICAgICAgcmV0dXJuIF9sYXN0XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBpbmRleGVzKCl7XG4gICAgICAgIGlmKHR5cGVvZihpbmRleGVzW19jdXJyZW50Ll9pZF0pIT09J3VuZGVmaW5lZCcpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluZGV4ZXNbX2N1cnJlbnQuX2lkXSlcbiAgICAgICAgcmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXMvaW5kZXhlcz9hcHBtYW49JytfY3VycmVudC5hcGlLZXksXG5cdFx0XHRtZXRob2Q6J2dldCdcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihkKXtcbiAgICAgICAgICAgIHJldHVybiBpbmRleGVzW19jdXJyZW50Ll9pZF09ZFxuICAgICAgICB9KVxuICAgIH1cblxuXHRzdGF0aWMgZ2V0IHNjaGVtYSgpe1xuICAgICAgICBpZih0eXBlb2Yoc2NoZW1hc1tfY3VycmVudC5faWRdKSE9PSd1bmRlZmluZWQnKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY2hlbWFzW19jdXJyZW50Ll9pZF0pXG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleSxcblx0XHRcdG1ldGhvZDonZ2V0J1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGQpe1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYXNbX2N1cnJlbnQuX2lkXT1kLnJlc3VsdHNcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0U2NoZW1hKG5ld1NjaGVtYSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrJ3NjaGVtYXM/YXBwbWFuPScrX2N1cnJlbnQuYXBpS2V5LFxuXHRcdFx0bWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgIGRhdGE6bmV3U2NoZW1hXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiBzY2hlbWFzW19jdXJyZW50Ll9pZF09bmV3U2NoZW1hXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGNvbGxlY3Rpb25EYXRhKGNvbE5hbWUsIGRhdGEpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICBcdFx0aWYoZGF0YT09dW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyKydzY2hlbWFzLycrY29sTmFtZSsnP2FwcG1hbj0nK19jdXJyZW50LmFwaUtleVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGEpPT5yZXNvbHZlKGEucmVzdWx0cyksIHJlamVjdClcbiAgICBcdFx0ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRhREIuYWRkQ29sbGVjdGlvbihjb2xOYW1lKVxuICAgICAgICAgICAgICAgIGRhdGFEQltjb2xOYW1lXS51cHNlcnQoZGF0YSwoYSk9PnJlc29sdmUoYSksIHJlamVjdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHBcbiAgICB9XG5cbiAgICBzdGF0aWMgY29sbGVjdGlvbkluZGV4ZXMoY29sTmFtZSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLmluZGV4ZXMudGhlbihmdW5jdGlvbihhbGwpe1xuICAgIFx0XHRcdHJlc29sdmUoYWxsW2NvbE5hbWVdIHx8IFtdKVxuICAgIFx0XHR9LCByZWplY3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGdldExvZyhsZXZlbCl7XG4gICAgICAgIHZhciBxdWVyeT1sZXZlbCA/IEpTT04uc3RyaW5naWZ5KHtsZXZlbH0pIDogXCJ7fVwiXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5hamF4KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNjaGVtYXMvbG9ncz9hcHBtYW49JHtfY3VycmVudC5hcGlLZXl9JnF1ZXJ5PSR7cXVlcnl9YFxuICAgICAgICAgICAgfSkudGhlbigoYSk9PnJlc29sdmUoYS5yZXN1bHRzKSwgcmVqZWN0KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBkb3dubG9hZCgpe1xuXG4gICAgfVxuXG4gICAgc3RhdGljIHVwbG9hZChjb2RlRmlsZSl7XG4gICAgICAgIHZhciBkYXRhPW5ldyBGb3JtRGF0YSgpXG4gICAgICAgIGRhdGEuYXBwZW5kKCdjbGllbnRjb2RlJyxjb2RlRmlsZSwgXCJhbGxpbjEuaHRtbFwiKVxuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9c2NoZW1hcy9jbGllbnRjb2RlP2FwcG1hbj0ke19jdXJyZW50LmFwaUtleX1gLFxuICAgICAgICAgICAgZGF0YVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBpc1JlbW92YWJsZShhcHApe1xuICAgICAgICByZXR1cm4gIXRoaXMuaXNDdXJyZW50QXBwKGFwcC5faWQpXG4gICAgfVxufVxuIl19