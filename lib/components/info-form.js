"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Field = exports.InfoForm = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

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

var InfoForm = exports.InfoForm = function (_Component) {
	(0, _inherits3.default)(InfoForm, _Component);

	function InfoForm() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, InfoForm);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = InfoForm.__proto__ || (0, _getPrototypeOf2.default)(InfoForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = { editing: 0 }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(InfoForm, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    children = _props.children,
			    others = (0, _objectWithoutProperties3.default)(_props, ["children"]);

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
				editor = _react2.default.createElement(TheEditor, (0, _extends3.default)({ onEdit: onEdit, hintText: hintText, value: _value, primaryText: primaryText, options: options, children: customizedEditor }, {
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
						    others = (0, _objectWithoutProperties3.default)(_child$props, ["onEdit", "hintText", "value", "primaryText", "type", "options", "children"]);

						if (elementType == Field) {
							others.primaryText = primaryText;
							if (value) {
								var display = value;
								switch (type) {
									case "single":
										display = options.reduce(function (found, a) {
											if (found != null) return found;
											if (a == value) return a;else if ((typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) == "object" && a.value == value) return a.label || a.value;
											return found;
										}, null);
										break;
									case "multiple":
										display = (value || []).map(function (a) {
											var f = options.find(function (o) {
												return a == o || a == o.value;
											});
											return (typeof f === "undefined" ? "undefined" : (0, _typeof3.default)(f)) == "object" ? f.label || f.value : f;
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
							return _react2.default.createElement(_materialUi.ListItem, (0, _extends3.default)({}, others, { key: i }));
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
		{ style: (0, _extends3.default)({}, style, { color: "lightgray", width: "auto" }) },
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
				_react2.default.createElement(_textField2.default, (0, _extends3.default)({ ref: function ref(a) {
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
					if ((typeof opt === "undefined" ? "undefined" : (0, _typeof3.default)(opt)) == 'object') {
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
		    selecteds = _ref5$selecteds === undefined ? [].concat((0, _toConsumableArray3.default)(v1)) : _ref5$selecteds;

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
				if ((typeof opt === "undefined" ? "undefined" : (0, _typeof3.default)(opt)) == 'object') {
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
				_react2.default.createElement(_materialUi.DatePicker, (0, _extends3.default)({ ref: function ref(a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2luZm8tZm9ybS5qcyJdLCJuYW1lcyI6WyJJbmZvRm9ybSIsInN0YXRlIiwiZWRpdGluZyIsInByb3BzIiwiY2hpbGRyZW4iLCJvdGhlcnMiLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJlZGl0b3IiLCJsZW4iLCJsZW5ndGgiLCJvbkVkaXQiLCJoaW50VGV4dCIsInZhbHVlIiwicHJpbWFyeVRleHQiLCJ0eXBlIiwib3B0aW9ucyIsImN1c3RvbWl6ZWRFZGl0b3IiLCJUaGVFZGl0b3IiLCJFZGl0b3IiLCJzZXRTdGF0ZSIsIm1hcCIsImNoaWxkIiwiaSIsImVsZW1lbnRUeXBlIiwiRmllbGQiLCJkaXNwbGF5IiwicmVkdWNlIiwiZm91bmQiLCJhIiwibGFiZWwiLCJmIiwiZmluZCIsIm8iLCJqb2luIiwiZm9ybWF0IiwicmlnaHRJY29uIiwib25DbGljayIsImNsb25lRWxlbWVudCIsImtleSIsInB1c2giLCJWYWx1ZSIsInN0eWxlIiwiY29sb3IiLCJ3aWR0aCIsImlucHV0Iiwib25DYW5jZWwiLCJwYWdlIiwiZmxvYXRpbmdMYWJlbEZpeGVkIiwiZmxvYXRpbmdMYWJlbFRleHQiLCJyZWZFZGl0b3IiLCJwIiwiZ2V0VmFsdWUiLCJ0aGVuIiwiZXJyb3JUZXh0IiwiZSIsImlzQ2hhbmdlIiwicGFkZGluZyIsInNpbmdsZSIsIm9wdCIsIm11bHRpcGxlIiwidjEiLCJzZWxlY3RlZHMiLCJjaGVja2VkIiwic2VsZWN0ZWQiLCJzcGxpY2UiLCJpbmRleE9mIiwiZGF0ZSIsImdldERhdGUiLCJjdXN0b21pemVkIiwiVGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUdBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0lBR2FBLFEsV0FBQUEsUTs7Ozs7Ozs7Ozs7Ozs7OE1BQ1pDLEssR0FBTSxFQUFDQyxTQUFRLENBQVQsRTs7Ozs7MkJBQ0U7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WCxHQUFpQixFQUEzQixJQUFnQzFDLFdBQXhDO0FBQ0MsbUJBQWlCO0FBQUE7QUFBQSxLQUFZLFNBQVNnQyxRQUFyQjtBQUErQjtBQUEvQixHQURsQjtBQUVDLG9CQUFrQiwwREFBYyxPQUFNLGNBQXBCLEVBQXlCLFNBQVNuQyxNQUFsQyxFQUEwQyxTQUFTLElBQW5EO0FBRm5CLEdBRFc7QUFBQSxDQUFaIiwiZmlsZSI6ImluZm8tZm9ybS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0xpc3QsIExpc3RJdGVtLCBEaXZpZGVyLCBEaWFsb2csIERhdGVQaWNrZXIsXHJcblx0XHRBcHBCYXIsUmFpc2VkQnV0dG9uLEljb25CdXR0b24sXHJcblx0XHRSYWRpb0J1dHRvbkdyb3VwLCBSYWRpb0J1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IE5hdmlnYXRpb25CYWNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXHJcblxyXG5pbXBvcnQgVGV4dEZpZWxkIGZyb20gXCIuL3RleHQtZmllbGRcIlxyXG5pbXBvcnQgRnVsbFBhZ2UgZnJvbSBcIi4vZnVsbC1wYWdlXCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSW5mb0Zvcm0gZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e2VkaXRpbmc6MH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGxldCB7Y2hpbGRyZW4sIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG5cdFx0Y2hpbGRyZW49UmVhY3QuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcclxuXHRcdGNvbnN0IHtlZGl0aW5nfT10aGlzLnN0YXRlXHJcblx0XHRsZXQgZWRpdG9yPW51bGwsIGxlbj1jaGlsZHJlbi5sZW5ndGhcclxuXHRcdGlmKGVkaXRpbmcpe1xyXG5cdFx0XHRjb25zdCB7b25FZGl0LGhpbnRUZXh0LHZhbHVlLHByaW1hcnlUZXh0LHR5cGU9XCJpbnB1dFwiLCBvcHRpb25zLGNoaWxkcmVuOmN1c3RvbWl6ZWRFZGl0b3J9PWNoaWxkcmVuW2VkaXRpbmctMV0ucHJvcHNcclxuXHRcdFx0bGV0IFRoZUVkaXRvcj1FZGl0b3JbY3VzdG9taXplZEVkaXRvciA/IFwiY3VzdG9taXplZFwiIDogdHlwZV1cclxuXHRcdFx0ZWRpdG9yPSg8VGhlRWRpdG9yXHJcblx0XHRcdFx0ey4uLntvbkVkaXQsaGludFRleHQsdmFsdWUscHJpbWFyeVRleHQsb3B0aW9ucyxjaGlsZHJlbjpjdXN0b21pemVkRWRpdG9yfX1cclxuXHRcdFx0XHRvbkNhbmNlbD17ZT0+dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzowfSl9Lz5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8TGlzdCB7Li4ub3RoZXJzfT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRjaGlsZHJlbi5tYXAoKGNoaWxkLGkpPT57XHJcblx0XHRcdFx0XHRcdGNvbnN0IHt0eXBlOmVsZW1lbnRUeXBlLCBwcm9wczp7b25FZGl0LGhpbnRUZXh0LHZhbHVlLCBwcmltYXJ5VGV4dCwgdHlwZT1cImlucHV0XCIsIG9wdGlvbnMsY2hpbGRyZW4sIC4uLm90aGVyc319PWNoaWxkXHJcblx0XHRcdFx0XHRcdGlmKGVsZW1lbnRUeXBlPT1GaWVsZCl7XHJcblx0XHRcdFx0XHRcdFx0b3RoZXJzLnByaW1hcnlUZXh0PXByaW1hcnlUZXh0XHJcblx0XHRcdFx0XHRcdFx0aWYodmFsdWUpe1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGRpc3BsYXk9dmFsdWVcclxuXHRcdFx0XHRcdFx0XHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJzaW5nbGVcIjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheT1vcHRpb25zLnJlZHVjZSgoZm91bmQsYSk9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZihmb3VuZCE9bnVsbClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKGE9PXZhbHVlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGFcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmKHR5cGVvZihhKT09XCJvYmplY3RcIiAmJiBhLnZhbHVlPT12YWx1ZSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBhLmxhYmVsfHxhLnZhbHVlXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0sbnVsbClcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdFx0XHRjYXNlIFwibXVsdGlwbGVcIjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheT0odmFsdWV8fFtdKS5tYXAoYT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBmPW9wdGlvbnMuZmluZChvPT5hPT1vfHxhPT1vLnZhbHVlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0eXBlb2YoZik9PVwib2JqZWN0XCIgPyBmLmxhYmVsfHxmLnZhbHVlIDogZlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KS5qb2luKFwiLFwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJkYXRlXCI6XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXk9dmFsdWUgPyB2YWx1ZS5mb3JtYXQoKSA6IFwiXCJcclxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRvdGhlcnMucmlnaHRJY29uPSg8VmFsdWUgdmFsdWU9e2Rpc3BsYXl9Lz4pXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGlmKG9uRWRpdCB8fCBjaGlsZHJlbilcclxuXHRcdFx0XHRcdFx0XHRcdG90aGVycy5vbkNsaWNrPWU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6aSsxfSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPExpc3RJdGVtIHsuLi5vdGhlcnN9IGtleT17aX0vPlxyXG5cdFx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQse2tleTppfSlcclxuXHRcdFx0XHRcdH0pLnJlZHVjZSgoc3RhdGUsYSxpKT0+e1xyXG5cdFx0XHRcdFx0XHRzdGF0ZS5wdXNoKGEpXHJcblx0XHRcdFx0XHRcdGlmKGkrMSE9bGVuICYmIGEudHlwZT09TGlzdEl0ZW0pXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUucHVzaCg8RGl2aWRlciBrZXk9e2BfJHtpfWB9Lz4pXHJcblx0XHRcdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0XHRcdFx0fSxbXSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0PC9MaXN0PlxyXG5cdFx0XHRcdHtlZGl0b3J9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuY29uc3QgVmFsdWU9KHt2YWx1ZSxzdHlsZT17fX0pPT4oXHJcblx0PHNwYW4gc3R5bGU9e3suLi5zdHlsZSxjb2xvcjpcImxpZ2h0Z3JheVwiLCB3aWR0aDpcImF1dG9cIn19PlxyXG5cdHt2YWx1ZX1cclxuXHQ8L3NwYW4+XHJcbilcclxuXHJcbmV4cG9ydCBjb25zdCBGaWVsZD0oKT0+bnVsbFxyXG5cclxuXHJcbmNvbnN0IEVkaXRvcj17XHJcblx0aW5wdXQoe29uRWRpdCwgb25DYW5jZWwsIGhpbnRUZXh0LHZhbHVlLHByaW1hcnlUZXh0LCBwYWdlfSl7XHJcblx0XHRsZXQgcHJvcHM9e31cclxuXHRcdGlmKGhpbnRUZXh0KXtcclxuXHRcdFx0cHJvcHM9e1xyXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxGaXhlZDp0cnVlLFxyXG5cdFx0XHRcdGZsb2F0aW5nTGFiZWxUZXh0OmhpbnRUZXh0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGxldCByZWZFZGl0b3JcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxGdWxsUGFnZT5cclxuXHRcdFx0XHQ8VGl0bGUgey4uLntvbkVkaXQ6YT0+e1xyXG5cdFx0XHRcdFx0XHRsZXQgcD1vbkVkaXQocmVmRWRpdG9yLmdldFZhbHVlKCkpXHJcblx0XHRcdFx0XHRcdGlmKHAgJiYgcC50aGVuKVxyXG5cdFx0XHRcdFx0XHRcdHAudGhlbihvbkNhbmNlbCwgZT0+cmVmRWRpdG9yLmVycm9yVGV4dD1lKVxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0b25DYW5jZWwoKVxyXG5cdFx0XHRcdFx0fSwgb25DYW5jZWwsIHByaW1hcnlUZXh0LCBpc0NoYW5nZTohIXZhbHVlfX0vPlxyXG5cdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZFZGl0b3I9YX0gey4uLnByb3BzfVxyXG5cdFx0XHRcdFx0XHRuYW1lPXtwcmltYXJ5VGV4dH0gZnVsbFdpZHRoPXt0cnVlfSBkZWZhdWx0VmFsdWU9e3ZhbHVlfS8+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvRnVsbFBhZ2U+XHJcblx0XHQpXHJcblx0fVxyXG5cdCxzaW5nbGUoe29uRWRpdCwgb25DYW5jZWwsIGhpbnRUZXh0LHZhbHVlLHByaW1hcnlUZXh0LCBwYWdlLCBvcHRpb25zLCBsZW49b3B0aW9ucy5sZW5ndGh9KXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxEaWFsb2cgb3Blbj17dHJ1ZX1cclxuXHRcdFx0XHRvblJlcXVlc3RDbG9zZT17b25DYW5jZWx9XHJcblx0XHRcdFx0dGl0bGU9e3ByaW1hcnlUZXh0fT5cclxuXHRcdFx0XHQ8UmFkaW9CdXR0b25Hcm91cCBuYW1lPXtwcmltYXJ5VGV4dH1cclxuXHRcdFx0XHRcdHZhbHVlU2VsZWN0ZWQ9e3ZhbHVlfVxyXG5cdFx0XHRcdFx0bGFiZWxQb3NpdGlvbj1cImxlZnRcIlxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHZhbHVlKT0+e1xyXG5cdFx0XHRcdFx0XHRvbkVkaXQodmFsdWUpXHJcblx0XHRcdFx0XHRcdG9uQ2FuY2VsKClcclxuXHRcdFx0XHRcdH19PlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG9wdGlvbnMubWFwKChvcHQsaSk9PntcclxuXHRcdFx0XHRcdFx0bGV0IHZhbHVlLGxhYmVsXHJcblx0XHRcdFx0XHRcdGlmKHR5cGVvZihvcHQpPT0nb2JqZWN0Jyl7XHJcblx0XHRcdFx0XHRcdFx0dmFsdWU9b3B0LnZhbHVlXHJcblx0XHRcdFx0XHRcdFx0bGFiZWw9b3B0LmxhYmVsfHx2YWx1ZVxyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHR2YWx1ZT1sYWJlbD1vcHRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiBrZXk9e2l9XHJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XHJcblx0XHRcdFx0XHRcdFx0XHRsYWJlbD17bGFiZWx9XHJcblx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQ8L1JhZGlvQnV0dG9uR3JvdXA+XHJcblx0XHRcdDwvRGlhbG9nPlxyXG5cdFx0KVxyXG5cdH1cclxuXHQsbXVsdGlwbGUoe29uRWRpdCwgb25DYW5jZWwsIGhpbnRUZXh0LHZhbHVlOnYxPVtdLHByaW1hcnlUZXh0LCBvcHRpb25zLCBwYWdlLCBzZWxlY3RlZHM9Wy4uLnYxXX0pe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PERpYWxvZyBvcGVuPXt0cnVlfVxyXG5cdFx0XHRcdG9uUmVxdWVzdENsb3NlPXtvbkNhbmNlbH1cclxuXHRcdFx0XHR0aXRsZT17PFRpdGxlIHsuLi57b25FZGl0OmE9Pm9uRWRpdChzZWxlY3RlZHMpLCBvbkNhbmNlbCwgcHJpbWFyeVRleHQsIGlzQ2hhbmdlOiEhdmFsdWV9fS8+fT5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRvcHRpb25zLm1hcCgob3B0LGkpPT57XHJcblx0XHRcdFx0XHRcdGxldCB2YWx1ZSxsYWJlbFxyXG5cdFx0XHRcdFx0XHRpZih0eXBlb2Yob3B0KT09J29iamVjdCcpe1xyXG5cdFx0XHRcdFx0XHRcdHZhbHVlPW9wdC52YWx1ZVxyXG5cdFx0XHRcdFx0XHRcdGxhYmVsPW9wdC5sYWJlbHx8dmFsdWVcclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0dmFsdWU9bGFiZWw9b3B0XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHQ8Q2hlY2tib3gga2V5PXtpfVxyXG5cdFx0XHRcdFx0XHRcdFx0b25DaGVjaz17KGUsY2hlY2tlZCk9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoIWNoZWNrZWQpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQuc3BsaWNlKHNlbGVjdGVkLmluZGV4T2YodmFsdWUpLDEpXHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZC5wdXNoKHZhbHVlKVxyXG5cdFx0XHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtsYWJlbH1cclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlTGluaz17dmFsdWV9XHJcblx0XHRcdFx0XHRcdFx0XHRkZWZhdWx0Q2hlY2tlZD17djEuaW5kZXhPZih2YWx1ZSkhPS0xfVxyXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWxQb3NpdGlvbj1cImxlZnRcIlxyXG5cdFx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdDwvRGlhbG9nPlxyXG5cdFx0KVxyXG5cdH1cclxuXHQsZGF0ZSh7b25FZGl0LCBvbkNhbmNlbCwgaGludFRleHQsdmFsdWUscHJpbWFyeVRleHQsIHBhZ2V9KXtcclxuXHRcdGxldCBwcm9wcz17fVxyXG5cdFx0aWYoaGludFRleHQpe1xyXG5cdFx0XHRwcm9wcz17XHJcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbEZpeGVkOnRydWUsXHJcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ6aGludFRleHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bGV0IHJlZkVkaXRvclxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZ1bGxQYWdlPlxyXG5cdFx0XHRcdDxUaXRsZSB7Li4ue29uRWRpdDphPT57XHJcblx0XHRcdFx0XHRcdGxldCBwPW9uRWRpdChyZWZFZGl0b3IuZ2V0RGF0ZSgpKVxyXG5cdFx0XHRcdFx0XHRpZihwICYmIHAudGhlbilcclxuXHRcdFx0XHRcdFx0XHRwLnRoZW4ob25DYW5jZWwsIGU9PnJlZkVkaXRvci5lcnJvclRleHQ9ZSlcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2FuY2VsKClcclxuXHRcdFx0XHRcdH0sIG9uQ2FuY2VsLCBwcmltYXJ5VGV4dCwgaXNDaGFuZ2U6ISF2YWx1ZX19Lz5cclxuXHRcdFx0XHRcdDxkaXYgc3R5bGU9e3twYWRkaW5nOjV9fT5cclxuXHRcdFx0XHRcdFx0PERhdGVQaWNrZXIgcmVmPXthPT5yZWZFZGl0b3I9YX0gYXV0b09rPXt0cnVlfSBuYW1lPXtwcmltYXJ5VGV4dH0gey4uLnByb3BzfSBmdWxsV2lkdGg9e3RydWV9XHJcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdERhdGU9e3ZhbHVlfS8+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9GdWxsUGFnZT5cclxuXHRcdClcclxuXHR9XHJcblx0LGN1c3RvbWl6ZWQoe29uRWRpdCwgb25DYW5jZWwsIGhpbnRUZXh0LHZhbHVlLHByaW1hcnlUZXh0LCBjaGlsZHJlbiwgcGFnZX0pe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZ1bGxQYWdlPlxyXG5cdFx0XHRcdDxUaXRsZSB7Li4ue29uRWRpdDphPT57XHJcblx0XHRcdFx0XHRcdGxldCBwPW9uRWRpdCgpXHJcblx0XHRcdFx0XHRcdGlmKHAgJiYgcC50aGVuKVxyXG5cdFx0XHRcdFx0XHRcdHAudGhlbihvbkNhbmNlbClcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2FuY2VsKClcclxuXHRcdFx0XHRcdH0sIG9uQ2FuY2VsLCBwcmltYXJ5VGV4dCwgaXNDaGFuZ2U6ISF2YWx1ZX19Lz5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdDwvRnVsbFBhZ2U+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBUaXRsZT0oe29uRWRpdCwgb25DYW5jZWwsIHByaW1hcnlUZXh0LCBpc0NoYW5nZX0pPT4oXHJcblx0PEFwcEJhciB0aXRsZT17YCR7aXNDaGFuZ2UgPyBcIuabtOaUuVwiIDpcIlwifSR7cHJpbWFyeVRleHR9YH1cclxuXHRcdGljb25FbGVtZW50TGVmdD17PEljb25CdXR0b24gb25DbGljaz17b25DYW5jZWx9PjxOYXZpZ2F0aW9uQmFjay8+PC9JY29uQnV0dG9uPn1cclxuXHRcdGljb25FbGVtZW50UmlnaHQ9ezxSYWlzZWRCdXR0b24gbGFiZWw9XCLkv53lrZhcIiBvbkNsaWNrPXtvbkVkaXR9IHByaW1hcnk9e3RydWV9Lz59XHJcblx0XHQvPlxyXG4pXHJcbiJdfQ==