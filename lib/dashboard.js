'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dashboard = require('material-ui/lib/svg-icons/action/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _cloud = require('material-ui/lib/svg-icons/file/cloud');

var _cloud2 = _interopRequireDefault(_cloud);

var _assignment = require('material-ui/lib/svg-icons/action/assignment');

var _assignment2 = _interopRequireDefault(_assignment);

var _moreVert = require('material-ui/lib/svg-icons/navigation/more-vert');

var _moreVert2 = _interopRequireDefault(_moreVert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('.');

var Component = _require.Component;
var _require$UI = _require.UI;
var CommandBar = _require$UI.CommandBar;
var List = _require$UI.List;
var Empty = _require$UI.Empty;
var Command = CommandBar.Command;
var DialogCommand = CommandBar.DialogCommand;

var _require2 = require('material-ui');

var Avatar = _require2.Avatar;
var App = require('./db/app');
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

      if (!App.all || 0 == App.all.length) content = React.createElement(Empty, { text: React.createElement(
          'a',
          { style: { cursor: "cell" }, onClick: function onClick() {
              return _this2.context.router.transitionTo("app");
            } },
          'Create first QiLi!'
        ) });else {
        content = React.createElement(Empty, { icon: React.createElement(_cloud2.default, null), text: 'Welcome' });
      }
      return React.createElement(
        'div',
        null,
        content,
        React.createElement(CommandBar, { className: 'footbar', onSelect: this.onSelect.bind(this),
          items: [{ action: "Data", icon: _dashboard2.default }, { action: "Cloud", icon: _cloud2.default }, { action: "Log", icon: _assignment2.default }, { action: "More", icon: _moreVert2.default, onSelect: function onSelect() {
              return _this2.refs.more.show();
            } }]
        }),
        React.createElement(MoreActions, { ref: 'more', app: this.props.app })
      );
    }
  }, {
    key: 'onSelect',
    value: function onSelect(cmd) {
      if (!App.current) return;
      switch (cmd) {
        case 'Data':
          this.context.router.transitionTo("data");
          break;
        case 'Cloud':
          this.context.router.transitionTo("cloud");
          break;
        case 'Log':
          this.context.router.transitionTo("log");
          break;
      }
    }
  }]);

  return Dashboard;
}(Component);

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
      if (App.current) setting = React.createElement(List.Item, { primaryText: 'Setting', style: { textAlign: 'left' },
        leftIcon: React.createElement('span', null),
        onClick: function onClick() {
          return _this4.context.router.transitionTo("app", App.current);
        } });
      return React.createElement(
        List,
        null,
        setting,
        React.createElement(
          List.Item,
          { primaryText: (App.current ? "More" : "First") + ' QiLi',
            style: { textAlign: 'left' },
            open: true,
            leftAvatar: React.createElement(
              Avatar,
              { onClick: function onClick() {
                  return _this4.context.router.transitionTo("app", App.current = {});
                } },
              '+'
            ) },
          App.all.map(function (a) {
            return React.createElement(List.Item, { primaryText: a.name, key: '' + a._id,
              leftIcon: React.createElement('span', null), style: { textAlign: 'left' },
              onClick: function onClick() {
                return _this4.context.router.transitionTo("app", App.current = a);
              } });
          })
        )
      );
    }
  }]);

  return MoreActions;
}(DialogCommand);

