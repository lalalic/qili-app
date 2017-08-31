'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Service = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _normalizr = require('normalizr');

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
            if ((typeof id === 'undefined' ? 'undefined' : _typeof(id)) == 'object') return Promise.reject(new Error('id should be string, instead of object when removing'));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIl9odHRwY2xpZW50IiwiX3NlcnZlciIsIl9kYiIsIl9fbG9jYWxTdG9yYWdlIiwiX19lbWl0dGVyIiwiU2VydmljZSIsImRiIiwiY29scyIsImRvYyIsImJhc2UiLCJzdWNjZXNzIiwiZXJyb3IiLCJ1cHNlcnQiLCJhcmd1bWVudHMiLCJ0aGVuIiwidXBkYXRlZCIsImVtaXQiLCJiaW5kIiwiaWQiLCJQcm9taXNlIiwicmVqZWN0IiwiRXJyb3IiLCJyZW1vdmUiLCJmaW5kIiwiZmluZE9uZSIsIm8iLCJyZXNvbHZlIiwiY29udGV4dCIsIm1ldGhvZCIsInVybCIsInBhcmFtcyIsImRhdGEiLCJfc3VjY2VzcyIsIl9lcnJvciIsIl9hcGlLZXkiLCJfc2Vzc2lvblRva2VuIiwiciIsImFwcGx5Iiwic3RhdHVzIiwib3B0IiwiaHR0cGNsaWVudCIsInNlcnZlciIsInRlbXBTdG9yYWdlIiwiX25hbWUiLCJsb2NhbERiIiwiYWRkQ29sbGVjdGlvbiIsIl9jb2xzIiwiX2xvY2FsT25seSIsIl9zY2hlbWEiLCJpZEF0dHJpYnV0ZSIsImYiLCJfX3Byb3RvX18iLCJ0eXBlIiwib3RoZXJzIiwib24iLCJyZW1vdmVMaXN0ZW5lciIsIkJ1aWx0SW4iLCJpbml0IiwiY2FsbCIsImludGVyaW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSUEsV0FBSjtBQUFBLElBQ0lDLE9BREo7QUFBQSxJQUVJQyxHQUZKO0FBQUEsSUFHSUMsY0FISjtBQUFBLElBSUlDLFlBQVUsMEJBSmQ7O0lBTWFDLE8sV0FBQUEsTztBQUNULHVCQUFhO0FBQUE7O0FBQ1QsYUFBS0MsRUFBTCxHQUFRSixHQUFSO0FBQ0EsYUFBS0ssSUFBTCxHQUFVRixRQUFRRSxJQUFsQjtBQUNIOzs7OytCQUVhQyxHLEVBQUlDLEksRUFBTUMsTyxFQUFTQyxLLEVBQU07QUFBQTs7QUFDbkMsbUJBQU8s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QUwsR0FBVyxHQUF4QixHQUE2QixFQUF6RCxJQUE4RFMsSUFBOUQsU0FBd0VDLE1BQXhFO0FBQ0g7Ozs0QkE5RGtCO0FBQ2YsbUJBQU9wRCxPQUFQO0FBQ0g7Ozs0QkEyQmdCO0FBQ2IsZ0JBQUcsS0FBSzZDLEtBQVIsRUFDSSxPQUFPLEtBQUtBLEtBQVo7QUFDSixnQkFBRyxLQUFLSCxLQUFSLEVBQWM7QUFDVnpDLG9CQUFJMkMsYUFBSixDQUFrQixLQUFLRixLQUF2QjtBQUNBLHFCQUFLRyxLQUFMLEdBQVc1QyxJQUFJLEtBQUt5QyxLQUFULENBQVg7QUFDSDtBQUNELG1CQUFPLEtBQUtHLEtBQVo7QUFDSDs7OzRCQUVlO0FBQ2xCLG1CQUFPLEtBQUtFLE9BQVo7QUFDQTs7OzRCQU0yQjtBQUNyQixtQkFBTzdDLGNBQVA7QUFDSDs7Ozs7O0lBZ0JDcUQsTzs7Ozs7Ozs7Ozs7K0JBQ1c7QUFDVG5ELG9CQUFRb0QsSUFBUixDQUFhQyxJQUFiLENBQWtCLElBQWxCLEVBQXVCLEVBQUM3QixLQUFJLEtBQUtZLE1BQUwsR0FBWSxLQUFLRSxLQUF0QixFQUE0QmdCLFNBQVEsS0FBcEMsRUFBdkI7QUFDSDs7OztFQUhpQnRELE87O0FBTXRCQSxRQUFRbUQsT0FBUixHQUFnQkEsT0FBaEIiLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnXHJcbmltcG9ydCB7U2NoZW1hfSBmcm9tIFwibm9ybWFsaXpyXCJcclxuXHJcbnZhciBfaHR0cGNsaWVudCxcclxuICAgIF9zZXJ2ZXIsXHJcbiAgICBfZGIsXHJcbiAgICBfX2xvY2FsU3RvcmFnZSxcclxuICAgIF9fZW1pdHRlcj1uZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuZGI9X2RiXHJcbiAgICAgICAgdGhpcy5jb2xzPVNlcnZpY2UuY29sc1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1cHNlcnQoZG9jLGJhc2UsIHN1Y2Nlc3MsIGVycm9yKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xzLnVwc2VydCguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVwZGF0ZWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCd1cHNlcnRlZCcsdXBkYXRlZCxiYXNlLCBlcnJvcilcclxuICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkXHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcmVtb3ZlKGlkLCBzdWNjZXNzLGVycm9yKXtcclxuICAgICAgICBpZih0eXBlb2YoaWQpPT0nb2JqZWN0JylcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgaWQgc2hvdWxkIGJlIHN0cmluZywgaW5zdGVhZCBvZiBvYmplY3Qgd2hlbiByZW1vdmluZ2ApKVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xzLnJlbW92ZShpZCwgc3VjY2VzcywgZXJyb3IpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZWQnLCBpZCwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZmluZCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbHMuZmluZCguLi5hcmd1bWVudHMpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZpbmRPbmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xzLmZpbmRPbmUoLi4uYXJndW1lbnRzKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBhamF4KG8pe1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgICAgICB2YXIge2NvbnRleHQsIG1ldGhvZCx1cmwscGFyYW1zLGRhdGEsIF9zdWNjZXNzLCBfZXJyb3IsX2FwaUtleSwgX3Nlc3Npb25Ub2tlbn09b1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc3VjY2VzcyhyKXtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoX3N1Y2Nlc3MgJiYgX3N1Y2Nlc3MuYXBwbHkoY29udGV4dCxhcmd1bWVudHMpIHx8IHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBlcnJvcihyLHN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoX2Vycm9yICYmIF9lcnJvci5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpIHx8IG5ldyBFcnJvcihyKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX2h0dHBjbGllbnQobWV0aG9kLCB1cmwsIHBhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3IsIF9hcGlLZXksIF9zZXNzaW9uVG9rZW4pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IHNlcnZlcigpe1xyXG4gICAgICAgIHJldHVybiBfc2VydmVyXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGh0dHBjbGllbnQoKXtcclxuICAgICAgICByZXR1cm4gX2h0dHBjbGllbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbml0KG9wdCwgZGIsIGh0dHBjbGllbnQsc2VydmVyLCB0ZW1wU3RvcmFnZSl7XHJcbiAgICAgICAgaWYoZGIpe1xyXG4gICAgICAgICAgICBfZGI9ZGJcclxuICAgICAgICAgICAgX19sb2NhbFN0b3JhZ2U9dGVtcFN0b3JhZ2VcclxuICAgICAgICAgICAgaHR0cGNsaWVudCAmJiAoX2h0dHBjbGllbnQ9aHR0cGNsaWVudCk7XHJcbiAgICAgICAgICAgIHNlcnZlciAmJiAoX3NlcnZlcj1zZXJ2ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5fbmFtZSl7XHJcbiAgICAgICAgICAgIGlmKG9wdD09PXRydWUpey8vbG9jYWwgb25seVxyXG4gICAgICAgICAgICAgICAgX2RiLmxvY2FsRGIuYWRkQ29sbGVjdGlvbih0aGlzLl9uYW1lKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29scz1fZGIubG9jYWxEYlt0aGlzLl9uYW1lXVxyXG5cdFx0XHRcdHRoaXMuX2xvY2FsT25seT10cnVlXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgX2RiLmFkZENvbGxlY3Rpb24odGhpcy5fbmFtZSxvcHQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xzPV9kYlt0aGlzLl9uYW1lXVxyXG4gICAgICAgICAgICB9XHJcblx0XHRcdHRoaXMuX3NjaGVtYT1uZXcgU2NoZW1hKHRoaXMuX25hbWUsIHtpZEF0dHJpYnV0ZTpcIl9pZFwifSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBjb2xzKCl7XHJcbiAgICAgICAgaWYodGhpcy5fY29scylcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHM7XHJcbiAgICAgICAgaWYodGhpcy5fbmFtZSl7XHJcbiAgICAgICAgICAgIF9kYi5hZGRDb2xsZWN0aW9uKHRoaXMuX25hbWUpXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbHM9X2RiW3RoaXMuX25hbWVdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xzXHJcbiAgICB9XHJcblx0XHJcblx0c3RhdGljIGdldCBzY2hlbWEoKXtcclxuXHRcdHJldHVybiB0aGlzLl9zY2hlbWFcclxuXHR9XHJcblxyXG4gICAgc3RhdGljIHN1cGVyKGYpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fcHJvdG9fX1tmXS5iaW5kKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBsb2NhbFN0b3JhZ2UoKXtcclxuICAgICAgICByZXR1cm4gX19sb2NhbFN0b3JhZ2VcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZW1pdCh0eXBlLCAuLi5vdGhlcnMpe1xyXG4gICAgICAgIF9fZW1pdHRlci5lbWl0KGAke3RoaXMuX25hbWV9LiR7dHlwZX1gLC4uLm90aGVycyx0aGlzKVxyXG4gICAgICAgIF9fZW1pdHRlci5lbWl0KHR5cGUsLi4ub3RoZXJzLHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG9uKHR5cGUsLi4ub3RoZXJzKXtcclxuICAgICAgICBfX2VtaXR0ZXIub24oYCR7dGhpcy5fbmFtZSA/IHRoaXMuX25hbWUrJy4nIDonJ30ke3R5cGV9YCwuLi5vdGhlcnMpXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHJlbW92ZUxpc3RlbmVyKHR5cGUsIC4uLm90aGVycyl7XHJcbiAgICAgICAgX19lbWl0dGVyLnJlbW92ZUxpc3RlbmVyKGAke3RoaXMuX25hbWUgPyB0aGlzLl9uYW1lKycuJyA6Jyd9JHt0eXBlfWAsLi4ub3RoZXJzKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBCdWlsdEluIGV4dGVuZHMgU2VydmljZXtcclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgU2VydmljZS5pbml0LmNhbGwodGhpcyx7dXJsOnRoaXMuc2VydmVyK3RoaXMuX25hbWUsaW50ZXJpbTpmYWxzZX0pXHJcbiAgICB9XHJcbn1cclxuXHJcblNlcnZpY2UuQnVpbHRJbj1CdWlsdEluXHJcbiJdfQ==