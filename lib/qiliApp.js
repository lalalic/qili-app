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
            var title = _props.title;

            if (title) document.title = title;

            (0, _db.init)(service, appId, initApp, function (e) {
                var type = arguments.length <= 1 || arguments[1] === undefined ? 'Error' : arguments[1];
                return _this2.refs.msg.show(e, type);
            }, this.refs.loading).then(function () {
                var __tutorialized = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

                _this2.setState({ __inited: true, __user: _db.User.current, __tutorialized: __tutorialized });
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
            return this.props.children;
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
    muiTheme: _react2.default.PropTypes.object.isRequired
};
App.contextTypes = {
    router: _react2.default.PropTypes.object
};
exports.default = App;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFSO0FBQ0EsMEJBQU0sRUFGYTs7QUFHbkIsY0FBUyxFQUFUOztBQTlGbUIsSUFpR2IsYUFBVztBQUNqQixhQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDVCxXQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDTixVQUFLLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDTCxjQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEI7QUFDVCxXQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7O0FBdEdZLElBeUdiLG9CQUFrQjtBQUN4QixjQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7O0FBMUdVLElBNkdiLGVBQWE7QUFDbkIsWUFBUSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCOztrQkE5R1ciLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi9jb21wb25lbnRzL3R1dG9yaWFsXCJcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgX191c2VyOlVzZXIuY3VycmVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWFwcElkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cbiAgICAgICAgaWYoIXNlcnZpY2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGV9PXRoaXMucHJvcHNcblx0XHRpZih0aXRsZSlcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKF9fdHV0b3JpYWxpemVkPXRydWUpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe19faW5pdGVkOnRydWUsIF9fdXNlcjpVc2VyLmN1cnJlbnQsIF9fdHV0b3JpYWxpemVkfSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PnRoaXMuc2V0U3RhdGUoe19fdXNlcjpVc2VyLmN1cnJlbnR9KSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+dGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6ZmFsc2UsX191c2VyOlVzZXIuY3VycmVudCxfX2luaXRlZEVycm9yOmUubWVzc2FnZX0pKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge211aVRoZW1lOiBnZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSl9XG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBjb250ZW50LFxuICAgICAgICAgICAge19faW5pdGVkOmluaXRlZCwgX19pbml0ZWRFcnJvcjppbml0ZWRFcnJvciwgX191c2VyOnVzZXIsIF9fdHV0b3JpYWxpemVkfT10aGlzLnN0YXRlXG5cbiAgICAgICAgaWYoIWluaXRlZCl7XG4gICAgICAgICAgICBpZihpbml0ZWRFcnJvcilcbiAgICAgICAgICAgICAgICBjb250ZW50PSBgSW5pdGlhbGl6aW5nIEVycm9yOiAke2luaXRlZEVycm9yfWBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb250ZW50PSBcIi4uLlwiXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyKXtcbiAgICAgICAgICAgIGlmKCFfX3R1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiAoPFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PnRoaXMuc2V0U3RhdGUoe19fdHV0b3JpYWxpemVkOnRydWV9KX0vPilcblxuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgLz4pXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyLnNlc3Npb25Ub2tlbil7XG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfS8+KVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbmRlcihyb3V0ZXMsIHByb3BzPXt9KXtcbiAgICAgICAgdmFyIGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbiAgICAgICAgaWYoIWNvbnRhaW5lcil7XG4gICAgICAgICAgICBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNvbnRhaW5lci5pZD0nYXBwJ1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgICAgIH1cblx0XHR2YXIgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHN0eWxlKVxuXHRcdHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcblx0XHRjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG5cbiAgICAgICAgaWYoIXByb3BzLmhpc3RvcnkpXG4gICAgICAgICAgICBwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcigoXG4gICAgICAgICAgICAgICAgPFJvdXRlciB7Li4ucHJvcHN9PlxuICAgICAgICAgICAgICAgICAgICB7cm91dGVzfVxuICAgICAgICAgICAgICAgIDwvUm91dGVyPlxuICAgICAgICAgICAgKSxjb250YWluZXIpXG4gICAgfVxuXHRcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHRpbml0KCl7fSxcblx0XHR0dXRvcmlhbDpbXVxuXHR9XG5cdFxuXHRzdGF0aWMgcHJvcHNUeXBlcz17XG5cdFx0c2VydmljZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGFwcElkOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRpbml0OlJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdHR1dG9yaWFsOlJlYWN0LlByb3BUeXBlcy5hcnJheSxcblx0XHR0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuXHR9XG5cdFxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuXHR9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG4iXX0=