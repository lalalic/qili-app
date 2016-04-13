'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('./service');

var Service = _require.Service;

var File = function (_Service$BuiltIn) {
    _inherits(File, _Service$BuiltIn);

    function File() {
        _classCallCheck(this, File);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(File).apply(this, arguments));
    }

    _createClass(File, null, [{
        key: 'upload',
        value: function upload(data) {
            var type = arguments.length <= 1 || arguments[1] === undefined ? "image" : arguments[1];

            var _this2 = this;

            var props = arguments[2];
            var url = arguments.length <= 3 || arguments[3] === undefined ? "http://up.qiniu.com" : arguments[3];

            return new Promise(function (resolve, reject) {
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
}(Service.BuiltIn);

exports.default = File;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2VBQWMsUUFBUSxXQUFSOztJQUFUOztJQUVnQjs7Ozs7Ozs7Ozs7K0JBS0gsTUFBbUQ7Z0JBQTlDLDZEQUFLLHVCQUF5Qzs7OztnQkFBakMscUJBQWlDO2dCQUExQiw0REFBSSxxQ0FBc0I7O0FBQzdELG1CQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBbUI7QUFDbEMsdUJBQUssU0FBTCxHQUFpQixJQUFqQixDQUFzQixVQUFDLEtBQUQsRUFBUztBQUMzQix3QkFBSSxXQUFTLElBQUksUUFBSixFQUFULENBRHVCO0FBRTNCLDZCQUFTLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBdUIsSUFBdkIsRUFGMkI7QUFHM0IsNkJBQVMsTUFBVCxDQUFnQixPQUFoQixFQUF3QixLQUF4QixFQUgyQjtBQUkzQix5QkFBSSxJQUFJLENBQUosSUFBUyxLQUFiO0FBQ0ksaUNBQVMsTUFBVCxDQUFnQixDQUFoQixFQUFrQixNQUFNLENBQU4sQ0FBbEI7cUJBREosSUFHSSxNQUFJLElBQUksY0FBSixFQUFKLENBUHVCO0FBUTNCLHdCQUFJLGtCQUFKLEdBQXlCLFlBQVk7QUFDakMsNEJBQUksSUFBSSxVQUFKLEtBQW1CLENBQW5CLEVBQXNCO0FBQ3RCLGdDQUFJLElBQUksTUFBSixJQUFjLEdBQWQsSUFBcUIsSUFBSSxNQUFKLEdBQWEsR0FBYixFQUNyQixRQUFRLEtBQUssS0FBTCxDQUFXLElBQUksWUFBSixDQUFYLENBQTZCLEdBQTdCLENBQVIsQ0FESixLQUdJLE9BQU8sSUFBSSxZQUFKLENBQVAsQ0FISjt5QkFESjtxQkFEcUIsQ0FSRTs7QUFpQjNCLHdCQUFJLElBQUosQ0FBUyxNQUFULEVBQWdCLEdBQWhCLEVBQW9CLElBQXBCLEVBakIyQjtBQWtCM0Isd0JBQUksSUFBSixDQUFTLElBQVQsRUFsQjJCO2lCQUFULENBQXRCLENBRGtDO2FBQW5CLENBQW5CLENBRDZEOzs7O29DQXlCL0M7QUFDZCxtQkFBTyxLQUFLLElBQUwsQ0FBVTtBQUNiLHdCQUFPLEtBQVA7QUFDQSxxQkFBSSxnQ0FBSjthQUZHLEVBR0osSUFISSxDQUdDLFVBQUMsSUFBRDt1QkFBUSxLQUFLLEtBQUw7YUFBUixDQUhSLENBRGM7Ozs7NEJBN0JBO0FBQ2QsbUJBQU8sT0FBUCxDQURjOzs7O1dBREQ7RUFBYSxRQUFRLE9BQVI7O2tCQUFiIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1NlcnZpY2V9PXJlcXVpcmUoJy4vc2VydmljZScpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGUgZXh0ZW5kcyBTZXJ2aWNlLkJ1aWx0SW57XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xuICAgICAgICByZXR1cm4gJ2ZpbGVzJ1xuXHR9XG5cbiAgICBzdGF0aWMgdXBsb2FkKGRhdGEsdHlwZT1cImltYWdlXCIscHJvcHMsIHVybD1cImh0dHA6Ly91cC5xaW5pdS5jb21cIil7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5fZ2V0VG9rZW4oKS50aGVuKCh0b2tlbik9PntcbiAgICAgICAgICAgICAgICB2YXIgZm9ybURhdGE9bmV3IEZvcm1EYXRhKClcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLGRhdGEpXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCd0b2tlbicsdG9rZW4pXG4gICAgICAgICAgICAgICAgZm9yKHZhciBhIGluIHByb3BzKVxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoYSxwcm9wc1thXSlcblxuICAgICAgICAgICAgICAgIHZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KS51cmwpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLHVybCx0cnVlKVxuICAgICAgICAgICAgICAgIHhoci5zZW5kKGRhdGEpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHN0YXRpYyBfZ2V0VG9rZW4oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXG4gICAgICAgICAgICB1cmw6J2h0dHA6Ly9xaWxpMi5jb20vMS9maWxlcy90b2tlbidcbiAgICAgICAgfSkudGhlbigoZGF0YSk9PmRhdGEudG9rZW4pXG4gICAgfVxufVxuIl19