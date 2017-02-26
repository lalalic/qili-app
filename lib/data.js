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
						_react2.default.createElement(_reactable.Table, { data: data, defaultSort: { column: "createdAt" }, noDataText: 'no data yet' })
					),
					_react2.default.createElement(
						_materialUi.Tab,
						{ label: 'Indexes' },
						_react2.default.createElement(_reactable.Table, { data: index, noDataText: 'no index yet' })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJmaWxlU2VsZWN0b3IiLCJEaWFsb2dDb21tYW5kIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImRhdGEiLCJpbmRleCIsInNjaGVtYSIsIkFDVElPTiIsIkZFVENIX0lOQ0xVRElOR19TQ0hFTUEiLCJkaXNwYXRjaCIsIkZFVENIIiwibmFtZSIsImdldFNjaGVtYSIsIlByb21pc2UiLCJhbGwiLCJjb2xsZWN0aW9uRGF0YSIsImNvbGxlY3Rpb25JbmRleGVzIiwidGhlbiIsInR5cGUiLCJwYXlsb2FkIiwiVVBMT0FEX0RBVEEiLCJzZWxlY3RKc29uSW5Kc0ZpbGUiLCJsZW5ndGgiLCJraW5kIiwic3BsaXQiLCJwb3AiLCJVUExPQURfU0NIRU1BIiwic2V0U2NoZW1hIiwiUkVEVUNFUiIsInN0YXRlIiwiT2JqZWN0IiwiYXNzaWduIiwiRGF0YSIsInByb3BzIiwicGFyYW1zIiwibmV4dCIsImFwcCIsInJvdXRlciIsImNvbnRleHQiLCJjb25zdHJ1Y3RvciIsIkluZGV4SXRlbSIsIk5hbWVzIiwiaW5kZXhEYXRhIiwibWFwIiwia2V5cyIsImNvbCIsImZpbHRlciIsImEiLCJyZWZOYW1lcyIsImNvbHVtbiIsImRpc21pc3MiLCJwdXNoIiwiYWN0aW9uIiwibGFiZWwiLCJpY29uIiwib25TZWxlY3QiLCJjb2xOYW1lIiwicmVwbGFjZSIsInNob3ciLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFT0EsVSxRQUFBQSxVO0lBQVlDLFksUUFBQUEsWTtJQUNaQyxhLEdBQWVGLFUsQ0FBZkUsYTtBQUVBLElBQU1DLDBCQUFPLFNBQWI7QUFDUCxJQUFNQyxhQUFXO0FBQ2hCQyxPQUFLLEVBRFcsRUFDUkMsT0FBTSxFQURFLEVBQ0ND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O0FBQUEsZUFBVXVDLFdBQVduQixPQUFPb0IsT0FBUCxZQUF3QkQsT0FBeEIsQ0FBckI7QUFBQSxRQURNLENBQUg7QUFBQTtBQURRLE1BSmIsRUFRYSxFQUFDSixRQUFPLGFBQVIsRUFBdUJFLE1BQUssdURBQTVCO0FBQ2pCQyxnQkFBUztBQUFBLGNBQUdQLFNBQVNVLElBQVQsRUFBSDtBQUFBO0FBRFEsTUFSYixDQURSO0FBeEJELElBREQ7QUF3Q0E7Ozs7OztBQWhFVzFCLEksQ0FpRUwyQixZLEdBQWEsRUFBQ3RCLFFBQU8saUJBQVV1QixNQUFsQixFO2tCQUlOOUIsT0FBT0MsTUFBUCxDQUFjQyxJQUFkLEVBQW1CLEVBQUM5QixjQUFELEVBQVNLLGNBQVQsRUFBaUJxQixnQkFBakIsRUFBbkIsQyIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtUYWJzLCBUYWIsIExpc3QsIExpc3RJdGVtfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7VGFibGV9IGZyb20gJ3JlYWN0YWJsZSdcblxuaW1wb3J0IHtVc2VyLCBVSX0gZnJvbSAnLidcbmltcG9ydCBBcHAgZnJvbSBcIi4vZGIvYXBwXCJcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IE1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL21vcmUtdmVydFwiXG5pbXBvcnQgSWNvbkNvbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2RldmljZS9zdG9yYWdlXCJcblxuY29uc3Qge0NvbW1hbmRCYXIsIGZpbGVTZWxlY3Rvcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBjb25zdCBET01BSU49XCJ1aS5kYXRhXCJcbmNvbnN0IElOSVRfU1RBVEU9e1xuXHRkYXRhOltdLGluZGV4OltdLHNjaGVtYTpbXVxufVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0hfSU5DTFVESU5HX1NDSEVNQTogbmFtZT0+ZGlzcGF0Y2g9PmRpc3BhdGNoKEFDVElPTi5GRVRDSChuYW1lLEFwcC5nZXRTY2hlbWEoKSkpXG5cdCxGRVRDSDoobmFtZSxzY2hlbWEpPT5kaXNwYXRjaD0+UHJvbWlzZS5hbGwoW0FwcC5jb2xsZWN0aW9uRGF0YShuYW1lKSxBcHAuY29sbGVjdGlvbkluZGV4ZXMobmFtZSksc2NoZW1hXSlcblx0XHRcdC50aGVuKChbZGF0YSxpbmRleCxzY2hlbWFdKT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L2ZldGNoZWRgLHBheWxvYWQ6e2RhdGEsaW5kZXgsc2NoZW1hfX0pKVxuXG5cdCxVUExPQURfREFUQTphPT5kaXNwYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdEpzb25JbkpzRmlsZSgpXG5cdFx0XHRcdC50aGVuKCh7ZGF0YSxuYW1lfSk9Pntcblx0XHRcdFx0XHRpZihkYXRhICYmIGRhdGEubGVuZ3RoKXtcblx0XHRcdFx0XHRcdGxldCBraW5kPW5hbWUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnNwbGl0KCcuJylbMF1cblx0XHRcdFx0XHRcdHJldHVybiBBcHAuY29sbGVjdGlvbkRhdGEoa2luZCwgZGF0YSkudGhlbihhPT5raW5kKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblxuXHQsVVBMT0FEX1NDSEVNQTpBPT5kaXNwYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdEpzb25JbkpzRmlsZSgpXG5cdFx0XHRcdC50aGVuKCh7ZGF0YTpzY2hlbWF9KT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihzY2hlbWEgJiYgc2NoZW1hLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gQXBwLnNldFNjaGVtYShzY2hlbWEpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vc2NoZW1hYCxwYXlsb2FkOnNjaGVtYX0pKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vZmV0Y2hlZGA6XG5cdFx0cGF5bG9hZC5zY2hlbWE9cGF5bG9hZC5zY2hlbWF8fHN0YXRlLnNjaGVtYVxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHBheWxvYWQpXG5cblx0Y2FzZSBgQEAke0RPTUFJTn0vc2NoZW1hYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7c2NoZW1hOnBheWxvYWR9KVxuXG5cdGNhc2UgYEBAJHtET01BSU59L0NMRUFSYDpcblx0XHRyZXR1cm4gSU5JVF9TVEFURVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY2xhc3MgRGF0YSBleHRlbmRzIENvbXBvbmVudHtcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRjb25zdCB7cGFyYW1zOntuYW1lfSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0hfSU5DTFVESU5HX1NDSEVNQShuYW1lKSlcblx0fVxuXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XG5cdFx0aWYobmV4dC5hcHAhPXRoaXMucHJvcHMuYXBwKVxuXHRcdFx0bmV4dC5kaXNwYXRjaChBQ1RJT04uRkVUQ0hfSU5DTFVESU5HX1NDSEVNQShuZXh0LnBhcmFtcy5uYW1lKSlcblx0XHRlbHNlIGlmKG5leHQucGFyYW1zLm5hbWUhPXRoaXMucHJvcHMucGFyYW1zLm5hbWUpXG5cdFx0XHRuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSChuZXh0LnBhcmFtcy5uYW1lKSlcblx0fVxuXHRjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7ZGF0YSwgaW5kZXgsIHNjaGVtYSwgcGFyYW1zOntuYW1lfSxkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtJbmRleEl0ZW0sIE5hbWVzfT10aGlzLmNvbnN0cnVjdG9yXG5cdFx0Y29uc3QgaW5kZXhEYXRhPWluZGV4Lm1hcChjb2w9Pntcblx0XHRcdE9iamVjdC5rZXlzKGNvbCkuZmlsdGVyKGE9PmEhPSckb3B0aW9uJylcblx0XHR9KVxuXHRcdGxldCByZWZOYW1lc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8VGFicz5cblx0XHRcdFx0XHQ8VGFiIGxhYmVsPXtuYW1lfT5cblx0XHRcdFx0XHRcdDxUYWJsZSBkYXRhPXtkYXRhfSBkZWZhdWx0U29ydD17e2NvbHVtbjpcImNyZWF0ZWRBdFwifX0gbm9EYXRhVGV4dD1cIm5vIGRhdGEgeWV0XCIvPlxuXHRcdFx0XHRcdDwvVGFiPlxuXHRcdFx0XHRcdDxUYWIgbGFiZWw9XCJJbmRleGVzXCI+XG5cdFx0XHRcdFx0XHQ8VGFibGUgZGF0YT17aW5kZXh9IG5vRGF0YVRleHQ9XCJubyBpbmRleCB5ZXRcIi8+XG5cdFx0XHRcdFx0PC9UYWI+XG5cdFx0XHRcdDwvVGFicz5cblxuXHRcdFx0XHQ8RGlhbG9nQ29tbWFuZCByZWY9e2E9PnJlZk5hbWVzPWF9PlxuXHRcdFx0XHRcdDxMaXN0PlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNjaGVtYS5tYXAoKHtuYW1lfSk9Pihcblx0XHRcdFx0XHRcdFx0PExpc3RJdGVtIHByaW1hcnlUZXh0PXtuYW1lfSBsZWZ0SWNvbj17PEljb25Db2wvPn0ga2V5PXtuYW1lfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHRcdHJlZk5hbWVzLmRpc21pc3MoKVxuXHRcdFx0XHRcdFx0XHRcdFx0cm91dGVyLnB1c2goYC9kYXRhLyR7bmFtZX1gKVxuXHRcdFx0XHRcdFx0XHRcdH19Lz5cblx0XHRcdFx0XHRcdCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvTGlzdD5cblx0XHRcdFx0PC9EaWFsb2dDb21tYW5kPlxuXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVXBsb2FkIFNjaGVtYVwiLCBsYWJlbDpcIlNjaGVtYVwiLCBpY29uOjxVcGxvYWQvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRF9TQ0hFTUEoKSlcblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICx7YWN0aW9uOlwiVXBsb2FkIERhdGFcIiwgbGFiZWw6XCJEYXRhOltjb2xOYW1lXS5qc1wiLCBpY29uOjxVcGxvYWQvPlxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRF9EQVRBKCkpXG5cdFx0XHRcdFx0XHRcdFx0LnRoZW4oY29sTmFtZT0+IGNvbE5hbWUgJiYgcm91dGVyLnJlcGxhY2UoYC9kYXRhLyR7Y29sTmFtZX1gKSlcblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICx7YWN0aW9uOlwiQ29sbGVjdGlvbnNcIiwgaWNvbjo8TW9yZS8+XG5cdFx0XHRcdFx0XHRcdCxvblNlbGVjdDplPT5yZWZOYW1lcy5zaG93KClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdF19Lz5cblx0XHRcdDwvZGl2PlxuICAgICAgICApXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihEYXRhLHtET01BSU4sIEFDVElPTiwgUkVEVUNFUn0pXG4iXX0=