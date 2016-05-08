"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _db = require("../db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WechatLogin = function (_React$Component) {
    _inherits(WechatLogin, _React$Component);

    function WechatLogin() {
        _classCallCheck(this, WechatLogin);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(WechatLogin).apply(this, arguments));
    }

    _createClass(WechatLogin, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            if (Wechat.isInstalled()) return _react2.default.createElement(
                _materialUi.RaisedButton,
                { onClick: function onClick(e) {
                        return _this2.onLogin();
                    } },
                "WeChat Login"
            );else return null;
        }
    }, {
        key: "onLogin",
        value: function onLogin() {
            Wechat.auth(this.props.scope, function (response) {
                _db.User.wechat_access_code = response.code;
            });
        }
    }]);

    return WechatLogin;
}(_react2.default.Component);

WechatLogin.propTypes = {
    scope: _react2.default.PropTypes.string
};
WechatLogin.defaultProps = {
    scope: "snaapi_userinfo"
};
exports.default = WechatLogin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3dlY2hhdExvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQjs7Ozs7Ozs7Ozs7aUNBU1Q7OztBQUNKLGdCQUFHLE9BQU8sV0FBUCxFQUFILEVBQ0ksT0FBUTs7a0JBQWMsU0FBUzsrQkFBRyxPQUFLLE9BQUw7cUJBQUgsRUFBdkI7O2FBQVIsQ0FESixLQUdJLE9BQU8sSUFBUCxDQUhKOzs7O2tDQU1LO0FBQ0wsbUJBQU8sSUFBUCxDQUFZLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBa0Isb0JBQVU7QUFDcEMseUJBQUssa0JBQUwsR0FBd0IsU0FBUyxJQUFULENBRFk7YUFBVixDQUE5QixDQURLOzs7O1dBaEJRO0VBQW9CLGdCQUFNLFNBQU47O0FBQXBCLFlBQ1YsWUFBVTtBQUNiLFdBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUFoQjs7QUFGTSxZQUtWLGVBQWE7QUFDaEIsV0FBTSxpQkFBTjs7a0JBTmEiLCJmaWxlIjoid2VjaGF0TG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7UmFpc2VkQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtVc2VyfSBmcm9tIFwiLi4vZGJcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VjaGF0TG9naW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgIHNjb3BlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XG4gICAgICAgIHNjb3BlOlwic25hYXBpX3VzZXJpbmZvXCJcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgaWYoV2VjaGF0LmlzSW5zdGFsbGVkKCkpXG4gICAgICAgICAgICByZXR1cm4gKDxSYWlzZWRCdXR0b24gb25DbGljaz17ZT0+dGhpcy5vbkxvZ2luKCl9PldlQ2hhdCBMb2dpbjwvUmFpc2VkQnV0dG9uPilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBvbkxvZ2luKCl7XG4gICAgICAgIFdlY2hhdC5hdXRoKHRoaXMucHJvcHMuc2NvcGUsIHJlc3BvbnNlPT57XG4gICAgICAgICAgICBVc2VyLndlY2hhdF9hY2Nlc3NfY29kZT1yZXNwb25zZS5jb2RlXG4gICAgICAgIH0pXG4gICAgfVxufVxuIl19