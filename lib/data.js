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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLmpzIl0sIm5hbWVzIjpbIkNvbW1hbmRCYXIiLCJmaWxlU2VsZWN0b3IiLCJEaWFsb2dDb21tYW5kIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImRhdGEiLCJpbmRleCIsInNjaGVtYSIsIkFDVElPTiIsIkZFVENIX0lOQ0xVRElOR19TQ0hFTUEiLCJkaXNwYXRjaCIsIkZFVENIIiwibmFtZSIsImdldFNjaGVtYSIsIlByb21pc2UiLCJhbGwiLCJjb2xsZWN0aW9uRGF0YSIsImNvbGxlY3Rpb25JbmRleGVzIiwidGhlbiIsInR5cGUiLCJwYXlsb2FkIiwiVVBMT0FEX0RBVEEiLCJzZWxlY3RKc29uSW5Kc0ZpbGUiLCJsZW5ndGgiLCJraW5kIiwic3BsaXQiLCJwb3AiLCJVUExPQURfU0NIRU1BIiwic2V0U2NoZW1hIiwiUkVEVUNFUiIsInN0YXRlIiwiT2JqZWN0IiwiYXNzaWduIiwiRGF0YSIsInByb3BzIiwicGFyYW1zIiwibmV4dCIsImFwcCIsInJvdXRlciIsImNvbnRleHQiLCJjb25zdHJ1Y3RvciIsIkluZGV4SXRlbSIsIk5hbWVzIiwiaW5kZXhEYXRhIiwibWFwIiwia2V5cyIsImNvbCIsImZpbHRlciIsImEiLCJyZWZOYW1lcyIsImNvbHVtbiIsImRpc21pc3MiLCJwdXNoIiwiYWN0aW9uIiwibGFiZWwiLCJpY29uIiwib25TZWxlY3QiLCJjb2xOYW1lIiwicmVwbGFjZSIsInNob3ciLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFT0EsVSxRQUFBQSxVO0lBQVlDLFksUUFBQUEsWTtJQUNaQyxhLEdBQWVGLFUsQ0FBZkUsYTtBQUVBLElBQU1DLDBCQUFPLFNBQWI7QUFDUCxJQUFNQyxhQUFXO0FBQ2hCQyxPQUFLLEVBRFcsRUFDUkMsT0FBTSxFQURFLEVBQ0ND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O0FBQUEsZUFBVXVDLFdBQVduQixPQUFPb0IsT0FBUCxZQUF3QkQsT0FBeEIsQ0FBckI7QUFBQSxRQURNLENBQUg7QUFBQTtBQURRLE1BSmIsRUFRYSxFQUFDSixRQUFPLGFBQVIsRUFBdUJFLE1BQUssdURBQTVCO0FBQ2pCQyxnQkFBUztBQUFBLGNBQUdQLFNBQVNVLElBQVQsRUFBSDtBQUFBO0FBRFEsTUFSYixDQURSO0FBeEJELElBREQ7QUF3Q0E7Ozs7OztBQWhFVzFCLEksQ0FpRUwyQixZLEdBQWEsRUFBQ3RCLFFBQU8saUJBQVV1QixNQUFsQixFO2tCQUlOOUIsT0FBT0MsTUFBUCxDQUFjQyxJQUFkLEVBQW1CLEVBQUM5QixjQUFELEVBQVNLLGNBQVQsRUFBaUJxQixnQkFBakIsRUFBbkIsQyIsImZpbGUiOiJkYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1RhYnMsIFRhYiwgTGlzdCwgTGlzdEl0ZW19IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5pbXBvcnQge1RhYmxlfSBmcm9tICdyZWFjdGFibGUnXHJcblxyXG5pbXBvcnQge1VzZXIsIFVJfSBmcm9tICcuJ1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXHJcblxyXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXHJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxyXG5pbXBvcnQgSWNvbkNvbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2RldmljZS9zdG9yYWdlXCJcclxuXHJcbmNvbnN0IHtDb21tYW5kQmFyLCBmaWxlU2VsZWN0b3J9PVVJXHJcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwidWkuZGF0YVwiXHJcbmNvbnN0IElOSVRfU1RBVEU9e1xyXG5cdGRhdGE6W10saW5kZXg6W10sc2NoZW1hOltdXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdEZFVENIX0lOQ0xVRElOR19TQ0hFTUE6IG5hbWU9PmRpc3BhdGNoPT5kaXNwYXRjaChBQ1RJT04uRkVUQ0gobmFtZSxBcHAuZ2V0U2NoZW1hKCkpKVxyXG5cdCxGRVRDSDoobmFtZSxzY2hlbWEpPT5kaXNwYXRjaD0+UHJvbWlzZS5hbGwoW0FwcC5jb2xsZWN0aW9uRGF0YShuYW1lKSxBcHAuY29sbGVjdGlvbkluZGV4ZXMobmFtZSksc2NoZW1hXSlcclxuXHRcdFx0LnRoZW4oKFtkYXRhLGluZGV4LHNjaGVtYV0pPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vZmV0Y2hlZGAscGF5bG9hZDp7ZGF0YSxpbmRleCxzY2hlbWF9fSkpXHJcblxyXG5cdCxVUExPQURfREFUQTphPT5kaXNwYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdEpzb25JbkpzRmlsZSgpXHJcblx0XHRcdFx0LnRoZW4oKHtkYXRhLG5hbWV9KT0+e1xyXG5cdFx0XHRcdFx0aWYoZGF0YSAmJiBkYXRhLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRcdGxldCBraW5kPW5hbWUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnNwbGl0KCcuJylbMF1cclxuXHRcdFx0XHRcdFx0cmV0dXJuIEFwcC5jb2xsZWN0aW9uRGF0YShraW5kLCBkYXRhKS50aGVuKGE9PmtpbmQpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHJcblx0LFVQTE9BRF9TQ0hFTUE6QT0+ZGlzcGF0Y2g9PmZpbGVTZWxlY3Rvci5zZWxlY3RKc29uSW5Kc0ZpbGUoKVxyXG5cdFx0XHRcdC50aGVuKCh7ZGF0YTpzY2hlbWF9KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNjaGVtYSAmJiBzY2hlbWEubGVuZ3RoKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIEFwcC5zZXRTY2hlbWEoc2NoZW1hKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vc2NoZW1hYCxwYXlsb2FkOnNjaGVtYX0pKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBSRURVQ0VSPShzdGF0ZT1JTklUX1NUQVRFLHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9mZXRjaGVkYDpcclxuXHRcdHBheWxvYWQuc2NoZW1hPXBheWxvYWQuc2NoZW1hfHxzdGF0ZS5zY2hlbWFcclxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHBheWxvYWQpXHJcblxyXG5cdGNhc2UgYEBAJHtET01BSU59L3NjaGVtYWA6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7c2NoZW1hOnBheWxvYWR9KVxyXG5cclxuXHRjYXNlIGBAQCR7RE9NQUlOfS9DTEVBUmA6XHJcblx0XHRyZXR1cm4gSU5JVF9TVEFURVxyXG5cdH1cclxuXHRyZXR1cm4gc3RhdGVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERhdGEgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0Y29tcG9uZW50RGlkTW91bnQoKXtcclxuXHRcdGNvbnN0IHtwYXJhbXM6e25hbWV9LCBkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIX0lOQ0xVRElOR19TQ0hFTUEobmFtZSkpXHJcblx0fVxyXG5cclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xyXG5cdFx0aWYobmV4dC5hcHAhPXRoaXMucHJvcHMuYXBwKVxyXG5cdFx0XHRuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSF9JTkNMVURJTkdfU0NIRU1BKG5leHQucGFyYW1zLm5hbWUpKVxyXG5cdFx0ZWxzZSBpZihuZXh0LnBhcmFtcy5uYW1lIT10aGlzLnByb3BzLnBhcmFtcy5uYW1lKVxyXG5cdFx0XHRuZXh0LmRpc3BhdGNoKEFDVElPTi5GRVRDSChuZXh0LnBhcmFtcy5uYW1lKSlcclxuXHR9XHJcblx0Y29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuXHRcdHRoaXMucHJvcHMuZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L0NMRUFSYH0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtkYXRhLCBpbmRleCwgc2NoZW1hLCBwYXJhbXM6e25hbWV9LGRpc3BhdGNofT10aGlzLnByb3BzXHJcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtJbmRleEl0ZW0sIE5hbWVzfT10aGlzLmNvbnN0cnVjdG9yXHJcblx0XHRjb25zdCBpbmRleERhdGE9aW5kZXgubWFwKGNvbD0+e1xyXG5cdFx0XHRPYmplY3Qua2V5cyhjb2wpLmZpbHRlcihhPT5hIT0nJG9wdGlvbicpXHJcblx0XHR9KVxyXG5cdFx0bGV0IHJlZk5hbWVzXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdDxUYWJzPlxyXG5cdFx0XHRcdFx0PFRhYiBsYWJlbD17bmFtZX0+XHJcblx0XHRcdFx0XHRcdDxUYWJsZSBkYXRhPXtkYXRhfSBkZWZhdWx0U29ydD17e2NvbHVtbjpcImNyZWF0ZWRBdFwifX0gbm9EYXRhVGV4dD1cIm5vIGRhdGEgeWV0XCIvPlxyXG5cdFx0XHRcdFx0PC9UYWI+XHJcblx0XHRcdFx0XHQ8VGFiIGxhYmVsPVwiSW5kZXhlc1wiPlxyXG5cdFx0XHRcdFx0XHQ8VGFibGUgZGF0YT17aW5kZXh9IG5vRGF0YVRleHQ9XCJubyBpbmRleCB5ZXRcIi8+XHJcblx0XHRcdFx0XHQ8L1RhYj5cclxuXHRcdFx0XHQ8L1RhYnM+XHJcblxyXG5cdFx0XHRcdDxEaWFsb2dDb21tYW5kIHJlZj17YT0+cmVmTmFtZXM9YX0+XHJcblx0XHRcdFx0XHQ8TGlzdD5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0c2NoZW1hLm1hcCgoe25hbWV9KT0+KFxyXG5cdFx0XHRcdFx0XHRcdDxMaXN0SXRlbSBwcmltYXJ5VGV4dD17bmFtZX0gbGVmdEljb249ezxJY29uQ29sLz59IGtleT17bmFtZX1cclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVmTmFtZXMuZGlzbWlzcygpXHJcblx0XHRcdFx0XHRcdFx0XHRcdHJvdXRlci5wdXNoKGAvZGF0YS8ke25hbWV9YClcclxuXHRcdFx0XHRcdFx0XHRcdH19Lz5cclxuXHRcdFx0XHRcdFx0KSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvTGlzdD5cclxuXHRcdFx0XHQ8L0RpYWxvZ0NvbW1hbmQ+XHJcblxyXG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxyXG5cdFx0XHRcdFx0aXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZCBTY2hlbWFcIiwgbGFiZWw6XCJTY2hlbWFcIiwgaWNvbjo8VXBsb2FkLz5cclxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRF9TQ0hFTUEoKSlcclxuXHRcdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAse2FjdGlvbjpcIlVwbG9hZCBEYXRhXCIsIGxhYmVsOlwiRGF0YTpbY29sTmFtZV0uanNcIiwgaWNvbjo8VXBsb2FkLz5cclxuXHRcdFx0XHRcdFx0XHQsb25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRF9EQVRBKCkpXHJcblx0XHRcdFx0XHRcdFx0XHQudGhlbihjb2xOYW1lPT4gY29sTmFtZSAmJiByb3V0ZXIucmVwbGFjZShgL2RhdGEvJHtjb2xOYW1lfWApKVxyXG5cdFx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICx7YWN0aW9uOlwiQ29sbGVjdGlvbnNcIiwgaWNvbjo8TW9yZS8+XHJcblx0XHRcdFx0XHRcdFx0LG9uU2VsZWN0OmU9PnJlZk5hbWVzLnNob3coKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdF19Lz5cclxuXHRcdFx0PC9kaXY+XHJcbiAgICAgICAgKVxyXG5cdH1cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oRGF0YSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxyXG4iXX0=