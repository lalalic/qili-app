"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pullToRefresh = require("pull-to-refresh2");

var _pullToRefresh2 = _interopRequireDefault(_pullToRefresh);

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Log = function Log(_ref) {
	var logs = _ref.data,
	    loadMore = _ref.loadMore;
	return _react2.default.createElement(
		_pullToRefresh2.default,
		{ onMore: loadMore },
		_react2.default.createElement(
			"div",
			{ style: { margin: 5 } },
			_react2.default.createElement(
				"table",
				{ className: "logs" },
				_react2.default.createElement(
					"thead",
					null,
					_react2.default.createElement(
						"tr",
						null,
						_react2.default.createElement(
							"th",
							null,
							"Started At"
						),
						_react2.default.createElement(
							"th",
							null,
							"Type"
						),
						_react2.default.createElement(
							"th",
							null,
							"Operation"
						),
						_react2.default.createElement(
							"th",
							null,
							"Status"
						)
					)
				),
				_react2.default.createElement(
					"tbody",
					null,
					logs.map(function (_ref2) {
						var type = _ref2.type,
						    operation = _ref2.operation,
						    status = _ref2.status,
						    startedAt = _ref2.startedAt;

						return _react2.default.createElement(
							"tr",
							null,
							_react2.default.createElement(
								"td",
								null,
								new Date(startedAt).smartFormat()
							),
							_react2.default.createElement(
								"td",
								null,
								type
							),
							_react2.default.createElement(
								"td",
								null,
								operation
							),
							_react2.default.createElement(
								"td",
								null,
								status ? status + " errors" : 'successful'
							)
						);
					})
				)
			)
		)
	);
};

exports.default = (0, _recompose.compose)((0, _recompose2.withFragment)({
	data: function data() {
		return require("./__generated__/log.graphql");
	}
}))(Log);
module.exports = exports['default'];