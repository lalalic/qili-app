"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _db = require("./db");

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

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _getMuiTheme = require("material-ui/styles/getMuiTheme");

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _lightBaseTheme = require("material-ui/styles/baseThemes/lightBaseTheme");

var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        key: "inited",
        value: function inited() {
            console.log("inited");
        }
    }, {
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

                _this2.setState({ __inited: true, __user: _db.User.current, __tutorialized: __tutorialized });
                _db.User.on('change', function () {
                    return _this2.setState({ __user: _db.User.current });
                });
                _this2.inited();
            }, function (e) {
                return _this2.setState({ __inited: false, __user: _db.User.current, __initedError: e.message });
            });
        }
    }, {
        key: "getChildContext",
        value: function getChildContext() {
            return { muiTheme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default) };
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
            //inherits should return component
        }
    }], [{
        key: "render",
        value: function render(routes) {
            var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
                _reactRouter.Router,
                props,
                routes
            ), container);
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;
;


App.childContextTypes = { muiTheme: _react2.default.PropTypes.object.isRequired };
App.contextTypes = { router: _react2.default.PropTypes.object };

App.propsTypes = {
    service: _react2.default.PropTypes.string.isRequired,
    appId: _react2.default.PropTypes.string.isRequired,
    init: _react2.default.PropTypes.func,
    tutorial: _react2.default.PropTypes.array
};
App.defaultProps = Object.assign({
    service: "http://qili2.com/1/",
    init: function init() {},

    tutorial: []
});

/**
*@Todo:
* positioning in big screen
    * FloatingActionButton : fixed position
    * Loading: cover FloatingActionButton
    * Messager: fixed bottom
*/
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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dkIsRUFBaEM7QUFDQSxJQUFJLFlBQUosR0FBaUIsRUFBQyxRQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsRUFBMUI7O0FBRUEsSUFBSSxVQUFKLEdBQWU7QUFDWCxhQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDVCxXQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDTixVQUFLLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDTCxjQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEI7Q0FKYjtBQU1BLElBQUksWUFBSixHQUFpQixPQUFPLE1BQVAsQ0FBYztBQUMzQixhQUFRLHFCQUFSO0FBQ0EsMEJBQU0sRUFGcUI7O0FBRzNCLGNBQVMsRUFBVDtDQUhhLENBQWpCIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgVHV0b3JpYWwgZnJvbSBcIi4vY29tcG9uZW50cy90dXRvcmlhbFwiXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IGdldE11aVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9nZXRNdWlUaGVtZSdcbmltcG9ydCBsaWdodEJhc2VUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvYmFzZVRoZW1lcy9saWdodEJhc2VUaGVtZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cbiAgICAgICAgc3VwcG9ydFRhcCgpXG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFhcHBJZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG4gICAgICAgIGlmKCFzZXJ2aWNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcbiAgICB9XG5cdFxuXHRpbml0ZWQoKXtcblx0XHRjb25zb2xlLmxvZyhgaW5pdGVkYClcblx0fVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKF9fdHV0b3JpYWxpemVkPXRydWUpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe19faW5pdGVkOnRydWUsIF9fdXNlcjpVc2VyLmN1cnJlbnQsIF9fdHV0b3JpYWxpemVkfSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PnRoaXMuc2V0U3RhdGUoe19fdXNlcjpVc2VyLmN1cnJlbnR9KSlcblx0XHRcdFx0XHR0aGlzLmluaXRlZCgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZSk9PnRoaXMuc2V0U3RhdGUoe19faW5pdGVkOmZhbHNlLF9fdXNlcjpVc2VyLmN1cnJlbnQsX19pbml0ZWRFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHttdWlUaGVtZTogZ2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUpfVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgY29udGVudCxcbiAgICAgICAgICAgIHtfX2luaXRlZDppbml0ZWQsIF9faW5pdGVkRXJyb3I6aW5pdGVkRXJyb3IsIF9fdXNlcjp1c2VyLCBfX3R1dG9yaWFsaXplZH09dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFpbml0ZWQpe1xuICAgICAgICAgICAgaWYoaW5pdGVkRXJyb3IpXG4gICAgICAgICAgICAgICAgY29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29udGVudD0gXCIuLi5cIlxuICAgICAgICB9ZWxzZSBpZighdXNlcil7XG4gICAgICAgICAgICBpZighX190dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT50aGlzLnNldFN0YXRlKHtfX3R1dG9yaWFsaXplZDp0cnVlfSl9Lz4pXG5cbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IC8+KVxuICAgICAgICB9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgdXNlcj17dXNlcn0vPilcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgY29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICAvL2luaGVyaXRzIHNob3VsZCByZXR1cm4gY29tcG9uZW50XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbmRlcihyb3V0ZXMsIHByb3BzPXt9KXtcbiAgICAgICAgdmFyIGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbiAgICAgICAgaWYoIWNvbnRhaW5lcil7XG4gICAgICAgICAgICBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNvbnRhaW5lci5pZD0nYXBwJ1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgICAgIH1cblx0XHR2YXIgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuXHRcdHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcblx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG5cbiAgICAgICAgaWYoIXByb3BzLmhpc3RvcnkpXG4gICAgICAgICAgICBwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcigoXG4gICAgICAgICAgICAgICAgPFJvdXRlciB7Li4ucHJvcHN9PlxuICAgICAgICAgICAgICAgICAgICB7cm91dGVzfVxuICAgICAgICAgICAgICAgIDwvUm91dGVyPlxuICAgICAgICAgICAgKSxjb250YWluZXIpXG4gICAgfVxufTtcbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5BcHAuY2hpbGRDb250ZXh0VHlwZXM9e211aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZH1cbkFwcC5jb250ZXh0VHlwZXM9e3JvdXRlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuQXBwLnByb3BzVHlwZXM9e1xuICAgIHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgaW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcbn1cbkFwcC5kZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbih7XG4gICAgc2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcbiAgICBpbml0KCl7fSxcbiAgICB0dXRvcmlhbDpbXVxufSlcblxuLyoqXG4qQFRvZG86XG4qIHBvc2l0aW9uaW5nIGluIGJpZyBzY3JlZW5cbiAgICAqIEZsb2F0aW5nQWN0aW9uQnV0dG9uIDogZml4ZWQgcG9zaXRpb25cbiAgICAqIExvYWRpbmc6IGNvdmVyIEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgKiBNZXNzYWdlcjogZml4ZWQgYm90dG9tXG4qL1xuIl19