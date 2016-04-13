'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var Empty = function (_Component) {
    _inherits(Empty, _Component);

    function Empty() {
        _classCallCheck(this, Empty);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Empty).apply(this, arguments));
    }

    _createClass(Empty, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var icon = _props.icon;
            var text = _props.text;

            var others = _objectWithoutProperties(_props, ['icon', 'text']);

            return React.createElement(
                'div',
                _extends({ className: 'empty' }, others),
                icon,
                React.createElement(
                    'p',
                    null,
                    text
                )
            );
        }
    }]);

    return Empty;
}(Component);

exports.default = Empty;


Empty.defaultProps = {
    icon: null,
    text: 'Empty'
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2VtcHR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFJLFlBQU0sUUFBUSxPQUFSLENBQU47SUFDQyxZQUFXLE1BQVg7O0lBRWdCOzs7Ozs7Ozs7OztpQ0FDVDt5QkFDd0IsS0FBSyxLQUFMLENBRHhCO2dCQUNDLG1CQUREO2dCQUNPLG1CQURQOztnQkFDZ0IsNERBRGhCOztBQUVKLG1CQUNJOzsyQkFBSyxXQUFVLE9BQVYsSUFBc0IsT0FBM0I7Z0JBQ0ssSUFETDtnQkFFSTs7O29CQUFJLElBQUo7aUJBRko7YUFESixDQUZJOzs7O1dBRFM7RUFBYzs7a0JBQWQ7OztBQVlyQixNQUFNLFlBQU4sR0FBbUI7QUFDZixVQUFLLElBQUw7QUFDQSxVQUFLLE9BQUw7Q0FGSiIsImZpbGUiOiJlbXB0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdD1yZXF1aXJlKCdyZWFjdCcpLFxuICAgIHtDb21wb25lbnR9PVJlYWN0XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVtcHR5IGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQge2ljb24sIHRleHQsIC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJlbXB0eVwiIHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAgICAgIHtpY29ufVxuICAgICAgICAgICAgICAgIDxwPnt0ZXh0fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgIH1cbn1cblxuRW1wdHkuZGVmYXVsdFByb3BzPXtcbiAgICBpY29uOm51bGwsXG4gICAgdGV4dDonRW1wdHknXG59XG4iXX0=