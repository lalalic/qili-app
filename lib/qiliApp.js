"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _db = require("./db");

var _reactRouter = require("react-router");

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _messager = require("./components/messager");

var _messager2 = _interopRequireDefault(_messager);

var _loading = require("./components/loading");

var _loading2 = _interopRequireDefault(_loading);

var _materialUi = require("material-ui");

var _reactTapEventPlugin = require("react-tap-event-plugin");

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _account = require("./account");

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var muiTheme = new _materialUi.Styles.ThemeManager().getCurrentTheme();
var _render = _react2.default.render;


muiTheme.component.floatingActionButton.style = {
    opacity: 0.7, zIndex: 9
};

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

        (0, _reactTapEventPlugin2.default)();
        var _this$props = _this.props;
        var initApp = _this$props.init;
        var service = _this$props.service;
        var appId = _this$props.appId;
        var width = _this$props.width;

        _this.state = {
            __user: _db.User.current
        };

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

            (0, _db.init)(service, appId, initApp, function (e) {
                var type = arguments.length <= 1 || arguments[1] === undefined ? 'Error' : arguments[1];
                return _this2.refs.msg.show(e, type);
            }, this.refs.loading).then(function () {
                _this2.setState({ __inited: true, __user: _db.User.current });
                _db.User.on('change', function () {
                    return _this2.setState({ __user: _db.User.current });
                });
            }, function (e) {
                return _this2.setState({ __inited: false, __user: _db.User.current, __initedError: e.message });
            });
        }
    }, {
        key: "getChildContext",
        value: function getChildContext() {
            return { muiTheme: muiTheme };
        }
    }, {
        key: "render",
        value: function render() {
            var content;
            var _state = this.state;
            var inited = _state.__inited;
            var initedError = _state.__initedError;
            var user = _state.__user;


            if (!inited) {
                if (initedError) content = "Initializing Error: " + initedError;else content = "Initializing...";
            } else if (!user || !user.sessionToken) {
                content = _react2.default.createElement(_account2.default, null);
            } else {
                content = this.renderContent();
            }

            return _react2.default.createElement(
                "div",
                { className: "withFootbar" },
                _react2.default.createElement(
                    "div",
                    { id: "container" },
                    content,
                    _react2.default.createElement(_messager2.default, { ref: "msg", className: "sticky bottom left" }),
                    _react2.default.createElement(_loading2.default, { ref: "loading", className: "sticky top right" })
                )
            );
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            //inherits should return component
        }
    }], [{
        key: "render",
        value: function render(routes) {
            var history = App.history || _reactRouter2.default.HashLocation;
            var container = document.getElementById('app');
            if (!container) {
                container = document.createElement('div');
                container.id = 'app';
                document.body.appendChild(container);
            }

            return _reactRouter2.default.run(routes, history, function (Handler, state) {
                var style = document.createElement("style");
                document.getElementsByTagName("head")[0].appendChild(style);
                style.innerHTML = ".page{min-height:" + window.innerHeight + "px}";

                container.style.height = window.innerHeight + 'px';
                _render(_react2.default.createElement(Handler, { params: state.params, query: state.query }), container);
            });
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;
;

App.childContextTypes = { muiTheme: _react2.default.PropTypes.object };

App.propsTypes = {
    service: _react2.default.PropTypes.string.isRequired,
    appId: _react2.default.PropTypes.string.isRequired,
    init: _react2.default.PropTypes.func,
    width: _react2.default.PropTypes.number
};
App.defaultProps = Object.assign({
    service: "http://qili2.com/1/",
    init: function init() {},

    width: 960
}, global.__test);

/**
*@Todo:
* positioning in big screen
    * FloatingActionButton : fixed position
    * Loading: cover FloatingActionButton
    * Messager: fixed bottom
*/
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LE1BQVAsQ0FBYztBQUMzQixhQUFRLHFCQUFSO0FBQ0EsMEJBQU0sRUFGcUI7O0FBRzNCLFdBQU0sR0FBTjtDQUhhLEVBSWYsT0FBTyxNQUFQLENBSkYiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgUm91dGVyIGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5cbnZhciBtdWlUaGVtZT0obmV3IFN0eWxlcy5UaGVtZU1hbmFnZXIoKSkuZ2V0Q3VycmVudFRoZW1lKCksXG4gICAge3JlbmRlcn09UmVhY3RcblxubXVpVGhlbWUuY29tcG9uZW50LmZsb2F0aW5nQWN0aW9uQnV0dG9uLnN0eWxlPXtcbiAgIG9wYWNpdHk6MC43LCB6SW5kZXg6OVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB3aWR0aH09dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFhcHBJZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG4gICAgICAgIGlmKCFzZXJ2aWNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6dHJ1ZSwgX191c2VyOlVzZXIuY3VycmVudH0pXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsICgpPT50aGlzLnNldFN0YXRlKHtfX3VzZXI6VXNlci5jdXJyZW50fSkpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZSk9PnRoaXMuc2V0U3RhdGUoe19faW5pdGVkOmZhbHNlLF9fdXNlcjpVc2VyLmN1cnJlbnQsX19pbml0ZWRFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHttdWlUaGVtZX1cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsXG4gICAgICAgICAgICB7X19pbml0ZWQ6aW5pdGVkLCBfX2luaXRlZEVycm9yOmluaXRlZEVycm9yLCBfX3VzZXI6dXNlcn09dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFpbml0ZWQpe1xuICAgICAgICAgICAgaWYoaW5pdGVkRXJyb3IpXG4gICAgICAgICAgICAgICAgY29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29udGVudD0gXCJJbml0aWFsaXppbmcuLi5cIlxuICAgICAgICB9ZWxzZSBpZighdXNlciB8fCAhdXNlci5zZXNzaW9uVG9rZW4pe1xuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQvPilcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgY29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIC8vaW5oZXJpdHMgc2hvdWxkIHJldHVybiBjb21wb25lbnRcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlcyl7XG4gICAgICAgIHZhciBoaXN0b3J5PUFwcC5oaXN0b3J5IHx8IFJvdXRlci5IYXNoTG9jYXRpb25cbiAgICAgICAgdmFyIGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbiAgICAgICAgaWYoIWNvbnRhaW5lcil7XG4gICAgICAgICAgICBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNvbnRhaW5lci5pZD0nYXBwJ1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUm91dGVyLnJ1bihyb3V0ZXMsIGhpc3RvcnksIChIYW5kbGVyLCBzdGF0ZSk9PntcbiAgICAgICAgICAgIHZhciBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcblxuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuICAgICAgICAgICAgcmVuZGVyKDxIYW5kbGVyIHBhcmFtcz17c3RhdGUucGFyYW1zfSBxdWVyeT17c3RhdGUucXVlcnl9Lz4sIGNvbnRhaW5lcilcbiAgICAgICAgfSlcbiAgICB9XG59O1xuXG5BcHAuY2hpbGRDb250ZXh0VHlwZXM9e211aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbkFwcC5wcm9wc1R5cGVzPXtcbiAgICBzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2lkdGg6UmVhY3QuUHJvcFR5cGVzLm51bWJlclxufVxuQXBwLmRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKHtcbiAgICBzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuICAgIGluaXQoKXt9LFxuICAgIHdpZHRoOjk2MFxufSxnbG9iYWwuX190ZXN0KVxuXG4vKipcbipAVG9kbzpcbiogcG9zaXRpb25pbmcgaW4gYmlnIHNjcmVlblxuICAgICogRmxvYXRpbmdBY3Rpb25CdXR0b24gOiBmaXhlZCBwb3NpdGlvblxuICAgICogTG9hZGluZzogY292ZXIgRmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAqIE1lc3NhZ2VyOiBmaXhlZCBib3R0b21cbiovXG4iXX0=