'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Service = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _httpclient,
    _server,
    _db,
    __localStorage,
    __emitter = new _events.EventEmitter();

var Service = exports.Service = function () {
    function Service() {
        _classCallCheck(this, Service);

        this.db = _db;
        this.cols = Service.cols;
    }

    _createClass(Service, null, [{
        key: 'upsert',
        value: function upsert(doc, base, success, error) {
            if (Array.isArray(doc)) throw new Error("upsert doesn't support array");
            return this.cols.upsert(doc, base, success, error).then(function (updated) {
                this.emit('upserted', updated, base, error);
                return updated;
            }.bind(this));
        }
    }, {
        key: 'remove',
        value: function remove(id, success, error) {
            if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) == 'object') throw new Error('id should be string, instead of object when removing');

            return this.cols.remove(id, success, error).then(function () {
                this.emit('removed', id, error);
            }.bind(this));
        }
    }, {
        key: 'find',
        value: function find() {
            var _cols;

            return (_cols = this.cols).find.apply(_cols, arguments);
        }
    }, {
        key: 'findOne',
        value: function findOne() {
            var _cols2;

            return (_cols2 = this.cols).findOne.apply(_cols2, arguments);
        }
    }, {
        key: 'ajax',
        value: function ajax(o) {
            return new Promise(function (resolve, reject) {
                var context = o.context;
                var method = o.method;
                var url = o.url;
                var params = o.params;
                var data = o.data;
                var _success = o._success;
                var _error = o._error;
                var _apiKey = o._apiKey;
                var _sessionToken = o._sessionToken;


                function success(r) {
                    resolve(_success && _success.apply(context, arguments) || r);
                }

                function error(r, status) {
                    reject(_error && _error.apply(context, arguments) || new Error(r));
                }

                _httpclient(method, url, params, data, success, error, _apiKey, _sessionToken);
            });
        }
    }, {
        key: 'httpclient',
        value: function httpclient() {
            return _httpclient.apply(this, arguments);
        }
    }, {
        key: 'init',
        value: function init(opt, db, httpclient, server, tempStorage) {
            if (db) {
                _db = db;
                __localStorage = tempStorage;
                httpclient && (_httpclient = httpclient);
                server && (_server = server);
            }

            if (this._name) {
                if (opt === true) {
                    //local only
                    _db.localDb.addCollection(this._name);
                    this._cols = _db.localDb[this._name];
                } else {
                    _db.addCollection(this._name, opt);
                    this._cols = _db[this._name];
                }
            }
        }
    }, {
        key: 'super',
        value: function _super(f) {
            return this.__proto__[f].bind(this);
        }
    }, {
        key: 'emit',
        value: function emit(type) {
            for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                others[_key - 1] = arguments[_key];
            }

            __emitter.emit.apply(__emitter, [this._name + '.' + type].concat(others, [this]));
            __emitter.emit.apply(__emitter, [type].concat(others, [this]));
        }
    }, {
        key: 'on',
        value: function on(type) {
            for (var _len2 = arguments.length, others = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                others[_key2 - 1] = arguments[_key2];
            }

            __emitter.on.apply(__emitter, ['' + (this._name ? this._name + '.' : '') + type].concat(others));
        }
    }, {
        key: 'removeListener',
        value: function removeListener(type) {
            for (var _len3 = arguments.length, others = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                others[_key3 - 1] = arguments[_key3];
            }

            __emitter.removeListener.apply(__emitter, ['' + (this._name ? this._name + '.' : '') + type].concat(others));
        }
    }, {
        key: 'server',
        get: function get() {
            return _server;
        }
    }, {
        key: 'cols',
        get: function get() {
            if (this._cols) return this._cols;
            if (this._name) {
                _db.addCollection(this._name);
                this._cols = _db[this._name];
            }
            return this._cols;
        }
    }, {
        key: 'localStorage',
        get: function get() {
            return __localStorage;
        }
    }]);

    return Service;
}();

var BuiltIn = function (_Service) {
    _inherits(BuiltIn, _Service);

    function BuiltIn() {
        _classCallCheck(this, BuiltIn);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BuiltIn).apply(this, arguments));
    }

    _createClass(BuiltIn, null, [{
        key: 'init',
        value: function init() {
            Service.init.call(this, { url: this.server + this._name, interim: false });
        }
    }]);

    return BuiltIn;
}(Service);

