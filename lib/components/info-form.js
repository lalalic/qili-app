"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Field = exports.InfoForm = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _keyboardArrowLeft = require("material-ui/svg-icons/hardware/keyboard-arrow-left");

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _textField = require("./text-field");

var _textField2 = _interopRequireDefault(_textField);

var _fullPage = require("./full-page");

var _fullPage2 = _interopRequireDefault(_fullPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfoForm = exports.InfoForm = function (_Component) {
	_inherits(InfoForm, _Component);

	function InfoForm() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, InfoForm);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InfoForm.__proto__ || Object.getPrototypeOf(InfoForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = { editing: 0 }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(InfoForm, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    children = _props.children,
			    others = _objectWithoutProperties(_props, ["children"]);

			children = _react2.default.Children.toArray(children);
			var editing = this.state.editing;

			var editor = null,
			    len = children.length;
			if (editing) {
				var _children$props = children[editing - 1].props,
				    onEdit = _children$props.onEdit,
				    hintText = _children$props.hintText,
				    _value = _children$props.value,
				    primaryText = _children$props.primaryText,
				    _children$props$type = _children$props.type,
				    type = _children$props$type === undefined ? "input" : _children$props$type,
				    options = _children$props.options,
				    customizedEditor = _children$props.children;

				var TheEditor = Editor[customizedEditor ? "customized" : type];
				editor = _react2.default.createElement(TheEditor, _extends({ onEdit: onEdit, hintText: hintText, value: _value, primaryText: primaryText, options: options, children: customizedEditor }, {
					onCancel: function onCancel(e) {
						return _this2.setState({ editing: 0 });
					} }));
			}
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					_materialUi.List,
					others,
					children.map(function (child, i) {
						var elementType = child.type,
						    _child$props = child.props,
						    onEdit = _child$props.onEdit,
						    hintText = _child$props.hintText,
						    value = _child$props.value,
						    primaryText = _child$props.primaryText,
						    _child$props$type = _child$props.type,
						    type = _child$props$type === undefined ? "input" : _child$props$type,
						    options = _child$props.options,
						    children = _child$props.children,
						    others = _objectWithoutProperties(_child$props, ["onEdit", "hintText", "value", "primaryText", "type", "options", "children"]);

						if (elementType == Field) {
							others.primaryText = primaryText;
							if (value) {
								var display = value;
								switch (type) {
									case "single":
										display = options.reduce(function (found, a) {
											if (found != null) return found;
											if (a == value) return a;else if ((typeof a === "undefined" ? "undefined" : _typeof(a)) == "object" && a.value == value) return a.label || a.value;
											return found;
										}, null);
										break;
									case "multiple":
										display = (value || []).map(function (a) {
											var f = options.find(function (o) {
												return a == o || a == o.value;
											});
											return (typeof f === "undefined" ? "undefined" : _typeof(f)) == "object" ? f.label || f.value : f;
										}).join(",");
										break;
									case "date":
										display = value ? value.format() : "";
										break;
								}
								others.rightIcon = _react2.default.createElement(Value, { value: display });
							}
							if (onEdit || children) others.onClick = function (e) {
								return _this2.setState({ editing: i + 1 });
							};
							return _react2.default.createElement(_materialUi.ListItem, _extends({}, others, { key: i }));
						} else return _react2.default.cloneElement(child, { key: i });
					}).reduce(function (state, a, i) {
						state.push(a);
						if (i + 1 != len && a.type == _materialUi.ListItem) state.push(_react2.default.createElement(_materialUi.Divider, { key: "_" + i }));
						return state;
					}, [])
				),
				editor
			);
		}
	}]);

	return InfoForm;
}(_react.Component);

var Value = function Value(_ref2) {
	var value = _ref2.value,
	    _ref2$style = _ref2.style,
	    style = _ref2$style === undefined ? {} : _ref2$style;
	return _react2.default.createElement(
		"span",
		{ style: _extends({}, style, { color: "lightgray", width: "auto" }) },
		value
	);
};

var Field = exports.Field = function Field() {
	return null;
};

