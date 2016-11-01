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

var _reactRouterRedux = require("react-router-redux");

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var muiTheme = (0, _getMuiTheme2.default)(_lightBaseTheme2.default);

var DOMAIN = "qiliApp";

var ACTION = exports.ACTION = {
    INIT_APP: function INIT_APP(error, tutorialized) {
        if (!!error) {
            return {
                type: "@@" + DOMAIN + "/initedError",
                payload: { user: user, error: error }
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
});

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

                content = _react2.default.createElement(_account2.default, null);
            } else if (!user.sessionToken) {
                content = _react2.default.createElement(_account2.default, { user: user });
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
        value: function render(routes) {
            var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
                var history = props.history,
                    params = props.params;

                return _react2.default.createElement(Component, _extends({ router: history }, props));
            };

            var allReducers = (0, _redux.combineReducers)(Object.assign({ routing: _reactRouterRedux.routerReducer }, REDUCER, _account2.default.REDUCER, reducers));
            var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

            for (var _len = arguments.length, middlewars = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                middlewars[_key - 2] = arguments[_key];
            }

            var store = (0, _redux.createStore)(allReducers, composeEnhancers(_redux.applyMiddleware.apply(undefined, [_reduxThunk2.default].concat(middlewars))));
            props.history = (0, _reactRouterRedux.syncHistoryWithStore)(props.history, store);

            return (0, _reactDom.render)(_react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(
                    _reactRouter.Router,
                    _extends({ createElement: defaultCreateElement }, props),
                    routes
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJlcnJvciIsInR1dG9yaWFsaXplZCIsInR5cGUiLCJwYXlsb2FkIiwidXNlciIsIlVTRVJfQ0hBTkdFRCIsIlRVVE9SSUFMSVpFRCIsIlJFRFVDRVIiLCJzdGF0ZSIsImluaXRlZCIsImN1cnJlbnQiLCJpbml0ZWRFcnJvciIsIk9iamVjdCIsImFzc2lnbiIsIlFpbGlBcHAiLCJwdXJlIiwid2l0aFJlZiIsInByb3BzIiwic2VydmljZSIsImFwcElkIiwiRXJyb3IiLCJpbml0QXBwIiwiaW5pdCIsInRpdGxlIiwiZGlzcGF0Y2giLCJkb2N1bWVudCIsImUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwib24iLCJtZXNzYWdlIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlcyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5IiwiZGVmYXVsdENyZWF0ZUVsZW1lbnQiLCJDb21wb25lbnQiLCJwYXJhbXMiLCJhbGxSZWR1Y2VycyIsInJvdXRpbmciLCJjb21wb3NlRW5oYW5jZXJzIiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwibWlkZGxld2FycyIsInN0b3JlIiwiZGVmYXVsdFByb3BzIiwicHJvcHNUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBUyxvREFBZjs7QUFFQSxJQUFNQyxTQUFPLFNBQWI7O0FBRU8sSUFBTUMsMEJBQU87QUFDbkJDLFlBRG1CLG9CQUNWQyxLQURVLEVBQ0pDLFlBREksRUFDUztBQUMzQixZQUFHLENBQUMsQ0FBQ0QsS0FBTCxFQUFXO0FBQ1YsbUJBQU87QUFDTkUsNkJBQVVMLE1BQVYsaUJBRE07QUFFTE0seUJBQVEsRUFBQ0MsVUFBRCxFQUFNSixZQUFOO0FBRkgsYUFBUDtBQUlBLFNBTEQsTUFLSztBQUNKLG1CQUFPO0FBQ05FLDZCQUFVTCxNQUFWLFlBRE07QUFFTE0seUJBQVEsRUFBQ0YsMEJBQUQ7QUFGSCxhQUFQO0FBSUE7QUFDRCxLQWJrQjtBQWNsQkksa0JBQWE7QUFDUEgscUJBQVVMLE1BQVY7QUFETyxLQWRLLEVBZ0JqQlMsY0FBYTtBQUNSSixxQkFBVUwsTUFBVjtBQURRO0FBaEJJLENBQWI7O0FBcUJBLElBQU1VLGdEQUNSVixNQURRLEVBQ0EsWUFBMkI7QUFBQSxRQUExQlcsS0FBMEIsdUVBQXBCLEVBQW9CO0FBQUE7QUFBQSxRQUFoQk4sSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsUUFBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUN0QyxZQUFPRCxJQUFQO0FBQ0Esb0JBQVVMLE1BQVY7QUFDQyxtQkFBTztBQUNOWSx3QkFBTyxJQUREO0FBRUxMLHNCQUFLLFNBQUtNLE9BRkw7QUFHTFQsOEJBQWFFLFFBQVFGO0FBSGhCLGFBQVA7QUFLRDtBQUNBLG9CQUFVSixN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Y0FBUyxnQkFBTTZFLFNBQU4sQ0FBZ0JNLE1BQWhCLENBQXVCSixVQURSO0FBRWxCeEMsaUJBQWEsZ0JBQU1zQyxTQUFOLENBQWdCRyxJQUZYO0FBR2xCOUMsYUFBUyxnQkFBTTJDLFNBQU4sQ0FBZ0JHO0FBSFAsQ0FsR0wsU0FBZDs7a0JBNklRaEUsT0FBT0MsTUFBUCxDQUFjQyxPQUFkLEVBQXNCLEVBQUNoQixjQUFELEVBQVFTLGdCQUFSLEVBQXRCLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge2NyZWF0ZVN0b3JlLGNvbWJpbmVSZWR1Y2VycywgYXBwbHlNaWRkbGV3YXJlLGNvbXBvc2V9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtzeW5jSGlzdG9yeVdpdGhTdG9yZSwgcm91dGVyUmVkdWNlcn0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4J1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi9jb21wb25lbnRzL3R1dG9yaWFsXCJcblxuY29uc3QgbXVpVGhlbWU9Z2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUpXG5cbmNvbnN0IERPTUFJTj1cInFpbGlBcHBcIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsdHV0b3JpYWxpemVkKXtcblx0XHRpZighIWVycm9yKXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZEVycm9yYFxuXHRcdFx0XHQscGF5bG9hZDp7dXNlcixlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcblx0fSxUVVRPUklBTElaRUQ6e1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuICAgIFtET01BSU5dOihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnBheWxvYWQudHV0b3JpYWxpemVkXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpbml0ZWQ6ZmFsc2Vcblx0XHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XG5cdFx0XHRcdCxpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aW5pdGVkOiEhVXNlci5jdXJyZW50XG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnN0YXRlLnR1dG9yaWFsaXplZFxuXHRcdFx0fVxuXHRcdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXHRcdH1cbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFxuY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcblxuICAgICAgICBjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZih0aXRsZSlcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKHR1dG9yaWFsaXplZD10cnVlKT0+e1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsICgpPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBsZXQgc2VsZj10aGlzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtdWlUaGVtZVxuICAgICAgICAgICAgLHNob3dNZXNzYWdlKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAsbG9hZGluZyhvcGVuKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXHRzaG93TWVzc2FnZSgpe1xuXHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdH1cblxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtpbml0ZWQsIGluaXRlZEVycm9yLCB1c2VyLCB0dXRvcmlhbGl6ZWQsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGNvbnRlbnRcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiaW5pdGlhbGl6aW5nLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIXR1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiAoPFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PmRpc3BhdGNoKEFDVElPTi5UVVRPUklBTElaRUQpfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cblxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0aW5pdCgpe30sXG5cdFx0dHV0b3JpYWw6W11cblx0fVxuXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0YXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0dHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgc2hvd01lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlcywgcmVkdWNlcnM9e30sIC4uLm1pZGRsZXdhcnMpe1xuXHRcdGNvbnN0IHByb3BzPXt9XG4gICAgICAgIGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgICAgIGlmKCFjb250YWluZXIpe1xuICAgICAgICAgICAgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250YWluZXIuaWQ9J2FwcCdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICB9XG4gICAgICAgIGxldCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuICAgICAgICBzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuICAgICAgICBpZighcHJvcHMuaGlzdG9yeSlcbiAgICAgICAgICAgIHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuXHRcdGNvbnN0IGRlZmF1bHRDcmVhdGVFbGVtZW50PShDb21wb25lbnQscHJvcHMpPT57XG5cdFx0XHRjb25zdCB7aGlzdG9yeSxwYXJhbXN9PXByb3BzXG5cdFx0XHRyZXR1cm4gKDxDb21wb25lbnQgcm91dGVyPXtoaXN0b3J5fSB7Li4ucHJvcHN9Lz4pXG5cdFx0fVxuXG5cblx0XHRjb25zdCBhbGxSZWR1Y2Vycz1jb21iaW5lUmVkdWNlcnMoT2JqZWN0LmFzc2lnbih7cm91dGluZzpyb3V0ZXJSZWR1Y2VyfSxSRURVQ0VSLEFjY291bnQuUkVEVUNFUiwgcmVkdWNlcnMpKVxuXHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XG5cdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcblx0XHRwcm9wcy5oaXN0b3J5PXN5bmNIaXN0b3J5V2l0aFN0b3JlKHByb3BzLmhpc3Rvcnksc3RvcmUpXG5cdFx0XG4gICAgICAgIHJldHVybiByZW5kZXIoKFxuICAgICAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgICAgICAgICA8Um91dGVyIGNyZWF0ZUVsZW1lbnQ9e2RlZmF1bHRDcmVhdGVFbGVtZW50fSB7Li4ucHJvcHN9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3JvdXRlc31cbiAgICAgICAgICAgICAgICAgICAgPC9Sb3V0ZXI+XG4gICAgICAgICAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICAgICAgICksY29udGFpbmVyKVxuICAgIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oUWlsaUFwcCx7QUNUSU9OLFJFRFVDRVJ9KVxuIl19