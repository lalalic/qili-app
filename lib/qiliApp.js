"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = undefined;

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

var DOMAIN = "qiliApp";

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

exports.default = Object.assign(QiliApp, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJlcnJvciIsInR1dG9yaWFsaXplZCIsInR5cGUiLCJwYXlsb2FkIiwidXNlciIsImN1cnJlbnQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsIk9iamVjdCIsImFzc2lnbiIsIkFjY291bnRDb250YWluZXIiLCJ1aSIsIlFpbGlBcHAiLCJwdXJlIiwid2l0aFJlZiIsInByb3BzIiwic2VydmljZSIsImFwcElkIiwiRXJyb3IiLCJpbml0QXBwIiwiaW5pdCIsInRpdGxlIiwiZGlzcGF0Y2giLCJkb2N1bWVudCIsImUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwib24iLCJtZXNzYWdlIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlIiwibWlkZGxld2FycyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5Iiwicm91dGVyUmR1Y2VyIiwiZW5oYW5jZWRSb3V0ZSIsInJvb3QiLCJvbkVudGVyIiwib25DaGFuZ2UiLCJjbG9uZUVsZW1lbnQiLCJuZXh0U3RhdGUiLCJiaW5kIiwibm9ybWFsaXplRGF0YSIsImVudGl0aWVzIiwia2V5cyIsInJlZHVjZSIsIm1lcmdlZCIsImFsbFJlZHVjZXJzIiwicm91dGluZyIsImNvbXBvc2VFbmhhbmNlcnMiLCJfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18iLCJzdG9yZSIsInFpbGlBcHAiLCJkZWZhdWx0UHJvcHMiLCJwcm9wc1R5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJhcnJheSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFTLG9EQUFmOztBQUVBLElBQU1DLFNBQU8sU0FBYjs7QUFFTyxJQUFNQywwQkFBTztBQUNuQkMsU0FEbUIsb0JBQ1ZDLEtBRFUsRUFDSkMsWUFESSxFQUNTO0FBQzNCLE1BQUcsQ0FBQyxDQUFDRCxLQUFMLEVBQVc7QUFDVixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLGlCQURNO0FBRUxNLGFBQVEsRUFBQ0MsTUFBSyxTQUFLQyxPQUFYLEVBQW1CTCxZQUFuQjtBQUZILElBQVA7QUFJQSxHQUxELE1BS0s7QUFDSixVQUFPO0FBQ05FLGlCQUFVTCxNQUFWLFlBRE07QUFFTE0sYUFBUSxFQUFDRiwwQkFBRDtBQUZILElBQVA7QUFJQTtBQUNELEVBYmtCO0FBY2xCSyxlQUFhO0FBQ1BKLGVBQVVMLE1BQVY7QUFETyxFQWRLLEVBZ0JqQlUsY0FBYTtBQUNSTCxlQUFVTCxNQUFWO0FBRFE7QUFoQkksQ0FBYjs7QUFxQkEsSUFBTVcsNEJBQVEsU0FBUkEsT0FBUSxHQUEyQjtBQUFBLEtBQTFCQyxLQUEwQix1RUFBcEIsRUFBb0I7QUFBQTtBQUFBLEtBQWhCUCxJQUFnQixRQUFoQkEsSUFBZ0I7QUFBQSxLQUFYQyxPQUFXLFFBQVhB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bkUsUUFBTSxnQkFBTWlFLFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCQyxVQUZaO0FBR2pCaEUsT0FBSyxnQkFBTThELFNBQU4sQ0FBZ0JHLElBSEo7QUFJakI5QyxXQUFTLGdCQUFNMkMsU0FBTixDQUFnQkksS0FKUjtBQUtqQmpFLFFBQU8sZ0JBQU02RCxTQUFOLENBQWdCQztBQUxOLENBMUZDLFNBa0daSSxpQkFsR1ksR0FrR007QUFDeEIvRixXQUFTLGdCQUFNMEYsU0FBTixDQUFnQk0sTUFBaEIsQ0FBdUJKLFVBRFI7QUFFeEJuRCxjQUFhLGdCQUFNaUQsU0FBTixDQUFnQkcsSUFGTDtBQUd4QnpELFVBQVMsZ0JBQU1zRCxTQUFOLENBQWdCRztBQUhELENBbEdOLFNBQWQ7O2tCQWtMUTdFLE9BQU9DLE1BQVAsQ0FBY0csT0FBZCxFQUFzQixFQUFDbEIsY0FBRCxFQUFRVSxnQkFBUixFQUF0QixDIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxuXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IHtjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLGNvbXBvc2V9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7ZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gXCIuXCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5jb25zdCBtdWlUaGVtZT1nZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSlcblxuY29uc3QgRE9NQUlOPVwicWlsaUFwcFwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRJTklUX0FQUChlcnJvcix0dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgXG5cdFx0XHRcdCxwYXlsb2FkOnt1c2VyOlVzZXIuY3VycmVudCxlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcblx0fSxUVVRPUklBTElaRUQ6e1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZGA6XG5cdFx0cmV0dXJuIHtcblx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdCx0dXRvcmlhbGl6ZWQ6cGF5bG9hZC50dXRvcmlhbGl6ZWRcblx0XHR9XG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L2luaXRlZEVycm9yYDpcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5pdGVkOmZhbHNlXG5cdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdCxpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0fVxuXHRicmVha1xuXHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxuXHRcdHJldHVybiB7XG5cdFx0XHRpbml0ZWQ6ISFVc2VyLmN1cnJlbnRcblx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0LHR1dG9yaWFsaXplZDpzdGF0ZS50dXRvcmlhbGl6ZWRcblx0XHR9XG5cdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3R1dG9yaWFsaXplZDp0cnVlfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY29uc3QgQWNjb3VudENvbnRhaW5lcj1jb25uZWN0KHN0YXRlPT5zdGF0ZS51aSkoQWNjb3VudClcblxuZXhwb3J0IGNvbnN0IFFpbGlBcHA9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSxudWxsLG51bGwse3B1cmU6dHJ1ZSx3aXRoUmVmOnRydWV9KShcblx0Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0Y29uc3RydWN0b3IocHJvcHMpe1xuXHRcdFx0c3VwZXIocHJvcHMpXG5cblx0XHRcdHN1cHBvcnRUYXAoKVxuXG5cdFx0XHRjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuXHRcdFx0aWYoIWFwcElkKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuXHRcdFx0aWYoIXNlcnZpY2UpXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG5cdFx0fVxuXG5cdFx0Y29tcG9uZW50RGlkTW91bnQoKXtcblx0XHRcdHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0XHRpZih0aXRsZSlcblx0XHRcdFx0ZG9jdW1lbnQudGl0bGU9dGl0bGVcblxuXHRcdFx0aW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuXHRcdFx0XHQudGhlbigodHV0b3JpYWxpemVkPXRydWUpPT57XG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG5cdFx0XHRcdFx0XHRVc2VyLm9uKCdjaGFuZ2UnLCAoKT0+ZGlzcGF0Y2goQUNUSU9OLlVTRVJfQ0hBTkdFRCkpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQoZSk9PmRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChlLm1lc3NhZ2UpKSlcblx0XHR9XG5cblx0XHRnZXRDaGlsZENvbnRleHQoKXtcblx0XHRcdGxldCBzZWxmPXRoaXNcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdG11aVRoZW1lXG5cdFx0XHRcdCxzaG93TWVzc2FnZSgpe1xuXHRcdFx0XHRcdHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdCxsb2FkaW5nKG9wZW4pe1xuXHRcdFx0XHRcdHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0c2hvd01lc3NhZ2UoKXtcblx0XHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdFx0fVxuXG5cblx0XHRyZW5kZXIoKXtcblx0XHRcdGNvbnN0IHtpbml0ZWQsIGluaXRlZEVycm9yLCB1c2VyLCB0dXRvcmlhbGl6ZWQsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0XHRsZXQgY29udGVudFxuXG5cdFx0XHRpZighaW5pdGVkKXtcblx0XHRcdFx0aWYoaW5pdGVkRXJyb3IpXG5cdFx0XHRcdFx0Y29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRjb250ZW50PSBcImluaXRpYWxpemluZy4uLlwiXG5cdFx0XHR9ZWxzZSBpZighdXNlcil7XG5cdFx0XHRcdGlmKCF0dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aClcblx0XHRcdFx0XHRyZXR1cm4gKDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT5kaXNwYXRjaChBQ1RJT04uVFVUT1JJQUxJWkVEKX0vPilcblxuXHRcdFx0XHRjb250ZW50PSg8QWNjb3VudENvbnRhaW5lciAvPilcblx0XHRcdH1lbHNlIGlmKCF1c2VyLnNlc3Npb25Ub2tlbil7XG5cdFx0XHRcdGNvbnRlbnQ9KDxBY2NvdW50Q29udGFpbmVyIHVzZXI9e3VzZXJ9Lz4pXG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuXHRcdFx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0XHRcdFx0PE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cblx0XHRcdFx0XHRcdFx0PExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdClcblx0XHR9XG5cblx0XHRyZW5kZXJDb250ZW50KCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuXHRcdH1cblxuXG5cblx0XHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0XHRpbml0KCl7fSxcblx0XHRcdHR1dG9yaWFsOltdXG5cdFx0fVxuXG5cdFx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdFx0c2VydmljZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdFx0YXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdFx0aW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRcdHR1dG9yaWFsOlJlYWN0LlByb3BUeXBlcy5hcnJheSxcblx0XHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdFx0fVxuXG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRcdHNob3dNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRcdGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdFx0fVxuXG5cdFx0c3RhdGljIHJlbmRlcihyb3V0ZSwgcmVkdWNlcnM9W10sIC4uLm1pZGRsZXdhcnMpe1xuXHRcdFx0Y29uc3QgcHJvcHM9e31cblx0XHRcdGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG5cdFx0XHRpZighY29udGFpbmVyKXtcblx0XHRcdFx0Y29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRcdGNvbnRhaW5lci5pZD0nYXBwJ1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcblx0XHRcdH1cblx0XHRcdGxldCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcblx0XHRcdHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuXHRcdFx0aWYoIXByb3BzLmhpc3RvcnkpXG5cdFx0XHRcdHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuXHRcdFx0ZnVuY3Rpb24gcm91dGVyUmR1Y2VyKHN0YXRlPXt9LHt0eXBlLHBheWxvYWR9KXtcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0XHRjYXNlICdAQHJvdXRlci9MT0NBVElPTl9DSEFOR0UnOlxuXHRcdFx0XHRyZXR1cm4gcGF5bG9hZFxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlbmhhbmNlZFJvdXRlPShyb290LGRpc3BhdGNoKT0+e1xuXHRcdFx0XHRjb25zdCB7b25FbnRlciwgb25DaGFuZ2V9PXJvb3QucHJvcHNcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChyb290LCB7XG5cdFx0XHRcdFx0b25FbnRlcihuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRcdG9uRW50ZXIgJiYgb25FbnRlci5iaW5kKHRoaXMpKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdG9uQ2hhbmdlKHN0YXRlLG5leHRTdGF0ZSl7XG5cdFx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTpgQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFYCxwYXlsb2FkOm5leHRTdGF0ZX0pO1xuXHRcdFx0XHRcdFx0b25DaGFuZ2UgJiYgb25DaGFuZ2UuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRmdW5jdGlvbiBub3JtYWxpemVEYXRhKGVudGl0aWVzPXt9LHt0eXBlLHBheWxvYWR9KXtcblx0XHRcdFx0c3dpdGNoKHR5cGUpe1xuXHRcdFx0XHRjYXNlICdOT1JNQUxJWkVEX0RBVEEnOlxuXHRcdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdFx0e30sXG5cdFx0XHRcdFx0XHRlbnRpdGllcyxcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKHBheWxvYWQpLnJlZHVjZSgobWVyZ2VkLHR5cGUpPT57XG5cdFx0XHRcdFx0XHRcdG1lcmdlZFt0eXBlXT1PYmplY3QuYXNzaWduKHt9LGVudGl0aWVzW3R5cGVdLHBheWxvYWRbdHlwZV0pXG5cdFx0XHRcdFx0XHRcdHJldHVybiBtZXJnZWRcblx0XHRcdFx0XHRcdH0se30pXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBlbnRpdGllc1xuXHRcdFx0fVxuXG5cblx0XHRcdGNvbnN0IGFsbFJlZHVjZXJzPWVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcblx0XHRcdFx0XHRcdHJvdXRpbmc6cm91dGVyUmR1Y2VyXG5cdFx0XHRcdFx0XHQsZW50aXRpZXM6bm9ybWFsaXplRGF0YVxuXHRcdFx0XHRcdFx0LFtET01BSU5dOlJFRFVDRVJcblx0XHRcdFx0XHRcdCx1aTogQWNjb3VudC5SRURVQ0VSXG5cdFx0XHRcdFx0fSwgLi4ucmVkdWNlcnMpXG5cdFx0XHRjb25zdCBjb21wb3NlRW5oYW5jZXJzID0gd2luZG93Ll9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyB8fCBjb21wb3NlO1xuXHRcdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIHtxaWxpQXBwOnt9LCB1aTp7fSwgZW50aXRpZXM6e319LCBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSh0aHVuaywuLi5taWRkbGV3YXJzKSkpXG5cblx0XHRcdHJldHVybiByZW5kZXIoKFxuXHRcdFx0XHRcdDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuXHRcdFx0XHRcdFx0PFJvdXRlciB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdFx0XHR7ZW5oYW5jZWRSb3V0ZShyb3V0ZSxzdG9yZS5kaXNwYXRjaCl9XG5cdFx0XHRcdFx0XHQ8L1JvdXRlcj5cblx0XHRcdFx0XHQ8L1Byb3ZpZGVyPlxuXHRcdFx0XHQpLGNvbnRhaW5lcilcblx0XHR9XG5cdH1cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihRaWxpQXBwLHtBQ1RJT04sUkVEVUNFUn0pXG4iXX0=