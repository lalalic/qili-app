"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Account = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _settings = require("material-ui/svg-icons/action/settings");

var _settings2 = _interopRequireDefault(_settings);

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _photo = require("./photo");

var _photo2 = _interopRequireDefault(_photo);

var _user = require("../db/user");

var _user2 = _interopRequireDefault(_user);

var _userProfile = require("../user-profile");

var _2 = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = exports.Account = function Account(_ref, _ref2) {
	var name = _ref.name,
	    photo = _ref.photo,
	    username = _ref.username,
	    children = _ref.children;
	var router = _ref2.router;

	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			_materialUi.List,
			null,
			_react2.default.createElement(_materialUi.ListItem, { primaryText: name || username,
				leftAvatar: _react2.default.createElement(_photo2.default, { src: photo, iconRatio: 2 / 3, width: 40, height: 40,
					onPhoto: function onPhoto(url) {
						return dispatch(_userProfile.ACTION.UPDATE_PHOTO(url));
					} }),
				rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
				onClick: function onClick(e) {
					return router.push("/my/profile");
				}
			}),
			_react2.default.createElement(_materialUi.Divider, { inset: true }),
			children,
			_react2.default.createElement(_materialUi.Divider, { inset: true }),
			_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u8BBE\u7F6E",
				leftIcon: _react2.default.createElement(_settings2.default, null),
				rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
				onClick: function onClick(e) {
					return router.push("/my/setting");
				}
			})
		)
	);
};

Account.contextTypes = {
	router: _react.PropTypes.object
};

exports.default = (0, _reactRedux.connect)(function (state) {
	return _lodash2.default.pick(state.qiliApp.user, "name", "username", "photo");
})(Account);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FjY291bnQuanMiXSwibmFtZXMiOlsiQWNjb3VudCIsIm5hbWUiLCJwaG90byIsInVzZXJuYW1lIiwiY2hpbGRyZW4iLCJyb3V0ZXIiLCJkaXNwYXRjaCIsIlVQREFURV9QSE9UTyIsInVybCIsInB1c2giLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJwaWNrIiwic3RhdGUiLCJxaWxpQXBwIiwidXNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFHTyxJQUFNQSw0QkFBUSxTQUFSQSxPQUFRLGNBQThDO0FBQUEsS0FBNUNDLElBQTRDLFFBQTVDQSxJQUE0QztBQUFBLEtBQXRDQyxLQUFzQyxRQUF0Q0EsS0FBc0M7QUFBQSxLQUEvQkMsUUFBK0IsUUFBL0JBLFFBQStCO0FBQUEsS0FBckJDLFFBQXFCLFFBQXJCQSxRQUFxQjtBQUFBLEtBQVZDLE1BQVUsU0FBVkEsTUFBVTs7QUFDbEUsUUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUE7QUFDQyx5REFBVSxhQUFhSixRQUFNRSxRQUE3QjtBQUNDLGdCQUNDLGlEQUFPLEtBQUtELEtBQVosRUFBbUIsV0FBVyxJQUFFLENBQWhDLEVBQW1DLE9BQU8sRUFBMUMsRUFBOEMsUUFBUSxFQUF0RDtBQUNDLGNBQVM7QUFBQSxhQUFLSSxTQUFTLG9CQUFPQyxZQUFQLENBQW9CQyxHQUFwQixDQUFULENBQUw7QUFBQSxNQURWLEdBRkY7QUFLQyxlQUFXLGlFQUxaO0FBTUMsYUFBUztBQUFBLFlBQUdILE9BQU9JLElBQVAsQ0FBWSxhQUFaLENBQUg7QUFBQTtBQU5WLEtBREQ7QUFVQyx3REFBUyxPQUFPLElBQWhCLEdBVkQ7QUFZRUwsV0FaRjtBQWNDLHdEQUFTLE9BQU8sSUFBaEIsR0FkRDtBQWdCQyx5REFBVSxhQUFZLGNBQXRCO0FBQ0MsY0FBVSx1REFEWDtBQUVDLGVBQVcsaUVBRlo7QUFHQyxhQUFTO0FBQUEsWUFBR0MsT0FBT0ksSUFBUCxDQUFZLGFBQVosQ0FBSDtBQUFBO0FBSFY7QUFoQkQ7QUFERCxFQUREO0FBMEJBLENBM0JNOztBQTZCUFQsUUFBUVUsWUFBUixHQUFxQjtBQUNwQkwsU0FBUSxpQkFBVU07QUFERSxDQUFyQjs7a0JBSWUseUJBQVE7QUFBQSxRQUFPLGlCQUFFQyxJQUFGLENBQU9DLE1BQU1DLE9BQU4sQ0FBY0MsSUFBckIsRUFBMEIsTUFBMUIsRUFBaUMsVUFBakMsRUFBNEMsT0FBNUMsQ0FBUDtBQUFBLENBQVIsRUFBcUVmLE9BQXJFLEMiLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0F2YXRhcixMaXN0LCBMaXN0SXRlbSwgRGl2aWRlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCJcclxuXHJcbmltcG9ydCBSaWdodEFycm93IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodCdcclxuaW1wb3J0IFNldHRpbmdJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2V0dGluZ3MnXHJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQtY2lyY2xlLW91dGxpbmVcIlxyXG5pbXBvcnQgSWNvbkl0ZW0gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodFwiXHJcblxyXG5pbXBvcnQgUGhvdG8gZnJvbSBcIi4vcGhvdG9cIlxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vZGIvdXNlclwiXHJcbmltcG9ydCB7QUNUSU9OfSBmcm9tIFwiLi4vdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IHtjb21wYWN0fSBmcm9tIFwiLi5cIlxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBBY2NvdW50PSh7bmFtZSwgcGhvdG8sIHVzZXJuYW1lLCBjaGlsZHJlbn0se3JvdXRlcn0pPT57XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXY+XHJcblx0XHRcdDxMaXN0PlxyXG5cdFx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD17bmFtZXx8dXNlcm5hbWV9XHJcblx0XHRcdFx0XHRsZWZ0QXZhdGFyPXtcclxuXHRcdFx0XHRcdFx0PFBob3RvIHNyYz17cGhvdG99IGljb25SYXRpbz17Mi8zfSB3aWR0aD17NDB9IGhlaWdodD17NDB9XHJcblx0XHRcdFx0XHRcdFx0b25QaG90bz17dXJsPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFX1BIT1RPKHVybCkpfS8+XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyaWdodEljb249ezxSaWdodEFycm93Lz59XHJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChcIi9teS9wcm9maWxlXCIpfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHJcblx0XHRcdFx0PERpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cclxuXHRcdFx0XHQ8RGl2aWRlciBpbnNldD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLorr7nva5cIlxyXG5cdFx0XHRcdFx0bGVmdEljb249ezxTZXR0aW5nSWNvbi8+fVxyXG5cdFx0XHRcdFx0cmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fVxyXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+cm91dGVyLnB1c2goXCIvbXkvc2V0dGluZ1wiKX1cclxuXHRcdFx0XHRcdC8+XHJcblx0XHRcdDwvTGlzdD5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuQWNjb3VudC5jb250ZXh0VHlwZXM9e1xyXG5cdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHN0YXRlPT5fLnBpY2soc3RhdGUucWlsaUFwcC51c2VyLFwibmFtZVwiLFwidXNlcm5hbWVcIixcInBob3RvXCIpKShBY2NvdW50KVxyXG4iXX0=