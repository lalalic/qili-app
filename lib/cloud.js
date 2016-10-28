"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cloud = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _ = require(".");

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

var _fileUpload = require("material-ui/svg-icons/file/file-upload");

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _save = require("material-ui/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CommandBar = _.UI.CommandBar,
    fileSelector = _.UI.fileSelector,
    Messager = _.UI.Messager;
var DOMAIN = exports.DOMAIN = "cloudCode";

var ACTION = exports.ACTION = {
	UPDATE: function UPDATE(code) {
		return function (dispatch) {
			try {
				var app = _app2.default.current;
				if (code === app.cloudCode) return Promise.resolve();
				new Function("Cloud", code);
				app.cloudCode = code;
				return _app2.default.upsert(app).catch(function (e) {
					return alert(e.message);
				}).then(function (a) {
					return dispatch({ type: "@@" + DOMAIN + "/updated" });
				});
			} catch (error) {
				return Promise.reject(error).catch(function (e) {
					return alert(e.message);
				});
			}
		};
	},
	UPLOAD: function UPLOAD(a) {
		return function (dispatch) {
			return fileSelector.selectTextFile().then(function (_ref) {
				var code = _ref.data;
				return dispatch(ACTION.UPDATE(code));
			});
		};
	}
};

var REDUCER = exports.REDUCER = _defineProperty({}, DOMAIN, function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref2 = arguments[1];
	var type = _ref2.type,
	    payload = _ref2.payload;

	switch (type) {
		case "@@" + DOMAIN + "/updated":
			return {};
	}
	return state;
});

var Cloud = exports.Cloud = (0, _reactRedux.connect)(function (state) {
	cloudCode: _app2.default.current.cloudCode;
})(function (_ref3) {
	var cloudCode = _ref3.cloudCode,
	    dispatch = _ref3.dispatch;

	var refCode = void 0;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement("textarea", { ref: function ref(a) {
				return refCode = a;
			},
			value: cloudCode,
			onChange: function onChange(_ref4) {
				var value = _ref4.target.value;
				return refCode.value = value;
			},
			placeholder: "Cloud nodejs code",
			style: { position: 'absolute', height: '100%', top: 0, lineHeight: '2em',
				margin: 0, width: '100%', padding: 10, paddingBottom: 51, border: 0 } }),
		_react2.default.createElement(CommandBar, { className: "footbar",
			items: [{ action: "Back" }, { action: "Upload", icon: _fileUpload2.default,
				onSelect: function onSelect(e) {
					return dispatch(ACTION.UPLOAD());
				}
			}, { action: "Save", icon: _save2.default,
				onSelect: function onSelect(e) {
					return dispatch(ACTION.UPDATE(refCode.getValue()));
				}
			}] })
	);
});

