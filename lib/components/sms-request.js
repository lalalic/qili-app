"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});
exports.SMSRequest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _account = require("../account");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SMSRequest = exports.SMSRequest = function (_Component) {
				_inherits(SMSRequest, _Component);

				function SMSRequest() {
								var _ref;

								var _temp, _this, _ret;

								_classCallCheck(this, SMSRequest);

								for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
												args[_key] = arguments[_key];
								}

								return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SMSRequest.__proto__ || Object.getPrototypeOf(SMSRequest)).call.apply(_ref, [this].concat(args))), _this), _this.state = { phone: null, tick: null, error: null }, _temp), _possibleConstructorReturn(_this, _ret);
				}

				_createClass(SMSRequest, [{
								key: "tick",
								value: function tick() {
												var _this2 = this;

												var i = 60,
												    doTick = void 0;
												this._t = setInterval(doTick = function doTick() {
																if (i == 0) {
																				clearInterval(_this2._t);
																				_this2.setState({ tick: 0 });
																} else _this2.setState({ tick: i-- });
												}, 1000);

												doTick();
								}
				}, {
								key: "componentWillUnmount",
								value: function componentWillUnmount() {
												if (this._t) clearInterval(this._t);
								}
				}, {
								key: "render",
								value: function render() {
												var _this3 = this;

												var _state = this.state,
												    phone = _state.phone,
												    tick = _state.tick,
												    error = _state.error;
												var _props = this.props,
												    dispatch = _props.dispatch,
												    _props$existence = _props.existence,
												    existence = _props$existence === undefined ? false : _props$existence;

												var button = void 0;
												if (phone) {
																if (tick) button = _react2.default.createElement(_materialUi.FlatButton, { label: tick, disabled: true });else button = _react2.default.createElement(_materialUi.FlatButton, { label: tick === 0 ? "重新申请" : "申请验证码",
																				onClick: function onClick(e) {
																								_this3.tick();
																								dispatch(_account.ACTION.PHONE_CODE_REQUEST(_this3.refs.phone.getValue(), existence)).then(function (salt) {
																												return _this3.salt = salt;
																								}).catch(function (_ref2) {
																												var error = _ref2.message;
																												return _this3.setState({ error: error });
																								});
																				} });
												}

												return _react2.default.createElement(
																"div",
																null,
																_react2.default.createElement(
																				"div",
																				{ className: "grid" },
																				_react2.default.createElement(
																								"div",
																								null,
																								_react2.default.createElement(_materialUi.TextField, {
																												ref: "phone",
																												fullWidth: true,
																												hintText: "\u624B\u673A\u53F7",
																												disabled: !!tick,
																												errorText: error,
																												onChange: function onChange(_ref3) {
																																var value = _ref3.target.value;
																																return _this3.setState({ phone: _this3.isPhone(value) ? value : null });
																												} })
																				),
																				_react2.default.createElement(
																								"div",
																								null,
																								button
																				)
																),
																_react2.default.createElement(_materialUi.TextField, { ref: "code", fullWidth: true, hintText: "\u624B\u673A\u9A8C\u8BC1\u7801" })
												);
								}
				}, {
								key: "isPhone",
								value: function isPhone(v) {
												return (/^(\+\d{2})?\d{11}$/g.test(v)
												);
								}
				}, {
								key: "data",
								get: function get() {
												return {
																phone: this.state.phone,
																code: this.refs.code.getValue(),
																salt: this.salt
												};
								}
				}]);

				return SMSRequest;
}(_react.Component);

