"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = undefined;

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

			var allReducers = _.enhancedCombineReducers.apply(undefined, [{ routing: routerRducer }, REDUCER, _account2.default.REDUCER].concat(_toConsumableArray(reducers)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiSU5JVF9TVEFURSIsImluaXRlZCIsInVzZXIiLCJ0dXRvcmlhbGl6ZWQiLCJBQ1RJT04iLCJJTklUX0FQUCIsImVycm9yIiwidHlwZSIsInBheWxvYWQiLCJjdXJyZW50IiwiVVNFUl9DSEFOR0VEIiwiVFVUT1JJQUxJWkVEIiwiUkVEVUNFUiIsInN0YXRlIiwiaW5pdGVkRXJyb3IiLCJPYmplY3QiLCJhc3NpZ24iLCJBY2NvdW50Q29udGFpbmVyIiwidWkiLCJRaWxpQXBwIiwicHVyZSIsIndpdGhSZWYiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsImRpc3BhdGNoIiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm9uIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZSIsIm1pZGRsZXdhcnMiLCJyZWR1Y2VycyIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiaGlzdG9yeSIsImRlZmF1bHRDcmVhdGVFbGVtZW50IiwiQ29tcG9uZW50IiwicGFyYW1zIiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwiYWxsUmVkdWNlcnMiLCJyb3V0aW5nIiwiY29tcG9zZUVuaGFuY2VycyIsIl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyIsInN0b3JlIiwicWlsaUFwcCIsImVudGl0aWVzIiwiZGVmYXVsdFByb3BzIiwicHJvcHNUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFTLG9EQUFmOztBQUVBLElBQU1DLFNBQU8sU0FBYjs7QUFFQSxJQUFNQyxhQUFXO0FBQ2hCQyxTQUFPLEtBRFM7QUFFZkMsT0FBSyxJQUZVO0FBR2ZDLGVBQWE7QUFIRSxDQUFqQjtBQUtPLElBQU1DLDBCQUFPO0FBQ25CQyxTQURtQixvQkFDVkMsS0FEVSxFQUNKSCxZQURJLEVBQ1M7QUFDM0IsTUFBRyxDQUFDLENBQUNHLEtBQUwsRUFBVztBQUNWLFVBQU87QUFDTkMsaUJBQVVSLE1BQVYsaUJBRE07QUFFTFMsYUFBUSxFQUFDTixNQUFLLFNBQUtPLE9BQVgsRUFBbUJILFlBQW5CO0FBRkgsSUFBUDtBQUlBLEdBTEQsTUFLSztBQUNKLFVBQU87QUFDTkMsaUJBQVVSLE1BQVYsWUFETTtBQUVMUyxhQUFRLEVBQUNMLDBCQUFEO0FBRkgsSUFBUDtBQUlBO0FBQ0QsRUFia0I7QUFjbEJPLGVBQWE7QUFDUEgsZUFBVVIsTUFBVjtBQURPLEVBZEssRUFnQmpCWSxjQUFhO0FBQ1JKLGVBQVVSLE1BQVY7QUFEUTtBQWhCSSxDQUFiOztBQXFCQSxJQUFNYSxnREFDUmIsTUFEUSxFQUNBLFlBQTJC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UjtBQUtqQmhFLFFBQU8sZ0JBQU00RCxTQUFOLENBQWdCQztBQUxOLENBMUZFLFNBa0diSSxpQkFsR2EsR0FrR0s7QUFDeEIvRixXQUFTLGdCQUFNMEYsU0FBTixDQUFnQk0sTUFBaEIsQ0FBdUJKLFVBRFI7QUFFbEJsRCxjQUFhLGdCQUFNZ0QsU0FBTixDQUFnQkcsSUFGWDtBQUdsQnhELFVBQVMsZ0JBQU1xRCxTQUFOLENBQWdCRztBQUhQLENBbEdMLFNBQWQ7O2tCQWtLUTVFLE9BQU9DLE1BQVAsQ0FBY0csT0FBZCxFQUFzQixFQUFDZixjQUFELEVBQVFRLGdCQUFSLEVBQXRCLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsY29tcG9zZX0gZnJvbSBcInJlZHV4XCJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXG5cbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcIi5cIlxuXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5cbmNvbnN0IG11aVRoZW1lPWdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lKVxuXG5jb25zdCBET01BSU49XCJxaWxpQXBwXCJcblxuY29uc3QgSU5JVF9TVEFURT17XG5cdGluaXRlZDpmYWxzZVxuXHQsdXNlcjpudWxsXG5cdCx0dXRvcmlhbGl6ZWQ6ZmFsc2Vcbn1cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXG5cdFx0XHRcdCxwYXlsb2FkOnt1c2VyOlVzZXIuY3VycmVudCxlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcblx0fSxUVVRPUklBTElaRUQ6e1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuICAgIFtET01BSU5dOihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnBheWxvYWQudHV0b3JpYWxpemVkXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpbml0ZWQ6ZmFsc2Vcblx0XHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XG5cdFx0XHRcdCxpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aW5pdGVkOiEhVXNlci5jdXJyZW50XG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnN0YXRlLnR1dG9yaWFsaXplZFxuXHRcdFx0fVxuXHRcdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXHRcdH1cbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5jb25zdCBBY2NvdW50Q29udGFpbmVyPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLnVpKShBY2NvdW50KVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFxuY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcblxuICAgICAgICBjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZih0aXRsZSlcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKHR1dG9yaWFsaXplZD10cnVlKT0+e1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsICgpPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBsZXQgc2VsZj10aGlzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtdWlUaGVtZVxuICAgICAgICAgICAgLHNob3dNZXNzYWdlKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAsbG9hZGluZyhvcGVuKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXHRzaG93TWVzc2FnZSgpe1xuXHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdH1cblxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtpbml0ZWQsIGluaXRlZEVycm9yLCB1c2VyLCB0dXRvcmlhbGl6ZWQsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGNvbnRlbnRcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiaW5pdGlhbGl6aW5nLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIXR1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiAoPFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PmRpc3BhdGNoKEFDVElPTi5UVVRPUklBTElaRUQpfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudENvbnRhaW5lciAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50Q29udGFpbmVyIHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cblxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0aW5pdCgpe30sXG5cdFx0dHV0b3JpYWw6W11cblx0fVxuXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0YXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0dHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgc2hvd01lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlLCByZWR1Y2Vycz1bXSwgLi4ubWlkZGxld2Fycyl7XG5cdFx0Y29uc3QgcHJvcHM9e31cbiAgICAgICAgbGV0IGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbiAgICAgICAgaWYoIWNvbnRhaW5lcil7XG4gICAgICAgICAgICBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNvbnRhaW5lci5pZD0nYXBwJ1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG4gICAgICAgIHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG4gICAgICAgIGlmKCFwcm9wcy5oaXN0b3J5KVxuICAgICAgICAgICAgcHJvcHMuaGlzdG9yeT1oYXNoSGlzdG9yeVxuXG5cdFx0Y29uc3QgZGVmYXVsdENyZWF0ZUVsZW1lbnQ9KENvbXBvbmVudCxwcm9wcyk9Pntcblx0XHRcdGNvbnN0IHtoaXN0b3J5LHBhcmFtc309cHJvcHNcblx0XHRcdHJldHVybiAoPENvbXBvbmVudCByb3V0ZXI9e2hpc3Rvcnl9IHsuLi5wcm9wc30vPilcblx0XHR9XG5cblx0XHRmdW5jdGlvbiByb3V0ZXJSZHVjZXIoc3RhdGU9e30se3R5cGUscGF5bG9hZH0pe1xuXHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0Y2FzZSAnQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFJzpcblx0XHRcdHJldHVybiBwYXlsb2FkXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9XG5cblx0XHRjb25zdCBlbmhhbmNlZFJvdXRlPShyb290LGRpc3BhdGNoKT0+e1xuXHRcdFx0Y29uc3Qge29uRW50ZXIsIG9uQ2hhbmdlfT1yb290LnByb3BzXG5cdFx0XHRyZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHJvb3QsIHtcblx0XHRcdFx0b25FbnRlcihuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0b25FbnRlciAmJiBvbkVudGVyLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkNoYW5nZShzdGF0ZSxuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0b25DaGFuZ2UgJiYgb25DaGFuZ2UuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXG5cblx0XHRjb25zdCBhbGxSZWR1Y2Vycz1lbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7cm91dGluZzpyb3V0ZXJSZHVjZXJ9LFJFRFVDRVIsQWNjb3VudC5SRURVQ0VSLCAuLi5yZWR1Y2Vycylcblx0XHRjb25zdCBjb21wb3NlRW5oYW5jZXJzID0gd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyB8fCBjb21wb3NlO1xuXHRcdGNvbnN0IHN0b3JlPWNyZWF0ZVN0b3JlKGFsbFJlZHVjZXJzLCB7cWlsaUFwcDp7fSwgdWk6e30sIGVudGl0aWVzOnt9fSwgY29tcG9zZUVuaGFuY2VycyhhcHBseU1pZGRsZXdhcmUodGh1bmssLi4ubWlkZGxld2FycykpKVxuXG4gICAgICAgIHJldHVybiByZW5kZXIoKFxuICAgICAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgICAgICAgICA8Um91dGVyIGNyZWF0ZUVsZW1lbnQ9e2RlZmF1bHRDcmVhdGVFbGVtZW50fSB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdFx0e2VuaGFuY2VkUm91dGUocm91dGUsc3RvcmUuZGlzcGF0Y2gpfVxuICAgICAgICAgICAgICAgICAgICA8L1JvdXRlcj5cbiAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgKSxjb250YWluZXIpXG4gICAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihRaWxpQXBwLHtBQ1RJT04sUkVEVUNFUn0pXG4iXX0=