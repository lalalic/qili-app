"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Account = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Account = exports.Account = function Account(_ref, _ref2) {
	var children = _ref.children;
	var router = _ref2.router;

	var user = _user2.default.current,
	    avatar = void 0;
	if (user.photo) avatar = _react2.default.createElement(_materialUi.Avatar, { src: user.photo });else {
		avatar = _react2.default.createElement(_photo2.default, { iconRatio: 2 / 3, width: 40, height: 40,
			onPhoto: function onPhoto(url) {
				user.photo = url;
				_user2.default.upsert(user);
			}
		});
	}

	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			_materialUi.List,
			null,
			_react2.default.createElement(_materialUi.ListItem, { primaryText: user.name || user.username,
				leftAvatar: avatar,
				rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
				onClick: function onClick(e) {
					return router.push('my/profile');
				}
			}),
			_react2.default.createElement(_materialUi.Divider, { inset: true }),
			children,
			_react2.default.createElement(_materialUi.Divider, { inset: true }),
			_react2.default.createElement(_materialUi.ListItem, { primaryText: "\u8BBE\u7F6E",
				leftIcon: _react2.default.createElement(_settings2.default, null),
				rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
				onClick: function onClick(e) {
					return router.push('my/setting');
				}
			})
		)
	);
};

Account.contextTypes = {
	router: _react2.default.PropTypes.object
};

exports.default = Account;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FjY291bnQuanMiXSwibmFtZXMiOlsiQWNjb3VudCIsImNoaWxkcmVuIiwicm91dGVyIiwidXNlciIsImN1cnJlbnQiLCJhdmF0YXIiLCJwaG90byIsInVybCIsInVwc2VydCIsIm5hbWUiLCJ1c2VybmFtZSIsInB1c2giLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7OztBQUdPLElBQU1BLDRCQUFRLFNBQVJBLE9BQVEsY0FBdUI7QUFBQSxLQUFyQkMsUUFBcUIsUUFBckJBLFFBQXFCO0FBQUEsS0FBVkMsTUFBVSxTQUFWQSxNQUFVOztBQUMzQyxLQUFJQyxPQUFLLGVBQUtDLE9BQWQ7QUFBQSxLQUFzQkMsZUFBdEI7QUFDQSxLQUFHRixLQUFLRyxLQUFSLEVBQ0NELFNBQVEsb0RBQVEsS0FBS0YsS0FBS0csS0FBbEIsR0FBUixDQURELEtBRUs7QUFDSkQsV0FBUSxpREFBTyxXQUFXLElBQUUsQ0FBcEIsRUFBdUIsT0FBTyxFQUE5QixFQUFrQyxRQUFRLEVBQTFDO0FBQ04sWUFBUyxzQkFBSztBQUNiRixTQUFLRyxLQUFMLEdBQVdDLEdBQVg7QUFDQSxtQkFBS0MsTUFBTCxDQUFZTCxJQUFaO0FBQ0E7QUFKSyxJQUFSO0FBTUE7O0FBRUQsUUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUE7QUFDQyx5REFBVSxhQUFhQSxLQUFLTSxJQUFMLElBQVdOLEtBQUtPLFFBQXZDO0FBQ0MsZ0JBQVlMLE1BRGI7QUFFQyxlQUFXLGlFQUZaO0FBR0MsYUFBUztBQUFBLFlBQUdILE9BQU9TLElBQVAsQ0FBWSxZQUFaLENBQUg7QUFBQTtBQUhWLEtBREQ7QUFPQyx3REFBUyxPQUFPLElBQWhCLEdBUEQ7QUFTRVYsV0FURjtBQVdDLHdEQUFTLE9BQU8sSUFBaEIsR0FYRDtBQWFDLHlEQUFVLGFBQVksY0FBdEI7QUFDQyxjQUFVLHVEQURYO0FBRUMsZUFBVyxpRUFGWjtBQUdDLGFBQVM7QUFBQSxZQUFHQyxPQUFPUyxJQUFQLENBQVksWUFBWixDQUFIO0FBQUE7QUFIVjtBQWJEO0FBREQsRUFERDtBQXVCQSxDQXBDTTs7QUFzQ1BYLFFBQVFZLFlBQVIsR0FBcUI7QUFDcEJWLFNBQU8sZ0JBQU1XLFNBQU4sQ0FBZ0JDO0FBREgsQ0FBckI7O2tCQUllZCxPIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7QXZhdGFyLExpc3QsIExpc3RJdGVtLCBEaXZpZGVyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgU2V0dGluZ0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZXR0aW5ncydcclxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZC1jaXJjbGUtb3V0bGluZVwiXHJcbmltcG9ydCBJY29uSXRlbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0XCJcclxuXHJcbmltcG9ydCBQaG90byBmcm9tIFwiLi9waG90b1wiXHJcbmltcG9ydCBVc2VyIGZyb20gXCIuLi9kYi91c2VyXCJcclxuXHJcblxyXG5leHBvcnQgY29uc3QgQWNjb3VudD0oe2NoaWxkcmVufSx7cm91dGVyfSk9PntcclxuXHRsZXQgdXNlcj1Vc2VyLmN1cnJlbnQsYXZhdGFyXHJcblx0aWYodXNlci5waG90bylcclxuXHRcdGF2YXRhcj0oPEF2YXRhciBzcmM9e3VzZXIucGhvdG99Lz4pXHJcblx0ZWxzZSB7XHJcblx0XHRhdmF0YXI9KDxQaG90byBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfVxyXG5cdFx0XHRcdG9uUGhvdG89e3VybD0+e1xyXG5cdFx0XHRcdFx0dXNlci5waG90bz11cmxcclxuXHRcdFx0XHRcdFVzZXIudXBzZXJ0KHVzZXIpXHJcblx0XHRcdFx0fX1cclxuXHRcdFx0XHQvPilcclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2PlxyXG5cdFx0XHQ8TGlzdD5cclxuXHRcdFx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9e3VzZXIubmFtZXx8dXNlci51c2VybmFtZX1cclxuXHRcdFx0XHRcdGxlZnRBdmF0YXI9e2F2YXRhcn1cclxuXHRcdFx0XHRcdHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn0gXHJcblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5yb3V0ZXIucHVzaCgnbXkvcHJvZmlsZScpfVx0XHJcblx0XHRcdFx0XHQvPlxyXG5cclxuXHRcdFx0XHQ8RGl2aWRlciBpbnNldD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0PERpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PVwi6K6+572uXCJcclxuXHRcdFx0XHRcdGxlZnRJY29uPXs8U2V0dGluZ0ljb24vPn1cclxuXHRcdFx0XHRcdHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnJvdXRlci5wdXNoKCdteS9zZXR0aW5nJyl9XHJcblx0XHRcdFx0XHQvPlxyXG5cdFx0XHQ8L0xpc3Q+XHJcblx0XHQ8L2Rpdj5cclxuXHQpXHJcbn1cclxuXHJcbkFjY291bnQuY29udGV4dFR5cGVzPXtcclxuXHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBY2NvdW50XHJcblxyXG4iXX0=