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

var _tutorial = require("./components/tutorial");

var _tutorial2 = _interopRequireDefault(_tutorial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var muiTheme = new _materialUi.Styles.ThemeManager().getCurrentTheme();
var _render = _react2.default.render;

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
                var __tutorialized = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

                _this2.setState({ __inited: true, __user: false && _db.User.current, __tutorialized: false });
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
            var _this3 = this;

            var content;
            var _state = this.state;
            var inited = _state.__inited;
            var initedError = _state.__initedError;
            var user = _state.__user;
            var __tutorialized = _state.__tutorialized;


            if (!inited) {
                if (initedError) content = "Initializing Error: " + initedError;else content = "...";
            } else if (!user) {
                if (!__tutorialized && this.props.tutorial) return _react2.default.createElement(_tutorial2.default, { slides: this.props.tutorial, onEnd: function onEnd(e) {
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
            var style = document.createElement("style");
            document.getElementsByTagName("head")[0].appendChild(style);
            style.innerHTML = ".page{min-height:" + window.innerHeight + "px}";
            container.style.height = window.innerHeight + 'px';

            return _reactRouter2.default.run(routes, history, function (Handler, state) {
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
    tutorial: _react2.default.PropTypes.array
};
App.defaultProps = Object.assign({
    service: "http://qili2.com/1/",
    init: function init() {},

    tutorial: ["images/icon.svg", "images/icon.svg"]
});

/**
*@Todo:
* positioning in big screen
    * FloatingActionButton : fixed position
    * Loading: cover FloatingActionButton
    * Messager: fixed bottom
*/
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFnQixNQUFoQixFQUFoQzs7QUFFQSxJQUFJLFVBQUosR0FBZTtBQUNYLGFBQVMsZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNULFdBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNOLFVBQUssZ0JBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNMLGNBQVMsZ0JBQU0sU0FBTixDQUFnQixLQUFoQjtDQUpiO0FBTUEsSUFBSSxZQUFKLEdBQWlCLE9BQU8sTUFBUCxDQUFjO0FBQzNCLGFBQVEscUJBQVI7QUFDQSwwQkFBTSxFQUZxQjs7QUFHM0IsY0FBUyxDQUFDLGlCQUFELEVBQW1CLGlCQUFuQixDQUFUO0NBSGEsQ0FBakIiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgUm91dGVyIGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5cbnZhciBtdWlUaGVtZT0obmV3IFN0eWxlcy5UaGVtZU1hbmFnZXIoKSkuZ2V0Q3VycmVudFRoZW1lKCksXG4gICAge3JlbmRlcn09UmVhY3RcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cbiAgICAgICAgc3VwcG9ydFRhcCgpXG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFhcHBJZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG4gICAgICAgIGlmKCFzZXJ2aWNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG4gICAgICAgICAgICAudGhlbigoX190dXRvcmlhbGl6ZWQ9dHJ1ZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6dHJ1ZSwgX191c2VyOmZhbHNlJiZVc2VyLmN1cnJlbnQsIF9fdHV0b3JpYWxpemVkOmZhbHNlfSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PnRoaXMuc2V0U3RhdGUoe19fdXNlcjpVc2VyLmN1cnJlbnR9KSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+dGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6ZmFsc2UsX191c2VyOlVzZXIuY3VycmVudCxfX2luaXRlZEVycm9yOmUubWVzc2FnZX0pKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge211aVRoZW1lfVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgY29udGVudCxcbiAgICAgICAgICAgIHtfX2luaXRlZDppbml0ZWQsIF9faW5pdGVkRXJyb3I6aW5pdGVkRXJyb3IsIF9fdXNlcjp1c2VyLCBfX3R1dG9yaWFsaXplZH09dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFpbml0ZWQpe1xuICAgICAgICAgICAgaWYoaW5pdGVkRXJyb3IpXG4gICAgICAgICAgICAgICAgY29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29udGVudD0gXCIuLi5cIlxuICAgICAgICB9ZWxzZSBpZighdXNlcil7XG4gICAgICAgICAgICBpZighX190dXRvcmlhbGl6ZWQgJiYgdGhpcy5wcm9wcy50dXRvcmlhbClcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT50aGlzLnNldFN0YXRlKHtfX3R1dG9yaWFsaXplZDp0cnVlfSl9Lz4pXG5cbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IC8+KVxuICAgICAgICB9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgdXNlcj17dXNlcn0vPilcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgY29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICAvL2luaGVyaXRzIHNob3VsZCByZXR1cm4gY29tcG9uZW50XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbmRlcihyb3V0ZXMpe1xuICAgICAgICB2YXIgaGlzdG9yeT1BcHAuaGlzdG9yeSB8fCBSb3V0ZXIuSGFzaExvY2F0aW9uXG4gICAgICAgIHZhciBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgICAgIGlmKCFjb250YWluZXIpe1xuICAgICAgICAgICAgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250YWluZXIuaWQ9J2FwcCdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICB9XG5cdFx0dmFyIHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcblx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG5cdFx0Y29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG5cbiAgICAgICAgcmV0dXJuIFJvdXRlci5ydW4ocm91dGVzLCBoaXN0b3J5LCAoSGFuZGxlciwgc3RhdGUpPT57XG4gICAgICAgICAgICByZW5kZXIoPEhhbmRsZXIgcGFyYW1zPXtzdGF0ZS5wYXJhbXN9IHF1ZXJ5PXtzdGF0ZS5xdWVyeX0vPiwgY29udGFpbmVyKVxuICAgICAgICB9KVxuICAgIH1cbn07XG5cbkFwcC5jaGlsZENvbnRleHRUeXBlcz17bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuQXBwLnByb3BzVHlwZXM9e1xuICAgIHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgaW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcbn1cbkFwcC5kZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbih7XG4gICAgc2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcbiAgICBpbml0KCl7fSxcbiAgICB0dXRvcmlhbDpbXCJpbWFnZXMvaWNvbi5zdmdcIixcImltYWdlcy9pY29uLnN2Z1wiXVxufSlcblxuLyoqXG4qQFRvZG86XG4qIHBvc2l0aW9uaW5nIGluIGJpZyBzY3JlZW5cbiAgICAqIEZsb2F0aW5nQWN0aW9uQnV0dG9uIDogZml4ZWQgcG9zaXRpb25cbiAgICAqIExvYWRpbmc6IGNvdmVyIEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgKiBNZXNzYWdlcjogZml4ZWQgYm90dG9tXG4qL1xuIl19