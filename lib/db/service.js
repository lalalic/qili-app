'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Service = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _events = require('events');

var _normalizr = require('normalizr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _httpclient,
    _server,
    _db,
    __localStorage,
    __emitter = new _events.EventEmitter();

var Service = exports.Service = function () {
    function Service() {
        (0, _classCallCheck3.default)(this, Service);

        this.db = _db;
        this.cols = Service.cols;
    }

    (0, _createClass3.default)(Service, null, [{
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
            if ((typeof id === 'undefined' ? 'undefined' : (0, _typeof3.default)(id)) == 'object') throw new Error('id should be string, instead of object when removing');

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
            return new _promise2.default(function (resolve, reject) {
                var context = o.context,
                    method = o.method,
                    url = o.url,
                    params = o.params,
                    data = o.data,
                    _success = o._success,
                    _error = o._error,
                    _apiKey = o._apiKey,
                    _sessionToken = o._sessionToken;


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
                this._schema = new _normalizr.Schema(this._name, { idAttribute: "_id" });
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
        key: 'schema',
        get: function get() {
            return this._schema;
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
    (0, _inherits3.default)(BuiltIn, _Service);

    function BuiltIn() {
        (0, _classCallCheck3.default)(this, BuiltIn);
        return (0, _possibleConstructorReturn3.default)(this, (BuiltIn.__proto__ || (0, _getPrototypeOf2.default)(BuiltIn)).apply(this, arguments));
    }

    (0, _createClass3.default)(BuiltIn, null, [{
        key: 'init',
        value: function init() {
            Service.init.call(this, { url: this.server + this._name, interim: false });
        }
    }]);
    return BuiltIn;
}(Service);

Service.BuiltIn = BuiltIn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIl9odHRwY2xpZW50IiwiX3NlcnZlciIsIl9kYiIsIl9fbG9jYWxTdG9yYWdlIiwiX19lbWl0dGVyIiwiU2VydmljZSIsImRiIiwiY29scyIsImRvYyIsImJhc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJ1cHNlcnQiLCJhcmd1bWVudHMiLCJ0aGVuIiwidXBkYXRlZCIsImVtaXQiLCJiaW5kIiwiaWQiLCJFcnJvciIsInJlbW92ZSIsImZpbmQiLCJmaW5kT25lIiwibyIsInJlc29sdmUiLCJyZWplY3QiLCJjb250ZXh0IiwibWV0aG9kIiwidXJsIiwicGFyYW1zIiwiZGF0YSIsIl9zdWNjZXNzIiwiX2Vycm9yIiwiX2FwaUtleSIsIl9zZXNzaW9uVG9rZW4iLCJyIiwiYXBwbHkiLCJzdGF0dXMiLCJvcHQiLCJodHRwY2xpZW50Iiwic2VydmVyIiwidGVtcFN0b3JhZ2UiLCJfbmFtZSIsImxvY2FsRGIiLCJhZGRDb2xsZWN0aW9uIiwiX2NvbHMiLCJfbG9jYWxPbmx5IiwiX3NjaGVtYSIsImlkQXR0cmlidXRlIiwiZiIsIl9fcHJvdG9fXyIsInR5cGUiLCJvdGhlcnMiLCJvbiIsInJlbW92ZUxpc3RlbmVyIiwiQnVpbHRJbiIsImluaXQiLCJjYWxsIiwiaW50ZXJpbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQUlBLFdBQUo7QUFBQSxJQUNJQyxPQURKO0FBQUEsSUFFSUMsR0FGSjtBQUFBLElBR0lDLGNBSEo7QUFBQSxJQUlJQyxZQUFVLDBCQUpkOztJQU1hQyxPLFdBQUFBLE87QUFDVCx1QkFBYTtBQUFBOztBQUNULGFBQUtDLEVBQUwsR0FBUUosR0FBUjtBQUNBLGFBQUtLLElBQUwsR0FBVUYsUUFBUUUsSUFBbEI7QUFDSDs7OzsrQkFFYUMsRyxFQUFJQyxJLEVBQU1DLE8sRUFBU0MsSyxFQUFNO0FBQUE7O0FB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RCxJQUE4RFMsSUFBOUQsU0FBd0VDLE1BQXhFO0FBQ0g7Ozs0QkE5RGtCO0FBQ2YsbUJBQU9uRCxPQUFQO0FBQ0g7Ozs0QkEyQmdCO0FBQ2IsZ0JBQUcsS0FBSzRDLEtBQVIsRUFDSSxPQUFPLEtBQUtBLEtBQVo7QUFDSixnQkFBRyxLQUFLSCxLQUFSLEVBQWM7QUFDVnhDLG9CQUFJMEMsYUFBSixDQUFrQixLQUFLRixLQUF2QjtBQUNBLHFCQUFLRyxLQUFMLEdBQVczQyxJQUFJLEtBQUt3QyxLQUFULENBQVg7QUFDSDtBQUNELG1CQUFPLEtBQUtHLEtBQVo7QUFDSDs7OzRCQUVlO0FBQ2xCLG1CQUFPLEtBQUtFLE9BQVo7QUFDQTs7OzRCQU0yQjtBQUNyQixtQkFBTzVDLGNBQVA7QUFDSDs7Ozs7SUFnQkNvRCxPOzs7Ozs7Ozs7OytCQUNXO0FBQ1RsRCxvQkFBUW1ELElBQVIsQ0FBYUMsSUFBYixDQUFrQixJQUFsQixFQUF1QixFQUFDN0IsS0FBSSxLQUFLWSxNQUFMLEdBQVksS0FBS0UsS0FBdEIsRUFBNEJnQixTQUFRLEtBQXBDLEVBQXZCO0FBQ0g7OztFQUhpQnJELE87O0FBTXRCQSxRQUFRa0QsT0FBUixHQUFnQkEsT0FBaEIiLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnXG5pbXBvcnQge1NjaGVtYX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbnZhciBfaHR0cGNsaWVudCxcbiAgICBfc2VydmVyLFxuICAgIF9kYixcbiAgICBfX2xvY2FsU3RvcmFnZSxcbiAgICBfX2VtaXR0ZXI9bmV3IEV2ZW50RW1pdHRlcigpO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5kYj1fZGJcbiAgICAgICAgdGhpcy5jb2xzPVNlcnZpY2UuY29sc1xuICAgIH1cblxuICAgIHN0YXRpYyB1cHNlcnQoZG9jLGJhc2UsIHN1Y2Nlc3MsIGVycm9yKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy51cHNlcnQoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24odXBkYXRlZCl7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCd1cHNlcnRlZCcsdXBkYXRlZCxiYXNlLCBlcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlZFxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmUoaWQsIHN1Y2Nlc3MsZXJyb3Ipe1xuICAgICAgICBpZih0eXBlb2YoaWQpPT0nb2JqZWN0JylcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgaWQgc2hvdWxkIGJlIHN0cmluZywgaW5zdGVhZCBvZiBvYmplY3Qgd2hlbiByZW1vdmluZ2ApXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy5yZW1vdmUoaWQsIHN1Y2Nlc3MsIGVycm9yKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZWQnLCBpZCwgZXJyb3IpXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgc3RhdGljIGZpbmQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29scy5maW5kKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluZE9uZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xzLmZpbmRPbmUoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIHN0YXRpYyBhamF4KG8pe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIHZhciB7Y29udGV4dCwgbWV0aG9kLHVybCxwYXJhbXMsZGF0YSwgX3N1Y2Nlc3MsIF9lcnJvcixfYXBpS2V5LCBfc2Vzc2lvblRva2VufT1vXG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1Y2Nlc3Mocil7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShfc3VjY2VzcyAmJiBfc3VjY2Vzcy5hcHBseShjb250ZXh0LGFyZ3VtZW50cykgfHwgcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVycm9yKHIsc3RhdHVzKXtcbiAgICAgICAgICAgICAgICByZWplY3QoX2Vycm9yICYmIF9lcnJvci5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpIHx8IG5ldyBFcnJvcihyKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2h0dHBjbGllbnQobWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9hcGlLZXksIF9zZXNzaW9uVG9rZW4pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBzZXJ2ZXIoKXtcbiAgICAgICAgcmV0dXJuIF9zZXJ2ZXJcbiAgICB9XG5cbiAgICBzdGF0aWMgaHR0cGNsaWVudCgpe1xuICAgICAgICByZXR1cm4gX2h0dHBjbGllbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH1cblxuICAgIHN0YXRpYyBpbml0KG9wdCwgZGIsIGh0dHBjbGllbnQsc2VydmVyLCB0ZW1wU3RvcmFnZSl7XG4gICAgICAgIGlmKGRiKXtcbiAgICAgICAgICAgIF9kYj1kYlxuICAgICAgICAgICAgX19sb2NhbFN0b3JhZ2U9dGVtcFN0b3JhZ2VcbiAgICAgICAgICAgIGh0dHBjbGllbnQgJiYgKF9odHRwY2xpZW50PWh0dHBjbGllbnQpO1xuICAgICAgICAgICAgc2VydmVyICYmIChfc2VydmVyPXNlcnZlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9uYW1lKXtcbiAgICAgICAgICAgIGlmKG9wdD09PXRydWUpey8vbG9jYWwgb25seVxuICAgICAgICAgICAgICAgIF9kYi5sb2NhbERiLmFkZENvbGxlY3Rpb24odGhpcy5fbmFtZSlcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xzPV9kYi5sb2NhbERiW3RoaXMuX25hbWVdXG5cdFx0XHRcdHRoaXMuX2xvY2FsT25seT10cnVlXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBfZGIuYWRkQ29sbGVjdGlvbih0aGlzLl9uYW1lLG9wdClcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xzPV9kYlt0aGlzLl9uYW1lXVxuICAgICAgICAgICAgfVxuXHRcdFx0dGhpcy5fc2NoZW1hPW5ldyBTY2hlbWEodGhpcy5fbmFtZSwge2lkQXR0cmlidXRlOlwiX2lkXCJ9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBjb2xzKCl7XG4gICAgICAgIGlmKHRoaXMuX2NvbHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29scztcbiAgICAgICAgaWYodGhpcy5fbmFtZSl7XG4gICAgICAgICAgICBfZGIuYWRkQ29sbGVjdGlvbih0aGlzLl9uYW1lKVxuICAgICAgICAgICAgdGhpcy5fY29scz1fZGJbdGhpcy5fbmFtZV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY29sc1xuICAgIH1cblx0XG5cdHN0YXRpYyBnZXQgc2NoZW1hKCl7XG5cdFx0cmV0dXJuIHRoaXMuX3NjaGVtYVxuXHR9XG5cbiAgICBzdGF0aWMgc3VwZXIoZil7XG4gICAgICAgIHJldHVybiB0aGlzLl9fcHJvdG9fX1tmXS5iaW5kKHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBsb2NhbFN0b3JhZ2UoKXtcbiAgICAgICAgcmV0dXJuIF9fbG9jYWxTdG9yYWdlXG4gICAgfVxuXG4gICAgc3RhdGljIGVtaXQodHlwZSwgLi4ub3RoZXJzKXtcbiAgICAgICAgX19lbWl0dGVyLmVtaXQoYCR7dGhpcy5fbmFtZX0uJHt0eXBlfWAsLi4ub3RoZXJzLHRoaXMpXG4gICAgICAgIF9fZW1pdHRlci5lbWl0KHR5cGUsLi4ub3RoZXJzLHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIG9uKHR5cGUsLi4ub3RoZXJzKXtcbiAgICAgICAgX19lbWl0dGVyLm9uKGAke3RoaXMuX25hbWUgPyB0aGlzLl9uYW1lKycuJyA6Jyd9JHt0eXBlfWAsLi4ub3RoZXJzKVxuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVMaXN0ZW5lcih0eXBlLCAuLi5vdGhlcnMpe1xuICAgICAgICBfX2VtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoYCR7dGhpcy5fbmFtZSA/IHRoaXMuX25hbWUrJy4nIDonJ30ke3R5cGV9YCwuLi5vdGhlcnMpXG4gICAgfVxufVxuXG5jbGFzcyBCdWlsdEluIGV4dGVuZHMgU2VydmljZXtcbiAgICBzdGF0aWMgaW5pdCgpe1xuICAgICAgICBTZXJ2aWNlLmluaXQuY2FsbCh0aGlzLHt1cmw6dGhpcy5zZXJ2ZXIrdGhpcy5fbmFtZSxpbnRlcmltOmZhbHNlfSlcbiAgICB9XG59XG5cblNlcnZpY2UuQnVpbHRJbj1CdWlsdEluXG4iXX0=