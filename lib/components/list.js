"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _async = require("./async");

var _async2 = _interopRequireDefault(_async);

var _materialUi = require("material-ui");

var _reactable = require("reactable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_AsyncComponent) {
				_inherits(Main, _AsyncComponent);

				function Main() {
								_classCallCheck(this, Main);

								return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
				}

				_createClass(Main, [{
								key: "renderContent",
								value: function renderContent(loadingOrError) {
												var _props = this.props;
												var _props$children = _props.children;
												var children = _props$children === undefined ? [] : _props$children;
												var template = _props.template;
												var onItemClick = _props.onItemClick;
												var others = _objectWithoutProperties(_props, ["children", "template", "onItemClick"]);
												var data = this.state.data;var i = 0;

												if (!Array.isArray(children)) children = [children];

												Array.isArray(data) && data.forEach(function (model) {
																var props = {
																				model: model,
																				key: model._id || i++,
																				onClick: function onClick() {
																								onItemClick && onItemClick(model);
																				}
																},
																    el = _react2.default.createElement(template, props);
																children.push(el);
												});

												return _react2.default.createElement(
																"div",
																null,
																loadingOrError,
																_react2.default.createElement(
																				_materialUi.List,
																				others,
																				children
																)
												);
								} //Table must be in a container

				}]);

				return Main;
}(_async2.default);

Main.Table = function (_AsyncComponent2) {
				_inherits(_class, _AsyncComponent2);

				function _class() {
								_classCallCheck(this, _class);

								return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
				}

				_createClass(_class, [{
								key: "renderContent",
								value: function renderContent(loadingOrError) {
												var data = this.state.data;
												var _props2 = this.props;
												var _props2$rowData = _props2.rowData;
												var rowData = _props2$rowData === undefined ? data : _props2$rowData;
												var model = _props2.model;

												var others = _objectWithoutProperties(_props2, ["rowData", "model"]);

												return _react2.default.createElement(
																"div",
																null,
																loadingOrError,
																_react2.default.createElement(_reactable.Table, _extends({ data: rowData }, others))
												);
								}
				}]);

				return _class;
}(_async2.default);

