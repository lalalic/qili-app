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

    function AppInfo(props) {
        _classCallCheck(this, AppInfo);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AppInfo).call(this, props));

        var _this$props = _this.props;
        var app = _this$props.app;
        var _this$props$params = _this$props.params;
        var params = _this$props$params === undefined ? {} : _this$props$params;
        var name = params.name;

        if (app.name == name) ;else if (name) {
            app = _app2.default.all.filter(function (a) {
                return a.name == name;
            })[0];
            if (app) _app2.default.current = app;else throw new Error("you should not be here");
        }
        _this.state = { app: app };
        return _this;
    }

    _createClass(AppInfo, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (!this.props.app._id) _app2.default.current = _app2.default.last;
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(newProps) {
            if (this.state.app != newProps.app) this.setState({ app: newProps.app });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var app = this.state.app,
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
                    value: app.name,
                    disabled: !removable,
                    onChange: function onChange(e) {
                        return _this2.setState({ app: Object.assign(app, { name: e.target.value }) });
                    },
                    onBlur: function onBlur() {
                        if (app._id && app.name != _this2.refs.name.props.defaultValue) _app2.default.upsert(app).then(function () {
                            return _this2.context.router.replace("app/" + app.name);
                        });
                    } }),
                _.React.createElement(_materialUi.TextField, { ref: "uname",
                    floatingLabelText: "global unique product name: app.qili2.com/{prouctName}",
                    fullWidth: true,
                    value: app.uname,
                    rawValue: app.uname,
                    disabled: !removable,
                    onChange: function onChange(e) {
                        return _this2.setState({ app: Object.assign(app, { uname: e.target.value }) });
                    },
                    onBlur: function onBlur() {
                        if (app._id && _this2.refs.uname.props.rawValue != app.uname) _app2.default.upsert(app);
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
                    _app2.default.upsert(app, function () {
                        return _this3.setState({ app: app });
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
                        _app2.default.remove(app._id, function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixPQUNqQixDQUFZLEtBQVosRUFBa0I7OEJBREQsU0FDQzs7MkVBREQsb0JBRVAsUUFEUTs7MEJBRU8sTUFBSyxLQUFMLENBRlA7WUFFVCxzQkFGUzs2Q0FFSixPQUZJO0FBRVYsWUFBTSw0Q0FBTyx1QkFBYixDQUZVO1lBR1QsT0FBTSxPQUFOLEtBSFM7O0FBSWQsWUFBRyxJQUFJLElBQUosSUFBVSxJQUFWLEVBQ0MsQ0FESixLQUVLLElBQUcsSUFBSCxFQUFRO0FBQ1Qsa0JBQUksY0FBSSxHQUFKLENBQVEsTUFBUixDQUFlLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUYsSUFBUSxJQUFSO2FBQUwsQ0FBZixDQUFrQyxDQUFsQyxDQUFKLENBRFM7QUFFVCxnQkFBRyxHQUFILEVBQ0ksY0FBSSxPQUFKLEdBQVksR0FBWixDQURKLEtBR0ksTUFBTSxJQUFJLEtBQUosQ0FBVSx3QkFBVixDQUFOLENBSEo7U0FGQztBQU9MLGNBQUssS0FBTCxHQUFXLEVBQUMsUUFBRCxFQUFYLENBYmM7O0tBQWxCOztpQkFEaUI7OytDQWdCSztBQUNsQixnQkFBRyxDQUFDLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLEVBQ0EsY0FBSSxPQUFKLEdBQVksY0FBSSxJQUFKLENBRGhCOzs7O2tEQUlzQixVQUFTO0FBQy9CLGdCQUFHLEtBQUssS0FBTCxDQUFXLEdBQVgsSUFBZ0IsU0FBUyxHQUFULEVBQ2YsS0FBSyxRQUFMLENBQWMsRUFBQyxLQUFJLFNBQVMsR0FBVCxFQUFuQixFQURKOzs7O2lDQUlJOzs7QUFDSixnQkFBSSxNQUFJLEtBQUssS0FBTCxDQUFXLEdBQVg7Z0JBQ0osWUFBVSxjQUFJLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBVjtnQkFDQSxRQUZKLENBREk7O0FBS0osZ0JBQUcsT0FBTyxJQUFJLEdBQUosSUFBVSxXQUFqQixFQUNDLFdBQVMsQ0FBQyxFQUFDLFFBQU8sTUFBUCxFQUFlLG9CQUFoQixFQUFELENBQVQsQ0FESixLQUVLLElBQUcsQ0FBQyxTQUFELEVBQ0osV0FBUyxFQUFULENBREMsS0FHRCxXQUFTLENBQ0wsRUFBQyxRQUFPLFFBQVAsRUFBaUIsMEJBQWxCLEVBREssRUFFTCxFQUFDLFFBQU8sUUFBUCxFQUFnQixzQkFBakIsRUFGSyxDQUFULENBSEM7O0FBUUwscUJBQVMsT0FBVCxDQUFpQixFQUFDLFFBQU8sTUFBUCxFQUFsQixFQWZJOztBQWlCSixtQkFDSTs7a0JBQUssV0FBVSxNQUFWLEVBQUw7Z0JBQ0ksK0NBQVcsS0FBSSxNQUFKO0FBQ1AsdUNBQWtCLGtCQUFsQjtBQUNBLCtCQUFXLElBQVg7QUFDQSwyQkFBTyxJQUFJLElBQUo7QUFDUCw4QkFBVSxDQUFDLFNBQUQ7QUFDViw4QkFBVSxrQkFBQyxDQUFEOytCQUFLLE9BQUssUUFBTCxDQUFjLEVBQUMsS0FBSSxPQUFPLE1BQVAsQ0FBYyxHQUFkLEVBQWtCLEVBQUMsTUFBSyxFQUFFLE1BQUYsQ0FBUyxLQUFULEVBQXhCLENBQUosRUFBZjtxQkFBTDtBQUNWLDRCQUFRLGtCQUFJO0FBQ1IsNEJBQUcsSUFBSSxHQUFKLElBQVcsSUFBSSxJQUFKLElBQVUsT0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLEtBQWYsQ0FBcUIsWUFBckIsRUFDcEIsY0FBSSxNQUFKLENBQVcsR0FBWCxFQUFnQixJQUFoQixDQUFxQjttQ0FBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE9BQXBCLFVBQW1DLElBQUksSUFBSjt5QkFBdkMsQ0FBckIsQ0FESjtxQkFESSxFQU5aLENBREo7Z0JBWUksK0NBQVcsS0FBSSxPQUFKO0FBQ1AsdUNBQWtCLHdEQUFsQjtBQUNBLCtCQUFXLElBQVg7QUFDQSwyQkFBTyxJQUFJLEtBQUo7QUFDUCw4QkFBVSxJQUFJLEtBQUo7QUFDViw4QkFBVSxDQUFDLFNBQUQ7QUFDViw4QkFBVSxrQkFBQyxDQUFEOytCQUFLLE9BQUssUUFBTCxDQUFjLEVBQUMsS0FBSSxPQUFPLE1BQVAsQ0FBYyxHQUFkLEVBQWtCLEVBQUMsT0FBTSxFQUFFLE1BQUYsQ0FBUyxLQUFULEVBQXpCLENBQUosRUFBZjtxQkFBTDtBQUNWLDRCQUFRLGtCQUFJO0FBQ1IsNEJBQUcsSUFBSSxHQUFKLElBQVcsT0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixLQUFoQixDQUFzQixRQUF0QixJQUFnQyxJQUFJLEtBQUosRUFDMUMsY0FBSSxNQUFKLENBQVcsR0FBWCxFQURKO3FCQURJLEVBUFosQ0FaSjtnQkF3Qkk7QUFDSSx1Q0FBa0Isa0RBQWxCO0FBQ0EsOEJBQVUsSUFBVjtBQUNBLCtCQUFXLElBQVg7QUFDQSwyQkFBTyxJQUFJLE1BQUosRUFKWCxDQXhCSjtnQkE4Qkk7QUFDSSx1Q0FBa0Isa0RBQWxCO0FBQ0EsOEJBQVUsSUFBVjtBQUNBLCtCQUFXLElBQVg7QUFDQSwyQkFBTyxJQUFJLE1BQUosMkJBQW1DLElBQUksTUFBSixZQUFuQyxHQUF5RCxFQUF6RCxFQUpYLENBOUJKO2dCQW9DSSwyQkFBSSxVQUFKLElBQWUsV0FBVSxTQUFWLEVBQW9CLFNBQVEsUUFBUjtBQUMvQiwyQkFBTyxRQUFQO0FBQ0EsOEJBQVUsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFWO2lCQUZKLENBcENKO2FBREosQ0FqQkk7Ozs7aUNBNkRDLFNBQVEsR0FBRTs7O0FBQ2YsZ0JBQUksTUFBSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBRE87QUFFZixvQkFBTyxPQUFQO0FBQ0EscUJBQUssTUFBTDtBQUNJLGtDQUFJLE1BQUosQ0FBVyxHQUFYLEVBQWU7K0JBQUksT0FBSyxRQUFMLENBQWMsRUFBQyxRQUFELEVBQWQ7cUJBQUosQ0FBZixDQURKO0FBRUEsMEJBRkE7QUFEQSxxQkFJSyxRQUFMO0FBQ0kseUJBQUcsVUFBSCxDQUFjLEtBQWQsRUFBcUIsSUFBckIsQ0FBMEIsVUFBQyxHQUFEOytCQUFPLGNBQUksTUFBSixDQUFXLEdBQVg7cUJBQVAsQ0FBMUIsQ0FESjtBQUVBLDBCQUZBO0FBSkEscUJBT0ssUUFBTDtBQUNJLHdCQUFJLE9BQUssT0FBTyxzRUFBUCxDQUFMLENBRFI7QUFFSSx3QkFBRyxRQUFNLElBQUksSUFBSixFQUFTO0FBQ2Qsc0NBQUksTUFBSixDQUFXLElBQUksR0FBSixFQUFRO21DQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsT0FBcEIsQ0FBNEIsR0FBNUI7eUJBQUosQ0FBbkIsQ0FEYztxQkFBbEI7QUFJSiwwQkFOQTtBQVBBLGFBRmU7Ozs7V0F2RkY7Ozs7O0FBMEdyQixRQUFRLFlBQVIsR0FBcUIsRUFBQyxRQUFPLFFBQU0sU0FBTixDQUFnQixNQUFoQixFQUE3QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJfSBmcm9tIFwiLlwiXG5pbXBvcnQge1RleHRGaWVsZH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgQXBwIGZyb20gXCIuL2RiL2FwcFwiXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXG5pbXBvcnQgRG93bmxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtZG93bmxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuaW1wb3J0IFJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBJbmZvIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHZhciB7YXBwLCBwYXJhbXM9e319PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7bmFtZX09cGFyYW1zXG4gICAgICAgIGlmKGFwcC5uYW1lPT1uYW1lKVxuICAgICAgICAgICAgO1xuICAgICAgICBlbHNlIGlmKG5hbWUpe1xuICAgICAgICAgICAgYXBwPUFwcC5hbGwuZmlsdGVyKChhKT0+YS5uYW1lPT1uYW1lKVswXVxuICAgICAgICAgICAgaWYoYXBwKVxuICAgICAgICAgICAgICAgIEFwcC5jdXJyZW50PWFwcFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgbm90IGJlIGhlcmVcIilcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRlPXthcHB9XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGlmKCF0aGlzLnByb3BzLmFwcC5faWQpXG4gICAgICAgICAgICBBcHAuY3VycmVudD1BcHAubGFzdFxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpe1xuICAgICAgICBpZih0aGlzLnN0YXRlLmFwcCE9bmV3UHJvcHMuYXBwKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YXBwOm5ld1Byb3BzLmFwcH0pXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciBhcHA9dGhpcy5zdGF0ZS5hcHAsXG4gICAgICAgICAgICByZW1vdmFibGU9QXBwLmlzUmVtb3ZhYmxlKGFwcCksXG4gICAgICAgICAgICBjb21tYW5kcztcblxuICAgICAgICBpZih0eXBlb2YoYXBwLl9pZCk9PSd1bmRlZmluZWQnKVxuICAgICAgICAgICAgY29tbWFuZHM9W3thY3Rpb246XCJTYXZlXCIsIGljb246U2F2ZX1dXG4gICAgICAgIGVsc2UgaWYoIXJlbW92YWJsZSlcbiAgICAgICAgICAgIGNvbW1hbmRzPVtdXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNvbW1hbmRzPVtcbiAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVXBsb2FkXCIsIGljb246VXBsb2FkfSxcbiAgICAgICAgICAgICAgICB7YWN0aW9uOlwiUmVtb3ZlXCIsaWNvbjpSZW1vdmV9XG4gICAgICAgICAgICBdXG5cbiAgICAgICAgY29tbWFuZHMudW5zaGlmdCh7YWN0aW9uOlwiQmFja1wifSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJhcHBsaWNhdGlvbiBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YXBwLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpPT50aGlzLnNldFN0YXRlKHthcHA6T2JqZWN0LmFzc2lnbihhcHAse25hbWU6ZS50YXJnZXQudmFsdWV9KX0pfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcHAuX2lkICYmIGFwcC5uYW1lIT10aGlzLnJlZnMubmFtZS5wcm9wcy5kZWZhdWx0VmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwLnVwc2VydChhcHApLnRoZW4oKCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucmVwbGFjZShgYXBwLyR7YXBwLm5hbWV9YCkpXG4gICAgICAgICAgICAgICAgICAgIH19Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwidW5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC51bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgcmF3VmFsdWU9e2FwcC51bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnRoaXMuc2V0U3RhdGUoe2FwcDpPYmplY3QuYXNzaWduKGFwcCx7dW5hbWU6ZS50YXJnZXQudmFsdWV9KX0pfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcHAuX2lkICYmIHRoaXMucmVmcy51bmFtZS5wcm9wcy5yYXdWYWx1ZSE9YXBwLnVuYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcC51cHNlcnQoYXBwKVxuICAgICAgICAgICAgICAgICAgICB9fS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC5hcGlLZXl9Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG4gICAgICAgICAgICAgICAgPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHByaW1hcnk9XCJVcGxvYWRcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y29tbWFuZHN9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvblNlbGVjdChjb21tYW5kLGUpe1xuICAgICAgICBsZXQgYXBwPXRoaXMucHJvcHMuYXBwXG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSBcIlNhdmVcIjpcbiAgICAgICAgICAgIEFwcC51cHNlcnQoYXBwLCgpPT50aGlzLnNldFN0YXRlKHthcHB9KSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlVwbG9hZFwiOlxuICAgICAgICAgICAgVUkuc2VsZWN0RmlsZSgncmF3JykudGhlbigoYXBwKT0+QXBwLnVwbG9hZChhcHApKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiUmVtb3ZlXCI6XG4gICAgICAgICAgICB2YXIgbmFtZT1wcm9tcHQoXCJQbGVhc2UgbWFrZSBzdXJlIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBieSBnaXZpbmcgdGhpcyBhcHAgbmFtZVwiKVxuICAgICAgICAgICAgaWYobmFtZT09YXBwLm5hbWUpe1xuICAgICAgICAgICAgICAgIEFwcC5yZW1vdmUoYXBwLl9pZCwoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKFwiL1wiKSlcblxuICAgICAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxufVxuQXBwSW5mby5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuIl19