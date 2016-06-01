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

    function Loading(p) {
        _classCallCheck(this, Loading);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Loading).call(this, p));

        _this.state = { status: _this.props.status || "hide" };
        return _this;
    }

    _createClass(Loading, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var className = _props.className;

            var others = _objectWithoutProperties(_props, ["className"]);

            var status = this.state.status;


            return _react2.default.createElement("span", _extends({ className: "spinner " + status + " " + className }, others));
        }
    }, {
        key: "show",
        value: function show() {
            this.setState({ status: "loading" });
        }
    }, {
        key: "close",
        value: function close() {
            this.setState({ status: "hide" });
        }
    }]);

    return Loading;
}(_react.Component);

exports.default = Loading;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLE9BQ2pCLENBQVksQ0FBWixFQUFjOzhCQURHLFNBQ0g7OzJFQURHLG9CQUVQLElBREk7O0FBRVYsY0FBSyxLQUFMLEdBQVcsRUFBQyxRQUFPLE1BQUssS0FBTCxDQUFXLE1BQVgsSUFBbUIsTUFBbkIsRUFBbkIsQ0FGVTs7S0FBZDs7aUJBRGlCOztpQ0FLVDt5QkFDdUIsS0FBSyxLQUFMLENBRHZCO2dCQUNDLDZCQUREOztnQkFDZSx5REFEZjs7Z0JBRUMsU0FBUSxLQUFLLEtBQUwsQ0FBUixPQUZEOzs7QUFJSixtQkFBTyxpREFBTSx3QkFBc0IsZUFBVSxTQUFoQyxJQUFpRCxPQUF2RCxDQUFQLENBSkk7Ozs7K0JBT0Y7QUFDRixpQkFBSyxRQUFMLENBQWMsRUFBQyxRQUFPLFNBQVAsRUFBZixFQURFOzs7O2dDQUlDO0FBQ0gsaUJBQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxNQUFQLEVBQWYsRUFERzs7OztXQWhCVSIsImZpbGUiOiJsb2FkaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3RvcihwKXtcbiAgICAgICAgc3VwZXIocClcbiAgICAgICAgdGhpcy5zdGF0ZT17c3RhdHVzOnRoaXMucHJvcHMuc3RhdHVzfHxcImhpZGVcIn1cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2xhc3NOYW1lLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IHtzdGF0dXN9PXRoaXMuc3RhdGVcblxuICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtgc3Bpbm5lciAke3N0YXR1c30gJHtjbGFzc05hbWV9YH0gey4uLm90aGVyc30vPlxuICAgIH1cblxuICAgIHNob3coKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOlwibG9hZGluZ1wifSlcbiAgICB9XG5cbiAgICBjbG9zZSgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6XCJoaWRlXCJ9KVxuICAgIH1cbn1cbiJdfQ==