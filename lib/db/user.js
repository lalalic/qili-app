'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('..');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('./service');

var Service = _require.Service;


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
				url: this.server + this._name,
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
			var username = user.username;
			var password = user.password;

			return this.ajax({
				url: this.server + 'login?username=' + username + '&password=' + password,
				method: 'get'
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
			return setCurrent();
		}
	}, {
		key: 'init',
		value: function init() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiX25hbWUiLCJkYXRhIiwidGhlbiIsInNldEN1cnJlbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRva2VuIiwiX3Nlc3Npb25Ub2tlbiIsImUiLCJsb2dvdXQiLCJwaG9uZSIsImNvZGUiLCJlbWFpbCIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJ2ZXJpZnkiLCJfaWQiLCJCdWlsdEluIiwiUHJvbWlzZSIsImFsbCIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5Iiwic2Vzc2lvblRva2VuIiwicmVtb3ZlSXRlbSIsImVtaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7O2VBRGNBLFFBQVEsV0FBUixDOztJQUFUQyxPLFlBQUFBLE87OztBQUdMLElBQUlDLFNBQU8sSUFBWDtBQUFBLElBQ0NDLFlBQVUsSUFEWDs7SUFHcUJDLEk7Ozs7Ozs7Ozs7OztBQUNwQjs7O3lCQUdjQyxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDUEMsWUFBTyxNQURBO0FBRVBDLFNBQUksS0FBS04sTUFBTCxHQUFZLEtBQUtPLEtBRmQ7QUFHUEMsVUFBS0w7QUFIRSxJQUFWLEVBSUpNLElBSkksQ0FJQyxVQUFDRCxJQUFEO0FBQUEsV0FBUUUsV0FBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJULElBQWpCLEVBQXNCSyxJQUF0QixDQUFYLENBQVI7QUFBQSxJQUpELENBQVA7QUFLQTtBQUNEOzs7Ozs7eUJBR2NMLEksRUFBSztBQUFBLE9BQ2JVLFFBRGEsR0FDTVYsSUFETixDQUNiVSxRQURhO0FBQUEsT0FDSkMsUUFESSxHQUNNWCxJQUROLENBQ0pX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MUIsSUFMTSxDQUtELFlBQUk7QUFDVFIsY0FBVUUsSUFBVjtBQUNBRCxPQUFLa0MsSUFBTCxDQUFVLFFBQVYsRUFBbUJuQyxTQUFuQjtBQUNBLFNBQU9BLFNBQVA7QUFDQSxFQVRNLENBQVA7QUFVQSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtTZXJ2aWNlfT1yZXF1aXJlKCcuL3NlcnZpY2UnKVxuaW1wb3J0IHtkaXNwYXRjaGVyfSBmcm9tIFwiLi5cIlxuXG52YXIgc2VydmVyPW51bGwsXG5cdF9fY3VycmVudD1udWxsO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHNpZ251cCh1c2VyKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICB1cmw6dGhpcy5zZXJ2ZXIrdGhpcy5fbmFtZSxcbiAgICAgICAgICAgIGRhdGE6dXNlclxuXHRcdH0pLnRoZW4oKGRhdGEpPT5zZXRDdXJyZW50KE9iamVjdC5hc3NpZ24oe30sdXNlcixkYXRhKSkpXG5cdH1cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyBzaWduaW4odXNlcil7XG5cdFx0dmFyIHt1c2VybmFtZSxwYXNzd29yZH09dXNlclxuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuICAgIFx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1sb2dpbj91c2VybmFtZT0ke3VzZXJuYW1lfSZwYXNzd29yZD0ke3Bhc3N3b3JkfWAsXG4gICAgXHRcdFx0bWV0aG9kOidnZXQnXG4gICAgXHRcdH0pLnRoZW4oKHVzZXIpPT5zZXRDdXJyZW50KHVzZXIpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgdmVyaWZ5KCl7XG5cdFx0cmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25Ub2tlbicpLnRoZW4oKHRva2VuKT0+e1xuXHRcdFx0aWYoIXRva2VuKVxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0XHR1cmw6dGhpcy5zZXJ2ZXIrJ21lJyxcblx0XHRcdFx0bWV0aG9kOidnZXQnLFxuXHRcdFx0XHRfc2Vzc2lvblRva2VuOnRva2VuXG5cdFx0XHR9KS50aGVuKCh1c2VyKT0+e3JldHVybiBzZXRDdXJyZW50KHVzZXIpfSxcblx0XHRcdFx0KGUpPT57XG5cdFx0XHRcdFx0Ly9AVG9kbzogc2hvdWxkIGdvIG9uIHdpdGhvdXQgbmV0d29ya1xuXHRcdFx0XHRcdFVzZXIubG9nb3V0KCk7XG5cdFx0XHRcdFx0cmV0dXJuIGVcblx0XHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlcXVlc3RWZXJpZmljYXRpb24/cGhvbmU9JHtwaG9uZX1gLFxuXHRcdFx0bWV0aG9kOidnZXQnXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyB2ZXJpZnlQaG9uZShwaG9uZSwgY29kZSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9dmVyaWZ5UGhvbmU/cGhvbmU9JHtwaG9uZX0mY29kZT0ke2NvZGV9YCxcblx0XHRcdG1ldGhvZDonZ2V0J1xuXHRcdH0pXG5cdH1cblxuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHJlcXVlc3RQYXNzd29yZFJlc2V0KGVtYWlsKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0UGFzc3dvcmRSZXNldD9lbWFpbD0ke2VtYWlsfWAsXG5cdFx0XHRtZXRob2Q6J2dldCdcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHJlc2V0UGFzc3dvcmQob2xkUGFzc3dvcmQsbmV3UGFzc3dvcmQpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlc2V0UGFzc3dvcmRgLFxuXHRcdFx0bWV0aG9kOidwb3N0Jyxcblx0XHRcdGRhdGE6e29sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkfVxuXHRcdH0pLnRoZW4odXNlcj0+c2V0Q3VycmVudCh1c2VyKSlcblx0fVxuXHQvKipcblx0ICogIEBpbnN0YW5jZVxuXHQgKi9cbiAgICBzdGF0aWMgbG9nb3V0KCl7XG5cdFx0cmV0dXJuIHNldEN1cnJlbnQoKVxuXHR9XG5cblxuXHRzdGF0aWMgaW5pdCgpe1xuXHRcdHJldHVybiB0aGlzLnZlcmlmeSgpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XG5cdFx0cmV0dXJuICd1c2Vycydcblx0fVxuXG5cdHN0YXRpYyBnZXQgY3VycmVudCgpe1xuXHRcdHJldHVybiBfX2N1cnJlbnRcblx0fVxuXG5cdHN0YXRpYyBnZXQgY3VycmVudEFzQXV0aG9yKCl7XG5cdFx0cmV0dXJuIHtfaWQ6X19jdXJyZW50Ll9pZCwgdXNlcm5hbWU6X19jdXJyZW50LnVzZXJuYW1lfVxuXHR9XG59XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnQodXNlcil7XG5cdHJldHVybiBQcm9taXNlLmFsbCgodXNlciAmJiB1c2VyLl9pZCkgP1xuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50VXNlcicsSlNPTi5zdHJpbmdpZnkodXNlcikpLFxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb25Ub2tlbicsIHVzZXIuc2Vzc2lvblRva2VuKV0gOlxuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpLFxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpXSlcblx0LnRoZW4oKCk9Pntcblx0XHRfX2N1cnJlbnQ9dXNlclxuXHRcdFVzZXIuZW1pdCgnY2hhbmdlJyxfX2N1cnJlbnQpXG5cdFx0cmV0dXJuIF9fY3VycmVudFxuXHR9KVxufVxuIl19