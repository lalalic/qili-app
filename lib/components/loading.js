'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var _require = require('material-ui');

var RefreshIndicator = _require.RefreshIndicator;

var Loading = function (_Component) {
    _inherits(Loading, _Component);

    function Loading(p) {
        _classCallCheck(this, Loading);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Loading).call(this, p));

        _this.state = {};
        return _this;
    }

    _createClass(Loading, [{
        key: 'render',
        value: function render() {
            return React.createElement(RefreshIndicator, _extends({}, this.props, this.state));
        }
    }, {
        key: 'show',
        value: function show() {
            this.setState({ status: "loading" });
        }
    }, {
        key: 'close',
        value: function close() {
            this.setState({ status: "hide" });
        }
    }]);

    return Loading;
}(Component);

exports.default = Loading;


Loading.defaultProps = { size: 40, left: 10, top: 5, style: { zIndex: 99 }, loadingColor: "#FF9800" };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFJLFlBQU0sUUFBUSxPQUFSLENBQU47QUFDQSxJQUFDLFlBQVcsTUFBWCxTQUFEOztlQUNtQixRQUFRLGFBQVI7O0lBQWxCOztJQUVnQjs7O0FBQ2pCLGFBRGlCLE9BQ2pCLENBQVksQ0FBWixFQUFjOzhCQURHLFNBQ0g7OzJFQURHLG9CQUVQLElBREk7O0FBRVYsY0FBSyxLQUFMLEdBQVcsRUFBWCxDQUZVOztLQUFkOztpQkFEaUI7O2lDQUtUO0FBQ0osbUJBQU8sb0JBQUMsZ0JBQUQsZUFBc0IsS0FBSyxLQUFMLEVBQWdCLEtBQUssS0FBTCxDQUF0QyxDQUFQLENBREk7Ozs7K0JBSUY7QUFDRixpQkFBSyxRQUFMLENBQWMsRUFBQyxRQUFPLFNBQVAsRUFBZixFQURFOzs7O2dDQUlDO0FBQ0gsaUJBQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxNQUFQLEVBQWYsRUFERzs7OztXQWJVO0VBQWdCOztrQkFBaEI7OztBQWtCckIsUUFBUSxZQUFSLEdBQXFCLEVBQUMsTUFBSyxFQUFMLEVBQVEsTUFBSyxFQUFMLEVBQVEsS0FBSSxDQUFKLEVBQU0sT0FBTSxFQUFDLFFBQU8sRUFBUCxFQUFQLEVBQWtCLGNBQWEsU0FBYixFQUE5RCIsImZpbGUiOiJsb2FkaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0PXJlcXVpcmUoJ3JlYWN0JyksXG4gICAge0NvbXBvbmVudH09UmVhY3QsXG4gICAge1JlZnJlc2hJbmRpY2F0b3J9PXJlcXVpcmUoJ21hdGVyaWFsLXVpJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmcgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocCl7XG4gICAgICAgIHN1cGVyKHApXG4gICAgICAgIHRoaXMuc3RhdGU9e31cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiA8UmVmcmVzaEluZGljYXRvciB7Li4udGhpcy5wcm9wc30gey4uLnRoaXMuc3RhdGV9Lz5cbiAgICB9XG5cbiAgICBzaG93KCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3N0YXR1czpcImxvYWRpbmdcIn0pXG4gICAgfVxuXG4gICAgY2xvc2UoKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOlwiaGlkZVwifSlcbiAgICB9XG59XG5cbkxvYWRpbmcuZGVmYXVsdFByb3BzPXtzaXplOjQwLGxlZnQ6MTAsdG9wOjUsc3R5bGU6e3pJbmRleDo5OX0sbG9hZGluZ0NvbG9yOlwiI0ZGOTgwMFwifVxuIl19