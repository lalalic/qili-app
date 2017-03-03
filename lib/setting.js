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
            _react2.default.createElement(_materialUi.ListItem, { primaryText: app ? "" + (latestVersion && version != latestVersion ? _react2.default.createElement(
                        _checkUpdate2.default,
                        null,
                        "\u5F53\u524D",
                        lastVersion,
                        ",\u66F4\u65B0\u5230",
                        version
                  ) : "已是最新v" + version) : "\u4E0B\u8F7DApp [V" + version + "]", leftIcon: _react2.default.createElement(_android2.default, null),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbIlNldHRpbmciLCJsYXRlc3RWZXJzaW9uIiwiYXBwIiwiaXMiLCJwcm9qZWN0IiwiaG9tZXBhZ2UiLCJ2ZXJzaW9uIiwibGFzdFZlcnNpb24iLCJhIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaHJlZiIsImRvd25sb2FkIiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJzdGF0ZSIsInFpbGlBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7Ozs7O0FBRU8sSUFBTUEsNEJBQVEsU0FBUkEsT0FBUTtBQUFBLFVBQUVDLGFBQUYsUUFBRUEsYUFBRjtBQUFBLFVBQXVCQyxHQUF2QixTQUFtQkMsRUFBbkIsQ0FBdUJELEdBQXZCO0FBQUEsZ0NBQTZCRSxPQUE3QjtBQUFBLGdEQUFzQ0MsUUFBdEM7QUFBQSxVQUFzQ0EsUUFBdEMseUNBQStDLEdBQS9DO0FBQUEsVUFBbURDLE9BQW5ELGlCQUFtREEsT0FBbkQ7QUFBQSxhQUNqQjtBQUFBO0FBQUE7QUFDREosbUJBQVEsc0RBQVUsYUFBWSxvQkFBdEIsRUFBNEIsVUFBVSx1REFBdEMsR0FEUDtBQUdJLGtFQUFVLGFBQVksY0FBdEIsRUFBMkIsVUFBVSx3REFBckMsR0FISjtBQUtGLGtFQUFVLGFBQWFBLFlBQVNELGlCQUFpQkssV0FBU0wsYUFBMUIsR0FBMEM7QUFBQTtBQUFBO0FBQUE7QUFBZ0JNLG1DQUFoQjtBQUFBO0FBQWlDRDtBQUFqQyxtQkFBMUMsR0FBb0csVUFBUUEsT0FBckgsMkJBQTBJQSxPQUExSSxNQUF2QixFQUE2SyxVQUFVLHNEQUF2TDtBQUNVLDJCQUFTLG9CQUFHO0FBQ3BCLDRCQUFHSixRQUFRLENBQUNELGFBQUQsSUFBa0JLLFdBQVNMLGFBQW5DLENBQUgsRUFDQztBQUNLLDRCQUFJTyxJQUFFQyxTQUFTQyxhQUFULENBQXVCLEdBQXZCLENBQU47QUFDQUYsMEJBQUVHLElBQUYsR0FBVU4sUUFBVjtBQUNBRywwQkFBRUksUUFBRixHQUFXLFNBQVg7QUFDQUosMEJBQUVLLEtBQUYsQ0FBUUMsUUFBUixHQUFpQixVQUFqQjtBQUNBTiwwQkFBRU8sR0FBRixHQUFNLENBQUMsSUFBUDtBQUNBTixpQ0FBU08sSUFBVCxDQUFjQyxXQUFkLENBQTBCVCxDQUExQjtBQUNBQSwwQkFBRVUsS0FBRjtBQUNBVCxpQ0FBU08sSUFBVCxDQUFjRyxXQUFkLENBQTBCWCxDQUExQjtBQUNBO0FBWlIsY0FMRTtBQW9CSSxrRUFBVSxhQUFZLGNBQXRCLEVBQTJCLFVBQVUsMERBQXJDO0FBcEJKLE9BRGlCO0FBQUEsQ0FBZDs7QUF5QlBSLFFBQVFvQixZQUFSLEdBQXFCO0FBQ3BCakIsVUFBSSxpQkFBVWtCLE1BRE07QUFFcEJqQixlQUFTLGlCQUFVaUI7QUFGQyxDQUFyQjs7a0JBS2UseUJBQVE7QUFBQSxhQUFRLEVBQUNwQixlQUFjcUIsTUFBTUMsT0FBTixDQUFjdEIsYUFBN0IsRUFBUjtBQUFBLENBQVIsRUFBOERELE9BQTlELEMiLCJmaWxlIjoic2V0dGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7TGlzdCwgTGlzdEl0ZW19IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcblxyXG5pbXBvcnQgUmF0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWVkaXQnXHJcbmltcG9ydCBCdWdJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYnVnLXJlcG9ydCdcclxuaW1wb3J0IFVwZGF0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zeXN0ZW0tdXBkYXRlLWFsdCdcclxuaW1wb3J0IEFib3V0SWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2luZm8tb3V0bGluZSdcclxuaW1wb3J0IExvZ29JY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FuZHJvaWRcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcblxyXG5pbXBvcnQgQ2hlY2tVcGRhdGUgZnJvbSBcIi4vY29tcG9uZW50cy9jaGVjay11cGRhdGVcIlxyXG5cclxuZXhwb3J0IGNvbnN0IFNldHRpbmc9KHtsYXRlc3RWZXJzaW9ufSwge2lzOnthcHB9LCBwcm9qZWN0Ontob21lcGFnZT1cIi5cIix2ZXJzaW9ufX0pPT4oXHJcbiAgICA8TGlzdD5cclxuXHRcdHthcHAgJiYgKDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuWOu+ivhOS7t1wiIGxlZnRJY29uPXs8UmF0ZUljb24vPn0vPil9XHJcblx0XHRcclxuICAgICAgICA8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9XCLlu7rorq5cIiBsZWZ0SWNvbj17PEJ1Z0ljb24vPn0vPlxyXG5cdFx0XHJcblx0XHQ8TGlzdEl0ZW0gcHJpbWFyeVRleHQ9e2FwcCA/IGAke2xhdGVzdFZlcnNpb24gJiYgdmVyc2lvbiE9bGF0ZXN0VmVyc2lvbiA/IDxDaGVja1VwZGF0ZT7lvZPliY17bGFzdFZlcnNpb259LOabtOaWsOWIsHt2ZXJzaW9ufTwvQ2hlY2tVcGRhdGU+IDogXCLlt7LmmK/mnIDmlrB2XCIrdmVyc2lvbn1gOmDkuIvovb1BcHAgW1Yke3ZlcnNpb259XWB9IGxlZnRJY29uPXs8TG9nb0ljb24vPn1cclxuICAgICAgICAgICAgb25DbGljaz17ZT0+e1xyXG5cdFx0XHRcdGlmKGFwcCAmJiAoIWxhdGVzdFZlcnNpb24gfHwgdmVyc2lvbj09bGF0ZXN0VmVyc2lvbikpXHJcblx0XHRcdFx0XHRyZXR1cm5cclxuICAgICAgICBcdFx0bGV0IGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcclxuICAgICAgICBcdFx0YS5ocmVmPWAke2hvbWVwYWdlfS9hcHAuYXBrYFxyXG4gICAgICAgIFx0XHRhLmRvd25sb2FkPVwiYXBwLmFwa1wiXHJcbiAgICAgICAgXHRcdGEuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiXHJcbiAgICAgICAgXHRcdGEudG9wPS0xMDAwO1xyXG4gICAgICAgIFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpXHJcbiAgICAgICAgXHRcdGEuY2xpY2soKVxyXG4gICAgICAgIFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpXHJcbiAgICAgICAgXHR9fVxyXG5cdFx0Lz5cclxuXHRcdFxyXG4gICAgICAgIDxMaXN0SXRlbSBwcmltYXJ5VGV4dD1cIuWFs+S6jlwiIGxlZnRJY29uPXs8QWJvdXRJY29uLz59Lz5cclxuICAgIDwvTGlzdD5cclxuKVxyXG5cclxuU2V0dGluZy5jb250ZXh0VHlwZXM9e1xyXG5cdGlzOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdHByb2plY3Q6IFByb3BUeXBlcy5vYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZT0+KHtsYXRlc3RWZXJzaW9uOnN0YXRlLnFpbGlBcHAubGF0ZXN0VmVyc2lvbn0pKShTZXR0aW5nKVxyXG4iXX0=