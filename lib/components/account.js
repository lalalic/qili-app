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

var _ = require("..");

var _checkUpdate = require("./check-update");

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

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
			_react2.default.createElement(_materialUi.ListItem, { primaryText: _react2.default.createElement(
					_checkUpdate2.default,
					null,
					"\u8BBE\u7F6E"
				),
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
	return (0, _.compact)(state.qiliApp.user, "name", "username", "photo");
})(Account);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FjY291bnQuanMiXSwibmFtZXMiOlsiQWNjb3VudCIsIm5hbWUiLCJwaG90byIsInVzZXJuYW1lIiwiY2hpbGRyZW4iLCJyb3V0ZXIiLCJkaXNwYXRjaCIsIlVQREFURV9QSE9UTyIsInVybCIsInB1c2giLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJzdGF0ZSIsInFpbGlBcHAiLCJ1c2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUdPLElBQU1BLDRCQUFRLFNBQVJBLE9BQVEsY0FBOEM7QUFBQSxLQUE1Q0MsSUFBNEMsUUFBNUNBLElBQTRDO0FBQUEsS0FBdENDLEtBQXNDLFFBQXRDQSxLQUFzQztBQUFBLEtBQS9CQyxRQUErQixRQUEvQkEsUUFBK0I7QUFBQSxLQUFyQkMsUUFBcUIsUUFBckJBLFFBQXFCO0FBQUEsS0FBVkMsTUFBVSxTQUFWQSxNQUFVOztBQUNsRSxRQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQTtBQUNDLHlEQUFVLGFBQWFKLFFBQU1FLFFBQTdCO0FBQ0MsZ0JBQ0MsaURBQU8sS0FBS0QsS0FBWixFQUFtQixXQUFXLElBQUUsQ0FBaEMsRUFBbUMsT0FBTyxFQUExQyxFQUE4QyxRQUFRLEVBQXREO0FBQ0MsY0FBUztBQUFBLGFBQUtJLFNBQVMsb0JBQU9DLFlBQVAsQ0FBb0JDLEdBQXBCLENBQVQsQ0FBTDtBQUFBLE1BRFYsR0FGRjtBQUtDLGVBQVcsaUVBTFo7QUFNQyxhQUFTO0FBQUEsWUFBR0gsT0FBT0ksSUFBUCxDQUFZLGFBQVosQ0FBSDtBQUFBO0FBTlYsS0FERDtBQVVDLHdEQUFTLE9BQU8sSUFBaEIsR0FWRDtBQVlFTCxXQVpGO0FBY0Msd0RBQVMsT0FBTyxJQUFoQixHQWREO0FBZ0JDLHlEQUFVLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF2QjtBQUNDLGNBQVUsdURBRFg7QUFFQyxlQUFXLGlFQUZaO0FBR0MsYUFBUztBQUFBLFlBQUdDLE9BQU9JLElBQVAsQ0FBWSxhQUFaLENBQUg7QUFBQTtBQUhWO0FBaEJEO0FBREQsRUFERDtBQTBCQSxDQTNCTTs7QUE2QlBULFFBQVFVLFlBQVIsR0FBcUI7QUFDcEJMLFNBQVEsaUJBQVVNO0FBREUsQ0FBckI7O2tCQUllLHlCQUFRO0FBQUEsUUFBTyxlQUFRQyxNQUFNQyxPQUFOLENBQWNDLElBQXRCLEVBQTJCLE1BQTNCLEVBQWtDLFVBQWxDLEVBQTZDLE9BQTdDLENBQVA7QUFBQSxDQUFSLEVBQXNFZCxPQUF0RSxDIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtBdmF0YXIsTGlzdCwgTGlzdEl0ZW0sIERpdmlkZXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBSaWdodEFycm93IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodCdcclxuaW1wb3J0IFNldHRpbmdJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2V0dGluZ3MnXHJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQtY2lyY2xlLW91dGxpbmVcIlxyXG5pbXBvcnQgSWNvbkl0ZW0gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodFwiXHJcblxyXG5pbXBvcnQgUGhvdG8gZnJvbSBcIi4vcGhvdG9cIlxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vZGIvdXNlclwiXHJcbmltcG9ydCB7QUNUSU9OfSBmcm9tIFwiLi4vdXNlci1wcm9maWxlXCJcclxuaW1wb3J0IHtjb21wYWN0fSBmcm9tIFwiLi5cIlxyXG5pbXBvcnQgQ2hlY2tVcGRhdGUgZnJvbSBcIi4vY2hlY2stdXBkYXRlXCJcclxuXHJcblxyXG5leHBvcnQgY29uc3QgQWNjb3VudD0oe25hbWUsIHBob3RvLCB1c2VybmFtZSwgY2hpbGRyZW59LHtyb3V0ZXJ9KT0+e1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHQ8TGlzdD5cclxuXHRcdFx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9e25hbWV8fHVzZXJuYW1lfVxyXG5cdFx0XHRcdFx0bGVmdEF2YXRhcj17XHJcblx0XHRcdFx0XHRcdDxQaG90byBzcmM9e3Bob3RvfSBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfVxyXG5cdFx0XHRcdFx0XHRcdG9uUGhvdG89e3VybD0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURV9QSE9UTyh1cmwpKX0vPlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fVxyXG5cdFx0XHRcdFx0b25DbGljaz17ZT0+cm91dGVyLnB1c2goXCIvbXkvcHJvZmlsZVwiKX1cclxuXHRcdFx0XHRcdC8+XHJcblxyXG5cdFx0XHRcdDxEaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdHtjaGlsZHJlbn1cclxuXHJcblx0XHRcdFx0PERpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PXs8Q2hlY2tVcGRhdGU+6K6+572uPC9DaGVja1VwZGF0ZT59XHJcblx0XHRcdFx0XHRsZWZ0SWNvbj17PFNldHRpbmdJY29uLz59XHJcblx0XHRcdFx0XHRyaWdodEljb249ezxSaWdodEFycm93Lz59XHJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChcIi9teS9zZXR0aW5nXCIpfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0PC9MaXN0PlxyXG5cdFx0PC9kaXY+XHJcblx0KVxyXG59XHJcblxyXG5BY2NvdW50LmNvbnRleHRUeXBlcz17XHJcblx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUucWlsaUFwcC51c2VyLFwibmFtZVwiLFwidXNlcm5hbWVcIixcInBob3RvXCIpKShBY2NvdW50KVxyXG4iXX0=