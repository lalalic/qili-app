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
        value: function changePhone() {
            var phone = this.refs.phone.getValue();
            if (SMSRequest.isPhone(phone)) this.setState({ phone: phone });else this.setState({ phone: undefined });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this12 = this;

            var button;
            var _state6 = this.state;
            var phone = _state6.phone;
            var tick = _state6.tick;

            if (SMSRequest.isPhone(this.state.phone)) {
                if (this.state.tick) button = _react2.default.createElement(_materialUi.FlatButton, { label: tick, disabled: true });else button = _react2.default.createElement(_materialUi.FlatButton, { label: tick === 0 ? "resend" : "send",
                    onClick: function onClick() {
                        return _this12.requestVerification();
                    } });
            }

            return _react2.default.createElement(
                'div',
                { className: 'smsrequest' },
                _react2.default.createElement(_materialUi.TextField, { ref: 'phone', hintText: 'phone number (default +86)',
                    disabled: !!tick,
                    onChange: function onChange(e) {
                        return _this12.changePhone();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLFFBQU0sRUFBTjs7SUFFZTs7O0FBQ2pCLGFBRGlCLE9BQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxTQUNDOzsyRUFERCxvQkFFUCxRQURROztBQUVkLGNBQUssS0FBTCxHQUFXLEVBQUMsTUFBSyxNQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQWpCLENBRmM7O0tBQWxCOztpQkFEaUI7O3NDQU1KOzs7QUFDVCxnQkFBSSxRQUFNLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsS0FBaEIsQ0FBc0IsS0FBdEI7Z0JBQ04sT0FBSyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsUUFBZixFQUFMLENBRks7QUFHVCxnQkFBRyxDQUFDLE1BQU0sTUFBTixJQUFnQixDQUFDLEtBQUssTUFBTCxFQUFZO0FBQzdCLG1DQUFTLElBQVQsQ0FBYyx5QkFBZCxFQUQ2QjtBQUU3Qix1QkFGNkI7YUFBakM7QUFJQSwyQkFBSyxXQUFMLENBQWlCLEtBQWpCLEVBQXdCLElBQXhCLEVBQ0ssSUFETCxDQUNVO3VCQUFJLE9BQUssUUFBTCxDQUFjLEVBQUMsZUFBYyxJQUFkLEVBQWY7YUFBSixDQURWLENBRUssS0FGTCxDQUVXO3VCQUFHLE9BQUssUUFBTCxDQUFjLEVBQUMsb0JBQW1CLEVBQUUsT0FBRixFQUFsQzthQUFILENBRlgsQ0FQUzs7OztpQ0FXTDs7O3dCQUM2QixLQUFLLElBQUwsQ0FEN0I7Z0JBQ0EsMEJBREE7Z0JBQ1MsMEJBRFQ7Z0JBQ2tCLDRCQURsQjs7QUFFSix1QkFBUyxTQUFTLFFBQVQsRUFBVCxDQUZJO0FBR0osdUJBQVMsU0FBUyxRQUFULEVBQVQsQ0FISTtBQUlKLHdCQUFVLFVBQVUsUUFBVixFQUFWLENBSkk7QUFLSixnQkFBRyxDQUFDLFNBQVMsTUFBVCxJQUFtQixDQUFDLFNBQVMsTUFBVCxJQUFrQixDQUFDLFVBQVUsTUFBVixFQUFpQjtBQUN4RCxtQ0FBUyxJQUFULENBQWMscUNBQWQsRUFEd0Q7QUFFeEQsdUJBRndEO2FBQTVEOztBQUtBLGdCQUFHLFlBQVUsU0FBVixFQUFvQjtBQUNuQixtQ0FBUyxJQUFULENBQWMsdUJBQWQsRUFEbUI7QUFFbkIsdUJBRm1CO2FBQXZCO0FBSUEsMkJBQUssTUFBTCxDQUFZLEVBQUMsa0JBQUQsRUFBVSxrQkFBVixFQUFaLEVBQ0ssS0FETCxDQUNXLFVBQUMsQ0FBRDt1QkFBSyxPQUFLLFFBQUwsQ0FBYyxFQUFDLGFBQVksRUFBRSxPQUFGLEVBQTNCO2FBQUwsQ0FEWCxDQWRJOzs7O2lDQWlCQTs7O3lCQUNtQixLQUFLLElBQUwsQ0FEbkI7Z0JBQ0EsMkJBREE7Z0JBQ1MsMkJBRFQ7O0FBRUosdUJBQVMsU0FBUyxRQUFULEVBQVQsQ0FGSTtBQUdKLHVCQUFTLFNBQVMsUUFBVCxFQUFULENBSEk7QUFJSixnQkFBRyxDQUFDLFNBQVMsTUFBVCxJQUFtQixDQUFDLFNBQVMsTUFBVCxFQUFnQjtBQUNwQyxtQ0FBUyxJQUFULENBQWMscUNBQWQsRUFEb0M7QUFFcEMsdUJBRm9DO2FBQXhDO0FBSUEsMkJBQUssTUFBTCxDQUFZLEVBQUMsa0JBQUQsRUFBVSxrQkFBVixFQUFaLEVBQ0ssS0FETCxDQUNXLFVBQUMsQ0FBRCxFQUFLO0FBQ1IsdUJBQUssUUFBTCxDQUFjLEVBQUMsYUFBWSxFQUFFLE9BQUYsRUFBM0IsRUFEUTthQUFMLENBRFgsQ0FSSTs7Ozt5Q0FhUTtBQUNaLGdCQUFJLFVBQVEsS0FBSyxJQUFMLENBQVUsT0FBVixDQUFrQixRQUFsQixFQUFSLENBRFE7QUFFWixnQkFBRyxDQUFDLFFBQVEsTUFBUixFQUFlO0FBQ2YsbUNBQVMsSUFBVCxDQUFjLDREQUFkLEVBRGU7QUFFZix1QkFGZTthQUFuQjtBQUlBLDJCQUFLLG9CQUFMLENBQTBCLE9BQTFCLEVBTlk7Ozs7d0NBU0Q7OztpQ0FJUDt5QkFDZ0QsS0FBSyxLQUFMLENBRGhEO2dCQUNDLG1CQUREO2dCQUNPLHFDQURQO2dCQUNzQiw2QkFEdEI7Z0JBQ2lDLHFDQURqQzs7QUFFSixnQkFBRyxDQUFDLElBQUQsRUFBTTtBQUNMLG9CQUFHLGFBQUgsRUFBaUI7QUFDYiwyQkFBTyxLQUFLLGFBQUwsRUFBUCxDQURhO2lCQUFqQixNQUVLO0FBQ0QsMkJBQU8sS0FBSyxtQkFBTCxFQUFQLENBREM7aUJBRkw7YUFESixNQU1NO0FBQ0Ysb0JBQUcsU0FBSCxFQUFhO0FBQ1QsMkJBQU8sS0FBSyxxQkFBTCxFQUFQLENBRFM7aUJBQWIsTUFFTSxJQUFHLGFBQUgsRUFBaUI7O2lCQUFqQixNQUVEO0FBQ0QsK0JBQU8sS0FBSyxhQUFMLEVBQVAsQ0FEQztxQkFGQzthQVRWOzs7OzhDQWlCaUI7OzswQkFDb0IsS0FBSyxLQUFMLENBRHBCO2dCQUNaLG9CQURZO2dCQUNOLHNDQURNO2dCQUNTLDhCQURUOztBQUVqQixtQkFDSTs7a0JBQUssV0FBVSxNQUFWLEVBQWlCLEtBQUksY0FBSixFQUF0QjtnQkFDSSw4QkFBQyxVQUFELElBQVksS0FBSSxPQUFKLEVBQVosQ0FESjtnQkFFSSx1REFBVyxLQUFJLE1BQUosRUFBVyxVQUFTLHFDQUFUO0FBQ2xCLCtCQUFXLElBQVg7QUFDQSwrQkFBVyxzQkFBRztBQUFDLDBCQUFFLE9BQUYsSUFBVyxLQUFYLElBQW9CLE9BQUssV0FBTCxFQUFwQixDQUFEO3FCQUFIO0FBQ1gsK0JBQVcsS0FBSyxLQUFMLENBQVcsa0JBQVgsRUFIZixDQUZKO2dCQU1JOzs7b0JBQ0ksMERBQWMsT0FBTSxRQUFOLEVBQWUsU0FBUyxJQUFUO0FBQ3pCLGlDQUFTO21DQUFJLE9BQUssV0FBTDt5QkFBSixFQURiLENBREo7aUJBTko7Z0JBVUk7O3NCQUFLLFdBQVUsVUFBVixFQUFMO29CQUNJLHdEQUFZLE9BQU0seUJBQU47QUFDUixpQ0FBUzttQ0FBSSxPQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssZUFBSyxPQUFMLElBQWMsRUFBZCxFQUFwQjt5QkFBSixFQURiLENBREo7b0JBSUksd0RBQVksT0FBTSxpQkFBTjtBQUNSLGlDQUFTO21DQUFJLE9BQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxlQUFLLE9BQUwsSUFBYyxFQUFkLEVBQWlCLFdBQVUsSUFBVixFQUFyQzt5QkFBSixFQURiLENBSko7aUJBVko7YUFESixDQUZpQjs7Ozt3Q0F3Qk47OzswQkFDMEIsS0FBSyxLQUFMLENBRDFCO2dCQUNOLG9CQURNO2dCQUNBLHNDQURBO2dCQUNlLDhCQURmOztBQUVYLG1CQUNJOztrQkFBSyxXQUFVLE1BQVYsRUFBaUIsS0FBSSxRQUFKLEVBQXRCO2dCQUNJLHVEQUFXLEtBQUksVUFBSixFQUFlLFVBQVMsWUFBVDtBQUN0QiwrQkFBVyxJQUFYO0FBQ0EsK0JBQVcsc0JBQUc7QUFBQywwQkFBRSxPQUFGLElBQVcsS0FBWCxJQUFvQixPQUFLLE1BQUwsRUFBcEIsQ0FBRDtxQkFBSDtBQUNYLCtCQUFXLEtBQUssS0FBTCxDQUFXLFdBQVgsRUFIZixDQURKO2dCQU1JLHVEQUFXLEtBQUksVUFBSjtBQUNQLCtCQUFXLElBQVg7QUFDQSwrQkFBVyxzQkFBRztBQUFDLDBCQUFFLE9BQUYsSUFBVyxLQUFYLElBQW9CLE9BQUssTUFBTCxFQUFwQixDQUFEO3FCQUFIO0FBQ1gsMEJBQUssVUFBTCxFQUFnQixVQUFTLFVBQVQsRUFIcEIsQ0FOSjtnQkFXSSx1REFBVyxLQUFJLFdBQUo7QUFDUCwrQkFBVyxJQUFYO0FBQ0EsK0JBQVcsc0JBQUc7QUFBQywwQkFBRSxPQUFGLElBQVcsS0FBWCxJQUFvQixPQUFLLE1BQUwsRUFBcEIsQ0FBRDtxQkFBSDtBQUNYLDBCQUFLLFVBQUwsRUFBZ0IsVUFBUyxnQkFBVCxFQUhwQixDQVhKO2dCQWdCSTs7O29CQUNJLDBEQUFjLE9BQU0sU0FBTixFQUFnQixTQUFTLElBQVQ7QUFDMUIsaUNBQVMsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFULEVBREosQ0FESjtpQkFoQko7Z0JBb0JJOztzQkFBSyxXQUFVLFVBQVYsRUFBTDtvQkFDSSx3REFBWSxPQUFNLHlCQUFOO0FBQ1IsaUNBQVM7bUNBQUksT0FBSyxRQUFMLENBQWMsRUFBQyxNQUFLLGVBQUssT0FBTCxJQUFjLEVBQWQsRUFBcEI7eUJBQUosRUFEYixDQURKO29CQUlJLHdEQUFZLE9BQU0saUJBQU47QUFDUixpQ0FBUzttQ0FBSSxPQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssZUFBSyxPQUFMLElBQWMsRUFBZCxFQUFpQixXQUFVLElBQVYsRUFBckM7eUJBQUosRUFEYixDQUpKO2lCQXBCSjthQURKLENBRlc7Ozs7d0NBa0NBOzs7MEJBQzBCLEtBQUssS0FBTCxDQUQxQjtnQkFDTixvQkFETTtnQkFDQSxzQ0FEQTtnQkFDZSw4QkFEZjs7QUFFWCxtQkFDSTs7a0JBQUssV0FBVSxNQUFWLEVBQWlCLEtBQUksUUFBSixFQUF0QjtnQkFDSSx1REFBVyxLQUFJLFVBQUo7QUFDUCw4QkFBUyw0QkFBVDtBQUNBLCtCQUFXLHNCQUFHO0FBQUMsMEJBQUUsT0FBRixJQUFXLEtBQVgsSUFBb0IsT0FBSyxNQUFMLEVBQXBCLENBQUQ7cUJBQUg7QUFDWCwrQkFBVyxJQUFYO0FBQ0EsK0JBQVcsS0FBSyxLQUFMLENBQVcsV0FBWCxFQUpmLENBREo7Z0JBTUksdURBQVcsS0FBSSxVQUFKO0FBQ0gsK0JBQVcsc0JBQUc7QUFBQywwQkFBRSxPQUFGLElBQVcsS0FBWCxJQUFvQixPQUFLLE1BQUwsRUFBcEIsQ0FBRDtxQkFBSDtBQUNYLCtCQUFXLElBQVg7QUFDQSwwQkFBSyxVQUFMLEVBQWdCLFVBQVMsVUFBVCxFQUh4QixDQU5KO2dCQVVJOzs7b0JBQ0ksMERBQWMsT0FBTSxTQUFOLEVBQWdCLFNBQVMsSUFBVDtBQUMxQixpQ0FBUyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQVQsRUFESixDQURKO2lCQVZKO2dCQWNJOztzQkFBSyxXQUFVLFVBQVYsRUFBTDtvQkFDSSx3REFBWSxPQUFNLFlBQU47QUFDSixpQ0FBUzttQ0FBSSxPQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssU0FBTCxFQUFmO3lCQUFKLEVBRGpCLENBREo7b0JBSUksd0RBQVksT0FBTSxpQkFBTjtBQUNSLGlDQUFTO21DQUFJLE9BQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxlQUFLLE9BQUwsSUFBYyxFQUFkLEVBQWlCLFdBQVUsSUFBVixFQUFyQzt5QkFBSixFQURiLENBSko7aUJBZEo7YUFESixDQUZXOzs7O2dEQTZCUTs7OzBCQUNrQixLQUFLLEtBQUwsQ0FEbEI7Z0JBQ2Qsb0JBRGM7Z0JBQ1Isc0NBRFE7Z0JBQ08sOEJBRFA7O0FBRW5CLG1CQUNJOztrQkFBSyxXQUFVLE1BQVYsRUFBaUIsS0FBSSxXQUFKLEVBQXRCO2dCQUNJLHVEQUFXLEtBQUksU0FBSjtBQUNQLCtCQUFXLHNCQUFHO0FBQUMsMEJBQUUsT0FBRixJQUFXLEtBQVgsSUFBb0IsT0FBSyxjQUFMLEVBQXBCLENBQUQ7cUJBQUg7QUFDWCwrQkFBVyxJQUFYLEVBQWlCLFVBQVMsdUJBQVQsRUFGckIsQ0FESjtnQkFLSTs7O29CQUNJLDBEQUFjLE9BQU0sU0FBTixFQUFnQixTQUFTLElBQVQ7QUFDMUIsaUNBQVMsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLElBQXpCLENBQVQsRUFESixDQURKO2lCQUxKO2dCQVNJOztzQkFBSyxXQUFVLFVBQVYsRUFBTDtvQkFDSSx3REFBWSxPQUFNLFNBQU47QUFDUixpQ0FBUzttQ0FBSSxPQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssZUFBSyxPQUFMLElBQWMsRUFBZCxFQUFrQixXQUFVLFNBQVYsRUFBdEM7eUJBQUosRUFEYixDQURKO29CQUlJLHdEQUFZLE9BQU0sU0FBTjtBQUNSLGlDQUFTO21DQUFJLE9BQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxTQUFMLEVBQWUsV0FBVSxTQUFWLEVBQTlCO3lCQUFKLEVBRGIsQ0FKSjtpQkFUSjthQURKLENBRm1COzs7OytDQXVCRDs7O0FBQ2xCLG1CQUNJOztrQkFBSyxXQUFVLE1BQVYsRUFBaUIsS0FBSSxPQUFKLEVBQXRCO2dCQUNJLHVEQUFXLEtBQUksYUFBSixFQUFrQixVQUFTLGNBQVQ7QUFDekIsK0JBQVcsSUFBWDtBQUNBLCtCQUFXLHNCQUFHO0FBQUMsMEJBQUUsT0FBRixJQUFXLEtBQVgsSUFBb0IsT0FBSyxhQUFMLEVBQXBCLENBQUQ7cUJBQUg7QUFDWCwrQkFBVyxLQUFLLEtBQUwsQ0FBVyxVQUFYLEVBSGYsQ0FESjtnQkFNSSx1REFBVyxLQUFJLFVBQUo7QUFDUCwrQkFBVyxJQUFYO0FBQ0EsK0JBQVcsc0JBQUc7QUFBQywwQkFBRSxPQUFGLElBQVcsS0FBWCxJQUFvQixPQUFLLGFBQUwsRUFBcEIsQ0FBRDtxQkFBSDtBQUNYLDBCQUFLLFVBQUwsRUFBZ0IsVUFBUyxVQUFULEVBSHBCLENBTko7Z0JBV0ksdURBQVcsS0FBSSxXQUFKO0FBQ1AsK0JBQVcsSUFBWDtBQUNBLCtCQUFXLHNCQUFHO0FBQUMsMEJBQUUsT0FBRixJQUFXLEtBQVgsSUFBb0IsT0FBSyxhQUFMLEVBQXBCLENBQUQ7cUJBQUg7QUFDWCwwQkFBSyxVQUFMLEVBQWdCLFVBQVMsZ0JBQVQsRUFIcEIsQ0FYSjtnQkFnQkk7OztvQkFDSSwwREFBYyxPQUFNLGdCQUFOLEVBQXVCLFNBQVMsSUFBVDtBQUNqQyxpQ0FBUyxLQUFLLGFBQUwsQ0FBbUIsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBVCxFQURKLENBREo7aUJBaEJKO2dCQW9CSTs7c0JBQUssV0FBVSxVQUFWLEVBQUw7b0JBQ0ksd0RBQVksT0FBTSxTQUFOO0FBQ1IsaUNBQVM7bUNBQUksT0FBSyxRQUFMLENBQWMsRUFBQyxNQUFLLGVBQUssT0FBTCxJQUFjLEVBQWQsRUFBa0IsV0FBVSxTQUFWLEVBQXRDO3lCQUFKLEVBRGIsQ0FESjtvQkFJSSx3REFBWSxPQUFNLGlCQUFOO0FBQ1IsaUNBQVM7bUNBQUksT0FBSyxRQUFMLENBQWMsRUFBQyxNQUFLLGVBQUssT0FBTCxJQUFjLEVBQWQsRUFBaUIsV0FBVSxJQUFWLEVBQXJDO3lCQUFKLEVBRGIsQ0FKSjtpQkFwQko7YUFESixDQURrQjs7OztXQTdMTDs7Ozs7SUErTmY7OztBQUNGLGFBREUsVUFDRixDQUFZLEtBQVosRUFBa0I7OEJBRGhCLFlBQ2dCOzs2RUFEaEIsdUJBRVEsUUFEUTs7QUFFZCxnQkFBSyxLQUFMLEdBQVcsRUFBQyxPQUFNLElBQU4sRUFBVyxNQUFLLElBQUwsRUFBdkIsQ0FGYzs7S0FBbEI7O2lCQURFOzs4Q0FLbUI7QUFDakIsaUJBQUssSUFBTCxHQURpQjtBQUVqQiwyQkFBSyxtQkFBTCxDQUF5QixLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQXpCLENBRmlCOzs7OytCQUlmOzs7QUFDRixnQkFBSSxJQUFFLENBQUY7Z0JBQUssTUFBVCxDQURFO0FBRUYsaUJBQUssRUFBTCxHQUFRLFlBQVksU0FBTyxrQkFBSTtBQUMzQixvQkFBRyxLQUFHLEVBQUgsRUFBTTtBQUNMLGtDQUFjLFFBQUssRUFBTCxDQUFkLENBREs7QUFFTCw0QkFBSyxRQUFMLENBQWMsRUFBQyxNQUFNLENBQU4sRUFBZixFQUZLO2lCQUFULE1BSUksUUFBSyxRQUFMLENBQWMsRUFBQyxNQUFLLEVBQUUsQ0FBRixFQUFwQixFQUpKO2FBRHVCLEVBTXpCLElBTk0sQ0FBUixDQUZFOztBQVVGLHFCQVZFOzs7OytDQWdCZ0I7QUFDbEIsZ0JBQUcsS0FBSyxFQUFMLEVBQ0MsY0FBYyxLQUFLLEVBQUwsQ0FBZCxDQURKOzs7O3NDQUdTO0FBQ1QsZ0JBQUksUUFBTSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLFFBQWhCLEVBQU4sQ0FESztBQUVULGdCQUFHLFdBQVcsT0FBWCxDQUFtQixLQUFuQixDQUFILEVBQ0ksS0FBSyxRQUFMLENBQWMsRUFBQyxPQUFNLEtBQU4sRUFBZixFQURKLEtBR0wsS0FBSyxRQUFMLENBQWMsRUFBQyxPQUFNLFNBQU4sRUFBZixFQUhLOzs7O2lDQU1JOzs7QUFDQSx1QkFEQTswQkFFZSxLQUFLLEtBQUwsQ0FGZjtnQkFFRSxzQkFGRjtnQkFFUyxvQkFGVDs7QUFHSixnQkFBRyxXQUFXLE9BQVgsQ0FBbUIsS0FBSyxLQUFMLENBQVcsS0FBWCxDQUF0QixFQUF3QztBQUNwQyxvQkFBRyxLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBQ0MsU0FBUSx3REFBWSxPQUFPLElBQVAsRUFBYSxVQUFVLElBQVYsRUFBekIsQ0FBUixDQURKLEtBR0ksU0FBUSx3REFBWSxPQUFPLFNBQU8sQ0FBUCxHQUFXLFFBQVgsR0FBc0IsTUFBdEI7QUFDdkIsNkJBQVM7K0JBQUksUUFBSyxtQkFBTDtxQkFBSixFQURMLENBQVIsQ0FISjthQURKOztBQVFBLG1CQUNJOztrQkFBSyxXQUFVLFlBQVYsRUFBTDtnQkFDSSx1REFBVyxLQUFJLE9BQUosRUFBWSxVQUFTLDRCQUFUO0FBQ2xDLDhCQUFVLENBQUMsQ0FBQyxJQUFEO0FBQ0ksOEJBQVUsa0JBQUMsQ0FBRDsrQkFBSyxRQUFLLFdBQUw7cUJBQUwsRUFGZCxDQURKO2dCQUlLLE1BSkw7YUFESixDQVhJOzs7O2dDQWhCTyxHQUFFO0FBQ2IsbUJBQU8sdUJBQXdCLElBQXhCLENBQTZCLENBQTdCLENBQVA7Y0FEYTs7OztXQXJCZjs7O0FBMkROLFFBQVEsVUFBUixHQUFtQixVQUFuQiIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7VGV4dEZpZWxkLEZsYXRCdXR0b24sIFJhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgVXNlciBmcm9tICcuL2RiL3VzZXInXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSAnLi9jb21wb25lbnRzL21lc3NhZ2VyJ1xuXG5jb25zdCBFTlRFUj0xM1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e3VzZXI6dGhpcy5wcm9wcy51c2VyfVxuICAgIH1cblxuICAgIHZlcmlmeVBob25lKCl7XG4gICAgICAgIHZhciBwaG9uZT10aGlzLnJlZnMucGhvbmUuc3RhdGUucGhvbmUsXG4gICAgICAgICAgICBjb2RlPXRoaXMucmVmcy5jb2RlLmdldFZhbHVlKCk7XG4gICAgICAgIGlmKCFwaG9uZS5sZW5ndGggfHwgIWNvZGUubGVuZ3RoKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLnNob3coXCJwaG9uZSBtdXN0IGJlIHNwZWNpZmllZFwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgVXNlci52ZXJpZnlQaG9uZShwaG9uZSwgY29kZSlcbiAgICAgICAgICAgIC50aGVuKCgpPT50aGlzLnNldFN0YXRlKHtwaG9uZVZlcmlmaWVkOnRydWV9KSlcbiAgICAgICAgICAgIC5jYXRjaChlPT50aGlzLnNldFN0YXRlKHtwaG9uZVZlcmlmaWVkRXJyb3I6ZS5tZXNzYWdlfSkpXG4gICAgfVxuICAgIHNpZ251cCgpe1xuICAgICAgICB2YXJ7dXNlcm5hbWUscGFzc3dvcmQscGFzc3dvcmQyfT10aGlzLnJlZnNcbiAgICAgICAgdXNlcm5hbWU9dXNlcm5hbWUuZ2V0VmFsdWUoKVxuICAgICAgICBwYXNzd29yZD1wYXNzd29yZC5nZXRWYWx1ZSgpXG4gICAgICAgIHBhc3N3b3JkMj1wYXNzd29yZDIuZ2V0VmFsdWUoKVxuICAgICAgICBpZighdXNlcm5hbWUubGVuZ3RoIHx8ICFwYXNzd29yZC5sZW5ndGggfHwhcGFzc3dvcmQyLmxlbmd0aCl7XG4gICAgICAgICAgICBNZXNzYWdlci5zaG93KFwidXNlciBuYW1lLCBwYXNzd29yZCBjYW5ub3QgYmUgZW1wdHlcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgaWYocGFzc3dvcmQhPXBhc3N3b3JkMil7XG4gICAgICAgICAgICBNZXNzYWdlci5zaG93KFwicGFzc3dvcmQgbm90IHZlcmlmaWVkXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBVc2VyLnNpZ251cCh7dXNlcm5hbWUscGFzc3dvcmR9KVxuICAgICAgICAgICAgLmNhdGNoKChlKT0+dGhpcy5zZXRTdGF0ZSh7c2lnbnVwRXJyb3I6ZS5tZXNzYWdlfSkpXG4gICAgfVxuICAgIHNpZ25pbigpe1xuICAgICAgICB2YXJ7dXNlcm5hbWUscGFzc3dvcmR9PXRoaXMucmVmc1xuICAgICAgICB1c2VybmFtZT11c2VybmFtZS5nZXRWYWx1ZSgpXG4gICAgICAgIHBhc3N3b3JkPXBhc3N3b3JkLmdldFZhbHVlKClcbiAgICAgICAgaWYoIXVzZXJuYW1lLmxlbmd0aCB8fCAhcGFzc3dvcmQubGVuZ3RoKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLnNob3coXCJ1c2VyIG5hbWUsIHBhc3N3b3JkIGNhbm5vdCBiZSBlbXB0eVwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgVXNlci5zaWduaW4oe3VzZXJuYW1lLHBhc3N3b3JkfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtzaWduaW5FcnJvcjplLm1lc3NhZ2V9KVxuICAgICAgICAgICAgfSlcbiAgICB9XG4gICAgZm9yZ2V0UGFzc3dvcmQoKXtcbiAgICAgICAgbGV0IGNvbnRhY3Q9dGhpcy5yZWZzLmNvbnRhY3QuZ2V0VmFsdWUoKVxuICAgICAgICBpZighY29udGFjdC5sZW5ndGgpe1xuICAgICAgICAgICAgTWVzc2FnZXIuc2hvdyhcIllvdSBoYXZlIHRvIGdpdmUgcGhvbmUgbnVtYmVyIG9yIGVtYWlsIHRvIGdldCBuZXcgcGFzc3dvcmRcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFVzZXIucmVxdWVzdFBhc3N3b3JkUmVzZXQoY29udGFjdClcbiAgICB9XG5cbiAgICByZXNldFBhc3N3b3JkKCl7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHt1c2VyLCBwaG9uZVZlcmlmaWVkLCBmb3JnZXRQd2QsIHJlc2V0UGFzc3dvcmR9PXRoaXMuc3RhdGVcbiAgICAgICAgaWYoIXVzZXIpe1xuICAgICAgICAgICAgaWYocGhvbmVWZXJpZmllZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlbmRlclNpZ251cCgpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyQmVmb3JlU2lnbnVwKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgaWYoZm9yZ2V0UHdkKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyRm9yZ2V0UGFzc3dvcmQoKVxuICAgICAgICAgICAgfWVsc2UgaWYocmVzZXRQYXNzd29yZCl7XG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5fcmVuZGVyUmVzZXRQYXNzd29yZCgpXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2lnbmluKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9yZW5kZXJCZWZvcmVTaWdudXAoKXtcbiAgICAgICAgdmFyIHt1c2VyLCBwaG9uZVZlcmlmaWVkLCBmb3JnZXRQd2R9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiIGtleT1cImJlZm9yZXNpZ251cFwiPlxuICAgICAgICAgICAgICAgIDxTTVNSZXF1ZXN0IHJlZj1cInBob25lXCIvPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwiY29kZVwiIGhpbnRUZXh0PVwidmVyaWZpY2F0aW9uIGNvZGUgeW91IGp1c3QgcmVjZWl2ZWRcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgdGhpcy52ZXJpZnlQaG9uZSgpfX1cbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUZXh0PXt0aGlzLnN0YXRlLnBob25lVmVyaWZpZWRFcnJvcn0vPlxuICAgICAgICAgICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxSYWlzZWRCdXR0b24gbGFiZWw9XCJ2ZXJpZnlcIiBwcmltYXJ5PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMudmVyaWZ5UGhvbmUoKX0vPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29tbWFuZHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJhbHJlYWR5IGhhdmUgYW4gYWNjb3VudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9fSl9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LGZvcmdldFB3ZDp0cnVlfSl9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgX3JlbmRlclNpZ251cCgpe1xuICAgICAgICB2YXIge3VzZXIsIHBob25lVmVyaWZpZWQsIGZvcmdldFB3ZH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwic2lnbnVwXCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJ1c2VybmFtZVwiIGhpbnRUZXh0PVwibG9naW4gbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnNpZ251cCgpfX1cbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUZXh0PXt0aGlzLnN0YXRlLnNpZ251cEVycm9yfS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHRoaXMuc2lnbnVwKCl9fVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIiBoaW50VGV4dD1cInBhc3N3b3JkXCIvPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJwYXNzd29yZDJcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgdGhpcy5zaWdudXAoKX19XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cbiAgICAgICAgICAgICAgICA8Y2VudGVyPlxuICAgICAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiB1cFwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNpZ251cC5iaW5kKHRoaXMpfS8+XG4gICAgICAgICAgICAgICAgPC9jZW50ZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImFscmVhZHkgaGF2ZSBhbiBhY2NvdW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e319KX0vPlxuXG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwiZm9yZ2V0IHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOlVzZXIuY3VycmVudHx8e30sZm9yZ2V0UHdkOnRydWV9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVuZGVyU2lnbmluKCl7XG4gICAgICAgIHZhciB7dXNlciwgcGhvbmVWZXJpZmllZCwgZm9yZ2V0UHdkfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJzaWduaW5cIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInVzZXJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgaGludFRleHQ9XCJsb2dpbiBuYW1lIG9yIHBob25lIG51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgdGhpcy5zaWduaW4oKX19XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUZXh0PXt0aGlzLnN0YXRlLnNpZ25pbkVycm9yfS8+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHRoaXMuc2lnbmluKCl9fVxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInBhc3N3b3JkXCIgaGludFRleHQ9XCJwYXNzd29yZFwiLz5cbiAgICAgICAgICAgICAgICA8Y2VudGVyPlxuICAgICAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2lnbiBpblwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnNpZ25pbi5iaW5kKHRoaXMpfS8+XG4gICAgICAgICAgICAgICAgPC9jZW50ZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb21tYW5kc1wiPlxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cIm5vIGFjY291bnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHt1c2VyOnVuZGVmaW5lZH0pfS8+XG5cbiAgICAgICAgICAgICAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCJmb3JnZXQgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6VXNlci5jdXJyZW50fHx7fSxmb3JnZXRQd2Q6dHJ1ZX0pfS8+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgX3JlbmRlckZvcmdldFBhc3N3b3JkKCl7XG4gICAgICAgIHZhciB7dXNlciwgcGhvbmVWZXJpZmllZCwgZm9yZ2V0UHdkfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIiBrZXk9XCJmb3JnZXRQd2RcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cImNvbnRhY3RcIlxuICAgICAgICAgICAgICAgICAgICBvbktleURvd249e2U9PntlLmtleUNvZGU9PUVOVEVSICYmIHRoaXMuZm9yZ2V0UGFzc3dvcmQoKX19XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0gaGludFRleHQ9XCJwaG9uZSBudW1iZXIgb3IgZW1haWxcIi8+XG5cbiAgICAgICAgICAgICAgICA8Y2VudGVyPlxuICAgICAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIGxhYmVsPVwic2VuZCBtZVwiIHByaW1hcnk9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmZvcmdldFBhc3N3b3JkLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LCBmb3JnZXRQd2Q6dW5kZWZpbmVkfSl9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cInNpZ24gdXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3VzZXI6dW5kZWZpbmVkLGZvcmdldFB3ZDp1bmRlZmluZWR9KX0vPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBfcmVuZGVyUmVzZXRQYXNzd29yZCgpe1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCIga2V5PVwicmVzZXRcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cIm9sZFBhc3N3b3JkXCIgaGludFRleHQ9XCJvbGQgcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZT0+e2Uua2V5Q29kZT09RU5URVIgJiYgdGhpcy5yZXNldFBhc3N3b3JkKCl9fVxuICAgICAgICAgICAgICAgICAgICBlcnJvclRleHQ9e3RoaXMuc3RhdGUucmVzZXRFcnJvcn0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnJlc2V0UGFzc3dvcmQoKX19XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmRcIi8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBhc3N3b3JkMlwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlPT57ZS5rZXlDb2RlPT1FTlRFUiAmJiB0aGlzLnJlc2V0UGFzc3dvcmQoKX19XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiIGhpbnRUZXh0PVwicGFzc3dvcmQgYWdhaW5cIi8+XG5cbiAgICAgICAgICAgICAgICA8Y2VudGVyPlxuICAgICAgICAgICAgICAgICAgICA8UmFpc2VkQnV0dG9uIGxhYmVsPVwicmVzZXQgcGFzc3dvcmRcIiBwcmltYXJ5PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5yZXNldFBhc3N3b3JkLmJpbmQodGhpcyl9Lz5cbiAgICAgICAgICAgICAgICA8L2NlbnRlcj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwic2lnbiBpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LCBmb3JnZXRQd2Q6dW5kZWZpbmVkfSl9Lz5cblxuICAgICAgICAgICAgICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cImZvcmdldCBwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7dXNlcjpVc2VyLmN1cnJlbnR8fHt9LGZvcmdldFB3ZDp0cnVlfSl9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5jbGFzcyBTTVNSZXF1ZXN0IGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e3Bob25lOm51bGwsdGljazpudWxsfVxuICAgIH1cbiAgICByZXF1ZXN0VmVyaWZpY2F0aW9uKCl7XG4gICAgICAgIHRoaXMudGljaygpXG4gICAgICAgIFVzZXIucmVxdWVzdFZlcmlmaWNhdGlvbih0aGlzLnN0YXRlLnBob25lKVxuICAgIH1cbiAgICB0aWNrKCl7XG4gICAgICAgIHZhciBpPTAsIGRvVGljaztcbiAgICAgICAgdGhpcy5fdD1zZXRJbnRlcnZhbChkb1RpY2s9KCk9PntcbiAgICAgICAgICAgIGlmKGk9PTYwKXtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3QpXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXG4gICAgICAgICAgICB9ZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RpY2s6KytpfSlcbiAgICAgICAgfSwxMDAwKTtcblxuICAgICAgICBkb1RpY2soKVxuICAgIH1cbiAgICBzdGF0aWMgaXNQaG9uZSh2KXtcbiAgICAgICAgcmV0dXJuICgvXihcXCtcXGR7Mn0pP1xcZHsxMX0kL2cpLnRlc3QodilcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICBpZih0aGlzLl90KVxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxuICAgIH1cbiAgICBjaGFuZ2VQaG9uZSgpe1xuICAgICAgICB2YXIgcGhvbmU9dGhpcy5yZWZzLnBob25lLmdldFZhbHVlKClcbiAgICAgICAgaWYoU01TUmVxdWVzdC5pc1Bob25lKHBob25lKSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3Bob25lOnBob25lfSlcblx0XHRlbHNlXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtwaG9uZTp1bmRlZmluZWR9KVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgYnV0dG9uXG4gICAgICAgICAgICAse3Bob25lLCB0aWNrfT10aGlzLnN0YXRlXG4gICAgICAgIGlmKFNNU1JlcXVlc3QuaXNQaG9uZSh0aGlzLnN0YXRlLnBob25lKSl7XG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlLnRpY2spXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGlja30gZGlzYWJsZWQ9e3RydWV9Lz4pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnV0dG9uPSg8RmxhdEJ1dHRvbiBsYWJlbD17dGljaz09PTAgPyBcInJlc2VuZFwiIDogXCJzZW5kXCJ9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLnJlcXVlc3RWZXJpZmljYXRpb24oKX0vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtc3JlcXVlc3RcIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInBob25lXCIgaGludFRleHQ9XCJwaG9uZSBudW1iZXIgKGRlZmF1bHQgKzg2KVwiXG5cdFx0XHRcdFx0ZGlzYWJsZWQ9eyEhdGlja31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKT0+dGhpcy5jaGFuZ2VQaG9uZSgpfS8+XG4gICAgICAgICAgICAgICAge2J1dHRvbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5BY2NvdW50LlNNU1JlcXVlc3Q9U01TUmVxdWVzdFxuIl19