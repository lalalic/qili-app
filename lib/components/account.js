"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Account = undefined;

var _graphql;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _recompose = require("recompose");

var _recompose2 = require("../tools/recompose");

var _materialUi = require("material-ui");

var _reactRouter = require("react-router");

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _settings = require("material-ui/svg-icons/action/settings");

var _settings2 = _interopRequireDefault(_settings);

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _checkUpdate = require("./check-update");

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

var _photo = require("./photo");

var _photo2 = _interopRequireDefault(_photo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = exports.Account = function Account(_ref) {
	var photo = _ref.photo,
	    username = _ref.username,
	    children = _ref.children,
	    router = _ref.router,
	    setPhoto = _ref.setPhoto;

	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			_materialUi.List,
			null,
			_react2.default.createElement(_materialUi.ListItem, { primaryText: username,
				leftAvatar: _react2.default.createElement(_photo2.default, { src: photo, iconRatio: 2 / 3, width: 40, height: 40,
					onPhoto: function onPhoto(url) {
						return setPhoto({ url: url });
					} }),
				rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
				onClick: function onClick(e) {
					return router.push("/my/profile");
				}
			}),
			_react2.default.createElement(_materialUi.Divider, { inset: true }),
			children,
			_react2.default.createElement(_materialUi.Divider, { inset: true }),
			_react2.default.createElement(_materialUi.ListItem, { primaryText: _react2.default.createElement(
					_checkUpdate2.default,
					null,
					"\u8BBE\u7F6E"
				),
				leftIcon: _react2.default.createElement(_settings2.default, null),
				rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
				onClick: function onClick(e) {
					return router.push("/my/setting");
				}
			})
		)
	);
};

exports.default = (0, _recompose.compose)((0, _recompose.getContext)({ router: _react.PropTypes.object }), (0, _recompose2.withMutation)(function (_ref2, _ref3) {
	var id = _ref2.id;
	var url = _ref3.url;
	return {
		name: "setPhoto",
		variables: {
			id: id,
			url: url
		},
		patch4: id,
		mutation: _graphql || (_graphql = function _graphql() {
			return require("./__generated__/account_setPhoto_Mutation.graphql");
		})
	};
}))(Account);