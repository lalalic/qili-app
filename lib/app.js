"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class, _temp2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require(".");

var _materialUi = require("material-ui");

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

var _fileUpload = require("material-ui/svg-icons/file/file-upload");

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _fileDownload = require("material-ui/svg-icons/file/file-download");

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _save = require("material-ui/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

var _delete = require("material-ui/svg-icons/action/delete");

var _delete2 = _interopRequireDefault(_delete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppInfo = function (_Component) {
    _inherits(AppInfo, _Component);

    function AppInfo() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, AppInfo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AppInfo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AppInfo, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(newProps) {
            if (this.state.frozen) return false;

            return true;
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps, nextContext) {
            if (this.props.params.name != nextProps.params.name) _app2.default.current = nextProps.params.name;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var app = this.context.app,
                removable = _app2.default.isRemovable(app);

            return _.React.createElement(
                "div",
                { className: "form" },
                _.React.createElement(_materialUi.TextField, { ref: "name",
                    floatingLabelText: "application name",
                    fullWidth: true,
                    disabled: !removable,
                    value: app.name,
                    onBlur: function onBlur(e) {
                        var value = e.target.value.trim();
                        if (app.name != value) {
                            app.name = value;
                            _app2.default.upsert(app).then(function (a) {
                                return _this2.context.router.replace("app/" + app.name);
                            });
                        }
                    } }),
                _.React.createElement(_materialUi.TextField, { ref: "uname",
                    floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
                    fullWidth: true,
                    disabled: !removable,
                    value: app.uname,
                    onBlur: function onBlur(e) {
                        var value = e.target.value.trim();
                        if (value != app.uname) {
                            app.uname = value;
                            _app2.default.upsert(app);
                        }
                    } }),
                _.React.createElement(_materialUi.TextField, {
                    floatingLabelText: "API key: value of http header 'x-application-id'",
                    disabled: true,
                    fullWidth: true,
                    value: app.apiKey }),
                _.React.createElement(_materialUi.TextField, {
                    floatingLabelText: "wechat url: use it to accept message from wechat",
                    disabled: true,
                    fullWidth: true,
                    value: app.apiKey ? "http://qili2.com/1/" + app.apiKey + "/wechat" : "" }),
                removable ? _.React.createElement(_.UI.CommandBar, { className: "footbar", primary: "Upload",
                    items: [{ action: "Back" }, { action: "Upload", icon: _fileUpload2.default }, { action: "Remove", icon: _delete2.default }],
                    onSelect: function onSelect(cmd) {
                        return _this2.onSelect(cmd);
                    }
                }) : _.React.createElement(_.UI.CommandBar, { className: "footbar", items: [{ action: "Back" }] })
            );
        }
    }, {
        key: "onSelect",
        value: function onSelect(command, e) {
            var _this3 = this;

            var app = this.props.app;
            switch (command) {
                case "Upload":
                    _.UI.selectFile('raw').then(function (app) {
                        return _app2.default.upload(app);
                    });
                    break;
                case "Remove":
                    var name = prompt("Please make sure you know what you are doing by giving this app name");
                    if (name == app.name) {
                        this.setState({ frozen: true });
                        _app2.default.remove(app._id).then(function (a) {
                            return _this3.context.router.replace("/");
                        });
                    }
                    break;
            }
        }
    }]);

    return AppInfo;
}(_.Component);

AppInfo.contextTypes = {
    router: _.React.PropTypes.object,
    app: _.React.PropTypes.object
};
AppInfo.Creator = (_temp2 = _class = function (_Component2) {
    _inherits(_class, _Component2);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return false;
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            return _.React.createElement(
                "div",
                { className: "form" },
                _.React.createElement(_materialUi.TextField, { ref: "name",
                    floatingLabelText: "application name",
                    fullWidth: true }),
                _.React.createElement(_materialUi.TextField, { ref: "uname",
                    floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
                    fullWidth: true }),
                _.React.createElement(_materialUi.TextField, {
                    floatingLabelText: "API key: value of http header 'x-application-id'",
                    disabled: true,
                    fullWidth: true }),
                _.React.createElement(_materialUi.TextField, {
                    floatingLabelText: "wechat url: use it to accept message from wechat",
                    disabled: true,
                    fullWidth: true }),
                _.React.createElement(_.UI.CommandBar, { className: "footbar",
                    items: [{ action: "Save", label: "保存", icon: _save2.default }],
                    onSelect: function onSelect(cmd) {
                        return _this5.onSelect(cmd);
                    }
                })
            );
        }
    }, {
        key: "onSelect",
        value: function onSelect(action) {
            var _this6 = this;

            switch (action) {
                case 'Save':
                    var _refs = this.refs;
                    var name = _refs.name;
                    var uname = _refs.uname;

                    name = name.getValue();
                    uname = uname.getValue();
                    _app2.default.upsert({ name: name, uname: uname }).then(function (app) {
                        _app2.default.current = app;
                        _this6.context.router.replace({ pathname: "app/" + name });
                    });
            }
        }
    }]);

    return _class;
}(_.Component), _class.contextTypes = { router: _.React.PropTypes.object }, _temp2);
exports.default = AppInfo;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LFdBQVUsU0FBVjtBQUNYLDJCQUFPLENBQUMsRUFBQyxRQUFPLE1BQVAsRUFBZSxPQUFNLElBQU4sRUFBWSxvQkFBNUIsRUFBRCxDQUFQO0FBQ2YsOEJBQVU7K0JBQUssT0FBSyxRQUFMLENBQWMsR0FBZDtxQkFBTDtpQkFGQyxDQW5CSjthQURULENBRE87Ozs7aUNBNEJDLFFBQU87OztBQUNmLG9CQUFPLE1BQVA7QUFDQSxxQkFBSyxNQUFMO2dDQUNtQixLQUFLLElBQUwsQ0FEbkI7d0JBQ00sa0JBRE47d0JBQ1ksb0JBRFo7O0FBRUMsMkJBQUssS0FBSyxRQUFMLEVBQUwsQ0FGRDtBQUdDLDRCQUFNLE1BQU0sUUFBTixFQUFOLENBSEQ7QUFJQyxrQ0FBYyxNQUFkLENBQXFCLEVBQUMsVUFBRCxFQUFPLFlBQVAsRUFBckIsRUFDRSxJQURGLENBQ08sZUFBSztBQUNWLHNDQUFjLE9BQWQsR0FBc0IsR0FBdEIsQ0FEVTtBQUVWLCtCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE9BQXBCLENBQTRCLEVBQUMsbUJBQWdCLElBQWhCLEVBQTdCLEVBRlU7cUJBQUwsQ0FEUCxDQUpEO0FBREEsYUFEZTs7Ozs7dUJBYVQsZUFBYSxFQUFDLFFBQU8sUUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQXhJVCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJfSBmcm9tIFwiLlwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZGJBcHBsaWNhdGlvbiBmcm9tIFwiLi9kYi9hcHBcIlxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IERvd25sb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLWRvd25sb2FkXCJcbmltcG9ydCBTYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBSZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwSW5mbyBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e31cblx0XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlIChuZXdQcm9wcyl7XG5cdFx0aWYodGhpcy5zdGF0ZS5mcm96ZW4pXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcblx0XHRyZXR1cm4gdHJ1ZVxuICAgIH1cblx0XG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzLCBuZXh0Q29udGV4dCl7XG5cdFx0aWYodGhpcy5wcm9wcy5wYXJhbXMubmFtZSE9bmV4dFByb3BzLnBhcmFtcy5uYW1lKVxuXHRcdFx0ZGJBcHBsaWNhdGlvbi5jdXJyZW50PW5leHRQcm9wcy5wYXJhbXMubmFtZVxuXHR9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGFwcD10aGlzLmNvbnRleHQuYXBwLCBcblx0XHRcdHJlbW92YWJsZT1kYkFwcGxpY2F0aW9uLmlzUmVtb3ZhYmxlKGFwcClcblx0XHRcdFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJhcHBsaWNhdGlvbiBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlbW92YWJsZX1cblx0XHRcdFx0XHR2YWx1ZT17YXBwLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17ZT0+e1xuXHRcdFx0XHRcdFx0bGV0IHZhbHVlPWUudGFyZ2V0LnZhbHVlLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXBwLm5hbWUhPXZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAubmFtZT12YWx1ZVxuXHRcdFx0XHRcdFx0XHRkYkFwcGxpY2F0aW9uLnVwc2VydChhcHApLnRoZW4oYT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBhcHAvJHthcHAubmFtZX1gKSlcblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgfX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJ1bmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlbW92YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC51bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT57XG5cdFx0XHRcdFx0XHRsZXQgdmFsdWU9ZS50YXJnZXQudmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSE9YXBwLnVuYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAudW5hbWU9dmFsdWVcblx0XHRcdFx0XHRcdFx0ZGJBcHBsaWNhdGlvbi51cHNlcnQoYXBwKVxuXHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICB9fS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC5hcGlLZXl9Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZW1vdmFibGUgPyBcblx0XHRcdFx0XHRcdCg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgcHJpbWFyeT1cIlVwbG9hZFwiXG5cdFx0XHRcdFx0XHRcdGl0ZW1zPXtbe2FjdGlvbjpcIkJhY2tcIn0se2FjdGlvbjpcIlVwbG9hZFwiLCBpY29uOlVwbG9hZH0se2FjdGlvbjpcIlJlbW92ZVwiLGljb246UmVtb3ZlfV19XG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cblx0XHRcdFx0XHRcdFx0Lz4pIDpcblx0XHRcdFx0XHRcdCg8VUkuQ29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgaXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifV19Lz4pXG5cdFx0XHRcdH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uU2VsZWN0KGNvbW1hbmQsZSl7XG4gICAgICAgIGxldCBhcHA9dGhpcy5wcm9wcy5hcHBcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlIFwiVXBsb2FkXCI6XG4gICAgICAgICAgICBVSS5zZWxlY3RGaWxlKCdyYXcnKS50aGVuKGFwcD0+ZGJBcHBsaWNhdGlvbi51cGxvYWQoYXBwKSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlJlbW92ZVwiOlxuICAgICAgICAgICAgdmFyIG5hbWU9cHJvbXB0KFwiUGxlYXNlIG1ha2Ugc3VyZSB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcgYnkgZ2l2aW5nIHRoaXMgYXBwIG5hbWVcIilcbiAgICAgICAgICAgIGlmKG5hbWU9PWFwcC5uYW1lKXtcblx0XHRcdFx0dGhpcy5zZXRTdGF0ZSh7ZnJvemVuOnRydWV9KVxuICAgICAgICAgICAgICAgIGRiQXBwbGljYXRpb24ucmVtb3ZlKGFwcC5faWQpXG5cdFx0XHRcdFx0LnRoZW4oYT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKFwiL1wiKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdFx0YXBwOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG5cdH1cblx0XG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpe1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdHJlbmRlcigpe1xuXHRcdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJ1bmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cIndlY2hhdCB1cmw6IHVzZSBpdCB0byBhY2NlcHQgbWVzc2FnZSBmcm9tIHdlY2hhdFwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9Lz5cblxuICAgICAgICAgICAgICAgIDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W3thY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIGljb246U2F2ZX1dfVxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRvblNlbGVjdChhY3Rpb24pe1xuXHRcdFx0c3dpdGNoKGFjdGlvbil7XG5cdFx0XHRjYXNlICdTYXZlJzpcblx0XHRcdFx0bGV0IHtuYW1lLCB1bmFtZX09dGhpcy5yZWZzXG5cdFx0XHRcdG5hbWU9bmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHRcdHVuYW1lPXVuYW1lLmdldFZhbHVlKClcblx0XHRcdFx0ZGJBcHBsaWNhdGlvbi51cHNlcnQoe25hbWUsIHVuYW1lfSlcblx0XHRcdFx0XHQudGhlbihhcHA9Pntcblx0XHRcdFx0XHRcdGRiQXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRcdFx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZSh7cGF0aG5hbWU6YGFwcC8ke25hbWV9YH0pXG5cdFx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdH1cbn1cbiJdfQ==