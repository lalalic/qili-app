'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('./service'),
    Service = _require.Service;

var server = null,
    __current = null;

var User = function (_Service$BuiltIn) {
	_inherits(User, _Service$BuiltIn);

	function User() {
		_classCallCheck(this, User);

		return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
	}

	_createClass(User, null, [{
		key: 'signup',

		/**
   *  @returns {Promise}
   */
		value: function signup(user) {
			return this.ajax({
				method: 'post',
				url: this.server + 'signup',
				data: _extends({}, user)
			}).then(function (user) {
				return setCurrent(user);
			});
		}
		/**
   *  @returns {Promise}
   */

	}, {
		key: 'signin',
		value: function signin(user) {
			return this.ajax({
				url: this.server + 'login',
				method: 'post',
				data: _extends({}, user)
			}).then(function (user) {
				return setCurrent(user);
			});
		}
		/**
   *  @returns {Promise}
   */

	}, {
		key: 'verify',
		value: function verify() {
			var _this2 = this;

			return this.localStorage.getItem('sessionToken').then(function (token) {
				if (!token) return null;
				return _this2.ajax({
					url: _this2.server + 'me',
					method: 'get',
					_sessionToken: token
				}).then(function (user) {
					return setCurrent(user);
				}, function (e) {
					//@Todo: should go on without network
					User.logout();
					return e;
				});
			});
		}
	}, {
		key: 'requestPhoneCode',
		value: function requestPhoneCode(phone, existence) {
			return this.ajax({
				url: this.server + 'requestPhoneCode',
				method: 'post',
				data: { phone: phone, existence: existence }
			}).then(function (_ref) {
				var salt = _ref.salt;
				return salt;
			});
		}

		/**
   *  @returns {Promise}
   */

	}, {
		key: 'requestPasswordReset',
		value: function requestPasswordReset(verifyPhone) {
			return this.ajax({
				url: this.server + 'requestPasswordReset',
				method: 'post',
				data: _extends({}, verifyPhone)
			});
		}
	}, {
		key: 'resetPassword',
		value: function resetPassword(oldPassword, newPassword) {
			return this.ajax({
				url: this.server + 'resetPassword',
				method: 'post',
				data: { oldPassword: oldPassword, newPassword: newPassword }
			}).then(function (user) {
				return setCurrent(user);
			});
		}
		/**
   *  @instance
   */

	}, {
		key: 'logout',
		value: function logout() {
			delete __current.sessionToken;
			return Promise.all([User.localStorage.setItem('lastUser', JSON.stringify(__current)), User.localStorage.removeItem('currentUser'), User.localStorage.removeItem('sessionToken')]).then(function (a) {
				return document.location.reload();
			});
		}
	}, {
		key: 'init',
		value: function init() {
			this.super("init")();
			return this.verify();
		}
	}, {
		key: 'isTutorialized',
		value: function isTutorialized() {
			return Promise.resolve(false);
			return User.localStorage.getItem("__tutorialized").then(function (a) {
				if (!a) {
					User.localStorage.setItem("__tutorialized", "true");
					return false;
				}
				return a;
			});
		}
	}, {
		key: '_name',
		get: function get() {
			return 'users';
		}
	}, {
		key: 'current',
		get: function get() {
			return __current;
		}
	}, {
		key: 'currentAsAuthor',
		get: function get() {
			return { _id: __current._id, username: __current.username };
		}
	}]);

	return User;
}(Service.BuiltIn);

exports.default = User;


