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
                _db.addCollection(this._name, opt);
                this._cols = _db[this._name];
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
//# sourceMappingURL=data:application/json;base64,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QUwsQ0FBZixDQUZVO2FBQWQ7QUFJQSxtQkFBTyxLQUFLLEtBQUwsQ0FQTTs7Ozs0QkFjUTtBQUNyQixtQkFBTyxjQUFQLENBRHFCOzs7O1dBdEZoQjs7O0lBd0dQOzs7Ozs7Ozs7OzsrQkFDVztBQUNULG9CQUFRLElBQVIsQ0FBYSxJQUFiLENBQWtCLElBQWxCLEVBQXVCLEVBQUMsS0FBSSxLQUFLLE1BQUwsR0FBWSxLQUFLLEtBQUwsRUFBVyxTQUFRLEtBQVIsRUFBbkQsRUFEUzs7OztXQURYO0VBQWdCOztBQU10QixRQUFRLE9BQVIsR0FBZ0IsT0FBaEIiLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnXG5cbnZhciBfaHR0cGNsaWVudCxcbiAgICBfc2VydmVyLFxuICAgIF9kYixcbiAgICBfX2xvY2FsU3RvcmFnZSxcbiAgICBfX2VtaXR0ZXI9bmV3IEV2ZW50RW1pdHRlcigpO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5kYj1fZGJcbiAgICAgICAgdGhpcy5jb2xzPVNlcnZpY2UuY29sc1xuICAgIH1cblxuICAgIHN0YXRpYyB1cHNlcnQoZG9jLGJhc2UsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShkb2MpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidXBzZXJ0IGRvZXNuJ3Qgc3VwcG9ydCBhcnJheVwiKVxuICAgICAgICByZXR1cm4gdGhpcy5jb2xzLnVwc2VydChkb2MsYmFzZSxzdWNjZXNzLGVycm9yKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXBkYXRlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCd1cHNlcnRlZCcsdXBkYXRlZCxiYXNlLCBlcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmUoaWQsIHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICBpZih0eXBlb2YoaWQpPT0nb2JqZWN0JylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaWQgc2hvdWxkIGJlIHN0cmluZywgaW5zdGVhZCBvZiBvYmplY3Qgd2hlbiByZW1vdmluZ2ApXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy5yZW1vdmUoaWQsIHN1Y2Nlc3MsIGVycm9yKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZWQnLCBpZCwgZXJyb3IpXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy5maW5kKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluZE9uZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xzLmZpbmRPbmUoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIHN0YXRpYyBhamF4KG8pe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIHZhciB7Y29udGV4dCwgbWV0aG9kLHVybCxwYXJhbXMsZGF0YSwgX3N1Y2Nlc3MsIF9lcnJvcixfYXBpS2V5LCBfc2Vzc2lvblRva2VufT1vXG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3Mocil7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShfc3VjY2VzcyAmJiBfc3VjY2Vzcy5hcHBseShjb250ZXh0LGFyZ3VtZW50cykgfHwgcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVycm9yKHIsc3RhdHVzKXtcbiAgICAgICAgICAgICAgICByZWplY3QoX2Vycm9yICYmIF9lcnJvci5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpIHx8IG5ldyBFcnJvcihyKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2h0dHBjbGllbnQobWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9hcGlLZXksIF9zZXNzaW9uVG9rZW4pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzZXJ2ZXIoKXtcbiAgICAgICAgcmV0dXJuIF9zZXJ2ZXJcbiAgICB9XG5cbiAgICBzdGF0aWMgaHR0cGNsaWVudCgpe1xuICAgICAgICByZXR1cm4gX2h0dHBjbGllbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH1cblxuICAgIHN0YXRpYyBpbml0KG9wdCwgZGIsIGh0dHBjbGllbnQsc2VydmVyLCB0ZW1wU3RvcmFnZSl7XG4gICAgICAgIGlmKGRiKXtcbiAgICAgICAgICAgIF9kYj1kYlxuICAgICAgICAgICAgX19sb2NhbFN0b3JhZ2U9dGVtcFN0b3JhZ2VcbiAgICAgICAgICAgIGh0dHBjbGllbnQgJiYgKF9odHRwY2xpZW50PWh0dHBjbGllbnQpO1xuICAgICAgICAgICAgc2VydmVyICYmIChfc2VydmVyPXNlcnZlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9uYW1lKXtcbiAgICAgICAgICAgIF9kYi5hZGRDb2xsZWN0aW9uKHRoaXMuX25hbWUsb3B0KVxuICAgICAgICAgICAgdGhpcy5fY29scz1fZGJbdGhpcy5fbmFtZV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgY29scygpe1xuICAgICAgICBpZih0aGlzLl9jb2xzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHM7XG4gICAgICAgIGlmKHRoaXMuX25hbWUpe1xuICAgICAgICAgICAgX2RiLmFkZENvbGxlY3Rpb24odGhpcy5fbmFtZSlcbiAgICAgICAgICAgIHRoaXMuX2NvbHM9X2RiW3RoaXMuX25hbWVdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHNcbiAgICB9XG5cbiAgICBzdGF0aWMgc3VwZXIoZil7XG4gICAgICAgIHJldHVybiB0aGlzLl9fcHJvdG9fX1tmXS5iaW5kKHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsb2NhbFN0b3JhZ2UoKXtcbiAgICAgICAgcmV0dXJuIF9fbG9jYWxTdG9yYWdlXG4gICAgfVxuXG4gICAgc3RhdGljIGVtaXQodHlwZSwgLi4ub3RoZXJzKXtcbiAgICAgICAgX19lbWl0dGVyLmVtaXQoYCR7dGhpcy5fbmFtZX0uJHt0eXBlfWAsLi4ub3RoZXJzLHRoaXMpXG4gICAgICAgIF9fZW1pdHRlci5lbWl0KHR5cGUsLi4ub3RoZXJzLHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIG9uKHR5cGUsLi4ub3RoZXJzKXtcbiAgICAgICAgX19lbWl0dGVyLm9uKGAke3RoaXMuX25hbWUgPyB0aGlzLl9uYW1lKycuJyA6Jyd9JHt0eXBlfWAsLi4ub3RoZXJzKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVMaXN0ZW5lcih0eXBlLCAuLi5vdGhlcnMpe1xuICAgICAgICBfX2VtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoYCR7dGhpcy5fbmFtZSA/IHRoaXMuX25hbWUrJy4nIDonJ30ke3R5cGV9YCwuLi5vdGhlcnMpXG4gICAgfVxufVxuXG5jbGFzcyBCdWlsdEluIGV4dGVuZHMgU2VydmljZXtcbiAgICBzdGF0aWMgaW5pdCgpe1xuICAgICAgICBTZXJ2aWNlLmluaXQuY2FsbCh0aGlzLHt1cmw6dGhpcy5zZXJ2ZXIrdGhpcy5fbmFtZSxpbnRlcmltOmZhbHNlfSlcbiAgICB9XG59XG5cblNlcnZpY2UuQnVpbHRJbj1CdWlsdEluXG4iXX0=