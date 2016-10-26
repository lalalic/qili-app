'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = function (_Component) {
    _inherits(Empty, _Component);

    function Empty() {
        _classCallCheck(this, Empty);

        return _possibleConstructorReturn(this, (Empty.__proto__ || Object.getPrototypeOf(Empty)).apply(this, arguments));
    }

    _createClass(Empty, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var icon = _props.icon;
            var text = _props.text;

            var others = _objectWithoutProperties(_props, ['icon', 'text']);

            return _react2.default.createElement(
                'div',
                _extends({ className: 'empty' }, others),
                icon,
                _react2.default.createElement(
                    'p',
                    null,
                    this.props.children || text
                )
            );
        }
    }]);

    return Empty;
}(_react.Component);

Empty.defaultProps = { icon: null, text: 'Empty' };
exports.default = Empty;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbIkVtcHR5IiwicHJvcHMiLCJpY29uIiwidGV4dCIsIm90aGVycyIsImNoaWxkcmVuIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7OztpQ0FDVDtBQUFBLHlCQUN3QixLQUFLQyxLQUQ3QjtBQUFBLGdCQUNDQyxJQURELFVBQ0NBLElBREQ7QUFBQSxnQkFDT0MsSUFEUCxVQUNPQSxJQURQOztBQUFBLGdCQUNnQkMsTUFEaEI7O0FBRUosbUJBQ0k7QUFBQTtBQUFBLDJCQUFLLFdBQVUsT0FBZixJQUEyQkEsTUFBM0I7QUFDS0Ysb0JBREw7QUFFSTtBQUFBO0FBQUE7QUFBSSx5QkFBS0QsS0FBTCxDQUFXSSxRQUFYLElBQXFCRjtBQUF6QjtBQUZKLGFBREo7QUFNSDs7Ozs7O0FBVGdCSCxLLENBVWJNLFksR0FBYSxFQUFDSixNQUFLLElBQU4sRUFBV0MsTUFBSyxPQUFoQixFO2tCQVZBSCxLIiwiZmlsZSI6ImVtcHR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW1wdHkgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7aWNvbiwgdGV4dCwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVtcHR5XCIgey4uLm90aGVyc30+XG4gICAgICAgICAgICAgICAge2ljb259XG4gICAgICAgICAgICAgICAgPHA+e3RoaXMucHJvcHMuY2hpbGRyZW58fHRleHR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfVxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtpY29uOm51bGwsdGV4dDonRW1wdHknfVxufVxuIl19