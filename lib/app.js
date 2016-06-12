"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
        _classCallCheck(this, AppInfo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AppInfo).apply(this, arguments));
    }

    _createClass(AppInfo, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(newProps) {
            if (this.removing) return false;

            if (this.props.params.name != newProps.params.name) {
                _app2.default.current = newProps.params.name;
                return true;
            }

            return this.props.app != newProps.app;
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (!this.props.app._id) _app2.default.current = _app2.default.last;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var app = this.props.app,
                removable = _app2.default.isRemovable(app),
                commands;

            if (typeof app._id == 'undefined') commands = [{ action: "Save", icon: _save2.default }];else if (!removable) commands = [];else commands = [{ action: "Upload", icon: _fileUpload2.default }, { action: "Remove", icon: _delete2.default }];

            commands.unshift({ action: "Back" });

            return _.React.createElement(
                "div",
                { className: "form" },
                _.React.createElement(_materialUi.TextField, { ref: "name",
                    floatingLabelText: "application name",
                    fullWidth: true,
                    disabled: !removable,
                    value: app.name,
                    onBlur: function onBlur(e) {
                        app.name = e.target.value.trim();
                        if (app._id && app.name != _this2.refs.name.props.value) _app2.default.upsert(app).then(function () {
                            return _this2.context.router.replace("app/" + app.name);
                        });
                    } }),
                _.React.createElement(_materialUi.TextField, { ref: "uname",
                    floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
                    fullWidth: true,
                    disabled: !removable,
                    value: app.uname,
                    onBlur: function onBlur(e) {
                        app.uname = e.target.value.trim();
                        if (app._id && _this2.refs.uname.props.value != app.uname) _app2.default.upsert(app);
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
                _.React.createElement(_.UI.CommandBar, { className: "footbar", primary: "Upload",
                    items: commands,
                    onSelect: this.onSelect.bind(this)
                })
            );
        }
    }, {
        key: "onSelect",
        value: function onSelect(command, e) {
            var _this3 = this;

            var app = this.props.app;
            switch (command) {
                case "Save":
                    _app2.default.upsert(app).then(function (a) {
                        return _this3.context.router.replace("app/" + app.name);
                    });
                    break;
                case "Upload":
                    _.UI.selectFile('raw').then(function (app) {
                        return _app2.default.upload(app);
                    });
                    break;
                case "Remove":
                    var name = prompt("Please make sure you know what you are doing by giving this app name");
                    if (name == app.name) {
                        this.removing = true;
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

exports.default = AppInfo;

AppInfo.contextTypes = { router: _.React.PropTypes.object };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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cG9uZW50LCBVSX0gZnJvbSBcIi5cIlxuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9kYi9hcHBcIlxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IERvd25sb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLWRvd25sb2FkXCJcbmltcG9ydCBTYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBSZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwSW5mbyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUgKG5ld1Byb3BzKXtcblx0XHRpZih0aGlzLnJlbW92aW5nKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRpZih0aGlzLnByb3BzLnBhcmFtcy5uYW1lIT1uZXdQcm9wcy5wYXJhbXMubmFtZSl7XG5cdFx0XHRBcHAuY3VycmVudD1uZXdQcm9wcy5wYXJhbXMubmFtZVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5hcHAhPW5ld1Byb3BzLmFwcFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGlmKCF0aGlzLnByb3BzLmFwcC5faWQpXG4gICAgICAgICAgICBBcHAuY3VycmVudD1BcHAubGFzdFxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgYXBwPXRoaXMucHJvcHMuYXBwLFxuICAgICAgICAgICAgcmVtb3ZhYmxlPUFwcC5pc1JlbW92YWJsZShhcHApLFxuICAgICAgICAgICAgY29tbWFuZHM7XG5cbiAgICAgICAgaWYodHlwZW9mKGFwcC5faWQpPT0ndW5kZWZpbmVkJylcbiAgICAgICAgICAgIGNvbW1hbmRzPVt7YWN0aW9uOlwiU2F2ZVwiLCBpY29uOlNhdmV9XVxuICAgICAgICBlbHNlIGlmKCFyZW1vdmFibGUpXG4gICAgICAgICAgICBjb21tYW5kcz1bXVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjb21tYW5kcz1bXG4gICAgICAgICAgICAgICAge2FjdGlvbjpcIlVwbG9hZFwiLCBpY29uOlVwbG9hZH0sXG4gICAgICAgICAgICAgICAge2FjdGlvbjpcIlJlbW92ZVwiLGljb246UmVtb3ZlfVxuICAgICAgICAgICAgXVxuXG4gICAgICAgIGNvbW1hbmRzLnVuc2hpZnQoe2FjdGlvbjpcIkJhY2tcIn0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG5cdFx0XHRcdFx0dmFsdWU9e2FwcC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e2U9Pntcblx0XHRcdFx0XHRcdGFwcC5uYW1lPWUudGFyZ2V0LnZhbHVlLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXBwLl9pZCAmJiBhcHAubmFtZSE9dGhpcy5yZWZzLm5hbWUucHJvcHMudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwLnVwc2VydChhcHApLnRoZW4oKCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShgYXBwLyR7YXBwLm5hbWV9YCkpXG4gICAgICAgICAgICAgICAgICAgIH19Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwidW5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthcHAudW5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17ZT0+e1xuXHRcdFx0XHRcdFx0YXBwLnVuYW1lPWUudGFyZ2V0LnZhbHVlLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXBwLl9pZCAmJiB0aGlzLnJlZnMudW5hbWUucHJvcHMudmFsdWUhPWFwcC51bmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHAudXBzZXJ0KGFwcClcbiAgICAgICAgICAgICAgICAgICAgfX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cIkFQSSBrZXk6IHZhbHVlIG9mIGh0dHAgaGVhZGVyICd4LWFwcGxpY2F0aW9uLWlkJ1wiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthcHAuYXBpS2V5fS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwid2VjaGF0IHVybDogdXNlIGl0IHRvIGFjY2VwdCBtZXNzYWdlIGZyb20gd2VjaGF0XCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC5hcGlLZXkgPyBgaHR0cDovL3FpbGkyLmNvbS8xLyR7YXBwLmFwaUtleX0vd2VjaGF0YCA6IFwiXCJ9Lz5cblxuICAgICAgICAgICAgICAgIDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBwcmltYXJ5PVwiVXBsb2FkXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfVxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCxlKXtcbiAgICAgICAgbGV0IGFwcD10aGlzLnByb3BzLmFwcFxuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgXCJTYXZlXCI6XG4gICAgICAgICAgICBBcHAudXBzZXJ0KGFwcClcblx0XHRcdFx0LnRoZW4oYT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBhcHAvJHthcHAubmFtZX1gKSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlVwbG9hZFwiOlxuICAgICAgICAgICAgVUkuc2VsZWN0RmlsZSgncmF3JykudGhlbihhcHA9PkFwcC51cGxvYWQoYXBwKSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlJlbW92ZVwiOlxuICAgICAgICAgICAgdmFyIG5hbWU9cHJvbXB0KFwiUGxlYXNlIG1ha2Ugc3VyZSB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcgYnkgZ2l2aW5nIHRoaXMgYXBwIG5hbWVcIilcbiAgICAgICAgICAgIGlmKG5hbWU9PWFwcC5uYW1lKXtcblx0XHRcdFx0dGhpcy5yZW1vdmluZz10cnVlXG4gICAgICAgICAgICAgICAgQXBwLnJlbW92ZShhcHAuX2lkKVxuXHRcdFx0XHRcdC50aGVuKGE9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShcIi9cIikpXG4gICAgICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG59XG5BcHBJbmZvLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG4iXX0=