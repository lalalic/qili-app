"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var _getMuiTheme = require("material-ui/styles/getMuiTheme");

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _lightBaseTheme = require("material-ui/styles/baseThemes/lightBaseTheme");

var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

var _keyboardArrowLeft = require("material-ui/svg-icons/hardware/keyboard-arrow-left");

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var muiTheme = (0, _getMuiTheme2.default)(_lightBaseTheme2.default);

var DOMAIN = "qiliApp";

var INIT_STATE = {
	inited: false,
	user: null,
	tutorialized: false
};
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
	USER_CHANGED: {
		type: "@@" + DOMAIN + "/USER_CHANGED"
	}, TUTORIALIZED: {
		type: "@@" + DOMAIN + "/TUTORIALIZED"
	}
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type;
	var payload = _ref.payload;

	switch (type) {
		case "@@" + DOMAIN + "/inited":
			return {
				inited: true,
				user: _db.User.current,
				tutorialized: payload.tutorialized
			};
			break;
		case "@@" + DOMAIN + "/initedError":
			return {
				inited: false,
				user: _db.User.current,
				initedError: payload.error
			};
			break;
		case "@@" + DOMAIN + "/USER_CHANGED":
			return {
				inited: !!_db.User.current,
				user: _db.User.current,
				tutorialized: state.tutorialized
			};
		case "@@" + DOMAIN + "/TUTORIALIZED":
			return Object.assign({}, state, { tutorialized: true });
	}
	return state;
});

var AccountContainer = (0, _reactRedux.connect)(function (state) {
	return state.ui;
})(_account2.default);

var QiliApp = exports.QiliApp = (0, _reactRedux.connect)(function (state) {
	return state[DOMAIN];
}, null, null, { pure: true, withRef: true })((_temp = _class = function (_Component) {
	_inherits(_class, _Component);

	function _class(props) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		(0, _reactTapEventPlugin2.default)();

		var _this$props = _this.props;
		var service = _this$props.service;
		var appId = _this$props.appId;


		if (!appId) throw new Error("Please give application key");

		if (!service) throw new Error("Please give service url");
		return _this;
	}

	_createClass(_class, [{
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
				var tutorialized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				dispatch(ACTION.INIT_APP(null, !!tutorialized));
				_db.User.on('change', function () {
					return dispatch(ACTION.USER_CHANGED);
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
				muiTheme: muiTheme,
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

				content = _react2.default.createElement(AccountContainer, null);
			} else if (!user.sessionToken) {
				content = _react2.default.createElement(AccountContainer, { user: user });
			} else {
				content = this.renderContent();
			}

			return _react2.default.createElement(
				"div",
				{ className: "withFootbar" },
				_react2.default.createElement(
					"div",
					{ id: "container", style: { overflowY: "scroll" } },
					content,
					_react2.default.createElement(_messager2.default, { ref: "msg", className: "sticky bottom left" }),
					_react2.default.createElement(_loading2.default, { ref: "loading", className: "sticky top right" })
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

			var defaultCreateElement = function defaultCreateElement(Component, props) {
				var history = props.history;
				var params = props.params;

				return _react2.default.createElement(Component, _extends({ router: history }, props));
			};

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

			function enhancedCombineReducers() {
				for (var _len2 = arguments.length, reducers = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					reducers[_key2] = arguments[_key2];
				}

				var functions = reducers.slice(1).reduce(function (combined, a) {
					var lastTrunk = combined[combined.length - 1];
					var type = _typeof(lastTrunk[0]);
					if (type != (typeof a === "undefined" ? "undefined" : _typeof(a))) {
						combined.push([a]);
					} else {
						lastTrunk.push(a);
					}
					return combined;
				}, [[reducers[0]]]).map(function (a) {
					if (_typeof(a[0]) == 'object') {
						return (0, _redux.combineReducers)(Object.assign.apply(Object, [{}].concat(_toConsumableArray(a))));
					} else {
						return function (state, action) {
							return a.reduce(function (state, next) {
								return next(state, action);
							}, state);
						};
					}
				});
				return function (state, action) {
					return functions.reduce(function (state, next) {
						return next(state, action);
					}, state);
				};
			}

			var allReducers = enhancedCombineReducers.apply(undefined, [{ routing: routerRducer }, REDUCER, _account2.default.REDUCER].concat(_toConsumableArray(reducers)));
			var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
			var store = (0, _redux.createStore)(allReducers, { qiliApp: {}, ui: {}, entities: {} }, composeEnhancers(_redux.applyMiddleware.apply(undefined, [_reduxThunk2.default].concat(middlewars))));

			return (0, _reactDom.render)(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(
					_reactRouter.Router,
					_extends({ createElement: defaultCreateElement }, props),
					enhancedRoute(route, store.dispatch)
				)
			), container);
		}
	}]);

	return _class;
}(_react.Component), _class.defaultProps = {
	service: "http://qili2.com/1/",
	init: function init() {},

	tutorial: []
}, _class.propsTypes = {
	service: _react2.default.PropTypes.string.isRequired,
	appId: _react2.default.PropTypes.string.isRequired,
	init: _react2.default.PropTypes.func,
	tutorial: _react2.default.PropTypes.array,
	title: _react2.default.PropTypes.string
}, _class.childContextTypes = {
	muiTheme: _react2.default.PropTypes.object.isRequired,
	showMessage: _react2.default.PropTypes.func,
	loading: _react2.default.PropTypes.func
}, _temp));

