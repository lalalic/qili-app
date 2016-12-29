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

var _require = require('./service'),
    Service = _require.Service;

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
			return setCurrent(null);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0b2tlbiIsIl9zZXNzaW9uVG9rZW4iLCJlIiwibG9nb3V0IiwicGhvbmUiLCJjb2RlIiwiZW1haWwiLCJvbGRQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwic3VwZXIiLCJ2ZXJpZnkiLCJfaWQiLCJCdWlsdEluIiwiYWxsIiwic2V0SXRlbSIsInNlc3Npb25Ub2tlbiIsInJlbW92ZUl0ZW0iLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O2VBRGNBLFFBQVEsV0FBUixDO0lBQVRDLE8sWUFBQUEsTzs7QUFHTCxJQUFJQyxTQUFPLElBQVg7QUFBQSxJQUNDQyxZQUFVLElBRFg7O0lBR3FCQyxJOzs7Ozs7Ozs7OztBQUNwQjs7O3lCQUdjQyxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDUEMsWUFBTyxNQURBO0FBRVBDLFNBQU8sS0FBS04sTUFBWixXQUZPO0FBR1BPLFVBQUtKO0FBSEUsSUFBVixFQUlKSyxJQUpJLENBSUMsVUFBQ0QsSUFBRDtBQUFBLFdBQVFFLFdBQVcsc0JBQWMsRUFBZCxFQUFpQk4sSUFBakIsRUFBc0JJLElBQXRCLENBQVgsQ0FBUjtBQUFBLElBSkQsQ0FBUDtBQUtBO0FBQ0Q7Ozs7Ozt5QkFHY0osSSxFQUFLO0FBQUEsT0FDYk8sUUFEYSxHQUNNUCxJQUROLENBQ2JPLFFBRGE7QUFBQSxPQUNKQyxRQURJLEdBQ01SLElBRE4sQ0FDSlEsUUFESTs7QUFFbEIsVUFBTyxLQUFLUCxJQUFMLENBQVU7QUFDWkUsU0FBTyxL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QUFDVFAsY0FBVUUsSUFBVjtBQUNBRCxPQUFLNkIsSUFBTCxDQUFVLFFBQVYsRUFBbUI5QixTQUFuQjtBQUNBLFNBQU9BLFNBQVA7QUFDQSxFQVRNLENBQVA7QUFVQSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtTZXJ2aWNlfT1yZXF1aXJlKCcuL3NlcnZpY2UnKVxuaW1wb3J0IHtkaXNwYXRjaGVyfSBmcm9tIFwiLi5cIlxuXG52YXIgc2VydmVyPW51bGwsXG5cdF9fY3VycmVudD1udWxsO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHNpZ251cCh1c2VyKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9c2lnbnVwYCxcbiAgICAgICAgICAgIGRhdGE6dXNlclxuXHRcdH0pLnRoZW4oKGRhdGEpPT5zZXRDdXJyZW50KE9iamVjdC5hc3NpZ24oe30sdXNlcixkYXRhKSkpXG5cdH1cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyBzaWduaW4odXNlcil7XG5cdFx0dmFyIHt1c2VybmFtZSxwYXNzd29yZH09dXNlclxuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuICAgIFx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1sb2dpbmAsXG4gICAgXHRcdFx0bWV0aG9kOidwb3N0Jyxcblx0XHRcdFx0ZGF0YTp7dXNlcm5hbWUscGFzc3dvcmR9XG4gICAgXHRcdH0pLnRoZW4oKHVzZXIpPT5zZXRDdXJyZW50KHVzZXIpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgdmVyaWZ5KCl7XG5cdFx0cmV0dXJuIHRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nlc3Npb25Ub2tlbicpLnRoZW4oKHRva2VuKT0+e1xuXHRcdFx0aWYoIXRva2VuKVxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0XHR1cmw6dGhpcy5zZXJ2ZXIrJ21lJyxcblx0XHRcdFx0bWV0aG9kOidnZXQnLFxuXHRcdFx0XHRfc2Vzc2lvblRva2VuOnRva2VuXG5cdFx0XHR9KS50aGVuKCh1c2VyKT0+e3JldHVybiBzZXRDdXJyZW50KHVzZXIpfSxcblx0XHRcdFx0KGUpPT57XG5cdFx0XHRcdFx0Ly9AVG9kbzogc2hvdWxkIGdvIG9uIHdpdGhvdXQgbmV0d29ya1xuXHRcdFx0XHRcdFVzZXIubG9nb3V0KCk7XG5cdFx0XHRcdFx0cmV0dXJuIGVcblx0XHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlcXVlc3RWZXJpZmljYXRpb24/cGhvbmU9JHtwaG9uZX1gLFxuXHRcdFx0bWV0aG9kOidnZXQnXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyB2ZXJpZnlQaG9uZShwaG9uZSwgY29kZSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9dmVyaWZ5UGhvbmU/cGhvbmU9JHtwaG9uZX0mY29kZT0ke2NvZGV9YCxcblx0XHRcdG1ldGhvZDonZ2V0J1xuXHRcdH0pXG5cdH1cblxuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHJlcXVlc3RQYXNzd29yZFJlc2V0KGVtYWlsKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0UGFzc3dvcmRSZXNldD9lbWFpbD0ke2VtYWlsfWAsXG5cdFx0XHRtZXRob2Q6J2dldCdcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHJlc2V0UGFzc3dvcmQob2xkUGFzc3dvcmQsbmV3UGFzc3dvcmQpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlc2V0UGFzc3dvcmRgLFxuXHRcdFx0bWV0aG9kOidwb3N0Jyxcblx0XHRcdGRhdGE6e29sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkfVxuXHRcdH0pLnRoZW4odXNlcj0+c2V0Q3VycmVudCh1c2VyKSlcblx0fVxuXHQvKipcblx0ICogIEBpbnN0YW5jZVxuXHQgKi9cbiAgICBzdGF0aWMgbG9nb3V0KCl7XG5cdFx0cmV0dXJuIHNldEN1cnJlbnQobnVsbClcblx0fVxuXG5cblx0c3RhdGljIGluaXQoKXtcblx0XHR0aGlzLnN1cGVyKFwiaW5pdFwiKSgpXG5cdFx0cmV0dXJuIHRoaXMudmVyaWZ5KClcblx0fVxuXG5cdHN0YXRpYyBnZXQgX25hbWUoKXtcblx0XHRyZXR1cm4gJ3VzZXJzJ1xuXHR9XG5cblx0c3RhdGljIGdldCBjdXJyZW50KCl7XG5cdFx0cmV0dXJuIF9fY3VycmVudFxuXHR9XG5cblx0c3RhdGljIGdldCBjdXJyZW50QXNBdXRob3IoKXtcblx0XHRyZXR1cm4ge19pZDpfX2N1cnJlbnQuX2lkLCB1c2VybmFtZTpfX2N1cnJlbnQudXNlcm5hbWV9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0Q3VycmVudCh1c2VyKXtcblx0cmV0dXJuIFByb21pc2UuYWxsKCh1c2VyICYmIHVzZXIuX2lkKSA/XG5cdFx0W1VzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJyxKU09OLnN0cmluZ2lmeSh1c2VyKSksXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvblRva2VuJywgdXNlci5zZXNzaW9uVG9rZW4pXSA6XG5cdFx0W1VzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyksXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvblRva2VuJyldKVxuXHQudGhlbigoKT0+e1xuXHRcdF9fY3VycmVudD11c2VyXG5cdFx0VXNlci5lbWl0KCdjaGFuZ2UnLF9fY3VycmVudClcblx0XHRyZXR1cm4gX19jdXJyZW50XG5cdH0pXG59XG4iXX0=