exports.default = SMSRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Ntcy1yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIlNNU1JlcXVlc3QiLCJzdGF0ZSIsInBob25lIiwidGljayIsImVycm9yIiwiaSIsImRvVGljayIsIl90Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwic2V0U3RhdGUiLCJwcm9wcyIsImRpc3BhdGNoIiwiZXhpc3RlbmNlIiwiYnV0dG9uIiwiUEhPTkVfQ09ERV9SRVFVRVNUIiwicmVmcyIsImdldFZhbHVlIiwidGhlbiIsInNhbHQiLCJjYXRjaCIsIm1lc3NhZ2UiLCJ2YWx1ZSIsInRhcmdldCIsImlzUGhvbmUiLCJ2IiwidGVzdCIsImNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFYUEsVSxXQUFBQSxVOzs7Ozs7Ozs7Ozs7OztrTUFDWkMsSyxHQUFNLEVBQUNDLE9BQU0sSUFBUCxFQUFZQyxNQUFLLElBQWpCLEVBQXVCQyxPQUFNLElBQTdCLEU7Ozs7OytCQUVHO0FBQUE7O0FBQ0YsZ0JBQUlDLElBQUUsRUFBTjtBQUFBLGdCQUFVQyxlQUFWO0FBQ0EsaUJBQUtDLEVBQUwsR0FBUUMsWUFBWUYsU0FBTyxrQkFBSTtBQUMzQixvQkFBR0QsS0FBRyxDQUFOLEVBQVE7QUFDSkksa0NBQWMsT0FBS0YsRUFBbkI7QUFDQSwyQkFBS0csUUFBTCxDQUFjLEVBQUNQLE1BQU0sQ0FBUCxFQUFkO0FBQ0gsaUJBSEQsTUFJSSxPQUFLTyxRQUFMLENBQWMsRUFBQ1AsTUFBS0UsR0FBTixFQUFkO0FBQ1AsYUFOTyxFQU1OLElBTk0sQ0FBUjs7QUFRQUM7QUFDSDs7OytDQUVxQjtBQUNsQixnQkFBRyxLQUFLQyxFQUFSLEVBQ0lFLGNBQWMsS0FBS0YsRUFBbkI7QUFDUDs7O2lDQUVPO0FBQUE7O0FBQUEseUJBQ3NCLEtBQUtOLEtBRDNCO0FBQUEsZ0JBQ0dDLEtBREgsVUFDR0EsS0FESDtBQUFBLGdCQUNVQyxJQURWLFVBQ1VBLElBRFY7QUFBQSxnQkFDZUMsS0FEZixVQUNlQSxLQURmO0FBQUEseUJBRXVCLEtBQUtPLEtBRjVCO0FBQUEsZ0JBRUhDLFFBRkcsVUFFSEEsUUFGRztBQUFBLDBDQUVNQyxTQUZOO0FBQUEsZ0JBRU1BLFNBRk4sb0NBRWdCLEtBRmhCOztBQUdWLGdCQUFJQyxlQUFKO0FBQ0EsZ0JBQUdaLEtBQUgsRUFBUztBQUNDLG9CQUFHQyxJQUFILEVBQ0lXLFNBQVEsd0RBQVksT0FBT1gsSUFBbkIsRUFBeUIsVUFBVSxJQUFuQyxHQUFSLENBREosS0FHSVcsU0FBUSx3REFBWSxPQUFPWCxTQUFPLENBQVAsR0FBVyxNQUFYLEdBQW9CLE9BQXZDO0FBQ2pCLDZCQUFTLG9CQUFHO0FBQ1gsK0JBQUtBLElBQUw7QUFDQVMsaUNBQVMsZ0JBQU9HLGtCQUFQLENBQTBCLE9BQUtDLElBQUwsQ0FBVWQsS0FBVixDQUFnQmUsUUFBaEIsRUFBMUIsRUFBcURKLFNBQXJELENBQVQsRUFDRUssSUFERixDQUNPO0FBQUEsbUNBQU0sT0FBS0MsSUFBTCxHQUFVQSxJQUFoQjtBQUFBLHlCQURQLEVBRUVDLEtBRkYsQ0FFUTtBQUFBLGdDQUFVaEIsS0FBVixTQUFFaUIsT0FBRjtBQUFBLG1DQUFtQixPQUFLWCxRQUFMLENBQWMsRUFBQ04sWUFBRCxFQUFkLENBQW5CO0FBQUEseUJBRlI7QUFHQSxxQkFOZ0IsR0FBUjtBQU9QOztBQUVELG1CQUNMO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxzQkFBSyxXQUFVLE1BQWY7QUFDQztBQUFBO0FBQUE7QUFDQztBQUNDLGlDQUFJLE9BREw7QUFFQyx1Q0FBVyxJQUZaO0FBR0Msc0NBQVMsb0JBSFY7QUFJQyxzQ0FBVSxDQUFDLENBQUNELElBSmI7QUFLQyx1Q0FBV0MsS0FMWjtBQU1DLHNDQUFVO0FBQUEsb0NBQVVrQixLQUFWLFNBQUVDLE1BQUYsQ0FBVUQsS0FBVjtBQUFBLHVDQUFvQixPQUFLWixRQUFMLENBQWMsRUFBQ1IsT0FBTyxPQUFLc0IsT0FBTCxDQUFhRixLQUFiLElBQXFCQSxLQUFyQixHQUE2QixJQUFyQyxFQUFkLENBQXBCO0FBQUEsNkJBTlg7QUFERCxxQkFERDtBQVVDO0FBQUE7QUFBQTtBQUNFUjtBQURGO0FBVkQsaUJBREQ7QUFnQkMsdUVBQVcsS0FBSSxNQUFmLEVBQXNCLFdBQVcsSUFBakMsRUFBdUMsVUFBUyxnQ0FBaEQ7QUFoQkQsYUFESztBQW9CSDs7O2dDQUVJVyxDLEVBQUU7QUFDSCxtQkFBUSxzQkFBRCxDQUF3QkMsSUFBeEIsQ0FBNkJELENBQTdCO0FBQVA7QUFDSDs7OzRCQUVNO0FBQ1QsbUJBQU87QUFDTnZCLHVCQUFNLEtBQUtELEtBQUwsQ0FBV0MsS0FEWDtBQUVOeUIsc0JBQUssS0FBS1gsSUFBTCxDQUFVVyxJQUFWLENBQWVWLFFBQWYsRUFGQztBQUdORSxzQkFBSyxLQUFLQTtBQUhKLGFBQVA7QUFLQTs7Ozs7O2tCQUdhbkIsVSIsImZpbGUiOiJzbXMtcmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0ZsYXRCdXR0b24sVGV4dEZpZWxkfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge0FDVElPTn0gZnJvbSBcIi4uL2FjY291bnRcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFNNU1JlcXVlc3QgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0c3RhdGU9e3Bob25lOm51bGwsdGljazpudWxsLCBlcnJvcjpudWxsfVxyXG5cclxuICAgIHRpY2soKXtcclxuICAgICAgICBsZXQgaT02MCwgZG9UaWNrO1xyXG4gICAgICAgIHRoaXMuX3Q9c2V0SW50ZXJ2YWwoZG9UaWNrPSgpPT57XHJcbiAgICAgICAgICAgIGlmKGk9PTApe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl90KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazogMH0pXHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOmktLX0pXHJcbiAgICAgICAgfSwxMDAwKTtcclxuXHJcbiAgICAgICAgZG9UaWNrKClcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIGlmKHRoaXMuX3QpXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7cGhvbmUsIHRpY2ssZXJyb3J9PXRoaXMuc3RhdGVcclxuXHRcdGNvbnN0IHtkaXNwYXRjaCxleGlzdGVuY2U9ZmFsc2V9PXRoaXMucHJvcHNcclxuXHRcdGxldCBidXR0b25cclxuXHRcdGlmKHBob25lKXtcclxuICAgICAgICAgICAgaWYodGljaylcclxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBidXR0b249KDxGbGF0QnV0dG9uIGxhYmVsPXt0aWNrPT09MCA/IFwi6YeN5paw55Sz6K+3XCIgOiBcIueUs+ivt+mqjOivgeeggVwifVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PntcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMudGljaygpXHJcblx0XHRcdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uUEhPTkVfQ09ERV9SRVFVRVNUKHRoaXMucmVmcy5waG9uZS5nZXRWYWx1ZSgpLGV4aXN0ZW5jZSkpXHJcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHNhbHQ9PnRoaXMuc2FsdD1zYWx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQuY2F0Y2goKHttZXNzYWdlOmVycm9yfSk9PnRoaXMuc2V0U3RhdGUoe2Vycm9yfSkpXHJcblx0XHRcdFx0XHRcdFx0fX0vPilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8VGV4dEZpZWxkXHJcblx0XHRcdFx0XHRcdFx0cmVmPVwicGhvbmVcIlxyXG5cdFx0XHRcdFx0XHRcdGZ1bGxXaWR0aD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0XHRoaW50VGV4dD1cIuaJi+acuuWPt1wiXHJcblx0XHRcdFx0XHRcdFx0ZGlzYWJsZWQ9eyEhdGlja31cclxuXHRcdFx0XHRcdFx0XHRlcnJvclRleHQ9e2Vycm9yfVxyXG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnRoaXMuc2V0U3RhdGUoe3Bob25lOiB0aGlzLmlzUGhvbmUodmFsdWUpPyB2YWx1ZSA6IG51bGx9KX0vPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHR7YnV0dG9ufVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxUZXh0RmllbGQgcmVmPVwiY29kZVwiIGZ1bGxXaWR0aD17dHJ1ZX0gaGludFRleHQ9XCLmiYvmnLrpqozor4HnoIFcIiAvPlxyXG5cdFx0XHQ8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cdGlzUGhvbmUodil7XHJcbiAgICAgICAgcmV0dXJuICgvXihcXCtcXGR7Mn0pP1xcZHsxMX0kL2cpLnRlc3QodilcclxuICAgIH1cclxuXHJcblx0Z2V0IGRhdGEoKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHBob25lOnRoaXMuc3RhdGUucGhvbmUsXHJcblx0XHRcdGNvZGU6dGhpcy5yZWZzLmNvZGUuZ2V0VmFsdWUoKSxcclxuXHRcdFx0c2FsdDp0aGlzLnNhbHRcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNNU1JlcXVlc3RcclxuIl19