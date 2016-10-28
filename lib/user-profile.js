"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Profile = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _photo = require("./components/photo");

var _photo2 = _interopRequireDefault(_photo);

var _user = require("./db/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DOMAIN = exports.DOMAIN = "user-profile";
var ACTION = exports.ACTION = {
	UPDATE_PHOTO: function UPDATE_PHOTO(url) {
		return function (dispatch) {
			var user = _user2.default.current;
			user.photo = url;
			return _user2.default.upsert();
		};
	}
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	return state;
});

var Profile = exports.Profile = (0, _reactRedux.connect)(function (state) {
	user: _user2.default.current;
})(function (_ref2) {
	var user = _ref2.user,
	    router = _ref2.router,
	    dispatch = _ref2.dispatch;
	return _react2.default.createElement(
		_materialUi.List,
		null,
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5934\u50CF",
			rightAvatar: _react2.default.createElement(_photo2.default, { src: user.photo,
				onPhoto: function onPhoto(url) {
					return dispatch(ACTION.UPDATE_PHOTO(url));
				},
				iconRatio: 2 / 3, width: 100, height: 100 }),
			style: { height: 100 } }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5E10\u53F7", rightIcon: _react2.default.createElement(
				"span",
				null,
				user.name
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u6635\u79F0", rightIcon: _react2.default.createElement(
				"span",
				null,
				user.nick
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u6027\u522B", rightIcon: _react2.default.createElement(
				"span",
				null,
				user.gender || "男"
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5730\u5740", rightIcon: _react2.default.createElement(
				"span",
				null,
				user.location
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u4E2A\u6027\u7B7E\u540D", rightIcon: _react2.default.createElement(
				"span",
				null,
				user.sign
			) })
	);
});

