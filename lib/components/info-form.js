"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Field = exports.InfoForm = undefined;

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
			var editing = this.state.editing;

			var editor = null,
			    len = children.length;
			if (editing) {
				var _children$props = children[editing - 1].props,
				    onEdit = _children$props.onEdit,
				    hintText = _children$props.hintText,
				    value = _children$props.value,
				    primaryText = _children$props.primaryText,
				    type = _children$props.type,
				    options = _children$props.options,
				    _children$props$TheEd = _children$props.TheEditor,
				    TheEditor = _children$props$TheEd === undefined ? Editor[type] : _children$props$TheEd;
				var page = this.context.muiTheme.page;

				editor = _react2.default.createElement(TheEditor, (0, _extends3.default)({ page: page
				}, { onEdit: onEdit, hintText: hintText, value: value, primaryText: primaryText, options: options }, {
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
						    others = (0, _objectWithoutProperties3.default)(_child$props, ["onEdit", "hintText", "value", "primaryText", "type", "options"]);

						if (elementType == Field) {
							others.primaryText = primaryText;
							if (value) others.rightIcon = _react2.default.createElement(Value, { value: value });
							if (onEdit) others.onClick = function (e) {
								return _this2.setState({ editing: i + 1 });
							};
							return _react2.default.createElement(_materialUi.ListItem, (0, _extends3.default)({}, others, { key: i }));
						} else return _react2.default.cloneElement(child, { key: i });
					}).reduce(function (state, a, i) {
						state.push(a);
						if (i + 1 != len) state.push(_react2.default.createElement(_materialUi.Divider, { key: "_" + i }));
						return state;
					}, [])
				),
				editor
			);
		}
	}]);
	return InfoForm;
}(_react.Component);

InfoForm.contextTypes = {
	muiTheme: _react.PropTypes.object
};


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
			_materialUi.Dialog,
			{ open: true,
				onRequestClose: onCancel,
				title: _react2.default.createElement(Title, { onEdit: function onEdit(a) {
						return _onEdit(refEditor.getValue());
					}, onCancel: onCancel, primaryText: primaryText, isChange: !!value }) },
			_react2.default.createElement(_materialUi.TextField, (0, _extends3.default)({ ref: function ref(a) {
					return refEditor = a;
				} }, props, { fullWidth: true, defaultValue: value }))
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
	multiple: function multiple() {},
	date: function date() {}
};

