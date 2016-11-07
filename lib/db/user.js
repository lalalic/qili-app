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
				url: this.server + this._name,
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
	return _promise2.default.all(user && user._id ? [User.localStorage.setItem('currentUser', (0, _stringify2.default)(user)), User.localStorage.setItem('sessionToken', user.sessionToken)] : [User.localStorage.removeItem('currentUser'), User.localStorage.removeItem('sessionToken')]).then(function () {
		__current = user;
		User.emit('change', __current);
		return __current;
	});
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiX25hbWUiLCJkYXRhIiwidGhlbiIsInNldEN1cnJlbnQiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRva2VuIiwiX3Nlc3Npb25Ub2tlbiIsImUiLCJsb2dvdXQiLCJwaG9uZSIsImNvZGUiLCJlbWFpbCIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJ2ZXJpZnkiLCJfaWQiLCJCdWlsdEluIiwiYWxsIiwic2V0SXRlbSIsInNlc3Npb25Ub2tlbiIsInJlbW92ZUl0ZW0iLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O2VBRGNBLFFBQVEsV0FBUixDO0lBQVRDLE8sWUFBQUEsTzs7QUFHTCxJQUFJQyxTQUFPLElBQVg7QUFBQSxJQUNDQyxZQUFVLElBRFg7O0lBR3FCQyxJOzs7Ozs7Ozs7OztBQUNwQjs7O3lCQUdjQyxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDUEMsWUFBTyxNQURBO0FBRVBDLFNBQUksS0FBS04sTUFBTCxHQUFZLEtBQUtPLEtBRmQ7QUFHUEMsVUFBS0w7QUFIRSxJQUFWLEVBSUpNLElBSkksQ0FJQyxVQUFDRCxJQUFEO0FBQUEsV0FBUUUsV0FBVyxzQkFBYyxFQUFkLEVBQWlCUCxJQUFqQixFQUFzQkssSUFBdEIsQ0FBWCxDQUFSO0FBQUEsSUFKRCxDQUFQO0FBS0E7QUFDRDs7Ozs7O3lCQUdjTCxJLEVBQUs7QUFBQSxPQUNiUSxRQURhLEdBQ01SLElBRE4sQ0FDYlEsUUFEYTtBQUFBLE9BQ0pDLFFBREksR0FDTVQsSUFETixDQUNKUyxRQURJOztBQUVsQixVQUFPLEtBQUtSLElBQUwsQ0FBVTtB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UUFBVixFQUFtQjlCLFNBQW5CO0FBQ0EsU0FBT0EsU0FBUDtBQUNBLEVBVE0sQ0FBUDtBQVVBIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1NlcnZpY2V9PXJlcXVpcmUoJy4vc2VydmljZScpXG5pbXBvcnQge2Rpc3BhdGNoZXJ9IGZyb20gXCIuLlwiXG5cbnZhciBzZXJ2ZXI9bnVsbCxcblx0X19jdXJyZW50PW51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBTZXJ2aWNlLkJ1aWx0SW57XG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgc2lnbnVwKHVzZXIpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgIHVybDp0aGlzLnNlcnZlcit0aGlzLl9uYW1lLFxuICAgICAgICAgICAgZGF0YTp1c2VyXG5cdFx0fSkudGhlbigoZGF0YSk9PnNldEN1cnJlbnQoT2JqZWN0LmFzc2lnbih7fSx1c2VyLGRhdGEpKSlcblx0fVxuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHNpZ25pbih1c2VyKXtcblx0XHR2YXIge3VzZXJuYW1lLHBhc3N3b3JkfT11c2VyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfWxvZ2luP3VzZXJuYW1lPSR7dXNlcm5hbWV9JnBhc3N3b3JkPSR7cGFzc3dvcmR9YCxcbiAgICBcdFx0XHRtZXRob2Q6J2dldCdcbiAgICBcdFx0fSkudGhlbigodXNlcik9PnNldEN1cnJlbnQodXNlcikpXG5cdH1cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyB2ZXJpZnkoKXtcblx0XHRyZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvblRva2VuJykudGhlbigodG9rZW4pPT57XG5cdFx0XHRpZighdG9rZW4pXG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHRcdHVybDp0aGlzLnNlcnZlcisnbWUnLFxuXHRcdFx0XHRtZXRob2Q6J2dldCcsXG5cdFx0XHRcdF9zZXNzaW9uVG9rZW46dG9rZW5cblx0XHRcdH0pLnRoZW4oKHVzZXIpPT57cmV0dXJuIHNldEN1cnJlbnQodXNlcil9LFxuXHRcdFx0XHQoZSk9Pntcblx0XHRcdFx0XHQvL0BUb2RvOiBzaG91bGQgZ28gb24gd2l0aG91dCBuZXR3b3JrXG5cdFx0XHRcdFx0VXNlci5sb2dvdXQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZVxuXHRcdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgcmVxdWVzdFZlcmlmaWNhdGlvbihwaG9uZSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFZlcmlmaWNhdGlvbj9waG9uZT0ke3Bob25lfWAsXG5cdFx0XHRtZXRob2Q6J2dldCdcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHZlcmlmeVBob25lKHBob25lLCBjb2RlKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn12ZXJpZnlQaG9uZT9waG9uZT0ke3Bob25lfSZjb2RlPSR7Y29kZX1gLFxuXHRcdFx0bWV0aG9kOidnZXQnXG5cdFx0fSlcblx0fVxuXG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgcmVxdWVzdFBhc3N3b3JkUmVzZXQoZW1haWwpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlcXVlc3RQYXNzd29yZFJlc2V0P2VtYWlsPSR7ZW1haWx9YCxcblx0XHRcdG1ldGhvZDonZ2V0J1xuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgcmVzZXRQYXNzd29yZChvbGRQYXNzd29yZCxuZXdQYXNzd29yZCl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVzZXRQYXNzd29yZGAsXG5cdFx0XHRtZXRob2Q6J3Bvc3QnLFxuXHRcdFx0ZGF0YTp7b2xkUGFzc3dvcmQsbmV3UGFzc3dvcmR9XG5cdFx0fSkudGhlbih1c2VyPT5zZXRDdXJyZW50KHVzZXIpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQGluc3RhbmNlXG5cdCAqL1xuICAgIHN0YXRpYyBsb2dvdXQoKXtcblx0XHRyZXR1cm4gc2V0Q3VycmVudCgpXG5cdH1cblxuXG5cdHN0YXRpYyBpbml0KCl7XG5cdFx0cmV0dXJuIHRoaXMudmVyaWZ5KClcblx0fVxuXG5cdHN0YXRpYyBnZXQgX25hbWUoKXtcblx0XHRyZXR1cm4gJ3VzZXJzJ1xuXHR9XG5cblx0c3RhdGljIGdldCBjdXJyZW50KCl7XG5cdFx0cmV0dXJuIF9fY3VycmVudFxuXHR9XG5cblx0c3RhdGljIGdldCBjdXJyZW50QXNBdXRob3IoKXtcblx0XHRyZXR1cm4ge19pZDpfX2N1cnJlbnQuX2lkLCB1c2VybmFtZTpfX2N1cnJlbnQudXNlcm5hbWV9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0Q3VycmVudCh1c2VyKXtcblx0cmV0dXJuIFByb21pc2UuYWxsKCh1c2VyICYmIHVzZXIuX2lkKSA/XG5cdFx0W1VzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJyxKU09OLnN0cmluZ2lmeSh1c2VyKSksXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvblRva2VuJywgdXNlci5zZXNzaW9uVG9rZW4pXSA6XG5cdFx0W1VzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyksXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvblRva2VuJyldKVxuXHQudGhlbigoKT0+e1xuXHRcdF9fY3VycmVudD11c2VyXG5cdFx0VXNlci5lbWl0KCdjaGFuZ2UnLF9fY3VycmVudClcblx0XHRyZXR1cm4gX19jdXJyZW50XG5cdH0pXG59XG4iXX0=