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

var _user = require("./db/user");

var _user2 = _interopRequireDefault(_user);

var _qiliApp = require("./qiliApp");

var _qiliApp2 = _interopRequireDefault(_qiliApp);

var _ = require(".");

var _infoForm = require("./components/info-form");

var _textField = require("./components/text-field");

var _textField2 = _interopRequireDefault(_textField);

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
	);
};

exports.default = (0, _assign2.default)((0, _reactRedux.connect)(function (state) {
	return (0, _.compact)(state.qiliApp.user, "username", "nick", "birthday", "gender", "location", "photo", "signature");
})(Profile), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFIiwia2V5IiwidmFsdWUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwidXNlciIsInFpbGlBcHAiLCJ1cHNlcnQiLCJ0aGVuIiwiVVNFUl9DSEFOR0VEIiwidXBkYXRlZCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsInVzZXJuYW1lIiwibmljayIsImJpcnRoZGF5IiwiZ2VuZGVyIiwibG9jYXRpb24iLCJwaG90byIsInNpZ25hdHVyZSIsInZhbHVlU3R5bGUiLCJjb2xvciIsInBhZGRpbmciLCJ1cmwiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsMEJBQU8sU0FBYjtBQUNBLElBQU1DLDBCQUFPO0FBQ25CQyxTQUFPLGdCQUFDQyxHQUFELEVBQUtDLEtBQUw7QUFBQSxTQUFhLFVBQUNDLFFBQUQsRUFBV0MsUUFBWCxFQUFzQjtBQUN6QyxPQUFNQyxPQUFLRCxXQUFXRSxPQUFYLENBQW1CRCxJQUE5QjtBQUNBQSxRQUFLSixHQUFMLElBQVVDLEtBQVY7QUFDQSxrQkFBS0ssTUFBTCxDQUFZRixJQUFaLEVBQWtCRyxJQUFsQixDQUF1QjtBQUFBLFdBQVNMLFNBQVMsa0JBQVFKLE1BQVIsQ0FBZVUsWUFBZixDQUE0QkMsT0FBNUIsQ0FBVCxDQUFUO0FBQUEsSUFBdkI7QUFDQSxHQUpNO0FBQUE7QUFEWSxDQUFiOztBQVFBLElBQU1DLDRCQUFRLFNBQVJBLE9BQVEsR0FBNkI7QUFBQSxLQUE1QkMsS0FBNEIsdUVBQXRCLEVBQXNCO0FBQUE7QUFBQSxLQUFqQkMsSUFBaUIsUUFBakJBLElBQWlCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUNqRCxRQUFPRixLQUFQO0FBQ0EsQ0FGTTs7QUFJQSxJQUFNRyw0QkFBUSxTQUFSQSxPQUFRO0FBQUEsS0FBRUMsUUFBRixTQUFFQSxRQUFGO0FBQUEsS0FBV0MsSUFBWCxTQUFXQSxJQUFYO0FBQUEsS0FBZ0JDLFFBQWhCLFNBQWdCQSxRQUFoQjtBQUFBLEtBQXlCQyxNQUF6QixTQUF5QkEsTUFBekI7QUFBQSxLQUFnQ0MsUUFBaEMsU0FBZ0NBLFFBQWhDO0FBQUEsS0FBeUNDLEtBQXpDLFNBQXlDQSxLQUF6QztBQUFBLEtBQStDQyxTQUEvQyxTQUErQ0EsU0FBL0M7QUFBQSxLQUEwRG5CLFFBQTFELFNBQTBEQSxRQUExRDtBQUFBLDhCQUFvRW9CLFVBQXBFO0FBQUEsS0FBb0VBLFVBQXBFLG9DQUErRSxFQUFDQyxPQUFNLFdBQVAsRUFBL0U7QUFBQSxRQUNwQjtBQUFBO0FBQUEsSUFBVSxPQUFPLEVBQUNDLFNBQVEsQ0FBVCxFQUFqQjtBQUNDLG1EQUFPLGFBQVksY0FBbkI7QUFDQyxnQkFDQyxpREFBTyxLQUFLSixLQUFaO0FBQ0MsYUFBUztBQUFBLFlBQUtsQixTQUFTSixPQUFPQyxNQUFQLENBQWMsT0FBZCxFQUFzQjBCLEdBQXRCLENBQVQsQ0FBTDtBQUFBLEtBRFY7QUFFQyxlQUFXLElBQUUsQ0FGZCxFQUVpQixPQUFPLEdBRnhCLEVBRTZCLFFBQVEsR0FGckMsR0FGRjtBQU1DLFVBQU8sRUFBQ0MsUUFBTyxHQUFSLEVBTlIsR0FERDtBQVNDLG1EQUFPLGFBQVksY0FBbkI7QUFDQyxVQUFPWDtBQURSLElBVEQ7QUFhQyxtREFBTyxhQUFZLGNBQW5CO0FBQ0MsVUFBT0MsSUFEUjtBQUVDLFNBQUssT0FGTjtBQUdDLFdBQVE7QUFBQSxXQUFPZCxTQUFTSixPQUFPQyxNQUFQLENBQWMsTUFBZCxFQUFxQkUsS0FBckIsQ0FBVCxDQUFQO0FBQUEsSUFIVDtBQUlDLGFBQVM7QUFKVixJQWJEO0FBb0JDLG1EQUFPLGFBQVksY0FBbkI7QUFDQyxVQUFPaUIsVUFBUSxHQURoQjtBQUVDLFNBQUssUUFGTjtBQUdDLFlBQVMsQ0FBQyxHQUFELEVBQUssR0FBTCxDQUhWO0FBSUMsV0FBUTtBQUFBLFdBQU9oQixTQUFTSixPQUFPQyxNQUFQLENBQWMsUUFBZCxFQUF1QkUsS0FBdkIsQ0FBVCxDQUFQO0FBQUEsSUFKVCxHQXBCRDtBQTBCQyxtREFBTyxhQUFZLGNBQW5CO0FBQ0MsVUFBT2tCLFFBRFI7QUFFQyxTQUFLLE9BRk47QUFHQyxXQUFRO0FBQUEsV0FBT2pCLFNBQVNKLE9BQU9DLE1BQVAsQ0FBYyxVQUFkLEVBQXlCRSxLQUF6QixDQUFULENBQVA7QUFBQTtBQUhULElBMUJEO0FBZ0NDLG1EQUFPLGFBQVksY0FBbkIsRUFBd0IsT0FBT2dCLFFBQS9CO0FBQ0MsU0FBSyxNQUROO0FBRUMsV0FBUTtBQUFBLFdBQU9mLFNBQVNKLE9BQU9DLE1BQVAsQ0FBYyxVQUFkLEVBQXlCRSxLQUF6QixDQUFULENBQVA7QUFBQSxJQUZULEdBaENEO0FBb0NDLG1EQUFPLGFBQVksY0FBbkI7QUFDQyxVQUFPb0IsU0FEUjtBQUVDLFNBQUssT0FGTjtBQUdDLGFBQVMsOERBSFY7QUFJQyxXQUFRO0FBQUEsV0FBT25CLFNBQVNKLE9BQU9DLE1BQVAsQ0FBYyxXQUFkLEVBQTBCRSxLQUExQixDQUFULENBQVA7QUFBQTtBQUpUO0FBcENELEVBRG9CO0FBQUEsQ0FBZDs7a0JBK0NRLHNCQUFjLHlCQUFRO0FBQUEsUUFBTyxlQUFRVSxNQUFNTixPQUFOLENBQWNELElBQXRCLEVBQTJCLFVBQTNCLEVBQXNDLE1BQXRDLEVBQTZDLFVBQTdDLEVBQXdELFFBQXhELEVBQWlFLFVBQWpFLEVBQTRFLE9BQTVFLEVBQW9GLFdBQXBGLENBQVA7QUFBQSxDQUFSLEVBQWlIVSxPQUFqSCxDQUFkLEVBQXdJLEVBQUNqQixjQUFELEVBQVNDLGNBQVQsRUFBaUJZLGdCQUFqQixFQUF4SSxDIiwiZmlsZSI6InVzZXItcHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgUGhvdG8gZnJvbSBcIi4vY29tcG9uZW50cy9waG90b1wiXHJcbmltcG9ydCBVc2VyIGZyb20gXCIuL2RiL3VzZXJcIlxyXG5pbXBvcnQgUWlsaUFwcCBmcm9tIFwiLi9xaWxpQXBwXCJcclxuaW1wb3J0IHtjb21wYWN0fSBmcm9tIFwiLlwiXHJcblxyXG5pbXBvcnQge0luZm9Gb3JtLCBGaWVsZH0gZnJvbSBcIi4vY29tcG9uZW50cy9pbmZvLWZvcm1cIlxyXG5pbXBvcnQgVGV4dEZpZWxkeCBmcm9tIFwiLi9jb21wb25lbnRzL3RleHQtZmllbGRcIlxyXG5cclxuZXhwb3J0IGNvbnN0IERPTUFJTj1cInByb2ZpbGVcIlxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRVUERBVEU6KGtleSx2YWx1ZSk9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCB1c2VyPWdldFN0YXRlKCkucWlsaUFwcC51c2VyXHJcblx0XHR1c2VyW2tleV09dmFsdWVcclxuXHRcdFVzZXIudXBzZXJ0KHVzZXIpLnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goUWlsaUFwcC5BQ1RJT04uVVNFUl9DSEFOR0VEKHVwZGF0ZWQpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT17fSwge3R5cGUsIHBheWxvYWR9KT0+e1xyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUHJvZmlsZT0oe3VzZXJuYW1lLG5pY2ssYmlydGhkYXksZ2VuZGVyLGxvY2F0aW9uLHBob3RvLHNpZ25hdHVyZSwgZGlzcGF0Y2gsIHZhbHVlU3R5bGU9e2NvbG9yOlwibGlnaHRncmF5XCJ9fSk9PihcclxuXHQ8SW5mb0Zvcm0gc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuWktOWDj1wiXHJcblx0XHRcdHJpZ2h0QXZhdGFyPXtcclxuXHRcdFx0XHQ8UGhvdG8gc3JjPXtwaG90b31cclxuXHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcInBob3RvXCIsdXJsKSl9XHJcblx0XHRcdFx0XHRpY29uUmF0aW89ezIvM30gd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9Lz5cclxuXHRcdFx0XHR9XHJcblx0XHRcdHN0eWxlPXt7aGVpZ2h0OjEwMH19Lz5cclxuXHJcblx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLotKblj7dcIlxyXG5cdFx0XHR2YWx1ZT17dXNlcm5hbWV9XHJcblx0XHRcdC8+XHJcblxyXG5cdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5pi156ewXCJcclxuXHRcdFx0dmFsdWU9e25pY2t9XHJcblx0XHRcdHR5cGU9XCJpbnB1dFwiXHJcblx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJuaWNrXCIsdmFsdWUpKX1cclxuXHRcdFx0aGludFRleHQ9XCLlpb3lkI3lrZflj6/ku6XorqnkvaDnmoTmnIvlj4vmm7TlrrnmmJPorrDkvY/kvaBcIlxyXG5cdFx0XHQvPlxyXG5cclxuXHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuaAp+WIq1wiXHJcblx0XHRcdHZhbHVlPXtnZW5kZXJ8fFwi55S3XCJ9XHJcblx0XHRcdHR5cGU9XCJzaW5nbGVcIlxyXG5cdFx0XHRvcHRpb25zPXtbXCLnlLdcIixcIuWls1wiXX1cclxuXHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcImdlbmRlclwiLHZhbHVlKSl9Lz5cclxuXHJcblx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLlnLDlnYBcIlxyXG5cdFx0XHR2YWx1ZT17bG9jYXRpb259XHJcblx0XHRcdHR5cGU9XCJpbnB1dFwiXHJcblx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJsb2NhdGlvblwiLHZhbHVlKSl9XHJcblx0XHRcdC8+XHJcblxyXG5cdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi55Sf5pelXCIgdmFsdWU9e2JpcnRoZGF5fVxyXG5cdFx0XHR0eXBlPVwiZGF0ZVwiXHJcblx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJiaXJ0aGRheVwiLHZhbHVlKSl9Lz5cclxuXHJcblx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLnrb7lkI1cIlxyXG5cdFx0XHR2YWx1ZT17c2lnbmF0dXJlfVxyXG5cdFx0XHR0eXBlPVwiaW5wdXRcIlxyXG5cdFx0XHRoaW50VGV4dD1cIuS4quaAp+etvuWQjeihqOi+vuS9oOeahOS4quaAp1wiXHJcblx0XHRcdG9uRWRpdD17dmFsdWU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoXCJzaWduYXR1cmVcIix2YWx1ZSkpfVxyXG5cdFx0XHQvPlxyXG5cdDwvSW5mb0Zvcm0+XHJcbilcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKGNvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUucWlsaUFwcC51c2VyLFwidXNlcm5hbWVcIixcIm5pY2tcIixcImJpcnRoZGF5XCIsXCJnZW5kZXJcIixcImxvY2F0aW9uXCIsXCJwaG90b1wiLFwic2lnbmF0dXJlXCIpKShQcm9maWxlKSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxyXG4iXX0=