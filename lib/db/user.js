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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(User).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7O2VBRGMsUUFBUSxXQUFSOztJQUFUOzs7QUFHTCxJQUFJLFNBQU8sSUFBUDtJQUNILFlBQVUsSUFBVjs7SUFFb0I7Ozs7Ozs7Ozs7Ozs7Ozt5QkFJTixNQUFLO0FBQ2xCLFVBQU8sS0FBSyxJQUFMLENBQVU7QUFDUCxZQUFPLE1BQVA7QUFDQSxTQUFJLEtBQUssTUFBTCxHQUFZLEtBQUssS0FBTDtBQUNoQixVQUFLLElBQUw7SUFISCxFQUlKLElBSkksQ0FJQyxVQUFDLElBQUQ7V0FBUSxXQUFXLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBaUIsSUFBakIsRUFBc0IsSUFBdEIsQ0FBWDtJQUFSLENBSlIsQ0FEa0I7Ozs7Ozs7O3lCQVVMLE1BQUs7T0FDYixXQUFtQixLQUFuQixTQURhO09BQ0osV0FBVSxLQUFWLFNBREk7O0FBRWxCLFVBQU8sS0FBSyxJQUFMLENBQVU7QUFDWixTQUFPLEtBQUssTUFBTCx1QkFBNkIsMEJBQXFCLFFBQXpEO0FBQ0EsWUFBTyxLQUFQO0lBRkUsRUFHQSxJQUhBLENBR0ssVUFBQyxJQUFEO1dBQVEsV0FBVyxJQUFYO0lBQVIsQ0FIWixDQUZrQjs7Ozs7Ozs7MkJBVUo7OztBQUNkLFVBQU8sS0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLGNBQTFCLEVBQTBDLElBQTFDLENBQStDLFVBQUMsS0FBRCxFQUFTO0FBQzlELFFBQUcsQ0FBQyxLQUFELEVBQ0YsT0FBTyxJQUFQLENBREQ7QUFFQSxXQUFPLE9BQUssSUFBTCxDQUFVO0FBQ2hCLFVBQUksT0FBSyxNQUFMLEdBQVksSUFBWjtBQUNKLGFBQU8sS0FBUDtBQUNBLG9CQUFjLEtBQWQ7S0FITSxFQUlKLElBSkksQ0FJQyxVQUFDLElBQUQsRUFBUTtBQUFDLFlBQU8sV0FBVyxJQUFYLENBQVAsQ0FBRDtLQUFSLEVBQ1AsVUFBQyxDQUFELEVBQUs7O0FBRUosVUFBSyxNQUFMLEdBRkk7QUFHSixZQUFPLENBQVAsQ0FISTtLQUFMLENBTEQsQ0FIOEQ7SUFBVCxDQUF0RCxDQURjOzs7O3NDQWlCWSxPQUFNO0FBQ2hDLFVBQU8sS0FBSyxJQUFMLENBQVU7QUFDaEIsU0FBTyxLQUFLLE1BQUwsa0NBQXdDLEtBQS9DO0FBQ0EsWUFBTyxLQUFQO0lBRk0sQ0FBUCxDQURnQzs7Ozs4QkFPZCxPQUFPLE1BQUs7QUFDOUIsVUFBTyxLQUFLLElBQUwsQ0FBVTtBQUNoQixTQUFPLEtBQUssTUFBTCwwQkFBZ0MsbUJBQWMsSUFBckQ7QUFDQSxZQUFPLEtBQVA7SUFGTSxDQUFQLENBRDhCOzs7Ozs7Ozs7dUNBVUgsT0FBTTtBQUNqQyxVQUFPLEtBQUssSUFBTCxDQUFVO0FBQ2hCLFNBQU8sS0FBSyxNQUFMLG1DQUF5QyxLQUFoRDtBQUNBLFlBQU8sS0FBUDtJQUZNLENBQVAsQ0FEaUM7Ozs7Z0NBT2IsYUFBWSxhQUFZO0FBQzVDLFVBQU8sS0FBSyxJQUFMLENBQVU7QUFDaEIsU0FBTyxLQUFLLE1BQUwsa0JBQVA7QUFDQSxZQUFPLE1BQVA7QUFDQSxVQUFLLEVBQUMsd0JBQUQsRUFBYSx3QkFBYixFQUFMO0lBSE0sRUFJSixJQUpJLENBSUM7V0FBTSxXQUFXLElBQVg7SUFBTixDQUpSLENBRDRDOzs7Ozs7OzsyQkFVM0I7QUFDakIsVUFBTyxZQUFQLENBRGlCOzs7O3lCQUtMO0FBQ1osVUFBTyxLQUFLLE1BQUwsRUFBUCxDQURZOzs7O3NCQUlLO0FBQ2pCLFVBQU8sT0FBUCxDQURpQjs7OztzQkFJRTtBQUNuQixVQUFPLFNBQVAsQ0FEbUI7Ozs7c0JBSVE7QUFDM0IsVUFBTyxFQUFDLEtBQUksVUFBVSxHQUFWLEVBQWUsVUFBUyxVQUFVLFFBQVYsRUFBcEMsQ0FEMkI7Ozs7UUE1RlI7RUFBYSxRQUFRLE9BQVI7O2tCQUFiOzs7QUFpR3JCLFNBQVMsVUFBVCxDQUFvQixJQUFwQixFQUF5QjtBQUN4QixRQUFPLFFBQVEsR0FBUixDQUFZLElBQUMsSUFBUSxLQUFLLEdBQUwsR0FDM0IsQ0FBQyxLQUFLLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBMEIsYUFBMUIsRUFBd0MsS0FBSyxTQUFMLENBQWUsSUFBZixDQUF4QyxDQUFELEVBQ0EsS0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLGNBQTFCLEVBQTBDLEtBQUssWUFBTCxDQUQxQyxDQURrQixHQUdsQixDQUFDLEtBQUssWUFBTCxDQUFrQixVQUFsQixDQUE2QixhQUE3QixDQUFELEVBQ0EsS0FBSyxZQUFMLENBQWtCLFVBQWxCLENBQTZCLGNBQTdCLENBREEsQ0FIa0IsQ0FBWixDQUtOLElBTE0sQ0FLRCxZQUFJO0FBQ1QsY0FBVSxJQUFWLENBRFM7QUFFVCxPQUFLLElBQUwsQ0FBVSxRQUFWLEVBQW1CLFNBQW5CLEVBRlM7QUFHVCxTQUFPLFNBQVAsQ0FIUztFQUFKLENBTE4sQ0FEd0I7Q0FBekIiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7U2VydmljZX09cmVxdWlyZSgnLi9zZXJ2aWNlJylcbmltcG9ydCB7ZGlzcGF0Y2hlcn0gZnJvbSBcIi4uXCJcblxudmFyIHNlcnZlcj1udWxsLFxuXHRfX2N1cnJlbnQ9bnVsbDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyBzaWdudXAodXNlcil7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyK3RoaXMuX25hbWUsXG4gICAgICAgICAgICBkYXRhOnVzZXJcblx0XHR9KS50aGVuKChkYXRhKT0+c2V0Q3VycmVudChPYmplY3QuYXNzaWduKHt9LHVzZXIsZGF0YSkpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgc2lnbmluKHVzZXIpe1xuXHRcdHZhciB7dXNlcm5hbWUscGFzc3dvcmR9PXVzZXJcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcbiAgICBcdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9bG9naW4/dXNlcm5hbWU9JHt1c2VybmFtZX0mcGFzc3dvcmQ9JHtwYXNzd29yZH1gLFxuICAgIFx0XHRcdG1ldGhvZDonZ2V0J1xuICAgIFx0XHR9KS50aGVuKCh1c2VyKT0+c2V0Q3VycmVudCh1c2VyKSlcblx0fVxuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHZlcmlmeSgpe1xuXHRcdHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uVG9rZW4nKS50aGVuKCh0b2tlbik9Pntcblx0XHRcdGlmKCF0b2tlbilcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdFx0dXJsOnRoaXMuc2VydmVyKydtZScsXG5cdFx0XHRcdG1ldGhvZDonZ2V0Jyxcblx0XHRcdFx0X3Nlc3Npb25Ub2tlbjp0b2tlblxuXHRcdFx0fSkudGhlbigodXNlcik9PntyZXR1cm4gc2V0Q3VycmVudCh1c2VyKX0sXG5cdFx0XHRcdChlKT0+e1xuXHRcdFx0XHRcdC8vQFRvZG86IHNob3VsZCBnbyBvbiB3aXRob3V0IG5ldHdvcmtcblx0XHRcdFx0XHRVc2VyLmxvZ291dCgpO1xuXHRcdFx0XHRcdHJldHVybiBlXG5cdFx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyByZXF1ZXN0VmVyaWZpY2F0aW9uKHBob25lKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0VmVyaWZpY2F0aW9uP3Bob25lPSR7cGhvbmV9YCxcblx0XHRcdG1ldGhvZDonZ2V0J1xuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgdmVyaWZ5UGhvbmUocGhvbmUsIGNvZGUpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXZlcmlmeVBob25lP3Bob25lPSR7cGhvbmV9JmNvZGU9JHtjb2RlfWAsXG5cdFx0XHRtZXRob2Q6J2dldCdcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyByZXF1ZXN0UGFzc3dvcmRSZXNldChlbWFpbCl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFBhc3N3b3JkUmVzZXQ/ZW1haWw9JHtlbWFpbH1gLFxuXHRcdFx0bWV0aG9kOidnZXQnXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyByZXNldFBhc3N3b3JkKG9sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXNldFBhc3N3b3JkYCxcblx0XHRcdG1ldGhvZDoncG9zdCcsXG5cdFx0XHRkYXRhOntvbGRQYXNzd29yZCxuZXdQYXNzd29yZH1cblx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXG5cdH1cblx0LyoqXG5cdCAqICBAaW5zdGFuY2Vcblx0ICovXG4gICAgc3RhdGljIGxvZ291dCgpe1xuXHRcdHJldHVybiBzZXRDdXJyZW50KClcblx0fVxuXG5cblx0c3RhdGljIGluaXQoKXtcblx0XHRyZXR1cm4gdGhpcy52ZXJpZnkoKVxuXHR9XG5cblx0c3RhdGljIGdldCBfbmFtZSgpe1xuXHRcdHJldHVybiAndXNlcnMnXG5cdH1cblxuXHRzdGF0aWMgZ2V0IGN1cnJlbnQoKXtcblx0XHRyZXR1cm4gX19jdXJyZW50XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGN1cnJlbnRBc0F1dGhvcigpe1xuXHRcdHJldHVybiB7X2lkOl9fY3VycmVudC5faWQsIHVzZXJuYW1lOl9fY3VycmVudC51c2VybmFtZX1cblx0fVxufVxuXG5mdW5jdGlvbiBzZXRDdXJyZW50KHVzZXIpe1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoKHVzZXIgJiYgdXNlci5faWQpID9cblx0XHRbVXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFVzZXInLEpTT04uc3RyaW5naWZ5KHVzZXIpKSxcblx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXNzaW9uVG9rZW4nLCB1c2VyLnNlc3Npb25Ub2tlbildIDpcblx0XHRbVXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSxcblx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uVG9rZW4nKV0pXG5cdC50aGVuKCgpPT57XG5cdFx0X19jdXJyZW50PXVzZXJcblx0XHRVc2VyLmVtaXQoJ2NoYW5nZScsX19jdXJyZW50KVxuXHRcdHJldHVybiBfX2N1cnJlbnRcblx0fSlcbn1cbiJdfQ==