var Editor = {
	input: function input(_ref3) {
		var _onEdit = _ref3.onEdit,
		    onCancel = _ref3.onCancel,
		    hintText = _ref3.hintText,
		    value = _ref3.value,
		    primaryText = _ref3.primaryText,
		    page = _ref3.page;

		var props = {};
		if (hintText) {
			props = {
				floatingLabelFixed: true,
				floatingLabelText: hintText
			};
		}
		var refEditor = void 0;
		return _react2.default.createElement(
			_fullPage2.default,
			null,
			_react2.default.createElement(Title, { onEdit: function onEdit(a) {
					var p = _onEdit(refEditor.getValue());
					if (p && p.then) p.then(onCancel, function (e) {
						return refEditor.errorText = e;
					});else onCancel();
				}, onCancel: onCancel, primaryText: primaryText, isChange: !!value }),
			_react2.default.createElement(
				"div",
				{ style: { padding: 5 } },
				_react2.default.createElement(_textField2.default, _extends({ ref: function ref(a) {
						return refEditor = a;
					} }, props, {
					name: primaryText, fullWidth: true, defaultValue: value }))
			)
		);
	},
	single: function single(_ref4) {
		var onEdit = _ref4.onEdit,
		    onCancel = _ref4.onCancel,
		    hintText = _ref4.hintText,
		    value = _ref4.value,
		    primaryText = _ref4.primaryText,
		    page = _ref4.page,
		    options = _ref4.options,
		    _ref4$len = _ref4.len,
		    len = _ref4$len === undefined ? options.length : _ref4$len;

		return _react2.default.createElement(
			_materialUi.Dialog,
			{ open: true,
				onRequestClose: onCancel,
				title: primaryText },
			_react2.default.createElement(
				_materialUi.RadioButtonGroup,
				{ name: primaryText,
					valueSelected: value,
					labelPosition: "left",
					onChange: function onChange(e, value) {
						onEdit(value);
						onCancel();
					} },
				options.map(function (opt, i) {
					var value = void 0,
					    label = void 0;
					if ((typeof opt === "undefined" ? "undefined" : _typeof(opt)) == 'object') {
						value = opt.value;
						label = opt.label || value;
					} else {
						value = label = opt;
					}
					return _react2.default.createElement(_materialUi.RadioButton, { key: i,
						value: value,
						label: label
					});
				})
			)
		);
	},
	multiple: function multiple(_ref5) {
		var _onEdit2 = _ref5.onEdit,
		    onCancel = _ref5.onCancel,
		    hintText = _ref5.hintText,
		    _ref5$value = _ref5.value,
		    v1 = _ref5$value === undefined ? [] : _ref5$value,
		    primaryText = _ref5.primaryText,
		    options = _ref5.options,
		    page = _ref5.page,
		    _ref5$selecteds = _ref5.selecteds,
		    selecteds = _ref5$selecteds === undefined ? [].concat(_toConsumableArray(v1)) : _ref5$selecteds;

		return _react2.default.createElement(
			_materialUi.Dialog,
			{ open: true,
				onRequestClose: onCancel,
				title: _react2.default.createElement(Title, { onEdit: function onEdit(a) {
						return _onEdit2(selecteds);
					}, onCancel: onCancel, primaryText: primaryText, isChange: !!value }) },
			options.map(function (opt, i) {
				var value = void 0,
				    label = void 0;
				if ((typeof opt === "undefined" ? "undefined" : _typeof(opt)) == 'object') {
					value = opt.value;
					label = opt.label || value;
				} else {
					value = label = opt;
				}
				return _react2.default.createElement(Checkbox, { key: i,
					onCheck: function onCheck(e, checked) {
						if (!checked) selected.splice(selected.indexOf(value), 1);else selected.push(value);
					},
					label: label,
					valueLink: value,
					defaultChecked: v1.indexOf(value) != -1,
					labelPosition: "left"
				});
			})
		);
	},
	date: function date(_ref6) {
		var _onEdit3 = _ref6.onEdit,
		    onCancel = _ref6.onCancel,
		    hintText = _ref6.hintText,
		    value = _ref6.value,
		    primaryText = _ref6.primaryText,
		    page = _ref6.page;

		var props = {};
		if (hintText) {
			props = {
				floatingLabelFixed: true,
				floatingLabelText: hintText
			};
		}
		var refEditor = void 0;
		return _react2.default.createElement(
			_fullPage2.default,
			null,
			_react2.default.createElement(Title, { onEdit: function onEdit(a) {
					var p = _onEdit3(refEditor.getDate());
					if (p && p.then) p.then(onCancel, function (e) {
						return refEditor.errorText = e;
					});else onCancel();
				}, onCancel: onCancel, primaryText: primaryText, isChange: !!value }),
			_react2.default.createElement(
				"div",
				{ style: { padding: 5 } },
				_react2.default.createElement(_materialUi.DatePicker, _extends({ ref: function ref(a) {
						return refEditor = a;
					}, autoOk: true, name: primaryText }, props, { fullWidth: true,
					defaultDate: value }))
			)
		);
	},
	customized: function customized(_ref7) {
		var _onEdit4 = _ref7.onEdit,
		    onCancel = _ref7.onCancel,
		    hintText = _ref7.hintText,
		    value = _ref7.value,
		    primaryText = _ref7.primaryText,
		    children = _ref7.children,
		    page = _ref7.page;

		return _react2.default.createElement(
			_fullPage2.default,
			null,
			_react2.default.createElement(Title, { onEdit: function onEdit(a) {
					var p = _onEdit4();
					if (p && p.then) p.then(onCancel);else onCancel();
				}, onCancel: onCancel, primaryText: primaryText, isChange: !!value }),
			children
		);
	}
};

