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
})((_temp = _class = function (_Component) {
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
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var reducers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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

            for (var _len = arguments.length, middlewars = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                middlewars[_key - 3] = arguments[_key];
            }

            var store = (0, _redux.createStore)(allReducers, composeEnhancers(_redux.applyMiddleware.apply(undefined, middlewars)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJlcnJvciIsInR1dG9yaWFsaXplZCIsInR5cGUiLCJwYXlsb2FkIiwidXNlciIsIlVTRVJfQ0hBTkdFRCIsIlRVVE9SSUFMSVpFRCIsIlJFRFVDRVIiLCJzdGF0ZSIsImluaXRlZCIsImN1cnJlbnQiLCJpbml0ZWRFcnJvciIsIk9iamVjdCIsImFzc2lnbiIsIlFpbGlBcHAiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsImRpc3BhdGNoIiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm9uIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZXMiLCJyZWR1Y2VycyIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiaGlzdG9yeSIsImRlZmF1bHRDcmVhdGVFbGVtZW50IiwiQ29tcG9uZW50IiwicGFyYW1zIiwiYWxsUmVkdWNlcnMiLCJyb3V0aW5nIiwiY29tcG9zZUVuaGFuY2VycyIsIl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyIsIm1pZGRsZXdhcnMiLCJzdG9yZSIsImRlZmF1bHRQcm9wcyIsInByb3BzVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmci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R2xCOUMsYUFBUyxnQkFBTTJDLFNBQU4sQ0FBZ0JHO0FBSFAsQ0FsR0wsU0FBZDs7a0JBNElROUQsT0FBT0MsTUFBUCxDQUFjQyxPQUFkLEVBQXNCLEVBQUNoQixjQUFELEVBQVFTLGdCQUFSLEVBQXRCLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge2NyZWF0ZVN0b3JlLGNvbWJpbmVSZWR1Y2VycywgYXBwbHlNaWRkbGV3YXJlLGNvbXBvc2V9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtzeW5jSGlzdG9yeVdpdGhTdG9yZSwgcm91dGVyUmVkdWNlcn0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4J1xuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi9jb21wb25lbnRzL3R1dG9yaWFsXCJcblxuY29uc3QgbXVpVGhlbWU9Z2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUpXG5cbmNvbnN0IERPTUFJTj1cInFpbGlBcHBcIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsdHV0b3JpYWxpemVkKXtcblx0XHRpZighIWVycm9yKXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZEVycm9yYFxuXHRcdFx0XHQscGF5bG9hZDp7dXNlcixlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcblx0fSxUVVRPUklBTElaRUQ6e1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuICAgIFtET01BSU5dOihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnBheWxvYWQudHV0b3JpYWxpemVkXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpbml0ZWQ6ZmFsc2Vcblx0XHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XG5cdFx0XHRcdCxpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aW5pdGVkOiEhVXNlci5jdXJyZW50XG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnN0YXRlLnR1dG9yaWFsaXplZFxuXHRcdFx0fVxuXHRcdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXHRcdH1cbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dKShcbmNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cbiAgICAgICAgc3VwcG9ydFRhcCgpXG5cbiAgICAgICAgY29uc3Qge3NlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cbiAgICAgICAgaWYoIWFwcElkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cbiAgICAgICAgaWYoIXNlcnZpY2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0aWYodGl0bGUpXG5cdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxuXG4gICAgICAgIGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcbiAgICAgICAgICAgIC50aGVuKCh0dXRvcmlhbGl6ZWQ9dHJ1ZSk9PntcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKG51bGwsISF0dXRvcmlhbGl6ZWQpKVxuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCAoKT0+ZGlzcGF0Y2goQUNUSU9OLlVTRVJfQ0hBTkdFRCkpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZSk9PmRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChlLm1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgbGV0IHNlbGY9dGhpc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbXVpVGhlbWVcbiAgICAgICAgICAgICxzaG93TWVzc2FnZSgpe1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLGxvYWRpbmcob3Blbil7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZzLmxvYWRpbmdbb3BlbiA/IFwic2hvd1wiIDogXCJjbG9zZVwiXSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblx0c2hvd01lc3NhZ2UoKXtcblx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxuXHR9XG5cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7aW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgdHV0b3JpYWxpemVkLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGxldCBjb250ZW50XG5cbiAgICAgICAgaWYoIWluaXRlZCl7XG4gICAgICAgICAgICBpZihpbml0ZWRFcnJvcilcbiAgICAgICAgICAgICAgICBjb250ZW50PSBgSW5pdGlhbGl6aW5nIEVycm9yOiAke2luaXRlZEVycm9yfWBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb250ZW50PSBcImluaXRpYWxpemluZy4uLlwiXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyKXtcbiAgICAgICAgICAgIGlmKCF0dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT5kaXNwYXRjaChBQ1RJT04uVFVUT1JJQUxJWkVEKX0vPilcblxuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgLz4pXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyLnNlc3Npb25Ub2tlbil7XG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfS8+KVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfVxuXG5cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuXHRcdGluaXQoKXt9LFxuXHRcdHR1dG9yaWFsOltdXG5cdH1cblxuXHRzdGF0aWMgcHJvcHNUeXBlcz17XG5cdFx0c2VydmljZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGFwcElkOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRpbml0OlJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdHR1dG9yaWFsOlJlYWN0LlByb3BUeXBlcy5hcnJheSxcblx0XHR0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuXHR9XG5cblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRtdWlUaGVtZTpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIHNob3dNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgbG9hZGluZzogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcblx0fVxuXG4gICAgc3RhdGljIHJlbmRlcihyb3V0ZXMsIHByb3BzPXt9LCByZWR1Y2Vycz17fSwgLi4ubWlkZGxld2Fycyl7XG4gICAgICAgIGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgICAgIGlmKCFjb250YWluZXIpe1xuICAgICAgICAgICAgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250YWluZXIuaWQ9J2FwcCdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICB9XG4gICAgICAgIGxldCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuICAgICAgICBzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuICAgICAgICBpZighcHJvcHMuaGlzdG9yeSlcbiAgICAgICAgICAgIHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuXHRcdGNvbnN0IGRlZmF1bHRDcmVhdGVFbGVtZW50PShDb21wb25lbnQscHJvcHMpPT57XG5cdFx0XHRjb25zdCB7aGlzdG9yeSxwYXJhbXN9PXByb3BzXG5cdFx0XHRyZXR1cm4gKDxDb21wb25lbnQgcm91dGVyPXtoaXN0b3J5fSB7Li4ucHJvcHN9Lz4pXG5cdFx0fVxuXG5cblx0XHRjb25zdCBhbGxSZWR1Y2Vycz1jb21iaW5lUmVkdWNlcnMoT2JqZWN0LmFzc2lnbih7cm91dGluZzpyb3V0ZXJSZWR1Y2VyfSxSRURVQ0VSLEFjY291bnQuUkVEVUNFUiwgcmVkdWNlcnMpKVxuXHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XG5cdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcnMpKSlcblx0XHRwcm9wcy5oaXN0b3J5PXN5bmNIaXN0b3J5V2l0aFN0b3JlKHByb3BzLmhpc3Rvcnksc3RvcmUpXG5cdFx0XG4gICAgICAgIHJldHVybiByZW5kZXIoKFxuICAgICAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgICAgICAgICA8Um91dGVyIGNyZWF0ZUVsZW1lbnQ9e2RlZmF1bHRDcmVhdGVFbGVtZW50fSB7Li4ucHJvcHN9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3JvdXRlc31cbiAgICAgICAgICAgICAgICAgICAgPC9Sb3V0ZXI+XG4gICAgICAgICAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICAgICAgICksY29udGFpbmVyKVxuICAgIH1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oUWlsaUFwcCx7QUNUSU9OLFJFRFVDRVJ9KVxuIl19