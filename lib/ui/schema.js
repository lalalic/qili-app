"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Schema = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = exports.Schema = function Schema(_ref) {
	var schema = _ref.schema;
	return _react2.default.createElement(
		"pre",
		{ style: { margin: 20 } },
		schema
	);
};

exports.default = (0, _recompose.compose)((0, _recompose2.withFragment)({
	app: function app() {
		return require("./__generated__/schema_app.graphql");
	}
}), (0, _recompose.mapProps)(function (_ref2) {
	var app = _ref2.app;
	return { schema: app.schema };
}))(Schema);