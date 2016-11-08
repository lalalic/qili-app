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

var _2 = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = exports.Account = function Account(_ref, _ref2) {
	var name = _ref.name;
	var photo = _ref.photo;
	var username = _ref.username;
	var children = _ref.children;
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
	return _.pick(state.qiliApp.user, "name", "username", "photo");
})(Account);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FjY291bnQuanMiXSwibmFtZXMiOlsiQWNjb3VudCIsIm5hbWUiLCJwaG90byIsInVzZXJuYW1lIiwiY2hpbGRyZW4iLCJyb3V0ZXIiLCJkaXNwYXRjaCIsIlVQREFURV9QSE9UTyIsInVybCIsInB1c2giLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJfIiwicGljayIsInN0YXRlIiwicWlsaUFwcCIsInVzZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUdPLElBQU1BLDRCQUFRLFNBQVJBLE9BQVEsY0FBOEM7QUFBQSxLQUE1Q0MsSUFBNEMsUUFBNUNBLElBQTRDO0FBQUEsS0FBdENDLEtBQXNDLFFBQXRDQSxLQUFzQztBQUFBLEtBQS9CQyxRQUErQixRQUEvQkEsUUFBK0I7QUFBQSxLQUFyQkMsUUFBcUIsUUFBckJBLFFBQXFCO0FBQUEsS0FBVkMsTUFBVSxTQUFWQSxNQUFVOztBQUNsRSxRQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQTtBQUNDLHlEQUFVLGFBQWFKLFFBQU1FLFFBQTdCO0FBQ0MsZ0JBQ0MsaURBQU8sS0FBS0QsS0FBWixFQUFtQixXQUFXLElBQUUsQ0FBaEMsRUFBbUMsT0FBTyxFQUExQyxFQUE4QyxRQUFRLEVBQXREO0FBQ0MsY0FBUztBQUFBLGFBQUtJLFNBQVMsb0JBQU9DLFlBQVAsQ0FBb0JDLEdBQXBCLENBQVQsQ0FBTDtBQUFBLE1BRFYsR0FGRjtBQUtDLGVBQVcsaUVBTFo7QUFNQyxhQUFTO0FBQUEsWUFBR0gsT0FBT0ksSUFBUCxDQUFZLGFBQVosQ0FBSDtBQUFBO0FBTlYsS0FERDtBQVVDLHdEQUFTLE9BQU8sSUFBaEIsR0FWRDtBQVlFTCxXQVpGO0FBY0Msd0RBQVMsT0FBTyxJQUFoQixHQWREO0FBZ0JDLHlEQUFVLGFBQVksY0FBdEI7QUFDQyxjQUFVLHVEQURYO0FBRUMsZUFBVyxpRUFGWjtBQUdDLGFBQVM7QUFBQSxZQUFHQyxPQUFPSSxJQUFQLENBQVksYUFBWixDQUFIO0FBQUE7QUFIVjtBQWhCRDtBQURELEVBREQ7QUEwQkEsQ0EzQk07O0FBNkJQVCxRQUFRVSxZQUFSLEdBQXFCO0FBQ3BCTCxTQUFRLGlCQUFVTTtBQURFLENBQXJCOztrQkFJZSx5QkFBUTtBQUFBLFFBQU9DLEVBQUVDLElBQUYsQ0FBT0MsTUFBTUMsT0FBTixDQUFjQyxJQUFyQixFQUEwQixNQUExQixFQUFpQyxVQUFqQyxFQUE0QyxPQUE1QyxDQUFQO0FBQUEsQ0FBUixFQUFxRWhCLE9BQXJFLEMiLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0F2YXRhcixMaXN0LCBMaXN0SXRlbSwgRGl2aWRlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5cclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgU2V0dGluZ0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZXR0aW5ncydcclxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZC1jaXJjbGUtb3V0bGluZVwiXHJcbmltcG9ydCBJY29uSXRlbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0XCJcclxuXHJcbmltcG9ydCBQaG90byBmcm9tIFwiLi9waG90b1wiXHJcbmltcG9ydCBVc2VyIGZyb20gXCIuLi9kYi91c2VyXCJcclxuaW1wb3J0IHtBQ1RJT059IGZyb20gXCIuLi91c2VyLXByb2ZpbGVcIlxyXG5pbXBvcnQge2NvbXBhY3R9IGZyb20gXCIuLlwiXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEFjY291bnQ9KHtuYW1lLCBwaG90bywgdXNlcm5hbWUsIGNoaWxkcmVufSx7cm91dGVyfSk9PntcclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdj5cclxuXHRcdFx0PExpc3Q+XHJcblx0XHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PXtuYW1lfHx1c2VybmFtZX1cclxuXHRcdFx0XHRcdGxlZnRBdmF0YXI9e1xyXG5cdFx0XHRcdFx0XHQ8UGhvdG8gc3JjPXtwaG90b30gaWNvblJhdGlvPXsyLzN9IHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH1cclxuXHRcdFx0XHRcdFx0XHRvblBob3RvPXt1cmw9PmRpc3BhdGNoKEFDVElPTi5VUERBVEVfUEhPVE8odXJsKSl9Lz5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnJvdXRlci5wdXNoKFwiL215L3Byb2ZpbGVcIil9XHJcblx0XHRcdFx0XHQvPlxyXG5cclxuXHRcdFx0XHQ8RGl2aWRlciBpbnNldD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblxyXG5cdFx0XHRcdDxEaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG5cdFx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuiuvue9rlwiXHJcblx0XHRcdFx0XHRsZWZ0SWNvbj17PFNldHRpbmdJY29uLz59XHJcblx0XHRcdFx0XHRyaWdodEljb249ezxSaWdodEFycm93Lz59XHJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaChcIi9teS9zZXR0aW5nXCIpfVxyXG5cdFx0XHRcdFx0Lz5cclxuXHRcdFx0PC9MaXN0PlxyXG5cdFx0PC9kaXY+XHJcblx0KVxyXG59XHJcblxyXG5BY2NvdW50LmNvbnRleHRUeXBlcz17XHJcblx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGU9Pl8ucGljayhzdGF0ZS5xaWxpQXBwLnVzZXIsXCJuYW1lXCIsXCJ1c2VybmFtZVwiLFwicGhvdG9cIikpKEFjY291bnQpXHJcbiJdfQ==