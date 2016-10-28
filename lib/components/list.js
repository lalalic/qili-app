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

								return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
				}

				_createClass(Main, [{
								key: "renderContent",
								value: function renderContent(loadingOrError) {
												var _props = this.props,
												    _props$children = _props.children,
												    children = _props$children === undefined ? [] : _props$children,
												    template = _props.template,
												    onItemClick = _props.onItemClick,
												    others = _objectWithoutProperties(_props, ["children", "template", "onItemClick"]),
												    data = this.state.data,
												    i = 0;

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
								}
				}]);

				return Main;
}(_async2.default);

Main.Table = function (_AsyncComponent2) {
				_inherits(_class, _AsyncComponent2);

				function _class() {
								_classCallCheck(this, _class);

								return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
				}

				_createClass(_class, [{
								key: "renderContent",
								value: function renderContent(loadingOrError) {
												var data = this.state.data,
												    _props2 = this.props,
												    _props2$rowData = _props2.rowData,
												    rowData = _props2$rowData === undefined ? data : _props2$rowData,
												    model = _props2.model,
												    others = _objectWithoutProperties(_props2, ["rowData", "model"]);


												return _react2.default.createElement(
																"div",
																null,
																loadingOrError,
																_react2.default.createElement(_reactable.Table, _extends({ data: rowData }, others))
												); //Table must be in a container
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

												return _possibleConstructorReturn(this, (template.__proto__ || Object.getPrototypeOf(template)).apply(this, arguments));
								}

								_createClass(template, [{
												key: "render",
												value: function render() {
																var _props3 = this.props,
																    model = _props3.model,
																    others = _objectWithoutProperties(_props3, ["model"]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpc3QuanMiXSwibmFtZXMiOlsiTWFpbiIsImxvYWRpbmdPckVycm9yIiwicHJvcHMiLCJjaGlsZHJlbiIsInRlbXBsYXRlIiwib25JdGVtQ2xpY2siLCJvdGhlcnMiLCJkYXRhIiwic3RhdGUiLCJpIiwiQXJyYXkiLCJpc0FycmF5IiwiZm9yRWFjaCIsIm1vZGVsIiwia2V5IiwiX2lkIiwib25DbGljayIsImVsIiwiY3JlYXRlRWxlbWVudCIsInB1c2giLCJUYWJsZSIsInJvd0RhdGEiLCJEaXZpZGVyIiwiSXRlbSIsImRlZmF1bHRQcm9wcyIsIm5hbWUiLCJ0aXRsZSIsImVtcHR5IiwibG9hZGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBS3FCQSxJOzs7Ozs7Ozs7OztzQ0FDSEMsYyxFQUFlO0FBQUEseUJBQzJCLEtBQUtDLEtBRGhDO0FBQUEseUNBQ3BCQyxRQURvQjtBQUFBLGdCQUNwQkEsUUFEb0IsbUNBQ1gsRUFEVztBQUFBLGdCQUNQQyxRQURPLFVBQ1BBLFFBRE87QUFBQSxnQkFDR0MsV0FESCxVQUNHQSxXQURIO0FBQUEsZ0JBQ21CQyxNQURuQjtBQUFBLGdCQUVwQkMsSUFGb0IsR0FFZCxLQUFLQyxLQUZTLENBRXBCRCxJQUZvQjtBQUFBLGdCQUVIRSxDQUZHLEdBRUQsQ0FGQzs7QUFJekIsZ0JBQUcsQ0FBQ0MsTUFBTUMsT0FBTixDQUFjUixRQUFkLENBQUosRUFDSUEsV0FBUyxDQUFDQSxRQUFELENBQVQ7O0FBRUpPLGtCQUFNQyxPQUFOLENBQWNKLElBQWQsS0FBdUJBLEtBQUtLLE9BQUwsQ0FBYSxVQUFDQyxLQUFELEVBQVM7QUFDekMsb0JBQUlYLFFBQU07QUFDRlcsZ0NBREU7QUFFRkMseUJBQUtELE1BQU1FLEdBQU4sSUFBV04sR0FGZDtBQUdGTyw2QkFBUSxtQkFBSTtBQUNSWCx1Q0FBZUEsWUFBWVEsS0FBWixDQUFmO0FBQ0g7QUFMQyxpQkFBVjtBQUFBLG9CQU9JSSxLQUFHLGdCQUFNQyxhQUFOLENBQW9CZCxRQUFwQixFQUE2QkYsS0FBN0IsQ0FQUDtBQVFBQyx5QkFBU2dCLElBQVQsQ0FBY0YsRUFBZDtBQUNULGFBVjRCLENBQXZCOztBQVlBLG1CQUNJO0FBQUE7QUFBQTtBQUNLaEIsOEJBREw7QUFFSTtBQUFBO0FBQVVLLDBCQUFWO0FBQ0tIO0FBREw7QUFGSixhQURKO0FBU0g7Ozs7OztBQTdCZ0JILEksQ0ErQmJvQixLOzs7Ozs7Ozs7OztzQ0FDUW5CLGMsRUFBZTtBQUN4QixnQkFBQ00sSUFBRCxHQUFPLEtBQUtDLEtBQVosQ0FBQ0QsSUFBRDtBQUFBLDBCQUM4QixLQUFLTCxLQURuQztBQUFBLDBDQUNGbUIsT0FERTtBQUFBLGdCQUNGQSxPQURFLG1DQUNNZCxJQUROO0FBQUEsZ0JBQ1lNLEtBRFosV0FDWUEsS0FEWjtBQUFBLGdCQUNzQlAsTUFEdEI7OztBQUdKLG1CQUNDO0FBQUE7QUFBQTtBQUNFTCw4QkFERjtBQUVDLDJFQUFPLE1BQU1vQixPQUFiLElBQTBCZixNQUExQjtBQUZELGFBREQsQ0FKNEIsQ0FTM0I7QUFDRDs7Ozs7O0FBMUNrQk4sSSxDQTZDYnNCLE87QUE3Q2F0QixJLENBK0NidUIsSTtBQS9DYXZCLEksQ0FpRGJ3QixZLEdBQWE7QUFDbkJwQjtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEscUNBQ1M7QUFBQSw4QkFDZ0IsS0FBS0YsS0FEckI7QUFBQSxvQkFDRlcsS0FERSxXQUNGQSxLQURFO0FBQUEsb0JBQ1FQLE1BRFI7O0FBRVAsdUJBQVE7QUFBQTtBQUFBLCtCQUFVLEtBQUtPLE1BQU1FLEdBQXJCLElBQThCVCxNQUE5QjtBQUF1Q08sMEJBQU1ZLElBQU4sSUFBWVosTUFBTWEsS0FBbEIsSUFBeUJiLE1BQU1FO0FBQXRFLGlCQUFSO0FBQ0E7QUFKRjs7QUFBQTtBQUFBLHVCQURtQjtBQU9uQlksV0FBTyxJQVBZO0FBUW5CQyxhQUFTO0FBUlUsQztrQkFqREE1QixJIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQXN5bmNDb21wb25lbnQgZnJvbSBcIi4vYXN5bmNcIlxuaW1wb3J0IHtMaXN0LERpdmlkZXIsTGlzdEl0ZW19IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtUYWJsZX0gZnJvbSAncmVhY3RhYmxlJ1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIGV4dGVuZHMgQXN5bmNDb21wb25lbnR7XG4gICAgcmVuZGVyQ29udGVudChsb2FkaW5nT3JFcnJvcil7XG4gICAgICAgIHZhciB7Y2hpbGRyZW49W10sIHRlbXBsYXRlLCBvbkl0ZW1DbGljaywgLi4ub3RoZXJzfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge2RhdGF9PXRoaXMuc3RhdGUsaT0wO1xuXG4gICAgICAgIGlmKCFBcnJheS5pc0FycmF5KGNoaWxkcmVuKSlcbiAgICAgICAgICAgIGNoaWxkcmVuPVtjaGlsZHJlbl07XG5cbiAgICAgICAgQXJyYXkuaXNBcnJheShkYXRhKSAmJiBkYXRhLmZvckVhY2goKG1vZGVsKT0+e1xuICAgICAgICAgICAgbGV0IHByb3BzPXtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwsXG4gICAgICAgICAgICAgICAgICAgIGtleToobW9kZWwuX2lkfHxpKyspLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOigpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkl0ZW1DbGljayAmJiBvbkl0ZW1DbGljayhtb2RlbClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZWw9UmVhY3QuY3JlYXRlRWxlbWVudCh0ZW1wbGF0ZSxwcm9wcyk7XG4gICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGVsKVxuXHRcdH0pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtsb2FkaW5nT3JFcnJvcn1cbiAgICAgICAgICAgICAgICA8TGlzdCB7Li4ub3RoZXJzfT5cbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG5cbiAgICB9XG5cdFxuXHRzdGF0aWMgVGFibGU9Y2xhc3MgZXh0ZW5kcyBBc3luY0NvbXBvbmVudHtcblx0XHRyZW5kZXJDb250ZW50KGxvYWRpbmdPckVycm9yKXtcblx0XHRcdHZhciB7ZGF0YX09dGhpcy5zdGF0ZSxcblx0XHRcdFx0e3Jvd0RhdGE9ZGF0YSwgbW9kZWwsIC4uLm90aGVyc309dGhpcy5wcm9wcztcblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7bG9hZGluZ09yRXJyb3J9XG5cdFx0XHRcdFx0PFRhYmxlIGRhdGE9e3Jvd0RhdGF9IHsuLi5vdGhlcnN9Lz5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpLy9UYWJsZSBtdXN0IGJlIGluIGEgY29udGFpbmVyXG5cdFx0fVxuXHR9XG5cdFxuXHRzdGF0aWMgRGl2aWRlcj1EaXZpZGVyXG5cdFxuXHRzdGF0aWMgSXRlbT1MaXN0SXRlbVxuXHRcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0dGVtcGxhdGU6Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0XHRyZW5kZXIoKXtcblx0XHRcdFx0dmFyIHttb2RlbCwgLi4ub3RoZXJzfT10aGlzLnByb3BzO1xuXHRcdFx0XHRyZXR1cm4gKDxMaXN0SXRlbSBrZXk9e21vZGVsLl9pZH0gey4uLm90aGVyc30+e21vZGVsLm5hbWV8fG1vZGVsLnRpdGxlfHxtb2RlbC5faWR9PC9MaXN0SXRlbT4pXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRlbXB0eTogbnVsbCxcblx0XHRsb2FkaW5nOiBudWxsXG5cdH1cblxuXHRcbn1cblxuIl19