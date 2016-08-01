"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _list = require("./components/list");

var _list2 = _interopRequireDefault(_list);

var _photo = require("./components/photo");

var _photo2 = _interopRequireDefault(_photo);

var _user = require("./db/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = function (_Component) {
	_inherits(Profile, _Component);

	function Profile() {
		_classCallCheck(this, Profile);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Profile).apply(this, arguments));
	}

	_createClass(Profile, [{
		key: "render",
		value: function render() {
			var user = _user2.default.current,
			    router = this.context.router,
			    avatar;
			if (user.photo) avatar = _react2.default.createElement(_materialUi.Avatar, { src: user.photo });else {
				avatar = _react2.default.createElement(_photo2.default, {
					onPhoto: function onPhoto(url) {
						user.photo = url;_user2.default.upsert(user);
					},
					iconRatio: 2 / 3, width: 100, height: 100 });
			}
			return _react2.default.createElement(
				_list2.default,
				null,
				_react2.default.createElement(_list2.default.Item, { primaryText: "头像", rightAvatar: avatar, style: { height: 100 } }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "帐号", rightIcon: _react2.default.createElement(
						"span",
						null,
						user.name
					) }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "昵称", rightIcon: _react2.default.createElement(
						"span",
						null,
						user.nick
					) }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "性别", rightIcon: _react2.default.createElement(
						"span",
						null,
						user.gender || "男"
					) }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "地址", rightIcon: _react2.default.createElement(
						"span",
						null,
						user.location
					) }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "个性签名", rightIcon: _react2.default.createElement(
						"span",
						null,
						user.sign
					) })
			);
		}
	}]);

	return Profile;
}(_react.Component);

exports.default = Profile;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCOzs7Ozs7Ozs7OzsyQkFDWjtBQUNQLE9BQUksT0FBSyxlQUFLLE9BQUw7T0FDUCxTQUFPLEtBQUssT0FBTCxDQUFhLE1BQWI7T0FDUCxNQUZGLENBRE87QUFJRCxPQUFHLEtBQUssS0FBTCxFQUNDLFNBQU8sb0RBQVEsS0FBSyxLQUFLLEtBQUwsRUFBYixDQUFQLENBREosS0FFSztBQUNELGFBQU87QUFDSCxjQUFTLGlCQUFDLEdBQUQsRUFBTztBQUFDLFdBQUssS0FBTCxHQUFXLEdBQVgsQ0FBRCxjQUFnQixDQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQWhCO01BQVA7QUFDVCxnQkFBVyxJQUFFLENBQUYsRUFBSyxPQUFPLEdBQVAsRUFBWSxRQUFRLEdBQVIsRUFGekIsQ0FBUCxDQURDO0lBRkw7QUFPTixVQUNDOzs7SUFDQyw2Q0FBTSxJQUFOLElBQVcsYUFBWSxJQUFaLEVBQWlCLGFBQWEsTUFBYixFQUFxQixPQUFPLEVBQUMsUUFBTyxHQUFQLEVBQVIsRUFBakQsQ0FERDtJQUVDLDZDQUFNLE9BQU4sT0FGRDtJQUdDLDZDQUFNLElBQU4sSUFBVyxhQUFZLElBQVosRUFBaUIsV0FBVzs7O01BQU8sS0FBSyxJQUFMO01BQWxCLEVBQTVCLENBSEQ7SUFJQyw2Q0FBTSxPQUFOLE9BSkQ7SUFLQyw2Q0FBTSxJQUFOLElBQVcsYUFBWSxJQUFaLEVBQWlCLFdBQVc7OztNQUFPLEtBQUssSUFBTDtNQUFsQixFQUE1QixDQUxEO0lBTUMsNkNBQU0sT0FBTixPQU5EO0lBT0MsNkNBQU0sSUFBTixJQUFXLGFBQVksSUFBWixFQUFpQixXQUFXOzs7TUFBTyxLQUFLLE1BQUwsSUFBYSxHQUFiO01BQWxCLEVBQTVCLENBUEQ7SUFRQyw2Q0FBTSxPQUFOLE9BUkQ7SUFTQyw2Q0FBTSxJQUFOLElBQVcsYUFBWSxJQUFaLEVBQWlCLFdBQVc7OztNQUFPLEtBQUssUUFBTDtNQUFsQixFQUE1QixDQVREO0lBVUMsNkNBQU0sT0FBTixPQVZEO0lBV0MsNkNBQU0sSUFBTixJQUFXLGFBQVksTUFBWixFQUFtQixXQUFXOzs7TUFBTyxLQUFLLElBQUw7TUFBbEIsRUFBOUIsQ0FYRDtJQURELENBWE87Ozs7UUFEWSIsImZpbGUiOiJ1c2VyLXByb2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IExpc3QgZnJvbSBcIi4vY29tcG9uZW50cy9saXN0XCJcclxuaW1wb3J0IFBob3RvIGZyb20gXCIuL2NvbXBvbmVudHMvcGhvdG9cIlxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi9kYi91c2VyXCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9maWxlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0dmFyIHVzZXI9VXNlci5jdXJyZW50XHJcblx0XHRcdCxyb3V0ZXI9dGhpcy5jb250ZXh0LnJvdXRlclxyXG5cdFx0XHQsYXZhdGFyXHJcbiAgICAgICAgaWYodXNlci5waG90bylcclxuICAgICAgICAgICAgYXZhdGFyPTxBdmF0YXIgc3JjPXt1c2VyLnBob3RvfS8+XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF2YXRhcj08UGhvdG9cclxuICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT57dXNlci5waG90bz11cmw7VXNlci51cHNlcnQodXNlcil9fVxyXG4gICAgICAgICAgICAgICAgaWNvblJhdGlvPXsyLzN9IHdpZHRoPXsxMDB9IGhlaWdodD17MTAwfS8+XHJcbiAgICAgICAgfVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PExpc3Q+XHJcblx0XHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWktOWDj1wiIHJpZ2h0QXZhdGFyPXthdmF0YXJ9IHN0eWxlPXt7aGVpZ2h0OjEwMH19Lz5cclxuXHRcdFx0XHQ8TGlzdC5EaXZpZGVyLz5cclxuXHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5biQ5Y+3XCIgcmlnaHRJY29uPXs8c3Bhbj57dXNlci5uYW1lfTwvc3Bhbj59Lz5cclxuXHRcdFx0XHQ8TGlzdC5EaXZpZGVyLz5cclxuXHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5pi156ewXCIgcmlnaHRJY29uPXs8c3Bhbj57dXNlci5uaWNrfTwvc3Bhbj59Lz5cclxuXHRcdFx0XHQ8TGlzdC5EaXZpZGVyLz5cdFx0XHRcclxuXHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5oCn5YirXCIgcmlnaHRJY29uPXs8c3Bhbj57dXNlci5nZW5kZXJ8fFwi55S3XCJ9PC9zcGFuPn0vPlxyXG5cdFx0XHRcdDxMaXN0LkRpdmlkZXIvPlxyXG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLlnLDlnYBcIiByaWdodEljb249ezxzcGFuPnt1c2VyLmxvY2F0aW9ufTwvc3Bhbj59Lz5cclxuXHRcdFx0XHQ8TGlzdC5EaXZpZGVyLz5cclxuXHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5Liq5oCn562+5ZCNXCIgcmlnaHRJY29uPXs8c3Bhbj57dXNlci5zaWdufTwvc3Bhbj59Lz5cclxuXHRcdFx0PC9MaXN0PlxyXG5cdFx0KVxyXG5cdH1cclxufSJdfQ==