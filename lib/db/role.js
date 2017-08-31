'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _service = require('./service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Role = function (_Service$BuiltIn) {
    _inherits(Role, _Service$BuiltIn);

    function Role() {
        _classCallCheck(this, Role);

        return _possibleConstructorReturn(this, (Role.__proto__ || Object.getPrototypeOf(Role)).apply(this, arguments));
    }

    _createClass(Role, null, [{
        key: '_name',
        get: function get() {
            return 'roles';
        }
    }]);

    return Role;
}(_service.Service.BuiltIn);

exports.default = Role;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9yb2xlLmpzIl0sIm5hbWVzIjpbIlJvbGUiLCJCdWlsdEluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7NEJBQ0M7QUFDZCxtQkFBTyxPQUFQO0FBQ0g7Ozs7RUFINkIsaUJBQVFDLE87O2tCQUFyQkQsSSIsImZpbGUiOiJyb2xlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTZXJ2aWNlfSBmcm9tICcuL3NlcnZpY2UnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xyXG4gICAgc3RhdGljIGdldCBfbmFtZSgpe1xyXG4gICAgICAgIHJldHVybiAncm9sZXMnXHJcbiAgICB9XHJcbn1cclxuIl19