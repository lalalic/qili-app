'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class3, _temp, _class4, _temp2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _refresh = require('material-ui/svg-icons/navigation/refresh');

var _refresh2 = _interopRequireDefault(_refresh);

var _favoriteBorder = require('material-ui/svg-icons/action/favorite-border');

var _favoriteBorder2 = _interopRequireDefault(_favoriteBorder);

var _home = require('material-ui/svg-icons/action/home');

var _home2 = _interopRequireDefault(_home);

var _keyboardArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left');

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _comment = require('material-ui/svg-icons/communication/comment');

var _comment2 = _interopRequireDefault(_comment);

var _share = require('material-ui/svg-icons/social/share');

var _share2 = _interopRequireDefault(_share);

var _save = require('material-ui/svg-icons/content/save');

var _save2 = _interopRequireDefault(_save);

var _messager = require('./messager');

var _messager2 = _interopRequireDefault(_messager);

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
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var onSelect = _props.onSelect;
            var className = _props.className;
            var primary = _props.primary;
            var _props$items = _props.items;
            var items = _props$items === undefined ? [] : _props$items;

            var others = _objectWithoutProperties(_props, ['onSelect', 'className', 'primary', 'items']);

            return _react2.default.createElement(
                'div',
                _extends({ className: 'commands ' + className }, others),
                items.map(function (command, i) {
                    if (command instanceof CommandBar.Command) return command;

                    if (command instanceof CommandBar.DialogCommand) throw new Error("Please use common command to trigger DialogCommand");

                    if (_react2.default.isValidElement(command)) {
                        return _react2.default.createElement(
                            'div',
                            { key: i++ },
                            command
                        );
                    }

                    if (typeof command == 'string') command = { action: command };

                    if (command.action.toLowerCase() == 'back') {
                        command.icon = _react2.default.createElement(_keyboardArrowLeft2.default, null);
                        command.onSelect = function () {
                            _this2.context.router.goBack();
                        };
                    }

                    if (command.action.toLowerCase() == 'refresh' && !command.icon) command.icon = _react2.default.createElement(_refresh2.default, null);

                    if (command.action.toLowerCase() == 'save' && !command.icon) command.icon = _react2.default.createElement(_save2.default, null);

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
        key: 'render',
        value: function render() {
            var _this4 = this;

            var open = this.state.open;

            return _react2.default.createElement(
                'div',
                {
                    className: 'page dialog-command ' + (open ? "" : "hide"),
                    onTouchTap: function onTouchTap() {
                        return _this4.dismiss();
                    } },
                _react2.default.createElement('div', { className: 'page overlay' }),
                _react2.default.createElement(
                    'div',
                    { className: 'layout' },
                    _react2.default.createElement(
                        'div',
                        { className: 'content',
                            onTouchTap: function onTouchTap(e) {
                                e.stopPropagation();
                            } },
                        this.renderContent()
                    )
                )
            );
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var children = this.props.children;

            return children;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (_current = this) _current = null;
        }
    }, {
        key: 'show',
        value: function show() {
            _current && _current != this && _current.dismiss();
            this.setState({ open: true });
            _current = this;
        }
    }, {
        key: 'dismiss',
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
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var primary = _props2.primary;
            var onSelect = _props2.onSelect;
            var action = _props2.action;
            var label = _props2.label;
            var _props2$icon = _props2.icon;
            var icon = _props2$icon === undefined ? _react2.default.createElement(_favoriteBorder2.default, null) : _props2$icon;
            var children = _props2.children;

            var props = {};
            if (primary) props.className = "primary";
            return _react2.default.createElement(
                'div',
                props,
                _react2.default.createElement(
                    'a',
                    { style: { cursor: 'default' },
                        onClick: function onClick(e) {
                            return onSelect(action, e);
                        } },
                    _react2.default.createElement(
                        'center',
                        null,
                        icon
                    ),
                    _react2.default.createElement(
                        'center',
                        { style: { fontSize: 'smaller' } },
                        label || action
                    )
                ),
                children
            );
        }
    }]);

    return _class2;
}(_react.Component);

