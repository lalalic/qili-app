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
            { onClick: function onClick() {
                _app2.default.current = {};_this4.context.router.push("app");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVPO0lBQVk7SUFBTTtJQUNsQixVQUF3QixXQUF4QjtJQUFTLGdCQUFlLFdBQWY7O0lBRUs7Ozs7Ozs7Ozs7OzhDQUNTLFVBQVM7QUFDL0IsVUFBRyxLQUFLLEtBQUwsQ0FBVyxHQUFYLElBQWdCLFNBQVMsR0FBVCxFQUNmLEtBQUssV0FBTCxHQURKOzs7OzZCQUlJOzs7QUFDQSxrQkFEQSxJQUNVLE1BQUssS0FBSyxLQUFMLENBQUwsSUFEVjs7QUFFSixVQUFHLENBQUMsY0FBSSxHQUFKLElBQVcsS0FBRyxjQUFJLEdBQUosQ0FBUSxNQUFSLEVBQ2QsVUFBUyw4QkFBQyxLQUFELElBQU8sTUFBTTs7WUFBRyxPQUFPLEVBQUMsUUFBTyxNQUFQLEVBQVIsRUFBd0IsU0FBUztxQkFBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLEtBQXpCO2FBQUosRUFBcEM7O1NBQU4sRUFBUCxDQUFULENBREosS0FFSztBQUNELGtCQUFTLDhCQUFDLEtBQUQsSUFBTyxNQUFNLG9EQUFOLEVBQWdCLE1BQUssU0FBTCxFQUF2QixDQUFULENBREM7T0FGTDtBQUtBLGFBQ0w7OztRQUNjLE9BRGQ7UUFFQyw4QkFBQyxVQUFELElBQWEsV0FBVSxTQUFWLEVBQW9CLFVBQVUsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFWO0FBQ2hDLGlCQUFPLENBQ1ksRUFBQyxRQUFPLE1BQVAsRUFBZSx5QkFBaEIsRUFEWixFQUVZLEVBQUMsUUFBTyxPQUFQLEVBQWdCLHFCQUFqQixFQUZaLEVBR1ksRUFBQyxRQUFPLEtBQVAsRUFBYywwQkFBZixFQUhaLEVBSVksRUFBQyxRQUFPLE1BQVAsRUFBZSx3QkFBaEIsRUFBMkIsVUFBUztxQkFBSSxPQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsSUFBZjthQUFKLEVBSmhELENBQVA7U0FERCxDQUZEO1FBVWEsOEJBQUMsV0FBRCxJQUFhLEtBQUksTUFBSixFQUFXLEtBQUssS0FBSyxLQUFMLENBQVcsR0FBWCxFQUE3QixDQVZiO09BREssQ0FQSTs7Ozs2QkF1QkYsS0FBSTtBQUNOLFVBQUcsQ0FBQyxjQUFJLE9BQUosRUFDQSxPQURKO0FBRU4sY0FBTyxHQUFQO0FBQ0EsYUFBSyxNQUFMO0FBQ0MsZUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixVQUREO0FBRUEsZ0JBRkE7QUFEQSxhQUlLLE9BQUw7QUFDQyxlQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLFFBQXpCLEVBREQ7QUFFQSxnQkFGQTtBQUpBLGFBT0ssS0FBTDtBQUNDLGVBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsTUFBekIsRUFERDtBQUVBLGdCQUZBO0FBUEEsT0FIWTs7OztTQTdCTzs7Ozs7SUE4Q2Y7Ozs7Ozs7Ozs7OzhDQUN3QixVQUFTO0FBQy9CLFdBQUssV0FBTCxHQUQrQjs7OztvQ0FJdkI7OztBQUNSLFVBQUksT0FBSixDQURRO0FBRVIsVUFBRyxjQUFJLE9BQUosRUFDQyxVQUFRLENBQ0EsOEJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxTQUFaLEVBQXNCLE9BQU8sRUFBQyxXQUFVLE1BQVYsRUFBUjtBQUNqQyxrQkFBVSwyQ0FBVjtBQUNBLGFBQUksU0FBSjtBQUNBLGlCQUFTO2lCQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsVUFBZ0MsY0FBSSxPQUFKLENBQVksSUFBWjtTQUFwQyxFQUhULENBREEsRUFLRCw4QkFBQyxLQUFLLE9BQU4sSUFBYyxLQUFLLENBQUwsRUFBUSxPQUFPLElBQVAsRUFBdEIsQ0FMQyxDQUFSLENBREo7QUFPQSxhQUNJO0FBQUMsWUFBRDs7UUFDSyxPQURMO1FBRVIsOEJBQUMsS0FBSyxJQUFOLElBQVcsY0FBZ0IsY0FBSSxPQUFKLEdBQWMsTUFBZCxHQUF1QixPQUF2QixXQUFoQjtBQUNLLGlCQUFPLEVBQUMsV0FBVSxNQUFWLEVBQVI7QUFDQSx5QkFBZSxJQUFmO0FBQ0EseUJBQWUsSUFBZjtBQUNBLHNCQUFZOztjQUFRLFNBQVMsbUJBQUk7QUFBQyw4QkFBSSxPQUFKLEdBQVksRUFBWixDQUFELE1BQWdCLENBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsS0FBekIsRUFBaEI7ZUFBSixFQUFqQjs7V0FBWjtBQUNmLHVCQUNDLGNBQUksR0FBSixDQUFRLEdBQVIsQ0FBWSxVQUFDLENBQUQsRUFBSztBQUNoQixtQkFDQyw4QkFBQyxLQUFLLElBQU4sSUFBVyxhQUFhLEVBQUUsSUFBRixFQUFRLFVBQVEsRUFBRSxHQUFGO0FBQ3ZDLHdCQUFVLDJDQUFWLEVBQW1CLE9BQU8sRUFBQyxXQUFVLE1BQVYsRUFBUjtBQUNuQix1QkFBUzt1QkFBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLFVBQWdDLENBQUMsY0FBSSxPQUFKLEdBQVksQ0FBWixDQUFELENBQWdCLElBQWhCO2VBQXBDLEVBRlYsQ0FERCxDQURnQjtXQUFMLENBRGI7U0FMRCxDQUZRO09BREosQ0FUUTs7OztTQUxWO0VBQW9COztBQW9DMUIsVUFBVSxXQUFWLEdBQXNCLFdBQXRCO0FBQ0EsVUFBVSxZQUFWLEdBQXVCLFlBQVksWUFBWixHQUF5QixFQUFDLFFBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUFoQixFQUFqQyIsImZpbGUiOiJkYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtVSSwgVXNlcn0gZnJvbSAnLidcbmltcG9ydCB7QXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBBcHAgZnJvbSAnLi9kYi9hcHAnXG5cbmltcG9ydCBEYXRhIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Rhc2hib2FyZFwiXG5pbXBvcnQgQ2xvdWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkXCJcbmltcG9ydCBMb2cgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYXNzaWdubWVudFwiXG5pbXBvcnQgTW9yZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vbW9yZS12ZXJ0XCJcblxuY29uc3Qge0NvbW1hbmRCYXIsIExpc3QsIEVtcHR5fT1VSVxuY29uc3Qge0NvbW1hbmQsIERpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnByb3BzLmFwcCE9bmV3UHJvcHMuYXBwKVxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBjb250ZW50LCB7YXBwfT10aGlzLnByb3BzXG4gICAgICAgIGlmKCFBcHAuYWxsIHx8IDA9PUFwcC5hbGwubGVuZ3RoKVxuICAgICAgICAgICAgY29udGVudD0oPEVtcHR5IHRleHQ9ezxhIHN0eWxlPXt7Y3Vyc29yOlwiY2VsbFwifX0gb25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImFwcFwiKX0+Q3JlYXRlIGZpcnN0IFFpTGkhPC9hPn0vPilcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb250ZW50PSg8RW1wdHkgaWNvbj17PENsb3VkLz59IHRleHQ9XCJXZWxjb21lXCIvPilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PGRpdj5cbiAgICAgICAgICAgICAgICB7Y29udGVudH1cblx0XHRcdFx0PENvbW1hbmRCYXIgIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiRGF0YVwiLCBpY29uOkRhdGF9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkNsb3VkXCIsIGljb246Q2xvdWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkxvZ1wiLCBpY29uOkxvZ30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiTW9yZVwiLCBpY29uOk1vcmUsIG9uU2VsZWN0OigpPT50aGlzLnJlZnMubW9yZS5zaG93KCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuXHRcdFx0XHRcdC8+XG4gICAgICAgICAgICAgICAgPE1vcmVBY3Rpb25zIHJlZj1cIm1vcmVcIiBhcHA9e3RoaXMucHJvcHMuYXBwfS8+XG5cdFx0XHQ8L2Rpdj5cblx0XHQpXG4gICAgfVxuXG5cdG9uU2VsZWN0KGNtZCl7XG4gICAgICAgIGlmKCFBcHAuY3VycmVudClcbiAgICAgICAgICAgIHJldHVybjtcblx0XHRzd2l0Y2goY21kKXtcblx0XHRjYXNlICdEYXRhJzpcblx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgL2RhdGFgKVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnQ2xvdWQnOlxuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwiL2Nsb3VkXCIpXG5cdFx0YnJlYWtcblx0XHRjYXNlICdMb2cnOlxuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwiL2xvZ1wiKVxuXHRcdGJyZWFrXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIE1vcmVBY3Rpb25zIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKXtcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgfVxuXG5cdHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHNldHRpbmdcbiAgICAgICAgaWYoQXBwLmN1cnJlbnQpXG4gICAgICAgICAgICBzZXR0aW5nPVsoXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCJTZXR0aW5nXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2xlZnQnfX1cbiAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxzcGFuLz59XG4gICAgICAgICAgICAgICAgICAgIGtleT1cInNldHRpbmdcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBhcHAvJHtBcHAuY3VycmVudC5uYW1lfWApfS8+XG4gICAgICAgICAgICAgICAgKSwoPExpc3QuRGl2aWRlciBrZXk9ezF9IGluc2V0PXt0cnVlfS8+KV1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxMaXN0PlxuICAgICAgICAgICAgICAgIHtzZXR0aW5nfVxuXHRcdFx0XHQ8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXtgJHtBcHAuY3VycmVudCA/IFwiTW9yZVwiIDogXCJGaXJzdFwifSBRaUxpYH1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t0ZXh0QWxpZ246J2xlZnQnfX1cbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGx5T3Blbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgaW5zZXRDaGlsZHJlbj17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17PEF2YXRhciBvbkNsaWNrPXsoKT0+e0FwcC5jdXJyZW50PXt9O3RoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImFwcFwiKX19Pis8L0F2YXRhcj59XG5cdFx0XHRcdFx0bmVzdGVkSXRlbXM9e1xuXHRcdFx0XHRcdFx0QXBwLmFsbC5tYXAoKGEpPT57XG5cdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD17YS5uYW1lfSBrZXk9e2Ake2EuX2lkfWB9XG5cdFx0XHRcdFx0XHRcdFx0XHRsZWZ0SWNvbj17PHNwYW4vPn0gc3R5bGU9e3t0ZXh0QWxpZ246J2xlZnQnfX1cblx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGFwcC8keyhBcHAuY3VycmVudD1hKS5uYW1lfWApfS8+XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQvPlxuICAgICAgICAgICAgPC9MaXN0PlxuXHRcdClcblx0fVxufVxuRGFzaGJvYXJkLk1vcmVBY3Rpb25zPU1vcmVBY3Rpb25zXG5EYXNoYm9hcmQuY29udGV4dFR5cGVzPU1vcmVBY3Rpb25zLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG4iXX0=