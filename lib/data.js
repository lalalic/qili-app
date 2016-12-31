'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Data = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _reactable = require('reactable');

var _ = require('.');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _fileUpload = require('material-ui/svg-icons/file/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

var _storage = require('material-ui/svg-icons/device/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommandBar = _.UI.CommandBar;
var fileSelector = _.UI.fileSelector;
var DialogCommand = CommandBar.DialogCommand;
var DOMAIN = exports.DOMAIN = "ui.data";
var INIT_STATE = {
	data: [], index: [], schema: []
};

var ACTION = exports.ACTION = {
	FETCH_INCLUDING_SCHEMA: function FETCH_INCLUDING_SCHEMA(name) {
		return function (dispatch) {
			return dispatch(ACTION.FETCH(name, _app2.default.getSchema()));
		};
	},
	FETCH: function FETCH(name, schema) {
		return function (dispatch) {
			return _promise2.default.all([_app2.default.collectionData(name), _app2.default.collectionIndexes(name), schema]).then(function (_ref) {
				var _ref2 = (0, _slicedToArray3.default)(_ref, 3);

				var data = _ref2[0];
				var index = _ref2[1];
				var schema = _ref2[2];
				return dispatch({ type: '@@' + DOMAIN + '/fetched', payload: { data: data, index: index, schema: schema } });
			});
		};
	},

	UPLOAD_DATA: function UPLOAD_DATA(a) {
		return function (dispatch) {
			return fileSelector.selectJsonInJsFile().then(function (_ref3) {
				var data = _ref3.data;
				var name = _ref3.name;

				if (data && data.length) {
					var _ret = function () {
						var kind = name.split(/[\/\\]/).pop().split('.')[0];
						return {
							v: _app2.default.collectionData(kind, data).then(function (a) {
								return kind;
							})
						};
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
				}
			});
		};
	},

	UPLOAD_SCHEMA: function UPLOAD_SCHEMA(A) {
		return function (dispatch) {
			return fileSelector.selectJsonInJsFile().then(function (_ref4) {
				var schema = _ref4.data;

				if (schema && schema.length) {
					return _app2.default.setSchema(schema).then(function (a) {
						return dispatch({ type: '@@' + DOMAIN + '/schema', payload: schema });
					});
				}
			});
		};
	}
};

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
	var _ref5 = arguments[1];
	var type = _ref5.type;
	var payload = _ref5.payload;

	switch (type) {
		case '@@' + DOMAIN + '/fetched':
			payload.schema = payload.schema || state.schema;
			return (0, _assign2.default)({}, state, payload);

		case '@@' + DOMAIN + '/schema':
			return (0, _assign2.default)({}, state, { schema: payload });

		case '@@' + DOMAIN + '/CLEAR':
			return INIT_STATE;
	}
	return state;
};

var Data = exports.Data = function (_Component) {
	(0, _inherits3.default)(Data, _Component);

	function Data() {
		(0, _classCallCheck3.default)(this, Data);
		return (0, _possibleConstructorReturn3.default)(this, (Data.__proto__ || (0, _getPrototypeOf2.default)(Data)).apply(this, arguments));
	}

	(0, _createClass3.default)(Data, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props;
			var name = _props.params.name;
			var dispatch = _props.dispatch;

			dispatch(ACTION.FETCH_INCLUDING_SCHEMA(name));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(next) {
			if (next.app != this.props.app) next.dispatch(ACTION.FETCH_INCLUDING_SCHEMA(next.params.name));else if (next.params.name != this.props.params.name) next.dispatch(ACTION.FETCH(next.params.name));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.props.dispatch({ type: '@@' + DOMAIN + '/CLEAR' });
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props;
			var data = _props2.data;
			var index = _props2.index;
			var schema = _props2.schema;
			var name = _props2.params.name;
			var dispatch = _props2.dispatch;
			var router = this.context.router;
			var _constructor = this.constructor;
			var IndexItem = _constructor.IndexItem;
			var Names = _constructor.Names;

			var indexData = index.map(function (col) {
				(0, _keys2.default)(col).filter(function (a) {
					return a != '$option';
				});
			});
			var refNames = void 0;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_materialUi.Tabs,
					null,
					_react2.default.createElement(
						_materialUi.Tab,
						{ label: name },
						_react2.default.createElement(_reactable.Table, { data: data })
					),
					_react2.default.createElement(
						_materialUi.Tab,
						{ label: 'Indexes' },
						_react2.default.createElement(_reactable.Table, { data: index })
					)
				),
				_react2.default.createElement(
					DialogCommand,
					{ ref: function ref(a) {
							return refNames = a;
						} },
					_react2.default.createElement(
						_materialUi.List,
						null,
						schema.map(function (_ref6) {
							var name = _ref6.name;
							return _react2.default.createElement(_materialUi.ListItem, { primaryText: name, leftIcon: _react2.default.createElement(_storage2.default, null), key: name,
								onClick: function onClick(e) {
									refNames.dismiss();
									router.push('/data/' + name);
								} });
						})
					)
				),
				_react2.default.createElement(CommandBar, { className: 'footbar',
					items: [{ action: "Back" }, { action: "Upload Schema", label: "Schema", icon: _react2.default.createElement(_fileUpload2.default, null),
						onSelect: function onSelect(e) {
							return dispatch(ACTION.UPLOAD_SCHEMA());
						}
					}, { action: "Upload Data", label: "Data:[colName].js", icon: _react2.default.createElement(_fileUpload2.default, null),
						onSelect: function onSelect(e) {
							return dispatch(ACTION.UPLOAD_DATA()).then(function (colName) {
								return colName && router.replace('/data/' + colName);
							});
						}
					}, { action: "Collections", icon: _react2.default.createElement(_moreVert2.default, null),
						onSelect: function onSelect(e) {
							return refNames.show();
						}
					}] })
			);
		}
	}]);
	return Data;
}(_react.Component);

Data.contextTypes = { router: _react.PropTypes.object };
exports.default = (0, _assign2.default)(Data, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJmaWxlU2VsZWN0b3IiLCJEaWFsb2dDb21tYW5kIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImRhdGEiLCJpbmRleCIsInNjaGVtYSIsIkFDVElPTiIsIkZFVENIX0lOQ0xVRElOR19TQ0hFTUEiLCJkaXNwYXRjaCIsIkZFVENIIiwibmFtZSIsImdldFNjaGVtYSIsImFsbCIsImNvbGxlY3Rpb25EYXRhIiwiY29sbGVjdGlvbkluZGV4ZXMiLCJ0aGVuIiwidHlwZSIsInBheWxvYWQiLCJVUExPQURfREFUQSIsInNlbGVjdEpzb25JbkpzRmlsZSIsImxlbmd0aCIsImtpbmQiLCJzcGxpdCIsInBvcCIsIlVQTE9BRF9TQ0hFTUEiLCJzZXRTY2hlbWEiLCJSRURVQ0VSIiwic3RhdGUiLCJEYXRhIiwicHJvcHMiLCJwYXJhbXMiLCJuZXh0IiwiYXBwIiwicm91dGVyIiwiY29udGV4dCIsImNvbnN0cnVjdG9yIiwiSW5kZXhJdGVtIiwiTmFtZXMiLCJpbmRleERhdGEiLCJtYXAiLCJjb2wiLCJmaWx0ZXIiLCJhIiwicmVmTmFtZXMiLCJkaXNtaXNzIiwicHVzaCIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0IiwiY29sTmFtZSIsInJlcGxhY2UiLCJzaG93IiwiY29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsWSxRQUFBQSxZO0lBQ1pDLGEsR0FBZUYsVSxDQUFmRSxhO0FBRUEsSUFBTUMsMEJBQU8sU0FBYjtBQUNQLElBQU1DLGFBQVc7QUFDaEJDLE9BQUssRUFEVyxFQUNSQyxPQUFNLEVBREUsRUFDQ0MsUUFBTztBQURSLENBQWpC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akJDLGdCQUFTO0FBQUEsY0FBR04sU0FBU1MsSUFBVCxFQUFIO0FBQUE7QUFEUSxNQVJiLENBRFI7QUF4QkQsSUFERDtBQXdDQTs7Ozs7QUFoRVd4QixJLENBaUVMeUIsWSxHQUFhLEVBQUNwQixRQUFPLGlCQUFVcUIsTUFBbEIsRTtrQkFJTixzQkFBYzFCLElBQWQsRUFBbUIsRUFBQzNCLGNBQUQsRUFBU0ssY0FBVCxFQUFpQm9CLGdCQUFqQixFQUFuQixDIiwiZmlsZSI6ImRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSAncmVhY3QnXG5pbXBvcnQge1RhYnMsIFRhYiwgTGlzdCwgTGlzdEl0ZW19IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtUYWJsZX0gZnJvbSAncmVhY3RhYmxlJ1xuXG5pbXBvcnQge1VzZXIsIFVJfSBmcm9tICcuJ1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9kYi9hcHBcIlxuXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXG5pbXBvcnQgTW9yZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vbW9yZS12ZXJ0XCJcbmltcG9ydCBJY29uQ29sIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZGV2aWNlL3N0b3JhZ2VcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgZmlsZVNlbGVjdG9yfT1VSVxuY29uc3Qge0RpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuZXhwb3J0IGNvbnN0IERPTUFJTj1cInVpLmRhdGFcIlxuY29uc3QgSU5JVF9TVEFURT17XG5cdGRhdGE6W10saW5kZXg6W10sc2NoZW1hOltdXG59XG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRGRVRDSF9JTkNMVURJTkdfU0NIRU1BOiBuYW1lPT5kaXNwYXRjaD0+ZGlzcGF0Y2goQUNUSU9OLkZFVENIKG5hbWUsQXBwLmdldFNjaGVtYSgpKSlcblx0LEZFVENIOihuYW1lLHNjaGVtYSk9PmRpc3BhdGNoPT5Qcm9taXNlLmFsbChbQXBwLmNvbGxlY3Rpb25EYXRhKG5hbWUpLEFwcC5jb2xsZWN0aW9uSW5kZXhlcyhuYW1lKSxzY2hlbWFdKVxuXHRcdFx0LnRoZW4oKFtkYXRhLGluZGV4LHNjaGVtYV0pPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAscGF5bG9hZDp7ZGF0YSxpbmRleCxzY2hlbWF9fSkpXG5cblx0LFVQTE9BRF9EQVRBOmE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhLG5hbWV9KT0+e1xuXHRcdFx0XHRcdGlmKGRhdGEgJiYgZGF0YS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0bGV0IGtpbmQ9bmFtZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkuc3BsaXQoJy4nKVswXVxuXHRcdFx0XHRcdFx0cmV0dXJuIEFwcC5jb2xsZWN0aW9uRGF0YShraW5kLCBkYXRhKS50aGVuKGE9PmtpbmQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXG5cdCxVUExPQURfU0NIRU1BOkE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhOnNjaGVtYX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHNjaGVtYSAmJiBzY2hlbWEubGVuZ3RoKXtcblx0XHRcdFx0XHRcdHJldHVybiBBcHAuc2V0U2NoZW1hKHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9zY2hlbWFgLHBheWxvYWQ6c2NoZW1hfSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcblx0XHRwYXlsb2FkLnNjaGVtYT1wYXlsb2FkLnNjaGVtYXx8c3RhdGUuc2NoZW1hXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUscGF5bG9hZClcblxuXHRjYXNlIGBAQCR7RE9NQUlOfS9zY2hlbWFgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzY2hlbWE6cGF5bG9hZH0pXG5cblx0Y2FzZSBgQEAke0RPTUFJTn0vQ0xFQVJgOlxuXHRcdHJldHVybiBJTklUX1NUQVRFXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjbGFzcyBEYXRhIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGNvbnN0IHtwYXJhbXM6e25hbWV9LCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSF9JTkNMVURJTkdfU0NIRU1BKG5hbWUpKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRpZihuZXh0LmFwcCE9dGhpcy5wcm9wcy5hcHApXG5cdFx0XHRuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSF9JTkNMVURJTkdfU0NIRU1BKG5leHQucGFyYW1zLm5hbWUpKVxuXHRcdGVsc2UgaWYobmV4dC5wYXJhbXMubmFtZSE9dGhpcy5wcm9wcy5wYXJhbXMubmFtZSlcblx0XHRcdG5leHQuZGlzcGF0Y2goQUNUSU9OLkZFVENIKG5leHQucGFyYW1zLm5hbWUpKVxuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkYXRhLCBpbmRleCwgc2NoZW1hLCBwYXJhbXM6e25hbWV9LGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cdFx0Y29uc3Qge0luZGV4SXRlbSwgTmFtZXN9PXRoaXMuY29uc3RydWN0b3Jcblx0XHRjb25zdCBpbmRleERhdGE9aW5kZXgubWFwKGNvbD0+e1xuXHRcdFx0T2JqZWN0LmtleXMoY29sKS5maWx0ZXIoYT0+YSE9JyRvcHRpb24nKVxuXHRcdH0pXG5cdFx0bGV0IHJlZk5hbWVzXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxUYWJzPlxuXHRcdFx0XHRcdDxUYWIgbGFiZWw9e25hbWV9PlxuXHRcdFx0XHRcdFx0PFRhYmxlIGRhdGE9e2RhdGF9Lz5cblx0XHRcdFx0XHQ8L1RhYj5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPVwiSW5kZXhlc1wiPlxuXHRcdFx0XHRcdFx0PFRhYmxlIGRhdGE9e2luZGV4fS8+XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdDwvVGFicz5cblxuXHRcdFx0XHQ8RGlhbG9nQ29tbWFuZCByZWY9e2E9PnJlZk5hbWVzPWF9PlxuXHRcdFx0XHRcdDxMaXN0PlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNjaGVtYS5tYXAoKHtuYW1lfSk9Pihcblx0XHRcdFx0XHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PXtuYW1lfSBsZWZ0SWNvbj17PEljb25Db2wvPn0ga2V5PXtuYW1lfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHJlZk5hbWVzLmRpc21pc3MoKVxuXHRcdFx0XHRcdFx0XHRcdFx0cm91dGVyLnB1c2goYC9kYXRhLyR7bmFtZX1gKVxuXHRcdFx0XHRcdFx0XHRcdH19Lz5cblx0XHRcdFx0XHRcdCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvTGlzdD5cblx0XHRcdFx0PC9EaWFsb2dDb21tYW5kPlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVXBsb2FkIFNjaGVtYVwiLCBsYWJlbDpcIlNjaGVtYVwiLCBpY29uOjxVcGxvYWQvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRF9TQ0hFTUEoKSlcblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICx7YWN0aW9uOlwiVXBsb2FkIERhdGFcIiwgbGFiZWw6XCJEYXRhOltjb2xOYW1lXS5qc1wiLCBpY29uOjxVcGxvYWQvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRF9EQVRBKCkpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4oY29sTmFtZT0+IGNvbE5hbWUgJiYgcm91dGVyLnJlcGxhY2UoYC9kYXRhLyR7Y29sTmFtZX1gKSlcblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICx7YWN0aW9uOlwiQ29sbGVjdGlvbnNcIiwgaWNvbjo8TW9yZS8+XG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5yZWZOYW1lcy5zaG93KClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF19Lz5cblx0XHRcdDwvZGl2PlxuICAgICAgICApXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihEYXRhLHtET01BSU4sIEFDVElPTiwgUkVEVUNFUn0pXG4iXX0=