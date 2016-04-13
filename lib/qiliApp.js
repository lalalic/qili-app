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

        debugger;
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
//# sourceMappingURL=data:application/json;base64,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LEVBQTRCLFVBQUMsT0FBRCxFQUFVLEtBQVYsRUFBa0I7QUFDakQsMEJBQVUsS0FBVixDQUFnQixNQUFoQixHQUF1QixPQUFPLFdBQVAsR0FBbUIsSUFBbkIsQ0FEMEI7QUFFakQsd0JBQU8sOEJBQUMsT0FBRCxJQUFTLFFBQVEsTUFBTSxNQUFOLEVBQWMsT0FBTyxNQUFNLEtBQU4sRUFBdEMsQ0FBUCxFQUE2RCxTQUE3RCxFQUZpRDthQUFsQixDQUFuQyxDQVRpQjs7OztXQTVFSjs7OztBQTBGcEI7O0FBRUQsSUFBSSxpQkFBSixHQUFzQixFQUFDLFVBQVMsZ0JBQU0sU0FBTixDQUFnQixNQUFoQixFQUFoQzs7QUFFQSxJQUFJLFVBQUosR0FBZTtBQUNYLGFBQVMsZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNULFdBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNOLFVBQUssZ0JBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNMLFdBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtDQUpWO0FBTUEsSUFBSSxZQUFKLEdBQWlCLE9BQU8sTUFBUCxDQUFjO0FBQzNCLGFBQVEscUJBQVI7QUFDQSwwQkFBTSxFQUZxQjs7QUFHM0IsV0FBTSxHQUFOO0NBSGEsRUFJZixPQUFPLE1BQVAsQ0FKRiIsImZpbGUiOiJxaWxpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBSb3V0ZXIgZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHtTdHlsZXMsIFNuYWNrYmFyLCBVdGlscywgRmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcblxudmFyIG11aVRoZW1lPShuZXcgU3R5bGVzLlRoZW1lTWFuYWdlcigpKS5nZXRDdXJyZW50VGhlbWUoKSxcbiAgICB7cmVuZGVyLCB0cmF2ZXJzZUNoaWxkcmVufT1SZWFjdFxuXG5tdWlUaGVtZS5jb21wb25lbnQuZmxvYXRpbmdBY3Rpb25CdXR0b24uc3R5bGU9e1xuICAgIHBvc2l0aW9uOidmaXhlZCcsdG9wOjEwLHJpZ2h0OjEwLCBvcGFjaXR5OjAuNywgekluZGV4Ojlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cdFx0ZGVidWdnZXJcbiAgICAgICAgc3VwcG9ydFRhcCgpXG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgd2lkdGh9PXRoaXMucHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBfX3VzZXI6VXNlci5jdXJyZW50LFxuICAgICAgICAgICAgX193aWRlOndpbmRvdy5pbm5lcldpZHRoPndpZHRoXG4gICAgICAgIH1cblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG5cbiAgICAgICAgVXRpbHMuRXZlbnRzLm9uKHdpbmRvdywgJ3Jlc2l6ZScsICgpPT50aGlzLnNldFN0YXRlKHtfX3dpZGU6d2luZG93LmlubmVyV2lkdGg+d2lkdGh9KSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG4gICAgICAgIGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcbiAgICAgICAgICAgIC50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe19faW5pdGVkOnRydWUsIF9fdXNlcjpVc2VyLmN1cnJlbnR9KVxuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCAoKT0+dGhpcy5zZXRTdGF0ZSh7X191c2VyOlVzZXIuY3VycmVudH0pKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGUpPT50aGlzLnNldFN0YXRlKHtfX2luaXRlZDpmYWxzZSxfX3VzZXI6VXNlci5jdXJyZW50LF9faW5pdGVkRXJyb3I6ZS5tZXNzYWdlfSkpXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIHJldHVybiB7bXVpVGhlbWV9XG4gICAgfVxuXG4gICAgX3JpZ2h0KHgpe1xuICAgICAgICB2YXIge19fd2lkZX09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHt3aWR0aH09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gX193aWRlID8gKHdpbmRvdy5pbm5lcldpZHRoLXdpZHRoKS8yK3ggOiB4XG4gICAgfVxuXG4gICAgX3JpZ2h0QXNMZWZ0KHgpe1xuICAgICAgICB2YXIge19fd2lkZX09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHt3aWR0aH09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gX193aWRlID8gKHdpbmRvdy5pbm5lcldpZHRoK3dpZHRoKS8yLXggOiB3aW5kb3cuaW5uZXJXaWR0aC14XG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBjb250ZW50LFxuICAgICAgICAgICAge19faW5pdGVkOmluaXRlZCwgX19pbml0ZWRFcnJvcjppbml0ZWRFcnJvciwgX191c2VyOnVzZXJ9PXRoaXMuc3RhdGVcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiSW5pdGlhbGl6aW5nLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIgfHwgIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlciByZWY9XCJtc2dcIiBzdHlsZT17e3Bvc2l0aW9uOlwiZml4ZWRcIiwgcmlnaHQ6IHRoaXMuX3JpZ2h0KDEwKSwgbGVmdDp1bmRlZmluZWR9fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiIHRvcD17MTB9IGxlZnQ9ezEwfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgLy9pbmhlcml0cyBzaG91bGQgcmV0dXJuIGNvbXBvbmVudFxuICAgIH1cblxuICAgIHN0YXRpYyByZW5kZXIocm91dGVzKXtcbiAgICAgICAgdmFyIGhpc3Rvcnk9QXBwLmhpc3RvcnkgfHwgUm91dGVyLkhhc2hMb2NhdGlvblxuICAgICAgICB2YXIgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSb3V0ZXIucnVuKHJvdXRlcywgaGlzdG9yeSwgKEhhbmRsZXIsIHN0YXRlKT0+e1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuICAgICAgICAgICAgcmVuZGVyKDxIYW5kbGVyIHBhcmFtcz17c3RhdGUucGFyYW1zfSBxdWVyeT17c3RhdGUucXVlcnl9Lz4sIGNvbnRhaW5lcilcbiAgICAgICAgfSlcbiAgICB9XG59O1xuXG5BcHAuY2hpbGRDb250ZXh0VHlwZXM9e211aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbkFwcC5wcm9wc1R5cGVzPXtcbiAgICBzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgYXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgd2lkdGg6UmVhY3QuUHJvcFR5cGVzLm51bWJlclxufVxuQXBwLmRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKHtcbiAgICBzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuICAgIGluaXQoKXt9LFxuICAgIHdpZHRoOjk2MFxufSxnbG9iYWwuX190ZXN0KVxuXG4vKipcbipAVG9kbzpcbiogcG9zaXRpb25pbmcgaW4gYmlnIHNjcmVlblxuICAgICogRmxvYXRpbmdBY3Rpb25CdXR0b24gOiBmaXhlZCBwb3NpdGlvblxuICAgICogTG9hZGluZzogY292ZXIgRmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAqIE1lc3NhZ2VyOiBmaXhlZCBib3R0b21cbiovXG4iXX0=