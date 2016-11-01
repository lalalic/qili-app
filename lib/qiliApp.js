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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJlcnJvciIsInR1dG9yaWFsaXplZCIsInR5cGUiLCJwYXlsb2FkIiwidXNlciIsIlVTRVJfQ0hBTkdFRCIsIlRVVE9SSUFMSVpFRCIsIlJFRFVDRVIiLCJzdGF0ZSIsImluaXRlZCIsImN1cnJlbnQiLCJpbml0ZWRFcnJvciIsIk9iamVjdCIsImFzc2lnbiIsIlFpbGlBcHAiLCJwcm9wcyIsInNlcnZpY2UiLCJhcHBJZCIsIkVycm9yIiwiaW5pdEFwcCIsImluaXQiLCJ0aXRsZSIsImRpc3BhdGNoIiwiZG9jdW1lbnQiLCJlIiwicmVmcyIsIm1zZyIsInNob3ciLCJsb2FkaW5nIiwidGhlbiIsIm9uIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZXMiLCJyZWR1Y2VycyIsImNvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImlkIiwiYm9keSIsImFwcGVuZENoaWxkIiwic3R5bGUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiaGVpZ2h0IiwiaGlzdG9yeSIsImRlZmF1bHRDcmVhdGVFbGVtZW50IiwiQ29tcG9uZW50IiwicGFyYW1zIiwiYWxsUmVkdWNlcnMiLCJyb3V0aW5nIiwiY29tcG9zZUVuaGFuY2VycyIsIl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyIsIm1pZGRsZXdhcnMiLCJzdG9yZSIsImRlZmF1bHRQcm9wcyIsInByb3BzVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmci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QjlDLGFBQVMsZ0JBQU0yQyxTQUFOLENBQWdCRztBQUhQLENBbEdMLFNBQWQ7O2tCQTZJUTlELE9BQU9DLE1BQVAsQ0FBY0MsT0FBZCxFQUFzQixFQUFDaEIsY0FBRCxFQUFRUyxnQkFBUixFQUF0QixDIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxuXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IHtjcmVhdGVTdG9yZSxjb21iaW5lUmVkdWNlcnMsIGFwcGx5TWlkZGxld2FyZSxjb21wb3NlfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7c3luY0hpc3RvcnlXaXRoU3RvcmUsIHJvdXRlclJlZHVjZXJ9IGZyb20gJ3JlYWN0LXJvdXRlci1yZWR1eCdcbmltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcblxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcbmltcG9ydCBsaWdodEJhc2VUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvYmFzZVRoZW1lcy9saWdodEJhc2VUaGVtZSdcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5cbmNvbnN0IG11aVRoZW1lPWdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lKVxuXG5jb25zdCBET01BSU49XCJxaWxpQXBwXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdElOSVRfQVBQKGVycm9yLHR1dG9yaWFsaXplZCl7XG5cdFx0aWYoISFlcnJvcil7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRFcnJvcmBcblx0XHRcdFx0LHBheWxvYWQ6e3VzZXIsZXJyb3J9XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOmBAQCR7RE9NQUlOfS9pbml0ZWRgXG5cdFx0XHRcdCxwYXlsb2FkOnt0dXRvcmlhbGl6ZWR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdCxVU0VSX0NIQU5HRUQ6e1xuICAgICAgICB0eXBlOmBAQCR7RE9NQUlOfS9VU0VSX0NIQU5HRURgXG5cdH0sVFVUT1JJQUxJWkVEOntcbiAgICAgICAgdHlwZTpgQEAke0RPTUFJTn0vVFVUT1JJQUxJWkVEYFxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcbiAgICBbRE9NQUlOXTooc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgYEBAJHtET01BSU59L2luaXRlZGA6XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRpbml0ZWQ6dHJ1ZVxuXHRcdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdFx0LHR1dG9yaWFsaXplZDpwYXlsb2FkLnR1dG9yaWFsaXplZFxuXHRcdFx0fVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vaW5pdGVkRXJyb3JgOlxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0aW5pdGVkOmZhbHNlXG5cdFx0XHRcdCx1c2VyOlVzZXIuY3VycmVudFxuXHRcdFx0XHQsaW5pdGVkRXJyb3I6cGF5bG9hZC5lcnJvclxuXHRcdFx0fVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vVVNFUl9DSEFOR0VEYDpcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGluaXRlZDohIVVzZXIuY3VycmVudFxuXHRcdFx0XHQsdXNlcjpVc2VyLmN1cnJlbnRcblx0XHRcdFx0LHR1dG9yaWFsaXplZDpzdGF0ZS50dXRvcmlhbGl6ZWRcblx0XHRcdH1cblx0XHRjYXNlIGBAQCR7RE9NQUlOfS9UVVRPUklBTElaRURgOlxuXHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse3R1dG9yaWFsaXplZDp0cnVlfSlcblx0XHR9XG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IFFpbGlBcHA9Y29ubmVjdChzdGF0ZT0+c3RhdGVbRE9NQUlOXSkoXG5jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXG4gICAgICAgIHN1cHBvcnRUYXAoKVxuXG4gICAgICAgIGNvbnN0IHtzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuXG4gICAgICAgIGlmKCFhcHBJZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG4gICAgICAgIGlmKCFzZXJ2aWNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWQsIHRpdGxlLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGlmKHRpdGxlKVxuXHRcdFx0ZG9jdW1lbnQudGl0bGU9dGl0bGVcblxuICAgICAgICBpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG4gICAgICAgICAgICAudGhlbigodHV0b3JpYWxpemVkPXRydWUpPT57XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChudWxsLCEhdHV0b3JpYWxpemVkKSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQpKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGxldCBzZWxmPXRoaXNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG11aVRoZW1lXG4gICAgICAgICAgICAsc2hvd01lc3NhZ2UoKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICxsb2FkaW5nKG9wZW4pe1xuICAgICAgICAgICAgICAgIHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cdHNob3dNZXNzYWdlKCl7XG5cdFx0dGhpcy5yZWZzLm1zZy5zaG93KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2luaXRlZCwgaW5pdGVkRXJyb3IsIHVzZXIsIHR1dG9yaWFsaXplZCwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRsZXQgY29udGVudFxuXG4gICAgICAgIGlmKCFpbml0ZWQpe1xuICAgICAgICAgICAgaWYoaW5pdGVkRXJyb3IpXG4gICAgICAgICAgICAgICAgY29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxuICAgICAgICB9ZWxzZSBpZighdXNlcil7XG4gICAgICAgICAgICBpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXG5cbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IC8+KVxuICAgICAgICB9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgdXNlcj17dXNlcn0vPilcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgY29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TG9hZGluZyByZWY9XCJsb2FkaW5nXCIgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH1cblxuXG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHRpbml0KCl7fSxcblx0XHR0dXRvcmlhbDpbXVxuXHR9XG5cblx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0aW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHR0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0dGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICBzaG93TWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuICAgIHN0YXRpYyByZW5kZXIocm91dGVzLCByZWR1Y2Vycz17fSwgLi4ubWlkZGxld2Fycyl7XG5cdFx0Y29uc3QgcHJvcHM9e31cbiAgICAgICAgbGV0IGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbiAgICAgICAgaWYoIWNvbnRhaW5lcil7XG4gICAgICAgICAgICBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNvbnRhaW5lci5pZD0nYXBwJ1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG4gICAgICAgIHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG4gICAgICAgIGlmKCFwcm9wcy5oaXN0b3J5KVxuICAgICAgICAgICAgcHJvcHMuaGlzdG9yeT1oYXNoSGlzdG9yeVxuXG5cdFx0Y29uc3QgZGVmYXVsdENyZWF0ZUVsZW1lbnQ9KENvbXBvbmVudCxwcm9wcyk9Pntcblx0XHRcdGNvbnN0IHtoaXN0b3J5LHBhcmFtc309cHJvcHNcblx0XHRcdHJldHVybiAoPENvbXBvbmVudCByb3V0ZXI9e2hpc3Rvcnl9IHsuLi5wcm9wc30vPilcblx0XHR9XG5cblxuXHRcdGNvbnN0IGFsbFJlZHVjZXJzPWNvbWJpbmVSZWR1Y2VycyhPYmplY3QuYXNzaWduKHtyb3V0aW5nOnJvdXRlclJlZHVjZXJ9LFJFRFVDRVIsQWNjb3VudC5SRURVQ0VSLCByZWR1Y2VycykpXG5cdFx0Y29uc3QgY29tcG9zZUVuaGFuY2VycyA9IHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZTtcblx0XHRjb25zdCBzdG9yZT1jcmVhdGVTdG9yZShhbGxSZWR1Y2VycywgY29tcG9zZUVuaGFuY2VycyhhcHBseU1pZGRsZXdhcmUodGh1bmssLi4ubWlkZGxld2FycykpKVxuXHRcdHByb3BzLmhpc3Rvcnk9c3luY0hpc3RvcnlXaXRoU3RvcmUocHJvcHMuaGlzdG9yeSxzdG9yZSlcblx0XHRcbiAgICAgICAgcmV0dXJuIHJlbmRlcigoXG4gICAgICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZXIgY3JlYXRlRWxlbWVudD17ZGVmYXVsdENyZWF0ZUVsZW1lbnR9IHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm91dGVzfVxuICAgICAgICAgICAgICAgICAgICA8L1JvdXRlcj5cbiAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgKSxjb250YWluZXIpXG4gICAgfVxufSlcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihRaWxpQXBwLHtBQ1RJT04sUkVEVUNFUn0pXG4iXX0=