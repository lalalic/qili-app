"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ACTION = exports.REDUCER = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require("react-router");

var _redux = require("redux");

var _reactRedux = require("react-redux");

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

var muiTheme = (0, _getMuiTheme2.default)(_lightBaseTheme2.default);

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        (0, _reactTapEventPlugin2.default)();

        var _this$props = _this.props;
        var service = _this$props.service;
        var appId = _this$props.appId;


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
            var dispatch = _props.dispatch;

            if (title) document.title = title;

            (0, _db.init)(service, appId, initApp, function (e) {
                var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Error';
                return _this2.refs.msg.show(e, type);
            }, this.refs.loading).then(function () {
                var __tutorialized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                dispatch(ACTION.INIT_APP(null, !!__tutorialized));
                _db.User.on('change', function () {
                    return dispatch(ACTION.USER_CHANGED);
                });
            }, function (e) {
                return dispatch(ACTION.INIT_APP(e.message));
            });
        }
    }, {
        key: "getChildContext",
        value: function getChildContext() {
            var self = this;
            return {
                muiTheme: muiTheme,
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
            var _props2 = this.props;
            var inited = _props2.__inited;
            var initedError = _props2.__initedError;
            var user = _props2.__user;
            var __tutorialized = _props2.__tutorialized;


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
            var reducers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

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

            for (var _len = arguments.length, middlewars = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                middlewars[_key - 3] = arguments[_key];
            }

            return (0, _reactDom.render)(_react2.default.createElement(
                _reactRedux.Provider,
                { store: (0, _redux.createStore)((0, _redux.combineReducers)(Object.assign({}, REDUCER, reducers)), _redux.applyMiddleware.apply(undefined, middlewars)) },
                _react2.default.createElement(
                    _reactRouter.Router,
                    props,
                    routes
                )
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
var REDUCER = exports.REDUCER = {
    __: function __() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { __inited: false, __user: _db.User.current };
        var action = arguments[1];

        switch (action.type) {
            case 'inited':
                return {
                    __inited: true,
                    __user: _db.User.current,
                    __tutorialized: action.__tutorialized
                };
                break;
            case 'initedError':
                return {
                    __inited: false,
                    __user: _db.User.current,
                    __initedError: action.error
                };
                break;
            case 'user.changed':
                return {
                    __inited: true,
                    __user: _db.User.current,
                    __tutorialized: state.__tutorialized
                };
            default:
                return state;
        }
    }
};

var ACTION = exports.ACTION = {
    INIT_APP: function INIT_APP(error, __tutorialized) {
        if (!!error) {
            return {
                type: "initedError",
                user: user,
                error: error
            };
        } else {
            return {
                type: "inited",
                __tutorialized: __tutorialized
            };
        }
    },
    USER_CHANGED: {
        type: "user.changed"
    }
};

var ReduxApp = (0, _reactRedux.connect)(function (state) {
    return state.__;
})(App);

console.dir(ReduxApp);

exports.default = ReduxApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiQXBwIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJkaXNwYXRjaCIsImRvY3VtZW50IiwiZSIsInR5cGUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwiX190dXRvcmlhbGl6ZWQiLCJBQ1RJT04iLCJJTklUX0FQUCIsIm9uIiwiVVNFUl9DSEFOR0VEIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJpbml0ZWQiLCJfX2luaXRlZCIsImluaXRlZEVycm9yIiwiX19pbml0ZWRFcnJvciIsInVzZXIiLCJfX3VzZXIiLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXRTdGF0ZSIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlcyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5IiwibWlkZGxld2FycyIsIk9iamVjdCIsImFzc2lnbiIsIlJFRFVDRVIiLCJkZWZhdWx0UHJvcHMiLCJwcm9wc1R5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJhcnJheSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0IiwiY29udGV4dFR5cGVzIiwicm91dGVyIiwiX18iLCJzdGF0ZSIsImN1cnJlbnQiLCJhY3Rpb24iLCJlcnJvciIsIlJlZHV4QXBwIiwiY29uc29sZSIsImRpciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVMsb0RBQWY7O0lBRU1DLEc7OztBQUNGLGlCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUEsOEdBQ1JBLEtBRFE7O0FBR2Q7O0FBSGMsMEJBS1MsTUFBS0EsS0FMZDtBQUFBLFlBS1BDLE9BTE8sZUFLUEEsT0FMTztBQUFBLFlBS0VDLEtBTEYsZUFLRUEsS0FMRjs7O0FBT2QsWUFBRyxDQUFDQSxLQUFKLEVBQ0ksTUFBTSxJQUFJQyxLQUFKLENBQVUsNkJBQVYsQ0FBTjs7QUFFSixZQUFHLENBQUNGLE9BQUosRUFDSSxNQUFNLElBQUlFLEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBWFU7QUFZakI7Ozs7NENBRWtCO0FBQUE7O0FBQUEseUJBQ3FDLEtBQUtILEtBRDFDO0FBQUEsZ0JBQ0xJLE9BREssVUFDVkMsSUFEVTtBQUFBLGdCQUNJSixPQURKLFVBQ0lBLE9BREo7QUFBQSxnQkFDYUMsS0FEYixVQUNhQSxLQURiO0FBQUEsZ0JBQ29CSSxLQURwQixVQUNvQkEsS0FEcEI7QUFBQSxnQkFDMkJDLFFBRDNCLFVBQzJCQSxRQUQzQjs7QUFFckIsZ0JBQUdELEtBQUgsRUFDQ0UsU0FBU0YsS0FBVCxHQUFlQSxLQUFmOztBQUVLLDBCQUFLTCxPQUFMLEVBQWNDLEtBQWQsRUFBcUJFLE9BQXJCLEVBQThCLFVBQUNLLENBQUQ7QUFBQSxvQkFBR0MsSUFBSCx1RUFBUSxPQUFSO0FBQUEsdUJBQWtCLE9BQUtDLElBQUwsQ0FBVUMsR0FBVixDQUFjQyxJQUFkLENBQW1CSixDQUFuQixFQUFxQkMsSUFBckIsQ0FBbEI7QUFBQSxhQUE5QixFQUE0RSxLQUFLQyxJQUFMLENBQVVHLE9BQXRGLEVBQ0tDLElBREwsQ0FDVSxZQUF1QjtBQUFBLG9CQUF0QkMsY0FBc0IsdUVBQVAsSUFBTzs7QUFDckJULHlCQUFTVSxPQUFPQyxRQUFQLENBQWdCLElBQWhCLEVBQXFCLENBQUMsQ0FBQ0YsY0FBdkIsQ0FBVDtBQUNBLHlCQUFLRyxFQUFMLENBQVEsUUFBUixFQUFrQjtBQUFBLDJCQUFJWixTQUFTVSxPQUFPRyxZQUFoQixDQUFKO0FBQUEsaUJBQWxCO0FBQ0gsYUFKVCxFQUtRLFVBQUNYLENBQUQ7QUFBQSx1QkFBS0YsU0FBU1UsT0FBT0MsUUFBUCxDQUFnQlQsRUFBRVksT0FBbEIsQ0FBVCxDQUFMO0FBQUEsYUFMUjtBQU1IOzs7MENBRWdCO0FBQ2IsZ0JBQUlDLE9BQUssSUFBVDtBQUNBLG1CQUFPO0FBQ0h4QixrQ0FERztBQUVGeUIsMkJBRkUseUJBRVc7QUFDVkQseUJBQUtDLFdBQUwsYUFBb0JDLFNBQXBCO0FBQ0gsaUJBSkU7QUFLRlYsdUJBTEUsbUJBS01XLElBTE4sRUFLVztBQUNWSCx5QkFBS1gsSUFBTCxDQUFVRyxPQUFWLENBQWtCVyxPQUFPLE1BQVAsR0FBZ0IsT0FBbEM7QUFDSDtBQVBFLGFBQVA7QUFTSDs7O3NDQUVTO0FBQUE7O0FBQ1osOEJBQUtkLElBQUwsQ0FBVUMsR0FBVixFQUFjQyxJQUFkLGtCQUFzQlcsU0FBdEI7QUFDQTs7O2lDQUdVO0FBQUE7O0FBQ0E7QUFEQSwwQkFFMEUsS0FBS3hCLEtBRi9FO0FBQUEsZ0JBRVUwQixNQUZWLFdBRUNDLFFBRkQ7QUFBQSxnQkFFZ0NDLFdBRmhDLFdBRWtCQyxhQUZsQjtBQUFBLGdCQUVvREMsSUFGcEQsV0FFNkNDLE1BRjdDO0FBQUEsZ0JBRTBEZixjQUYxRCxXQUUwREEsY0FGMUQ7OztBQUlKLGdCQUFHLENBQUNVLE1BQUosRUFBVztBQUNQLG9CQUFHRSxXQUFILEVBQ0lJLG1DQUFnQ0osV0FBaEMsQ0FESixLQUdJSSxVQUFTLEtBQVQ7QUFDUCxhQUxELE1BS00sSUFBRyxDQUFDRixJQUFKLEVBQVM7QUFDWCxvQkFBRyxDQUFDZCxjQUFELElBQW1CaUIsTUFBTUMsT0FBTixDQUFjLEtBQUtsQyxLQUFMLENBQVdtQyxRQUF6QixDQUFuQixJQUF5RCxLQUFLbkMsS0FBTCxDQUFXbUMsUUFBWCxDQUFvQkMsTUFBaEYsRUFDSSxPQUFRLG9EQUFVLFFBQVEsS0FBS3BDLEtBQUwsQ0FBV21DLFFBQTdCLEVBQXVDLE9BQU87QUFBQSwrQkFBRyxPQUFLRSxRQUFMLENBQWMsRUFBQ3JCLGdCQUFlLElBQWhCLEVBQWQsQ0FBSDtBQUFBLHFCQUE5QyxHQUFSOztBQUVKZ0IsMEJBQVMsc0RBQVQ7QUFDSCxhQUxLLE1BS0EsSUFBRyxDQUFDRixLQUFLUSxZQUFULEVBQXNCO0FBQ3hCTiwwQkFBUyxtREFBUyxNQUFNRixJQUFmLEdBQVQ7QUFDSCxhQUZLLE1BRUE7QUFDRkUsMEJBQVEsS0FBS08sYUFBTCxFQUFSO0FBQ0g7O0FBRUQsbUJBQ1E7QUFBQTtBQUFBLGtCQUFLLFdBQVUsYUFBZjtBQUNJO0FBQUE7QUFBQSxzQkFBSyxJQUFHLFdBQVIsRUFBb0IsT0FBTyxFQUFDQyxXQUFVLFFBQVgsRUFBM0I7QUFDS1IsMkJBREw7QUFFSSx3RUFBVSxLQUFJLEtBQWQsRUFBb0IsV0FBVSxvQkFBOUIsR0FGSjtBQUdJLHVFQUFTLEtBQUksU0FBYixFQUF3QixXQUFVLGtCQUFsQztBQUhKO0FBREosYUFEUjtBQVNIOzs7d0NBRWM7QUFDakIsbUJBQU8sS0FBS2hDLEtBQUwsQ0FBV3lDLFFBQWxCO0FBQ0c7OzsrQkE0QmFDLE0sRUFBNkM7QUFBQSxnQkFBckMxQyxLQUFxQyx1RUFBL0IsRUFBK0I7QUFBQSxnQkFBM0IyQyxRQUEyQix1RUFBbEIsRUFBa0I7O0FBQ3ZELGdCQUFJQyxZQUFVcEMsU0FBU3FDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBZDtBQUNBLGdCQUFHLENBQUNELFNBQUosRUFBYztBQUNWQSw0QkFBVXBDLFNBQVNzQyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQUYsMEJBQVVHLEVBQVYsR0FBYSxLQUFiO0FBQ0F2Qyx5QkFBU3dDLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkwsU0FBMUI7QUFDSDtBQUNELGdCQUFJTSxRQUFNMUMsU0FBU3NDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBVjtBQUNBdEMscUJBQVMyQyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxFQUF5Q0YsV0FBekMsQ0FBcURDLEtBQXJEO0FBQ0FBLGtCQUFNRSxTQUFOLEdBQWdCLHNCQUFvQkMsT0FBT0MsV0FBM0IsR0FBdUMsS0FBdkQ7QUFDQVYsc0JBQVVNLEtBQVYsQ0FBZ0JLLE1BQWhCLEdBQXVCRixPQUFPQyxXQUFQLEdBQW1CLElBQTFDOztBQUVBLGdCQUFHLENBQUN0RCxNQUFNd0QsT0FBVixFQUNJeEQsTUFBTXdELE9BQU47O0FBYm1ELDhDQUFYQyxVQUFXO0FBQVhBLDBCQUFXO0FBQUE7O0FBZXZELG1CQUFPLHNCQUNDO0FBQUE7QUFBQSxrQkFBVSxPQUFPLHdCQUFZLDRCQUFnQkMsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJDLE9BQWpCLEVBQXlCakIsUUFBekIsQ0FBaEIsQ0FBWixFQUFpRSx3Q0FBbUJjLFVBQW5CLENBQWpFLENBQWpCO0FBQ0k7QUFBQTtBQUFZekQseUJBQVo7QUFDSzBDO0FBREw7QUFESixhQURELEVBTURFLFNBTkMsQ0FBUDtBQU9IOzs7Ozs7QUFqSUM3QyxHLENBbUZFOEQsWSxHQUFhO0FBQ25CNUQsYUFBUSxxQkFEVztBQUVuQkksUUFGbUIsa0JBRWIsQ0FBRSxDQUZXOztBQUduQjhCLGNBQVM7QUFIVSxDO0FBbkZmcEMsRyxDQXlGRStELFUsR0FBVztBQUNqQjdELGFBQVMsZ0JBQU04RCxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsVUFEZjtBQUVqQi9ELFdBQU0sZ0JBQU02RCxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsVUFGWjtBQUdqQjVELFVBQUssZ0JBQU0wRCxTQUFOLENBQWdCRyxJQUhKO0FBSWpCL0IsY0FBUyxnQkFBTTRCLFNBQU4sQ0FBZ0JJLEtBSlI7QUFLakI3RCxXQUFPLGdCQUFNeUQsU0FBTixDQUFnQkM7QUFMTixDO0FBekZiakUsRyxDQWlHRXFFLGlCLEdBQWtCO0FBQ3hCdEUsY0FBUyxnQkFBTWlFLFNBQU4sQ0FBZ0JNLE1BQWhCLENBQXVCSixVQURSO0FBRWxCMUMsaUJBQWEsZ0JBQU13QyxTQUFOLENBQWdCRyxJQUZYO0FBR2xCcEQsYUFBUyxnQkFBTWlELFNBQU4sQ0FBZ0JHO0FBSFAsQztBQWpHcEJuRSxHLENBdUdFdUUsWSxHQUFhO0FBQ25CQyxZQUFRLGdCQUFNUixTQUFOLENBQWdCTTtBQURMLEM7QUE2QmQsSUFBTVQsNEJBQVE7QUFDakJZLFFBQUcsY0FBc0Q7QUFBQSxZQUFyREMsS0FBcUQsdUVBQS9DLEVBQUM5QyxVQUFTLEtBQVYsRUFBaUJJLFFBQU8sU0FBSzJDLE9BQTdCLEVBQStDO0FBQUEsWUFBVEMsTUFBUzs7QUFDckQsZ0JBQU9BLE9BQU9qRSxJQUFkO0FBQ0EsaUJBQUssUUFBTDtBQUNJLHVCQUFPO0FBQ0hpQiw4QkFBUyxJQUROO0FBRUZJLDRCQUFPLFNBQUsyQyxPQUZWO0FBR0YxRCxvQ0FBZTJELE9BQU8zRDtBQUhwQixpQkFBUDtBQUtKO0FBQ0EsaUJBQUssYUFBTDtBQUNJLHVCQUFPO0FBQ0hXLDhCQUFTLEtBRE47QUFFRkksNEJBQU8sU0FBSzJDLE9BRlY7QUFHRjdDLG1DQUFjOEMsT0FBT0M7QUFIbkIsaUJBQVA7QUFLSjtBQUNBLGlCQUFLLGNBQUw7QUFDSSx1QkFBTztBQUNIakQsOEJBQVMsSUFETjtBQUVGSSw0QkFBTyxTQUFLMkMsT0FGVjtBQUdGMUQsb0NBQWV5RCxNQUFNekQ7QUFIbkIsaUJBQVA7QUFLSjtBQUNJLHVCQUFPeUQsS0FBUDtBQXRCSjtBQXdCSDtBQTFCZ0IsQ0FBZDs7QUE2QkEsSUFBTXhELDBCQUFPO0FBQ25CQyxZQURtQixvQkFDVjBELEtBRFUsRUFDSjVELGNBREksRUFDVztBQUM3QixZQUFHLENBQUMsQ0FBQzRELEtBQUwsRUFBVztBQUNWLG1CQUFPO0FBQ05sRSxzQkFBSyxhQURDO0FBRUxvQiwwQkFGSztBQUdMOEM7QUFISyxhQUFQO0FBS0EsU0FORCxNQU1LO0FBQ0osbUJBQU87QUFDTmxFLHNCQUFLLFFBREM7QUFFTE07QUFGSyxhQUFQO0FBSUE7QUFDRCxLQWRrQjtBQWVsQkksa0JBQWE7QUFDYlYsY0FBSztBQURRO0FBZkssQ0FBYjs7QUFvQlAsSUFBTW1FLFdBQVMseUJBQVE7QUFBQSxXQUFPSixNQUFNRCxFQUFiO0FBQUEsQ0FBUixFQUF5QnpFLEdBQXpCLENBQWY7O0FBRUErRSxRQUFRQyxHQUFSLENBQVlGLFFBQVo7O2tCQUVlQSxRIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxuXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IHtjcmVhdGVTdG9yZSxjb21iaW5lUmVkdWNlcnMsIGFwcGx5TWlkZGxld2FyZX0gZnJvbSBcInJlZHV4XCJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5jb25zdCBtdWlUaGVtZT1nZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSlcblxuY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cbiAgICAgICAgc3VwcG9ydFRhcCgpXG5cbiAgICAgICAgY29uc3Qge3NlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cbiAgICAgICAgaWYoIWFwcElkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cbiAgICAgICAgaWYoIXNlcnZpY2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0aWYodGl0bGUpXG5cdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxuXG4gICAgICAgIGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcbiAgICAgICAgICAgIC50aGVuKChfX3R1dG9yaWFsaXplZD10cnVlKT0+e1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIV9fdHV0b3JpYWxpemVkKSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQpKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGxldCBzZWxmPXRoaXNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG11aVRoZW1lXG4gICAgICAgICAgICAsc2hvd01lc3NhZ2UoKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICxsb2FkaW5nKG9wZW4pe1xuICAgICAgICAgICAgICAgIHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cdHNob3dNZXNzYWdlKCl7XG5cdFx0dGhpcy5yZWZzLm1zZy5zaG93KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsXG4gICAgICAgICAgICB7X19pbml0ZWQ6aW5pdGVkLCBfX2luaXRlZEVycm9yOmluaXRlZEVycm9yLCBfX3VzZXI6dXNlciwgX190dXRvcmlhbGl6ZWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIV9fdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+dGhpcy5zZXRTdGF0ZSh7X190dXRvcmlhbGl6ZWQ6dHJ1ZX0pfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cblxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0aW5pdCgpe30sXG5cdFx0dHV0b3JpYWw6W11cblx0fVxuXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0YXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0dHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgc2hvd01lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuICAgIHN0YXRpYyByZW5kZXIocm91dGVzLCBwcm9wcz17fSwgcmVkdWNlcnM9e30sIC4uLm1pZGRsZXdhcnMpe1xuICAgICAgICBsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxuICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG5cbiAgICAgICAgaWYoIXByb3BzLmhpc3RvcnkpXG4gICAgICAgICAgICBwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcigoXG4gICAgICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtjcmVhdGVTdG9yZShjb21iaW5lUmVkdWNlcnMoT2JqZWN0LmFzc2lnbih7fSxSRURVQ0VSLHJlZHVjZXJzKSksIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJzKSl9PlxuICAgICAgICAgICAgICAgICAgICA8Um91dGVyIHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm91dGVzfVxuICAgICAgICAgICAgICAgICAgICA8L1JvdXRlcj5cbiAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgKSxjb250YWluZXIpXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj17XG4gICAgX186KHN0YXRlPXtfX2luaXRlZDpmYWxzZSwgX191c2VyOlVzZXIuY3VycmVudH0sYWN0aW9uKT0+e1xuICAgICAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlICdpbml0ZWQnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBfX2luaXRlZDp0cnVlXG4gICAgICAgICAgICAgICAgLF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAsX190dXRvcmlhbGl6ZWQ6YWN0aW9uLl9fdHV0b3JpYWxpemVkXG4gICAgICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2luaXRlZEVycm9yJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgX19pbml0ZWQ6ZmFsc2VcbiAgICAgICAgICAgICAgICAsX191c2VyOlVzZXIuY3VycmVudFxuICAgICAgICAgICAgICAgICxfX2luaXRlZEVycm9yOmFjdGlvbi5lcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlICd1c2VyLmNoYW5nZWQnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBfX2luaXRlZDp0cnVlXG4gICAgICAgICAgICAgICAgLF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAsX190dXRvcmlhbGl6ZWQ6c3RhdGUuX190dXRvcmlhbGl6ZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsX190dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpcImluaXRlZEVycm9yXCJcblx0XHRcdFx0LHVzZXJcblx0XHRcdFx0LGVycm9yXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOlwiaW5pdGVkXCJcblx0XHRcdFx0LF9fdHV0b3JpYWxpemVkXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdCxVU0VSX0NIQU5HRUQ6e1xuXHRcdHR5cGU6XCJ1c2VyLmNoYW5nZWRcIlxuXHR9XG59XG5cbmNvbnN0IFJlZHV4QXBwPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLl9fKShBcHApXG5cbmNvbnNvbGUuZGlyKFJlZHV4QXBwKVxuXG5leHBvcnQgZGVmYXVsdCBSZWR1eEFwcFxuIl19