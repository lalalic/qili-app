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

var Messager = function (_Component) {
    _inherits(Messager, _Component);

    function Messager(props) {
        _classCallCheck(this, Messager);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Messager).call(this, props));

        _this.state = {
            message: "default",
            level: 'Info'
        };
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
    }]);

    return Messager;
}(_react.Component);

exports.default = Messager;


Messager.defaultProps = { autoHideDuration: 2000, style: { position: "fixed", right: 10, bottom: 0 } };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFNLEVBQUMsc0JBQUQsRUFBUSwwQkFBUixFQUFpQixvQkFBakIsRUFBTjs7SUFFaUI7OztBQUNqQixhQURpQixRQUNqQixDQUFZLEtBQVosRUFBa0I7OEJBREQsVUFDQzs7MkVBREQscUJBRVAsUUFEUTs7QUFFZCxjQUFLLEtBQUwsR0FBVztBQUNQLHFCQUFRLFNBQVI7QUFDQSxtQkFBTSxNQUFOO1NBRkosQ0FGYzs7S0FBbEI7O2lCQURpQjs7aUNBU1Q7QUFDSixtQkFBTywrREFBVSxLQUFJLEtBQUosSUFBYyxLQUFLLEtBQUwsSUFBWSxTQUFTLEtBQUssS0FBTCxDQUFXLE9BQVgsR0FBN0MsQ0FBUCxDQURJOzs7OzZCQUlILFNBQXFCO2dCQUFiLDhEQUFNLHNCQUFPOztBQUN0QixnQkFBRyxDQUFDLE9BQUQsRUFBVSxPQUFiO0FBQ0EsaUJBQUssUUFBTCxDQUFjLEVBQUMsZ0JBQUQsRUFBUyxZQUFULEVBQWQsRUFGc0I7QUFHdEIsaUJBQUssSUFBTCxDQUFVLEdBQVYsQ0FBYyxJQUFkLEdBSHNCOzs7O1dBYlQ7Ozs7OztBQW9CckIsU0FBUyxZQUFULEdBQXNCLEVBQUMsa0JBQWlCLElBQWpCLEVBQXVCLE9BQU0sRUFBQyxVQUFTLE9BQVQsRUFBaUIsT0FBTSxFQUFOLEVBQVUsUUFBTyxDQUFQLEVBQWxDLEVBQTlDIiwiZmlsZSI6Im1lc3NhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7U25hY2tiYXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IEVycm9yIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FsZXJ0L2Vycm9yXCJcbmltcG9ydCBXYXJuaW5nIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FsZXJ0L3dhcm5pbmdcIlxuaW1wb3J0IEluZm8gZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2luZm9cIlxuXG52YXIgSWNvbnM9e0Vycm9yLCBXYXJuaW5nLCBJbmZvfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBtZXNzYWdlOlwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgbGV2ZWw6J0luZm8nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxTbmFja2JhciByZWY9XCJiYXJcIiB7Li4udGhpcy5wcm9wc30gbWVzc2FnZT17dGhpcy5zdGF0ZS5tZXNzYWdlfS8+XG4gICAgfVxuXG4gICAgc2hvdyhtZXNzYWdlLGxldmVsPVwiSW5mb1wiKXtcbiAgICAgICAgaWYoIW1lc3NhZ2UpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZSxsZXZlbH0pXG4gICAgICAgIHRoaXMucmVmcy5iYXIuc2hvdygpXG4gICAgfVxufVxuXG5NZXNzYWdlci5kZWZhdWx0UHJvcHM9e2F1dG9IaWRlRHVyYXRpb246MjAwMCwgc3R5bGU6e3Bvc2l0aW9uOlwiZml4ZWRcIixyaWdodDoxMCwgYm90dG9tOjB9fVxuIl19