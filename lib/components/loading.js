'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = function (_Component) {
    _inherits(Loading, _Component);

    function Loading() {
        _classCallCheck(this, Loading);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Loading).apply(this, arguments));
    }

    _createClass(Loading, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;

            var others = _objectWithoutProperties(_props, ['className']);

            return _react2.default.createElement('span', _extends({ className: 'spinner hide ' + className }, others));
        }
    }, {
        key: 'show',
        value: function show() {
            var classes = (0, _reactDom.findDOMNode)(this).classList;
            classes.remove("hide");
            classes.add("loading");
        }
    }, {
        key: 'close',
        value: function close() {
            var classes = (0, _reactDom.findDOMNode)(this).classList;
            classes.remove("loading");
            classes.add("hide");
        }
    }]);

    return Loading;
}(_react.Component);

exports.default = Loading;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7aUNBQ1Q7eUJBQ3VCLEtBQUssS0FBTCxDQUR2QjtnQkFDQyw2QkFERDs7Z0JBQ2UseURBRGY7O0FBR0osbUJBQU8saURBQU0sNkJBQTJCLFNBQTNCLElBQTRDLE9BQWxELENBQVAsQ0FISTs7OzsrQkFNRjtBQUNGLGdCQUFNLFVBQVEsMkJBQVksSUFBWixFQUFrQixTQUFsQixDQURaO0FBRUYsb0JBQVEsTUFBUixDQUFlLE1BQWYsRUFGRTtBQUdGLG9CQUFRLEdBQVIsQ0FBWSxTQUFaLEVBSEU7Ozs7Z0NBTUM7QUFDSCxnQkFBTSxVQUFRLDJCQUFZLElBQVosRUFBa0IsU0FBbEIsQ0FEWDtBQUVILG9CQUFRLE1BQVIsQ0FBZSxTQUFmLEVBRkc7QUFHSCxvQkFBUSxHQUFSLENBQVksTUFBWixFQUhHOzs7O1dBYlUiLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2xhc3NOYW1lLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtgc3Bpbm5lciBoaWRlICR7Y2xhc3NOYW1lfWB9IHsuLi5vdGhlcnN9Lz5cbiAgICB9XG5cbiAgICBzaG93KCl7XG4gICAgICAgIGNvbnN0IGNsYXNzZXM9ZmluZERPTU5vZGUodGhpcykuY2xhc3NMaXN0XG4gICAgICAgIGNsYXNzZXMucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICBjbGFzc2VzLmFkZChcImxvYWRpbmdcIilcbiAgICB9XG5cbiAgICBjbG9zZSgpe1xuICAgICAgICBjb25zdCBjbGFzc2VzPWZpbmRET01Ob2RlKHRoaXMpLmNsYXNzTGlzdFxuICAgICAgICBjbGFzc2VzLnJlbW92ZShcImxvYWRpbmdcIilcbiAgICAgICAgY2xhc3Nlcy5hZGQoXCJoaWRlXCIpXG4gICAgfVxufVxuIl19