var Title = function Title(_ref8) {
	var onEdit = _ref8.onEdit,
	    onCancel = _ref8.onCancel,
	    primaryText = _ref8.primaryText,
	    isChange = _ref8.isChange;
	return _react2.default.createElement(_materialUi.AppBar, { title: "" + (isChange ? "更改" : "") + primaryText,
		iconElementLeft: _react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: onCancel },
			_react2.default.createElement(_keyboardArrowLeft2.default, null)
		),
		iconElementRight: _react2.default.createElement(_materialUi.RaisedButton, { label: "\u4FDD\u5B58", onClick: onEdit, primary: true })
	});
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2luZm8tZm9ybS5qcyJdLCJuYW1lcyI6WyJJbmZvRm9ybSIsInN0YXRlIiwiZWRpdGluZyIsInByb3BzIiwiY2hpbGRyZW4iLCJvdGhlcnMiLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJlZGl0b3IiLCJsZW4iLCJsZW5ndGgiLCJvbkVkaXQiLCJoaW50VGV4dCIsInZhbHVlIiwicHJpbWFyeVRleHQiLCJ0eXBlIiwib3B0aW9ucyIsImN1c3RvbWl6ZWRFZGl0b3IiLCJUaGVFZGl0b3IiLCJFZGl0b3IiLCJzZXRTdGF0ZSIsIm1hcCIsImNoaWxkIiwiaSIsImVsZW1lbnRUeXBlIiwiRmllbGQiLCJkaXNwbGF5IiwicmVkdWNlIiwiZm91bmQiLCJhIiwibGFiZWwiLCJmIiwiZmluZCIsIm8iLCJqb2luIiwiZm9ybWF0IiwicmlnaHRJY29uIiwib25DbGljayIsImNsb25lRWxlbWVudCIsImtleSIsInB1c2giLCJWYWx1ZSIsInN0eWxlIiwiY29sb3IiLCJ3aWR0aCIsImlucHV0Iiwib25DYW5jZWwiLCJwYWdlIiwiZmxvYXRpbmdMYWJlbEZpeGVkIiwiZmxvYXRpbmdMYWJlbFRleHQiLCJyZWZFZGl0b3IiLCJwIiwiZ2V0VmFsdWUiLCJ0aGVuIiwiZXJyb3JUZXh0IiwiZSIsImlzQ2hhbmdlIiwicGFkZGluZyIsInNpbmdsZSIsIm9wdCIsIm11bHRpcGxlIiwidjEiLCJzZWxlY3RlZHMiLCJjaGVja2VkIiwic2VsZWN0ZWQiLCJzcGxpY2UiLCJpbmRleE9mIiwiZGF0ZSIsImdldERhdGUiLCJjdXN0b21pemVkIiwiVGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUdBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUdhQSxRLFdBQUFBLFE7Ozs7Ozs7Ozs7Ozs7O3dMQUNaQyxLLEdBQU0sRUFBQ0MsU0FBUSxDQUFULEU7Ozs7OzJCQUNFO0FBQUE7O0FBQUEsZ0JBQ21CLEtB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QyxXQUF4QztBQUNDLG1CQUFpQjtBQUFBO0FBQUEsS0FBWSxTQUFTZ0MsUUFBckI7QUFBK0I7QUFBL0IsR0FEbEI7QUFFQyxvQkFBa0IsMERBQWMsT0FBTSxjQUFwQixFQUF5QixTQUFTbkMsTUFBbEMsRUFBMEMsU0FBUyxJQUFuRDtBQUZuQixHQURXO0FBQUEsQ0FBWiIsImZpbGUiOiJpbmZvLWZvcm0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtMaXN0LCBMaXN0SXRlbSwgRGl2aWRlciwgRGlhbG9nLCBEYXRlUGlja2VyLFxyXG5cdFx0QXBwQmFyLFJhaXNlZEJ1dHRvbixJY29uQnV0dG9uLFxyXG5cdFx0UmFkaW9CdXR0b25Hcm91cCwgUmFkaW9CdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBOYXZpZ2F0aW9uQmFjayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxyXG5cclxuaW1wb3J0IFRleHRGaWVsZCBmcm9tIFwiLi90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IEZ1bGxQYWdlIGZyb20gXCIuL2Z1bGwtcGFnZVwiXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEluZm9Gb3JtIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHN0YXRlPXtlZGl0aW5nOjB9XHJcblx0cmVuZGVyKCl7XHJcblx0XHRsZXQge2NoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuXHRcdGNoaWxkcmVuPVJlYWN0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pXHJcblx0XHRjb25zdCB7ZWRpdGluZ309dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IGVkaXRvcj1udWxsLCBsZW49Y2hpbGRyZW4ubGVuZ3RoXHJcblx0XHRpZihlZGl0aW5nKXtcclxuXHRcdFx0Y29uc3Qge29uRWRpdCxoaW50VGV4dCx2YWx1ZSxwcmltYXJ5VGV4dCx0eXBlPVwiaW5wdXRcIiwgb3B0aW9ucyxjaGlsZHJlbjpjdXN0b21pemVkRWRpdG9yfT1jaGlsZHJlbltlZGl0aW5nLTFdLnByb3BzXHJcblx0XHRcdGxldCBUaGVFZGl0b3I9RWRpdG9yW2N1c3RvbWl6ZWRFZGl0b3IgPyBcImN1c3RvbWl6ZWRcIiA6IHR5cGVdXHJcblx0XHRcdGVkaXRvcj0oPFRoZUVkaXRvclxyXG5cdFx0XHRcdHsuLi57b25FZGl0LGhpbnRUZXh0LHZhbHVlLHByaW1hcnlUZXh0LG9wdGlvbnMsY2hpbGRyZW46Y3VzdG9taXplZEVkaXRvcn19XHJcblx0XHRcdFx0b25DYW5jZWw9e2U9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6MH0pfS8+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PExpc3Qgey4uLm90aGVyc30+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y2hpbGRyZW4ubWFwKChjaGlsZCxpKT0+e1xyXG5cdFx0XHRcdFx0XHRjb25zdCB7dHlwZTplbGVtZW50VHlwZSwgcHJvcHM6e29uRWRpdCxoaW50VGV4dCx2YWx1ZSwgcHJpbWFyeVRleHQsIHR5cGU9XCJpbnB1dFwiLCBvcHRpb25zLGNoaWxkcmVuLCAuLi5vdGhlcnN9fT1jaGlsZFxyXG5cdFx0XHRcdFx0XHRpZihlbGVtZW50VHlwZT09RmllbGQpe1xyXG5cdFx0XHRcdFx0XHRcdG90aGVycy5wcmltYXJ5VGV4dD1wcmltYXJ5VGV4dFxyXG5cdFx0XHRcdFx0XHRcdGlmKHZhbHVlKXtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBkaXNwbGF5PXZhbHVlXHJcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwic2luZ2xlXCI6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk9b3B0aW9ucy5yZWR1Y2UoKGZvdW5kLGEpPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoZm91bmQhPW51bGwpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZihhPT12YWx1ZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBhXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZih0eXBlb2YoYSk9PVwib2JqZWN0XCIgJiYgYS52YWx1ZT09dmFsdWUpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYS5sYWJlbHx8YS52YWx1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9LG51bGwpXHJcblx0XHRcdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcIm11bHRpcGxlXCI6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk9KHZhbHVlfHxbXSkubWFwKGE9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgZj1vcHRpb25zLmZpbmQobz0+YT09b3x8YT09by52YWx1ZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdHlwZW9mKGYpPT1cIm9iamVjdFwiID8gZi5sYWJlbHx8Zi52YWx1ZSA6IGZcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSkuam9pbihcIixcIilcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwiZGF0ZVwiOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5PXZhbHVlID8gdmFsdWUuZm9ybWF0KCkgOiBcIlwiXHJcblx0XHRcdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0b3RoZXJzLnJpZ2h0SWNvbj0oPFZhbHVlIHZhbHVlPXtkaXNwbGF5fS8+KVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRpZihvbkVkaXQgfHwgY2hpbGRyZW4pXHJcblx0XHRcdFx0XHRcdFx0XHRvdGhlcnMub25DbGljaz1lPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOmkrMX0pXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxMaXN0SXRlbSB7Li4ub3RoZXJzfSBrZXk9e2l9Lz5cclxuXHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLHtrZXk6aX0pXHJcblx0XHRcdFx0XHR9KS5yZWR1Y2UoKHN0YXRlLGEsaSk9PntcclxuXHRcdFx0XHRcdFx0c3RhdGUucHVzaChhKVxyXG5cdFx0XHRcdFx0XHRpZihpKzEhPWxlbiAmJiBhLnR5cGU9PUxpc3RJdGVtKVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLnB1c2goPERpdmlkZXIga2V5PXtgXyR7aX1gfS8+KVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHRcdH0sW10pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvTGlzdD5cclxuXHRcdFx0XHR7ZWRpdG9yfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IFZhbHVlPSh7dmFsdWUsc3R5bGU9e319KT0+KFxyXG5cdDxzcGFuIHN0eWxlPXt7Li4uc3R5bGUsY29sb3I6XCJsaWdodGdyYXlcIiwgd2lkdGg6XCJhdXRvXCJ9fT5cclxuXHR7dmFsdWV9XHJcblx0PC9zcGFuPlxyXG4pXHJcblxyXG5leHBvcnQgY29uc3QgRmllbGQ9KCk9Pm51bGxcclxuXHJcblxyXG5jb25zdCBFZGl0b3I9e1xyXG5cdGlucHV0KHtvbkVkaXQsIG9uQ2FuY2VsLCBoaW50VGV4dCx2YWx1ZSxwcmltYXJ5VGV4dCwgcGFnZX0pe1xyXG5cdFx0bGV0IHByb3BzPXt9XHJcblx0XHRpZihoaW50VGV4dCl7XHJcblx0XHRcdHByb3BzPXtcclxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsRml4ZWQ6dHJ1ZSxcclxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dDpoaW50VGV4dFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRsZXQgcmVmRWRpdG9yXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RnVsbFBhZ2U+XHJcblx0XHRcdFx0PFRpdGxlIHsuLi57b25FZGl0OmE9PntcclxuXHRcdFx0XHRcdFx0bGV0IHA9b25FZGl0KHJlZkVkaXRvci5nZXRWYWx1ZSgpKVxyXG5cdFx0XHRcdFx0XHRpZihwICYmIHAudGhlbilcclxuXHRcdFx0XHRcdFx0XHRwLnRoZW4ob25DYW5jZWwsIGU9PnJlZkVkaXRvci5lcnJvclRleHQ9ZSlcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2FuY2VsKClcclxuXHRcdFx0XHRcdH0sIG9uQ2FuY2VsLCBwcmltYXJ5VGV4dCwgaXNDaGFuZ2U6ISF2YWx1ZX19Lz5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmRWRpdG9yPWF9IHsuLi5wcm9wc31cclxuXHRcdFx0XHRcdFx0bmFtZT17cHJpbWFyeVRleHR9IGZ1bGxXaWR0aD17dHJ1ZX0gZGVmYXVsdFZhbHVlPXt2YWx1ZX0vPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L0Z1bGxQYWdlPlxyXG5cdFx0KVxyXG5cdH1cclxuXHQsc2luZ2xlKHtvbkVkaXQsIG9uQ2FuY2VsLCBoaW50VGV4dCx2YWx1ZSxwcmltYXJ5VGV4dCwgcGFnZSwgb3B0aW9ucywgbGVuPW9wdGlvbnMubGVuZ3RofSl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RGlhbG9nIG9wZW49e3RydWV9XHJcblx0XHRcdFx0b25SZXF1ZXN0Q2xvc2U9e29uQ2FuY2VsfVxyXG5cdFx0XHRcdHRpdGxlPXtwcmltYXJ5VGV4dH0+XHJcblx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXAgbmFtZT17cHJpbWFyeVRleHR9XHJcblx0XHRcdFx0XHR2YWx1ZVNlbGVjdGVkPXt2YWx1ZX1cclxuXHRcdFx0XHRcdGxhYmVsUG9zaXRpb249XCJsZWZ0XCJcclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSx2YWx1ZSk9PntcclxuXHRcdFx0XHRcdFx0b25FZGl0KHZhbHVlKVxyXG5cdFx0XHRcdFx0XHRvbkNhbmNlbCgpXHJcblx0XHRcdFx0XHR9fT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRvcHRpb25zLm1hcCgob3B0LGkpPT57XHJcblx0XHRcdFx0XHRcdGxldCB2YWx1ZSxsYWJlbFxyXG5cdFx0XHRcdFx0XHRpZih0eXBlb2Yob3B0KT09J29iamVjdCcpe1xyXG5cdFx0XHRcdFx0XHRcdHZhbHVlPW9wdC52YWx1ZVxyXG5cdFx0XHRcdFx0XHRcdGxhYmVsPW9wdC5sYWJlbHx8dmFsdWVcclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0dmFsdWU9bGFiZWw9b3B0XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHQ8UmFkaW9CdXR0b24ga2V5PXtpfVxyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU9e3ZhbHVlfVxyXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw9e2xhYmVsfVxyXG5cdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0PC9SYWRpb0J1dHRvbkdyb3VwPlxyXG5cdFx0XHQ8L0RpYWxvZz5cclxuXHRcdClcclxuXHR9XHJcblx0LG11bHRpcGxlKHtvbkVkaXQsIG9uQ2FuY2VsLCBoaW50VGV4dCx2YWx1ZTp2MT1bXSxwcmltYXJ5VGV4dCwgb3B0aW9ucywgcGFnZSwgc2VsZWN0ZWRzPVsuLi52MV19KXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxEaWFsb2cgb3Blbj17dHJ1ZX1cclxuXHRcdFx0XHRvblJlcXVlc3RDbG9zZT17b25DYW5jZWx9XHJcblx0XHRcdFx0dGl0bGU9ezxUaXRsZSB7Li4ue29uRWRpdDphPT5vbkVkaXQoc2VsZWN0ZWRzKSwgb25DYW5jZWwsIHByaW1hcnlUZXh0LCBpc0NoYW5nZTohIXZhbHVlfX0vPn0+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5tYXAoKG9wdCxpKT0+e1xyXG5cdFx0XHRcdFx0XHRsZXQgdmFsdWUsbGFiZWxcclxuXHRcdFx0XHRcdFx0aWYodHlwZW9mKG9wdCk9PSdvYmplY3QnKXtcclxuXHRcdFx0XHRcdFx0XHR2YWx1ZT1vcHQudmFsdWVcclxuXHRcdFx0XHRcdFx0XHRsYWJlbD1vcHQubGFiZWx8fHZhbHVlXHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdHZhbHVlPWxhYmVsPW9wdFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0PENoZWNrYm94IGtleT17aX1cclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2hlY2s9eyhlLGNoZWNrZWQpPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKCFjaGVja2VkKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkLnNwbGljZShzZWxlY3RlZC5pbmRleE9mKHZhbHVlKSwxKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQucHVzaCh2YWx1ZSlcclxuXHRcdFx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdFx0XHRsYWJlbD17bGFiZWx9XHJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZUxpbms9e3ZhbHVlfVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGVmYXVsdENoZWNrZWQ9e3YxLmluZGV4T2YodmFsdWUpIT0tMX1cclxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsUG9zaXRpb249XCJsZWZ0XCJcclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQ8L0RpYWxvZz5cclxuXHRcdClcclxuXHR9XHJcblx0LGRhdGUoe29uRWRpdCwgb25DYW5jZWwsIGhpbnRUZXh0LHZhbHVlLHByaW1hcnlUZXh0LCBwYWdlfSl7XHJcblx0XHRsZXQgcHJvcHM9e31cclxuXHRcdGlmKGhpbnRUZXh0KXtcclxuXHRcdFx0cHJvcHM9e1xyXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxGaXhlZDp0cnVlLFxyXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0OmhpbnRUZXh0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGxldCByZWZFZGl0b3JcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGdWxsUGFnZT5cclxuXHRcdFx0XHQ8VGl0bGUgey4uLntvbkVkaXQ6YT0+e1xyXG5cdFx0XHRcdFx0XHRsZXQgcD1vbkVkaXQocmVmRWRpdG9yLmdldERhdGUoKSlcclxuXHRcdFx0XHRcdFx0aWYocCAmJiBwLnRoZW4pXHJcblx0XHRcdFx0XHRcdFx0cC50aGVuKG9uQ2FuY2VsLCBlPT5yZWZFZGl0b3IuZXJyb3JUZXh0PWUpXHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRvbkNhbmNlbCgpXHJcblx0XHRcdFx0XHR9LCBvbkNhbmNlbCwgcHJpbWFyeVRleHQsIGlzQ2hhbmdlOiEhdmFsdWV9fS8+XHJcblx0XHRcdFx0XHQ8ZGl2IHN0eWxlPXt7cGFkZGluZzo1fX0+XHJcblx0XHRcdFx0XHRcdDxEYXRlUGlja2VyIHJlZj17YT0+cmVmRWRpdG9yPWF9IGF1dG9Paz17dHJ1ZX0gbmFtZT17cHJpbWFyeVRleHR9IHsuLi5wcm9wc30gZnVsbFdpZHRoPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRcdGRlZmF1bHREYXRlPXt2YWx1ZX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvRnVsbFBhZ2U+XHJcblx0XHQpXHJcblx0fVxyXG5cdCxjdXN0b21pemVkKHtvbkVkaXQsIG9uQ2FuY2VsLCBoaW50VGV4dCx2YWx1ZSxwcmltYXJ5VGV4dCwgY2hpbGRyZW4sIHBhZ2V9KXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGdWxsUGFnZT5cclxuXHRcdFx0XHQ8VGl0bGUgey4uLntvbkVkaXQ6YT0+e1xyXG5cdFx0XHRcdFx0XHRsZXQgcD1vbkVkaXQoKVxyXG5cdFx0XHRcdFx0XHRpZihwICYmIHAudGhlbilcclxuXHRcdFx0XHRcdFx0XHRwLnRoZW4ob25DYW5jZWwpXHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRvbkNhbmNlbCgpXHJcblx0XHRcdFx0XHR9LCBvbkNhbmNlbCwgcHJpbWFyeVRleHQsIGlzQ2hhbmdlOiEhdmFsdWV9fS8+XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L0Z1bGxQYWdlPlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuY29uc3QgVGl0bGU9KHtvbkVkaXQsIG9uQ2FuY2VsLCBwcmltYXJ5VGV4dCwgaXNDaGFuZ2V9KT0+KFxyXG5cdDxBcHBCYXIgdGl0bGU9e2Ake2lzQ2hhbmdlID8gXCLmm7TmlLlcIiA6XCJcIn0ke3ByaW1hcnlUZXh0fWB9XHJcblx0XHRpY29uRWxlbWVudExlZnQ9ezxJY29uQnV0dG9uIG9uQ2xpY2s9e29uQ2FuY2VsfT48TmF2aWdhdGlvbkJhY2svPjwvSWNvbkJ1dHRvbj59XHJcblx0XHRpY29uRWxlbWVudFJpZ2h0PXs8UmFpc2VkQnV0dG9uIGxhYmVsPVwi5L+d5a2YXCIgb25DbGljaz17b25FZGl0fSBwcmltYXJ5PXt0cnVlfS8+fVxyXG5cdFx0Lz5cclxuKVxyXG4iXX0=