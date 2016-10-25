"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QiliApp = exports.ACTION = exports.REDUCER = undefined;

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

var QiliApp = exports.QiliApp = (0, _reactRedux.connect)(function (state) {
    return state.__;
})(App);

exports.default = QiliApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiQXBwIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJkaXNwYXRjaCIsImRvY3VtZW50IiwiZSIsInR5cGUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwiX190dXRvcmlhbGl6ZWQiLCJBQ1RJT04iLCJJTklUX0FQUCIsIm9uIiwiVVNFUl9DSEFOR0VEIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJpbml0ZWQiLCJfX2luaXRlZCIsImluaXRlZEVycm9yIiwiX19pbml0ZWRFcnJvciIsInVzZXIiLCJfX3VzZXIiLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXRTdGF0ZSIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlcyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5IiwibWlkZGxld2FycyIsIk9iamVjdCIsImFzc2lnbiIsIlJFRFVDRVIiLCJkZWZhdWx0UHJvcHMiLCJwcm9wc1R5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJhcnJheSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0IiwiY29udGV4dFR5cGVzIiwicm91dGVyIiwiX18iLCJzdGF0ZSIsImN1cnJlbnQiLCJhY3Rpb24iLCJlcnJvciIsIlFpbGlBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFTLG9EQUFmOztJQUVNQyxHOzs7QUFDRixpQkFBWUMsS0FBWixFQUFrQjtBQUFBOztBQUFBLDhHQUNSQSxLQURROztBQUdkOztBQUhjLDBCQUtTLE1BQUtBLEtBTGQ7QUFBQSxZQUtQQyxPQUxPLGVBS1BBLE9BTE87QUFBQSxZQUtFQyxLQUxGLGVBS0VBLEtBTEY7OztBQU9kLFlBQUcsQ0FBQ0EsS0FBSixFQUNJLE1BQU0sSUFBSUMsS0FBSixDQUFVLDZCQUFWLENBQU47O0FBRUosWUFBRyxDQUFDRixPQUFKLEVBQ0ksTUFBTSxJQUFJRSxLQUFKLENBQVUseUJBQVYsQ0FBTjtBQVhVO0FBWWpCOzs7OzRDQUVrQjtBQUFBOztBQUFBLHlCQUNxQyxLQUFLSCxLQUQxQztBQUFBLGdCQUNMSSxPQURLLFVBQ1ZDLElBRFU7QUFBQSxnQkFDSUosT0FESixVQUNJQSxPQURKO0FBQUEsZ0JBQ2FDLEtBRGIsVUFDYUEsS0FEYjtBQUFBLGdCQUNvQkksS0FEcEIsVUFDb0JBLEtBRHBCO0FBQUEsZ0JBQzJCQyxRQUQzQixVQUMyQkEsUUFEM0I7O0FBRXJCLGdCQUFHRCxLQUFILEVBQ0NFLFNBQVNGLEtBQVQsR0FBZUEsS0FBZjs7QUFFSywwQkFBS0wsT0FBTCxFQUFjQyxLQUFkLEVBQXFCRSxPQUFyQixFQUE4QixVQUFDSyxDQUFEO0FBQUEsb0JBQUdDLElBQUgsdUVBQVEsT0FBUjtBQUFBLHVCQUFrQixPQUFLQyxJQUFMLENBQVVDLEdBQVYsQ0FBY0MsSUFBZCxDQUFtQkosQ0FBbkIsRUFBcUJDLElBQXJCLENBQWxCO0FBQUEsYUFBOUIsRUFBNEUsS0FBS0MsSUFBTCxDQUFVRyxPQUF0RixFQUNLQyxJQURMLENBQ1UsWUFBdUI7QUFBQSxvQkFBdEJDLGNBQXNCLHVFQUFQLElBQU87O0FBQ3JCVCx5QkFBU1UsT0FBT0MsUUFBUCxDQUFnQixJQUFoQixFQUFxQixDQUFDLENBQUNGLGNBQXZCLENBQVQ7QUFDQSx5QkFBS0csRUFBTCxDQUFRLFFBQVIsRUFBa0I7QUFBQSwyQkFBSVosU0FBU1UsT0FBT0csWUFBaEIsQ0FBSjtBQUFBLGlCQUFsQjtBQUNILGFBSlQsRUFLUSxVQUFDWCxDQUFEO0FBQUEsdUJBQUtGLFNBQVNVLE9BQU9DLFFBQVAsQ0FBZ0JULEVBQUVZLE9BQWxCLENBQVQsQ0FBTDtBQUFBLGFBTFI7QUFNSDs7OzBDQUVnQjtBQUNiLGdCQUFJQyxPQUFLLElBQVQ7QUFDQSxtQkFBTztBQUNIeEIsa0NBREc7QUFFRnlCLDJCQUZFLHlCQUVXO0FBQ1ZELHlCQUFLQyxXQUFMLGFBQW9CQyxTQUFwQjtBQUNILGlCQUpFO0FBS0ZWLHVCQUxFLG1CQUtNVyxJQUxOLEVBS1c7QUFDVkgseUJBQUtYLElBQUwsQ0FBVUcsT0FBVixDQUFrQlcsT0FBTyxNQUFQLEdBQWdCLE9BQWxDO0FBQ0g7QUFQRSxhQUFQO0FBU0g7OztzQ0FFUztBQUFBOztBQUNaLDhCQUFLZCxJQUFMLENBQVVDLEdBQVYsRUFBY0MsSUFBZCxrQkFBc0JXLFNBQXRCO0FBQ0E7OztpQ0FHVTtBQUFBOztBQUNBO0FBREEsMEJBRTBFLEtBQUt4QixLQUYvRTtBQUFBLGdCQUVVMEIsTUFGVixXQUVDQyxRQUZEO0FBQUEsZ0JBRWdDQyxXQUZoQyxXQUVrQkMsYUFGbEI7QUFBQSxnQkFFb0RDLElBRnBELFdBRTZDQyxNQUY3QztBQUFBLGdCQUUwRGYsY0FGMUQsV0FFMERBLGNBRjFEOzs7QUFJSixnQkFBRyxDQUFDVSxNQUFKLEVBQVc7QUFDUCxvQkFBR0UsV0FBSCxFQUNJSSxtQ0FBZ0NKLFdBQWhDLENBREosS0FHSUksVUFBUyxLQUFUO0FBQ1AsYUFMRCxNQUtNLElBQUcsQ0FBQ0YsSUFBSixFQUFTO0FBQ1gsb0JBQUcsQ0FBQ2QsY0FBRCxJQUFtQmlCLE1BQU1DLE9BQU4sQ0FBYyxLQUFLbEMsS0FBTCxDQUFXbUMsUUFBekIsQ0FBbkIsSUFBeUQsS0FBS25DLEtBQUwsQ0FBV21DLFFBQVgsQ0FBb0JDLE1BQWhGLEVBQ0ksT0FBUSxvREFBVSxRQUFRLEtBQUtwQyxLQUFMLENBQVdtQyxRQUE3QixFQUF1QyxPQUFPO0FBQUEsK0JBQUcsT0FBS0UsUUFBTCxDQUFjLEVBQUNyQixnQkFBZSxJQUFoQixFQUFkLENBQUg7QUFBQSxxQkFBOUMsR0FBUjs7QUFFSmdCLDBCQUFTLHNEQUFUO0FBQ0gsYUFMSyxNQUtBLElBQUcsQ0FBQ0YsS0FBS1EsWUFBVCxFQUFzQjtBQUN4Qk4sMEJBQVMsbURBQVMsTUFBTUYsSUFBZixHQUFUO0FBQ0gsYUFGSyxNQUVBO0FBQ0ZFLDBCQUFRLEtBQUtPLGFBQUwsRUFBUjtBQUNIOztBQUVELG1CQUNRO0FBQUE7QUFBQSxrQkFBSyxXQUFVLGFBQWY7QUFDSTtBQUFBO0FBQUEsc0JBQUssSUFBRyxXQUFSLEVBQW9CLE9BQU8sRUFBQ0MsV0FBVSxRQUFYLEVBQTNCO0FBQ0tSLDJCQURMO0FBRUksd0VBQVUsS0FBSSxLQUFkLEVBQW9CLFdBQVUsb0JBQTlCLEdBRko7QUFHSSx1RUFBUyxLQUFJLFNBQWIsRUFBd0IsV0FBVSxrQkFBbEM7QUFISjtBQURKLGFBRFI7QUFTSDs7O3dDQUVjO0FBQ2pCLG1CQUFPLEtBQUtoQyxLQUFMLENBQVd5QyxRQUFsQjtBQUNHOzs7K0JBNEJhQyxNLEVBQTZDO0FBQUEsZ0JBQXJDMUMsS0FBcUMsdUVBQS9CLEVBQStCO0FBQUEsZ0JBQTNCMkMsUUFBMkIsdUVBQWxCLEVBQWtCOztBQUN2RCxnQkFBSUMsWUFBVXBDLFNBQVNxQyxjQUFULENBQXdCLEtBQXhCLENBQWQ7QUFDQSxnQkFBRyxDQUFDRCxTQUFKLEVBQWM7QUFDVkEsNEJBQVVwQyxTQUFTc0MsYUFBVCxDQUF1QixLQUF2QixDQUFWO0FBQ0FGLDBCQUFVRyxFQUFWLEdBQWEsS0FBYjtBQUNBdkMseUJBQVN3QyxJQUFULENBQWNDLFdBQWQsQ0FBMEJMLFNBQTFCO0FBQ0g7QUFDRCxnQkFBSU0sUUFBTTFDLFNBQVNzQyxhQUFULENBQXVCLE9BQXZCLENBQVY7QUFDQXRDLHFCQUFTMkMsb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUNGLFdBQXpDLENBQXFEQyxLQUFyRDtBQUNBQSxrQkFBTUUsU0FBTixHQUFnQixzQkFBb0JDLE9BQU9DLFdBQTNCLEdBQXVDLEtBQXZEO0FBQ0FWLHNCQUFVTSxLQUFWLENBQWdCSyxNQUFoQixHQUF1QkYsT0FBT0MsV0FBUCxHQUFtQixJQUExQzs7QUFFQSxnQkFBRyxDQUFDdEQsTUFBTXdELE9BQVYsRUFDSXhELE1BQU13RCxPQUFOOztBQWJtRCw4Q0FBWEMsVUFBVztBQUFYQSwwQkFBVztBQUFBOztBQWV2RCxtQkFBTyxzQkFDQztBQUFBO0FBQUEsa0JBQVUsT0FBTyx3QkFBWSw0QkFBZ0JDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCQyxPQUFqQixFQUF5QmpCLFFBQXpCLENBQWhCLENBQVosRUFBaUUsd0NBQW1CYyxVQUFuQixDQUFqRSxDQUFqQjtBQUNJO0FBQUE7QUFBWXpELHlCQUFaO0FBQ0swQztBQURMO0FBREosYUFERCxFQU1ERSxTQU5DLENBQVA7QUFPSDs7Ozs7O0FBaklDN0MsRyxDQW1GRThELFksR0FBYTtBQUNuQjVELGFBQVEscUJBRFc7QUFFbkJJLFFBRm1CLGtCQUViLENBQUUsQ0FGVzs7QUFHbkI4QixjQUFTO0FBSFUsQztBQW5GZnBDLEcsQ0F5RkUrRCxVLEdBQVc7QUFDakI3RCxhQUFTLGdCQUFNOEQsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJDLFVBRGY7QUFFakIvRCxXQUFNLGdCQUFNNkQsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJDLFVBRlo7QUFHakI1RCxVQUFLLGdCQUFNMEQsU0FBTixDQUFnQkcsSUFISjtBQUlqQi9CLGNBQVMsZ0JBQU00QixTQUFOLENBQWdCSSxLQUpSO0FBS2pCN0QsV0FBTyxnQkFBTXlELFNBQU4sQ0FBZ0JDO0FBTE4sQztBQXpGYmpFLEcsQ0FpR0VxRSxpQixHQUFrQjtBQUN4QnRFLGNBQVMsZ0JBQU1pRSxTQUFOLENBQWdCTSxNQUFoQixDQUF1QkosVUFEUjtBQUVsQjFDLGlCQUFhLGdCQUFNd0MsU0FBTixDQUFnQkcsSUFGWDtBQUdsQnBELGFBQVMsZ0JBQU1pRCxTQUFOLENBQWdCRztBQUhQLEM7QUFqR3BCbkUsRyxDQXVHRXVFLFksR0FBYTtBQUNuQkMsWUFBUSxnQkFBTVIsU0FBTixDQUFnQk07QUFETCxDO0FBNkJkLElBQU1ULDRCQUFRO0FBQ2pCWSxRQUFHLGNBQXNEO0FBQUEsWUFBckRDLEtBQXFELHVFQUEvQyxFQUFDOUMsVUFBUyxLQUFWLEVBQWlCSSxRQUFPLFNBQUsyQyxPQUE3QixFQUErQztBQUFBLFlBQVRDLE1BQVM7O0FBQ3JELGdCQUFPQSxPQUFPakUsSUFBZDtBQUNBLGlCQUFLLFFBQUw7QUFDSSx1QkFBTztBQUNIaUIsOEJBQVMsSUFETjtBQUVGSSw0QkFBTyxTQUFLMkMsT0FGVjtBQUdGMUQsb0NBQWUyRCxPQUFPM0Q7QUFIcEIsaUJBQVA7QUFLSjtBQUNBLGlCQUFLLGFBQUw7QUFDSSx1QkFBTztBQUNIVyw4QkFBUyxLQUROO0FBRUZJLDRCQUFPLFNBQUsyQyxPQUZWO0FBR0Y3QyxtQ0FBYzhDLE9BQU9DO0FBSG5CLGlCQUFQO0FBS0o7QUFDQSxpQkFBSyxjQUFMO0FBQ0ksdUJBQU87QUFDSGpELDhCQUFTLElBRE47QUFFRkksNEJBQU8sU0FBSzJDLE9BRlY7QUFHRjFELG9DQUFleUQsTUFBTXpEO0FBSG5CLGlCQUFQO0FBS0o7QUFDSSx1QkFBT3lELEtBQVA7QUF0Qko7QUF3Qkg7QUExQmdCLENBQWQ7O0FBNkJBLElBQU14RCwwQkFBTztBQUNuQkMsWUFEbUIsb0JBQ1YwRCxLQURVLEVBQ0o1RCxjQURJLEVBQ1c7QUFDN0IsWUFBRyxDQUFDLENBQUM0RCxLQUFMLEVBQVc7QUFDVixtQkFBTztBQUNObEUsc0JBQUssYUFEQztBQUVMb0IsMEJBRks7QUFHTDhDO0FBSEssYUFBUDtBQUtBLFNBTkQsTUFNSztBQUNKLG1CQUFPO0FBQ05sRSxzQkFBSyxRQURDO0FBRUxNO0FBRkssYUFBUDtBQUlBO0FBQ0QsS0Fka0I7QUFlbEJJLGtCQUFhO0FBQ2JWLGNBQUs7QUFEUTtBQWZLLENBQWI7O0FBb0JBLElBQU1tRSw0QkFBUSx5QkFBUTtBQUFBLFdBQU9KLE1BQU1ELEVBQWI7QUFBQSxDQUFSLEVBQXlCekUsR0FBekIsQ0FBZDs7a0JBRVE4RSxPIiwiZmlsZSI6InFpbGlBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgUmVhY3RET00sIHtyZW5kZXJ9IGZyb20gXCJyZWFjdC1kb21cIlxuXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IHtjcmVhdGVTdG9yZSxjb21iaW5lUmVkdWNlcnMsIGFwcGx5TWlkZGxld2FyZX0gZnJvbSBcInJlZHV4XCJcbmltcG9ydCB7UHJvdmlkZXIsIGNvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7U3R5bGVzLCBTbmFja2JhciwgVXRpbHMsIEZsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBnZXRNdWlUaGVtZSBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvZ2V0TXVpVGhlbWUnXG5pbXBvcnQgbGlnaHRCYXNlVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2Jhc2VUaGVtZXMvbGlnaHRCYXNlVGhlbWUnXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcblxuaW1wb3J0IHtpbml0LFVzZXJ9IGZyb20gXCIuL2RiXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tIFwiLi9jb21wb25lbnRzL21lc3NhZ2VyXCJcbmltcG9ydCBMb2FkaW5nIGZyb20gXCIuL2NvbXBvbmVudHMvbG9hZGluZ1wiXG5pbXBvcnQgc3VwcG9ydFRhcCBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJ1xuaW1wb3J0IEFjY291bnQgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5jb25zdCBtdWlUaGVtZT1nZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSlcblxuY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cbiAgICAgICAgc3VwcG9ydFRhcCgpXG5cbiAgICAgICAgY29uc3Qge3NlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cbiAgICAgICAgaWYoIWFwcElkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cbiAgICAgICAgaWYoIXNlcnZpY2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0aWYodGl0bGUpXG5cdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxuXG4gICAgICAgIGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcbiAgICAgICAgICAgIC50aGVuKChfX3R1dG9yaWFsaXplZD10cnVlKT0+e1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAobnVsbCwhIV9fdHV0b3JpYWxpemVkKSlcbiAgICAgICAgICAgICAgICAgICAgVXNlci5vbignY2hhbmdlJywgKCk9PmRpc3BhdGNoKEFDVElPTi5VU0VSX0NIQU5HRUQpKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGUpPT5kaXNwYXRjaChBQ1RJT04uSU5JVF9BUFAoZS5tZXNzYWdlKSkpXG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGxldCBzZWxmPXRoaXNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG11aVRoZW1lXG4gICAgICAgICAgICAsc2hvd01lc3NhZ2UoKXtcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dNZXNzYWdlKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICxsb2FkaW5nKG9wZW4pe1xuICAgICAgICAgICAgICAgIHNlbGYucmVmcy5sb2FkaW5nW29wZW4gPyBcInNob3dcIiA6IFwiY2xvc2VcIl0oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cdHNob3dNZXNzYWdlKCl7XG5cdFx0dGhpcy5yZWZzLm1zZy5zaG93KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsXG4gICAgICAgICAgICB7X19pbml0ZWQ6aW5pdGVkLCBfX2luaXRlZEVycm9yOmluaXRlZEVycm9yLCBfX3VzZXI6dXNlciwgX190dXRvcmlhbGl6ZWR9PXRoaXMucHJvcHNcblxuICAgICAgICBpZighaW5pdGVkKXtcbiAgICAgICAgICAgIGlmKGluaXRlZEVycm9yKVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IGBJbml0aWFsaXppbmcgRXJyb3I6ICR7aW5pdGVkRXJyb3J9YFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9IFwiLi4uXCJcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYoIV9fdHV0b3JpYWxpemVkICYmIEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy50dXRvcmlhbCkgJiYgdGhpcy5wcm9wcy50dXRvcmlhbC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuICg8VHV0b3JpYWwgc2xpZGVzPXt0aGlzLnByb3BzLnR1dG9yaWFsfSBvbkVuZD17ZT0+dGhpcy5zZXRTdGF0ZSh7X190dXRvcmlhbGl6ZWQ6dHJ1ZX0pfS8+KVxuXG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCAvPilcbiAgICAgICAgfWVsc2UgaWYoIXVzZXIuc2Vzc2lvblRva2VuKXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxBY2NvdW50IHVzZXI9e3VzZXJ9Lz4pXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aXRoRm9vdGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9e3tvdmVyZmxvd1k6XCJzY3JvbGxcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZXIgcmVmPVwibXNnXCIgY2xhc3NOYW1lPVwic3RpY2t5IGJvdHRvbSBsZWZ0XCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExvYWRpbmcgcmVmPVwibG9hZGluZ1wiICBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICB9XG5cblxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0aW5pdCgpe30sXG5cdFx0dHV0b3JpYWw6W11cblx0fVxuXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0YXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0dHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgc2hvd01lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH1cblxuICAgIHN0YXRpYyByZW5kZXIocm91dGVzLCBwcm9wcz17fSwgcmVkdWNlcnM9e30sIC4uLm1pZGRsZXdhcnMpe1xuICAgICAgICBsZXQgY29udGFpbmVyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuICAgICAgICBpZighY29udGFpbmVyKXtcbiAgICAgICAgICAgIGNvbnRhaW5lcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY29udGFpbmVyLmlkPSdhcHAnXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3R5bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MPVwiLnBhZ2V7bWluLWhlaWdodDpcIit3aW5kb3cuaW5uZXJIZWlnaHQrXCJweH1cIlxuICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0PXdpbmRvdy5pbm5lckhlaWdodCsncHgnXG5cbiAgICAgICAgaWYoIXByb3BzLmhpc3RvcnkpXG4gICAgICAgICAgICBwcm9wcy5oaXN0b3J5PWhhc2hIaXN0b3J5XG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcigoXG4gICAgICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtjcmVhdGVTdG9yZShjb21iaW5lUmVkdWNlcnMoT2JqZWN0LmFzc2lnbih7fSxSRURVQ0VSLHJlZHVjZXJzKSksIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJzKSl9PlxuICAgICAgICAgICAgICAgICAgICA8Um91dGVyIHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm91dGVzfVxuICAgICAgICAgICAgICAgICAgICA8L1JvdXRlcj5cbiAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgKSxjb250YWluZXIpXG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj17XG4gICAgX186KHN0YXRlPXtfX2luaXRlZDpmYWxzZSwgX191c2VyOlVzZXIuY3VycmVudH0sYWN0aW9uKT0+e1xuICAgICAgICBzd2l0Y2goYWN0aW9uLnR5cGUpe1xuICAgICAgICBjYXNlICdpbml0ZWQnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBfX2luaXRlZDp0cnVlXG4gICAgICAgICAgICAgICAgLF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAsX190dXRvcmlhbGl6ZWQ6YWN0aW9uLl9fdHV0b3JpYWxpemVkXG4gICAgICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2luaXRlZEVycm9yJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgX19pbml0ZWQ6ZmFsc2VcbiAgICAgICAgICAgICAgICAsX191c2VyOlVzZXIuY3VycmVudFxuICAgICAgICAgICAgICAgICxfX2luaXRlZEVycm9yOmFjdGlvbi5lcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlICd1c2VyLmNoYW5nZWQnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBfX2luaXRlZDp0cnVlXG4gICAgICAgICAgICAgICAgLF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAsX190dXRvcmlhbGl6ZWQ6c3RhdGUuX190dXRvcmlhbGl6ZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsX190dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpcImluaXRlZEVycm9yXCJcblx0XHRcdFx0LHVzZXJcblx0XHRcdFx0LGVycm9yXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOlwiaW5pdGVkXCJcblx0XHRcdFx0LF9fdHV0b3JpYWxpemVkXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdCxVU0VSX0NIQU5HRUQ6e1xuXHRcdHR5cGU6XCJ1c2VyLmNoYW5nZWRcIlxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBRaWxpQXBwPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLl9fKShBcHApXG5cbmV4cG9ydCBkZWZhdWx0IFFpbGlBcHBcbiJdfQ==