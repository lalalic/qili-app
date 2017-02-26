'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cloud = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _selector = require('./selector');

var _fileUpload = require('material-ui/svg-icons/file/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _save = require('material-ui/svg-icons/content/save');

var _save2 = _interopRequireDefault(_save);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _.UI.CommandBar,
    fileSelector = _.UI.fileSelector,
    Messager = _.UI.Messager;
var DOMAIN = exports.DOMAIN = "cloudCode";

var ACTION = exports.ACTION = {
	UPDATE: function UPDATE(code) {
		return function (dispatch, getState) {
			try {
				var app = (0, _selector.getCurrentApp)(getState());
				if (code === app.cloudCode) return Promise.resolve();
				new Function("Cloud", code);
				app.cloudCode = code;
				return _app2.default.upsert(app).catch(function (e) {
					return alert(e.message);
				}).then(function (a) {
					return dispatch({ type: '@@' + DOMAIN + '/updated' });
				});
			} catch (error) {
				return Promise.reject(error).catch(function (e) {
					return alert(e.message);
				});
			}
		};
	},
	UPLOAD: function UPLOAD(a) {
		return function (dispatch) {
			return fileSelector.selectTextFile().then(function (_ref) {
				var code = _ref.data;
				return dispatch(ACTION.UPDATE(code));
			});
		};
	}
};

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref2 = arguments[1];
	var type = _ref2.type,
	    payload = _ref2.payload;

	switch (type) {
		case '@@' + DOMAIN + '/updated':
			return {};
	}
	return state;
};

var Cloud = exports.Cloud = function (_Component) {
	_inherits(Cloud, _Component);

	function Cloud() {
		_classCallCheck(this, Cloud);

		var _this = _possibleConstructorReturn(this, (Cloud.__proto__ || Object.getPrototypeOf(Cloud)).apply(this, arguments));

		_this.state = { cloudCode: _this.props.cloudCode };
		return _this;
	}

	_createClass(Cloud, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(next) {
			this.setState({ cloudCode: next.cloudCode });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var dispatch = this.props.dispatch;
			var cloudCode = this.state.cloudCode;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement('textarea', { value: cloudCode || "",
					onChange: function onChange(_ref3) {
						var value = _ref3.target.value;
						return _this2.setState({ cloudCode: value });
					},
					placeholder: 'Cloud nodejs code',
					style: { position: 'absolute', height: '100%', top: 0, lineHeight: '2em',
						margin: 0, width: '100%', padding: 10, paddingBottom: 51, border: 0 } }),
				_react2.default.createElement(CommandBar, { className: 'footbar',
					items: [{ action: "Back" }, { action: "Upload", icon: _react2.default.createElement(_fileUpload2.default, null),
						onSelect: function onSelect(e) {
							return dispatch(ACTION.UPLOAD());
						}
					}, { action: "Save", icon: _react2.default.createElement(_save2.default, null),
						onSelect: function onSelect(e) {
							return dispatch(ACTION.UPDATE(_this2.state.cloudCode));
						}
					}] })
			);
		}
	}]);

	return Cloud;
}(_react.Component);

