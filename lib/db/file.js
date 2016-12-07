'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _service = require('./service');

var _fileSelector = require('../components/file-selector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var File = function (_Service$BuiltIn) {
    (0, _inherits3.default)(File, _Service$BuiltIn);

    function File() {
        (0, _classCallCheck3.default)(this, File);
        return (0, _possibleConstructorReturn3.default)(this, (File.__proto__ || (0, _getPrototypeOf2.default)(File)).apply(this, arguments));
    }

    (0, _createClass3.default)(File, null, [{
        key: 'upload',
        value: function upload(data, props) {
            var _this2 = this;

            var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "http://up.qiniu.com";

            return new _promise2.default(function (resolve, reject) {
                _this2._getToken().then(function (token) {
                    return dataAsBlob(data).then(function (data) {
                        var formData = new FormData();
                        formData.append('file', data, "a.jpg");
                        formData.append('token', token);
                        for (var a in props) {
                            formData.append(a, props[a]);
                        }var xhr = new XMLHttpRequest();
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText).url);else reject(xhr.responseText);
                            }
                        };

                        xhr.open('POST', url, true);
                        xhr.send(formData);
                    });
                });
            });
        }
    }, {
        key: '_getToken',
        value: function _getToken() {
            return this.ajax({
                method: 'get',
                url: 'http://qili2.com/1/files/token'
            }).then(function (data) {
                return data.token;
            });
        }
    }, {
        key: '_name',
        get: function get() {
            return 'files';
        }
    }]);
    return File;
}(_service.Service.BuiltIn);

exports.default = File;


