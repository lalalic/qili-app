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
			return this.ajax({
				url: this.server + 'requestVerification?phone=' + phone,
				method: 'get'
			});
		}
	}, {
		key: 'verifyPhone',
		value: function verifyPhone(phone, code) {
			return this.ajax({
				url: this.server + 'verifyPhone?phone=' + phone + '&code=' + code,
				method: 'get'
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
				method: 'get'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwiT2JqZWN0IiwiYXNzaWduIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0b2tlbiIsIl9zZXNzaW9uVG9rZW4iLCJlIiwibG9nb3V0IiwicGhvbmUiLCJjb2RlIiwiZW1haWwiLCJvbGRQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwic2Vzc2lvblRva2VuIiwiUHJvbWlzZSIsImFsbCIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVtb3ZlSXRlbSIsImRvY3VtZW50IiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdXBlciIsInZlcmlmeSIsIl9pZCIsIkJ1aWx0SW4iLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7OztlQURjQSxRQUFRLFdBQVIsQztJQUFUQyxPLFlBQUFBLE87O0FBR0wsSUFBSUMsU0FBTyxJQUFYO0FBQUEsSUFDQ0MsWUFBVSxJQURYOztJQUdxQkMsSTs7Ozs7Ozs7Ozs7O0FBQ3BCOzs7eUJBR2NDLEksRUFBSztBQUNsQixVQUFPLEtBQUtDLElBQUwsQ0FBVTtBQUNQQyxZQUFPLE1BREE7QUFFUEMsU0FBTyxLQUFLTixNQUFaLFdBRk87QUFHUE8sVUFBS0o7QUFIRSxJQUFWLEVBSUpLLElBSkksQ0FJQyxVQUFDRCxJQUFEO0FBQUEsV0FBUUUsV0FBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJSLElBQWpCLEVBQXNCSSxJQUF0QixDQUFYLENBQVI7QUFBQSxJQUpELENBQVA7QUFLQTtBQUNEOzs7Ozs7eUJBR2NKLEksRUFBSztBQUFBLE9BQ2JTLFFBRGEsR0FDTVQsSUFETixDQUNiUyxRQURhO0FBQUEsT0FDSkMsUUFE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U0FBU08sVUFBVCxDQUFvQk4sSUFBcEIsRUFBeUI7QUFDeEIsUUFBT3VCLFFBQVFDLEdBQVIsQ0FBYXhCLFFBQVFBLEtBQUtrQyxHQUFkLEdBQ2xCLENBQUNuQyxLQUFLWSxZQUFMLENBQWtCYyxPQUFsQixDQUEwQixhQUExQixFQUF3Q0MsS0FBS0MsU0FBTCxDQUFlM0IsSUFBZixDQUF4QyxDQUFELEVBQ0FELEtBQUtZLFlBQUwsQ0FBa0JjLE9BQWxCLENBQTBCLGNBQTFCLEVBQTBDekIsS0FBS3NCLFlBQS9DLENBREEsQ0FEa0IsR0FHbEIsQ0FBQ3ZCLEtBQUtZLFlBQUwsQ0FBa0JpQixVQUFsQixDQUE2QixhQUE3QixDQUFELEVBQ0E3QixLQUFLWSxZQUFMLENBQWtCaUIsVUFBbEIsQ0FBNkIsY0FBN0IsQ0FEQSxDQUhNLEVBS052QixJQUxNLENBS0QsWUFBSTtBQUNUUCxjQUFVRSxJQUFWO0FBQ0FELE9BQUtxQyxJQUFMLENBQVUsUUFBVixFQUFtQnRDLFNBQW5CO0FBQ0EsU0FBT0EsU0FBUDtBQUNBLEVBVE0sQ0FBUDtBQVVBIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1NlcnZpY2V9PXJlcXVpcmUoJy4vc2VydmljZScpXHJcbmltcG9ydCB7ZGlzcGF0Y2hlcn0gZnJvbSBcIi4uXCJcclxuXHJcbnZhciBzZXJ2ZXI9bnVsbCxcclxuXHRfX2N1cnJlbnQ9bnVsbDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBTZXJ2aWNlLkJ1aWx0SW57XHJcblx0LyoqXHJcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzaWdudXAodXNlcil7XHJcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNpZ251cGAsXHJcbiAgICAgICAgICAgIGRhdGE6dXNlclxyXG5cdFx0fSkudGhlbigoZGF0YSk9PnNldEN1cnJlbnQoT2JqZWN0LmFzc2lnbih7fSx1c2VyLGRhdGEpKSlcclxuXHR9XHJcblx0LyoqXHJcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzaWduaW4odXNlcil7XHJcblx0XHR2YXIge3VzZXJuYW1lLHBhc3N3b3JkfT11c2VyXHJcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcclxuICAgIFx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1sb2dpbmAsXHJcbiAgICBcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRcdGRhdGE6e3VzZXJuYW1lLHBhc3N3b3JkfVxyXG4gICAgXHRcdH0pLnRoZW4oKHVzZXIpPT5zZXRDdXJyZW50KHVzZXIpKVxyXG5cdH1cclxuXHQvKipcclxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XHJcblx0ICovXHJcblx0c3RhdGljIHZlcmlmeSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25Ub2tlbicpLnRoZW4oKHRva2VuKT0+e1xyXG5cdFx0XHRpZighdG9rZW4pXHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdHJldHVybiB0aGlzLmFqYXgoe1xyXG5cdFx0XHRcdHVybDp0aGlzLnNlcnZlcisnbWUnLFxyXG5cdFx0XHRcdG1ldGhvZDonZ2V0JyxcclxuXHRcdFx0XHRfc2Vzc2lvblRva2VuOnRva2VuXHJcblx0XHRcdH0pLnRoZW4oKHVzZXIpPT57cmV0dXJuIHNldEN1cnJlbnQodXNlcil9LFxyXG5cdFx0XHRcdChlKT0+e1xyXG5cdFx0XHRcdFx0Ly9AVG9kbzogc2hvdWxkIGdvIG9uIHdpdGhvdXQgbmV0d29ya1xyXG5cdFx0XHRcdFx0VXNlci5sb2dvdXQoKTtcclxuXHRcdFx0XHRcdHJldHVybiBlXHJcblx0XHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcmVxdWVzdFZlcmlmaWNhdGlvbihwaG9uZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcclxuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlcXVlc3RWZXJpZmljYXRpb24/cGhvbmU9JHtwaG9uZX1gLFxyXG5cdFx0XHRtZXRob2Q6J2dldCdcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgdmVyaWZ5UGhvbmUocGhvbmUsIGNvZGUpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn12ZXJpZnlQaG9uZT9waG9uZT0ke3Bob25lfSZjb2RlPSR7Y29kZX1gLFxyXG5cdFx0XHRtZXRob2Q6J2dldCdcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XHJcblx0ICovXHJcblx0c3RhdGljIHJlcXVlc3RQYXNzd29yZFJlc2V0KGVtYWlsKXtcclxuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xyXG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFBhc3N3b3JkUmVzZXQ/ZW1haWw9JHtlbWFpbH1gLFxyXG5cdFx0XHRtZXRob2Q6J2dldCdcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcmVzZXRQYXNzd29yZChvbGRQYXNzd29yZCxuZXdQYXNzd29yZCl7XHJcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcclxuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlc2V0UGFzc3dvcmRgLFxyXG5cdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRkYXRhOntvbGRQYXNzd29yZCxuZXdQYXNzd29yZH1cclxuXHRcdH0pLnRoZW4odXNlcj0+c2V0Q3VycmVudCh1c2VyKSlcclxuXHR9XHJcblx0LyoqXHJcblx0ICogIEBpbnN0YW5jZVxyXG5cdCAqL1xyXG4gICAgc3RhdGljIGxvZ291dCgpe1xyXG5cdFx0ZGVsZXRlIF9fY3VycmVudC5zZXNzaW9uVG9rZW5cclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChbXHJcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RVc2VyJyxKU09OLnN0cmluZ2lmeShfX2N1cnJlbnQpKSxcclxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSxcclxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvblRva2VuJylcclxuXHRcdF0pXHJcblx0XHQudGhlbihhPT5kb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKSlcclxuXHR9XHJcblxyXG5cclxuXHRzdGF0aWMgaW5pdCgpe1xyXG5cdFx0dGhpcy5zdXBlcihcImluaXRcIikoKVxyXG5cdFx0cmV0dXJuIHRoaXMudmVyaWZ5KClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgX25hbWUoKXtcclxuXHRcdHJldHVybiAndXNlcnMnXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IGN1cnJlbnQoKXtcclxuXHRcdHJldHVybiBfX2N1cnJlbnRcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgY3VycmVudEFzQXV0aG9yKCl7XHJcblx0XHRyZXR1cm4ge19pZDpfX2N1cnJlbnQuX2lkLCB1c2VybmFtZTpfX2N1cnJlbnQudXNlcm5hbWV9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDdXJyZW50KHVzZXIpe1xyXG5cdHJldHVybiBQcm9taXNlLmFsbCgodXNlciAmJiB1c2VyLl9pZCkgP1xyXG5cdFx0W1VzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJyxKU09OLnN0cmluZ2lmeSh1c2VyKSksXHJcblx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXNzaW9uVG9rZW4nLCB1c2VyLnNlc3Npb25Ub2tlbildIDpcclxuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpLFxyXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvblRva2VuJyldKVxyXG5cdC50aGVuKCgpPT57XHJcblx0XHRfX2N1cnJlbnQ9dXNlclxyXG5cdFx0VXNlci5lbWl0KCdjaGFuZ2UnLF9fY3VycmVudClcclxuXHRcdHJldHVybiBfX2N1cnJlbnRcclxuXHR9KVxyXG59XHJcbiJdfQ==