Dashboard.MoreActions = MoreActions;
Dashboard.contextTypes = MoreActions.contextTypes = { router: React.PropTypes.func };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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OztRQUNLLE9BREw7UUFFUjtBQUFDLGVBQUssSUFBTjtZQUFXLGNBQWdCLElBQUksT0FBSixHQUFjLE1BQWQsR0FBdUIsT0FBdkIsV0FBaEI7QUFDSyxtQkFBTyxFQUFDLFdBQVUsTUFBVixFQUFSO0FBQ0Esa0JBQU0sSUFBTjtBQUNBLHdCQUFZO0FBQUMsb0JBQUQ7Z0JBQVEsU0FBUzt5QkFBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFlBQXBCLENBQWlDLEtBQWpDLEVBQXVDLElBQUksT0FBSixHQUFZLEVBQVo7aUJBQTNDLEVBQWpCOzthQUFaLEVBSGhCO1VBS0UsSUFBSSxHQUFKLENBQVEsR0FBUixDQUFZLFVBQUMsQ0FBRCxFQUFLO0FBQ2hCLG1CQUNDLG9CQUFDLEtBQUssSUFBTixJQUFXLGFBQWEsRUFBRSxJQUFGLEVBQVEsVUFBUSxFQUFFLEdBQUY7QUFDdkMsd0JBQVUsaUNBQVYsRUFBbUIsT0FBTyxFQUFDLFdBQVUsTUFBVixFQUFSO0FBQ25CLHVCQUFTO3VCQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsWUFBcEIsQ0FBaUMsS0FBakMsRUFBdUMsSUFBSSxPQUFKLEdBQVksQ0FBWjtlQUEzQyxFQUZWLENBREQsQ0FEZ0I7V0FBTCxDQUxkO1NBRlE7T0FESixDQVJROzs7O1NBTFY7RUFBb0I7O0FBa0MxQixVQUFVLFdBQVYsR0FBc0IsV0FBdEI7QUFDQSxVQUFVLFlBQVYsR0FBdUIsWUFBWSxZQUFaLEdBQXlCLEVBQUMsUUFBTyxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsRUFBakMiLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0PXJlcXVpcmUoJ3JlYWN0JyksXG4gICAge0NvbXBvbmVudCwgVUk6e0NvbW1hbmRCYXIsIExpc3QsIEVtcHR5fX09cmVxdWlyZSgnLicpLFxuXHR7Q29tbWFuZCwgRGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhcixcbiAgICB7QXZhdGFyfT1yZXF1aXJlKCdtYXRlcmlhbC11aScpLFxuICAgIEFwcD1yZXF1aXJlKCcuL2RiL2FwcCcpO1xuXG5pbXBvcnQgRGF0YSBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vZGFzaGJvYXJkXCJcbmltcG9ydCBDbG91ZCBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9maWxlL2Nsb3VkXCJcbmltcG9ydCBMb2cgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuaW1wb3J0IE1vcmUgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvbmF2aWdhdGlvbi9tb3JlLXZlcnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuYXBwIT1uZXdQcm9wcy5hcHApXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGNvbnRlbnQsIHthcHB9PXRoaXMucHJvcHNcbiAgICAgICAgaWYoIUFwcC5hbGwgfHwgMD09QXBwLmFsbC5sZW5ndGgpXG4gICAgICAgICAgICBjb250ZW50PSg8RW1wdHkgdGV4dD17PGEgc3R5bGU9e3tjdXJzb3I6XCJjZWxsXCJ9fSBvbkNsaWNrPXsoKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oXCJhcHBcIil9PkNyZWF0ZSBmaXJzdCBRaUxpITwvYT59Lz4pXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29udGVudD0oPEVtcHR5IGljb249ezxDbG91ZC8+fSB0ZXh0PVwiV2VsY29tZVwiLz4pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxkaXY+XG4gICAgICAgICAgICAgICAge2NvbnRlbnR9XG5cdFx0XHRcdDxDb21tYW5kQmFyICBjbGFzc05hbWU9XCJmb290YmFyXCIgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cblx0XHRcdFx0XHRpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkRhdGFcIiwgaWNvbjpEYXRhfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJDbG91ZFwiLCBpY29uOkNsb3VkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJMb2dcIiwgaWNvbjpMb2d9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIk1vcmVcIiwgaWNvbjpNb3JlLCBvblNlbGVjdDooKT0+dGhpcy5yZWZzLm1vcmUuc2hvdygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cblx0XHRcdFx0XHQvPlxuICAgICAgICAgICAgICAgIDxNb3JlQWN0aW9ucyByZWY9XCJtb3JlXCIgYXBwPXt0aGlzLnByb3BzLmFwcH0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuICAgIH1cblxuXHRvblNlbGVjdChjbWQpe1xuICAgICAgICBpZighQXBwLmN1cnJlbnQpXG4gICAgICAgICAgICByZXR1cm47XG5cdFx0c3dpdGNoKGNtZCl7XG5cdFx0Y2FzZSAnRGF0YSc6XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbyhcImRhdGFcIilcblx0XHRicmVha1xuXHRcdGNhc2UgJ0Nsb3VkJzpcblx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKFwiY2xvdWRcIilcblx0XHRicmVha1xuXHRcdGNhc2UgJ0xvZyc6XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbyhcImxvZ1wiKVxuXHRcdGJyZWFrXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIE1vcmVBY3Rpb25zIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKXtcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgfVxuXG5cdHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHNldHRpbmdcbiAgICAgICAgaWYoQXBwLmN1cnJlbnQpXG4gICAgICAgICAgICBzZXR0aW5nPShcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIlNldHRpbmdcIiBzdHlsZT17e3RleHRBbGlnbjonbGVmdCd9fVxuICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PHNwYW4vPn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKFwiYXBwXCIsQXBwLmN1cnJlbnQpfS8+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPExpc3Q+XG4gICAgICAgICAgICAgICAge3NldHRpbmd9XG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e2Ake0FwcC5jdXJyZW50ID8gXCJNb3JlXCIgOiBcIkZpcnN0XCJ9IFFpTGlgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3RleHRBbGlnbjonbGVmdCd9fVxuICAgICAgICAgICAgICAgICAgICBvcGVuPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXs8QXZhdGFyIG9uQ2xpY2s9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbyhcImFwcFwiLEFwcC5jdXJyZW50PXt9KX0+KzwvQXZhdGFyPn0+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0QXBwLmFsbC5tYXAoKGEpPT57XG5cdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD17YS5uYW1lfSBrZXk9e2Ake2EuX2lkfWB9XG5cdFx0XHRcdFx0XHRcdFx0XHRsZWZ0SWNvbj17PHNwYW4vPn0gc3R5bGU9e3t0ZXh0QWxpZ246J2xlZnQnfX1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbyhcImFwcFwiLEFwcC5jdXJyZW50PWEpfS8+XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgIDwvTGlzdD5cblx0XHQpXG5cdH1cbn1cbkRhc2hib2FyZC5Nb3JlQWN0aW9ucz1Nb3JlQWN0aW9uc1xuRGFzaGJvYXJkLmNvbnRleHRUeXBlcz1Nb3JlQWN0aW9ucy5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cbiJdfQ==