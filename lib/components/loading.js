"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = function (_Component) {
    _inherits(Loading, _Component);

    function Loading() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Loading);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Loading.__proto__ || Object.getPrototypeOf(Loading)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hide: true }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Loading, [{
        key: "render",
        value: function render() {
            var hide = this.state.hide;

            var _props = this.props,
                className = _props.className,
                others = _objectWithoutProperties(_props, ["className"]);

            return _react2.default.createElement("span", _extends({ className: "spinner " + className + " " + (hide ? "hide" : "loading") }, others));
        }
    }, {
        key: "show",
        value: function show() {
            this.setState({ hide: false });
        }
    }, {
        key: "close",
        value: function close() {
            this.setState({ hide: true });
        }
    }]);

    return Loading;
}(_react.Component);

exports.default = Loading;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcuanMiXSwibmFtZXMiOlsiTG9hZGluZyIsInN0YXRlIiwiaGlkZSIsInByb3BzIiwiY2xhc3NOYW1lIiwib3RoZXJzIiwic2V0U3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7Ozs7OzRMQUNqQkMsSyxHQUFNLEVBQUNDLE1BQUssSUFBTixFOzs7OztpQ0FDRTtBQUFBLGdCQUNHQSxJQURILEdBQ1MsS0FBS0QsS0FEZCxDQUNHQyxJQURIOztBQUFBLHlCQUV1QixLQUFLQyxLQUY1QjtBQUFBLGdCQUVDQyxTQUZELFVBRUNBLFNBRkQ7QUFBQSxnQkFFZUMsTUFGZjs7QUFJSixtQkFBTyxpREFBTSx3QkFBc0JELFNBQXRCLFVBQW1DRixPQUFPLE1BQVAsR0FBZ0IsU0FBbkQsQ0FBTixJQUEwRUcsTUFBMUUsRUFBUDtBQUNIOzs7K0JBRUs7QUFDRixpQkFBS0MsUUFBTCxDQUFjLEVBQUNKLE1BQUssS0FBTixFQUFkO0FBQ0g7OztnQ0FFTTtBQUNILGlCQUFLSSxRQUFMLENBQWMsRUFBQ0osTUFBSyxJQUFOLEVBQWQ7QUFDSDs7Ozs7O2tCQWZnQkYsTyIsImZpbGUiOiJsb2FkaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICBzdGF0ZT17aGlkZTp0cnVlfVxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge2hpZGV9PXRoaXMuc3RhdGVcclxuICAgICAgICBsZXQge2NsYXNzTmFtZSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblxyXG4gICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2BzcGlubmVyICR7Y2xhc3NOYW1lfSAke2hpZGUgPyBcImhpZGVcIiA6IFwibG9hZGluZ1wifWB9IHsuLi5vdGhlcnN9Lz5cclxuICAgIH1cclxuXHJcbiAgICBzaG93KCl7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aGlkZTpmYWxzZX0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKXtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtoaWRlOnRydWV9KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==