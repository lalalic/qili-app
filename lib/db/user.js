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
	return _promise2.default.all(user && user._id ? [User.localStorage.setItem('currentUser', (0, _stringify2.default)(user)), User.localStorage.setItem('sessionToken', user.sessionToken)] : [User.localStorage.removeItem('currentUser'), User.localStorage.removeItem('sessionToken')]).then(function () {
		__current = user;
		User.emit('change', __current);
		return __current;
	});
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiX25hbWUiLCJkYXRhIiwidGhlbiIsInNldEN1cnJlbnQiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRva2VuIiwiX3Nlc3Npb25Ub2tlbiIsImUiLCJsb2dvdXQiLCJwaG9uZSIsImNvZGUiLCJlbWFpbCIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJ2ZXJpZnkiLCJfaWQiLCJCdWlsdEluIiwiYWxsIiwic2V0SXRlbSIsInNlc3Npb25Ub2tlbiIsInJlbW92ZUl0ZW0iLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O2VBRGNBLFFBQVEsV0FBUixDOztJQUFUQyxPLFlBQUFBLE87OztBQUdMLElBQUlDLFNBQU8sSUFBWDtBQUFBLElBQ0NDLFlBQVUsSUFEWDs7SUFHcUJDLEk7Ozs7Ozs7Ozs7O0FBQ3BCOzs7eUJBR2NDLEksRUFBSztBQUNsQixVQUFPLEtBQUtDLElBQUwsQ0FBVTtBQUNQQyxZQUFPLE1BREE7QUFFUEMsU0FBSSxLQUFLTixNQUFMLEdBQVksS0FBS08sS0FGZDtBQUdQQyxVQUFLTDtBQUhFLElBQVYsRUFJSk0sSUFKSSxDQUlDLFVBQUNELElBQUQ7QUFBQSxXQUFRRSxXQUFXLHNCQUFjLEVBQWQsRUFBaUJQLElBQWpCLEVBQXNCSyxJQUF0QixDQUFYLENBQVI7QUFBQSxJQUpELENBQVA7QUFLQTtBQUNEOzs7Ozs7eUJBR2NMLEksRUFBSztBQUFBLE9BQ2JRLFFBRGEsR0FDTVIsSUFETixDQUNiUSxRQURhO0FBQUEsT0FDSkMsUUFESSxHQUNNVCxJQUROLENBQ0pTLFFBREk7O0FBRWxCLFVBQU8sS0FBS1IsSUFBTCxDQUFVO0FBQ1pFLFNBQU8sS0FBS04sTUFBWix1QkFBb0NXLFFBQXBDLGtCQUF5REMsUUFEN0M7QUFFWlAsWUFBTztBQUZLLElBQVYsRUFHQUksSUFIQSxDQUdLLFVBQUNOLElBQUQ7QUFBQSxXQUFRTyxXQUFXUCxJQUFYLENBQVI7QUFBQSxJQUhMLENBQVA7QUFJQTtBQUNEOzs7Ozs7MkJBR2U7QUFBQTs7QUFDZCxVQUFPLEtBQUtVLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCLGNBQTFCLEVBQTBDTCxJQUExQyxDQUErQyxVQUFDTSxLQUFELEVBQVM7QUFDOUQsUUFBRyxDQUFDQSxLQUFKLEVBQ0MsT0FBTyxJQUFQO0FBQ0QsV0FBTyxPQUFLWCxJQUFMLENBQVU7QUFDaEJFLFVBQUksT0FBS04sTUFBTCxHQUFZLElBREE7QUFFaEJLLGFBQU8sS0FGUztBQUdoQlcsb0JBQWNEO0FBSEUsS0FBVixFQUlKTixJQUpJLENBSUMsVUFBQ04sSUFBRCxFQUFRO0FBQUMsWUFBT08sV0FBV1AsSUFBWCxDQUFQO0FBQXdCLEtBSmxDLEVBS04sVUFBQ2MsQ0FBRCxFQUFLO0FBQ0o7QUFDQWYsVUFBS2dCLE1BQUw7QUFDQSxZQUFPRCxDQUFQO0FBQ0EsS0FUSyxDQUFQO0FBVUEsSUFiTSxDQUFQO0FBY0E7OztzQ0FFMEJFLEssRUFBTTtBQUNoQyxVQUFPLEtBQUtmLElBQUwsQ0FBVTtBQUNoQkUsU0FBTyxLQUFLTixNQUFaLGtDQUErQ21CLEtBRC9CO0FBRWhCZCxZQUFPO0FBRlMsSUFBVixDQUFQO0FBSUE7Ozs4QkFFa0JjLEssRUFBT0MsSSxFQUFLO0FBQzlCLFVBQU8sS0FBS2hCLElBQUwsQ0FBVTtBQUNoQkUsU0FBTyxLQUFLTixNQUFaLDBCQUF1Q21CLEtBQXZDLGNBQXFEQyxJQURyQztBQUVoQmYsWUFBTztBQUZTLElBQVYsQ0FBUDtBQUlBOztBQUVEOzs7Ozs7dUNBRzRCZ0IsSyxFQUFNO0FBQ2pDLFVBQU8sS0FBS2pCLElBQUwsQ0FBVTtBQUNoQkUsU0FBTyxLQUFLTixNQUFaLG1DQUFnRHFCLEtBRGhDO0FBRWhCaEIsWUFBTztBQUZTLElBQVYsQ0FBUDtBQUlBOzs7Z0NBRW9CaUIsVyxFQUFZQyxXLEVBQVk7QUFDNUMsVUFBTyxLQUFLbkIsSUFBTCxDQUFVO0FBQ2hCRSxTQUFPLEtBQUtOLE1BQVosa0JBRGdCO0FBRWhCSyxZQUFPLE1BRlM7QUFHaEJHLFVBQUssRUFBQ2Msd0JBQUQsRUFBYUMsd0JBQWI7QUFIVyxJQUFWLEVBSUpkLElBSkksQ0FJQztBQUFBLFdBQU1DLFdBQVdQLElBQVgsQ0FBTjtBQUFBLElBSkQsQ0FBUDtBQUtBO0FBQ0Q7Ozs7OzsyQkFHa0I7QUFDakIsVUFBT08sWUFBUDtBQUNBOzs7eUJBR1k7QUFDWixVQUFPLEtBQUtjLE1BQUwsRUFBUDtBQUNBOzs7c0JBRWlCO0FBQ2pCLFVBQU8sT0FBUDtBQUNBOzs7c0JBRW1CO0FBQ25CLFVBQU92QixTQUFQO0FBQ0E7OztzQkFFMkI7QUFDM0IsVUFBTyxFQUFDd0IsS0FBSXhCLFVBQVV3QixHQUFmLEVBQW9CZCxVQUFTVixVQUFVVSxRQUF2QyxFQUFQO0FBQ0E7OztFQTlGZ0NaLFFBQVEyQixPOztrQkFBckJ4QixJOzs7QUFpR3JCLFNBQVNRLFVBQVQsQ0FBb0JQLElBQXBCLEVBQXlCO0FBQ3hCLFFBQU8sa0JBQVF3QixHQUFSLENBQWF4QixRQUFRQSxLQUFLc0IsR0FBZCxHQUNsQixDQUFDdkIsS0FBS1csWUFBTCxDQUFrQmUsT0FBbEIsQ0FBMEIsYUFBMUIsRUFBd0MseUJBQWV6QixJQUFmLENBQXhDLENBQUQsRUFDQUQsS0FBS1csWUFBTCxDQUFrQmUsT0FBbEIsQ0FBMEIsY0FBMUIsRUFBMEN6QixLQUFLMEIsWUFBL0MsQ0FEQSxDQURrQixHQUdsQixDQUFDM0IsS0FBS1csWUFBTCxDQUFrQmlCLFVBQWxCLENBQTZCLGFBQTdCLENBQUQsRUFDQTVCLEtBQUtXLFlBQUwsQ0FBa0JpQixVQUFsQixDQUE2QixjQUE3QixDQURBLENBSE0sRUFLTnJCLElBTE0sQ0FLRCxZQUFJO0FBQ1RSLGNBQVVFLElBQVY7QUFDQUQsT0FBSzZCLElBQUwsQ0FBVSxRQUFWLEVBQW1COUIsU0FBbkI7QUFDQSxTQUFPQSxTQUFQO0FBQ0EsRUFUTSxDQUFQO0FBVUEiLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7U2VydmljZX09cmVxdWlyZSgnLi9zZXJ2aWNlJylcbmltcG9ydCB7ZGlzcGF0Y2hlcn0gZnJvbSBcIi4uXCJcblxudmFyIHNlcnZlcj1udWxsLFxuXHRfX2N1cnJlbnQ9bnVsbDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyBzaWdudXAodXNlcil7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxuICAgICAgICAgICAgdXJsOnRoaXMuc2VydmVyK3RoaXMuX25hbWUsXG4gICAgICAgICAgICBkYXRhOnVzZXJcblx0XHR9KS50aGVuKChkYXRhKT0+c2V0Q3VycmVudChPYmplY3QuYXNzaWduKHt9LHVzZXIsZGF0YSkpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgc2lnbmluKHVzZXIpe1xuXHRcdHZhciB7dXNlcm5hbWUscGFzc3dvcmR9PXVzZXJcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcbiAgICBcdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9bG9naW4/dXNlcm5hbWU9JHt1c2VybmFtZX0mcGFzc3dvcmQ9JHtwYXNzd29yZH1gLFxuICAgIFx0XHRcdG1ldGhvZDonZ2V0J1xuICAgIFx0XHR9KS50aGVuKCh1c2VyKT0+c2V0Q3VycmVudCh1c2VyKSlcblx0fVxuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHZlcmlmeSgpe1xuXHRcdHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uVG9rZW4nKS50aGVuKCh0b2tlbik9Pntcblx0XHRcdGlmKCF0b2tlbilcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdFx0dXJsOnRoaXMuc2VydmVyKydtZScsXG5cdFx0XHRcdG1ldGhvZDonZ2V0Jyxcblx0XHRcdFx0X3Nlc3Npb25Ub2tlbjp0b2tlblxuXHRcdFx0fSkudGhlbigodXNlcik9PntyZXR1cm4gc2V0Q3VycmVudCh1c2VyKX0sXG5cdFx0XHRcdChlKT0+e1xuXHRcdFx0XHRcdC8vQFRvZG86IHNob3VsZCBnbyBvbiB3aXRob3V0IG5ldHdvcmtcblx0XHRcdFx0XHRVc2VyLmxvZ291dCgpO1xuXHRcdFx0XHRcdHJldHVybiBlXG5cdFx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyByZXF1ZXN0VmVyaWZpY2F0aW9uKHBob25lKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0VmVyaWZpY2F0aW9uP3Bob25lPSR7cGhvbmV9YCxcblx0XHRcdG1ldGhvZDonZ2V0J1xuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgdmVyaWZ5UGhvbmUocGhvbmUsIGNvZGUpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXZlcmlmeVBob25lP3Bob25lPSR7cGhvbmV9JmNvZGU9JHtjb2RlfWAsXG5cdFx0XHRtZXRob2Q6J2dldCdcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyByZXF1ZXN0UGFzc3dvcmRSZXNldChlbWFpbCl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFBhc3N3b3JkUmVzZXQ/ZW1haWw9JHtlbWFpbH1gLFxuXHRcdFx0bWV0aG9kOidnZXQnXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyByZXNldFBhc3N3b3JkKG9sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXNldFBhc3N3b3JkYCxcblx0XHRcdG1ldGhvZDoncG9zdCcsXG5cdFx0XHRkYXRhOntvbGRQYXNzd29yZCxuZXdQYXNzd29yZH1cblx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXG5cdH1cblx0LyoqXG5cdCAqICBAaW5zdGFuY2Vcblx0ICovXG4gICAgc3RhdGljIGxvZ291dCgpe1xuXHRcdHJldHVybiBzZXRDdXJyZW50KClcblx0fVxuXG5cblx0c3RhdGljIGluaXQoKXtcblx0XHRyZXR1cm4gdGhpcy52ZXJpZnkoKVxuXHR9XG5cblx0c3RhdGljIGdldCBfbmFtZSgpe1xuXHRcdHJldHVybiAndXNlcnMnXG5cdH1cblxuXHRzdGF0aWMgZ2V0IGN1cnJlbnQoKXtcblx0XHRyZXR1cm4gX19jdXJyZW50XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGN1cnJlbnRBc0F1dGhvcigpe1xuXHRcdHJldHVybiB7X2lkOl9fY3VycmVudC5faWQsIHVzZXJuYW1lOl9fY3VycmVudC51c2VybmFtZX1cblx0fVxufVxuXG5mdW5jdGlvbiBzZXRDdXJyZW50KHVzZXIpe1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoKHVzZXIgJiYgdXNlci5faWQpID9cblx0XHRbVXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFVzZXInLEpTT04uc3RyaW5naWZ5KHVzZXIpKSxcblx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXNzaW9uVG9rZW4nLCB1c2VyLnNlc3Npb25Ub2tlbildIDpcblx0XHRbVXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSxcblx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uVG9rZW4nKV0pXG5cdC50aGVuKCgpPT57XG5cdFx0X19jdXJyZW50PXVzZXJcblx0XHRVc2VyLmVtaXQoJ2NoYW5nZScsX19jdXJyZW50KVxuXHRcdHJldHVybiBfX2N1cnJlbnRcblx0fSlcbn1cbiJdfQ==