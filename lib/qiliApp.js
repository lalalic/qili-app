"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

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

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require("react-router");

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _materialUi = require("material-ui");

var _MuiThemeProvider = require("material-ui/styles/MuiThemeProvider");

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _getMuiTheme = require("material-ui/styles/getMuiTheme");

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _lightBaseTheme = require("material-ui/styles/baseThemes/lightBaseTheme");

var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

var _keyboardArrowLeft = require("material-ui/svg-icons/hardware/keyboard-arrow-left");

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _ = require(".");

var _db = require("./db");

var _messager = require("./components/messager");

var _messager2 = _interopRequireDefault(_messager);

var _loading = require("./components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _reactTapEventPlugin = require("react-tap-event-plugin");

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _account = require("./account");

var _account2 = _interopRequireDefault(_account);

var _tutorial = require("./components/tutorial");

var _tutorial2 = _interopRequireDefault(_tutorial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMAIN = exports.DOMAIN = "qiliApp";

var ACTION = exports.ACTION = {
	INIT_APP: function INIT_APP(error, tutorialized) {
		if (!!error) {
			return {
				type: "@@" + DOMAIN + "/initedError",
				payload: { user: _db.User.current, error: error }
			};
		} else {
			return {
				type: "@@" + DOMAIN + "/inited",
				payload: { tutorialized: tutorialized }
			};
		}
	},
	CHECK_VERSION: function CHECK_VERSION(homepage, currentVersion) {
		return function (dispatch) {
			require("http").get(homepage + "/app.apk.version", function (res) {
				res.on("data", function (data) {
					dispatch({ type: "@@" + DOMAIN + "/LASTEST_VERSION", payload: new Buffer(data).toString().trim() });
				});
			}).end();
		};
	},
	LOGOUT: function LOGOUT(A) {
		return _db.User.logout();
	},
	USER_CHANGED: function USER_CHANGED(user) {
		return {
			type: "@@" + DOMAIN + "/USER_CHANGED",
			payload: user
		};
	}, TUTORIALIZED: {
		type: "@@" + DOMAIN + "/TUTORIALIZED"
	}
};

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/inited":
			return (0, _assign2.default)({}, state, {
				inited: true,
				user: _db.User.current,
				tutorialized: payload.tutorialized
			});
			break;
		case "@@" + DOMAIN + "/initedError":
			return (0, _assign2.default)({}, state, {
				initedError: payload.error
			});
			break;
		case "@@" + DOMAIN + "/USER_CHANGED":
			return (0, _assign2.default)({}, state, {
				user: payload
			});
		case "@@" + DOMAIN + "/TUTORIALIZED":
			return (0, _assign2.default)({}, state, { tutorialized: true });

		case "@@" + DOMAIN + "/LASTEST_VERSION":
			return (0, _assign2.default)({}, state, { latestVersion: payload });
	}

	return state;
};

