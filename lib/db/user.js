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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInRva2VuIiwiX3Nlc3Npb25Ub2tlbiIsImUiLCJsb2dvdXQiLCJwaG9uZSIsImV4aXN0ZW5jZSIsInNhbHQiLCJ2ZXJpZnlQaG9uZSIsIm9sZFBhc3N3b3JkIiwibmV3UGFzc3dvcmQiLCJzZXNzaW9uVG9rZW4iLCJQcm9taXNlIiwiYWxsIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW1vdmVJdGVtIiwiZG9jdW1lbnQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInN1cGVyIiwidmVyaWZ5IiwiYSIsIl9pZCIsInVzZXJuYW1lIiwiQnVpbHRJbiIsImVtaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFBY0EsUUFBUSxXQUFSLEM7SUFBVEMsTyxZQUFBQSxPOztBQUVMLElBQUlDLFNBQU8sSUFBWDtBQUFBLElBQ0NDLFlBQVUsSUFEWDs7SUFHcUJDLEk7Ozs7Ozs7Ozs7OztBQUNwQjs7O3lCQUdjQyxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDTkMsWUFBTyxNQUREO0FBRU5DLFNBQU8sS0FBS04sTUFBWixXQUZNO0FBR05PLHVCQUFTSixJQUFUO0FBSE0sSUFBVixFQUlISyxJQUpHLENBSUU7QUFBQSxXQUFNQyxXQUFXTixJQUFYLENBQU47QUFBQSxJQUpGLENBQVA7QUFLQTtBQUNEOzs7Ozs7eUJBR2NBLEksRUFBSztBQUNsQixVQUFPLEtBQUtDLElBQUwsQ0FBVTtBQUNaRSxTQUFPLEtBQUtOLE1BQVosVUFEWTtBQUVaSyxZQUFPLE1BRks7QUFHZkUsdUJBQVNKLElBQVQ7QUFIZSxJQUFWLEVBSUFLLElBSkEsQ0FJSztB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QkFBckJuQyxJOzs7QUE4R3JCLFNBQVNPLFVBQVQsQ0FBb0JOLElBQXBCLEVBQXlCO0FBQ3hCLFFBQU9vQixRQUFRQyxHQUFSLENBQWFyQixRQUFRQSxLQUFLZ0MsR0FBZCxHQUNsQixDQUFDakMsS0FBS1EsWUFBTCxDQUFrQmUsT0FBbEIsQ0FBMEIsYUFBMUIsRUFBd0NDLEtBQUtDLFNBQUwsQ0FBZXhCLElBQWYsQ0FBeEMsQ0FBRCxFQUNBRCxLQUFLUSxZQUFMLENBQWtCZSxPQUFsQixDQUEwQixjQUExQixFQUEwQ3RCLEtBQUttQixZQUEvQyxDQURBLENBRGtCLEdBR2xCLENBQUNwQixLQUFLUSxZQUFMLENBQWtCa0IsVUFBbEIsQ0FBNkIsYUFBN0IsQ0FBRCxFQUNBMUIsS0FBS1EsWUFBTCxDQUFrQmtCLFVBQWxCLENBQTZCLGNBQTdCLENBREEsQ0FITSxFQUtOcEIsSUFMTSxDQUtELFlBQUk7QUFDVFAsY0FBVUUsSUFBVjtBQUNBRCxPQUFLb0MsSUFBTCxDQUFVLFFBQVYsRUFBbUJyQyxTQUFuQjtBQUNBLFNBQU9BLFNBQVA7QUFDQSxFQVRNLENBQVA7QUFVQSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtTZXJ2aWNlfT1yZXF1aXJlKCcuL3NlcnZpY2UnKVxuXG52YXIgc2VydmVyPW51bGwsXG5cdF9fY3VycmVudD1udWxsO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHNpZ251cCh1c2VyKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0ICAgICAgICAgICAgbWV0aG9kOidwb3N0Jyxcblx0ICAgICAgICAgICAgdXJsOmAke3RoaXMuc2VydmVyfXNpZ251cGAsXG5cdCAgICAgICAgICAgIGRhdGE6ey4uLnVzZXJ9XG5cdFx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXG5cdH1cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyBzaWduaW4odXNlcil7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfWxvZ2luYCxcbiAgICBcdFx0XHRtZXRob2Q6J3Bvc3QnLFxuXHRcdFx0XHRkYXRhOnsuLi51c2VyfVxuICAgIFx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXG5cdH1cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyB2ZXJpZnkoKXtcblx0XHRyZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvblRva2VuJykudGhlbih0b2tlbj0+e1xuXHRcdFx0aWYoIXRva2VuKVxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0XHR1cmw6dGhpcy5zZXJ2ZXIrJ21lJyxcblx0XHRcdFx0bWV0aG9kOidnZXQnLFxuXHRcdFx0XHRfc2Vzc2lvblRva2VuOnRva2VuXG5cdFx0XHR9KS50aGVuKCh1c2VyKT0+e3JldHVybiBzZXRDdXJyZW50KHVzZXIpfSxcblx0XHRcdFx0KGUpPT57XG5cdFx0XHRcdFx0Ly9AVG9kbzogc2hvdWxkIGdvIG9uIHdpdGhvdXQgbmV0d29ya1xuXHRcdFx0XHRcdFVzZXIubG9nb3V0KCk7XG5cdFx0XHRcdFx0cmV0dXJuIGVcblx0XHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHJlcXVlc3RQaG9uZUNvZGUocGhvbmUsZXhpc3RlbmNlKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0UGhvbmVDb2RlYCxcblx0XHRcdG1ldGhvZDoncG9zdCcsXG5cdFx0XHRkYXRhOntwaG9uZSxleGlzdGVuY2V9XG5cdFx0fSkudGhlbigoe3NhbHR9KT0+c2FsdClcblx0fVxuXG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgcmVxdWVzdFBhc3N3b3JkUmVzZXQodmVyaWZ5UGhvbmUpe1xuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFBhc3N3b3JkUmVzZXRgLFxuXHRcdFx0XHRtZXRob2Q6J3Bvc3QnLFxuXHRcdFx0XHRkYXRhOnsuLi52ZXJpZnlQaG9uZX1cblx0XHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgcmVzZXRQYXNzd29yZChvbGRQYXNzd29yZCxuZXdQYXNzd29yZCl7XG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVzZXRQYXNzd29yZGAsXG5cdFx0XHRtZXRob2Q6J3Bvc3QnLFxuXHRcdFx0ZGF0YTp7b2xkUGFzc3dvcmQsbmV3UGFzc3dvcmR9XG5cdFx0fSkudGhlbih1c2VyPT5zZXRDdXJyZW50KHVzZXIpKVxuXHR9XG5cdC8qKlxuXHQgKiAgQGluc3RhbmNlXG5cdCAqL1xuICAgIHN0YXRpYyBsb2dvdXQoKXtcblx0XHRkZWxldGUgX19jdXJyZW50LnNlc3Npb25Ub2tlblxuXHRcdHJldHVybiBQcm9taXNlLmFsbChbXG5cdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsYXN0VXNlcicsSlNPTi5zdHJpbmdpZnkoX19jdXJyZW50KSksXG5cdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpLFxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvblRva2VuJylcblx0XHRdKVxuXHRcdC50aGVuKGE9PmRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpKVxuXHR9XG5cblxuXHRzdGF0aWMgaW5pdCgpe1xuXHRcdHRoaXMuc3VwZXIoXCJpbml0XCIpKClcblx0XHRyZXR1cm4gdGhpcy52ZXJpZnkoKVxuXHR9XG5cblx0c3RhdGljIGdldCBfbmFtZSgpe1xuXHRcdHJldHVybiAndXNlcnMnXG5cdH1cblxuXHRzdGF0aWMgZ2V0IGN1cnJlbnQoKXtcblx0XHRyZXR1cm4gX19jdXJyZW50XG5cdH1cblxuXHRzdGF0aWMgZ2V0IGN1cnJlbnRBc0F1dGhvcigpe1xuXHRcdHJldHVybiB7X2lkOl9fY3VycmVudC5faWQsIHVzZXJuYW1lOl9fY3VycmVudC51c2VybmFtZX1cblx0fVxuXG5cdHN0YXRpYyBpc1R1dG9yaWFsaXplZCgpe1xuXHRcdHJldHVybiBVc2VyLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiX190dXRvcmlhbGl6ZWRcIilcblx0XHRcdC50aGVuKGE9Pntcblx0XHRcdFx0aWYoIWEpe1xuXHRcdFx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJfX3R1dG9yaWFsaXplZFwiLFwidHJ1ZVwiKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBhXG5cdFx0XHR9KVxuXHR9XG59XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnQodXNlcil7XG5cdHJldHVybiBQcm9taXNlLmFsbCgodXNlciAmJiB1c2VyLl9pZCkgP1xuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50VXNlcicsSlNPTi5zdHJpbmdpZnkodXNlcikpLFxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nlc3Npb25Ub2tlbicsIHVzZXIuc2Vzc2lvblRva2VuKV0gOlxuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpLFxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpXSlcblx0LnRoZW4oKCk9Pntcblx0XHRfX2N1cnJlbnQ9dXNlclxuXHRcdFVzZXIuZW1pdCgnY2hhbmdlJyxfX2N1cnJlbnQpXG5cdFx0cmV0dXJuIF9fY3VycmVudFxuXHR9KVxufVxuIl19