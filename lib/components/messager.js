'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _instance;

var Messager = function (_Component) {
    _inherits(Messager, _Component);

    function Messager(props) {
        _classCallCheck(this, Messager);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Messager).call(this, props));

        _this.state = {
            message: "default",
            level: 'Info',
            open: !!_this.props.open || false
        };
        _instance = _instance || _this;
        return _this;
    }

    _createClass(Messager, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;

            var others = _objectWithoutProperties(_props, ['className']);

            var open = this.state.open;

            return _react2.default.createElement(
                'div',
                _extends({ className: 'snackbar ' + className + ' ' + (open ? "" : "hide") }, others),
                this.state.message
            );
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            var open = this.state.open;

            if (open) {
                this.__timer = setTimeout(function (a) {
                    _this2.setState({ open: false });
                    _this2.__timer && clearTimeout(_this2.__timer);
                    delete _this2.__timer;
                }, this.props.autoHideDuration);
            }
        }
    }, {
        key: 'show',
        value: function show(message) {
            var level = arguments.length <= 1 || arguments[1] === undefined ? "Info" : arguments[1];

            if (!message) return;
            this.__timer && clearTimeout(this.__timer);
            delete this.__timer;
            this.setState({ message: message, level: level, open: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQUo7O0lBQ3FCOzs7QUFDakIsYUFEaUIsUUFDakIsQ0FBWSxLQUFaLEVBQWtCOzhCQURELFVBQ0M7OzJFQURELHFCQUVQLFFBRFE7O0FBRWQsY0FBSyxLQUFMLEdBQVc7QUFDUCxxQkFBUSxTQUFSO0FBQ0EsbUJBQU0sTUFBTjtBQUNBLGtCQUFNLENBQUMsQ0FBQyxNQUFLLEtBQUwsQ0FBVyxJQUFYLElBQW1CLEtBQXJCO1NBSFYsQ0FGYztBQU9wQixvQkFBVSxrQkFBVixDQVBvQjs7S0FBbEI7O2lCQURpQjs7aUNBV1Q7eUJBQ3VCLEtBQUssS0FBTCxDQUR2QjtnQkFDQyw2QkFERDs7Z0JBQ2UseURBRGY7O2dCQUVDLE9BQU0sS0FBSyxLQUFMLENBQU4sS0FGRDs7QUFHSixtQkFBTzs7MkJBQUsseUJBQXVCLG1CQUFhLE9BQU8sRUFBUCxHQUFZLE1BQVosQ0FBcEMsSUFBOEQsT0FBbkU7Z0JBQTRFLEtBQUssS0FBTCxDQUFXLE9BQVg7YUFBbkYsQ0FISTs7Ozs2Q0FNWTs7O2dCQUNYLE9BQU0sS0FBSyxLQUFMLENBQU4sS0FEVzs7QUFFaEIsZ0JBQUcsSUFBSCxFQUFRO0FBQ0oscUJBQUssT0FBTCxHQUFhLFdBQVcsYUFBRztBQUN2QiwyQkFBSyxRQUFMLENBQWMsRUFBQyxNQUFLLEtBQUwsRUFBZixFQUR1QjtBQUV2QiwyQkFBSyxPQUFMLElBQWdCLGFBQWEsT0FBSyxPQUFMLENBQTdCLENBRnVCO0FBR3ZCLDJCQUFPLE9BQUssT0FBTCxDQUhnQjtpQkFBSCxFQUl0QixLQUFLLEtBQUwsQ0FBVyxnQkFBWCxDQUpGLENBREk7YUFBUjs7Ozs2QkFTQyxTQUFxQjtnQkFBYiw4REFBTSxzQkFBTzs7QUFDdEIsZ0JBQUcsQ0FBQyxPQUFELEVBQVUsT0FBYjtBQUNBLGlCQUFLLE9BQUwsSUFBZ0IsYUFBYSxLQUFLLE9BQUwsQ0FBN0IsQ0FGc0I7QUFHdEIsbUJBQU8sS0FBSyxPQUFMLENBSGU7QUFJdEIsaUJBQUssUUFBTCxDQUFjLEVBQUMsZ0JBQUQsRUFBUyxZQUFULEVBQWdCLE1BQUssSUFBTCxFQUE5QixFQUpzQjs7Ozs2QkFPakIsU0FBUTs7O0FBQ25CLHdCQUFZLHlCQUFVLElBQVYsbUJBQWtCLFNBQWxCLENBQVosR0FBMkMsUUFBUSxJQUFSLENBQWEsT0FBYixDQUEzQyxDQURtQjs7OztXQW5DQTs7Ozs7O0FBd0NyQixTQUFTLFlBQVQsR0FBc0IsRUFBQyxrQkFBaUIsSUFBakIsRUFBdkIiLCJmaWxlIjoibWVzc2FnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuXG52YXIgX2luc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlciBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIG1lc3NhZ2U6XCJkZWZhdWx0XCIsXG4gICAgICAgICAgICBsZXZlbDonSW5mbycsXG4gICAgICAgICAgICBvcGVuOiAhIXRoaXMucHJvcHMub3BlbiB8fCBmYWxzZVxuICAgICAgICB9XG5cdFx0X2luc3RhbmNlPV9pbnN0YW5jZXx8dGhpc1xuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQge2NsYXNzTmFtZSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIGxldCB7b3Blbn09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2BzbmFja2JhciAke2NsYXNzTmFtZX0gJHtvcGVuID8gXCJcIiA6IFwiaGlkZVwifWB9IHsuLi5vdGhlcnN9Pnt0aGlzLnN0YXRlLm1lc3NhZ2V9PC9kaXY+XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG4gICAgICAgIHZhciB7b3Blbn09dGhpcy5zdGF0ZVxuICAgICAgICBpZihvcGVuKXtcbiAgICAgICAgICAgIHRoaXMuX190aW1lcj1zZXRUaW1lb3V0KGE9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOmZhbHNlfSlcbiAgICAgICAgICAgICAgICB0aGlzLl9fdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX190aW1lcilcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fX3RpbWVyXG4gICAgICAgICAgICB9LHRoaXMucHJvcHMuYXV0b0hpZGVEdXJhdGlvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3cobWVzc2FnZSxsZXZlbD1cIkluZm9cIil7XG4gICAgICAgIGlmKCFtZXNzYWdlKSByZXR1cm47XG4gICAgICAgIHRoaXMuX190aW1lciAmJiBjbGVhclRpbWVvdXQodGhpcy5fX3RpbWVyKVxuICAgICAgICBkZWxldGUgdGhpcy5fX3RpbWVyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2UsbGV2ZWwsIG9wZW46dHJ1ZX0pXG4gICAgfVxuXG5cdHN0YXRpYyBzaG93KG1lc3NhZ2Upe1xuXHRcdF9pbnN0YW5jZSA/IF9pbnN0YW5jZS5zaG93KC4uLmFyZ3VtZW50cykgOiBjb25zb2xlLndhcm4obWVzc2FnZSlcblx0fVxufVxuXG5NZXNzYWdlci5kZWZhdWx0UHJvcHM9e2F1dG9IaWRlRHVyYXRpb246MjAwMH1cbiJdfQ==