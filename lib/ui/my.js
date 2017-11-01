"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.My = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

var _materialUi = require("material-ui");

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _account = require("../components/account");

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var My = exports.My = function My(_ref) {
	var id = _ref.id,
	    username = _ref.username,
	    photo = _ref.photo,
	    apps = _ref.apps,
	    toCreate = _ref.toCreate,
	    toApp = _ref.toApp,
	    toProfile = _ref.toProfile,
	    toSetting = _ref.toSetting;
	return _react2.default.createElement(
		_account2.default,
		{ id: id, username: username, photo: photo, toProfile: toProfile, toSetting: toSetting },
		_react2.default.createElement(_materialUi.ListItem, {
			primaryText: "Create QiLi app",
			initiallyOpen: true,
			autoGenerateNestedIndicator: false,
			onTouchTap: toCreate,
			leftIcon: _react2.default.createElement(_addCircleOutline2.default, null),
			nestedItems: apps.map(function (a) {
				return _react2.default.createElement(_materialUi.ListItem, { primaryText: a.name, key: a.id,
					leftIcon: _react2.default.createElement("span", null),
					rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
					onClick: function onClick(e) {
						return toApp(a);
					} });
			})
		})
	);
};

exports.default = (0, _recompose.compose)((0, _recompose2.withFragment)({
	data: function data() {
		return require("./__generated__/my.graphql");
	}
}), (0, _recompose.withProps)(function (_ref2) {
	var data = _ref2.data;
	return data;
}))(My);