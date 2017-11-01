"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SplashAD = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _countDown = require("./count-down");

var _countDown2 = _interopRequireDefault(_countDown);

var _fullPage = require("./full-page");

var _fullPage2 = _interopRequireDefault(_fullPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SplashAD = function SplashAD(_ref, _ref2) {
	var _ref2$theme$page = _ref2.theme.page,
	    width = _ref2$theme$page.width,
	    height = _ref2$theme$page.height;

	var url = _ref.url,
	    children = _ref.children,
	    props = _objectWithoutProperties(_ref, ["url", "children"]);

	return _react2.default.createElement(
		_fullPage2.default,
		{ style: {
				backgroundColor: "transparent",
				backgroundImage: url ? url + "?width=" + width + "&height=" + height : undefined
			} },
		_react2.default.createElement(
			"div",
			{ className: "sticky top right",
				onClick: props.onEnd,
				style: {
					minWidth: "5em",
					textAlign: "center",
					padding: 5,
					backgroundColor: "black",
					opacity: 0.3,
					color: "white",
					borderRadius: 5
				} },
			_react2.default.createElement(_countDown2.default, _extends({ n: 3 }, props)),
			"s \u8DF3\u8FC7"
		)
	);
};

exports.SplashAD = SplashAD;
SplashAD.contextTypes = {
	theme: _propTypes2.default.object
};

exports.default = SplashAD;