Service.BuiltIn = BuiltIn;
//# sourceMappingURL=data:application/json;base64,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QkEyQkY7QUFDYixnQkFBRyxLQUFLLEtBQUwsRUFDQyxPQUFPLEtBQUssS0FBTCxDQURYO0FBRUEsZ0JBQUcsS0FBSyxLQUFMLEVBQVc7QUFDVixvQkFBSSxhQUFKLENBQWtCLEtBQUssS0FBTCxDQUFsQixDQURVO0FBRVYscUJBQUssS0FBTCxHQUFXLElBQUksS0FBSyxLQUFMLENBQWYsQ0FGVTthQUFkO0FBSUEsbUJBQU8sS0FBSyxLQUFMLENBUE07Ozs7NEJBY1E7QUFDckIsbUJBQU8sY0FBUCxDQURxQjs7OztXQTNGaEI7OztJQTZHUDs7Ozs7Ozs7Ozs7K0JBQ1c7QUFDVCxvQkFBUSxJQUFSLENBQWEsSUFBYixDQUFrQixJQUFsQixFQUF1QixFQUFDLEtBQUksS0FBSyxNQUFMLEdBQVksS0FBSyxLQUFMLEVBQVcsU0FBUSxLQUFSLEVBQW5ELEVBRFM7Ozs7V0FEWDtFQUFnQjs7QUFNdEIsUUFBUSxPQUFSLEdBQWdCLE9BQWhCIiwiZmlsZSI6InNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJ1xuXG52YXIgX2h0dHBjbGllbnQsXG4gICAgX3NlcnZlcixcbiAgICBfZGIsXG4gICAgX19sb2NhbFN0b3JhZ2UsXG4gICAgX19lbWl0dGVyPW5ldyBFdmVudEVtaXR0ZXIoKTtcblxuZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZGI9X2RiXG4gICAgICAgIHRoaXMuY29scz1TZXJ2aWNlLmNvbHNcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBzZXJ0KGRvYyxiYXNlLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZG9jKSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVwc2VydCBkb2Vzbid0IHN1cHBvcnQgYXJyYXlcIilcbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy51cHNlcnQoZG9jLGJhc2Usc3VjY2VzcyxlcnJvcilcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVwZGF0ZWQpe1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgndXBzZXJ0ZWQnLHVwZGF0ZWQsYmFzZSwgZXJyb3IpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZWRcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlKGlkLCBzdWNjZXNzLGVycm9yKXtcbiAgICAgICAgaWYodHlwZW9mKGlkKT09J29iamVjdCcpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlkIHNob3VsZCBiZSBzdHJpbmcsIGluc3RlYWQgb2Ygb2JqZWN0IHdoZW4gcmVtb3ZpbmdgKVxuXG4gICAgICAgIHJldHVybiB0aGlzLmNvbHMucmVtb3ZlKGlkLCBzdWNjZXNzLCBlcnJvcilcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVkJywgaWQsIGVycm9yKVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHN0YXRpYyBmaW5kKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbHMuZmluZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmRPbmUoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy5maW5kT25lKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBzdGF0aWMgYWpheChvKXtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICB2YXIge2NvbnRleHQsIG1ldGhvZCx1cmwscGFyYW1zLGRhdGEsIF9zdWNjZXNzLCBfZXJyb3IsX2FwaUtleSwgX3Nlc3Npb25Ub2tlbn09b1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKHIpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUoX3N1Y2Nlc3MgJiYgX3N1Y2Nlc3MuYXBwbHkoY29udGV4dCxhcmd1bWVudHMpIHx8IHIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBlcnJvcihyLHN0YXR1cyl7XG4gICAgICAgICAgICAgICAgcmVqZWN0KF9lcnJvciAmJiBfZXJyb3IuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKSB8fCBuZXcgRXJyb3IocikpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9odHRwY2xpZW50KG1ldGhvZCwgdXJsLCBwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yLCBfYXBpS2V5LCBfc2Vzc2lvblRva2VuKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgc2VydmVyKCl7XG4gICAgICAgIHJldHVybiBfc2VydmVyXG4gICAgfVxuXG4gICAgc3RhdGljIGh0dHBjbGllbnQoKXtcbiAgICAgICAgcmV0dXJuIF9odHRwY2xpZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5pdChvcHQsIGRiLCBodHRwY2xpZW50LHNlcnZlciwgdGVtcFN0b3JhZ2Upe1xuICAgICAgICBpZihkYil7XG4gICAgICAgICAgICBfZGI9ZGJcbiAgICAgICAgICAgIF9fbG9jYWxTdG9yYWdlPXRlbXBTdG9yYWdlXG4gICAgICAgICAgICBodHRwY2xpZW50ICYmIChfaHR0cGNsaWVudD1odHRwY2xpZW50KTtcbiAgICAgICAgICAgIHNlcnZlciAmJiAoX3NlcnZlcj1zZXJ2ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5fbmFtZSl7XG4gICAgICAgICAgICBpZihvcHQ9PT10cnVlKXsvL2xvY2FsIG9ubHlcbiAgICAgICAgICAgICAgICBfZGIubG9jYWxEYi5hZGRDb2xsZWN0aW9uKHRoaXMuX25hbWUpXG4gICAgICAgICAgICAgICAgdGhpcy5fY29scz1fZGIubG9jYWxEYlt0aGlzLl9uYW1lXVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgX2RiLmFkZENvbGxlY3Rpb24odGhpcy5fbmFtZSxvcHQpXG4gICAgICAgICAgICAgICAgdGhpcy5fY29scz1fZGJbdGhpcy5fbmFtZV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgY29scygpe1xuICAgICAgICBpZih0aGlzLl9jb2xzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHM7XG4gICAgICAgIGlmKHRoaXMuX25hbWUpe1xuICAgICAgICAgICAgX2RiLmFkZENvbGxlY3Rpb24odGhpcy5fbmFtZSlcbiAgICAgICAgICAgIHRoaXMuX2NvbHM9X2RiW3RoaXMuX25hbWVdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHNcbiAgICB9XG5cbiAgICBzdGF0aWMgc3VwZXIoZil7XG4gICAgICAgIHJldHVybiB0aGlzLl9fcHJvdG9fX1tmXS5iaW5kKHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsb2NhbFN0b3JhZ2UoKXtcbiAgICAgICAgcmV0dXJuIF9fbG9jYWxTdG9yYWdlXG4gICAgfVxuXG4gICAgc3RhdGljIGVtaXQodHlwZSwgLi4ub3RoZXJzKXtcbiAgICAgICAgX19lbWl0dGVyLmVtaXQoYCR7dGhpcy5fbmFtZX0uJHt0eXBlfWAsLi4ub3RoZXJzLHRoaXMpXG4gICAgICAgIF9fZW1pdHRlci5lbWl0KHR5cGUsLi4ub3RoZXJzLHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIG9uKHR5cGUsLi4ub3RoZXJzKXtcbiAgICAgICAgX19lbWl0dGVyLm9uKGAke3RoaXMuX25hbWUgPyB0aGlzLl9uYW1lKycuJyA6Jyd9JHt0eXBlfWAsLi4ub3RoZXJzKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVMaXN0ZW5lcih0eXBlLCAuLi5vdGhlcnMpe1xuICAgICAgICBfX2VtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoYCR7dGhpcy5fbmFtZSA/IHRoaXMuX25hbWUrJy4nIDonJ30ke3R5cGV9YCwuLi5vdGhlcnMpXG4gICAgfVxufVxuXG5jbGFzcyBCdWlsdEluIGV4dGVuZHMgU2VydmljZXtcbiAgICBzdGF0aWMgaW5pdCgpe1xuICAgICAgICBTZXJ2aWNlLmluaXQuY2FsbCh0aGlzLHt1cmw6dGhpcy5zZXJ2ZXIrdGhpcy5fbmFtZSxpbnRlcmltOmZhbHNlfSlcbiAgICB9XG59XG5cblNlcnZpY2UuQnVpbHRJbj1CdWlsdEluXG4iXX0=