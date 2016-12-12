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
				inited: !!payload,
				user: payload
			});
		case "@@" + DOMAIN + "/TUTORIALIZED":
			return (0, _assign2.default)({}, state, { tutorialized: true });
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
				}
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

	tutorial: []
}, _class.propsTypes = {
	service: _react2.default.PropTypes.string.isRequired,
	appId: _react2.default.PropTypes.string.isRequired,
	theme: _react2.default.PropTypes.object.isRequired,
	init: _react2.default.PropTypes.func,
	tutorial: _react2.default.PropTypes.array,
	title: _react2.default.PropTypes.string
}, _class.childContextTypes = {
	showMessage: _react2.default.PropTypes.func,
	loading: _react2.default.PropTypes.func
}, _temp));

exports.default = (0, _assign2.default)(QiliApp, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIklOSVRfQVBQIiwiZXJyb3IiLCJ0dXRvcmlhbGl6ZWQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZXIiLCJjdXJyZW50IiwiVVNFUl9DSEFOR0VEIiwiVFVUT1JJQUxJWkVEIiwiUkVEVUNFUiIsInN0YXRlIiwiaW5pdGVkIiwiaW5pdGVkRXJyb3IiLCJRaWxpQXBwIiwicHVyZSIsIndpdGhSZWYiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsImRpc3BhdGNoIiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm9uIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJ0aGVtZSIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlIiwibWlkZGxld2FycyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5Iiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwibm9ybWFsaXplRGF0YSIsImVudGl0aWVzIiwicmVkdWNlIiwibWVyZ2VkIiwiYWxsIiwiYSIsImFsbFJlZHVjZXJzIiwicm91dGluZyIsImNvbXBvc2VFbmhhbmNlcnMiLCJfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18iLCJzdG9yZSIsInFpbGlBcHAiLCJ1aSIsImRlZmF1bHRQcm9wcyIsImZvb3RiYXIiLCJwYWdlIiwid2lkdGgiLCJpbm5lcldpZHRoIiwicHJvcHNUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSwwQkFBTyxTQUFiOztBQUVBLElBQU1DLDBCQUFPO0FBQ25CQyxTQURtQixvQkFDVkMsS0FEVSxFQUNKQyxZQURJLEVBQ1M7QUFDM0IsTUFBRyxDQUFDLENBQUNELEtBQUwsRUFBVztBQUNWLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsaUJBRE07QUFFTE0sYUFBUSxFQUFDQyxNQUFLLFNBQUtDLE9BQVgsRUFBbUJMLFlBQW5CO0FBRkgsSUFBUDtBQUlBLEdBTEQsTUFLSztBQUNKLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsWUFETTtBQUVMTSxhQUFRLEVBQUNGLDBCQUFEO0FBRkgsSUFBUDtBQUlBO0FBQ0QsRUFia0I7QUFjbEJLLGVBQWE7QUFBQSxTQUFPO0FBQ2RKLGdCQUFVTCxNQUFWLGtCQURjO0FBRW5CTSxZQUFRQztBQUZXLEdBQVA7QUFBQSxFQWRLLEVBaUJoQkcsY0FBYztBQUNWTCxlQUFVTCxNQUFWO0FBRFU7QUFqQkUsQ0FBYjs7QUFzQkEsSUFBTVcsNEJBQVEsU0FBUkEsT0FBUSxHQUEyQjtBQUFBLEtBQTFCQyxLQUEwQix1RUFBcEIsRUFBb0I7QUFBQTtB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fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSxjb21wb3NlfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcblxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IE11aVRoZW1lUHJvdmlkZXIgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL011aVRoZW1lUHJvdmlkZXInXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuXCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXG5cdFx0XHRcdCxwYXlsb2FkOnt1c2VyOlVzZXIuY3VycmVudCxlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp1c2VyPT4oe1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgXG5cdFx0LHBheWxvYWQ6dXNlclxuXHR9KSxUVVRPUklBTElaRUQ6KHtcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYFxuXHR9KVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUse1xuXHRcdFx0aW5pdGVkOnRydWVcblx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0LHR1dG9yaWFsaXplZDpwYXlsb2FkLnR1dG9yaWFsaXplZFxuXHRcdH0pXG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZEVycm9yYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XG5cdFx0XHRpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0fSlcblx0YnJlYWtcblx0Y2FzZSBgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7XG5cdFx0XHRpbml0ZWQ6ISFwYXlsb2FkXG5cdFx0XHQsdXNlcjpwYXlsb2FkXG5cdFx0fSlcblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFxuXHRjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRjb25zdHJ1Y3Rvcihwcm9wcyl7XG5cdFx0XHRzdXBlcihwcm9wcylcblxuXHRcdFx0c3VwcG9ydFRhcCgpXG5cblx0XHRcdGNvbnN0IHtzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuXG5cdFx0XHRpZighYXBwSWQpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG5cdFx0XHRpZighc2VydmljZSlcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcblx0XHR9XG5cblx0XHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdFx0dmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRcdGlmKHRpdGxlKVxuXHRcdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxuXG5cdFx0XHRpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG5cdFx0XHRcdC50aGVuKCh0dXRvcmlhbGl6ZWQ9ZmFsc2UpPT57XG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG5cdFx0XHRcdFx0XHRVc2VyLm9uKCdjaGFuZ2UnLCB1c2VyPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKHVzZXIpKSlcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxuXHRcdH1cblxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdFx0bGV0IHNlbGY9dGhpc1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c2hvd01lc3NhZ2UoKXtcblx0XHRcdFx0XHRzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0fVxuXHRcdFx0XHQsbG9hZGluZyhvcGVuKXtcblx0XHRcdFx0XHRzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNob3dNZXNzYWdlKCl7XG5cdFx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxuXHRcdH1cblxuXG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRjb25zdCB7dGhlbWUsIGluaXRlZCwgaW5pdGVkRXJyb3IsIHVzZXIsIHR1dG9yaWFsaXplZCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRcdGxldCBjb250ZW50XG5cblx0XHRcdGlmKCFpbml0ZWQpe1xuXHRcdFx0XHRpZihpbml0ZWRFcnJvcilcblx0XHRcdFx0XHRjb250ZW50PSBgSW5pdGlhbGl6aW5nIEVycm9yOiAke2luaXRlZEVycm9yfWBcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGNvbnRlbnQ9IFwiaW5pdGlhbGl6aW5nLi4uXCJcblx0XHRcdH1lbHNlIGlmKCF1c2VyKXtcblx0XHRcdFx0aWYoIXR1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKVxuXHRcdFx0XHRcdHJldHVybiAoPFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PmRpc3BhdGNoKEFDVElPTi5UVVRPUklBTElaRUQpfS8+KVxuXG5cdFx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50IC8+KVxuXHRcdFx0fWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcblx0XHRcdFx0Y29udGVudD0oPEFjY291bnQgdXNlcj17dXNlcn0vPilcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0Y29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHQ8TXVpVGhlbWVQcm92aWRlciBtdWlUaGVtZT17dGhlbWV9PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XG5cdFx0XHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHRcdFx0XHQ8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuXHRcdFx0XHRcdFx0XHQ8TG9hZGluZyByZWY9XCJsb2FkaW5nXCIgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIi8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9NdWlUaGVtZVByb3ZpZGVyPlxuXHRcdFx0KVxuXHRcdH1cblxuXHRcdHJlbmRlckNvbnRlbnQoKXtcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXG5cdFx0fVxuXG5cblxuXHRcdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHRcdHRoZW1lOmdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lLHtcblx0XHRcdFx0Zm9vdGJhcjp7XG5cdFx0XHRcdFx0aGVpZ2h0OiA1MFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRwYWdlOntcblx0XHRcdFx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGggPiA5NjAgPyA5NjAgOiB3aW5kb3cuaW5uZXJXaWR0aFxuXHRcdFx0XHRcdCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0XG5cdFx0XHRcdH1cblx0XHRcdH0pLFxuXHRcdFx0aW5pdCgpe30sXG5cdFx0XHR0dXRvcmlhbDpbXVxuXHRcdH1cblxuXHRcdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdGFwcElkOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdHRoZW1lOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0XHRpbml0OlJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdFx0dHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdFx0dGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0fVxuXG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRcdHNob3dNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRcdGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdFx0fVxuXG5cdFx0c3RhdGljIHJlbmRlcihyb3V0ZSwgcmVkdWNlcnM9W10sIC4uLm1pZGRsZXdhcnMpe1xuXHRcdFx0Y29uc3QgcHJvcHM9e31cblx0XHRcdGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG5cdFx0XHRpZighY29udGFpbmVyKXtcblx0XHRcdFx0Y29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRcdGNvbnRhaW5lci5pZD0nYXBwJ1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcblx0XHRcdH1cblx0XHRcdGxldCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcblx0XHRcdHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuXHRcdFx0aWYoIXByb3BzLmhpc3RvcnkpXG5cdFx0XHRcdHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuXHRcdFx0ZnVuY3Rpb24gcm91dGVyUmR1Y2VyKHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KXtcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0XHRjYXNlICdAQHJvdXRlci9MT0NBVElPTl9DSEFOR0UnOlxuXHRcdFx0XHRyZXR1cm4gcGF5bG9hZFxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlbmhhbmNlZFJvdXRlPShyb290LGRpc3BhdGNoKT0+e1xuXHRcdFx0XHRjb25zdCB7b25FbnRlciwgb25DaGFuZ2V9PXJvb3QucHJvcHNcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChyb290LCB7XG5cdFx0XHRcdFx0b25FbnRlcihuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRcdG9uRW50ZXIgJiYgb25FbnRlci5iaW5kKHRoaXMpKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG9uQ2hhbmdlKHN0YXRlLG5leHRTdGF0ZSl7XG5cdFx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFYCxwYXlsb2FkOm5leHRTdGF0ZX0pO1xuXHRcdFx0XHRcdFx0b25DaGFuZ2UgJiYgb25DaGFuZ2UuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBub3JtYWxpemVEYXRhKGVudGl0aWVzPXt9LHt0eXBlLHBheWxvYWR9KXtcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0XHRjYXNlICdOT1JNQUxJWkVEX0RBVEEnOlxuXHRcdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0e30sXG5cdFx0XHRcdFx0XHRlbnRpdGllcyxcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKHBheWxvYWQpLnJlZHVjZSgobWVyZ2VkLHR5cGUpPT57XG5cdFx0XHRcdFx0XHRcdGlmKHR5cGVvZihwYXlsb2FkW3R5cGVdWyckcmVtb3ZlJ10pPT0ndW5kZWZpbmVkJylcblx0XHRcdFx0XHRcdFx0XHRtZXJnZWRbdHlwZV09T2JqZWN0LmFzc2lnbih7fSxlbnRpdGllc1t0eXBlXSxwYXlsb2FkW3R5cGVdKVxuXHRcdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdFx0bWVyZ2VkW3R5cGVdPU9iamVjdC5hc3NpZ24oe30scGF5bG9hZFt0eXBlXVsnJHJlbW92ZSddLnJlZHVjZSgoYWxsLGEpPT4oZGVsZXRlIGFsbFthXSxhbGwpLGVudGl0aWVzW3R5cGVdKSlcblxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbWVyZ2VkXG5cdFx0XHRcdFx0XHR9LHt9KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZW50aXRpZXNcblx0XHRcdH1cblxuXG5cdFx0XHRjb25zdCBhbGxSZWR1Y2Vycz1lbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XG5cdFx0XHRcdFx0XHRyb3V0aW5nOnJvdXRlclJkdWNlclxuXHRcdFx0XHRcdFx0LGVudGl0aWVzOm5vcm1hbGl6ZURhdGFcblx0XHRcdFx0XHRcdCxbRE9NQUlOXTpSRURVQ0VSXG5cdFx0XHRcdFx0fSwgLi4ucmVkdWNlcnMpXG5cdFx0XHRjb25zdCBjb21wb3NlRW5oYW5jZXJzID0gd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyB8fCBjb21wb3NlO1xuXHRcdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e319LCBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSh0aHVuaywuLi5taWRkbGV3YXJzKSkpXG5cblx0XHRcdHJldHVybiByZW5kZXIoKFxuXHRcdFx0XHRcdDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuXHRcdFx0XHRcdFx0PFJvdXRlciB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdFx0XHR7ZW5oYW5jZWRSb3V0ZShyb3V0ZSxzdG9yZS5kaXNwYXRjaCl9XG5cdFx0XHRcdFx0XHQ8L1JvdXRlcj5cblx0XHRcdFx0XHQ8L1Byb3ZpZGVyPlxuXHRcdFx0XHQpLGNvbnRhaW5lcilcblx0XHR9XG5cdH1cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihRaWxpQXBwLHtET01BSU4sIEFDVElPTixSRURVQ0VSfSlcbiJdfQ==