CommandBar.Comment = (_temp = _class3 = function (_Component4) {
    _inherits(_class3, _Component4);

    function _class3() {
        _classCallCheck(this, _class3);

        return _possibleConstructorReturn(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
    }

    _createClass(_class3, [{
        key: 'render',
        value: function render() {
            var _this7 = this;

            return _react2.default.createElement(CommandBar.Command, _extends({ label: 'Comment', onSelect: function onSelect() {
                    return _this7.onSelect();
                },
                icon: _comment2.default }, this.props));
        }
    }, {
        key: 'onSelect',
        value: function onSelect() {
            var _props3 = this.props;
            var _name = _props3.type._name;
            var _id = _props3.model._id;

            this.context.router.push('comment/' + _name + '/' + _id);
        }
    }]);

    return _class3;
}(_react.Component), _class3.contextTypes = { router: _react2.default.PropTypes.object }, _class3.propTypes = {
    type: _react2.default.PropTypes.func.isRequired,
    model: _react2.default.PropTypes.object.isRequired
}, _temp);
CommandBar.Share = (_temp2 = _class4 = function (_Component5) {
    _inherits(_class4, _Component5);

    function _class4() {
        _classCallCheck(this, _class4);

        return _possibleConstructorReturn(this, (_class4.__proto__ || Object.getPrototypeOf(_class4)).apply(this, arguments));
    }

    _createClass(_class4, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(CommandBar.Command, _extends({ label: 'Share', onSelect: this.onSelect.bind(this),
                icon: _share2.default }, this.props));
        }
    }, {
        key: 'onSelect',
        value: function onSelect() {
            var message = this.props.message;

            if (typeof message == 'function') message = message();
            WeChat.share(message, null, function (reason) {
                _messager2.default.error(reason);
            });
        }
    }]);

    return _class4;
}(_react.Component), _class4.propTypes = { message: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.func]) }, _temp2);
exports.default = CommandBar;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbIl9jdXJyZW50IiwiQ29tbWFuZEJhciIsInByb3BzIiwib25TZWxlY3QiLCJjbGFzc05hbWUiLCJwcmltYXJ5IiwiaXRlbXMiLCJvdGhlcnMiLCJtYXAiLCJjb21tYW5kIiwiaSIsIkNvbW1hbmQiLCJEaWFsb2dDb21tYW5kIiwiRXJyb3IiLCJpc1ZhbGlkRWxlbWVudCIsImFjdGlvbiIsInRvTG93ZXJDYXNlIiwiaWNvbiIsImNvbnRleHQiLCJyb3V0ZXIiLCJnb0JhY2siLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJzdGF0ZSIsIm9wZW4iLCJkaXNtaXNzIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInJlbmRlckNvbnRlbnQiLCJjaGlsZHJlbiIsInNldFN0YXRlIiwib25EaXNtaXNzIiwibGFiZWwiLCJjdXJzb3IiLCJmb250U2l6ZSIsIkNvbW1lbnQiLCJfbmFtZSIsInR5cGUiLCJfaWQiLCJtb2RlbCIsInB1c2giLCJwcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsIlNoYXJlIiwiYmluZCIsIm1lc3NhZ2UiLCJXZUNoYXQiLCJzaGFyZSIsInJlYXNvbiIsImVycm9yIiwib25lT2ZUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsUUFBSjs7SUFFcUJDLFU7Ozs7Ozs7Ozs7O2lDQUNUO0FBQUE7O0FBQUEseUJBQ3FELEtBQUtDLEtBRDFEO0FBQUEsZ0JBQ0dDLFFBREgsVUFDR0EsUUFESDtBQUFBLGdCQUNhQyxTQURiLFVBQ2FBLFNBRGI7QUFBQSxnQkFDd0JDLE9BRHhCLFVBQ3dCQSxPQUR4QjtBQUFBLHNDQUNpQ0MsS0FEakM7QUFBQSxnQkFDaUNBLEtB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LENBQVQsRTtrQkFoSkoxQyxVIiwiZmlsZSI6ImNvbW1hbmQtYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7U3ZnSWNvbixFbmhhbmNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgUmVmcmVzaEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL3JlZnJlc2hcIlxuaW1wb3J0IERlZmF1bHRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Zhdm9yaXRlLWJvcmRlclwiXG5pbXBvcnQgSG9tZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vaG9tZVwiXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcbmltcG9ydCBDb21tZW50SWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vY29tbWVudFwiXG5pbXBvcnQgU2hhcmVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL3NoYXJlXCJcbmltcG9ydCBTYXZlSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSAnLi9tZXNzYWdlcidcblxudmFyIF9jdXJyZW50O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kQmFyIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7b25TZWxlY3QsIGNsYXNzTmFtZSwgcHJpbWFyeSwgaXRlbXM9W10sLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbW1hbmRzICR7Y2xhc3NOYW1lfWB9IHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGl0ZW1zLm1hcCgoY29tbWFuZCxpKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kIGluc3RhbmNlb2YgQ29tbWFuZEJhci5Db21tYW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRcblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kIGluc3RhbmNlb2YgQ29tbWFuZEJhci5EaWFsb2dDb21tYW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHVzZSBjb21tb24gY29tbWFuZCB0byB0cmlnZ2VyIERpYWxvZ0NvbW1hbmRcIilcblxuICAgICAgICAgICAgICAgICAgICBpZihSZWFjdC5pc1ZhbGlkRWxlbWVudChjb21tYW5kKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpKyt9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29tbWFuZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihjb21tYW5kKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kPXthY3Rpb246Y29tbWFuZH1cblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0nYmFjaycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPTxCYWNrSWNvbi8+XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLm9uU2VsZWN0PSgpPT57dGhpcy5jb250ZXh0LnJvdXRlci5nb0JhY2soKX1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdyZWZyZXNoJyAmJiAhY29tbWFuZC5pY29uKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPTxSZWZyZXNoSWNvbi8+XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J3NhdmUnICYmICFjb21tYW5kLmljb24pXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249PFNhdmVJY29uLz5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuQ29tbWFuZCBrZXk9e2NvbW1hbmQuYWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e2NvbW1hbmQuYWN0aW9uPT1wcmltYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH0gey4uLmNvbW1hbmR9Lz5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuICAgIHN0YXRpYyBEaWFsb2dDb21tYW5kPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgICAgIHRoaXMuc3RhdGU9e29wZW46ZmFsc2V9XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICB2YXIge29wZW59PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwYWdlIGRpYWxvZy1jb21tYW5kICR7b3BlbiA/IFwiXCIgOiBcImhpZGVcIn1gfVxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoKT0+dGhpcy5kaXNtaXNzKCl9ID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlIG92ZXJsYXlcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA9eyhlKT0+e2Uuc3RvcFByb3BhZ2F0aW9uKCl9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgICAgICB2YXIge2NoaWxkcmVufT10aGlzLnByb3BzXG4gICAgICAgICAgICByZXR1cm4gY2hpbGRyZW5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgICAgICBpZihfY3VycmVudD10aGlzKVxuICAgICAgICAgICAgICAgIF9jdXJyZW50PW51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3coKXtcbiAgICAgICAgICAgIF9jdXJyZW50ICYmIChfY3VycmVudCE9dGhpcykgJiYgX2N1cnJlbnQuZGlzbWlzcygpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOnRydWV9KVxuICAgICAgICAgICAgX2N1cnJlbnQ9dGhpc1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzbWlzcygpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5vbkRpc21pc3MpXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkRpc21pc3MoKVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOmZhbHNlfSlcbiAgICAgICAgICAgIF9jdXJyZW50PW51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBDb21tYW5kPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHZhciB7cHJpbWFyeSwgb25TZWxlY3QsIGFjdGlvbiwgbGFiZWwsIGljb249KDxEZWZhdWx0SWNvbi8+KSwgY2hpbGRyZW59PXRoaXMucHJvcHNcbiAgICAgICAgICAgIHZhciBwcm9wcz17fVxuICAgICAgICAgICAgaWYocHJpbWFyeSlcbiAgICAgICAgICAgICAgICBwcm9wcy5jbGFzc05hbWU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiB7Li4ucHJvcHN9PlxuICAgICAgICAgICAgICAgICAgICA8YSBzdHlsZT17e2N1cnNvcjonZGVmYXVsdCd9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpPT5vblNlbGVjdChhY3Rpb24sZSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGNlbnRlcj57aWNvbn08L2NlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjZW50ZXIgc3R5bGU9e3tmb250U2l6ZTonc21hbGxlcid9fT57bGFiZWx8fGFjdGlvbn08L2NlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgQ29tbWVudD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICByZXR1cm4gKDxDb21tYW5kQmFyLkNvbW1hbmQgbGFiZWw9XCJDb21tZW50XCIgb25TZWxlY3Q9eygpPT50aGlzLm9uU2VsZWN0KCl9XG4gICAgICAgICAgICAgICAgaWNvbj17Q29tbWVudEljb259IHsuLi50aGlzLnByb3BzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgb25TZWxlY3QoKXtcbiAgICAgICAgICAgIHZhciB7dHlwZTp7X25hbWV9LCBtb2RlbDp7X2lkfX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBjb21tZW50LyR7X25hbWV9LyR7X2lkfWApXG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbiAgICAgICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgICAgICB0eXBlOlJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtb2RlbDpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgU2hhcmU9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgcmV0dXJuICg8Q29tbWFuZEJhci5Db21tYW5kIGxhYmVsPVwiU2hhcmVcIiBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIGljb249e1NoYXJlSWNvbn0gey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICBvblNlbGVjdCgpe1xuICAgICAgICAgICAgdmFyIHttZXNzYWdlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBpZih0eXBlb2YobWVzc2FnZSk9PSdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgbWVzc2FnZT1tZXNzYWdlKClcbiAgICAgICAgICAgIFdlQ2hhdC5zaGFyZShtZXNzYWdlLG51bGwsZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgICAgICAgICBNZXNzYWdlci5lcnJvcihyZWFzb24pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBwcm9wVHlwZXM9e21lc3NhZ2U6UmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxSZWFjdC5Qcm9wVHlwZXMuZnVuY10pfVxuICAgIH1cbn1cbiJdfQ==