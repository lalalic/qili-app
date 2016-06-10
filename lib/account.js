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

        _this.state = { user: _this.props.user };
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
//# sourceMappingURL=data:application/json;base64,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LEtBQUssS0FBTCxDQUFXLElBQVgsRUFDQyxTQUFRLG9CQUFDLFVBQUQsSUFBWSxPQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsRUFBaUIsVUFBVSxJQUFWLEVBQXBDLENBQVIsQ0FESixLQUdJLFNBQVEsb0JBQUMsVUFBRCxJQUFZLE9BQU8sS0FBSyxLQUFMLENBQVcsSUFBWCxLQUFrQixDQUFsQixHQUFzQixRQUF0QixHQUFpQyxNQUFqQztBQUN2Qiw2QkFBUzsrQkFBSSxRQUFLLG1CQUFMO3FCQUFKLEVBREwsQ0FBUixDQUhKO2FBREo7O0FBUUEsbUJBQ0k7O2tCQUFLLFdBQVUsWUFBVixFQUFMO2dCQUNJLG9CQUFDLFNBQUQsSUFBVyxLQUFJLE9BQUosRUFBWSxVQUFTLDRCQUFUO0FBQ25CLDJCQUFPLEtBQUssS0FBTCxDQUFXLEtBQVg7QUFDUCw4QkFBVSxrQkFBQyxDQUFEOytCQUFLLFFBQUssV0FBTCxDQUFpQixDQUFqQjtxQkFBTCxFQUZkLENBREo7Z0JBSUssTUFKTDthQURKLENBVkk7Ozs7Z0NBZE8sR0FBRTtBQUNiLG1CQUFPLHVCQUF3QixJQUF4QixDQUE2QixDQUE3QixDQUFQO2NBRGE7Ozs7V0FyQmY7RUFBbUI7O0FBd0R6QixRQUFRLFVBQVIsR0FBbUIsVUFBbkIiLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdD1yZXF1aXJlKCdyZWFjdCcpLFxuICAgIHtDb21wb25lbnR9PVJlYWN0LFxuICAgIHtUZXh0RmllbGQsRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9ufT1yZXF1aXJlKCdtYXRlcmlhbC11aScpLFxuICAgIFVzZXI9cmVxdWlyZSgnLi9kYi91c2VyJyksXG4gICAgTWVzc2FnZXI9cmVxdWlyZSgnLi9jb21wb25lbnRzL21lc3NhZ2VyJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY291bnQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17dXNlcjp0aGlzLnByb3BzLnVzZXJ9XG4gICAgfVxuXG4gICAgdmVyaWZ5UGhvbmUoKXtcbiAgICAgICAgdmFyIHBob25lPXRoaXMucmVmcy5waG9uZS5zdGF0ZS5waG9uZSxcbiAgICAgICAgICAgIGNvZGU9dGhpcy5yZWZzLmNvZGUuZ2V0VmFsdWUoKTtcbiAgICAgICAgaWYoIXBob25lLmxlbmd0aCB8fCAhY29kZS5sZW5ndGgpe1xuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcInBob25lIG11c3QgYmUgc3BlY2lmaWVkXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBVc2VyLnZlcmlmeVBob25lKHBob25lLCBjb2RlKVxuICAgICAgICAgICAgLnRoZW4oKCk9PnRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWQ6dHJ1ZX0pKVxuICAgICAgICAgICAgLmNhdGNoKGU9PnRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWRFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG4gICAgc2lnbnVwKCl7XG4gICAgICAgIHZhcnt1c2VybmFtZSxwYXNzd29yZCxwYXNzd29yZDJ9PXRoaXMucmVmc1xuICAgICAgICB1c2VybmFtZT11c2VybmFtZS5nZXRWYWx1ZSgpXG4gICAgICAgIHBhc3N3b3JkPXBhc3N3b3JkLmdldFZhbHVlKClcbiAgICAgICAgcGFzc3dvcmQyPXBhc3N3b3JkMi5nZXRWYWx1ZSgpXG4gICAgICAgIGlmKCF1c2VybmFtZS5sZW5ndGggfHwgIXBhc3N3b3JkLmxlbmd0aCB8fCFwYXNzd29yZDIubGVuZ3RoKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLnNob3coXCJ1c2VyIG5hbWUsIHBhc3N3b3JkIGNhbm5vdCBiZSBlbXB0eVwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZihwYXNzd29yZCE9cGFzc3dvcmQyKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLnNob3coXCJwYXNzd29yZCBub3QgdmVyaWZpZWRcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFVzZXIuc2lnbnVwKHt1c2VybmFtZSxwYXNzd29yZH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpPT50aGlzLnNldFN0YXRlKHtzaWdudXBFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG4gICAgc2lnbmluKCl7XG4gICAgICAgIHZhcnt1c2VybmFtZSxwYXNzd29yZH09dGhpcy5yZWZzXG4gICAgICAgIHVzZXJuYW1lPXVzZXJuYW1lLmdldFZhbHVlKClcbiAgICAgICAgcGFzc3dvcmQ9cGFzc3dvcmQuZ2V0VmFsdWUoKVxuICAgICAgICBpZighdXNlcm5hbWUubGVuZ3RoIHx8ICFwYXNzd29yZC5sZW5ndGgpe1xuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcInVzZXIgbmFtZSwgcGFzc3dvcmQgY2Fubm90IGJlIGVtcHR5XCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBVc2VyLnNpZ25pbih7dXNlcm5hbWUscGFzc3dvcmR9KVxuICAgICAgICAgICAgLmNhdGNoKChlKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NpZ25pbkVycm9yOmUubWVzc2FnZX0pXG4gICAgICAgICAgICB9KVxuICAgIH1cbiAgICBmb3JnZXRQYXNzd29yZCgpe1xuICAgICAgICBsZXQgY29udGFjdD10aGlzLnJlZnMuY29udGFjdC5nZXRWYWx1ZSgpXG4gICAgICAgIGlmKCFjb250YWN0Lmxlbmd0aCl7XG4gICAgICAgICAgICBNZXNzYWdlci5zaG93KFwiWW91IGhhdmUgdG8gZ2l2ZSBwaG9uZSBudW1iZXIgb3IgZW1haWwgdG8gZ2V0IG5ldyBwYXNzd29yZFwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgVXNlci5yZXF1ZXN0UGFzc3dvcmRSZXNldChjb250YWN0KVxuICAgIH1cblxuICAgIHJlc2V0UGFzc3dvcmQoKXtcblxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3VzZXIsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZCwgcmVzZXRQYXNzd29yZH09dGhpcy5zdGF0ZVxuICAgICAgICBpZighdXNlcil7XG4gICAgICAgICAgICBpZihwaG9uZVZlcmlmaWVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2lnbnVwKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJCZWZvcmVTaWdudXAoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBpZihmb3JnZXRQd2Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGb3JnZXRQYXNzd29yZCgpXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXNldFBhc3N3b3JkKXtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLl9yZW5kZXJSZXNldFBhc3N3b3JkKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTaWduaW4oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3JlbmRlckJlZm9yZVNpZ251cCgpe1xuICAgICAgICB2YXIge3VzZXIsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwiYmVmb3Jlc2lnbnVwXCI+XG4gICAgICAgICAgICAgICAgPFNNU1JlcXVlc3QgcmVmPVwicGhvbmVcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJjb2RlXCIgaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleURvd249e3RoaXMudmVyaWZ5UGhvbmUuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUZXh0PXt0aGlzLnN0YXRlLnBob25lVmVyaWZpZWRFcnJvcn0vPlxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJ2ZXJpZnlcIiBwcmltYXJ5PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMudmVyaWZ5UGhvbmUoKX0vPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9fSl9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LGZvcmdldFB3ZDp0cnVlfSl9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgX3JlbmRlclNpZ251cCgpe1xuICAgICAgICB2YXIge3VzZXIsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbnVwXCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJ1c2VybmFtZVwiIGhpbnRUZXh0PVwibG9naW4gbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleURvd249e3RoaXMuc2lnbnVwLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIGVycm9yVGV4dD17dGhpcy5zdGF0ZS5zaWdudXBFcnJvcn0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleURvd249e3RoaXMuc2lnbnVwLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBhc3N3b3JkMlwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleURvd249e3RoaXMuc2lnbnVwLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cbiAgICAgICAgICAgICAgICA8Y2VudGVyPlxuICAgICAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNpZ251cC5iaW5kKHRoaXMpfS8+XG4gICAgICAgICAgICAgICAgPC9jZW50ZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e319KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sZm9yZ2V0UHdkOnRydWV9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVuZGVyU2lnbmluKCl7XG4gICAgICAgIHZhciB7dXNlciwgcGhvbmVWZXJpZmllZCwgZm9yZ2V0UHdkfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWduaW5cIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInVzZXJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgaGludFRleHQ9XCJsb2dpbiBuYW1lIG9yIHBob25lIG51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIG9uRW50ZXJLZXlEb3duPXt0aGlzLnNpZ25pbi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGVycm9yVGV4dD17dGhpcy5zdGF0ZS5zaWduaW5FcnJvcn0vPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleURvd249e3RoaXMuc2lnbmluLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIGluXCIgcHJpbWFyeT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2lnbmluLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwibm8gYWNjb3VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6dW5kZWZpbmVkfSl9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LGZvcmdldFB3ZDp0cnVlfSl9Lz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVuZGVyRm9yZ2V0UGFzc3dvcmQoKXtcbiAgICAgICAgdmFyIHt1c2VyLCBwaG9uZVZlcmlmaWVkLCBmb3JnZXRQd2R9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImZvcmdldFB3ZFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwiY29udGFjdFwiXG4gICAgICAgICAgICAgICAgICAgIG9uRW50ZXJLZXlEb3duPXt0aGlzLmZvcmdldFBhc3N3b3JkLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0gaGludFRleHQ9XCJwaG9uZSBudW1iZXIgb3IgZW1haWxcIi8+XG5cbiAgICAgICAgICAgICAgICA8Y2VudGVyPlxuICAgICAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2VuZCBtZVwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmZvcmdldFBhc3N3b3JkLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LCBmb3JnZXRQd2Q6dW5kZWZpbmVkfSl9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6dW5kZWZpbmVkLGZvcmdldFB3ZDp1bmRlZmluZWR9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVuZGVyUmVzZXRQYXNzd29yZCgpe1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicmVzZXRcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cIm9sZFBhc3N3b3JkXCIgaGludFRleHQ9XCJvbGQgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIG9uRW50ZXJLZXlEb3duPXt0aGlzLnJlc2V0UGFzc3dvcmQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUZXh0PXt0aGlzLnN0YXRlLnJlc2V0RXJyb3J9Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIG9uRW50ZXJLZXlEb3duPXt0aGlzLnJlc2V0UGFzc3dvcmQuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwicGFzc3dvcmQyXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbkVudGVyS2V5RG93bj17dGhpcy5yZXNldFBhc3N3b3JkLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cbiAgICAgICAgICAgICAgICA8Y2VudGVyPlxuICAgICAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIGxhYmVsPVwicmVzZXQgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5yZXNldFBhc3N3b3JkLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LCBmb3JnZXRQd2Q6dW5kZWZpbmVkfSl9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LGZvcmdldFB3ZDp0cnVlfSl9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5jbGFzcyBTTVNSZXF1ZXN0IGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e3Bob25lOm51bGwsdGljazpudWxsfVxuICAgIH1cbiAgICByZXF1ZXN0VmVyaWZpY2F0aW9uKCl7XG4gICAgICAgIHRoaXMudGljaygpXG4gICAgICAgIFVzZXIucmVxdWVzdFZlcmlmaWNhdGlvbih0aGlzLnN0YXRlLnBob25lKVxuICAgIH1cbiAgICB0aWNrKCl7XG4gICAgICAgIHZhciBpPTAsIGRvVGljaztcbiAgICAgICAgdGhpcy5fdD1zZXRJbnRlcnZhbChkb1RpY2s9KCk9PntcbiAgICAgICAgICAgIGlmKGk9PTYwKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6KytpfSlcbiAgICAgICAgfSwxMDAwKTtcblxuICAgICAgICBkb1RpY2soKVxuICAgIH1cbiAgICBzdGF0aWMgaXNQaG9uZSh2KXtcbiAgICAgICAgcmV0dXJuICgvXihcXCtcXGR7Mn0pP1xcZHsxMX0kL2cpLnRlc3QodilcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICBpZih0aGlzLl90KVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgIH1cbiAgICBjaGFuZ2VQaG9uZShlKXtcbiAgICAgICAgdmFyIHBob25lPWUudGFyZ2V0LnZhbHVlXG4gICAgICAgIGlmKFNNU1JlcXVlc3QuaXNQaG9uZShwaG9uZSkpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwaG9uZTpwaG9uZX0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBidXR0b25cbiAgICAgICAgaWYoU01TUmVxdWVzdC5pc1Bob25lKHRoaXMuc3RhdGUucGhvbmUpKXtcbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUudGljaylcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aGlzLnN0YXRlLnRpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RoaXMuc3RhdGUudGljaz09PTAgPyBcInJlc2VuZFwiIDogXCJzZW5kXCJ9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnJlcXVlc3RWZXJpZmljYXRpb24oKX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtc3JlcXVlc3RcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBob25lXCIgaGludFRleHQ9XCJwaG9uZSBudW1iZXIgKGRlZmF1bHQgKzg2KVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnBob25lfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT50aGlzLmNoYW5nZVBob25lKGUpfS8+XG4gICAgICAgICAgICAgICAge2J1dHRvbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5BY2NvdW50LlNNU1JlcXVlc3Q9U01TUmVxdWVzdFxuIl19