exports.default = Object.assign(Profile, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFX1BIT1RPIiwidXNlciIsImN1cnJlbnQiLCJwaG90byIsInVybCIsInVwc2VydCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsInJvdXRlciIsImRpc3BhdGNoIiwiaGVpZ2h0IiwibmFtZSIsIm5pY2siLCJnZW5kZXIiLCJsb2NhdGlvbiIsInNpZ24iLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTUEsMEJBQU8sY0FBYjtBQUNBLElBQU1DLDBCQUFPO0FBQ25CQyxlQUFhO0FBQUEsU0FBSyxvQkFBVTtBQUMzQixPQUFNQyxPQUFLLGVBQUtDLE9BQWhCO0FBQ0FELFFBQUtFLEtBQUwsR0FBV0MsR0FBWDtBQUNBLFVBQU8sZUFBS0MsTUFBTCxFQUFQO0FBQ0EsR0FKWTtBQUFBO0FBRE0sQ0FBYjs7QUFRQSxJQUFNQyxnREFDUlIsTUFEUSxFQUNDLFlBQTZCO0FBQUEsS0FBNUJTLEtBQTRCLHVFQUF0QixFQUFzQjtBQUFBO0FBQUEsS0FBakJDLElBQWlCLFFBQWpCQSxJQUFpQjtBQUFBLEtBQVhDLE9BQVcsUUFBWEEsT0FBVzs7QUFDekMsUUFBT0YsS0FBUDtBQUNHLENBSFEsQ0FBTjs7QUFNQSxJQUFNRyw0QkFBUSx5QkFBUSxpQkFBTztBQUFDVCxPQUFLLGVBQUtDLE9BQUw7QUFBYSxDQUFsQyxFQUFvQztBQUFBLEtBQUVELElBQUYsU0FBRUEsSUFBRjtBQUFBLEtBQVFVLE1BQVIsU0FBUUEsTUFBUjtBQUFBLEtBQWVDLFFBQWYsU0FBZUEsUUFBZjtBQUFBLFFBQ3ZEO0FBQUE7QUFBQTtBQUNDLHdEQUFVLGFBQVksY0FBdEI7QUFDQyxnQkFDQyxpREFBTyxLQUFLWCxLQUFLRSxLQUFqQjtBQUNDLGFBQVM7QUFBQSxZQUFLUyxTQUFTYixPQUFPQyxZQUFQLENBQW9CSSxHQUFwQixDQUFULENBQUw7QUFBQSxLQURWO0FBRUMsZUFBVyxJQUFFLENBRmQsRUFFaUIsT0FBTyxHQUZ4QixFQUU2QixRQUFRLEdBRnJDLEdBRkY7QUFNQyxVQUFPLEVBQUNTLFFBQU8sR0FBUixFQU5SLEdBREQ7QUFTQywwREFURDtBQVVDLHdEQUFVLGFBQVksY0FBdEIsRUFBMkIsV0FBVztBQUFBO0FBQUE7QUFBT1osU0FBS2E7QUFBWixJQUF0QyxHQVZEO0FBWUMsMERBWkQ7QUFhQyx3REFBVSxhQUFZLGNBQXRCLEVBQTJCLFdBQVc7QUFBQTtBQUFBO0FBQU9iLFNBQUtjO0FBQVosSUFBdEMsR0FiRDtBQWVDLDBEQWZEO0FBZ0JDLHdEQUFVLGFBQVksY0FBdEIsRUFBMkIsV0FBVztBQUFBO0FBQUE7QUFBT2QsU0FBS2UsTUFBTCxJQUFhO0FBQXBCLElBQXRDLEdBaEJEO0FBa0JDLDBEQWxCRDtBQW1CQyx3REFBVSxhQUFZLGNBQXRCLEVBQTJCLFdBQVc7QUFBQTtBQUFBO0FBQU9mLFNBQUtnQjtBQUFaLElBQXRDLEdBbkJEO0FBcUJDLDBEQXJCRDtBQXNCQyx3REFBVSxhQUFZLDBCQUF0QixFQUE2QixXQUFXO0FBQUE7QUFBQTtBQUFPaEIsU0FBS2lCO0FBQVosSUFBeEM7QUF0QkQsRUFEdUQ7QUFBQSxDQUFwQyxDQUFkOztrQkE0QlFDLE9BQU9DLE1BQVAsQ0FBY1YsT0FBZCxFQUFzQixFQUFDWCxjQUFELEVBQVNPLGdCQUFULEVBQXRCLEMiLCJmaWxlIjoidXNlci1wcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0F2YXRhciwgTGlzdCwgTGlzdEl0ZW0sIERpdmlkZXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBQaG90byBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvXCJcclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4vZGIvdXNlclwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwidXNlci1wcm9maWxlXCJcclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0VVBEQVRFX1BIT1RPOnVybD0+ZGlzcGF0Y2g9PntcclxuXHRcdGNvbnN0IHVzZXI9VXNlci5jdXJyZW50XHJcblx0XHR1c2VyLnBob3RvPXVybFxyXG5cdFx0cmV0dXJuIFVzZXIudXBzZXJ0KClcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcclxuICAgIFtET01BSU5dOiAoc3RhdGU9e30sIHt0eXBlLCBwYXlsb2FkfSk9PntcclxuXHRcdHJldHVybiBzdGF0ZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUHJvZmlsZT1jb25uZWN0KHN0YXRlPT57dXNlcjpVc2VyLmN1cnJlbnR9KSgoe3VzZXIsIHJvdXRlcixkaXNwYXRjaH0pPT4oXHJcblx0XHQ8TGlzdD5cclxuXHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5aS05YOPXCIgXHJcblx0XHRcdFx0cmlnaHRBdmF0YXI9e1xyXG5cdFx0XHRcdFx0PFBob3RvIHNyYz17dXNlci5waG90b31cclxuXHRcdFx0XHRcdFx0b25QaG90bz17dXJsPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFX1BIT1RPKHVybCkpfVxyXG5cdFx0XHRcdFx0XHRpY29uUmF0aW89ezIvM30gd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9Lz5cclxuXHRcdFx0XHRcdH0gXHJcblx0XHRcdFx0c3R5bGU9e3toZWlnaHQ6MTAwfX0vPlxyXG5cdFx0XHRcdFxyXG5cdFx0XHQ8RGl2aWRlci8+XHJcblx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuW4kOWPt1wiIHJpZ2h0SWNvbj17PHNwYW4+e3VzZXIubmFtZX08L3NwYW4+fS8+XHJcblx0XHRcdFxyXG5cdFx0XHQ8RGl2aWRlci8+XHJcblx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuaYteensFwiIHJpZ2h0SWNvbj17PHNwYW4+e3VzZXIubmlja308L3NwYW4+fS8+XHJcblx0XHRcdFxyXG5cdFx0XHQ8RGl2aWRlci8+XHJcblx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuaAp+WIq1wiIHJpZ2h0SWNvbj17PHNwYW4+e3VzZXIuZ2VuZGVyfHxcIueUt1wifTwvc3Bhbj59Lz5cclxuXHRcdFx0XHJcblx0XHRcdDxEaXZpZGVyLz5cclxuXHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5Zyw5Z2AXCIgcmlnaHRJY29uPXs8c3Bhbj57dXNlci5sb2NhdGlvbn08L3NwYW4+fS8+XHJcblx0XHRcdFxyXG5cdFx0XHQ8RGl2aWRlci8+XHJcblx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuS4quaAp+etvuWQjVwiIHJpZ2h0SWNvbj17PHNwYW4+e3VzZXIuc2lnbn08L3NwYW4+fS8+XHJcblx0XHQ8L0xpc3Q+XHJcblx0KVxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFByb2ZpbGUse0FDVElPTiwgUkVEVUNFUn0pIl19