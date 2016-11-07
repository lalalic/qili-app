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

var CommandBar = _.UI.CommandBar,
    fileSelector = _.UI.fileSelector;
var DialogCommand = CommandBar.DialogCommand;
var DOMAIN = exports.DOMAIN = "ui.data";
var INIT_STATE = {
	data: [], index: [], schema: [], app: null
};

var ACTION = exports.ACTION = {
	FETCH: function FETCH(name, schema) {
		return function (dispatch) {
			return _promise2.default.all([_app2.default.collectionData(name), _app2.default.collectionIndexes(name), schema]).then(function (_ref) {
				var _ref2 = (0, _slicedToArray3.default)(_ref, 3),
				    data = _ref2[0],
				    index = _ref2[1],
				    schema = _ref2[2];

				return dispatch({ type: '@@' + DOMAIN + '/fetched', payload: { data: data, index: index, schema: schema } });
			});
		};
	},

	UPLOAD_DATA: function UPLOAD_DATA(a) {
		return function (dispatch) {
			return fileSelector.selectJsonInJsFile().then(function (_ref3) {
				var data = _ref3.data,
				    name = _ref3.name;

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
	var type = _ref5.type,
	    payload = _ref5.payload;

	switch (type) {
		case '@@' + DOMAIN + '/fetched':
			payload.schema = payload.schema || state.schema;
			return (0, _assign2.default)({}, state, payload);

		case '@@' + DOMAIN + '/schema':
			return (0, _assign2.default)({}, state, { schema: payload });

		case '@@main/APP_CHANGED':
			return (0, _assign2.default)({}, INIT_STATE, { app: payload.app._id });

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
			var _props = this.props,
			    name = _props.params.name,
			    dispatch = _props.dispatch;

			dispatch(ACTION.FETCH(name, _app2.default.getSchema()));
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
			var _props2 = this.props,
			    data = _props2.data,
			    index = _props2.index,
			    schema = _props2.schema,
			    name = _props2.params.name,
			    dispatch = _props2.dispatch;
			var router = this.context.router;
			var _constructor = this.constructor,
			    IndexItem = _constructor.IndexItem,
			    Names = _constructor.Names;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJmaWxlU2VsZWN0b3IiLCJEaWFsb2dDb21tYW5kIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImRhdGEiLCJpbmRleCIsInNjaGVtYSIsImFwcCIsIkFDVElPTiIsIkZFVENIIiwibmFtZSIsImFsbCIsImNvbGxlY3Rpb25EYXRhIiwiY29sbGVjdGlvbkluZGV4ZXMiLCJ0aGVuIiwiZGlzcGF0Y2giLCJ0eXBlIiwicGF5bG9hZCIsIlVQTE9BRF9EQVRBIiwic2VsZWN0SnNvbkluSnNGaWxlIiwibGVuZ3RoIiwia2luZCIsInNwbGl0IiwicG9wIiwiVVBMT0FEX1NDSEVNQSIsInNldFNjaGVtYSIsIlJFRFVDRVIiLCJzdGF0ZSIsIl9pZCIsIkRhdGEiLCJwcm9wcyIsInBhcmFtcyIsImdldFNjaGVtYSIsIm5leHQiLCJyb3V0ZXIiLCJjb250ZXh0IiwiY29uc3RydWN0b3IiLCJJbmRleEl0ZW0iLCJOYW1lcyIsImluZGV4RGF0YSIsIm1hcCIsImNvbCIsImZpbHRlciIsImEiLCJyZWZOYW1lcyIsImRpc21pc3MiLCJwdXNoIiwiYWN0aW9uIiwibGFiZWwiLCJpY29uIiwib25TZWxlY3QiLCJjb2xOYW1lIiwicmVwbGFjZSIsInNob3ciLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxZLFFBQUFBLFk7SUFDWkMsYSxHQUFlRixVLENBQWZFLGE7QUFFQSxJQUFNQywwQkFBTyxTQUFiO0FBQ1AsSUFBTUMsYUFBVztBQUNoQkMsT0FBSyxFQURXLEVBQ1JDLE9BQU0sRUFERSxFQUNDQyxRQUFPLEVBRFIsRUFDV0MsS0FBSTtBQURmLENBQWpCOztB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LHVEQUE1QjtBQUNqQkMsZ0JBQVM7QUFBQSxjQUFHTixTQUFTUyxJQUFULEVBQUg7QUFBQTtBQURRLE1BUmIsQ0FEUjtBQXhCRCxJQUREO0FBd0NBOzs7OztBQWhFV3hCLEksQ0FpRUx5QixZLEdBQWEsRUFBQ3BCLFFBQU8saUJBQVVxQixNQUFsQixFO2tCQUlOLHNCQUFjMUIsSUFBZCxFQUFtQixFQUFDM0IsY0FBRCxFQUFTTSxjQUFULEVBQWlCa0IsZ0JBQWpCLEVBQW5CLEMiLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VGFicywgVGFiLCBMaXN0LCBMaXN0SXRlbX0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge1RhYmxlfSBmcm9tICdyZWFjdGFibGUnXG5cbmltcG9ydCB7VXNlciwgVUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuaW1wb3J0IEljb25Db2wgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9kZXZpY2Uvc3RvcmFnZVwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBmaWxlU2VsZWN0b3J9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwidWkuZGF0YVwiXG5jb25zdCBJTklUX1NUQVRFPXtcblx0ZGF0YTpbXSxpbmRleDpbXSxzY2hlbWE6W10sYXBwOm51bGxcbn1cblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEZFVENIOihuYW1lLHNjaGVtYSk9PmRpc3BhdGNoPT5Qcm9taXNlLmFsbChbQXBwLmNvbGxlY3Rpb25EYXRhKG5hbWUpLEFwcC5jb2xsZWN0aW9uSW5kZXhlcyhuYW1lKSxzY2hlbWFdKVxuXHRcdFx0LnRoZW4oKFtkYXRhLGluZGV4LHNjaGVtYV0pPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAscGF5bG9hZDp7ZGF0YSxpbmRleCxzY2hlbWF9fSkpXG5cblx0LFVQTE9BRF9EQVRBOmE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhLG5hbWV9KT0+e1xuXHRcdFx0XHRcdGlmKGRhdGEgJiYgZGF0YS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0bGV0IGtpbmQ9bmFtZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkuc3BsaXQoJy4nKVswXVxuXHRcdFx0XHRcdFx0cmV0dXJuIEFwcC5jb2xsZWN0aW9uRGF0YShraW5kLCBkYXRhKS50aGVuKGE9PmtpbmQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXG5cdCxVUExPQURfU0NIRU1BOkE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0SnNvbkluSnNGaWxlKClcblx0XHRcdFx0LnRoZW4oKHtkYXRhOnNjaGVtYX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHNjaGVtYSAmJiBzY2hlbWEubGVuZ3RoKXtcblx0XHRcdFx0XHRcdHJldHVybiBBcHAuc2V0U2NoZW1hKHNjaGVtYSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9zY2hlbWFgLHBheWxvYWQ6c2NoZW1hfSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcblx0XHRwYXlsb2FkLnNjaGVtYT1wYXlsb2FkLnNjaGVtYXx8c3RhdGUuc2NoZW1hXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUscGF5bG9hZClcblxuXHRjYXNlIGBAQCR7RE9NQUlOfS9zY2hlbWFgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtzY2hlbWE6cGF5bG9hZH0pXG5cblx0Y2FzZSBgQEBtYWluL0FQUF9DSEFOR0VEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxJTklUX1NUQVRFLHthcHA6cGF5bG9hZC5hcHAuX2lkfSlcblxuXHRjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XG5cdFx0cmV0dXJuIElOSVRfU1RBVEVcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIERhdGEgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0Y29uc3Qge3BhcmFtczp7bmFtZX0sIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIKG5hbWUsQXBwLmdldFNjaGVtYSgpKSlcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XG5cdFx0aWYobmV4dC5hcHAhPXRoaXMucHJvcHMuYXBwKVxuXHRcdFx0bmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0gobmV4dC5wYXJhbXMubmFtZSxBcHAuc2NoZW1hKSlcblx0XHRlbHNlIGlmKG5leHQucGFyYW1zLm5hbWUhPXRoaXMucHJvcHMucGFyYW1zLm5hbWUpXG5cdFx0XHRuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSChuZXh0LnBhcmFtcy5uYW1lKSlcblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7ZGF0YSwgaW5kZXgsIHNjaGVtYSwgcGFyYW1zOntuYW1lfSxkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtJbmRleEl0ZW0sIE5hbWVzfT10aGlzLmNvbnN0cnVjdG9yXG5cdFx0Y29uc3QgaW5kZXhEYXRhPWluZGV4Lm1hcChjb2w9Pntcblx0XHRcdE9iamVjdC5rZXlzKGNvbCkuZmlsdGVyKGE9PmEhPSckb3B0aW9uJylcblx0XHR9KVxuXHRcdGxldCByZWZOYW1lc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8VGFicz5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPXtuYW1lfT5cblx0XHRcdFx0XHRcdDxUYWJsZSBkYXRhPXtkYXRhfS8+XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdFx0PFRhYiBsYWJlbD1cIkluZGV4ZXNcIj5cblx0XHRcdFx0XHRcdDxUYWJsZSBkYXRhPXtpbmRleH0vPlxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHQ8L1RhYnM+XG5cblx0XHRcdFx0PERpYWxvZ0NvbW1hbmQgcmVmPXthPT5yZWZOYW1lcz1hfT5cblx0XHRcdFx0XHQ8TGlzdD5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzY2hlbWEubWFwKCh7bmFtZX0pPT4oXG5cdFx0XHRcdFx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gbGVmdEljb249ezxJY29uQ29sLz59IGtleT17bmFtZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0XHRyZWZOYW1lcy5kaXNtaXNzKClcblx0XHRcdFx0XHRcdFx0XHRcdHJvdXRlci5wdXNoKGAvZGF0YS8ke25hbWV9YClcblx0XHRcdFx0XHRcdFx0XHR9fS8+XG5cdFx0XHRcdFx0XHQpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8L0xpc3Q+XG5cdFx0XHRcdDwvRGlhbG9nQ29tbWFuZD5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZCBTY2hlbWFcIiwgbGFiZWw6XCJTY2hlbWFcIiwgaWNvbjo8VXBsb2FkLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUExPQURfU0NIRU1BKCkpXG5cdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAse2FjdGlvbjpcIlVwbG9hZCBEYXRhXCIsIGxhYmVsOlwiRGF0YTpbY29sTmFtZV0uanNcIiwgaWNvbjo8VXBsb2FkLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUExPQURfREFUQSgpKVxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKGNvbE5hbWU9PiBjb2xOYW1lICYmIHJvdXRlci5yZXBsYWNlKGAvZGF0YS8ke2NvbE5hbWV9YCkpXG5cdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAse2FjdGlvbjpcIkNvbGxlY3Rpb25zXCIsIGljb246PE1vcmUvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+cmVmTmFtZXMuc2hvdygpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdfS8+XG5cdFx0XHQ8L2Rpdj5cbiAgICAgICAgKVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oRGF0YSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxuIl19