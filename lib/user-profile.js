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
	var _ref2$valueStyle = _ref2.valueStyle;
	var valueStyle = _ref2$valueStyle === undefined ? { color: "lightgray" } : _ref2$valueStyle;
	return _react2.default.createElement(
		_materialUi.List,
		{ style: { padding: 5 } },
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
				{ style: valueStyle },
				name
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u6027\u522B", rightIcon: _react2.default.createElement(
				"span",
				{ style: valueStyle },
				gender || "男"
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5730\u5740", rightIcon: _react2.default.createElement(
				"span",
				{ style: valueStyle },
				location
			) }),
		_react2.default.createElement(_materialUi.Divider, null),
		_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u4E2A\u6027\u7B7E\u540D", rightIcon: _react2.default.createElement(
				"span",
				{ style: valueStyle },
				signature
			) })
	);
};

exports.default = (0, _assign2.default)((0, _reactRedux.connect)(function (state) {
	return (0, _.compact)(state.qiliApp.user, "name", "nick", "gender", "location", "photo", "signature");
})(Profile), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFX1BIT1RPIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInVzZXIiLCJxaWxpQXBwIiwicGhvdG8iLCJ1cmwiLCJ1cHNlcnQiLCJ0aGVuIiwiVVNFUl9DSEFOR0VEIiwidXBkYXRlZCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsIm5hbWUiLCJuaWNrIiwiZ2VuZGVyIiwibG9jYXRpb24iLCJzaWduYXR1cmUiLCJ2YWx1ZVN0eWxlIiwiY29sb3IiLCJwYWRkaW5nIiwiaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFTyxJQUFNQSwwQkFBTyxTQUFiO0FBQ0EsSUFBTUMsMEJBQU87QUFDbkJDLGVBQWE7QUFBQSxTQUFLLFVBQUNDLFFBQUQsRUFBVUMsUUFBVixFQUFxQjtBQUN0QyxPQUFNQyxPQUFLRCxXQUFXRSxPQUFYLENBQW1CRCxJQUE5QjtBQUNBQSxRQUFLRSxLQUFMLEdBQVdDLEdBQVg7QUFDQSxrQkFBS0MsTUFBTCxDQUFZSixJQUFaLEVBQWtCSyxJQUFsQixDQUF1QjtBQUFBLFdBQVNQLFNBQVMsa0JBQVFGLE1BQVIsQ0FBZVUsWUFBZixDQUE0QkMsT0FBNUIsQ0FBVCxDQUFUO0FBQUEsSUFBdkI7QUFDQSxHQUpZO0FBQUE7QUFETSxDQUFiOztBQVFBLElBQU1DLDRCQUFRLFNBQVJBLE9BQVEsR0FBNkI7QUFBQSxLQUE1QkMsS0FBNEIsdUVBQXRCLEVBQXNCO0FBQUE7QUFBQSxLQUFqQkMsSUFBaUIsUUFBakJBLElBQWlCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUNqRCxRQUFPRixLQUFQO0FBQ0EsQ0FGTTs7QUFJQSxJQUFNRyw0QkFBUSxTQUFSQSxPQUFRO0FBQUEsS0FBRUMsSUFBRixTQUFFQSxJQUFGO0FBQUEsS0FBT0MsSUFBUCxTQUFPQSxJQUFQO0FBQUEsS0FBWUMsTUFBWixTQUFZQSxNQUFaO0FBQUEsS0FBbUJDLFFBQW5CLFNBQW1CQSxRQUFuQjtBQUFBLEtBQTRCZCxLQUE1QixTQUE0QkEsS0FBNUI7QUFBQSxLQUFrQ2UsU0FBbEMsU0FBa0NBLFNBQWxDO0FBQUEsOEJBQTZDQyxVQUE3QztBQUFBLEtBQTZDQSxVQUE3QyxvQ0FBd0QsRUFBQ0MsT0FBTSxXQUFQLEVBQXhEO0FBQUEsUUFDcEI7QUFBQTtBQUFBLElBQU0sT0FBTyxFQUFDQyxTQUFRLENBQVQsRUFBYjtBQUNDLHdEQUFVLGFBQVksY0FBdEI7QUFDQyxnQkFDQyxpREFBTyxLQUFLbEIsS0FBWjtBQUNDLGFBQVM7QUFBQSxZQUFLSixTQUFTRixPQUFPQyxZQUFQLENBQW9CTSxHQUFwQixDQUFULENBQUw7QUFBQSxLQURWO0FBRUMsZUFBVyxJQUFFLENBRmQsRUFFaUIsT0FBTyxHQUZ4QixFQUU2QixRQUFRLEdBRnJDLEdBRkY7QUFNQyxVQUFPLEVBQUNrQixRQUFPLEdBQVIsRUFOUixHQUREO0FBU0MsMERBVEQ7QUFVQyx3REFBVSxhQUFZLGNBQXRCLEVBQTJCLFdBQVc7QUFBQTtBQUFBLE1BQU0sT0FBT0gsVUFBYjtBQUEwQkw7QUFBMUIsSUFBdEMsR0FWRDtBQVlDLDBEQVpEO0FBYUMsd0RBQVUsYUFBWSxjQUF0QixFQUEyQixXQUFXO0FBQUE7QUFBQSxNQUFNLE9BQU9LLFVBQWI7QUFBMEJILGNBQVE7QUFBbEMsSUFBdEMsR0FiRDtBQWVDLDBEQWZEO0FBZ0JDLHdEQUFVLGFBQVksY0FBdEIsRUFBMkIsV0FBVztBQUFBO0FBQUEsTUFBTSxPQUFPRyxVQUFiO0FBQTBCRjtBQUExQixJQUF0QyxHQWhCRDtBQWtCQywwREFsQkQ7QUFtQkMsd0RBQVUsYUFBWSwwQkFBdEIsRUFBNkIsV0FBVztBQUFBO0FBQUEsTUFBTSxPQUFPRSxVQUFiO0FBQTBCRDtBQUExQixJQUF4QztBQW5CRCxFQURvQjtBQUFBLENBQWQ7O2tCQXdCUSxzQkFBYyx5QkFBUTtBQUFBLFFBQU8sZUFBUVIsTUFBTVIsT0FBTixDQUFjRCxJQUF0QixFQUEyQixNQUEzQixFQUFrQyxNQUFsQyxFQUF5QyxRQUF6QyxFQUFrRCxVQUFsRCxFQUE2RCxPQUE3RCxFQUFxRSxXQUFyRSxDQUFQO0FBQUEsQ0FBUixFQUFrR1ksT0FBbEcsQ0FBZCxFQUF5SCxFQUFDakIsY0FBRCxFQUFTQyxjQUFULEVBQWlCWSxnQkFBakIsRUFBekgsQyIsImZpbGUiOiJ1c2VyLXByb2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtBdmF0YXIsIExpc3QsIExpc3RJdGVtLCBEaXZpZGVyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgUGhvdG8gZnJvbSBcIi4vY29tcG9uZW50cy9waG90b1wiXHJcbmltcG9ydCBVc2VyIGZyb20gXCIuL2RiL3VzZXJcIlxyXG5pbXBvcnQgUWlsaUFwcCBmcm9tIFwiLi9xaWxpQXBwXCJcclxuaW1wb3J0IHtjb21wYWN0fSBmcm9tIFwiLlwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicHJvZmlsZVwiXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdFVQREFURV9QSE9UTzp1cmw9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IHVzZXI9Z2V0U3RhdGUoKS5xaWxpQXBwLnVzZXJcclxuXHRcdHVzZXIucGhvdG89dXJsXHJcblx0XHRVc2VyLnVwc2VydCh1c2VyKS50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKFFpbGlBcHAuQUNUSU9OLlVTRVJfQ0hBTkdFRCh1cGRhdGVkKSkpXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30sIHt0eXBlLCBwYXlsb2FkfSk9PntcclxuXHRyZXR1cm4gc3RhdGVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFByb2ZpbGU9KHtuYW1lLG5pY2ssZ2VuZGVyLGxvY2F0aW9uLHBob3RvLHNpZ25hdHVyZSwgdmFsdWVTdHlsZT17Y29sb3I6XCJsaWdodGdyYXlcIn19KT0+KFxyXG5cdDxMaXN0IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLlpLTlg49cIlxyXG5cdFx0XHRyaWdodEF2YXRhcj17XHJcblx0XHRcdFx0PFBob3RvIHNyYz17cGhvdG99XHJcblx0XHRcdFx0XHRvblBob3RvPXt1cmw9PmRpc3BhdGNoKEFDVElPTi5VUERBVEVfUEhPVE8odXJsKSl9XHJcblx0XHRcdFx0XHRpY29uUmF0aW89ezIvM30gd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9Lz5cclxuXHRcdFx0XHR9XHJcblx0XHRcdHN0eWxlPXt7aGVpZ2h0OjEwMH19Lz5cclxuXHJcblx0XHQ8RGl2aWRlci8+XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLlp5PlkI1cIiByaWdodEljb249ezxzcGFuIHN0eWxlPXt2YWx1ZVN0eWxlfT57bmFtZX08L3NwYW4+fS8+XHJcblxyXG5cdFx0PERpdmlkZXIvPlxyXG5cdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5oCn5YirXCIgcmlnaHRJY29uPXs8c3BhbiBzdHlsZT17dmFsdWVTdHlsZX0+e2dlbmRlcnx8XCLnlLdcIn08L3NwYW4+fS8+XHJcblxyXG5cdFx0PERpdmlkZXIvPlxyXG5cdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5Zyw5Z2AXCIgcmlnaHRJY29uPXs8c3BhbiBzdHlsZT17dmFsdWVTdHlsZX0+e2xvY2F0aW9ufTwvc3Bhbj59Lz5cclxuXHJcblx0XHQ8RGl2aWRlci8+XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLkuKrmgKfnrb7lkI1cIiByaWdodEljb249ezxzcGFuIHN0eWxlPXt2YWx1ZVN0eWxlfT57c2lnbmF0dXJlfTwvc3Bhbj59Lz5cclxuXHQ8L0xpc3Q+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oY29ubmVjdChzdGF0ZT0+Y29tcGFjdChzdGF0ZS5xaWxpQXBwLnVzZXIsXCJuYW1lXCIsXCJuaWNrXCIsXCJnZW5kZXJcIixcImxvY2F0aW9uXCIsXCJwaG90b1wiLFwic2lnbmF0dXJlXCIpKShQcm9maWxlKSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxyXG4iXX0=