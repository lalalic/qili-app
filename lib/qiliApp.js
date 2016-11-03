"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var muiTheme = (0, _getMuiTheme2.default)(_lightBaseTheme2.default);

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
	USER_CHANGED: {
		type: "@@" + DOMAIN + "/USER_CHANGED"
	}, TUTORIALIZED: {
		type: "@@" + DOMAIN + "/TUTORIALIZED"
	}
};

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

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
};

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

		var _this$props = _this.props,
		    service = _this$props.service,
		    appId = _this$props.appId;


		if (!appId) throw new Error("Please give application key");

		if (!service) throw new Error("Please give service url");
		return _this;
	}

	_createClass(_class, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			var _props = this.props,
			    initApp = _props.init,
			    service = _props.service,
			    appId = _props.appId,
			    title = _props.title,
			    dispatch = _props.dispatch;

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
			var _props2 = this.props,
			    inited = _props2.inited,
			    initedError = _props2.initedError,
			    user = _props2.user,
			    tutorialized = _props2.tutorialized,
			    dispatch = _props2.dispatch;

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

			var _ref4;

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
				var type = _ref2.type,
				    payload = _ref2.payload;

				switch (type) {
					case '@@router/LOCATION_CHANGE':
						return payload;
				}
				return state;
			}

			var enhancedRoute = function enhancedRoute(root, dispatch) {
				var _root$props = root.props,
				    _onEnter = _root$props.onEnter,
				    _onChange = _root$props.onChange;

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
				var type = _ref3.type,
				    payload = _ref3.payload;

				switch (type) {
					case 'NORMALIZED_DATA':
						return Object.assign({}, entities, Object.keys(payload).reduce(function (merged, type) {
							merged[type] = Object.assign({}, entities[type], payload[type]);
							return merged;
						}, {}));
				}
				return entities;
			}

			var allReducers = _.enhancedCombineReducers.apply(undefined, [(_ref4 = {
				routing: routerRducer,
				entities: normalizeData
			}, _defineProperty(_ref4, DOMAIN, REDUCER), _defineProperty(_ref4, "ui", _account2.default.REDUCER), _ref4)].concat(_toConsumableArray(reducers)));
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

