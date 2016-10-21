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
            var self = this;
            return {
                muiTheme: (0, _getMuiTheme2.default)(_lightBaseTheme2.default),
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
    muiTheme: _react2.default.PropTypes.object.isRequired,
    showMessage: _react2.default.PropTypes.func,
    loading: _react2.default.PropTypes.func
};
App.contextTypes = {
    router: _react2.default.PropTypes.object
};
exports.default = App;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QW1CLEtBQXZDLENBVGlCO0FBVWpDLHNCQUFVLEtBQVYsQ0FBZ0IsTUFBaEIsR0FBdUIsT0FBTyxXQUFQLEdBQW1CLElBQW5CLENBVlU7O0FBWTNCLGdCQUFHLENBQUMsTUFBTSxPQUFOLEVBQ0EsTUFBTSxPQUFOLDRCQURKOztBQUdBLG1CQUFPLHNCQUNDOztnQkFBWSxLQUFaO2dCQUNLLE1BREw7YUFERCxFQUlELFNBSkMsQ0FBUCxDQWYyQjs7OztXQW5GZDs7O0lBeUdiLGVBQWE7QUFDbkIsYUFBUSxxQkFBUjtBQUNBLDBCQUFNLEVBRmE7O0FBR25CLGNBQVMsRUFBVDs7QUE1R21CLElBK0diLGFBQVc7QUFDakIsYUFBUyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ1QsV0FBTSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ04sVUFBSyxnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ0wsY0FBUyxnQkFBTSxTQUFOLENBQWdCLEtBQWhCO0FBQ1QsV0FBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCOztBQXBIWSxJQXVIYixvQkFBa0I7QUFDeEIsY0FBUyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ0gsaUJBQWEsZ0JBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNiLGFBQVMsZ0JBQU0sU0FBTixDQUFnQixJQUFoQjs7QUExSEksSUE2SGIsZUFBYTtBQUNuQixZQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7O2tCQTlIVyIsImZpbGUiOiJxaWxpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXG4gICAgICAgIHN1cHBvcnRUYXAoKVxuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBfX3VzZXI6VXNlci5jdXJyZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZX09dGhpcy5wcm9wc1xuXHRcdGlmKHRpdGxlKVxuXHRcdFx0ZG9jdW1lbnQudGl0bGU9dGl0bGVcblxuICAgICAgICBpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG4gICAgICAgICAgICAudGhlbigoX190dXRvcmlhbGl6ZWQ9dHJ1ZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6dHJ1ZSwgX191c2VyOlVzZXIuY3VycmVudCwgX190dXRvcmlhbGl6ZWR9KVxuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCAoKT0+dGhpcy5zZXRTdGF0ZSh7X191c2VyOlVzZXIuY3VycmVudH0pKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGUpPT50aGlzLnNldFN0YXRlKHtfX2luaXRlZDpmYWxzZSxfX3VzZXI6VXNlci5jdXJyZW50LF9faW5pdGVkRXJyb3I6ZS5tZXNzYWdlfSkpXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGxldCBzZWxmPXRoaXNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG11aVRoZW1lOiBnZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSlcbiAgICAgICAgICAgICxzaG93TWVzc2FnZSgpe1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLGxvYWRpbmcob3Blbil7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZzLmxvYWRpbmdbb3BlbiA/IFwic2hvd1wiIDogXCJjbG9zZVwiXSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cdFxuXHRzaG93TWVzc2FnZSgpe1xuXHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdH1cblx0XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsXG4gICAgICAgICAgICB7X19pbml0ZWQ6aW5pdGVkLCBfX2luaXRlZEVycm9yOmluaXRlZEVycm9yLCBfX3VzZXI6dXNlciwgX190dXRvcmlhbGl6ZWR9PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIV9fdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+dGhpcy5zZXRTdGF0ZSh7X190dXRvcmlhbGl6ZWQ6dHJ1ZX0pfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlcywgcHJvcHM9e30pe1xuICAgICAgICB2YXIgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuXHRcdHZhciBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cdFx0c3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxuXHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuICAgICAgICBpZighcHJvcHMuaGlzdG9yeSlcbiAgICAgICAgICAgIHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuICAgICAgICByZXR1cm4gcmVuZGVyKChcbiAgICAgICAgICAgICAgICA8Um91dGVyIHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgIHtyb3V0ZXN9XG4gICAgICAgICAgICAgICAgPC9Sb3V0ZXI+XG4gICAgICAgICAgICApLGNvbnRhaW5lcilcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHRpbml0KCl7fSxcblx0XHR0dXRvcmlhbDpbXVxuXHR9XG5cblx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0aW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHR0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0dGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICBzaG93TWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuIl19