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
                    _react2.default.createElement(
                        "div",
                        { className: "sticky bottom left", style: { zIndex: 99 } },
                        _react2.default.createElement(_messager2.default, { ref: "msg", style: { display: "inline-block", position: "" } })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "sticky top left", style: { zIndex: 99 } },
                        _react2.default.createElement(_loading2.default, { ref: "loading", style: { display: "inline-block", position: "" } })
                    )
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
//# sourceMappingURL=data:application/json;base64,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QU1BLElBQUksWUFBSixHQUFpQixPQUFPLE1BQVAsQ0FBYztBQUMzQixhQUFRLHFCQUFSO0FBQ0EsMEJBQU0sRUFGcUI7O0FBRzNCLFdBQU0sR0FBTjtDQUhhLEVBSWYsT0FBTyxNQUFQLENBSkYiLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgUm91dGVyIGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gXCIuL2NvbXBvbmVudHMvbWVzc2FnZXJcIlxuaW1wb3J0IExvYWRpbmcgZnJvbSBcIi4vY29tcG9uZW50cy9sb2FkaW5nXCJcbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBzdXBwb3J0VGFwIGZyb20gJ3JlYWN0LXRhcC1ldmVudC1wbHVnaW4nXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL2FjY291bnQnXG5cbnZhciBtdWlUaGVtZT0obmV3IFN0eWxlcy5UaGVtZU1hbmFnZXIoKSkuZ2V0Q3VycmVudFRoZW1lKCksXG4gICAge3JlbmRlciwgdHJhdmVyc2VDaGlsZHJlbn09UmVhY3RcblxubXVpVGhlbWUuY29tcG9uZW50LmZsb2F0aW5nQWN0aW9uQnV0dG9uLnN0eWxlPXtcbiAgIG9wYWNpdHk6MC43LCB6SW5kZXg6OVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgc3VwcG9ydFRhcCgpXG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgd2lkdGh9PXRoaXMucHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBfX3VzZXI6VXNlci5jdXJyZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG4gICAgICAgIGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcbiAgICAgICAgICAgIC50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe19faW5pdGVkOnRydWUsIF9fdXNlcjpVc2VyLmN1cnJlbnR9KVxuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCAoKT0+dGhpcy5zZXRTdGF0ZSh7X191c2VyOlVzZXIuY3VycmVudH0pKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGUpPT50aGlzLnNldFN0YXRlKHtfX2luaXRlZDpmYWxzZSxfX3VzZXI6VXNlci5jdXJyZW50LF9faW5pdGVkRXJyb3I6ZS5tZXNzYWdlfSkpXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIHJldHVybiB7bXVpVGhlbWV9XG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBjb250ZW50LFxuICAgICAgICAgICAge19faW5pdGVkOmluaXRlZCwgX19pbml0ZWRFcnJvcjppbml0ZWRFcnJvciwgX191c2VyOnVzZXJ9PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiSW5pdGlhbGl6aW5nLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIgfHwgIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIgc3R5bGU9e3t6SW5kZXg6OTl9fT5cblx0XHRcdFx0XHRcdFx0PE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIHN0eWxlPXt7ZGlzcGxheTpcImlubGluZS1ibG9ja1wiLHBvc2l0aW9uOlwiXCJ9fS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCBsZWZ0XCIgc3R5bGU9e3t6SW5kZXg6OTl9fT5cblx0XHRcdFx0XHRcdFx0PExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBzdHlsZT17e2Rpc3BsYXk6XCJpbmxpbmUtYmxvY2tcIixwb3NpdGlvbjpcIlwifX0vPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgLy9pbmhlcml0cyBzaG91bGQgcmV0dXJuIGNvbXBvbmVudFxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXIocm91dGVzKXtcbiAgICAgICAgdmFyIGhpc3Rvcnk9QXBwLmhpc3RvcnkgfHwgUm91dGVyLkhhc2hMb2NhdGlvblxuICAgICAgICB2YXIgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSb3V0ZXIucnVuKHJvdXRlcywgaGlzdG9yeSwgKEhhbmRsZXIsIHN0YXRlKT0+e1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuICAgICAgICAgICAgcmVuZGVyKDxIYW5kbGVyIHBhcmFtcz17c3RhdGUucGFyYW1zfSBxdWVyeT17c3RhdGUucXVlcnl9Lz4sIGNvbnRhaW5lcilcbiAgICAgICAgfSlcbiAgICB9XG59O1xuXG5BcHAuY2hpbGRDb250ZXh0VHlwZXM9e211aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbkFwcC5wcm9wc1R5cGVzPXtcbiAgICBzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2lkdGg6UmVhY3QuUHJvcFR5cGVzLm51bWJlclxufVxuQXBwLmRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKHtcbiAgICBzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuICAgIGluaXQoKXt9LFxuICAgIHdpZHRoOjk2MFxufSxnbG9iYWwuX190ZXN0KVxuXG4vKipcbipAVG9kbzpcbiogcG9zaXRpb25pbmcgaW4gYmlnIHNjcmVlblxuICAgICogRmxvYXRpbmdBY3Rpb25CdXR0b24gOiBmaXhlZCBwb3NpdGlvblxuICAgICogTG9hZGluZzogY292ZXIgRmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAqIE1lc3NhZ2VyOiBmaXhlZCBib3R0b21cbiovXG4iXX0=