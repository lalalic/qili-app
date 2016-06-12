'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

var _materialUi = require('material-ui');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _dashboard = require('material-ui/svg-icons/action/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require('material-ui/svg-icons/file/cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _assignment = require('material-ui/svg-icons/action/assignment');

var _assignment2 = _interopRequireDefault(_assignment);

var _moreVert = require('material-ui/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _.UI.CommandBar;
var List = _.UI.List;
var Empty = _.UI.Empty;
var Command = CommandBar.Command;
var DialogCommand = CommandBar.DialogCommand;

var Dashboard = function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard() {
    _classCallCheck(this, Dashboard);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).apply(this, arguments));
  }

  _createClass(Dashboard, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (this.props.app != newProps.app) this.forceUpdate();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var content;var app = this.props.app;

      if (!_app2.default.all || 0 == _app2.default.all.length) content = _react2.default.createElement(Empty, { text: _react2.default.createElement(
          'a',
          { style: { cursor: "cell" }, onClick: function onClick() {
              return _this2.context.router.push("app");
            } },
          'Create first QiLi!'
        ) });else {
        content = _react2.default.createElement(Empty, { icon: _react2.default.createElement(_cloud2.default, null), text: 'Welcome' });
      }
      return _react2.default.createElement(
        'div',
        null,
        content,
        _react2.default.createElement(CommandBar, { className: 'footbar', onSelect: this.onSelect.bind(this),
          items: [{ action: "Data", icon: _dashboard2.default }, { action: "Cloud", icon: _cloud2.default }, { action: "Log", icon: _assignment2.default }, { action: "More", icon: _moreVert2.default, onSelect: function onSelect() {
              return _this2.refs.more.show();
            } }]
        }),
        _react2.default.createElement(MoreActions, { ref: 'more', app: this.props.app })
      );
    }
  }, {
    key: 'onSelect',
    value: function onSelect(cmd) {
      if (!_app2.default.current) return;
      switch (cmd) {
        case 'Data':
          this.context.router.push('/data');
          break;
        case 'Cloud':
          this.context.router.push("/cloud");
          break;
        case 'Log':
          this.context.router.push("/log");
          break;
      }
    }
  }]);

  return Dashboard;
}(_react.Component);

exports.default = Dashboard;

var MoreActions = function (_DialogCommand) {
  _inherits(MoreActions, _DialogCommand);

  function MoreActions() {
    _classCallCheck(this, MoreActions);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MoreActions).apply(this, arguments));
  }

  _createClass(MoreActions, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.forceUpdate();
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _this4 = this;

      var setting;
      if (_app2.default.current) setting = [_react2.default.createElement(List.Item, { primaryText: 'Setting', style: { textAlign: 'left' },
        leftIcon: _react2.default.createElement('span', null),
        key: 'setting',
        onClick: function onClick() {
          return _this4.context.router.push('app/' + _app2.default.current.name);
        } }), _react2.default.createElement(List.Divider, { key: 1, inset: true })];
      return _react2.default.createElement(
        List,
        null,
        setting,
        _react2.default.createElement(List.Item, { primaryText: (_app2.default.current ? "More" : "First") + ' QiLi',
          style: { textAlign: 'left' },
          initiallyOpen: true,
          insetChildren: true,
          leftAvatar: _react2.default.createElement(
            _materialUi.Avatar,
            { onClick: function onClick(a) {
                return _this4.context.router.push("app");
              } },
            '+'
          ),
          nestedItems: _app2.default.all.map(function (a) {
            return _react2.default.createElement(List.Item, { primaryText: a.name, key: '' + a._id,
              leftIcon: _react2.default.createElement('span', null), style: { textAlign: 'left' },
              onClick: function onClick() {
                return _this4.context.router.push('app/' + (_app2.default.current = a).name);
              } });
          })
        })
      );
    }
  }]);

  return MoreActions;
}(DialogCommand);

