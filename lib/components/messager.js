'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _error = require('material-ui/lib/svg-icons/alert/error');

var _error2 = _interopRequireDefault(_error);

var _warning = require('material-ui/lib/svg-icons/alert/warning');

var _warning2 = _interopRequireDefault(_warning);

var _info = require('material-ui/lib/svg-icons/action/info');

var _info2 = _interopRequireDefault(_info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Icons = { Error: _error2.default, Warning: _warning2.default, Info: _info2.default };

var _instance;

var Messager = function (_Component) {
    _inherits(Messager, _Component);

    function Messager(props) {
        _classCallCheck(this, Messager);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Messager).call(this, props));

        _this.state = {
            message: "default",
            level: 'Info'
        };
        _instance = _instance || _this;
        return _this;
    }

    _createClass(Messager, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_materialUi.Snackbar, _extends({ ref: 'bar' }, this.props, { message: this.state.message }));
        }
    }, {
        key: 'show',
        value: function show(message) {
            var level = arguments.length <= 1 || arguments[1] === undefined ? "Info" : arguments[1];

            if (!message) return;
            this.setState({ message: message, level: level });
            this.refs.bar.show();
        }
    }], [{
        key: 'show',
        value: function show(message) {
            var _instance2;

            _instance ? (_instance2 = _instance).show.apply(_instance2, arguments) : console.warn(message);
        }
    }]);

    return Messager;
}(_react.Component);

exports.default = Messager;


Messager.defaultProps = { autoHideDuration: 2000 };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFNLEVBQUMsc0JBQUQsRUFBUSwwQkFBUixFQUFpQixvQkFBakIsRUFBTjs7QUFFSixJQUFJLFNBQUo7O0lBQ3FCOzs7QUFDakIsYUFEaUIsUUFDakIsQ0FBWSxLQUFaLEVBQWtCOzhCQURELFVBQ0M7OzJFQURELHFCQUVQLFFBRFE7O0FBRWQsY0FBSyxLQUFMLEdBQVc7QUFDUCxxQkFBUSxTQUFSO0FBQ0EsbUJBQU0sTUFBTjtTQUZKLENBRmM7QUFNcEIsb0JBQVUsa0JBQVYsQ0FOb0I7O0tBQWxCOztpQkFEaUI7O2lDQVVUO0FBQ0osbUJBQU8sK0RBQVUsS0FBSSxLQUFKLElBQWMsS0FBSyxLQUFMLElBQVksU0FBUyxLQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQTdDLENBQVAsQ0FESTs7Ozs2QkFJSCxTQUFxQjtnQkFBYiw4REFBTSxzQkFBTzs7QUFDdEIsZ0JBQUcsQ0FBQyxPQUFELEVBQVUsT0FBYjtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLGdCQUFELEVBQVMsWUFBVCxFQUFkLEVBRnNCO0FBR3RCLGlCQUFLLElBQUwsQ0FBVSxHQUFWLENBQWMsSUFBZCxHQUhzQjs7Ozs2QkFNakIsU0FBUTs7O0FBQ25CLHdCQUFZLHlCQUFVLElBQVYsbUJBQWtCLFNBQWxCLENBQVosR0FBMkMsUUFBUSxJQUFSLENBQWEsT0FBYixDQUEzQyxDQURtQjs7OztXQXBCQTs7Ozs7O0FBeUJyQixTQUFTLFlBQVQsR0FBc0IsRUFBQyxrQkFBaUIsSUFBakIsRUFBdkIiLCJmaWxlIjoibWVzc2FnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtTbmFja2Jhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgRXJyb3IgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWxlcnQvZXJyb3JcIlxuaW1wb3J0IFdhcm5pbmcgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWxlcnQvd2FybmluZ1wiXG5pbXBvcnQgSW5mbyBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vaW5mb1wiXG5cbnZhciBJY29ucz17RXJyb3IsIFdhcm5pbmcsIEluZm99O1xuXG52YXIgX2luc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlciBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIG1lc3NhZ2U6XCJkZWZhdWx0XCIsXG4gICAgICAgICAgICBsZXZlbDonSW5mbydcbiAgICAgICAgfVxuXHRcdF9pbnN0YW5jZT1faW5zdGFuY2V8fHRoaXNcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxTbmFja2JhciByZWY9XCJiYXJcIiB7Li4udGhpcy5wcm9wc30gbWVzc2FnZT17dGhpcy5zdGF0ZS5tZXNzYWdlfS8+XG4gICAgfVxuXG4gICAgc2hvdyhtZXNzYWdlLGxldmVsPVwiSW5mb1wiKXtcbiAgICAgICAgaWYoIW1lc3NhZ2UpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZSxsZXZlbH0pXG4gICAgICAgIHRoaXMucmVmcy5iYXIuc2hvdygpXG4gICAgfVxuXG5cdHN0YXRpYyBzaG93KG1lc3NhZ2Upe1xuXHRcdF9pbnN0YW5jZSA/IF9pbnN0YW5jZS5zaG93KC4uLmFyZ3VtZW50cykgOiBjb25zb2xlLndhcm4obWVzc2FnZSlcblx0fVxufVxuXG5NZXNzYWdlci5kZWZhdWx0UHJvcHM9e2F1dG9IaWRlRHVyYXRpb246MjAwMH1cbiJdfQ==