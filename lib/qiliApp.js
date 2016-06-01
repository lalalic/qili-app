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
//# sourceMappingURL=data:application/json;base64,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WUFBVSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBVixDQUZhO0FBR2pCLGdCQUFHLENBQUMsU0FBRCxFQUFXO0FBQ1YsNEJBQVUsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVYsQ0FEVTtBQUVWLDBCQUFVLEVBQVYsR0FBYSxLQUFiLENBRlU7QUFHVix5QkFBUyxJQUFULENBQWMsV0FBZCxDQUEwQixTQUExQixFQUhVO2FBQWQ7O0FBTUEsbUJBQU8sc0JBQU8sR0FBUCxDQUFXLE1BQVgsRUFBbUIsT0FBbkIsRUFBNEIsVUFBQyxPQUFELEVBQVUsS0FBVixFQUFrQjtBQUNqRCwwQkFBVSxLQUFWLENBQWdCLE1BQWhCLEdBQXVCLE9BQU8sV0FBUCxHQUFtQixJQUFuQixDQUQwQjtBQUVqRCx3QkFBTyw4QkFBQyxPQUFELElBQVMsUUFBUSxNQUFNLE1BQU4sRUFBYyxPQUFPLE1BQU0sS0FBTixFQUF0QyxDQUFQLEVBQTZELFNBQTdELEVBRmlEO2FBQWxCLENBQW5DLENBVGlCOzs7O1dBN0RKOzs7O0FBMkVwQjs7QUFFRCxJQUFJLGlCQUFKLEdBQXNCLEVBQUMsVUFBUyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLEVBQWhDOztBQUVBLElBQUksVUFBSixHQUFlO0FBQ1gsYUFBUyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ1QsV0FBTSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ04sVUFBSyxnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ0wsV0FBTSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCO0NBSlY7QUFNQSxJQUFJLFlBQUosR0FBaUIsT0FBTyxNQUFQLENBQWM7QUFDM0IsYUFBUSxxQkFBUjtBQUNBLDBCQUFNLEVBRnFCOztBQUczQixXQUFNLEdBQU47Q0FIYSxFQUlmLE9BQU8sTUFBUCxDQUpGIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IFJvdXRlciBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuXG52YXIgbXVpVGhlbWU9KG5ldyBTdHlsZXMuVGhlbWVNYW5hZ2VyKCkpLmdldEN1cnJlbnRUaGVtZSgpLFxuICAgIHtyZW5kZXIsIHRyYXZlcnNlQ2hpbGRyZW59PVJlYWN0XG5cbm11aVRoZW1lLmNvbXBvbmVudC5mbG9hdGluZ0FjdGlvbkJ1dHRvbi5zdHlsZT17XG4gICBvcGFjaXR5OjAuNywgekluZGV4Ojlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHN1cHBvcnRUYXAoKVxuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWQsIHdpZHRofT10aGlzLnByb3BzXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgX191c2VyOlVzZXIuY3VycmVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWFwcElkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cbiAgICAgICAgaWYoIXNlcnZpY2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuICAgICAgICBpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG4gICAgICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtfX2luaXRlZDp0cnVlLCBfX3VzZXI6VXNlci5jdXJyZW50fSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PnRoaXMuc2V0U3RhdGUoe19fdXNlcjpVc2VyLmN1cnJlbnR9KSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+dGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6ZmFsc2UsX191c2VyOlVzZXIuY3VycmVudCxfX2luaXRlZEVycm9yOmUubWVzc2FnZX0pKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge211aVRoZW1lfVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgY29udGVudCxcbiAgICAgICAgICAgIHtfX2luaXRlZDppbml0ZWQsIF9faW5pdGVkRXJyb3I6aW5pdGVkRXJyb3IsIF9fdXNlcjp1c2VyfT10aGlzLnN0YXRlXG5cbiAgICAgICAgaWYoIWluaXRlZCl7XG4gICAgICAgICAgICBpZihpbml0ZWRFcnJvcilcbiAgICAgICAgICAgICAgICBjb250ZW50PSBgSW5pdGlhbGl6aW5nIEVycm9yOiAke2luaXRlZEVycm9yfWBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb250ZW50PSBcIkluaXRpYWxpemluZy4uLlwiXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyIHx8ICF1c2VyLnNlc3Npb25Ub2tlbil7XG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudC8+KVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlciByZWY9XCJtc2dcIiBjbGFzc05hbWU9XCJzdGlja3kgYm90dG9tIGxlZnRcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TG9hZGluZyByZWY9XCJsb2FkaW5nXCIgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIi8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgLy9pbmhlcml0cyBzaG91bGQgcmV0dXJuIGNvbXBvbmVudFxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXIocm91dGVzKXtcbiAgICAgICAgdmFyIGhpc3Rvcnk9QXBwLmhpc3RvcnkgfHwgUm91dGVyLkhhc2hMb2NhdGlvblxuICAgICAgICB2YXIgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSb3V0ZXIucnVuKHJvdXRlcywgaGlzdG9yeSwgKEhhbmRsZXIsIHN0YXRlKT0+e1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuICAgICAgICAgICAgcmVuZGVyKDxIYW5kbGVyIHBhcmFtcz17c3RhdGUucGFyYW1zfSBxdWVyeT17c3RhdGUucXVlcnl9Lz4sIGNvbnRhaW5lcilcbiAgICAgICAgfSlcbiAgICB9XG59O1xuXG5BcHAuY2hpbGRDb250ZXh0VHlwZXM9e211aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbkFwcC5wcm9wc1R5cGVzPXtcbiAgICBzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2lkdGg6UmVhY3QuUHJvcFR5cGVzLm51bWJlclxufVxuQXBwLmRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKHtcbiAgICBzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuICAgIGluaXQoKXt9LFxuICAgIHdpZHRoOjk2MFxufSxnbG9iYWwuX190ZXN0KVxuXG4vKipcbipAVG9kbzpcbiogcG9zaXRpb25pbmcgaW4gYmlnIHNjcmVlblxuICAgICogRmxvYXRpbmdBY3Rpb25CdXR0b24gOiBmaXhlZCBwb3NpdGlvblxuICAgICogTG9hZGluZzogY292ZXIgRmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAqIE1lc3NhZ2VyOiBmaXhlZCBib3R0b21cbiovXG4iXX0=