Dashboard.MoreActions = MoreActions;
Dashboard.contextTypes = MoreActions.contextTypes = { router: _react2.default.PropTypes.object };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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SSxPQUFKLEdBQWMsTUFBZCxHQUF1QixPQUF2QixXQUFoQjtBQUNLLGlCQUFPLEVBQUMsV0FBVSxNQUFWLEVBQVI7QUFDQSx5QkFBZSxJQUFmO0FBQ0EseUJBQWUsSUFBZjtBQUNBLHNCQUFZOztjQUFRLFNBQVM7dUJBQUcsT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixDQUF5QixLQUF6QjtlQUFILEVBQWpCOztXQUFaO0FBQ2YsdUJBQ0MsY0FBSSxHQUFKLENBQVEsR0FBUixDQUFZLFVBQUMsQ0FBRCxFQUFLO0FBQ2hCLG1CQUNDLDhCQUFDLEtBQUssSUFBTixJQUFXLGFBQWEsRUFBRSxJQUFGLEVBQVEsVUFBUSxFQUFFLEdBQUY7QUFDdkMsd0JBQVUsMkNBQVYsRUFBbUIsT0FBTyxFQUFDLFdBQVUsTUFBVixFQUFSO0FBQ25CLHVCQUFTO3VCQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsVUFBZ0MsQ0FBQyxjQUFJLE9BQUosR0FBWSxDQUFaLENBQUQsQ0FBZ0IsSUFBaEI7ZUFBcEMsRUFGVixDQURELENBRGdCO1dBQUwsQ0FEYjtTQUxELENBRlE7T0FESixDQVRROzs7O1NBTFY7RUFBb0I7O0FBb0MxQixVQUFVLFdBQVYsR0FBc0IsV0FBdEI7QUFDQSxVQUFVLFlBQVYsR0FBdUIsWUFBWSxZQUFaLEdBQXlCLEVBQUMsUUFBTyxnQkFBTSxTQUFOLENBQWdCLE1BQWhCLEVBQWpDIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1VJLCBVc2VyfSBmcm9tICcuJ1xuaW1wb3J0IHtBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2RiL2FwcCdcblxuaW1wb3J0IERhdGEgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGFzaGJvYXJkXCJcbmltcG9ydCBDbG91ZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWRcIlxuaW1wb3J0IExvZyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hc3NpZ25tZW50XCJcbmltcG9ydCBNb3JlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgTGlzdCwgRW1wdHl9PVVJXG5jb25zdCB7Q29tbWFuZCwgRGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYXBwIT1uZXdQcm9wcy5hcHApXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsIHthcHB9PXRoaXMucHJvcHNcbiAgICAgICAgaWYoIUFwcC5hbGwgfHwgMD09QXBwLmFsbC5sZW5ndGgpXG4gICAgICAgICAgICBjb250ZW50PSg8RW1wdHkgdGV4dD17PGEgc3R5bGU9e3tjdXJzb3I6XCJjZWxsXCJ9fSBvbkNsaWNrPXsoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwiYXBwXCIpfT5DcmVhdGUgZmlyc3QgUWlMaSE8L2E+fS8+KVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxFbXB0eSBpY29uPXs8Q2xvdWQvPn0gdGV4dD1cIldlbGNvbWVcIi8+KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxuXHRcdFx0XHQ8Q29tbWFuZEJhciAgY2xhc3NOYW1lPVwiZm9vdGJhclwiIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG5cdFx0XHRcdFx0aXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJEYXRhXCIsIGljb246RGF0YX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiQ2xvdWRcIiwgaWNvbjpDbG91ZH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiTG9nXCIsIGljb246TG9nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJNb3JlXCIsIGljb246TW9yZSwgb25TZWxlY3Q6KCk9PnRoaXMucmVmcy5tb3JlLnNob3coKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG5cdFx0XHRcdFx0Lz5cbiAgICAgICAgICAgICAgICA8TW9yZUFjdGlvbnMgcmVmPVwibW9yZVwiIGFwcD17dGhpcy5wcm9wcy5hcHB9Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcbiAgICB9XG5cblx0b25TZWxlY3QoY21kKXtcbiAgICAgICAgaWYoIUFwcC5jdXJyZW50KVxuICAgICAgICAgICAgcmV0dXJuO1xuXHRcdHN3aXRjaChjbWQpe1xuXHRcdGNhc2UgJ0RhdGEnOlxuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGAvZGF0YWApXG5cdFx0YnJlYWtcblx0XHRjYXNlICdDbG91ZCc6XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCIvY2xvdWRcIilcblx0XHRicmVha1xuXHRcdGNhc2UgJ0xvZyc6XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCIvbG9nXCIpXG5cdFx0YnJlYWtcblx0XHR9XG5cdH1cbn1cblxuY2xhc3MgTW9yZUFjdGlvbnMgZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpe1xuICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICB9XG5cblx0cmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIgc2V0dGluZ1xuICAgICAgICBpZihBcHAuY3VycmVudClcbiAgICAgICAgICAgIHNldHRpbmc9WyhcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIlNldHRpbmdcIiBzdHlsZT17e3RleHRBbGlnbjonbGVmdCd9fVxuICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PHNwYW4vPn1cbiAgICAgICAgICAgICAgICAgICAga2V5PVwic2V0dGluZ1wiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGFwcC8ke0FwcC5jdXJyZW50Lm5hbWV9YCl9Lz5cbiAgICAgICAgICAgICAgICApLCg8TGlzdC5EaXZpZGVyIGtleT17MX0gaW5zZXQ9e3RydWV9Lz4pXVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPExpc3Q+XG4gICAgICAgICAgICAgICAge3NldHRpbmd9XG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e2Ake0FwcC5jdXJyZW50ID8gXCJNb3JlXCIgOiBcIkZpcnN0XCJ9IFFpTGlgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3RleHRBbGlnbjonbGVmdCd9fVxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsbHlPcGVuPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBpbnNldENoaWxkcmVuPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXs8QXZhdGFyIG9uQ2xpY2s9e2E9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImFwcFwiKX0+KzwvQXZhdGFyPn1cblx0XHRcdFx0XHRuZXN0ZWRJdGVtcz17XG5cdFx0XHRcdFx0XHRBcHAuYWxsLm1hcCgoYSk9Pntcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXthLm5hbWV9IGtleT17YCR7YS5faWR9YH1cblx0XHRcdFx0XHRcdFx0XHRcdGxlZnRJY29uPXs8c3Bhbi8+fSBzdHlsZT17e3RleHRBbGlnbjonbGVmdCd9fVxuXHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgYXBwLyR7KEFwcC5jdXJyZW50PWEpLm5hbWV9YCl9Lz5cblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdC8+XG4gICAgICAgICAgICA8L0xpc3Q+XG5cdFx0KVxuXHR9XG59XG5EYXNoYm9hcmQuTW9yZUFjdGlvbnM9TW9yZUFjdGlvbnNcbkRhc2hib2FyZC5jb250ZXh0VHlwZXM9TW9yZUFjdGlvbnMuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbiJdfQ==