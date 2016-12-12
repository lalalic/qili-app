"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Profile = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _photo = require("./components/photo");

var _photo2 = _interopRequireDefault(_photo);

var _user = require("./db/user");

var _user2 = _interopRequireDefault(_user);

var _qiliApp = require("./qiliApp");

var _qiliApp2 = _interopRequireDefault(_qiliApp);

var _ = require(".");

var _infoForm = require("./components/info-form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOMAIN = exports.DOMAIN = "profile";
var ACTION = exports.ACTION = {
	UPDATE: function UPDATE(key, value) {
		return function (dispatch, getState) {
			var user = getState().qiliApp.user;
			user[key] = value;
			_user2.default.upsert(user).then(function (updated) {
				return dispatch(_qiliApp2.default.ACTION.USER_CHANGED(updated));
			});
		};
	}
};

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	return state;
};

var Profile = exports.Profile = function Profile(_ref2) {
	var username = _ref2.username,
	    nick = _ref2.nick,
	    gender = _ref2.gender,
	    location = _ref2.location,
	    photo = _ref2.photo,
	    signature = _ref2.signature,
	    dispatch = _ref2.dispatch,
	    _ref2$valueStyle = _ref2.valueStyle,
	    valueStyle = _ref2$valueStyle === undefined ? { color: "lightgray" } : _ref2$valueStyle;
	return _react2.default.createElement(
		_infoForm.InfoForm,
		{ style: { padding: 5 } },
		_react2.default.createElement(_infoForm.Field, { primaryText: "\u5934\u50CF",
			rightAvatar: _react2.default.createElement(_photo2.default, { src: photo,
				onPhoto: function onPhoto(url) {
					return dispatch(ACTION.UPDATE("photo", url));
				},
				iconRatio: 2 / 3, width: 100, height: 100 }),
			style: { height: 100 } }),
		_react2.default.createElement(_infoForm.Field, { primaryText: "\u8D26\u53F7",
			value: username
		}),
		_react2.default.createElement(_infoForm.Field, { primaryText: "\u6635\u79F0",
			value: nick,
			type: "input",
			onEdit: function onEdit(value) {
				return dispatch(ACTION.UPDATE("nick", value));
			},
			hintText: "\u597D\u540D\u5B57\u53EF\u4EE5\u8BA9\u4F60\u7684\u670B\u53CB\u66F4\u5BB9\u6613\u8BB0\u4F4F\u4F60"
		}),
		_react2.default.createElement(_infoForm.Field, { primaryText: "\u6027\u522B",
			value: gender || "男",
			type: "single",
			options: ["男", "女"],
			onEdit: function onEdit(value) {
				return dispatch(ACTION.UPDATE("gender", value));
			} }),
		_react2.default.createElement(_infoForm.Field, { primaryText: "\u5730\u5740",
			value: location,
			type: "location",
			onEdit: function onEdit(value) {
				return dispatch(ACTION.UPDATE("location", value));
			}
		}),
		_react2.default.createElement(_infoForm.Field, { primaryText: "\u7B7E\u540D",
			value: signature,
			type: "input",
			onEdit: function onEdit(value) {
				return dispatch(ACTION.UPDATE("signature", value));
			}
		})
	);
};

exports.default = (0, _assign2.default)((0, _reactRedux.connect)(function (state) {
	return (0, _.compact)(state.qiliApp.user, "username", "nick", "gender", "location", "photo", "signature");
})(Profile), { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91c2VyLXByb2ZpbGUuanMiXSwibmFtZXMiOlsiRE9NQUlOIiwiQUNUSU9OIiwiVVBEQVRFIiwia2V5IiwidmFsdWUiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwidXNlciIsInFpbGlBcHAiLCJ1cHNlcnQiLCJ0aGVuIiwiVVNFUl9DSEFOR0VEIiwidXBkYXRlZCIsIlJFRFVDRVIiLCJzdGF0ZSIsInR5cGUiLCJwYXlsb2FkIiwiUHJvZmlsZSIsInVzZXJuYW1lIiwibmljayIsImdlbmRlciIsImxvY2F0aW9uIiwicGhvdG8iLCJzaWduYXR1cmUiLCJ2YWx1ZVN0eWxlIiwiY29sb3IiLCJwYWRkaW5nIiwidXJsIiwiaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFFTyxJQUFNQSwwQkFBTyxTQUFiO0FBQ0EsSUFBTUMsMEJBQU87QUFDbkJDLFNBQU8sZ0JBQUNDLEdBQUQsRUFBS0MsS0FBTDtBQUFBLFNBQWEsVUFBQ0MsUUFBRCxFQUFXQyxRQUFYLEVBQXNCO0FBQ3pDLE9BQU1DLE9BQUtELFdBQVdFLE9BQVgsQ0FBbUJELElBQTlCO0FBQ0FBLFFBQUtKLEdBQUwsSUFBVUMsS0FBVjtBQUNBLGtCQUFLSyxNQUFMLENBQVlGLElBQVosRUFBa0JHLElBQWxCLENBQXVCO0FBQUEsV0FBU0wsU0FBUyxrQkFBUUosTUFBUixDQUFlVSxZQUFmLENBQTRCQyxPQUE1QixDQUFULENBQVQ7QUFBQSxJQUF2QjtBQUNBLEdBSk07QUFBQTtBQURZLENBQWI7O0FBUUEsSUFBTUMsNEJBQVEsU0FBUkEsT0FBUSxHQUE2QjtBQUFBLEtBQTVCQyxLQUE0Qix1RUFBdEIsRUFBc0I7QUFBQTtBQUFBLEtBQWpCQyxJQUFpQixRQUFqQkEsSUFBaUI7QUFBQSxLQUFYQyxPQUFXLFFBQVhBLE9BQVc7O0FBQ2pELFFBQU9GLEtBQVA7QUFDQSxDQUZNOztBQUlBLElBQU1HLDRCQUFRLFNBQVJBLE9BQVE7QUFBQSxLQUFFQyxRQUFGLFNBQUVBLFFBQUY7QUFBQSxLQUFXQyxJQUFYLFNBQVdBLElBQVg7QUFBQSxLQUFnQkMsTUFBaEIsU0FBZ0JBLE1BQWhCO0FBQUEsS0FBdUJDLFFBQXZCLFNBQXVCQSxRQUF2QjtBQUFBLEtBQWdDQyxLQUFoQyxTQUFnQ0EsS0FBaEM7QUFBQSxLQUFzQ0MsU0FBdEMsU0FBc0NBLFNBQXRDO0FBQUEsS0FBaURsQixRQUFqRCxTQUFpREEsUUFBakQ7QUFBQSw4QkFBMkRtQixVQUEzRDtBQUFBLEtBQTJEQSxVQUEzRCxvQ0FBc0UsRUFBQ0MsT0FBTSxXQUFQLEVBQXRFO0FBQUEsUUFDcEI7QUFBQTtBQUFBLElBQVUsT0FBTyxFQUFDQyxTQUFRLENBQVQsRUFBakI7QUFDQyxtREFBTyxhQUFZLGNBQW5CO0FBQ0MsZ0JBQ0MsaURBQU8sS0FBS0osS0FBWjtBQUNDLGFBQVM7QUFBQSxZQUFLakIsU0FBU0osT0FBT0MsTUFBUCxDQUFjLE9BQWQsRUFBc0J5QixHQUF0QixDQUFULENBQUw7QUFBQSxLQURWO0FBRUMsZUFBVyxJQUFFLENBRmQsRUFFaUIsT0FBTyxHQUZ4QixFQUU2QixRQUFRLEdBRnJDLEdBRkY7QUFNQyxVQUFPLEVBQUNDLFFBQU8sR0FBUixFQU5SLEdBREQ7QUFTQyxtREFBTyxhQUFZLGNBQW5CO0FBQ0MsVUFBT1Y7QUFEUixJQVREO0FBYUMsbURBQU8sYUFBWSxjQUFuQjtBQUNDLFVBQU9DLElBRFI7QUFFQyxTQUFLLE9BRk47QUFHQyxXQUFRO0FBQUEsV0FBT2QsU0FBU0osT0FBT0MsTUFBUCxDQUFjLE1BQWQsRUFBcUJFLEtBQXJCLENBQVQsQ0FBUDtBQUFBLElBSFQ7QUFJQyxhQUFTO0FBSlYsSUFiRDtBQW9CQyxtREFBTyxhQUFZLGNBQW5CO0FBQ0MsVUFBT2dCLFVBQVEsR0FEaEI7QUFFQyxTQUFLLFFBRk47QUFHQyxZQUFTLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FIVjtBQUlDLFdBQVE7QUFBQSxXQUFPZixTQUFTSixPQUFPQyxNQUFQLENBQWMsUUFBZCxFQUF1QkUsS0FBdkIsQ0FBVCxDQUFQO0FBQUEsSUFKVCxHQXBCRDtBQTBCQyxtREFBTyxhQUFZLGNBQW5CO0FBQ0MsVUFBT2lCLFFBRFI7QUFFQyxTQUFLLFVBRk47QUFHQyxXQUFRO0FBQUEsV0FBT2hCLFNBQVNKLE9BQU9DLE1BQVAsQ0FBYyxVQUFkLEVBQXlCRSxLQUF6QixDQUFULENBQVA7QUFBQTtBQUhULElBMUJEO0FBZ0NDLG1EQUFPLGFBQVksY0FBbkI7QUFDQyxVQUFPbUIsU0FEUjtBQUVDLFNBQUssT0FGTjtBQUdDLFdBQVE7QUFBQSxXQUFPbEIsU0FBU0osT0FBT0MsTUFBUCxDQUFjLFdBQWQsRUFBMEJFLEtBQTFCLENBQVQsQ0FBUDtBQUFBO0FBSFQ7QUFoQ0QsRUFEb0I7QUFBQSxDQUFkOztrQkEwQ1Esc0JBQWMseUJBQVE7QUFBQSxRQUFPLGVBQVFVLE1BQU1OLE9BQU4sQ0FBY0QsSUFBdEIsRUFBMkIsVUFBM0IsRUFBc0MsTUFBdEMsRUFBNkMsUUFBN0MsRUFBc0QsVUFBdEQsRUFBaUUsT0FBakUsRUFBeUUsV0FBekUsQ0FBUDtBQUFBLENBQVIsRUFBc0dVLE9BQXRHLENBQWQsRUFBNkgsRUFBQ2pCLGNBQUQsRUFBU0MsY0FBVCxFQUFpQlksZ0JBQWpCLEVBQTdILEMiLCJmaWxlIjoidXNlci1wcm9maWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuXHJcbmltcG9ydCBQaG90byBmcm9tIFwiLi9jb21wb25lbnRzL3Bob3RvXCJcclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4vZGIvdXNlclwiXHJcbmltcG9ydCBRaWxpQXBwIGZyb20gXCIuL3FpbGlBcHBcIlxyXG5pbXBvcnQge2NvbXBhY3R9IGZyb20gXCIuXCJcclxuXHJcbmltcG9ydCB7SW5mb0Zvcm0sIEZpZWxkfSBmcm9tIFwiLi9jb21wb25lbnRzL2luZm8tZm9ybVwiXHJcblxyXG5leHBvcnQgY29uc3QgRE9NQUlOPVwicHJvZmlsZVwiXHJcbmV4cG9ydCBjb25zdCBBQ1RJT049e1xyXG5cdFVQREFURTooa2V5LHZhbHVlKT0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IHVzZXI9Z2V0U3RhdGUoKS5xaWxpQXBwLnVzZXJcclxuXHRcdHVzZXJba2V5XT12YWx1ZVxyXG5cdFx0VXNlci51cHNlcnQodXNlcikudGhlbih1cGRhdGVkPT5kaXNwYXRjaChRaWxpQXBwLkFDVElPTi5VU0VSX0NIQU5HRUQodXBkYXRlZCkpKVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LCB7dHlwZSwgcGF5bG9hZH0pPT57XHJcblx0cmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBQcm9maWxlPSh7dXNlcm5hbWUsbmljayxnZW5kZXIsbG9jYXRpb24scGhvdG8sc2lnbmF0dXJlLCBkaXNwYXRjaCwgdmFsdWVTdHlsZT17Y29sb3I6XCJsaWdodGdyYXlcIn19KT0+KFxyXG5cdDxJbmZvRm9ybSBzdHlsZT17e3BhZGRpbmc6NX19PlxyXG5cdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5aS05YOPXCJcclxuXHRcdFx0cmlnaHRBdmF0YXI9e1xyXG5cdFx0XHRcdDxQaG90byBzcmM9e3Bob3RvfVxyXG5cdFx0XHRcdFx0b25QaG90bz17dXJsPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKFwicGhvdG9cIix1cmwpKX1cclxuXHRcdFx0XHRcdGljb25SYXRpbz17Mi8zfSB3aWR0aD17MTAwfSBoZWlnaHQ9ezEwMH0vPlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0c3R5bGU9e3toZWlnaHQ6MTAwfX0vPlxyXG5cclxuXHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIui0puWPt1wiXHJcblx0XHRcdHZhbHVlPXt1c2VybmFtZX1cclxuXHRcdFx0Lz5cclxuXHRcdFx0XHJcblx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLmmLXnp7BcIlxyXG5cdFx0XHR2YWx1ZT17bmlja31cclxuXHRcdFx0dHlwZT1cImlucHV0XCJcclxuXHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcIm5pY2tcIix2YWx1ZSkpfVxyXG5cdFx0XHRoaW50VGV4dD1cIuWlveWQjeWtl+WPr+S7peiuqeS9oOeahOaci+WPi+abtOWuueaYk+iusOS9j+S9oFwiXHJcblx0XHRcdC8+XHJcblxyXG5cdFx0PEZpZWxkIHByaW1hcnlUZXh0PVwi5oCn5YirXCIgXHJcblx0XHRcdHZhbHVlPXtnZW5kZXJ8fFwi55S3XCJ9XHJcblx0XHRcdHR5cGU9XCJzaW5nbGVcIlxyXG5cdFx0XHRvcHRpb25zPXtbXCLnlLdcIixcIuWls1wiXX1cclxuXHRcdFx0b25FZGl0PXt2YWx1ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShcImdlbmRlclwiLHZhbHVlKSl9Lz5cclxuXHJcblx0XHQ8RmllbGQgcHJpbWFyeVRleHQ9XCLlnLDlnYBcIiBcclxuXHRcdFx0dmFsdWU9e2xvY2F0aW9ufVxyXG5cdFx0XHR0eXBlPVwibG9jYXRpb25cIlxyXG5cdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKFwibG9jYXRpb25cIix2YWx1ZSkpfVxyXG5cdFx0XHQvPlxyXG5cclxuXHRcdDxGaWVsZCBwcmltYXJ5VGV4dD1cIuetvuWQjVwiIFxyXG5cdFx0XHR2YWx1ZT17c2lnbmF0dXJlfVxyXG5cdFx0XHR0eXBlPVwiaW5wdXRcIlxyXG5cdFx0XHRvbkVkaXQ9e3ZhbHVlPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKFwic2lnbmF0dXJlXCIsdmFsdWUpKX1cclxuXHRcdFx0Lz5cclxuXHQ8L0luZm9Gb3JtPlxyXG4pXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnFpbGlBcHAudXNlcixcInVzZXJuYW1lXCIsXCJuaWNrXCIsXCJnZW5kZXJcIixcImxvY2F0aW9uXCIsXCJwaG90b1wiLFwic2lnbmF0dXJlXCIpKShQcm9maWxlKSx7RE9NQUlOLCBBQ1RJT04sIFJFRFVDRVJ9KVxyXG4iXX0=