function dataAsBlob(data) {
    return new _promise2.default(function (resolve, reject) {
        switch (typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) {
            case 'string':
                if (data.startsWith("file://")) {
                    window.resolveLocalFileSystemURL(data, function (entry) {
                        return entry.file(resolve, reject);
                    }, reject);
                } else if (data.startsWith("data:image/jpeg;base64,")) {
                    resolve((0, _fileSelector.toBlob)(data));
                } else resolve(data);
                break;
            default:
                resolve(data);
        }
    });
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maWxlLmpzIl0sIm5hbWVzIjpbIkZpbGUiLCJkYXRhIiwicHJvcHMiLCJ1cmwiLCJyZXNvbHZlIiwicmVqZWN0IiwiX2dldFRva2VuIiwidGhlbiIsImRhdGFBc0Jsb2IiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwidG9rZW4iLCJhIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0Iiwib3BlbiIsInNlbmQiLCJhamF4IiwibWV0aG9kIiwiQnVpbHRJbiIsInN0YXJ0c1dpdGgiLCJ3aW5kb3ciLCJyZXNvbHZlTG9jYWxGaWxlU3lzdGVtVVJMIiwiZW50cnkiLCJmaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7K0JBS0hDLEksRUFBS0MsSyxFQUFnQztBQUFBOztBQUFBLGdCQUExQkMsR0FBMEIsdUVBQXRCLHFCQUFzQjs7QUFDL0MsbUJBQU8sc0JBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQW1CO0FBQ2xDLHVCQUFLQyxTQUFMLEdBQWlCQyxJQUFqQixDQUFzQjtBQUFBLDJCQUFPQyxXQUFXUCxJQUFYLEVBQWlCTSxJQUFqQixDQUFzQixnQkFBTTtBQUNyRCw0QkFBSUUsV0FBUyxJQUFJQyxRQUFKLEVBQWI7QUFDQUQsaUNBQVNFLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBdUJWLElBQXZCLEVBQTZCLE9BQTdCO0FBQ0FRLGlDQUFTRSxNQUFULENBQWdCLE9BQWhCLEVBQXdCQyxLQUF4QjtBQUNBLDZCQUFJLElBQUlDLENBQVIsSUFBYVgsS0FBYjtBQUNJTyxxQ0FBU0UsTUFBVCxDQUFnQkUsQ0FBaEIsRUFBa0JYLE1BQU1XLENBQU4sQ0FBbEI7QUFESix5QkFHQSxJQUFJQyxNQUFJLElBQUlDLGNBQUosRUFBUjtBQUNBRCw0QkFBSUUsa0JBQUosR0FBeUIsWUFBWTtBQUNqQyxnQ0FBSUYsSUFBSUcsVUFBSixLQUFtQixDQUF2QixFQUEwQjtBQUN0QixvQ0FBSUgsSUFBSUksTUFBSixJQUFjLEdBQWQsSUFBcUJKLElBQUlJLE1BQUosR0FBYSxHQUF0QyxFQUNJZCxRQUFRZSxLQUFLQyxLQUFMLENBQVdOLElBQUlPLFlBQWYsRUFBNkJsQixHQUFyQyxFQURKLEtBR0lFLE9BQU9TLElBQUlPLFlBQVg7QUFDUDtBQUNKLHlCQVBEOztBQVNBUCw0QkFBSVEsSUFBSixDQUFTLE1BQVQsRUFBZ0JuQixHQUFoQixFQUFvQixJQUFwQjtBQUNBVyw0QkFBSVMsSUFBSixDQUFTZCxRQUFUO0FBQ0gscUJBbkI0QixDQUFQO0FBQUEsaUJBQXRCO0FBb0JILGFBckJNLENBQVA7QUFzQkg7OztvQ0FFaUI7QUFDZCxtQkFBTyxLQUFLZSxJQUFMLENBQVU7QUFDYkMsd0JBQU8sS0FETTtBQUVidEIscUJBQUk7QUFGUyxhQUFWLEVBR0pJLElBSEksQ0FHQyxVQUFDTixJQUFEO0FBQUEsdUJBQVFBLEtBQUtXLEtBQWI7QUFBQSxhQUhELENBQVA7QUFJSDs7OzRCQWxDaUI7QUFDZCxtQkFBTyxPQUFQO0FBQ047OztFQUhnQyxpQkFBUWMsTzs7a0JBQXJCMUIsSTs7O0FBc0NyQixTQUFTUSxVQUFULENBQW9CUCxJQUFwQixFQUF5QjtBQUN4QixXQUFPLHNCQUFZLFVBQUNHLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNwQyx1QkFBY0osSUFBZCx1REFBY0EsSUFBZDtBQUNBLGlCQUFLLFFBQUw7QUFDQyxvQkFBR0EsS0FBSzBCLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBSCxFQUE4QjtBQUM3QkMsMkJBQU9DLHlCQUFQLENBQWlDNUIsSUFBakMsRUFBdUM7QUFBQSwrQkFBTzZCLE1BQU1DLElBQU4sQ0FBVzNCLE9BQVgsRUFBbUJDLE1BQW5CLENBQVA7QUFBQSxxQkFBdkMsRUFBMEVBLE1BQTFFO0FBQ0EsaUJBRkQsTUFFTSxJQUFHSixLQUFLMEIsVUFBTCxDQUFnQix5QkFBaEIsQ0FBSCxFQUE4QztBQUNuRHZCLDRCQUFRLDBCQUFPSCxJQUFQLENBQVI7QUFDQSxpQkFGSyxNQUdMRyxRQUFRSCxJQUFSO0FBQ0Y7QUFDQTtBQUNDRyx3QkFBUUgsSUFBUjtBQVZEO0FBWUEsS0FiTSxDQUFQO0FBY0EiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuaW1wb3J0IHt0b0Jsb2J9IGZyb20gXCIuLi9jb21wb25lbnRzL2ZpbGUtc2VsZWN0b3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdmaWxlcydcblx0fVxuXG4gICAgc3RhdGljIHVwbG9hZChkYXRhLHByb3BzLHVybD1cImh0dHA6Ly91cC5xaW5pdS5jb21cIil7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5fZ2V0VG9rZW4oKS50aGVuKHRva2VuPT5kYXRhQXNCbG9iKGRhdGEpLnRoZW4oZGF0YT0+e1xuICAgICAgICAgICAgICAgIHZhciBmb3JtRGF0YT1uZXcgRm9ybURhdGEoKVxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsZGF0YSwgXCJhLmpwZ1wiKVxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndG9rZW4nLHRva2VuKVxuICAgICAgICAgICAgICAgIGZvcih2YXIgYSBpbiBwcm9wcylcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGEscHJvcHNbYV0pXG5cbiAgICAgICAgICAgICAgICB2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkudXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJyx1cmwsdHJ1ZSlcbiAgICAgICAgICAgICAgICB4aHIuc2VuZChmb3JtRGF0YSlcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBfZ2V0VG9rZW4oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICB1cmw6J2h0dHA6Ly9xaWxpMi5jb20vMS9maWxlcy90b2tlbidcbiAgICAgICAgfSkudGhlbigoZGF0YSk9PmRhdGEudG9rZW4pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBkYXRhQXNCbG9iKGRhdGEpe1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuXHRcdHN3aXRjaCh0eXBlb2YoZGF0YSkpe1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRpZihkYXRhLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpKXtcblx0XHRcdFx0d2luZG93LnJlc29sdmVMb2NhbEZpbGVTeXN0ZW1VUkwoZGF0YSwgZW50cnk9PmVudHJ5LmZpbGUocmVzb2x2ZSxyZWplY3QpLCByZWplY3QpXG5cdFx0XHR9ZWxzZSBpZihkYXRhLnN0YXJ0c1dpdGgoXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiKSl7XG5cdFx0XHRcdHJlc29sdmUodG9CbG9iKGRhdGEpKVxuXHRcdFx0fWVsc2Vcblx0XHRcdFx0cmVzb2x2ZShkYXRhKVxuXHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJlc29sdmUoZGF0YSlcblx0XHR9XG5cdH0pXG59XG4iXX0=