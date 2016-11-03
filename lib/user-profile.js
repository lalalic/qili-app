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

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

	return state;
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFX1BIT1RPIiwidXNlciIsImN1cnJlbnQiLCJwaG90byIsInVybCIsInVwc2VydCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsImRpc3BhdGNoIiwicm91dGVyIiwiaGVpZ2h0IiwibmFtZSIsIm5pY2siLCJnZW5kZXIiLCJsb2NhdGlvbiIsInNpZ24iLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTUEsMEJBQU8sU0FBYjtBQUNBLElBQU1DLDBCQUFPO0FBQ25CQyxlQUFhO0FBQUEsU0FBSyxvQkFBVTtBQUMzQixPQUFNQyxPQUFLLGVBQUtDLE9BQWhCO0FBQ0FELFFBQUtFLEtBQUwsR0FBV0MsR0FBWDtBQUNBLFVBQU8sZUFBS0MsTUFBTCxDQUFZSixJQUFaLENBQVA7QUFDQSxHQUpZO0FBQUE7QUFETSxDQUFiOztBQVFBLElBQU1LLGdEQUNSUixNQURRLEVBQ0MsWUFBNkI7QUFBQSxLQUE1QlMsS0FBNEIsdUVBQXRCLEVBQXNCO0FBQUE7QUFBQSxLQUFqQkMsSUFBaUIsUUFBakJBLElBQWlCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUN6QyxRQUFPRixLQUFQO0FBQ0csQ0FIUSxDQUFOOztBQU1BLElBQU1HLDRCQUFRLFNBQVJBLE9BQVE7QUFBQSxLQUFFVCxJQUFGLFNBQUVBLElBQUY7QUFBQSxLQUFPVSxRQUFQLFNBQU9BLFFBQVA7QUFBQSxLQUFrQkMsTUFBbEIsU0FBa0JBLE1BQWxCO0FBQUEsUUFDcEI7QUFBQTtBQUFBO0FBQ0Msd0RBQVUsYUFBWSxjQUF0QjtBQUNDLGdCQUNDLGlEQUFPLEtBQUtYLEtBQUtFLEtBQWpCO0FBQ0MsYUFBUztBQUFBLFlBQUtRLFNBQVNaLE9BQU9DLFlBQVAsQ0FBb0JJLEdBQXBCLENBQVQsQ0FBTDtBQUFBLEtBRFY7QUFFQyxlQUFXLElBQUUsQ0FGZCxFQUVpQixPQUFPLEdBRnhCLEVBRTZCLFFBQVEsR0FGckMsR0FGRjtBQU1DLFVBQU8sRUFBQ1MsUUFBTyxHQUFSLEVBTlIsR0FERDtBQVNDLDBEQVREO0FBVUMsd0RBQVUsYUFBWSxjQUF0QixFQUEyQixXQUFXO0FBQUE7QUFBQTtBQUFPWixTQUFLYTtBQUFaLElBQXRDLEdBVkQ7QUFZQywwREFaRDtBQWFDLHdEQUFVLGFBQVksY0FBdEIsRUFBMkIsV0FBVztBQUFBO0FBQUE7QUFBT2IsU0FBS2M7QUFBWixJQUF0QyxHQWJEO0FBZUMsMERBZkQ7QUFnQkMsd0RBQVUsYUFBWSxjQUF0QixFQUEyQixXQUFXO0FBQUE7QUFBQTtBQUFPZCxTQUFLZSxNQUFMLElBQWE7QUFBcEIsSUFBdEMsR0FoQkQ7QUFrQkMsMERBbEJEO0FBbUJDLHdEQUFVLGFBQVksY0FBdEIsRUFBMkIsV0FBVztBQUFBO0FBQUE7QUFBT2YsU0FBS2dCO0FBQVosSUFBdEMsR0FuQkQ7QUFxQkMsMERBckJEO0FBc0JDLHdEQUFVLGFBQVksMEJBQXRCLEVBQTZCLFdBQVc7QUFBQTtBQUFBO0FBQU9oQixTQUFLaUI7QUFBWixJQUF4QztBQXRCRCxFQURvQjtBQUFBLENBQWQ7O0FBMkJQUixRQUFRUyxZQUFSLEdBQXFCLEVBQUNQLFFBQU8saUJBQVVRLE1BQWxCLEVBQXJCOztrQkFHZUMsT0FBT0MsTUFBUCxDQUFjWixPQUFkLEVBQXNCLEVBQUNaLGNBQUQsRUFBU0MsY0FBVCxFQUFpQk8sZ0JBQWpCLEVBQXRCLEMiLCJmaWxlIjoidXNlci1wcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7QXZhdGFyLCBMaXN0LCBMaXN0SXRlbSwgRGl2aWRlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5cclxuaW1wb3J0IFBob3RvIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG9cIlxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi9kYi91c2VyXCJcclxuXHJcbmV4cG9ydCBjb25zdCBET01BSU49XCJwcm9maWxlXCJcclxuZXhwb3J0IGNvbnN0IEFDVElPTj17XHJcblx0VVBEQVRFX1BIT1RPOnVybD0+ZGlzcGF0Y2g9PntcclxuXHRcdGNvbnN0IHVzZXI9VXNlci5jdXJyZW50XHJcblx0XHR1c2VyLnBob3RvPXVybFxyXG5cdFx0cmV0dXJuIFVzZXIudXBzZXJ0KHVzZXIpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUkVEVUNFUj17XHJcbiAgICBbRE9NQUlOXTogKHN0YXRlPXt9LCB7dHlwZSwgcGF5bG9hZH0pPT57XHJcblx0XHRyZXR1cm4gc3RhdGVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFByb2ZpbGU9KHt1c2VyLGRpc3BhdGNofSx7cm91dGVyfSk9PihcclxuXHQ8TGlzdD5cclxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuWktOWDj1wiXHJcblx0XHRcdHJpZ2h0QXZhdGFyPXtcclxuXHRcdFx0XHQ8UGhvdG8gc3JjPXt1c2VyLnBob3RvfVxyXG5cdFx0XHRcdFx0b25QaG90bz17dXJsPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFX1BIT1RPKHVybCkpfVxyXG5cdFx0XHRcdFx0aWNvblJhdGlvPXsyLzN9IHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfS8+XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRzdHlsZT17e2hlaWdodDoxMDB9fS8+XHJcblxyXG5cdFx0PERpdmlkZXIvPlxyXG5cdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5biQ5Y+3XCIgcmlnaHRJY29uPXs8c3Bhbj57dXNlci5uYW1lfTwvc3Bhbj59Lz5cclxuXHJcblx0XHQ8RGl2aWRlci8+XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLmmLXnp7BcIiByaWdodEljb249ezxzcGFuPnt1c2VyLm5pY2t9PC9zcGFuPn0vPlxyXG5cclxuXHRcdDxEaXZpZGVyLz5cclxuXHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuaAp+WIq1wiIHJpZ2h0SWNvbj17PHNwYW4+e3VzZXIuZ2VuZGVyfHxcIueUt1wifTwvc3Bhbj59Lz5cclxuXHJcblx0XHQ8RGl2aWRlci8+XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLlnLDlnYBcIiByaWdodEljb249ezxzcGFuPnt1c2VyLmxvY2F0aW9ufTwvc3Bhbj59Lz5cclxuXHJcblx0XHQ8RGl2aWRlci8+XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLkuKrmgKfnrb7lkI1cIiByaWdodEljb249ezxzcGFuPnt1c2VyLnNpZ259PC9zcGFuPn0vPlxyXG5cdDwvTGlzdD5cclxuKVxyXG5cclxuUHJvZmlsZS5jb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oUHJvZmlsZSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxyXG4iXX0=