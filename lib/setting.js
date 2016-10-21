'use strict';

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('.');

var _modeEdit = require('material-ui/svg-icons/editor/mode-edit');

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _bugReport = require('material-ui/svg-icons/action/bug-report');

var _bugReport2 = _interopRequireDefault(_bugReport);

var _systemUpdateAlt = require('material-ui/svg-icons/action/system-update-alt');

var _systemUpdateAlt2 = _interopRequireDefault(_systemUpdateAlt);

var _infoOutline = require('material-ui/svg-icons/action/info-outline');

var _infoOutline2 = _interopRequireDefault(_infoOutline);

var _android = require('material-ui/svg-icons/action/android');

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

								return _possibleConstructorReturn(this, Object.getPrototypeOf(Setting).apply(this, arguments));
				}

				_createClass(Setting, [{
								key: 'render',
								value: function render() {
												var _this2 = this;

												return _.React.createElement(
																List,
																null,
																_.React.createElement(List.Item, { primaryText: '去评价', leftIcon: _.React.createElement(_modeEdit2.default, null) }),
																_.React.createElement(List.Item, { primaryText: '建议', leftIcon: _.React.createElement(_bugReport2.default, null) }),
																_.React.createElement(List.Item, { primaryText: '更新', leftIcon: _.React.createElement(_systemUpdateAlt2.default, null) }),
																_.React.createElement(List.Item, { primaryText: 'App', leftIcon: _.React.createElement(_android2.default, null),
																				onClick: function onClick(a) {
																								return _this2.downloadApp();
																				}
																}),
																_.React.createElement(List.Item, { primaryText: '关于', leftIcon: _.React.createElement(_infoOutline2.default, null) })
												);
								}
				}, {
								key: 'downloadApp',
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
}(_.Component);

exports.default = Setting;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU87O0lBRWM7Ozs7Ozs7Ozs7O2lDQUNUOzs7QUFDSixtQkFDSTtBQUFDLG9CQUFEOztnQkFDSSxzQkFBQyxLQUFLLElBQU4sSUFBVyxhQUFZLEtBQVosRUFBa0IsVUFBVSwrQ0FBVixFQUE3QixDQURKO2dCQUVJLHNCQUFDLEtBQUssSUFBTixJQUFXLGFBQVksSUFBWixFQUFpQixVQUFVLGdEQUFWLEVBQTVCLENBRko7Z0JBSUksc0JBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxJQUFaLEVBQWlCLFVBQVUsc0RBQVYsRUFBNUIsQ0FKSjtnQkFNUixzQkFBQyxLQUFLLElBQU4sSUFBVyxhQUFZLEtBQVosRUFBa0IsVUFBVSw4Q0FBVjtBQUM1Qiw2QkFBUzsrQkFBRyxPQUFLLFdBQUw7cUJBQUg7aUJBRFYsQ0FOUTtnQkFTSSxzQkFBQyxLQUFLLElBQU4sSUFBVyxhQUFZLElBQVosRUFBaUIsVUFBVSxrREFBVixFQUE1QixDQVRKO2FBREosQ0FESTs7OztzQ0FnQkU7QUFDWixnQkFBSSxJQUFFLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFGLENBRFE7QUFFWixjQUFFLElBQUYsR0FBTyxXQUFQLENBRlk7QUFHWixjQUFFLFFBQUYsR0FBVyxTQUFYLENBSFk7QUFJWixjQUFFLEtBQUYsQ0FBUSxRQUFSLEdBQWlCLFVBQWpCLENBSlk7QUFLWixjQUFFLEdBQUYsR0FBTSxDQUFDLElBQUQsQ0FMTTtBQU1aLHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLENBQTFCLEVBTlk7QUFPWixjQUFFLEtBQUYsR0FQWTtBQVFaLHFCQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLENBQTFCLEVBUlk7Ozs7V0FqQk8iLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudCwgVUl9IGZyb20gXCIuXCJcclxuaW1wb3J0IFJhdGVJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvbW9kZS1lZGl0J1xyXG5pbXBvcnQgQnVnSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2J1Zy1yZXBvcnQnXHJcbmltcG9ydCBVcGRhdGVJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc3lzdGVtLXVwZGF0ZS1hbHQnXHJcbmltcG9ydCBBYm91dEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9pbmZvLW91dGxpbmUnXHJcbmltcG9ydCBMb2dvSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbmRyb2lkXCJcclxuXHJcbmNvbnN0IHtMaXN0fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZyBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxMaXN0PlxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWOu+ivhOS7t1wiIGxlZnRJY29uPXs8UmF0ZUljb24vPn0vPlxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuW7uuiurlwiIGxlZnRJY29uPXs8QnVnSWNvbi8+fS8+XHJcblxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuabtOaWsFwiIGxlZnRJY29uPXs8VXBkYXRlSWNvbi8+fS8+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCJBcHBcIiBsZWZ0SWNvbj17PExvZ29JY29uLz59XHJcblx0XHRcdFx0XHRvbkNsaWNrPXthPT50aGlzLmRvd25sb2FkQXBwKCl9XHJcblx0XHRcdFx0XHQvPlx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5YWz5LqOXCIgbGVmdEljb249ezxBYm91dEljb24vPn0vPlxyXG4gICAgICAgICAgICA8L0xpc3Q+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cdFxyXG5cdGRvd25sb2FkQXBwKCl7XHJcblx0XHR2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxyXG5cdFx0YS5ocmVmPVwiLi9hcHAuYXBrXCJcclxuXHRcdGEuZG93bmxvYWQ9XCJhcHAuYXBrXCJcclxuXHRcdGEuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiXHJcblx0XHRhLnRvcD0tMTAwMDtcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSlcclxuXHRcdGEuY2xpY2soKVxyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKVxyXG5cdH1cclxufVxyXG4iXX0=