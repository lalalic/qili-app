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

        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcuanMiXSwibmFtZXMiOlsiTG9hZGluZyIsInByb3BzIiwiY2xhc3NOYW1lIiwib3RoZXJzIiwiY2xhc3NlcyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7aUNBQ1Q7QUFBQSx5QkFDdUIsS0FBS0MsS0FENUI7QUFBQSxnQkFDQ0MsU0FERCxVQUNDQSxTQUREOztBQUFBLGdCQUNlQyxNQURmOztBQUdKLG1CQUFPLGlEQUFNLDZCQUEyQkQsU0FBakMsSUFBa0RDLE1BQWxELEVBQVA7QUFDSDs7OytCQUVLO0FBQ0YsZ0JBQU1DLFVBQVEsMkJBQVksSUFBWixFQUFrQkMsU0FBaEM7QUFDQUQsb0JBQVFFLE1BQVIsQ0FBZSxNQUFmO0FBQ0FGLG9CQUFRRyxHQUFSLENBQVksU0FBWjtBQUNIOzs7Z0NBRU07QUFDSCxnQkFBTUgsVUFBUSwyQkFBWSxJQUFaLEVBQWtCQyxTQUFoQztBQUNBRCxvQkFBUUUsTUFBUixDQUFlLFNBQWY7QUFDQUYsb0JBQVFHLEdBQVIsQ0FBWSxNQUFaO0FBQ0g7Ozs7OztrQkFqQmdCUCxPIiwiZmlsZSI6ImxvYWRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSAncmVhY3QtZG9tJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQge2NsYXNzTmFtZSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cbiAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17YHNwaW5uZXIgaGlkZSAke2NsYXNzTmFtZX1gfSB7Li4ub3RoZXJzfS8+XG4gICAgfVxuXG4gICAgc2hvdygpe1xuICAgICAgICBjb25zdCBjbGFzc2VzPWZpbmRET01Ob2RlKHRoaXMpLmNsYXNzTGlzdFxuICAgICAgICBjbGFzc2VzLnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgY2xhc3Nlcy5hZGQoXCJsb2FkaW5nXCIpXG4gICAgfVxuXG4gICAgY2xvc2UoKXtcbiAgICAgICAgY29uc3QgY2xhc3Nlcz1maW5kRE9NTm9kZSh0aGlzKS5jbGFzc0xpc3RcbiAgICAgICAgY2xhc3Nlcy5yZW1vdmUoXCJsb2FkaW5nXCIpXG4gICAgICAgIGNsYXNzZXMuYWRkKFwiaGlkZVwiKVxuICAgIH1cbn1cbiJdfQ==