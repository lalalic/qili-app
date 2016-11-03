'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Data = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _.UI.CommandBar;
var fileSelector = _.UI.fileSelector;
var DialogCommand = CommandBar.DialogCommand;
var DOMAIN = exports.DOMAIN = "ui.data";
var INIT_STATE = {
	data: [], index: [], schema: [], app: null
};

var ACTION = exports.ACTION = {
	FETCH: function FETCH(name, schema) {
		return function (dispatch) {
			return Promise.all([_app2.default.collectionData(name), _app2.default.collectionIndexes(name), schema]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 3);

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

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
			return Object.assign({}, state, payload);

		case '@@' + DOMAIN + '/schema':
			return Object.assign({}, state, { schema: payload });

		case '@@main/APP_CHANGED':
			return Object.assign({}, INIT_STATE, { app: payload.app._id });

		case '@@' + DOMAIN + '/CLEAR':
			return INIT_STATE;
	}
	return state;
};

var Data = exports.Data = function (_Component) {
	_inherits(Data, _Component);

	function Data() {
		_classCallCheck(this, Data);

		return _possibleConstructorReturn(this, (Data.__proto__ || Object.getPrototypeOf(Data)).apply(this, arguments));
	}

	_createClass(Data, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props;
			var name = _props.params.name;
			var dispatch = _props.dispatch;

			dispatch(ACTION.FETCH(name, _app2.default.schema));
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(next) {
			if (next.app != this.props.app) next.dispatch(ACTION.FETCH(next.params.name, _app2.default.schema));else if (next.params.name != this.props.params.name) next.dispatch(ACTION.FETCH(next.params.name));
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
			var router = _props2.router;
			var _constructor = this.constructor;
			var IndexItem = _constructor.IndexItem;
			var Names = _constructor.Names;

			var indexData = index.map(function (col) {
				Object.keys(col).filter(function (a) {
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

exports.default = Object.assign(Data, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJmaWxlU2VsZWN0b3IiLCJEaWFsb2dDb21tYW5kIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImRhdGEiLCJpbmRleCIsInNjaGVtYSIsImFwcCIsIkFDVElPTiIsIkZFVENIIiwibmFtZSIsIlByb21pc2UiLCJhbGwiLCJjb2xsZWN0aW9uRGF0YSIsImNvbGxlY3Rpb25JbmRleGVzIiwidGhlbiIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJVUExPQURfREFUQSIsInNlbGVjdEpzb25JbkpzRmlsZSIsImxlbmd0aCIsImtpbmQiLCJzcGxpdCIsInBvcCIsIlVQTE9BRF9TQ0hFTUEiLCJzZXRTY2hlbWEiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJfaWQiLCJEYXRhIiwicHJvcHMiLCJwYXJhbXMiLCJuZXh0Iiwicm91dGVyIiwiY29uc3RydWN0b3IiLCJJbmRleEl0ZW0iLCJOYW1lcyIsImluZGV4RGF0YSIsIm1hcCIsImtleXMiLCJjb2wiLCJmaWx0ZXIiLCJhIiwicmVmTmFtZXMiLCJkaXNtaXNzIiwicHVzaCIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0IiwiY29sTmFtZSIsInJlcGxhY2UiLCJzaG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxZLFFBQUFBLFk7SUFDWkMsYSxHQUFlRixVLENBQWZFLGE7QUFFQSxJQUFNQywwQkFBTyxTQUFiO0FBQ1AsSUFBTUMsYUFBVztBQUNoQkMsT0FBSyxFQURXLEVBQ1JDLE9BQU0sRUFERSxFQUNDQyxRQUFPLEVBRFIsRUFDV0MsS0FBSTtBQURmLENBQWpCOztBQUlPLElBQU1DLDBCQUFPO0FBQ25CQyxRQUFNLGVBQUND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Syx1REFBNUI7QUFDakJDLGdCQUFTO0FBQUEsY0FBR04sU0FBU1MsSUFBVCxFQUFIO0FBQUE7QUFEUSxNQVJiLENBRFI7QUF4QkQsSUFERDtBQXdDQTs7Ozs7O2tCQUlhMUIsT0FBT0MsTUFBUCxDQUFjRSxJQUFkLEVBQW1CLEVBQUM5QixjQUFELEVBQVNNLGNBQVQsRUFBaUJtQixnQkFBakIsRUFBbkIsQyIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7VGFicywgVGFiLCBMaXN0LCBMaXN0SXRlbX0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge1RhYmxlfSBmcm9tICdyZWFjdGFibGUnXG5cbmltcG9ydCB7VXNlciwgVUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuaW1wb3J0IEljb25Db2wgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9kZXZpY2Uvc3RvcmFnZVwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBmaWxlU2VsZWN0b3J9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwidWkuZGF0YVwiXG5jb25zdCBJTklUX1NUQVRFPXtcblx0ZGF0YTpbXSxpbmRleDpbXSxzY2hlbWE6W10sYXBwOm51bGxcbn1cblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEZFVENIOihuYW1lLHNjaGVtYSk9PmRpc3BhdGNoPT5Qcm9taXNlLmFsbChbQXBwLmNvbGxlY3Rpb25EYXRhKG5hbWUpLEFwcC5jb2xsZWN0aW9uSW5kZXhlcyhuYW1lKSxzY2hlbWFdKVxuXHRcdFx0LnRoZW4oKFtkYXRhLGluZGV4LHNjaGVtYV0pPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAscGF5bG9hZDp7ZGF0YSxpbmRleCxzY2hlbWF9fSkpXG5cblx0LFVQTE9BRF9EQVRBOmE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhLG5hbWV9KT0+e1xuXHRcdFx0XHRcdGlmKGRhdGEgJiYgZGF0YS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0bGV0IGtpbmQ9bmFtZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkuc3BsaXQoJy4nKVswXVxuXHRcdFx0XHRcdFx0cmV0dXJuIEFwcC5jb2xsZWN0aW9uRGF0YShraW5kLCBkYXRhKS50aGVuKGE9PmtpbmQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXG5cdCxVUExPQURfU0NIRU1BOkE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhOnNjaGVtYX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHNjaGVtYSAmJiBzY2hlbWEubGVuZ3RoKXtcblx0XHRcdFx0XHRcdHJldHVybiBBcHAuc2V0U2NoZW1hKHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9zY2hlbWFgLHBheWxvYWQ6c2NoZW1hfSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcblx0XHRwYXlsb2FkLnNjaGVtYT1wYXlsb2FkLnNjaGVtYXx8c3RhdGUuc2NoZW1hXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUscGF5bG9hZClcblxuXHRjYXNlIGBAQCR7RE9NQUlOfS9zY2hlbWFgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzY2hlbWE6cGF5bG9hZH0pXG5cblx0Y2FzZSBgQEBtYWluL0FQUF9DSEFOR0VEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxJTklUX1NUQVRFLHthcHA6cGF5bG9hZC5hcHAuX2lkfSlcblxuXHRjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XG5cdFx0cmV0dXJuIElOSVRfU1RBVEVcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIERhdGEgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc3Qge3BhcmFtczp7bmFtZX0sIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIKG5hbWUsQXBwLnNjaGVtYSkpXG5cdH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xuXHRcdGlmKG5leHQuYXBwIT10aGlzLnByb3BzLmFwcClcblx0XHRcdG5leHQuZGlzcGF0Y2goQUNUSU9OLkZFVENIKG5leHQucGFyYW1zLm5hbWUsQXBwLnNjaGVtYSkpXG5cdFx0ZWxzZSBpZihuZXh0LnBhcmFtcy5uYW1lIT10aGlzLnByb3BzLnBhcmFtcy5uYW1lKVxuXHRcdFx0bmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0gobmV4dC5wYXJhbXMubmFtZSkpXG5cdH1cblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcblx0XHR0aGlzLnByb3BzLmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9DTEVBUmB9KVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2RhdGEsIGluZGV4LCBzY2hlbWEsIHBhcmFtczp7bmFtZX0sZGlzcGF0Y2gscm91dGVyfT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge0luZGV4SXRlbSwgTmFtZXN9PXRoaXMuY29uc3RydWN0b3Jcblx0XHRjb25zdCBpbmRleERhdGE9aW5kZXgubWFwKGNvbD0+e1xuXHRcdFx0T2JqZWN0LmtleXMoY29sKS5maWx0ZXIoYT0+YSE9JyRvcHRpb24nKVxuXHRcdH0pXG5cdFx0bGV0IHJlZk5hbWVzXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxUYWJzPlxuXHRcdFx0XHRcdDxUYWIgbGFiZWw9e25hbWV9PlxuXHRcdFx0XHRcdFx0PFRhYmxlIGRhdGE9e2RhdGF9Lz5cblx0XHRcdFx0XHQ8L1RhYj5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPVwiSW5kZXhlc1wiPlxuXHRcdFx0XHRcdFx0PFRhYmxlIGRhdGE9e2luZGV4fS8+XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdDwvVGFicz5cblxuXHRcdFx0XHQ8RGlhbG9nQ29tbWFuZCByZWY9e2E9PnJlZk5hbWVzPWF9PlxuXHRcdFx0XHRcdDxMaXN0PlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNjaGVtYS5tYXAoKHtuYW1lfSk9Pihcblx0XHRcdFx0XHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PXtuYW1lfSBsZWZ0SWNvbj17PEljb25Db2wvPn0ga2V5PXtuYW1lfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHJlZk5hbWVzLmRpc21pc3MoKVxuXHRcdFx0XHRcdFx0XHRcdFx0cm91dGVyLnB1c2goYC9kYXRhLyR7bmFtZX1gKVxuXHRcdFx0XHRcdFx0XHRcdH19Lz5cblx0XHRcdFx0XHRcdCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvTGlzdD5cblx0XHRcdFx0PC9EaWFsb2dDb21tYW5kPlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVXBsb2FkIFNjaGVtYVwiLCBsYWJlbDpcIlNjaGVtYVwiLCBpY29uOjxVcGxvYWQvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRF9TQ0hFTUEoKSlcblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICx7YWN0aW9uOlwiVXBsb2FkIERhdGFcIiwgbGFiZWw6XCJEYXRhOltjb2xOYW1lXS5qc1wiLCBpY29uOjxVcGxvYWQvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRF9EQVRBKCkpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4oY29sTmFtZT0+IGNvbE5hbWUgJiYgcm91dGVyLnJlcGxhY2UoYC9kYXRhLyR7Y29sTmFtZX1gKSlcblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICx7YWN0aW9uOlwiQ29sbGVjdGlvbnNcIiwgaWNvbjo8TW9yZS8+XG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5yZWZOYW1lcy5zaG93KClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF19Lz5cblx0XHRcdDwvZGl2PlxuICAgICAgICApXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKERhdGEse0RPTUFJTiwgQUNUSU9OLCBSRURVQ0VSfSlcbiJdfQ==