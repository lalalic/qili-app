'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./service');

var Service = _require.Service;


var server = null,
    __current = null;

var User = function (_Service$BuiltIn) {
	(0, _inherits3.default)(User, _Service$BuiltIn);

	function User() {
		(0, _classCallCheck3.default)(this, User);
		return (0, _possibleConstructorReturn3.default)(this, (User.__proto__ || (0, _getPrototypeOf2.default)(User)).apply(this, arguments));
	}

	(0, _createClass3.default)(User, null, [{
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
				return setCurrent((0, _assign2.default)({}, user, data));
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
			return _promise2.default.all([User.localStorage.setItem('lastUser', (0, _stringify2.default)(__current)), User.localStorage.removeItem('currentUser'), User.localStorage.removeItem('sessionToken')]).then(function (a) {
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
	return _promise2.default.all(user && user._id ? [User.localStorage.setItem('currentUser', (0, _stringify2.default)(user)), User.localStorage.setItem('sessionToken', user.sessionToken)] : [User.localStorage.removeItem('currentUser'), User.localStorage.removeItem('sessionToken')]).then(function () {
		__current = user;
		User.emit('change', __current);
		return __current;
	});
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0b2tlbiIsIl9zZXNzaW9uVG9rZW4iLCJlIiwibG9nb3V0IiwicGhvbmUiLCJjb2RlIiwiZW1haWwiLCJvbGRQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwic2Vzc2lvblRva2VuIiwiYWxsIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJkb2N1bWVudCIsImxvY2F0aW9uIiwicmVsb2FkIiwic3VwZXIiLCJ2ZXJpZnkiLCJfaWQiLCJCdWlsdEluIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztlQURjQSxRQUFRLFdBQVIsQzs7SUFBVEMsTyxZQUFBQSxPOzs7QUFHTCxJQUFJQyxTQUFPLElBQVg7QUFBQSxJQUNDQyxZQUFVLElBRFg7O0lBR3FCQyxJOzs7Ozs7Ozs7OztBQUNwQjs7O3lCQUdjQyxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDUEMsWUFBTyxNQURBO0FBRVBDLFNBQU8sS0FBS04sTUFBWixXQUZPO0FBR1BPLFVBQUtKO0FBSEUsSUFBVixFQUlKSyxJQUpJLENBSUMsVUFBQ0QsSUFBRDtBQUFBLFdBQVFFLFdBQVcsc0JBQWMsRUFBZCxFQUFpQk4sSUFBakIsRUFBc0JJLElBQXRCLENBQVgsQ0FBUjtBQUFBLElBSkQsQ0FBUDtBQUtBO0FBQ0Q7Ozs7Ozt5QkFHY0osSSxFQUFLO0FBQUEsT0FDYk8sUUFEYSxHQUNNUCxJQUROLENBQ2JPLFFBRGE7QUFBQSxPQUNKQyxRQURJLEdBQ01SLElBRE4sQ0FDSlEsUUFESTs7QUFFbEIs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Q0FBYXJCLFFBQVFBLEtBQUs2QixHQUFkLEdBQ2xCLENBQUM5QixLQUFLVSxZQUFMLENBQWtCYSxPQUFsQixDQUEwQixhQUExQixFQUF3Qyx5QkFBZXRCLElBQWYsQ0FBeEMsQ0FBRCxFQUNBRCxLQUFLVSxZQUFMLENBQWtCYSxPQUFsQixDQUEwQixjQUExQixFQUEwQ3RCLEtBQUtvQixZQUEvQyxDQURBLENBRGtCLEdBR2xCLENBQUNyQixLQUFLVSxZQUFMLENBQWtCYyxVQUFsQixDQUE2QixhQUE3QixDQUFELEVBQ0F4QixLQUFLVSxZQUFMLENBQWtCYyxVQUFsQixDQUE2QixjQUE3QixDQURBLENBSE0sRUFLTmxCLElBTE0sQ0FLRCxZQUFJO0FBQ1RQLGNBQVVFLElBQVY7QUFDQUQsT0FBS2dDLElBQUwsQ0FBVSxRQUFWLEVBQW1CakMsU0FBbkI7QUFDQSxTQUFPQSxTQUFQO0FBQ0EsRUFUTSxDQUFQO0FBVUEiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7U2VydmljZX09cmVxdWlyZSgnLi9zZXJ2aWNlJylcbmltcG9ydCB7ZGlzcGF0Y2hlcn0gZnJvbSBcIi4uXCJcblxudmFyIHNlcnZlcj1udWxsLFxuXHRfX2N1cnJlbnQ9bnVsbDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyBzaWdudXAodXNlcil7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxuICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNpZ251cGAsXG4gICAgICAgICAgICBkYXRhOnVzZXJcblx0XHR9KS50aGVuKChkYXRhKT0+c2V0Q3VycmVudChPYmplY3QuYXNzaWduKHt9LHVzZXIsZGF0YSkpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgc2lnbmluKHVzZXIpe1xuXHRcdHZhciB7dXNlcm5hbWUscGFzc3dvcmR9PXVzZXJcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcbiAgICBcdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9bG9naW5gLFxuICAgIFx0XHRcdG1ldGhvZDoncG9zdCcsXG5cdFx0XHRcdGRhdGE6e3VzZXJuYW1lLHBhc3N3b3JkfVxuICAgIFx0XHR9KS50aGVuKCh1c2VyKT0+c2V0Q3VycmVudCh1c2VyKSlcblx0fVxuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHZlcmlmeSgpe1xuXHRcdHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uVG9rZW4nKS50aGVuKCh0b2tlbik9Pntcblx0XHRcdGlmKCF0b2tlbilcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdFx0dXJsOnRoaXMuc2VydmVyKydtZScsXG5cdFx0XHRcdG1ldGhvZDonZ2V0Jyxcblx0XHRcdFx0X3Nlc3Npb25Ub2tlbjp0b2tlblxuXHRcdFx0fSkudGhlbigodXNlcik9PntyZXR1cm4gc2V0Q3VycmVudCh1c2VyKX0sXG5cdFx0XHRcdChlKT0+e1xuXHRcdFx0XHRcdC8vQFRvZG86IHNob3VsZCBnbyBvbiB3aXRob3V0IG5ldHdvcmtcblx0XHRcdFx0XHRVc2VyLmxvZ291dCgpO1xuXHRcdFx0XHRcdHJldHVybiBlXG5cdFx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyByZXF1ZXN0VmVyaWZpY2F0aW9uKHBob25lKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0VmVyaWZpY2F0aW9uP3Bob25lPSR7cGhvbmV9YCxcblx0XHRcdG1ldGhvZDonZ2V0J1xuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgdmVyaWZ5UGhvbmUocGhvbmUsIGNvZGUpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXZlcmlmeVBob25lP3Bob25lPSR7cGhvbmV9JmNvZGU9JHtjb2RlfWAsXG5cdFx0XHRtZXRob2Q6J2dldCdcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyByZXF1ZXN0UGFzc3dvcmRSZXNldChlbWFpbCl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFBhc3N3b3JkUmVzZXQ/ZW1haWw9JHtlbWFpbH1gLFxuXHRcdFx0bWV0aG9kOidnZXQnXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyByZXNldFBhc3N3b3JkKG9sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXNldFBhc3N3b3JkYCxcblx0XHRcdG1ldGhvZDoncG9zdCcsXG5cdFx0XHRkYXRhOntvbGRQYXNzd29yZCxuZXdQYXNzd29yZH1cblx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXG5cdH1cblx0LyoqXG5cdCAqICBAaW5zdGFuY2Vcblx0ICovXG4gICAgc3RhdGljIGxvZ291dCgpe1xuXHRcdGRlbGV0ZSBfX2N1cnJlbnQuc2Vzc2lvblRva2VuXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFtcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RVc2VyJyxKU09OLnN0cmluZ2lmeShfX2N1cnJlbnQpKSxcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyksXG5cdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uVG9rZW4nKVxuXHRcdF0pXG5cdFx0LnRoZW4oYT0+ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCkpXG5cdH1cblxuXG5cdHN0YXRpYyBpbml0KCl7XG5cdFx0dGhpcy5zdXBlcihcImluaXRcIikoKVxuXHRcdHJldHVybiB0aGlzLnZlcmlmeSgpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XG5cdFx0cmV0dXJuICd1c2Vycydcblx0fVxuXG5cdHN0YXRpYyBnZXQgY3VycmVudCgpe1xuXHRcdHJldHVybiBfX2N1cnJlbnRcblx0fVxuXG5cdHN0YXRpYyBnZXQgY3VycmVudEFzQXV0aG9yKCl7XG5cdFx0cmV0dXJuIHtfaWQ6X19jdXJyZW50Ll9pZCwgdXNlcm5hbWU6X19jdXJyZW50LnVzZXJuYW1lfVxuXHR9XG59XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnQodXNlcil7XG5cdHJldHVybiBQcm9taXNlLmFsbCgodXNlciAmJiB1c2VyLl9pZCkgP1xuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50VXNlcicsSlNPTi5zdHJpbmdpZnkodXNlcikpLFxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb25Ub2tlbicsIHVzZXIuc2Vzc2lvblRva2VuKV0gOlxuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpLFxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpXSlcblx0LnRoZW4oKCk9Pntcblx0XHRfX2N1cnJlbnQ9dXNlclxuXHRcdFVzZXIuZW1pdCgnY2hhbmdlJyxfX2N1cnJlbnQpXG5cdFx0cmV0dXJuIF9fY3VycmVudFxuXHR9KVxufVxuIl19