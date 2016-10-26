"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QiliApp = exports.ACTION = exports.REDUCER = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require("react-router");

var _redux = require("redux");

var _reactRedux = require("react-redux");

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

var muiTheme = (0, _getMuiTheme2.default)(_lightBaseTheme2.default);

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        (0, _reactTapEventPlugin2.default)();

        var _this$props = _this.props,
            service = _this$props.service,
            appId = _this$props.appId;


        if (!appId) throw new Error("Please give application key");

        if (!service) throw new Error("Please give service url");
        return _this;
    }

    _createClass(App, [{
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

                return _react2.default.createElement(Component, _extends({ router: history }, params, props));
            };

            var allReducers = (0, _redux.combineReducers)(Object.assign({}, REDUCER, reducers));
            var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

            for (var _len = arguments.length, middlewars = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                middlewars[_key - 3] = arguments[_key];
            }

            return (0, _reactDom.render)(_react2.default.createElement(
                _reactRedux.Provider,
                { store: (0, _redux.createStore)(allReducers, composeEnhancers(_redux.applyMiddleware.apply(undefined, middlewars))) },
                _react2.default.createElement(
                    _reactRouter.Router,
                    _extends({ createElement: defaultCreateElement }, props),
                    routes
                )
            ), container);
        }
    }]);

    return App;
}(_react.Component);

App.defaultProps = {
    service: "http://qili2.com/1/",
    init: function init() {},

    tutorial: []
};
App.propsTypes = {
    service: _react2.default.PropTypes.string.isRequired,
    appId: _react2.default.PropTypes.string.isRequired,
    init: _react2.default.PropTypes.func,
    tutorial: _react2.default.PropTypes.array,
    title: _react2.default.PropTypes.string
};
App.childContextTypes = {
    muiTheme: _react2.default.PropTypes.object.isRequired,
    showMessage: _react2.default.PropTypes.func,
    loading: _react2.default.PropTypes.func
};
App.contextTypes = {
    router: _react2.default.PropTypes.object
};
var REDUCER = exports.REDUCER = {
    __: function __() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { inited: false, user: _db.User.current };
        var action = arguments[1];

        switch (action.type) {
            case 'inited':
                return {
                    inited: true,
                    user: _db.User.current,
                    tutorialized: action.tutorialized
                };
                break;
            case 'initedError':
                return {
                    inited: false,
                    user: _db.User.current,
                    initedError: action.error
                };
                break;
            case 'USER_CHANGED':
                return {
                    inited: !!_db.User.current,
                    user: _db.User.current,
                    tutorialized: state.tutorialized
                };
            case 'TUTORIALIZED':
                state.tutorialized = true;
                return state;
            default:
                return state;
        }
    },
    account: _account.REDUCER
};

var ACTION = exports.ACTION = {
    INIT_APP: function INIT_APP(error, tutorialized) {
        if (!!error) {
            return {
                type: "initedError",
                user: user,
                error: error
            };
        } else {
            return {
                type: "inited",
                tutorialized: tutorialized
            };
        }
    },
    USER_CHANGED: {
        type: "USER_CHANGED"
    }, TUTORIALIZED: {
        type: "TUTORIALIZED"
    }
};

var QiliApp = exports.QiliApp = (0, _reactRedux.connect)(function (state) {
    return state.__;
})(App);