function setCurrent(user) {
	return Promise.all(user && user._id ? [User.localStorage.setItem('currentUser', JSON.stringify(user)), User.localStorage.setItem('sessionToken', user.sessionToken)] : [User.localStorage.removeItem('currentUser'), User.localStorage.removeItem('sessionToken')]).then(function () {
		__current = user;
		User.emit('change', __current);
		return __current;
	});
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRva2VuIiwiX3Nlc3Npb25Ub2tlbiIsImUiLCJsb2dvdXQiLCJwaG9uZSIsImV4aXN0ZW5jZSIsInNhbHQiLCJ2ZXJpZnlQaG9uZSIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJzZXNzaW9uVG9rZW4iLCJQcm9taXNlIiwiYWxsIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIiwiZG9jdW1lbnQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInN1cGVyIiwidmVyaWZ5IiwicmVzb2x2ZSIsImEiLCJfaWQiLCJ1c2VybmFtZSIsIkJ1aWx0SW4iLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2VBQWNBLFFBQVEsV0FBUixDO0lBQVRDLE8sWUFBQUEsTzs7QUFFTCxJQUFJQyxTQUFPLElBQVg7QUFBQSxJQUNDQyxZQUFVLElBRFg7O0lBR3FCQyxJOzs7Ozs7Ozs7Ozs7QUFDcEI7Ozt5QkFHY0MsSSxFQUFLO0FBQ2xCLFVBQU8sS0FBS0MsSUFBTCxDQUFVO0FBQ05DLFlBQU8sTUFERDtBQUVOQyxTQUFPLEtBQUtOLE1BQVosV0FGTTtBQUdOTyx1QkFBU0osSUFBVDtBQUhNLElBQVYsRUFJSEssSUFKRyxDQUlFO0FBQUEsV0FBTUMsV0FBV04sSUFBWCxDQUFOO0FBQUEsSUFKRixDQUFQO0FBS0E7QUFDRDs7Ozs7O3lCQUdjQSxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDWkUsU0FBTyxLQUFLTixNQUFaLFVBRFk7QUFFWkssWUFBTyxNQUZLO0FBR2ZFLHVCQUFTSixJQUFUO0FBSGUsSUFBVixFQUlBSyxJ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cEMsVUFBVW9DLFFBQXZDLEVBQVA7QUFDQTs7OztFQWhHZ0N0QyxRQUFRdUMsTzs7a0JBQXJCcEMsSTs7O0FBK0dyQixTQUFTTyxVQUFULENBQW9CTixJQUFwQixFQUF5QjtBQUN4QixRQUFPb0IsUUFBUUMsR0FBUixDQUFhckIsUUFBUUEsS0FBS2lDLEdBQWQsR0FDbEIsQ0FBQ2xDLEtBQUtRLFlBQUwsQ0FBa0JlLE9BQWxCLENBQTBCLGFBQTFCLEVBQXdDQyxLQUFLQyxTQUFMLENBQWV4QixJQUFmLENBQXhDLENBQUQsRUFDQUQsS0FBS1EsWUFBTCxDQUFrQmUsT0FBbEIsQ0FBMEIsY0FBMUIsRUFBMEN0QixLQUFLbUIsWUFBL0MsQ0FEQSxDQURrQixHQUdsQixDQUFDcEIsS0FBS1EsWUFBTCxDQUFrQmtCLFVBQWxCLENBQTZCLGFBQTdCLENBQUQsRUFDQTFCLEtBQUtRLFlBQUwsQ0FBa0JrQixVQUFsQixDQUE2QixjQUE3QixDQURBLENBSE0sRUFLTnBCLElBTE0sQ0FLRCxZQUFJO0FBQ1RQLGNBQVVFLElBQVY7QUFDQUQsT0FBS3FDLElBQUwsQ0FBVSxRQUFWLEVBQW1CdEMsU0FBbkI7QUFDQSxTQUFPQSxTQUFQO0FBQ0EsRUFUTSxDQUFQO0FBVUEiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7U2VydmljZX09cmVxdWlyZSgnLi9zZXJ2aWNlJylcblxudmFyIHNlcnZlcj1udWxsLFxuXHRfX2N1cnJlbnQ9bnVsbDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyBzaWdudXAodXNlcil7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdCAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG5cdCAgICAgICAgICAgIHVybDpgJHt0aGlzLnNlcnZlcn1zaWdudXBgLFxuXHQgICAgICAgICAgICBkYXRhOnsuLi51c2VyfVxuXHRcdFx0fSkudGhlbih1c2VyPT5zZXRDdXJyZW50KHVzZXIpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgc2lnbmluKHVzZXIpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuICAgIFx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1sb2dpbmAsXG4gICAgXHRcdFx0bWV0aG9kOidwb3N0Jyxcblx0XHRcdFx0ZGF0YTp7Li4udXNlcn1cbiAgICBcdFx0fSkudGhlbih1c2VyPT5zZXRDdXJyZW50KHVzZXIpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgdmVyaWZ5KCl7XG5cdFx0cmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25Ub2tlbicpLnRoZW4odG9rZW49Pntcblx0XHRcdGlmKCF0b2tlbilcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdFx0dXJsOnRoaXMuc2VydmVyKydtZScsXG5cdFx0XHRcdG1ldGhvZDonZ2V0Jyxcblx0XHRcdFx0X3Nlc3Npb25Ub2tlbjp0b2tlblxuXHRcdFx0fSkudGhlbigodXNlcik9PntyZXR1cm4gc2V0Q3VycmVudCh1c2VyKX0sXG5cdFx0XHRcdChlKT0+e1xuXHRcdFx0XHRcdC8vQFRvZG86IHNob3VsZCBnbyBvbiB3aXRob3V0IG5ldHdvcmtcblx0XHRcdFx0XHRVc2VyLmxvZ291dCgpO1xuXHRcdFx0XHRcdHJldHVybiBlXG5cdFx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyByZXF1ZXN0UGhvbmVDb2RlKHBob25lLGV4aXN0ZW5jZSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFBob25lQ29kZWAsXG5cdFx0XHRtZXRob2Q6J3Bvc3QnLFxuXHRcdFx0ZGF0YTp7cGhvbmUsZXhpc3RlbmNlfVxuXHRcdH0pLnRoZW4oKHtzYWx0fSk9PnNhbHQpXG5cdH1cblxuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHJlcXVlc3RQYXNzd29yZFJlc2V0KHZlcmlmeVBob25lKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlcXVlc3RQYXNzd29yZFJlc2V0YCxcblx0XHRcdFx0bWV0aG9kOidwb3N0Jyxcblx0XHRcdFx0ZGF0YTp7Li4udmVyaWZ5UGhvbmV9XG5cdFx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHJlc2V0UGFzc3dvcmQob2xkUGFzc3dvcmQsbmV3UGFzc3dvcmQpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlc2V0UGFzc3dvcmRgLFxuXHRcdFx0bWV0aG9kOidwb3N0Jyxcblx0XHRcdGRhdGE6e29sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkfVxuXHRcdH0pLnRoZW4odXNlcj0+c2V0Q3VycmVudCh1c2VyKSlcblx0fVxuXHQvKipcblx0ICogIEBpbnN0YW5jZVxuXHQgKi9cbiAgICBzdGF0aWMgbG9nb3V0KCl7XG5cdFx0ZGVsZXRlIF9fY3VycmVudC5zZXNzaW9uVG9rZW5cblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW1xuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFzdFVzZXInLEpTT04uc3RyaW5naWZ5KF9fY3VycmVudCkpLFxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSxcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpXG5cdFx0XSlcblx0XHQudGhlbihhPT5kb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKSlcblx0fVxuXG5cblx0c3RhdGljIGluaXQoKXtcblx0XHR0aGlzLnN1cGVyKFwiaW5pdFwiKSgpXG5cdFx0cmV0dXJuIHRoaXMudmVyaWZ5KClcblx0fVxuXG5cdHN0YXRpYyBnZXQgX25hbWUoKXtcblx0XHRyZXR1cm4gJ3VzZXJzJ1xuXHR9XG5cblx0c3RhdGljIGdldCBjdXJyZW50KCl7XG5cdFx0cmV0dXJuIF9fY3VycmVudFxuXHR9XG5cblx0c3RhdGljIGdldCBjdXJyZW50QXNBdXRob3IoKXtcblx0XHRyZXR1cm4ge19pZDpfX2N1cnJlbnQuX2lkLCB1c2VybmFtZTpfX2N1cnJlbnQudXNlcm5hbWV9XG5cdH1cblxuXHRzdGF0aWMgaXNUdXRvcmlhbGl6ZWQoKXtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKVxuXHRcdHJldHVybiBVc2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiX190dXRvcmlhbGl6ZWRcIilcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0aWYoIWEpe1xuXHRcdFx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJfX3R1dG9yaWFsaXplZFwiLFwidHJ1ZVwiKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBhXG5cdFx0XHR9KVxuXHR9XG59XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnQodXNlcil7XG5cdHJldHVybiBQcm9taXNlLmFsbCgodXNlciAmJiB1c2VyLl9pZCkgP1xuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50VXNlcicsSlNPTi5zdHJpbmdpZnkodXNlcikpLFxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb25Ub2tlbicsIHVzZXIuc2Vzc2lvblRva2VuKV0gOlxuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpLFxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpXSlcblx0LnRoZW4oKCk9Pntcblx0XHRfX2N1cnJlbnQ9dXNlclxuXHRcdFVzZXIuZW1pdCgnY2hhbmdlJyxfX2N1cnJlbnQpXG5cdFx0cmV0dXJuIF9fY3VycmVudFxuXHR9KVxufVxuIl19