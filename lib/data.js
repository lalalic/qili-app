'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Data = exports.REDUCER = exports.ACTION = undefined;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CommandBar = _.UI.CommandBar,
    fileSelector = _.UI.fileSelector;
var DialogCommand = CommandBar.DialogCommand;


var DOMAIN = "ui.data";
var INIT_STATE = {
	data: [], index: [], schema: [], app: null
};
var ACTION = exports.ACTION = {
	FETCH: function FETCH(name, schema) {
		return function (dispatch) {
			return Promise.all([_app2.default.collectionData(name), _app2.default.collectionIndexes(name), schema]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 3),
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

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
	var _ref5 = arguments[1];
	var type = _ref5.type,
	    payload = _ref5.payload;

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
});

var Data = exports.Data = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
})(function (_Component) {
	_inherits(_class, _Component);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    name = _props.params.name,
			    dispatch = _props.dispatch;

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
			var _props2 = this.props,
			    data = _props2.data,
			    index = _props2.index,
			    schema = _props2.schema,
			    name = _props2.params.name,
			    dispatch = _props2.dispatch,
			    router = _props2.router;
			var _constructor = this.constructor,
			    IndexItem = _constructor.IndexItem,
			    Names = _constructor.Names;

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
							return _react2.default.createElement(_materialUi.ListItem, { primaryText: name, leftIcon: _react2.default.createElement(_storage2.default, null),
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

	return _class;
}(_react.Component));

exports.default = Object.assign(Data, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJmaWxlU2VsZWN0b3IiLCJEaWFsb2dDb21tYW5kIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImRhdGEiLCJpbmRleCIsInNjaGVtYSIsImFwcCIsIkFDVElPTiIsIkZFVENIIiwibmFtZSIsIlByb21pc2UiLCJhbGwiLCJjb2xsZWN0aW9uRGF0YSIsImNvbGxlY3Rpb25JbmRleGVzIiwidGhlbiIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJVUExPQURfREFUQSIsInNlbGVjdEpzb25JbkpzRmlsZSIsImxlbmd0aCIsImtpbmQiLCJzcGxpdCIsInBvcCIsIlVQTE9BRF9TQ0hFTUEiLCJzZXRTY2hlbWEiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJfaWQiLCJEYXRhIiwicHJvcHMiLCJwYXJhbXMiLCJuZXh0Iiwicm91dGVyIiwiY29uc3RydWN0b3IiLCJJbmRleEl0ZW0iLCJOYW1lcyIsImluZGV4RGF0YSIsIm1hcCIsImtleXMiLCJjb2wiLCJmaWx0ZXIiLCJhIiwicmVmTmFtZXMiLCJkaXNtaXNzIiwicHVzaCIsImFjdGlvbiIsImxhYmVsIiwiaWNvbiIsIm9uU2VsZWN0IiwiY29sTmFtZSIsInJlcGxhY2UiLCJzaG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFT0EsVSxRQUFBQSxVO0lBQVlDLFksUUFBQUEsWTtJQUNaQyxhLEdBQWVGLFUsQ0FBZkUsYTs7O0FBRVAsSUFBTUMsU0FBTyxTQUFiO0FBQ0EsSUFBTUMsYUFBVztBQUNoQkMsT0FBSyxFQURXLEVBQ1JDLE9BQU0sRUFERSxFQUNDQyxRQUFPLEVBRFIsRUFDV0MsS0FBSTtBQURmLENBQWpCO0FBR08sSUFBTUMsMEJBQU87QUFDbkJDLFFBQU0sZUFB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Q047QUFBQSxlQUFVc0MsV0FBV2pCLE9BQU9rQixPQUFQLFlBQXdCRCxPQUF4QixDQUFyQjtBQUFBLFFBRE0sQ0FBSDtBQUFBO0FBRFEsTUFKYixFQVFhLEVBQUNKLFFBQU8sYUFBUixFQUF1QkUsTUFBSyx1REFBNUI7QUFDakJDLGdCQUFTO0FBQUEsY0FBR04sU0FBU1MsSUFBVCxFQUFIO0FBQUE7QUFEUSxNQVJiLENBRFI7QUF4QkQsSUFERDtBQXdDQTtBQWhFZ0I7O0FBQUE7QUFBQSxvQkFBWDs7a0JBb0VRMUIsT0FBT0MsTUFBUCxDQUFjRSxJQUFkLEVBQW1CLEVBQUN4QixjQUFELEVBQVNtQixnQkFBVCxFQUFuQixDIiwiZmlsZSI6ImRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtUYWJzLCBUYWIsIExpc3QsIExpc3RJdGVtfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7VGFibGV9IGZyb20gJ3JlYWN0YWJsZSdcblxuaW1wb3J0IHtVc2VyLCBVSX0gZnJvbSAnLidcbmltcG9ydCBBcHAgZnJvbSBcIi4vZGIvYXBwXCJcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IE1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5pbXBvcnQgSWNvbkNvbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2RldmljZS9zdG9yYWdlXCJcblxuY29uc3Qge0NvbW1hbmRCYXIsIGZpbGVTZWxlY3Rvcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmNvbnN0IERPTUFJTj1cInVpLmRhdGFcIlxuY29uc3QgSU5JVF9TVEFURT17XG5cdGRhdGE6W10saW5kZXg6W10sc2NoZW1hOltdLGFwcDpudWxsXG59XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0g6KG5hbWUsc2NoZW1hKT0+ZGlzcGF0Y2g9PlByb21pc2UuYWxsKFtBcHAuY29sbGVjdGlvbkRhdGEobmFtZSksQXBwLmNvbGxlY3Rpb25JbmRleGVzKG5hbWUpLHNjaGVtYV0pXG5cdFx0XHQudGhlbigoW2RhdGEsaW5kZXgsc2NoZW1hXSk9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOntkYXRhLGluZGV4LHNjaGVtYX19KSlcblxuXHQsVVBMT0FEX0RBVEE6YT0+ZGlzcGF0Y2g9PmZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxuXHRcdFx0XHQudGhlbigoe2RhdGEsbmFtZX0pPT57XG5cdFx0XHRcdFx0aWYoZGF0YSAmJiBkYXRhLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRsZXQga2luZD1uYW1lLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5zcGxpdCgnLicpWzBdXG5cdFx0XHRcdFx0XHRyZXR1cm4gQXBwLmNvbGxlY3Rpb25EYXRhKGtpbmQsIGRhdGEpLnRoZW4oYT0+a2luZClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cblx0LFVQTE9BRF9TQ0hFTUE6QT0+ZGlzcGF0Y2g9PmZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxuXHRcdFx0XHQudGhlbigoe2RhdGE6c2NoZW1hfSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoc2NoZW1hICYmIHNjaGVtYS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIEFwcC5zZXRTY2hlbWEoc2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3NjaGVtYWAscGF5bG9hZDpzY2hlbWF9KSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcblx0W0RPTUFJTl06KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxuXHRcdFx0cGF5bG9hZC5zY2hlbWE9cGF5bG9hZC5zY2hlbWF8fHN0YXRlLnNjaGVtYVxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUscGF5bG9hZClcblxuXHRcdGNhc2UgYEBAJHtET01BSU59L3NjaGVtYWA6XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7c2NoZW1hOnBheWxvYWR9KVxuXG5cdFx0Y2FzZSBgQEBtYWluL0FQUF9DSEFOR0VEYDpcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LElOSVRfU1RBVEUse2FwcDpwYXlsb2FkLmFwcC5faWR9KVxuXG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vQ0xFQVJgOlxuXHRcdFx0cmV0dXJuIElOSVRfU1RBVEVcblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IERhdGE9Y29ubmVjdChzdGF0ZT0+KHN0YXRlW0RPTUFJTl0pKShcbmNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdGNvbnN0IHtwYXJhbXM6e25hbWV9LCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSChuYW1lLEFwcC5zY2hlbWEpKVxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0KXtcblx0XHRpZihuZXh0LmFwcCE9dGhpcy5wcm9wcy5hcHApXG5cdFx0XHRuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSChuZXh0LnBhcmFtcy5uYW1lLEFwcC5zY2hlbWEpKVxuXHRcdGVsc2UgaWYobmV4dC5wYXJhbXMubmFtZSE9dGhpcy5wcm9wcy5wYXJhbXMubmFtZSlcblx0XHRcdG5leHQuZGlzcGF0Y2goQUNUSU9OLkZFVENIKG5leHQucGFyYW1zLm5hbWUpKVxuXHR9XG5cdGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG5cdFx0dGhpcy5wcm9wcy5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vQ0xFQVJgfSlcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtkYXRhLCBpbmRleCwgc2NoZW1hLCBwYXJhbXM6e25hbWV9LGRpc3BhdGNoLHJvdXRlcn09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtJbmRleEl0ZW0sIE5hbWVzfT10aGlzLmNvbnN0cnVjdG9yXG5cdFx0Y29uc3QgaW5kZXhEYXRhPWluZGV4Lm1hcChjb2w9Pntcblx0XHRcdE9iamVjdC5rZXlzKGNvbCkuZmlsdGVyKGE9PmEhPSckb3B0aW9uJylcblx0XHR9KVxuXHRcdGxldCByZWZOYW1lc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8VGFicz5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPXtuYW1lfT5cblx0XHRcdFx0XHRcdDxUYWJsZSBkYXRhPXtkYXRhfS8+XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdFx0PFRhYiBsYWJlbD1cIkluZGV4ZXNcIj5cblx0XHRcdFx0XHRcdDxUYWJsZSBkYXRhPXtpbmRleH0vPlxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHQ8L1RhYnM+XG5cblx0XHRcdFx0PERpYWxvZ0NvbW1hbmQgcmVmPXthPT5yZWZOYW1lcz1hfT5cblx0XHRcdFx0XHQ8TGlzdD5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzY2hlbWEubWFwKCh7bmFtZX0pPT4oXG5cdFx0XHRcdFx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gbGVmdEljb249ezxJY29uQ29sLz59XG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+e1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVmTmFtZXMuZGlzbWlzcygpXG5cdFx0XHRcdFx0XHRcdFx0XHRyb3V0ZXIucHVzaChgL2RhdGEvJHtuYW1lfWApXG5cdFx0XHRcdFx0XHRcdFx0fX0vPlxuXHRcdFx0XHRcdFx0KSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0PC9MaXN0PlxuXHRcdFx0XHQ8L0RpYWxvZ0NvbW1hbmQ+XG5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWQgU2NoZW1hXCIsIGxhYmVsOlwiU2NoZW1hXCIsIGljb246PFVwbG9hZC8+XG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEX1NDSEVNQSgpKVxuXHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICAgICAgLHthY3Rpb246XCJVcGxvYWQgRGF0YVwiLCBsYWJlbDpcIkRhdGE6W2NvbE5hbWVdLmpzXCIsIGljb246PFVwbG9hZC8+XG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEX0RBVEEoKSlcblx0XHRcdFx0XHRcdFx0XHQudGhlbihjb2xOYW1lPT4gY29sTmFtZSAmJiByb3V0ZXIucmVwbGFjZShgL2RhdGEvJHtjb2xOYW1lfWApKVxuXHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICAgICAgLHthY3Rpb246XCJDb2xsZWN0aW9uc1wiLCBpY29uOjxNb3JlLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9PnJlZk5hbWVzLnNob3coKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XX0vPlxuXHRcdFx0PC9kaXY+XG4gICAgICAgIClcblx0fVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKERhdGEse0FDVElPTiwgUkVEVUNFUn0pXG4iXX0=