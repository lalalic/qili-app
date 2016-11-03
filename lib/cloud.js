'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Cloud = exports.REDUCER = exports.ACTION = exports.DOMAIN = undefined;

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
				if (code === app.cloudCode) return Promise.resolve();
				new Function("Cloud", code);
				app.cloudCode = code;
				return _app2.default.upsert(app).catch(function (e) {
					return alert(e.message);
				}).then(function (a) {
					return dispatch({ type: '@@' + DOMAIN + '/updated' });
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

exports.default = Object.assign(Cloud, { DOMAIN: DOMAIN, ACTION: ACTION, REDUCER: REDUCER });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJET01BSU4iLCJBQ1RJT04iLCJVUERBVEUiLCJhcHAiLCJjdXJyZW50IiwiY29kZSIsImNsb3VkQ29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiRnVuY3Rpb24iLCJ1cHNlcnQiLCJjYXRjaCIsImFsZXJ0IiwiZSIsIm1lc3NhZ2UiLCJ0aGVuIiwiZGlzcGF0Y2giLCJ0eXBlIiwiZXJyb3IiLCJyZWplY3QiLCJVUExPQUQiLCJzZWxlY3RUZXh0RmlsZSIsImRhdGEiLCJSRURVQ0VSIiwic3RhdGUiLCJwYXlsb2FkIiwiQ2xvdWQiLCJyZWZDb2RlIiwiYSIsInZhbHVlIiwidGFyZ2V0IiwicG9zaXRpb24iLCJoZWlnaHQiLCJ0b3AiLCJsaW5lSGVpZ2h0IiwibWFyZ2luIiwid2lkdGgiLCJwYWRkaW5nIiwicGFkZGluZ0JvdHRvbSIsImJvcmRlciIsImFjdGlvbiIsImljb24iLCJvblNlbGVjdCIsImdldFZhbHVlIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7OztJQUVPQSxVLFFBQUFBLFU7SUFBWUMsWSxRQUFBQSxZO0lBQWNDLFEsUUFBQUEsUTtBQUUxQixJQUFNQywwQkFBTyxXQUFiOztBQUVBLElBQU1DLDBCQUFPO0FBQ25CQyxTQUFRO0FBQUEsU0FBTSxvQkFBVTtBQUN2QixPQUFHO0FBQ0YsUUFBSUMsTUFBSSxjQUFJQyxPQUFaO0FBQ0EsUUFBR0MsU0FBT0YsSUFBSUcsU0FBZCxFQUNDLE9BQU9DLFFBQVFDLE9BQVIsRUFBUDtBQUNELFFBQUlDLFFBQUosQ0FBYSxPQUFiLEVBQXFCSixJQUFyQjtBQUNBRixRQUFJRyxTQUFKLEdBQWNELElBQWQ7QUFDQSxXQUFPLGNBQUlLLE1BQUosQ0FBV1AsR0FBWCxFQUNMUSxLQURLLENBQ0M7QUFBQSxZQUFHQyxNQUFNQyxFQUFFQyxPQUFSLENBQUg7QUFBQSxLQURELEVBRUxDLElBRkssQ0FFQTtBQUFBLFlBQUdDLFNBQVMsRUFBQ0MsYUFBVWpCLE1BQVYsYUFBRCxFQUFULENBQUg7QUFBQSxLQUZBLENBQVA7QUFHQSxJQVRELENBU0MsT0FBTWtCLEtBQU4sRUFBWTtBQUNaLFdBQU9YLFFBQVFZLE1BQVIsQ0FBZUQsS0FBZixFQUNMUCxLQURLLENBQ0M7QUFBQSxZQUFHQyxNQUFNQyxFQUFFQyxPQUFSLENBQUg7QUFBQSxLQURELENBQVA7QUFFQTtBQUNELEdBZE87QUFBQSxFQURXO0FBZ0JsQk0sU0FBUTtBQUFBLFNBQUc7QUFBQSxVQUFVdEIsYUFBYXVCLGNBQWIsR0FDcEJOLElBRG9CLENBQ2Y7QUFBQSxRQUFPVixJQUFQLFFBQUVpQixJQUFGO0FBQUEsV0FBZU4sU0FBU2YsT0FBT0MsTUFBUCxDQUFjRyxJQUFkLENBQVQsQ0FBZjtBQUFBLElBRGUsQ0FBVjtBQUFBLEdBQUg7QUFBQTtBQWhCVSxDQUFiOztBQW9CQSxJQUFNa0IsNEJBQVEsU0FBUkEsT0FBUSxHQUE0QjtBQUFBLEtBQTNCQyxLQUEyQix1RUFBckIsRUFBcUI7QUFBQTtBQUFBLEtBQWhCUCxJQUFnQixTQUFoQkEsSUFBZ0I7QUFBQSxLQUFYUSxPQUFXLFNBQVhBLE9BQVc7O0FBQ2hELFNBQU9SLElBQVA7QUFDQSxjQUFVakIsTUFBVjtBQUNDLFVBQU8sRUFBUDtBQUZEO0FBSUEsUUFBT3dCLEtBQVA7QUFDQSxDQU5NOztBQVFBLElBQU1FLHdCQUFNLFNBQU5BLEtBQU0sUUFBd0I7QUFBQSxLQUF0QnBCLFNBQXNCLFNBQXRCQSxTQUFzQjtBQUFBLEtBQVpVLFFBQVksU0FBWkEsUUFBWTs7QUFDMUMsS0FBSVcsZ0JBQUo7QUFDQSxRQUNDO0FBQUE7QUFBQTtBQUNDLDhDQUFVLEtBQUs7QUFBQSxXQUFHQSxVQUFRQyxDQUFYO0FBQUEsSUFBZjtBQUNDLFVBQU90QixTQURSO0FBRUMsYUFBVTtBQUFBLFFBQVV1QixLQUFWLFNBQUVDLE1BQUYsQ0FBVUQsS0FBVjtBQUFBLFdBQW9CRixRQUFRRSxLQUFSLEdBQWNBLEtBQWxDO0FBQUEsSUFGWDtBQUdDLGdCQUFZLG1CQUhiO0FBSUMsVUFBTyxFQUFDRSxVQUFTLFVBQVYsRUFBc0JDLFFBQVEsTUFBOUIsRUFBc0NDLEtBQUksQ0FBMUMsRUFBNENDLFlBQVcsS0FBdkQ7QUFDTkMsWUFBTyxDQURELEVBQ0dDLE9BQU0sTUFEVCxFQUNpQkMsU0FBUSxFQUR6QixFQUM2QkMsZUFBYyxFQUQzQyxFQUM4Q0MsUUFBTyxDQURyRCxFQUpSLEdBREQ7QUFPQyxnQ0FBQyxVQUFELElBQVksV0FBVSxTQUF0QjtBQUNDLFVBQU8sQ0FDTixFQUFDQyxRQUFPLE1BQVIsRUFETSxFQUVMLEVBQUNBLFFBQU8sUUFBUixFQUFrQkMsTUFBSyx5REFBdkI7QUFDQUMsY0FBUztBQUFBLFlBQUcxQixTQUFTZixPQUFPbUIsTUFBUCxFQUFULENBQUg7QUFBQTtBQURULElBRkssRUFLTCxFQUFDb0IsUUFBTyxNQUFSLEVBQWVDLE1BQUssbURBQXBCO0FBQ0FDLGNBQVM7QUFBQSxZQUFHMUIsU0FBU2YsT0FBT0MsTUFBUCxDQUFjeUIsUUFBUWdCLFFBQVIsRUFBZCxDQUFULENBQUg7QUFBQTtBQURULElBTEssQ0FEUjtBQVBELEVBREQ7QUFvQkEsQ0F0Qk07O2tCQXlCUUMsT0FBT0MsTUFBUCxDQUFjbkIsS0FBZCxFQUFvQixFQUFDMUIsY0FBRCxFQUFTQyxjQUFULEVBQWdCc0IsZ0JBQWhCLEVBQXBCLEMiLCJmaWxlIjoiY2xvdWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7VUl9IGZyb20gJy4nXG5pbXBvcnQgQXBwIGZyb20gJy4vZGIvYXBwJ1xuXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXG5pbXBvcnQgU2F2ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5cbmNvbnN0IHtDb21tYW5kQmFyLCBmaWxlU2VsZWN0b3IsIE1lc3NhZ2VyfT1VSVxuXG5leHBvcnQgY29uc3QgRE9NQUlOPVwiY2xvdWRDb2RlXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdFVQREFURTogY29kZT0+ZGlzcGF0Y2g9Pntcblx0XHR0cnl7XG5cdFx0XHRsZXQgYXBwPUFwcC5jdXJyZW50XG5cdFx0XHRpZihjb2RlPT09YXBwLmNsb3VkQ29kZSlcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHRuZXcgRnVuY3Rpb24oXCJDbG91ZFwiLGNvZGUpXG5cdFx0XHRhcHAuY2xvdWRDb2RlPWNvZGVcblx0XHRcdHJldHVybiBBcHAudXBzZXJ0KGFwcClcblx0XHRcdFx0LmNhdGNoKGU9PmFsZXJ0KGUubWVzc2FnZSkpXG5cdFx0XHRcdC50aGVuKGE9PmRpc3BhdGNoKHt0eXBlOmBAQCR7RE9NQUlOfS91cGRhdGVkYH0pKVxuXHRcdH1jYXRjaChlcnJvcil7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpXG5cdFx0XHRcdC5jYXRjaChlPT5hbGVydChlLm1lc3NhZ2UpKVxuXHRcdH1cblx0fVxuXHQsVVBMT0FEOiBhPT5kaXNwYXRjaD0+ZmlsZVNlbGVjdG9yLnNlbGVjdFRleHRGaWxlKClcblx0XHQudGhlbigoe2RhdGE6Y29kZX0pPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKGNvZGUpKSlcbn1cblxuZXhwb3J0IGNvbnN0IFJFRFVDRVI9KHN0YXRlPXt9LCB7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGBAQCR7RE9NQUlOfS91cGRhdGVkYDpcblx0XHRyZXR1cm4ge31cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IENsb3VkPSh7Y2xvdWRDb2RlLGRpc3BhdGNofSk9Pntcblx0bGV0IHJlZkNvZGVcblx0cmV0dXJuIChcblx0XHQ8ZGl2PlxuXHRcdFx0PHRleHRhcmVhIHJlZj17YT0+cmVmQ29kZT1hfVxuXHRcdFx0XHR2YWx1ZT17Y2xvdWRDb2RlfVxuXHRcdFx0XHRvbkNoYW5nZT17KHt0YXJnZXQ6e3ZhbHVlfX0pPT5yZWZDb2RlLnZhbHVlPXZhbHVlfVxuXHRcdFx0XHRwbGFjZWhvbGRlcj1cIkNsb3VkIG5vZGVqcyBjb2RlXCJcblx0XHRcdFx0c3R5bGU9e3twb3NpdGlvbjonYWJzb2x1dGUnLCBoZWlnaHQ6ICcxMDAlJywgdG9wOjAsbGluZUhlaWdodDonMmVtJyxcblx0XHRcdFx0XHRtYXJnaW46MCx3aWR0aDonMTAwJScsIHBhZGRpbmc6MTAsIHBhZGRpbmdCb3R0b206NTEsYm9yZGVyOjB9fS8+XG5cdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcblx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHR7YWN0aW9uOlwiQmFja1wifVxuXHRcdFx0XHRcdCx7YWN0aW9uOlwiVXBsb2FkXCIsIGljb246PFVwbG9hZC8+LFxuXHRcdFx0XHRcdFx0b25TZWxlY3Q6ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQTE9BRCgpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQse2FjdGlvbjpcIlNhdmVcIixpY29uOjxTYXZlLz4sXG5cdFx0XHRcdFx0XHRvblNlbGVjdDplPT5kaXNwYXRjaChBQ1RJT04uVVBEQVRFKHJlZkNvZGUuZ2V0VmFsdWUoKSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfS8+XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKENsb3VkLHtET01BSU4sIEFDVElPTixSRURVQ0VSfSlcbiJdfQ==