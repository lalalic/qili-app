"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class3, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _index = require("../index.js");

var QiliApp = _interopRequireWildcard(_index);

var _materialUi = require("material-ui");

var _reactRouter = require("react-router");

var _refresh = require("material-ui/svg-icons/navigation/refresh");

var _refresh2 = _interopRequireDefault(_refresh);

var _favoriteBorder = require("material-ui/svg-icons/action/favorite-border");

var _favoriteBorder2 = _interopRequireDefault(_favoriteBorder);

var _home = require("material-ui/svg-icons/action/home");

var _home2 = _interopRequireDefault(_home);

var _keyboardArrowLeft = require("material-ui/svg-icons/hardware/keyboard-arrow-left");

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _comment = require("material-ui/svg-icons/communication/comment");

var _comment2 = _interopRequireDefault(_comment);

var _share = require("material-ui/svg-icons/social/share");

var _share2 = _interopRequireDefault(_share);

var _save = require("material-ui/svg-icons/content/save");

var _save2 = _interopRequireDefault(_save);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _current;

var CommandBar = function (_Component) {
    _inherits(CommandBar, _Component);

    function CommandBar() {
        _classCallCheck(this, CommandBar);

        return _possibleConstructorReturn(this, (CommandBar.__proto__ || Object.getPrototypeOf(CommandBar)).apply(this, arguments));
    }

    _createClass(CommandBar, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                _props$onSelect = _props.onSelect,
                onSelect = _props$onSelect === undefined ? function (a) {
                return a;
            } : _props$onSelect,
                className = _props.className,
                primary = _props.primary,
                _props$items = _props.items,
                items = _props$items === undefined ? [] : _props$items,
                dispatch = _props.dispatch,
                others = _objectWithoutProperties(_props, ["onSelect", "className", "primary", "items", "dispatch"]);

            return _react2.default.createElement(
                "div",
                _extends({ className: "commands " + className }, others),
                items.map(function (command, i) {
                    if (command instanceof CommandBar.Command) return command;

                    if (command instanceof CommandBar.DialogCommand) throw new Error("Please use common command to trigger DialogCommand");

                    if (_react2.default.isValidElement(command)) {
                        return _react2.default.createElement(
                            "div",
                            { key: i++ },
                            command
                        );
                    }

                    if (typeof command == 'string') command = { action: command };

                    if (command.action.toLowerCase() == 'back') {
                        command.icon = _react2.default.createElement(_keyboardArrowLeft2.default, null);
                        if (!command.label) command.label = "后退";
                        command.onSelect = function () {
                            _this2.context.router.goBack();
                        };
                    }

                    if (command.action.toLowerCase() == 'refresh' && !command.icon) {
                        if (!command.label) command.label = "更新";
                        command.icon = _react2.default.createElement(_refresh2.default, null);
                    }

                    if (command.action.toLowerCase() == 'save' && !command.icon) {
                        command.icon = _react2.default.createElement(_save2.default, null);
                        if (!command.label) command.label = "保存";
                    }

                    return _react2.default.createElement(CommandBar.Command, _extends({ key: command.action,
                        primary: command.action == primary,
                        onSelect: onSelect }, command));
                })
            );
        }
    }]);

    return CommandBar;
}(_react.Component);

CommandBar.contextTypes = { router: _react2.default.PropTypes.object };

CommandBar.DialogCommand = function (_Component2) {
    _inherits(_class, _Component2);

    function _class(props) {
        _classCallCheck(this, _class);

        var _this3 = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this3.state = { open: false };
        return _this3;
    }

    _createClass(_class, [{
        key: "render",
        value: function render() {
            var _this4 = this;

            var open = this.state.open;

            return _react2.default.createElement(
                "div",
                {
                    className: "page dialog-command " + (open ? "" : "hide"),
                    onTouchTap: function onTouchTap() {
                        return _this4.dismiss();
                    } },
                _react2.default.createElement("div", { className: "page overlay" }),
                _react2.default.createElement(
                    "div",
                    { className: "layout" },
                    _react2.default.createElement(
                        "div",
                        { className: "content",
                            onTouchTap: function onTouchTap(e) {
                                e.stopPropagation();
                            } },
                        this.renderContent()
                    )
                )
            );
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            var children = this.props.children;

            return children;
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (_current = this) _current = null;
        }
    }, {
        key: "show",
        value: function show() {
            _current && _current != this && _current.dismiss();
            this.setState({ open: true });
            _current = this;
        }
    }, {
        key: "dismiss",
        value: function dismiss() {
            if (this.props.onDismiss) this.props.onDismiss();

            this.setState({ open: false });
            _current = null;
        }
    }]);

    return _class;
}(_react.Component);

CommandBar.Command = function (_Component3) {
    _inherits(_class2, _Component3);

    function _class2() {
        _classCallCheck(this, _class2);

        return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
    }

    _createClass(_class2, [{
        key: "render",
        value: function render() {
            var _props2 = this.props,
                primary = _props2.primary,
                onSelect = _props2.onSelect,
                action = _props2.action,
                label = _props2.label,
                _props2$icon = _props2.icon,
                icon = _props2$icon === undefined ? _react2.default.createElement(_favoriteBorder2.default, null) : _props2$icon,
                link = _props2.link,
                children = _props2.children;

            var props = {};
            if (!link) {
                if (primary) props.className = "primary";

                return _react2.default.createElement(
                    "div",
                    props,
                    _react2.default.createElement(
                        "span",
                        { style: { cursor: 'default' },
                            onClick: function onClick(e) {
                                return onSelect(action, e);
                            } },
                        _react2.default.createElement(
                            "center",
                            null,
                            icon
                        ),
                        _react2.default.createElement(
                            "center",
                            { style: { fontSize: 'smaller' } },
                            label || action
                        )
                    ),
                    children
                );
            } else {
                return _react2.default.createElement(
                    "div",
                    props,
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { style: { cursor: 'default' }, to: link, activeClassName: "primary",
                            onlyActiveOnIndex: true,
                            onClick: function onClick(e) {
                                return onSelect(action, e);
                            } },
                        _react2.default.createElement(
                            "center",
                            null,
                            icon
                        ),
                        _react2.default.createElement(
                            "center",
                            { style: { fontSize: 'smaller' } },
                            label || action
                        )
                    ),
                    children
                );
            }
        }
    }]);

    return _class2;
}(_react.Component);

CommandBar.Comment = function (_ref) {
    var toComment = _ref.toComment,
        props = _objectWithoutProperties(_ref, ["toComment"]);

    return _react2.default.createElement(CommandBar.Command, _extends({
        label: "\u8BC4\u8BBA",
        onSelect: toComment,
        icon: _react2.default.createElement(_comment2.default, null)
    }, props));
};

CommandBar.Share = (0, _reactRedux.connect)()((_temp = _class3 = function (_Component4) {
    _inherits(_class3, _Component4);

    function _class3() {
        _classCallCheck(this, _class3);

        return _possibleConstructorReturn(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
    }

    _createClass(_class3, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(CommandBar.Command, _extends({
                label: "\u670B\u53CB\u5708",
                onSelect: this.onSelect.bind(this),
                icon: _react2.default.createElement(_share2.default, null)
            }, this.props));
        }
    }, {
        key: "onSelect",
        value: function onSelect() {
            var _props3 = this.props,
                message = _props3.message,
                dispatch = _props3.dispatch;

            if (typeof message == 'function') message = message();
            WeChat.share(message, null, function (reason) {
                dispatch(QiliApp.ACTION.MESSAGE({ message: reason }));
            });
        }
    }]);

    return _class3;
}(_react.Component), _class3.propTypes = { message: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.func]) }, _temp));
exports.default = CommandBar;


var Span = function Span(props) {
    return _react2.default.createElement("span", props);
};
module.exports = exports['default'];