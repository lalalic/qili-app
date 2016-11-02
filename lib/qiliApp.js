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
                    _extends({ createElement: defaultCreateElement, onUpdate: function onUpdate(a) {
                            return console.log('router state updated');
                        } }, props),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJlcnJvciIsInR1dG9yaWFsaXplZCIsInR5cGUiLCJwYXlsb2FkIiwidXNlciIsIlVTRVJfQ0hBTkdFRCIsIlRVVE9SSUFMSVpFRCIsIlJFRFVDRVIiLCJzdGF0ZSIsImluaXRlZCIsImN1cnJlbnQiLCJpbml0ZWRFcnJvciIsIk9iamVjdCIsImFzc2lnbiIsIlFpbGlBcHAiLCJwdXJlIiwid2l0aFJlZiIsInByb3BzIiwic2VydmljZSIsImFwcElkIiwiRXJyb3IiLCJpbml0QXBwIiwiaW5pdCIsInRpdGxlIiwiZGlzcGF0Y2giLCJkb2N1bWVudCIsImUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwib24iLCJtZXNzYWdlIiwic2VsZiIsInNob3dNZXNzYWdlIiwiYXJndW1lbnRzIiwib3BlbiIsImNvbnRlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJ0dXRvcmlhbCIsImxlbmd0aCIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlcyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5IiwiZGVmYXVsdENyZWF0ZUVsZW1lbnQiLCJDb21wb25lbnQiLCJwYXJhbXMiLCJhbGxSZWR1Y2VycyIsInJvdXRpbmciLCJjb21wb3NlRW5oYW5jZXJzIiwiX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIiwibWlkZGxld2FycyIsInN0b3JlIiwiY29uc29sZSIsImxvZyIsImRlZmF1bHRQcm9wcyIsInByb3BzVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiZnVuYyIsImFycmF5IiwiY2hpbGRDb250ZXh0VHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVMsb0RBQWY7O0FBRUEsSUFBTUMsU0FBTyxTQUFiOztBQUVPLElBQU1DLDBCQUFPO0FBQ25CQyxZQURtQixvQkFDVkMsS0FEVSxFQUNKQyxZQURJLEVBQ1M7QUFDM0IsWUFBRyxDQUFDLENBQUNELEtBQUwsRUFBVztBQUNWLG1CQUFPO0FBQ05FLDZCQUFVTCxNQUFWLGlCQURNO0FBRUxNLHlCQUFRLEVBQUNDLFVBQUQsRUFBTUosWUFBTjtBQUZILGFBQVA7QUFJQSxTQUxELE1BS0s7QUFDSixtQkFBTztBQUNORSw2QkFBVUwsTUFBVixZQURNO0FBRUxNLHlCQUFRLEVBQUNGLDBCQUFEO0FBRkgsYUFBUDtBQUlBO0FBQ0QsS0Fia0I7QUFjbEJJLGtCQUFhO0FBQ1BILHFCQUFVTCxNQUFWO0FBRE8sS0FkSyxFQWdCakJTLGNBQWE7QUFDUkoscUJBQVVMLE1BQVY7QUFEUTtBQWhCSSxDQUFiOztBQXFCQSxJQUFNVSxnREFDUlYsTUFEUSxFQUNBLFlBQTJCO0FBQUEsUUFBMUJXLEtBQTBCLHVFQUFwQixFQUFvQjtBQUFBO0FBQUEsUUFBaEJOLElBQWdCLFFBQWhCQSxJQUFnQjtBQUFBLFFBQVhDLE9BQVcsUUFBWEEsT0FBVzs7QUFDdEMsWUFBT0QsSUFBUDtBQUNBLG9CQUFVTCxNQUFWO0FBQ0MsbUJBQU87QUFDTlksd0JBQU8sSUFERDtBQUVMTCxzQkFBSyxTQUFLTSxPQUZMO0FBR0xULDhCQUFhRSxRQUFRRjtBQUhoQixhQUFQO0FB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LEtBSlI7QUFLakJ4RCxXQUFPLGdCQUFNb0QsU0FBTixDQUFnQkM7QUFMTixDQTFGRSxTQWtHYkksaUJBbEdhLEdBa0dLO0FBQ3hCcEYsY0FBUyxnQkFBTStFLFNBQU4sQ0FBZ0JNLE1BQWhCLENBQXVCSixVQURSO0FBRWxCMUMsaUJBQWEsZ0JBQU13QyxTQUFOLENBQWdCRyxJQUZYO0FBR2xCaEQsYUFBUyxnQkFBTTZDLFNBQU4sQ0FBZ0JHO0FBSFAsQ0FsR0wsU0FBZDs7a0JBNklRbEUsT0FBT0MsTUFBUCxDQUFjQyxPQUFkLEVBQXNCLEVBQUNoQixjQUFELEVBQVFTLGdCQUFSLEVBQXRCLEMiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge2NyZWF0ZVN0b3JlLGNvbWJpbmVSZWR1Y2VycywgYXBwbHlNaWRkbGV3YXJlLGNvbXBvc2V9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtzeW5jSGlzdG9yeVdpdGhTdG9yZSwgcm91dGVyUmVkdWNlcn0gZnJvbSAncmVhY3Qtcm91dGVyLXJlZHV4J1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi9jb21wb25lbnRzL3R1dG9yaWFsXCJcblxuY29uc3QgbXVpVGhlbWU9Z2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUpXG5cbmNvbnN0IERPTUFJTj1cInFpbGlBcHBcIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsdHV0b3JpYWxpemVkKXtcblx0XHRpZighIWVycm9yKXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZEVycm9yYFxuXHRcdFx0XHQscGF5bG9hZDp7dXNlcixlcnJvcn1cblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6YEBAJHtET01BSU59L2luaXRlZGBcblx0XHRcdFx0LHBheWxvYWQ6e3R1dG9yaWFsaXplZH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp7XG4gICAgICAgIHR5cGU6YEBAJHtET01BSU59L1VTRVJfQ0hBTkdFRGBcblx0fSxUVVRPUklBTElaRUQ6e1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuICAgIFtET01BSU5dOihzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkYDpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGluaXRlZDp0cnVlXG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnBheWxvYWQudHV0b3JpYWxpemVkXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmA6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpbml0ZWQ6ZmFsc2Vcblx0XHRcdFx0LHVzZXI6VXNlci5jdXJyZW50XG5cdFx0XHRcdCxpbml0ZWRFcnJvcjpwYXlsb2FkLmVycm9yXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aW5pdGVkOiEhVXNlci5jdXJyZW50XG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsdHV0b3JpYWxpemVkOnN0YXRlLnR1dG9yaWFsaXplZFxuXHRcdFx0fVxuXHRcdGNhc2UgYEBAJHtET01BSU59L1RVVE9SSUFMSVpFRGA6XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7dHV0b3JpYWxpemVkOnRydWV9KVxuXHRcdH1cbiAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZVtET01BSU5dLG51bGwsbnVsbCx7cHVyZTp0cnVlLHdpdGhSZWY6dHJ1ZX0pKFxuY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcblxuICAgICAgICBjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZih0aXRsZSlcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKHR1dG9yaWFsaXplZD10cnVlKT0+e1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsICgpPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBsZXQgc2VsZj10aGlzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtdWlUaGVtZVxuICAgICAgICAgICAgLHNob3dNZXNzYWdlKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAsbG9hZGluZyhvcGVuKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXHRzaG93TWVzc2FnZSgpe1xuXHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdH1cblxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtpbml0ZWQsIGluaXRlZEVycm9yLCB1c2VyLCB0dXRvcmlhbGl6ZWQsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGNvbnRlbnRcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiaW5pdGlhbGl6aW5nLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIXR1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiAoPFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PmRpc3BhdGNoKEFDVElPTi5UVVRPUklBTElaRUQpfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cblxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0aW5pdCgpe30sXG5cdFx0dHV0b3JpYWw6W11cblx0fVxuXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0YXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0dHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgc2hvd01lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlcywgcmVkdWNlcnM9e30sIC4uLm1pZGRsZXdhcnMpe1xuXHRcdGNvbnN0IHByb3BzPXt9XG4gICAgICAgIGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgICAgIGlmKCFjb250YWluZXIpe1xuICAgICAgICAgICAgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250YWluZXIuaWQ9J2FwcCdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICB9XG4gICAgICAgIGxldCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuICAgICAgICBzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuICAgICAgICBpZighcHJvcHMuaGlzdG9yeSlcbiAgICAgICAgICAgIHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuXHRcdGNvbnN0IGRlZmF1bHRDcmVhdGVFbGVtZW50PShDb21wb25lbnQscHJvcHMpPT57XG5cdFx0XHRjb25zdCB7aGlzdG9yeSxwYXJhbXN9PXByb3BzXG5cdFx0XHRyZXR1cm4gKDxDb21wb25lbnQgcm91dGVyPXtoaXN0b3J5fSB7Li4ucHJvcHN9Lz4pXG5cdFx0fVxuXG5cblx0XHRjb25zdCBhbGxSZWR1Y2Vycz1jb21iaW5lUmVkdWNlcnMoT2JqZWN0LmFzc2lnbih7cm91dGluZzpyb3V0ZXJSZWR1Y2VyfSxSRURVQ0VSLEFjY291bnQuUkVEVUNFUiwgcmVkdWNlcnMpKVxuXHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XG5cdFx0Y29uc3Qgc3RvcmU9Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKHRodW5rLC4uLm1pZGRsZXdhcnMpKSlcblx0XHRwcm9wcy5oaXN0b3J5PXN5bmNIaXN0b3J5V2l0aFN0b3JlKHByb3BzLmhpc3Rvcnksc3RvcmUpXG5cdFx0XG4gICAgICAgIHJldHVybiByZW5kZXIoKFxuICAgICAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgICAgICAgICA8Um91dGVyIGNyZWF0ZUVsZW1lbnQ9e2RlZmF1bHRDcmVhdGVFbGVtZW50fSBvblVwZGF0ZT17YT0+Y29uc29sZS5sb2coJ3JvdXRlciBzdGF0ZSB1cGRhdGVkJyl9IHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm91dGVzfVxuICAgICAgICAgICAgICAgICAgICA8L1JvdXRlcj5cbiAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgKSxjb250YWluZXIpXG4gICAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihRaWxpQXBwLHtBQ1RJT04sUkVEVUNFUn0pXG4iXX0=