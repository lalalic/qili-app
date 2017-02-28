"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Profile = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

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

var _account = require("./account");

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
	var type = _ref.type,
	    payload = _ref.payload;

	return state;
};

var Profile = exports.Profile = function Profile(_ref2) {
	var username = _ref2.username,
	    nick = _ref2.nick,
	    birthday = _ref2.birthday,
	    gender = _ref2.gender,
	    location = _ref2.location,
	    photo = _ref2.photo,
	    signature = _ref2.signature,
	    dispatch = _ref2.dispatch,
	    children = _ref2.children,
	    _ref2$valueStyle = _ref2.valueStyle,
	    valueStyle = _ref2$valueStyle === undefined ? { color: "lightgray" } : _ref2$valueStyle;
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
			_react2.default.createElement(
				_infoForm.Field,
				{ primaryText: "\u5BC6\u7801", hintText: "\u7ECF\u5E38\u6539\u5BC6\u7801\u66F4\u5B89\u5168", value: "..." },
				_react2.default.createElement(_account.ResetPassword, { dispatch: dispatch })
			),
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
			}),
			children
		),
		_react2.default.createElement(_commandBar2.default, { className: "footbar",
			items: [{ action: "Back" }, { action: "Logout", label: "退出账号", icon: _react2.default.createElement(_cloudOff2.default, null), onSelect: function onSelect(e) {
					return dispatch(_qiliApp2.default.ACTION.LOGOUT);
				} }]
		})
	);
};

exports.default = Object.assign((0, _reactRedux.connect)(function (state) {
	return (0, _.compact)(state.qiliApp.user, "username", "nick", "birthday", "gender", "location", "photo", "signature");
})(Profile), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFIiwia2V5IiwidmFsdWUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwidXNlciIsInFpbGlBcHAiLCJ1cHNlcnQiLCJ0aGVuIiwiVVNFUl9DSEFOR0VEIiwidXBkYXRlZCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsInVzZXJuYW1lIiwibmljayIsImJpcnRoZGF5IiwiZ2VuZGVyIiwibG9jYXRpb24iLCJwaG90byIsInNpZ25hdHVyZSIsImNoaWxkcmVuIiwidmFsdWVTdHlsZSIsImNvbG9yIiwicGFkZGluZyIsInVybCIsImhlaWdodCIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0IiwiTE9HT1VUIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7OztBQUVPLElBQU1BLDBCQUFPLFNBQWI7QUFDQSxJQUFNQywwQkFBTztBQUNuQkMsU0FBTyxnQkFBQ0MsR0FBRCxFQUFLQyxLQUFMO0FBQUEsU0FBYSxVQUFDQyxRQUFELEVBQVdDLFFBQVgsRUFBc0I7QUFDekMsT0FBTUMsT0FBS0QsV0FBV0UsT0FBWCxDQUFtQkQsSUFBOUI7QUFDQUEsUUFBS0osR0FBTCxJQUFVQyxLQUFWO0FBQ0Esa0JBQUtLLE1BQUwsQ0FBWUYsSUFBWixFQUFrQkcsSUFBbEIsQ0FBdUI7QUFBQSxXQUFTTCxTQUFTLGtCQUFRSixNQUFSLENBQWVVLFlBQWYsQ0FBNEJDLE9BQTVCLENBQVQsQ0FBVDtBQUFBLElBQXZCO0FBQ0EsR0FKTTtBQUFBO0FBRFksQ0FBYjs7QUFRQSxJQUFNQyw0QkFBUSxTQUFSQSxPQUFRLEdBQTZCO0FBQUEsS0FBNUJDLEtBQTRCLHVFQUF0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QU0sTUFBeEIsRUFBZ0NDLE1BQUssdURBQXJDLEVBQWtEQyxVQUFTO0FBQUEsWUFBRzdCLFNBQVMsa0JBQVFKLE1BQVIsQ0FBZWtDLE1BQXhCLENBQUg7QUFBQSxLQUEzRCxFQUZNO0FBRFI7QUFwREQsRUFEb0I7QUFBQSxDQUFkOztrQkErRFFDLE9BQU9DLE1BQVAsQ0FBYyx5QkFBUTtBQUFBLFFBQU8sZUFBUXZCLE1BQU1OLE9BQU4sQ0FBY0QsSUFBdEIsRUFBMkIsVUFBM0IsRUFBc0MsTUFBdEMsRUFBNkMsVUFBN0MsRUFBd0QsUUFBeEQsRUFBaUUsVUFBakUsRUFBNEUsT0FBNUUsRUFBb0YsV0FBcEYsQ0FBUDtBQUFBLENBQVIsRUFBaUhVLE9BQWpILENBQWQsRUFBd0ksRUFBQ2pCLGNBQUQsRUFBU0MsY0FBVCxFQUFpQlksZ0JBQWpCLEVBQXhJLEMiLCJmaWxlIjoidXNlci1wcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBQaG90byBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvXCJcclxuaW1wb3J0IENvbW1hbmRCYXIgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tYW5kLWJhclwiXHJcbmltcG9ydCBVc2VyIGZyb20gXCIuL2RiL3VzZXJcIlxyXG5pbXBvcnQgUWlsaUFwcCBmcm9tIFwiLi9xaWxpQXBwXCJcclxuaW1wb3J0IHtjb21wYWN0fSBmcm9tIFwiLlwiXHJcbmltcG9ydCB7UmVzZXRQYXNzd29yZH0gZnJvbSBcIi4vYWNjb3VudFwiXHJcblxyXG5pbXBvcnQge0luZm9Gb3JtLCBGaWVsZH0gZnJvbSBcIi4vY29tcG9uZW50cy9pbmZvLWZvcm1cIlxyXG5pbXBvcnQgVGV4dEZpZWxkeCBmcm9tIFwiLi9jb21wb25lbnRzL3RleHQtZmllbGRcIlxyXG5cclxuaW1wb3J0IFF1aXRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1vZmZcIlxyXG5cclxuZXhwb3J0IGNvbnN0IERPTUFJTj1cInByb2ZpbGVcIlxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRVUERBVEU6KGtleSx2YWx1ZSk9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCB1c2VyPWdldFN0YXRlKCkucWlsaUFwcC51c2VyXHJcblx0XHR1c2VyW2tleV09dmFsdWVcclxuXHRcdFVzZXIudXBzZXJ0KHVzZXIpLnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goUWlsaUFwcC5BQ1RJT04uVVNFUl9DSEFOR0VEKHVwZGF0ZWQpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT17fSwge3R5cGUsIHBheWxvYWR9KT0+e1xyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUHJvZmlsZT0oe3VzZXJuYW1lLG5pY2ssYmlydGhkYXksZ2VuZGVyLGxvY2F0aW9uLHBob3RvLHNpZ25hdHVyZSwgZGlzcGF0Y2gsIGNoaWxkcmVuLCB2YWx1ZVN0eWxlPXtjb2xvcjpcImxpZ2h0Z3JheVwifX0pPT4oXHJcblx0PGRpdj5cclxuXHRcdDxJbmZvRm9ybSBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLlpLTlg49cIlxyXG5cdFx0XHRcdHJpZ2h0QXZhdGFyPXtcclxuXHRcdFx0XHRcdDxQaG90byBzcmM9e3Bob3RvfVxyXG5cdFx0XHRcdFx0XHRvblBob3RvPXt1cmw9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJwaG90b1wiLHVybCkpfVxyXG5cdFx0XHRcdFx0XHRpY29uUmF0aW89ezIvM30gd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9Lz5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRzdHlsZT17e2hlaWdodDoxMDB9fS8+XHJcblxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLotKblj7dcIlxyXG5cdFx0XHRcdHZhbHVlPXt1c2VybmFtZX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHRcclxuXHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5a+G56CBXCIgaGludFRleHQ9XCLnu4/luLjmlLnlr4bnoIHmm7TlronlhahcIiB2YWx1ZT1cIi4uLlwiPlxyXG5cdFx0XHRcdDxSZXNldFBhc3N3b3JkIGRpc3BhdGNoPXtkaXNwYXRjaH0gLz5cclxuXHRcdFx0PC9GaWVsZD5cclxuXHRcdFx0XHRcclxuXHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5pi156ewXCJcclxuXHRcdFx0XHR2YWx1ZT17bmlja31cclxuXHRcdFx0XHR0eXBlPVwiaW5wdXRcIlxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJuaWNrXCIsdmFsdWUpKX1cclxuXHRcdFx0XHRoaW50VGV4dD1cIuWlveWQjeWtl+WPr+S7peiuqeS9oOeahOaci+WPi+abtOWuueaYk+iusOS9j+S9oFwiXHJcblx0XHRcdFx0Lz5cclxuXHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuaAp+WIq1wiXHJcblx0XHRcdFx0dmFsdWU9e2dlbmRlcnx8XCLnlLdcIn1cclxuXHRcdFx0XHR0eXBlPVwic2luZ2xlXCJcclxuXHRcdFx0XHRvcHRpb25zPXtbXCLnlLdcIixcIuWls1wiXX1cclxuXHRcdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKFwiZ2VuZGVyXCIsdmFsdWUpKX0vPlxyXG5cclxuXHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5Zyw5Z2AXCJcclxuXHRcdFx0XHR2YWx1ZT17bG9jYXRpb259XHJcblx0XHRcdFx0dHlwZT1cImlucHV0XCJcclxuXHRcdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKFwibG9jYXRpb25cIix2YWx1ZSkpfVxyXG5cdFx0XHRcdC8+XHJcblxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLnlJ/ml6VcIiB2YWx1ZT17YmlydGhkYXl9XHJcblx0XHRcdFx0dHlwZT1cImRhdGVcIlxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJiaXJ0aGRheVwiLHZhbHVlKSl9Lz5cclxuXHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuetvuWQjVwiXHJcblx0XHRcdFx0dmFsdWU9e3NpZ25hdHVyZX1cclxuXHRcdFx0XHR0eXBlPVwiaW5wdXRcIlxyXG5cdFx0XHRcdGhpbnRUZXh0PVwi5Liq5oCn562+5ZCN6KGo6L6+5L2g55qE5Liq5oCnXCJcclxuXHRcdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKFwic2lnbmF0dXJlXCIsdmFsdWUpKX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0XHRcclxuXHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHRcclxuXHRcdDwvSW5mb0Zvcm0+XHJcblxyXG5cdFx0PENvbW1hbmRCYXIgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdFx0XHRpdGVtcz17W1xyXG5cdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9LFxyXG5cdFx0XHRcdHthY3Rpb246XCJMb2dvdXRcIiwgbGFiZWw6XCLpgIDlh7rotKblj7dcIiwgaWNvbjo8UXVpdEljb24vPiwgb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goUWlsaUFwcC5BQ1RJT04uTE9HT1VUKX1cclxuXHRcdFx0XHRdfVxyXG5cdFx0XHQvPlxyXG5cdDwvZGl2PlxyXG4pXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnFpbGlBcHAudXNlcixcInVzZXJuYW1lXCIsXCJuaWNrXCIsXCJiaXJ0aGRheVwiLFwiZ2VuZGVyXCIsXCJsb2NhdGlvblwiLFwicGhvdG9cIixcInNpZ25hdHVyZVwiKSkoUHJvZmlsZSkse0RPTUFJTiwgQUNUSU9OLCBSRURVQ0VSfSlcclxuIl19