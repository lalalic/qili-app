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

var _qiliApp = require("./action/qiliApp");

var _qiliApp2 = require("./reducer/qiliApp");

var _qiliApp3 = _interopRequireDefault(_qiliApp2);

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

        var _this$props = _this.props,
            service = _this$props.service,
            appId = _this$props.appId;


        if (!appId) throw new Error("Please give application key");

        if (!service) throw new Error("Please give service url");
        return _this;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                initApp = _props.init,
                service = _props.service,
                appId = _props.appId,
                title = _props.title,
                dispatch = _props.dispatch;

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

            var content,
                _props2 = this.props,
                inited = _props2.__inited,
                initedError = _props2.__initedError,
                user = _props2.__user,
                __tutorialized = _props2.__tutorialized;


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
                { store: (0, _redux.createStore)((0, _redux.combineReducers)(Object.assign({ __: REDUCER }, reducers)), _redux.applyMiddleware.apply(undefined, middlewars)) },
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


var REDUCER = function REDUCER() {
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
            return Object.assign({}, state, { __user: _db.User.current });
        default:
            return state;
    }
};

var ACTION = {
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

exports.default = (0, _reactRedux.connect)(function (state) {
    return state.__;
})(App);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiQXBwIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJkaXNwYXRjaCIsImRvY3VtZW50IiwiZSIsInR5cGUiLCJyZWZzIiwibXNnIiwic2hvdyIsImxvYWRpbmciLCJ0aGVuIiwiX190dXRvcmlhbGl6ZWQiLCJBQ1RJT04iLCJJTklUX0FQUCIsIm9uIiwiVVNFUl9DSEFOR0VEIiwibWVzc2FnZSIsInNlbGYiLCJzaG93TWVzc2FnZSIsImFyZ3VtZW50cyIsIm9wZW4iLCJpbml0ZWQiLCJfX2luaXRlZCIsImluaXRlZEVycm9yIiwiX19pbml0ZWRFcnJvciIsInVzZXIiLCJfX3VzZXIiLCJjb250ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwidHV0b3JpYWwiLCJsZW5ndGgiLCJzZXRTdGF0ZSIsInNlc3Npb25Ub2tlbiIsInJlbmRlckNvbnRlbnQiLCJvdmVyZmxvd1kiLCJjaGlsZHJlbiIsInJvdXRlcyIsInJlZHVjZXJzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzdHlsZSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJoZWlnaHQiLCJoaXN0b3J5IiwibWlkZGxld2FycyIsIk9iamVjdCIsImFzc2lnbiIsIl9fIiwiUkVEVUNFUiIsImRlZmF1bHRQcm9wcyIsInByb3BzVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiZnVuYyIsImFycmF5IiwiY2hpbGRDb250ZXh0VHlwZXMiLCJvYmplY3QiLCJjb250ZXh0VHlwZXMiLCJyb3V0ZXIiLCJzdGF0ZSIsImN1cnJlbnQiLCJhY3Rpb24iLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7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QUFJQTtBQUNELEtBZFc7QUFlWEksa0JBQWE7QUFDYlYsY0FBSztBQURRO0FBZkYsQ0FBYjs7a0JBb0JlLHlCQUFRO0FBQUEsV0FBTytELE1BQU1iLEVBQWI7QUFBQSxDQUFSLEVBQXlCN0QsR0FBekIsQyIsImZpbGUiOiJxaWxpQXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFJlYWN0RE9NLCB7cmVuZGVyfSBmcm9tIFwicmVhY3QtZG9tXCJcblxuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeX0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCB7Y3JlYXRlU3RvcmUsY29tYmluZVJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmV9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBUdXRvcmlhbCBmcm9tIFwiLi9jb21wb25lbnRzL3R1dG9yaWFsXCJcblxuaW1wb3J0IHtJTklUX0FQUCwgVVNFUl9DSEFOR0VEfSBmcm9tIFwiLi9hY3Rpb24vcWlsaUFwcFwiXG5pbXBvcnQgUUlMSV9BUFAgZnJvbSBcIi4vcmVkdWNlci9xaWxpQXBwXCJcblxuY29uc3QgbXVpVGhlbWU9Z2V0TXVpVGhlbWUobGlnaHRCYXNlVGhlbWUpXG5cbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuXG4gICAgICAgIHN1cHBvcnRUYXAoKVxuXG4gICAgICAgIGNvbnN0IHtzZXJ2aWNlLCBhcHBJZH09dGhpcy5wcm9wc1xuXG4gICAgICAgIGlmKCFhcHBJZClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBnaXZlIGFwcGxpY2F0aW9uIGtleVwiKVxuXG4gICAgICAgIGlmKCFzZXJ2aWNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgc2VydmljZSB1cmxcIilcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICB2YXIge2luaXQ6aW5pdEFwcCwgc2VydmljZSwgYXBwSWQsIHRpdGxlLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGlmKHRpdGxlKVxuXHRcdFx0ZG9jdW1lbnQudGl0bGU9dGl0bGVcblxuICAgICAgICBpbml0KHNlcnZpY2UsIGFwcElkLCBpbml0QXBwLCAoZSx0eXBlPSdFcnJvcicpPT50aGlzLnJlZnMubXNnLnNob3coZSx0eXBlKSwgdGhpcy5yZWZzLmxvYWRpbmcpXG4gICAgICAgICAgICAudGhlbigoX190dXRvcmlhbGl6ZWQ9dHJ1ZSk9PntcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKG51bGwsISFfX3R1dG9yaWFsaXplZCkpXG4gICAgICAgICAgICAgICAgICAgIFVzZXIub24oJ2NoYW5nZScsICgpPT5kaXNwYXRjaChBQ1RJT04uVVNFUl9DSEFOR0VEKSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIChlKT0+ZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKGUubWVzc2FnZSkpKVxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBsZXQgc2VsZj10aGlzXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtdWlUaGVtZVxuICAgICAgICAgICAgLHNob3dNZXNzYWdlKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93TWVzc2FnZSguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAsbG9hZGluZyhvcGVuKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlZnMubG9hZGluZ1tvcGVuID8gXCJzaG93XCIgOiBcImNsb3NlXCJdKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXHRzaG93TWVzc2FnZSgpe1xuXHRcdHRoaXMucmVmcy5tc2cuc2hvdyguLi5hcmd1bWVudHMpXG5cdH1cblxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBjb250ZW50LFxuICAgICAgICAgICAge19faW5pdGVkOmluaXRlZCwgX19pbml0ZWRFcnJvcjppbml0ZWRFcnJvciwgX191c2VyOnVzZXIsIF9fdHV0b3JpYWxpemVkfT10aGlzLnByb3BzXG5cbiAgICAgICAgaWYoIWluaXRlZCl7XG4gICAgICAgICAgICBpZihpbml0ZWRFcnJvcilcbiAgICAgICAgICAgICAgICBjb250ZW50PSBgSW5pdGlhbGl6aW5nIEVycm9yOiAke2luaXRlZEVycm9yfWBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb250ZW50PSBcIi4uLlwiXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyKXtcbiAgICAgICAgICAgIGlmKCFfX3R1dG9yaWFsaXplZCAmJiBBcnJheS5pc0FycmF5KHRoaXMucHJvcHMudHV0b3JpYWwpICYmIHRoaXMucHJvcHMudHV0b3JpYWwubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiAoPFR1dG9yaWFsIHNsaWRlcz17dGhpcy5wcm9wcy50dXRvcmlhbH0gb25FbmQ9e2U9PnRoaXMuc2V0U3RhdGUoe19fdHV0b3JpYWxpemVkOnRydWV9KX0vPilcblxuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgLz4pXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyLnNlc3Npb25Ub2tlbil7XG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfS8+KVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfVxuXG4gICAgc3RhdGljIHJlbmRlcihyb3V0ZXMsIHByb3BzPXt9LCByZWR1Y2Vycz17fSwgLi4ubWlkZGxld2Fycyl7XG4gICAgICAgIGxldCBjb250YWluZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG4gICAgICAgIGlmKCFjb250YWluZXIpe1xuICAgICAgICAgICAgY29udGFpbmVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjb250YWluZXIuaWQ9J2FwcCdcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICB9XG5cdFx0bGV0IHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzdHlsZSlcblx0XHRzdHlsZS5pbm5lckhUTUw9XCIucGFnZXttaW4taGVpZ2h0OlwiK3dpbmRvdy5pbm5lckhlaWdodCtcInB4fVwiXG5cdFx0Y29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG4gICAgICAgIGlmKCFwcm9wcy5oaXN0b3J5KVxuICAgICAgICAgICAgcHJvcHMuaGlzdG9yeT1oYXNoSGlzdG9yeVxuXG4gICAgICAgIHJldHVybiByZW5kZXIoKFxuICAgICAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17Y3JlYXRlU3RvcmUoY29tYmluZVJlZHVjZXJzKE9iamVjdC5hc3NpZ24oe19fOlJFRFVDRVJ9LHJlZHVjZXJzKSksIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJzKSl9PlxuICAgICAgICAgICAgICAgICAgICA8Um91dGVyIHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cm91dGVzfVxuICAgICAgICAgICAgICAgICAgICA8L1JvdXRlcj5cbiAgICAgICAgICAgICAgICA8L1Byb3ZpZGVyPlxuICAgICAgICAgICAgKSxjb250YWluZXIpXG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNlcnZpY2U6XCJodHRwOi8vcWlsaTIuY29tLzEvXCIsXG5cdFx0aW5pdCgpe30sXG5cdFx0dHV0b3JpYWw6W11cblx0fVxuXG5cdHN0YXRpYyBwcm9wc1R5cGVzPXtcblx0XHRzZXJ2aWNlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdFx0YXBwSWQ6UmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGluaXQ6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0dHV0b3JpYWw6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRcdHRpdGxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdH1cblxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdG11aVRoZW1lOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgc2hvd01lc3NhZ2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBsb2FkaW5nOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuXHR9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9e19faW5pdGVkOmZhbHNlLCBfX3VzZXI6VXNlci5jdXJyZW50fSxhY3Rpb24pPT57XG4gICAgc3dpdGNoKGFjdGlvbi50eXBlKXtcbiAgICBjYXNlICdpbml0ZWQnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX19pbml0ZWQ6dHJ1ZVxuICAgICAgICAgICAgLF9fdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICxfX3R1dG9yaWFsaXplZDphY3Rpb24uX190dXRvcmlhbGl6ZWRcbiAgICAgICAgfVxuICAgIGJyZWFrXG4gICAgY2FzZSAnaW5pdGVkRXJyb3InOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX19pbml0ZWQ6ZmFsc2VcbiAgICAgICAgICAgICxfX3VzZXI6VXNlci5jdXJyZW50XG4gICAgICAgICAgICAsX19pbml0ZWRFcnJvcjphY3Rpb24uZXJyb3JcbiAgICAgICAgfVxuICAgIGJyZWFrXG4gICAgY2FzZSAndXNlci5jaGFuZ2VkJzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse19fdXNlcjpVc2VyLmN1cnJlbnR9KVxuICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdGF0ZVxuICAgIH1cbn1cblxuY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsX190dXRvcmlhbGl6ZWQpe1xuXHRcdGlmKCEhZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTpcImluaXRlZEVycm9yXCJcblx0XHRcdFx0LHVzZXJcblx0XHRcdFx0LGVycm9yXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOlwiaW5pdGVkXCJcblx0XHRcdFx0LF9fdHV0b3JpYWxpemVkXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdCxVU0VSX0NIQU5HRUQ6e1xuXHRcdHR5cGU6XCJ1c2VyLmNoYW5nZWRcIlxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3Qoc3RhdGU9PnN0YXRlLl9fKShBcHApXG4iXX0=