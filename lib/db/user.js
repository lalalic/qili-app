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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRva2VuIiwiX3Nlc3Npb25Ub2tlbiIsImUiLCJsb2dvdXQiLCJwaG9uZSIsImV4aXN0ZW5jZSIsInNhbHQiLCJ2ZXJpZnlQaG9uZSIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJzZXNzaW9uVG9rZW4iLCJQcm9taXNlIiwiYWxsIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIiwiZG9jdW1lbnQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInN1cGVyIiwidmVyaWZ5IiwiYSIsIl9pZCIsInVzZXJuYW1lIiwiQnVpbHRJbiIsImVtaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFBY0EsUUFBUSxXQUFSLEM7SUFBVEMsTyxZQUFBQSxPOztBQUVMLElBQUlDLFNBQU8sSUFBWDtBQUFBLElBQ0NDLFlBQVUsSUFEWDs7SUFHcUJDLEk7Ozs7Ozs7Ozs7OztBQUNwQjs7O3lCQUdjQyxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDTkMsWUFBTyxNQUREO0FBRU5DLFNBQU8sS0FBS04sTUFBWixXQUZNO0FBR05PLHVCQUFTSixJQUFUO0FBSE0sSUFBVixFQUlISyxJQUpHLENBSUU7QUFBQSxXQUFNQyxXQUFXTixJQUFYLENBQU47QUFBQSxJQUpGLENBQVA7QUFLQTtBQUNEOzs7Ozs7eUJBR2NBLEksRUFBSztBQUNsQixVQUFPLEtBQUtDLElBQUwsQ0FBVTtBQUNaRSxTQUFPLEtBQUtOLE1BQVosVUFEWTtBQUVaSyxZQUFPLE1BRks7QUFHZkUsdUJBQVNKLElBQVQ7QUFIZSxJQUFWLEVBSUFLLElBSkEsQ0FJSztB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QkFBckJuQyxJOzs7QUE4R3JCLFNBQVNPLFVBQVQsQ0FBb0JOLElBQXBCLEVBQXlCO0FBQ3hCLFFBQU9vQixRQUFRQyxHQUFSLENBQWFyQixRQUFRQSxLQUFLZ0MsR0FBZCxHQUNsQixDQUFDakMsS0FBS1EsWUFBTCxDQUFrQmUsT0FBbEIsQ0FBMEIsYUFBMUIsRUFBd0NDLEtBQUtDLFNBQUwsQ0FBZXhCLElBQWYsQ0FBeEMsQ0FBRCxFQUNBRCxLQUFLUSxZQUFMLENBQWtCZSxPQUFsQixDQUEwQixjQUExQixFQUEwQ3RCLEtBQUttQixZQUEvQyxDQURBLENBRGtCLEdBR2xCLENBQUNwQixLQUFLUSxZQUFMLENBQWtCa0IsVUFBbEIsQ0FBNkIsYUFBN0IsQ0FBRCxFQUNBMUIsS0FBS1EsWUFBTCxDQUFrQmtCLFVBQWxCLENBQTZCLGNBQTdCLENBREEsQ0FITSxFQUtOcEIsSUFMTSxDQUtELFlBQUk7QUFDVFAsY0FBVUUsSUFBVjtBQUNBRCxPQUFLb0MsSUFBTCxDQUFVLFFBQVYsRUFBbUJyQyxTQUFuQjtBQUNBLFNBQU9BLFNBQVA7QUFDQSxFQVRNLENBQVA7QUFVQSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtTZXJ2aWNlfT1yZXF1aXJlKCcuL3NlcnZpY2UnKVxyXG5cclxudmFyIHNlcnZlcj1udWxsLFxyXG5cdF9fY3VycmVudD1udWxsO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciBleHRlbmRzIFNlcnZpY2UuQnVpbHRJbntcclxuXHQvKipcclxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XHJcblx0ICovXHJcblx0c3RhdGljIHNpZ251cCh1c2VyKXtcclxuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xyXG5cdCAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcblx0ICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNpZ251cGAsXHJcblx0ICAgICAgICAgICAgZGF0YTp7Li4udXNlcn1cclxuXHRcdFx0fSkudGhlbih1c2VyPT5zZXRDdXJyZW50KHVzZXIpKVxyXG5cdH1cclxuXHQvKipcclxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XHJcblx0ICovXHJcblx0c3RhdGljIHNpZ25pbih1c2VyKXtcclxuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xyXG4gICAgXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfWxvZ2luYCxcclxuICAgIFx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdFx0ZGF0YTp7Li4udXNlcn1cclxuICAgIFx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgdmVyaWZ5KCl7XHJcblx0XHRyZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvblRva2VuJykudGhlbih0b2tlbj0+e1xyXG5cdFx0XHRpZighdG9rZW4pXHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdHJldHVybiB0aGlzLmFqYXgoe1xyXG5cdFx0XHRcdHVybDp0aGlzLnNlcnZlcisnbWUnLFxyXG5cdFx0XHRcdG1ldGhvZDonZ2V0JyxcclxuXHRcdFx0XHRfc2Vzc2lvblRva2VuOnRva2VuXHJcblx0XHRcdH0pLnRoZW4oKHVzZXIpPT57cmV0dXJuIHNldEN1cnJlbnQodXNlcil9LFxyXG5cdFx0XHRcdChlKT0+e1xyXG5cdFx0XHRcdFx0Ly9AVG9kbzogc2hvdWxkIGdvIG9uIHdpdGhvdXQgbmV0d29ya1xyXG5cdFx0XHRcdFx0VXNlci5sb2dvdXQoKTtcclxuXHRcdFx0XHRcdHJldHVybiBlXHJcblx0XHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcmVxdWVzdFBob25lQ29kZShwaG9uZSxleGlzdGVuY2Upe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0UGhvbmVDb2RlYCxcclxuXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0ZGF0YTp7cGhvbmUsZXhpc3RlbmNlfVxyXG5cdFx0fSkudGhlbigoe3NhbHR9KT0+c2FsdClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVxdWVzdFBhc3N3b3JkUmVzZXQodmVyaWZ5UGhvbmUpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXJlcXVlc3RQYXNzd29yZFJlc2V0YCxcclxuXHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxyXG5cdFx0XHRcdGRhdGE6ey4uLnZlcmlmeVBob25lfVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHJlc2V0UGFzc3dvcmQob2xkUGFzc3dvcmQsbmV3UGFzc3dvcmQpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXNldFBhc3N3b3JkYCxcclxuXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0ZGF0YTp7b2xkUGFzc3dvcmQsbmV3UGFzc3dvcmR9XHJcblx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqICBAaW5zdGFuY2VcclxuXHQgKi9cclxuICAgIHN0YXRpYyBsb2dvdXQoKXtcclxuXHRcdGRlbGV0ZSBfX2N1cnJlbnQuc2Vzc2lvblRva2VuXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG5cdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYXN0VXNlcicsSlNPTi5zdHJpbmdpZnkoX19jdXJyZW50KSksXHJcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyksXHJcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpXHJcblx0XHRdKVxyXG5cdFx0LnRoZW4oYT0+ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCkpXHJcblx0fVxyXG5cclxuXHJcblx0c3RhdGljIGluaXQoKXtcclxuXHRcdHRoaXMuc3VwZXIoXCJpbml0XCIpKClcclxuXHRcdHJldHVybiB0aGlzLnZlcmlmeSgpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XHJcblx0XHRyZXR1cm4gJ3VzZXJzJ1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBjdXJyZW50KCl7XHJcblx0XHRyZXR1cm4gX19jdXJyZW50XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IGN1cnJlbnRBc0F1dGhvcigpe1xyXG5cdFx0cmV0dXJuIHtfaWQ6X19jdXJyZW50Ll9pZCwgdXNlcm5hbWU6X19jdXJyZW50LnVzZXJuYW1lfVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlzVHV0b3JpYWxpemVkKCl7XHJcblx0XHRyZXR1cm4gVXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIpXHJcblx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRpZighYSl7XHJcblx0XHRcdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX190dXRvcmlhbGl6ZWRcIixcInRydWVcIilcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gYVxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudCh1c2VyKXtcclxuXHRyZXR1cm4gUHJvbWlzZS5hbGwoKHVzZXIgJiYgdXNlci5faWQpID9cclxuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50VXNlcicsSlNPTi5zdHJpbmdpZnkodXNlcikpLFxyXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvblRva2VuJywgdXNlci5zZXNzaW9uVG9rZW4pXSA6XHJcblx0XHRbVXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSxcclxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpXSlcclxuXHQudGhlbigoKT0+e1xyXG5cdFx0X19jdXJyZW50PXVzZXJcclxuXHRcdFVzZXIuZW1pdCgnY2hhbmdlJyxfX2N1cnJlbnQpXHJcblx0XHRyZXR1cm4gX19jdXJyZW50XHJcblx0fSlcclxufVxyXG4iXX0=