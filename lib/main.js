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
        _app2.default.on('change', function () {
            return _this.setState({ app: _app2.default.current });
        });
        return _this;
    }

    _createClass(QiliConsole, [{
        key: 'renderContent',
        value: function renderContent() {
            var app = this.state.app;

            return _.React.createElement(
                'div',
                null,
                _.React.createElement(CurrentApp, { app: app }),
                this.props.children
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
            var _props = this.props;
            var _props$app = _props.app;
            var app = _props$app === undefined ? { name: "" } : _props$app;
            var _props$style = _props.style;
            var style = _props$style === undefined ? { opacity: 0.7, position: "absolute" } : _props$style;

            var others = _objectWithoutProperties(_props, ['app', 'style']);

            if (!app._id) style.display = "hidden";

            return _.React.createElement(
                _materialUi.FloatingActionButton,
                _extends({ className: 'sticky top right',
                    onClick: this.change.bind(this),
                    style: style
                }, others),
                app.name
            );
        }
    }, {
        key: 'change',
        value: function change() {
            var app = this.props.app;
            var apps = _app2.default.all;
            var len = apps.length;
            if (len < 2) return;

            var index = -1;
            apps.find(function (a) {
                return index++, a._id == app._id;
            });
            _app2.default.current = apps[(index + 1) % len];
        }
    }]);

    return CurrentApp;
}(_.Component);

