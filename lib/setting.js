"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Setting = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _modeEdit = require("material-ui/svg-icons/editor/mode-edit");

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _bugReport = require("material-ui/svg-icons/action/bug-report");

var _bugReport2 = _interopRequireDefault(_bugReport);

var _systemUpdateAlt = require("material-ui/svg-icons/action/system-update-alt");

var _systemUpdateAlt2 = _interopRequireDefault(_systemUpdateAlt);

var _infoOutline = require("material-ui/svg-icons/action/info-outline");

var _infoOutline2 = _interopRequireDefault(_infoOutline);

var _android = require("material-ui/svg-icons/action/android");

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Setting = exports.Setting = function Setting(props) {
    return _react2.default.createElement(
        _materialUi.List,
        null,
        _react2.default.createElement(_materialUi.ListItem, { primaryText: "\u53BB\u8BC4\u4EF7", leftIcon: _react2.default.createElement(_modeEdit2.default, null) }),
        _react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5EFA\u8BAE", leftIcon: _react2.default.createElement(_bugReport2.default, null) }),
        _react2.default.createElement(_materialUi.ListItem, { primaryText: "\u66F4\u65B0", leftIcon: _react2.default.createElement(_systemUpdateAlt2.default, null) }),
        _react2.default.createElement(_materialUi.ListItem, { primaryText: "App", leftIcon: _react2.default.createElement(_android2.default, null),
            onClick: function onClick(e) {
                var a = document.createElement("a");
                a.href = "./app.apk";
                a.download = "app.apk";
                a.style.position = "absolute";
                a.top = -1000;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }),
        _react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5173\u4E8E", leftIcon: _react2.default.createElement(_infoOutline2.default, null) })
    );
};

exports.default = Setting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbIlNldHRpbmciLCJhIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImRvd25sb2FkIiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdPLElBQU1BLDRCQUFRLFNBQVJBLE9BQVE7QUFBQSxXQUNqQjtBQUFBO0FBQUE7QUFDSSw4REFBVSxhQUFZLG9CQUF0QixFQUE0QixVQUFVLHVEQUF0QyxHQURKO0FBRUksOERBQVUsYUFBWSxjQUF0QixFQUEyQixVQUFVLHdEQUFyQyxHQUZKO0FBSUksOERBQVUsYUFBWSxjQUF0QixFQUEyQixVQUFVLDhEQUFyQyxHQUpKO0FBTUksOERBQVUsYUFBWSxLQUF0QixFQUE0QixVQUFVLHNEQUF0QztBQUNJLHFCQUFTLG9CQUFHO0FBQ2Qsb0JBQUlDLElBQUVDLFNBQVNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBTjtBQUNBRixrQkFBRUcsSUFBRixHQUFPLFdBQVA7QUFDQUgsa0JBQUVJLFFBQUYsR0FBVyxTQUFYO0FBQ0FKLGtCQUFFSyxLQUFGLENBQVFDLFFBQVIsR0FBaUIsVUFBakI7QUFDQU4sa0JBQUVPLEdBQUYsR0FBTSxDQUFDLElBQVA7QUFDQU4seUJBQVNPLElBQVQsQ0FBY0MsV0FBZCxDQUEwQlQsQ0FBMUI7QUFDQUEsa0JBQUVVLEtBQUY7QUFDQVQseUJBQVNPLElBQVQsQ0FBY0csV0FBZCxDQUEwQlgsQ0FBMUI7QUFDQTtBQVZGLFVBTko7QUFrQkksOERBQVUsYUFBWSxjQUF0QixFQUEyQixVQUFVLDBEQUFyQztBQWxCSixLQURpQjtBQUFBLENBQWQ7O2tCQXVCUUQsTyIsImZpbGUiOiJzZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgUmF0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWVkaXQnXHJcbmltcG9ydCBCdWdJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYnVnLXJlcG9ydCdcclxuaW1wb3J0IFVwZGF0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zeXN0ZW0tdXBkYXRlLWFsdCdcclxuaW1wb3J0IEFib3V0SWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2luZm8tb3V0bGluZSdcclxuaW1wb3J0IExvZ29JY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FuZHJvaWRcIlxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTZXR0aW5nPXByb3BzPT4oXHJcbiAgICA8TGlzdD5cclxuICAgICAgICA8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLljrvor4Tku7dcIiBsZWZ0SWNvbj17PFJhdGVJY29uLz59Lz5cclxuICAgICAgICA8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLlu7rorq5cIiBsZWZ0SWNvbj17PEJ1Z0ljb24vPn0vPlxyXG5cclxuICAgICAgICA8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLmm7TmlrBcIiBsZWZ0SWNvbj17PFVwZGF0ZUljb24vPn0vPlxyXG5cclxuICAgICAgICA8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCJBcHBcIiBsZWZ0SWNvbj17PExvZ29JY29uLz59XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2U9PntcclxuICAgICAgICBcdFx0bGV0IGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcclxuICAgICAgICBcdFx0YS5ocmVmPVwiLi9hcHAuYXBrXCJcclxuICAgICAgICBcdFx0YS5kb3dubG9hZD1cImFwcC5hcGtcIlxyXG4gICAgICAgIFx0XHRhLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIlxyXG4gICAgICAgIFx0XHRhLnRvcD0tMTAwMDtcclxuICAgICAgICBcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKVxyXG4gICAgICAgIFx0XHRhLmNsaWNrKClcclxuICAgICAgICBcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKVxyXG4gICAgICAgIFx0fX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICA8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLlhbPkuo5cIiBsZWZ0SWNvbj17PEFib3V0SWNvbi8+fS8+XHJcbiAgICA8L0xpc3Q+XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdcclxuIl19