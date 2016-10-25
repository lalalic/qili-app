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
            var _props = this.props,
                icon = _props.icon,
                text = _props.text,
                others = _objectWithoutProperties(_props, ['icon', 'text']);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbIkVtcHR5IiwicHJvcHMiLCJpY29uIiwidGV4dCIsIm90aGVycyIsImNoaWxkcmVuIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7OztpQ0FDVDtBQUFBLHlCQUN3QixLQUFLQyxLQUQ3QjtBQUFBLGdCQUNDQyxJQURELFVBQ0NBLElBREQ7QUFBQSxnQkFDT0MsSUFEUCxVQUNPQSxJQURQO0FBQUEsZ0JBQ2dCQyxNQURoQjs7QUFFSixtQkFDSTtBQUFBO0FBQUEsMkJBQUssV0FBVSxPQUFmLElBQTJCQSxNQUEzQjtBQUNLRixvQkFETDtBQUVJO0FBQUE7QUFBQTtBQUFJLHlCQUFLRCxLQUFMLENBQVdJLFFBQVgsSUFBcUJGO0FBQXpCO0FBRkosYUFESjtBQU1IOzs7Ozs7QUFUZ0JILEssQ0FVYk0sWSxHQUFhLEVBQUNKLE1BQUssSUFBTixFQUFXQyxNQUFLLE9BQWhCLEU7a0JBVkFILEsiLCJmaWxlIjoiZW1wdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbXB0eSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgbGV0IHtpY29uLCB0ZXh0LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZW1wdHlcIiB7Li4ub3RoZXJzfT5cbiAgICAgICAgICAgICAgICB7aWNvbn1cbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5jaGlsZHJlbnx8dGV4dH08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e2ljb246bnVsbCx0ZXh0OidFbXB0eSd9XG59XG4iXX0=