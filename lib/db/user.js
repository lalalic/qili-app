"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require("..");

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
		key: "signup",

		/**
   *  @returns {Promise}
   */
		value: function signup(user) {
			var _this2 = this;

			return User.localStorage.getItem("__phone").then(function (phone) {
				return _this2.ajax({
					method: 'post',
					url: _this2.server + "signup",
					data: _extends({}, user, { phone: phone })
				});
			}).then(function (data) {
				return setCurrent(_extends({}, user, data));
			}).then(function (done) {
				return User.localStorage.removeItem("__phone");
			});
		}
		/**
   *  @returns {Promise}
   */

	}, {
		key: "signin",
		value: function signin(user) {
			var username = user.username,
			    password = user.password;

			return this.ajax({
				url: this.server + "login",
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
		key: "verify",
		value: function verify() {
			var _this3 = this;

			return this.localStorage.getItem('sessionToken').then(function (token) {
				if (!token) return null;
				return _this3.ajax({
					url: _this3.server + 'me',
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
		key: "requestVerification",
		value: function requestVerification(phone, existence) {
			return this.ajax({
				url: this.server + "requestVerification",
				method: 'post',
				data: { phone: phone, existence: existence }
			}).then(function (_ref) {
				var salt = _ref.salt;
				return User.localStorage.setItem("__salt", salt);
			});
		}
	}, {
		key: "verifyPhone",
		value: function verifyPhone(phone, code) {
			var _this4 = this;

			return User.localStorage.getItem("__salt").then(function (salt) {
				return _this4.ajax({
					url: _this4.server + "verifyPhone",
					method: 'post',
					data: { phone: phone, code: code, salt: salt }
				});
			}).then(function (done) {
				return User.localStorage.removeItem("__salt");
			}).then(function (done) {
				return User.localStorage.setItem("__phone", phone);
			});
		}

		/**
   *  @returns {Promise}
   */

	}, {
		key: "requestPasswordReset",
		value: function requestPasswordReset(phone, code) {
			var _this5 = this;

			return User.localStorage.getItem("__salt").then(function (salt) {
				return _this5.ajax({
					url: _this5.server + "requestPasswordReset",
					method: 'post',
					data: { phone: phone, code: code, salt: salt }
				});
			}).then(function (done) {
				return User.localStorage.removeItem("__salt");
			});
		}
	}, {
		key: "resetPassword",
		value: function resetPassword(oldPassword, newPassword) {
			return this.ajax({
				url: this.server + "resetPassword",
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
		key: "logout",
		value: function logout() {
			delete __current.sessionToken;
			return Promise.all([User.localStorage.setItem('lastUser', JSON.stringify(__current)), User.localStorage.removeItem('currentUser'), User.localStorage.removeItem('sessionToken')]).then(function (a) {
				return document.location.reload();
			});
		}
	}, {
		key: "init",
		value: function init() {
			this.super("init")();
			return this.verify();
		}
	}, {
		key: "isTutorialized",
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
		key: "_name",
		get: function get() {
			return 'users';
		}
	}, {
		key: "current",
		get: function get() {
			return __current;
		}
	}, {
		key: "currentAsAuthor",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi91c2VyLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJTZXJ2aWNlIiwic2VydmVyIiwiX19jdXJyZW50IiwiVXNlciIsInVzZXIiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidGhlbiIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkYXRhIiwicGhvbmUiLCJzZXRDdXJyZW50IiwicmVtb3ZlSXRlbSIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJ0b2tlbiIsIl9zZXNzaW9uVG9rZW4iLCJlIiwibG9nb3V0IiwiZXhpc3RlbmNlIiwic2FsdCIsInNldEl0ZW0iLCJjb2RlIiwib2xkUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsInNlc3Npb25Ub2tlbiIsIlByb21pc2UiLCJhbGwiLCJKU09OIiwic3RyaW5naWZ5IiwiZG9jdW1lbnQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInN1cGVyIiwidmVyaWZ5IiwiYSIsIl9pZCIsIkJ1aWx0SW4iLCJlbWl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7O2VBRGNBLFFBQVEsV0FBUixDO0lBQVRDLE8sWUFBQUEsTzs7QUFHTCxJQUFJQyxTQUFPLElBQVg7QUFBQSxJQUNDQyxZQUFVLElBRFg7O0lBR3FCQyxJOzs7Ozs7Ozs7Ozs7QUFDcEI7Ozt5QkFHY0MsSSxFQUFLO0FBQUE7O0FBQ2xCLFVBQU9ELEtBQUtFLFlBQUwsQ0FBa0JDLE9BQWxCLENBQTBCLFNBQTFCLEVBQ0xDLElBREssQ0FDQTtBQUFBLFdBQU8sT0FBS0MsSUFBTCxDQUFVO0FBQ2JDLGFBQU8sTUFETTtBQUViQyxVQUFPLE9BQUtULE1BQVosV0FGYTtBQUdiVSx3QkFBU1AsSUFBVCxJQUFjUSxZQUFkO0FBSGEsS0FBVixDQUFQO0FBQUEsSUFEQSxFQU1MTCxJQU5LLENBTUE7QUFBQSxXQUFNTSx3QkFBZVQsSUFBZixFQUF1Qk8sSUFBdkIsRUFBTjtBQUFBLElBTkEsRUFPTEosSUFQSyxDQU9BO0FBQUEsV0FBTUosS0FB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SXBDLFVBQVVvQyxHQUFmLEVBQW9CdkIsVUFBU2IsVUFBVWEsUUFBdkMsRUFBUDtBQUNBOzs7O0VBbEhnQ2YsUUFBUXVDLE87O2tCQUFyQnBDLEk7OztBQWdJckIsU0FBU1UsVUFBVCxDQUFvQlQsSUFBcEIsRUFBeUI7QUFDeEIsUUFBT3dCLFFBQVFDLEdBQVIsQ0FBYXpCLFFBQVFBLEtBQUtrQyxHQUFkLEdBQ2xCLENBQUNuQyxLQUFLRSxZQUFMLENBQWtCa0IsT0FBbEIsQ0FBMEIsYUFBMUIsRUFBd0NPLEtBQUtDLFNBQUwsQ0FBZTNCLElBQWYsQ0FBeEMsQ0FBRCxFQUNBRCxLQUFLRSxZQUFMLENBQWtCa0IsT0FBbEIsQ0FBMEIsY0FBMUIsRUFBMENuQixLQUFLdUIsWUFBL0MsQ0FEQSxDQURrQixHQUdsQixDQUFDeEIsS0FBS0UsWUFBTCxDQUFrQlMsVUFBbEIsQ0FBNkIsYUFBN0IsQ0FBRCxFQUNBWCxLQUFLRSxZQUFMLENBQWtCUyxVQUFsQixDQUE2QixjQUE3QixDQURBLENBSE0sRUFLTlAsSUFMTSxDQUtELFlBQUk7QUFDVEwsY0FBVUUsSUFBVjtBQUNBRCxPQUFLcUMsSUFBTCxDQUFVLFFBQVYsRUFBbUJ0QyxTQUFuQjtBQUNBLFNBQU9BLFNBQVA7QUFDQSxFQVRNLENBQVA7QUFVQSIsImZpbGUiOiJ1c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtTZXJ2aWNlfT1yZXF1aXJlKCcuL3NlcnZpY2UnKVxuaW1wb3J0IHtkaXNwYXRjaGVyfSBmcm9tIFwiLi5cIlxuXG52YXIgc2VydmVyPW51bGwsXG5cdF9fY3VycmVudD1udWxsO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIGV4dGVuZHMgU2VydmljZS5CdWlsdElue1xuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHNpZ251cCh1c2VyKXtcblx0XHRyZXR1cm4gVXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl9fcGhvbmVcIilcblx0XHRcdC50aGVuKHBob25lPT50aGlzLmFqYXgoe1xuXHQgICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxuXHQgICAgICAgICAgICB1cmw6YCR7dGhpcy5zZXJ2ZXJ9c2lnbnVwYCxcblx0ICAgICAgICAgICAgZGF0YTp7Li4udXNlcixwaG9uZX1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4oZGF0YT0+c2V0Q3VycmVudCh7Li4udXNlciwuLi5kYXRhfSkpXG5cdFx0XHQudGhlbihkb25lPT5Vc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiX19waG9uZVwiKSlcblx0fVxuXHQvKipcblx0ICogIEByZXR1cm5zIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIHNpZ25pbih1c2VyKXtcblx0XHR2YXIge3VzZXJuYW1lLHBhc3N3b3JkfT11c2VyXG5cdFx0cmV0dXJuIHRoaXMuYWpheCh7XG4gICAgXHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfWxvZ2luYCxcbiAgICBcdFx0XHRtZXRob2Q6J3Bvc3QnLFxuXHRcdFx0XHRkYXRhOnt1c2VybmFtZSxwYXNzd29yZH1cbiAgICBcdFx0fSkudGhlbigodXNlcik9PnNldEN1cnJlbnQodXNlcikpXG5cdH1cblx0LyoqXG5cdCAqICBAcmV0dXJucyB7UHJvbWlzZX1cblx0ICovXG5cdHN0YXRpYyB2ZXJpZnkoKXtcblx0XHRyZXR1cm4gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2Vzc2lvblRva2VuJykudGhlbih0b2tlbj0+e1xuXHRcdFx0aWYoIXRva2VuKVxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdHJldHVybiB0aGlzLmFqYXgoe1xuXHRcdFx0XHR1cmw6dGhpcy5zZXJ2ZXIrJ21lJyxcblx0XHRcdFx0bWV0aG9kOidnZXQnLFxuXHRcdFx0XHRfc2Vzc2lvblRva2VuOnRva2VuXG5cdFx0XHR9KS50aGVuKCh1c2VyKT0+e3JldHVybiBzZXRDdXJyZW50KHVzZXIpfSxcblx0XHRcdFx0KGUpPT57XG5cdFx0XHRcdFx0Ly9AVG9kbzogc2hvdWxkIGdvIG9uIHdpdGhvdXQgbmV0d29ya1xuXHRcdFx0XHRcdFVzZXIubG9nb3V0KCk7XG5cdFx0XHRcdFx0cmV0dXJuIGVcblx0XHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIHJlcXVlc3RWZXJpZmljYXRpb24ocGhvbmUsZXhpc3RlbmNlKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0VmVyaWZpY2F0aW9uYCxcblx0XHRcdG1ldGhvZDoncG9zdCcsXG5cdFx0XHRkYXRhOntwaG9uZSxleGlzdGVuY2V9XG5cdFx0fSkudGhlbigoe3NhbHR9KT0+VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIl9fc2FsdFwiLHNhbHQpKVxuXHR9XG5cblx0c3RhdGljIHZlcmlmeVBob25lKHBob25lLCBjb2RlKXtcblx0XHRyZXR1cm4gVXNlci5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIl9fc2FsdFwiKVxuXHRcdFx0LnRoZW4oc2FsdD0+dGhpcy5hamF4KHtcblx0XHRcdFx0dXJsOmAke3RoaXMuc2VydmVyfXZlcmlmeVBob25lYCxcblx0XHRcdFx0bWV0aG9kOidwb3N0Jyxcblx0XHRcdFx0ZGF0YTp7cGhvbmUsY29kZSxzYWx0fVxuXHRcdFx0fSkpXG5cdFx0XHQudGhlbihkb25lPT5Vc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFwiX19zYWx0XCIpKVxuXHRcdFx0LnRoZW4oZG9uZT0+VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIl9fcGhvbmVcIixwaG9uZSkpXG5cblx0fVxuXG5cdC8qKlxuXHQgKiAgQHJldHVybnMge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgcmVxdWVzdFBhc3N3b3JkUmVzZXQocGhvbmUsY29kZSl7XG5cdFx0cmV0dXJuIFVzZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJfX3NhbHRcIilcblx0XHRcdC50aGVuKHNhbHQ9PnRoaXMuYWpheCh7XG5cdFx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXF1ZXN0UGFzc3dvcmRSZXNldGAsXG5cdFx0XHRcdG1ldGhvZDoncG9zdCcsXG5cdFx0XHRcdGRhdGE6e3Bob25lLGNvZGUsc2FsdH1cblx0XHRcdH0pKVxuXHRcdFx0LnRoZW4oZG9uZT0+VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcIl9fc2FsdFwiKSlcblx0fVxuXG5cdHN0YXRpYyByZXNldFBhc3N3b3JkKG9sZFBhc3N3b3JkLG5ld1Bhc3N3b3JkKXtcblx0XHRyZXR1cm4gdGhpcy5hamF4KHtcblx0XHRcdHVybDpgJHt0aGlzLnNlcnZlcn1yZXNldFBhc3N3b3JkYCxcblx0XHRcdG1ldGhvZDoncG9zdCcsXG5cdFx0XHRkYXRhOntvbGRQYXNzd29yZCxuZXdQYXNzd29yZH1cblx0XHR9KS50aGVuKHVzZXI9PnNldEN1cnJlbnQodXNlcikpXG5cdH1cblx0LyoqXG5cdCAqICBAaW5zdGFuY2Vcblx0ICovXG4gICAgc3RhdGljIGxvZ291dCgpe1xuXHRcdGRlbGV0ZSBfX2N1cnJlbnQuc2Vzc2lvblRva2VuXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFtcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RVc2VyJyxKU09OLnN0cmluZ2lmeShfX2N1cnJlbnQpKSxcblx0XHRcdFVzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyksXG5cdFx0XHRVc2VyLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzZXNzaW9uVG9rZW4nKVxuXHRcdF0pXG5cdFx0LnRoZW4oYT0+ZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCkpXG5cdH1cblxuXG5cdHN0YXRpYyBpbml0KCl7XG5cdFx0dGhpcy5zdXBlcihcImluaXRcIikoKVxuXHRcdHJldHVybiB0aGlzLnZlcmlmeSgpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IF9uYW1lKCl7XG5cdFx0cmV0dXJuICd1c2Vycydcblx0fVxuXG5cdHN0YXRpYyBnZXQgY3VycmVudCgpe1xuXHRcdHJldHVybiBfX2N1cnJlbnRcblx0fVxuXG5cdHN0YXRpYyBnZXQgY3VycmVudEFzQXV0aG9yKCl7XG5cdFx0cmV0dXJuIHtfaWQ6X19jdXJyZW50Ll9pZCwgdXNlcm5hbWU6X19jdXJyZW50LnVzZXJuYW1lfVxuXHR9XG5cblx0c3RhdGljIGlzVHV0b3JpYWxpemVkKCl7XG5cdFx0cmV0dXJuIFVzZXIubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJfX3R1dG9yaWFsaXplZFwiKVxuXHRcdFx0LnRoZW4oYT0+e1xuXHRcdFx0XHRpZighYSl7XG5cdFx0XHRcdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIl9fdHV0b3JpYWxpemVkXCIsXCJ0cnVlXCIpXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGFcblx0XHRcdH0pXG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0Q3VycmVudCh1c2VyKXtcblx0cmV0dXJuIFByb21pc2UuYWxsKCh1c2VyICYmIHVzZXIuX2lkKSA/XG5cdFx0W1VzZXIubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N1cnJlbnRVc2VyJyxKU09OLnN0cmluZ2lmeSh1c2VyKSksXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2Vzc2lvblRva2VuJywgdXNlci5zZXNzaW9uVG9rZW4pXSA6XG5cdFx0W1VzZXIubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2N1cnJlbnRVc2VyJyksXG5cdFx0VXNlci5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2Vzc2lvblRva2VuJyldKVxuXHQudGhlbigoKT0+e1xuXHRcdF9fY3VycmVudD11c2VyXG5cdFx0VXNlci5lbWl0KCdjaGFuZ2UnLF9fY3VycmVudClcblx0XHRyZXR1cm4gX19jdXJyZW50XG5cdH0pXG59XG4iXX0=