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

var Messager = function (_Component) {
    _inherits(Messager, _Component);

    function Messager() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Messager);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Messager.__proto__ || Object.getPrototypeOf(Messager)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            message: "default",
            level: 'Info',
            open: !!_this.props.open || false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Messager, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var autoHideDuration = _props.autoHideDuration;

            var others = _objectWithoutProperties(_props, ['className', 'autoHideDuration']);

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
            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Info";

            if (!message) return;
            this.__timer && clearTimeout(this.__timer);
            delete this.__timer;
            this.setState({ message: message, level: level, open: true });
        }
    }]);

    return Messager;
}(_react.Component);

exports.default = Messager;


Messager.defaultProps = { autoHideDuration: 2000 };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VyLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2VyIiwic3RhdGUiLCJtZXNzYWdlIiwibGV2ZWwiLCJvcGVuIiwicHJvcHMiLCJjbGFzc05hbWUiLCJhdXRvSGlkZUR1cmF0aW9uIiwib3RoZXJzIiwiX190aW1lciIsInNldFRpbWVvdXQiLCJzZXRTdGF0ZSIsImNsZWFyVGltZW91dCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztJQUtxQkEsUTs7Ozs7Ozs7Ozs7Ozs7OExBQ2pCQyxLLEdBQU07QUFDRkMscUJBQVEsU0FETjtBQUVGQyxtQkFBTSxNQUZKO0FBR0ZDLGtCQUFNLENBQUMsQ0FBQyxNQUFLQyxLQUFMLENBQVdELElBQWIsSUFBcUI7QUFIekIsUzs7Ozs7aUNBTUU7QUFBQSx5QkFDeUMsS0FBS0MsS0FEOUM7QUFBQSxnQkFDQ0MsU0FERCxVQUNDQSxTQUREO0FBQUEsZ0JBQ1lDLGdCQURaLFVBQ1lBLGdCQURaOztBQUFBLGdCQUNpQ0MsTUFEakM7O0FBQUEsZ0JBRUNKLElBRkQsR0FFTyxLQUFLSCxLQUZaLENBRUNHLElBRkQ7O0FBR0osbUJBQU87QUFBQTtBQUFBLDJCQUFLLHlCQUF1QkUsU0FBdkIsVUFBb0NGLE9BQU8sRUFBUCxHQUFZLE1BQWhELENBQUwsSUFBbUVJLE1BQW5FO0FBQTRFLHFCQUFLUCxLQUFMLENBQVdDO0FBQXZGLGFBQVA7QUFDSDs7OzZDQUVtQjtBQUFBOztBQUFBLGdCQUNYRSxJQURXLEdBQ0wsS0FBS0gsS0FEQSxDQUNYRyxJQURXOztBQUVoQixnQkFBR0EsSUFBSCxFQUFRO0FBQ0oscUJBQUtLLE9BQUwsR0FBYUMsV0FBVyxhQUFHO0FBQ3ZCLDJCQUFLQyxRQUFMLENBQWMsRUFBQ1AsTUFBSyxLQUFOLEVBQWQ7QUFDQSwyQkFBS0ssT0FBTCxJQUFnQkcsYUFBYSxPQUFLSCxPQUFsQixDQUFoQjtBQUNBLDJCQUFPLE9BQUtBLE9BQVo7QUFDSCxpQkFKWSxFQUlYLEtBQUtKLEtBQUwsQ0FBV0UsZ0JBSkEsQ0FBYjtBQUtIO0FBQ0o7Ozs2QkFFSUwsTyxFQUFxQjtBQUFBLGdCQUFiQyxLQUFhLHVFQUFQLE1BQU87O0FBQ3RCLGdCQUFHLENBQUNELE9BQUosRUFBYTtBQUNiLGlCQUFLTyxPQUFMLElBQWdCRyxhQUFhLEtBQUtILE9BQWxCLENBQWhCO0FBQ0EsbUJBQU8sS0FBS0EsT0FBWjtBQUNBLGlCQUFLRSxRQUFMLENBQWMsRUFBQ1QsZ0JBQUQsRUFBU0MsWUFBVCxFQUFnQkMsTUFBSyxJQUFyQixFQUFkO0FBQ0g7Ozs7OztrQkE3QmdCSixROzs7QUFnQ3JCQSxTQUFTYSxZQUFULEdBQXNCLEVBQUNOLGtCQUFpQixJQUFsQixFQUF0QiIsImZpbGUiOiJtZXNzYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VyIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtcbiAgICAgICAgbWVzc2FnZTpcImRlZmF1bHRcIixcbiAgICAgICAgbGV2ZWw6J0luZm8nLFxuICAgICAgICBvcGVuOiAhIXRoaXMucHJvcHMub3BlbiB8fCBmYWxzZVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQge2NsYXNzTmFtZSwgYXV0b0hpZGVEdXJhdGlvbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIGxldCB7b3Blbn09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2BzbmFja2JhciAke2NsYXNzTmFtZX0gJHtvcGVuID8gXCJcIiA6IFwiaGlkZVwifWB9IHsuLi5vdGhlcnN9Pnt0aGlzLnN0YXRlLm1lc3NhZ2V9PC9kaXY+XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG4gICAgICAgIHZhciB7b3Blbn09dGhpcy5zdGF0ZVxuICAgICAgICBpZihvcGVuKXtcbiAgICAgICAgICAgIHRoaXMuX190aW1lcj1zZXRUaW1lb3V0KGE9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOmZhbHNlfSlcbiAgICAgICAgICAgICAgICB0aGlzLl9fdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX190aW1lcilcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fX3RpbWVyXG4gICAgICAgICAgICB9LHRoaXMucHJvcHMuYXV0b0hpZGVEdXJhdGlvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3cobWVzc2FnZSxsZXZlbD1cIkluZm9cIil7XG4gICAgICAgIGlmKCFtZXNzYWdlKSByZXR1cm47XG4gICAgICAgIHRoaXMuX190aW1lciAmJiBjbGVhclRpbWVvdXQodGhpcy5fX3RpbWVyKVxuICAgICAgICBkZWxldGUgdGhpcy5fX3RpbWVyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2UsbGV2ZWwsIG9wZW46dHJ1ZX0pXG4gICAgfVxufVxuXG5NZXNzYWdlci5kZWZhdWx0UHJvcHM9e2F1dG9IaWRlRHVyYXRpb246MjAwMH1cbiJdfQ==