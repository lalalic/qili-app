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

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

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
                var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Error';
                return _this2.refs.msg.show(e, type);
            }, this.refs.loading).then(function () {
                var __tutorialized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwiaW5pdEFwcCIsImluaXQiLCJzZXJ2aWNlIiwiYXBwSWQiLCJzdGF0ZSIsIl9fdXNlciIsImN1cnJlbnQiLCJFcnJvciIsInRpdGxlIiwiZG9jdW1lbnQiLCJlIiwidHlwZSIsInJlZnMiLCJtc2ciLCJzaG93IiwibG9hZGluZyIsInRoZW4iLCJfX3R1dG9yaWFsaXplZCIsInNldFN0YXRlIiwiX19pbml0ZWQiLCJvbiIsIl9faW5pdGVkRXJyb3IiLCJtZXNzYWdlIiwic2VsZiIsIm11aVRoZW1lIiwic2hvd01lc3NhZ2UiLCJhcmd1bWVudHMiLCJvcGVuIiwiaW5pdGVkIiwiaW5pdGVkRXJyb3IiLCJ1c2VyIiwiY29udGVudCIsIkFycmF5IiwiaXNBcnJheSIsInR1dG9yaWFsIiwibGVuZ3RoIiwic2Vzc2lvblRva2VuIiwicmVuZGVyQ29udGVudCIsIm92ZXJmbG93WSIsImNoaWxkcmVuIiwicm91dGVzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5IiwiZGVmYXVsdFByb3BzIiwicHJvcHNUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCIsImNvbnRleHRUeXBlcyIsInJvdXRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCQSxHOzs7QUFDakIsaUJB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LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXG4gICAgICAgIHN1cHBvcnRUYXAoKVxuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBfX3VzZXI6VXNlci5jdXJyZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB0aXRsZX09dGhpcy5wcm9wc1xuXHRcdGlmKHRpdGxlKVxuXHRcdFx0ZG9jdW1lbnQudGl0bGU9dGl0bGVcblxuICAgICAgICBpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG4gICAgICAgICAgICAudGhlbigoX190dXRvcmlhbGl6ZWQ9dHJ1ZSk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6dHJ1ZSwgX191c2VyOlVzZXIuY3VycmVudCwgX190dXRvcmlhbGl6ZWR9KVxuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCAoKT0+dGhpcy5zZXRTdGF0ZSh7X191c2VyOlVzZXIuY3VycmVudH0pKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGUpPT50aGlzLnNldFN0YXRlKHtfX2luaXRlZDpmYWxzZSxfX3VzZXI6VXNlci5jdXJyZW50LF9faW5pdGVkRXJyb3I6ZS5tZXNzYWdlfSkpXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGxldCBzZWxmPXRoaXNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG11aVRoZW1lOiBnZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSlcbiAgICAgICAgICAgICxzaG93TWVzc2FnZSgpe1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLGxvYWRpbmcob3Blbil7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZzLmxvYWRpbmdbb3BlbiA/IFwic2hvd1wiIDogXCJjbG9zZVwiXSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cdFxuXHRzaG93TWVzc2FnZSgpe1xuXHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdH1cblx0XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsXG4gICAgICAgICAgICB7X19pbml0ZWQ6aW5pdGVkLCBfX2luaXRlZEVycm9yOmluaXRlZEVycm9yLCBfX3VzZXI6dXNlciwgX190dXRvcmlhbGl6ZWR9PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIV9fdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+dGhpcy5zZXRTdGF0ZSh7X190dXRvcmlhbGl6ZWQ6dHJ1ZX0pfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlcywgcHJvcHM9e30pe1xuICAgICAgICB2YXIgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuXHRcdHZhciBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cdFx0c3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxuXHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuICAgICAgICBpZighcHJvcHMuaGlzdG9yeSlcbiAgICAgICAgICAgIHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuICAgICAgICByZXR1cm4gcmVuZGVyKChcbiAgICAgICAgICAgICAgICA8Um91dGVyIHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgIHtyb3V0ZXN9XG4gICAgICAgICAgICAgICAgPC9Sb3V0ZXI+XG4gICAgICAgICAgICApLGNvbnRhaW5lcilcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHRpbml0KCl7fSxcblx0XHR0dXRvcmlhbDpbXVxuXHR9XG5cblx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0aW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHR0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0dGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICBzaG93TWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuIl19