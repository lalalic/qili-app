"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Profile = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _photo = require("./components/photo");

var _photo2 = _interopRequireDefault(_photo);

var _user = require("./db/user");

var _user2 = _interopRequireDefault(_user);

var _qiliApp = require("./qiliApp");

var _qiliApp2 = _interopRequireDefault(_qiliApp);

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMAIN = exports.DOMAIN = "profile";
var ACTION = exports.ACTION = {
	UPDATE_PHOTO: function UPDATE_PHOTO(url) {
		return function (dispatch, getState) {
			var user = getState().qiliApp.user;
			user.photo = url;
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
	var name = _ref2.name;
	var nick = _ref2.nick;
	var gender = _ref2.gender;
	var location = _ref2.location;
	var photo = _ref2.photo;
	var signature = _ref2.signature;
	return _react2.default.createElement(
		_materialUi.List,
		null,
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5934\u50CF",
			rightAvatar: _react2.default.createElement(_photo2.default, { src: photo,
				onPhoto: function onPhoto(url) {
					return dispatch(ACTION.UPDATE_PHOTO(url));
				},
				iconRatio: 2 / 3, width: 100, height: 100 }),
			style: { height: 100 } }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u59D3\u540D", rightIcon: _react2.default.createElement(
				"span",
				null,
				name
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u6027\u522B", rightIcon: _react2.default.createElement(
				"span",
				null,
				gender || "男"
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5730\u5740", rightIcon: _react2.default.createElement(
				"span",
				null,
				location
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u4E2A\u6027\u7B7E\u540D", rightIcon: _react2.default.createElement(
				"span",
				null,
				signature
			) })
	);
};

exports.default = (0, _assign2.default)((0, _reactRedux.connect)(function (state) {
	return (0, _.compact)(state.qiliApp.user, "name", "nick", "gender", "location", "photo", "signature");
})(Profile), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFX1BIT1RPIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInVzZXIiLCJxaWxpQXBwIiwicGhvdG8iLCJ1cmwiLCJ1cHNlcnQiLCJ0aGVuIiwiVVNFUl9DSEFOR0VEIiwidXBkYXRlZCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsIm5hbWUiLCJuaWNrIiwiZ2VuZGVyIiwibG9jYXRpb24iLCJzaWduYXR1cmUiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVPLElBQU1BLDBCQUFPLFNBQWI7QUFDQSxJQUFNQywwQkFBTztBQUNuQkMsZUFBYTtBQUFBLFNBQUssVUFBQ0MsUUFBRCxFQUFVQyxRQUFWLEVBQXFCO0FBQ3RDLE9BQU1DLE9BQUtELFdBQVdFLE9BQVgsQ0FBbUJELElBQTlCO0FBQ0FBLFFBQUtFLEtBQUwsR0FBV0MsR0FBWDtBQUNBLGtCQUFLQyxNQUFMLENBQVlKLElBQVosRUFBa0JLLElBQWxCLENBQXVCO0FBQUEsV0FBU1AsU0FBUyxrQkFBUUYsTUFBUixDQUFlVSxZQUFmLENBQTRCQyxPQUE1QixDQUFULENBQVQ7QUFBQSxJQUF2QjtBQUNBLEdBSlk7QUFBQTtBQURNLENBQWI7O0FBUUEsSUFBTUMsNEJBQVEsU0FBUkEsT0FBUSxHQUE2QjtBQUFBLEtBQTVCQyxLQUE0Qix1RUFBdEIsRUFBc0I7QUFBQTtBQUFBLEtBQWpCQyxJQUFpQixRQUFqQkEsSUFBaUI7QUFBQSxLQUFYQyxPQUFXLFFBQVhBLE9BQVc7O0FBQ2pELFFBQU9GLEtBQVA7QUFDQSxDQUZNOztBQUlBLElBQU1HLDRCQUFRLFNBQVJBLE9BQVE7QUFBQSxLQUFFQyxJQUFGLFNBQUVBLElBQUY7QUFBQSxLQUFPQyxJQUFQLFNBQU9BLElBQVA7QUFBQSxLQUFZQyxNQUFaLFNBQVlBLE1BQVo7QUFBQSxLQUFtQkMsUUFBbkIsU0FBbUJBLFFBQW5CO0FBQUEsS0FBNEJkLEtBQTVCLFNBQTRCQSxLQUE1QjtBQUFBLEtBQWtDZSxTQUFsQyxTQUFrQ0EsU0FBbEM7QUFBQSxRQUNwQjtBQUFBO0FBQUE7QUFDQyx3REFBVSxhQUFZLGNBQXRCO0FBQ0MsZ0JBQ0MsaURBQU8sS0FBS2YsS0FBWjtBQUNDLGFBQVM7QUFBQSxZQUFLSixTQUFTRixPQUFPQyxZQUFQLENBQW9CTSxHQUFwQixDQUFULENBQUw7QUFBQSxLQURWO0FBRUMsZUFBVyxJQUFFLENBRmQsRUFFaUIsT0FBTyxHQUZ4QixFQUU2QixRQUFRLEdBRnJDLEdBRkY7QUFNQyxVQUFPLEVBQUNlLFFBQU8sR0FBUixFQU5SLEdBREQ7QUFTQywwREFURDtBQVVDLHdEQUFVLGFBQVksY0FBdEIsRUFBMkIsV0FBVztBQUFBO0FBQUE7QUFBT0w7QUFBUCxJQUF0QyxHQVZEO0FBWUMsMERBWkQ7QUFhQyx3REFBVSxhQUFZLGNBQXRCLEVBQTJCLFdBQVc7QUFBQTtBQUFBO0FBQU9FLGNBQVE7QUFBZixJQUF0QyxHQWJEO0FBZUMsMERBZkQ7QUFnQkMsd0RBQVUsYUFBWSxjQUF0QixFQUEyQixXQUFXO0FBQUE7QUFBQTtBQUFPQztBQUFQLElBQXRDLEdBaEJEO0FBa0JDLDBEQWxCRDtBQW1CQyx3REFBVSxhQUFZLDBCQUF0QixFQUE2QixXQUFXO0FBQUE7QUFBQTtBQUFPQztBQUFQLElBQXhDO0FBbkJELEVBRG9CO0FBQUEsQ0FBZDs7a0JBd0JRLHNCQUFjLHlCQUFRO0FBQUEsUUFBTyxlQUFRUixNQUFNUixPQUFOLENBQWNELElBQXRCLEVBQTJCLE1BQTNCLEVBQWtDLE1BQWxDLEVBQXlDLFFBQXpDLEVBQWtELFVBQWxELEVBQTZELE9BQTdELEVBQXFFLFdBQXJFLENBQVA7QUFBQSxDQUFSLEVBQWtHWSxPQUFsRyxDQUFkLEVBQXlILEVBQUNqQixjQUFELEVBQVNDLGNBQVQsRUFBaUJZLGdCQUFqQixFQUF6SCxDIiwiZmlsZSI6InVzZXItcHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0F2YXRhciwgTGlzdCwgTGlzdEl0ZW0sIERpdmlkZXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBQaG90byBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvXCJcclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4vZGIvdXNlclwiXHJcbmltcG9ydCBRaWxpQXBwIGZyb20gXCIuL3FpbGlBcHBcIlxyXG5pbXBvcnQge2NvbXBhY3R9IGZyb20gXCIuXCJcclxuXHJcbmV4cG9ydCBjb25zdCBET01BSU49XCJwcm9maWxlXCJcclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0VVBEQVRFX1BIT1RPOnVybD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3QgdXNlcj1nZXRTdGF0ZSgpLnFpbGlBcHAudXNlclxyXG5cdFx0dXNlci5waG90bz11cmxcclxuXHRcdFVzZXIudXBzZXJ0KHVzZXIpLnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goUWlsaUFwcC5BQ1RJT04uVVNFUl9DSEFOR0VEKHVwZGF0ZWQpKSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT17fSwge3R5cGUsIHBheWxvYWR9KT0+e1xyXG5cdHJldHVybiBzdGF0ZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUHJvZmlsZT0oe25hbWUsbmljayxnZW5kZXIsbG9jYXRpb24scGhvdG8sc2lnbmF0dXJlfSk9PihcclxuXHQ8TGlzdD5cclxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuWktOWDj1wiXHJcblx0XHRcdHJpZ2h0QXZhdGFyPXtcclxuXHRcdFx0XHQ8UGhvdG8gc3JjPXtwaG90b31cclxuXHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURV9QSE9UTyh1cmwpKX1cclxuXHRcdFx0XHRcdGljb25SYXRpbz17Mi8zfSB3aWR0aD17MTAwfSBoZWlnaHQ9ezEwMH0vPlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0c3R5bGU9e3toZWlnaHQ6MTAwfX0vPlxyXG5cclxuXHRcdDxEaXZpZGVyLz5cclxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuWnk+WQjVwiIHJpZ2h0SWNvbj17PHNwYW4+e25hbWV9PC9zcGFuPn0vPlxyXG5cclxuXHRcdDxEaXZpZGVyLz5cclxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuaAp+WIq1wiIHJpZ2h0SWNvbj17PHNwYW4+e2dlbmRlcnx8XCLnlLdcIn08L3NwYW4+fS8+XHJcblxyXG5cdFx0PERpdmlkZXIvPlxyXG5cdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5Zyw5Z2AXCIgcmlnaHRJY29uPXs8c3Bhbj57bG9jYXRpb259PC9zcGFuPn0vPlxyXG5cclxuXHRcdDxEaXZpZGVyLz5cclxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuS4quaAp+etvuWQjVwiIHJpZ2h0SWNvbj17PHNwYW4+e3NpZ25hdHVyZX08L3NwYW4+fS8+XHJcblx0PC9MaXN0PlxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKGNvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUucWlsaUFwcC51c2VyLFwibmFtZVwiLFwibmlja1wiLFwiZ2VuZGVyXCIsXCJsb2NhdGlvblwiLFwicGhvdG9cIixcInNpZ25hdHVyZVwiKSkoUHJvZmlsZSkse0RPTUFJTiwgQUNUSU9OLCBSRURVQ0VSfSlcclxuIl19