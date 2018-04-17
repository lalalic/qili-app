"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.notSupport = exports.Notification = exports.withNotification = exports.NoNetwork = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _recompose = require("recompose");

var _reactRedux = require("react-redux");

var _AppBar = require("material-ui/AppBar");

var _AppBar2 = _interopRequireDefault(_AppBar);

var _IconButton = require("material-ui/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _close = require("material-ui/svg-icons/navigation/close");

var _close2 = _interopRequireDefault(_close);

var _error = require("material-ui/svg-icons/alert/error");

var _error2 = _interopRequireDefault(_error);

var _colors = require("material-ui/styles/colors");

var _fullPage = require("./full-page");

var _fullPage2 = _interopRequireDefault(_fullPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoNetwork = exports.NoNetwork = function NoNetwork(_ref) {
	var onClose = _ref.onClose;
	return _react2.default.createElement(
		"div",
		{ style: { padding: 20, fontSize: 12 } },
		_react2.default.createElement(
			"h1",
			null,
			"\u672A\u80FD\u94FE\u63A5\u5230\u4E92\u8054\u7F51"
		),
		_react2.default.createElement(
			"p",
			null,
			"\u60A8\u7684\u8BBE\u5907\u672A\u542F\u7528\u79FB\u52A8\u7F51\u7EDC\u6216\u65E0\u7EBF\u5C40\u57DF\u7F51"
		),
		_react2.default.createElement("hr", { style: { border: "1px solid lightgray", margin: "5px 0px" } }),
		_react2.default.createElement(
			"p",
			null,
			"\u5982\u9700\u8981\u8FDE\u63A5\u5230\u4E92\u8054\u7F51\uFF0C\u8BF7\u53C2\u8003\u4EE5\u4E0B\u51E0\u70B9:"
		),
		_react2.default.createElement(
			"ul",
			null,
			_react2.default.createElement(
				"li",
				null,
				"\u68C0\u67E5\u624B\u673A\u4E2D\u7684\u65E0\u7EBF\u5C40\u57DF\u7F51\u8BBE\u7F6E\uFF0C\u67E5\u770B\u662F\u5426\u6709\u53EF\u4ECB\u5165\u7684\u65E0\u7EBF\u5C40\u57DF\u7F51\u4FE1\u53F7"
			),
			_react2.default.createElement(
				"li",
				null,
				"\u68C0\u67E5\u624B\u673A\u662F\u5426\u5DF2\u63A5\u5165\u79FB\u52A8\u7F51\u7EDC\uFF0C\u5E76\u4E14\u624B\u673A\u6CA1\u6709\u88AB\u505C\u673A"
			)
		),
		_react2.default.createElement(
			"p",
			null,
			"\u5982\u679C\u60A8\u5DF2\u4ECB\u63A5\u65E0\u7EBF\u5C40\u57DF\u7F51:"
		),
		_react2.default.createElement(
			"ul",
			null,
			_react2.default.createElement(
				"li",
				null,
				"\u8BF7\u68C0\u67E5\u60A8\u6240\u8FDE\u63A5\u7684\u65E0\u7EBF\u5C40\u57DF\u7F51\u70ED\u70B9\u662F\u5426\u5DF2\u63A5\u5165\u4E92\u8054\u7F51\uFF0C\u6216\u8BE5\u70ED\u70B9\u662F\u5426\u5DF2\u5141\u8BB8\u4F60\u7684\u8BBE\u5907\u8BBF\u95EE\u4E92\u8054\u7F51"
			)
		)
	);
};

var NoNetworkBanner = function (_Component) {
	_inherits(NoNetworkBanner, _Component);

	function NoNetworkBanner() {
		var _ref2;

		var _temp, _this, _ret;

		_classCallCheck(this, NoNetworkBanner);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = NoNetworkBanner.__proto__ || Object.getPrototypeOf(NoNetworkBanner)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { detailed: false }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(NoNetworkBanner, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var detailed = this.state.detailed;

			var noNetwork = null;
			if (detailed) {
				noNetwork = _react2.default.createElement(
					_fullPage2.default,
					null,
					_react2.default.createElement(
						"div",
						{ style: { display: "flex", flexDirection: "row", background: "black" } },
						_react2.default.createElement(
							"div",
							{ style: { flex: 1 } },
							_react2.default.createElement(
								_IconButton2.default,
								{ onClick: function onClick(e) {
										return _this2.setState({ detailed: false });
									} },
								_react2.default.createElement(_close2.default, {
									color: "white" })
							)
						),
						_react2.default.createElement(
							"div",
							{ style: {
									flex: "1 100%", height: 48,
									lineHeight: "48px", fontSize: "small",
									color: "white"
								} },
							"\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528"
						)
					),
					_react2.default.createElement(NoNetwork, null)
				);
			}
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ onClick: function onClick(e) {
							return _this2.setState({ detailed: true });
						},
						style: { display: "flex", flexDirection: "row", background: _colors.red100 } },
					_react2.default.createElement(
						"div",
						{ style: { flex: 1 } },
						_react2.default.createElement(
							_IconButton2.default,
							null,
							_react2.default.createElement(_error2.default, null)
						)
					),
					_react2.default.createElement(
						"div",
						{ style: { flex: "1 100%", height: 48, lineHeight: "48px", fontSize: "small" } },
						"\u7F51\u7EDC\u8FDE\u63A5\u4E0D\u53EF\u7528"
					)
				),
				noNetwork
			);
		}
	}]);

	return NoNetworkBanner;
}(_react.Component);

var withNotification = function withNotification() {
	var Base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
		return null;
	};
	return (0, _recompose.compose)((0, _reactRedux.connect)(function (_ref3) {
		var networkStatus = _ref3.qili.networkStatus;
		return { networkStatus: networkStatus };
	}))(function (_ref4) {
		var networkStatus = _ref4.networkStatus,
		    props = _objectWithoutProperties(_ref4, ["networkStatus"]);

		return _react2.default.createElement(
			"div",
			null,
			networkStatus == "offline" ? _react2.default.createElement(NoNetworkBanner, null) : null,
			_react2.default.createElement(Base, props)
		);
	});
};

exports.withNotification = withNotification;
var Notification = exports.Notification = withNotification();

var notSupport = exports.notSupport = function notSupport(Base) {
	var OfflineUI = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NoNetwork;
	return (0, _recompose.compose)((0, _reactRedux.connect)(function (_ref5) {
		var networkStatus = _ref5.qili.networkStatus;
		return { networkStatus: networkStatus };
	}), (0, _recompose.branch)(function (_ref6) {
		var networkStatus = _ref6.networkStatus;
		return networkStatus == "offline";
	}, (0, _recompose.renderComponent)(OfflineUI)))(Base);
};