'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = require('material-ui/svg-icons/action/http');

var _http2 = _interopRequireDefault(_http);

var _error = require('material-ui/svg-icons/alert/error');

var _error2 = _interopRequireDefault(_error);

var _warning = require('material-ui/svg-icons/alert/warning');

var _warning2 = _interopRequireDefault(_warning);

var _assignment = require('material-ui/svg-icons/action/assignment');

var _assignment2 = _interopRequireDefault(_assignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('.');

var React = _require.React;
var Component = _require.Component;
var _require$UI = _require.UI;
var CommandBar = _require$UI.CommandBar;
var List = _require$UI.List;
var Empty = _require$UI.Empty;
var App = require('./db/app');

var _require2 = require('material-ui');

var FontIcon = _require2.FontIcon;


var levels = {
    warning: 2,
    error: 3,
    http: 9,
    all: null,
    "9": "http",
    "3": "error",
    "2": "warning",
    "1": "info"
};
var Icons = { Http: _http2.default, Error: _error2.default, Warning: _warning2.default, All: _assignment2.default };

var Log = function (_Component) {
    _inherits(Log, _Component);

    function Log() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Log);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Log.__proto__ || Object.getPrototypeOf(Log)).call.apply(_ref, [this].concat(args))), _this), _this.state = { logs: null }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Log, [{
        key: 'getData',
        value: function getData(level) {
            this.setState({ logs: App.getLog(levels[level]) });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.getData(this.props.params.level);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            if (this.context.app != nextContext.app) this.getData(this.props.params.level);else if (this.props.params.level != nextProps.params.levle) this.getData(nextProps.params.level);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(List, { model: this.state.logs, template: this.constructor.ALog }),
                React.createElement(CommandBar, { className: 'footbar',
                    onSelect: function onSelect(level) {
                        return _this2.context.router.push('log/' + level);
                    },
                    primary: this.props.params.level,
                    items: [{ action: "Back" }, { action: "http", icon: _http2.default }, { action: "error", icon: _error2.default }, { action: "warning", icon: _warning2.default }, { action: "all", icon: _assignment2.default }] })
            );
        }
    }]);

    return Log;
}(Component);

Log.contextTypes = {
    router: React.PropTypes.object,
    app: React.PropTypes.object
};

Log.ALog = function (_Component2) {
    _inherits(_class, _Component2);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'render',
        value: function render() {
            var log = this.props.model;

            return React.createElement(List.Item, { primaryText: levels[log.level + ""] + ' on ' + log.createdAt, secondaryText: log.message });
        }
    }]);

    return _class;
}(Component);

