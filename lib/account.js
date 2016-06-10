'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _user = require('./db/user');

var _user2 = _interopRequireDefault(_user);

var _messager = require('./components/messager');

var _messager2 = _interopRequireDefault(_messager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ENTER = 13;

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
                _messager2.default.show("phone must be specified");
                return;
            }
            _user2.default.verifyPhone(phone, code).then(function () {
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
                _messager2.default.show("user name, password cannot be empty");
                return;
            }

            if (password != password2) {
                _messager2.default.show("password not verified");
                return;
            }
            _user2.default.signup({ username: username, password: password }).catch(function (e) {
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
                _messager2.default.show("user name, password cannot be empty");
                return;
            }
            _user2.default.signin({ username: username, password: password }).catch(function (e) {
                _this4.setState({ signinError: e.message });
            });
        }
    }, {
        key: 'forgetPassword',
        value: function forgetPassword() {
            var contact = this.refs.contact.getValue();
            if (!contact.length) {
                _messager2.default.show("You have to give phone number or email to get new password");
                return;
            }
            _user2.default.requestPasswordReset(contact);
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

            return _react2.default.createElement(
                'div',
                { className: 'form', key: 'beforesignup' },
                _react2.default.createElement(SMSRequest, { ref: 'phone' }),
                _react2.default.createElement(_materialUi.TextField, { ref: 'code', hintText: 'verification code you just received',
                    fullWidth: true,
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this5.verifyPhone();
                    },
                    errorText: this.state.phoneVerifiedError }),
                _react2.default.createElement(
                    'center',
                    null,
                    _react2.default.createElement(_materialUi.RaisedButton, { label: 'verify', primary: true,
                        onClick: function onClick() {
                            return _this5.verifyPhone();
                        } })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'commands' },
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'already have an account',
                        onClick: function onClick() {
                            return _this5.setState({ user: _user2.default.current || {} });
                        } }),
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'forget password',
                        onClick: function onClick() {
                            return _this5.setState({ user: _user2.default.current || {}, forgetPwd: true });
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

            return _react2.default.createElement(
                'div',
                { className: 'form', key: 'signup' },
                _react2.default.createElement(_materialUi.TextField, { ref: 'username', hintText: 'login name',
                    fullWidth: true,
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this6.signup();
                    },
                    errorText: this.state.signupError }),
                _react2.default.createElement(_materialUi.TextField, { ref: 'password',
                    fullWidth: true,
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this6.signup();
                    },
                    type: 'password', hintText: 'password' }),
                _react2.default.createElement(_materialUi.TextField, { ref: 'password2',
                    fullWidth: true,
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this6.signup();
                    },
                    type: 'password', hintText: 'password again' }),
                _react2.default.createElement(
                    'center',
                    null,
                    _react2.default.createElement(_materialUi.RaisedButton, { label: 'sign up', primary: true,
                        onClick: this.signup.bind(this) })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'commands' },
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'already have an account',
                        onClick: function onClick() {
                            return _this6.setState({ user: _user2.default.current || {} });
                        } }),
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'forget password',
                        onClick: function onClick() {
                            return _this6.setState({ user: _user2.default.current || {}, forgetPwd: true });
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

            return _react2.default.createElement(
                'div',
                { className: 'form', key: 'signin' },
                _react2.default.createElement(_materialUi.TextField, { ref: 'username',
                    hintText: 'login name or phone number',
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this7.signin();
                    },
                    fullWidth: true,
                    errorText: this.state.signinError }),
                _react2.default.createElement(_materialUi.TextField, { ref: 'password',
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this7.signin();
                    },
                    fullWidth: true,
                    type: 'password', hintText: 'password' }),
                _react2.default.createElement(
                    'center',
                    null,
                    _react2.default.createElement(_materialUi.RaisedButton, { label: 'sign in', primary: true,
                        onClick: this.signin.bind(this) })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'commands' },
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'no account',
                        onClick: function onClick() {
                            return _this7.setState({ user: undefined });
                        } }),
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'forget password',
                        onClick: function onClick() {
                            return _this7.setState({ user: _user2.default.current || {}, forgetPwd: true });
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

            return _react2.default.createElement(
                'div',
                { className: 'form', key: 'forgetPwd' },
                _react2.default.createElement(_materialUi.TextField, { ref: 'contact',
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this8.forgetPassword();
                    },
                    fullWidth: true, hintText: 'phone number or email' }),
                _react2.default.createElement(
                    'center',
                    null,
                    _react2.default.createElement(_materialUi.RaisedButton, { label: 'send me', primary: true,
                        onClick: this.forgetPassword.bind(this) })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'commands' },
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'sign in',
                        onClick: function onClick() {
                            return _this8.setState({ user: _user2.default.current || {}, forgetPwd: undefined });
                        } }),
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'sign up',
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

            return _react2.default.createElement(
                'div',
                { className: 'form', key: 'reset' },
                _react2.default.createElement(_materialUi.TextField, { ref: 'oldPassword', hintText: 'old password',
                    fullWidth: true,
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this9.resetPassword();
                    },
                    errorText: this.state.resetError }),
                _react2.default.createElement(_materialUi.TextField, { ref: 'password',
                    fullWidth: true,
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this9.resetPassword();
                    },
                    type: 'password', hintText: 'password' }),
                _react2.default.createElement(_materialUi.TextField, { ref: 'password2',
                    fullWidth: true,
                    onKeyDown: function onKeyDown(e) {
                        e.keyCode == ENTER && _this9.resetPassword();
                    },
                    type: 'password', hintText: 'password again' }),
                _react2.default.createElement(
                    'center',
                    null,
                    _react2.default.createElement(_materialUi.RaisedButton, { label: 'reset password', primary: true,
                        onClick: this.resetPassword.bind(this) })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'commands' },
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'sign in',
                        onClick: function onClick() {
                            return _this9.setState({ user: _user2.default.current || {}, forgetPwd: undefined });
                        } }),
                    _react2.default.createElement(_materialUi.FlatButton, { label: 'forget password',
                        onClick: function onClick() {
                            return _this9.setState({ user: _user2.default.current || {}, forgetPwd: true });
                        } })
                )
            );
        }
    }]);

    return Account;
}(_react.Component);

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
            _user2.default.requestVerification(this.state.phone);
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
            var phone = this.state.phone;

            if (SMSRequest.isPhone(this.state.phone)) {
                if (this.state.tick) button = _react2.default.createElement(_materialUi.FlatButton, { label: this.state.tick, disabled: true });else button = _react2.default.createElement(_materialUi.FlatButton, { label: this.state.tick === 0 ? "resend" : "send",
                    onClick: function onClick() {
                        return _this12.requestVerification();
                    } });
            }

            return _react2.default.createElement(
                'div',
                { className: 'smsrequest' },
                _react2.default.createElement(_materialUi.TextField, { ref: 'phone', hintText: 'phone number (default +86)',
                    value: phone || "",
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
}(_react.Component);

Account.SMSRequest = SMSRequest;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFSLENBREosS0FHSSxTQUFRLHdEQUFZLE9BQU8sS0FBSyxLQUFMLENBQVcsSUFBWCxLQUFrQixDQUFsQixHQUFzQixRQUF0QixHQUFpQyxNQUFqQztBQUN2Qiw2QkFBUzsrQkFBSSxRQUFLLG1CQUFMO3FCQUFKLEVBREwsQ0FBUixDQUhKO2FBREo7O0FBUUEsbUJBQ0k7O2tCQUFLLFdBQVUsWUFBVixFQUFMO2dCQUNJLHVEQUFXLEtBQUksT0FBSixFQUFZLFVBQVMsNEJBQVQ7QUFDbkIsMkJBQU8sU0FBTyxFQUFQO0FBQ1AsOEJBQVUsa0JBQUMsQ0FBRDsrQkFBSyxRQUFLLFdBQUwsQ0FBaUIsQ0FBakI7cUJBQUwsRUFGZCxDQURKO2dCQUlLLE1BSkw7YUFESixDQVhJOzs7O2dDQWRPLEdBQUU7QUFDYixtQkFBTyx1QkFBd0IsSUFBeEIsQ0FBNkIsQ0FBN0IsQ0FBUDtjQURhOzs7O1dBckJmOzs7QUF5RE4sUUFBUSxVQUFSLEdBQW1CLFVBQW5CIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtUZXh0RmllbGQsRmxhdEJ1dHRvbiwgUmFpc2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBVc2VyIGZyb20gJy4vZGIvdXNlcidcbmltcG9ydCBNZXNzYWdlciBmcm9tICcuL2NvbXBvbmVudHMvbWVzc2FnZXInXG5cbmNvbnN0IEVOVEVSPTEzXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY291bnQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17dXNlcjp0aGlzLnByb3BzLnVzZXJ9XG4gICAgfVxuXG4gICAgdmVyaWZ5UGhvbmUoKXtcbiAgICAgICAgdmFyIHBob25lPXRoaXMucmVmcy5waG9uZS5zdGF0ZS5waG9uZSxcbiAgICAgICAgICAgIGNvZGU9dGhpcy5yZWZzLmNvZGUuZ2V0VmFsdWUoKTtcbiAgICAgICAgaWYoIXBob25lLmxlbmd0aCB8fCAhY29kZS5sZW5ndGgpe1xuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcInBob25lIG11c3QgYmUgc3BlY2lmaWVkXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBVc2VyLnZlcmlmeVBob25lKHBob25lLCBjb2RlKVxuICAgICAgICAgICAgLnRoZW4oKCk9PnRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWQ6dHJ1ZX0pKVxuICAgICAgICAgICAgLmNhdGNoKGU9PnRoaXMuc2V0U3RhdGUoe3Bob25lVmVyaWZpZWRFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG4gICAgc2lnbnVwKCl7XG4gICAgICAgIHZhcnt1c2VybmFtZSxwYXNzd29yZCxwYXNzd29yZDJ9PXRoaXMucmVmc1xuICAgICAgICB1c2VybmFtZT11c2VybmFtZS5nZXRWYWx1ZSgpXG4gICAgICAgIHBhc3N3b3JkPXBhc3N3b3JkLmdldFZhbHVlKClcbiAgICAgICAgcGFzc3dvcmQyPXBhc3N3b3JkMi5nZXRWYWx1ZSgpXG4gICAgICAgIGlmKCF1c2VybmFtZS5sZW5ndGggfHwgIXBhc3N3b3JkLmxlbmd0aCB8fCFwYXNzd29yZDIubGVuZ3RoKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLnNob3coXCJ1c2VyIG5hbWUsIHBhc3N3b3JkIGNhbm5vdCBiZSBlbXB0eVwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZihwYXNzd29yZCE9cGFzc3dvcmQyKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLnNob3coXCJwYXNzd29yZCBub3QgdmVyaWZpZWRcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFVzZXIuc2lnbnVwKHt1c2VybmFtZSxwYXNzd29yZH0pXG4gICAgICAgICAgICAuY2F0Y2goKGUpPT50aGlzLnNldFN0YXRlKHtzaWdudXBFcnJvcjplLm1lc3NhZ2V9KSlcbiAgICB9XG4gICAgc2lnbmluKCl7XG4gICAgICAgIHZhcnt1c2VybmFtZSxwYXNzd29yZH09dGhpcy5yZWZzXG4gICAgICAgIHVzZXJuYW1lPXVzZXJuYW1lLmdldFZhbHVlKClcbiAgICAgICAgcGFzc3dvcmQ9cGFzc3dvcmQuZ2V0VmFsdWUoKVxuICAgICAgICBpZighdXNlcm5hbWUubGVuZ3RoIHx8ICFwYXNzd29yZC5sZW5ndGgpe1xuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcInVzZXIgbmFtZSwgcGFzc3dvcmQgY2Fubm90IGJlIGVtcHR5XCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBVc2VyLnNpZ25pbih7dXNlcm5hbWUscGFzc3dvcmR9KVxuICAgICAgICAgICAgLmNhdGNoKChlKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NpZ25pbkVycm9yOmUubWVzc2FnZX0pXG4gICAgICAgICAgICB9KVxuICAgIH1cbiAgICBmb3JnZXRQYXNzd29yZCgpe1xuICAgICAgICBsZXQgY29udGFjdD10aGlzLnJlZnMuY29udGFjdC5nZXRWYWx1ZSgpXG4gICAgICAgIGlmKCFjb250YWN0Lmxlbmd0aCl7XG4gICAgICAgICAgICBNZXNzYWdlci5zaG93KFwiWW91IGhhdmUgdG8gZ2l2ZSBwaG9uZSBudW1iZXIgb3IgZW1haWwgdG8gZ2V0IG5ldyBwYXNzd29yZFwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgVXNlci5yZXF1ZXN0UGFzc3dvcmRSZXNldChjb250YWN0KVxuICAgIH1cblxuICAgIHJlc2V0UGFzc3dvcmQoKXtcblxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3VzZXIsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZCwgcmVzZXRQYXNzd29yZH09dGhpcy5zdGF0ZVxuICAgICAgICBpZighdXNlcil7XG4gICAgICAgICAgICBpZihwaG9uZVZlcmlmaWVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2lnbnVwKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJCZWZvcmVTaWdudXAoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBpZihmb3JnZXRQd2Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJGb3JnZXRQYXNzd29yZCgpXG4gICAgICAgICAgICB9ZWxzZSBpZihyZXNldFBhc3N3b3JkKXtcbiAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLl9yZW5kZXJSZXNldFBhc3N3b3JkKClcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJTaWduaW4oKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3JlbmRlckJlZm9yZVNpZ251cCgpe1xuICAgICAgICB2YXIge3VzZXIsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwiYmVmb3Jlc2lnbnVwXCI+XG4gICAgICAgICAgICAgICAgPFNNU1JlcXVlc3QgcmVmPVwicGhvbmVcIi8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJjb2RlXCIgaGludFRleHQ9XCJ2ZXJpZmljYXRpb24gY29kZSB5b3UganVzdCByZWNlaXZlZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnZlcmlmeVBob25lKCl9fVxuICAgICAgICAgICAgICAgICAgICBlcnJvclRleHQ9e3RoaXMuc3RhdGUucGhvbmVWZXJpZmllZEVycm9yfS8+XG4gICAgICAgICAgICAgICAgPGNlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPFJhaXNlZEJ1dHRvbiBsYWJlbD1cInZlcmlmeVwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy52ZXJpZnlQaG9uZSgpfS8+XG4gICAgICAgICAgICAgICAgPC9jZW50ZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e319KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sZm9yZ2V0UHdkOnRydWV9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVuZGVyU2lnbnVwKCl7XG4gICAgICAgIHZhciB7dXNlciwgcGhvbmVWZXJpZmllZCwgZm9yZ2V0UHdkfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWdudXBcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInVzZXJuYW1lXCIgaGludFRleHQ9XCJsb2dpbiBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHRoaXMuc2lnbnVwKCl9fVxuICAgICAgICAgICAgICAgICAgICBlcnJvclRleHQ9e3RoaXMuc3RhdGUuc2lnbnVwRXJyb3J9Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgdGhpcy5zaWdudXAoKX19XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBhc3N3b3JkMlwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnNpZ251cCgpfX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIHVwXCIgcHJpbWFyeT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2lnbnVwLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiYWxyZWFkeSBoYXZlIGFuIGFjY291bnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6VXNlci5jdXJyZW50fHx7fX0pfS8+XG5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6VXNlci5jdXJyZW50fHx7fSxmb3JnZXRQd2Q6dHJ1ZX0pfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9yZW5kZXJTaWduaW4oKXtcbiAgICAgICAgdmFyIHt1c2VyLCBwaG9uZVZlcmlmaWVkLCBmb3JnZXRQd2R9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cInNpZ25pblwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwidXNlcm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBoaW50VGV4dD1cImxvZ2luIG5hbWUgb3IgcGhvbmUgbnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnNpZ25pbigpfX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBlcnJvclRleHQ9e3RoaXMuc3RhdGUuc2lnbmluRXJyb3J9Lz5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgdGhpcy5zaWduaW4oKX19XG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzaWduIGluXCIgcHJpbWFyeT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuc2lnbmluLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwibm8gYWNjb3VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6dW5kZWZpbmVkfSl9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LGZvcmdldFB3ZDp0cnVlfSl9Lz5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVuZGVyRm9yZ2V0UGFzc3dvcmQoKXtcbiAgICAgICAgdmFyIHt1c2VyLCBwaG9uZVZlcmlmaWVkLCBmb3JnZXRQd2R9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImZvcmdldFB3ZFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwiY29udGFjdFwiXG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgdGhpcy5mb3JnZXRQYXNzd29yZCgpfX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfSBoaW50VGV4dD1cInBob25lIG51bWJlciBvciBlbWFpbFwiLz5cblxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJzZW5kIG1lXCIgcHJpbWFyeT17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuZm9yZ2V0UGFzc3dvcmQuYmluZCh0aGlzKX0vPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sIGZvcmdldFB3ZDp1bmRlZmluZWR9KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjp1bmRlZmluZWQsZm9yZ2V0UHdkOnVuZGVmaW5lZH0pfS8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIF9yZW5kZXJSZXNldFBhc3N3b3JkKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJyZXNldFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwib2xkUGFzc3dvcmRcIiBoaW50VGV4dD1cIm9sZCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnJlc2V0UGFzc3dvcmQoKX19XG4gICAgICAgICAgICAgICAgICAgIGVycm9yVGV4dD17dGhpcy5zdGF0ZS5yZXNldEVycm9yfS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHRoaXMucmVzZXRQYXNzd29yZCgpfX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwicGFzc3dvcmQyXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHRoaXMucmVzZXRQYXNzd29yZCgpfX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZCBhZ2FpblwiLz5cblxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJyZXNldCBwYXNzd29yZFwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnJlc2V0UGFzc3dvcmQuYmluZCh0aGlzKX0vPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJzaWduIGluXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sIGZvcmdldFB3ZDp1bmRlZmluZWR9KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sZm9yZ2V0UHdkOnRydWV9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNsYXNzIFNNU1JlcXVlc3QgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17cGhvbmU6bnVsbCx0aWNrOm51bGx9XG4gICAgfVxuICAgIHJlcXVlc3RWZXJpZmljYXRpb24oKXtcbiAgICAgICAgdGhpcy50aWNrKClcbiAgICAgICAgVXNlci5yZXF1ZXN0VmVyaWZpY2F0aW9uKHRoaXMuc3RhdGUucGhvbmUpXG4gICAgfVxuICAgIHRpY2soKXtcbiAgICAgICAgdmFyIGk9MCwgZG9UaWNrO1xuICAgICAgICB0aGlzLl90PXNldEludGVydmFsKGRvVGljaz0oKT0+e1xuICAgICAgICAgICAgaWYoaT09NjApe1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOiAwfSlcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazorK2l9KVxuICAgICAgICB9LDEwMDApO1xuXG4gICAgICAgIGRvVGljaygpXG4gICAgfVxuICAgIHN0YXRpYyBpc1Bob25lKHYpe1xuICAgICAgICByZXR1cm4gKC9eKFxcK1xcZHsyfSk/XFxkezExfSQvZykudGVzdCh2KVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGlmKHRoaXMuX3QpXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgfVxuICAgIGNoYW5nZVBob25lKGUpe1xuICAgICAgICB2YXIgcGhvbmU9ZS50YXJnZXQudmFsdWVcbiAgICAgICAgaWYoU01TUmVxdWVzdC5pc1Bob25lKHBob25lKSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Bob25lOnBob25lfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGJ1dHRvblxuICAgICAgICAgICAgLHtwaG9uZX09dGhpcy5zdGF0ZVxuICAgICAgICBpZihTTVNSZXF1ZXN0LmlzUGhvbmUodGhpcy5zdGF0ZS5waG9uZSkpe1xuICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS50aWNrKVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RoaXMuc3RhdGUudGlja30gZGlzYWJsZWQ9e3RydWV9Lz4pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGhpcy5zdGF0ZS50aWNrPT09MCA/IFwicmVzZW5kXCIgOiBcInNlbmRcIn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMucmVxdWVzdFZlcmlmaWNhdGlvbigpfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic21zcmVxdWVzdFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwicGhvbmVcIiBoaW50VGV4dD1cInBob25lIG51bWJlciAoZGVmYXVsdCArODYpXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Bob25lfHxcIlwifVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT50aGlzLmNoYW5nZVBob25lKGUpfS8+XG4gICAgICAgICAgICAgICAge2J1dHRvbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5BY2NvdW50LlNNU1JlcXVlc3Q9U01TUmVxdWVzdFxuIl19