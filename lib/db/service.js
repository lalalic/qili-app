'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Service = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
            var _cols;

            return (_cols = this.cols).upsert.apply(_cols, arguments).then(function (updated) {
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
            var _cols2;

            return (_cols2 = this.cols).find.apply(_cols2, arguments);
        }
    }, {
        key: 'findOne',
        value: function findOne() {
            var _cols3;

            return (_cols3 = this.cols).findOne.apply(_cols3, arguments);
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
                    this._localOnly = true;
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

        return _possibleConstructorReturn(this, (BuiltIn.__proto__ || Object.getPrototypeOf(BuiltIn)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIl9odHRwY2xpZW50IiwiX3NlcnZlciIsIl9kYiIsIl9fbG9jYWxTdG9yYWdlIiwiX19lbWl0dGVyIiwiU2VydmljZSIsImRiIiwiY29scyIsImRvYyIsImJhc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJ1cHNlcnQiLCJhcmd1bWVudHMiLCJ0aGVuIiwidXBkYXRlZCIsImVtaXQiLCJiaW5kIiwiaWQiLCJFcnJvciIsInJlbW92ZSIsImZpbmQiLCJmaW5kT25lIiwibyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY29udGV4dCIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJfc3VjY2VzcyIsIl9lcnJvciIsIl9hcGlLZXkiLCJfc2Vzc2lvblRva2VuIiwiciIsImFwcGx5Iiwic3RhdHVzIiwib3B0IiwiaHR0cGNsaWVudCIsInNlcnZlciIsInRlbXBTdG9yYWdlIiwiX25hbWUiLCJsb2NhbERiIiwiYWRkQ29sbGVjdGlvbiIsIl9jb2xzIiwiX2xvY2FsT25seSIsImYiLCJfX3Byb3RvX18iLCJ0eXBlIiwib3RoZXJzIiwib24iLCJyZW1vdmVMaXN0ZW5lciIsIkJ1aWx0SW4iLCJpbml0IiwiY2FsbCIsImludGVyaW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBSUEsV0FBSjtBQUFBLElBQ0lDLE9BREo7QUFBQSxJQUVJQyxHQUZKO0FBQUEsSUFHSUMsY0FISjtBQUFBLElBSUlDLFlBQVUsMEJBSmQ7O0lBTWFDLE8sV0FBQUEsTztBQUNULHVCQUFhO0FBQUE7O0FBQ1QsYUFBS0MsRUFBTCxHQUFRSixHQUFSO0FBQ0EsYUFBS0ssSUFBTCxHQUFVRixRQUFRRSxJQUFsQjtBQUNIOzs7OytCQUVhQyxHLEVBQUlDLEksRUFBTUMsTyxFQUFTQyxLLEVBQU07QUFBQTs7QUFDbkMsbUJBQU8sY0FBS0osSUFBTCxFQUFVSyxNQUFWLGNBQW9CQyxT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T0FBTyxLQUFLQSxLQUFaO0FBQ0osZ0JBQUcsS0FBS0gsS0FBUixFQUFjO0FBQ1Z6QyxvQkFBSTJDLGFBQUosQ0FBa0IsS0FBS0YsS0FBdkI7QUFDQSxxQkFBS0csS0FBTCxHQUFXNUMsSUFBSSxLQUFLeUMsS0FBVCxDQUFYO0FBQ0g7QUFDRCxtQkFBTyxLQUFLRyxLQUFaO0FBQ0g7Ozs0QkFNd0I7QUFDckIsbUJBQU8zQyxjQUFQO0FBQ0g7Ozs7OztJQWdCQ21ELE87Ozs7Ozs7Ozs7OytCQUNXO0FBQ1RqRCxvQkFBUWtELElBQVIsQ0FBYUMsSUFBYixDQUFrQixJQUFsQixFQUF1QixFQUFDM0IsS0FBSSxLQUFLWSxNQUFMLEdBQVksS0FBS0UsS0FBdEIsRUFBNEJjLFNBQVEsS0FBcEMsRUFBdkI7QUFDSDs7OztFQUhpQnBELE87O0FBTXRCQSxRQUFRaUQsT0FBUixHQUFnQkEsT0FBaEIiLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnXG5cbnZhciBfaHR0cGNsaWVudCxcbiAgICBfc2VydmVyLFxuICAgIF9kYixcbiAgICBfX2xvY2FsU3RvcmFnZSxcbiAgICBfX2VtaXR0ZXI9bmV3IEV2ZW50RW1pdHRlcigpO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5kYj1fZGJcbiAgICAgICAgdGhpcy5jb2xzPVNlcnZpY2UuY29sc1xuICAgIH1cblxuICAgIHN0YXRpYyB1cHNlcnQoZG9jLGJhc2UsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy51cHNlcnQoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXBkYXRlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCd1cHNlcnRlZCcsdXBkYXRlZCxiYXNlLCBlcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmUoaWQsIHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICBpZih0eXBlb2YoaWQpPT0nb2JqZWN0JylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaWQgc2hvdWxkIGJlIHN0cmluZywgaW5zdGVhZCBvZiBvYmplY3Qgd2hlbiByZW1vdmluZ2ApXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy5yZW1vdmUoaWQsIHN1Y2Nlc3MsIGVycm9yKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZWQnLCBpZCwgZXJyb3IpXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy5maW5kKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluZE9uZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xzLmZpbmRPbmUoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIHN0YXRpYyBhamF4KG8pe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIHZhciB7Y29udGV4dCwgbWV0aG9kLHVybCxwYXJhbXMsZGF0YSwgX3N1Y2Nlc3MsIF9lcnJvcixfYXBpS2V5LCBfc2Vzc2lvblRva2VufT1vXG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3Mocil7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShfc3VjY2VzcyAmJiBfc3VjY2Vzcy5hcHBseShjb250ZXh0LGFyZ3VtZW50cykgfHwgcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVycm9yKHIsc3RhdHVzKXtcbiAgICAgICAgICAgICAgICByZWplY3QoX2Vycm9yICYmIF9lcnJvci5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpIHx8IG5ldyBFcnJvcihyKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2h0dHBjbGllbnQobWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9hcGlLZXksIF9zZXNzaW9uVG9rZW4pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzZXJ2ZXIoKXtcbiAgICAgICAgcmV0dXJuIF9zZXJ2ZXJcbiAgICB9XG5cbiAgICBzdGF0aWMgaHR0cGNsaWVudCgpe1xuICAgICAgICByZXR1cm4gX2h0dHBjbGllbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH1cblxuICAgIHN0YXRpYyBpbml0KG9wdCwgZGIsIGh0dHBjbGllbnQsc2VydmVyLCB0ZW1wU3RvcmFnZSl7XG4gICAgICAgIGlmKGRiKXtcbiAgICAgICAgICAgIF9kYj1kYlxuICAgICAgICAgICAgX19sb2NhbFN0b3JhZ2U9dGVtcFN0b3JhZ2VcbiAgICAgICAgICAgIGh0dHBjbGllbnQgJiYgKF9odHRwY2xpZW50PWh0dHBjbGllbnQpO1xuICAgICAgICAgICAgc2VydmVyICYmIChfc2VydmVyPXNlcnZlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9uYW1lKXtcbiAgICAgICAgICAgIGlmKG9wdD09PXRydWUpey8vbG9jYWwgb25seVxuICAgICAgICAgICAgICAgIF9kYi5sb2NhbERiLmFkZENvbGxlY3Rpb24odGhpcy5fbmFtZSlcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xzPV9kYi5sb2NhbERiW3RoaXMuX25hbWVdXG5cdFx0XHRcdHRoaXMuX2xvY2FsT25seT10cnVlXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBfZGIuYWRkQ29sbGVjdGlvbih0aGlzLl9uYW1lLG9wdClcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xzPV9kYlt0aGlzLl9uYW1lXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBjb2xzKCl7XG4gICAgICAgIGlmKHRoaXMuX2NvbHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29scztcbiAgICAgICAgaWYodGhpcy5fbmFtZSl7XG4gICAgICAgICAgICBfZGIuYWRkQ29sbGVjdGlvbih0aGlzLl9uYW1lKVxuICAgICAgICAgICAgdGhpcy5fY29scz1fZGJbdGhpcy5fbmFtZV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY29sc1xuICAgIH1cblxuICAgIHN0YXRpYyBzdXBlcihmKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19wcm90b19fW2ZdLmJpbmQodGhpcylcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGxvY2FsU3RvcmFnZSgpe1xuICAgICAgICByZXR1cm4gX19sb2NhbFN0b3JhZ2VcbiAgICB9XG5cbiAgICBzdGF0aWMgZW1pdCh0eXBlLCAuLi5vdGhlcnMpe1xuICAgICAgICBfX2VtaXR0ZXIuZW1pdChgJHt0aGlzLl9uYW1lfS4ke3R5cGV9YCwuLi5vdGhlcnMsdGhpcylcbiAgICAgICAgX19lbWl0dGVyLmVtaXQodHlwZSwuLi5vdGhlcnMsdGhpcylcbiAgICB9XG5cbiAgICBzdGF0aWMgb24odHlwZSwuLi5vdGhlcnMpe1xuICAgICAgICBfX2VtaXR0ZXIub24oYCR7dGhpcy5fbmFtZSA/IHRoaXMuX25hbWUrJy4nIDonJ30ke3R5cGV9YCwuLi5vdGhlcnMpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZUxpc3RlbmVyKHR5cGUsIC4uLm90aGVycyl7XG4gICAgICAgIF9fZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihgJHt0aGlzLl9uYW1lID8gdGhpcy5fbmFtZSsnLicgOicnfSR7dHlwZX1gLC4uLm90aGVycylcbiAgICB9XG59XG5cbmNsYXNzIEJ1aWx0SW4gZXh0ZW5kcyBTZXJ2aWNle1xuICAgIHN0YXRpYyBpbml0KCl7XG4gICAgICAgIFNlcnZpY2UuaW5pdC5jYWxsKHRoaXMse3VybDp0aGlzLnNlcnZlcit0aGlzLl9uYW1lLGludGVyaW06ZmFsc2V9KVxuICAgIH1cbn1cblxuU2VydmljZS5CdWlsdEluPUJ1aWx0SW5cbiJdfQ==