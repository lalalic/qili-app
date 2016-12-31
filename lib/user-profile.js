"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Profile = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _photo = require("./components/photo");

var _photo2 = _interopRequireDefault(_photo);

var _commandBar = require("./components/command-bar");

var _commandBar2 = _interopRequireDefault(_commandBar);

var _user = require("./db/user");

var _user2 = _interopRequireDefault(_user);

var _qiliApp = require("./qiliApp");

var _qiliApp2 = _interopRequireDefault(_qiliApp);

var _ = require(".");

var _infoForm = require("./components/info-form");

var _textField = require("./components/text-field");

var _textField2 = _interopRequireDefault(_textField);

var _cloudOff = require("material-ui/svg-icons/file/cloud-off");

var _cloudOff2 = _interopRequireDefault(_cloudOff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMAIN = exports.DOMAIN = "profile";
var ACTION = exports.ACTION = {
	UPDATE: function UPDATE(key, value) {
		return function (dispatch, getState) {
			var user = getState().qiliApp.user;
			user[key] = value;
			_user2.default.upsert(user).then(function (updated) {
				return dispatch(_qiliApp2.default.ACTION.USER_CHANGED(updated));
			});
		};
	}
};

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

	return state;
};

var Profile = exports.Profile = function Profile(_ref2) {
	var username = _ref2.username;
	var nick = _ref2.nick;
	var birthday = _ref2.birthday;
	var gender = _ref2.gender;
	var location = _ref2.location;
	var photo = _ref2.photo;
	var signature = _ref2.signature;
	var dispatch = _ref2.dispatch;
	var _ref2$valueStyle = _ref2.valueStyle;
	var valueStyle = _ref2$valueStyle === undefined ? { color: "lightgray" } : _ref2$valueStyle;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			_infoForm.InfoForm,
			{ style: { padding: 5 } },
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u5934\u50CF",
				rightAvatar: _react2.default.createElement(_photo2.default, { src: photo,
					onPhoto: function onPhoto(url) {
						return dispatch(ACTION.UPDATE("photo", url));
					},
					iconRatio: 2 / 3, width: 100, height: 100 }),
				style: { height: 100 } }),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u8D26\u53F7",
				value: username
			}),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u6635\u79F0",
				value: nick,
				type: "input",
				onEdit: function onEdit(value) {
					return dispatch(ACTION.UPDATE("nick", value));
				},
				hintText: "\u597D\u540D\u5B57\u53EF\u4EE5\u8BA9\u4F60\u7684\u670B\u53CB\u66F4\u5BB9\u6613\u8BB0\u4F4F\u4F60"
			}),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u6027\u522B",
				value: gender || "男",
				type: "single",
				options: ["男", "女"],
				onEdit: function onEdit(value) {
					return dispatch(ACTION.UPDATE("gender", value));
				} }),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u5730\u5740",
				value: location,
				type: "input",
				onEdit: function onEdit(value) {
					return dispatch(ACTION.UPDATE("location", value));
				}
			}),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u751F\u65E5", value: birthday,
				type: "date",
				onEdit: function onEdit(value) {
					return dispatch(ACTION.UPDATE("birthday", value));
				} }),
			_react2.default.createElement(_infoForm.Field, { primaryText: "\u7B7E\u540D",
				value: signature,
				type: "input",
				hintText: "\u4E2A\u6027\u7B7E\u540D\u8868\u8FBE\u4F60\u7684\u4E2A\u6027",
				onEdit: function onEdit(value) {
					return dispatch(ACTION.UPDATE("signature", value));
				}
			})
		),
		_react2.default.createElement(_commandBar2.default, { className: "footbar",
			items: [{ action: "Back" }, { action: "Logout", icon: _react2.default.createElement(_cloudOff2.default, null), onSelect: function onSelect(e) {
					return dispatch(_qiliApp2.default.ACTION.LOGOUT);
				} }]
		})
	);
};

