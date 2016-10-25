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

		return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
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
				_react2.default.createElement(_list2.default.Item, { primaryText: "\u5934\u50CF", rightAvatar: avatar, style: { height: 100 } }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "\u5E10\u53F7", rightIcon: _react2.default.createElement(
						"span",
						null,
						user.name
					) }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "\u6635\u79F0", rightIcon: _react2.default.createElement(
						"span",
						null,
						user.nick
					) }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "\u6027\u522B", rightIcon: _react2.default.createElement(
						"span",
						null,
						user.gender || "男"
					) }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "\u5730\u5740", rightIcon: _react2.default.createElement(
						"span",
						null,
						user.location
					) }),
				_react2.default.createElement(_list2.default.Divider, null),
				_react2.default.createElement(_list2.default.Item, { primaryText: "\u4E2A\u6027\u7B7E\u540D", rightIcon: _react2.default.createElement(
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiUHJvZmlsZSIsInVzZXIiLCJjdXJyZW50Iiwicm91dGVyIiwiY29udGV4dCIsImF2YXRhciIsInBob3RvIiwidXJsIiwidXBzZXJ0IiwiaGVpZ2h0IiwibmFtZSIsIm5pY2siLCJnZW5kZXIiLCJsb2NhdGlvbiIsInNpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUdxQkEsTzs7Ozs7Ozs7Ozs7MkJBQ1o7QUFDUCxPQUFJQyxPQUFLLGVBQUtDLE9BQWQ7QUFBQSxPQUNFQyxTQUFPLEtBQUtDLE9BQUwsQ0FBYUQsTUFEdEI7QUFBQSxPQUVFRSxNQUZGO0FBR00sT0FBR0osS0FBS0ssS0FBUixFQUNJRCxTQUFPLG9EQUFRLEtBQUtKLEtBQUtLLEtBQWxCLEdBQVAsQ0FESixLQUVLO0FBQ0RELGFBQU87QUFDSCxjQUFTLGlCQUFDRSxHQUFELEVBQU87QUFBQ04sV0FBS0ssS0FBTCxHQUFXQyxHQUFYLENBQWUsZUFBS0MsTUFBTCxDQUFZUCxJQUFaO0FBQWtCLE1BRC9DO0FBRUgsZ0JBQVcsSUFBRSxDQUZWLEVBRWEsT0FBTyxHQUZwQixFQUV5QixRQUFRLEdBRmpDLEdBQVA7QUFHSDtBQUNQLFVBQ0M7QUFBQTtBQUFBO0FBQ0MsaURBQU0sSUFBTixJQUFXLGFBQVksY0FBdkIsRUFBNEIsYUFBYUksTUFBekMsRUFBaUQsT0FBTyxFQUFDSSxRQUFPLEdBQVIsRUFBeEQsR0FERDtBQUVDLGlEQUFNLE9BQU4sT0FGRDtBQUdDLGlEQUFNLElBQU4sSUFBVyxhQUFZLGNBQXZCLEVBQTRCLFdBQVc7QUFBQTtBQUFBO0FBQU9SLFdBQUtTO0FBQVosTUFBdkMsR0FIRDtBQUlDLGlEQUFNLE9BQU4sT0FKRDtBQUtDLGlEQUFNLElBQU4sSUFBVyxhQUFZLGNBQXZCLEVBQTRCLFdBQVc7QUFBQTtBQUFBO0FBQU9ULFdBQUtVO0FBQVosTUFBdkMsR0FMRDtBQU1DLGlEQUFNLE9BQU4sT0FORDtBQU9DLGlEQUFNLElBQU4sSUFBVyxhQUFZLGNBQXZCLEVBQTRCLFdBQVc7QUFBQTtBQUFBO0FBQU9WLFdBQUtXLE1BQUwsSUFBYTtBQUFwQixNQUF2QyxHQVBEO0FBUUMsaURBQU0sT0FBTixPQVJEO0FBU0MsaURBQU0sSUFBTixJQUFXLGFBQVksY0FBdkIsRUFBNEIsV0FBVztBQUFBO0FBQUE7QUFBT1gsV0FBS1k7QUFBWixNQUF2QyxHQVREO0FBVUMsaURBQU0sT0FBTixPQVZEO0FBV0MsaURBQU0sSUFBTixJQUFXLGFBQVksMEJBQXZCLEVBQThCLFdBQVc7QUFBQTtBQUFBO0FBQU9aLFdBQUthO0FBQVosTUFBekM7QUFYRCxJQUREO0FBZUE7Ozs7OztrQkEzQm1CZCxPIiwiZmlsZSI6InVzZXItcHJvZmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtBdmF0YXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9jb21wb25lbnRzL2xpc3RcIlxyXG5pbXBvcnQgUGhvdG8gZnJvbSBcIi4vY29tcG9uZW50cy9waG90b1wiXHJcbmltcG9ydCBVc2VyIGZyb20gXCIuL2RiL3VzZXJcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2ZpbGUgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHR2YXIgdXNlcj1Vc2VyLmN1cnJlbnRcclxuXHRcdFx0LHJvdXRlcj10aGlzLmNvbnRleHQucm91dGVyXHJcblx0XHRcdCxhdmF0YXJcclxuICAgICAgICBpZih1c2VyLnBob3RvKVxyXG4gICAgICAgICAgICBhdmF0YXI9PEF2YXRhciBzcmM9e3VzZXIucGhvdG99Lz5cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXZhdGFyPTxQaG90b1xyXG4gICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9Pnt1c2VyLnBob3RvPXVybDtVc2VyLnVwc2VydCh1c2VyKX19XHJcbiAgICAgICAgICAgICAgICBpY29uUmF0aW89ezIvM30gd2lkdGg9ezEwMH0gaGVpZ2h0PXsxMDB9Lz5cclxuICAgICAgICB9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8TGlzdD5cclxuXHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5aS05YOPXCIgcmlnaHRBdmF0YXI9e2F2YXRhcn0gc3R5bGU9e3toZWlnaHQ6MTAwfX0vPlxyXG5cdFx0XHRcdDxMaXN0LkRpdmlkZXIvPlxyXG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLluJDlj7dcIiByaWdodEljb249ezxzcGFuPnt1c2VyLm5hbWV9PC9zcGFuPn0vPlxyXG5cdFx0XHRcdDxMaXN0LkRpdmlkZXIvPlxyXG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLmmLXnp7BcIiByaWdodEljb249ezxzcGFuPnt1c2VyLm5pY2t9PC9zcGFuPn0vPlxyXG5cdFx0XHRcdDxMaXN0LkRpdmlkZXIvPlx0XHRcdFxyXG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLmgKfliKtcIiByaWdodEljb249ezxzcGFuPnt1c2VyLmdlbmRlcnx8XCLnlLdcIn08L3NwYW4+fS8+XHJcblx0XHRcdFx0PExpc3QuRGl2aWRlci8+XHJcblx0XHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWcsOWdgFwiIHJpZ2h0SWNvbj17PHNwYW4+e3VzZXIubG9jYXRpb259PC9zcGFuPn0vPlxyXG5cdFx0XHRcdDxMaXN0LkRpdmlkZXIvPlxyXG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLkuKrmgKfnrb7lkI1cIiByaWdodEljb249ezxzcGFuPnt1c2VyLnNpZ259PC9zcGFuPn0vPlxyXG5cdFx0XHQ8L0xpc3Q+XHJcblx0XHQpXHJcblx0fVxyXG59Il19