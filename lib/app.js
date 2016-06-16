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

            return this.props.app != newProps.app;
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.params.name != nextProps.params.name) _app2.default.current = nextProps.params.name;
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var app = this.props.app,
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
                        app.name = e.target.value.trim();
                        if (app.name != _this2.refs.name.props.value) _app2.default.upsert(app).then(function () {
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
                        if (_this2.refs.uname.props.value != app.uname) _app2.default.upsert(app);
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
                removable && _.React.createElement(_.UI.CommandBar, { className: "footbar", primary: "Upload",
                    items: [{ action: "Upload", icon: _fileUpload2.default }, { action: "Remove", icon: _delete2.default }],
                    onSelect: function onSelect(cmd) {
                        return _this2.onSelect(cmd);
                    }
                })
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

AppInfo.contextTypes = { router: _.React.PropTypes.object };
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
//# sourceMappingURL=data:application/json;base64,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O2lCQUZDLENBbkJKO2FBRFQsQ0FETzs7OztpQ0E0QkMsUUFBTzs7O0FBQ2Ysb0JBQU8sTUFBUDtBQUNBLHFCQUFLLE1BQUw7Z0NBQ21CLEtBQUssSUFBTCxDQURuQjt3QkFDTSxrQkFETjt3QkFDWSxvQkFEWjs7QUFFQywyQkFBSyxLQUFLLFFBQUwsRUFBTCxDQUZEO0FBR0MsNEJBQU0sTUFBTSxRQUFOLEVBQU4sQ0FIRDtBQUlDLGtDQUFjLE1BQWQsQ0FBcUIsRUFBQyxVQUFELEVBQU8sWUFBUCxFQUFyQixFQUNFLElBREYsQ0FDTyxlQUFLO0FBQ1Ysc0NBQWMsT0FBZCxHQUFzQixHQUF0QixDQURVO0FBRVYsK0JBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsT0FBcEIsQ0FBNEIsRUFBQyxtQkFBZ0IsSUFBaEIsRUFBN0IsRUFGVTtxQkFBTCxDQURQLENBSkQ7QUFEQSxhQURlOzs7Ozt1QkFhVCxlQUFhLEVBQUMsUUFBTyxRQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7a0JBaElUIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudCwgVUl9IGZyb20gXCIuXCJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBkYkFwcGxpY2F0aW9uIGZyb20gXCIuL2RiL2FwcFwiXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXG5pbXBvcnQgRG93bmxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtZG93bmxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuaW1wb3J0IFJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBJbmZvIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17fVxuXHRcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUgKG5ld1Byb3BzKXtcblx0XHRpZih0aGlzLnN0YXRlLmZyb3plbilcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFxuXHRcdHJldHVybiB0aGlzLnByb3BzLmFwcCE9bmV3UHJvcHMuYXBwXG4gICAgfVxuXHRcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuXHRcdGlmKHRoaXMucHJvcHMucGFyYW1zLm5hbWUhPW5leHRQcm9wcy5wYXJhbXMubmFtZSlcblx0XHRcdGRiQXBwbGljYXRpb24uY3VycmVudD1uZXh0UHJvcHMucGFyYW1zLm5hbWVcblx0fVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBhcHA9dGhpcy5wcm9wcy5hcHAsIFxuXHRcdFx0cmVtb3ZhYmxlPWRiQXBwbGljYXRpb24uaXNSZW1vdmFibGUoYXBwKVxuXHRcdFx0XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHRcdHZhbHVlPXthcHAubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT57XG5cdFx0XHRcdFx0XHRhcHAubmFtZT1lLnRhcmdldC52YWx1ZS50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFwcC5uYW1lIT10aGlzLnJlZnMubmFtZS5wcm9wcy52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYkFwcGxpY2F0aW9uLnVwc2VydChhcHApLnRoZW4oKCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShgYXBwLyR7YXBwLm5hbWV9YCkpXG4gICAgICAgICAgICAgICAgICAgIH19Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwidW5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthcHAudW5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17ZT0+e1xuXHRcdFx0XHRcdFx0YXBwLnVuYW1lPWUudGFyZ2V0LnZhbHVlLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5yZWZzLnVuYW1lLnByb3BzLnZhbHVlIT1hcHAudW5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGJBcHBsaWNhdGlvbi51cHNlcnQoYXBwKVxuICAgICAgICAgICAgICAgICAgICB9fS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC5hcGlLZXl9Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZW1vdmFibGUgJiYgXG5cdFx0XHRcdFx0KDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBwcmltYXJ5PVwiVXBsb2FkXCJcblx0XHRcdFx0XHRcdGl0ZW1zPXtbe2FjdGlvbjpcIlVwbG9hZFwiLCBpY29uOlVwbG9hZH0se2FjdGlvbjpcIlJlbW92ZVwiLGljb246UmVtb3ZlfV19XG5cdFx0XHRcdFx0XHRvblNlbGVjdD17Y21kPT50aGlzLm9uU2VsZWN0KGNtZCl9XG5cdFx0XHRcdFx0XHQvPilcblx0XHRcdFx0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCxlKXtcbiAgICAgICAgbGV0IGFwcD10aGlzLnByb3BzLmFwcFxuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgXCJVcGxvYWRcIjpcbiAgICAgICAgICAgIFVJLnNlbGVjdEZpbGUoJ3JhdycpLnRoZW4oYXBwPT5kYkFwcGxpY2F0aW9uLnVwbG9hZChhcHApKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiUmVtb3ZlXCI6XG4gICAgICAgICAgICB2YXIgbmFtZT1wcm9tcHQoXCJQbGVhc2UgbWFrZSBzdXJlIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBieSBnaXZpbmcgdGhpcyBhcHAgbmFtZVwiKVxuICAgICAgICAgICAgaWYobmFtZT09YXBwLm5hbWUpe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtmcm96ZW46dHJ1ZX0pXG4gICAgICAgICAgICAgICAgZGJBcHBsaWNhdGlvbi5yZW1vdmUoYXBwLl9pZClcblx0XHRcdFx0XHQudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuICAgICAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblx0XG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpe1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdHJlbmRlcigpe1xuXHRcdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJ1bmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cIndlY2hhdCB1cmw6IHVzZSBpdCB0byBhY2NlcHQgbWVzc2FnZSBmcm9tIHdlY2hhdFwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9Lz5cblxuICAgICAgICAgICAgICAgIDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W3thY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIGljb246U2F2ZX1dfVxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRvblNlbGVjdChhY3Rpb24pe1xuXHRcdFx0c3dpdGNoKGFjdGlvbil7XG5cdFx0XHRjYXNlICdTYXZlJzpcblx0XHRcdFx0bGV0IHtuYW1lLCB1bmFtZX09dGhpcy5yZWZzXG5cdFx0XHRcdG5hbWU9bmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHRcdHVuYW1lPXVuYW1lLmdldFZhbHVlKClcblx0XHRcdFx0ZGJBcHBsaWNhdGlvbi51cHNlcnQoe25hbWUsIHVuYW1lfSlcblx0XHRcdFx0XHQudGhlbihhcHA9Pntcblx0XHRcdFx0XHRcdGRiQXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRcdFx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZSh7cGF0aG5hbWU6YGFwcC8ke25hbWV9YH0pXG5cdFx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdH1cbn1cbiJdfQ==