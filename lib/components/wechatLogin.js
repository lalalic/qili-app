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

        return _possibleConstructorReturn(this, (WechatLogin.__proto__ || Object.getPrototypeOf(WechatLogin)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3dlY2hhdExvZ2luLmpzIl0sIm5hbWVzIjpbIldlY2hhdExvZ2luIiwiV2VjaGF0IiwiaXNJbnN0YWxsZWQiLCJvbkxvZ2luIiwiYXV0aCIsInByb3BzIiwic2NvcGUiLCJ3ZWNoYXRfYWNjZXNzX2NvZGUiLCJyZXNwb25zZSIsImNvZGUiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7aUNBU1Q7QUFBQTs7QUFDSixnQkFBR0MsT0FBT0MsV0FBUCxFQUFILEVBQ0ksT0FBUTtBQUFBO0FBQUEsa0JBQWMsU0FBUztBQUFBLCtCQUFHLE9BQUtDLE9BQUwsRUFBSDtBQUFBLHFCQUF2QjtBQUFBO0FBQUEsYUFBUixDQURKLEtBR0ksT0FBTyxJQUFQO0FBQ1A7OztrQ0FFUTtBQUNMRixtQkFBT0csSUFBUCxDQUFZLEtBQUtDLEtBQUwsQ0FBV0MsS0FBdkIsRUFBOEIsb0JBQVU7QUFDcEMseUJBQUtDLGtCQUFMLEdBQXdCQyxTQUFTQyxJQUFqQztBQUNILGFBRkQ7QUFHSDs7OztFQXBCb0MsZ0JBQU1DLFM7O0FBQTFCVixXLENBQ1ZXLFMsR0FBVTtBQUNiTCxXQUFPLGdCQUFNTSxTQUFOLENBQWdCQztBQURWLEM7QUFEQWIsVyxDQUtWYyxZLEdBQWE7QUFDaEJSLFdBQU07QUFEVSxDO2tCQUxITixXIiwiZmlsZSI6IndlY2hhdExvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JhaXNlZEJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7VXNlcn0gZnJvbSBcIi4uL2RiXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlY2hhdExvZ2luIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICBzY29wZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuICAgICAgICBzY29wZTpcInNuYWFwaV91c2VyaW5mb1wiXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGlmKFdlY2hhdC5pc0luc3RhbGxlZCgpKVxuICAgICAgICAgICAgcmV0dXJuICg8UmFpc2VkQnV0dG9uIG9uQ2xpY2s9e2U9PnRoaXMub25Mb2dpbigpfT5XZUNoYXQgTG9naW48L1JhaXNlZEJ1dHRvbj4pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgb25Mb2dpbigpe1xuICAgICAgICBXZWNoYXQuYXV0aCh0aGlzLnByb3BzLnNjb3BlLCByZXNwb25zZT0+e1xuICAgICAgICAgICAgVXNlci53ZWNoYXRfYWNjZXNzX2NvZGU9cmVzcG9uc2UuY29kZVxuICAgICAgICB9KVxuICAgIH1cbn1cbiJdfQ==