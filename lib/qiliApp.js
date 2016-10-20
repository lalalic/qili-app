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
                    var _self$refs$msg;

                    (_self$refs$msg = self.refs.msg).show.apply(_self$refs$msg, arguments);
                },
                loading: function loading(open) {
                    self.refs.loading[open ? "show" : "close"]();
                }
            };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwiaW5pdEFwcCIsImluaXQiLCJzZXJ2aWNlIiwiYXBwSWQiLCJzdGF0ZSIsIl9fdXNlciIsImN1cnJlbnQiLCJFcnJvciIsInRpdGxlIiwiZG9jdW1lbnQiLCJlIiwidHlwZSIsInJlZnMiLCJtc2ciLCJzaG93IiwibG9hZGluZyIsInRoZW4iLCJfX3R1dG9yaWFsaXplZCIsInNldFN0YXRlIiwiX19pbml0ZWQiLCJvbiIsIl9faW5pdGVkRXJyb3IiLCJtZXNzYWdlIiwic2VsZiIsIm11aVRoZW1lIiwic2hvd01lc3NhZ2UiLCJhcmd1bWVudHMiLCJvcGVuIiwiaW5pdGVkIiwiaW5pdGVkRXJyb3IiLCJ1c2VyIiwiY29udGVudCIsIkFycmF5IiwiaXNBcnJheSIsInR1dG9yaWFsIiwibGVuZ3RoIiwic2Vzc2lvblRva2VuIiwicmVuZGVyQ29udGVudCIsIm92ZXJmbG93WSIsImNoaWxkcmVuIiwicm91dGVzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5IiwiZGVmYXVsdFByb3BzIiwicHJvcHNUeXBlcyIsIlByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJmdW5jIiwiYXJyYXkiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCIsImNvbnRleHRUeXBlcyIsInJvdXRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCQSxHOzs7QUFDakIsaUJB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RSxTQUFOLEdBQWdCLHNCQUFvQkMsT0FBT0MsV0FBM0IsR0FBdUMsS0FBdkQ7QUFDQVYsc0JBQVVNLEtBQVYsQ0FBZ0JLLE1BQWhCLEdBQXVCRixPQUFPQyxXQUFQLEdBQW1CLElBQTFDOztBQUVNLGdCQUFHLENBQUNwRCxNQUFNc0QsT0FBVixFQUNJdEQsTUFBTXNELE9BQU47O0FBRUosbUJBQU8sc0JBQ0M7QUFBQTtBQUFZdEQscUJBQVo7QUFDS3lDO0FBREwsYUFERCxFQUlEQyxTQUpDLENBQVA7QUFLSDs7Ozs7O0FBbEdnQjNDLEcsQ0FvR2J3RCxZLEdBQWE7QUFDbkJwRCxhQUFRLHFCQURXO0FBRW5CRCxRQUZtQixrQkFFYixDQUFFLENBRlc7O0FBR25CaUMsY0FBUztBQUhVLEM7QUFwR0FwQyxHLENBMEdieUQsVSxHQUFXO0FBQ2pCckQsYUFBUyxnQkFBTXNELFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCQyxVQURmO0FBRWpCdkQsV0FBTSxnQkFBTXFELFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCQyxVQUZaO0FBR2pCekQsVUFBSyxnQkFBTXVELFNBQU4sQ0FBZ0JHLElBSEo7QUFJakJ6QixjQUFTLGdCQUFNc0IsU0FBTixDQUFnQkksS0FKUjtBQUtqQnBELFdBQU8sZ0JBQU1nRCxTQUFOLENBQWdCQztBQUxOLEM7QUExR0UzRCxHLENBa0hiK0QsaUIsR0FBa0I7QUFDeEJyQyxjQUFTLGdCQUFNZ0MsU0FBTixDQUFnQk0sTUFBaEIsQ0FBdUJKLFVBRFI7QUFFbEJqQyxpQkFBYSxnQkFBTStCLFNBQU4sQ0FBZ0JHLElBRlg7QUFHbEI1QyxhQUFTLGdCQUFNeUMsU0FBTixDQUFnQkc7QUFIUCxDO0FBbEhMN0QsRyxDQXdIYmlFLFksR0FBYTtBQUNuQkMsWUFBUSxnQkFBTVIsU0FBTixDQUFnQk07QUFETCxDO2tCQXhIQWhFLEciLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi9jb21wb25lbnRzL3R1dG9yaWFsXCJcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcblxuICAgICAgICBzdXBwb3J0VGFwKClcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgX191c2VyOlVzZXIuY3VycmVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWFwcElkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cbiAgICAgICAgaWYoIXNlcnZpY2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGV9PXRoaXMucHJvcHNcblx0XHRpZih0aXRsZSlcblx0XHRcdGRvY3VtZW50LnRpdGxlPXRpdGxlXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKF9fdHV0b3JpYWxpemVkPXRydWUpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe19faW5pdGVkOnRydWUsIF9fdXNlcjpVc2VyLmN1cnJlbnQsIF9fdHV0b3JpYWxpemVkfSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PnRoaXMuc2V0U3RhdGUoe19fdXNlcjpVc2VyLmN1cnJlbnR9KSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+dGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6ZmFsc2UsX191c2VyOlVzZXIuY3VycmVudCxfX2luaXRlZEVycm9yOmUubWVzc2FnZX0pKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBsZXQgc2VsZj10aGlzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtdWlUaGVtZTogZ2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUpXG4gICAgICAgICAgICAsc2hvd01lc3NhZ2UoKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLGxvYWRpbmcob3Blbil7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZzLmxvYWRpbmdbb3BlbiA/IFwic2hvd1wiIDogXCJjbG9zZVwiXSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsXG4gICAgICAgICAgICB7X19pbml0ZWQ6aW5pdGVkLCBfX2luaXRlZEVycm9yOmluaXRlZEVycm9yLCBfX3VzZXI6dXNlciwgX190dXRvcmlhbGl6ZWR9PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIV9fdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+dGhpcy5zZXRTdGF0ZSh7X190dXRvcmlhbGl6ZWQ6dHJ1ZX0pfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlcywgcHJvcHM9e30pe1xuICAgICAgICB2YXIgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuXHRcdHZhciBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cdFx0c3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxuXHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuICAgICAgICBpZighcHJvcHMuaGlzdG9yeSlcbiAgICAgICAgICAgIHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuICAgICAgICByZXR1cm4gcmVuZGVyKChcbiAgICAgICAgICAgICAgICA8Um91dGVyIHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgIHtyb3V0ZXN9XG4gICAgICAgICAgICAgICAgPC9Sb3V0ZXI+XG4gICAgICAgICAgICApLGNvbnRhaW5lcilcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcblx0XHRpbml0KCl7fSxcblx0XHR0dXRvcmlhbDpbXVxuXHR9XG5cblx0c3RhdGljIHByb3BzVHlwZXM9e1xuXHRcdHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0aW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHR0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG5cdFx0dGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcblx0fVxuXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICBzaG93TWVzc2FnZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIGxvYWRpbmc6IFJlYWN0LlByb3BUeXBlcy5mdW5jXG5cdH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuIl19