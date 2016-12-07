'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function (_Component) {
    (0, _inherits3.default)(Loading, _Component);

    function Loading() {
        (0, _classCallCheck3.default)(this, Loading);
        return (0, _possibleConstructorReturn3.default)(this, (Loading.__proto__ || (0, _getPrototypeOf2.default)(Loading)).apply(this, arguments));
    }

    (0, _createClass3.default)(Loading, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                others = (0, _objectWithoutProperties3.default)(_props, ['className']);


            return _react2.default.createElement('span', (0, _extends3.default)({ className: 'spinner hide ' + className }, others));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcuanMiXSwibmFtZXMiOlsiTG9hZGluZyIsInByb3BzIiwiY2xhc3NOYW1lIiwib3RoZXJzIiwiY2xhc3NlcyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7aUNBQ1Q7QUFBQSx5QkFDdUIsS0FBS0MsS0FENUI7QUFBQSxnQkFDQ0MsU0FERCxVQUNDQSxTQUREO0FBQUEsZ0JBQ2VDLE1BRGY7OztBQUdKLG1CQUFPLCtEQUFNLDZCQUEyQkQsU0FBakMsSUFBa0RDLE1BQWxELEVBQVA7QUFDSDs7OytCQUVLO0FBQ0YsZ0JBQU1DLFVBQVEsMkJBQVksSUFBWixFQUFrQkMsU0FBaEM7QUFDQUQsb0JBQVFFLE1BQVIsQ0FBZSxNQUFmO0FBQ0FGLG9CQUFRRyxHQUFSLENBQVksU0FBWjtBQUNIOzs7Z0NBRU07QUFDSCxnQkFBTUgsVUFBUSwyQkFBWSxJQUFaLEVBQWtCQyxTQUFoQztBQUNBRCxvQkFBUUUsTUFBUixDQUFlLFNBQWY7QUFDQUYsb0JBQVFHLEdBQVIsQ0FBWSxNQUFaO0FBQ0g7Ozs7O2tCQWpCZ0JQLE8iLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2xhc3NOYW1lLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtgc3Bpbm5lciBoaWRlICR7Y2xhc3NOYW1lfWB9IHsuLi5vdGhlcnN9Lz5cbiAgICB9XG5cbiAgICBzaG93KCl7XG4gICAgICAgIGNvbnN0IGNsYXNzZXM9ZmluZERPTU5vZGUodGhpcykuY2xhc3NMaXN0XG4gICAgICAgIGNsYXNzZXMucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICBjbGFzc2VzLmFkZChcImxvYWRpbmdcIilcbiAgICB9XG5cbiAgICBjbG9zZSgpe1xuICAgICAgICBjb25zdCBjbGFzc2VzPWZpbmRET01Ob2RlKHRoaXMpLmNsYXNzTGlzdFxuICAgICAgICBjbGFzc2VzLnJlbW92ZShcImxvYWRpbmdcIilcbiAgICAgICAgY2xhc3Nlcy5hZGQoXCJoaWRlXCIpXG4gICAgfVxufVxuIl19