var QiliApp = exports.QiliApp = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
}, null, null, { pure: true, withRef: true })((_temp = _class = function (_Component) {
	(0, _inherits3.default)(_class, _Component);

	function _class(props) {
		(0, _classCallCheck3.default)(this, _class);

		var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));

		(0, _reactTapEventPlugin2.default)();

		var _this$props = _this.props;
		var service = _this$props.service;
		var appId = _this$props.appId;


		if (!appId) throw new Error("Please give application key");

		if (!service) throw new Error("Please give service url");
		return _this;
	}

	(0, _createClass3.default)(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var _props = this.props;
			var initApp = _props.init;
			var service = _props.service;
			var appId = _props.appId;
			var title = _props.title;
			var project = _props.project;
			var dispatch = _props.dispatch;

			if (title) document.title = title;

			(0, _db.init)(service, appId, initApp, function (e) {
				var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Error';
				return _this2.refs.msg.show(e, type);
			}, this.refs.loading).then(function () {
				var tutorialized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				dispatch(ACTION.INIT_APP(null, !!tutorialized));
				_db.User.on('change', function (user) {
					return dispatch(ACTION.USER_CHANGED(user));
				});
			}, function (e) {
				return dispatch(ACTION.INIT_APP(e.message));
			}).then(function (a) {
				return dispatch(ACTION.CHECK_VERSION(project.homepage, project.version));
			});
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var self = this;
			return {
				showMessage: function showMessage() {
					self.showMessage.apply(self, arguments);
				},
				loading: function loading(open) {
					self.refs.loading[open ? "show" : "close"]();
				},

				is: {
					app: typeof cordova !== 'undefined'
				},
				project: this.props.project
			};
		}
	}, {
		key: "showMessage",
		value: function showMessage() {
			var _refs$msg;

			(_refs$msg = this.refs.msg).show.apply(_refs$msg, arguments);
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props;
			var theme = _props2.theme;
			var inited = _props2.inited;
			var initedError = _props2.initedError;
			var user = _props2.user;
			var lastUser = _props2.lastUser;
			var tutorialized = _props2.tutorialized;
			var dispatch = _props2.dispatch;

			var content = void 0;

			if (!inited) {
				if (initedError) content = "Initializing Error: " + initedError;else content = "initializing...";
			} else if (!user) {
				if (!tutorialized && Array.isArray(this.props.tutorial) && this.props.tutorial.length) return _react2.default.createElement(_tutorial2.default, { slides: this.props.tutorial, onEnd: function onEnd(e) {
						return dispatch(ACTION.TUTORIALIZED);
					} });

				content = _react2.default.createElement(_account2.default, null);
			} else if (!user.sessionToken) {
				content = _react2.default.createElement(_account2.default, { user: user });
			} else {
				content = this.renderContent();
			}

			return _react2.default.createElement(
				_MuiThemeProvider2.default,
				{ muiTheme: theme },
				_react2.default.createElement(
					"div",
					{ className: "withFootbar" },
					_react2.default.createElement(
						"div",
						{ id: "container", style: { overflowY: "scroll" } },
						content,
						_react2.default.createElement(_messager2.default, { ref: "msg", className: "sticky bottom left" }),
						_react2.default.createElement(_loading2.default, { ref: "loading", className: "sticky top right" })
					)
				)
			);
		}
	}, {
		key: "renderContent",
		value: function renderContent() {
			return this.props.children;
		}
	}], [{
		key: "render",
		value: function render(route) {
			for (var _len = arguments.length, middlewars = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				middlewars[_key - 2] = arguments[_key];
			}

			var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			var props = {};
			var container = document.getElementById('app');
			if (!container) {
				container = document.createElement('div');
				container.id = 'app';
				document.body.appendChild(container);
			}
			var style = document.createElement("style");
			document.getElementsByTagName("head")[0].appendChild(style);
			style.innerHTML = ".page{min-height:" + window.innerHeight + "px}";
			container.style.height = window.innerHeight + 'px';

			if (!props.history) props.history = _reactRouter.hashHistory;

			function routerRducer() {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var _ref2 = arguments[1];
				var type = _ref2.type;
				var payload = _ref2.payload;

				switch (type) {
					case '@@router/LOCATION_CHANGE':
						return payload;
				}
				return state;
			}

			var enhancedRoute = function enhancedRoute(root, dispatch) {
				var _root$props = root.props;
				var _onEnter = _root$props.onEnter;
				var _onChange = _root$props.onChange;

				return _react2.default.cloneElement(root, {
					onEnter: function onEnter(nextState) {
						dispatch({ type: "@@router/LOCATION_CHANGE", payload: nextState });
						_onEnter && _onEnter.bind(this).apply(undefined, arguments);
					},
					onChange: function onChange(state, nextState) {
						dispatch({ type: "@@router/LOCATION_CHANGE", payload: nextState });
						_onChange && _onChange.bind(this).apply(undefined, arguments);
					}
				});
			};

			function normalizeData() {
				var entities = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
				var _ref3 = arguments[1];
				var type = _ref3.type;
				var payload = _ref3.payload;

				switch (type) {
					case 'NORMALIZED_DATA':
						return (0, _assign2.default)({}, entities, (0, _keys2.default)(payload).reduce(function (merged, type) {
							if (typeof payload[type]['$remove'] == 'undefined') merged[type] = (0, _assign2.default)({}, entities[type], payload[type]);else merged[type] = (0, _assign2.default)({}, payload[type]['$remove'].reduce(function (all, a) {
								return delete all[a], all;
							}, entities[type]));

							return merged;
						}, {}));
				}
				return entities;
			}

			var allReducers = _.enhancedCombineReducers.apply(undefined, [(0, _defineProperty3.default)({
				routing: routerRducer,
				entities: normalizeData
			}, DOMAIN, REDUCER)].concat((0, _toConsumableArray3.default)(reducers)));
			var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
			var store = (0, _redux.createStore)(allReducers, { qiliApp: {}, ui: {}, entities: {} }, composeEnhancers(_redux.applyMiddleware.apply(undefined, [_reduxThunk2.default].concat(middlewars))));

			return (0, _reactDom.render)(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(
					_reactRouter.Router,
					props,
					enhancedRoute(route, store.dispatch)
				)
			), container);
		}
	}]);
	return _class;
}(_react.Component), _class.defaultProps = {
	service: "http://qili2.com/1/",
	theme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default, {
		footbar: {
			height: 50
		},
		page: {
			width: window.innerWidth > 960 ? 960 : window.innerWidth,
			height: window.innerHeight
		}
	}),
	init: function init() {},

	tutorial: [],
	project: {}
}, _class.propsTypes = {
	service: _react.PropTypes.string.isRequired,
	appId: _react.PropTypes.string.isRequired,
	theme: _react.PropTypes.object.isRequired,
	init: _react.PropTypes.func,
	tutorial: _react.PropTypes.array,
	title: _react.PropTypes.string,
	project: _react.PropTypes.object
}, _class.childContextTypes = {
	showMessage: _react.PropTypes.func,
	loading: _react.PropTypes.func,
	is: _react.PropTypes.object,
	project: _react.PropTypes.object
}, _temp));

exports.default = (0, _assign2.default)(QiliApp, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiQ0hFQ0tfVkVSU0lPTiIsImhvbWVwYWdlIiwiY3VycmVudFZlcnNpb24iLCJyZXF1aXJlIiwiZ2V0IiwicmVzIiwib24iLCJkaXNwYXRjaCIsIkJ1ZmZlciIsImRhdGEiLCJ0b1N0cmluZyIsInRyaW0iLCJlbmQiLCJMT0dPVVQiLCJsb2dvdXQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsImxhdGVzdFZlcnNpb24iLCJRaWxpQXBwIiwicHVyZSIsIndpdGhSZWYiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsInByb2plY3QiLCJkb2N1bWVudCIsImUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwibWVzc2FnZSIsInZlcnNpb24iLCJzZWxmIiwic2hvd01lc3NhZ2UiLCJhcmd1bWVudHMiLCJvcGVuIiwiaXMiLCJhcHAiLCJjb3Jkb3ZhIiwidGhlbWUiLCJsYXN0VXNlciIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlIiwibWlkZGxld2FycyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5Iiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwibm9ybWFsaXplRGF0YSIsImVudGl0aWVzIiwicmVkdWNlIiwibWVyZ2VkIiwiYWxsIiwiYSIsImFsbFJlZHVjZXJzIiwicm91dGluZyIsImNvbXBvc2VFbmhhbmNlcnMiLCJfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18iLCJzdG9yZSIsInFpbGlBcHAiLCJ1aSIsImRlZmF1bHRQcm9wcyIsImZvb3RiYXIiLCJwYWdlIiwid2lkdGgiLCJpbm5lcldpZHRoIiwicHJvcHNUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSwwQkFBTyxTQUFiOztBQUVBLElBQU1DLDBCQUFPO0FBQ25CQyxTQURtQixvQkFDVkMsS0FEVSxFQUNKQyxZQURJLEVBQ1M7QUFDM0IsTUFBRyxDQUFDLENBQUNELEtBQUwsRUFBVztBQUNWLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsaUJBRE07QUFFTE0sYUFBUSxFQUFDQyxNQUFLLFNBQUtDLE9BQVgsRUFBbUJMLFlBQW5CO0FBRkgsSUFBUDtBQUlBLEdBTEQsTUFLSztBQUNKLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsWUFETTtBQUVMTSxhQUFRLEVBQUNGLDBCQUFEO0FBRkgsSUFBUDtBQUlBO0FBQ0QsRUFia0I7QUFjbEJLLGdCQUFjLHVCQUFD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MUI7QUFERjtBQURELElBREssRUFNSndELFNBTkksQ0FBUDtBQU9BO0FBbE1rQjtBQUFBO0FBQUEsNEJBd0Zaa0MsWUF4RlksR0F3RkM7QUFDbkJ2RSxVQUFRLHFCQURXO0FBRW5CdUIsUUFBTSxxREFBMkI7QUFDaENpRCxXQUFRO0FBQ1B4QixXQUFRO0FBREQsR0FEd0I7QUFJaEN5QixRQUFLO0FBQ0pDLFVBQU81QixPQUFPNkIsVUFBUCxHQUFvQixHQUFwQixHQUEwQixHQUExQixHQUFnQzdCLE9BQU82QixVQUQxQztBQUVIM0IsV0FBT0YsT0FBT0M7QUFGWDtBQUoyQixFQUEzQixDQUZhO0FBV25CM0MsS0FYbUIsa0JBV2IsQ0FBRSxDQVhXOztBQVluQndCLFdBQVMsRUFaVTtBQWFuQnRCLFVBQVE7QUFiVyxDQXhGRCxTQXdHWnNFLFVBeEdZLEdBd0dEO0FBQ2pCNUUsVUFBUyxpQkFBVTZFLE1BQVYsQ0FBaUJDLFVBRFQ7QUFFakI3RSxRQUFNLGlCQUFVNEUsTUFBVixDQUFpQkMsVUFGTjtBQUdqQnZELFFBQU8saUJBQVV3RCxNQUFWLENBQWlCRCxVQUhQO0FBSWpCMUUsT0FBSyxpQkFBVTRFLElBSkU7QUFLakJwRCxXQUFTLGlCQUFVcUQsS0FMRjtBQU1qQjVFLFFBQU8saUJBQVV3RSxNQU5BO0FBT2pCdkUsVUFBUyxpQkFBVXlFO0FBUEYsQ0F4R0MsU0FrSFpHLGlCQWxIWSxHQWtITTtBQUN4QmpFLGNBQWEsaUJBQVUrRCxJQURDO0FBRXhCcEUsVUFBUyxpQkFBVW9FLElBRks7QUFHeEI1RCxLQUFJLGlCQUFVMkQsTUFIVTtBQUl4QnpFLFVBQVMsaUJBQVV5RTtBQUpLLENBbEhOLFNBQWQ7O2tCQXNNUSxzQkFBY25GLE9BQWQsRUFBc0IsRUFBQy9CLGNBQUQsRUFBU0MsY0FBVCxFQUFnQnlCLGdCQUFoQixFQUF0QixDIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsY29tcG9zZX0gZnJvbSBcInJlZHV4XCJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXG5cbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBNdWlUaGVtZVByb3ZpZGVyIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9NdWlUaGVtZVByb3ZpZGVyJ1xuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcbmltcG9ydCBsaWdodEJhc2VUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvYmFzZVRoZW1lcy9saWdodEJhc2VUaGVtZSdcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuXG5pbXBvcnQge2VuaGFuY2VkQ29tYmluZVJlZHVjZXJzfSBmcm9tIFwiLlwiXG5cbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi9jb21wb25lbnRzL3R1dG9yaWFsXCJcblxuZXhwb3J0IGNvbnN0IERPTUFJTj1cInFpbGlBcHBcIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsdHV0b3JpYWxpemVkKXtcblx0XHRpZighIWVycm9yKXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZEVycm9yYFxuXHRcdFx0XHQscGF5bG9hZDp7dXNlcjpVc2VyLmN1cnJlbnQsZXJyb3J9XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRgXG5cdFx0XHRcdCxwYXlsb2FkOnt0dXRvcmlhbGl6ZWR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdCxDSEVDS19WRVJTSU9OOihob21lcGFnZSxjdXJyZW50VmVyc2lvbik9PmRpc3BhdGNoPT57XG5cdFx0cmVxdWlyZShcImh0dHBcIikuZ2V0KGAke2hvbWVwYWdlfS9hcHAuYXBrLnZlcnNpb25gLCByZXM9Pntcblx0XHRcdHJlcy5vbihcImRhdGFcIiwgZGF0YT0+e1xuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vTEFTVEVTVF9WRVJTSU9OYCwgcGF5bG9hZDpuZXcgQnVmZmVyKGRhdGEpLnRvU3RyaW5nKCkudHJpbSgpfSlcblx0XHRcdH0pXG5cdFx0fSkuZW5kKClcblx0fVxuXHQsTE9HT1VUOiBBPT5Vc2VyLmxvZ291dCgpXG5cdCxVU0VSX0NIQU5HRUQ6dXNlcj0+KHtcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYFxuXHRcdCxwYXlsb2FkOnVzZXJcblx0fSksVFVUT1JJQUxJWkVEOih7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGBcblx0fSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLHtcblx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcblx0XHR9KVxuXHRicmVha1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xuXHRcdFx0aW5pdGVkRXJyb3I6cGF5bG9hZC5lcnJvclxuXHRcdH0pXG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse1xuXHRcdFx0dXNlcjpwYXlsb2FkXG5cdFx0fSlcblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXG5cdGNhc2UgYEBAJHtET01BSU59L0xBU1RFU1RfVkVSU0lPTmA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2xhdGVzdFZlcnNpb246cGF5bG9hZH0pXG5cdH1cblxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IFFpbGlBcHA9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSxudWxsLG51bGwse3B1cmU6dHJ1ZSx3aXRoUmVmOnRydWV9KShcblx0Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdFx0c3VwZXIocHJvcHMpXG5cblx0XHRcdHN1cHBvcnRUYXAoKVxuXG5cdFx0XHRjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuXHRcdFx0aWYoIWFwcElkKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuXHRcdFx0aWYoIXNlcnZpY2UpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG5cdFx0fVxuXG5cdFx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRcdHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIHByb2plY3QsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0XHRpZih0aXRsZSlcblx0XHRcdFx0ZG9jdW1lbnQudGl0bGU9dGl0bGVcblxuXHRcdFx0aW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuXHRcdFx0XHQudGhlbigodHV0b3JpYWxpemVkPWZhbHNlKT0+e1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKG51bGwsISF0dXRvcmlhbGl6ZWQpKVxuXHRcdFx0XHRcdFx0VXNlci5vbignY2hhbmdlJywgdXNlcj0+ZGlzcGF0Y2goQUNUSU9OLlVTRVJfQ0hBTkdFRCh1c2VyKSkpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZSk9PmRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChlLm1lc3NhZ2UpKSlcblx0XHRcdFx0LnRoZW4oYT0+ZGlzcGF0Y2goQUNUSU9OLkNIRUNLX1ZFUlNJT04ocHJvamVjdC5ob21lcGFnZSwgcHJvamVjdC52ZXJzaW9uKSkpXG5cdFx0fVxuXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0XHRsZXQgc2VsZj10aGlzXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRzaG93TWVzc2FnZSgpe1xuXHRcdFx0XHRcdHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCxsb2FkaW5nKG9wZW4pe1xuXHRcdFx0XHRcdHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpczp7XG5cdFx0XHRcdFx0YXBwOiB0eXBlb2YoY29yZG92YSkhPT0ndW5kZWZpbmVkJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRwcm9qZWN0OiB0aGlzLnByb3BzLnByb2plY3Rcblx0XHRcdH1cblx0XHR9XG5cblx0XHRzaG93TWVzc2FnZSgpe1xuXHRcdFx0dGhpcy5yZWZzLm1zZy5zaG93KC4uLmFyZ3VtZW50cylcblx0XHR9XG5cblxuXHRcdHJlbmRlcigpe1xuXHRcdFx0Y29uc3Qge3RoZW1lLCBpbml0ZWQsIGluaXRlZEVycm9yLCB1c2VyLCBsYXN0VXNlciwgdHV0b3JpYWxpemVkLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0bGV0IGNvbnRlbnRcblxuXHRcdFx0aWYoIWluaXRlZCl7XG5cdFx0XHRcdGlmKGluaXRlZEVycm9yKVxuXHRcdFx0XHRcdGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxuXHRcdFx0fWVsc2UgaWYoIXVzZXIpe1xuXHRcdFx0XHRpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG5cdFx0XHRcdFx0cmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXG5cblx0XHRcdFx0Y29udGVudD0oPEFjY291bnQgLz4pXG5cdFx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuXHRcdFx0XHRjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfS8+KVxuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxNdWlUaGVtZVByb3ZpZGVyIG11aVRoZW1lPXt0aGVtZX0+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cblx0XHRcdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdFx0XHRcdDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG5cdFx0XHRcdFx0XHRcdDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L011aVRoZW1lUHJvdmlkZXI+XG5cdFx0XHQpXG5cdFx0fVxuXG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHR9XG5cblx0XHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0XHR0aGVtZTpnZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSx7XG5cdFx0XHRcdGZvb3RiYXI6e1xuXHRcdFx0XHRcdGhlaWdodDogNTBcblx0XHRcdFx0fSxcblx0XHRcdFx0cGFnZTp7XG5cdFx0XHRcdFx0d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoID4gOTYwID8gOTYwIDogd2luZG93LmlubmVyV2lkdGhcblx0XHRcdFx0XHQsaGVpZ2h0OndpbmRvdy5pbm5lckhlaWdodFxuXHRcdFx0XHR9XG5cdFx0XHR9KSxcblx0XHRcdGluaXQoKXt9LFxuXHRcdFx0dHV0b3JpYWw6W10sXG5cdFx0XHRwcm9qZWN0Ont9XG5cdFx0fVxuXG5cdFx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdFx0c2VydmljZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdFx0YXBwSWQ6UHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdFx0dGhlbWU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRcdGluaXQ6UHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHR0dXRvcmlhbDpQcm9wVHlwZXMuYXJyYXksXG5cdFx0XHR0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcblx0XHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3Rcblx0XHR9XG5cblx0XHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdFx0c2hvd01lc3NhZ2U6IFByb3BUeXBlcy5mdW5jLFxuXHRcdFx0bG9hZGluZzogUHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHRpczogUHJvcFR5cGVzLm9iamVjdCxcblx0XHRcdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3Rcblx0XHR9XG5cblx0XHRzdGF0aWMgcmVuZGVyKHJvdXRlLCByZWR1Y2Vycz1bXSwgLi4ubWlkZGxld2Fycyl7XG5cdFx0XHRjb25zdCBwcm9wcz17fVxuXHRcdFx0bGV0IGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcblx0XHRcdGlmKCFjb250YWluZXIpe1xuXHRcdFx0XHRjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRcdFx0Y29udGFpbmVyLmlkPSdhcHAnXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuXHRcdFx0fVxuXHRcdFx0bGV0IHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuXHRcdFx0c3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxuXHRcdFx0Y29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG5cdFx0XHRpZighcHJvcHMuaGlzdG9yeSlcblx0XHRcdFx0cHJvcHMuaGlzdG9yeT1oYXNoSGlzdG9yeVxuXG5cdFx0XHRmdW5jdGlvbiByb3V0ZXJSZHVjZXIoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pe1xuXHRcdFx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHRcdGNhc2UgJ0BAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRSc6XG5cdFx0XHRcdHJldHVybiBwYXlsb2FkXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVuaGFuY2VkUm91dGU9KHJvb3QsZGlzcGF0Y2gpPT57XG5cdFx0XHRcdGNvbnN0IHtvbkVudGVyLCBvbkNoYW5nZX09cm9vdC5wcm9wc1xuXHRcdFx0XHRyZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHJvb3QsIHtcblx0XHRcdFx0XHRvbkVudGVyKG5leHRTdGF0ZSl7XG5cdFx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFYCxwYXlsb2FkOm5leHRTdGF0ZX0pO1xuXHRcdFx0XHRcdFx0b25FbnRlciAmJiBvbkVudGVyLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0b25DaGFuZ2Uoc3RhdGUsbmV4dFN0YXRlKXtcblx0XHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0XHRvbkNoYW5nZSAmJiBvbkNoYW5nZS5iaW5kKHRoaXMpKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIG5vcm1hbGl6ZURhdGEoZW50aXRpZXM9e30se3R5cGUscGF5bG9hZH0pe1xuXHRcdFx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHRcdGNhc2UgJ05PUk1BTElaRURfREFUQSc6XG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRcdGVudGl0aWVzLFxuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXMocGF5bG9hZCkucmVkdWNlKChtZXJnZWQsdHlwZSk9Pntcblx0XHRcdFx0XHRcdFx0aWYodHlwZW9mKHBheWxvYWRbdHlwZV1bJyRyZW1vdmUnXSk9PSd1bmRlZmluZWQnKVxuXHRcdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LGVudGl0aWVzW3R5cGVdLHBheWxvYWRbdHlwZV0pXG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRtZXJnZWRbdHlwZV09T2JqZWN0LmFzc2lnbih7fSxwYXlsb2FkW3R5cGVdWyckcmVtb3ZlJ10ucmVkdWNlKChhbGwsYSk9PihkZWxldGUgYWxsW2FdLGFsbCksZW50aXRpZXNbdHlwZV0pKVxuXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtZXJnZWRcblx0XHRcdFx0XHRcdH0se30pXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBlbnRpdGllc1xuXHRcdFx0fVxuXG5cblx0XHRcdGNvbnN0IGFsbFJlZHVjZXJzPWVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcblx0XHRcdFx0XHRcdHJvdXRpbmc6cm91dGVyUmR1Y2VyXG5cdFx0XHRcdFx0XHQsZW50aXRpZXM6bm9ybWFsaXplRGF0YVxuXHRcdFx0XHRcdFx0LFtET01BSU5dOlJFRFVDRVJcblx0XHRcdFx0XHR9LCAuLi5yZWR1Y2Vycylcblx0XHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XG5cdFx0XHRjb25zdCBzdG9yZT1jcmVhdGVTdG9yZShhbGxSZWR1Y2Vycywge3FpbGlBcHA6e30sIHVpOnt9LCBlbnRpdGllczp7fX0sIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcblxuXHRcdFx0cmV0dXJuIHJlbmRlcigoXG5cdFx0XHRcdFx0PFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG5cdFx0XHRcdFx0XHQ8Um91dGVyIHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0XHRcdHtlbmhhbmNlZFJvdXRlKHJvdXRlLHN0b3JlLmRpc3BhdGNoKX1cblx0XHRcdFx0XHRcdDwvUm91dGVyPlxuXHRcdFx0XHRcdDwvUHJvdmlkZXI+XG5cdFx0XHRcdCksY29udGFpbmVyKVxuXHRcdH1cblx0fVxuKVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFFpbGlBcHAse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxuIl19