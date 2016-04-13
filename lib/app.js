"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require(".");

var _materialUi = require("material-ui");

var _app = require("./db/app");

var _app2 = _interopRequireDefault(_app);

var _fileUpload = require("material-ui/lib/svg-icons/file/file-upload");

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _fileDownload = require("material-ui/lib/svg-icons/file/file-download");

var _fileDownload2 = _interopRequireDefault(_fileDownload);

var _save = require("material-ui/lib/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

var _delete = require("material-ui/lib/svg-icons/action/delete");

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
                    defaultValue: app.name,
                    value: app.name,
                    disabled: !removable,
                    onChange: function onChange(e) {
                        return _this2.setState({ app: Object.assign(app, { name: e.target.value }) });
                    },
                    onBlur: function onBlur() {
                        if (app._id && app.name != _this2.refs.name.props.defaultValue) _app2.default.upsert(app).then(function () {
                            return _this2.context.router.replaceWith("app", app);
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
                            return _this3.context.router.replaceWith("/");
                        });
                    }
                    break;
            }
        }
    }]);

    return AppInfo;
}(_.Component);

exports.default = AppInfo;

AppInfo.contextTypes = { router: _.React.PropTypes.func };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixPQUNqQixDQUFZLEtBQVosRUFBa0I7OEJBREQsU0FDQzs7MkVBREQsb0JBRVAsUUFEUTs7MEJBRU8sTUFBSyxLQUFMLENBRlA7WUFFVCxzQkFGUzs2Q0FFSixPQUZJO0FBRVYsWUFBTSw0Q0FBTyx1QkFBYixDQUZVO1lBR1QsT0FBTSxPQUFOLEtBSFM7O0FBSWQsWUFBRyxJQUFJLElBQUosSUFBVSxJQUFWLEVBQ0MsQ0FESixLQUVLLElBQUcsSUFBSCxFQUFRO0FBQ1Qsa0JBQUksY0FBSSxHQUFKLENBQVEsTUFBUixDQUFlLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUYsSUFBUSxJQUFSO2FBQUwsQ0FBZixDQUFrQyxDQUFsQyxDQUFKLENBRFM7QUFFVCxnQkFBRyxHQUFILEVBQ0ksY0FBSSxPQUFKLEdBQVksR0FBWixDQURKLEtBR0ksTUFBTSxJQUFJLEtBQUosQ0FBVSx3QkFBVixDQUFOLENBSEo7U0FGQztBQU9MLGNBQUssS0FBTCxHQUFXLEVBQUMsUUFBRCxFQUFYLENBYmM7O0tBQWxCOztpQkFEaUI7OytDQWdCSztBQUNsQixnQkFBRyxDQUFDLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxHQUFmLEVBQ0EsY0FBSSxPQUFKLEdBQVksY0FBSSxJQUFKLENBRGhCOzs7O2tEQUlzQixVQUFTO0FBQy9CLGdCQUFHLEtBQUssS0FBTCxDQUFXLEdBQVgsSUFBZ0IsU0FBUyxHQUFULEVBQ2YsS0FBSyxRQUFMLENBQWMsRUFBQyxLQUFJLFNBQVMsR0FBVCxFQUFuQixFQURKOzs7O2lDQUlJOzs7QUFDSixnQkFBSSxNQUFJLEtBQUssS0FBTCxDQUFXLEdBQVg7Z0JBQ0osWUFBVSxjQUFJLFdBQUosQ0FBZ0IsR0FBaEIsQ0FBVjtnQkFDQSxRQUZKLENBREk7O0FBS0osZ0JBQUcsT0FBTyxJQUFJLEdBQUosSUFBVSxXQUFqQixFQUNDLFdBQVMsQ0FBQyxFQUFDLFFBQU8sTUFBUCxFQUFlLG9CQUFoQixFQUFELENBQVQsQ0FESixLQUVLLElBQUcsQ0FBQyxTQUFELEVBQ0osV0FBUyxFQUFULENBREMsS0FHRCxXQUFTLENBQ0wsRUFBQyxRQUFPLFFBQVAsRUFBaUIsMEJBQWxCLEVBREssRUFFTCxFQUFDLFFBQU8sUUFBUCxFQUFnQixzQkFBakIsRUFGSyxDQUFULENBSEM7O0FBUUwscUJBQVMsT0FBVCxDQUFpQixFQUFDLFFBQU8sTUFBUCxFQUFsQixFQWZJOztBQWlCSixtQkFDSTs7a0JBQUssV0FBVSxNQUFWLEVBQUw7Z0JBQ0ksK0NBQVcsS0FBSSxNQUFKO0FBQ1AsdUNBQWtCLGtCQUFsQjtBQUNBLCtCQUFXLElBQVg7QUFDQSxrQ0FBYyxJQUFJLElBQUo7QUFDZCwyQkFBTyxJQUFJLElBQUo7QUFDUCw4QkFBVSxDQUFDLFNBQUQ7QUFDViw4QkFBVSxrQkFBQyxDQUFEOytCQUFLLE9BQUssUUFBTCxDQUFjLEVBQUMsS0FBSSxPQUFPLE1BQVAsQ0FBYyxHQUFkLEVBQWtCLEVBQUMsTUFBSyxFQUFFLE1BQUYsQ0FBUyxLQUFULEVBQXhCLENBQUosRUFBZjtxQkFBTDtBQUNWLDRCQUFRLGtCQUFJO0FBQ1IsNEJBQUcsSUFBSSxHQUFKLElBQVcsSUFBSSxJQUFKLElBQVUsT0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLEtBQWYsQ0FBcUIsWUFBckIsRUFDcEIsY0FBSSxNQUFKLENBQVcsR0FBWCxFQUFnQixJQUFoQixDQUFxQjttQ0FBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFdBQXBCLENBQWdDLEtBQWhDLEVBQXNDLEdBQXRDO3lCQUFKLENBQXJCLENBREo7cUJBREksRUFQWixDQURKO2dCQWFJLCtDQUFXLEtBQUksT0FBSjtBQUNQLHVDQUFrQix3REFBbEI7QUFDQSwrQkFBVyxJQUFYO0FBQ0EsMkJBQU8sSUFBSSxLQUFKO0FBQ1AsOEJBQVUsSUFBSSxLQUFKO0FBQ1YsOEJBQVUsQ0FBQyxTQUFEO0FBQ1YsOEJBQVUsa0JBQUMsQ0FBRDsrQkFBSyxPQUFLLFFBQUwsQ0FBYyxFQUFDLEtBQUksT0FBTyxNQUFQLENBQWMsR0FBZCxFQUFrQixFQUFDLE9BQU0sRUFBRSxNQUFGLENBQVMsS0FBVCxFQUF6QixDQUFKLEVBQWY7cUJBQUw7QUFDViw0QkFBUSxrQkFBSTtBQUNSLDRCQUFHLElBQUksR0FBSixJQUFXLE9BQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsS0FBaEIsQ0FBc0IsUUFBdEIsSUFBZ0MsSUFBSSxLQUFKLEVBQzFDLGNBQUksTUFBSixDQUFXLEdBQVgsRUFESjtxQkFESSxFQVBaLENBYko7Z0JBeUJJO0FBQ0ksdUNBQWtCLGtEQUFsQjtBQUNBLDhCQUFVLElBQVY7QUFDQSwrQkFBVyxJQUFYO0FBQ0EsMkJBQU8sSUFBSSxNQUFKLEVBSlgsQ0F6Qko7Z0JBK0JJO0FBQ0ksdUNBQWtCLGtEQUFsQjtBQUNBLDhCQUFVLElBQVY7QUFDQSwrQkFBVyxJQUFYO0FBQ0EsMkJBQU8sSUFBSSxNQUFKLDJCQUFtQyxJQUFJLE1BQUosWUFBbkMsR0FBeUQsRUFBekQsRUFKWCxDQS9CSjtnQkFxQ0ksMkJBQUksVUFBSixJQUFlLFdBQVUsU0FBVixFQUFvQixTQUFRLFFBQVI7QUFDL0IsMkJBQU8sUUFBUDtBQUNBLDhCQUFVLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsSUFBbkIsQ0FBVjtpQkFGSixDQXJDSjthQURKLENBakJJOzs7O2lDQThEQyxTQUFRLEdBQUU7OztBQUNmLGdCQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxDQURPO0FBRWYsb0JBQU8sT0FBUDtBQUNBLHFCQUFLLE1BQUw7QUFDSSxrQ0FBSSxNQUFKLENBQVcsR0FBWCxFQUFlOytCQUFJLE9BQUssUUFBTCxDQUFjLEVBQUMsUUFBRCxFQUFkO3FCQUFKLENBQWYsQ0FESjtBQUVBLDBCQUZBO0FBREEscUJBSUssUUFBTDtBQUNJLHlCQUFHLFVBQUgsQ0FBYyxLQUFkLEVBQXFCLElBQXJCLENBQTBCLFVBQUMsR0FBRDsrQkFBTyxjQUFJLE1BQUosQ0FBVyxHQUFYO3FCQUFQLENBQTFCLENBREo7QUFFQSwwQkFGQTtBQUpBLHFCQU9LLFFBQUw7QUFDSSx3QkFBSSxPQUFLLE9BQU8sc0VBQVAsQ0FBTCxDQURSO0FBRUksd0JBQUcsUUFBTSxJQUFJLElBQUosRUFBUztBQUNkLHNDQUFJLE1BQUosQ0FBVyxJQUFJLEdBQUosRUFBUTttQ0FBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFdBQXBCLENBQWdDLEdBQWhDO3lCQUFKLENBQW5CLENBRGM7cUJBQWxCO0FBSUosMEJBTkE7QUFQQSxhQUZlOzs7O1dBeEZGOzs7OztBQTJHckIsUUFBUSxZQUFSLEdBQXFCLEVBQUMsUUFBTyxRQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsRUFBN0IiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgQ29tcG9uZW50LCBVSX0gZnJvbSBcIi5cIlxuaW1wb3J0IHtUZXh0RmllbGR9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IEFwcCBmcm9tIFwiLi9kYi9hcHBcIlxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9maWxlL2ZpbGUtdXBsb2FkXCJcbmltcG9ydCBEb3dubG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9maWxlL2ZpbGUtZG93bmxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBSZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2RlbGV0ZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcEluZm8gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHthcHAsIHBhcmFtcz17fX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtuYW1lfT1wYXJhbXNcbiAgICAgICAgaWYoYXBwLm5hbWU9PW5hbWUpXG4gICAgICAgICAgICA7XG4gICAgICAgIGVsc2UgaWYobmFtZSl7XG4gICAgICAgICAgICBhcHA9QXBwLmFsbC5maWx0ZXIoKGEpPT5hLm5hbWU9PW5hbWUpWzBdXG4gICAgICAgICAgICBpZihhcHApXG4gICAgICAgICAgICAgICAgQXBwLmN1cnJlbnQ9YXBwXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwieW91IHNob3VsZCBub3QgYmUgaGVyZVwiKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdGU9e2FwcH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgaWYoIXRoaXMucHJvcHMuYXBwLl9pZClcbiAgICAgICAgICAgIEFwcC5jdXJyZW50PUFwcC5sYXN0XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcyl7XG4gICAgICAgIGlmKHRoaXMuc3RhdGUuYXBwIT1uZXdQcm9wcy5hcHApXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthcHA6bmV3UHJvcHMuYXBwfSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIGFwcD10aGlzLnN0YXRlLmFwcCxcbiAgICAgICAgICAgIHJlbW92YWJsZT1BcHAuaXNSZW1vdmFibGUoYXBwKSxcbiAgICAgICAgICAgIGNvbW1hbmRzO1xuXG4gICAgICAgIGlmKHR5cGVvZihhcHAuX2lkKT09J3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBjb21tYW5kcz1be2FjdGlvbjpcIlNhdmVcIiwgaWNvbjpTYXZlfV1cbiAgICAgICAgZWxzZSBpZighcmVtb3ZhYmxlKVxuICAgICAgICAgICAgY29tbWFuZHM9W11cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY29tbWFuZHM9W1xuICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWRcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgIHthY3Rpb246XCJSZW1vdmVcIixpY29uOlJlbW92ZX1cbiAgICAgICAgICAgIF1cblxuICAgICAgICBjb21tYW5kcy51bnNoaWZ0KHthY3Rpb246XCJCYWNrXCJ9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17YXBwLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthcHAubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnRoaXMuc2V0U3RhdGUoe2FwcDpPYmplY3QuYXNzaWduKGFwcCx7bmFtZTplLnRhcmdldC52YWx1ZX0pfSl9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17KCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFwcC5faWQgJiYgYXBwLm5hbWUhPXRoaXMucmVmcy5uYW1lLnByb3BzLmRlZmF1bHRWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHAudXBzZXJ0KGFwcCkudGhlbigoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlV2l0aChcImFwcFwiLGFwcCkpXG4gICAgICAgICAgICAgICAgICAgIH19Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgcmVmPVwidW5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cImdsb2JhbCB1bmlxdWUgcHJvZHVjdCBuYW1lOiBhcHAucWlsaTIuY29tL3twcm91Y3ROYW1lfVwiXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC51bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgcmF3VmFsdWU9e2FwcC51bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFyZW1vdmFibGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSk9PnRoaXMuc2V0U3RhdGUoe2FwcDpPYmplY3QuYXNzaWduKGFwcCx7dW5hbWU6ZS50YXJnZXQudmFsdWV9KX0pfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9eygpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcHAuX2lkICYmIHRoaXMucmVmcy51bmFtZS5wcm9wcy5yYXdWYWx1ZSE9YXBwLnVuYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcC51cHNlcnQoYXBwKVxuICAgICAgICAgICAgICAgICAgICB9fS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwiQVBJIGtleTogdmFsdWUgb2YgaHR0cCBoZWFkZXIgJ3gtYXBwbGljYXRpb24taWQnXCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FwcC5hcGlLZXl9Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJ3ZWNoYXQgdXJsOiB1c2UgaXQgdG8gYWNjZXB0IG1lc3NhZ2UgZnJvbSB3ZWNoYXRcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YXBwLmFwaUtleSA/IGBodHRwOi8vcWlsaTIuY29tLzEvJHthcHAuYXBpS2V5fS93ZWNoYXRgIDogXCJcIn0vPlxuXG4gICAgICAgICAgICAgICAgPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHByaW1hcnk9XCJVcGxvYWRcIlxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y29tbWFuZHN9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvblNlbGVjdChjb21tYW5kLGUpe1xuICAgICAgICBsZXQgYXBwPXRoaXMucHJvcHMuYXBwXG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSBcIlNhdmVcIjpcbiAgICAgICAgICAgIEFwcC51cHNlcnQoYXBwLCgpPT50aGlzLnNldFN0YXRlKHthcHB9KSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSBcIlVwbG9hZFwiOlxuICAgICAgICAgICAgVUkuc2VsZWN0RmlsZSgncmF3JykudGhlbigoYXBwKT0+QXBwLnVwbG9hZChhcHApKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiUmVtb3ZlXCI6XG4gICAgICAgICAgICB2YXIgbmFtZT1wcm9tcHQoXCJQbGVhc2UgbWFrZSBzdXJlIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBieSBnaXZpbmcgdGhpcyBhcHAgbmFtZVwiKVxuICAgICAgICAgICAgaWYobmFtZT09YXBwLm5hbWUpe1xuICAgICAgICAgICAgICAgIEFwcC5yZW1vdmUoYXBwLl9pZCwoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlV2l0aChcIi9cIikpXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbn1cbkFwcEluZm8uY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG4iXX0=