exports.default = Object.assign(Cloud, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJET01BSU4iLCJBQ1RJT04iLCJVUERBVEUiLCJhcHAiLCJjdXJyZW50IiwiY29kZSIsImNsb3VkQ29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiRnVuY3Rpb24iLCJ1cHNlcnQiLCJjYXRjaCIsImFsZXJ0IiwiZSIsIm1lc3NhZ2UiLCJ0aGVuIiwiZGlzcGF0Y2giLCJ0eXBlIiwiZXJyb3IiLCJyZWplY3QiLCJVUExPQUQiLCJzZWxlY3RUZXh0RmlsZSIsImRhdGEiLCJSRURVQ0VSIiwic3RhdGUiLCJwYXlsb2FkIiwiQ2xvdWQiLCJyZWZDb2RlIiwiYSIsInZhbHVlIiwidGFyZ2V0IiwicG9zaXRpb24iLCJoZWlnaHQiLCJ0b3AiLCJsaW5lSGVpZ2h0IiwibWFyZ2luIiwid2lkdGgiLCJwYWRkaW5nIiwicGFkZGluZ0JvdHRvbSIsImJvcmRlciIsImFjdGlvbiIsImljb24iLCJvblNlbGVjdCIsImdldFZhbHVlIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxZLFFBQUFBLFk7SUFBY0MsUSxRQUFBQSxRO0FBRTFCLElBQU1DLDBCQUFPLFdBQWI7O0FBRUEsSUFBTUMsMEJBQU87QUFDbkJDLFNBQVE7QUFBQSxTQUFNLG9CQUFVO0FBQ3ZCLE9BQUc7QUFDRixRQUFJQyxNQUFJLGNBQUlDLE9BQVo7QUFDQSxRQUFHQyxTQUFPRixJQUFJRyxTQUFkLEVBQ0MsT0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0QsUUFBSUMsUUFBSixDQUFhLE9BQWIsRUFBcUJKLElBQXJCO0FBQ0FGLFFBQUlHLFNBQUosR0FBY0QsSUFBZDtBQUNBLFdBQU8sY0FBSUssTUFBSixDQUFXUCxHQUFYLEVBQ0xRLEtBREssQ0FDQztBQUFBLFlBQUdDLE1BQU1DLEVBQUVDLE9BQVIsQ0FBSDtBQUFBLEtBREQsRUFFTEMsSUFGSyxDQUVBO0FBQUEsWUFBR0MsU0FBUyxFQUFDQyxhQUFVakIsTUFBVixhQUFELEVBQVQsQ0FBSDtBQUFBLEtBRkEsQ0FBUDtBQUdBLElBVEQsQ0FTQyxPQUFNa0IsS0FBTixFQUFZO0FBQ1osV0FBT1gsUUFBUVksTUFBUixDQUFlRCxLQUFmLEVBQ0xQLEtBREssQ0FDQztBQUFBLFlBQUdDLE1BQU1DLEVBQUVDLE9BQVIsQ0FBSDtBQUFBLEtBREQsQ0FBUDtBQUVBO0FBQ0QsR0FkTztBQUFBLEVBRFc7QUFnQmxCTSxTQUFRO0FBQUEsU0FBRztBQUFBLFVBQVV0QixhQUFhdUIsY0FBYixHQUNwQk4sSUFEb0IsQ0FDZjtBQUFBLFFBQU9WLElBQVAsUUFBRWlCLElBQUY7QUFBQSxXQUFlTixTQUFTZixPQUFPQyxNQUFQLENBQWNHLElBQWQsQ0FBVCxDQUFmO0FBQUEsSUFEZSxDQUFWO0FBQUEsR0FBSDtBQUFBO0FBaEJVLENBQWI7O0FBb0JBLElBQU1rQixnREFDWHZCLE1BRFcsRUFDSCxZQUE0QjtBQUFBLEtBQTNCd0IsS0FBMkIsdUVBQXJCLEVBQXFCO0FBQUE7QUFBQSxLQUFoQlAsSUFBZ0IsU0FBaEJBLElBQWdCO0FBQUEsS0FBWFEsT0FBVyxTQUFYQSxPQUFXOztBQUNwQyxTQUFPUixJQUFQO0FBQ0EsY0FBVWpCLE1BQVY7QUFDQyxVQUFPLEVBQVA7QUFGRDtBQUlBLFFBQU93QixLQUFQO0FBQ0EsQ0FQVyxDQUFOOztBQVVBLElBQU1FLHdCQUFNLHlCQUFRLGlCQUFPO0FBQUNwQixZQUFVLGNBQUlGLE9BQUosQ0FBWUUsU0FBWjtBQUFzQixDQUFoRCxFQUNsQixpQkFBd0I7QUFBQSxLQUF0QkEsU0FBc0IsU0FBdEJBLFNBQXNCO0FBQUEsS0FBWlUsUUFBWSxTQUFaQSxRQUFZOztBQUN2QixLQUFJVyxnQkFBSjtBQUNBLFFBQ0M7QUFBQTtBQUFBO0FBQ0MsOENBQVUsS0FBSztBQUFBLFdBQUdBLFVBQVFDLENBQVg7QUFBQSxJQUFmO0FBQ0MsVUFBT3RCLFNBRFI7QUFFQyxhQUFVO0FBQUEsUUFBVXVCLEtBQVYsU0FBRUMsTUFBRixDQUFVRCxLQUFWO0FBQUEsV0FBb0JGLFFBQVFFLEtBQVIsR0FBY0EsS0FBbEM7QUFBQSxJQUZYO0FBR0MsZ0JBQVksbUJBSGI7QUFJQyxVQUFPLEVBQUNFLFVBQVMsVUFBVixFQUFzQkMsUUFBUSxNQUE5QixFQUFzQ0MsS0FBSSxDQUExQyxFQUE0Q0MsWUFBVyxLQUF2RDtBQUNOQyxZQUFPLENBREQsRUFDR0MsT0FBTSxNQURULEVBQ2lCQyxTQUFRLEVBRHpCLEVBQzZCQyxlQUFjLEVBRDNDLEVBQzhDQyxRQUFPLENBRHJELEVBSlIsR0FERDtBQU9DLGdDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCO0FBQ0MsVUFBTyxDQUNOLEVBQUNDLFFBQU8sTUFBUixFQURNLEVBRUwsRUFBQ0EsUUFBTyxRQUFSLEVBQWtCQywwQkFBbEI7QUFDQUMsY0FBUztBQUFBLFlBQUcxQixTQUFTZixPQUFPbUIsTUFBUCxFQUFULENBQUg7QUFBQTtBQURULElBRkssRUFLTCxFQUFDb0IsUUFBTyxNQUFSLEVBQWVDLG9CQUFmO0FBQ0FDLGNBQVM7QUFBQSxZQUFHMUIsU0FBU2YsT0FBT0MsTUFBUCxDQUFjeUIsUUFBUWdCLFFBQVIsRUFBZCxDQUFULENBQUg7QUFBQTtBQURULElBTEssQ0FEUjtBQVBELEVBREQ7QUFvQkEsQ0F2QmlCLENBQVo7O2tCQTJCUUMsT0FBT0MsTUFBUCxDQUFjbkIsS0FBZCxFQUFvQixFQUFDekIsY0FBRCxFQUFRc0IsZ0JBQVIsRUFBcEIsQyIsImZpbGUiOiJjbG91ZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuXG5pbXBvcnQge1VJfSBmcm9tICcuJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2RiL2FwcCdcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgZmlsZVNlbGVjdG9yLCBNZXNzYWdlcn09VUlcblxuZXhwb3J0IGNvbnN0IERPTUFJTj1cImNsb3VkQ29kZVwiXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRVUERBVEU6IGNvZGU9PmRpc3BhdGNoPT57XG5cdFx0dHJ5e1xuXHRcdFx0bGV0IGFwcD1BcHAuY3VycmVudFxuXHRcdFx0aWYoY29kZT09PWFwcC5jbG91ZENvZGUpXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0bmV3IEZ1bmN0aW9uKFwiQ2xvdWRcIixjb2RlKVxuXHRcdFx0YXBwLmNsb3VkQ29kZT1jb2RlXG5cdFx0XHRyZXR1cm4gQXBwLnVwc2VydChhcHApXG5cdFx0XHRcdC5jYXRjaChlPT5hbGVydChlLm1lc3NhZ2UpKVxuXHRcdFx0XHQudGhlbihhPT5kaXNwYXRjaCh7dHlwZTpgQEAke0RPTUFJTn0vdXBkYXRlZGB9KSlcblx0XHR9Y2F0Y2goZXJyb3Ipe1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKVxuXHRcdFx0XHQuY2F0Y2goZT0+YWxlcnQoZS5tZXNzYWdlKSlcblx0XHR9XG5cdH1cblx0LFVQTE9BRDogYT0+ZGlzcGF0Y2g9PmZpbGVTZWxlY3Rvci5zZWxlY3RUZXh0RmlsZSgpXG5cdFx0LnRoZW4oKHtkYXRhOmNvZGV9KT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShjb2RlKSkpXG59XG5cbmV4cG9ydCBjb25zdCBSRURVQ0VSPXtcblx0W0RPTUFJTl06KHN0YXRlPXt9LCB7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgQEAke0RPTUFJTn0vdXBkYXRlZGA6XG5cdFx0XHRyZXR1cm4ge31cblx0XHR9XG5cdFx0cmV0dXJuIHN0YXRlXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IENsb3VkPWNvbm5lY3Qoc3RhdGU9PntjbG91ZENvZGU6QXBwLmN1cnJlbnQuY2xvdWRDb2RlfSkoXG5cdCh7Y2xvdWRDb2RlLGRpc3BhdGNofSk9Pntcblx0XHRsZXQgcmVmQ29kZVxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2PlxuXHRcdFx0XHQ8dGV4dGFyZWEgcmVmPXthPT5yZWZDb2RlPWF9XG5cdFx0XHRcdFx0dmFsdWU9e2Nsb3VkQ29kZX1cblx0XHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZDb2RlLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPVwiQ2xvdWQgbm9kZWpzIGNvZGVcIlxuXHRcdFx0XHRcdHN0eWxlPXt7cG9zaXRpb246J2Fic29sdXRlJywgaGVpZ2h0OiAnMTAwJScsIHRvcDowLGxpbmVIZWlnaHQ6JzJlbScsXG5cdFx0XHRcdFx0XHRtYXJnaW46MCx3aWR0aDonMTAwJScsIHBhZGRpbmc6MTAsIHBhZGRpbmdCb3R0b206NTEsYm9yZGVyOjB9fS8+XG5cdFx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJVcGxvYWRcIiwgaWNvbjpVcGxvYWQsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUExPQUQoKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdCx7YWN0aW9uOlwiU2F2ZVwiLGljb246U2F2ZSxcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQREFURShyZWZDb2RlLmdldFZhbHVlKCkpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF19Lz5cblx0XHRcdDwvZGl2PlxuXHRcdClcblx0fVxuKVxuXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQ2xvdWQse0FDVElPTixSRURVQ0VSfSlcbiJdfQ==