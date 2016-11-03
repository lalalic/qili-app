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

var CommandBar = _.UI.CommandBar;
var fileSelector = _.UI.fileSelector;
var Messager = _.UI.Messager;
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

var REDUCER = exports.REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	var _ref2 = arguments[1];
	var type = _ref2.type;
	var payload = _ref2.payload;

	switch (type) {
		case "@@" + DOMAIN + "/updated":
			return {};
	}
	return state;
};

var Cloud = exports.Cloud = function Cloud(_ref3) {
	var cloudCode = _ref3.cloudCode;
	var dispatch = _ref3.dispatch;

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
};

exports.default = Object.assign(Cloud, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJET01BSU4iLCJBQ1RJT04iLCJVUERBVEUiLCJhcHAiLCJjdXJyZW50IiwiY29kZSIsImNsb3VkQ29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiRnVuY3Rpb24iLCJ1cHNlcnQiLCJjYXRjaCIsImFsZXJ0IiwiZSIsIm1lc3NhZ2UiLCJ0aGVuIiwiZGlzcGF0Y2giLCJ0eXBlIiwiZXJyb3IiLCJyZWplY3QiLCJVUExPQUQiLCJzZWxlY3RUZXh0RmlsZSIsImRhdGEiLCJSRURVQ0VSIiwic3RhdGUiLCJwYXlsb2FkIiwiQ2xvdWQiLCJyZWZDb2RlIiwiYSIsInZhbHVlIiwidGFyZ2V0IiwicG9zaXRpb24iLCJoZWlnaHQiLCJ0b3AiLCJsaW5lSGVpZ2h0IiwibWFyZ2luIiwid2lkdGgiLCJwYWRkaW5nIiwicGFkZGluZ0JvdHRvbSIsImJvcmRlciIsImFjdGlvbiIsImljb24iLCJvblNlbGVjdCIsImdldFZhbHVlIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsWSxRQUFBQSxZO0lBQWNDLFEsUUFBQUEsUTtBQUUxQixJQUFNQywwQkFBTyxXQUFiOztBQUVBLElBQU1DLDBCQUFPO0FBQ25CQyxTQUFRO0FBQUEsU0FBTSxvQkFBVTtBQUN2QixPQUFHO0FBQ0YsUUFBSUMsTUFBSSxjQUFJQyxPQUFaO0FBQ0EsUUFBR0MsU0FBT0YsSUFBSUcsU0FBZCxFQUNDLE9BQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNELFFBQUlDLFFBQUosQ0FBYSxPQUFiLEVBQXFCSixJQUFyQjtBQUNBRixRQUFJRyxTQUFKLEdBQWNELElBQWQ7QUFDQSxXQUFPLGNBQUlLLE1BQUosQ0FBV1AsR0FBWCxFQUNMUSxLQURLLENBQ0M7QUFBQSxZQUFHQyxNQUFNQyxFQUFFQyxPQUFSLENBQUg7QUFBQSxLQURELEVBRUxDLElBRkssQ0FFQTtBQUFBLFlBQUdDLFNBQVMsRUFBQ0MsYUFBVWpCLE1BQVYsYUFBRCxFQUFULENBQUg7QUFBQSxLQUZBLENBQVA7QUFHQSxJQVRELENBU0MsT0FBTWtCLEtBQU4sRUFBWTtBQUNaLFdBQU9YLFFBQVFZLE1BQVIsQ0FBZUQsS0FBZixFQUNMUCxLQURLLENBQ0M7QUFBQSxZQUFHQyxNQUFNQyxFQUFFQyxPQUFSLENBQUg7QUFBQSxLQURELENBQVA7QUFFQTtBQUNELEdBZE87QUFBQSxFQURXO0FBZ0JsQk0sU0FBUTtBQUFBLFNBQUc7QUFBQSxVQUFVdEIsYUFBYXVCLGNBQWIsR0FDcEJOLElBRG9CLENBQ2Y7QUFBQSxRQUFPVixJQUFQLFFBQUVpQixJQUFGO0FBQUEsV0FBZU4sU0FBU2YsT0FBT0MsTUFBUCxDQUFjRyxJQUFkLENBQVQsQ0FBZjtBQUFBLElBRGUsQ0FBVjtBQUFBLEdBQUg7QUFBQTtBQWhCVSxDQUFiOztBQW9CQSxJQUFNa0IsNEJBQVEsU0FBUkEsT0FBUSxHQUE0QjtBQUFBLEtBQTNCQyxLQUEyQix1RUFBckIsRUFBcUI7QUFBQTtBQUFBLEtBQWhCUCxJQUFnQixTQUFoQkEsSUFBZ0I7QUFBQSxLQUFYUSxPQUFXLFNBQVhBLE9BQVc7O0FBQ2hELFNBQU9SLElBQVA7QUFDQSxjQUFVakIsTUFBVjtBQUNDLFVBQU8sRUFBUDtBQUZEO0FBSUEsUUFBT3dCLEtBQVA7QUFDQSxDQU5NOztBQVFBLElBQU1FLHdCQUFNLFNBQU5BLEtBQU0sUUFBd0I7QUFBQSxLQUF0QnBCLFNBQXNCLFNBQXRCQSxTQUFzQjtBQUFBLEtBQVpVLFFBQVksU0FBWkEsUUFBWTs7QUFDMUMsS0FBSVcsZ0JBQUo7QUFDQSxRQUNDO0FBQUE7QUFBQTtBQUNDLDhDQUFVLEtBQUs7QUFBQSxXQUFHQSxVQUFRQyxDQUFYO0FBQUEsSUFBZjtBQUNDLFVBQU90QixTQURSO0FBRUMsYUFBVTtBQUFBLFFBQVV1QixLQUFWLFNBQUVDLE1BQUYsQ0FBVUQsS0FBVjtBQUFBLFdBQW9CRixRQUFRRSxLQUFSLEdBQWNBLEtBQWxDO0FBQUEsSUFGWDtBQUdDLGdCQUFZLG1CQUhiO0FBSUMsVUFBTyxFQUFDRSxVQUFTLFVBQVYsRUFBc0JDLFFBQVEsTUFBOUIsRUFBc0NDLEtBQUksQ0FBMUMsRUFBNENDLFlBQVcsS0FBdkQ7QUFDTkMsWUFBTyxDQURELEVBQ0dDLE9BQU0sTUFEVCxFQUNpQkMsU0FBUSxFQUR6QixFQUM2QkMsZUFBYyxFQUQzQyxFQUM4Q0MsUUFBTyxDQURyRCxFQUpSLEdBREQ7QUFPQyxnQ0FBQyxVQUFELElBQVksV0FBVSxTQUF0QjtBQUNDLFVBQU8sQ0FDTixFQUFDQyxRQUFPLE1BQVIsRUFETSxFQUVMLEVBQUNBLFFBQU8sUUFBUixFQUFrQkMsTUFBSyx5REFBdkI7QUFDQUMsY0FBUztBQUFBLFlBQUcxQixTQUFTZixPQUFPbUIsTUFBUCxFQUFULENBQUg7QUFBQTtBQURULElBRkssRUFLTCxFQUFDb0IsUUFBTyxNQUFSLEVBQWVDLE1BQUssbURBQXBCO0FBQ0FDLGNBQVM7QUFBQSxZQUFHMUIsU0FBU2YsT0FBT0MsTUFBUCxDQUFjeUIsUUFBUWdCLFFBQVIsRUFBZCxDQUFULENBQUg7QUFBQTtBQURULElBTEssQ0FEUjtBQVBELEVBREQ7QUFvQkEsQ0F0Qk07O2tCQXlCUUMsT0FBT0MsTUFBUCxDQUFjbkIsS0FBZCxFQUFvQixFQUFDMUIsY0FBRCxFQUFTQyxjQUFULEVBQWdCc0IsZ0JBQWhCLEVBQXBCLEMiLCJmaWxlIjoiY2xvdWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IHtVSX0gZnJvbSAnLidcbmltcG9ydCBBcHAgZnJvbSAnLi9kYi9hcHAnXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBTYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcblxuY29uc3Qge0NvbW1hbmRCYXIsIGZpbGVTZWxlY3RvciwgTWVzc2FnZXJ9PVVJXG5cbmV4cG9ydCBjb25zdCBET01BSU49XCJjbG91ZENvZGVcIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0VVBEQVRFOiBjb2RlPT5kaXNwYXRjaD0+e1xuXHRcdHRyeXtcblx0XHRcdGxldCBhcHA9QXBwLmN1cnJlbnRcblx0XHRcdGlmKGNvZGU9PT1hcHAuY2xvdWRDb2RlKVxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRcdG5ldyBGdW5jdGlvbihcIkNsb3VkXCIsY29kZSlcblx0XHRcdGFwcC5jbG91ZENvZGU9Y29kZVxuXHRcdFx0cmV0dXJuIEFwcC51cHNlcnQoYXBwKVxuXHRcdFx0XHQuY2F0Y2goZT0+YWxlcnQoZS5tZXNzYWdlKSlcblx0XHRcdFx0LnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3VwZGF0ZWRgfSkpXG5cdFx0fWNhdGNoKGVycm9yKXtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcblx0XHRcdFx0LmNhdGNoKGU9PmFsZXJ0KGUubWVzc2FnZSkpXG5cdFx0fVxuXHR9XG5cdCxVUExPQUQ6IGE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0VGV4dEZpbGUoKVxuXHRcdC50aGVuKCh7ZGF0YTpjb2RlfSk9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoY29kZSkpKVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30sIHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYEBAJHtET01BSU59L3VwZGF0ZWRgOlxuXHRcdHJldHVybiB7fVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgQ2xvdWQ9KHtjbG91ZENvZGUsZGlzcGF0Y2h9KT0+e1xuXHRsZXQgcmVmQ29kZVxuXHRyZXR1cm4gKFxuXHRcdDxkaXY+XG5cdFx0XHQ8dGV4dGFyZWEgcmVmPXthPT5yZWZDb2RlPWF9XG5cdFx0XHRcdHZhbHVlPXtjbG91ZENvZGV9XG5cdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZkNvZGUudmFsdWU9dmFsdWV9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPVwiQ2xvdWQgbm9kZWpzIGNvZGVcIlxuXHRcdFx0XHRzdHlsZT17e3Bvc2l0aW9uOidhYnNvbHV0ZScsIGhlaWdodDogJzEwMCUnLCB0b3A6MCxsaW5lSGVpZ2h0OicyZW0nLFxuXHRcdFx0XHRcdG1hcmdpbjowLHdpZHRoOicxMDAlJywgcGFkZGluZzoxMCwgcGFkZGluZ0JvdHRvbTo1MSxib3JkZXI6MH19Lz5cblx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cdFx0XHRcdFx0LHthY3Rpb246XCJVcGxvYWRcIiwgaWNvbjo8VXBsb2FkLz4sXG5cdFx0XHRcdFx0XHRvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEKCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCx7YWN0aW9uOlwiU2F2ZVwiLGljb246PFNhdmUvPixcblx0XHRcdFx0XHRcdG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUocmVmQ29kZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF19Lz5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQ2xvdWQse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxuIl19