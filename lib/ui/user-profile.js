"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Profile = undefined;

var _graphql;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require("recompose");

var _reactRedux = require("react-redux");

var _recompose2 = require("../tools/recompose");

var _commandBar = require("../components/command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _photo = require("../components/photo");

var _photo2 = _interopRequireDefault(_photo);

var _infoForm = require("../components/info-form");

var _materialUi = require("material-ui");

var _index = require("../index.js");

var _cloudOff = require("material-ui/svg-icons/file/cloud-off");

var _cloudOff2 = _interopRequireDefault(_cloudOff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Profile = exports.Profile = function Profile(_ref) {
	var id = _ref.id,
	    username = _ref.username,
	    birthday = _ref.birthday,
	    gender = _ref.gender,
	    location = _ref.location,
	    photo = _ref.photo,
	    signature = _ref.signature,
	    children = _ref.children,
	    _ref$valueStyle = _ref.valueStyle,
	    valueStyle = _ref$valueStyle === undefined ? { color: "lightgray" } : _ref$valueStyle,
	    update = _ref.mutate,
	    logout = _ref.logout;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			_infoForm.InfoForm,
			{ style: { padding: 5 } },
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u5934\u50CF",
				rightAvatar: _react2.default.createElement(_photo2.default, { src: photo, size: 100,
					autoUpload: { id: id, key: 'photo.jpg' },
					onPhoto: function onPhoto(photo) {
						return update({ photo: photo });
					} }),
				style: { height: 100 } }),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u6635\u79F0",
				value: username,
				type: "input",
				onEdit: function onEdit(username) {
					return update({ username: username });
				}
			}),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u6027\u522B",
				value: gender || "boy",
				type: "single",
				options: [{ label: "男", value: "boy" }, { label: "女", value: "girl" }],
				onEdit: function onEdit(gender) {
					return update({ gender: gender });
				} }),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u5730\u5740",
				value: location,
				type: "input",
				onEdit: function onEdit(location) {
					return update({ location: location });
				}
			}),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u751F\u65E5", value: birthday,
				type: "date",
				onEdit: function onEdit(birthday) {
					return update({ birthday: birthday });
				} }),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u7B7E\u540D",
				value: signature,
				type: "input",
				hintText: "\u4E2A\u6027\u7B7E\u540D\u8868\u8FBE\u4F60\u7684\u4E2A\u6027",
				onEdit: function onEdit(signature) {
					return update({ signature: signature });
				}
			}),
			children
		),
		_react2.default.createElement(_commandBar2.default, { className: "footbar",
			items: [{ action: "Back" }, { action: "Logout", label: "退出账号", icon: _react2.default.createElement(_cloudOff2.default, null), onSelect: logout }]
		})
	);
};

exports.default = (0, _recompose.compose)((0, _recompose2.withMutation)(function (_ref2, data) {
	var id = _ref2.id;

	return {
		patch4: id,
		mutation: _graphql || (_graphql = function _graphql() {
			return require("./__generated__/userProfile_update_Mutation.graphql");
		})
	};
}), (0, _reactRedux.connect)(null, function (dispatch) {
	return {
		logout: function logout() {
			return dispatch(_index.ACTION.LOGOUT);
		}
	};
}), _recompose.pure)(Profile);