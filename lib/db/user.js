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
			var all = [];
			if (__current) {
				delete __current.sessionToken;
				all.push(User.localStorage.setItem('lastUser', JSON.stringify(__current)));
			}

			all.push(User.localStorage.removeItem('currentUser'));
			all.push(User.localStorage.removeItem('sessionToken'));
			return Promise.all(all).then(function (a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRva2VuIiwiX3Nlc3Npb25Ub2tlbiIsImxvZ291dCIsImUiLCJwaG9uZSIsImV4aXN0ZW5jZSIsInNhbHQiLCJ2ZXJpZnlQaG9uZSIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJhbGwiLCJzZXNzaW9uVG9rZW4iLCJwdXNoIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIiwiUHJvbWlzZSIsImRvY3VtZW50IiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdXBlciIsInZlcmlmeSIsImEiLCJfaWQiLCJ1c2VybmFtZSIsIkJ1aWx0SW4iLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O2VBQWNBLFFBQVEsV0FBUixDO0lBQVRDLE8sWUFBQUEsTzs7QUFFTCxJQUFJQyxTQUFPLElBQVg7QUFBQSxJQUNDQyxZQUFVLElBRFg7O0lBR3FCQyxJOzs7Ozs7Ozs7Ozs7QUFDcEI7Ozt5QkFHY0MsSSxFQUFLO0FBQ2xCLFVBQU8sS0FBS0MsSUFBTCxDQUFVO0FBQ05DLFlBQU8sTUFERDtBQUVOQyxTQUFPLEtBQUtOLE1BQVosV0FGTTtBQUdOTyx1QkFBU0osSUFBVDtBQUhNLElBQVYsRUFJSEssSUFKRyxDQUlFO0FBQUEsV0FBTUMsV0FBV04sSUFBWCxDQUFOO0FBQUEsSUFKRixDQUFQO0FBS0E7QUFDRDs7Ozs7O3lCQUdjQSxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDWkUsU0FBTyxLQUFLTixNQUFaLFVBRFk7QUFFWkssWUFBTyxNQUZLO0FBR2ZFLHVCQUFTSixJQUFUO0FBSGUsSUFBVixFQUlBSyxJQUpB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Q21DLEtBQUluQyxVQUFVbUMsR0FBZixFQUFvQkMsVUFBU3BDLFVBQVVvQyxRQUF2QyxFQUFQO0FBQ0E7Ozs7RUF0R2dDdEMsUUFBUXVDLE87O2tCQUFyQnBDLEk7OztBQW9IckIsU0FBU08sVUFBVCxDQUFvQk4sSUFBcEIsRUFBeUI7QUFDeEIsUUFBTzBCLFFBQVFQLEdBQVIsQ0FBYW5CLFFBQVFBLEtBQUtpQyxHQUFkLEdBQ2xCLENBQUNsQyxLQUFLUSxZQUFMLENBQWtCZSxPQUFsQixDQUEwQixhQUExQixFQUF3Q0MsS0FBS0MsU0FBTCxDQUFleEIsSUFBZixDQUF4QyxDQUFELEVBQ0FELEtBQUtRLFlBQUwsQ0FBa0JlLE9BQWxCLENBQTBCLGNBQTFCLEVBQTBDdEIsS0FBS29CLFlBQS9DLENBREEsQ0FEa0IsR0FHbEIsQ0FBQ3JCLEtBQUtRLFlBQUwsQ0FBa0JrQixVQUFsQixDQUE2QixhQUE3QixDQUFELEVBQ0ExQixLQUFLUSxZQUFMLENBQWtCa0IsVUFBbEIsQ0FBNkIsY0FBN0IsQ0FEQSxDQUhNLEVBS05wQixJQUxNLENBS0QsWUFBSTtBQUNUUCxjQUFVRSxJQUFWO0FBQ0FELE9BQUtxQyxJQUFMLENBQVUsUUFBVixFQUFtQnRDLFNBQW5CO0FBQ0EsU0FBT0EsU0FBUDtBQUNBLEVBVE0sQ0FBUDtBQVVBIiwiZmlsZSI6InVzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIge1NlcnZpY2V9PXJlcXVpcmUoJy4vc2VydmljZScpXHJcblxyXG52YXIgc2VydmVyPW51bGwsXHJcblx0X19jdXJyZW50PW51bGw7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgc2lnbnVwKHVzZXIpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0ICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuXHQgICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9c2lnbnVwYCxcclxuXHQgICAgICAgICAgICBkYXRhOnsuLi51c2VyfVxyXG5cdFx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgc2lnbmluKHVzZXIpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcbiAgICBcdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9bG9naW5gLFxyXG4gICAgXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0XHRkYXRhOnsuLi51c2VyfVxyXG4gICAgXHRcdH0pLnRoZW4odXNlcj0+c2V0Q3VycmVudCh1c2VyKSlcclxuXHR9XHJcblx0LyoqXHJcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyB2ZXJpZnkoKXtcclxuXHRcdHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uVG9rZW4nKS50aGVuKHRva2VuPT57XHJcblx0XHRcdGlmKCF0b2tlbilcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdFx0dXJsOnRoaXMuc2VydmVyKydtZScsXHJcblx0XHRcdFx0bWV0aG9kOidnZXQnLFxyXG5cdFx0XHRcdF9zZXNzaW9uVG9rZW46dG9rZW5cclxuXHRcdFx0fSkudGhlbihcclxuXHRcdFx0XHR1c2VyPT57XHJcblx0XHRcdFx0XHRyZXR1cm4gc2V0Q3VycmVudCh1c2VyKVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZT0+e1xyXG5cdFx0XHRcdFx0Ly9AVG9kbzogc2hvdWxkIGdvIG9uIHdpdGhvdXQgbmV0d29ya1xyXG5cdFx0XHRcdFx0VXNlci5sb2dvdXQoKTtcclxuXHRcdFx0XHRcdHJldHVybiBlXHJcblx0XHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcmVxdWVzdFBob25lQ29kZShwaG9uZSxleGlzdGVuY2Upe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0UGhvbmVDb2RlYCxcclxuXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0ZGF0YTp7cGhvbmUsZXhpc3RlbmNlfVxyXG5cdFx0fSkudGhlbigoe3NhbHR9KT0+c2FsdClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVxdWVzdFBhc3N3b3JkUmVzZXQodmVyaWZ5UGhvbmUpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlcXVlc3RQYXNzd29yZFJlc2V0YCxcclxuXHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRcdGRhdGE6ey4uLnZlcmlmeVBob25lfVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHJlc2V0UGFzc3dvcmQob2xkUGFzc3dvcmQsbmV3UGFzc3dvcmQpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXNldFBhc3N3b3JkYCxcclxuXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0ZGF0YTp7b2xkUGFzc3dvcmQsbmV3UGFzc3dvcmR9XHJcblx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqICBAaW5zdGFuY2VcclxuXHQgKi9cclxuICAgIHN0YXRpYyBsb2dvdXQoKXtcclxuXHRcdGxldCBhbGw9W11cclxuXHRcdGlmKF9fY3VycmVudCl7XHJcblx0XHRcdGRlbGV0ZSBfX2N1cnJlbnQuc2Vzc2lvblRva2VuXHJcblx0XHRcdGFsbC5wdXNoKFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RVc2VyJyxKU09OLnN0cmluZ2lmeShfX2N1cnJlbnQpKSlcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0YWxsLnB1c2goVXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSlcclxuXHRcdGFsbC5wdXNoKFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpKVxyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKGFsbClcclxuXHRcdFx0LnRoZW4oYT0+ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCkpXHJcblx0fVxyXG5cclxuXHJcblx0c3RhdGljIGluaXQoKXtcclxuXHRcdHRoaXMuc3VwZXIoXCJpbml0XCIpKClcclxuXHRcdHJldHVybiB0aGlzLnZlcmlmeSgpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XHJcblx0XHRyZXR1cm4gJ3VzZXJzJ1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBjdXJyZW50KCl7XHJcblx0XHRyZXR1cm4gX19jdXJyZW50XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IGN1cnJlbnRBc0F1dGhvcigpe1xyXG5cdFx0cmV0dXJuIHtfaWQ6X19jdXJyZW50Ll9pZCwgdXNlcm5hbWU6X19jdXJyZW50LnVzZXJuYW1lfVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlzVHV0b3JpYWxpemVkKCl7XHJcblx0XHRyZXR1cm4gVXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIpXHJcblx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRpZighYSl7XHJcblx0XHRcdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX190dXRvcmlhbGl6ZWRcIixcInRydWVcIilcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gYVxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudCh1c2VyKXtcclxuXHRyZXR1cm4gUHJvbWlzZS5hbGwoKHVzZXIgJiYgdXNlci5faWQpID9cclxuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50VXNlcicsSlNPTi5zdHJpbmdpZnkodXNlcikpLFxyXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvblRva2VuJywgdXNlci5zZXNzaW9uVG9rZW4pXSA6XHJcblx0XHRbVXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSxcclxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpXSlcclxuXHQudGhlbigoKT0+e1xyXG5cdFx0X19jdXJyZW50PXVzZXJcclxuXHRcdFVzZXIuZW1pdCgnY2hhbmdlJyxfX2N1cnJlbnQpXHJcblx0XHRyZXR1cm4gX19jdXJyZW50XHJcblx0fSlcclxufVxyXG4iXX0=