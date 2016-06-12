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

            if (this.props.app != newProps.app) return true;

            return false;
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
//# sourceMappingURL=data:application/json;base64,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SSxVQUFKLElBQWUsV0FBVSxTQUFWLEVBQW9CLFNBQVEsUUFBUjtBQUMvQiwyQkFBTyxRQUFQO0FBQ0EsOEJBQVUsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFWO2lCQUZKLENBbkNKO2FBREosQ0FqQkk7Ozs7aUNBNERDLFNBQVEsR0FBRTs7O0FBQ2YsZ0JBQUksTUFBSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBRE87QUFFZixvQkFBTyxPQUFQO0FBQ0EscUJBQUssTUFBTDtBQUNJLGtDQUFJLE1BQUosQ0FBVyxHQUFYLEVBQ1AsSUFETyxDQUNGOytCQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsT0FBcEIsVUFBbUMsSUFBSSxJQUFKO3FCQUF0QyxDQURFLENBREo7QUFHQSwwQkFIQTtBQURBLHFCQUtLLFFBQUw7QUFDSSx5QkFBRyxVQUFILENBQWMsS0FBZCxFQUFxQixJQUFyQixDQUEwQjsrQkFBSyxjQUFJLE1BQUosQ0FBVyxHQUFYO3FCQUFMLENBQTFCLENBREo7QUFFQSwwQkFGQTtBQUxBLHFCQVFLLFFBQUw7QUFDSSx3QkFBSSxPQUFLLE9BQU8sc0VBQVAsQ0FBTCxDQURSO0FBRUksd0JBQUcsUUFBTSxJQUFJLElBQUosRUFBUztBQUMxQiw2QkFBSyxRQUFMLEdBQWMsSUFBZCxDQUQwQjtBQUVkLHNDQUFJLE1BQUosQ0FBVyxJQUFJLEdBQUosQ0FBWCxDQUNWLElBRFUsQ0FDTDttQ0FBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE9BQXBCLENBQTRCLEdBQTVCO3lCQUFILENBREssQ0FGYztxQkFBbEI7QUFLSiwwQkFQQTtBQVJBLGFBRmU7Ozs7V0E1RUY7Ozs7O0FBaUdyQixRQUFRLFlBQVIsR0FBcUIsRUFBQyxRQUFPLFFBQU0sU0FBTixDQUFnQixNQUFoQixFQUE3QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJfSBmcm9tIFwiLlwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXG5pbXBvcnQgRG93bmxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtZG93bmxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuaW1wb3J0IFJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBJbmZvIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSAobmV3UHJvcHMpe1xuXHRcdGlmKHRoaXMucmVtb3ZpbmcpXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcblx0XHRpZih0aGlzLnByb3BzLnBhcmFtcy5uYW1lIT1uZXdQcm9wcy5wYXJhbXMubmFtZSl7XG5cdFx0XHRBcHAuY3VycmVudD1uZXdQcm9wcy5wYXJhbXMubmFtZVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdFx0XG5cdFx0aWYodGhpcy5wcm9wcy5hcHAhPW5ld1Byb3BzLmFwcClcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBhcHA9dGhpcy5wcm9wcy5hcHAsXG4gICAgICAgICAgICByZW1vdmFibGU9QXBwLmlzUmVtb3ZhYmxlKGFwcCksXG4gICAgICAgICAgICBjb21tYW5kcztcblxuICAgICAgICBpZih0eXBlb2YoYXBwLl9pZCk9PSd1bmRlZmluZWQnKVxuICAgICAgICAgICAgY29tbWFuZHM9W3thY3Rpb246XCJTYXZlXCIsIGljb246U2F2ZX1dXG4gICAgICAgIGVsc2UgaWYoIXJlbW92YWJsZSlcbiAgICAgICAgICAgIGNvbW1hbmRzPVtdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbW1hbmRzPVtcbiAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVXBsb2FkXCIsIGljb246VXBsb2FkfSxcbiAgICAgICAgICAgICAgICB7YWN0aW9uOlwiUmVtb3ZlXCIsaWNvbjpSZW1vdmV9XG4gICAgICAgICAgICBdXG5cbiAgICAgICAgY29tbWFuZHMudW5zaGlmdCh7YWN0aW9uOlwiQmFja1wifSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJhcHBsaWNhdGlvbiBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlbW92YWJsZX1cblx0XHRcdFx0XHR2YWx1ZT17YXBwLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17ZT0+e1xuXHRcdFx0XHRcdFx0YXBwLm5hbWU9ZS50YXJnZXQudmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcHAuX2lkICYmIGFwcC5uYW1lIT10aGlzLnJlZnMubmFtZS5wcm9wcy52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHAudXBzZXJ0KGFwcCkudGhlbigoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBhcHAvJHthcHAubmFtZX1gKSlcbiAgICAgICAgICAgICAgICAgICAgfX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJ1bmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlbW92YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC51bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT57XG5cdFx0XHRcdFx0XHRhcHAudW5hbWU9ZS50YXJnZXQudmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcHAuX2lkICYmIHRoaXMucmVmcy51bmFtZS5wcm9wcy52YWx1ZSE9YXBwLnVuYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcC51cHNlcnQoYXBwKVxuICAgICAgICAgICAgICAgICAgICB9fS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC5hcGlLZXl9Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG4gICAgICAgICAgICAgICAgPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHByaW1hcnk9XCJVcGxvYWRcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y29tbWFuZHN9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvblNlbGVjdChjb21tYW5kLGUpe1xuICAgICAgICBsZXQgYXBwPXRoaXMucHJvcHMuYXBwXG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSBcIlNhdmVcIjpcbiAgICAgICAgICAgIEFwcC51cHNlcnQoYXBwKVxuXHRcdFx0XHQudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGFwcC8ke2FwcC5uYW1lfWApKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiVXBsb2FkXCI6XG4gICAgICAgICAgICBVSS5zZWxlY3RGaWxlKCdyYXcnKS50aGVuKGFwcD0+QXBwLnVwbG9hZChhcHApKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiUmVtb3ZlXCI6XG4gICAgICAgICAgICB2YXIgbmFtZT1wcm9tcHQoXCJQbGVhc2UgbWFrZSBzdXJlIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBieSBnaXZpbmcgdGhpcyBhcHAgbmFtZVwiKVxuICAgICAgICAgICAgaWYobmFtZT09YXBwLm5hbWUpe1xuXHRcdFx0XHR0aGlzLnJlbW92aW5nPXRydWVcbiAgICAgICAgICAgICAgICBBcHAucmVtb3ZlKGFwcC5faWQpXG5cdFx0XHRcdFx0LnRoZW4oYT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKFwiL1wiKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbn1cbkFwcEluZm8uY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbiJdfQ==