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

var _tutorial = require("./components/tutorial");

var _tutorial2 = _interopRequireDefault(_tutorial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var muiTheme = new _materialUi.Styles.ThemeManager().getCurrentTheme();
var _render = _react2.default.render;

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
            return { muiTheme: muiTheme };
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
            var history = App.history || _reactRouter2.default.HashLocation;
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

            return _reactRouter2.default.run(routes, history, function (Handler, state) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVJLGVBQVMsSUFBSyxtQkFBTyxZQUFQLEVBQUwsQ0FBNEIsZUFBNUIsRUFBVDtJQUNDOztJQUVnQjs7O0FBQ2pCLGFBRGlCLEdBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxLQUNDOzsyRUFERCxnQkFFUCxRQURROztBQUdkLDZDQUhjOzBCQUlxQixNQUFLLEtBQUwsQ0FKckI7WUFJSixzQkFBTCxLQUpTO1lBSUssOEJBSkw7WUFJYywwQkFKZDs7QUFLZCxjQUFLLEtBQUwsR0FBVztBQUNQLG9CQUFPLFNBQUssT0FBTDtTQURYLENBTGM7O0FBU2QsWUFBRyxDQUFDLEtBQUQsRUFDQyxNQUFNLElBQUksS0FBSixDQUFVLDZCQUFWLENBQU4sQ0FESjs7QUFHQSxZQUFHLENBQUMsT0FBRCxFQUNDLE1BQU0sSUFBSSxLQUFKLENBQVUseUJBQVYsQ0FBTixDQURKO3FCQVpjO0tBQWxCOztpQkFEaUI7OzRDQWlCRTs7O3lCQUNvQixLQUFLLEtBQUwsQ0FEcEI7Z0JBQ0wsaUJBQUwsS0FEVTtnQkFDSSx5QkFESjtnQkFDYSxxQkFEYjs7O0FBR2YsMEJBQUssT0FBTCxFQUFjLEtBQWQsRUFBcUIsT0FBckIsRUFBOEIsVUFBQyxDQUFEO29CQUFHLDZEQUFLO3VCQUFVLE9BQUssSUFBTCxDQUFVLEdBQVYsQ0FBYyxJQUFkLENBQW1CLENBQW5CLEVBQXFCLElBQXJCO2FBQWxCLEVBQThDLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBNUUsQ0FDSyxJQURMLENBQ1UsWUFBdUI7b0JBQXRCLHVFQUFlLG9CQUFPOztBQUNyQix1QkFBSyxRQUFMLENBQWMsRUFBQyxVQUFTLElBQVQsRUFBZSxRQUFPLFNBQUssT0FBTCxFQUFjLDhCQUFyQyxFQUFkLEVBRHFCO0FBRXJCLHlCQUFLLEVBQUwsQ0FBUSxRQUFSLEVBQWtCOzJCQUFJLE9BQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxTQUFLLE9BQUwsRUFBdEI7aUJBQUosQ0FBbEIsQ0FGcUI7YUFBdkIsRUFJRixVQUFDLENBQUQ7dUJBQUssT0FBSyxRQUFMLENBQWMsRUFBQyxVQUFTLEtBQVQsRUFBZSxRQUFPLFNBQUssT0FBTCxFQUFhLGVBQWMsRUFBRSxPQUFGLEVBQWhFO2FBQUwsQ0FMUixDQUhlOzs7OzBDQVdGO0FBQ2IsbUJBQU8sRUFBQyxrQkFBRCxFQUFQLENBRGE7Ozs7aUNBSVQ7OztBQUNBLHdCQURBO3lCQUUwRSxLQUFLLEtBQUwsQ0FGMUU7Z0JBRVUsZ0JBQVQsU0FGRDtnQkFFZ0MscUJBQWQsY0FGbEI7Z0JBRW9ELGNBQVAsT0FGN0M7Z0JBRTBELHVDQUYxRDs7O0FBSUosZ0JBQUcsQ0FBQyxNQUFELEVBQVE7QUFDUCxvQkFBRyxXQUFILEVBQ0ksbUNBQWdDLFdBQWhDLENBREosS0FHSSxVQUFTLEtBQVQsQ0FISjthQURKLE1BS00sSUFBRyxDQUFDLElBQUQsRUFBTTtBQUNYLG9CQUFHLENBQUMsY0FBRCxJQUFtQixNQUFNLE9BQU4sQ0FBYyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQWpDLElBQXlELEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsTUFBcEIsRUFDeEQsT0FBUSxvREFBVSxRQUFRLEtBQUssS0FBTCxDQUFXLFFBQVgsRUFBcUIsT0FBTzsrQkFBRyxPQUFLLFFBQUwsQ0FBYyxFQUFDLGdCQUFlLElBQWYsRUFBZjtxQkFBSCxFQUE5QyxDQUFSLENBREo7O0FBR0EsMEJBQVMsc0RBQVQsQ0FKVzthQUFULE1BS0EsSUFBRyxDQUFDLEtBQUssWUFBTCxFQUFrQjtBQUN4QiwwQkFBUyxtREFBUyxNQUFNLElBQU4sRUFBVCxDQUFULENBRHdCO2FBQXRCLE1BRUE7QUFDRiwwQkFBUSxLQUFLLGFBQUwsRUFBUixDQURFO2FBRkE7O0FBTU4sbUJBQ1E7O2tCQUFLLFdBQVUsYUFBVixFQUFMO2dCQUNJOztzQkFBSyxJQUFHLFdBQUgsRUFBZSxPQUFPLEVBQUMsV0FBVSxRQUFWLEVBQVIsRUFBcEI7b0JBQ0ssT0FETDtvQkFHSSxvREFBVSxLQUFJLEtBQUosRUFBVSxXQUFVLG9CQUFWLEVBQXBCLENBSEo7b0JBSUksbURBQVMsS0FBSSxTQUFKLEVBQWUsV0FBVSxrQkFBVixFQUF4QixDQUpKO2lCQURKO2FBRFIsQ0FwQkk7Ozs7d0NBZ0NPOzs7OzsrQkFJRCxRQUFPO0FBQ2pCLGdCQUFJLFVBQVEsSUFBSSxPQUFKLElBQWUsc0JBQU8sWUFBUCxDQURWO0FBRWpCLGdCQUFJLFlBQVUsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQVYsQ0FGYTtBQUdqQixnQkFBRyxDQUFDLFNBQUQsRUFBVztBQUNWLDRCQUFVLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFWLENBRFU7QUFFViwwQkFBVSxFQUFWLEdBQWEsS0FBYixDQUZVO0FBR1YseUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsU0FBMUIsRUFIVTthQUFkO0FBS04sZ0JBQUksUUFBTSxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBTixDQVJtQjtBQVN2QixxQkFBUyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxFQUF5QyxXQUF6QyxDQUFxRCxLQUFyRCxFQVR1QjtBQVV2QixrQkFBTSxTQUFOLEdBQWdCLHNCQUFvQixPQUFPLFdBQVAsR0FBbUIsS0FBdkMsQ0FWTztBQVd2QixzQkFBVSxLQUFWLENBQWdCLE1BQWhCLEdBQXVCLE9BQU8sV0FBUCxHQUFtQixJQUFuQixDQVhBOztBQWNqQixtQkFBTyxzQkFBTyxHQUFQLENBQVcsTUFBWCxFQUFtQixPQUFuQixFQUE0QixVQUFDLE9BQUQsRUFBVSxLQUFWLEVBQWtCO0FBQ2pELHdCQUFPLDhCQUFDLE9BQUQsSUFBUyxRQUFRLE1BQU0sTUFBTixFQUFjLE9BQU8sTUFBTSxLQUFOLEVBQXRDLENBQVAsRUFBNkQsU0FBN0QsRUFEaUQ7YUFBbEIsQ0FBbkMsQ0FkaUI7Ozs7V0FwRUo7Ozs7QUFzRnBCOztBQUVELElBQUksaUJBQUosR0FBc0IsRUFBQyxVQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsRUFBaEM7O0FBRUEsSUFBSSxVQUFKLEdBQWU7QUFDWCxhQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDVCxXQUFNLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDTixVQUFLLGdCQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDTCxjQUFTLGdCQUFNLFNBQU4sQ0FBZ0IsS0FBaEI7Q0FKYjtBQU1BLElBQUksWUFBSixHQUFpQixPQUFPLE1BQVAsQ0FBYztBQUMzQixhQUFRLHFCQUFSO0FBQ0EsMEJBQU0sRUFGcUI7O0FBRzNCLGNBQVMsRUFBVDtDQUhhLENBQWpCIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge2luaXQsVXNlcn0gZnJvbSBcIi4vZGJcIlxuaW1wb3J0IFJvdXRlciBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG52YXIgbXVpVGhlbWU9KG5ldyBTdHlsZXMuVGhlbWVNYW5hZ2VyKCkpLmdldEN1cnJlbnRUaGVtZSgpLFxuICAgIHtyZW5kZXJ9PVJlYWN0XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXG4gICAgICAgIHN1cHBvcnRUYXAoKVxuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWR9PXRoaXMucHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBfX3VzZXI6VXNlci5jdXJyZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZighYXBwSWQpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBhcHBsaWNhdGlvbiBrZXlcIilcblxuICAgICAgICBpZighc2VydmljZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIHNlcnZpY2UgdXJsXCIpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdmFyIHtpbml0OmluaXRBcHAsIHNlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cbiAgICAgICAgaW5pdChzZXJ2aWNlLCBhcHBJZCwgaW5pdEFwcCwgKGUsdHlwZT0nRXJyb3InKT0+dGhpcy5yZWZzLm1zZy5zaG93KGUsdHlwZSksIHRoaXMucmVmcy5sb2FkaW5nKVxuICAgICAgICAgICAgLnRoZW4oKF9fdHV0b3JpYWxpemVkPXRydWUpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe19faW5pdGVkOnRydWUsIF9fdXNlcjpVc2VyLmN1cnJlbnQsIF9fdHV0b3JpYWxpemVkfSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PnRoaXMuc2V0U3RhdGUoe19fdXNlcjpVc2VyLmN1cnJlbnR9KSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+dGhpcy5zZXRTdGF0ZSh7X19pbml0ZWQ6ZmFsc2UsX191c2VyOlVzZXIuY3VycmVudCxfX2luaXRlZEVycm9yOmUubWVzc2FnZX0pKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge211aVRoZW1lfVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgY29udGVudCxcbiAgICAgICAgICAgIHtfX2luaXRlZDppbml0ZWQsIF9faW5pdGVkRXJyb3I6aW5pdGVkRXJyb3IsIF9fdXNlcjp1c2VyLCBfX3R1dG9yaWFsaXplZH09dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFpbml0ZWQpe1xuICAgICAgICAgICAgaWYoaW5pdGVkRXJyb3IpXG4gICAgICAgICAgICAgICAgY29udGVudD0gYEluaXRpYWxpemluZyBFcnJvcjogJHtpbml0ZWRFcnJvcn1gXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY29udGVudD0gXCIuLi5cIlxuICAgICAgICB9ZWxzZSBpZighdXNlcil7XG4gICAgICAgICAgICBpZighX190dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT50aGlzLnNldFN0YXRlKHtfX3R1dG9yaWFsaXplZDp0cnVlfSl9Lz4pXG5cbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IC8+KVxuICAgICAgICB9ZWxzZSBpZighdXNlci5zZXNzaW9uVG9rZW4pe1xuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgdXNlcj17dXNlcn0vPilcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgY29udGVudD10aGlzLnJlbmRlckNvbnRlbnQoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpdGhGb290YmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJjb250YWluZXJcIiBzdHlsZT17e292ZXJmbG93WTpcInNjcm9sbFwifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICAvL2luaGVyaXRzIHNob3VsZCByZXR1cm4gY29tcG9uZW50XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbmRlcihyb3V0ZXMpe1xuICAgICAgICB2YXIgaGlzdG9yeT1BcHAuaGlzdG9yeSB8fCBSb3V0ZXIuSGFzaExvY2F0aW9uXG4gICAgICAgIHZhciBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgICAgIGlmKCFjb250YWluZXIpe1xuICAgICAgICAgICAgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250YWluZXIuaWQ9J2FwcCdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICB9XG5cdFx0dmFyIHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcblx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG5cdFx0Y29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG5cbiAgICAgICAgcmV0dXJuIFJvdXRlci5ydW4ocm91dGVzLCBoaXN0b3J5LCAoSGFuZGxlciwgc3RhdGUpPT57XG4gICAgICAgICAgICByZW5kZXIoPEhhbmRsZXIgcGFyYW1zPXtzdGF0ZS5wYXJhbXN9IHF1ZXJ5PXtzdGF0ZS5xdWVyeX0vPiwgY29udGFpbmVyKVxuICAgICAgICB9KVxuICAgIH1cbn07XG5cbkFwcC5jaGlsZENvbnRleHRUeXBlcz17bXVpVGhlbWU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuQXBwLnByb3BzVHlwZXM9e1xuICAgIHNlcnZpY2U6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBhcHBJZDpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgaW5pdDpSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICB0dXRvcmlhbDpSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcbn1cbkFwcC5kZWZhdWx0UHJvcHM9T2JqZWN0LmFzc2lnbih7XG4gICAgc2VydmljZTpcImh0dHA6Ly9xaWxpMi5jb20vMS9cIixcbiAgICBpbml0KCl7fSxcbiAgICB0dXRvcmlhbDpbXVxufSlcblxuLyoqXG4qQFRvZG86XG4qIHBvc2l0aW9uaW5nIGluIGJpZyBzY3JlZW5cbiAgICAqIEZsb2F0aW5nQWN0aW9uQnV0dG9uIDogZml4ZWQgcG9zaXRpb25cbiAgICAqIExvYWRpbmc6IGNvdmVyIEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgKiBNZXNzYWdlcjogZml4ZWQgYm90dG9tXG4qL1xuIl19