'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('./service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var File = function (_Service$BuiltIn) {
    _inherits(File, _Service$BuiltIn);

    function File() {
        _classCallCheck(this, File);

        return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).apply(this, arguments));
    }

    _createClass(File, null, [{
        key: 'upload',
        value: function upload(data) {
            var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "image";

            var _this2 = this;

            var props = arguments[2];
            var url = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "http://up.qiniu.com";

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
}(_service.Service.BuiltIn);

exports.default = File;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maWxlLmpzIl0sIm5hbWVzIjpbIkZpbGUiLCJkYXRhIiwidHlwZSIsInByb3BzIiwidXJsIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJfZ2V0VG9rZW4iLCJ0aGVuIiwidG9rZW4iLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiYSIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsIm9wZW4iLCJzZW5kIiwiYWpheCIsIm1ldGhvZCIsIkJ1aWx0SW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzsrQkFLSEMsSSxFQUFtRDtBQUFBLGdCQUE5Q0MsSUFBOEMsdUVBQXpDLE9BQXlDOztBQUFBOztBQUFBLGdCQUFqQ0MsS0FBaUM7QUFBQSxnQkFBMUJDLEdBQTBCLHVFQUF0QixxQkFBc0I7O0FBQzdELG1CQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBbUI7QUFDbEMsdUJBQUtDLFNBQUwsR0FBaUJDLElBQWpCLENBQXNCLFVBQUNDLEtBQUQsRUFBUztBQUMzQix3QkFBSUMsV0FBUyxJQUFJQyxRQUFKLEVBQWI7QUFDQUQsNkJBQVNFLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBdUJaLElBQXZCO0FBQ0FVLDZCQUFTRSxNQUFULENBQWdCLE9BQWhCLEVBQXdCSCxLQUF4QjtBQUNBLHlCQUFJLElBQUlJLENBQVIsSUFBYVgsS0FBYjtBQUNJUSxpQ0FBU0UsTUFBVCxDQUFnQkMsQ0FBaEIsRUFBa0JYLE1BQU1XLENBQU4sQ0FBbEI7QUFESixxQkFHQSxJQUFJQyxNQUFJLElBQUlDLGNBQUosRUFBUjtBQUNBRCx3QkFBSUUsa0JBQUosR0FBeUIsWUFBWTtBQUNqQyw0QkFBSUYsSUFBSUcsVUFBSixLQUFtQixDQUF2QixFQUEwQjtBQUN0QixnQ0FBSUgsSUFBSUksTUFBSixJQUFjLEdBQWQsSUFBcUJKLElBQUlJLE1BQUosR0FBYSxHQUF0QyxFQUNJYixRQUFRYyxLQUFLQyxLQUFMLENBQVdOLElBQUlPLFlBQWYsRUFBNkJsQixHQUFyQyxFQURKLEtBR0lHLE9BQU9RLElBQUlPLFlBQVg7QUFDUDtBQUNKLHFCQVBEOztBQVNBUCx3QkFBSVEsSUFBSixDQUFTLE1BQVQsRUFBZ0JuQixHQUFoQixFQUFvQixJQUFwQjtBQUNBVyx3QkFBSVMsSUFBSixDQUFTdkIsSUFBVDtBQUNILGlCQW5CRDtBQW9CSCxhQXJCTSxDQUFQO0FBc0JIOzs7b0NBRWlCO0FBQ2QsbUJBQU8sS0FBS3dCLElBQUwsQ0FBVTtBQUNiQyx3QkFBTyxLQURNO0FBRWJ0QixxQkFBSTtBQUZTLGFBQVYsRUFHSkssSUFISSxDQUdDLFVBQUNSLElBQUQ7QUFBQSx1QkFBUUEsS0FBS1MsS0FBYjtBQUFBLGFBSEQsQ0FBUDtBQUlIOzs7NEJBbENpQjtBQUNkLG1CQUFPLE9BQVA7QUFDTjs7OztFQUhnQyxpQkFBUWlCLE87O2tCQUFyQjNCLEkiLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuICAgIHN0YXRpYyBnZXQgX25hbWUoKXtcbiAgICAgICAgcmV0dXJuICdmaWxlcydcblx0fVxuXG4gICAgc3RhdGljIHVwbG9hZChkYXRhLHR5cGU9XCJpbWFnZVwiLHByb3BzLCB1cmw9XCJodHRwOi8vdXAucWluaXUuY29tXCIpe1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMuX2dldFRva2VuKCkudGhlbigodG9rZW4pPT57XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1EYXRhPW5ldyBGb3JtRGF0YSgpXG4gICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJyxkYXRhKVxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgndG9rZW4nLHRva2VuKVxuICAgICAgICAgICAgICAgIGZvcih2YXIgYSBpbiBwcm9wcylcbiAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGEscHJvcHNbYV0pXG5cbiAgICAgICAgICAgICAgICB2YXIgeGhyPW5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkudXJsKVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJyx1cmwsdHJ1ZSlcbiAgICAgICAgICAgICAgICB4aHIuc2VuZChkYXRhKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzdGF0aWMgX2dldFRva2VuKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOidnZXQnLFxuICAgICAgICAgICAgdXJsOidodHRwOi8vcWlsaTIuY29tLzEvZmlsZXMvdG9rZW4nXG4gICAgICAgIH0pLnRoZW4oKGRhdGEpPT5kYXRhLnRva2VuKVxuICAgIH1cbn1cbiJdfQ==