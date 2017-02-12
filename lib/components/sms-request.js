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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Ntcy1yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbIlNNU1JlcXVlc3QiLCJzdGF0ZSIsInBob25lIiwidGljayIsImVycm9yIiwiaSIsImRvVGljayIsIl90Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwic2V0U3RhdGUiLCJwcm9wcyIsImRpc3BhdGNoIiwiZXhpc3RlbmNlIiwiYnV0dG9uIiwiUEhPTkVfQ09ERV9SRVFVRVNUIiwicmVmcyIsImdldFZhbHVlIiwidGhlbiIsInNhbHQiLCJjYXRjaCIsIm1lc3NhZ2UiLCJ2YWx1ZSIsInRhcmdldCIsImlzUGhvbmUiLCJ2IiwidGVzdCIsImNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7SUFFYUEsVSxXQUFBQSxVOzs7Ozs7Ozs7Ozs7Ozs0TEFDWkMsSyxHQUFNLEVBQUNDLE9BQU0sSUFBUCxFQUFZQyxNQUFLLElBQWpCLEVBQXVCQyxPQUFNLElBQTdCLEU7Ozs7O3lCQUVHO0FBQUE7O0FBQ0YsT0FBSUMsSUFBRSxFQUFOO0FBQUEsT0FBVUMsZUFBVjtBQUNBLFFBQUtDLEVBQUwsR0FBUUMsWUFBWUYsU0FBTyxrQkFBSTtBQUMzQixRQUFHRCxLQUFHLENBQU4sRUFBUTtBQUNKSSxtQkFBYyxPQUFLRixFQUFuQjtBQUNBLFlBQUtHLFFBQUwsQ0FBYyxFQUFDUCxNQUFNLENBQVAsRUFBZDtBQUNILEtBSEQsTUFJSSxPQUFLTyxRQUFMLENBQWMsRUFBQ1AsTUFBS0UsR0FBTixFQUFkO0FBQ1AsSUFOTyxFQU1OLElBTk0sQ0FBUjs7QUFRQUM7QUFDSDs7O3lDQUVxQjtBQUNsQixPQUFHLEtBQUtDLEVBQVIsRUFDSUUsY0FBYyxLQUFLRixFQUFuQjtBQUNQOzs7MkJBRU87QUFBQTs7QUFBQSxnQkFDc0IsS0FBS04sS0FEM0I7QUFBQSxPQUNHQyxLQURILFVBQ0dBLEtBREg7QUFBQSxPQUNVQyxJQURWLFVBQ1VBLElBRFY7QUFBQSxPQUNlQyxLQURmLFVBQ2VBLEtBRGY7QUFBQSxnQkFFdUIsS0FBS08sS0FGNUI7QUFBQSxPQUVIQyxRQUZHLFVBRUhBLFFBRkc7QUFBQSxpQ0FFTUMsU0FGTjtBQUFBLE9BRU1BLFNBRk4sb0NBRWdCLEtBRmhCOztBQUdWLE9BQUlDLGVBQUo7QUFDQSxPQUFHWixLQUFILEVBQVM7QUFDQyxRQUFHQyxJQUFILEVBQ0lXLFNBQVEsd0RBQVksT0FBT1gsSUFBbkIsRUFBeUIsVUFBVSxJQUFuQyxHQUFSLENBREosS0FHSVcsU0FBUSx3REFBWSxPQUFPWCxTQUFPLENBQVAsR0FBVyxNQUFYLEdBQW9CLE9BQXZDO0FBQ2pCLGNBQVMsb0JBQUc7QUFDWCxhQUFLQSxJQUFMO0FBQ0FTLGVBQVMsZ0JBQU9HLGtCQUFQLENBQTBCLE9BQUtDLElBQUwsQ0FBVWQsS0FBVixDQUFnQmUsUUFBaEIsRUFBMUIsRUFBcURKLFNBQXJELENBQVQsRUFDRUssSUFERixDQUNPO0FBQUEsY0FBTSxPQUFLQyxJQUFMLEdBQVVBLElBQWhCO0FBQUEsT0FEUCxFQUVFQyxLQUZGLENBRVE7QUFBQSxXQUFVaEIsS0FBVixTQUFFaUIsT0FBRjtBQUFBLGNBQW1CLE9BQUtYLFFBQUwsQ0FBYyxFQUFDTixZQUFELEVBQWQsQ0FBbkI7QUFBQSxPQUZSO0FBR0EsTUFOZ0IsR0FBUjtBQU9QOztBQUVELFVBQ0w7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBLE9BQUssV0FBVSxNQUFmO0FBQ0M7QUFBQTtBQUFBO0FBQ0M7QUFDQyxZQUFJLE9BREw7QUFFQyxrQkFBVyxJQUZaO0FBR0MsaUJBQVMsb0JBSFY7QUFJQyxpQkFBVSxDQUFDLENBQUNELElBSmI7QUFLQyxrQkFBV0MsS0FMWjtBQU1DLGlCQUFVO0FBQUEsWUFBVWtCLEtBQVYsU0FBRUMsTUFBRixDQUFVRCxLQUFWO0FBQUEsZUFBb0IsT0FBS1osUUFBTCxDQUFjLEVBQUNSLE9BQU8sT0FBS3NCLE9BQUwsQ0FBYUYsS0FBYixJQUFxQkEsS0FBckIsR0FBNkIsSUFBckMsRUFBZCxDQUFwQjtBQUFBLFFBTlg7QUFERCxNQUREO0FBVUM7QUFBQTtBQUFBO0FBQ0VSO0FBREY7QUFWRCxLQUREO0FBZ0JDLDJEQUFXLEtBQUksTUFBZixFQUFzQixXQUFXLElBQWpDLEVBQXVDLFVBQVMsZ0NBQWhEO0FBaEJELElBREs7QUFvQkg7OzswQkFFSVcsQyxFQUFFO0FBQ0gsVUFBUSxzQkFBRCxDQUF3QkMsSUFBeEIsQ0FBNkJELENBQTdCO0FBQVA7QUFDSDs7O3NCQUVNO0FBQ1QsVUFBTztBQUNOdkIsV0FBTSxLQUFLRCxLQUFMLENBQVdDLEtBRFg7QUFFTnlCLFVBQUssS0FBS1gsSUFBTCxDQUFVVyxJQUFWLENBQWVWLFFBQWYsRUFGQztBQUdORSxVQUFLLEtBQUtBO0FBSEosSUFBUDtBQUtBOzs7Ozs7a0JBR2FuQixVIiwiZmlsZSI6InNtcy1yZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0ZsYXRCdXR0b24sVGV4dEZpZWxkfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtBQ1RJT059IGZyb20gXCIuLi9hY2NvdW50XCJcblxuZXhwb3J0IGNsYXNzIFNNU1JlcXVlc3QgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHN0YXRlPXtwaG9uZTpudWxsLHRpY2s6bnVsbCwgZXJyb3I6bnVsbH1cblxuICAgIHRpY2soKXtcbiAgICAgICAgbGV0IGk9NjAsIGRvVGljaztcbiAgICAgICAgdGhpcy5fdD1zZXRJbnRlcnZhbChkb1RpY2s9KCk9PntcbiAgICAgICAgICAgIGlmKGk9PTApe1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0aWNrOiAwfSlcbiAgICAgICAgICAgIH1lbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dGljazppLS19KVxuICAgICAgICB9LDEwMDApO1xuXG4gICAgICAgIGRvVGljaygpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgaWYodGhpcy5fdClcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fdClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge3Bob25lLCB0aWNrLGVycm9yfT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2Rpc3BhdGNoLGV4aXN0ZW5jZT1mYWxzZX09dGhpcy5wcm9wc1xuXHRcdGxldCBidXR0b25cblx0XHRpZihwaG9uZSl7XG4gICAgICAgICAgICBpZih0aWNrKVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2t9IGRpc2FibGVkPXt0cnVlfS8+KVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGJ1dHRvbj0oPEZsYXRCdXR0b24gbGFiZWw9e3RpY2s9PT0wID8gXCLph43mlrDnlLPor7dcIiA6IFwi55Sz6K+36aqM6K+B56CBXCJ9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pntcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnRpY2soKVxuXHRcdFx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5QSE9ORV9DT0RFX1JFUVVFU1QodGhpcy5yZWZzLnBob25lLmdldFZhbHVlKCksZXhpc3RlbmNlKSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHNhbHQ9PnRoaXMuc2FsdD1zYWx0KVxuXHRcdFx0XHRcdFx0XHRcdFx0LmNhdGNoKCh7bWVzc2FnZTplcnJvcn0pPT50aGlzLnNldFN0YXRlKHtlcnJvcn0pKVxuXHRcdFx0XHRcdFx0XHR9fS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZ3JpZFwiPlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHQ8VGV4dEZpZWxkXG5cdFx0XHRcdFx0XHRcdHJlZj1cInBob25lXCJcblx0XHRcdFx0XHRcdFx0ZnVsbFdpZHRoPXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRoaW50VGV4dD1cIuaJi+acuuWPt1wiXG5cdFx0XHRcdFx0XHRcdGRpc2FibGVkPXshIXRpY2t9XG5cdFx0XHRcdFx0XHRcdGVycm9yVGV4dD17ZXJyb3J9XG5cdFx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnRoaXMuc2V0U3RhdGUoe3Bob25lOiB0aGlzLmlzUGhvbmUodmFsdWUpPyB2YWx1ZSA6IG51bGx9KX0vPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHR7YnV0dG9ufVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHQ8VGV4dEZpZWxkIHJlZj1cImNvZGVcIiBmdWxsV2lkdGg9e3RydWV9IGhpbnRUZXh0PVwi5omL5py66aqM6K+B56CBXCIgLz5cblx0XHRcdDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG5cdGlzUGhvbmUodil7XG4gICAgICAgIHJldHVybiAoL14oXFwrXFxkezJ9KT9cXGR7MTF9JC9nKS50ZXN0KHYpXG4gICAgfVxuXG5cdGdldCBkYXRhKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHBob25lOnRoaXMuc3RhdGUucGhvbmUsXG5cdFx0XHRjb2RlOnRoaXMucmVmcy5jb2RlLmdldFZhbHVlKCksXG5cdFx0XHRzYWx0OnRoaXMuc2FsdFxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTTVNSZXF1ZXN0XG4iXX0=