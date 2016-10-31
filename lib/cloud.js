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
			items: [{ action: "Back" }, { action: "Upload", icon: _react2.default.createElement(_fileUpload2.default, null),
				onSelect: function onSelect(e) {
					return dispatch(ACTION.UPLOAD());
				}
			}, { action: "Save", icon: _react2.default.createElement(_save2.default, null),
				onSelect: function onSelect(e) {
					return dispatch(ACTION.UPDATE(refCode.getValue()));
				}
			}] })
	);
});

exports.default = Object.assign(Cloud, { ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJET01BSU4iLCJBQ1RJT04iLCJVUERBVEUiLCJhcHAiLCJjdXJyZW50IiwiY29kZSIsImNsb3VkQ29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiRnVuY3Rpb24iLCJ1cHNlcnQiLCJjYXRjaCIsImFsZXJ0IiwiZSIsIm1lc3NhZ2UiLCJ0aGVuIiwiZGlzcGF0Y2giLCJ0eXBlIiwiZXJyb3IiLCJyZWplY3QiLCJVUExPQUQiLCJzZWxlY3RUZXh0RmlsZSIsImRhdGEiLCJSRURVQ0VSIiwic3RhdGUiLCJwYXlsb2FkIiwiQ2xvdWQiLCJyZWZDb2RlIiwiYSIsInZhbHVlIiwidGFyZ2V0IiwicG9zaXRpb24iLCJoZWlnaHQiLCJ0b3AiLCJsaW5lSGVpZ2h0IiwibWFyZ2luIiwid2lkdGgiLCJwYWRkaW5nIiwicGFkZGluZ0JvdHRvbSIsImJvcmRlciIsImFjdGlvbiIsImljb24iLCJvblNlbGVjdCIsImdldFZhbHVlIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxZLFFBQUFBLFk7SUFBY0MsUSxRQUFBQSxRO0FBRTFCLElBQU1DLDBCQUFPLFdBQWI7O0FBRUEsSUFBTUMsMEJBQU87QUFDbkJDLFNBQVE7QUFBQSxTQUFNLG9CQUFVO0FBQ3ZCLE9BQUc7QUFDRixRQUFJQyxNQUFJLGNBQUlDLE9BQVo7QUFDQSxRQUFHQyxTQUFPRixJQUFJRyxTQUFkLEVBQ0MsT0FBT0MsUUFBUUMsT0FBUixFQUFQO0FBQ0QsUUFBSUMsUUFBSixDQUFhLE9BQWIsRUFBcUJKLElBQXJCO0FBQ0FGLFFBQUlHLFNBQUosR0FBY0QsSUFBZDtBQUNBLFdBQU8sY0FBSUssTUFBSixDQUFXUCxHQUFYLEVBQ0xRLEtBREssQ0FDQztBQUFBLFlBQUdDLE1BQU1DLEVBQUVDLE9BQVIsQ0FBSDtBQUFBLEtBREQsRUFFTEMsSUFGSyxDQUVBO0FBQUEsWUFBR0MsU0FBUyxFQUFDQyxhQUFVakIsTUFBVixhQUFELEVBQVQsQ0FBSDtBQUFBLEtBRkEsQ0FBUDtBQUdBLElBVEQsQ0FTQyxPQUFNa0IsS0FBTixFQUFZO0FBQ1osV0FBT1gsUUFBUVksTUFBUixDQUFlRCxLQUFmLEVBQ0xQLEtBREssQ0FDQztBQUFBLFlBQUdDLE1BQU1DLEVBQUVDLE9BQVIsQ0FBSDtBQUFBLEtBREQsQ0FBUDtBQUVBO0FBQ0QsR0FkTztBQUFBLEVBRFc7QUFnQmxCTSxTQUFRO0FBQUEsU0FBRztBQUFBLFVBQVV0QixhQUFhdUIsY0FBYixHQUNwQk4sSUFEb0IsQ0FDZjtBQUFBLFFBQU9WLElBQVAsUUFBRWlCLElBQUY7QUFBQSxXQUFlTixTQUFTZixPQUFPQyxNQUFQLENBQWNHLElBQWQsQ0FBVCxDQUFmO0FBQUEsSUFEZSxDQUFWO0FBQUEsR0FBSDtBQUFBO0FBaEJVLENBQWI7O0FBb0JBLElBQU1rQixnREFDWHZCLE1BRFcsRUFDSCxZQUE0QjtBQUFBLEtBQTNCd0IsS0FBMkIsdUVBQXJCLEVBQXFCO0FBQUE7QUFBQSxLQUFoQlAsSUFBZ0IsU0FBaEJBLElBQWdCO0FBQUEsS0FBWFEsT0FBVyxTQUFYQSxPQUFXOztBQUNwQyxTQUFPUixJQUFQO0FBQ0EsY0FBVWpCLE1BQVY7QUFDQyxVQUFPLEVBQVA7QUFGRDtBQUlBLFFBQU93QixLQUFQO0FBQ0EsQ0FQVyxDQUFOOztBQVVBLElBQU1FLHdCQUFNLHlCQUFRLGlCQUFPO0FBQUNwQixZQUFVLGNBQUlGLE9BQUosQ0FBWUUsU0FBWjtBQUFzQixDQUFoRCxFQUNsQixpQkFBd0I7QUFBQSxLQUF0QkEsU0FBc0IsU0FBdEJBLFNBQXNCO0FBQUEsS0FBWlUsUUFBWSxTQUFaQSxRQUFZOztBQUN2QixLQUFJVyxnQkFBSjtBQUNBLFFBQ0M7QUFBQTtBQUFBO0FBQ0MsOENBQVUsS0FBSztBQUFBLFdBQUdBLFVBQVFDLENBQVg7QUFBQSxJQUFmO0FBQ0MsVUFBT3RCLFNBRFI7QUFFQyxhQUFVO0FBQUEsUUFBVXVCLEtBQVYsU0FBRUMsTUFBRixDQUFVRCxLQUFWO0FBQUEsV0FBb0JGLFFBQVFFLEtBQVIsR0FBY0EsS0FBbEM7QUFBQSxJQUZYO0FBR0MsZ0JBQVksbUJBSGI7QUFJQyxVQUFPLEVBQUNFLFVBQVMsVUFBVixFQUFzQkMsUUFBUSxNQUE5QixFQUFzQ0MsS0FBSSxDQUExQyxFQUE0Q0MsWUFBVyxLQUF2RDtBQUNOQyxZQUFPLENBREQsRUFDR0MsT0FBTSxNQURULEVBQ2lCQyxTQUFRLEVBRHpCLEVBQzZCQyxlQUFjLEVBRDNDLEVBQzhDQyxRQUFPLENBRHJELEVBSlIsR0FERDtBQU9DLGdDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCO0FBQ0MsVUFBTyxDQUNOLEVBQUNDLFFBQU8sTUFBUixFQURNLEVBRUwsRUFBQ0EsUUFBTyxRQUFSLEVBQWtCQyxNQUFLLHlEQUF2QjtBQUNBQyxjQUFTO0FBQUEsWUFBRzFCLFNBQVNmLE9BQU9tQixNQUFQLEVBQVQsQ0FBSDtBQUFBO0FBRFQsSUFGSyxFQUtMLEVBQUNvQixRQUFPLE1BQVIsRUFBZUMsTUFBSyxtREFBcEI7QUFDQUMsY0FBUztBQUFBLFlBQUcxQixTQUFTZixPQUFPQyxNQUFQLENBQWN5QixRQUFRZ0IsUUFBUixFQUFkLENBQVQsQ0FBSDtBQUFBO0FBRFQsSUFMSyxDQURSO0FBUEQsRUFERDtBQW9CQSxDQXZCaUIsQ0FBWjs7a0JBMkJRQyxPQUFPQyxNQUFQLENBQWNuQixLQUFkLEVBQW9CLEVBQUN6QixjQUFELEVBQVFzQixnQkFBUixFQUFwQixDIiwiZmlsZSI6ImNsb3VkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7VUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gJy4vZGIvYXBwJ1xuXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBmaWxlU2VsZWN0b3IsIE1lc3NhZ2VyfT1VSVxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwiY2xvdWRDb2RlXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdFVQREFURTogY29kZT0+ZGlzcGF0Y2g9Pntcblx0XHR0cnl7XG5cdFx0XHRsZXQgYXBwPUFwcC5jdXJyZW50XG5cdFx0XHRpZihjb2RlPT09YXBwLmNsb3VkQ29kZSlcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHRuZXcgRnVuY3Rpb24oXCJDbG91ZFwiLGNvZGUpXG5cdFx0XHRhcHAuY2xvdWRDb2RlPWNvZGVcblx0XHRcdHJldHVybiBBcHAudXBzZXJ0KGFwcClcblx0XHRcdFx0LmNhdGNoKGU9PmFsZXJ0KGUubWVzc2FnZSkpXG5cdFx0XHRcdC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGRhdGVkYH0pKVxuXHRcdH1jYXRjaChlcnJvcil7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpXG5cdFx0XHRcdC5jYXRjaChlPT5hbGVydChlLm1lc3NhZ2UpKVxuXHRcdH1cblx0fVxuXHQsVVBMT0FEOiBhPT5kaXNwYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdFRleHRGaWxlKClcblx0XHQudGhlbigoe2RhdGE6Y29kZX0pPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKGNvZGUpKSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9e1xuXHRbRE9NQUlOXTooc3RhdGU9e30sIHt0eXBlLHBheWxvYWR9KT0+e1xuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcblx0XHRcdHJldHVybiB7fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RhdGVcblx0fVxufVxuXG5leHBvcnQgY29uc3QgQ2xvdWQ9Y29ubmVjdChzdGF0ZT0+e2Nsb3VkQ29kZTpBcHAuY3VycmVudC5jbG91ZENvZGV9KShcblx0KHtjbG91ZENvZGUsZGlzcGF0Y2h9KT0+e1xuXHRcdGxldCByZWZDb2RlXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXY+XG5cdFx0XHRcdDx0ZXh0YXJlYSByZWY9e2E9PnJlZkNvZGU9YX1cblx0XHRcdFx0XHR2YWx1ZT17Y2xvdWRDb2RlfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZkNvZGUudmFsdWU9dmFsdWV9XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJDbG91ZCBub2RlanMgY29kZVwiXG5cdFx0XHRcdFx0c3R5bGU9e3twb3NpdGlvbjonYWJzb2x1dGUnLCBoZWlnaHQ6ICcxMDAlJywgdG9wOjAsbGluZUhlaWdodDonMmVtJyxcblx0XHRcdFx0XHRcdG1hcmdpbjowLHdpZHRoOicxMDAlJywgcGFkZGluZzoxMCwgcGFkZGluZ0JvdHRvbTo1MSxib3JkZXI6MH19Lz5cblx0XHRcdFx0PENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cdFx0XHRcdFx0XHQse2FjdGlvbjpcIlVwbG9hZFwiLCBpY29uOjxVcGxvYWQvPixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRCgpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0LHthY3Rpb246XCJTYXZlXCIsaWNvbjo8U2F2ZS8+LFxuXHRcdFx0XHRcdFx0XHRvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKHJlZkNvZGUuZ2V0VmFsdWUoKSkpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XX0vPlxuXHRcdFx0PC9kaXY+XG5cdFx0KVxuXHR9XG4pXG5cblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihDbG91ZCx7QUNUSU9OLFJFRFVDRVJ9KVxuIl19