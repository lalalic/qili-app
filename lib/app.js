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
}(_.Component), _class.contextTypes = { router: _.React.PropTypes.object }, _temp2);
exports.default = AppInfo;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuanMiXSwibmFtZXMiOlsiQXBwSW5mbyIsInN0YXRlIiwibmV3UHJvcHMiLCJmcm96ZW4iLCJuZXh0UHJvcHMiLCJuZXh0Q29udGV4dCIsInByb3BzIiwicGFyYW1zIiwibmFtZSIsImN1cnJlbnQiLCJhcHAiLCJjb250ZXh0IiwicmVtb3ZhYmxlIiwiaXNSZW1vdmFibGUiLCJ2YWx1ZSIsImUiLCJ0YXJnZXQiLCJ0cmltIiwidXBzZXJ0IiwidGhlbiIsInJvdXRlciIsInJlcGxhY2UiLCJ1bmFtZSIsImFwaUtleSIsImFjdGlvbiIsImljb24iLCJvblNlbGVjdCIsImNtZCIsImNvbW1hbmQiLCJzZWxlY3RGaWxlIiwidXBsb2FkIiwicHJvbXB0Iiwic2V0U3RhdGUiLCJyZW1vdmUiLCJfaWQiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJDcmVhdG9yIiwibGFiZWwiLCJyZWZzIiwiZ2V0VmFsdWUiLCJwYXRobmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozs7Ozs7NExBQ3BCQyxLLEdBQU0sRTs7Ozs7OENBRW9CQyxRLEVBQVM7QUFDbEMsZ0JBQUcsS0FBS0QsS0FBTCxDQUFXRSxNQUFkLEVBQ0MsT0FBTyxLQUFQOztBQUVELG1CQUFPLElBQVA7QUFDRzs7O2tEQUVzQkMsUyxFQUFXQyxXLEVBQVk7QUFDaEQsZ0JBQUcsS0FBS0MsS0FBTCxDQUFXQyxNQUFYLENBQWtCQyxJQUFsQixJQUF3QkosVUFBVUcsTUFBVixDQUFpQkMsSUFBNUMsRUFDQyxjQUFjQyxPQUFkLEdBQXNCTCxVQUFVRyxNQUFWLENBQWlCQyxJQUF2QztBQUNEOzs7aUNBRVU7QUFBQTs7QUFDSixnQkFBSUUsTUFBSSxLQUFLQyxPQUFMLENBQWFELEdBQXJCO0FBQUEsZ0JBQ0xFLFlBQVUsY0FBY0MsV0FBZCxDQUEwQkgsR0FBMUIsQ0FETDs7QUFHQSxtQkFDSTtBQUFBO0FBQUEsa0JBQUssV0FBVSxNQUFmO0FBQ0ksK0RBQVcsS0FBSSxNQUFmO0FBQ0ksdUNBQWtCLGtCQUR0QjtBQUVJLCtCQUFXLElBRmY7QUFHSSw4QkFBVSxDQUFDRSxTQUhmO0FBSVgsMkJBQU9GLElBQUlGLElBSkE7QUFLSSw0QkFBUSxtQkFBRztBQUN6Qiw0QkFBSU0sUUFBTUMsRUFBRUMsTUFBRixDQUFTRixLQUFULENBQWVHLElBQWYsRUFBVjtBQUNrQiw0QkFBR1AsSUFBSUYsSUFBSixJQUFVTSxLQUFiLEVBQW1CO0FBQ2ZKLGdDQUFJRixJQUFKLEdBQVNNLEtBQVQ7QUFDckIsMENBQWNJLE1BQWQsQ0FBcUJSLEdBQXJCLEVBQTBCUyxJQUExQixDQUErQjtBQUFBLHVDQUFHLE9BQUtSLE9BQUwsQ0FBYVMsTUFBYixDQUFvQkMsT0FBcEIsVUFBbUNYLElBQUlGLElBQXZDLENBQUg7QUFBQSw2QkFBL0I7QUFDQTtBQUNjLHFCQVhMLEdBREo7QUFjSSwrREFBVyxLQUFJLE9BQWY7QUFDSSx1Q0FBa0Isd0RBRHRCO0FBRUksK0JBQVcsSUFGZjtBQUdJLDhCQUFVLENBQUNJLFNBSGY7QUFJSSwyQkFBT0YsSUFBSVksS0FKZjtBQUtJLDRCQUFRLG1CQUFHO0FBQ3pCLDRCQUFJUixRQUFNQyxFQUFFQyxNQUFGLENBQVNGLEtBQVQsQ0FBZUcsSUFBZixFQUFWO0FBQ2tCLDRCQUFHSCxTQUFPSixJQUFJWSxLQUFkLEVBQW9CO0FBQ2hCWixnQ0FBSVksS0FBSixHQUFVUixLQUFWO0FBQ3JCLDBDQUFjSSxNQUFkLENBQXFCUixHQUFyQjtBQUNBO0FBQ2MscUJBWEwsR0FkSjtBQTJCSTtBQUNJLHVDQUFrQixrREFEdEI7QUFFSSw4QkFBVSxJQUZkO0FBR0ksK0JBQVcsSUFIZjtBQUlJLDJCQUFPQSxJQUFJYSxNQUpmLEdBM0JKO0FBaUNJO0FBQ0ksdUNBQWtCLGtEQUR0QjtBQUVJLDhCQUFVLElBRmQ7QUFHSSwrQkFBVyxJQUhmO0FBSUksMkJBQU9iLElBQUlhLE1BQUosMkJBQW1DYixJQUFJYSxNQUF2QyxlQUF5RCxFQUpwRSxHQWpDSjtBQXdDUFgsNEJBQ0UsMkJBQUksVUFBSixJQUFlLFdBQVUsU0FBekIsRUFBbUMsU0FBUSxRQUEzQztBQUNBLDJCQUFPLENBQUMsRUFBQ1ksUUFBTyxNQUFSLEVBQUQsRUFBaUIsRUFBQ0EsUUFBTyxRQUFSLEVBQWtCQywwQkFBbEIsRUFBakIsRUFBZ0QsRUFBQ0QsUUFBTyxRQUFSLEVBQWlCQyxzQkFBakIsRUFBaEQsQ0FEUDtBQUVBLDhCQUFVO0FBQUEsK0JBQUssT0FBS0MsUUFBTCxDQUFjQyxHQUFkLENBQUw7QUFBQTtBQUZWLGtCQURGLEdBS0UsMkJBQUksVUFBSixJQUFlLFdBQVUsU0FBekIsRUFBbUMsT0FBTyxDQUFDLEVBQUNILFFBQU8sTUFBUixFQUFELENBQTFDO0FBN0NLLGFBREo7QUFrREg7OztpQ0FDUUksTyxFQUFRYixDLEVBQUU7QUFBQTs7QUFDZixnQkFBSUwsTUFBSSxLQUFLSixLQUFMLENBQVdJLEdBQW5CO0FBQ0Esb0JBQU9rQixPQUFQO0FBQ0EscUJBQUssUUFBTDtBQUNJLHlCQUFHQyxVQUFILENBQWMsS0FBZCxFQUFxQlYsSUFBckIsQ0FBMEI7QUFBQSwrQkFBSyxjQUFjVyxNQUFkLENBQXFCcEIsR0FBckIsQ0FBTDtBQUFBLHFCQUExQjtBQUNKO0FBQ0EscUJBQUssUUFBTDtBQUNJLHdCQUFJRixPQUFLdUIsT0FBTyxzRUFBUCxDQUFUO0FBQ0Esd0JBQUd2QixRQUFNRSxJQUFJRixJQUFiLEVBQWtCO0FBQzFCLDZCQUFLd0IsUUFBTCxDQUFjLEVBQUM3QixRQUFPLElBQVIsRUFBZDtBQUNZLHNDQUFjOEIsTUFBZCxDQUFxQnZCLElBQUl3QixHQUF6QixFQUNWZixJQURVLENBQ0w7QUFBQSxtQ0FBRyxPQUFLUixPQUFMLENBQWFTLE1BQWIsQ0FBb0JDLE9BQXBCLENBQTRCLEdBQTVCLENBQUg7QUFBQSx5QkFESztBQUVIO0FBQ0w7QUFYQTtBQWFIOzs7Ozs7QUFyRmdCckIsTyxDQXNGYm1DLFksR0FBYTtBQUNuQmYsWUFBTyxRQUFNZ0IsU0FBTixDQUFnQkMsTUFESjtBQUVuQjNCLFNBQUssUUFBTTBCLFNBQU4sQ0FBZ0JDO0FBRkYsQztBQXRGQXJDLE8sQ0EyRmJzQyxPOzs7Ozs7Ozs7Ozs4Q0FDZ0JsQyxTLEVBQVU7QUFDL0IsbUJBQU8sS0FBUDtBQUNBOzs7aUNBQ087QUFBQTs7QUFDUCxtQkFDUztBQUFBO0FBQUEsa0JBQUssV0FBVSxNQUFmO0FBQ0ksK0RBQVcsS0FBSSxNQUFmO0FBQ0ksdUNBQWtCLGtCQUR0QjtBQUVJLCtCQUFXLElBRmYsR0FESjtBQUtJLCtEQUFXLEtBQUksT0FBZjtBQUNJLHVDQUFrQix3REFEdEI7QUFFSSwrQkFBVyxJQUZmLEdBTEo7QUFTSTtBQUNJLHVDQUFrQixrREFEdEI7QUFFSSw4QkFBVSxJQUZkO0FBR0ksK0JBQVcsSUFIZixHQVRKO0FBY0k7QUFDSSx1Q0FBa0Isa0RBRHRCO0FBRUksOEJBQVUsSUFGZDtBQUdJLCtCQUFXLElBSGYsR0FkSjtBQW1CSSwyQ0FBSSxVQUFKLElBQWUsV0FBVSxTQUF6QjtBQUNJLDJCQUFPLENBQUMsRUFBQ29CLFFBQU8sTUFBUixFQUFnQmUsT0FBTSxJQUF0QixFQUE0QmQsb0JBQTVCLEVBQUQsQ0FEWDtBQUVYLDhCQUFVO0FBQUEsK0JBQUssT0FBS0MsUUFBTCxDQUFjQyxHQUFkLENBQUw7QUFBQTtBQUZDO0FBbkJKLGFBRFQ7QUEwQkE7OztpQ0FDUUgsTSxFQUFPO0FBQUE7O0FBQUE7QUFDZix3QkFBT0EsTUFBUDtBQUNBLHlCQUFLLE1BQUw7QUFBQSxvQ0FDbUIsT0FBS2dCLElBRHhCO0FBQUEsNEJBQ01oQyxJQUROLFNBQ01BLElBRE47QUFBQSw0QkFDWWMsS0FEWixTQUNZQSxLQURaOztBQUVDZCwrQkFBS0EsS0FBS2lDLFFBQUwsRUFBTDtBQUNBbkIsZ0NBQU1BLE1BQU1tQixRQUFOLEVBQU47QUFDQSxzQ0FBY3ZCLE1BQWQsQ0FBcUIsRUFBQ1YsVUFBRCxFQUFPYyxZQUFQLEVBQXJCLEVBQ0VILElBREYsQ0FDTyxlQUFLO0FBQ1YsMENBQWNWLE9BQWQsR0FBc0JDLEdBQXRCO0FBQ0EsbUNBQUtDLE9BQUwsQ0FBYVMsTUFBYixDQUFvQkMsT0FBcEIsQ0FBNEIsRUFBQ3FCLG1CQUFnQmxDLElBQWpCLEVBQTVCO0FBQ0EseUJBSkY7QUFMRDtBQURlO0FBWWY7Ozs7dUJBQ00yQixZLEdBQWEsRUFBQ2YsUUFBTyxRQUFNZ0IsU0FBTixDQUFnQkMsTUFBeEIsRTtrQkF4SURyQyxPIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudCwgVUl9IGZyb20gXCIuXCJcbmltcG9ydCB7VGV4dEZpZWxkfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBkYkFwcGxpY2F0aW9uIGZyb20gXCIuL2RiL2FwcFwiXG5pbXBvcnQgVXBsb2FkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9maWxlLXVwbG9hZFwiXG5pbXBvcnQgRG93bmxvYWQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2ZpbGUtZG93bmxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuaW1wb3J0IFJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9kZWxldGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBJbmZvIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRzdGF0ZT17fVxuXHRcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUgKG5ld1Byb3BzKXtcblx0XHRpZih0aGlzLnN0YXRlLmZyb3plbilcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFxuXHRcdHJldHVybiB0cnVlXG4gICAgfVxuXHRcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KXtcblx0XHRpZih0aGlzLnByb3BzLnBhcmFtcy5uYW1lIT1uZXh0UHJvcHMucGFyYW1zLm5hbWUpXG5cdFx0XHRkYkFwcGxpY2F0aW9uLmN1cnJlbnQ9bmV4dFByb3BzLnBhcmFtcy5uYW1lXG5cdH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgYXBwPXRoaXMuY29udGV4dC5hcHAsIFxuXHRcdFx0cmVtb3ZhYmxlPWRiQXBwbGljYXRpb24uaXNSZW1vdmFibGUoYXBwKVxuXHRcdFx0XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cImFwcGxpY2F0aW9uIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuXHRcdFx0XHRcdHZhbHVlPXthcHAubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT57XG5cdFx0XHRcdFx0XHRsZXQgdmFsdWU9ZS50YXJnZXQudmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihhcHAubmFtZSE9dmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcC5uYW1lPXZhbHVlXG5cdFx0XHRcdFx0XHRcdGRiQXBwbGljYXRpb24udXBzZXJ0KGFwcCkudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoYGFwcC8ke2FwcC5uYW1lfWApKVxuXHRcdFx0XHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICB9fS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInVuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJnbG9iYWwgdW5pcXVlIHByb2R1Y3QgbmFtZTogYXBwLnFpbGkyLmNvbS97cHJvdWN0TmFtZX1cIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXshcmVtb3ZhYmxlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YXBwLnVuYW1lfVxuICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e2U9Pntcblx0XHRcdFx0XHRcdGxldCB2YWx1ZT1lLnRhcmdldC52YWx1ZS50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlIT1hcHAudW5hbWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcC51bmFtZT12YWx1ZVxuXHRcdFx0XHRcdFx0XHRkYkFwcGxpY2F0aW9uLnVwc2VydChhcHApXG5cdFx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgICAgIH19Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJBUEkga2V5OiB2YWx1ZSBvZiBodHRwIGhlYWRlciAneC1hcHBsaWNhdGlvbi1pZCdcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17YXBwLmFwaUtleX0vPlxuXG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZFxuICAgICAgICAgICAgICAgICAgICBmbG9hdGluZ0xhYmVsVGV4dD1cIndlY2hhdCB1cmw6IHVzZSBpdCB0byBhY2NlcHQgbWVzc2FnZSBmcm9tIHdlY2hhdFwiXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthcHAuYXBpS2V5ID8gYGh0dHA6Ly9xaWxpMi5jb20vMS8ke2FwcC5hcGlLZXl9L3dlY2hhdGAgOiBcIlwifS8+XG5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdHJlbW92YWJsZSA/IFxuXHRcdFx0XHRcdFx0KDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBwcmltYXJ5PVwiVXBsb2FkXCJcblx0XHRcdFx0XHRcdFx0aXRlbXM9e1t7YWN0aW9uOlwiQmFja1wifSx7YWN0aW9uOlwiVXBsb2FkXCIsIGljb246VXBsb2FkfSx7YWN0aW9uOlwiUmVtb3ZlXCIsaWNvbjpSZW1vdmV9XX1cblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuXHRcdFx0XHRcdFx0XHQvPikgOlxuXHRcdFx0XHRcdFx0KDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9XX0vPilcblx0XHRcdFx0fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25TZWxlY3QoY29tbWFuZCxlKXtcbiAgICAgICAgbGV0IGFwcD10aGlzLnByb3BzLmFwcFxuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgXCJVcGxvYWRcIjpcbiAgICAgICAgICAgIFVJLnNlbGVjdEZpbGUoJ3JhdycpLnRoZW4oYXBwPT5kYkFwcGxpY2F0aW9uLnVwbG9hZChhcHApKVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlIFwiUmVtb3ZlXCI6XG4gICAgICAgICAgICB2YXIgbmFtZT1wcm9tcHQoXCJQbGVhc2UgbWFrZSBzdXJlIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZyBieSBnaXZpbmcgdGhpcyBhcHAgbmFtZVwiKVxuICAgICAgICAgICAgaWYobmFtZT09YXBwLm5hbWUpe1xuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHtmcm96ZW46dHJ1ZX0pXG4gICAgICAgICAgICAgICAgZGJBcHBsaWNhdGlvbi5yZW1vdmUoYXBwLl9pZClcblx0XHRcdFx0XHQudGhlbihhPT50aGlzLmNvbnRleHQucm91dGVyLnJlcGxhY2UoXCIvXCIpKVxuICAgICAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0XHRhcHA6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fVxuXHRcblx0c3RhdGljIENyZWF0b3I9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0c2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcyl7XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdFx0cmVuZGVyKCl7XG5cdFx0XHRyZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgPFRleHRGaWVsZCByZWY9XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJhcHBsaWNhdGlvbiBuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIHJlZj1cInVuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJnbG9iYWwgdW5pcXVlIHByb2R1Y3QgbmFtZTogYXBwLnFpbGkyLmNvbS97cHJvdWN0TmFtZX1cIlxuICAgICAgICAgICAgICAgICAgICBmdWxsV2lkdGg9e3RydWV9Lz5cblxuICAgICAgICAgICAgICAgIDxUZXh0RmllbGRcbiAgICAgICAgICAgICAgICAgICAgZmxvYXRpbmdMYWJlbFRleHQ9XCJBUEkga2V5OiB2YWx1ZSBvZiBodHRwIGhlYWRlciAneC1hcHBsaWNhdGlvbi1pZCdcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX1cbiAgICAgICAgICAgICAgICAgICAgZnVsbFdpZHRoPXt0cnVlfS8+XG5cbiAgICAgICAgICAgICAgICA8VGV4dEZpZWxkXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0aW5nTGFiZWxUZXh0PVwid2VjaGF0IHVybDogdXNlIGl0IHRvIGFjY2VwdCBtZXNzYWdlIGZyb20gd2VjaGF0XCJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxXaWR0aD17dHJ1ZX0vPlxuXG4gICAgICAgICAgICAgICAgPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbe2FjdGlvbjpcIlNhdmVcIiwgbGFiZWw6XCLkv53lrZhcIiwgaWNvbjpTYXZlfV19XG5cdFx0XHRcdFx0b25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuXHRcdG9uU2VsZWN0KGFjdGlvbil7XG5cdFx0XHRzd2l0Y2goYWN0aW9uKXtcblx0XHRcdGNhc2UgJ1NhdmUnOlxuXHRcdFx0XHRsZXQge25hbWUsIHVuYW1lfT10aGlzLnJlZnNcblx0XHRcdFx0bmFtZT1uYW1lLmdldFZhbHVlKClcblx0XHRcdFx0dW5hbWU9dW5hbWUuZ2V0VmFsdWUoKVxuXHRcdFx0XHRkYkFwcGxpY2F0aW9uLnVwc2VydCh7bmFtZSwgdW5hbWV9KVxuXHRcdFx0XHRcdC50aGVuKGFwcD0+e1xuXHRcdFx0XHRcdFx0ZGJBcHBsaWNhdGlvbi5jdXJyZW50PWFwcFxuXHRcdFx0XHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5yZXBsYWNlKHtwYXRobmFtZTpgYXBwLyR7bmFtZX1gfSlcblx0XHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblx0XHRzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblx0fVxufVxuIl19