exports.default = Object.assign(QiliApp, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJlcnJvciIsInR1dG9yaWFsaXplZCIsInR5cGUiLCJwYXlsb2FkIiwidXNlciIsImN1cnJlbnQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsIk9iamVjdCIsImFzc2lnbiIsIkFjY291bnRDb250YWluZXIiLCJ1aSIsIlFpbGlBcHAiLCJwdXJlIiwid2l0aFJlZiIsInByb3BzIiwic2VydmljZSIsImFwcElkIiwiRXJyb3IiLCJpbml0QXBwIiwiaW5pdCIsInRpdGxlIiwiZGlzcGF0Y2giLCJkb2N1bWVudCIsImUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwib24iLCJtZXNzYWdlIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlIiwibWlkZGxld2FycyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5Iiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwibm9ybWFsaXplRGF0YSIsImVudGl0aWVzIiwia2V5cyIsInJlZHVjZSIsIm1lcmdlZCIsImFsbFJlZHVjZXJzIiwicm91dGluZyIsImNvbXBvc2VFbmhhbmNlcnMiLCJfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18iLCJzdG9yZSIsInFpbGlBcHAiLCJkZWZhdWx0UHJvcHMiLCJwcm9wc1R5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJhcnJheSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFTLG9EQUFmOztBQUVPLElBQU1DLDBCQUFPLFNBQWI7O0FBRUEsSUFBTUMsMEJBQU87QUFDbkJDLFNBRG1CLG9CQUNWQyxLQURVLEVBQ0pDLFlBREksRUFDUztBQUMzQixNQUFHLENBQUMsQ0FBQ0QsS0FBTCxFQUFXO0FBQ1YsVUFBTztBQUNORSxpQkFBVUwsTUFBVixpQkFETTtBQUVMTSxhQUFRLEVBQUNDLE1BQUssU0FBS0MsT0FBWCxFQUFtQkwsWUFBbkI7QUFGSCxJQUFQO0FBSUEsR0FMRCxNQUtLO0FBQ0osVUFBTztBQUNORSxpQkFBVUwsTUFBVixZQURNO0FBRUxNLGFBQVEsRUFBQ0YsMEJBQUQ7QUFGSCxJQUFQO0FBSUE7QUFDRCxFQWJrQjtBQWNsQkssZUFBYTtBQUNQSixlQUFVTCxNQUFWO0FBRE8sRUFkSyxFQWdCakJVLGNBQWE7QUFDUkwsZUFBVUwsTUFBVjtBQURRO0FBaEJJLENBQWI7O0FBcUJBLElBQU1XLDRCQUFRLFNBQVJBLE9BQVEsR0FBMkI7QUFBQSxLQUExQkMsS0FBMEIsdUVBQXBCLEVBQW9CO0FBQUE7QUFBQSxLQUFoQlAsSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsS0FBWEMsT0FBVyxRQUFY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Qm5FLFFBQU0sZ0JBQU1pRSxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsVUFGWjtBQUdqQmhFLE9BQUssZ0JBQU04RCxTQUFOLENBQWdCRyxJQUhKO0FBSWpCOUMsV0FBUyxnQkFBTTJDLFNBQU4sQ0FBZ0JJLEtBSlI7QUFLakJqRSxRQUFPLGdCQUFNNkQsU0FBTixDQUFnQkM7QUFMTixDQTFGQyxTQWtHWkksaUJBbEdZLEdBa0dNO0FBQ3hCL0YsV0FBUyxnQkFBTTBGLFNBQU4sQ0FBZ0JNLE1BQWhCLENBQXVCSixVQURSO0FBRXhCbkQsY0FBYSxnQkFBTWlELFNBQU4sQ0FBZ0JHLElBRkw7QUFHeEJ6RCxVQUFTLGdCQUFNc0QsU0FBTixDQUFnQkc7QUFIRCxDQWxHTixTQUFkOztrQkFrTFE3RSxPQUFPQyxNQUFQLENBQWNHLE9BQWQsRUFBc0IsRUFBQ25CLGNBQUQsRUFBU0MsY0FBVCxFQUFnQlUsZ0JBQWhCLEVBQXRCLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge2NyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsY29tcG9zZX0gZnJvbSBcInJlZHV4XCJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXG5cbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSBcIi5cIlxuXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5cbmNvbnN0IG11aVRoZW1lPWdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lKVxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXG5cdFx0XHRcdCxwYXlsb2FkOnt1c2VyOlVzZXIuY3VycmVudCxlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcblx0fSxUVVRPUklBTElaRUQ6e1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZGA6XG5cdFx0cmV0dXJuIHtcblx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcblx0XHR9XG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZEVycm9yYDpcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5pdGVkOmZhbHNlXG5cdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdCxpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0fVxuXHRicmVha1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxuXHRcdHJldHVybiB7XG5cdFx0XHRpbml0ZWQ6ISFVc2VyLmN1cnJlbnRcblx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0LHR1dG9yaWFsaXplZDpzdGF0ZS50dXRvcmlhbGl6ZWRcblx0XHR9XG5cdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3R1dG9yaWFsaXplZDp0cnVlfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY29uc3QgQWNjb3VudENvbnRhaW5lcj1jb25uZWN0KHN0YXRlPT5zdGF0ZS51aSkoQWNjb3VudClcblxuZXhwb3J0IGNvbnN0IFFpbGlBcHA9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSxudWxsLG51bGwse3B1cmU6dHJ1ZSx3aXRoUmVmOnRydWV9KShcblx0Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdFx0c3VwZXIocHJvcHMpXG5cblx0XHRcdHN1cHBvcnRUYXAoKVxuXG5cdFx0XHRjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuXHRcdFx0aWYoIWFwcElkKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuXHRcdFx0aWYoIXNlcnZpY2UpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG5cdFx0fVxuXG5cdFx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRcdHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0XHRpZih0aXRsZSlcblx0XHRcdFx0ZG9jdW1lbnQudGl0bGU9dGl0bGVcblxuXHRcdFx0aW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuXHRcdFx0XHQudGhlbigodHV0b3JpYWxpemVkPXRydWUpPT57XG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG5cdFx0XHRcdFx0XHRVc2VyLm9uKCdjaGFuZ2UnLCAoKT0+ZGlzcGF0Y2goQUNUSU9OLlVTRVJfQ0hBTkdFRCkpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZSk9PmRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChlLm1lc3NhZ2UpKSlcblx0XHR9XG5cblx0XHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRcdGxldCBzZWxmPXRoaXNcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdG11aVRoZW1lXG5cdFx0XHRcdCxzaG93TWVzc2FnZSgpe1xuXHRcdFx0XHRcdHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCxsb2FkaW5nKG9wZW4pe1xuXHRcdFx0XHRcdHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hvd01lc3NhZ2UoKXtcblx0XHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdFx0fVxuXG5cblx0XHRyZW5kZXIoKXtcblx0XHRcdGNvbnN0IHtpbml0ZWQsIGluaXRlZEVycm9yLCB1c2VyLCB0dXRvcmlhbGl6ZWQsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0XHRsZXQgY29udGVudFxuXG5cdFx0XHRpZighaW5pdGVkKXtcblx0XHRcdFx0aWYoaW5pdGVkRXJyb3IpXG5cdFx0XHRcdFx0Y29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRjb250ZW50PSBcImluaXRpYWxpemluZy4uLlwiXG5cdFx0XHR9ZWxzZSBpZighdXNlcil7XG5cdFx0XHRcdGlmKCF0dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aClcblx0XHRcdFx0XHRyZXR1cm4gKDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT5kaXNwYXRjaChBQ1RJT04uVFVUT1JJQUxJWkVEKX0vPilcblxuXHRcdFx0XHRjb250ZW50PSg8QWNjb3VudENvbnRhaW5lciAvPilcblx0XHRcdH1lbHNlIGlmKCF1c2VyLnNlc3Npb25Ub2tlbil7XG5cdFx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50Q29udGFpbmVyIHVzZXI9e3VzZXJ9Lz4pXG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuXHRcdFx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0XHRcdFx0PE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cblx0XHRcdFx0XHRcdFx0PExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdClcblx0XHR9XG5cblx0XHRyZW5kZXJDb250ZW50KCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuXHRcdH1cblxuXG5cblx0XHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0XHRpbml0KCl7fSxcblx0XHRcdHR1dG9yaWFsOltdXG5cdFx0fVxuXG5cdFx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdFx0c2VydmljZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdFx0YXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdFx0aW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRcdHR1dG9yaWFsOlJlYWN0LlByb3BUeXBlcy5hcnJheSxcblx0XHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdFx0fVxuXG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRcdHNob3dNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRcdGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdFx0fVxuXG5cdFx0c3RhdGljIHJlbmRlcihyb3V0ZSwgcmVkdWNlcnM9W10sIC4uLm1pZGRsZXdhcnMpe1xuXHRcdFx0Y29uc3QgcHJvcHM9e31cblx0XHRcdGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG5cdFx0XHRpZighY29udGFpbmVyKXtcblx0XHRcdFx0Y29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRcdGNvbnRhaW5lci5pZD0nYXBwJ1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcblx0XHRcdH1cblx0XHRcdGxldCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcblx0XHRcdHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuXHRcdFx0aWYoIXByb3BzLmhpc3RvcnkpXG5cdFx0XHRcdHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuXHRcdFx0ZnVuY3Rpb24gcm91dGVyUmR1Y2VyKHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KXtcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0XHRjYXNlICdAQHJvdXRlci9MT0NBVElPTl9DSEFOR0UnOlxuXHRcdFx0XHRyZXR1cm4gcGF5bG9hZFxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlbmhhbmNlZFJvdXRlPShyb290LGRpc3BhdGNoKT0+e1xuXHRcdFx0XHRjb25zdCB7b25FbnRlciwgb25DaGFuZ2V9PXJvb3QucHJvcHNcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChyb290LCB7XG5cdFx0XHRcdFx0b25FbnRlcihuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRcdG9uRW50ZXIgJiYgb25FbnRlci5iaW5kKHRoaXMpKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG9uQ2hhbmdlKHN0YXRlLG5leHRTdGF0ZSl7XG5cdFx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFYCxwYXlsb2FkOm5leHRTdGF0ZX0pO1xuXHRcdFx0XHRcdFx0b25DaGFuZ2UgJiYgb25DaGFuZ2UuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRmdW5jdGlvbiBub3JtYWxpemVEYXRhKGVudGl0aWVzPXt9LHt0eXBlLHBheWxvYWR9KXtcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0XHRjYXNlICdOT1JNQUxJWkVEX0RBVEEnOlxuXHRcdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0e30sXG5cdFx0XHRcdFx0XHRlbnRpdGllcyxcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKHBheWxvYWQpLnJlZHVjZSgobWVyZ2VkLHR5cGUpPT57XG5cdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LGVudGl0aWVzW3R5cGVdLHBheWxvYWRbdHlwZV0pXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtZXJnZWRcblx0XHRcdFx0XHRcdH0se30pXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBlbnRpdGllc1xuXHRcdFx0fVxuXG5cblx0XHRcdGNvbnN0IGFsbFJlZHVjZXJzPWVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcblx0XHRcdFx0XHRcdHJvdXRpbmc6cm91dGVyUmR1Y2VyXG5cdFx0XHRcdFx0XHQsZW50aXRpZXM6bm9ybWFsaXplRGF0YVxuXHRcdFx0XHRcdFx0LFtET01BSU5dOlJFRFVDRVJcblx0XHRcdFx0XHRcdCx1aTogQWNjb3VudC5SRURVQ0VSXG5cdFx0XHRcdFx0fSwgLi4ucmVkdWNlcnMpXG5cdFx0XHRjb25zdCBjb21wb3NlRW5oYW5jZXJzID0gd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyB8fCBjb21wb3NlO1xuXHRcdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e319LCBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSh0aHVuaywuLi5taWRkbGV3YXJzKSkpXG5cblx0XHRcdHJldHVybiByZW5kZXIoKFxuXHRcdFx0XHRcdDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuXHRcdFx0XHRcdFx0PFJvdXRlciB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdFx0XHR7ZW5oYW5jZWRSb3V0ZShyb3V0ZSxzdG9yZS5kaXNwYXRjaCl9XG5cdFx0XHRcdFx0XHQ8L1JvdXRlcj5cblx0XHRcdFx0XHQ8L1Byb3ZpZGVyPlxuXHRcdFx0XHQpLGNvbnRhaW5lcilcblx0XHR9XG5cdH1cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihRaWxpQXBwLHtET01BSU4sIEFDVElPTixSRURVQ0VSfSlcbiJdfQ==