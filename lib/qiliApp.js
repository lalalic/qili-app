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
};

var AccountContainer = (0, _reactRedux.connect)(function (state) {
	return state.account;
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
			}, _defineProperty(_ref4, DOMAIN, REDUCER), _defineProperty(_ref4, "account", _account2.default.REDUCER), _ref4)].concat(_toConsumableArray(reducers)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJlcnJvciIsInR1dG9yaWFsaXplZCIsInR5cGUiLCJwYXlsb2FkIiwidXNlciIsImN1cnJlbnQiLCJVU0VSX0NIQU5HRUQiLCJUVVRPUklBTElaRUQiLCJSRURVQ0VSIiwic3RhdGUiLCJpbml0ZWQiLCJpbml0ZWRFcnJvciIsIk9iamVjdCIsImFzc2lnbiIsIkFjY291bnRDb250YWluZXIiLCJhY2NvdW50IiwiUWlsaUFwcCIsInB1cmUiLCJ3aXRoUmVmIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJkaXNwYXRjaCIsImRvY3VtZW50IiwiZSIsInJlZnMiLCJtc2ciLCJzaG93IiwibG9hZGluZyIsInRoZW4iLCJvbiIsIm1lc3NhZ2UiLCJzZWxmIiwic2hvd01lc3NhZ2UiLCJhcmd1bWVudHMiLCJvcGVuIiwiY29udGVudCIsIkFycmF5IiwiaXNBcnJheSIsInR1dG9yaWFsIiwibGVuZ3RoIiwic2Vzc2lvblRva2VuIiwicmVuZGVyQ29udGVudCIsIm92ZXJmbG93WSIsImNoaWxkcmVuIiwicm91dGUiLCJtaWRkbGV3YXJzIiwicmVkdWNlcnMiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInN0eWxlIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsImhlaWdodCIsImhpc3RvcnkiLCJyb3V0ZXJSZHVjZXIiLCJlbmhhbmNlZFJvdXRlIiwicm9vdCIsIm9uRW50ZXIiLCJvbkNoYW5nZSIsImNsb25lRWxlbWVudCIsIm5leHRTdGF0ZSIsImJpbmQiLCJub3JtYWxpemVEYXRhIiwiZW50aXRpZXMiLCJrZXlzIiwicmVkdWNlIiwibWVyZ2VkIiwiYWxsUmVkdWNlcnMiLCJyb3V0aW5nIiwiY29tcG9zZUVuaGFuY2VycyIsIl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyIsInN0b3JlIiwicWlsaUFwcCIsInVpIiwiZGVmYXVsdFByb3BzIiwicHJvcHNUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBUyxvREFBZjs7QUFFTyxJQUFNQywwQkFBTyxTQUFiOztBQUVBLElBQU1DLDBCQUFPO0FBQ25CQyxTQURtQixvQkFDVkMsS0FEVSxFQUNKQyxZQURJLEVBQ1M7QUFDM0IsTUFBRyxDQUFDLENBQUNELEtBQUwsRUFBVztBQUNWLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsaUJBRE07QUFFTE0sYUFBUSxFQUFDQyxNQUFLLFNBQUtDLE9BQVgsRUFBbUJMLFlBQW5CO0FBRkgsSUFBUDtBQUlBLEdBTEQsTUFLSztBQUNKLFVBQU87QUFDTkUsaUJBQVVMLE1BQVYsWUFETTtBQUVMTSxhQUFRLEVBQUNGLDBCQUFEO0FBRkgsSUFBUDtBQUlBO0FBQ0QsRUFia0I7QUFjbEJLLGVBQWE7QUFDUEosZUFBVUwsTUFBVjtBQURPLEVBZEssRUFnQmpCVSxjQUFhO0FBQ1JMLGVBQVVMLE1BQVY7QUFEUTtBQWhCSSxDQUFiOztBQXFCQSxJQUFNVyw0QkFBUSxTQUFSQSxPQUFRLEdBQTJCO0FBQUEsS0FBMUJDLEtBQTBCLHVFQUFwQixFQUFvQjtBQUFBO0FBQUEsS0FBaEJQLElBQWdCLFFBQWhCQSxJQUFnQjtBQUFBLEtBQVhD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QURmO0FBRWpCcEUsUUFBTSxnQkFBTWtFLFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCQyxVQUZaO0FBR2pCakUsT0FBSyxnQkFBTStELFNBQU4sQ0FBZ0JHLElBSEo7QUFJakIvQyxXQUFTLGdCQUFNNEMsU0FBTixDQUFnQkksS0FKUjtBQUtqQmxFLFFBQU8sZ0JBQU04RCxTQUFOLENBQWdCQztBQUxOLENBMUZDLFNBa0daSSxpQkFsR1ksR0FrR007QUFDeEJoRyxXQUFTLGdCQUFNMkYsU0FBTixDQUFnQk0sTUFBaEIsQ0FBdUJKLFVBRFI7QUFFeEJwRCxjQUFhLGdCQUFNa0QsU0FBTixDQUFnQkcsSUFGTDtBQUd4QjFELFVBQVMsZ0JBQU11RCxTQUFOLENBQWdCRztBQUhELENBbEdOLFNBQWQ7O2tCQWtMUTlFLE9BQU9DLE1BQVAsQ0FBY0csT0FBZCxFQUFzQixFQUFDbkIsY0FBRCxFQUFTQyxjQUFULEVBQWdCVSxnQkFBaEIsRUFBdEIsQyIsImZpbGUiOiJxaWxpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7Y3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSxjb21wb3NlfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcblxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcbmltcG9ydCBsaWdodEJhc2VUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvYmFzZVRoZW1lcy9saWdodEJhc2VUaGVtZSdcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuXG5pbXBvcnQge2VuaGFuY2VkQ29tYmluZVJlZHVjZXJzfSBmcm9tIFwiLlwiXG5cbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi9jb21wb25lbnRzL3R1dG9yaWFsXCJcblxuY29uc3QgbXVpVGhlbWU9Z2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUpXG5cbmV4cG9ydCBjb25zdCBET01BSU49XCJxaWxpQXBwXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdElOSVRfQVBQKGVycm9yLHR1dG9yaWFsaXplZCl7XG5cdFx0aWYoISFlcnJvcil7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmBcblx0XHRcdFx0LHBheWxvYWQ6e3VzZXI6VXNlci5jdXJyZW50LGVycm9yfVxuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpgQEAke0RPTUFJTn0vaW5pdGVkYFxuXHRcdFx0XHQscGF5bG9hZDp7dHV0b3JpYWxpemVkfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQsVVNFUl9DSEFOR0VEOntcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYFxuXHR9LFRVVE9SSUFMSVpFRDp7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGBcblx0fVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5pdGVkOnRydWVcblx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0LHR1dG9yaWFsaXplZDpwYXlsb2FkLnR1dG9yaWFsaXplZFxuXHRcdH1cblx0YnJlYWtcblx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgOlxuXHRcdHJldHVybiB7XG5cdFx0XHRpbml0ZWQ6ZmFsc2Vcblx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0LGluaXRlZEVycm9yOnBheWxvYWQuZXJyb3Jcblx0XHR9XG5cdGJyZWFrXG5cdGNhc2UgYEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGA6XG5cdFx0cmV0dXJuIHtcblx0XHRcdGluaXRlZDohIVVzZXIuY3VycmVudFxuXHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XG5cdFx0XHQsdHV0b3JpYWxpemVkOnN0YXRlLnR1dG9yaWFsaXplZFxuXHRcdH1cblx0Y2FzZSBgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYDpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5jb25zdCBBY2NvdW50Q29udGFpbmVyPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLmFjY291bnQpKEFjY291bnQpXG5cbmV4cG9ydCBjb25zdCBRaWxpQXBwPWNvbm5lY3Qoc3RhdGU9PnN0YXRlW0RPTUFJTl0sbnVsbCxudWxsLHtwdXJlOnRydWUsd2l0aFJlZjp0cnVlfSkoXG5cdGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdGNvbnN0cnVjdG9yKHByb3BzKXtcblx0XHRcdHN1cGVyKHByb3BzKVxuXG5cdFx0XHRzdXBwb3J0VGFwKClcblxuXHRcdFx0Y29uc3Qge3NlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cblx0XHRcdGlmKCFhcHBJZClcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cblx0XHRcdGlmKCFzZXJ2aWNlKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuXHRcdH1cblxuXHRcdGNvbXBvbmVudERpZE1vdW50KCl7XG5cdFx0XHR2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWQsIHRpdGxlLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0aWYodGl0bGUpXG5cdFx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cblx0XHRcdGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcblx0XHRcdFx0LnRoZW4oKHR1dG9yaWFsaXplZD10cnVlKT0+e1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKG51bGwsISF0dXRvcmlhbGl6ZWQpKVxuXHRcdFx0XHRcdFx0VXNlci5vbignY2hhbmdlJywgKCk9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQpKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0KGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG5cdFx0fVxuXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0XHRsZXQgc2VsZj10aGlzXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRtdWlUaGVtZVxuXHRcdFx0XHQsc2hvd01lc3NhZ2UoKXtcblx0XHRcdFx0XHRzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0fVxuXHRcdFx0XHQsbG9hZGluZyhvcGVuKXtcblx0XHRcdFx0XHRzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNob3dNZXNzYWdlKCl7XG5cdFx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxuXHRcdH1cblxuXG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRjb25zdCB7aW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgdHV0b3JpYWxpemVkLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0bGV0IGNvbnRlbnRcblxuXHRcdFx0aWYoIWluaXRlZCl7XG5cdFx0XHRcdGlmKGluaXRlZEVycm9yKVxuXHRcdFx0XHRcdGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0Y29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxuXHRcdFx0fWVsc2UgaWYoIXVzZXIpe1xuXHRcdFx0XHRpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG5cdFx0XHRcdFx0cmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXG5cblx0XHRcdFx0Y29udGVudD0oPEFjY291bnRDb250YWluZXIgLz4pXG5cdFx0XHR9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuXHRcdFx0XHRjb250ZW50PSg8QWNjb3VudENvbnRhaW5lciB1c2VyPXt1c2VyfS8+KVxuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cblx0XHRcdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdFx0XHRcdDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG5cdFx0XHRcdFx0XHRcdDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpXG5cdFx0fVxuXG5cdFx0cmVuZGVyQ29udGVudCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cblx0XHR9XG5cblxuXG5cdFx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0XHRzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuXHRcdFx0aW5pdCgpe30sXG5cdFx0XHR0dXRvcmlhbDpbXVxuXHRcdH1cblxuXHRcdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdGFwcElkOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHR0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0XHR0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuXHRcdH1cblxuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0XHRtdWlUaGVtZTpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0XHRzaG93TWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0XHRsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHRcdH1cblxuXHRcdHN0YXRpYyByZW5kZXIocm91dGUsIHJlZHVjZXJzPVtdLCAuLi5taWRkbGV3YXJzKXtcblx0XHRcdGNvbnN0IHByb3BzPXt9XG5cdFx0XHRsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuXHRcdFx0aWYoIWNvbnRhaW5lcil7XG5cdFx0XHRcdGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0XHRjb250YWluZXIuaWQ9J2FwcCdcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG5cdFx0XHR9XG5cdFx0XHRsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cdFx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG5cdFx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG5cblx0XHRcdGlmKCFwcm9wcy5oaXN0b3J5KVxuXHRcdFx0XHRwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XG5cblx0XHRcdGZ1bmN0aW9uIHJvdXRlclJkdWNlcihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSl7XG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdFx0Y2FzZSAnQEByb3V0ZXIvTE9DQVRJT05fQ0hBTkdFJzpcblx0XHRcdFx0cmV0dXJuIHBheWxvYWRcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc3RhdGVcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZW5oYW5jZWRSb3V0ZT0ocm9vdCxkaXNwYXRjaCk9Pntcblx0XHRcdFx0Y29uc3Qge29uRW50ZXIsIG9uQ2hhbmdlfT1yb290LnByb3BzXG5cdFx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQocm9vdCwge1xuXHRcdFx0XHRcdG9uRW50ZXIobmV4dFN0YXRlKXtcblx0XHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOmBAQHJvdXRlci9MT0NBVElPTl9DSEFOR0VgLHBheWxvYWQ6bmV4dFN0YXRlfSk7XG5cdFx0XHRcdFx0XHRvbkVudGVyICYmIG9uRW50ZXIuYmluZCh0aGlzKSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvbkNoYW5nZShzdGF0ZSxuZXh0U3RhdGUpe1xuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goe3R5cGU6YEBAcm91dGVyL0xPQ0FUSU9OX0NIQU5HRWAscGF5bG9hZDpuZXh0U3RhdGV9KTtcblx0XHRcdFx0XHRcdG9uQ2hhbmdlICYmIG9uQ2hhbmdlLmJpbmQodGhpcykoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gbm9ybWFsaXplRGF0YShlbnRpdGllcz17fSx7dHlwZSxwYXlsb2FkfSl7XG5cdFx0XHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdFx0Y2FzZSAnTk9STUFMSVpFRF9EQVRBJzpcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0XHRcdHt9LFxuXHRcdFx0XHRcdFx0ZW50aXRpZXMsXG5cdFx0XHRcdFx0XHRPYmplY3Qua2V5cyhwYXlsb2FkKS5yZWR1Y2UoKG1lcmdlZCx0eXBlKT0+e1xuXHRcdFx0XHRcdFx0XHRtZXJnZWRbdHlwZV09T2JqZWN0LmFzc2lnbih7fSxlbnRpdGllc1t0eXBlXSxwYXlsb2FkW3R5cGVdKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gbWVyZ2VkXG5cdFx0XHRcdFx0XHR9LHt9KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZW50aXRpZXNcblx0XHRcdH1cblxuXG5cdFx0XHRjb25zdCBhbGxSZWR1Y2Vycz1lbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XG5cdFx0XHRcdFx0XHRyb3V0aW5nOnJvdXRlclJkdWNlclxuXHRcdFx0XHRcdFx0LGVudGl0aWVzOm5vcm1hbGl6ZURhdGFcblx0XHRcdFx0XHRcdCxbRE9NQUlOXTpSRURVQ0VSXG5cdFx0XHRcdFx0XHQsYWNjb3VudDpBY2NvdW50LlJFRFVDRVJcblx0XHRcdFx0XHR9LCAuLi5yZWR1Y2Vycylcblx0XHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XG5cdFx0XHRjb25zdCBzdG9yZT1jcmVhdGVTdG9yZShhbGxSZWR1Y2Vycywge3FpbGlBcHA6e30sIHVpOnt9LCBlbnRpdGllczp7fX0sIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcblxuXHRcdFx0cmV0dXJuIHJlbmRlcigoXG5cdFx0XHRcdFx0PFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG5cdFx0XHRcdFx0XHQ8Um91dGVyIHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0XHRcdHtlbmhhbmNlZFJvdXRlKHJvdXRlLHN0b3JlLmRpc3BhdGNoKX1cblx0XHRcdFx0XHRcdDwvUm91dGVyPlxuXHRcdFx0XHRcdDwvUHJvdmlkZXI+XG5cdFx0XHRcdCksY29udGFpbmVyKVxuXHRcdH1cblx0fVxuKVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFFpbGlBcHAse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxuIl19