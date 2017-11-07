"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Performance = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _materialUi = require("material-ui");

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _keyboardArrowLeft = require("material-ui/svg-icons/hardware/keyboard-arrow-left");

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Performance = exports.Performance = (0, _recompose.withState)("open", "setOpen", false)(function (_ref) {
	var report = _ref.report,
	    open = _ref.open,
	    setOpen = _ref.setOpen,
	    _ref$total = _ref.total,
	    total = _ref$total === undefined ? parseInt(report["/"] / 1000) : _ref$total,
	    _ref$threshold = _ref.threshold,
	    threshold = _ref$threshold === undefined ? 2 : _ref$threshold;
	return _react2.default.createElement(
		"div",
		{ style: { backgroundColor: "white" } },
		_react2.default.createElement(
			"div",
			{ className: "sticky top right _2" },
			_react2.default.createElement(
				_FloatingActionButton2.default,
				{ secondary: total >= threshold,
					onClick: function onClick() {
						return setOpen(true);
					},
					mini: true,
					backgroundColor: "lightgray"
				},
				_react2.default.createElement(_keyboardArrowLeft2.default, null)
			)
		),
		_react2.default.createElement(
			_materialUi.Dialog,
			{ open: open, onRequestClose: function onRequestClose() {
					return setOpen(false);
				},
				contentStyle: { width: "100%" } },
			_react2.default.createElement(
				"table",
				{ style: { width: "100%", border: 1 } },
				_react2.default.createElement(
					"caption",
					null,
					"total:",
					total,
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
							"start(us)"
						),
						_react2.default.createElement(
							"th",
							null,
							"used time(us)"
						)
					),
					Object.keys(report).filter(function (a) {
						return a !== "/" && a !== "toJSON";
					}).map(function (k) {
						return report[k].map(function (_ref2, i) {
							var at = _ref2.at,
							    by = _ref2.by;
							return _react2.default.createElement(
								"tr",
								{ key: k + "_" + i },
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
						});
					}).reduce(function (collected, a) {
						a.forEach(function (b) {
							return collected.push(b);
						});
						return collected;
					}, [])
				)
			)
		)
	);
});

exports.default = (0, _reactRedux.connect)(function (state) {
	return { report: state.qili.optics };
})(function (_ref3) {
	var report = _ref3.report;
	return report && report["/"] ? _react2.default.createElement(Performance, { report: report }) : null;
});