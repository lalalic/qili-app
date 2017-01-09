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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZGF0YSIsInRoZW4iLCJzZXRDdXJyZW50IiwiT2JqZWN0IiwiYXNzaWduIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJ0b2tlbiIsIl9zZXNzaW9uVG9rZW4iLCJlIiwibG9nb3V0IiwicGhvbmUiLCJjb2RlIiwiZW1haWwiLCJvbGRQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwic2Vzc2lvblRva2VuIiwiUHJvbWlzZSIsImFsbCIsInNldEl0ZW0iLCJKU09OIiwic3RyaW5naWZ5IiwicmVtb3ZlSXRlbSIsImRvY3VtZW50IiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdXBlciIsInZlcmlmeSIsImEiLCJfaWQiLCJCdWlsdEluIiwiZW1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7ZUFEY0EsUUFBUSxXQUFSLEM7SUFBVEMsTyxZQUFBQSxPOztBQUdMLElBQUlDLFNBQU8sSUFBWDtBQUFBLElBQ0NDLFlBQVUsSUFEWDs7SUFHcUJDLEk7Ozs7Ozs7Ozs7OztBQUNwQjs7O3lCQUdjQyxJLEVBQUs7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVU7QUFDUEMsWUFBTyxNQURBO0FBRVBDLFNBQU8sS0FBS04sTUFBWixXQUZPO0FBR1BPLFVBQUtKO0FBSEUsSUFBVixFQUlKSyxJQUpJLENBSUMsVUFBQ0QsSUFBRDtBQUFBLFdBQVFFLFdBQVdDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCUixJQUFqQixFQUFzQkksSUFBdEIsQ0FBWCxDQUFSO0FBQUEsSUFKRCxDQUFQO0FBS0E7QUFDRDs7Ozs7O3lCQUdjSixJLEVBQUs7QUFBQSxPQUNiUyxRQURhLEdBQ01ULElBRE4sQ0FDYlMsUUFEYTtBQUFBLE9BQ0pDLFFBREksR0FDTVYsSUFETixDQUNKVSxRQURJOztBQUVsQixVQUFPLEtBQUtULElBQUwsQ0FBVTtBQUNaRSxTQUFPLEtBQUtOLE1BQVosVUFEWTtBQUVaSyxZQUFPLE1BRks7QUFHZkUsVUFBSyxFQUFDSyxrQkFBRCxFQUFVQyxrQkFBVjtBQUhVLElBQVYsRUFJQUwsSUFKQSxDQUlLLFVBQUNMLElBQUQ7QUFBQSxXQUFRTSxXQUFXTixJQUFYLENBQVI7QUFBQSxJQUpMLENBQVA7QUFLQTtBQUNEOzs7Ozs7MkJBR2U7QUFBQTs7QUFDZCxVQUFPLEtBQUtXLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCLGNBQTFCLEVBQTBDUCxJQUExQyxDQUErQyxpQkFBTztBQUM1RCxRQUFHLENBQUNRLEtBQUosRUFDQyxPQUFPLElBQVA7QUFDRCxXQUFPLE9BQUtaLElBQUwsQ0FBVTtBQUNoQkUsVUFBSSxPQUFLTixNQUFMLEdBQVksSUFEQTtBQUVoQkssYUFBTyxLQUZTO0FBR2hCWSxvQkFBY0Q7QUFIRSxLQUFWLEVBSUpSLElBSkksQ0FJQyxVQUFDTCxJQUFELEVBQVE7QUFBQyxZQUFPTSxXQUFXTixJQUFYLENBQVA7QUFBd0IsS0FKbEMsRUFLTixVQUFDZSxDQUFELEVBQUs7QUFDSjtBQUNBaEIsVUFBS2lCLE1BQUw7QUFDQSxZQUFPRCxDQUFQO0FBQ0EsS0FUSyxDQUFQO0FBVUEsSUFiTSxDQUFQO0FBY0E7OztzQ0FFMEJFLEssRUFBTTtBQUNoQyxVQUFPLEtBQUtoQixJQUFMLENBQVU7QUFDaEJFLFNBQU8sS0FBS04sTUFBWixrQ0FBK0NvQixLQUQvQjtBQUVoQmYsWUFBTztBQUZTLElBQVYsQ0FBUDtBQUlBOzs7OEJBRWtCZSxLLEVBQU9DLEksRUFBSztBQUM5QixVQUFPLEtBQUtqQixJQUFMLENBQVU7QUFDaEJFLFNBQU8sS0FBS04sTUFBWiwwQkFBdUNvQixLQUF2QyxjQUFxREMsSUFEckM7QUFFaEJoQixZQUFPO0FBRlMsSUFBVixDQUFQO0FBSUE7O0FBRUQ7Ozs7Ozt1Q0FHNEJpQixLLEVBQU07QUFDakMsVUFBTyxLQUFLbEIsSUFBTCxDQUFVO0FBQ2hCRSxTQUFPLEtBQUtOLE1BQVosbUNBQWdEc0IsS0FEaEM7QUFFaEJqQixZQUFPO0FBRlMsSUFBVixDQUFQO0FBSUE7OztnQ0FFb0JrQixXLEVBQVlDLFcsRUFBWTtBQUM1QyxVQUFPLEtBQUtwQixJQUFMLENBQVU7QUFDaEJFLFNBQU8sS0FBS04sTUFBWixrQkFEZ0I7QUFFaEJLLFlBQU8sTUFGUztBQUdoQkUsVUFBSyxFQUFDZ0Isd0JBQUQsRUFBYUMsd0JBQWI7QUFIVyxJQUFWLEVBSUpoQixJQUpJLENBSUM7QUFBQSxXQUFNQyxXQUFXTixJQUFYLENBQU47QUFBQSxJQUpELENBQVA7QUFLQTtBQUNEOzs7Ozs7MkJBR2tCO0FBQ2pCLFVBQU9GLFVBQVV3QixZQUFqQjtBQUNBLFVBQU9DLFFBQVFDLEdBQVIsQ0FBWSxDQUNsQnpCLEtBQUtZLFlBQUwsQ0FBa0JjLE9BQWxCLENBQTBCLFVBQTFCLEVBQXFDQyxLQUFLQyxTQUFMLENBQWU3QixTQUFmLENBQXJDLENBRGtCLEVBRWxCQyxLQUFLWSxZQUFMLENBQWtCaUIsVUFBbEIsQ0FBNkIsYUFBN0IsQ0FGa0IsRUFHbEI3QixLQUFLWSxZQUFMLENBQWtCaUIsVUFBbEIsQ0FBNkIsY0FBN0IsQ0FIa0IsQ0FBWixFQUtOdkIsSUFMTSxDQUtEO0FBQUEsV0FBR3dCLFNBQVNDLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQUg7QUFBQSxJQUxDLENBQVA7QUFNQTs7O3lCQUdZO0FBQ1osUUFBS0MsS0FBTCxDQUFXLE1BQVg7QUFDQSxVQUFPLEtBQUtDLE1BQUwsRUFBUDtBQUNBOzs7bUNBY3NCO0FBQ3RCLFVBQU9sQyxLQUFLWSxZQUFMLENBQWtCQyxPQUFsQixDQUEwQixnQkFBMUIsRUFDTFAsSUFESyxDQUNBLGFBQUc7QUFDUixRQUFHLENBQUM2QixDQUFKLEVBQU07QUFDTG5DLFVBQUtZLFlBQUwsQ0FBa0JjLE9BQWxCLENBQTBCLGdCQUExQixFQUEyQyxNQUEzQztBQUNBLFlBQU8sS0FBUDtBQUNBO0FBQ0QsV0FBT1MsQ0FBUDtBQUNBLElBUEssQ0FBUDtBQVFBOzs7c0JBckJpQjtBQUNqQixVQUFPLE9BQVA7QUFDQTs7O3NCQUVtQjtBQUNuQixVQUFPcEMsU0FBUDtBQUNBOzs7c0JBRTJCO0FBQzNCLFVBQU8sRUFBQ3FDLEtBQUlyQyxVQUFVcUMsR0FBZixFQUFvQjFCLFVBQVNYLFVBQVVXLFFBQXZDLEVBQVA7QUFDQTs7OztFQXRHZ0NiLFFBQVF3QyxPOztrQkFBckJyQyxJOzs7QUFvSHJCLFNBQVNPLFVBQVQsQ0FBb0JOLElBQXBCLEVBQXlCO0FBQ3hCLFFBQU91QixRQUFRQyxHQUFSLENBQWF4QixRQUFRQSxLQUFLbUMsR0FBZCxHQUNsQixDQUFDcEMsS0FBS1ksWUFBTCxDQUFrQmMsT0FBbEIsQ0FBMEIsYUFBMUIsRUFBd0NDLEtBQUtDLFNBQUwsQ0FBZTNCLElBQWYsQ0FBeEMsQ0FBRCxFQUNBRCxLQUFLWSxZQUFMLENBQWtCYyxPQUFsQixDQUEwQixjQUExQixFQUEwQ3pCLEtBQUtzQixZQUEvQyxDQURBLENBRGtCLEdBR2xCLENBQUN2QixLQUFLWSxZQUFMLENBQWtCaUIsVUFBbEIsQ0FBNkIsYUFBN0IsQ0FBRCxFQUNBN0IsS0FBS1ksWUFBTCxDQUFrQmlCLFVBQWxCLENBQTZCLGNBQTdCLENBREEsQ0FITSxFQUtOdkIsSUFMTSxDQUtELFlBQUk7QUFDVFAsY0FBVUUsSUFBVjtBQUNBRCxPQUFLc0MsSUFBTCxDQUFVLFFBQVYsRUFBbUJ2QyxTQUFuQjtBQUNBLFNBQU9BLFNBQVA7QUFDQSxFQVRNLENBQVA7QUFVQSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtTZXJ2aWNlfT1yZXF1aXJlKCcuL3NlcnZpY2UnKVxyXG5pbXBvcnQge2Rpc3BhdGNoZXJ9IGZyb20gXCIuLlwiXHJcblxyXG52YXIgc2VydmVyPW51bGwsXHJcblx0X19jdXJyZW50PW51bGw7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgc2lnbnVwKHVzZXIpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDpgJHt0aGlzLnNlcnZlcn1zaWdudXBgLFxyXG4gICAgICAgICAgICBkYXRhOnVzZXJcclxuXHRcdH0pLnRoZW4oKGRhdGEpPT5zZXRDdXJyZW50KE9iamVjdC5hc3NpZ24oe30sdXNlcixkYXRhKSkpXHJcblx0fVxyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgc2lnbmluKHVzZXIpe1xyXG5cdFx0dmFyIHt1c2VybmFtZSxwYXNzd29yZH09dXNlclxyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcbiAgICBcdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9bG9naW5gLFxyXG4gICAgXHRcdFx0bWV0aG9kOidwb3N0JyxcclxuXHRcdFx0XHRkYXRhOnt1c2VybmFtZSxwYXNzd29yZH1cclxuICAgIFx0XHR9KS50aGVuKCh1c2VyKT0+c2V0Q3VycmVudCh1c2VyKSlcclxuXHR9XHJcblx0LyoqXHJcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyB2ZXJpZnkoKXtcclxuXHRcdHJldHVybiB0aGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZXNzaW9uVG9rZW4nKS50aGVuKHRva2VuPT57XHJcblx0XHRcdGlmKCF0b2tlbilcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdFx0dXJsOnRoaXMuc2VydmVyKydtZScsXHJcblx0XHRcdFx0bWV0aG9kOidnZXQnLFxyXG5cdFx0XHRcdF9zZXNzaW9uVG9rZW46dG9rZW5cclxuXHRcdFx0fSkudGhlbigodXNlcik9PntyZXR1cm4gc2V0Q3VycmVudCh1c2VyKX0sXHJcblx0XHRcdFx0KGUpPT57XHJcblx0XHRcdFx0XHQvL0BUb2RvOiBzaG91bGQgZ28gb24gd2l0aG91dCBuZXR3b3JrXHJcblx0XHRcdFx0XHRVc2VyLmxvZ291dCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGVcclxuXHRcdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyByZXF1ZXN0VmVyaWZpY2F0aW9uKHBob25lKXtcclxuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xyXG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVxdWVzdFZlcmlmaWNhdGlvbj9waG9uZT0ke3Bob25lfWAsXHJcblx0XHRcdG1ldGhvZDonZ2V0J1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyB2ZXJpZnlQaG9uZShwaG9uZSwgY29kZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcclxuXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXZlcmlmeVBob25lP3Bob25lPSR7cGhvbmV9JmNvZGU9JHtjb2RlfWAsXHJcblx0XHRcdG1ldGhvZDonZ2V0J1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHRzdGF0aWMgcmVxdWVzdFBhc3N3b3JkUmVzZXQoZW1haWwpe1xyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XHJcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0UGFzc3dvcmRSZXNldD9lbWFpbD0ke2VtYWlsfWAsXHJcblx0XHRcdG1ldGhvZDonZ2V0J1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyByZXNldFBhc3N3b3JkKG9sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkKXtcclxuXHRcdHJldHVybiB0aGlzLmFqYXgoe1xyXG5cdFx0XHR1cmw6YCR7dGhpcy5zZXJ2ZXJ9cmVzZXRQYXNzd29yZGAsXHJcblx0XHRcdG1ldGhvZDoncG9zdCcsXHJcblx0XHRcdGRhdGE6e29sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkfVxyXG5cdFx0fSkudGhlbih1c2VyPT5zZXRDdXJyZW50KHVzZXIpKVxyXG5cdH1cclxuXHQvKipcclxuXHQgKiAgQGluc3RhbmNlXHJcblx0ICovXHJcbiAgICBzdGF0aWMgbG9nb3V0KCl7XHJcblx0XHRkZWxldGUgX19jdXJyZW50LnNlc3Npb25Ub2tlblxyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFtcclxuXHRcdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbGFzdFVzZXInLEpTT04uc3RyaW5naWZ5KF9fY3VycmVudCkpLFxyXG5cdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjdXJyZW50VXNlcicpLFxyXG5cdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uVG9rZW4nKVxyXG5cdFx0XSlcclxuXHRcdC50aGVuKGE9PmRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpKVxyXG5cdH1cclxuXHJcblxyXG5cdHN0YXRpYyBpbml0KCl7XHJcblx0XHR0aGlzLnN1cGVyKFwiaW5pdFwiKSgpXHJcblx0XHRyZXR1cm4gdGhpcy52ZXJpZnkoKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBfbmFtZSgpe1xyXG5cdFx0cmV0dXJuICd1c2VycydcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgY3VycmVudCgpe1xyXG5cdFx0cmV0dXJuIF9fY3VycmVudFxyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBjdXJyZW50QXNBdXRob3IoKXtcclxuXHRcdHJldHVybiB7X2lkOl9fY3VycmVudC5faWQsIHVzZXJuYW1lOl9fY3VycmVudC51c2VybmFtZX1cclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGlzVHV0b3JpYWxpemVkKCl7XHJcblx0XHRyZXR1cm4gVXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIpXHJcblx0XHRcdC50aGVuKGE9PntcclxuXHRcdFx0XHRpZighYSl7XHJcblx0XHRcdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiX190dXRvcmlhbGl6ZWRcIixcInRydWVcIilcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gYVxyXG5cdFx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q3VycmVudCh1c2VyKXtcclxuXHRyZXR1cm4gUHJvbWlzZS5hbGwoKHVzZXIgJiYgdXNlci5faWQpID9cclxuXHRcdFtVc2VyLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50VXNlcicsSlNPTi5zdHJpbmdpZnkodXNlcikpLFxyXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvblRva2VuJywgdXNlci5zZXNzaW9uVG9rZW4pXSA6XHJcblx0XHRbVXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY3VycmVudFVzZXInKSxcclxuXHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Nlc3Npb25Ub2tlbicpXSlcclxuXHQudGhlbigoKT0+e1xyXG5cdFx0X19jdXJyZW50PXVzZXJcclxuXHRcdFVzZXIuZW1pdCgnY2hhbmdlJyxfX2N1cnJlbnQpXHJcblx0XHRyZXR1cm4gX19jdXJyZW50XHJcblx0fSlcclxufVxyXG4iXX0=