exports.default = (0, _assign2.default)((0, _reactRedux.connect)(function (state) {
	return (0, _.compact)(state.qiliApp.user, "username", "nick", "birthday", "gender", "location", "photo", "signature");
})(Profile), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFIiwia2V5IiwidmFsdWUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwidXNlciIsInFpbGlBcHAiLCJ1cHNlcnQiLCJ0aGVuIiwiVVNFUl9DSEFOR0VEIiwidXBkYXRlZCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsInVzZXJuYW1lIiwibmljayIsImJpcnRoZGF5IiwiZ2VuZGVyIiwibG9jYXRpb24iLCJwaG90byIsInNpZ25hdHVyZSIsInZhbHVlU3R5bGUiLCJjb2xvciIsInBhZGRpbmciLCJ1cmwiLCJoZWlnaHQiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJMT0dPVVQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7OztBQUVPLElBQU1BLDBCQUFPLFNBQWI7QUFDQSxJQUFNQywwQkFBTztBQUNuQkMsU0FBTyxnQkFBQ0MsR0FBRCxFQUFLQyxLQUFMO0FBQUEsU0FBYSxVQUFDQyxRQUFELEVBQVdDLFFBQVgsRUFBc0I7QUFDekMsT0FBTUMsT0FBS0QsV0FBV0UsT0FBWCxDQUFtQkQsSUFBOUI7QUFDQUEsUUFBS0osR0FBTCxJQUFVQyxLQUFWO0FBQ0Esa0JBQUtLLE1BQUwsQ0FBWUYsSUFBWixFQUFrQkcsSUFBbEIsQ0FBdUI7QUFBQSxXQUFTTCxTQUFTLGtCQUFRSixNQUFSLENBQWVVLFlBQWYsQ0FBNEJDLE9BQTVCLENBQVQsQ0FBVDtBQUFBLElBQXZCO0FBQ0EsR0FKTTtBQUFBO0FBRFksQ0FBYjs7QUFRQSxJQUFNQyw0QkFBUSxTQUFSQSxPQUFRLEdBQTZCO0FBQUEsS0FBNUJDLEtBQTRCLHVFQUF0QixFQUFzQjtBQUFBO0FBQUEsS0FBakJDLElBQWlCLFFBQWpCQSxJ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RUFBc0MsTUFBdEMsRUFBNkMsVUFBN0MsRUFBd0QsUUFBeEQsRUFBaUUsVUFBakUsRUFBNEUsT0FBNUUsRUFBb0YsV0FBcEYsQ0FBUDtBQUFBLENBQVIsRUFBaUhVLE9BQWpILENBQWQsRUFBd0ksRUFBQ2pCLGNBQUQsRUFBU0MsY0FBVCxFQUFpQlksZ0JBQWpCLEVBQXhJLEMiLCJmaWxlIjoidXNlci1wcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBQaG90byBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvXCJcclxuaW1wb3J0IENvbW1hbmRCYXIgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tYW5kLWJhclwiXHJcbmltcG9ydCBVc2VyIGZyb20gXCIuL2RiL3VzZXJcIlxyXG5pbXBvcnQgUWlsaUFwcCBmcm9tIFwiLi9xaWxpQXBwXCJcclxuaW1wb3J0IHtjb21wYWN0fSBmcm9tIFwiLlwiXHJcblxyXG5pbXBvcnQge0luZm9Gb3JtLCBGaWVsZH0gZnJvbSBcIi4vY29tcG9uZW50cy9pbmZvLWZvcm1cIlxyXG5pbXBvcnQgVGV4dEZpZWxkeCBmcm9tIFwiLi9jb21wb25lbnRzL3RleHQtZmllbGRcIlxyXG5cclxuaW1wb3J0IFF1aXRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1vZmZcIlxyXG5cclxuZXhwb3J0IGNvbnN0IERPTUFJTj1cInByb2ZpbGVcIlxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRVUERBVEU6KGtleSx2YWx1ZSk9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCB1c2VyPWdldFN0YXRlKCkucWlsaUFwcC51c2VyXHJcblx0XHR1c2VyW2tleV09dmFsdWVcclxuXHRcdFVzZXIudXBzZXJ0KHVzZXIpLnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goUWlsaUFwcC5BQ1RJT04uVVNFUl9DSEFOR0VEKHVwZGF0ZWQpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT17fSwge3R5cGUsIHBheWxvYWR9KT0+e1xyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUHJvZmlsZT0oe3VzZXJuYW1lLG5pY2ssYmlydGhkYXksZ2VuZGVyLGxvY2F0aW9uLHBob3RvLHNpZ25hdHVyZSwgZGlzcGF0Y2gsIHZhbHVlU3R5bGU9e2NvbG9yOlwibGlnaHRncmF5XCJ9fSk9PihcclxuXHQ8ZGl2PlxyXG5cdFx0PEluZm9Gb3JtIHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuWktOWDj1wiXHJcblx0XHRcdFx0cmlnaHRBdmF0YXI9e1xyXG5cdFx0XHRcdFx0PFBob3RvIHNyYz17cGhvdG99XHJcblx0XHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcInBob3RvXCIsdXJsKSl9XHJcblx0XHRcdFx0XHRcdGljb25SYXRpbz17Mi8zfSB3aWR0aD17MTAwfSBoZWlnaHQ9ezEwMH0vPlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdHN0eWxlPXt7aGVpZ2h0OjEwMH19Lz5cclxuXHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIui0puWPt1wiXHJcblx0XHRcdFx0dmFsdWU9e3VzZXJuYW1lfVxyXG5cdFx0XHRcdC8+XHJcblxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLmmLXnp7BcIlxyXG5cdFx0XHRcdHZhbHVlPXtuaWNrfVxyXG5cdFx0XHRcdHR5cGU9XCJpbnB1dFwiXHJcblx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcIm5pY2tcIix2YWx1ZSkpfVxyXG5cdFx0XHRcdGhpbnRUZXh0PVwi5aW95ZCN5a2X5Y+v5Lul6K6p5L2g55qE5pyL5Y+L5pu05a655piT6K6w5L2P5L2gXCJcclxuXHRcdFx0XHQvPlxyXG5cclxuXHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5oCn5YirXCJcclxuXHRcdFx0XHR2YWx1ZT17Z2VuZGVyfHxcIueUt1wifVxyXG5cdFx0XHRcdHR5cGU9XCJzaW5nbGVcIlxyXG5cdFx0XHRcdG9wdGlvbnM9e1tcIueUt1wiLFwi5aWzXCJdfVxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJnZW5kZXJcIix2YWx1ZSkpfS8+XHJcblxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLlnLDlnYBcIlxyXG5cdFx0XHRcdHZhbHVlPXtsb2NhdGlvbn1cclxuXHRcdFx0XHR0eXBlPVwiaW5wdXRcIlxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJsb2NhdGlvblwiLHZhbHVlKSl9XHJcblx0XHRcdFx0Lz5cclxuXHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIueUn+aXpVwiIHZhbHVlPXtiaXJ0aGRheX1cclxuXHRcdFx0XHR0eXBlPVwiZGF0ZVwiXHJcblx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcImJpcnRoZGF5XCIsdmFsdWUpKX0vPlxyXG5cclxuXHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi562+5ZCNXCJcclxuXHRcdFx0XHR2YWx1ZT17c2lnbmF0dXJlfVxyXG5cdFx0XHRcdHR5cGU9XCJpbnB1dFwiXHJcblx0XHRcdFx0aGludFRleHQ9XCLkuKrmgKfnrb7lkI3ooajovr7kvaDnmoTkuKrmgKdcIlxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJzaWduYXR1cmVcIix2YWx1ZSkpfVxyXG5cdFx0XHRcdC8+XHJcblx0XHQ8L0luZm9Gb3JtPlxyXG5cclxuXHRcdDxDb21tYW5kQmFyICBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuXHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifSxcclxuXHRcdFx0XHR7YWN0aW9uOlwiTG9nb3V0XCIsIGljb246PFF1aXRJY29uLz4sIG9uU2VsZWN0OmU9PmRpc3BhdGNoKFFpbGlBcHAuQUNUSU9OLkxPR09VVCl9XHJcblx0XHRcdFx0XX1cclxuXHRcdFx0Lz5cclxuXHQ8L2Rpdj5cclxuKVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+Y29tcGFjdChzdGF0ZS5xaWxpQXBwLnVzZXIsXCJ1c2VybmFtZVwiLFwibmlja1wiLFwiYmlydGhkYXlcIixcImdlbmRlclwiLFwibG9jYXRpb25cIixcInBob3RvXCIsXCJzaWduYXR1cmVcIikpKFByb2ZpbGUpLHtET01BSU4sIEFDVElPTiwgUkVEVUNFUn0pXHJcbiJdfQ==