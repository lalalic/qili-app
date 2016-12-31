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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwiT2JqZWN0IiwiYXNzaWduIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0b2tlbiIsIl9zZXNzaW9uVG9rZW4iLCJlIiwibG9nb3V0IiwicGhvbmUiLCJjb2RlIiwiZW1haWwiLCJvbGRQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwic2Vzc2lvblRva2VuIiwiUHJvbWlzZSIsImFsbCIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVtb3ZlSXRlbSIsImRvY3VtZW50IiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdXBlciIsInZlcmlmeSIsIl9pZCIsIkJ1aWx0SW4iLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7OztlQURjQSxRQUFRLFdBQVIsQztJQUFUQyxPLFlBQUFBLE87O0FBR0wsSUFBSUMsU0FBTyxJQUFYO0FBQUEsSUFDQ0MsWUFBVSxJQURYOztJQUdxQkMsSTs7Ozs7Ozs7Ozs7O0FBQ3BCOzs7eUJBR2NDLEksRUFBSztBQUNsQixVQUFPLEtBQUtDLElBQUwsQ0FBVTtBQUNQQyxZQUFPLE1BREE7QUFFUEMsU0FBTyxLQUFLTixNQUFaLFdBRk87QUFHUE8sVUFBS0o7QUFIRSxJQUFWLEVBSUpLLElBSkksQ0FJQyxVQUFDRCxJQUFEO0FBQUEsV0FBUUUsV0FBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJSLElBQWpCLEVBQXNCSSxJQUF0QixDQUFYLENBQVI7QUFBQSxJQUpELENBQVA7QUFLQTtBQUNEOzs7Ozs7eUJBR2NKLEksRUFBSztBQUFBLE9BQ2JTLFFBRGEsR0FDTVQsSUFETixDQUNiUyxRQURhO0FBQUEsT0FDSkMsUUFESSxHQUNNVixJQUROLENBQ0pVLFFBREk7O0FBRWxCLFVBQU8sS0FBS1QsSUFBTCxDQUFVO0FBQ1pFLFNBQU8sS0FBS04sTUFBWixVQURZO0FBRVpLLFlBQU8sTUFGSztBQUdmRSxVQUFLLEVBQUNLLGtCQUFELEVBQVVDLGtCQUFWO0FBSFUsSUFBVixFQUlBTCxJQUpBLENBSUssVUFBQ0wsSUFBRDtBQUFBLFdBQVFNLFdBQVdOLElBQVgsQ0FBUjtBQUFBLElBSkwsQ0FBUDtBQUtBO0FBQ0Q7Ozs7OzsyQkFHZTtBQUFBOztBQUNkLFVBQU8sS0FBS1csWUFBTCxDQUFrQkMsT0FBbEIsQ0FBMEIsY0FBMUIsRUFBMENQLElBQTFDLENBQStDLFVBQUNRLEtBQUQsRUFBUztBQUM5RCxRQUFHLENBQUNBLEtBQUosRUFDQyxPQUFPLElBQVA7QUFDRCxXQUFPLE9BQUtaLElBQUwsQ0FBVTtBQUNoQkUsVUFBSSxPQUFLTixNQUFMLEdBQVksSUFEQTtBQUVoQkssYUFBTyxLQUZTO0FBR2hCWSxvQkFBY0Q7QUFIRSxLQUFWLEVBSUpSLElBSkksQ0FJQyxVQUFDTCxJQUFELEVBQVE7QUFBQyxZQUFPTSxXQUFXTixJQUFYLENBQVA7QUFBd0IsS0FKbEMsRUFLTixVQUFDZSxDQUFELEVBQUs7QUFDSjtBQUNBaEIsVUFBS2lCLE1BQUw7QUFDQSxZQUFPRCxDQUFQO0FBQ0EsS0FUSyxDQUFQO0FBVUEsSUFiTSxDQUFQO0FBY0E7OztzQ0FFMEJFLEssRUFBTTtBQUNoQyxVQUFPLEtBQUtoQixJQUFMLENBQVU7QUFDaEJFLFNBQU8sS0FBS04sTUFBWixrQ0FBK0NvQixLQUQvQjtBQUVoQmYsWUFBTztBQUZTLElBQVYsQ0FBUDtBQUlBOzs7OEJBRWtCZSxLLEVBQU9DLEksRUFBSztBQUM5QixVQUFPLEtBQUtqQixJQUFMLENBQVU7QUFDaEJFLFNBQU8sS0FBS04sTUFBWiwwQkFBdUNvQixLQUF2QyxjQUFxREMsSUFEckM7QUFFaEJoQixZQUFPO0FBRlMsSUFBVixDQUFQO0FBSUE7O0FBRUQ7Ozs7Ozt1Q0FHNEJpQixLLEVBQU07QUFDakMsVUFBTyxLQUFLbEIsSUFBTCxDQUFVO0FBQ2hCRSxTQUFPLEtBQUtOLE1BQVosbUNBQWdEc0IsS0FEaEM7QUFFaEJqQixZQUFPO0FBRlMsSUFBVixDQUFQO0FBSUE7OztnQ0FFb0JrQixXLEVBQVlDLFcsRUFBWTtBQUM1QyxVQUFPLEtBQUtwQixJQUFMLENBQVU7QUFDaEJFLFNBQU8sS0FBS04sTUFBWixrQkFEZ0I7QUFFaEJLLFlBQU8sTUFGUztBQUdoQkUsVUFBSyxFQUFDZ0Isd0JBQUQsRUFBYUMsd0JBQWI7QUFIVyxJQUFWLEVBSUpoQixJQUpJLENBSUM7QUFBQSxXQUFNQyxXQUFXTixJQUFYLENBQU47QUFBQSxJQUpELENBQVA7QUFLQTtBQUNEOzs7Ozs7MkJBR2tCO0FBQ2pCLFVBQU9GLFVBQVV3QixZQUFqQjtBQUNBLFVBQU9DLFFBQVFDLEdBQVIsQ0FBWSxDQUNsQnpCLEtBQUtZLFlBQUwsQ0FBa0JjLE9BQWxCLENBQTBCLFVBQTFCLEVBQXFDQyxLQUFLQyxTQUFMLENBQWU3QixTQUFmLENBQXJDLENBRGtCLEVBRWxCQyxLQUFLWSxZQUFMLENBQWtCaUIsVUFBbEIsQ0FBNkIsYUFBN0IsQ0FGa0IsRUFHbEI3QixLQUFLWSxZQUFMLENBQWtCaUIsVUFBbEIsQ0FBNkIsY0FBN0IsQ0FIa0IsQ0FBWixFQUtOdkIsSUFMTSxDQUtEO0FBQUEsV0FBR3dCLFNBQVNDLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQUg7QUFBQSxJQUxDLENBQVA7QUFNQTs7O3lCQUdZO0FBQ1osUUFBS0MsS0FBTCxDQUFXLE1BQVg7QUFDQSxVQUFPLEtBQUtDLE1BQUwsRUFBUDtBQUNBOzs7c0JBRWlCO0FBQ2pCLFVBQU8sT0FBUDtBQUNBOzs7c0JBRW1CO0FBQ25CLFVBQU9uQyxTQUFQO0FBQ0E7OztzQkFFMkI7QUFDM0IsVUFBTyxFQUFDb0MsS0FBSXBDLFVBQVVvQyxHQUFmLEVBQW9CekIsVUFBU1gsVUFBVVcsUUFBdkMsRUFBUDtBQUNBOzs7O0VBdEdnQ2IsUUFBUXVDLE87O2tCQUFyQnBDLEk7OztBQXlHckIsU0FBU08sVUFBVCxDQUFvQk4sSUFBcEIsRUFBeUI7QUFDeEIsUUFBT3VCLFFBQVFDLEdBQVIsQ0FBYXhCLFFBQVFBLEtBQUtrQyxHQUFkLEdBQ2xCLENBQUNuQyxLQUFLWSxZQUFMLENBQWtCYyxPQUFsQixDQUEwQixhQUExQixFQUF3Q0MsS0FBS0MsU0FBTCxDQUFlM0IsSUFBZixDQUF4QyxDQUFELEVBQ0FELEtBQUtZLFlBQUwsQ0FBa0JjLE9BQWxCLENBQTBCLGNBQTFCLEVBQTBDekIsS0FBS3NCLFlBQS9DLENBREEsQ0FEa0IsR0FHbEIsQ0FBQ3ZCLEtBQUtZLFlBQUwsQ0FBa0JpQixVQUFsQixDQUE2QixhQUE3QixDQUFELEVBQ0E3QixLQUFLWSxZQUFMLENBQWtCaUIsVUFBbEIsQ0FBNkIsY0FBN0IsQ0FEQSxDQUhNLEVBS052QixJQUxNLENBS0QsWUFBSTtBQUNUUCxjQUFVRSxJQUFWO0FBQ0FELE9BQUtxQyxJQUFMLENBQVUsUUFBVixFQUFtQnRDLFNBQW5CO0FBQ0EsU0FBT0EsU0FBUDtBQUNBLEVBVE0sQ0FBUDtBQVVBIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1NlcnZpY2V9PXJlcXVpcmUoJy4vc2VydmljZScpXG5pbXBvcnQge2Rpc3BhdGNoZXJ9IGZyb20gXCIuLlwiXG5cbnZhciBzZXJ2ZXI9bnVsbCxcblx0X19jdXJyZW50PW51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIgZXh0ZW5kcyBTZXJ2aWNlLkJ1aWx0SW57XG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgc2lnbnVwKHVzZXIpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgIHVybDpgJHt0aGlzLnNlcnZlcn1zaWdudXBgLFxuICAgICAgICAgICAgZGF0YTp1c2VyXG5cdFx0fSkudGhlbigoZGF0YSk9PnNldEN1cnJlbnQoT2JqZWN0LmFzc2lnbih7fSx1c2VyLGRhdGEpKSlcblx0fVxuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHNpZ25pbih1c2VyKXtcblx0XHR2YXIge3VzZXJuYW1lLHBhc3N3b3JkfT11c2VyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfWxvZ2luYCxcbiAgICBcdFx0XHRtZXRob2Q6J3Bvc3QnLFxuXHRcdFx0XHRkYXRhOnt1c2VybmFtZSxwYXNzd29yZH1cbiAgICBcdFx0fSkudGhlbigodXNlcik9PnNldEN1cnJlbnQodXNlcikpXG5cdH1cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyB2ZXJpZnkoKXtcblx0XHRyZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvblRva2VuJykudGhlbigodG9rZW4pPT57XG5cdFx0XHRpZighdG9rZW4pXG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHRcdHVybDp0aGlzLnNlcnZlcisnbWUnLFxuXHRcdFx0XHRtZXRob2Q6J2dldCcsXG5cdFx0XHRcdF9zZXNzaW9uVG9rZW46dG9rZW5cblx0XHRcdH0pLnRoZW4oKHVzZXIpPT57cmV0dXJuIHNldEN1cnJlbnQodXNlcil9LFxuXHRcdFx0XHQoZSk9Pntcblx0XHRcdFx0XHQvL0BUb2RvOiBzaG91bGQgZ28gb24gd2l0aG91dCBuZXR3b3JrXG5cdFx0XHRcdFx0VXNlci5sb2dvdXQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZVxuXHRcdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgcmVxdWVzdFZlcmlmaWNhdGlvbihwaG9uZSl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFZlcmlmaWNhdGlvbj9waG9uZT0ke3Bob25lfWAsXG5cdFx0XHRtZXRob2Q6J2dldCdcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHZlcmlmeVBob25lKHBob25lLCBjb2RlKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn12ZXJpZnlQaG9uZT9waG9uZT0ke3Bob25lfSZjb2RlPSR7Y29kZX1gLFxuXHRcdFx0bWV0aG9kOidnZXQnXG5cdFx0fSlcblx0fVxuXG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgcmVxdWVzdFBhc3N3b3JkUmVzZXQoZW1haWwpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlcXVlc3RQYXNzd29yZFJlc2V0P2VtYWlsPSR7ZW1haWx9YCxcblx0XHRcdG1ldGhvZDonZ2V0J1xuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgcmVzZXRQYXNzd29yZChvbGRQYXNzd29yZCxuZXdQYXNzd29yZCl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVzZXRQYXNzd29yZGAsXG5cdFx0XHRtZXRob2Q6J3Bvc3QnLFxuXHRcdFx0ZGF0YTp7b2xkUGFzc3dvcmQsbmV3UGFzc3dvcmR9XG5cdFx0fSkudGhlbih1c2VyPT5zZXRDdXJyZW50KHVzZXIpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQGluc3RhbmNlXG5cdCAqL1xuICAgIHN0YXRpYyBsb2dvdXQoKXtcblx0XHRkZWxldGUgX19jdXJyZW50LnNlc3Npb25Ub2tlblxuXHRcdHJldHVybiBQcm9taXNlLmFsbChbXG5cdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYXN0VXNlcicsSlNPTi5zdHJpbmdpZnkoX19jdXJyZW50KSksXG5cdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpLFxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvblRva2VuJylcblx0XHRdKVxuXHRcdC50aGVuKGE9PmRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpKVxuXHR9XG5cblxuXHRzdGF0aWMgaW5pdCgpe1xuXHRcdHRoaXMuc3VwZXIoXCJpbml0XCIpKClcblx0XHRyZXR1cm4gdGhpcy52ZXJpZnkoKVxuXHR9XG5cblx0c3RhdGljIGdldCBfbmFtZSgpe1xuXHRcdHJldHVybiAndXNlcnMnXG5cdH1cblxuXHRzdGF0aWMgZ2V0IGN1cnJlbnQoKXtcblx0XHRyZXR1cm4gX19jdXJyZW50XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGN1cnJlbnRBc0F1dGhvcigpe1xuXHRcdHJldHVybiB7X2lkOl9fY3VycmVudC5faWQsIHVzZXJuYW1lOl9fY3VycmVudC51c2VybmFtZX1cblx0fVxufVxuXG5mdW5jdGlvbiBzZXRDdXJyZW50KHVzZXIpe1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoKHVzZXIgJiYgdXNlci5faWQpID9cblx0XHRbVXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudFVzZXInLEpTT04uc3RyaW5naWZ5KHVzZXIpKSxcblx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZXNzaW9uVG9rZW4nLCB1c2VyLnNlc3Npb25Ub2tlbildIDpcblx0XHRbVXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSxcblx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uVG9rZW4nKV0pXG5cdC50aGVuKCgpPT57XG5cdFx0X19jdXJyZW50PXVzZXJcblx0XHRVc2VyLmVtaXQoJ2NoYW5nZScsX19jdXJyZW50KVxuXHRcdHJldHVybiBfX2N1cnJlbnRcblx0fSlcbn1cbiJdfQ==