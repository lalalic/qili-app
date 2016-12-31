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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFIiwia2V5IiwidmFsdWUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwidXNlciIsInFpbGlBcHAiLCJ1cHNlcnQiLCJ0aGVuIiwiVVNFUl9DSEFOR0VEIiwidXBkYXRlZCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsInVzZXJuYW1lIiwibmljayIsImJpcnRoZGF5IiwiZ2VuZGVyIiwibG9jYXRpb24iLCJwaG90byIsInNpZ25hdHVyZSIsInZhbHVlU3R5bGUiLCJjb2xvciIsInBhZGRpbmciLCJ1cmwiLCJoZWlnaHQiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJMT0dPVVQiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBRU8sSUFBTUEsMEJBQU8sU0FBYjtBQUNBLElBQU1DLDBCQUFPO0FBQ25CQyxTQUFPLGdCQUFDQyxHQUFELEVBQUtDLEtBQUw7QUFBQSxTQUFhLFVBQUNDLFFBQUQsRUFBV0MsUUFBWCxFQUFzQjtBQUN6QyxPQUFNQyxPQUFLRCxXQUFXRSxPQUFYLENBQW1CRCxJQUE5QjtBQUNBQSxRQUFLSixHQUFMLElBQVVDLEtBQVY7QUFDQSxrQkFBS0ssTUFBTCxDQUFZRixJQUFaLEVBQWtCRyxJQUFsQixDQUF1QjtBQUFBLFdBQVNMLFNBQVMsa0JBQVFKLE1BQVIsQ0FBZVUsWUFBZixDQUE0QkMsT0FBNUIsQ0FBVCxDQUFUO0FBQUEsSUFBdkI7QUFDQSxHQUpNO0FBQUE7QUFEWSxDQUFiOztBQVFBLElBQU1DLDRCQUFRLFNBQVJBLE9BQVEsR0FBNkI7QUFBQSxLQUE1QkMsS0FBNEIsdUVBQXRCLEVBQXNCO0FBQUE7QUFBQSxLQUFqQkMs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LENBQWNELElBQXRCLEVBQTJCLFVBQTNCLEVBQXNDLE1BQXRDLEVBQTZDLFVBQTdDLEVBQXdELFFBQXhELEVBQWlFLFVBQWpFLEVBQTRFLE9BQTVFLEVBQW9GLFdBQXBGLENBQVA7QUFBQSxDQUFSLEVBQWlIVSxPQUFqSCxDQUFkLEVBQXdJLEVBQUNqQixjQUFELEVBQVNDLGNBQVQsRUFBaUJZLGdCQUFqQixFQUF4SSxDIiwiZmlsZSI6InVzZXItcHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgUGhvdG8gZnJvbSBcIi4vY29tcG9uZW50cy9waG90b1wiXHJcbmltcG9ydCBDb21tYW5kQmFyIGZyb20gXCIuL2NvbXBvbmVudHMvY29tbWFuZC1iYXJcIlxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi9kYi91c2VyXCJcclxuaW1wb3J0IFFpbGlBcHAgZnJvbSBcIi4vcWlsaUFwcFwiXHJcbmltcG9ydCB7Y29tcGFjdH0gZnJvbSBcIi5cIlxyXG5cclxuaW1wb3J0IHtJbmZvRm9ybSwgRmllbGR9IGZyb20gXCIuL2NvbXBvbmVudHMvaW5mby1mb3JtXCJcclxuaW1wb3J0IFRleHRGaWVsZHggZnJvbSBcIi4vY29tcG9uZW50cy90ZXh0LWZpZWxkXCJcclxuXHJcbmltcG9ydCBRdWl0SWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtb2ZmXCJcclxuXHJcbmV4cG9ydCBjb25zdCBET01BSU49XCJwcm9maWxlXCJcclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0VVBEQVRFOihrZXksdmFsdWUpPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3QgdXNlcj1nZXRTdGF0ZSgpLnFpbGlBcHAudXNlclxyXG5cdFx0dXNlcltrZXldPXZhbHVlXHJcblx0XHRVc2VyLnVwc2VydCh1c2VyKS50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKFFpbGlBcHAuQUNUSU9OLlVTRVJfQ0hBTkdFRCh1cGRhdGVkKSkpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30sIHt0eXBlLCBwYXlsb2FkfSk9PntcclxuXHRyZXR1cm4gc3RhdGVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFByb2ZpbGU9KHt1c2VybmFtZSxuaWNrLGJpcnRoZGF5LGdlbmRlcixsb2NhdGlvbixwaG90byxzaWduYXR1cmUsIGRpc3BhdGNoLCB2YWx1ZVN0eWxlPXtjb2xvcjpcImxpZ2h0Z3JheVwifX0pPT4oXHJcblx0PGRpdj5cclxuXHRcdDxJbmZvRm9ybSBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLlpLTlg49cIlxyXG5cdFx0XHRcdHJpZ2h0QXZhdGFyPXtcclxuXHRcdFx0XHRcdDxQaG90byBzcmM9e3Bob3RvfVxyXG5cdFx0XHRcdFx0XHRvblBob3RvPXt1cmw9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJwaG90b1wiLHVybCkpfVxyXG5cdFx0XHRcdFx0XHRpY29uUmF0aW89ezIvM30gd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9Lz5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRzdHlsZT17e2hlaWdodDoxMDB9fS8+XHJcblxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLotKblj7dcIlxyXG5cdFx0XHRcdHZhbHVlPXt1c2VybmFtZX1cclxuXHRcdFx0XHQvPlxyXG5cclxuXHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5pi156ewXCJcclxuXHRcdFx0XHR2YWx1ZT17bmlja31cclxuXHRcdFx0XHR0eXBlPVwiaW5wdXRcIlxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJuaWNrXCIsdmFsdWUpKX1cclxuXHRcdFx0XHRoaW50VGV4dD1cIuWlveWQjeWtl+WPr+S7peiuqeS9oOeahOaci+WPi+abtOWuueaYk+iusOS9j+S9oFwiXHJcblx0XHRcdFx0Lz5cclxuXHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuaAp+WIq1wiXHJcblx0XHRcdFx0dmFsdWU9e2dlbmRlcnx8XCLnlLdcIn1cclxuXHRcdFx0XHR0eXBlPVwic2luZ2xlXCJcclxuXHRcdFx0XHRvcHRpb25zPXtbXCLnlLdcIixcIuWls1wiXX1cclxuXHRcdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKFwiZ2VuZGVyXCIsdmFsdWUpKX0vPlxyXG5cclxuXHRcdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5Zyw5Z2AXCJcclxuXHRcdFx0XHR2YWx1ZT17bG9jYXRpb259XHJcblx0XHRcdFx0dHlwZT1cImlucHV0XCJcclxuXHRcdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKFwibG9jYXRpb25cIix2YWx1ZSkpfVxyXG5cdFx0XHRcdC8+XHJcblxyXG5cdFx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLnlJ/ml6VcIiB2YWx1ZT17YmlydGhkYXl9XHJcblx0XHRcdFx0dHlwZT1cImRhdGVcIlxyXG5cdFx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJiaXJ0aGRheVwiLHZhbHVlKSl9Lz5cclxuXHJcblx0XHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuetvuWQjVwiXHJcblx0XHRcdFx0dmFsdWU9e3NpZ25hdHVyZX1cclxuXHRcdFx0XHR0eXBlPVwiaW5wdXRcIlxyXG5cdFx0XHRcdGhpbnRUZXh0PVwi5Liq5oCn562+5ZCN6KGo6L6+5L2g55qE5Liq5oCnXCJcclxuXHRcdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKFwic2lnbmF0dXJlXCIsdmFsdWUpKX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0PC9JbmZvRm9ybT5cclxuXHJcblx0XHQ8Q29tbWFuZEJhciAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXHJcblx0XHRcdFx0e2FjdGlvbjpcIkxvZ291dFwiLCBpY29uOjxRdWl0SWNvbi8+LCBvblNlbGVjdDplPT5kaXNwYXRjaChRaWxpQXBwLkFDVElPTi5MT0dPVVQpfVxyXG5cdFx0XHRcdF19XHJcblx0XHRcdC8+XHJcblx0PC9kaXY+XHJcbilcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKGNvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUucWlsaUFwcC51c2VyLFwidXNlcm5hbWVcIixcIm5pY2tcIixcImJpcnRoZGF5XCIsXCJnZW5kZXJcIixcImxvY2F0aW9uXCIsXCJwaG90b1wiLFwic2lnbmF0dXJlXCIpKShQcm9maWxlKSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxyXG4iXX0=