module.exports = _.QiliApp.render(_.React.createElement(
    _reactRouter.Route,
    { path: '/', component: QiliConsole },
    _.React.createElement(_reactRouter.IndexRoute, { component: require('./dashboard') }),
    _.React.createElement(_reactRouter.Route, { path: 'app/:name', component: require('./app') }),
    _.React.createElement(_reactRouter.Route, { path: 'app', component: require('./app') }),
    _.React.createElement(_reactRouter.Route, { path: 'cloud', component: require('./cloud') }),
    _.React.createElement(_reactRouter.Route, { path: 'data/:name', component: require('./data') }),
    _.React.createElement(_reactRouter.Redirect, { from: 'data', to: 'data/' + _.User._name }),
    _.React.createElement(_reactRouter.Route, { path: 'log/:level', component: require('./log') }),
    _.React.createElement(_reactRouter.Redirect, { from: 'log', to: 'log/all' })
), {
    createElement: function createElement(Component, props) {
        return _.React.createElement(Component, _extends({ app: _app2.default.current }, props));
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
//# sourceMappingURL=data:application/json;base64,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QVEsUUFBUixDQUFYLEVBQXpCLENBUEg7SUFRRywrQ0FBVSxNQUFLLE1BQUwsRUFBWSxjQUFZLE9BQUssS0FBTCxFQUFsQyxDQVJIO0lBVUcsNENBQU8sTUFBSyxZQUFMLEVBQWtCLFdBQVcsUUFBUSxPQUFSLENBQVgsRUFBekIsQ0FWSDtJQVdHLCtDQUFVLE1BQUssS0FBTCxFQUFXLElBQUcsU0FBSCxFQUFyQixDQVhIO0NBRFUsRUFhRDtBQUNOLDBDQUFjLFdBQVUsT0FBTTtBQUMxQixlQUFPLHNCQUFDLFNBQUQsYUFBVyxLQUFLLGNBQVksT0FBWixJQUF5QixNQUF6QyxDQUFQLENBRDBCO0tBRHhCO0NBYkMsQ0FBZiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCB7aW5pdCxVc2VyLFFpbGlBcHAsUmVhY3QsQ29tcG9uZW50LCBVSSwgUG9zaXRpb259IGZyb20gJy4nXG5pbXBvcnQge1JvdXRlciwgUm91dGUsIEluZGV4Um91dGUsIGhhc2hIaXN0b3J5LCBSZWRpcmVjdH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9kYi9hcHAnXG5pbXBvcnQgQXBwIGZyb20gJy4vYXBwJ1xuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cblxuY2xhc3MgUWlsaUNvbnNvbGUgZXh0ZW5kcyBRaWxpQXBwe1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7YXBwOnRoaXMucHJvcHMuYXBwfSlcbiAgICAgICAgQXBwbGljYXRpb24ub24oJ2NoYW5nZScsKCk9PnRoaXMuc2V0U3RhdGUoe2FwcDpBcHBsaWNhdGlvbi5jdXJyZW50fSkpXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2FwcH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8Q3VycmVudEFwcCBhcHA9e2FwcH0vPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59O1xuXG5PYmplY3QuYXNzaWduKFFpbGlDb25zb2xlLmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCJxaWxpQWRtaW5cIixcbiAgICBpbml0OigpPT5BcHBsaWNhdGlvbi5pbml0KClcbn0pO1xuXG5jbGFzcyBDdXJyZW50QXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIHZhciB7bmFtZTpuZXh0TmFtZX09bmV4dFByb3BzLmFwcHx8e30sXG4gICAgICAgICAgICB7bmFtZX09dGhpcy5wcm9wcy5hcHB8fHt9O1xuICAgICAgICByZXR1cm4gbmV4dE5hbWUhPW5hbWVcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHthcHA9e25hbWU6XCJcIn0sIHN0eWxlPXtvcGFjaXR5OjAuNywgcG9zaXRpb246XCJhYnNvbHV0ZVwifSwgLi4ub3RoZXJzfT10aGlzLnByb3BzO1xuICAgICAgICBpZighYXBwLl9pZClcbiAgICAgICAgICAgIHN0eWxlLmRpc3BsYXk9XCJoaWRkZW5cIlxuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICB7Li4ub3RoZXJzfT5cbiAgICAgICAgICAgICAgICB7YXBwLm5hbWV9XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxuICAgIGNoYW5nZSgpe1xuICAgICAgICB2YXIge2FwcH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGFwcHM9QXBwbGljYXRpb24uYWxsLFxuICAgICAgICAgICAgbGVuPWFwcHMubGVuZ3RoO1xuICAgICAgICBpZihsZW48MilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgaW5kZXg9LTFcbiAgICAgICAgYXBwcy5maW5kKChhKT0+KGluZGV4KyssYS5faWQ9PWFwcC5faWQpKVxuICAgICAgICBBcHBsaWNhdGlvbi5jdXJyZW50PWFwcHNbKGluZGV4KzEpICUgbGVuXVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17UWlsaUNvbnNvbGV9PlxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e3JlcXVpcmUoJy4vZGFzaGJvYXJkJyl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcC86bmFtZVwiIGNvbXBvbmVudD17cmVxdWlyZSgnLi9hcHAnKX0vPlxuICAgICAgICA8Um91dGUgcGF0aD1cImFwcFwiIGNvbXBvbmVudD17cmVxdWlyZSgnLi9hcHAnKX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY2xvdWRcIiBjb21wb25lbnQ9e3JlcXVpcmUoJy4vY2xvdWQnKX0vPlxuICAgICAgICA8Um91dGUgcGF0aD1cImRhdGEvOm5hbWVcIiBjb21wb25lbnQ9e3JlcXVpcmUoJy4vZGF0YScpfS8+XG4gICAgICAgIDxSZWRpcmVjdCBmcm9tPVwiZGF0YVwiIHRvPXtgZGF0YS8ke1VzZXIuX25hbWV9YH0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwibG9nLzpsZXZlbFwiIGNvbXBvbmVudD17cmVxdWlyZSgnLi9sb2cnKX0vPlxuICAgICAgICA8UmVkaXJlY3QgZnJvbT1cImxvZ1wiIHRvPVwibG9nL2FsbFwiIC8+XG4gICAgPC9Sb3V0ZT4pLHtcbiAgICAgICAgY3JlYXRlRWxlbWVudChDb21wb25lbnQscHJvcHMpe1xuICAgICAgICAgICAgcmV0dXJuIDxDb21wb25lbnQgYXBwPXtBcHBsaWNhdGlvbi5jdXJyZW50fSB7Li4ucHJvcHN9Lz5cbiAgICAgICAgfVxuICAgIH1cbilcblxuXG4vKipcbkBUb2RvOlxuKkRvbmU6IGFmdGVyIGFkZGluZyBuZXcgYXBwbGljYXRpb25cbiAgICBhcHBsaWNhdGlvbiBsaXN0IGRvZXNuJ3QgcmVmbGVjdCB0aGUgY2hhbmdlXG4gICAgbG9jYWwgc3RvcmFnZSB3aXRob3V0IEFsbCBmaWVsZHMsIHN1Y2ggYXMgd2l0aG91dCBhcHBsaWNhdGlvbiBuYW1lLCAuLi4sIGJlY2F1c2Ugc2VydmVyIHJldHVybmVkIG9ubHkgX2lkLCBjcmVhdGVkQXQsIC4uLlxuKkRvbmU6IGFmdGVyIGFwcGxpY2F0aW9uIGRlbGV0aW9uLCBVSSBzaG91bGQgZ28gdG8gLyBldmVuIHdpdGggZXJyb3JcbipEb25lOiBlcnJvciBoYXBwZW5zLCBVSSBzaG91bGQgbm90IGJlIEVtcHR5XG4qRG9uJ3Q6IHVzZSA8TGluay8+IHJhdGhlciB0aGFuIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvXG4qKkRvbmU6IE5ldmVyIGVtcHR5IFVJXG4qKkRvbmU6IEZsb2F0QWN0aW9uQnV0dG9uIHBvc2l0aW9uIHdoZW4gdmlldyB3aWR0aCBpcyA5NjBcblxuKiB0b28gc21hbGwtem9vbSBzaXplIGluIG1vYmlsZSBicm93c2VyXG4qIGZpcnN0IGZvY3VzIG9uIGZvcm0sIGNsb3VkIFVJXG4qIGJhY2tncm91bmQgdG8gdXBsb2FkIHRvIGJhY2tlbmRcbiAgICBkb25lOiBXZWJTUUxEYiBpcyBkb25lXG4gICAgKioqIHNxbGl0ZVxuICAgIGRvbmU6ICoqKiBhZnRlciByZW1vdmUgYXBwLCBsb2NhbCBjYWNoZSBzaG91bGQgYmUgcmVtb3ZlZCB0b29cbioqIHRleHRmaWVsZCBjYW4ndCBiZSBjaGFuZ2VkICh3aGljaD8/KVxuKkRvbmU6IGxvZ2luIGVycm9yLCBwbGFjZWhvbGRlciBhbmQgdmFsdWUgc2hvdyB0b2dldGhlclxuKiBzaW1wbGUgZGF0YSBtb2RlOlxuICAgICogcmVtb3RlIHVwc2VydCBhbmQgcmVtb3ZlIGRpcmVjdGx5XG4gICAgKiBsb2NhbCBjYWNoZSBmb3Igc2VhcmNoXG4qIENhbm5vdCByZWFkIHByb3BlcnR5ICdjb21wb25lbnREaWRFbnRlcicgb2YgdW5kZWZpbmVkXG4qRG9uZTogRGF0ZSBzaG93IGFzIG1lYW5pbmdmdWxcbiogZGF0YSBsaXN0IHRvIHNob3cgb2JqZWN0IGZpZWxkIFtvYmplY3RdPT57Li4ufVxuKi9cbiJdfQ==