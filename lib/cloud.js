'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cloud = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _fileUpload = require('material-ui/svg-icons/file/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _save = require('material-ui/svg-icons/content/save');

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
				if (code === app.cloudCode) return _promise2.default.resolve();
				new Function("Cloud", code);
				app.cloudCode = code;
				return _app2.default.upsert(app).catch(function (e) {
					return alert(e.message);
				}).then(function (a) {
					return dispatch({ type: '@@' + DOMAIN + '/updated' });
				});
			} catch (error) {
				return _promise2.default.reject(error).catch(function (e) {
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
		case '@@' + DOMAIN + '/updated':
			return {};
	}
	return state;
};

var Cloud = exports.Cloud = function Cloud(_ref3) {
	var cloudCode = _ref3.cloudCode;
	var dispatch = _ref3.dispatch;

	var refCode = void 0;
	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement('textarea', { ref: function ref(a) {
				return refCode = a;
			},
			value: cloudCode,
			onChange: function onChange(_ref4) {
				var value = _ref4.target.value;
				return refCode.value = value;
			},
			placeholder: 'Cloud nodejs code',
			style: { position: 'absolute', height: '100%', top: 0, lineHeight: '2em',
				margin: 0, width: '100%', padding: 10, paddingBottom: 51, border: 0 } }),
		_react2.default.createElement(CommandBar, { className: 'footbar',
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

exports.default = (0, _assign2.default)(Cloud, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJET01BSU4iLCJBQ1RJT04iLCJVUERBVEUiLCJhcHAiLCJjdXJyZW50IiwiY29kZSIsImNsb3VkQ29kZSIsInJlc29sdmUiLCJGdW5jdGlvbiIsInVwc2VydCIsImNhdGNoIiwiYWxlcnQiLCJlIiwibWVzc2FnZSIsInRoZW4iLCJkaXNwYXRjaCIsInR5cGUiLCJlcnJvciIsInJlamVjdCIsIlVQTE9BRCIsInNlbGVjdFRleHRGaWxlIiwiZGF0YSIsIlJFRFVDRVIiLCJzdGF0ZSIsInBheWxvYWQiLCJDbG91ZCIsInJlZkNvZGUiLCJhIiwidmFsdWUiLCJ0YXJnZXQiLCJwb3NpdGlvbiIsImhlaWdodCIsInRvcCIsImxpbmVIZWlnaHQiLCJtYXJnaW4iLCJ3aWR0aCIsInBhZGRpbmciLCJwYWRkaW5nQm90dG9tIiwiYm9yZGVyIiwiYWN0aW9uIiwiaWNvbiIsIm9uU2VsZWN0IiwiZ2V0VmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7SUFFT0EsVSxRQUFBQSxVO0lBQVlDLFksUUFBQUEsWTtJQUFjQyxRLFFBQUFBLFE7QUFFMUIsSUFBTUMsMEJBQU8sV0FBYjs7QUFFQSxJQUFNQywwQkFBTztBQUNuQkMsU0FBUTtBQUFBLFNBQU0sb0JBQVU7QUFDdkIsT0FBRztBQUNGLFFBQUlDLE1BQUksY0FBSUMsT0FBWjtBQUNBLFFBQUdDLFNBQU9GLElBQUlHLFNBQWQsRUFDQyxPQUFPLGtCQUFRQyxPQUFSLEVBQVA7QUFDRCxRQUFJQyxRQUFKLENBQWEsT0FBYixFQUFxQkgsSUFBckI7QUFDQUYsUUFBSUcsU0FBSixHQUFjRCxJQUFkO0FBQ0EsV0FBTyxjQUFJSSxNQUFKLENBQVdOLEdBQVgsRUFDTE8sS0FESyxDQUNDO0FBQUEsWUFBR0MsTUFBTUMsRUFBRUMsT0FBUixDQUFIO0FBQUEsS0FERCxFQUVMQyxJQUZLLENBRUE7QUFBQSxZQUFHQyxTQUFTLEVBQUNDLGFBQVVoQixNQUFWLGFBQUQsRUFBVCxDQUFIO0FBQUEsS0FGQSxDQUFQO0FBR0EsSUFURCxDQVNDLE9BQU1pQixLQUFOLEVBQVk7QUFDWixXQUFPLGtCQUFRQyxNQUFSLENBQWVELEtBQWYsRUFDTFAsS0FESyxDQUNDO0FBQUEsWUFBR0MsTUFBTUMsRUFBRUMsT0FBUixDQUFIO0FBQUEsS0FERCxDQUFQO0FBRUE7QUFDRCxHQWRPO0FBQUEsRUFEVztBQWdCbEJNLFNBQVE7QUFBQSxTQUFHO0FBQUEsVUFBVXJCLGFBQWFzQixjQUFiLEdBQ3BCTixJQURvQixDQUNmO0FBQUEsUUFBT1QsSUFBUCxRQUFFZ0IsSUFBRjtBQUFBLFdBQWVOLFNBQVNkLE9BQU9DLE1BQVAsQ0FBY0csSUFBZCxDQUFULENBQWY7QUFBQSxJQURlLENBQVY7QUFBQSxHQUFIO0FBQUE7QUFoQlUsQ0FBYjs7QUFvQkEsSUFBTWlCLDRCQUFRLFNBQVJBLE9BQVEsR0FBNEI7QUFBQSxLQUEzQkMsS0FBMkIsdUVBQXJCLEVBQXFCO0FBQUE7QUFBQSxLQUFoQlAsSUFBZ0IsU0FBaEJBLElBQWdCO0FBQUEsS0FBWFEsT0FBVyxTQUFYQSxPQUFXOztBQUNoRCxTQUFPUixJQUFQO0FBQ0EsY0FBVWhCLE1BQVY7QUFDQyxVQUFPLEVBQVA7QUFGRDtBQUlBLFFBQU91QixLQUFQO0FBQ0EsQ0FOTTs7QUFRQSxJQUFNRSx3QkFBTSxTQUFOQSxLQUFNLFFBQXdCO0FBQUEsS0FBdEJuQixTQUFzQixTQUF0QkEsU0FBc0I7QUFBQSxLQUFaUyxRQUFZLFNBQVpBLFFBQVk7O0FBQzFDLEtBQUlXLGdCQUFKO0FBQ0EsUUFDQztBQUFBO0FBQUE7QUFDQyw4Q0FBVSxLQUFLO0FBQUEsV0FBR0EsVUFBUUMsQ0FBWDtBQUFBLElBQWY7QUFDQyxVQUFPckIsU0FEUjtBQUVDLGFBQVU7QUFBQSxRQUFVc0IsS0FBVixTQUFFQyxNQUFGLENBQVVELEtBQVY7QUFBQSxXQUFvQkYsUUFBUUUsS0FBUixHQUFjQSxLQUFsQztBQUFBLElBRlg7QUFHQyxnQkFBWSxtQkFIYjtBQUlDLFVBQU8sRUFBQ0UsVUFBUyxVQUFWLEVBQXNCQyxRQUFRLE1BQTlCLEVBQXNDQyxLQUFJLENBQTFDLEVBQTRDQyxZQUFXLEtBQXZEO0FBQ05DLFlBQU8sQ0FERCxFQUNHQyxPQUFNLE1BRFQsRUFDaUJDLFNBQVEsRUFEekIsRUFDNkJDLGVBQWMsRUFEM0MsRUFDOENDLFFBQU8sQ0FEckQsRUFKUixHQUREO0FBT0MsZ0NBQUMsVUFBRCxJQUFZLFdBQVUsU0FBdEI7QUFDQyxVQUFPLENBQ04sRUFBQ0MsUUFBTyxNQUFSLEVBRE0sRUFFTCxFQUFDQSxRQUFPLFFBQVIsRUFBa0JDLE1BQUsseURBQXZCO0FBQ0FDLGNBQVM7QUFBQSxZQUFHMUIsU0FBU2QsT0FBT2tCLE1BQVAsRUFBVCxDQUFIO0FBQUE7QUFEVCxJQUZLLEVBS0wsRUFBQ29CLFFBQU8sTUFBUixFQUFlQyxNQUFLLG1EQUFwQjtBQUNBQyxjQUFTO0FBQUEsWUFBRzFCLFNBQVNkLE9BQU9DLE1BQVAsQ0FBY3dCLFFBQVFnQixRQUFSLEVBQWQsQ0FBVCxDQUFIO0FBQUE7QUFEVCxJQUxLLENBRFI7QUFQRCxFQUREO0FBb0JBLENBdEJNOztrQkF5QlEsc0JBQWNqQixLQUFkLEVBQW9CLEVBQUN6QixjQUFELEVBQVNDLGNBQVQsRUFBZ0JxQixnQkFBaEIsRUFBcEIsQyIsImZpbGUiOiJjbG91ZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IHtVSX0gZnJvbSAnLidcbmltcG9ydCBBcHAgZnJvbSAnLi9kYi9hcHAnXG5cbmltcG9ydCBVcGxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBTYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcblxuY29uc3Qge0NvbW1hbmRCYXIsIGZpbGVTZWxlY3RvciwgTWVzc2FnZXJ9PVVJXG5cbmV4cG9ydCBjb25zdCBET01BSU49XCJjbG91ZENvZGVcIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0VVBEQVRFOiBjb2RlPT5kaXNwYXRjaD0+e1xuXHRcdHRyeXtcblx0XHRcdGxldCBhcHA9QXBwLmN1cnJlbnRcblx0XHRcdGlmKGNvZGU9PT1hcHAuY2xvdWRDb2RlKVxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRcdG5ldyBGdW5jdGlvbihcIkNsb3VkXCIsY29kZSlcblx0XHRcdGFwcC5jbG91ZENvZGU9Y29kZVxuXHRcdFx0cmV0dXJuIEFwcC51cHNlcnQoYXBwKVxuXHRcdFx0XHQuY2F0Y2goZT0+YWxlcnQoZS5tZXNzYWdlKSlcblx0XHRcdFx0LnRoZW4oYT0+ZGlzcGF0Y2goe3R5cGU6YEBAJHtET01BSU59L3VwZGF0ZWRgfSkpXG5cdFx0fWNhdGNoKGVycm9yKXtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcblx0XHRcdFx0LmNhdGNoKGU9PmFsZXJ0KGUubWVzc2FnZSkpXG5cdFx0fVxuXHR9XG5cdCxVUExPQUQ6IGE9PmRpc3BhdGNoPT5maWxlU2VsZWN0b3Iuc2VsZWN0VGV4dEZpbGUoKVxuXHRcdC50aGVuKCh7ZGF0YTpjb2RlfSk9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUoY29kZSkpKVxufVxuXG5leHBvcnQgY29uc3QgUkVEVUNFUj0oc3RhdGU9e30sIHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYEBAJHtET01BSU59L3VwZGF0ZWRgOlxuXHRcdHJldHVybiB7fVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgQ2xvdWQ9KHtjbG91ZENvZGUsZGlzcGF0Y2h9KT0+e1xuXHRsZXQgcmVmQ29kZVxuXHRyZXR1cm4gKFxuXHRcdDxkaXY+XG5cdFx0XHQ8dGV4dGFyZWEgcmVmPXthPT5yZWZDb2RlPWF9XG5cdFx0XHRcdHZhbHVlPXtjbG91ZENvZGV9XG5cdFx0XHRcdG9uQ2hhbmdlPXsoe3RhcmdldDp7dmFsdWV9fSk9PnJlZkNvZGUudmFsdWU9dmFsdWV9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPVwiQ2xvdWQgbm9kZWpzIGNvZGVcIlxuXHRcdFx0XHRzdHlsZT17e3Bvc2l0aW9uOidhYnNvbHV0ZScsIGhlaWdodDogJzEwMCUnLCB0b3A6MCxsaW5lSGVpZ2h0OicyZW0nLFxuXHRcdFx0XHRcdG1hcmdpbjowLHdpZHRoOicxMDAlJywgcGFkZGluZzoxMCwgcGFkZGluZ0JvdHRvbTo1MSxib3JkZXI6MH19Lz5cblx0XHRcdDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdHthY3Rpb246XCJCYWNrXCJ9XG5cdFx0XHRcdFx0LHthY3Rpb246XCJVcGxvYWRcIiwgaWNvbjo8VXBsb2FkLz4sXG5cdFx0XHRcdFx0XHRvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBMT0FEKCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCx7YWN0aW9uOlwiU2F2ZVwiLGljb246PFNhdmUvPixcblx0XHRcdFx0XHRcdG9uU2VsZWN0OmU9PmRpc3BhdGNoKEFDVElPTi5VUERBVEUocmVmQ29kZS5nZXRWYWx1ZSgpKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF19Lz5cblx0XHQ8L2Rpdj5cblx0KVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oQ2xvdWQse0RPTUFJTiwgQUNUSU9OLFJFRFVDRVJ9KVxuIl19