'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var _require = require('material-ui');

var TextField = _require.TextField;
var FlatButton = _require.FlatButton;
var RaisedButton = _require.RaisedButton;
var User = require('./db/user');
var Messager = require('./components/messager');
var Account = function (_Component) {
    _inherits(Account, _Component);

    function Account(props) {
        _classCallCheck(this, Account);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Account).call(this, props));

        _this.state = { user: User.current };
        return _this;
    }

    _createClass(Account, [{
        key: 'verifyPhone',
        value: function verifyPhone() {
            var _this2 = this;

            var phone = this.refs.phone.state.phone,
                code = this.refs.code.getValue();
            if (!phone.length || !code.length) {
                Messager.show("phone must be specified");
                return;
            }
            User.verifyPhone(phone, code).then(function () {
                return _this2.setState({ phoneVerified: true });
            }).catch(function (e) {
                return _this2.setState({ phoneVerifiedError: e.message });
            });
        }
    }, {
        key: 'signup',
        value: function signup() {
            var _this3 = this;

            var _refs = this.refs;
            var username = _refs.username;
            var password = _refs.password;
            var password2 = _refs.password2;

            username = username.getValue();
            password = password.getValue();
            password2 = password2.getValue();
            if (!username.length || !password.length || !password2.length) {
                Messager.show("user name, password cannot be empty");
                return;
            }

            if (password != password2) {
                Messager.show("password not verified");
                return;
            }
            User.signup({ username: username, password: password }).catch(function (e) {
                return _this3.setState({ signupError: e.message });
            });
        }
    }, {
        key: 'signin',
        value: function signin() {
            var _this4 = this;

            var _refs2 = this.refs;
            var username = _refs2.username;
            var password = _refs2.password;

            username = username.getValue();
            password = password.getValue();
            if (!username.length || !password.length) {
                Messager.show("user name, password cannot be empty");
                return;
            }
            User.signin({ username: username, password: password }).catch(function (e) {
                _this4.setState({ signinError: e.message });
            });
        }
    }, {
        key: 'forgetPassword',
        value: function forgetPassword() {
            var contact = this.refs.contact.getValue();
            if (!contact.length) {
                Messager.show("You have to give phone number or email to get new password");
                return;
            }
            User.requestPasswordReset(contact);
        }
    }, {
        key: 'resetPassword',
        value: function resetPassword() {}
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var user = _state.user;
            var phoneVerified = _state.phoneVerified;
            var forgetPwd = _state.forgetPwd;
            var resetPassword = _state.resetPassword;

            if (!user) {
                if (phoneVerified) {
                    return this._renderSignup();
                } else {
                    return this._renderBeforeSignup();
                }
            } else {
                if (forgetPwd) {
                    return this._renderForgetPassword();
                } else if (resetPassword) {
                    //return this._renderResetPassword()
                } else {
                        return this._renderSignin();
                    }
            }
        }
    }, {
        key: '_renderBeforeSignup',
        value: function _renderBeforeSignup() {
            var _this5 = this;

            var _state2 = this.state;
            var user = _state2.user;
            var phoneVerified = _state2.phoneVerified;
            var forgetPwd = _state2.forgetPwd;

            return React.createElement(
                'div',
                { className: 'form', key: 'beforesignup' },
                React.createElement(SMSRequest, { ref: 'phone' }),
                React.createElement(TextField, { ref: 'code', hintText: 'verification code you just received',
                    fullWidth: true,
                    onEnterKeyDown: this.verifyPhone.bind(this),
                    errorText: this.state.phoneVerifiedError }),
                React.createElement(
                    'center',
                    null,
                    React.createElement(RaisedButton, { label: 'verify', primary: true,
                        onClick: function onClick() {
                            return _this5.verifyPhone();
                        } })
                ),
                React.createElement(
                    'div',
                    { className: 'commands' },
                    React.createElement(FlatButton, { label: 'already have an account',
                        onClick: function onClick() {
                            return _this5.setState({ user: User.current || {} });
                        } }),
                    React.createElement(FlatButton, { label: 'forget password',
                        onClick: function onClick() {
                            return _this5.setState({ user: User.current || {}, forgetPwd: true });
                        } })
                )
            );
        }
    }, {
        key: '_renderSignup',
        value: function _renderSignup() {
            var _this6 = this;

            var _state3 = this.state;
            var user = _state3.user;
            var phoneVerified = _state3.phoneVerified;
            var forgetPwd = _state3.forgetPwd;

            return React.createElement(
                'div',
                { className: 'form', key: 'signup' },
                React.createElement(TextField, { ref: 'username', hintText: 'login name',
                    fullWidth: true,
                    onEnterKeyDown: this.signup.bind(this),
                    errorText: this.state.signupError }),
                React.createElement(TextField, { ref: 'password',
                    fullWidth: true,
                    onEnterKeyDown: this.signup.bind(this),
                    type: 'password', hintText: 'password' }),
                React.createElement(TextField, { ref: 'password2',
                    fullWidth: true,
                    onEnterKeyDown: this.signup.bind(this),
                    type: 'password', hintText: 'password again' }),
                React.createElement(
                    'center',
                    null,
                    React.createElement(RaisedButton, { label: 'sign up', primary: true,
                        onClick: this.signup.bind(this) })
                ),
                React.createElement(
                    'div',
                    { className: 'commands' },
                    React.createElement(FlatButton, { label: 'already have an account',
                        onClick: function onClick() {
                            return _this6.setState({ user: User.current || {} });
                        } }),
                    React.createElement(FlatButton, { label: 'forget password',
                        onClick: function onClick() {
                            return _this6.setState({ user: User.current || {}, forgetPwd: true });
                        } })
                )
            );
        }
    }, {
        key: '_renderSignin',
        value: function _renderSignin() {
            var _this7 = this;

            var _state4 = this.state;
            var user = _state4.user;
            var phoneVerified = _state4.phoneVerified;
            var forgetPwd = _state4.forgetPwd;

            return React.createElement(
                'div',
                { className: 'form', key: 'signin' },
                React.createElement(TextField, { ref: 'username',
                    hintText: 'login name or phone number',
                    onEnterKeyDown: this.signin.bind(this),
                    fullWidth: true,
                    errorText: this.state.signinError }),
                React.createElement(TextField, { ref: 'password',
                    onEnterKeyDown: this.signin.bind(this),
                    fullWidth: true,
                    type: 'password', hintText: 'password' }),
                React.createElement(
                    'center',
                    null,
                    React.createElement(RaisedButton, { label: 'sign in', primary: true,
                        onClick: this.signin.bind(this) })
                ),
                React.createElement(
                    'div',
                    { className: 'commands' },
                    React.createElement(FlatButton, { label: 'no account',
                        onClick: function onClick() {
                            return _this7.setState({ user: undefined });
                        } }),
                    React.createElement(FlatButton, { label: 'forget password',
                        onClick: function onClick() {
                            return _this7.setState({ user: User.current || {}, forgetPwd: true });
                        } })
                )
            );
        }
    }, {
        key: '_renderForgetPassword',
        value: function _renderForgetPassword() {
            var _this8 = this;

            var _state5 = this.state;
            var user = _state5.user;
            var phoneVerified = _state5.phoneVerified;
            var forgetPwd = _state5.forgetPwd;

            return React.createElement(
                'div',
                { className: 'form', key: 'forgetPwd' },
                React.createElement(TextField, { ref: 'contact',
                    onEnterKeyDown: this.forgetPassword.bind(this),
                    fullWidth: true, hintText: 'phone number or email' }),
                React.createElement(
                    'center',
                    null,
                    React.createElement(RaisedButton, { label: 'send me', primary: true,
                        onClick: this.forgetPassword.bind(this) })
                ),
                React.createElement(
                    'div',
                    { className: 'commands' },
                    React.createElement(FlatButton, { label: 'sign in',
                        onClick: function onClick() {
                            return _this8.setState({ user: User.current || {}, forgetPwd: undefined });
                        } }),
                    React.createElement(FlatButton, { label: 'sign up',
                        onClick: function onClick() {
                            return _this8.setState({ user: undefined, forgetPwd: undefined });
                        } })
                )
            );
        }
    }, {
        key: '_renderResetPassword',
        value: function _renderResetPassword() {
            var _this9 = this;

            return React.createElement(
                'div',
                { className: 'form', key: 'reset' },
                React.createElement(TextField, { ref: 'oldPassword', hintText: 'old password',
                    fullWidth: true,
                    onEnterKeyDown: this.resetPassword.bind(this),
                    errorText: this.state.resetError }),
                React.createElement(TextField, { ref: 'password',
                    fullWidth: true,
                    onEnterKeyDown: this.resetPassword.bind(this),
                    type: 'password', hintText: 'password' }),
                React.createElement(TextField, { ref: 'password2',
                    fullWidth: true,
                    onEnterKeyDown: this.resetPassword.bind(this),
                    type: 'password', hintText: 'password again' }),
                React.createElement(
                    'center',
                    null,
                    React.createElement(RaisedButton, { label: 'reset password', primary: true,
                        onClick: this.resetPassword.bind(this) })
                ),
                React.createElement(
                    'div',
                    { className: 'commands' },
                    React.createElement(FlatButton, { label: 'sign in',
                        onClick: function onClick() {
                            return _this9.setState({ user: User.current || {}, forgetPwd: undefined });
                        } }),
                    React.createElement(FlatButton, { label: 'forget password',
                        onClick: function onClick() {
                            return _this9.setState({ user: User.current || {}, forgetPwd: true });
                        } })
                )
            );
        }
    }]);

    return Account;
}(Component);

exports.default = Account;

var SMSRequest = function (_Component2) {
    _inherits(SMSRequest, _Component2);

    function SMSRequest(props) {
        _classCallCheck(this, SMSRequest);

        var _this10 = _possibleConstructorReturn(this, Object.getPrototypeOf(SMSRequest).call(this, props));

        _this10.state = { phone: null, tick: null };
        return _this10;
    }

    _createClass(SMSRequest, [{
        key: 'requestVerification',
        value: function requestVerification() {
            this.tick();
            User.requestVerification(this.state.phone);
        }
    }, {
        key: 'tick',
        value: function tick() {
            var _this11 = this;

            var i = 0,
                doTick;
            this._t = setInterval(doTick = function doTick() {
                if (i == 60) {
                    clearInterval(_this11._t);
                    _this11.setState({ tick: 0 });
                } else _this11.setState({ tick: ++i });
            }, 1000);

            doTick();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this._t) clearInterval(this._t);
        }
    }, {
        key: 'changePhone',
        value: function changePhone(e) {
            var phone = e.target.value;
            if (SMSRequest.isPhone(phone)) this.setState({ phone: phone });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this12 = this;

            var button;
            if (SMSRequest.isPhone(this.state.phone)) {
                if (this.state.tick) button = React.createElement(FlatButton, { label: this.state.tick, disabled: true });else button = React.createElement(FlatButton, { label: this.state.tick === 0 ? "resend" : "send",
                    onClick: function onClick() {
                        return _this12.requestVerification();
                    } });
            }

            return React.createElement(
                'div',
                { className: 'smsrequest' },
                React.createElement(TextField, { ref: 'phone', hintText: 'phone number (default +86)',
                    value: this.state.phone,
                    onChange: function onChange(e) {
                        return _this12.changePhone(e);
                    } }),
                button
            );
        }
    }], [{
        key: 'isPhone',
        value: function isPhone(v) {
            return (/^(\+\d{2})?\d{11}$/g.test(v)
            );
        }
    }]);

    return SMSRequest;
}(Component);

Account.SMSRequest = SMSRequest;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LENBQVcsSUFBWCxFQUNDLFNBQVEsb0JBQUMsVUFBRCxJQUFZLE9BQU8sS0FBSyxLQUFMLENBQVcsSUFBWCxFQUFpQixVQUFVLElBQVYsRUFBcEMsQ0FBUixDQURKLEtBR0ksU0FBUSxvQkFBQyxVQUFELElBQVksT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUFYLEtBQWtCLENBQWxCLEdBQXNCLFFBQXRCLEdBQWlDLE1BQWpDO0FBQ3ZCLDZCQUFTOytCQUFJLFFBQUssbUJBQUw7cUJBQUosRUFETCxDQUFSLENBSEo7YUFESjs7QUFRQSxtQkFDSTs7a0JBQUssV0FBVSxZQUFWLEVBQUw7Z0JBQ0ksb0JBQUMsU0FBRCxJQUFXLEtBQUksT0FBSixFQUFZLFVBQVMsNEJBQVQ7QUFDbkIsMkJBQU8sS0FBSyxLQUFMLENBQVcsS0FBWDtBQUNQLDhCQUFVLGtCQUFDLENBQUQ7K0JBQUssUUFBSyxXQUFMLENBQWlCLENBQWpCO3FCQUFMLEVBRmQsQ0FESjtnQkFJSyxNQUpMO2FBREosQ0FWSTs7OztnQ0FkTyxHQUFFO0FBQ2IsbUJBQU8sdUJBQXdCLElBQXhCLENBQTZCLENBQTdCLENBQVA7Y0FEYTs7OztXQXJCZjtFQUFtQjs7QUF3RHpCLFFBQVEsVUFBUixHQUFtQixVQUFuQiIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0PXJlcXVpcmUoJ3JlYWN0JyksXG4gICAge0NvbXBvbmVudH09UmVhY3QsXG4gICAge1RleHRGaWVsZCxGbGF0QnV0dG9uLCBSYWlzZWRCdXR0b259PXJlcXVpcmUoJ21hdGVyaWFsLXVpJyksXG4gICAgVXNlcj1yZXF1aXJlKCcuL2RiL3VzZXInKSxcbiAgICBNZXNzYWdlcj1yZXF1aXJlKCcuL2NvbXBvbmVudHMvbWVzc2FnZXInKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXt1c2VyOlVzZXIuY3VycmVudH1cbiAgICB9XG5cbiAgICB2ZXJpZnlQaG9uZSgpe1xuICAgICAgICB2YXIgcGhvbmU9dGhpcy5yZWZzLnBob25lLnN0YXRlLnBob25lLFxuICAgICAgICAgICAgY29kZT10aGlzLnJlZnMuY29kZS5nZXRWYWx1ZSgpO1xuICAgICAgICBpZighcGhvbmUubGVuZ3RoIHx8ICFjb2RlLmxlbmd0aCl7XG4gICAgICAgICAgICBNZXNzYWdlci5zaG93KFwicGhvbmUgbXVzdCBiZSBzcGVjaWZpZWRcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFVzZXIudmVyaWZ5UGhvbmUocGhvbmUsIGNvZGUpXG4gICAgICAgICAgICAudGhlbigoKT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmVWZXJpZmllZDp0cnVlfSkpXG4gICAgICAgICAgICAuY2F0Y2goZT0+dGhpcy5zZXRTdGF0ZSh7cGhvbmVWZXJpZmllZEVycm9yOmUubWVzc2FnZX0pKVxuICAgIH1cbiAgICBzaWdudXAoKXtcbiAgICAgICAgdmFye3VzZXJuYW1lLHBhc3N3b3JkLHBhc3N3b3JkMn09dGhpcy5yZWZzXG4gICAgICAgIHVzZXJuYW1lPXVzZXJuYW1lLmdldFZhbHVlKClcbiAgICAgICAgcGFzc3dvcmQ9cGFzc3dvcmQuZ2V0VmFsdWUoKVxuICAgICAgICBwYXNzd29yZDI9cGFzc3dvcmQyLmdldFZhbHVlKClcbiAgICAgICAgaWYoIXVzZXJuYW1lLmxlbmd0aCB8fCAhcGFzc3dvcmQubGVuZ3RoIHx8IXBhc3N3b3JkMi5sZW5ndGgpe1xuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcInVzZXIgbmFtZSwgcGFzc3dvcmQgY2Fubm90IGJlIGVtcHR5XCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHBhc3N3b3JkIT1wYXNzd29yZDIpe1xuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcInBhc3N3b3JkIG5vdCB2ZXJpZmllZFwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgVXNlci5zaWdudXAoe3VzZXJuYW1lLHBhc3N3b3JkfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSk9PnRoaXMuc2V0U3RhdGUoe3NpZ251cEVycm9yOmUubWVzc2FnZX0pKVxuICAgIH1cbiAgICBzaWduaW4oKXtcbiAgICAgICAgdmFye3VzZXJuYW1lLHBhc3N3b3JkfT10aGlzLnJlZnNcbiAgICAgICAgdXNlcm5hbWU9dXNlcm5hbWUuZ2V0VmFsdWUoKVxuICAgICAgICBwYXNzd29yZD1wYXNzd29yZC5nZXRWYWx1ZSgpXG4gICAgICAgIGlmKCF1c2VybmFtZS5sZW5ndGggfHwgIXBhc3N3b3JkLmxlbmd0aCl7XG4gICAgICAgICAgICBNZXNzYWdlci5zaG93KFwidXNlciBuYW1lLCBwYXNzd29yZCBjYW5ub3QgYmUgZW1wdHlcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFVzZXIuc2lnbmluKHt1c2VybmFtZSxwYXNzd29yZH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2lnbmluRXJyb3I6ZS5tZXNzYWdlfSlcbiAgICAgICAgICAgIH0pXG4gICAgfVxuICAgIGZvcmdldFBhc3N3b3JkKCl7XG4gICAgICAgIGxldCBjb250YWN0PXRoaXMucmVmcy5jb250YWN0LmdldFZhbHVlKClcbiAgICAgICAgaWYoIWNvbnRhY3QubGVuZ3RoKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLnNob3coXCJZb3UgaGF2ZSB0byBnaXZlIHBob25lIG51bWJlciBvciBlbWFpbCB0byBnZXQgbmV3IHBhc3N3b3JkXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBVc2VyLnJlcXVlc3RQYXNzd29yZFJlc2V0KGNvbnRhY3QpXG4gICAgfVxuXG4gICAgcmVzZXRQYXNzd29yZCgpe1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7dXNlciwgcGhvbmVWZXJpZmllZCwgZm9yZ2V0UHdkLCByZXNldFBhc3N3b3JkfT10aGlzLnN0YXRlXG4gICAgICAgIGlmKCF1c2VyKXtcbiAgICAgICAgICAgIGlmKHBob25lVmVyaWZpZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTaWdudXAoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckJlZm9yZVNpZ251cCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGlmKGZvcmdldFB3ZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlckZvcmdldFBhc3N3b3JkKClcbiAgICAgICAgICAgIH1lbHNlIGlmKHJlc2V0UGFzc3dvcmQpe1xuICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuX3JlbmRlclJlc2V0UGFzc3dvcmQoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclNpZ25pbigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcmVuZGVyQmVmb3JlU2lnbnVwKCl7XG4gICAgICAgIHZhciB7dXNlciwgcGhvbmVWZXJpZmllZCwgZm9yZ2V0UHdkfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJiZWZvcmVzaWdudXBcIj5cbiAgICAgICAgICAgICAgICA8U01TUmVxdWVzdCByZWY9XCJwaG9uZVwiLz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cImNvZGVcIiBoaW50VGV4dD1cInZlcmlmaWNhdGlvbiBjb2RlIHlvdSBqdXN0IHJlY2VpdmVkXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbkVudGVyS2V5RG93bj17dGhpcy52ZXJpZnlQaG9uZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICBlcnJvclRleHQ9e3RoaXMuc3RhdGUucGhvbmVWZXJpZmllZEVycm9yfS8+XG4gICAgICAgICAgICAgICAgPGNlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBsYWJlbD1cInZlcmlmeVwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy52ZXJpZnlQaG9uZSgpfS8+XG4gICAgICAgICAgICAgICAgPC9jZW50ZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e319KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sZm9yZ2V0UHdkOnRydWV9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVuZGVyU2lnbnVwKCl7XG4gICAgICAgIHZhciB7dXNlciwgcGhvbmVWZXJpZmllZCwgZm9yZ2V0UHdkfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInVzZXJuYW1lXCIgaGludFRleHQ9XCJsb2dpbiBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbkVudGVyS2V5RG93bj17dGhpcy5zaWdudXAuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUZXh0PXt0aGlzLnN0YXRlLnNpZ251cEVycm9yfS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbkVudGVyS2V5RG93bj17dGhpcy5zaWdudXAuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwicGFzc3dvcmQyXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbkVudGVyS2V5RG93bj17dGhpcy5zaWdudXAuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCIgcHJpbWFyeT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2lnbnVwLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6VXNlci5jdXJyZW50fHx7fX0pfS8+XG5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6VXNlci5jdXJyZW50fHx7fSxmb3JnZXRQd2Q6dHJ1ZX0pfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9yZW5kZXJTaWduaW4oKXtcbiAgICAgICAgdmFyIHt1c2VyLCBwaG9uZVZlcmlmaWVkLCBmb3JnZXRQd2R9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ25pblwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwidXNlcm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBoaW50VGV4dD1cImxvZ2luIG5hbWUgb3IgcGhvbmUgbnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleURvd249e3RoaXMuc2lnbmluLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUZXh0PXt0aGlzLnN0YXRlLnNpZ25pbkVycm9yfS8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkVudGVyS2V5RG93bj17dGhpcy5zaWduaW4uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG4gICAgICAgICAgICAgICAgPGNlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBsYWJlbD1cInNpZ24gaW5cIiBwcmltYXJ5PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zaWduaW4uYmluZCh0aGlzKX0vPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJubyBhY2NvdW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjp1bmRlZmluZWR9KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sZm9yZ2V0UHdkOnRydWV9KX0vPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9yZW5kZXJGb3JnZXRQYXNzd29yZCgpe1xuICAgICAgICB2YXIge3VzZXIsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwiZm9yZ2V0UHdkXCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJjb250YWN0XCJcbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleURvd249e3RoaXMuZm9yZ2V0UGFzc3dvcmQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfSBoaW50VGV4dD1cInBob25lIG51bWJlciBvciBlbWFpbFwiLz5cblxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lXCIgcHJpbWFyeT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZm9yZ2V0UGFzc3dvcmQuYmluZCh0aGlzKX0vPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sIGZvcmdldFB3ZDp1bmRlZmluZWR9KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjp1bmRlZmluZWQsZm9yZ2V0UHdkOnVuZGVmaW5lZH0pfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9yZW5kZXJSZXNldFBhc3N3b3JkKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwib2xkUGFzc3dvcmRcIiBoaW50VGV4dD1cIm9sZCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleURvd249e3RoaXMucmVzZXRQYXNzd29yZC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICBlcnJvclRleHQ9e3RoaXMuc3RhdGUucmVzZXRFcnJvcn0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleURvd249e3RoaXMucmVzZXRQYXNzd29yZC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJwYXNzd29yZDJcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIG9uRW50ZXJLZXlEb3duPXt0aGlzLnJlc2V0UGFzc3dvcmQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJyZXNldCBwYXNzd29yZFwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnJlc2V0UGFzc3dvcmQuYmluZCh0aGlzKX0vPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sIGZvcmdldFB3ZDp1bmRlZmluZWR9KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sZm9yZ2V0UHdkOnRydWV9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNsYXNzIFNNU1JlcXVlc3QgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17cGhvbmU6bnVsbCx0aWNrOm51bGx9XG4gICAgfVxuICAgIHJlcXVlc3RWZXJpZmljYXRpb24oKXtcbiAgICAgICAgdGhpcy50aWNrKClcbiAgICAgICAgVXNlci5yZXF1ZXN0VmVyaWZpY2F0aW9uKHRoaXMuc3RhdGUucGhvbmUpXG4gICAgfVxuICAgIHRpY2soKXtcbiAgICAgICAgdmFyIGk9MCwgZG9UaWNrO1xuICAgICAgICB0aGlzLl90PXNldEludGVydmFsKGRvVGljaz0oKT0+e1xuICAgICAgICAgICAgaWYoaT09NjApe1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOiAwfSlcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazorK2l9KVxuICAgICAgICB9LDEwMDApO1xuXG4gICAgICAgIGRvVGljaygpXG4gICAgfVxuICAgIHN0YXRpYyBpc1Bob25lKHYpe1xuICAgICAgICByZXR1cm4gKC9eKFxcK1xcZHsyfSk/XFxkezExfSQvZykudGVzdCh2KVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGlmKHRoaXMuX3QpXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgfVxuICAgIGNoYW5nZVBob25lKGUpe1xuICAgICAgICB2YXIgcGhvbmU9ZS50YXJnZXQudmFsdWVcbiAgICAgICAgaWYoU01TUmVxdWVzdC5pc1Bob25lKHBob25lKSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Bob25lOnBob25lfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGJ1dHRvblxuICAgICAgICBpZihTTVNSZXF1ZXN0LmlzUGhvbmUodGhpcy5zdGF0ZS5waG9uZSkpe1xuICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS50aWNrKVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RoaXMuc3RhdGUudGlja30gZGlzYWJsZWQ9e3RydWV9Lz4pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGhpcy5zdGF0ZS50aWNrPT09MCA/IFwicmVzZW5kXCIgOiBcInNlbmRcIn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMucmVxdWVzdFZlcmlmaWNhdGlvbigpfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic21zcmVxdWVzdFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwicGhvbmVcIiBoaW50VGV4dD1cInBob25lIG51bWJlciAoZGVmYXVsdCArODYpXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGhvbmV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnRoaXMuY2hhbmdlUGhvbmUoZSl9Lz5cbiAgICAgICAgICAgICAgICB7YnV0dG9ufVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbkFjY291bnQuU01TUmVxdWVzdD1TTVNSZXF1ZXN0XG4iXX0=