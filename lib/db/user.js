'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('..');

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
				data: user
			}).then(function (data) {
				return setCurrent(Object.assign({}, user, data));
			});
		}
		/**
   *  @returns {Promise}
   */

	}, {
		key: 'signin',
		value: function signin(user) {
			var username = user.username,
			    password = user.password;

			return this.ajax({
				url: this.server + 'login',
				method: 'post',
				data: { username: username, password: password }
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
		key: 'requestVerification',
		value: function requestVerification(phone) {
			var checkUnique = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			return this.ajax({
				url: this.server + 'requestVerification',
				method: 'post',
				data: { phone: phone, checkUnique: checkUnique }
			}).then(function (_ref) {
				var salt = _ref.salt;
				return User.localStorage.setItem("__salt", salt);
			});
		}
	}, {
		key: 'verifyPhone',
		value: function verifyPhone(phone, code) {
			var _this3 = this;

			return User.localStorage.getItem("__salt").then(function (salt) {
				return _this3.ajax({
					url: _this3.server + 'verifyPhone',
					method: 'post',
					data: { phone: phone, code: code, salt: salt }
				});
			}).then(function (done) {
				return User.localStorage.removeItem("__salt");
			});
		}

		/**
   *  @returns {Promise}
   */

	}, {
		key: 'requestPasswordReset',
		value: function requestPasswordReset(email) {
			return this.ajax({
				url: this.server + 'requestPasswordReset?email=' + email,
				method: 'post'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwiT2JqZWN0IiwiYXNzaWduIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0b2tlbiIsIl9zZXNzaW9uVG9rZW4iLCJlIiwibG9nb3V0IiwicGhvbmUiLCJjaGVja1VuaXF1ZSIsInNhbHQiLCJzZXRJdGVtIiwiY29kZSIsInJlbW92ZUl0ZW0iLCJlbWFpbCIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJzZXNzaW9uVG9rZW4iLCJQcm9taXNlIiwiYWxsIiwiSlNPTiIsInN0cmluZ2lmeSIsImRvY3VtZW50IiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdXBlciIsInZlcmlmeSIsImEiLCJfaWQiLCJCdWlsdEluIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7ZUFEY0EsUUFBUSxXQUFSLEM7SUFBVEMsTyxZQUFBQSxPOztBQUdMLElBQUlDLFNBQU8sSUFBWDtBQUFBLElBQ0NDLFlBQVUsSUFEWDs7SUFHcUJDLEk7Ozs7Ozs7Ozs7OztBQUNwQjs7O3lCQUdjQyxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDUEMsWUFBTyxNQURBO0FBRVBDLFNBQU8sS0FBS04sTUFBWixXQUZPO0FBR1BPLFVBQUtKO0FBSEUsSUFBVixFQUlKSyxJQUpJLENBSUMsVUFBQ0QsSUFBRDtBQUFBLFdBQVFFLFdBQVdDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCUixJQUFqQixFQUFzQkksSUFBdEIsQ0FBWCxDQUFSO0FBQUEsSUFKRCxDQUFQO0FBS0E7QUFDRDs7Ozs7O3lCQUdjSixJLEVBQUs7QUFBQSxPQUNiUyxRQURhLEdBQ01ULElBRE4s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QUQsRUFDQXZCLEtBQUtZLFlBQUwsQ0FBa0JXLFVBQWxCLENBQTZCLGNBQTdCLENBREEsQ0FITSxFQUtOakIsSUFMTSxDQUtELFlBQUk7QUFDVFAsY0FBVUUsSUFBVjtBQUNBRCxPQUFLd0MsSUFBTCxDQUFVLFFBQVYsRUFBbUJ6QyxTQUFuQjtBQUNBLFNBQU9BLFNBQVA7QUFDQSxFQVRNLENBQVA7QUFVQSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtTZXJ2aWNlfT1yZXF1aXJlKCcuL3NlcnZpY2UnKVxyXG5pbXBvcnQge2Rpc3BhdGNoZXJ9IGZyb20gXCIuLlwiXHJcblxyXG52YXIgc2VydmVyPW51bGwsXHJcblx0X19jdXJyZW50PW51bGw7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgc2lnbnVwKHVzZXIpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDpgJHt0aGlzLnNlcnZlcn1zaWdudXBgLFxyXG4gICAgICAgICAgICBkYXRhOnVzZXJcclxuXHRcdH0pLnRoZW4oKGRhdGEpPT5zZXRDdXJyZW50KE9iamVjdC5hc3NpZ24oe30sdXNlcixkYXRhKSkpXHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgc2lnbmluKHVzZXIpe1xyXG5cdFx0dmFyIHt1c2VybmFtZSxwYXNzd29yZH09dXNlclxyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcbiAgICBcdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9bG9naW5gLFxyXG4gICAgXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0XHRkYXRhOnt1c2VybmFtZSxwYXNzd29yZH1cclxuICAgIFx0XHR9KS50aGVuKCh1c2VyKT0+c2V0Q3VycmVudCh1c2VyKSlcclxuXHR9XHJcblx0LyoqXHJcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyB2ZXJpZnkoKXtcclxuXHRcdHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uVG9rZW4nKS50aGVuKHRva2VuPT57XHJcblx0XHRcdGlmKCF0b2tlbilcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdFx0dXJsOnRoaXMuc2VydmVyKydtZScsXHJcblx0XHRcdFx0bWV0aG9kOidnZXQnLFxyXG5cdFx0XHRcdF9zZXNzaW9uVG9rZW46dG9rZW5cclxuXHRcdFx0fSkudGhlbigodXNlcik9PntyZXR1cm4gc2V0Q3VycmVudCh1c2VyKX0sXHJcblx0XHRcdFx0KGUpPT57XHJcblx0XHRcdFx0XHQvL0BUb2RvOiBzaG91bGQgZ28gb24gd2l0aG91dCBuZXR3b3JrXHJcblx0XHRcdFx0XHRVc2VyLmxvZ291dCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGVcclxuXHRcdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyByZXF1ZXN0VmVyaWZpY2F0aW9uKHBob25lLGNoZWNrVW5pcXVlPWZhbHNlKXtcclxuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xyXG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFZlcmlmaWNhdGlvbmAsXHJcblx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdGRhdGE6e3Bob25lLGNoZWNrVW5pcXVlfVxyXG5cdFx0fSkudGhlbigoe3NhbHR9KT0+VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIl9fc2FsdFwiLHNhbHQpKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHZlcmlmeVBob25lKHBob25lLCBjb2RlKXtcclxuXHRcdHJldHVybiBVc2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiX19zYWx0XCIpXHJcblx0XHRcdC50aGVuKHNhbHQ9PnRoaXMuYWpheCh7XHJcblx0XHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXZlcmlmeVBob25lYCxcclxuXHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRcdGRhdGE6e3Bob25lLGNvZGUsc2FsdH1cclxuXHRcdFx0fSkpLnRoZW4oZG9uZT0+VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIl9fc2FsdFwiKSlcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVxdWVzdFBhc3N3b3JkUmVzZXQoZW1haWwpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0UGFzc3dvcmRSZXNldD9lbWFpbD0ke2VtYWlsfWAsXHJcblx0XHRcdG1ldGhvZDoncG9zdCdcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcmVzZXRQYXNzd29yZChvbGRQYXNzd29yZCxuZXdQYXNzd29yZCl7XHJcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcclxuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlc2V0UGFzc3dvcmRgLFxyXG5cdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRkYXRhOntvbGRQYXNzd29yZCxuZXdQYXNzd29yZH1cclxuXHRcdH0pLnRoZW4odXNlcj0+c2V0Q3VycmVudCh1c2VyKSlcclxuXHR9XHJcblx0LyoqXHJcblx0ICogIEBpbnN0YW5jZVxyXG5cdCAqL1xyXG4gICAgc3RhdGljIGxvZ291dCgpe1xyXG5cdFx0ZGVsZXRlIF9fY3VycmVudC5zZXNzaW9uVG9rZW5cclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChbXHJcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RVc2VyJyxKU09OLnN0cmluZ2lmeShfX2N1cnJlbnQpKSxcclxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSxcclxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvblRva2VuJylcclxuXHRcdF0pXHJcblx0XHQudGhlbihhPT5kb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKSlcclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgaW5pdCgpe1xyXG5cdFx0dGhpcy5zdXBlcihcImluaXRcIikoKVxyXG5cdFx0cmV0dXJuIHRoaXMudmVyaWZ5KClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgX25hbWUoKXtcclxuXHRcdHJldHVybiAndXNlcnMnXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IGN1cnJlbnQoKXtcclxuXHRcdHJldHVybiBfX2N1cnJlbnRcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgY3VycmVudEFzQXV0aG9yKCl7XHJcblx0XHRyZXR1cm4ge19pZDpfX2N1cnJlbnQuX2lkLCB1c2VybmFtZTpfX2N1cnJlbnQudXNlcm5hbWV9XHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBpc1R1dG9yaWFsaXplZCgpe1xyXG5cdFx0cmV0dXJuIFVzZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJfX3R1dG9yaWFsaXplZFwiKVxyXG5cdFx0XHQudGhlbihhPT57XHJcblx0XHRcdFx0aWYoIWEpe1xyXG5cdFx0XHRcdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIsXCJ0cnVlXCIpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGFcclxuXHRcdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEN1cnJlbnQodXNlcil7XHJcblx0cmV0dXJuIFByb21pc2UuYWxsKCh1c2VyICYmIHVzZXIuX2lkKSA/XHJcblx0XHRbVXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFVzZXInLEpTT04uc3RyaW5naWZ5KHVzZXIpKSxcclxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb25Ub2tlbicsIHVzZXIuc2Vzc2lvblRva2VuKV0gOlxyXG5cdFx0W1VzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyksXHJcblx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uVG9rZW4nKV0pXHJcblx0LnRoZW4oKCk9PntcclxuXHRcdF9fY3VycmVudD11c2VyXHJcblx0XHRVc2VyLmVtaXQoJ2NoYW5nZScsX19jdXJyZW50KVxyXG5cdFx0cmV0dXJuIF9fY3VycmVudFxyXG5cdH0pXHJcbn1cclxuIl19