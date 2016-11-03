"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Profile = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _photo = require("./components/photo");

var _photo2 = _interopRequireDefault(_photo);

var _user = require("./db/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMAIN = exports.DOMAIN = "profile";
var ACTION = exports.ACTION = {
	UPDATE_PHOTO: function UPDATE_PHOTO(url) {
		return function (dispatch) {
			var user = _user2.default.current;
			user.photo = url;
			return _user2.default.upsert(user);
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

var Profile = exports.Profile = function Profile(_ref2, _ref3) {
	var user = _ref2.user;
	var dispatch = _ref2.dispatch;
	var router = _ref3.router;
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
};

Profile.contextTypes = { router: _react.PropTypes.object };

exports.default = Object.assign(Profile, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFX1BIT1RPIiwidXNlciIsImN1cnJlbnQiLCJwaG90byIsInVybCIsInVwc2VydCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsImRpc3BhdGNoIiwicm91dGVyIiwiaGVpZ2h0IiwibmFtZSIsIm5pY2siLCJnZW5kZXIiLCJsb2NhdGlvbiIsInNpZ24iLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVPLElBQU1BLDBCQUFPLFNBQWI7QUFDQSxJQUFNQywwQkFBTztBQUNuQkMsZUFBYTtBQUFBLFNBQUssb0JBQVU7QUFDM0IsT0FBTUMsT0FBSyxlQUFLQyxPQUFoQjtBQUNBRCxRQUFLRSxLQUFMLEdBQVdDLEdBQVg7QUFDQSxVQUFPLGVBQUtDLE1BQUwsQ0FBWUosSUFBWixDQUFQO0FBQ0EsR0FKWTtBQUFBO0FBRE0sQ0FBYjs7QUFRQSxJQUFNSyw0QkFBUSxTQUFSQSxPQUFRLEdBQTZCO0FBQUEsS0FBNUJDLEtBQTRCLHVFQUF0QixFQUFzQjtBQUFBO0FBQUEsS0FBakJDLElBQWlCLFFBQWpCQSxJQUFpQjtBQUFBLEtBQVhDLE9BQVcsUUFBWEEsT0FBVzs7QUFDakQsUUFBT0YsS0FBUDtBQUNBLENBRk07O0FBSUEsSUFBTUcsNEJBQVEsU0FBUkEsT0FBUTtBQUFBLEtBQUVULElBQUYsU0FBRUEsSUFBRjtBQUFBLEtBQU9VLFFBQVAsU0FBT0EsUUFBUDtBQUFBLEtBQWtCQyxNQUFsQixTQUFrQkEsTUFBbEI7QUFBQSxRQUNwQjtBQUFBO0FBQUE7QUFDQyx3REFBVSxhQUFZLGNBQXRCO0FBQ0MsZ0JBQ0MsaURBQU8sS0FBS1gsS0FBS0UsS0FBakI7QUFDQyxhQUFTO0FBQUEsWUFBS1EsU0FBU1osT0FBT0MsWUFBUCxDQUFvQkksR0FBcEIsQ0FBVCxDQUFMO0FBQUEsS0FEVjtBQUVDLGVBQVcsSUFBRSxDQUZkLEVBRWlCLE9BQU8sR0FGeEIsRUFFNkIsUUFBUSxHQUZyQyxHQUZGO0FBTUMsVUFBTyxFQUFDUyxRQUFPLEdBQVIsRUFOUixHQUREO0FBU0MsMERBVEQ7QUFVQyx3REFBVSxhQUFZLGNBQXRCLEVBQTJCLFdBQVc7QUFBQTtBQUFBO0FBQU9aLFNBQUthO0FBQVosSUFBdEMsR0FWRDtBQVlDLDBEQVpEO0FBYUMsd0RBQVUsYUFBWSxjQUF0QixFQUEyQixXQUFXO0FBQUE7QUFBQTtBQUFPYixTQUFLYztBQUFaLElBQXRDLEdBYkQ7QUFlQywwREFmRDtBQWdCQyx3REFBVSxhQUFZLGNBQXRCLEVBQTJCLFdBQVc7QUFBQTtBQUFBO0FBQU9kLFNBQUtlLE1BQUwsSUFBYTtBQUFwQixJQUF0QyxHQWhCRDtBQWtCQywwREFsQkQ7QUFtQkMsd0RBQVUsYUFBWSxjQUF0QixFQUEyQixXQUFXO0FBQUE7QUFBQTtBQUFPZixTQUFLZ0I7QUFBWixJQUF0QyxHQW5CRDtBQXFCQywwREFyQkQ7QUFzQkMsd0RBQVUsYUFBWSwwQkFBdEIsRUFBNkIsV0FBVztBQUFBO0FBQUE7QUFBT2hCLFNBQUtpQjtBQUFaLElBQXhDO0FBdEJELEVBRG9CO0FBQUEsQ0FBZDs7QUEyQlBSLFFBQVFTLFlBQVIsR0FBcUIsRUFBQ1AsUUFBTyxpQkFBVVEsTUFBbEIsRUFBckI7O2tCQUdlQyxPQUFPQyxNQUFQLENBQWNaLE9BQWQsRUFBc0IsRUFBQ1osY0FBRCxFQUFTQyxjQUFULEVBQWlCTyxnQkFBakIsRUFBdEIsQyIsImZpbGUiOiJ1c2VyLXByb2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtBdmF0YXIsIExpc3QsIExpc3RJdGVtLCBEaXZpZGVyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IFBob3RvIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG9cIlxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi9kYi91c2VyXCJcclxuXHJcbmV4cG9ydCBjb25zdCBET01BSU49XCJwcm9maWxlXCJcclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0VVBEQVRFX1BIT1RPOnVybD0+ZGlzcGF0Y2g9PntcclxuXHRcdGNvbnN0IHVzZXI9VXNlci5jdXJyZW50XHJcblx0XHR1c2VyLnBob3RvPXVybFxyXG5cdFx0cmV0dXJuIFVzZXIudXBzZXJ0KHVzZXIpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30sIHt0eXBlLCBwYXlsb2FkfSk9PntcclxuXHRyZXR1cm4gc3RhdGVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFByb2ZpbGU9KHt1c2VyLGRpc3BhdGNofSx7cm91dGVyfSk9PihcclxuXHQ8TGlzdD5cclxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuWktOWDj1wiXHJcblx0XHRcdHJpZ2h0QXZhdGFyPXtcclxuXHRcdFx0XHQ8UGhvdG8gc3JjPXt1c2VyLnBob3RvfVxyXG5cdFx0XHRcdFx0b25QaG90bz17dXJsPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFX1BIT1RPKHVybCkpfVxyXG5cdFx0XHRcdFx0aWNvblJhdGlvPXsyLzN9IHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfS8+XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRzdHlsZT17e2hlaWdodDoxMDB9fS8+XHJcblxyXG5cdFx0PERpdmlkZXIvPlxyXG5cdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5biQ5Y+3XCIgcmlnaHRJY29uPXs8c3Bhbj57dXNlci5uYW1lfTwvc3Bhbj59Lz5cclxuXHJcblx0XHQ8RGl2aWRlci8+XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLmmLXnp7BcIiByaWdodEljb249ezxzcGFuPnt1c2VyLm5pY2t9PC9zcGFuPn0vPlxyXG5cclxuXHRcdDxEaXZpZGVyLz5cclxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuaAp+WIq1wiIHJpZ2h0SWNvbj17PHNwYW4+e3VzZXIuZ2VuZGVyfHxcIueUt1wifTwvc3Bhbj59Lz5cclxuXHJcblx0XHQ8RGl2aWRlci8+XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLlnLDlnYBcIiByaWdodEljb249ezxzcGFuPnt1c2VyLmxvY2F0aW9ufTwvc3Bhbj59Lz5cclxuXHJcblx0XHQ8RGl2aWRlci8+XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLkuKrmgKfnrb7lkI1cIiByaWdodEljb249ezxzcGFuPnt1c2VyLnNpZ259PC9zcGFuPn0vPlxyXG5cdDwvTGlzdD5cclxuKVxyXG5cclxuUHJvZmlsZS5jb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oUHJvZmlsZSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxyXG4iXX0=