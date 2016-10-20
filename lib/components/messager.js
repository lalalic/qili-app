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

        var _this = _possibleConstructorReturn(this, (Messager.__proto__ || Object.getPrototypeOf(Messager)).call(this, props));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VyLmpzIl0sIm5hbWVzIjpbIl9pbnN0YW5jZSIsIk1lc3NhZ2VyIiwicHJvcHMiLCJzdGF0ZSIsIm1lc3NhZ2UiLCJsZXZlbCIsIm9wZW4iLCJjbGFzc05hbWUiLCJhdXRvSGlkZUR1cmF0aW9uIiwib3RoZXJzIiwiX190aW1lciIsInNldFRpbWVvdXQiLCJzZXRTdGF0ZSIsImNsZWFyVGltZW91dCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQUo7O0lBQ3FCQyxROzs7QUFDakIsc0JBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQSx3SEFDUkEsS0FEUTs7QUFFZCxjQUFLQyxLQUFMLEdBQVc7QUFDUEMscUJBQVEsU0FERDtBQUVQQyxtQkFBTSxNQUZDO0FBR1BDLGtCQUFNLENBQUMsQ0FBQyxNQUFLSixLQUFMLENBQVdJLElBQWIsSUFBcUI7QUFIcEIsU0FBWDtBQUtOTixvQkFBVUEsa0JBQVY7QUFQb0I7QUFRakI7Ozs7aUNBRU87QUFBQSx5QkFDeUMsS0FBS0UsS0FEOUM7QUFBQSxnQkFDQ0ssU0FERCxVQUNDQSxTQUREO0FBQUEsZ0JBQ1lDLGdCQURaLFVBQ1lBLGdCQURaOztBQUFBLGdCQUNpQ0MsTUFEakM7O0FBQUEsZ0JBRUNILElBRkQsR0FFTyxLQUFLSCxLQUZaLENBRUNHLElBRkQ7O0FBR0osbUJBQU87QUFBQTtBQUFBLDJCQUFLLHlCQUF1QkMsU0FBdkIsVUFBb0NELE9BQU8sRUFBUCxHQUFZLE1BQWhELENBQUwsSUFBbUVHLE1BQW5FO0FBQTRFLHFCQUFLTixLQUFMLENBQVdDO0FBQXZGLGFBQVA7QUFDSDs7OzZDQUVtQjtBQUFBOztBQUFBLGdCQUNYRSxJQURXLEdBQ0wsS0FBS0gsS0FEQSxDQUNYRyxJQURXOztBQUVoQixnQkFBR0EsSUFBSCxFQUFRO0FBQ0oscUJBQUtJLE9BQUwsR0FBYUMsV0FBVyxhQUFHO0FBQ3ZCLDJCQUFLQyxRQUFMLENBQWMsRUFBQ04sTUFBSyxLQUFOLEVBQWQ7QUFDQSwyQkFBS0ksT0FBTCxJQUFnQkcsYUFBYSxPQUFLSCxPQUFsQixDQUFoQjtBQUNBLDJCQUFPLE9BQUtBLE9BQVo7QUFDSCxpQkFKWSxFQUlYLEtBQUtSLEtBQUwsQ0FBV00sZ0JBSkEsQ0FBYjtBQUtIO0FBQ0o7Ozs2QkFFSUosTyxFQUFxQjtBQUFBLGdCQUFiQyxLQUFhLHVFQUFQLE1BQU87O0FBQ3RCLGdCQUFHLENBQUNELE9BQUosRUFBYTtBQUNiLGlCQUFLTSxPQUFMLElBQWdCRyxhQUFhLEtBQUtILE9BQWxCLENBQWhCO0FBQ0EsbUJBQU8sS0FBS0EsT0FBWjtBQUNBLGlCQUFLRSxRQUFMLENBQWMsRUFBQ1IsZ0JBQUQsRUFBU0MsWUFBVCxFQUFnQkMsTUFBSyxJQUFyQixFQUFkO0FBQ0g7Ozs7OztrQkFqQ2dCTCxROzs7QUFvQ3JCQSxTQUFTYSxZQUFULEdBQXNCLEVBQUNOLGtCQUFpQixJQUFsQixFQUF0QiIsImZpbGUiOiJtZXNzYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5cbnZhciBfaW5zdGFuY2VcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2VyIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgbWVzc2FnZTpcImRlZmF1bHRcIixcbiAgICAgICAgICAgIGxldmVsOidJbmZvJyxcbiAgICAgICAgICAgIG9wZW46ICEhdGhpcy5wcm9wcy5vcGVuIHx8IGZhbHNlXG4gICAgICAgIH1cblx0XHRfaW5zdGFuY2U9X2luc3RhbmNlfHx0aGlzXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2xhc3NOYW1lLCBhdXRvSGlkZUR1cmF0aW9uLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IHtvcGVufT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17YHNuYWNrYmFyICR7Y2xhc3NOYW1lfSAke29wZW4gPyBcIlwiIDogXCJoaWRlXCJ9YH0gey4uLm90aGVyc30+e3RoaXMuc3RhdGUubWVzc2FnZX08L2Rpdj5cbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcbiAgICAgICAgdmFyIHtvcGVufT10aGlzLnN0YXRlXG4gICAgICAgIGlmKG9wZW4pe1xuICAgICAgICAgICAgdGhpcy5fX3RpbWVyPXNldFRpbWVvdXQoYT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW46ZmFsc2V9KVxuICAgICAgICAgICAgICAgIHRoaXMuX190aW1lciAmJiBjbGVhclRpbWVvdXQodGhpcy5fX3RpbWVyKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9fdGltZXJcbiAgICAgICAgICAgIH0sdGhpcy5wcm9wcy5hdXRvSGlkZUR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdyhtZXNzYWdlLGxldmVsPVwiSW5mb1wiKXtcbiAgICAgICAgaWYoIW1lc3NhZ2UpIHJldHVybjtcbiAgICAgICAgdGhpcy5fX3RpbWVyICYmIGNsZWFyVGltZW91dCh0aGlzLl9fdGltZXIpXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9fdGltZXJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZSxsZXZlbCwgb3Blbjp0cnVlfSlcbiAgICB9XG59XG5cbk1lc3NhZ2VyLmRlZmF1bHRQcm9wcz17YXV0b0hpZGVEdXJhdGlvbjoyMDAwfVxuIl19