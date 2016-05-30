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
        _instance = _this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21lc3NhZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFNLEVBQUMsc0JBQUQsRUFBUSwwQkFBUixFQUFpQixvQkFBakIsRUFBTjs7QUFFSixJQUFJLFNBQUo7O0lBQ3FCOzs7QUFDakIsYUFEaUIsUUFDakIsQ0FBWSxLQUFaLEVBQWtCOzhCQURELFVBQ0M7OzJFQURELHFCQUVQLFFBRFE7O0FBRWQsY0FBSyxLQUFMLEdBQVc7QUFDUCxxQkFBUSxTQUFSO0FBQ0EsbUJBQU0sTUFBTjtTQUZKLENBRmM7QUFNcEIsMEJBTm9COztLQUFsQjs7aUJBRGlCOztpQ0FVVDtBQUNKLG1CQUFPLCtEQUFVLEtBQUksS0FBSixJQUFjLEtBQUssS0FBTCxJQUFZLFNBQVMsS0FBSyxLQUFMLENBQVcsT0FBWCxHQUE3QyxDQUFQLENBREk7Ozs7NkJBSUgsU0FBcUI7Z0JBQWIsOERBQU0sc0JBQU87O0FBQ3RCLGdCQUFHLENBQUMsT0FBRCxFQUFVLE9BQWI7QUFDQSxpQkFBSyxRQUFMLENBQWMsRUFBQyxnQkFBRCxFQUFTLFlBQVQsRUFBZCxFQUZzQjtBQUd0QixpQkFBSyxJQUFMLENBQVUsR0FBVixDQUFjLElBQWQsR0FIc0I7Ozs7NkJBTWpCLFNBQVE7OztBQUNuQix3QkFBWSx5QkFBVSxJQUFWLG1CQUFrQixTQUFsQixDQUFaLEdBQTJDLFFBQVEsSUFBUixDQUFhLE9BQWIsQ0FBM0MsQ0FEbUI7Ozs7V0FwQkE7Ozs7OztBQXlCckIsU0FBUyxZQUFULEdBQXNCLEVBQUMsa0JBQWlCLElBQWpCLEVBQXZCIiwiZmlsZSI6Im1lc3NhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7U25hY2tiYXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IEVycm9yIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FsZXJ0L2Vycm9yXCJcbmltcG9ydCBXYXJuaW5nIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FsZXJ0L3dhcm5pbmdcIlxuaW1wb3J0IEluZm8gZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2luZm9cIlxuXG52YXIgSWNvbnM9e0Vycm9yLCBXYXJuaW5nLCBJbmZvfTtcblxudmFyIF9pbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVzc2FnZXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBtZXNzYWdlOlwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgbGV2ZWw6J0luZm8nXG4gICAgICAgIH1cblx0XHRfaW5zdGFuY2U9dGhpc1xuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gPFNuYWNrYmFyIHJlZj1cImJhclwiIHsuLi50aGlzLnByb3BzfSBtZXNzYWdlPXt0aGlzLnN0YXRlLm1lc3NhZ2V9Lz5cbiAgICB9XG5cbiAgICBzaG93KG1lc3NhZ2UsbGV2ZWw9XCJJbmZvXCIpe1xuICAgICAgICBpZighbWVzc2FnZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlLGxldmVsfSlcbiAgICAgICAgdGhpcy5yZWZzLmJhci5zaG93KClcbiAgICB9XG5cdFxuXHRzdGF0aWMgc2hvdyhtZXNzYWdlKXtcblx0XHRfaW5zdGFuY2UgPyBfaW5zdGFuY2Uuc2hvdyguLi5hcmd1bWVudHMpIDogY29uc29sZS53YXJuKG1lc3NhZ2UpXG5cdH1cbn1cblxuTWVzc2FnZXIuZGVmYXVsdFByb3BzPXthdXRvSGlkZUR1cmF0aW9uOjIwMDB9XG4iXX0=