"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _qiliApp = require("./action/qiliApp");

var _qiliApp2 = require("./reducer/qiliApp");

var _qiliApp3 = _interopRequireDefault(_qiliApp2);

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

        var _this$props = _this.props;
        var service = _this$props.service;
        var appId = _this$props.appId;


        if (!appId) throw new Error("Please give application key");

        if (!service) throw new Error("Please give service url");
        return _this;
    }

    _createClass(App, [{
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
                var __tutorialized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                dispatch((0, _qiliApp.INIT_APP)(null, __tutorialized));
                _db.User.on('change', function () {
                    return dispatch(USER_CHNAGED);
                });
            }, function (e) {
                return dispatch((0, _qiliApp.INIT_APP)(e.message));
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
            var _this3 = this;

            var content;
            var _props2 = this.props;
            var inited = _props2.__inited;
            var initedError = _props2.__initedError;
            var user = _props2.__user;
            var __tutorialized = _props2.__tutorialized;


            if (!inited) {
                if (initedError) content = "Initializing Error: " + initedError;else content = "...";
            } else if (!user) {
                if (!__tutorialized && Array.isArray(this.props.tutorial) && this.props.tutorial.length) return _react2.default.createElement(_tutorial2.default, { slides: this.props.tutorial, onEnd: function onEnd(e) {
                        return _this3.setState({ __tutorialized: true });
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
            var reducer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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

            return (0, _reactDom.render)(_react2.default.createElement(
                _reactRedux.Provider,
                { store: (0, _redux.createStore)((0, _redux.combineReducers)(Object.assign({ __: _qiliApp3.default }, reducer))) },
                _react2.default.createElement(
                    _reactRouter.Router,
                    props,
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
exports.default = App = (0, _reactRedux.connect)(function (state) {
    var _state$__ = state.__;
    var __inited = _state$__.__inited;
    var __initedError = _state$__.__initedError;
    var __user = _state$__.__user;
    var __tutorialized = _state$__.__tutorialized;

    return { __inited: __inited, __initedError: __initedError, __user: __user, __tutorialized: __tutorialized };
})(App);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiQXBwIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJkaXNwYXRjaCIsImRvY3VtZW50IiwiZSIsInR5cGUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwiX190dXRvcmlhbGl6ZWQiLCJvbiIsIlVTRVJfQ0hOQUdFRCIsIm1lc3NhZ2UiLCJzZWxmIiwic2hvd01lc3NhZ2UiLCJhcmd1bWVudHMiLCJvcGVuIiwiaW5pdGVkIiwiX19pbml0ZWQiLCJpbml0ZWRFcnJvciIsIl9faW5pdGVkRXJyb3IiLCJ1c2VyIiwiX191c2VyIiwiY29udGVudCIsIkFycmF5IiwiaXNBcnJheSIsInR1dG9yaWFsIiwibGVuZ3RoIiwic2V0U3RhdGUiLCJzZXNzaW9uVG9rZW4iLCJyZW5kZXJDb250ZW50Iiwib3ZlcmZsb3dZIiwiY2hpbGRyZW4iLCJyb3V0ZXMiLCJyZWR1Y2VyIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5IiwiT2JqZWN0IiwiYXNzaWduIiwiX18iLCJkZWZhdWx0UHJvcHMiLCJwcm9wc1R5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJhcnJheSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0IiwiY29udGV4dFR5cGVzIiwicm91dGVyIiwic3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7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TUFBSSx5QkFBUSxpQkFBTztBQUFBLG9CQUM4QnNFLE1BQU1aLEVBRHBDO0FBQUEsUUFDbkJoQyxRQURtQixhQUNuQkEsUUFEbUI7QUFBQSxRQUNURSxhQURTLGFBQ1RBLGFBRFM7QUFBQSxRQUNNRSxNQUROLGFBQ01BLE1BRE47QUFBQSxRQUNjYixjQURkLGFBQ2NBLGNBRGQ7O0FBRTFCLFdBQU8sRUFBQ1Msa0JBQUQsRUFBV0UsNEJBQVgsRUFBMEJFLGNBQTFCLEVBQWtDYiw4QkFBbEMsRUFBUDtBQUNILENBSGMsRUFHWmpCLEdBSFksQyIsImZpbGUiOiJxaWxpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7Y3JlYXRlU3RvcmUsY29tYmluZVJlZHVjZXJzfSBmcm9tIFwicmVkdXhcIlxuaW1wb3J0IHtQcm92aWRlciwgY29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcbmltcG9ydCBsaWdodEJhc2VUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvYmFzZVRoZW1lcy9saWdodEJhc2VUaGVtZSdcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5cbmltcG9ydCB7SU5JVF9BUFAsIFVTRVJfQ0hBTkdFRH0gZnJvbSBcIi4vYWN0aW9uL3FpbGlBcHBcIlxuaW1wb3J0IFFJTElfQVBQIGZyb20gXCIuL3JlZHVjZXIvcWlsaUFwcFwiXG5cbmNvbnN0IG11aVRoZW1lPWdldE11aVRoZW1lKGxpZ2h0QmFzZVRoZW1lKVxuXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcblxuICAgICAgICBjb25zdCB7c2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRpZih0aXRsZSlcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKF9fdHV0b3JpYWxpemVkPXRydWUpPT57XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKElOSVRfQVBQKG51bGwsX190dXRvcmlhbGl6ZWQpKVxuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCAoKT0+ZGlzcGF0Y2goVVNFUl9DSE5BR0VEKSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+ZGlzcGF0Y2goSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGxldCBzZWxmPXRoaXNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG11aVRoZW1lXG4gICAgICAgICAgICAsc2hvd01lc3NhZ2UoKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICxsb2FkaW5nKG9wZW4pe1xuICAgICAgICAgICAgICAgIHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cdHNob3dNZXNzYWdlKCl7XG5cdFx0dGhpcy5yZWZzLm1zZy5zaG93KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsXG4gICAgICAgICAgICB7X19pbml0ZWQ6aW5pdGVkLCBfX2luaXRlZEVycm9yOmluaXRlZEVycm9yLCBfX3VzZXI6dXNlciwgX190dXRvcmlhbGl6ZWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIV9fdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+dGhpcy5zZXRTdGF0ZSh7X190dXRvcmlhbGl6ZWQ6dHJ1ZX0pfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlcywgcHJvcHM9e30sIHJlZHVjZXI9e30pe1xuICAgICAgICB2YXIgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuXHRcdHZhciBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cdFx0c3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxuXHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuICAgICAgICBpZighcHJvcHMuaGlzdG9yeSlcbiAgICAgICAgICAgIHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuICAgICAgICByZXR1cm4gcmVuZGVyKChcbiAgICAgICAgICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e2NyZWF0ZVN0b3JlKGNvbWJpbmVSZWR1Y2VycyhPYmplY3QuYXNzaWduKHtfXzpRSUxJX0FQUH0scmVkdWNlcikpKX0+XG4gICAgICAgICAgICAgICAgICAgIDxSb3V0ZXIgey4uLnByb3BzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyb3V0ZXN9XG4gICAgICAgICAgICAgICAgICAgIDwvUm91dGVyPlxuICAgICAgICAgICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICAgICAgICApLGNvbnRhaW5lcilcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHRpbml0KCl7fSxcblx0XHR0dXRvcmlhbDpbXVxuXHR9XG5cblx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0aW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHR0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0dGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICBzaG93TWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA9Y29ubmVjdChzdGF0ZT0+e1xuICAgICAgICBjb25zdCB7X19pbml0ZWQsIF9faW5pdGVkRXJyb3IsIF9fdXNlciwgX190dXRvcmlhbGl6ZWR9PXN0YXRlLl9fXG4gICAgICAgIHJldHVybiB7X19pbml0ZWQsIF9faW5pdGVkRXJyb3IsIF9fdXNlciwgX190dXRvcmlhbGl6ZWR9XG4gICAgfSkoQXBwKVxuIl19