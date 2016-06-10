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
//# sourceMappingURL=data:application/json;base64,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QWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ1QsV0FBTSxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ04sVUFBSyxnQkFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ0wsY0FBUyxnQkFBTSxTQUFOLENBQWdCLEtBQWhCO0NBSmI7QUFNQSxJQUFJLFlBQUosR0FBaUIsT0FBTyxNQUFQLENBQWM7QUFDM0IsYUFBUSxxQkFBUjtBQUNBLDBCQUFNLEVBRnFCOztBQUczQixjQUFTLEVBQVQ7Q0FIYSxDQUFqQiIsImZpbGUiOiJxaWxpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXG4gICAgICAgIHN1cHBvcnRUYXAoKVxuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBfX3VzZXI6VXNlci5jdXJyZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKF9fdHV0b3JpYWxpemVkPXRydWUpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe19faW5pdGVkOnRydWUsIF9fdXNlcjpVc2VyLmN1cnJlbnQsIF9fdHV0b3JpYWxpemVkfSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PnRoaXMuc2V0U3RhdGUoe19fdXNlcjpVc2VyLmN1cnJlbnR9KSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+dGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6ZmFsc2UsX191c2VyOlVzZXIuY3VycmVudCxfX2luaXRlZEVycm9yOmUubWVzc2FnZX0pKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge211aVRoZW1lOiBnZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSl9XG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBjb250ZW50LFxuICAgICAgICAgICAge19faW5pdGVkOmluaXRlZCwgX19pbml0ZWRFcnJvcjppbml0ZWRFcnJvciwgX191c2VyOnVzZXIsIF9fdHV0b3JpYWxpemVkfT10aGlzLnN0YXRlXG5cbiAgICAgICAgaWYoIWluaXRlZCl7XG4gICAgICAgICAgICBpZihpbml0ZWRFcnJvcilcbiAgICAgICAgICAgICAgICBjb250ZW50PSBgSW5pdGlhbGl6aW5nIEVycm9yOiAke2luaXRlZEVycm9yfWBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb250ZW50PSBcIi4uLlwiXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyKXtcbiAgICAgICAgICAgIGlmKCFfX3R1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiAoPFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PnRoaXMuc2V0U3RhdGUoe19fdHV0b3JpYWxpemVkOnRydWV9KX0vPilcblxuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgLz4pXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyLnNlc3Npb25Ub2tlbil7XG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfS8+KVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIC8vaW5oZXJpdHMgc2hvdWxkIHJldHVybiBjb21wb25lbnRcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlcywgcHJvcHM9e30pe1xuICAgICAgICB2YXIgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuXHRcdHZhciBzdHlsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIilcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG5cdFx0c3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxuXHRcdGNvbnRhaW5lci5zdHlsZS5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KydweCdcblxuICAgICAgICBpZighcHJvcHMuaGlzdG9yeSlcbiAgICAgICAgICAgIHByb3BzLmhpc3Rvcnk9aGFzaEhpc3RvcnlcblxuICAgICAgICByZXR1cm4gcmVuZGVyKChcbiAgICAgICAgICAgICAgICA8Um91dGVyIHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgIHtyb3V0ZXN9XG4gICAgICAgICAgICAgICAgPC9Sb3V0ZXI+XG4gICAgICAgICAgICApLGNvbnRhaW5lcilcbiAgICB9XG59O1xuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbkFwcC5jaGlsZENvbnRleHRUeXBlcz17bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkfVxuXG5BcHAucHJvcHNUeXBlcz17XG4gICAgc2VydmljZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIGFwcElkOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBpbml0OlJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgIHR1dG9yaWFsOlJlYWN0LlByb3BUeXBlcy5hcnJheVxufVxuQXBwLmRlZmF1bHRQcm9wcz1PYmplY3QuYXNzaWduKHtcbiAgICBzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuICAgIGluaXQoKXt9LFxuICAgIHR1dG9yaWFsOltdXG59KVxuXG4vKipcbipAVG9kbzpcbiogcG9zaXRpb25pbmcgaW4gYmlnIHNjcmVlblxuICAgICogRmxvYXRpbmdBY3Rpb25CdXR0b24gOiBmaXhlZCBwb3NpdGlvblxuICAgICogTG9hZGluZzogY292ZXIgRmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAqIE1lc3NhZ2VyOiBmaXhlZCBib3R0b21cbiovXG4iXX0=