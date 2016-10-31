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

            var _props = this.props,
                onSelect = _props.onSelect,
                className = _props.className,
                primary = _props.primary,
                _props$items = _props.items,
                items = _props$items === undefined ? [] : _props$items,
                others = _objectWithoutProperties(_props, ['onSelect', 'className', 'primary', 'items']);

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
            var _props2 = this.props,
                primary = _props2.primary,
                onSelect = _props2.onSelect,
                action = _props2.action,
                label = _props2.label,
                _props2$icon = _props2.icon,
                icon = _props2$icon === undefined ? _react2.default.createElement(_favoriteBorder2.default, null) : _props2$icon,
                children = _props2.children;

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
            var _props3 = this.props,
                _name = _props3.type._name,
                _id = _props3.model._id;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbIl9jdXJyZW50IiwiQ29tbWFuZEJhciIsInByb3BzIiwib25TZWxlY3QiLCJjbGFzc05hbWUiLCJwcmltYXJ5IiwiaXRlbXMiLCJvdGhlcnMiLCJtYXAiLCJjb21tYW5kIiwiaSIsIkNvbW1hbmQiLCJEaWFsb2dDb21tYW5kIiwiRXJyb3IiLCJpc1ZhbGlkRWxlbWVudCIsImFjdGlvbiIsInRvTG93ZXJDYXNlIiwiaWNvbiIsImNvbnRleHQiLCJyb3V0ZXIiLCJnb0JhY2siLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJzdGF0ZSIsIm9wZW4iLCJkaXNtaXNzIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInJlbmRlckNvbnRlbnQiLCJjaGlsZHJlbiIsInNldFN0YXRlIiwib25EaXNtaXNzIiwibGFiZWwiLCJjdXJzb3IiLCJmb250U2l6ZSIsIkNvbW1lbnQiLCJfbmFtZSIsInR5cGUiLCJfaWQiLCJtb2RlbCIsInB1c2giLCJwcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsIlNoYXJlIiwiYmluZCIsIm1lc3NhZ2UiLCJXZUNoYXQiLCJzaGFyZSIsInJlYXNvbiIsImVycm9yIiwib25lT2ZUeXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsUUFBSjs7SUFFcUJDLFU7Ozs7Ozs7Ozs7O2lDQUNUO0FBQUE7O0FBQUEseUJBQ3FELEtBQUtDLEtBRDFEO0FBQUEsZ0JBQ0dDLFFBREgsVUFDR0EsUUFESDtBQUFBLGdCQUNhQyxTQURiLFVBQ2FBLFNBRGI7QUFBQSxnQkFDd0JDLE9BRHhCLFVBQ3dCQSxPQUR4QjtBQUFBLHNDQUNpQ0MsS0FEakM7QUFBQSxnQkFDaUNBLEtB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Q0FBVCxFO2tCQWhKSjFDLFUiLCJmaWxlIjoiY29tbWFuZC1iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtTdmdJY29uLEVuaGFuY2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBSZWZyZXNoSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vcmVmcmVzaFwiXG5pbXBvcnQgRGVmYXVsdEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZmF2b3JpdGUtYm9yZGVyXCJcbmltcG9ydCBIb21lSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9ob21lXCJcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuaW1wb3J0IENvbW1lbnRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9jb21tZW50XCJcbmltcG9ydCBTaGFyZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvc2hhcmVcIlxuaW1wb3J0IFNhdmVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tICcuL21lc3NhZ2VyJ1xuXG52YXIgX2N1cnJlbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRCYXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtvblNlbGVjdCwgY2xhc3NOYW1lLCBwcmltYXJ5LCBpdGVtcz1bXSwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tbWFuZHMgJHtjbGFzc05hbWV9YH0gey4uLm90aGVyc30+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbXMubWFwKChjb21tYW5kLGkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQgaW5zdGFuY2VvZiBDb21tYW5kQmFyLkNvbW1hbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQgaW5zdGFuY2VvZiBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgdXNlIGNvbW1vbiBjb21tYW5kIHRvIHRyaWdnZXIgRGlhbG9nQ29tbWFuZFwiKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNvbW1hbmQpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2krK30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb21tYW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGNvbW1hbmQpPT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ9e2FjdGlvbjpjb21tYW5kfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdiYWNrJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249PEJhY2tJY29uLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQub25TZWxlY3Q9KCk9Pnt0aGlzLmNvbnRleHQucm91dGVyLmdvQmFjaygpfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J3JlZnJlc2gnICYmICFjb21tYW5kLmljb24pXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249PFJlZnJlc2hJY29uLz5cblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0nc2F2ZScgJiYgIWNvbW1hbmQuaWNvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj08U2F2ZUljb24vPlxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5Db21tYW5kIGtleT17Y29tbWFuZC5hY3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17Y29tbWFuZC5hY3Rpb249PXByaW1hcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fSB7Li4uY29tbWFuZH0vPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXG4gICAgc3RhdGljIERpYWxvZ0NvbW1hbmQ9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZT17b3BlbjpmYWxzZX1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHZhciB7b3Blbn09dGhpcy5zdGF0ZVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHBhZ2UgZGlhbG9nLWNvbW1hbmQgJHtvcGVuID8gXCJcIiA6IFwiaGlkZVwifWB9XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA9eygpPT50aGlzLmRpc21pc3MoKX0gPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2Ugb3ZlcmxheVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KGUpPT57ZS5zdG9wUHJvcGFnYXRpb24oKX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgICAgIHZhciB7Y2hpbGRyZW59PXRoaXMucHJvcHNcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlblxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgICAgIGlmKF9jdXJyZW50PXRoaXMpXG4gICAgICAgICAgICAgICAgX2N1cnJlbnQ9bnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgc2hvdygpe1xuICAgICAgICAgICAgX2N1cnJlbnQgJiYgKF9jdXJyZW50IT10aGlzKSAmJiBfY3VycmVudC5kaXNtaXNzKClcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW46dHJ1ZX0pXG4gICAgICAgICAgICBfY3VycmVudD10aGlzXG4gICAgICAgIH1cblxuICAgICAgICBkaXNtaXNzKCl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLm9uRGlzbWlzcylcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRGlzbWlzcygpXG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW46ZmFsc2V9KVxuICAgICAgICAgICAgX2N1cnJlbnQ9bnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIENvbW1hbmQ9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgdmFyIHtwcmltYXJ5LCBvblNlbGVjdCwgYWN0aW9uLCBsYWJlbCwgaWNvbj0oPERlZmF1bHRJY29uLz4pLCBjaGlsZHJlbn09dGhpcy5wcm9wc1xuICAgICAgICAgICAgdmFyIHByb3BzPXt9XG4gICAgICAgICAgICBpZihwcmltYXJ5KVxuICAgICAgICAgICAgICAgIHByb3BzLmNsYXNzTmFtZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgIDxhIHN0eWxlPXt7Y3Vyc29yOidkZWZhdWx0J319XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSk9Pm9uU2VsZWN0KGFjdGlvbixlKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y2VudGVyPntpY29ufTwvY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGNlbnRlciBzdHlsZT17e2ZvbnRTaXplOidzbWFsbGVyJ319PntsYWJlbHx8YWN0aW9ufTwvY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBDb21tZW50PWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHJldHVybiAoPENvbW1hbmRCYXIuQ29tbWFuZCBsYWJlbD1cIkNvbW1lbnRcIiBvblNlbGVjdD17KCk9PnRoaXMub25TZWxlY3QoKX1cbiAgICAgICAgICAgICAgICBpY29uPXtDb21tZW50SWNvbn0gey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICBvblNlbGVjdCgpe1xuICAgICAgICAgICAgdmFyIHt0eXBlOntfbmFtZX0sIG1vZGVsOntfaWR9fT10aGlzLnByb3BzXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGNvbW1lbnQvJHtfbmFtZX0vJHtfaWR9YClcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuICAgICAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgICAgIHR5cGU6UmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG1vZGVsOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBTaGFyZT1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICByZXR1cm4gKDxDb21tYW5kQmFyLkNvbW1hbmQgbGFiZWw9XCJTaGFyZVwiIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgaWNvbj17U2hhcmVJY29ufSB7Li4udGhpcy5wcm9wc30vPilcbiAgICAgICAgfVxuXG4gICAgICAgIG9uU2VsZWN0KCl7XG4gICAgICAgICAgICB2YXIge21lc3NhZ2V9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGlmKHR5cGVvZihtZXNzYWdlKT09J2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICBtZXNzYWdlPW1lc3NhZ2UoKVxuICAgICAgICAgICAgV2VDaGF0LnNoYXJlKG1lc3NhZ2UsbnVsbCxmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAgICAgICAgIE1lc3NhZ2VyLmVycm9yKHJlYXNvbilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIHByb3BUeXBlcz17bWVzc2FnZTpSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFJlYWN0LlByb3BUeXBlcy5mdW5jXSl9XG4gICAgfVxufVxuIl19