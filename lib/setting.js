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

var _reactRedux = require("react-redux");

var _checkUpdate = require("./components/check-update");

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Setting = exports.Setting = function Setting(_ref, _ref2) {
      var latestVersion = _ref.latestVersion;
      var app = _ref2.is.app,
          _ref2$project = _ref2.project,
          _ref2$project$homepag = _ref2$project.homepage,
          homepage = _ref2$project$homepag === undefined ? "." : _ref2$project$homepag,
          version = _ref2$project.version;
      return _react2.default.createElement(
            _materialUi.List,
            null,
            app && _react2.default.createElement(_materialUi.ListItem, { primaryText: "\u53BB\u8BC4\u4EF7", leftIcon: _react2.default.createElement(_modeEdit2.default, null) }),
            _react2.default.createElement(_materialUi.ListItem, { primaryText: "\u5EFA\u8BAE", leftIcon: _react2.default.createElement(_bugReport2.default, null) }),
            _react2.default.createElement(_materialUi.ListItem, { primaryText: app ? (latestVersion && version != latestVersion) + " ? <CheckUpdate>\u66F4\u65B0</CheckUpdate> : \"\u6CA1\u6709\u66F4\u65B0\"}" : "下载App", leftIcon: _react2.default.createElement(_android2.default, null),
                  onClick: function onClick(e) {
                        if (app && (!latestVersion || version == latestVersion)) return;
                        var a = document.createElement("a");
                        a.href = homepage + "/app.apk";
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

Setting.contextTypes = {
      is: _react.PropTypes.object,
      project: _react.PropTypes.object
};

exports.default = (0, _reactRedux.connect)(function (state) {
      return { latestVersion: state.qiliApp.latestVersion };
})(Setting);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbIlNldHRpbmciLCJsYXRlc3RWZXJzaW9uIiwiYXBwIiwiaXMiLCJwcm9qZWN0IiwiaG9tZXBhZ2UiLCJ2ZXJzaW9uIiwiYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJkb3dubG9hZCIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjbGljayIsInJlbW92ZUNoaWxkIiwiY29udGV4dFR5cGVzIiwib2JqZWN0Iiwic3RhdGUiLCJxaWxpQXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7OztBQUVPLElBQU1BLDRCQUFRLFNBQVJBLE9BQVE7QUFBQSxVQUFFQyxhQUFGLFFBQUVBLGFBQUY7QUFBQSxVQUF1QkMsR0FBdkIsU0FBbUJDLEVBQW5CLENBQXVCRCxHQUF2QjtBQUFBLGdDQUE2QkUsT0FBN0I7QUFBQSxnREFBc0NDLFFBQXRDO0FBQUEsVUFBc0NBLFFBQXRDLHlDQUErQyxHQUEvQztBQUFBLFVBQW1EQyxPQUFuRCxpQkFBbURBLE9BQW5EO0FBQUEsYUFDakI7QUFBQTtBQUFBO0FBQ0RKLG1CQUFRLHNEQUFVLGFBQVksb0JBQXRCLEVBQTRCLFVBQVUsdURBQXRDLEdBRFA7QUFHSSxrRUFBVSxhQUFZLGNBQXRCLEVBQTJCLFVBQVUsd0RBQXJDLEdBSEo7QUFLRixrRUFBVSxhQUFhQSxPQUFTRCxpQkFBaUJLLFdBQVNMLGFBQW5DLG1GQUE2RixPQUFwSCxFQUE2SCxVQUFVLHNEQUF2STtBQUNVLDJCQUFTLG9CQUFHO0FBQ3BCLDRCQUFHQyxRQUFRLENBQUNELGFBQUQsSUFBa0JLLFdBQVNMLGFBQW5DLENBQUgsRUFDQztBQUNLLDRCQUFJTSxJQUFFQyxTQUFTQyxhQUFULENBQXVCLEdBQXZCLENBQU47QUFDQUYsMEJBQUVHLElBQUYsR0FBVUwsUUFBVjtBQUNBRSwwQkFBRUksUUFBRixHQUFXLFNBQVg7QUFDQUosMEJBQUVLLEtBQUYsQ0FBUUMsUUFBUixHQUFpQixVQUFqQjtBQUNBTiwwQkFBRU8sR0FBRixHQUFNLENBQUMsSUFBUDtBQUNBTixpQ0FBU08sSUFBVCxDQUFjQyxXQUFkLENBQTBCVCxDQUExQjtBQUNBQSwwQkFBRVUsS0FBRjtBQUNBVCxpQ0FBU08sSUFBVCxDQUFjRyxXQUFkLENBQTBCWCxDQUExQjtBQUNBO0FBWlIsY0FMRTtBQW9CSSxrRUFBVSxhQUFZLGNBQXRCLEVBQTJCLFVBQVUsMERBQXJDO0FBcEJKLE9BRGlCO0FBQUEsQ0FBZDs7QUF5QlBQLFFBQVFtQixZQUFSLEdBQXFCO0FBQ3BCaEIsVUFBSSxpQkFBVWlCLE1BRE07QUFFcEJoQixlQUFTLGlCQUFVZ0I7QUFGQyxDQUFyQjs7a0JBS2UseUJBQVE7QUFBQSxhQUFRLEVBQUNuQixlQUFjb0IsTUFBTUMsT0FBTixDQUFjckIsYUFBN0IsRUFBUjtBQUFBLENBQVIsRUFBOERELE9BQTlELEMiLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgUmF0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWVkaXQnXHJcbmltcG9ydCBCdWdJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYnVnLXJlcG9ydCdcclxuaW1wb3J0IFVwZGF0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zeXN0ZW0tdXBkYXRlLWFsdCdcclxuaW1wb3J0IEFib3V0SWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2luZm8tb3V0bGluZSdcclxuaW1wb3J0IExvZ29JY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FuZHJvaWRcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgQ2hlY2tVcGRhdGUgZnJvbSBcIi4vY29tcG9uZW50cy9jaGVjay11cGRhdGVcIlxyXG5cclxuZXhwb3J0IGNvbnN0IFNldHRpbmc9KHtsYXRlc3RWZXJzaW9ufSwge2lzOnthcHB9LCBwcm9qZWN0Ontob21lcGFnZT1cIi5cIix2ZXJzaW9ufX0pPT4oXHJcbiAgICA8TGlzdD5cclxuXHRcdHthcHAgJiYgKDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuWOu+ivhOS7t1wiIGxlZnRJY29uPXs8UmF0ZUljb24vPn0vPil9XHJcblx0XHRcclxuICAgICAgICA8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLlu7rorq5cIiBsZWZ0SWNvbj17PEJ1Z0ljb24vPn0vPlxyXG5cdFx0XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9e2FwcCA/IGAke2xhdGVzdFZlcnNpb24gJiYgdmVyc2lvbiE9bGF0ZXN0VmVyc2lvbn0gPyA8Q2hlY2tVcGRhdGU+5pu05pawPC9DaGVja1VwZGF0ZT4gOiBcIuayoeacieabtOaWsFwifWA6XCLkuIvovb1BcHBcIn0gbGVmdEljb249ezxMb2dvSWNvbi8+fVxyXG4gICAgICAgICAgICBvbkNsaWNrPXtlPT57XHJcblx0XHRcdFx0aWYoYXBwICYmICghbGF0ZXN0VmVyc2lvbiB8fCB2ZXJzaW9uPT1sYXRlc3RWZXJzaW9uKSlcclxuXHRcdFx0XHRcdHJldHVyblxyXG4gICAgICAgIFx0XHRsZXQgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxyXG4gICAgICAgIFx0XHRhLmhyZWY9YCR7aG9tZXBhZ2V9L2FwcC5hcGtgXHJcbiAgICAgICAgXHRcdGEuZG93bmxvYWQ9XCJhcHAuYXBrXCJcclxuICAgICAgICBcdFx0YS5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCJcclxuICAgICAgICBcdFx0YS50b3A9LTEwMDA7XHJcbiAgICAgICAgXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSlcclxuICAgICAgICBcdFx0YS5jbGljaygpXHJcbiAgICAgICAgXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcclxuICAgICAgICBcdH19XHJcblx0XHQvPlxyXG5cdFx0XHJcbiAgICAgICAgPExpc3RJdGVtIHByaW1hcnlUZXh0PVwi5YWz5LqOXCIgbGVmdEljb249ezxBYm91dEljb24vPn0vPlxyXG4gICAgPC9MaXN0PlxyXG4pXHJcblxyXG5TZXR0aW5nLmNvbnRleHRUeXBlcz17XHJcblx0aXM6IFByb3BUeXBlcy5vYmplY3QsXHJcblx0cHJvamVjdDogUHJvcFR5cGVzLm9iamVjdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHN0YXRlPT4oe2xhdGVzdFZlcnNpb246c3RhdGUucWlsaUFwcC5sYXRlc3RWZXJzaW9ufSkpKFNldHRpbmcpXHJcbiJdfQ==