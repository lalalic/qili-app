"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class, _temp2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AppInfo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AppInfo.__proto__ || Object.getPrototypeOf(AppInfo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
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

            return _react2.default.createElement(
                "div",
                { className: "form" },
                _react2.default.createElement(_materialUi.TextField, { ref: "name",
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
                _react2.default.createElement(_materialUi.TextField, { ref: "uname",
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
                _react2.default.createElement(_materialUi.TextField, {
                    floatingLabelText: "API key: value of http header 'x-application-id'",
                    disabled: true,
                    fullWidth: true,
                    value: app.apiKey }),
                _react2.default.createElement(_materialUi.TextField, {
                    floatingLabelText: "wechat url: use it to accept message from wechat",
                    disabled: true,
                    fullWidth: true,
                    value: app.apiKey ? "http://qili2.com/1/" + app.apiKey + "/wechat" : "" }),
                removable ? _react2.default.createElement(_.UI.CommandBar, { className: "footbar", primary: "Upload",
                    items: [{ action: "Back" }, { action: "Upload", icon: _fileUpload2.default }, { action: "Remove", icon: _delete2.default }],
                    onSelect: function onSelect(cmd) {
                        return _this2.onSelect(cmd);
                    }
                }) : _react2.default.createElement(_.UI.CommandBar, { className: "footbar", items: [{ action: "Back" }] })
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
}(_react.Component);

AppInfo.contextTypes = {
    router: _react2.default.PropTypes.object,
    app: _react2.default.PropTypes.object
};
AppInfo.Creator = (_temp2 = _class = function (_Component2) {
    _inherits(_class, _Component2);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
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

            return _react2.default.createElement(
                "div",
                { className: "form" },
                _react2.default.createElement(_materialUi.TextField, { ref: "name",
                    floatingLabelText: "application name",
                    fullWidth: true }),
                _react2.default.createElement(_materialUi.TextField, { ref: "uname",
                    floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
                    fullWidth: true }),
                _react2.default.createElement(_materialUi.TextField, {
                    floatingLabelText: "API key: value of http header 'x-application-id'",
                    disabled: true,
                    fullWidth: true }),
                _react2.default.createElement(_materialUi.TextField, {
                    floatingLabelText: "wechat url: use it to accept message from wechat",
                    disabled: true,
                    fullWidth: true }),
                _react2.default.createElement(_.UI.CommandBar, { className: "footbar",
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

            (function () {
                switch (action) {
                    case 'Save':
                        var _refs = _this6.refs;
                        var name = _refs.name;
                        var uname = _refs.uname;

                        name = name.getValue();
                        uname = uname.getValue();
                        _app2.default.upsert({ name: name, uname: uname }).then(function (app) {
                            _app2.default.current = app;
                            _this6.context.router.replace({ pathname: "app/" + name });
                        });
                }
            })();
        }
    }]);

    return _class;
}(_react.Component), _class.contextTypes = { router: _react2.default.PropTypes.object }, _temp2);
exports.default = AppInfo;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiQXBwSW5mbyIsInN0YXRlIiwibmV3UHJvcHMiLCJmcm96ZW4iLCJuZXh0UHJvcHMiLCJuZXh0Q29udGV4dCIsInByb3BzIiwicGFyYW1zIiwibmFtZSIsImN1cnJlbnQiLCJhcHAiLCJjb250ZXh0IiwicmVtb3ZhYmxlIiwiaXNSZW1vdmFibGUiLCJ2YWx1ZSIsImUiLCJ0YXJnZXQiLCJ0cmltIiwidXBzZXJ0IiwidGhlbiIsInJvdXRlciIsInJlcGxhY2UiLCJ1bmFtZSIsImFwaUtleSIsImFjdGlvbiIsImljb24iLCJvblNlbGVjdCIsImNtZCIsImNvbW1hbmQiLCJzZWxlY3RGaWxlIiwidXBsb2FkIiwicHJvbXB0Iiwic2V0U3RhdGUiLCJyZW1vdmUiLCJfaWQiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJDcmVhdG9yIiwibGFiZWwiLCJyZWZzIiwiZ2V0VmFsdWUiLCJwYXRobmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozs0TEFDcEJDLEssR0FBTSxFOzs7Ozs4Q0FFb0JDLFEsRUFBUztBQUNsQyxnQkFBRyxLQUFLRCxLQUFMLENBQVdFLE1BQWQsRUFDQyxPQUFPLEtBQVA7O0FBRUQsbUJBQU8sSUFBUDtBQUNHOzs7a0RBRXNCQyxTLEVBQVdDLFcsRUFBWTtBQUNoRCxnQkFBRyxLQUFLQyxLQUFMLENBQVdDLE1BQVgsQ0FBa0JDLElBQWxCLElBQXdCSixVQUFVRyxNQUFWLENBQWlCQyxJQUE1QyxFQUNDLGNBQWNDLE9BQWQsR0FBc0JMLFVBQVVHLE1BQVYsQ0FBaUJDLElBQXZDO0FBQ0Q7OztpQ0FFVTtBQUFBOztBQUNKLGdCQUFJRSxNQUFJLEtBQUtDLE9BQUwsQ0FBYUQsR0FBckI7QUFBQSxnQkFDTEUsWUFBVSxj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QixFQUNFSCxJQURGLENBQ08sZUFBSztBQUNWLDBDQUFjVixPQUFkLEdBQXNCQyxHQUF0QjtBQUNBLG1DQUFLQyxPQUFMLENBQWFTLE1BQWIsQ0FBb0JDLE9BQXBCLENBQTRCLEVBQUNxQixtQkFBZ0JsQyxJQUFqQixFQUE1QjtBQUNBLHlCQUpGO0FBTEQ7QUFEZTtBQVlmOzs7OzRCQUNNMkIsWSxHQUFhLEVBQUNmLFFBQU8sZ0JBQU1nQixTQUFOLENBQWdCQyxNQUF4QixFO2tCQXhJRHJDLE8iLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJfSBmcm9tIFwiLlwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZGJBcHBsaWNhdGlvbiBmcm9tIFwiLi9kYi9hcHBcIlxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IERvd25sb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLWRvd25sb2FkXCJcbmltcG9ydCBTYXZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBSZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZGVsZXRlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwSW5mbyBleHRlbmRzIENvbXBvbmVudHtcblx0c3RhdGU9e31cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZSAobmV3UHJvcHMpe1xuXHRcdGlmKHRoaXMuc3RhdGUuZnJvemVuKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRyZXR1cm4gdHJ1ZVxuICAgIH1cblxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcywgbmV4dENvbnRleHQpe1xuXHRcdGlmKHRoaXMucHJvcHMucGFyYW1zLm5hbWUhPW5leHRQcm9wcy5wYXJhbXMubmFtZSlcblx0XHRcdGRiQXBwbGljYXRpb24uY3VycmVudD1uZXh0UHJvcHMucGFyYW1zLm5hbWVcblx0fVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBhcHA9dGhpcy5jb250ZXh0LmFwcCxcblx0XHRcdHJlbW92YWJsZT1kYkFwcGxpY2F0aW9uLmlzUmVtb3ZhYmxlKGFwcClcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJhcHBsaWNhdGlvbiBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlbW92YWJsZX1cblx0XHRcdFx0XHR2YWx1ZT17YXBwLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17ZT0+e1xuXHRcdFx0XHRcdFx0bGV0IHZhbHVlPWUudGFyZ2V0LnZhbHVlLnRyaW0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXBwLm5hbWUhPXZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAubmFtZT12YWx1ZVxuXHRcdFx0XHRcdFx0XHRkYkFwcGxpY2F0aW9uLnVwc2VydChhcHApLnRoZW4oYT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKGBhcHAvJHthcHAubmFtZX1gKSlcblx0XHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgfX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJ1bmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IXJlbW92YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC51bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT57XG5cdFx0XHRcdFx0XHRsZXQgdmFsdWU9ZS50YXJnZXQudmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSE9YXBwLnVuYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHAudW5hbWU9dmFsdWVcblx0XHRcdFx0XHRcdFx0ZGJBcHBsaWNhdGlvbi51cHNlcnQoYXBwKVxuXHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICB9fS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC5hcGlLZXl9Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRyZW1vdmFibGUgP1xuXHRcdFx0XHRcdFx0KDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBwcmltYXJ5PVwiVXBsb2FkXCJcblx0XHRcdFx0XHRcdFx0aXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifSx7YWN0aW9uOlwiVXBsb2FkXCIsIGljb246VXBsb2FkfSx7YWN0aW9uOlwiUmVtb3ZlXCIsaWNvbjpSZW1vdmV9XX1cblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuXHRcdFx0XHRcdFx0XHQvPikgOlxuXHRcdFx0XHRcdFx0KDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9XX0vPilcblx0XHRcdFx0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCxlKXtcbiAgICAgICAgbGV0IGFwcD10aGlzLnByb3BzLmFwcFxuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgXCJVcGxvYWRcIjpcbiAgICAgICAgICAgIFVJLnNlbGVjdEZpbGUoJ3JhdycpLnRoZW4oYXBwPT5kYkFwcGxpY2F0aW9uLnVwbG9hZChhcHApKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiUmVtb3ZlXCI6XG4gICAgICAgICAgICB2YXIgbmFtZT1wcm9tcHQoXCJQbGVhc2UgbWFrZSBzdXJlIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBieSBnaXZpbmcgdGhpcyBhcHAgbmFtZVwiKVxuICAgICAgICAgICAgaWYobmFtZT09YXBwLm5hbWUpe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtmcm96ZW46dHJ1ZX0pXG4gICAgICAgICAgICAgICAgZGJBcHBsaWNhdGlvbi5yZW1vdmUoYXBwLl9pZClcblx0XHRcdFx0XHQudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuICAgICAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0XHRhcHA6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXG5cdHN0YXRpYyBDcmVhdG9yPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpe1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdHJlbmRlcigpe1xuXHRcdFx0cmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiYXBwbGljYXRpb24gbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJ1bmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiZ2xvYmFsIHVuaXF1ZSBwcm9kdWN0IG5hbWU6IGFwcC5xaWxpMi5jb20ve3Byb3VjdE5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cIndlY2hhdCB1cmw6IHVzZSBpdCB0byBhY2NlcHQgbWVzc2FnZSBmcm9tIHdlY2hhdFwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9Lz5cblxuICAgICAgICAgICAgICAgIDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W3thY3Rpb246XCJTYXZlXCIsIGxhYmVsOlwi5L+d5a2YXCIsIGljb246U2F2ZX1dfVxuXHRcdFx0XHRcdG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0KVxuXHRcdH1cblx0XHRvblNlbGVjdChhY3Rpb24pe1xuXHRcdFx0c3dpdGNoKGFjdGlvbil7XG5cdFx0XHRjYXNlICdTYXZlJzpcblx0XHRcdFx0bGV0IHtuYW1lLCB1bmFtZX09dGhpcy5yZWZzXG5cdFx0XHRcdG5hbWU9bmFtZS5nZXRWYWx1ZSgpXG5cdFx0XHRcdHVuYW1lPXVuYW1lLmdldFZhbHVlKClcblx0XHRcdFx0ZGJBcHBsaWNhdGlvbi51cHNlcnQoe25hbWUsIHVuYW1lfSlcblx0XHRcdFx0XHQudGhlbihhcHA9Pntcblx0XHRcdFx0XHRcdGRiQXBwbGljYXRpb24uY3VycmVudD1hcHBcblx0XHRcdFx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZSh7cGF0aG5hbWU6YGFwcC8ke25hbWV9YH0pXG5cdFx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cdFx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cdH1cbn1cbiJdfQ==