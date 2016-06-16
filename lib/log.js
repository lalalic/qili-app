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
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Log);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Log)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { logs: null }, _temp), _possibleConstructorReturn(_this, _ret);
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
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.app != nextProps.app) this.getData(this.props.params.level);else if (this.props.params.level != nextProps.params.levle) this.getData(nextProps.params.level);
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
                    items: [{ action: "http", icon: _http2.default }, { action: "error", icon: _error2.default }, { action: "warning", icon: _warning2.default }, { action: "all", icon: _assignment2.default }] })
            );
        }
    }]);

    return Log;
}(Component);

Log.contextTypes = { router: React.PropTypes.object };

Log.ALog = function (_Component2) {
    _inherits(_class, _Component2);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFJQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O2VBUHFELFFBQVEsR0FBUjs7SUFBaEQ7SUFBTzsyQkFBVztJQUFJO0lBQVk7QUFBbkMsSUFBeUMseUJBQXpDO0FBQ0EsVUFBSSxRQUFRLFVBQVIsQ0FBSjs7Z0JBQ1csUUFBUSxhQUFSOztJQUFWOzs7QUFPTCxJQUFNLFNBQU87QUFDUixhQUFRLENBQVI7QUFDQSxXQUFNLENBQU47QUFDQSxVQUFLLENBQUw7QUFDQSxTQUFJLElBQUo7QUFDRyxTQUFJLE1BQUo7QUFDQSxTQUFJLE9BQUo7QUFDQSxTQUFJLFNBQUo7QUFDQSxTQUFJLE1BQUo7Q0FSRjtBQVVOLElBQU0sUUFBTSxFQUFDLG9CQUFELEVBQU8sc0JBQVAsRUFBYywwQkFBZCxFQUF1Qix5QkFBdkIsRUFBTjs7SUFFZTs7Ozs7Ozs7Ozs7Ozs7cU1BQ2pCLFFBQU0sRUFBQyxNQUFLLElBQUw7OztpQkFEVTs7Z0NBR1osT0FBTTtBQUNiLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssSUFBSSxNQUFKLENBQVcsT0FBTyxLQUFQLENBQVgsQ0FBTCxFQUFmLEVBRGE7Ozs7NENBSVE7QUFDZixpQkFBSyxPQUFMLENBQWEsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixDQUFiLENBRGU7Ozs7a0RBSU8sV0FBVTtBQUN0QyxnQkFBRyxLQUFLLEtBQUwsQ0FBVyxHQUFYLElBQWdCLFVBQVUsR0FBVixFQUNsQixLQUFLLE9BQUwsQ0FBYSxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQWxCLENBQWIsQ0FERCxLQUVLLElBQUcsS0FBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixLQUFsQixJQUF5QixVQUFVLE1BQVYsQ0FBaUIsS0FBakIsRUFDaEMsS0FBSyxPQUFMLENBQWEsVUFBVSxNQUFWLENBQWlCLEtBQWpCLENBQWIsQ0FESTs7OztpQ0FJSzs7O0FBQ0osbUJBQ0k7OztnQkFDSSxvQkFBQyxJQUFELElBQU0sT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCLFVBQVUsS0FBSyxXQUFMLENBQWlCLElBQWpCLEVBQXhDLENBREo7Z0JBR0ksb0JBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVjtBQUNSLDhCQUFVOytCQUFPLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsVUFBZ0MsS0FBaEM7cUJBQVA7QUFDViw2QkFBUyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEtBQWxCO0FBQ1QsMkJBQU8sQ0FDSCxFQUFDLFFBQU8sTUFBUCxFQUFlLG9CQUFoQixFQURHLEVBRUgsRUFBQyxRQUFPLE9BQVAsRUFBZ0IscUJBQWpCLEVBRkcsRUFHSCxFQUFDLFFBQU8sU0FBUCxFQUFrQix1QkFBbkIsRUFIRyxFQUlILEVBQUMsUUFBTyxLQUFQLEVBQWMsMEJBQWYsRUFKRyxDQUFQLEVBSEosQ0FISjthQURKLENBREk7Ozs7V0FsQlM7RUFBWTs7QUFBWixJQW9DYixlQUFhLEVBQUMsUUFBTyxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7O0FBcENSLElBc0NiOzs7Ozs7Ozs7OztpQ0FDRTtnQkFDSSxNQUFLLEtBQUssS0FBTCxDQUFYLE1BREU7O0FBRVAsbUJBQVEsb0JBQUMsS0FBSyxJQUFOLElBQVcsYUFBZ0IsT0FBTyxJQUFJLEtBQUosR0FBVSxFQUFWLGFBQW9CLElBQUksU0FBSixFQUFpQixlQUFlLElBQUksT0FBSixFQUF0RixDQUFSLENBRk87Ozs7O0VBRGlCOztrQkF0Q04iLCJmaWxlIjoibG9nLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtSZWFjdCwgQ29tcG9uZW50LCBVSTp7Q29tbWFuZEJhciwgTGlzdCwgRW1wdHl9fT1yZXF1aXJlKCcuJyksXG4gICAgQXBwPXJlcXVpcmUoJy4vZGIvYXBwJyksXG4gICAge0ZvbnRJY29ufT1yZXF1aXJlKCdtYXRlcmlhbC11aScpO1xuXG5pbXBvcnQgSHR0cCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9odHRwXCJcbmltcG9ydCBFcnJvciBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FsZXJ0L2Vycm9yXCJcbmltcG9ydCBXYXJuaW5nIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWxlcnQvd2FybmluZ1wiXG5pbXBvcnQgQWxsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Fzc2lnbm1lbnRcIlxuXG5jb25zdCBsZXZlbHM9e1xuICAgIFx0d2FybmluZzoyLFxuICAgIFx0ZXJyb3I6MyxcbiAgICBcdGh0dHA6OSxcbiAgICBcdGFsbDpudWxsLFxuICAgICAgICBcIjlcIjpcImh0dHBcIixcbiAgICAgICAgXCIzXCI6XCJlcnJvclwiLFxuICAgICAgICBcIjJcIjpcIndhcm5pbmdcIixcbiAgICAgICAgXCIxXCI6XCJpbmZvXCJcbiAgICB9XG5jb25zdCBJY29ucz17SHR0cCwgRXJyb3IsIFdhcm5pbmcsIEFsbH1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtsb2dzOm51bGx9XG4gICAgXG5cdGdldERhdGEobGV2ZWwpe1xuXHRcdHRoaXMuc2V0U3RhdGUoe2xvZ3M6QXBwLmdldExvZyhsZXZlbHNbbGV2ZWxdKX0pXG5cdH1cblx0XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgdGhpcy5nZXREYXRhKHRoaXMucHJvcHMucGFyYW1zLmxldmVsKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcblx0XHRpZih0aGlzLnByb3BzLmFwcCE9bmV4dFByb3BzLmFwcClcblx0XHRcdHRoaXMuZ2V0RGF0YSh0aGlzLnByb3BzLnBhcmFtcy5sZXZlbClcblx0XHRlbHNlIGlmKHRoaXMucHJvcHMucGFyYW1zLmxldmVsIT1uZXh0UHJvcHMucGFyYW1zLmxldmxlKVxuXHRcdFx0dGhpcy5nZXREYXRhKG5leHRQcm9wcy5wYXJhbXMubGV2ZWwpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPExpc3QgbW9kZWw9e3RoaXMuc3RhdGUubG9nc30gdGVtcGxhdGU9e3RoaXMuY29uc3RydWN0b3IuQUxvZ30vPlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtsZXZlbD0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBsb2cvJHtsZXZlbH1gKX1cbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17dGhpcy5wcm9wcy5wYXJhbXMubGV2ZWx9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiaHR0cFwiLCBpY29uOkh0dHB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcImVycm9yXCIsIGljb246RXJyb3J9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIndhcm5pbmdcIiwgaWNvbjpXYXJuaW5nfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJhbGxcIiwgaWNvbjpBbGx9XG4gICAgICAgICAgICAgICAgICAgIF19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdFxuXHRzdGF0aWMgQUxvZz1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcblx0XHRyZW5kZXIoKXtcblx0XHRcdHZhciB7bW9kZWw6bG9nfT10aGlzLnByb3BzXG5cdFx0XHRyZXR1cm4gKDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e2Ake2xldmVsc1tsb2cubGV2ZWwrXCJcIl19IG9uICR7bG9nLmNyZWF0ZWRBdH1gfSBzZWNvbmRhcnlUZXh0PXtsb2cubWVzc2FnZX0vPilcblx0XHR9XG5cdH1cbn1cblxuXG4iXX0=