exports.default = Object.assign(QiliApp, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImluaXRlZCIsInVzZXIiLCJ0dXRvcmlhbGl6ZWQiLCJBQ1RJT04iLCJJTklUX0FQUCIsImVycm9yIiwidHlwZSIsInBheWxvYWQiLCJjdXJyZW50IiwiVVNFUl9DSEFOR0VEIiwiVFVUT1JJQUxJWkVEIiwiUkVEVUNFUiIsInN0YXRlIiwiaW5pdGVkRXJyb3IiLCJPYmplY3QiLCJhc3NpZ24iLCJBY2NvdW50Q29udGFpbmVyIiwidWkiLCJRaWxpQXBwIiwicHVyZSIsIndpdGhSZWYiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsImRpc3BhdGNoIiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm9uIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZSIsIm1pZGRsZXdhcnMiLCJyZWR1Y2VycyIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiaGlzdG9yeSIsImRlZmF1bHRDcmVhdGVFbGVtZW50IiwiQ29tcG9uZW50IiwicGFyYW1zIiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwiZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMiLCJmdW5jdGlvbnMiLCJzbGljZSIsInJlZHVjZSIsImNvbWJpbmVkIiwiYSIsImxhc3RUcnVuayIsInB1c2giLCJtYXAiLCJhY3Rpb24iLCJuZXh0IiwiYWxsUmVkdWNlcnMiLCJyb3V0aW5nIiwiY29tcG9zZUVuaGFuY2VycyIsIl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyIsInN0b3JlIiwicWlsaUFwcCIsImVudGl0aWVzIiwiZGVmYXVsdFByb3BzIiwicHJvcHNUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVMsb0RBQWY7O0FBRUEsSUFBTUMsU0FBTyxTQUFiOztBQUVBLElBQU1DLGFBQVc7QUFDaEJDLFNBQU8sS0FEUztBQUVmQyxPQUFLLElBRlU7QUFHZkMsZUFBYTtBQUhFLENBQWpCO0FBS08sSUFBTUMsMEJBQU87QUFDbkJDLFNBRG1CLG9CQUNWQyxLQURVLEVBQ0pILFlBREksRUFDUztBQUMzQixNQUFHLENBQUMsQ0FBQ0csS0FBTCxFQUFXO0FBQ1YsVUFBTztBQUNOQyxpQkFBVVIsTUFBVixpQkFETTtBQUVMUyxhQUFRLEVBQUNOLE1BQUssU0FBS08sT0FBWCxFQUFtQkgsWUFBbkI7QUFGSCxJQUFQO0FBSUEsR0FMRCxNQUtLO0FBQ0osVUFBTztBQUNOQyxpQkFBVVIsTUFBVixZQURNO0FBRUxTLGFBQVEsRUFBQ0wsMEJBQUQ7QUFGSCxJQUFQO0FBSUE7QUFDRCxFQWJrQjtBQWNsQk8sZUFBYTtB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LFVBQVMsZ0JBQU00RSxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsVUFEZjtBQUVqQjdFLFFBQU0sZ0JBQU0yRSxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsVUFGWjtBQUdqQjFFLE9BQUssZ0JBQU13RSxTQUFOLENBQWdCRyxJQUhKO0FBSWpCeEQsV0FBUyxnQkFBTXFELFNBQU4sQ0FBZ0JJLEtBSlI7QUFLakIzRSxRQUFPLGdCQUFNdUUsU0FBTixDQUFnQkM7QUFMTixDQTFGRSxTQWtHYkksaUJBbEdhLEdBa0dLO0FBQ3hCMUcsV0FBUyxnQkFBTXFHLFNBQU4sQ0FBZ0JNLE1BQWhCLENBQXVCSixVQURSO0FBRWxCN0QsY0FBYSxnQkFBTTJELFNBQU4sQ0FBZ0JHLElBRlg7QUFHbEJuRSxVQUFTLGdCQUFNZ0UsU0FBTixDQUFnQkc7QUFIUCxDQWxHTCxTQUFkOztrQkFzTFF2RixPQUFPQyxNQUFQLENBQWNHLE9BQWQsRUFBc0IsRUFBQ2YsY0FBRCxFQUFRUSxnQkFBUixFQUF0QixDIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxuXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IHtjcmVhdGVTdG9yZSxjb21iaW5lUmVkdWNlcnMsIGFwcGx5TWlkZGxld2FyZSxjb21wb3NlfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcblxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcbmltcG9ydCBsaWdodEJhc2VUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvYmFzZVRoZW1lcy9saWdodEJhc2VUaGVtZSdcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5cbmNvbnN0IG11aVRoZW1lPWdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lKVxuXG5jb25zdCBET01BSU49XCJxaWxpQXBwXCJcblxuY29uc3QgSU5JVF9TVEFURT17XG5cdGluaXRlZDpmYWxzZVxuXHQsdXNlcjpudWxsXG5cdCx0dXRvcmlhbGl6ZWQ6ZmFsc2Vcbn1cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXG5cdFx0XHRcdCxwYXlsb2FkOnt1c2VyOlVzZXIuY3VycmVudCxlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcblx0fSxUVVRPUklBTElaRUQ6e1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuICAgIFtET01BSU5dOihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnBheWxvYWQudHV0b3JpYWxpemVkXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpbml0ZWQ6ZmFsc2Vcblx0XHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XG5cdFx0XHRcdCxpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aW5pdGVkOiEhVXNlci5jdXJyZW50XG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnN0YXRlLnR1dG9yaWFsaXplZFxuXHRcdFx0fVxuXHRcdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXHRcdH1cbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5jb25zdCBBY2NvdW50Q29udGFpbmVyPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpKShBY2NvdW50KVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFxuY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcblxuICAgICAgICBjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZih0aXRsZSlcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKHR1dG9yaWFsaXplZD10cnVlKT0+e1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsICgpPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBsZXQgc2VsZj10aGlzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtdWlUaGVtZVxuICAgICAgICAgICAgLHNob3dNZXNzYWdlKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAsbG9hZGluZyhvcGVuKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXHRzaG93TWVzc2FnZSgpe1xuXHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdH1cblxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtpbml0ZWQsIGluaXRlZEVycm9yLCB1c2VyLCB0dXRvcmlhbGl6ZWQsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGNvbnRlbnRcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiaW5pdGlhbGl6aW5nLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIXR1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiAoPFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PmRpc3BhdGNoKEFDVElPTi5UVVRPUklBTElaRUQpfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudENvbnRhaW5lciAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50Q29udGFpbmVyIHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cblxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0aW5pdCgpe30sXG5cdFx0dHV0b3JpYWw6W11cblx0fVxuXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0YXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0dHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgc2hvd01lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlLCByZWR1Y2Vycz1bXSwgLi4ubWlkZGxld2Fycyl7XG5cdFx0Y29uc3QgcHJvcHM9e31cbiAgICAgICAgbGV0IGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbiAgICAgICAgaWYoIWNvbnRhaW5lcil7XG4gICAgICAgICAgICBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNvbnRhaW5lci5pZD0nYXBwJ1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG4gICAgICAgIHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG4gICAgICAgIGlmKCFwcm9wcy5oaXN0b3J5KVxuICAgICAgICAgICAgcHJvcHMuaGlzdG9yeT1oYXNoSGlzdG9yeVxuXG5cdFx0Y29uc3QgZGVmYXVsdENyZWF0ZUVsZW1lbnQ9KENvbXBvbmVudCxwcm9wcyk9Pntcblx0XHRcdGNvbnN0IHtoaXN0b3J5LHBhcmFtc309cHJvcHNcblx0XHRcdHJldHVybiAoPENvbXBvbmVudCByb3V0ZXI9e2hpc3Rvcnl9IHsuLi5wcm9wc30vPilcblx0XHR9XG5cblx0XHRmdW5jdGlvbiByb3V0ZXJSZHVjZXIoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pe1xuXHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0Y2FzZSAnQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFJzpcblx0XHRcdHJldHVybiBwYXlsb2FkXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9XG5cblx0XHRjb25zdCBlbmhhbmNlZFJvdXRlPShyb290LGRpc3BhdGNoKT0+e1xuXHRcdFx0Y29uc3Qge29uRW50ZXIsIG9uQ2hhbmdlfT1yb290LnByb3BzXG5cdFx0XHRyZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHJvb3QsIHtcblx0XHRcdFx0b25FbnRlcihuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0b25FbnRlciAmJiBvbkVudGVyLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkNoYW5nZShzdGF0ZSxuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0b25DaGFuZ2UgJiYgb25DaGFuZ2UuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoLi4ucmVkdWNlcnMpe1xuXHRcdFx0Y29uc3QgZnVuY3Rpb25zPXJlZHVjZXJzLnNsaWNlKDEpLnJlZHVjZSgoY29tYmluZWQsYSk9Pntcblx0XHRcdFx0Y29uc3QgbGFzdFRydW5rPWNvbWJpbmVkW2NvbWJpbmVkLmxlbmd0aC0xXVxuXHRcdFx0XHRjb25zdCB0eXBlPXR5cGVvZihsYXN0VHJ1bmtbMF0pXG5cdFx0XHRcdGlmKHR5cGUhPXR5cGVvZihhKSl7XG5cdFx0XHRcdFx0Y29tYmluZWQucHVzaChbYV0pXG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGxhc3RUcnVuay5wdXNoKGEpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGNvbWJpbmVkXG5cdFx0XHR9LFtbcmVkdWNlcnNbMF1dXSkubWFwKGE9Pntcblx0XHRcdFx0aWYodHlwZW9mKGFbMF0pPT0nb2JqZWN0Jyl7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbWJpbmVSZWR1Y2VycyhPYmplY3QuYXNzaWduKHt9LC4uLmEpKVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gKHN0YXRlLGFjdGlvbik9PmEucmVkdWNlKChzdGF0ZSxuZXh0KT0+bmV4dChzdGF0ZSxhY3Rpb24pLCBzdGF0ZSlcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdHJldHVybiAoc3RhdGUsYWN0aW9uKT0+ZnVuY3Rpb25zLnJlZHVjZSgoc3RhdGUsbmV4dCk9Pm5leHQoc3RhdGUsYWN0aW9uKSxzdGF0ZSlcblx0XHR9XG5cblxuXHRcdGNvbnN0IGFsbFJlZHVjZXJzPWVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtyb3V0aW5nOnJvdXRlclJkdWNlcn0sUkVEVUNFUixBY2NvdW50LlJFRFVDRVIsIC4uLnJlZHVjZXJzKVxuXHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XG5cdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e319LCBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSh0aHVuaywuLi5taWRkbGV3YXJzKSkpXG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcigoXG4gICAgICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZXIgY3JlYXRlRWxlbWVudD17ZGVmYXVsdENyZWF0ZUVsZW1lbnR9IHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0XHR7ZW5oYW5jZWRSb3V0ZShyb3V0ZSxzdG9yZS5kaXNwYXRjaCl9XG4gICAgICAgICAgICAgICAgICAgIDwvUm91dGVyPlxuICAgICAgICAgICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICAgICAgICApLGNvbnRhaW5lcilcbiAgICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFFpbGlBcHAse0FDVElPTixSRURVQ0VSfSlcbiJdfQ==