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


Loading.defaultProps = { size: 40, loadingColor: "#FF9800" };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xvYWRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFJLFlBQU0sUUFBUSxPQUFSLENBQU47QUFDQSxJQUFDLFlBQVcsTUFBWCxTQUFEOztlQUNtQixRQUFRLGFBQVI7O0lBQWxCOztJQUVnQjs7O0FBQ2pCLGFBRGlCLE9BQ2pCLENBQVksQ0FBWixFQUFjOzhCQURHLFNBQ0g7OzJFQURHLG9CQUVQLElBREk7O0FBRVYsY0FBSyxLQUFMLEdBQVcsRUFBWCxDQUZVOztLQUFkOztpQkFEaUI7O2lDQUtUO0FBQ0osbUJBQU8sb0JBQUMsZ0JBQUQsZUFBc0IsS0FBSyxLQUFMLEVBQWdCLEtBQUssS0FBTCxDQUF0QyxDQUFQLENBREk7Ozs7K0JBSUY7QUFDRixpQkFBSyxRQUFMLENBQWMsRUFBQyxRQUFPLFNBQVAsRUFBZixFQURFOzs7O2dDQUlDO0FBQ0gsaUJBQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxNQUFQLEVBQWYsRUFERzs7OztXQWJVO0VBQWdCOztrQkFBaEI7OztBQWtCckIsUUFBUSxZQUFSLEdBQXFCLEVBQUMsTUFBSyxFQUFMLEVBQVEsY0FBYSxTQUFiLEVBQTlCIiwiZmlsZSI6ImxvYWRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3Q9cmVxdWlyZSgncmVhY3QnKSxcbiAgICB7Q29tcG9uZW50fT1SZWFjdCxcbiAgICB7UmVmcmVzaEluZGljYXRvcn09cmVxdWlyZSgnbWF0ZXJpYWwtdWknKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3RvcihwKXtcbiAgICAgICAgc3VwZXIocClcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxSZWZyZXNoSW5kaWNhdG9yIHsuLi50aGlzLnByb3BzfSB7Li4udGhpcy5zdGF0ZX0vPlxuICAgIH1cblxuICAgIHNob3coKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c3RhdHVzOlwibG9hZGluZ1wifSlcbiAgICB9XG5cbiAgICBjbG9zZSgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzdGF0dXM6XCJoaWRlXCJ9KVxuICAgIH1cbn1cblxuTG9hZGluZy5kZWZhdWx0UHJvcHM9e3NpemU6NDAsbG9hZGluZ0NvbG9yOlwiI0ZGOTgwMFwifVxuIl19