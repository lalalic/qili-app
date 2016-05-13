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
var traverseChildren = _react2.default.traverseChildren;


muiTheme.component.floatingActionButton.style = {
    position: 'fixed', top: 10, right: 10, opacity: 0.7, zIndex: 9
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
            __user: _db.User.current,
            __wide: window.innerWidth > width
        };

        if (!appId) throw new Error("Please give application key");

        if (!service) throw new Error("Please give service url");

        _materialUi.Utils.Events.on(window, 'resize', function () {
            return _this.setState({ __wide: window.innerWidth > width });
        });
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
        key: "_right",
        value: function _right(x) {
            var __wide = this.state.__wide;
            var width = this.props.width;

            return __wide ? (window.innerWidth - width) / 2 + x : x;
        }
    }, {
        key: "_rightAsLeft",
        value: function _rightAsLeft(x) {
            var __wide = this.state.__wide;
            var width = this.props.width;

            return __wide ? (window.innerWidth + width) / 2 - x : window.innerWidth - x;
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
                    _react2.default.createElement(_messager2.default, { ref: "msg", style: { position: "fixed", right: this._right(10), left: undefined } }),
                    _react2.default.createElement(_loading2.default, { ref: "loading", top: 10, left: 10 })
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
//# sourceMappingURL=data:application/json;base64,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QUQsRUFBVSxLQUFWLEVBQWtCO0FBQ2pELDBCQUFVLEtBQVYsQ0FBZ0IsTUFBaEIsR0FBdUIsT0FBTyxXQUFQLEdBQW1CLElBQW5CLENBRDBCO0FBRWpELHdCQUFPLDhCQUFDLE9BQUQsSUFBUyxRQUFRLE1BQU0sTUFBTixFQUFjLE9BQU8sTUFBTSxLQUFOLEVBQXRDLENBQVAsRUFBNkQsU0FBN0QsRUFGaUQ7YUFBbEIsQ0FBbkMsQ0FUaUI7Ozs7V0EzRUo7Ozs7QUF5RnBCOztBQUVELElBQUksaUJBQUosR0FBc0IsRUFBQyxVQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsRUFBaEM7O0FBRUEsSUFBSSxVQUFKLEdBQWU7QUFDWCxhQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDVCxXQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDTixVQUFLLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDTCxXQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7Q0FKVjtBQU1BLElBQUksWUFBSixHQUFpQixPQUFPLE1BQVAsQ0FBYztBQUMzQixhQUFRLHFCQUFSO0FBQ0EsMEJBQU0sRUFGcUI7O0FBRzNCLFdBQU0sR0FBTjtDQUhhLEVBSWYsT0FBTyxNQUFQLENBSkYiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgUm91dGVyIGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5cbnZhciBtdWlUaGVtZT0obmV3IFN0eWxlcy5UaGVtZU1hbmFnZXIoKSkuZ2V0Q3VycmVudFRoZW1lKCksXG4gICAge3JlbmRlciwgdHJhdmVyc2VDaGlsZHJlbn09UmVhY3RcblxubXVpVGhlbWUuY29tcG9uZW50LmZsb2F0aW5nQWN0aW9uQnV0dG9uLnN0eWxlPXtcbiAgICBwb3NpdGlvbjonZml4ZWQnLHRvcDoxMCxyaWdodDoxMCwgb3BhY2l0eTowLjcsIHpJbmRleDo5XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICBzdXBwb3J0VGFwKClcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkLCB3aWR0aH09dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIF9fdXNlcjpVc2VyLmN1cnJlbnQsXG4gICAgICAgICAgICBfX3dpZGU6d2luZG93LmlubmVyV2lkdGg+d2lkdGhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFhcHBJZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG4gICAgICAgIGlmKCFzZXJ2aWNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcblxuICAgICAgICBVdGlscy5FdmVudHMub24od2luZG93LCAncmVzaXplJywgKCk9PnRoaXMuc2V0U3RhdGUoe19fd2lkZTp3aW5kb3cuaW5uZXJXaWR0aD53aWR0aH0pKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6dHJ1ZSwgX191c2VyOlVzZXIuY3VycmVudH0pXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsICgpPT50aGlzLnNldFN0YXRlKHtfX3VzZXI6VXNlci5jdXJyZW50fSkpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZSk9PnRoaXMuc2V0U3RhdGUoe19faW5pdGVkOmZhbHNlLF9fdXNlcjpVc2VyLmN1cnJlbnQsX19pbml0ZWRFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHttdWlUaGVtZX1cbiAgICB9XG5cbiAgICBfcmlnaHQoeCl7XG4gICAgICAgIHZhciB7X193aWRlfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3dpZHRofT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiBfX3dpZGUgPyAod2luZG93LmlubmVyV2lkdGgtd2lkdGgpLzIreCA6IHhcbiAgICB9XG5cbiAgICBfcmlnaHRBc0xlZnQoeCl7XG4gICAgICAgIHZhciB7X193aWRlfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3dpZHRofT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiBfX3dpZGUgPyAod2luZG93LmlubmVyV2lkdGgrd2lkdGgpLzIteCA6IHdpbmRvdy5pbm5lcldpZHRoLXhcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsXG4gICAgICAgICAgICB7X19pbml0ZWQ6aW5pdGVkLCBfX2luaXRlZEVycm9yOmluaXRlZEVycm9yLCBfX3VzZXI6dXNlcn09dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFpbml0ZWQpe1xuICAgICAgICAgICAgaWYoaW5pdGVkRXJyb3IpXG4gICAgICAgICAgICAgICAgY29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29udGVudD0gXCJJbml0aWFsaXppbmcuLi5cIlxuICAgICAgICB9ZWxzZSBpZighdXNlciB8fCAhdXNlci5zZXNzaW9uVG9rZW4pe1xuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQvPilcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgY29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIHN0eWxlPXt7cG9zaXRpb246XCJmaXhlZFwiLCByaWdodDogdGhpcy5fcmlnaHQoMTApLCBsZWZ0OnVuZGVmaW5lZH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TG9hZGluZyByZWY9XCJsb2FkaW5nXCIgdG9wPXsxMH0gbGVmdD17MTB9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICAvL2luaGVyaXRzIHNob3VsZCByZXR1cm4gY29tcG9uZW50XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbmRlcihyb3V0ZXMpe1xuICAgICAgICB2YXIgaGlzdG9yeT1BcHAuaGlzdG9yeSB8fCBSb3V0ZXIuSGFzaExvY2F0aW9uXG4gICAgICAgIHZhciBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgICAgIGlmKCFjb250YWluZXIpe1xuICAgICAgICAgICAgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250YWluZXIuaWQ9J2FwcCdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJvdXRlci5ydW4ocm91dGVzLCBoaXN0b3J5LCAoSGFuZGxlciwgc3RhdGUpPT57XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG4gICAgICAgICAgICByZW5kZXIoPEhhbmRsZXIgcGFyYW1zPXtzdGF0ZS5wYXJhbXN9IHF1ZXJ5PXtzdGF0ZS5xdWVyeX0vPiwgY29udGFpbmVyKVxuICAgICAgICB9KVxuICAgIH1cbn07XG5cbkFwcC5jaGlsZENvbnRleHRUeXBlcz17bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuQXBwLnByb3BzVHlwZXM9e1xuICAgIHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgaW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB3aWR0aDpSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXG59XG5BcHAuZGVmYXVsdFByb3BzPU9iamVjdC5hc3NpZ24oe1xuICAgIHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG4gICAgaW5pdCgpe30sXG4gICAgd2lkdGg6OTYwXG59LGdsb2JhbC5fX3Rlc3QpXG5cbi8qKlxuKkBUb2RvOlxuKiBwb3NpdGlvbmluZyBpbiBiaWcgc2NyZWVuXG4gICAgKiBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA6IGZpeGVkIHBvc2l0aW9uXG4gICAgKiBMb2FkaW5nOiBjb3ZlciBGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICogTWVzc2FnZXI6IGZpeGVkIGJvdHRvbVxuKi9cbiJdfQ==