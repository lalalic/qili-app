"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextFieldx = function (_Component) {
    _inherits(TextFieldx, _Component);

    function TextFieldx(props) {
        _classCallCheck(this, TextFieldx);

        var _this = _possibleConstructorReturn(this, (TextFieldx.__proto__ || Object.getPrototypeOf(TextFieldx)).call(this, props));

        _this.state = {
            value: _this.props.value
        };
        return _this;
    }

    _createClass(TextFieldx, [{
        key: "getValue",
        value: function getValue() {
            return this.refs.main.getValue();
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(_materialUi.TextField, _extends({ ref: "main" }, this.props, { value: this.state.value }));
        }
    }, {
        key: "value",
        set: function set(value) {
            this.setState({ value: value });
        }
    }, {
        key: "errorText",
        set: function set(errorText) {
            this.refs.main.setState({ errorText: errorText });
        }
    }]);

    return TextFieldx;
}(_react.Component);

exports.default = TextFieldx;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3RleHQtZmllbGQuanMiXSwibmFtZXMiOlsiVGV4dEZpZWxkeCIsInByb3BzIiwic3RhdGUiLCJ2YWx1ZSIsInJlZnMiLCJtYWluIiwiZ2V0VmFsdWUiLCJzZXRTdGF0ZSIsImVycm9yVGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFU7OztBQUNqQix3QkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLDRIQUNSQSxLQURROztBQUVkLGNBQUtDLEtBQUwsR0FBVztBQUNQQyxtQkFBTSxNQUFLRixLQUFMLENBQVdFO0FBRFYsU0FBWDtBQUZjO0FBS2pCOzs7O21DQVVTO0FBQ04sbUJBQU8sS0FBS0MsSUFBTCxDQUFVQyxJQUFWLENBQWVDLFFBQWYsRUFBUDtBQUNIOzs7aUNBRU87QUFDSixtQkFBTyxnRUFBVyxLQUFJLE1BQWYsSUFBMEIsS0FBS0wsS0FBL0IsSUFBc0MsT0FBTyxLQUFLQyxLQUFMLENBQVdDLEtBQXhELElBQVA7QUFDSDs7OzBCQWRTQSxLLEVBQU07QUFDWixpQkFBS0ksUUFBTCxDQUFjLEVBQUNKLFlBQUQsRUFBZDtBQUNIOzs7MEJBRWFLLFMsRUFBVTtBQUNwQixpQkFBS0osSUFBTCxDQUFVQyxJQUFWLENBQWVFLFFBQWYsQ0FBd0IsRUFBQ0Msb0JBQUQsRUFBeEI7QUFDSDs7Ozs7O2tCQWRnQlIsVSIsImZpbGUiOiJ0ZXh0LWZpZWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRGaWVsZHggZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpXHJcbiAgICAgICAgdGhpcy5zdGF0ZT17XHJcbiAgICAgICAgICAgIHZhbHVlOnRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHZhbHVlKHZhbHVlKXtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZX0pXHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGVycm9yVGV4dChlcnJvclRleHQpe1xyXG4gICAgICAgIHRoaXMucmVmcy5tYWluLnNldFN0YXRlKHtlcnJvclRleHR9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFZhbHVlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcy5tYWluLmdldFZhbHVlKClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4gPFRleHRGaWVsZCByZWY9XCJtYWluXCIgey4uLnRoaXMucHJvcHN9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfS8+XHJcbiAgICB9XHJcbn1cclxuIl19