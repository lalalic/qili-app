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

var Log = function (_Service$BuiltIn) {
    _inherits(Log, _Service$BuiltIn);

    function Log() {
        _classCallCheck(this, Log);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Log).apply(this, arguments));
    }

    _createClass(Log, null, [{
        key: '_name',
        get: function get() {
            return 'logs';
        }
    }]);

    return Log;
}(Service.BuiltIn);

exports.default = Log;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7ZUFBYyxRQUFRLFdBQVI7O0lBQVQ7O0lBRWdCOzs7Ozs7Ozs7Ozs0QkFDQztBQUNkLG1CQUFPLE1BQVAsQ0FEYzs7OztXQUREO0VBQVksUUFBUSxPQUFSOztrQkFBWiIsImZpbGUiOiJsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1NlcnZpY2V9PXJlcXVpcmUoJy4vc2VydmljZScpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAnbG9ncydcblx0fVxufVxuIl19