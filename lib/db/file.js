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
}(_service.Service.BuiltIn);

exports.default = File;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OzsrQkFLSCxNQUFtRDtnQkFBOUMsNkRBQUssdUJBQXlDOzs7O2dCQUFqQyxxQkFBaUM7Z0JBQTFCLDREQUFJLHFDQUFzQjs7QUFDN0QsbUJBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFtQjtBQUNsQyx1QkFBSyxTQUFMLEdBQWlCLElBQWpCLENBQXNCLFVBQUMsS0FBRCxFQUFTO0FBQzNCLHdCQUFJLFdBQVMsSUFBSSxRQUFKLEVBQVQsQ0FEdUI7QUFFM0IsNkJBQVMsTUFBVCxDQUFnQixNQUFoQixFQUF1QixJQUF2QixFQUYyQjtBQUczQiw2QkFBUyxNQUFULENBQWdCLE9BQWhCLEVBQXdCLEtBQXhCLEVBSDJCO0FBSTNCLHlCQUFJLElBQUksQ0FBSixJQUFTLEtBQWI7QUFDSSxpQ0FBUyxNQUFULENBQWdCLENBQWhCLEVBQWtCLE1BQU0sQ0FBTixDQUFsQjtxQkFESixJQUdJLE1BQUksSUFBSSxjQUFKLEVBQUosQ0FQdUI7QUFRM0Isd0JBQUksa0JBQUosR0FBeUIsWUFBWTtBQUNqQyw0QkFBSSxJQUFJLFVBQUosS0FBbUIsQ0FBbkIsRUFBc0I7QUFDdEIsZ0NBQUksSUFBSSxNQUFKLElBQWMsR0FBZCxJQUFxQixJQUFJLE1BQUosR0FBYSxHQUFiLEVBQ3JCLFFBQVEsS0FBSyxLQUFMLENBQVcsSUFBSSxZQUFKLENBQVgsQ0FBNkIsR0FBN0IsQ0FBUixDQURKLEtBR0ksT0FBTyxJQUFJLFlBQUosQ0FBUCxDQUhKO3lCQURKO3FCQURxQixDQVJFOztBQWlCM0Isd0JBQUksSUFBSixDQUFTLE1BQVQsRUFBZ0IsR0FBaEIsRUFBb0IsSUFBcEIsRUFqQjJCO0FBa0IzQix3QkFBSSxJQUFKLENBQVMsSUFBVCxFQWxCMkI7aUJBQVQsQ0FBdEIsQ0FEa0M7YUFBbkIsQ0FBbkIsQ0FENkQ7Ozs7b0NBeUIvQztBQUNkLG1CQUFPLEtBQUssSUFBTCxDQUFVO0FBQ2Isd0JBQU8sS0FBUDtBQUNBLHFCQUFJLGdDQUFKO2FBRkcsRUFHSixJQUhJLENBR0MsVUFBQyxJQUFEO3VCQUFRLEtBQUssS0FBTDthQUFSLENBSFIsQ0FEYzs7Ozs0QkE3QkE7QUFDZCxtQkFBTyxPQUFQLENBRGM7Ozs7V0FERDtFQUFhLGlCQUFRLE9BQVI7O2tCQUFiIiwiZmlsZSI6ImZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NlcnZpY2V9IGZyb20gJy4vc2VydmljZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsZSBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAnZmlsZXMnXG5cdH1cblxuICAgIHN0YXRpYyB1cGxvYWQoZGF0YSx0eXBlPVwiaW1hZ2VcIixwcm9wcywgdXJsPVwiaHR0cDovL3VwLnFpbml1LmNvbVwiKXtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgICAgICB0aGlzLl9nZXRUb2tlbigpLnRoZW4oKHRva2VuKT0+e1xuICAgICAgICAgICAgICAgIHZhciBmb3JtRGF0YT1uZXcgRm9ybURhdGEoKVxuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsZGF0YSlcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3Rva2VuJyx0b2tlbilcbiAgICAgICAgICAgICAgICBmb3IodmFyIGEgaW4gcHJvcHMpXG4gICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChhLHByb3BzW2FdKVxuXG4gICAgICAgICAgICAgICAgdmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpLnVybClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB4aHIub3BlbignUE9TVCcsdXJsLHRydWUpXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoZGF0YSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3RhdGljIF9nZXRUb2tlbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcbiAgICAgICAgICAgIHVybDonaHR0cDovL3FpbGkyLmNvbS8xL2ZpbGVzL3Rva2VuJ1xuICAgICAgICB9KS50aGVuKChkYXRhKT0+ZGF0YS50b2tlbilcbiAgICB9XG59XG4iXX0=