Main.Divider = _materialUi.Divider;
Main.Item = _materialUi.ListItem;
Main.defaultProps = {
				template: function (_Component) {
								_inherits(template, _Component);

								function template() {
												_classCallCheck(this, template);

												return _possibleConstructorReturn(this, Object.getPrototypeOf(template).apply(this, arguments));
								}

								_createClass(template, [{
												key: "render",
												value: function render() {
																var _props3 = this.props;
																var model = _props3.model;

																var others = _objectWithoutProperties(_props3, ["model"]);

																return _react2.default.createElement(
																				_materialUi.ListItem,
																				_extends({ key: model._id }, others),
																				model.name || model.title || model._id
																);
												}
								}]);

								return template;
				}(_react.Component),
				empty: null,
				loading: null
};
exports.default = Main;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBS3FCOzs7Ozs7Ozs7OztzQ0FDSCxnQkFBZTt5QkFDMkIsS0FBSyxLQUFMLENBRDNCO3lDQUNwQixTQURvQjtnQkFDcEIsMkNBQVMscUJBRFc7Z0JBQ1AsMkJBRE87Z0JBQ0csaUNBREg7QUFDckIsZ0JBQXdDLGtGQUF4QyxDQURxQjtBQUVyQixnQkFBQyxPQUFNLEtBQUssS0FBTCxDQUFOLElBQUQsQ0FGcUIsSUFFSCxJQUFFLENBQUYsQ0FGRzs7QUFJekIsZ0JBQUcsQ0FBQyxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQUQsRUFDQyxXQUFTLENBQUMsUUFBRCxDQUFULENBREo7O0FBR0Esa0JBQU0sT0FBTixDQUFjLElBQWQsS0FBdUIsS0FBSyxPQUFMLENBQWEsVUFBQyxLQUFELEVBQVM7QUFDekMsb0JBQUksUUFBTTtBQUNGLGdDQURFO0FBRUYseUJBQUssTUFBTSxHQUFOLElBQVcsR0FBWDtBQUNMLDZCQUFRLG1CQUFJO0FBQ1IsdUNBQWUsWUFBWSxLQUFaLENBQWYsQ0FEUTtxQkFBSjtpQkFIWjtvQkFPQSxLQUFHLGdCQUFNLGFBQU4sQ0FBb0IsUUFBcEIsRUFBNkIsS0FBN0IsQ0FBSCxDQVJxQztBQVN6Qyx5QkFBUyxJQUFULENBQWMsRUFBZCxFQVR5QzthQUFULENBQXBDLENBUHlCOztBQW1CekIsbUJBQ0k7OztnQkFDSyxjQURMO2dCQUVJOztvQkFBVSxNQUFWO29CQUNLLFFBREw7aUJBRko7YUFESixDQW5CeUI7Ozs7O1dBRFo7OztLQStCYjs7Ozs7Ozs7Ozs7c0NBQ1EsZ0JBQWU7QUFDeEIsZ0JBQUMsT0FBTSxLQUFLLEtBQUwsQ0FBTixJQUFELENBRHdCOzBCQUVNLEtBQUssS0FBTCxDQUZOOzBDQUUxQixRQUYwQjtnQkFFMUIsMENBQVEsdUJBRmtCO2dCQUVaLHNCQUZZOztnQkFFRixpRUFGRTs7QUFJNUIsbUJBQ0M7OztnQkFDRSxjQURGO2dCQUVDLDJEQUFPLE1BQU0sT0FBTixJQUFtQixPQUExQixDQUZEO2FBREQsQ0FKNEI7Ozs7Ozs7QUFoQ1YsS0E2Q2I7QUE3Q2EsS0ErQ2I7QUEvQ2EsS0FpRGIsZUFBYTtBQUNuQjs7Ozs7Ozs7Ozs7cUNBQ1M7OEJBQ2dCLEtBQUssS0FBTCxDQURoQjtvQkFDRixzQkFERTs7b0JBQ1Esc0RBRFI7O0FBRVAsdUJBQVE7OytCQUFVLEtBQUssTUFBTSxHQUFOLElBQWUsT0FBOUI7b0JBQXVDLE1BQU0sSUFBTixJQUFZLE1BQU0sS0FBTixJQUFhLE1BQU0sR0FBTjtpQkFBeEUsQ0FGTzs7Ozs7dUJBRFQ7QUFNQSxXQUFPLElBQVA7QUFDQSxhQUFTLElBQVQ7O2tCQXpEbUIiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBc3luY0NvbXBvbmVudCBmcm9tIFwiLi9hc3luY1wiXG5pbXBvcnQge0xpc3QsRGl2aWRlcixMaXN0SXRlbX0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge1RhYmxlfSBmcm9tICdyZWFjdGFibGUnXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gZXh0ZW5kcyBBc3luY0NvbXBvbmVudHtcbiAgICByZW5kZXJDb250ZW50KGxvYWRpbmdPckVycm9yKXtcbiAgICAgICAgdmFyIHtjaGlsZHJlbj1bXSwgdGVtcGxhdGUsIG9uSXRlbUNsaWNrLCAuLi5vdGhlcnN9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7ZGF0YX09dGhpcy5zdGF0ZSxpPTA7XG5cbiAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKVxuICAgICAgICAgICAgY2hpbGRyZW49W2NoaWxkcmVuXTtcblxuICAgICAgICBBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEuZm9yRWFjaCgobW9kZWwpPT57XG4gICAgICAgICAgICBsZXQgcHJvcHM9e1xuICAgICAgICAgICAgICAgICAgICBtb2RlbCxcbiAgICAgICAgICAgICAgICAgICAga2V5Oihtb2RlbC5faWR8fGkrKyksXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s6KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSXRlbUNsaWNrICYmIG9uSXRlbUNsaWNrKG1vZGVsKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlbD1SZWFjdC5jcmVhdGVFbGVtZW50KHRlbXBsYXRlLHByb3BzKTtcbiAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goZWwpXG5cdFx0fSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge2xvYWRpbmdPckVycm9yfVxuICAgICAgICAgICAgICAgIDxMaXN0IHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9MaXN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcblxuICAgIH1cblx0XG5cdHN0YXRpYyBUYWJsZT1jbGFzcyBleHRlbmRzIEFzeW5jQ29tcG9uZW50e1xuXHRcdHJlbmRlckNvbnRlbnQobG9hZGluZ09yRXJyb3Ipe1xuXHRcdFx0dmFyIHtkYXRhfT10aGlzLnN0YXRlLFxuXHRcdFx0XHR7cm93RGF0YT1kYXRhLCBtb2RlbCwgLi4ub3RoZXJzfT10aGlzLnByb3BzO1xuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdHtsb2FkaW5nT3JFcnJvcn1cblx0XHRcdFx0XHQ8VGFibGUgZGF0YT17cm93RGF0YX0gey4uLm90aGVyc30vPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCkvL1RhYmxlIG11c3QgYmUgaW4gYSBjb250YWluZXJcblx0XHR9XG5cdH1cblx0XG5cdHN0YXRpYyBEaXZpZGVyPURpdmlkZXJcblx0XG5cdHN0YXRpYyBJdGVtPUxpc3RJdGVtXG5cdFxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR0ZW1wbGF0ZTpjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRcdHJlbmRlcigpe1xuXHRcdFx0XHR2YXIge21vZGVsLCAuLi5vdGhlcnN9PXRoaXMucHJvcHM7XG5cdFx0XHRcdHJldHVybiAoPExpc3RJdGVtIGtleT17bW9kZWwuX2lkfSB7Li4ub3RoZXJzfT57bW9kZWwubmFtZXx8bW9kZWwudGl0bGV8fG1vZGVsLl9pZH08L0xpc3RJdGVtPilcblx0XHRcdH1cblx0XHR9LFxuXHRcdGVtcHR5OiBudWxsLFxuXHRcdGxvYWRpbmc6IG51bGxcblx0fVxuXG5cdFxufVxuXG4iXX0=