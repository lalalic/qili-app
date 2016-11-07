'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var File = function (_Service$BuiltIn) {
    (0, _inherits3.default)(File, _Service$BuiltIn);

    function File() {
        (0, _classCallCheck3.default)(this, File);
        return (0, _possibleConstructorReturn3.default)(this, (File.__proto__ || (0, _getPrototypeOf2.default)(File)).apply(this, arguments));
    }

    (0, _createClass3.default)(File, null, [{
        key: 'upload',
        value: function upload(data) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "image";

            var _this2 = this;

            var props = arguments[2];
            var url = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "http://up.qiniu.com";

            return new _promise2.default(function (resolve, reject) {
                _this2._getToken().then(function (token) {
                    var formData = new FormData();
                    formData.append('file', data);
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
                    xhr.send(data);
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maWxlLmpzIl0sIm5hbWVzIjpbIkZpbGUiLCJkYXRhIiwidHlwZSIsInByb3BzIiwidXJsIiwicmVzb2x2ZSIsInJlamVjdCIsIl9nZXRUb2tlbiIsInRoZW4iLCJ0b2tlbiIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJhIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0Iiwib3BlbiIsInNlbmQiLCJhamF4IiwibWV0aG9kIiwiQnVpbHRJbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7K0JBS0hDLEksRUFBbUQ7QUFBQSxnQkFBOUNDLElBQThDLHVFQUF6QyxPQUF5Qzs7QUFBQTs7QUFBQSxnQkFBakNDLEtBQWlDO0FBQUEsZ0JBQTFCQyxHQUEwQix1RUFBdEIscUJBQXNCOztBQUM3RCxtQkFBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBbUI7QUFDbEMsdUJBQUtDLFNBQUwsR0FBaUJDLElBQWpCLENBQXNCLFVBQUNDLEtBQUQsRUFBUztBQUMzQix3QkFBSUMsV0FBUyxJQUFJQyxRQUFKLEVBQWI7QUFDQUQsNkJBQVNFLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBdUJYLElBQXZCO0FBQ0FTLDZCQUFTRSxNQUFULENBQWdCLE9BQWhCLEVBQXdCSCxLQUF4QjtBQUNBLHlCQUFJLElBQUlJLENBQVIsSUFBYVYsS0FBYjtBQUNJTyxpQ0FBU0UsTUFBVCxDQUFnQkMsQ0FBaEIsRUFBa0JWLE1BQU1VLENBQU4sQ0FBbEI7QUFESixxQkFHQSxJQUFJQyxNQUFJLElBQUlDLGNBQUosRUFBUjtBQUNBRCx3QkFBSUUsa0JBQUosR0FBeUIsWUFBWTtBQUNqQyw0QkFBSUYsSUFBSUcsVUFBSixLQUFtQixDQUF2QixFQUEwQjtBQUN0QixnQ0FBSUgsSUFBSUksTUFBSixJQUFjLEdBQWQsSUFBcUJKLElBQUlJLE1BQUosR0FBYSxHQUF0QyxFQUNJYixRQUFRYyxLQUFLQyxLQUFMLENBQVdOLElBQUlPLFlBQWYsRUFBNkJqQixHQUFyQyxFQURKLEtBR0lFLE9BQU9RLElBQUlPLFlBQVg7QUFDUDtBQUNKLHFCQVBEOztBQVNBUCx3QkFBSVEsSUFBSixDQUFTLE1BQVQsRUFBZ0JsQixHQUFoQixFQUFvQixJQUFwQjtBQUNBVSx3QkFBSVMsSUFBSixDQUFTdEIsSUFBVDtBQUNILGlCQW5CRDtBQW9CSCxhQXJCTSxDQUFQO0FBc0JIOzs7b0NBRWlCO0FBQ2QsbUJBQU8sS0FBS3VCLElBQUwsQ0FBVTtBQUNiQyx3QkFBTyxLQURNO0FBRWJyQixxQkFBSTtBQUZTLGFBQVYsRUFHSkksSUFISSxDQUdDLFVBQUNQLElBQUQ7QUFBQSx1QkFBUUEsS0FBS1EsS0FBYjtBQUFBLGFBSEQsQ0FBUDtBQUlIOzs7NEJBbENpQjtBQUNkLG1CQUFPLE9BQVA7QUFDTjs7O0VBSGdDLGlCQUFRaUIsTzs7a0JBQXJCMUIsSSIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGUgZXh0ZW5kcyBTZXJ2aWNlLkJ1aWx0SW57XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ2ZpbGVzJ1xuXHR9XG5cbiAgICBzdGF0aWMgdXBsb2FkKGRhdGEsdHlwZT1cImltYWdlXCIscHJvcHMsIHVybD1cImh0dHA6Ly91cC5xaW5pdS5jb21cIil7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5fZ2V0VG9rZW4oKS50aGVuKCh0b2tlbik9PntcbiAgICAgICAgICAgICAgICB2YXIgZm9ybURhdGE9bmV3IEZvcm1EYXRhKClcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLGRhdGEpXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0b2tlbicsdG9rZW4pXG4gICAgICAgICAgICAgICAgZm9yKHZhciBhIGluIHByb3BzKVxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoYSxwcm9wc1thXSlcblxuICAgICAgICAgICAgICAgIHZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KS51cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLHVybCx0cnVlKVxuICAgICAgICAgICAgICAgIHhoci5zZW5kKGRhdGEpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBfZ2V0VG9rZW4oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICB1cmw6J2h0dHA6Ly9xaWxpMi5jb20vMS9maWxlcy90b2tlbidcbiAgICAgICAgfSkudGhlbigoZGF0YSk9PmRhdGEudG9rZW4pXG4gICAgfVxufVxuIl19