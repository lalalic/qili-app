"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QiliApp = exports.REDUCER = exports.ACTION = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var muiTheme = (0, _getMuiTheme2.default)(_lightBaseTheme2.default);

var DOMAIN = "__";

var ACTION = exports.ACTION = {
    INIT_APP: function INIT_APP(error, tutorialized) {
        if (!!error) {
            return {
                domain: DOMAIN,
                type: "initedError",
                user: user,
                error: error
            };
        } else {
            return {
                domain: DOMAIN,
                type: "inited",
                tutorialized: tutorialized
            };
        }
    },
    USER_CHANGED: {
        domain: DOMAIN,
        type: "USER_CHANGED"
    }, TUTORIALIZED: {
        domain: DOMAIN,
        type: "TUTORIALIZED"
    }
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (action.domain == DOMAIN) {
        switch (action.type) {
            case 'inited':
                return {
                    inited: true,
                    user: _db.User.current,
                    tutorialized: action.tutorialized
                };
                break;
            case 'initedError':
                return {
                    inited: false,
                    user: _db.User.current,
                    initedError: action.error
                };
                break;
            case 'USER_CHANGED':
                return {
                    inited: !!_db.User.current,
                    user: _db.User.current,
                    tutorialized: state.tutorialized
                };
            case 'TUTORIALIZED':
                state.tutorialized = true;
                return state;
        }
    }
    return state;
});

var QiliApp = exports.QiliApp = (0, _reactRedux.connect)(function (state) {
    return state.__;
})((_temp = _class = function (_Component) {
    _inherits(_class, _Component);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        (0, _reactTapEventPlugin2.default)();

        var _this$props = _this.props;
        var service = _this$props.service;
        var appId = _this$props.appId;


        if (!appId) throw new Error("Please give application key");

        if (!service) throw new Error("Please give service url");
        return _this;
    }

    _createClass(_class, [{
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
                var tutorialized = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                dispatch(ACTION.INIT_APP(null, !!tutorialized));
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
            var _props2 = this.props;
            var inited = _props2.inited;
            var initedError = _props2.initedError;
            var user = _props2.user;
            var tutorialized = _props2.tutorialized;
            var dispatch = _props2.dispatch;

            var content = void 0;

            if (!inited) {
                if (initedError) content = "Initializing Error: " + initedError;else content = "initializing...";
            } else if (!user) {
                if (!tutorialized && Array.isArray(this.props.tutorial) && this.props.tutorial.length) return _react2.default.createElement(_tutorial2.default, { slides: this.props.tutorial, onEnd: function onEnd(e) {
                        return dispatch(ACTION.TUTORIALIZED);
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

            var defaultCreateElement = function defaultCreateElement(Component, props) {
                var history = props.history;
                var params = props.params;

                return _react2.default.createElement(Component, _extends({ router: history }, params, props));
            };

            var allReducers = (0, _redux.combineReducers)(Object.assign({}, REDUCER, _account.REDUCER, reducers));
            var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

            for (var _len = arguments.length, middlewars = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                middlewars[_key - 3] = arguments[_key];
            }

            return (0, _reactDom.render)(_react2.default.createElement(
                _reactRedux.Provider,
                { store: (0, _redux.createStore)(allReducers, composeEnhancers(_redux.applyMiddleware.apply(undefined, middlewars))) },
                _react2.default.createElement(
                    _reactRouter.Router,
                    _extends({ createElement: defaultCreateElement }, props),
                    routes
                )
            ), container);
        }
    }]);

    return _class;
}(_react.Component), _class.defaultProps = {
    service: "http://qili2.com/1/",
    init: function init() {},

    tutorial: []
}, _class.propsTypes = {
    service: _react2.default.PropTypes.string.isRequired,
    appId: _react2.default.PropTypes.string.isRequired,
    init: _react2.default.PropTypes.func,
    tutorial: _react2.default.PropTypes.array,
    title: _react2.default.PropTypes.string
}, _class.childContextTypes = {
    muiTheme: _react2.default.PropTypes.object.isRequired,
    showMessage: _react2.default.PropTypes.func,
    loading: _react2.default.PropTypes.func
}, _class.contextTypes = {
    router: _react2.default.PropTypes.object
}, _temp));

exports.default = QiliApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xaWxpQXBwLmpzIl0sIm5hbWVzIjpbIm11aVRoZW1lIiwiRE9NQUlOIiwiQUNUSU9OIiwiSU5JVF9BUFAiLCJlcnJvciIsInR1dG9yaWFsaXplZCIsImRvbWFpbiIsInR5cGUiLCJ1c2VyIiwiVVNFUl9DSEFOR0VEIiwiVFVUT1JJQUxJWkVEIiwiUkVEVUNFUiIsInN0YXRlIiwiYWN0aW9uIiwiaW5pdGVkIiwiY3VycmVudCIsImluaXRlZEVycm9yIiwiUWlsaUFwcCIsIl9fIiwicHJvcHMiLCJzZXJ2aWNlIiwiYXBwSWQiLCJFcnJvciIsImluaXRBcHAiLCJpbml0IiwidGl0bGUiLCJkaXNwYXRjaCIsImRvY3VtZW50IiwiZSIsInJlZnMiLCJtc2ciLCJzaG93IiwibG9hZGluZyIsInRoZW4iLCJvbiIsIm1lc3NhZ2UiLCJzZWxmIiwic2hvd01lc3NhZ2UiLCJhcmd1bWVudHMiLCJvcGVuIiwiY29udGVudCIsIkFycmF5IiwiaXNBcnJheSIsInR1dG9yaWFsIiwibGVuZ3RoIiwic2Vzc2lvblRva2VuIiwicmVuZGVyQ29udGVudCIsIm92ZXJmbG93WSIsImNoaWxkcmVuIiwicm91dGVzIiwicmVkdWNlcnMiLCJjb250YWluZXIiLCJnZXRFbGVtZW50QnlJZCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInN0eWxlIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbm5lckhUTUwiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsImhlaWdodCIsImhpc3RvcnkiLCJkZWZhdWx0Q3JlYXRlRWxlbWVudCIsIkNvbXBvbmVudCIsInBhcmFtcyIsImFsbFJlZHVjZXJzIiwiT2JqZWN0IiwiYXNzaWduIiwiY29tcG9zZUVuaGFuY2VycyIsIl9fUkVEVVhfREVWVE9PTFNfRVhURU5TSU9OX0NPTVBPU0VfXyIsIm1pZGRsZXdhcnMiLCJkZWZhdWx0UHJvcHMiLCJwcm9wc1R5cGVzIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJhcnJheSIsImNoaWxkQ29udGV4dFR5cGVzIiwib2JqZWN0IiwiY29udGV4dFR5cGVzIiwicm91dGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQUVBOztBQUNBOztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBUyxvREFBZjs7QUFFQSxJQUFNQyxTQUFPLElBQWI7O0FBRU8sSUFBTUMsMEJBQU87QUFDbkJDLFlBRG1CLG9CQUNWQyxLQURVLEVBQ0pDLFlBREksRUFDUztBQUMzQixZQUFHLENBQUMsQ0FBQ0QsS0FBTCxFQUFXO0FBQ1YsbUJBQU87QUFDTUUsd0JBQU9MLE1BRGI7QUFFTE0sc0JBQUssYUFGQTtBQUdMQywwQkFISztBQUlMSjtBQUpLLGFBQVA7QUFNQSxTQVBELE1BT0s7QUFDSixtQkFBTztBQUNNRSx3QkFBT0wsTUFEYjtBQUVMTSxzQkFBSyxRQUZBO0FBR0xGO0FBSEssYUFBUDtBQUtBO0FBQ0QsS0FoQmtCO0FBaUJsQkksa0JBQWE7QUFDUEgsZ0JBQU9MLE1BREE7QUFFTk0sY0FBSztBQUZDLEtBakJLLEVBb0JqQkcsY0FBYTtBQUNSSixnQkFBT0wsTUFEQztBQUVQTSxjQUFLO0FBRkU7QUFwQkksQ0FBYjs7QUEwQkEsSUFBTUksZ0RBQ1JWLE1BRFEsRUFDQSxZQUFtQjtBQUFBLFFBQWxCVyxLQUFrQix1RUFBWixFQUFZO0FBQUEsUUFBVEMsTUFBUzs7QUFDeEIsUUFBR0EsT0FBT1AsTUFBUCxJQUFlTCxNQUFsQixFQUF5QjtBQUNyQixnQkFBT1ksT0FBT04sSUFBZDtBQUNBLGlCQUFLLFFBQUw7QUFDSSx1QkFBTztBQUNITyw0QkFBTyxJQURKO0FBRUZOLDBCQUFLLFNBQUtPLE9BRlI7QUFHRlYsa0NBQWFRLE9BQU9SO0FBSGxCLGlCQUFQO0FBS0o7QUFDQSxpQkFBSyxh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UWhFLE8iLCJmaWxlIjoicWlsaUFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBSZWFjdERPTSwge3JlbmRlcn0gZnJvbSBcInJlYWN0LWRvbVwiXG5cbmltcG9ydCB7Um91dGVyLCBSb3V0ZSwgSW5kZXhSb3V0ZSwgaGFzaEhpc3Rvcnl9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQge2NyZWF0ZVN0b3JlLGNvbWJpbmVSZWR1Y2VycywgYXBwbHlNaWRkbGV3YXJlLGNvbXBvc2V9IGZyb20gXCJyZWR1eFwiXG5pbXBvcnQge1Byb3ZpZGVyLCBjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQge1N0eWxlcywgU25hY2tiYXIsIFV0aWxzLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZ2V0TXVpVGhlbWUgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJ1xuaW1wb3J0IGxpZ2h0QmFzZVRoZW1lIGZyb20gJ21hdGVyaWFsLXVpL3N0eWxlcy9iYXNlVGhlbWVzL2xpZ2h0QmFzZVRoZW1lJ1xuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5cbmltcG9ydCB7aW5pdCxVc2VyfSBmcm9tIFwiLi9kYlwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSBcIi4vY29tcG9uZW50cy9tZXNzYWdlclwiXG5pbXBvcnQgTG9hZGluZyBmcm9tIFwiLi9jb21wb25lbnRzL2xvYWRpbmdcIlxuaW1wb3J0IHN1cHBvcnRUYXAgZnJvbSAncmVhY3QtdGFwLWV2ZW50LXBsdWdpbidcbmltcG9ydCBBY2NvdW50LCB7UkVEVUNFUiBhcyBhY2NvdW50UmVkdWNlcn0gZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFR1dG9yaWFsIGZyb20gXCIuL2NvbXBvbmVudHMvdHV0b3JpYWxcIlxuXG5jb25zdCBtdWlUaGVtZT1nZXRNdWlUaGVtZShsaWdodEJhc2VUaGVtZSlcblxuY29uc3QgRE9NQUlOPVwiX19cIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0SU5JVF9BUFAoZXJyb3IsdHV0b3JpYWxpemVkKXtcblx0XHRpZighIWVycm9yKXtcblx0XHRcdHJldHVybiB7XG4gICAgICAgICAgICAgICAgZG9tYWluOkRPTUFJTlxuXHRcdFx0XHQsdHlwZTpcImluaXRlZEVycm9yXCJcblx0XHRcdFx0LHVzZXJcblx0XHRcdFx0LGVycm9yXG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRvbWFpbjpET01BSU5cblx0XHRcdFx0LHR5cGU6XCJpbml0ZWRcIlxuXHRcdFx0XHQsdHV0b3JpYWxpemVkXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdCxVU0VSX0NIQU5HRUQ6e1xuICAgICAgICBkb21haW46RE9NQUlOXG4gICAgICAgICx0eXBlOlwiVVNFUl9DSEFOR0VEXCJcblx0fSxUVVRPUklBTElaRUQ6e1xuICAgICAgICBkb21haW46RE9NQUlOXG4gICAgICAgICx0eXBlOlwiVFVUT1JJQUxJWkVEXCJcblx0fVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj17XG4gICAgW0RPTUFJTl06KHN0YXRlPXt9LGFjdGlvbik9PntcbiAgICAgICAgaWYoYWN0aW9uLmRvbWFpbj09RE9NQUlOKXtcbiAgICAgICAgICAgIHN3aXRjaChhY3Rpb24udHlwZSl7XG4gICAgICAgICAgICBjYXNlICdpbml0ZWQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRlZDp0cnVlXG4gICAgICAgICAgICAgICAgICAgICx1c2VyOlVzZXIuY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAsdHV0b3JpYWxpemVkOmFjdGlvbi50dXRvcmlhbGl6ZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnaW5pdGVkRXJyb3InOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRlZDpmYWxzZVxuICAgICAgICAgICAgICAgICAgICAsdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgLGluaXRlZEVycm9yOmFjdGlvbi5lcnJvclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdVU0VSX0NIQU5HRUQnOlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRlZDohIVVzZXIuY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAsdXNlcjpVc2VyLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgLHR1dG9yaWFsaXplZDpzdGF0ZS50dXRvcmlhbGl6ZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgXHRcdGNhc2UgJ1RVVE9SSUFMSVpFRCc6XG4gICAgXHRcdFx0c3RhdGUudHV0b3JpYWxpemVkPXRydWVcbiAgICBcdFx0XHRyZXR1cm4gc3RhdGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhdGVcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBRaWxpQXBwPWNvbm5lY3Qoc3RhdGU9PnN0YXRlLl9fKShcbmNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG5cbiAgICAgICAgc3VwcG9ydFRhcCgpXG5cbiAgICAgICAgY29uc3Qge3NlcnZpY2UsIGFwcElkfT10aGlzLnByb3BzXG5cbiAgICAgICAgaWYoIWFwcElkKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIGdpdmUgYXBwbGljYXRpb24ga2V5XCIpXG5cbiAgICAgICAgaWYoIXNlcnZpY2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZ2l2ZSBzZXJ2aWNlIHVybFwiKVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHZhciB7aW5pdDppbml0QXBwLCBzZXJ2aWNlLCBhcHBJZCwgdGl0bGUsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0aWYodGl0bGUpXG5cdFx0XHRkb2N1bWVudC50aXRsZT10aXRsZVxuXG4gICAgICAgIGluaXQoc2VydmljZSwgYXBwSWQsIGluaXRBcHAsIChlLHR5cGU9J0Vycm9yJyk9PnRoaXMucmVmcy5tc2cuc2hvdyhlLHR5cGUpLCB0aGlzLnJlZnMubG9hZGluZylcbiAgICAgICAgICAgIC50aGVuKCh0dXRvcmlhbGl6ZWQ9dHJ1ZSk9PntcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goQUNUSU9OLklOSVRfQVBQKG51bGwsISF0dXRvcmlhbGl6ZWQpKVxuICAgICAgICAgICAgICAgICAgICBVc2VyLm9uKCdjaGFuZ2UnLCAoKT0+ZGlzcGF0Y2goQUNUSU9OLlVTRVJfQ0hBTkdFRCkpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAoZSk9PmRpc3BhdGNoKEFDVElPTi5JTklUX0FQUChlLm1lc3NhZ2UpKSlcbiAgICB9XG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgbGV0IHNlbGY9dGhpc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbXVpVGhlbWVcbiAgICAgICAgICAgICxzaG93TWVzc2FnZSgpe1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvd01lc3NhZ2UoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLGxvYWRpbmcob3Blbil7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWZzLmxvYWRpbmdbb3BlbiA/IFwic2hvd1wiIDogXCJjbG9zZVwiXSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblx0c2hvd01lc3NhZ2UoKXtcblx0XHR0aGlzLnJlZnMubXNnLnNob3coLi4uYXJndW1lbnRzKVxuXHR9XG5cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7aW5pdGVkLCBpbml0ZWRFcnJvciwgdXNlciwgdHV0b3JpYWxpemVkLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGxldCBjb250ZW50XG5cbiAgICAgICAgaWYoIWluaXRlZCl7XG4gICAgICAgICAgICBpZihpbml0ZWRFcnJvcilcbiAgICAgICAgICAgICAgICBjb250ZW50PSBgSW5pdGlhbGl6aW5nIEVycm9yOiAke2luaXRlZEVycm9yfWBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjb250ZW50PSBcImluaXRpYWxpemluZy4uLlwiXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyKXtcbiAgICAgICAgICAgIGlmKCF0dXRvcmlhbGl6ZWQgJiYgQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLnR1dG9yaWFsKSAmJiB0aGlzLnByb3BzLnR1dG9yaWFsLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxUdXRvcmlhbCBzbGlkZXM9e3RoaXMucHJvcHMudHV0b3JpYWx9IG9uRW5kPXtlPT5kaXNwYXRjaChBQ1RJT04uVFVUT1JJQUxJWkVEKX0vPilcblxuICAgICAgICAgICAgY29udGVudD0oPEFjY291bnQgLz4pXG4gICAgICAgIH1lbHNlIGlmKCF1c2VyLnNlc3Npb25Ub2tlbil7XG4gICAgICAgICAgICBjb250ZW50PSg8QWNjb3VudCB1c2VyPXt1c2VyfS8+KVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50PXRoaXMucmVuZGVyQ29udGVudCgpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2l0aEZvb3RiYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBpZD1cImNvbnRhaW5lclwiIHN0eWxlPXt7b3ZlcmZsb3dZOlwic2Nyb2xsXCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VyIHJlZj1cIm1zZ1wiIGNsYXNzTmFtZT1cInN0aWNreSBib3R0b20gbGVmdFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2FkaW5nIHJlZj1cImxvYWRpbmdcIiAgY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuXHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgfVxuXG5cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRzZXJ2aWNlOlwiaHR0cDovL3FpbGkyLmNvbS8xL1wiLFxuXHRcdGluaXQoKXt9LFxuXHRcdHR1dG9yaWFsOltdXG5cdH1cblxuXHRzdGF0aWMgcHJvcHNUeXBlcz17XG5cdFx0c2VydmljZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuXHRcdGFwcElkOlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0XHRpbml0OlJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdHR1dG9yaWFsOlJlYWN0LlByb3BUeXBlcy5hcnJheSxcblx0XHR0aXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuXHR9XG5cblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRtdWlUaGVtZTpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIHNob3dNZXNzYWdlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgbG9hZGluZzogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcblx0fVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuXHR9XG5cbiAgICBzdGF0aWMgcmVuZGVyKHJvdXRlcywgcHJvcHM9e30sIHJlZHVjZXJzPXt9LCAuLi5taWRkbGV3YXJzKXtcbiAgICAgICAgbGV0IGNvbnRhaW5lcj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJylcbiAgICAgICAgaWYoIWNvbnRhaW5lcil7XG4gICAgICAgICAgICBjb250YWluZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNvbnRhaW5lci5pZD0nYXBwJ1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0eWxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpXG4gICAgICAgIHN0eWxlLmlubmVySFRNTD1cIi5wYWdle21pbi1oZWlnaHQ6XCIrd2luZG93LmlubmVySGVpZ2h0K1wicHh9XCJcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQrJ3B4J1xuXG4gICAgICAgIGlmKCFwcm9wcy5oaXN0b3J5KVxuICAgICAgICAgICAgcHJvcHMuaGlzdG9yeT1oYXNoSGlzdG9yeVxuXG5cdFx0Y29uc3QgZGVmYXVsdENyZWF0ZUVsZW1lbnQ9KENvbXBvbmVudCxwcm9wcyk9Pntcblx0XHRcdGNvbnN0IHtoaXN0b3J5LHBhcmFtc309cHJvcHNcblx0XHRcdHJldHVybiAoPENvbXBvbmVudCByb3V0ZXI9e2hpc3Rvcnl9IHsuLi5wYXJhbXN9IHsuLi5wcm9wc30vPilcblx0XHR9XG5cblx0XHRjb25zdCBhbGxSZWR1Y2Vycz1jb21iaW5lUmVkdWNlcnMoT2JqZWN0LmFzc2lnbih7fSxSRURVQ0VSLGFjY291bnRSZWR1Y2VyLCByZWR1Y2VycykpXG5cdFx0Y29uc3QgY29tcG9zZUVuaGFuY2VycyA9IHdpbmRvdy5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9DT01QT1NFX18gfHwgY29tcG9zZTtcblxuICAgICAgICByZXR1cm4gcmVuZGVyKChcbiAgICAgICAgICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e2NyZWF0ZVN0b3JlKGFsbFJlZHVjZXJzLCBjb21wb3NlRW5oYW5jZXJzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJzKSkpfT5cbiAgICAgICAgICAgICAgICAgICAgPFJvdXRlciBjcmVhdGVFbGVtZW50PXtkZWZhdWx0Q3JlYXRlRWxlbWVudH0gey4uLnByb3BzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyb3V0ZXN9XG4gICAgICAgICAgICAgICAgICAgIDwvUm91dGVyPlxuICAgICAgICAgICAgICAgIDwvUHJvdmlkZXI+XG4gICAgICAgICAgICApLGNvbnRhaW5lcilcbiAgICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBRaWxpQXBwXG4iXX0=