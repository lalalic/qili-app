"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Schema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require("react-redux");

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = exports.Schema = function Schema(_ref) {
	var schema = _ref.schema,
	    style = _ref.style;
	return _react2.default.createElement("textarea", {
		disabled: true,

		style: _extends({
			padding: 20,
			width: "100%",
			border: 0
		}, style),
		value: schema });
};

exports.default = (0, _recompose.compose)((0, _recompose2.withFragment)({
	app: function app() {
		return require("./__generated__/schema_app.graphql");
	}
}), (0, _recompose.mapProps)(function (_ref2) {
	var app = _ref2.app,
	    style = _ref2.style;
	return { schema: app.schema, style: style };
}))(Schema);