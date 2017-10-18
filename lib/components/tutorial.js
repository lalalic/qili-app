"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Tutorial = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialAutoRotatingCarousel = require("material-auto-rotating-carousel");

var _reactResponsive = require("react-responsive");

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tutorial = exports.Tutorial = function Tutorial(_ref) {
	var _ref$slides = _ref.slides,
	    slides = _ref$slides === undefined ? [] : _ref$slides,
	    onEnd = _ref.onEnd,
	    _ref$landscape = _ref.landscape,
	    landscape = _ref$landscape === undefined ? false : _ref$landscape;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			_reactResponsive2.default,
			{ orientation: "landscape" },
			function (match) {
				return match && (landscape = true) && null;
			}
		),
		_react2.default.createElement(
			_materialAutoRotatingCarousel.AutoRotatingCarousel,
			{ open: true,
				label: "\u5F00\u59CB\u4F53\u9A8C",
				landscape: landscape,
				mobile: typeof cordova != 'undefined',
				onStart: onEnd },
			slides.map(function (a, i) {
				if (_react2.default.isValidElement(a)) return a;

				if (typeof a == 'string') a = { media: a };

				if (typeof a.media == "string") a.media = _react2.default.createElement("img", { src: a.media });

				return _react2.default.createElement(_materialAutoRotatingCarousel.Slide, _extends({ key: i }, _extends({ title: "", subtitle: "" }, a)));
			})
		)
	);
};

exports.default = Tutorial;