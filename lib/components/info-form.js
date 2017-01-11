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
		var _onEdit2 = _ref3.onEdit,
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
					var p = _onEdit2(refEditor.getValue());
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
		var _onEdit3 = _ref5.onEdit,
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
						return _onEdit3(selecteds);
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
		var _onEdit4 = _ref6.onEdit,
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
					var p = _onEdit4(refEditor.getDate());
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
		var onEdit = _ref7.onEdit,
		    onCancel = _ref7.onCancel,
		    hintText = _ref7.hintText,
		    value = _ref7.value,
		    primaryText = _ref7.primaryText,
		    children = _ref7.children,
		    page = _ref7.page;

		var _onEdit5 = onEdit;
		if (onEdit) {
			_onEdit5 = function _onEdit(a) {
				var p = _onEdit5();
				if (p && p.then) p.then(onCancel);else onCancel();
			};
		}
		return _react2.default.createElement(
			_fullPage2.default,
			null,
			_react2.default.createElement(Title, { onEdit: _onEdit5, onCancel: onCancel, primaryText: primaryText, isChange: !!value }),
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
		iconElementRight: onEdit ? _react2.default.createElement(_materialUi.RaisedButton, { label: "\u4FDD\u5B58", onClick: onEdit, primary: true }) : null
	});
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2luZm8tZm9ybS5qcyJdLCJuYW1lcyI6WyJJbmZvRm9ybSIsInN0YXRlIiwiZWRpdGluZyIsInByb3BzIiwiY2hpbGRyZW4iLCJvdGhlcnMiLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJlZGl0b3IiLCJsZW4iLCJsZW5ndGgiLCJvbkVkaXQiLCJoaW50VGV4dCIsInZhbHVlIiwicHJpbWFyeVRleHQiLCJ0eXBlIiwib3B0aW9ucyIsImN1c3RvbWl6ZWRFZGl0b3IiLCJUaGVFZGl0b3IiLCJFZGl0b3IiLCJzZXRTdGF0ZSIsIm1hcCIsImNoaWxkIiwiaSIsImVsZW1lbnRUeXBlIiwiRmllbGQiLCJkaXNwbGF5IiwicmVkdWNlIiwiZm91bmQiLCJhIiwibGFiZWwiLCJmIiwiZmluZCIsIm8iLCJqb2luIiwiZm9ybWF0IiwicmlnaHRJY29uIiwib25DbGljayIsImNsb25lRWxlbWVudCIsImtleSIsInB1c2giLCJWYWx1ZSIsInN0eWxlIiwiY29sb3IiLCJ3aWR0aCIsImlucHV0Iiwib25DYW5jZWwiLCJwYWdlIiwiZmxvYXRpbmdMYWJlbEZpeGVkIiwiZmxvYXRpbmdMYWJlbFRleHQiLCJyZWZFZGl0b3IiLCJwIiwiZ2V0VmFsdWUiLCJ0aGVuIiwiZXJyb3JUZXh0IiwiZSIsImlzQ2hhbmdlIiwicGFkZGluZyIsInNpbmdsZSIsIm9wdCIsIm11bHRpcGxlIiwidjEiLCJzZWxlY3RlZHMiLCJjaGVja2VkIiwic2VsZWN0ZWQiLCJzcGxpY2UiLCJpbmRleE9mIiwiZGF0ZSIsImdldERhdGUiLCJjdXN0b21pemVkIiwiX29uRWRpdCIsIlRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFHQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHYUEsUSxXQUFBQSxROzs7Ozs7Ozs7Ozs7Ozt3TEFDWkMsSyxHQUFNLEVBQUNDLFNBQVEsQ0FBVCxFOzs7OzsyQkFDRTtBQUFBOztBQUFB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O0FBQUEsS0FBaUMwQyxRQUFqQyxTQUFpQ0EsUUFBakM7QUFBQSxRQUNYLG9EQUFRLGFBQVVBLFdBQVcsSUFBWCxHQUFpQixFQUEzQixJQUFnQzFDLFdBQXhDO0FBQ0MsbUJBQWlCO0FBQUE7QUFBQSxLQUFZLFNBQVNnQyxRQUFyQjtBQUErQjtBQUEvQixHQURsQjtBQUVDLG9CQUFrQm5DLFNBQVMsMERBQWMsT0FBTSxjQUFwQixFQUF5QixTQUFTQSxNQUFsQyxFQUEwQyxTQUFTLElBQW5ELEdBQVQsR0FBc0U7QUFGekYsR0FEVztBQUFBLENBQVoiLCJmaWxlIjoiaW5mby1mb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW0sIERpdmlkZXIsIERpYWxvZywgRGF0ZVBpY2tlcixcclxuXHRcdEFwcEJhcixSYWlzZWRCdXR0b24sSWNvbkJ1dHRvbixcclxuXHRcdFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgTmF2aWdhdGlvbkJhY2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcclxuXHJcbmltcG9ydCBUZXh0RmllbGQgZnJvbSBcIi4vdGV4dC1maWVsZFwiXHJcbmltcG9ydCBGdWxsUGFnZSBmcm9tIFwiLi9mdWxsLXBhZ2VcIlxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBJbmZvRm9ybSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRzdGF0ZT17ZWRpdGluZzowfVxyXG5cdHJlbmRlcigpe1xyXG5cdFx0bGV0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRjaGlsZHJlbj1SZWFjdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKVxyXG5cdFx0Y29uc3Qge2VkaXRpbmd9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBlZGl0b3I9bnVsbCwgbGVuPWNoaWxkcmVuLmxlbmd0aFxyXG5cdFx0aWYoZWRpdGluZyl7XHJcblx0XHRcdGNvbnN0IHtvbkVkaXQsaGludFRleHQsdmFsdWUscHJpbWFyeVRleHQsdHlwZT1cImlucHV0XCIsIG9wdGlvbnMsY2hpbGRyZW46Y3VzdG9taXplZEVkaXRvcn09Y2hpbGRyZW5bZWRpdGluZy0xXS5wcm9wc1xyXG5cdFx0XHRsZXQgVGhlRWRpdG9yPUVkaXRvcltjdXN0b21pemVkRWRpdG9yID8gXCJjdXN0b21pemVkXCIgOiB0eXBlXVxyXG5cdFx0XHRlZGl0b3I9KDxUaGVFZGl0b3JcclxuXHRcdFx0XHR7Li4ue29uRWRpdCxoaW50VGV4dCx2YWx1ZSxwcmltYXJ5VGV4dCxvcHRpb25zLGNoaWxkcmVuOmN1c3RvbWl6ZWRFZGl0b3J9fVxyXG5cdFx0XHRcdG9uQ2FuY2VsPXtlPT50aGlzLnNldFN0YXRlKHtlZGl0aW5nOjB9KX0vPlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxMaXN0IHsuLi5vdGhlcnN9PlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGNoaWxkcmVuLm1hcCgoY2hpbGQsaSk9PntcclxuXHRcdFx0XHRcdFx0Y29uc3Qge3R5cGU6ZWxlbWVudFR5cGUsIHByb3BzOntvbkVkaXQsaGludFRleHQsdmFsdWUsIHByaW1hcnlUZXh0LCB0eXBlPVwiaW5wdXRcIiwgb3B0aW9ucyxjaGlsZHJlbiwgLi4ub3RoZXJzfX09Y2hpbGRcclxuXHRcdFx0XHRcdFx0aWYoZWxlbWVudFR5cGU9PUZpZWxkKXtcclxuXHRcdFx0XHRcdFx0XHRvdGhlcnMucHJpbWFyeVRleHQ9cHJpbWFyeVRleHRcclxuXHRcdFx0XHRcdFx0XHRpZih2YWx1ZSl7XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgZGlzcGxheT12YWx1ZVxyXG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcInNpbmdsZVwiOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5PW9wdGlvbnMucmVkdWNlKChmb3VuZCxhKT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKGZvdW5kIT1udWxsKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoYT09dmFsdWUpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYodHlwZW9mKGEpPT1cIm9iamVjdFwiICYmIGEudmFsdWU9PXZhbHVlKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGEubGFiZWx8fGEudmFsdWVcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSxudWxsKVxyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0XHRcdGNhc2UgXCJtdWx0aXBsZVwiOlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5PSh2YWx1ZXx8W10pLm1hcChhPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGV0IGY9b3B0aW9ucy5maW5kKG89PmE9PW98fGE9PW8udmFsdWUpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHR5cGVvZihmKT09XCJvYmplY3RcIiA/IGYubGFiZWx8fGYudmFsdWUgOiBmXHJcblx0XHRcdFx0XHRcdFx0XHRcdH0pLmpvaW4oXCIsXCIpXHJcblx0XHRcdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBcImRhdGVcIjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheT12YWx1ZSA/IHZhbHVlLmZvcm1hdCgpIDogXCJcIlxyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdG90aGVycy5yaWdodEljb249KDxWYWx1ZSB2YWx1ZT17ZGlzcGxheX0vPilcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0aWYob25FZGl0IHx8IGNoaWxkcmVuKVxyXG5cdFx0XHRcdFx0XHRcdFx0b3RoZXJzLm9uQ2xpY2s9ZT0+dGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzppKzF9KVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiA8TGlzdEl0ZW0gey4uLm90aGVyc30ga2V5PXtpfS8+XHJcblx0XHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCx7a2V5Oml9KVxyXG5cdFx0XHRcdFx0fSkucmVkdWNlKChzdGF0ZSxhLGkpPT57XHJcblx0XHRcdFx0XHRcdHN0YXRlLnB1c2goYSlcclxuXHRcdFx0XHRcdFx0aWYoaSsxIT1sZW4gJiYgYS50eXBlPT1MaXN0SXRlbSlcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5wdXNoKDxEaXZpZGVyIGtleT17YF8ke2l9YH0vPilcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdFx0XHR9LFtdKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQ8L0xpc3Q+XHJcblx0XHRcdFx0e2VkaXRvcn1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBWYWx1ZT0oe3ZhbHVlLHN0eWxlPXt9fSk9PihcclxuXHQ8c3BhbiBzdHlsZT17ey4uLnN0eWxlLGNvbG9yOlwibGlnaHRncmF5XCIsIHdpZHRoOlwiYXV0b1wifX0+XHJcblx0e3ZhbHVlfVxyXG5cdDwvc3Bhbj5cclxuKVxyXG5cclxuZXhwb3J0IGNvbnN0IEZpZWxkPSgpPT5udWxsXHJcblxyXG5cclxuY29uc3QgRWRpdG9yPXtcclxuXHRpbnB1dCh7b25FZGl0LCBvbkNhbmNlbCwgaGludFRleHQsdmFsdWUscHJpbWFyeVRleHQsIHBhZ2V9KXtcclxuXHRcdGxldCBwcm9wcz17fVxyXG5cdFx0aWYoaGludFRleHQpe1xyXG5cdFx0XHRwcm9wcz17XHJcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbEZpeGVkOnRydWUsXHJcblx0XHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ6aGludFRleHRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bGV0IHJlZkVkaXRvclxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZ1bGxQYWdlPlxyXG5cdFx0XHRcdDxUaXRsZSB7Li4ue29uRWRpdDphPT57XHJcblx0XHRcdFx0XHRcdGxldCBwPW9uRWRpdChyZWZFZGl0b3IuZ2V0VmFsdWUoKSlcclxuXHRcdFx0XHRcdFx0aWYocCAmJiBwLnRoZW4pXHJcblx0XHRcdFx0XHRcdFx0cC50aGVuKG9uQ2FuY2VsLCBlPT5yZWZFZGl0b3IuZXJyb3JUZXh0PWUpXHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRvbkNhbmNlbCgpXHJcblx0XHRcdFx0XHR9LCBvbkNhbmNlbCwgcHJpbWFyeVRleHQsIGlzQ2hhbmdlOiEhdmFsdWV9fS8+XHJcblx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0PFRleHRGaWVsZCByZWY9e2E9PnJlZkVkaXRvcj1hfSB7Li4ucHJvcHN9XHJcblx0XHRcdFx0XHRcdG5hbWU9e3ByaW1hcnlUZXh0fSBmdWxsV2lkdGg9e3RydWV9IGRlZmF1bHRWYWx1ZT17dmFsdWV9Lz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9GdWxsUGFnZT5cclxuXHRcdClcclxuXHR9XHJcblx0LHNpbmdsZSh7b25FZGl0LCBvbkNhbmNlbCwgaGludFRleHQsdmFsdWUscHJpbWFyeVRleHQsIHBhZ2UsIG9wdGlvbnMsIGxlbj1vcHRpb25zLmxlbmd0aH0pe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PERpYWxvZyBvcGVuPXt0cnVlfVxyXG5cdFx0XHRcdG9uUmVxdWVzdENsb3NlPXtvbkNhbmNlbH1cclxuXHRcdFx0XHR0aXRsZT17cHJpbWFyeVRleHR9PlxyXG5cdFx0XHRcdDxSYWRpb0J1dHRvbkdyb3VwIG5hbWU9e3ByaW1hcnlUZXh0fVxyXG5cdFx0XHRcdFx0dmFsdWVTZWxlY3RlZD17dmFsdWV9XHJcblx0XHRcdFx0XHRsYWJlbFBvc2l0aW9uPVwibGVmdFwiXHJcblx0XHRcdFx0XHRvbkNoYW5nZT17KGUsdmFsdWUpPT57XHJcblx0XHRcdFx0XHRcdG9uRWRpdCh2YWx1ZSlcclxuXHRcdFx0XHRcdFx0b25DYW5jZWwoKVxyXG5cdFx0XHRcdFx0fX0+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0b3B0aW9ucy5tYXAoKG9wdCxpKT0+e1xyXG5cdFx0XHRcdFx0XHRsZXQgdmFsdWUsbGFiZWxcclxuXHRcdFx0XHRcdFx0aWYodHlwZW9mKG9wdCk9PSdvYmplY3QnKXtcclxuXHRcdFx0XHRcdFx0XHR2YWx1ZT1vcHQudmFsdWVcclxuXHRcdFx0XHRcdFx0XHRsYWJlbD1vcHQubGFiZWx8fHZhbHVlXHJcblx0XHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRcdHZhbHVlPWxhYmVsPW9wdFxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0PFJhZGlvQnV0dG9uIGtleT17aX1cclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cclxuXHRcdFx0XHRcdFx0XHRcdGxhYmVsPXtsYWJlbH1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvUmFkaW9CdXR0b25Hcm91cD5cclxuXHRcdFx0PC9EaWFsb2c+XHJcblx0XHQpXHJcblx0fVxyXG5cdCxtdWx0aXBsZSh7b25FZGl0LCBvbkNhbmNlbCwgaGludFRleHQsdmFsdWU6djE9W10scHJpbWFyeVRleHQsIG9wdGlvbnMsIHBhZ2UsIHNlbGVjdGVkcz1bLi4udjFdfSl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RGlhbG9nIG9wZW49e3RydWV9XHJcblx0XHRcdFx0b25SZXF1ZXN0Q2xvc2U9e29uQ2FuY2VsfVxyXG5cdFx0XHRcdHRpdGxlPXs8VGl0bGUgey4uLntvbkVkaXQ6YT0+b25FZGl0KHNlbGVjdGVkcyksIG9uQ2FuY2VsLCBwcmltYXJ5VGV4dCwgaXNDaGFuZ2U6ISF2YWx1ZX19Lz59PlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG9wdGlvbnMubWFwKChvcHQsaSk9PntcclxuXHRcdFx0XHRcdFx0bGV0IHZhbHVlLGxhYmVsXHJcblx0XHRcdFx0XHRcdGlmKHR5cGVvZihvcHQpPT0nb2JqZWN0Jyl7XHJcblx0XHRcdFx0XHRcdFx0dmFsdWU9b3B0LnZhbHVlXHJcblx0XHRcdFx0XHRcdFx0bGFiZWw9b3B0LmxhYmVsfHx2YWx1ZVxyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHR2YWx1ZT1sYWJlbD1vcHRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdDxDaGVja2JveCBrZXk9e2l9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNoZWNrPXsoZSxjaGVja2VkKT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZighY2hlY2tlZClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RlZC5zcGxpY2Uoc2VsZWN0ZWQuaW5kZXhPZih2YWx1ZSksMSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbGVjdGVkLnB1c2godmFsdWUpXHJcblx0XHRcdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0XHRcdFx0bGFiZWw9e2xhYmVsfVxyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWVMaW5rPXt2YWx1ZX1cclxuXHRcdFx0XHRcdFx0XHRcdGRlZmF1bHRDaGVja2VkPXt2MS5pbmRleE9mKHZhbHVlKSE9LTF9XHJcblx0XHRcdFx0XHRcdFx0XHRsYWJlbFBvc2l0aW9uPVwibGVmdFwiXHJcblx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0PC9EaWFsb2c+XHJcblx0XHQpXHJcblx0fVxyXG5cdCxkYXRlKHtvbkVkaXQsIG9uQ2FuY2VsLCBoaW50VGV4dCx2YWx1ZSxwcmltYXJ5VGV4dCwgcGFnZX0pe1xyXG5cdFx0bGV0IHByb3BzPXt9XHJcblx0XHRpZihoaW50VGV4dCl7XHJcblx0XHRcdHByb3BzPXtcclxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsRml4ZWQ6dHJ1ZSxcclxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dDpoaW50VGV4dFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRsZXQgcmVmRWRpdG9yXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RnVsbFBhZ2U+XHJcblx0XHRcdFx0PFRpdGxlIHsuLi57b25FZGl0OmE9PntcclxuXHRcdFx0XHRcdFx0bGV0IHA9b25FZGl0KHJlZkVkaXRvci5nZXREYXRlKCkpXHJcblx0XHRcdFx0XHRcdGlmKHAgJiYgcC50aGVuKVxyXG5cdFx0XHRcdFx0XHRcdHAudGhlbihvbkNhbmNlbCwgZT0+cmVmRWRpdG9yLmVycm9yVGV4dD1lKVxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0b25DYW5jZWwoKVxyXG5cdFx0XHRcdFx0fSwgb25DYW5jZWwsIHByaW1hcnlUZXh0LCBpc0NoYW5nZTohIXZhbHVlfX0vPlxyXG5cdFx0XHRcdFx0PGRpdiBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0XHRcdFx0XHQ8RGF0ZVBpY2tlciByZWY9e2E9PnJlZkVkaXRvcj1hfSBhdXRvT2s9e3RydWV9IG5hbWU9e3ByaW1hcnlUZXh0fSB7Li4ucHJvcHN9IGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0XHRkZWZhdWx0RGF0ZT17dmFsdWV9Lz5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L0Z1bGxQYWdlPlxyXG5cdFx0KVxyXG5cdH1cclxuXHQsY3VzdG9taXplZCh7b25FZGl0LCBvbkNhbmNlbCwgaGludFRleHQsdmFsdWUscHJpbWFyeVRleHQsIGNoaWxkcmVuLCBwYWdlfSl7XHJcblx0XHRsZXQgX29uRWRpdD1vbkVkaXRcclxuXHRcdGlmKG9uRWRpdCl7XHJcblx0XHRcdF9vbkVkaXQ9YT0+e1xyXG5cdFx0XHRcdGxldCBwPV9vbkVkaXQoKVxyXG5cdFx0XHRcdGlmKHAgJiYgcC50aGVuKVxyXG5cdFx0XHRcdFx0cC50aGVuKG9uQ2FuY2VsKVxyXG5cdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdG9uQ2FuY2VsKClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PEZ1bGxQYWdlPlxyXG5cdFx0XHRcdDxUaXRsZSB7Li4ue29uRWRpdDpfb25FZGl0LCBvbkNhbmNlbCwgcHJpbWFyeVRleHQsIGlzQ2hhbmdlOiEhdmFsdWV9fS8+XHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cdFx0XHQ8L0Z1bGxQYWdlPlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuY29uc3QgVGl0bGU9KHtvbkVkaXQsIG9uQ2FuY2VsLCBwcmltYXJ5VGV4dCwgaXNDaGFuZ2V9KT0+KFxyXG5cdDxBcHBCYXIgdGl0bGU9e2Ake2lzQ2hhbmdlID8gXCLmm7TmlLlcIiA6XCJcIn0ke3ByaW1hcnlUZXh0fWB9XHJcblx0XHRpY29uRWxlbWVudExlZnQ9ezxJY29uQnV0dG9uIG9uQ2xpY2s9e29uQ2FuY2VsfT48TmF2aWdhdGlvbkJhY2svPjwvSWNvbkJ1dHRvbj59XHJcblx0XHRpY29uRWxlbWVudFJpZ2h0PXtvbkVkaXQgPyA8UmFpc2VkQnV0dG9uIGxhYmVsPVwi5L+d5a2YXCIgb25DbGljaz17b25FZGl0fSBwcmltYXJ5PXt0cnVlfS8+IDogbnVsbH1cclxuXHRcdC8+XHJcbilcclxuIl19