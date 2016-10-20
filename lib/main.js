'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ = require('.');

var _reactRouter = require('react-router');

var _materialUi = require('material-ui');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _app3 = require('./app');

var _app4 = _interopRequireDefault(_app3);

var _logo = require('./icons/logo');

var _logo2 = _interopRequireDefault(_logo);

var _dashboard = require('./dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require('./cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _my = require('./my');

var _my2 = _interopRequireDefault(_my);

var _setting = require('./setting');

var _setting2 = _interopRequireDefault(_setting);

var _userProfile = require('./user-profile');

var _userProfile2 = _interopRequireDefault(_userProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Empty = _.UI.Empty;

var QiliConsole = function (_QiliApp) {
    _inherits(QiliConsole, _QiliApp);

    function QiliConsole(props) {
        _classCallCheck(this, QiliConsole);

        var _this = _possibleConstructorReturn(this, (QiliConsole.__proto__ || Object.getPrototypeOf(QiliConsole)).call(this, props));

        Object.assign(_this.state, { app: null });
        _app2.default.on('change', function (app) {
            return _this.setState({ app: app });
        });
        return _this;
    }

    _createClass(QiliConsole, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (this.props.children.props.route.name == 'app' && nextState.app != this.state.app && !this.context.router.isActive('app/' + nextState.app.name)) {
                this.context.router.push('app/' + nextState.app.name);
                return false;
            }
            return true;
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var app = this.state.app;

            if (!app) return _.React.createElement(
                Empty,
                { icon: _.React.createElement(_logo2.default, null) },
                _.React.createElement(
                    _reactRouter.Link,
                    { to: 'app' },
                    'click to create your first qili app'
                )
            );

            return _.React.createElement(
                'div',
                null,
                this.props.children.props.route.contextual !== false && _.React.createElement(CurrentApp, { key: 'context', name: app.name }),
                this.props.children
            );
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return Object.assign(_get(QiliConsole.prototype.__proto__ || Object.getPrototypeOf(QiliConsole.prototype), 'getChildContext', this).call(this), {
                app: this.state.app
            });
        }
    }]);

    return QiliConsole;
}(_.QiliApp);

QiliConsole.childContextTypes = Object.assign({
    app: _.React.PropTypes.object
}, _.QiliApp.childContextTypes);
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

        return _possibleConstructorReturn(this, (CurrentApp.__proto__ || Object.getPrototypeOf(CurrentApp)).apply(this, arguments));
    }

    _createClass(CurrentApp, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var name = this.props.name;

            return _.React.createElement(
                _materialUi.FloatingActionButton,
                { className: 'sticky top right',
                    onClick: function onClick(e) {
                        return _this3.change();
                    },
                    mini: true,
                    style: { fontSize: "xx-small" } },
                name
            );
        }
    }, {
        key: 'change',
        value: function change() {
            var app = this.context.app;
            var apps = _app2.default.all;
            var len = apps.length;
            if (len < 2) return;

            var index = apps.findIndex(function (a) {
                return a._id == app._id;
            }),
                target = apps[(index + 1) % len];

            _app2.default.current = target;
        }
    }]);

    return CurrentApp;
}(_.Component);

CurrentApp.contextTypes = { app: _.React.PropTypes.object };


module.exports = _.QiliApp.render(_.React.createElement(
    _reactRouter.Route,
    { path: '/', component: QiliConsole },
    _.React.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
    _.React.createElement(_reactRouter.Route, { path: 'app/:name', name: 'app', component: _app4.default }),
    _.React.createElement(_reactRouter.Route, { path: 'app', contextual: false, component: _app3.Creator }),
    _.React.createElement(_reactRouter.Route, { path: 'cloud', component: _cloud2.default }),
    _.React.createElement(
        _reactRouter.Route,
        { path: 'data', component: _data2.default },
        _.React.createElement(_reactRouter.IndexRedirect, { to: '' + _.User._name }),
        _.React.createElement(_reactRouter.Route, { path: ':name' })
    ),
    _.React.createElement(
        _reactRouter.Route,
        { path: 'log', component: _log2.default },
        _.React.createElement(_reactRouter.IndexRedirect, { to: 'all' }),
        _.React.createElement(_reactRouter.Route, { path: ':level' })
    ),
    _.React.createElement(
        _reactRouter.Route,
        { path: 'my' },
        _.React.createElement(_reactRouter.IndexRoute, { component: _my2.default, contextual: false }),
        _.React.createElement(_reactRouter.Route, { path: 'setting', component: _setting2.default }),
        _.React.createElement(_reactRouter.Route, { path: 'profile', component: _userProfile2.default, contextual: false })
    )
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJFbXB0eSIsIlFpbGlDb25zb2xlIiwicHJvcHMiLCJPYmplY3QiLCJhc3NpZ24iLCJzdGF0ZSIsImFwcCIsIm9uIiwic2V0U3RhdGUiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJjaGlsZHJlbiIsInJvdXRlIiwibmFtZSIsImNvbnRleHQiLCJyb3V0ZXIiLCJpc0FjdGl2ZSIsInB1c2giLCJjb250ZXh0dWFsIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJkZWZhdWx0UHJvcHMiLCJhcHBJZCIsImluaXQiLCJDdXJyZW50QXBwIiwiY2hhbmdlIiwiZm9udFNpemUiLCJhbGwiLCJhcHBzIiwibGVuZ3RoIiwibGVuIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJhIiwiX2lkIiwidGFyZ2V0IiwiY3VycmVudCIsImNvbnRleHRUeXBlcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZW5kZXIiLCJfbmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJDb21wb25lbnQiLCJjaGlsZCIsInBhcmFtcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBa0ZBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFqR0FBLFFBQVEscUJBQVI7O0lBVU9DLEssUUFBQUEsSzs7SUFFREMsVzs7O0FBQ0YseUJBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQSw4SEFDUkEsS0FEUTs7QUFFZEMsZUFBT0MsTUFBUCxDQUFjLE1BQUtDLEtBQW5CLEVBQXlCLEVBQUNDLEtBQUksSUFBTCxFQUF6QjtBQUNBLHNCQUFZQyxFQUFaLENBQWUsUUFBZixFQUF3QjtBQUFBLG1CQUFLLE1BQUtDLFFBQUwsQ0FBYyxFQUFDRixRQUFELEVBQWQsQ0FBTDtBQUFBLFNBQXhCO0FBSGM7QUFJakI7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QXlDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCB7aW5pdCxVc2VyLFFpbGlBcHAsUmVhY3QsQ29tcG9uZW50LCBVSSwgUG9zaXRpb259IGZyb20gJy4nXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdCwgSW5kZXhSZWRpcmVjdCwgTGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vZGIvYXBwJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2FwcCdcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jbGFzcyBRaWxpQ29uc29sZSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHthcHA6bnVsbH0pXG4gICAgICAgIEFwcGxpY2F0aW9uLm9uKCdjaGFuZ2UnLGFwcD0+dGhpcy5zZXRTdGF0ZSh7YXBwfSkpXG4gICAgfVxuXHRcblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcblx0XHRpZih0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnJvdXRlLm5hbWU9PSdhcHAnIFxuXHRcdFx0JiYgbmV4dFN0YXRlLmFwcCE9dGhpcy5zdGF0ZS5hcHBcblx0XHRcdCYmICF0aGlzLmNvbnRleHQucm91dGVyLmlzQWN0aXZlKGBhcHAvJHtuZXh0U3RhdGUuYXBwLm5hbWV9YCkpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBhcHAvJHtuZXh0U3RhdGUuYXBwLm5hbWV9YClcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciB7YXBwfT10aGlzLnN0YXRlXG5cdFx0aWYoIWFwcClcblx0XHRcdHJldHVybiAoPEVtcHR5IGljb249ezxMb2dvLz59PjxMaW5rIHRvPVwiYXBwXCI+Y2xpY2sgdG8gY3JlYXRlIHlvdXIgZmlyc3QgcWlsaSBhcHA8L0xpbms+PC9FbXB0eT4pXG5cdFx0XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZS5jb250ZXh0dWFsIT09ZmFsc2UgXG5cdFx0XHRcdFx0JiYgKDxDdXJyZW50QXBwIGtleT1cImNvbnRleHRcIiBuYW1lPXthcHAubmFtZX0vPil9XG5cdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblx0XG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRhcHA6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fSwgUWlsaUFwcC5jaGlsZENvbnRleHRUeXBlcylcblx0XG5cdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcblx0XHRcdGFwcDogdGhpcy5zdGF0ZS5hcHBcblx0XHR9KVxuXHR9XG5cdFxuXHRcbn07XG5cbk9iamVjdC5hc3NpZ24oUWlsaUNvbnNvbGUuZGVmYXVsdFByb3BzLHtcbiAgICBhcHBJZDpcInFpbGlBZG1pblwiLFxuICAgIGluaXQ6KCk9PkFwcGxpY2F0aW9uLmluaXQoKVxufSk7XG5cbmNsYXNzIEN1cnJlbnRBcHAgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bmFtZX09dGhpcy5wcm9wc1xuXHRcdHJldHVybihcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmNoYW5nZSgpfVxuXHRcdFx0XHRtaW5pPXt0cnVlfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX0+XG4gICAgICAgICAgICAgICAge25hbWV9XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxuICAgIGNoYW5nZSgpe1xuICAgICAgICB2YXIge2FwcH09dGhpcy5jb250ZXh0LFxuICAgICAgICAgICAgYXBwcz1BcHBsaWNhdGlvbi5hbGwsXG4gICAgICAgICAgICBsZW49YXBwcy5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1hcHBzLmZpbmRJbmRleChhPT5hLl9pZD09YXBwLl9pZClcblx0XHRcdCx0YXJnZXQ9YXBwc1soaW5kZXgrMSkgJSBsZW5dXG5cdFx0XHRcbiAgICAgICAgQXBwbGljYXRpb24uY3VycmVudD10YXJnZXRcbiAgICB9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXthcHA6IFJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSAnLi9kYXNoYm9hcmQnXG5pbXBvcnQgQXBwVUksIHtDcmVhdG9yfSBmcm9tICcuL2FwcCdcbmltcG9ydCBDbG91ZFVJIGZyb20gJy4vY2xvdWQnXG5pbXBvcnQgRGF0YVVJIGZyb20gJy4vZGF0YSdcbmltcG9ydCBMb2dVSSBmcm9tICcuL2xvZydcbmltcG9ydCBNeVVJIGZyb20gXCIuL215XCJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSBcIi4vc2V0dGluZ1wiXG5pbXBvcnQgUHJvZmlsZVVJIGZyb20gXCIuL3VzZXItcHJvZmlsZVwiXG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e1FpbGlDb25zb2xlfT5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcC86bmFtZVwiIG5hbWU9XCJhcHBcIiBjb21wb25lbnQ9e0FwcFVJfS8+XG5cdFx0PFJvdXRlIHBhdGg9XCJhcHBcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtDcmVhdG9yfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjbG91ZFwiIGNvbXBvbmVudD17Q2xvdWRVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZGF0YVwiIGNvbXBvbmVudD17RGF0YVVJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPXtgJHtVc2VyLl9uYW1lfWB9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOm5hbWVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJsb2dcIiBjb21wb25lbnQ9e0xvZ1VJfT5cbiAgICAgICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiYWxsXCIvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6bGV2ZWxcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cdFx0XG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiPlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtNeVVJfSBjb250ZXh0dWFsPXtmYWxzZX0vPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0gY29udGV4dHVhbD17ZmFsc2V9Lz5cblx0XHQ8L1JvdXRlPlxuXHRcdFxuXHRcdFxuICAgIDwvUm91dGU+KSx7XG5cdFx0Y3JlYXRlRWxlbWVudChDb21wb25lbnQsIHByb3BzKXtcblx0XHRcdGlmKENvbXBvbmVudD09UWlsaUNvbnNvbGUpe1xuXHRcdFx0XHRsZXQgY2hpbGQ9cHJvcHMuY2hpbGRyZW5cblx0XHRcdFx0XHQse3JvdXRlLHBhcmFtc309Y2hpbGQucHJvcHNcblxuXHRcdFx0XHRpZihyb3V0ZS5uYW1lPT1cImFwcFwiKVxuXHRcdFx0XHRcdHByb3BzLmluaXQ9YT0+QXBwbGljYXRpb24uaW5pdChwYXJhbXMubmFtZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30vPlxuXHRcdH1cblx0fVxuKVxuXG5cbi8qKlxuQFRvZG86XG4qRG9uZTogYWZ0ZXIgYWRkaW5nIG5ldyBhcHBsaWNhdGlvblxuICAgIGFwcGxpY2F0aW9uIGxpc3QgZG9lc24ndCByZWZsZWN0IHRoZSBjaGFuZ2VcbiAgICBsb2NhbCBzdG9yYWdlIHdpdGhvdXQgQWxsIGZpZWxkcywgc3VjaCBhcyB3aXRob3V0IGFwcGxpY2F0aW9uIG5hbWUsIC4uLiwgYmVjYXVzZSBzZXJ2ZXIgcmV0dXJuZWQgb25seSBfaWQsIGNyZWF0ZWRBdCwgLi4uXG4qRG9uZTogYWZ0ZXIgYXBwbGljYXRpb24gZGVsZXRpb24sIFVJIHNob3VsZCBnbyB0byAvIGV2ZW4gd2l0aCBlcnJvclxuKkRvbmU6IGVycm9yIGhhcHBlbnMsIFVJIHNob3VsZCBub3QgYmUgRW1wdHlcbipEb24ndDogdXNlIDxMaW5rLz4gcmF0aGVyIHRoYW4gdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG9cbioqRG9uZTogTmV2ZXIgZW1wdHkgVUlcbioqRG9uZTogRmxvYXRBY3Rpb25CdXR0b24gcG9zaXRpb24gd2hlbiB2aWV3IHdpZHRoIGlzIDk2MFxuXG4qIHRvbyBzbWFsbC16b29tIHNpemUgaW4gbW9iaWxlIGJyb3dzZXJcbiogZmlyc3QgZm9jdXMgb24gZm9ybSwgY2xvdWQgVUlcbiogYmFja2dyb3VuZCB0byB1cGxvYWQgdG8gYmFja2VuZFxuICAgIGRvbmU6IFdlYlNRTERiIGlzIGRvbmVcbiAgICAqKiogc3FsaXRlXG4gICAgZG9uZTogKioqIGFmdGVyIHJlbW92ZSBhcHAsIGxvY2FsIGNhY2hlIHNob3VsZCBiZSByZW1vdmVkIHRvb1xuKiogdGV4dGZpZWxkIGNhbid0IGJlIGNoYW5nZWQgKHdoaWNoPz8pXG4qRG9uZTogbG9naW4gZXJyb3IsIHBsYWNlaG9sZGVyIGFuZCB2YWx1ZSBzaG93IHRvZ2V0aGVyXG4qIHNpbXBsZSBkYXRhIG1vZGU6XG4gICAgKiByZW1vdGUgdXBzZXJ0IGFuZCByZW1vdmUgZGlyZWN0bHlcbiAgICAqIGxvY2FsIGNhY2hlIGZvciBzZWFyY2hcbiogQ2Fubm90IHJlYWQgcHJvcGVydHkgJ2NvbXBvbmVudERpZEVudGVyJyBvZiB1bmRlZmluZWRcbipEb25lOiBEYXRlIHNob3cgYXMgbWVhbmluZ2Z1bFxuKiBkYXRhIGxpc3QgdG8gc2hvdyBvYmplY3QgZmllbGQgW29iamVjdF09PnsuLi59XG4qL1xuIl19