exports.default = Object.assign(Cloud, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJET01BSU4iLCJBQ1RJT04iLCJVUERBVEUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiYXBwIiwiY29kZSIsImNsb3VkQ29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiRnVuY3Rpb24iLCJ1cHNlcnQiLCJjYXRjaCIsImFsZXJ0IiwiZSIsIm1lc3NhZ2UiLCJ0aGVuIiwidHlwZSIsImVycm9yIiwicmVqZWN0IiwiVVBMT0FEIiwic2VsZWN0VGV4dEZpbGUiLCJkYXRhIiwiUkVEVUNFUiIsInN0YXRlIiwicGF5bG9hZCIsIkNsb3VkIiwiYXJndW1lbnRzIiwicHJvcHMiLCJuZXh0Iiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInBvc2l0aW9uIiwiaGVpZ2h0IiwidG9wIiwibGluZUhlaWdodCIsIm1hcmdpbiIsIndpZHRoIiwicGFkZGluZyIsInBhZGRpbmdCb3R0b20iLCJib3JkZXIiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFT0EsVSxRQUFBQSxVO0lBQVlDLFksUUFBQUEsWTtJQUFjQyxRLFFBQUFBLFE7QUFFMUIsSUFBTUMsMEJBQU8sV0FBYjs7QUFFQSxJQUFNQywwQkFBTztBQUNuQkMsU0FBUTtBQUFBLFNBQU0sVUFBQ0MsUUFBRCxFQUFVQyxRQUFWLEVBQXFCO0FBQ2xDLE9BQUc7QUFDRixRQUFJQyxNQUFJLDZCQUFjRCxVQUFkLENBQVI7QUFDQSxRQUFHRSxTQUFPRCxJQUFJRSxTQUFkLEVBQ0MsT0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0QsUUFBSUMsUUFBSixDQUFhLE9BQWIsRUFBcUJKLElBQXJCO0FBQ0FELFFBQUlFLFNBQUosR0FBY0Qs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Z0JBQWhCLEVBQXBCLEMiLCJmaWxlIjoiY2xvdWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7VUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IHtnZXRDdXJyZW50QXBwfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBTYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcblxuY29uc3Qge0NvbW1hbmRCYXIsIGZpbGVTZWxlY3RvciwgTWVzc2FnZXJ9PVVJXG5cbmV4cG9ydCBjb25zdCBET01BSU49XCJjbG91ZENvZGVcIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0VVBEQVRFOiBjb2RlPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0dHJ5e1xuXHRcdFx0bGV0IGFwcD1nZXRDdXJyZW50QXBwKGdldFN0YXRlKCkpXG5cdFx0XHRpZihjb2RlPT09YXBwLmNsb3VkQ29kZSlcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHRuZXcgRnVuY3Rpb24oXCJDbG91ZFwiLGNvZGUpXG5cdFx0XHRhcHAuY2xvdWRDb2RlPWNvZGVcblx0XHRcdHJldHVybiBBcHAudXBzZXJ0KGFwcClcblx0XHRcdFx0LmNhdGNoKGU9PmFsZXJ0KGUubWVzc2FnZSkpXG5cdFx0XHRcdC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGRhdGVkYH0pKVxuXHRcdH1jYXRjaChlcnJvcil7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpXG5cdFx0XHRcdC5jYXRjaChlPT5hbGVydChlLm1lc3NhZ2UpKVxuXHRcdH1cblx0fVxuXHQsVVBMT0FEOiBhPT5kaXNwYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdFRleHRGaWxlKClcblx0XHQudGhlbigoe2RhdGE6Y29kZX0pPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKGNvZGUpKSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LCB7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcblx0XHRyZXR1cm4ge31cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIENsb3VkIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXtjbG91ZENvZGU6dGhpcy5wcm9wcy5jbG91ZENvZGV9XG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2Nsb3VkQ29kZTpuZXh0LmNsb3VkQ29kZX0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7ZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7Y2xvdWRDb2RlfT10aGlzLnN0YXRlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDx0ZXh0YXJlYSB2YWx1ZT17Y2xvdWRDb2RlfHxcIlwifVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnRoaXMuc2V0U3RhdGUoe2Nsb3VkQ29kZTp2YWx1ZX0pfVxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiQ2xvdWQgbm9kZWpzIGNvZGVcIlxuXHRcdFx0XHRcdHN0eWxlPXt7cG9zaXRpb246J2Fic29sdXRlJywgaGVpZ2h0OiAnMTAwJScsIHRvcDowLGxpbmVIZWlnaHQ6JzJlbScsXG5cdFx0XHRcdFx0XHRtYXJnaW46MCx3aWR0aDonMTAwJScsIHBhZGRpbmc6MTAsIHBhZGRpbmdCb3R0b206NTEsYm9yZGVyOjB9fS8+XG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJVcGxvYWRcIiwgaWNvbjo8VXBsb2FkLz4sXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUExPQUQoKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCx7YWN0aW9uOlwiU2F2ZVwiLGljb246PFNhdmUvPixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURSh0aGlzLnN0YXRlLmNsb3VkQ29kZSkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XX0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQ2xvdWQse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxuIl19