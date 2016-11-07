"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _db = require("../db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WechatLogin = function (_React$Component) {
    (0, _inherits3.default)(WechatLogin, _React$Component);

    function WechatLogin() {
        (0, _classCallCheck3.default)(this, WechatLogin);
        return (0, _possibleConstructorReturn3.default)(this, (WechatLogin.__proto__ || (0, _getPrototypeOf2.default)(WechatLogin)).apply(this, arguments));
    }

    (0, _createClass3.default)(WechatLogin, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3dlY2hhdExvZ2luLmpzIl0sIm5hbWVzIjpbIldlY2hhdExvZ2luIiwiV2VjaGF0IiwiaXNJbnN0YWxsZWQiLCJvbkxvZ2luIiwiYXV0aCIsInByb3BzIiwic2NvcGUiLCJ3ZWNoYXRfYWNjZXNzX2NvZGUiLCJyZXNwb25zZSIsImNvZGUiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztJQUNxQkEsVzs7Ozs7Ozs7OztpQ0FTVDtBQUFBOztBQUNKLGdCQUFHQyxPQUFPQyxXQUFQLEVBQUgsRUFDSSxPQUFRO0FBQUE7QUFBQSxrQkFBYyxTQUFTO0FBQUEsK0JBQUcsT0FBS0MsT0FBTCxFQUFIO0FBQUEscUJBQXZCO0FBQUE7QUFBQSxhQUFSLENBREosS0FHSSxPQUFPLElBQVA7QUFDUDs7O2tDQUVRO0FBQ0xGLG1CQUFPRyxJQUFQLENBQVksS0FBS0MsS0FBTCxDQUFXQyxLQUF2QixFQUE4QixvQkFBVTtBQUNwQyx5QkFBS0Msa0JBQUwsR0FBd0JDLFNBQVNDLElBQWpDO0FBQ0gsYUFGRDtBQUdIOzs7RUFwQm9DLGdCQUFNQyxTOztBQUExQlYsVyxDQUNWVyxTLEdBQVU7QUFDYkwsV0FBTyxnQkFBTU0sU0FBTixDQUFnQkM7QUFEVixDO0FBREFiLFcsQ0FLVmMsWSxHQUFhO0FBQ2hCUixXQUFNO0FBRFUsQztrQkFMSE4sVyIsImZpbGUiOiJ3ZWNoYXRMb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtSYWlzZWRCdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuLi9kYlwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWNoYXRMb2dpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgc2NvcGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzPXtcbiAgICAgICAgc2NvcGU6XCJzbmFhcGlfdXNlcmluZm9cIlxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBpZihXZWNoYXQuaXNJbnN0YWxsZWQoKSlcbiAgICAgICAgICAgIHJldHVybiAoPFJhaXNlZEJ1dHRvbiBvbkNsaWNrPXtlPT50aGlzLm9uTG9naW4oKX0+V2VDaGF0IExvZ2luPC9SYWlzZWRCdXR0b24+KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIG9uTG9naW4oKXtcbiAgICAgICAgV2VjaGF0LmF1dGgodGhpcy5wcm9wcy5zY29wZSwgcmVzcG9uc2U9PntcbiAgICAgICAgICAgIFVzZXIud2VjaGF0X2FjY2Vzc19jb2RlPXJlc3BvbnNlLmNvZGVcbiAgICAgICAgfSlcbiAgICB9XG59XG4iXX0=