"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CountDown = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CountDown = exports.CountDown = function (_Component) {
	_inherits(CountDown, _Component);

	function CountDown() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, CountDown);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CountDown.__proto__ || Object.getPrototypeOf(CountDown)).call.apply(_ref, [this].concat(args))), _this), _this.state = { n: _this.props.n || 60 }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(CountDown, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			this.timer = setInterval(function () {
				_this2.setState(function (_ref2) {
					var n = _ref2.n;

					n--;
					if (n == 0) {
						clearInterval(_this2.timer);
						_this2.props.onEnd();
					}
					if (n >= 0) return { n: n };
				});
			}, 1000);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			clearInterval(this.timer);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"span",
				null,
				this.state.n
			);
		}
	}]);

	return CountDown;
}(_react.Component);

CountDown.propTypes = {
	n: _propTypes2.default.number,
	onEnd: _propTypes2.default.func.isRequired
};
exports.default = CountDown;