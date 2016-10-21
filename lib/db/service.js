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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUEsSUFBSSxXQUFKO0lBQ0ksT0FESjtJQUVJLEdBRko7SUFHSSxjQUhKO0lBSUksWUFBVSwwQkFBVjs7SUFFUztBQUNULGFBRFMsT0FDVCxHQUFhOzhCQURKLFNBQ0k7O0FBQ1QsYUFBSyxFQUFMLEdBQVEsR0FBUixDQURTO0FBRVQsYUFBSyxJQUFMLEdBQVUsUUFBUSxJQUFSLENBRkQ7S0FBYjs7aUJBRFM7OytCQU1LLEtBQUksTUFBTSxTQUFTLE9BQU07QUFDbkMsbUJBQU8sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixHQUFqQixFQUFxQixJQUFyQixFQUEwQixPQUExQixFQUFrQyxLQUFsQyxFQUNGLElBREUsQ0FDRyxVQUFTLE9BQVQsRUFBaUI7QUFDbkIscUJBQUssSUFBTCxDQUFVLFVBQVYsRUFBcUIsT0FBckIsRUFBNkIsSUFBN0IsRUFBbUMsS0FBbkMsRUFEbUI7QUFFbkIsdUJBQU8sT0FBUCxDQUZtQjthQUFqQixDQUdKLElBSEksQ0FHQyxJQUhELENBREgsQ0FBUCxDQURtQzs7OzsrQkFRekIsSUFBSSxTQUFRLE9BQU07QUFDNUIsZ0JBQUcsUUFBTywrQ0FBUCxJQUFZLFFBQVosRUFDQyxNQUFNLElBQUksS0FBSix3REFBTixDQURKOztBQUdBLG1CQUFPLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsRUFBakIsRUFBcUIsT0FBckIsRUFBOEIsS0FBOUIsRUFDRixJQURFLENBQ0csWUFBVTtBQUNaLHFCQUFLLElBQUwsQ0FBVSxTQUFWLEVBQXFCLEVBQXJCLEVBQXlCLEtBQXpCLEVBRFk7YUFBVixDQUVKLElBRkksQ0FFQyxJQUZELENBREgsQ0FBUCxDQUo0Qjs7OzsrQkFVbkI7OztBQUNULG1CQUFPLGNBQUssSUFBTCxFQUFVLElBQVYsY0FBa0IsU0FBbEIsQ0FBUCxDQURTOzs7O2tDQUlHOzs7QUFDWixt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S0FBTCxDQURYO0FBRUEsZ0JBQUcsS0FBSyxLQUFMLEVBQVc7QUFDVixvQkFBSSxhQUFKLENBQWtCLEtBQUssS0FBTCxDQUFsQixDQURVO0FBRVYscUJBQUssS0FBTCxHQUFXLElBQUksS0FBSyxLQUFMLENBQWYsQ0FGVTthQUFkO0FBSUEsbUJBQU8sS0FBSyxLQUFMLENBUE07Ozs7NEJBY1E7QUFDckIsbUJBQU8sY0FBUCxDQURxQjs7OztXQTFGaEI7OztJQTRHUDs7Ozs7Ozs7Ozs7K0JBQ1c7QUFDVCxvQkFBUSxJQUFSLENBQWEsSUFBYixDQUFrQixJQUFsQixFQUF1QixFQUFDLEtBQUksS0FBSyxNQUFMLEdBQVksS0FBSyxLQUFMLEVBQVcsU0FBUSxLQUFSLEVBQW5ELEVBRFM7Ozs7V0FEWDtFQUFnQjs7QUFNdEIsUUFBUSxPQUFSLEdBQWdCLE9BQWhCIiwiZmlsZSI6InNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJ1xuXG52YXIgX2h0dHBjbGllbnQsXG4gICAgX3NlcnZlcixcbiAgICBfZGIsXG4gICAgX19sb2NhbFN0b3JhZ2UsXG4gICAgX19lbWl0dGVyPW5ldyBFdmVudEVtaXR0ZXIoKTtcblxuZXhwb3J0IGNsYXNzIFNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuZGI9X2RiXG4gICAgICAgIHRoaXMuY29scz1TZXJ2aWNlLmNvbHNcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBzZXJ0KGRvYyxiYXNlLCBzdWNjZXNzLCBlcnJvcil7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbHMudXBzZXJ0KGRvYyxiYXNlLHN1Y2Nlc3MsZXJyb3IpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih1cGRhdGVkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3Vwc2VydGVkJyx1cGRhdGVkLGJhc2UsIGVycm9yKVxuICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZShpZCwgc3VjY2VzcyxlcnJvcil7XG4gICAgICAgIGlmKHR5cGVvZihpZCk9PSdvYmplY3QnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpZCBzaG91bGQgYmUgc3RyaW5nLCBpbnN0ZWFkIG9mIG9iamVjdCB3aGVuIHJlbW92aW5nYClcblxuICAgICAgICByZXR1cm4gdGhpcy5jb2xzLnJlbW92ZShpZCwgc3VjY2VzcywgZXJyb3IpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlZCcsIGlkLCBlcnJvcilcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZmluZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xzLmZpbmQoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIHN0YXRpYyBmaW5kT25lKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbHMuZmluZE9uZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGFqYXgobyl7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdmFyIHtjb250ZXh0LCBtZXRob2QsdXJsLHBhcmFtcyxkYXRhLCBfc3VjY2VzcywgX2Vycm9yLF9hcGlLZXksIF9zZXNzaW9uVG9rZW59PW9cblxuICAgICAgICAgICAgZnVuY3Rpb24gc3VjY2VzcyhyKXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKF9zdWNjZXNzICYmIF9zdWNjZXNzLmFwcGx5KGNvbnRleHQsYXJndW1lbnRzKSB8fCByKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZXJyb3IocixzdGF0dXMpe1xuICAgICAgICAgICAgICAgIHJlamVjdChfZXJyb3IgJiYgX2Vycm9yLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cykgfHwgbmV3IEVycm9yKHIpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfaHR0cGNsaWVudChtZXRob2QsIHVybCwgcGFyYW1zLCBkYXRhLCBzdWNjZXNzLCBlcnJvciwgX2FwaUtleSwgX3Nlc3Npb25Ub2tlbilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHNlcnZlcigpe1xuICAgICAgICByZXR1cm4gX3NlcnZlclxuICAgIH1cblxuICAgIHN0YXRpYyBodHRwY2xpZW50KCl7XG4gICAgICAgIHJldHVybiBfaHR0cGNsaWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQob3B0LCBkYiwgaHR0cGNsaWVudCxzZXJ2ZXIsIHRlbXBTdG9yYWdlKXtcbiAgICAgICAgaWYoZGIpe1xuICAgICAgICAgICAgX2RiPWRiXG4gICAgICAgICAgICBfX2xvY2FsU3RvcmFnZT10ZW1wU3RvcmFnZVxuICAgICAgICAgICAgaHR0cGNsaWVudCAmJiAoX2h0dHBjbGllbnQ9aHR0cGNsaWVudCk7XG4gICAgICAgICAgICBzZXJ2ZXIgJiYgKF9zZXJ2ZXI9c2VydmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuX25hbWUpe1xuICAgICAgICAgICAgaWYob3B0PT09dHJ1ZSl7Ly9sb2NhbCBvbmx5XG4gICAgICAgICAgICAgICAgX2RiLmxvY2FsRGIuYWRkQ29sbGVjdGlvbih0aGlzLl9uYW1lKVxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbHM9X2RiLmxvY2FsRGJbdGhpcy5fbmFtZV1cblx0XHRcdFx0dGhpcy5fbG9jYWxPbmx5PXRydWVcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIF9kYi5hZGRDb2xsZWN0aW9uKHRoaXMuX25hbWUsb3B0KVxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbHM9X2RiW3RoaXMuX25hbWVdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGNvbHMoKXtcbiAgICAgICAgaWYodGhpcy5fY29scylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xzO1xuICAgICAgICBpZih0aGlzLl9uYW1lKXtcbiAgICAgICAgICAgIF9kYi5hZGRDb2xsZWN0aW9uKHRoaXMuX25hbWUpXG4gICAgICAgICAgICB0aGlzLl9jb2xzPV9kYlt0aGlzLl9uYW1lXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xzXG4gICAgfVxuXG4gICAgc3RhdGljIHN1cGVyKGYpe1xuICAgICAgICByZXR1cm4gdGhpcy5fX3Byb3RvX19bZl0uYmluZCh0aGlzKVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgbG9jYWxTdG9yYWdlKCl7XG4gICAgICAgIHJldHVybiBfX2xvY2FsU3RvcmFnZVxuICAgIH1cblxuICAgIHN0YXRpYyBlbWl0KHR5cGUsIC4uLm90aGVycyl7XG4gICAgICAgIF9fZW1pdHRlci5lbWl0KGAke3RoaXMuX25hbWV9LiR7dHlwZX1gLC4uLm90aGVycyx0aGlzKVxuICAgICAgICBfX2VtaXR0ZXIuZW1pdCh0eXBlLC4uLm90aGVycyx0aGlzKVxuICAgIH1cblxuICAgIHN0YXRpYyBvbih0eXBlLC4uLm90aGVycyl7XG4gICAgICAgIF9fZW1pdHRlci5vbihgJHt0aGlzLl9uYW1lID8gdGhpcy5fbmFtZSsnLicgOicnfSR7dHlwZX1gLC4uLm90aGVycylcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlTGlzdGVuZXIodHlwZSwgLi4ub3RoZXJzKXtcbiAgICAgICAgX19lbWl0dGVyLnJlbW92ZUxpc3RlbmVyKGAke3RoaXMuX25hbWUgPyB0aGlzLl9uYW1lKycuJyA6Jyd9JHt0eXBlfWAsLi4ub3RoZXJzKVxuICAgIH1cbn1cblxuY2xhc3MgQnVpbHRJbiBleHRlbmRzIFNlcnZpY2V7XG4gICAgc3RhdGljIGluaXQoKXtcbiAgICAgICAgU2VydmljZS5pbml0LmNhbGwodGhpcyx7dXJsOnRoaXMuc2VydmVyK3RoaXMuX25hbWUsaW50ZXJpbTpmYWxzZX0pXG4gICAgfVxufVxuXG5TZXJ2aWNlLkJ1aWx0SW49QnVpbHRJblxuIl19