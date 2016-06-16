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

var _keyboardArrowLeft = require("material-ui/svg-icons/hardware/keyboard-arrow-left");

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

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
                    _react2.default.createElement(
                        _materialUi.FloatingActionButton,
                        { mini: true,
                            onClick: function onClick(a) {
                                return _this3.context.router.goBack();
                            },
                            className: "sticky top left",
                            style: { opacity: 0.2 } },
                        _react2.default.createElement(_keyboardArrowLeft2.default, null)
                    ),
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
//# sourceMappingURL=data:application/json;base64,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RUFJRCxTQUpDLENBQVAsQ0FmMkI7Ozs7V0ExRWQ7Ozs7QUErRnBCOzs7QUFHRCxJQUFJLGlCQUFKLEdBQXNCLEVBQUMsVUFBUyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCLEVBQWhDO0FBQ0EsSUFBSSxZQUFKLEdBQWlCLEVBQUMsUUFBUSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLEVBQTFCOztBQUVBLElBQUksVUFBSixHQUFlO0FBQ1gsYUFBUyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ1QsV0FBTSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ04sVUFBSyxnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ0wsY0FBUyxnQkFBTSxTQUFOLENBQWdCLEtBQWhCO0NBSmI7QUFNQSxJQUFJLFlBQUosR0FBaUIsT0FBTyxNQUFQLENBQWM7QUFDM0IsYUFBUSxxQkFBUjtBQUNBLDBCQUFNLEVBRnFCOztBQUczQixjQUFTLEVBQVQ7Q0FIYSxDQUFqQiIsImZpbGUiOiJxaWxpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgX191c2VyOlVzZXIuY3VycmVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWFwcElkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cbiAgICAgICAgaWYoIXNlcnZpY2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuXG4gICAgICAgIGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcbiAgICAgICAgICAgIC50aGVuKChfX3R1dG9yaWFsaXplZD10cnVlKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtfX2luaXRlZDp0cnVlLCBfX3VzZXI6VXNlci5jdXJyZW50LCBfX3R1dG9yaWFsaXplZH0pXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsICgpPT50aGlzLnNldFN0YXRlKHtfX3VzZXI6VXNlci5jdXJyZW50fSkpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZSk9PnRoaXMuc2V0U3RhdGUoe19faW5pdGVkOmZhbHNlLF9fdXNlcjpVc2VyLmN1cnJlbnQsX19pbml0ZWRFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHttdWlUaGVtZTogZ2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUpfVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgY29udGVudCxcbiAgICAgICAgICAgIHtfX2luaXRlZDppbml0ZWQsIF9faW5pdGVkRXJyb3I6aW5pdGVkRXJyb3IsIF9fdXNlcjp1c2VyLCBfX3R1dG9yaWFsaXplZH09dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFpbml0ZWQpe1xuICAgICAgICAgICAgaWYoaW5pdGVkRXJyb3IpXG4gICAgICAgICAgICAgICAgY29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29udGVudD0gXCIuLi5cIlxuICAgICAgICB9ZWxzZSBpZighdXNlcil7XG4gICAgICAgICAgICBpZighX190dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT50aGlzLnNldFN0YXRlKHtfX3R1dG9yaWFsaXplZDp0cnVlfSl9Lz4pXG5cbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IC8+KVxuICAgICAgICB9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgdXNlcj17dXNlcn0vPilcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgY29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBtaW5pPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2E9PnRoaXMuY29udGV4dC5yb3V0ZXIuZ29CYWNrKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCBsZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e29wYWNpdHk6MC4yfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJhY2tJY29uLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TG9hZGluZyByZWY9XCJsb2FkaW5nXCIgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgLy9pbmhlcml0cyBzaG91bGQgcmV0dXJuIGNvbXBvbmVudFxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXIocm91dGVzLCBwcm9wcz17fSl7XG4gICAgICAgIHZhciBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgICAgIGlmKCFjb250YWluZXIpe1xuICAgICAgICAgICAgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250YWluZXIuaWQ9J2FwcCdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICB9XG5cdFx0dmFyIHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcblx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG5cdFx0Y29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG4gICAgICAgIGlmKCFwcm9wcy5oaXN0b3J5KVxuICAgICAgICAgICAgcHJvcHMuaGlzdG9yeT1oYXNoSGlzdG9yeVxuXG4gICAgICAgIHJldHVybiByZW5kZXIoKFxuICAgICAgICAgICAgICAgIDxSb3V0ZXIgey4uLnByb3BzfT5cbiAgICAgICAgICAgICAgICAgICAge3JvdXRlc31cbiAgICAgICAgICAgICAgICA8L1JvdXRlcj5cbiAgICAgICAgICAgICksY29udGFpbmVyKVxuICAgIH1cbn07XG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuQXBwLmNoaWxkQ29udGV4dFR5cGVzPXttdWlUaGVtZTpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWR9XG5BcHAuY29udGV4dFR5cGVzPXtyb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbkFwcC5wcm9wc1R5cGVzPXtcbiAgICBzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5XG59XG5BcHAuZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oe1xuICAgIHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG4gICAgaW5pdCgpe30sXG4gICAgdHV0b3JpYWw6W11cbn0pXG5cbi8qKlxuKkBUb2RvOlxuKiBwb3NpdGlvbmluZyBpbiBiaWcgc2NyZWVuXG4gICAgKiBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA6IGZpeGVkIHBvc2l0aW9uXG4gICAgKiBMb2FkaW5nOiBjb3ZlciBGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICogTWVzc2FnZXI6IGZpeGVkIGJvdHRvbVxuKi9cbiJdfQ==