exports.default = Log;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2cuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIlJlYWN0IiwiQ29tcG9uZW50IiwiVUkiLCJDb21tYW5kQmFyIiwiTGlzdCIsIkVtcHR5IiwiRm9udEljb24iLCJsZXZlbHMiLCJ3YXJuaW5nIiwiZXJyb3IiLCJodHRwIiwiYWxsIiwiSWNvbnMiLCJIdHRwIiwiRXJyb3IiLCJXYXJuaW5nIiwiQWxsIiwiTG9nIiwic3RhdGUiLCJsb2dzIiwibGV2ZWwiLCJzZXRTdGF0ZSIsIkFwcCIsImdldExvZyIsImdldERhdGEiLCJwcm9wcyIsInBhcmFtcyIsIm5leHRQcm9wcyIsIm5leHRDb250ZXh0IiwiY29udGV4dCIsImFwcCIsImxldmxlIiwiY29uc3RydWN0b3IiLCJBTG9nIiwicm91dGVyIiwicHVzaCIsImFjdGlvbiIsImljb24iLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJsb2ciLCJtb2RlbCIsImNyZWF0ZWRBdCIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztlQVBxREEsUUFBUSxHQUFSLEM7O0lBQWhEQyxLLFlBQUFBLEs7SUFBT0MsUyxZQUFBQSxTOzJCQUFXQyxFO0lBQUlDLFUsZUFBQUEsVTtJQUFZQyxJLGVBQUFBLEk7QUFBbkMsSUFBeUNDLEtBQXpDLGVBQXlDQSxLQUF6QztBQUNBLFVBQUlOLFFBQVEsVUFBUixDQUFKOztnQkFDV0EsUUFBUSxhQUFSLEM7O0lBQVZPLFEsYUFBQUEsUTs7O0FBT0wsSUFBTUMsU0FBTztBQUNSQyxhQUFRLENBREE7QUFFUkMsV0FBTSxDQUZFO0FBR1JDLFVBQUssQ0FIRztBQUlSQyxTQUFJLElBSkk7QUFLTCxTQUFJLE1BTEM7QUFNTCxTQUFJLE9BTkM7QUFPTCxTQUFJLFNBUEM7QUFRTCxTQUFJO0FBUkMsQ0FBYjtBQVVBLElBQU1DLFFBQU0sRUFBQ0Msb0JBQUQsRUFBT0Msc0JBQVAsRUFBY0MsMEJBQWQsRUFBdUJDLHlCQUF2QixFQUFaOztJQUVxQkMsRzs7Ozs7Ozs7Ozs7Ozs7b0xBQ2pCQyxLLEdBQU0sRUFBQ0MsTUFBSyxJQUFOLEU7Ozs7O2dDQUVEQyxLLEVBQU07QUFDYixpQkFBS0MsUUFBTCxDQUFjLEVBQUNGLE1BQUtHLElBQUlDLE1BQUosQ0FBV2hCLE9BQU9hLEtBQVAsQ0FBWCxDQUFOLEVBQWQ7QUFDQTs7OzRDQUVxQjtBQUNmLGlCQUFLSSxPQUFMLENBQWEsS0FBS0MsS0FBTCxDQUFXQyxNQUFYLENBQWtCTixLQUEvQjtBQUNIOzs7a0RBRXlCTyxTLEVBQVdDLFcsRUFBWTtBQUNuRCxnQkFBRyxLQUFLQyxPQUFMLENBQWFDLEdBQWIsSUFBa0JGLFlBQVlFLEdBQWpDLEVBQ0MsS0FBS04sT0FBTCxDQUFhLEtBQUtDLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQk4sS0FBL0IsRUFERCxLQUVLLElBQUcsS0FBS0ssS0FBTCxDQUFXQyxNQUFYLENBQWtCTixLQUFsQixJQUF5Qk8sVUFBVUQsTUFBVixDQUFpQkssS0FBN0MsRUFDSixLQUFLUCxPQUFMLENBQWFHLFVBQVVELE1BQVYsQ0FBaUJOLEtBQTlCO0FBQ0U7OztpQ0FFTztBQUFBOztBQUNKLG1CQUNJO0FBQUE7QUFBQTtBQUNJLG9DQUFDLElBQUQsSUFBTSxPQUFPLEtBQUtGLEtBQUwsQ0FBV0MsSUFBeEIsRUFBOEIsVUFBVSxLQUFLYSxXQUFMLENBQWlCQyxJQUF6RCxHQURKO0FBR0ksb0NBQUMsVUFBRCxJQUFZLFdBQVUsU0FBdEI7QUFDSSw4QkFBVTtBQUFBLCtCQUFPLE9BQUtKLE9BQUwsQ0FBYUssTUFBYixDQUFvQkMsSUFBcEIsVUFBZ0NmLEtBQWhDLENBQVA7QUFBQSxxQkFEZDtBQUVJLDZCQUFTLEtBQUtLLEtBQUwsQ0FBV0MsTUFBWCxDQUFrQk4sS0FGL0I7QUFHSSwyQkFBTyxDQUNyQixFQUFDZ0IsUUFBTyxNQUFSLEVBRHFCLEVBRUgsRUFBQ0EsUUFBTyxNQUFSLEVBQWdCQyxvQkFBaEIsRUFGRyxFQUdILEVBQUNELFFBQU8sT0FBUixFQUFpQkMscUJBQWpCLEVBSEcsRUFJSCxFQUFDRCxRQUFPLFNBQVIsRUFBbUJDLHVCQUFuQixFQUpHLEVBS0gsRUFBQ0QsUUFBTyxLQUFSLEVBQWVDLDBCQUFmLEVBTEcsQ0FIWDtBQUhKLGFBREo7QUFnQkg7Ozs7RUFuQzRCcEMsUzs7QUFBWmdCLEcsQ0FxQ2JxQixZLEdBQWE7QUFDbkJKLFlBQU9sQyxNQUFNdUMsU0FBTixDQUFnQkMsTUFESjtBQUVuQlYsU0FBSzlCLE1BQU11QyxTQUFOLENBQWdCQztBQUZGLEM7O0FBckNBdkIsRyxDQTBDYmdCLEk7Ozs7Ozs7Ozs7O2lDQUNFO0FBQUEsZ0JBQ0lRLEdBREosR0FDUyxLQUFLaEIsS0FEZCxDQUNGaUIsS0FERTs7QUFFUCxtQkFBUSxvQkFBQyxJQUFELENBQU0sSUFBTixJQUFXLGFBQWdCbkMsT0FBT2tDLElBQUlyQixLQUFKLEdBQVUsRUFBakIsQ0FBaEIsWUFBMkNxQixJQUFJRSxTQUExRCxFQUF1RSxlQUFlRixJQUFJRyxPQUExRixHQUFSO0FBQ0E7Ozs7RUFKd0IzQyxTOztrQkExQ05nQixHIiwiZmlsZSI6ImxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7UmVhY3QsIENvbXBvbmVudCwgVUk6e0NvbW1hbmRCYXIsIExpc3QsIEVtcHR5fX09cmVxdWlyZSgnLicpLFxuICAgIEFwcD1yZXF1aXJlKCcuL2RiL2FwcCcpLFxuICAgIHtGb250SWNvbn09cmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxuaW1wb3J0IEh0dHAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vaHR0cFwiXG5pbXBvcnQgRXJyb3IgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hbGVydC9lcnJvclwiXG5pbXBvcnQgV2FybmluZyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FsZXJ0L3dhcm5pbmdcIlxuaW1wb3J0IEFsbCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hc3NpZ25tZW50XCJcblxuY29uc3QgbGV2ZWxzPXtcbiAgICBcdHdhcm5pbmc6MixcbiAgICBcdGVycm9yOjMsXG4gICAgXHRodHRwOjksXG4gICAgXHRhbGw6bnVsbCxcbiAgICAgICAgXCI5XCI6XCJodHRwXCIsXG4gICAgICAgIFwiM1wiOlwiZXJyb3JcIixcbiAgICAgICAgXCIyXCI6XCJ3YXJuaW5nXCIsXG4gICAgICAgIFwiMVwiOlwiaW5mb1wiXG4gICAgfVxuY29uc3QgSWNvbnM9e0h0dHAsIEVycm9yLCBXYXJuaW5nLCBBbGx9XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17bG9nczpudWxsfVxuICAgIFxuXHRnZXREYXRhKGxldmVsKXtcblx0XHR0aGlzLnNldFN0YXRlKHtsb2dzOkFwcC5nZXRMb2cobGV2ZWxzW2xldmVsXSl9KVxuXHR9XG5cdFxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5sZXZlbClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpe1xuXHRcdGlmKHRoaXMuY29udGV4dC5hcHAhPW5leHRDb250ZXh0LmFwcClcblx0XHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5sZXZlbClcblx0XHRlbHNlIGlmKHRoaXMucHJvcHMucGFyYW1zLmxldmVsIT1uZXh0UHJvcHMucGFyYW1zLmxldmxlKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMubGV2ZWwpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPExpc3QgbW9kZWw9e3RoaXMuc3RhdGUubG9nc30gdGVtcGxhdGU9e3RoaXMuY29uc3RydWN0b3IuQUxvZ30vPlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtsZXZlbD0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBsb2cvJHtsZXZlbH1gKX1cbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17dGhpcy5wcm9wcy5wYXJhbXMubGV2ZWx9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJodHRwXCIsIGljb246SHR0cH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiZXJyb3JcIiwgaWNvbjpFcnJvcn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwid2FybmluZ1wiLCBpY29uOldhcm5pbmd9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcImFsbFwiLCBpY29uOkFsbH1cbiAgICAgICAgICAgICAgICAgICAgXX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0XHRhcHA6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXHRcblx0c3RhdGljIEFMb2c9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0cmVuZGVyKCl7XG5cdFx0XHR2YXIge21vZGVsOmxvZ309dGhpcy5wcm9wc1xuXHRcdFx0cmV0dXJuICg8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXtgJHtsZXZlbHNbbG9nLmxldmVsK1wiXCJdfSBvbiAke2xvZy5jcmVhdGVkQXR9YH0gc2Vjb25kYXJ5VGV4dD17bG9nLm1lc3NhZ2V9Lz4pXG5cdFx0fVxuXHR9XG59XG5cblxuIl19