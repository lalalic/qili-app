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
			})
		),
		_react2.default.createElement(_commandBar2.default, { className: "footbar",
			items: [{ action: "Back" }, { action: "Logout", icon: _react2.default.createElement(_cloudOff2.default, null), onSelect: function onSelect(e) {
					return dispatch(_qiliApp2.default.ACTION.LOGOUT);
				} }]
		})
	);
};

exports.default = Object.assign((0, _reactRedux.connect)(function (state) {
	return (0, _.compact)(state.qiliApp.user, "username", "nick", "birthday", "gender", "location", "photo", "signature");
})(Profile), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFIiwia2V5IiwidmFsdWUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwidXNlciIsInFpbGlBcHAiLCJ1cHNlcnQiLCJ0aGVuIiwiVVNFUl9DSEFOR0VEIiwidXBkYXRlZCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsInVzZXJuYW1lIiwibmljayIsImJpcnRoZGF5IiwiZ2VuZGVyIiwibG9jYXRpb24iLCJwaG90byIsInNpZ25hdHVyZSIsInZhbHVlU3R5bGUiLCJjb2xvciIsInBhZGRpbmciLCJ1cmwiLCJoZWlnaHQiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJMT0dPVVQiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRU8sSUFBTUEsMEJBQU8sU0FBYjtBQUNBLElBQU1DLDBCQUFPO0FBQ25CQyxTQUFPLGdCQUFDQyxHQUFELEVBQUtDLEtBQUw7QUFBQSxTQUFhLFVBQUNDLFFBQUQsRUFBV0MsUUFBWCxFQUFzQjtBQUN6QyxPQUFNQyxPQUFLRCxXQUFXRSxPQUFYLENBQW1CRCxJQUE5QjtBQUNBQSxRQUFLSixHQUFMLElBQVVDLEtBQVY7QUFDQSxrQkFBS0ssTUFBTCxDQUFZRixJQUFaLEVBQWtCRyxJQUFsQixDQUF1QjtBQUFBLFdBQVNMLFNBQVMsa0JBQVFKLE1BQVIsQ0FBZVUsWUFBZixDQUE0QkMsT0FBNUIsQ0FBVCxDQUFUO0FBQUEsSUFBdkI7QUFDQSxHQUpNO0FBQUE7QUFEWSxDQUFiOztBQVFBLElBQU1DLDRCQUFRLFNBQVJBLE9BQVEsR0FBNkI7QUFBQSxLQUE1QkMsS0FBNEIsdUVBQXRCLEVBQXNCO0FBQUE7QUFBQSxL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LENBQUg7QUFBQSxLQUE3QyxFQUZNO0FBRFI7QUFqREQsRUFEb0I7QUFBQSxDQUFkOztrQkE0RFFDLE9BQU9DLE1BQVAsQ0FBYyx5QkFBUTtBQUFBLFFBQU8sZUFBUXJCLE1BQU1OLE9BQU4sQ0FBY0QsSUFBdEIsRUFBMkIsVUFBM0IsRUFBc0MsTUFBdEMsRUFBNkMsVUFBN0MsRUFBd0QsUUFBeEQsRUFBaUUsVUFBakUsRUFBNEUsT0FBNUUsRUFBb0YsV0FBcEYsQ0FBUDtBQUFBLENBQVIsRUFBaUhVLE9BQWpILENBQWQsRUFBd0ksRUFBQ2pCLGNBQUQsRUFBU0MsY0FBVCxFQUFpQlksZ0JBQWpCLEVBQXhJLEMiLCJmaWxlIjoidXNlci1wcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBQaG90byBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvXCJcclxuaW1wb3J0IENvbW1hbmRCYXIgZnJvbSBcIi4vY29tcG9uZW50cy9jb21tYW5kLWJhclwiXHJcbmltcG9ydCBVc2VyIGZyb20gXCIuL2RiL3VzZXJcIlxyXG5pbXBvcnQgUWlsaUFwcCBmcm9tIFwiLi9xaWxpQXBwXCJcclxuaW1wb3J0IHtjb21wYWN0fSBmcm9tIFwiLlwiXHJcbmltcG9ydCB7UmVzZXRQYXNzd29yZH0gZnJvbSBcIi4vYWNjb3VudFwiXHJcblxyXG5pbXBvcnQge0luZm9Gb3JtLCBGaWVsZH0gZnJvbSBcIi4vY29tcG9uZW50cy9pbmZvLWZvcm1cIlxyXG5pbXBvcnQgVGV4dEZpZWxkeCBmcm9tIFwiLi9jb21wb25lbnRzL3RleHQtZmllbGRcIlxyXG5cclxuaW1wb3J0IFF1aXRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1vZmZcIlxyXG5cclxuZXhwb3J0IGNvbnN0IERPTUFJTj1cInByb2ZpbGVcIlxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRVUERBVEU6KGtleSx2YWx1ZSk9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCB1c2VyPWdldFN0YXRlKCkucWlsaUFwcC51c2VyXHJcblx0XHR1c2VyW2tleV09dmFsdWVcclxuXHRcdFVzZXIudXBzZXJ0KHVzZXIpLnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goUWlsaUFwcC5BQ1RJT04uVVNFUl9DSEFOR0VEKHVwZGF0ZWQpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT17fSwge3R5cGUsIHBheWxvYWR9KT0+e1xyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUHJvZmlsZT0oe3VzZXJuYW1lLG5pY2ssYmlydGhkYXksZ2VuZGVyLGxvY2F0aW9uLHBob3RvLHNpZ25hdHVyZSwgZGlzcGF0Y2gsIHZhbHVlU3R5bGU9e2NvbG9yOlwibGlnaHRncmF5XCJ9fSk9PihcclxuXHQ8ZGl2PlxyXG5cdFx0PEluZm9Gb3JtIHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuWktOWDj1wiXHJcblx0XHRcdFx0cmlnaHRBdmF0YXI9e1xyXG5cdFx0XHRcdFx0PFBob3RvIHNyYz17cGhvdG99XHJcblx0XHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcInBob3RvXCIsdXJsKSl9XHJcblx0XHRcdFx0XHRcdGljb25SYXRpbz17Mi8zfSB3aWR0aD17MTAwfSBoZWlnaHQ9ezEwMH0vPlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdHN0eWxlPXt7aGVpZ2h0OjEwMH19Lz5cclxuXHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIui0puWPt1wiXHJcblx0XHRcdFx0dmFsdWU9e3VzZXJuYW1lfVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdFxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLlr4bnoIFcIiBoaW50VGV4dD1cIue7j+W4uOaUueWvhueggeabtOWuieWFqFwiIHZhbHVlPVwiLi4uXCI+XHJcblx0XHRcdFx0PFJlc2V0UGFzc3dvcmQgZGlzcGF0Y2g9e2Rpc3BhdGNofSAvPlxyXG5cdFx0XHQ8L0ZpZWxkPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLmmLXnp7BcIlxyXG5cdFx0XHRcdHZhbHVlPXtuaWNrfVxyXG5cdFx0XHRcdHR5cGU9XCJpbnB1dFwiXHJcblx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcIm5pY2tcIix2YWx1ZSkpfVxyXG5cdFx0XHRcdGhpbnRUZXh0PVwi5aW95ZCN5a2X5Y+v5Lul6K6p5L2g55qE5pyL5Y+L5pu05a655piT6K6w5L2P5L2gXCJcclxuXHRcdFx0XHQvPlxyXG5cclxuXHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5oCn5YirXCJcclxuXHRcdFx0XHR2YWx1ZT17Z2VuZGVyfHxcIueUt1wifVxyXG5cdFx0XHRcdHR5cGU9XCJzaW5nbGVcIlxyXG5cdFx0XHRcdG9wdGlvbnM9e1tcIueUt1wiLFwi5aWzXCJdfVxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJnZW5kZXJcIix2YWx1ZSkpfS8+XHJcblxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLlnLDlnYBcIlxyXG5cdFx0XHRcdHZhbHVlPXtsb2NhdGlvbn1cclxuXHRcdFx0XHR0eXBlPVwiaW5wdXRcIlxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJsb2NhdGlvblwiLHZhbHVlKSl9XHJcblx0XHRcdFx0Lz5cclxuXHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIueUn+aXpVwiIHZhbHVlPXtiaXJ0aGRheX1cclxuXHRcdFx0XHR0eXBlPVwiZGF0ZVwiXHJcblx0XHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcImJpcnRoZGF5XCIsdmFsdWUpKX0vPlxyXG5cclxuXHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi562+5ZCNXCJcclxuXHRcdFx0XHR2YWx1ZT17c2lnbmF0dXJlfVxyXG5cdFx0XHRcdHR5cGU9XCJpbnB1dFwiXHJcblx0XHRcdFx0aGludFRleHQ9XCLkuKrmgKfnrb7lkI3ooajovr7kvaDnmoTkuKrmgKdcIlxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJzaWduYXR1cmVcIix2YWx1ZSkpfVxyXG5cdFx0XHRcdC8+XHJcblx0XHQ8L0luZm9Gb3JtPlxyXG5cclxuXHRcdDxDb21tYW5kQmFyICBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuXHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifSxcclxuXHRcdFx0XHR7YWN0aW9uOlwiTG9nb3V0XCIsIGljb246PFF1aXRJY29uLz4sIG9uU2VsZWN0OmU9PmRpc3BhdGNoKFFpbGlBcHAuQUNUSU9OLkxPR09VVCl9XHJcblx0XHRcdFx0XX1cclxuXHRcdFx0Lz5cclxuXHQ8L2Rpdj5cclxuKVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+Y29tcGFjdChzdGF0ZS5xaWxpQXBwLnVzZXIsXCJ1c2VybmFtZVwiLFwibmlja1wiLFwiYmlydGhkYXlcIixcImdlbmRlclwiLFwibG9jYXRpb25cIixcInBob3RvXCIsXCJzaWduYXR1cmVcIikpKFByb2ZpbGUpLHtET01BSU4sIEFDVElPTiwgUkVEVUNFUn0pXHJcbiJdfQ==