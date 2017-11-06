"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Performance = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _keyboardArrowLeft = require("material-ui/svg-icons/hardware/keyboard-arrow-left");

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Performance = exports.Performance = function Performance(_ref) {
	var report = _ref.report;
	return _react2.default.createElement(
		"div",
		{ style: { position: "absolute", top: 0, right: 0, backgroundColor: "white", opacity: 0.8 } },
		_react2.default.createElement(
			"div",
			null,
			_react2.default.createElement(
				_FloatingActionButton2.default,
				{ secordary: true, mini: true, style: { backgroundColor: "transparent" } },
				_react2.default.createElement(_keyboardArrowLeft2.default, null)
			)
		),
		_react2.default.createElement(
			"table",
			{ style: { width: "80%" } },
			_react2.default.createElement(
				"caption",
				null,
				"total:",
				parseInt(report["/"] / 1000),
				"ms"
			),
			_react2.default.createElement(
				"tbody",
				null,
				_react2.default.createElement(
					"tr",
					null,
					_react2.default.createElement(
						"th",
						null,
						"path"
					),
					_react2.default.createElement(
						"th",
						null,
						"start"
					),
					_react2.default.createElement(
						"th",
						null,
						"used time"
					)
				),
				Object.keys(report).filter(function (a) {
					return a !== "/";
				}).map(function (k) {
					return function (_ref2) {
						var at = _ref2.at,
						    by = _ref2.by;
						return _react2.default.createElement(
							"tr",
							{ key: k },
							_react2.default.createElement(
								"td",
								null,
								k
							),
							_react2.default.createElement(
								"td",
								null,
								at
							),
							_react2.default.createElement(
								"td",
								null,
								by
							)
						);
					}(report[k]);
				})
			)
		)
	);
};

exports.default = (0, _reactRedux.connect)(function (state) {
	return { report: state.qili.optics };
})(function (_ref3) {
	var report = _ref3.report;
	return report && report["/"] ? _react2.default.createElement(Performance, { report: report }) : null;
});