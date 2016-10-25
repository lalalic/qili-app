"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require(".");

var _modeEdit = require("material-ui/svg-icons/editor/mode-edit");

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _bugReport = require("material-ui/svg-icons/action/bug-report");

var _bugReport2 = _interopRequireDefault(_bugReport);

var _systemUpdateAlt = require("material-ui/svg-icons/action/system-update-alt");

var _systemUpdateAlt2 = _interopRequireDefault(_systemUpdateAlt);

var _infoOutline = require("material-ui/svg-icons/action/info-outline");

var _infoOutline2 = _interopRequireDefault(_infoOutline);

var _android = require("material-ui/svg-icons/action/android");

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _.UI.List;

var Setting = function (_Component) {
				_inherits(Setting, _Component);

				function Setting() {
								_classCallCheck(this, Setting);

								return _possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).apply(this, arguments));
				}

				_createClass(Setting, [{
								key: "render",
								value: function render() {
												var _this2 = this;

												return _react2.default.createElement(
																List,
																null,
																_react2.default.createElement(List.Item, { primaryText: "\u53BB\u8BC4\u4EF7", leftIcon: _react2.default.createElement(_modeEdit2.default, null) }),
																_react2.default.createElement(List.Item, { primaryText: "\u5EFA\u8BAE", leftIcon: _react2.default.createElement(_bugReport2.default, null) }),
																_react2.default.createElement(List.Item, { primaryText: "\u66F4\u65B0", leftIcon: _react2.default.createElement(_systemUpdateAlt2.default, null) }),
																_react2.default.createElement(List.Item, { primaryText: "App", leftIcon: _react2.default.createElement(_android2.default, null),
																				onClick: function onClick(a) {
																								return _this2.downloadApp();
																				}
																}),
																_react2.default.createElement(List.Item, { primaryText: "\u5173\u4E8E", leftIcon: _react2.default.createElement(_infoOutline2.default, null) })
												);
								}
				}, {
								key: "downloadApp",
								value: function downloadApp() {
												var a = document.createElement("a");
												a.href = "./app.apk";
												a.download = "app.apk";
												a.style.position = "absolute";
												a.top = -1000;
												document.body.appendChild(a);
												a.click();
												document.body.removeChild(a);
								}
				}]);

				return Setting;
}(_react.Component);

exports.default = Setting;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJTZXR0aW5nIiwiZG93bmxvYWRBcHAiLCJhIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImRvd25sb2FkIiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFT0EsSSxRQUFBQSxJOztJQUVjQyxPOzs7Ozs7Ozs7OztpQ0FDVDtBQUFBOztBQUNKLG1CQUNJO0FBQUMsb0JBQUQ7QUFBQTtBQUNJLDhDQUFDLElBQUQsQ0FBTSxJQUFOLElBQVcsYUFBWSxvQkFBdkIsRUFBNkIsVUFBVSx1REFBdkMsR0FESjtBQUVJLDhDQUFDLElBQUQsQ0FBTSxJQUFOLElBQVcsYUFBWSxjQUF2QixFQUE0QixVQUFVLHdEQUF0QyxHQUZKO0FBSUksOENBQUMsSUFBRCxDQUFNLElBQU4sSUFBVyxhQUFZLGNBQXZCLEVBQTRCLFVBQVUsOERBQXRDLEdBSko7QUFNUiw4Q0FBQyxJQUFELENBQU0sSUFBTixJQUFXLGFBQVksS0FBdkIsRUFBNkIsVUFBVSxzREFBdkM7QUFDQyw2QkFBUztBQUFBLCtCQUFHLE9BQUtDLFdBQUwsRUFBSDtBQUFBO0FBRFYsa0JBTlE7QUFTSSw4Q0FBQyxJQUFELENBQU0sSUFBTixJQUFXLGFBQVksY0FBdkIsRUFBNEIsVUFBVSwwREFBdEM7QUFUSixhQURKO0FBYUg7OztzQ0FFUztBQUNaLGdCQUFJQyxJQUFFQyxTQUFTQyxhQUFULENBQXVCLEdBQXZCLENBQU47QUFDQUYsY0FBRUcsSUFBRixHQUFPLFdBQVA7QUFDQUgsY0FBRUksUUFBRixHQUFXLFNBQVg7QUFDQUosY0FBRUssS0FBRixDQUFRQyxRQUFSLEdBQWlCLFVBQWpCO0FBQ0FOLGNBQUVPLEdBQUYsR0FBTSxDQUFDLElBQVA7QUFDQU4scUJBQVNPLElBQVQsQ0FBY0MsV0FBZCxDQUEwQlQsQ0FBMUI7QUFDQUEsY0FBRVUsS0FBRjtBQUNBVCxxQkFBU08sSUFBVCxDQUFjRyxXQUFkLENBQTBCWCxDQUExQjtBQUNBOzs7Ozs7a0JBMUJtQkYsTyIsImZpbGUiOiJzZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCIuXCJcclxuaW1wb3J0IFJhdGVJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvbW9kZS1lZGl0J1xyXG5pbXBvcnQgQnVnSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2J1Zy1yZXBvcnQnXHJcbmltcG9ydCBVcGRhdGVJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc3lzdGVtLXVwZGF0ZS1hbHQnXHJcbmltcG9ydCBBYm91dEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9pbmZvLW91dGxpbmUnXHJcbmltcG9ydCBMb2dvSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbmRyb2lkXCJcclxuXHJcbmNvbnN0IHtMaXN0fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZyBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxMaXN0PlxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWOu+ivhOS7t1wiIGxlZnRJY29uPXs8UmF0ZUljb24vPn0vPlxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuW7uuiurlwiIGxlZnRJY29uPXs8QnVnSWNvbi8+fS8+XHJcblxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuabtOaWsFwiIGxlZnRJY29uPXs8VXBkYXRlSWNvbi8+fS8+XHJcblxyXG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCJBcHBcIiBsZWZ0SWNvbj17PExvZ29JY29uLz59XHJcblx0XHRcdFx0XHRvbkNsaWNrPXthPT50aGlzLmRvd25sb2FkQXBwKCl9XHJcblx0XHRcdFx0XHQvPlxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWFs+S6jlwiIGxlZnRJY29uPXs8QWJvdXRJY29uLz59Lz5cclxuICAgICAgICAgICAgPC9MaXN0PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblx0ZG93bmxvYWRBcHAoKXtcclxuXHRcdHZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXHJcblx0XHRhLmhyZWY9XCIuL2FwcC5hcGtcIlxyXG5cdFx0YS5kb3dubG9hZD1cImFwcC5hcGtcIlxyXG5cdFx0YS5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCJcclxuXHRcdGEudG9wPS0xMDAwO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKVxyXG5cdFx0YS5jbGljaygpXHJcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpXHJcblx0fVxyXG59XHJcbiJdfQ==