exports.default = QiliApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiQXBwIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJkaXNwYXRjaCIsImRvY3VtZW50IiwiZSIsInR5cGUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwidHV0b3JpYWxpemVkIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJvbiIsIlVTRVJfQ0hBTkdFRCIsIm1lc3NhZ2UiLCJzZWxmIiwic2hvd01lc3NhZ2UiLCJhcmd1bWVudHMiLCJvcGVuIiwiaW5pdGVkIiwiaW5pdGVkRXJyb3IiLCJ1c2VyIiwiY29udGVudCIsIkFycmF5IiwiaXNBcnJheSIsInR1dG9yaWFsIiwibGVuZ3RoIiwiVFVUT1JJQUxJWkVEIiwic2Vzc2lvblRva2VuIiwicmVuZGVyQ29udGVudCIsIm92ZXJmbG93WSIsImNoaWxkcmVuIiwicm91dGVzIiwicmVkdWNlcnMiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInN0eWxlIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsImhlaWdodCIsImhpc3RvcnkiLCJkZWZhdWx0Q3JlYXRlRWxlbWVudCIsIkNvbXBvbmVudCIsInBhcmFtcyIsImFsbFJlZHVjZXJzIiwiT2JqZWN0IiwiYXNzaWduIiwiUkVEVUNFUiIsImNvbXBvc2VFbmhhbmNlcnMiLCJfX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18iLCJtaWRkbGV3YXJzIiwiZGVmYXVsdFByb3BzIiwicHJvcHNUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCIsImNvbnRleHRUeXBlcyIsInJvdXRlciIsIl9fIiwic3RhdGUiLCJjdXJyZW50IiwiYWN0aW9uIiwiZXJyb3IiLCJhY2NvdW50IiwiUWlsaUFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBUyxvREFBZjs7SUFFTUMsRzs7O0FBQ0YsaUJBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw4R0FDUkEsS0FEUTs7QUFHZDs7QUFIYywwQkFLUyxNQUFLQSxLQUxkO0FBQUEsWUFLUEMsT0FMTyxlQUtQQSxPQUxPO0FBQUEsWUFLRUMsS0FMRixlQUtFQSxLQUxGOzs7QUFPZCxZQUFHLENBQUNBLEtBQUosRUFDSSxNQUFNLElBQUlDLEtBQUosQ0FBVSw2QkFBVixDQUFOOztBQUVKLFlBQUcsQ0FBQ0YsT0FBSixFQUNJLE1BQU0sSUFBSUUsS0FBSixDQUFVLHlCQUFWLENBQU47QUFYVTtBQVlqQjs7Ozs0Q0FFa0I7QUFBQTs7QUFBQSx5QkFDcUMsS0FBS0gsS0FEMUM7QUFBQSxnQkFDTEksT0FESyxVQUNWQyxJQURVO0FBQUEsZ0JBQ0lKLE9BREosVUFDSUEsT0FESjtBQUFBLGdCQUNhQyxLQURiLFVBQ2FBLEtBRGI7QUFBQSxnQkFDb0JJLEtBRHBCLFVBQ29CQSxLQURwQjtBQUFBLGdCQUMyQkMsUUFEM0IsVUFDMkJBLFFBRDNCOztBQUVyQixnQkFBR0QsS0FBSCxFQUNDRSxTQUFTRixLQUFULEdBQWVBLEtBQWY7O0FBRUssMEJBQUtMLE9BQUwsRUFBY0MsS0FBZCxFQUFxQkUsT0FBckIsRUFBOEIsVUFBQ0ssQ0FBRDtBQUFBLG9CQUFHQyxJQUFILHVFQUFRLE9BQVI7QUFBQSx1QkFBa0IsT0FBS0MsSUFBTCxDQUFVQyxHQUFWLENBQWNDLElBQWQsQ0FBbUJKLENBQW5CLEVBQXFCQyxJQUFy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QkFBSyxhQUFMO0FBQ0ksdUJBQU87QUFDSFUsNEJBQU8sS0FESjtBQUVGRSwwQkFBSyxTQUFLaUQsT0FGUjtBQUdGbEQsaUNBQVltRCxPQUFPQztBQUhqQixpQkFBUDtBQUtKO0FBQ0EsaUJBQUssY0FBTDtBQUNJLHVCQUFPO0FBQ0hyRCw0QkFBTyxDQUFDLENBQUMsU0FBS21ELE9BRFg7QUFFRmpELDBCQUFLLFNBQUtpRCxPQUZSO0FBR0Y3RCxrQ0FBYTRELE1BQU01RDtBQUhqQixpQkFBUDtBQUtWLGlCQUFLLGNBQUw7QUFDQzRELHNCQUFNNUQsWUFBTixHQUFtQixJQUFuQjtBQUNBLHVCQUFPNEQsS0FBUDtBQUNLO0FBQ0ksdUJBQU9BLEtBQVA7QUF6Qko7QUEyQkgsS0E3QmdCO0FBOEJwQkk7QUE5Qm9CLENBQWQ7O0FBaUNBLElBQU0vRCwwQkFBTztBQUNuQkMsWUFEbUIsb0JBQ1Y2RCxLQURVLEVBQ0ovRCxZQURJLEVBQ1M7QUFDM0IsWUFBRyxDQUFDLENBQUMrRCxLQUFMLEVBQVc7QUFDVixtQkFBTztBQUNOckUsc0JBQUssYUFEQztBQUVMa0IsMEJBRks7QUFHTG1EO0FBSEssYUFBUDtBQUtBLFNBTkQsTUFNSztBQUNKLG1CQUFPO0FBQ05yRSxzQkFBSyxRQURDO0FBRUxNO0FBRkssYUFBUDtBQUlBO0FBQ0QsS0Fka0I7QUFlbEJJLGtCQUFhO0FBQ2JWLGNBQUs7QUFEUSxLQWZLLEVBaUJqQndCLGNBQWE7QUFDZHhCLGNBQUs7QUFEUztBQWpCSSxDQUFiOztBQXNCQSxJQUFNdUUsNEJBQVEseUJBQVE7QUFBQSxXQUFPTCxNQUFNRCxFQUFiO0FBQUEsQ0FBUixFQUF5QjVFLEdBQXpCLENBQWQ7O2tCQUVRa0YsTyIsImZpbGUiOiJxaWxpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7Y3JlYXRlU3RvcmUsY29tYmluZVJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmUsY29tcG9zZX0gZnJvbSBcInJlZHV4XCJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQsIHtSRURVQ0VSIGFzIGFjY291bnRSZWR1Y2VyfSBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5cbmNvbnN0IG11aVRoZW1lPWdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lKVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcblxuICAgICAgICBjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZih0aXRsZSlcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKHR1dG9yaWFsaXplZD10cnVlKT0+e1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIXR1dG9yaWFsaXplZCkpXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsICgpPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBsZXQgc2VsZj10aGlzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtdWlUaGVtZVxuICAgICAgICAgICAgLHNob3dNZXNzYWdlKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAsbG9hZGluZyhvcGVuKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXHRzaG93TWVzc2FnZSgpe1xuXHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdH1cblxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtpbml0ZWQsIGluaXRlZEVycm9yLCB1c2VyLCB0dXRvcmlhbGl6ZWQsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0bGV0IGNvbnRlbnRcbiAgICAgICAgXG4gICAgICAgIGlmKCFpbml0ZWQpe1xuICAgICAgICAgICAgaWYoaW5pdGVkRXJyb3IpXG4gICAgICAgICAgICAgICAgY29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29udGVudD0gXCJpbml0aWFsaXppbmcuLi5cIlxuICAgICAgICB9ZWxzZSBpZighdXNlcil7XG4gICAgICAgICAgICBpZighdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRVVE9SSUFMSVpFRCl9Lz4pXG5cbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IC8+KVxuICAgICAgICB9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgdXNlcj17dXNlcn0vPilcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgY29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TG9hZGluZyByZWY9XCJsb2FkaW5nXCIgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgIH1cblxuXG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHRpbml0KCl7fSxcblx0XHR0dXRvcmlhbDpbXVxuXHR9XG5cblx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0aW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHR0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0dGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICBzaG93TWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG4gICAgc3RhdGljIHJlbmRlcihyb3V0ZXMsIHByb3BzPXt9LCByZWR1Y2Vycz17fSwgLi4ubWlkZGxld2Fycyl7XG4gICAgICAgIGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgICAgIGlmKCFjb250YWluZXIpe1xuICAgICAgICAgICAgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250YWluZXIuaWQ9J2FwcCdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICB9XG4gICAgICAgIGxldCBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuICAgICAgICBzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuICAgICAgICBpZighcHJvcHMuaGlzdG9yeSlcbiAgICAgICAgICAgIHByb3BzLmhpc3Rvcnk9aGFzaEhpc3Rvcnlcblx0XHRcblx0XHRjb25zdCBkZWZhdWx0Q3JlYXRlRWxlbWVudD0oQ29tcG9uZW50LHByb3BzKT0+e1xuXHRcdFx0Y29uc3Qge2hpc3RvcnkscGFyYW1zfT1wcm9wc1xuXHRcdFx0cmV0dXJuICg8Q29tcG9uZW50IHJvdXRlcj17aGlzdG9yeX0gey4uLnBhcmFtc30gey4uLnByb3BzfS8+KVxuXHRcdH1cblxuXHRcdGNvbnN0IGFsbFJlZHVjZXJzPWNvbWJpbmVSZWR1Y2VycyhPYmplY3QuYXNzaWduKHt9LFJFRFVDRVIscmVkdWNlcnMpKVxuXHRcdGNvbnN0IGNvbXBvc2VFbmhhbmNlcnMgPSB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fQ09NUE9TRV9fIHx8IGNvbXBvc2U7XG5cdFx0XG4gICAgICAgIHJldHVybiByZW5kZXIoKFxuICAgICAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17Y3JlYXRlU3RvcmUoYWxsUmVkdWNlcnMsIGNvbXBvc2VFbmhhbmNlcnMoYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcnMpKSl9PlxuICAgICAgICAgICAgICAgICAgICA8Um91dGVyIGNyZWF0ZUVsZW1lbnQ9e2RlZmF1bHRDcmVhdGVFbGVtZW50fSB7Li4ucHJvcHN9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3JvdXRlc31cbiAgICAgICAgICAgICAgICAgICAgPC9Sb3V0ZXI+XG4gICAgICAgICAgICAgICAgPC9Qcm92aWRlcj5cbiAgICAgICAgICAgICksY29udGFpbmVyKVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuICAgIF9fOihzdGF0ZT17aW5pdGVkOmZhbHNlLCB1c2VyOlVzZXIuY3VycmVudH0sYWN0aW9uKT0+e1xuICAgICAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlICdpbml0ZWQnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpbml0ZWQ6dHJ1ZVxuICAgICAgICAgICAgICAgICx1c2VyOlVzZXIuY3VycmVudFxuICAgICAgICAgICAgICAgICx0dXRvcmlhbGl6ZWQ6YWN0aW9uLnR1dG9yaWFsaXplZFxuICAgICAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdpbml0ZWRFcnJvcic6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGluaXRlZDpmYWxzZVxuICAgICAgICAgICAgICAgICx1c2VyOlVzZXIuY3VycmVudFxuICAgICAgICAgICAgICAgICxpbml0ZWRFcnJvcjphY3Rpb24uZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnVVNFUl9DSEFOR0VEJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaW5pdGVkOiEhVXNlci5jdXJyZW50XG4gICAgICAgICAgICAgICAgLHVzZXI6VXNlci5jdXJyZW50XG4gICAgICAgICAgICAgICAgLHR1dG9yaWFsaXplZDpzdGF0ZS50dXRvcmlhbGl6ZWRcbiAgICAgICAgICAgIH1cblx0XHRjYXNlICdUVVRPUklBTElaRUQnOlxuXHRcdFx0c3RhdGUudHV0b3JpYWxpemVkPXRydWVcblx0XHRcdHJldHVybiBzdGF0ZVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXG4gICAgICAgIH1cbiAgICB9LFxuXHRhY2NvdW50OiBhY2NvdW50UmVkdWNlclxufVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsdHV0b3JpYWxpemVkKXtcblx0XHRpZighIWVycm9yKXtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHR5cGU6XCJpbml0ZWRFcnJvclwiXG5cdFx0XHRcdCx1c2VyXG5cdFx0XHRcdCxlcnJvclxuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpcImluaXRlZFwiXG5cdFx0XHRcdCx0dXRvcmlhbGl6ZWRcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0LFVTRVJfQ0hBTkdFRDp7XG5cdFx0dHlwZTpcIlVTRVJfQ0hBTkdFRFwiXG5cdH0sVFVUT1JJQUxJWkVEOntcblx0XHR0eXBlOlwiVFVUT1JJQUxJWkVEXCJcblx0fVxufVxuXG5leHBvcnQgY29uc3QgUWlsaUFwcD1jb25uZWN0KHN0YXRlPT5zdGF0ZS5fXykoQXBwKVxuXG5leHBvcnQgZGVmYXVsdCBRaWxpQXBwXG4iXX0=