var Title = function Title(_ref5) {
	var onEdit = _ref5.onEdit,
	    onCancel = _ref5.onCancel,
	    primaryText = _ref5.primaryText,
	    isChange = _ref5.isChange;
	return _react2.default.createElement(_materialUi.AppBar, { title: "" + (isChange ? "更改" : "") + primaryText,
		iconElementLeft: _react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: onCancel },
			_react2.default.createElement(_keyboardArrowLeft2.default, null)
		),
		iconElementRight: _react2.default.createElement(_materialUi.RaisedButton, { label: "\u4FDD\u5B58", onClick: onEdit, primary: true })
	});
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2luZm8tZm9ybS5qcyJdLCJuYW1lcyI6WyJJbmZvRm9ybSIsInN0YXRlIiwiZWRpdGluZyIsInByb3BzIiwiY2hpbGRyZW4iLCJvdGhlcnMiLCJlZGl0b3IiLCJsZW4iLCJsZW5ndGgiLCJvbkVkaXQiLCJoaW50VGV4dCIsInZhbHVlIiwicHJpbWFyeVRleHQiLCJ0eXBlIiwib3B0aW9ucyIsIlRoZUVkaXRvciIsIkVkaXRvciIsInBhZ2UiLCJjb250ZXh0IiwibXVpVGhlbWUiLCJzZXRTdGF0ZSIsIm1hcCIsImNoaWxkIiwiaSIsImVsZW1lbnRUeXBlIiwiRmllbGQiLCJyaWdodEljb24iLCJvbkNsaWNrIiwiY2xvbmVFbGVtZW50Iiwia2V5IiwicmVkdWNlIiwiYSIsInB1c2giLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJWYWx1ZSIsInN0eWxlIiwiY29sb3IiLCJ3aWR0aCIsImlucHV0Iiwib25DYW5jZWwiLCJmbG9hdGluZ0xhYmVsRml4ZWQiLCJmbG9hdGluZ0xhYmVsVGV4dCIsInJlZkVkaXRvciIsImdldFZhbHVlIiwiaXNDaGFuZ2UiLCJzaW5nbGUiLCJlIiwib3B0IiwibGFiZWwiLCJtdWx0aXBsZSIsImRhdGUiLCJUaXRsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7O0lBR2FBLFEsV0FBQUEsUTs7Ozs7Ozs7Ozs7Ozs7OE1BQ1pDLEssR0FBTSxFQUFDQyxTQUFRLENBQVQsRTs7Ozs7MkJBQ0U7QUFBQTs7QUFBQSxnQkFDcUIsS0FBS0MsS0FEMUI7QUFBQSxPQUNBQyxRQURBLFVBQ0FBLFFBREE7QUFBQSxPQUNhQyxNQURiO0FBQUEsT0FFQUgsT0FGQSxHQUVTLEtBQUtELEtBRmQsQ0FFQUMsT0FGQTs7QUFHUCxPQUFJSSxTQUFPLElBQVg7QUFBQSxPQUFpQkMsTUFBSUgsU0FBU0ksTUFBOUI7QUFDQSxPQUFH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QUFBQSxLQUFpQ2lDLFFBQWpDLFNBQWlDQSxRQUFqQztBQUFBLFFBQ1gsb0RBQVEsYUFBVUEsV0FBVyxJQUFYLEdBQWlCLEVBQTNCLElBQWdDakMsV0FBeEM7QUFDQyxtQkFBaUI7QUFBQTtBQUFBLEtBQVksU0FBUzRCLFFBQXJCO0FBQStCO0FBQS9CLEdBRGxCO0FBRUMsb0JBQWtCLDBEQUFjLE9BQU0sY0FBcEIsRUFBeUIsU0FBUy9CLE1BQWxDLEVBQTBDLFNBQVMsSUFBbkQ7QUFGbkIsR0FEVztBQUFBLENBQVoiLCJmaWxlIjoiaW5mby1mb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW0sIERpdmlkZXIsIERpYWxvZywgVGV4dEZpZWxkLCBBcHBCYXIsUmFpc2VkQnV0dG9uLEljb25CdXR0b24sIFJhZGlvQnV0dG9uR3JvdXAsIFJhZGlvQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgTmF2aWdhdGlvbkJhY2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSW5mb0Zvcm0gZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e2VkaXRpbmc6MH1cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7ZWRpdGluZ309dGhpcy5zdGF0ZVxyXG5cdFx0bGV0IGVkaXRvcj1udWxsLCBsZW49Y2hpbGRyZW4ubGVuZ3RoXHJcblx0XHRpZihlZGl0aW5nKXtcclxuXHRcdFx0Y29uc3Qge29uRWRpdCxoaW50VGV4dCx2YWx1ZSxwcmltYXJ5VGV4dCx0eXBlLCBvcHRpb25zLFRoZUVkaXRvcj1FZGl0b3JbdHlwZV19PWNoaWxkcmVuW2VkaXRpbmctMV0ucHJvcHNcclxuXHRcdFx0Y29uc3Qge3BhZ2V9PXRoaXMuY29udGV4dC5tdWlUaGVtZVxyXG5cdFx0XHRlZGl0b3I9KDxUaGVFZGl0b3IgcGFnZT17cGFnZX1cclxuXHRcdFx0XHR7Li4ue29uRWRpdCxoaW50VGV4dCx2YWx1ZSxwcmltYXJ5VGV4dCxvcHRpb25zfX0gXHJcblx0XHRcdFx0b25DYW5jZWw9e2U9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6MH0pfS8+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PExpc3Qgey4uLm90aGVyc30+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Y2hpbGRyZW4ubWFwKChjaGlsZCxpKT0+e1xyXG5cdFx0XHRcdFx0XHRjb25zdCB7dHlwZTplbGVtZW50VHlwZSwgcHJvcHM6e29uRWRpdCxoaW50VGV4dCx2YWx1ZSwgcHJpbWFyeVRleHQsIHR5cGU9XCJpbnB1dFwiLCBvcHRpb25zLC4uLm90aGVyc319PWNoaWxkXHJcblx0XHRcdFx0XHRcdGlmKGVsZW1lbnRUeXBlPT1GaWVsZCl7XHJcblx0XHRcdFx0XHRcdFx0b3RoZXJzLnByaW1hcnlUZXh0PXByaW1hcnlUZXh0XHJcblx0XHRcdFx0XHRcdFx0aWYodmFsdWUpXHJcblx0XHRcdFx0XHRcdFx0XHRvdGhlcnMucmlnaHRJY29uPSg8VmFsdWUgdmFsdWU9e3ZhbHVlfS8+KVxyXG5cdFx0XHRcdFx0XHRcdGlmKG9uRWRpdClcclxuXHRcdFx0XHRcdFx0XHRcdG90aGVycy5vbkNsaWNrPWU9PnRoaXMuc2V0U3RhdGUoe2VkaXRpbmc6aSsxfSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPExpc3RJdGVtIHsuLi5vdGhlcnN9IGtleT17aX0vPlxyXG5cdFx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQse2tleTppfSlcclxuXHRcdFx0XHRcdH0pLnJlZHVjZSgoc3RhdGUsYSxpKT0+e1xyXG5cdFx0XHRcdFx0XHRzdGF0ZS5wdXNoKGEpXHJcblx0XHRcdFx0XHRcdGlmKGkrMSE9bGVuKVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLnB1c2goPERpdmlkZXIga2V5PXtgXyR7aX1gfS8+KVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHRcdH0sW10pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvTGlzdD5cclxuXHRcdFx0XHR7ZWRpdG9yfVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRtdWlUaGVtZTogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG5cclxuY29uc3QgVmFsdWU9KHt2YWx1ZSxzdHlsZT17fX0pPT4oPHNwYW4gc3R5bGU9e3suLi5zdHlsZSxjb2xvcjpcImxpZ2h0Z3JheVwiLCB3aWR0aDpcImF1dG9cIn19Pnt2YWx1ZX08L3NwYW4+KVxyXG5cclxuZXhwb3J0IGNvbnN0IEZpZWxkPSgpPT5udWxsXHJcblxyXG5jb25zdCBFZGl0b3I9e1xyXG5cdGlucHV0KHtvbkVkaXQsIG9uQ2FuY2VsLCBoaW50VGV4dCx2YWx1ZSxwcmltYXJ5VGV4dCwgcGFnZX0pe1xyXG5cdFx0bGV0IHByb3BzPXt9XHJcblx0XHRpZihoaW50VGV4dCl7XHJcblx0XHRcdHByb3BzPXtcclxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsRml4ZWQ6dHJ1ZSxcclxuXHRcdFx0XHRmbG9hdGluZ0xhYmVsVGV4dDpoaW50VGV4dFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRsZXQgcmVmRWRpdG9yXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8RGlhbG9nIG9wZW49e3RydWV9IFxyXG5cdFx0XHRcdG9uUmVxdWVzdENsb3NlPXtvbkNhbmNlbH1cclxuXHRcdFx0XHR0aXRsZT17PFRpdGxlIHsuLi57b25FZGl0OmE9Pm9uRWRpdChyZWZFZGl0b3IuZ2V0VmFsdWUoKSksIG9uQ2FuY2VsLCBwcmltYXJ5VGV4dCwgaXNDaGFuZ2U6ISF2YWx1ZX19Lz59PlxyXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZFZGl0b3I9YX0gey4uLnByb3BzfSBmdWxsV2lkdGg9e3RydWV9IGRlZmF1bHRWYWx1ZT17dmFsdWV9Lz5cclxuXHRcdFx0PC9EaWFsb2c+XHJcblx0XHQpXHJcblx0fVxyXG5cdCxzaW5nbGUoe29uRWRpdCwgb25DYW5jZWwsIGhpbnRUZXh0LHZhbHVlLHByaW1hcnlUZXh0LCBwYWdlLCBvcHRpb25zLCBsZW49b3B0aW9ucy5sZW5ndGh9KXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxEaWFsb2cgb3Blbj17dHJ1ZX0gXHJcblx0XHRcdFx0b25SZXF1ZXN0Q2xvc2U9e29uQ2FuY2VsfVxyXG5cdFx0XHRcdHRpdGxlPXtwcmltYXJ5VGV4dH0+XHJcblx0XHRcdFx0PFJhZGlvQnV0dG9uR3JvdXAgbmFtZT17cHJpbWFyeVRleHR9IFxyXG5cdFx0XHRcdFx0dmFsdWVTZWxlY3RlZD17dmFsdWV9XHJcblx0XHRcdFx0XHRsYWJlbFBvc2l0aW9uPVwibGVmdFwiIFxyXG5cdFx0XHRcdFx0b25DaGFuZ2U9eyhlLHZhbHVlKT0+e1xyXG5cdFx0XHRcdFx0XHRvbkVkaXQodmFsdWUpXHJcblx0XHRcdFx0XHRcdG9uQ2FuY2VsKClcclxuXHRcdFx0XHRcdH19PlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG9wdGlvbnMubWFwKChvcHQsaSk9PntcclxuXHRcdFx0XHRcdFx0bGV0IHZhbHVlLGxhYmVsXHJcblx0XHRcdFx0XHRcdGlmKHR5cGVvZihvcHQpPT0nb2JqZWN0Jyl7XHJcblx0XHRcdFx0XHRcdFx0dmFsdWU9b3B0LnZhbHVlXHJcblx0XHRcdFx0XHRcdFx0bGFiZWw9b3B0LmxhYmVsfHx2YWx1ZVxyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHR2YWx1ZT1sYWJlbD1vcHRcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdDxSYWRpb0J1dHRvbiBrZXk9e2l9XHJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZT17dmFsdWV9XHJcblx0XHRcdFx0XHRcdFx0XHRsYWJlbD17bGFiZWx9XHJcblx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQ8L1JhZGlvQnV0dG9uR3JvdXA+XHJcblx0XHRcdDwvRGlhbG9nPlxyXG5cdFx0KVxyXG5cdH1cclxuXHQsbXVsdGlwbGUoKXtcclxuXHRcdFxyXG5cdH1cclxuXHQsZGF0ZSgpe1xyXG5cdFx0XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBUaXRsZT0oe29uRWRpdCwgb25DYW5jZWwsIHByaW1hcnlUZXh0LCBpc0NoYW5nZX0pPT4oXHJcblx0PEFwcEJhciB0aXRsZT17YCR7aXNDaGFuZ2UgPyBcIuabtOaUuVwiIDpcIlwifSR7cHJpbWFyeVRleHR9YH0gXHJcblx0XHRpY29uRWxlbWVudExlZnQ9ezxJY29uQnV0dG9uIG9uQ2xpY2s9e29uQ2FuY2VsfT48TmF2aWdhdGlvbkJhY2svPjwvSWNvbkJ1dHRvbj59XHJcblx0XHRpY29uRWxlbWVudFJpZ2h0PXs8UmFpc2VkQnV0dG9uIGxhYmVsPVwi5L+d5a2YXCIgb25DbGljaz17b25FZGl0fSBwcmltYXJ5PXt0cnVlfS8+fVxyXG5cdFx0Lz5cclxuKSJdfQ==