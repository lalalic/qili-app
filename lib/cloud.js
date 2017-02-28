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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJET01BSU4iLCJBQ1RJT04iLCJVUERBVEUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiYXBwIiwiY29kZSIsImNsb3VkQ29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiRnVuY3Rpb24iLCJ1cHNlcnQiLCJjYXRjaCIsImFsZXJ0IiwiZSIsIm1lc3NhZ2UiLCJ0aGVuIiwidHlwZSIsImVycm9yIiwicmVqZWN0IiwiVVBMT0FEIiwic2VsZWN0VGV4dEZpbGUiLCJkYXRhIiwiUkVEVUNFUiIsInN0YXRlIiwicGF5bG9hZCIsIkNsb3VkIiwiYXJndW1lbnRzIiwicHJvcHMiLCJuZXh0Iiwic2V0U3RhdGUiLCJ2YWx1ZSIsInRhcmdldCIsInBvc2l0aW9uIiwiaGVpZ2h0IiwidG9wIiwibGluZUhlaWdodCIsIm1hcmdpbiIsIndpZHRoIiwicGFkZGluZyIsInBhZGRpbmdCb3R0b20iLCJib3JkZXIiLCJhY3Rpb24iLCJpY29uIiwib25TZWxlY3QiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFT0EsVSxRQUFBQSxVO0lBQVlDLFksUUFBQUEsWTtJQUFjQyxRLFFBQUFBLFE7QUFFMUIsSUFBTUMsMEJBQU8sV0FBYjs7QUFFQSxJQUFNQywwQkFBTztBQUNuQkMsU0FBUTtBQUFBLFNBQU0sVUFBQ0MsUUFBRCxFQUFVQyxRQUFWLEVBQXFCO0FBQ2xDLE9BQUc7QUFDRixRQUFJQyxNQUFJLDZCQUFjRCxVQUFkLENBQVI7QUFDQSxRQUFHRSxTQUFPRCxJQUFJRSxTQUFkLEVBQ0MsT0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0QsUUFBSUMsUUFBSixDQUFhLE9BQWIsRUFBcUJKLElBQXJCO0FBQ0FELFFBQUlFLFNBQUosR0FBY0Qs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Z0JBQWhCLEVBQXBCLEMiLCJmaWxlIjoiY2xvdWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQge1VJfSBmcm9tICcuJ1xyXG5pbXBvcnQgQXBwIGZyb20gJy4vZGIvYXBwJ1xyXG5pbXBvcnQge2dldEN1cnJlbnRBcHB9IGZyb20gXCIuL3NlbGVjdG9yXCJcclxuXHJcbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcclxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxyXG5cclxuY29uc3Qge0NvbW1hbmRCYXIsIGZpbGVTZWxlY3RvciwgTWVzc2FnZXJ9PVVJXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwiY2xvdWRDb2RlXCJcclxuXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdFVQREFURTogY29kZT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0dHJ5e1xyXG5cdFx0XHRsZXQgYXBwPWdldEN1cnJlbnRBcHAoZ2V0U3RhdGUoKSlcclxuXHRcdFx0aWYoY29kZT09PWFwcC5jbG91ZENvZGUpXHJcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcblx0XHRcdG5ldyBGdW5jdGlvbihcIkNsb3VkXCIsY29kZSlcclxuXHRcdFx0YXBwLmNsb3VkQ29kZT1jb2RlXHJcblx0XHRcdHJldHVybiBBcHAudXBzZXJ0KGFwcClcclxuXHRcdFx0XHQuY2F0Y2goZT0+YWxlcnQoZS5tZXNzYWdlKSlcclxuXHRcdFx0XHQudGhlbihhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vdXBkYXRlZGB9KSlcclxuXHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcclxuXHRcdFx0XHQuY2F0Y2goZT0+YWxlcnQoZS5tZXNzYWdlKSlcclxuXHRcdH1cclxuXHR9XHJcblx0LFVQTE9BRDogYT0+ZGlzcGF0Y2g9PmZpbGVTZWxlY3Rvci5zZWxlY3RUZXh0RmlsZSgpXHJcblx0XHQudGhlbigoe2RhdGE6Y29kZX0pPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKGNvZGUpKSlcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LCB7dHlwZSxwYXlsb2FkfSk9PntcclxuXHRzd2l0Y2godHlwZSl7XHJcblx0Y2FzZSBgQEAke0RPTUFJTn0vdXBkYXRlZGA6XHJcblx0XHRyZXR1cm4ge31cclxuXHR9XHJcblx0cmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDbG91ZCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5zdGF0ZT17Y2xvdWRDb2RlOnRoaXMucHJvcHMuY2xvdWRDb2RlfVxyXG5cdH1cclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2Nsb3VkQ29kZTpuZXh0LmNsb3VkQ29kZX0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge2Nsb3VkQ29kZX09dGhpcy5zdGF0ZVxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8dGV4dGFyZWEgdmFsdWU9e2Nsb3VkQ29kZXx8XCJcIn1cclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnRoaXMuc2V0U3RhdGUoe2Nsb3VkQ29kZTp2YWx1ZX0pfVxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJDbG91ZCBub2RlanMgY29kZVwiXHJcblx0XHRcdFx0XHRzdHlsZT17e3Bvc2l0aW9uOidhYnNvbHV0ZScsIGhlaWdodDogJzEwMCUnLCB0b3A6MCxsaW5lSGVpZ2h0OicyZW0nLFxyXG5cdFx0XHRcdFx0XHRtYXJnaW46MCx3aWR0aDonMTAwJScsIHBhZGRpbmc6MTAsIHBhZGRpbmdCb3R0b206NTEsYm9yZGVyOjB9fS8+XHJcblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXHJcblx0XHRcdFx0XHRpdGVtcz17W1xyXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxyXG5cdFx0XHRcdFx0XHQse2FjdGlvbjpcIlVwbG9hZFwiLCBpY29uOjxVcGxvYWQvPixcclxuXHRcdFx0XHRcdFx0XHRvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEKCkpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJTYXZlXCIsaWNvbjo8U2F2ZS8+LFxyXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUodGhpcy5zdGF0ZS5jbG91ZENvZGUpKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRdfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihDbG91ZCx7RE9NQUlOLCBBQ1RJT04sUkVEVUNFUn0pXHJcbiJdfQ==