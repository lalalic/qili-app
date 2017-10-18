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

var _onEdit = function _onEdit(v, onEdit, onCancel, onError) {
	var p = onEdit(v);
	if (p && p.then) p.then(onCancel, function (e) {
		return refEditor.errorText = e;
	});else onCancel();
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
					if (value == refEditor.getValue()) {
						onCancel();
						return;
					}
					_onEdit(refEditor.getValue(), _onEdit2, onCancel, function (e) {
						return refEditor.errorText = e;
					});
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
					onChange: function onChange(e, newValue) {
						if (newValue !== value) {
							onEdit(newValue);
						}
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
				title: _react2.default.createElement(Title, {
					onEdit: function onEdit(a) {
						if (v1.length != selecteds.length || v1.findIndex(function (a, i) {
							return selecteds[i] !== a;
						}) != -1) {
							_onEdit3(selecteds);
						}
						onCancel();
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
		if (value) {
			props.defaultDate = value;
		}
		var refEditor = void 0;
		return _react2.default.createElement(
			_fullPage2.default,
			null,
			_react2.default.createElement(Title, { onEdit: function onEdit(a) {
					if (refEditor.getDate() == value) {
						onCancel();
						return;
					}
					_onEdit4(refEditor.getDate());
					onCancel();
				}, onCancel: onCancel, primaryText: primaryText, isChange: !!value }),
			_react2.default.createElement(
				"div",
				{ style: { padding: 5 } },
				_react2.default.createElement(_materialUi.DatePicker, _extends({ ref: function ref(a) {
						return refEditor = a;
					},
					autoOk: true,
					name: primaryText
				}, props, {
					fullWidth: true }))
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