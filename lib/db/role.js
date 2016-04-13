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

var Role = function (_Service$BuiltIn) {
    _inherits(Role, _Service$BuiltIn);

    function Role() {
        _classCallCheck(this, Role);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Role).apply(this, arguments));
    }

    _createClass(Role, null, [{
        key: '_name',
        get: function get() {
            return 'roles';
        }
    }]);

    return Role;
}(Service.BuiltIn);

exports.default = Role;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9yb2xlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2VBQWMsUUFBUSxXQUFSOztJQUFUOztJQUVnQjs7Ozs7Ozs7Ozs7NEJBQ0M7QUFDZCxtQkFBTyxPQUFQLENBRGM7Ozs7V0FERDtFQUFhLFFBQVEsT0FBUjs7a0JBQWIiLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7U2VydmljZX09cmVxdWlyZSgnLi9zZXJ2aWNlJylcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZSBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcbiAgICBzdGF0aWMgZ2V0IF9uYW1lKCl7XG4gICAgICAgIHJldHVybiAncm9sZXMnXG4gICAgfVxufVxuIl19