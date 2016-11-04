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

var REDUCER = exports.REDUCER = function REDUCER() {
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
			    dispatch = _props2.dispatch;
			var router = this.context.router;
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
exports.default = Object.assign(Data, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJmaWxlU2VsZWN0b3IiLCJEaWFsb2dDb21tYW5kIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImRhdGEiLCJpbmRleCIsInNjaGVtYSIsImFwcCIsIkFDVElPTiIsIkZFVENIIiwibmFtZSIsIlByb21pc2UiLCJhbGwiLCJjb2xsZWN0aW9uRGF0YSIsImNvbGxlY3Rpb25JbmRleGVzIiwidGhlbiIsImRpc3BhdGNoIiwidHlwZSIsInBheWxvYWQiLCJVUExPQURfREFUQSIsInNlbGVjdEpzb25JbkpzRmlsZSIsImxlbmd0aCIsImtpbmQiLCJzcGxpdCIsInBvcCIsIlVQTE9BRF9TQ0hFTUEiLCJzZXRTY2hlbWEiLCJSRURVQ0VSIiwic3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJfaWQiLCJEYXRhIiwicHJvcHMiLCJwYXJhbXMiLCJuZXh0Iiwicm91dGVyIiwiY29udGV4dCIsImNvbnN0cnVjdG9yIiwiSW5kZXhJdGVtIiwiTmFtZXMiLCJpbmRleERhdGEiLCJtYXAiLCJrZXlzIiwiY29sIiwiZmlsdGVyIiwiYSIsInJlZk5hbWVzIiwiZGlzbWlzcyIsInB1c2giLCJhY3Rpb24iLCJsYWJlbCIsImljb24iLCJvblNlbGVjdCIsImNvbE5hbWUiLCJyZXBsYWNlIiwic2hvdyIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsWSxRQUFBQSxZO0lBQ1pDLGEsR0FBZUYsVSxDQUFmRSxhO0FBRUEsSUFBTUMsMEJBQU8sU0FBYjtBQUNQLElBQU1DLGFBQVc7QUFDaEJDLE9BQUssRUFEVyxFQUNSQyxPQUFNLEVBREUsRUFDQ0MsUUFBTyxFQURSLEVBQ1dDLEtBQUk7QUFEZixDQUFqQjs7QUFJTyxJ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QURRLE1BSmIsRUFRYSxFQUFDSixRQUFPLGFBQVIsRUFBdUJFLE1BQUssdURBQTVCO0FBQ2pCQyxnQkFBUztBQUFBLGNBQUdOLFNBQVNTLElBQVQsRUFBSDtBQUFBO0FBRFEsTUFSYixDQURSO0FBeEJELElBREQ7QUF3Q0E7Ozs7OztBQWhFV3hCLEksQ0FpRUx5QixZLEdBQWEsRUFBQ3JCLFFBQU8saUJBQVVzQixNQUFsQixFO2tCQUlON0IsT0FBT0MsTUFBUCxDQUFjRSxJQUFkLEVBQW1CLEVBQUM5QixjQUFELEVBQVNNLGNBQVQsRUFBaUJtQixnQkFBakIsRUFBbkIsQyIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtUYWJzLCBUYWIsIExpc3QsIExpc3RJdGVtfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7VGFibGV9IGZyb20gJ3JlYWN0YWJsZSdcblxuaW1wb3J0IHtVc2VyLCBVSX0gZnJvbSAnLidcbmltcG9ydCBBcHAgZnJvbSBcIi4vZGIvYXBwXCJcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IE1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5pbXBvcnQgSWNvbkNvbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2RldmljZS9zdG9yYWdlXCJcblxuY29uc3Qge0NvbW1hbmRCYXIsIGZpbGVTZWxlY3Rvcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBjb25zdCBET01BSU49XCJ1aS5kYXRhXCJcbmNvbnN0IElOSVRfU1RBVEU9e1xuXHRkYXRhOltdLGluZGV4OltdLHNjaGVtYTpbXSxhcHA6bnVsbFxufVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0g6KG5hbWUsc2NoZW1hKT0+ZGlzcGF0Y2g9PlByb21pc2UuYWxsKFtBcHAuY29sbGVjdGlvbkRhdGEobmFtZSksQXBwLmNvbGxlY3Rpb25JbmRleGVzKG5hbWUpLHNjaGVtYV0pXG5cdFx0XHQudGhlbigoW2RhdGEsaW5kZXgsc2NoZW1hXSk9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS9mZXRjaGVkYCxwYXlsb2FkOntkYXRhLGluZGV4LHNjaGVtYX19KSlcblxuXHQsVVBMT0FEX0RBVEE6YT0+ZGlzcGF0Y2g9PmZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxuXHRcdFx0XHQudGhlbigoe2RhdGEsbmFtZX0pPT57XG5cdFx0XHRcdFx0aWYoZGF0YSAmJiBkYXRhLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRsZXQga2luZD1uYW1lLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5zcGxpdCgnLicpWzBdXG5cdFx0XHRcdFx0XHRyZXR1cm4gQXBwLmNvbGxlY3Rpb25EYXRhKGtpbmQsIGRhdGEpLnRoZW4oYT0+a2luZClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cblx0LFVQTE9BRF9TQ0hFTUE6QT0+ZGlzcGF0Y2g9PmZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxuXHRcdFx0XHQudGhlbigoe2RhdGE6c2NoZW1hfSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoc2NoZW1hICYmIHNjaGVtYS5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIEFwcC5zZXRTY2hlbWEoc2NoZW1hKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3NjaGVtYWAscGF5bG9hZDpzY2hlbWF9KSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT1JTklUX1NUQVRFLHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYEBAJHtET01BSU59L2ZldGNoZWRgOlxuXHRcdHBheWxvYWQuc2NoZW1hPXBheWxvYWQuc2NoZW1hfHxzdGF0ZS5zY2hlbWFcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSxwYXlsb2FkKVxuXG5cdGNhc2UgYEBAJHtET01BSU59L3NjaGVtYWA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3NjaGVtYTpwYXlsb2FkfSlcblxuXHRjYXNlIGBAQG1haW4vQVBQX0NIQU5HRURgOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LElOSVRfU1RBVEUse2FwcDpwYXlsb2FkLmFwcC5faWR9KVxuXG5cdGNhc2UgYEBAJHtET01BSU59L0NMRUFSYDpcblx0XHRyZXR1cm4gSU5JVF9TVEFURVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY2xhc3MgRGF0YSBleHRlbmRzIENvbXBvbmVudHtcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRjb25zdCB7cGFyYW1zOntuYW1lfSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0gobmFtZSxBcHAuc2NoZW1hKSlcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XG5cdFx0aWYobmV4dC5hcHAhPXRoaXMucHJvcHMuYXBwKVxuXHRcdFx0bmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0gobmV4dC5wYXJhbXMubmFtZSxBcHAuc2NoZW1hKSlcblx0XHRlbHNlIGlmKG5leHQucGFyYW1zLm5hbWUhPXRoaXMucHJvcHMucGFyYW1zLm5hbWUpXG5cdFx0XHRuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSChuZXh0LnBhcmFtcy5uYW1lKSlcblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7ZGF0YSwgaW5kZXgsIHNjaGVtYSwgcGFyYW1zOntuYW1lfSxkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtJbmRleEl0ZW0sIE5hbWVzfT10aGlzLmNvbnN0cnVjdG9yXG5cdFx0Y29uc3QgaW5kZXhEYXRhPWluZGV4Lm1hcChjb2w9Pntcblx0XHRcdE9iamVjdC5rZXlzKGNvbCkuZmlsdGVyKGE9PmEhPSckb3B0aW9uJylcblx0XHR9KVxuXHRcdGxldCByZWZOYW1lc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8VGFicz5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPXtuYW1lfT5cblx0XHRcdFx0XHRcdDxUYWJsZSBkYXRhPXtkYXRhfS8+XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdFx0PFRhYiBsYWJlbD1cIkluZGV4ZXNcIj5cblx0XHRcdFx0XHRcdDxUYWJsZSBkYXRhPXtpbmRleH0vPlxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHQ8L1RhYnM+XG5cblx0XHRcdFx0PERpYWxvZ0NvbW1hbmQgcmVmPXthPT5yZWZOYW1lcz1hfT5cblx0XHRcdFx0XHQ8TGlzdD5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRzY2hlbWEubWFwKCh7bmFtZX0pPT4oXG5cdFx0XHRcdFx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gbGVmdEljb249ezxJY29uQ29sLz59IGtleT17bmFtZX1cblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XG5cdFx0XHRcdFx0XHRcdFx0XHRyZWZOYW1lcy5kaXNtaXNzKClcblx0XHRcdFx0XHRcdFx0XHRcdHJvdXRlci5wdXNoKGAvZGF0YS8ke25hbWV9YClcblx0XHRcdFx0XHRcdFx0XHR9fS8+XG5cdFx0XHRcdFx0XHQpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8L0xpc3Q+XG5cdFx0XHRcdDwvRGlhbG9nQ29tbWFuZD5cblxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0XHRpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZCBTY2hlbWFcIiwgbGFiZWw6XCJTY2hlbWFcIiwgaWNvbjo8VXBsb2FkLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUExPQURfU0NIRU1BKCkpXG5cdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAse2FjdGlvbjpcIlVwbG9hZCBEYXRhXCIsIGxhYmVsOlwiRGF0YTpbY29sTmFtZV0uanNcIiwgaWNvbjo8VXBsb2FkLz5cblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUExPQURfREFUQSgpKVxuXHRcdFx0XHRcdFx0XHRcdC50aGVuKGNvbE5hbWU9PiBjb2xOYW1lICYmIHJvdXRlci5yZXBsYWNlKGAvZGF0YS8ke2NvbE5hbWV9YCkpXG5cdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgICAgICAse2FjdGlvbjpcIkNvbGxlY3Rpb25zXCIsIGljb246PE1vcmUvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+cmVmTmFtZXMuc2hvdygpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRdfS8+XG5cdFx0XHQ8L2Rpdj5cbiAgICAgICAgKVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpQcm9wVHlwZXMub2JqZWN0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oRGF0YSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxuIl19