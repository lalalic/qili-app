'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('.');

var _reactRouter = require('react-router');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _app3 = require('./app');

var _app4 = _interopRequireDefault(_app3);

var _materialUi = require('material-ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var QiliConsole = function (_QiliApp) {
    _inherits(QiliConsole, _QiliApp);

    function QiliConsole(props) {
        _classCallCheck(this, QiliConsole);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(QiliConsole).call(this, props));

        Object.assign(_this.state, { app: _this.props.app });
        _app2.default.on('change', function (app) {
            return _this.setState({ app: app });
        });
        return _this;
    }

    _createClass(QiliConsole, [{
        key: 'renderContent',
        value: function renderContent() {
            var _this2 = this;

            var app = this.state.app;
            var child = this.props.children;
            var route = child.props.route;

            return _.React.createElement(
                'div',
                null,
                _.React.createElement(CurrentApp, { app: app, onChange: function onChange(target) {
                        if (route.name == "app") _this2.context.router.push('app/' + target.name);else _app2.default.current = target;
                    } }),
                _.React.cloneElement(child, { app: app })
            );
        }
    }]);

    return QiliConsole;
}(_.QiliApp);

;

Object.assign(QiliConsole.defaultProps, {
    appId: "qiliAdmin",
    init: function init() {
        return _app2.default.init();
    }
});

var CurrentApp = function (_Component) {
    _inherits(CurrentApp, _Component);

    function CurrentApp() {
        _classCallCheck(this, CurrentApp);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CurrentApp).apply(this, arguments));
    }

    _createClass(CurrentApp, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var _ref = nextProps.app || {};

            var nextName = _ref.name;

            var _ref2 = this.props.app || {};

            var name = _ref2.name;

            return nextName != name;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props;
            var _props$app = _props.app;
            var app = _props$app === undefined ? { name: "" } : _props$app;
            var _props$style = _props.style;
            var style = _props$style === undefined ? {} : _props$style;

            var others = _objectWithoutProperties(_props, ['app', 'style']);

            if (!app._id) style.display = "none";

            return _.React.createElement(
                _materialUi.FloatingActionButton,
                _extends({ className: 'sticky top right',
                    onClick: function onClick(e) {
                        return _this4.change();
                    },
                    style: style
                }, others),
                app.name
            );
        }
    }, {
        key: 'change',
        value: function change() {
            var _props2 = this.props;
            var app = _props2.app;
            var _props2$onChange = _props2.onChange;
            var onChange = _props2$onChange === undefined ? function (a) {
                return a;
            } : _props2$onChange;
            var apps = _app2.default.all;
            var len = apps.length;
            if (len < 2) return;

            var index = apps.findIndex(function (a) {
                return a._id == app._id;
            });
            onChange(apps[(index + 1) % len]);
        }
    }]);

    return CurrentApp;
}(_.Component);

module.exports = _.QiliApp.render(_.React.createElement(
    _reactRouter.Route,
    { path: '/', component: QiliConsole },
    _.React.createElement(_reactRouter.IndexRoute, { component: require('./dashboard') }),
    _.React.createElement(_reactRouter.Route, { path: 'app/:name', name: 'app', component: require('./app') }),
    _.React.createElement(_reactRouter.Route, { path: 'app', component: require('./app'),
        onEnter: function onEnter(nextState, replace, callback) {
            _app2.default.current = {};
            callback();
        } }),
    _.React.createElement(_reactRouter.Route, { path: 'cloud', component: require('./cloud') }),
    _.React.createElement(
        _reactRouter.Route,
        { path: 'data', component: require('./data') },
        _.React.createElement(_reactRouter.IndexRedirect, { to: '' + _.User._name }),
        _.React.createElement(_reactRouter.Route, { path: ':name' })
    ),
    _.React.createElement(
        _reactRouter.Route,
        { path: 'log', component: require('./log') },
        _.React.createElement(_reactRouter.IndexRedirect, { to: 'all' }),
        _.React.createElement(_reactRouter.Route, { path: ':level' })
    ),
    _.React.createElement(_reactRouter.Redirect, { from: 'log', to: 'log/all' })
), {
    createElement: function createElement(Component, props) {
        if (Component == QiliConsole) {
            (function () {
                var child = props.children;
                var _child$props = child.props;
                var route = _child$props.route;
                var params = _child$props.params;


                if (route.name == "app") props.init = function (a) {
                    return _app2.default.init(params.name);
                };
            })();
        }
        return _.React.createElement(Component, props);
    }
});

/**
@Todo:
*Done: after adding new application
    application list doesn't reflect the change
    local storage without All fields, such as without application name, ..., because server returned only _id, createdAt, ...
*Done: after application deletion, UI should go to / even with error
*Done: error happens, UI should not be Empty
*Don't: use <Link/> rather than this.context.router.transitionTo
**Done: Never empty UI
**Done: FloatActionButton position when view width is 960

* too small-zoom size in mobile browser
* first focus on form, cloud UI
* background to upload to backend
    done: WebSQLDb is done
    *** sqlite
    done: *** after remove app, local cache should be removed too
** textfield can't be changed (which??)
*Done: login error, placeholder and value show together
* simple data mode:
    * remote upsert and remove directly
    * local cache for search
* Cannot read property 'componentDidEnter' of undefined
*Done: Date show as meaningful
* data list to show object field [object]=>{...}
*/
//# sourceMappingURL=data:application/json;base64,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IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge2luaXQsVXNlcixRaWxpQXBwLFJlYWN0LENvbXBvbmVudCwgVUksIFBvc2l0aW9ufSBmcm9tICcuJ1xuaW1wb3J0IHtSb3V0ZXIsIFJvdXRlLCBJbmRleFJvdXRlLCBoYXNoSGlzdG9yeSwgUmVkaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5cbmNsYXNzIFFpbGlDb25zb2xlIGV4dGVuZHMgUWlsaUFwcHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2FwcDp0aGlzLnByb3BzLmFwcH0pXG4gICAgICAgIEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLGFwcD0+dGhpcy5zZXRTdGF0ZSh7YXBwfSkpXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2FwcH09dGhpcy5zdGF0ZVxuICAgICAgICAgICAgLHtjaGlsZHJlbjpjaGlsZH09dGhpcy5wcm9wc1xuICAgICAgICAgICAgLHtyb3V0ZX09Y2hpbGQucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEN1cnJlbnRBcHAgYXBwPXthcHB9IG9uQ2hhbmdlPXt0YXJnZXQ9Pntcblx0XHRcdFx0XHRpZihyb3V0ZS5uYW1lPT1cImFwcFwiKVxuXHRcdFx0XHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBhcHAvJHt0YXJnZXQubmFtZX1gKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdEFwcGxpY2F0aW9uLmN1cnJlbnQ9dGFyZ2V0XG5cdFx0XHRcdH19Lz5cbiAgICAgICAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLHthcHB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufTtcblxuT2JqZWN0LmFzc2lnbihRaWxpQ29uc29sZS5kZWZhdWx0UHJvcHMse1xuICAgIGFwcElkOlwicWlsaUFkbWluXCIsXG4gICAgaW5pdDooKT0+QXBwbGljYXRpb24uaW5pdCgpXG59KTtcblxuY2xhc3MgQ3VycmVudEFwcCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuICAgICAgICB2YXIge25hbWU6bmV4dE5hbWV9PW5leHRQcm9wcy5hcHB8fHt9LFxuICAgICAgICAgICAge25hbWV9PXRoaXMucHJvcHMuYXBwfHx7fTtcbiAgICAgICAgcmV0dXJuIG5leHROYW1lIT1uYW1lXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7YXBwPXtuYW1lOlwiXCJ9LCBzdHlsZT17fSwgLi4ub3RoZXJzfT10aGlzLnByb3BzO1xuICAgICAgICBpZighYXBwLl9pZClcbiAgICAgICAgICAgIHN0eWxlLmRpc3BsYXk9XCJub25lXCJcblxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5jaGFuZ2UoKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgey4uLm90aGVyc30+XG4gICAgICAgICAgICAgICAge2FwcC5uYW1lfVxuICAgICAgICAgICAgPC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIHthcHAsIG9uQ2hhbmdlPWE9PmF9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBhcHBzPUFwcGxpY2F0aW9uLmFsbCxcbiAgICAgICAgICAgIGxlbj1hcHBzLmxlbmd0aDtcbiAgICAgICAgaWYobGVuPDIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGluZGV4PWFwcHMuZmluZEluZGV4KGE9PmEuX2lkPT1hcHAuX2lkKVxuICAgICAgICBvbkNoYW5nZShhcHBzWyhpbmRleCsxKSAlIGxlbl0pXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtRaWxpQ29uc29sZX0+XG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17cmVxdWlyZSgnLi9kYXNoYm9hcmQnKX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYXBwLzpuYW1lXCIgbmFtZT1cImFwcFwiIGNvbXBvbmVudD17cmVxdWlyZSgnLi9hcHAnKX0vPlxuXHRcdDxSb3V0ZSBwYXRoPVwiYXBwXCIgY29tcG9uZW50PXtyZXF1aXJlKCcuL2FwcCcpfVxuXHRcdFx0b25FbnRlcj17KG5leHRTdGF0ZSwgcmVwbGFjZSwgY2FsbGJhY2spPT57XG5cdFx0XHRcdEFwcGxpY2F0aW9uLmN1cnJlbnQ9e31cblx0XHRcdFx0Y2FsbGJhY2soKVxuXHRcdFx0fX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e3JlcXVpcmUoJy4vY2xvdWQnKX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiIGNvbXBvbmVudD17cmVxdWlyZSgnLi9kYXRhJyl9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89e2Ake1VzZXIuX25hbWV9YH0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bmFtZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImxvZ1wiIGNvbXBvbmVudD17cmVxdWlyZSgnLi9sb2cnKX0+XG4gICAgICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cImFsbFwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmxldmVsXCIvPlxuICAgICAgICA8L1JvdXRlPlxuICAgICAgICA8UmVkaXJlY3QgZnJvbT1cImxvZ1wiIHRvPVwibG9nL2FsbFwiIC8+XG4gICAgPC9Sb3V0ZT4pLHtcblx0XHRjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpe1xuXHRcdFx0aWYoQ29tcG9uZW50PT1RaWxpQ29uc29sZSl7XG5cdFx0XHRcdGxldCBjaGlsZD1wcm9wcy5jaGlsZHJlblxuXHRcdFx0XHRcdCx7cm91dGUscGFyYW1zfT1jaGlsZC5wcm9wc1xuXG5cdFx0XHRcdGlmKHJvdXRlLm5hbWU9PVwiYXBwXCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5BcHBsaWNhdGlvbi5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG5AVG9kbzpcbipEb25lOiBhZnRlciBhZGRpbmcgbmV3IGFwcGxpY2F0aW9uXG4gICAgYXBwbGljYXRpb24gbGlzdCBkb2Vzbid0IHJlZmxlY3QgdGhlIGNoYW5nZVxuICAgIGxvY2FsIHN0b3JhZ2Ugd2l0aG91dCBBbGwgZmllbGRzLCBzdWNoIGFzIHdpdGhvdXQgYXBwbGljYXRpb24gbmFtZSwgLi4uLCBiZWNhdXNlIHNlcnZlciByZXR1cm5lZCBvbmx5IF9pZCwgY3JlYXRlZEF0LCAuLi5cbipEb25lOiBhZnRlciBhcHBsaWNhdGlvbiBkZWxldGlvbiwgVUkgc2hvdWxkIGdvIHRvIC8gZXZlbiB3aXRoIGVycm9yXG4qRG9uZTogZXJyb3IgaGFwcGVucywgVUkgc2hvdWxkIG5vdCBiZSBFbXB0eVxuKkRvbid0OiB1c2UgPExpbmsvPiByYXRoZXIgdGhhbiB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ub1xuKipEb25lOiBOZXZlciBlbXB0eSBVSVxuKipEb25lOiBGbG9hdEFjdGlvbkJ1dHRvbiBwb3NpdGlvbiB3aGVuIHZpZXcgd2lkdGggaXMgOTYwXG5cbiogdG9vIHNtYWxsLXpvb20gc2l6ZSBpbiBtb2JpbGUgYnJvd3NlclxuKiBmaXJzdCBmb2N1cyBvbiBmb3JtLCBjbG91ZCBVSVxuKiBiYWNrZ3JvdW5kIHRvIHVwbG9hZCB0byBiYWNrZW5kXG4gICAgZG9uZTogV2ViU1FMRGIgaXMgZG9uZVxuICAgICoqKiBzcWxpdGVcbiAgICBkb25lOiAqKiogYWZ0ZXIgcmVtb3ZlIGFwcCwgbG9jYWwgY2FjaGUgc2hvdWxkIGJlIHJlbW92ZWQgdG9vXG4qKiB0ZXh0ZmllbGQgY2FuJ3QgYmUgY2hhbmdlZCAod2hpY2g/PylcbipEb25lOiBsb2dpbiBlcnJvciwgcGxhY2Vob2xkZXIgYW5kIHZhbHVlIHNob3cgdG9nZXRoZXJcbiogc2ltcGxlIGRhdGEgbW9kZTpcbiAgICAqIHJlbW90ZSB1cHNlcnQgYW5kIHJlbW92ZSBkaXJlY3RseVxuICAgICogbG9jYWwgY2FjaGUgZm9yIHNlYXJjaFxuKiBDYW5ub3QgcmVhZCBwcm9wZXJ0eSAnY29tcG9uZW50RGlkRW50ZXInIG9mIHVuZGVmaW5lZFxuKkRvbmU6IERhdGUgc2hvdyBhcyBtZWFuaW5nZnVsXG4qIGRhdGEgbGlzdCB0byBzaG93IG9iamVjdCBmaWVsZCBbb2JqZWN0XT0+ey4uLn1cbiovXG4iXX0=