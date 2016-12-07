'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class3, _temp, _class4, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _reactRouter = require('react-router');

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

var _current;

var CommandBar = function (_Component) {
    (0, _inherits3.default)(CommandBar, _Component);

    function CommandBar() {
        (0, _classCallCheck3.default)(this, CommandBar);
        return (0, _possibleConstructorReturn3.default)(this, (CommandBar.__proto__ || (0, _getPrototypeOf2.default)(CommandBar)).apply(this, arguments));
    }

    (0, _createClass3.default)(CommandBar, [{
        key: 'render',
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
                others = (0, _objectWithoutProperties3.default)(_props, ['onSelect', 'className', 'primary', 'items']);

            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({ className: 'commands ' + className }, others),
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

                    return _react2.default.createElement(CommandBar.Command, (0, _extends3.default)({ key: command.action,
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
    (0, _inherits3.default)(_class, _Component2);

    function _class(props) {
        (0, _classCallCheck3.default)(this, _class);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, props));

        _this3.state = { open: false };
        return _this3;
    }

    (0, _createClass3.default)(_class, [{
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
    (0, _inherits3.default)(_class2, _Component3);

    function _class2() {
        (0, _classCallCheck3.default)(this, _class2);
        return (0, _possibleConstructorReturn3.default)(this, (_class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class2, [{
        key: 'render',
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
                    'div',
                    props,
                    _react2.default.createElement(
                        'span',
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
            } else {
                return _react2.default.createElement(
                    'div',
                    props,
                    _react2.default.createElement(
                        _reactRouter.Link,
                        { style: { cursor: 'default' }, to: link, activeClassName: 'primary',
                            onlyActiveOnIndex: true,
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
        }
    }]);
    return _class2;
}(_react.Component);

CommandBar.Comment = (_temp = _class3 = function (_Component4) {
    (0, _inherits3.default)(_class3, _Component4);

    function _class3() {
        (0, _classCallCheck3.default)(this, _class3);
        return (0, _possibleConstructorReturn3.default)(this, (_class3.__proto__ || (0, _getPrototypeOf2.default)(_class3)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class3, [{
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                _name = _props3.type._name,
                _id = _props3.model._id;
            var router = this.context.router;

            return _react2.default.createElement(CommandBar.Command, (0, _extends3.default)({
                label: 'Comment',
                onSelect: function onSelect(a) {
                    return router.push('/comment/' + _name + '/' + _id);
                },
                icon: _react2.default.createElement(_comment2.default, null)
            }, this.props));
        }
    }]);
    return _class3;
}(_react.Component), _class3.contextTypes = { router: _react2.default.PropTypes.object }, _class3.propTypes = {
    type: _react2.default.PropTypes.func.isRequired,
    model: _react2.default.PropTypes.object.isRequired
}, _temp);
CommandBar.Share = (_temp2 = _class4 = function (_Component5) {
    (0, _inherits3.default)(_class4, _Component5);

    function _class4() {
        (0, _classCallCheck3.default)(this, _class4);
        return (0, _possibleConstructorReturn3.default)(this, (_class4.__proto__ || (0, _getPrototypeOf2.default)(_class4)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class4, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(CommandBar.Command, (0, _extends3.default)({
                label: 'Share',
                onSelect: this.onSelect.bind(this),
                icon: _react2.default.createElement(_share2.default, null)
            }, this.props));
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


var Span = function Span(props) {
    return _react2.default.createElement('span', props);
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbIl9jdXJyZW50IiwiQ29tbWFuZEJhciIsInByb3BzIiwib25TZWxlY3QiLCJhIiwiY2xhc3NOYW1lIiwicHJpbWFyeSIsIml0ZW1zIiwib3RoZXJzIiwibWFwIiwiY29tbWFuZCIsImkiLCJDb21tYW5kIiwiRGlhbG9nQ29tbWFuZCIsIkVycm9yIiwiaXNWYWxpZEVsZW1lbnQiLCJhY3Rpb24iLCJ0b0xvd2VyQ2FzZSIsImljb24iLCJjb250ZXh0Iiwicm91dGVyIiwiZ29CYWNrIiwiY29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0Iiwic3RhdGUiLCJvcGVuIiwiZGlzbWlzcyIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJyZW5kZXJDb250ZW50IiwiY2hpbGRyZW4iLCJzZXRTdGF0ZSIsIm9uRGlzbWlzcyIsImxhYmVsIiwibGluayIsImN1cnNvciIsImZvbnRTaXplIiwiQ29tbWVudCIsIl9uYW1lIiwidHlwZSIsIl9pZCIsIm1vZGVsIiwicHVzaCIsInByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiU2hhcmUiLCJiaW5kIiwibWVzc2FnZSIsIldlQ2hhdCIsInNoYXJlIiwicmVhc29uIiwiZXJyb3IiLCJvbmVPZlR5cGUiLCJTcGFuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLFFBQUo7O0lBRXFCQyxVOzs7Ozs7Ozs7O2lDQUNUO0FBQUE7O0FBQUEseUJBQzBELEtBQUtDLEtBRC9EO0FBQUEseUNBQ0dDLFFBREg7QUFBQSxnQkFDR0EsUUFESCxtQ0FDWTtBQUFBLHVCQUFHQyxDQUFIO0FBQUEsYUFEWjtBQUFBLGdCQUNrQkMsU0FE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T0FBWjtBQUNoQix1QkFBTSxPQURVO0FBRWhCLDBCQUFVLEtBQUs1QyxRQUFMLENBQWM2QyxJQUFkLENBQW1CLElBQW5CLENBRk07QUFHSixzQkFBTTtBQUhGLGVBSVosS0FBSzlDLEtBSk8sRUFBUjtBQUtIOzs7bUNBRVM7QUFBQSxnQkFDRCtDLE9BREMsR0FDUSxLQUFLL0MsS0FEYixDQUNEK0MsT0FEQzs7QUFFTixnQkFBRyxPQUFPQSxPQUFQLElBQWlCLFVBQXBCLEVBQ0lBLFVBQVFBLFNBQVI7QUFDSkMsbUJBQU9DLEtBQVAsQ0FBYUYsT0FBYixFQUFxQixJQUFyQixFQUEwQixVQUFTRyxNQUFULEVBQWdCO0FBQ3RDLG1DQUFTQyxLQUFULENBQWVELE1BQWY7QUFDSCxhQUZEO0FBR0g7Ozs2QkFDTVIsUyxHQUFVLEVBQUNLLFNBQVEsZ0JBQU0xQixTQUFOLENBQWdCK0IsU0FBaEIsQ0FBMEIsQ0FBQyxnQkFBTS9CLFNBQU4sQ0FBZ0JDLE1BQWpCLEVBQXdCLGdCQUFNRCxTQUFOLENBQWdCc0IsSUFBeEMsQ0FBMUIsQ0FBVCxFO2tCQW5LSjVDLFU7OztBQXdLckIsSUFBTXNELE9BQUssU0FBTEEsSUFBSztBQUFBLFdBQVEsc0NBQVVyRCxLQUFWLENBQVI7QUFBQSxDQUFYIiwiZmlsZSI6ImNvbW1hbmQtYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7U3ZnSWNvbixFbmhhbmNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQgUmVmcmVzaEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL3JlZnJlc2hcIlxuaW1wb3J0IERlZmF1bHRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Zhdm9yaXRlLWJvcmRlclwiXG5pbXBvcnQgSG9tZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vaG9tZVwiXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcbmltcG9ydCBDb21tZW50SWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vY29tbWVudFwiXG5pbXBvcnQgU2hhcmVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL3NoYXJlXCJcbmltcG9ydCBTYXZlSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSAnLi9tZXNzYWdlcidcblxudmFyIF9jdXJyZW50O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kQmFyIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7b25TZWxlY3Q9YT0+YSwgY2xhc3NOYW1lLCBwcmltYXJ5LCBpdGVtcz1bXSwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tbWFuZHMgJHtjbGFzc05hbWV9YH0gey4uLm90aGVyc30+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbXMubWFwKChjb21tYW5kLGkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQgaW5zdGFuY2VvZiBDb21tYW5kQmFyLkNvbW1hbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQgaW5zdGFuY2VvZiBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgdXNlIGNvbW1vbiBjb21tYW5kIHRvIHRyaWdnZXIgRGlhbG9nQ29tbWFuZFwiKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNvbW1hbmQpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2krK30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb21tYW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGNvbW1hbmQpPT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ9e2FjdGlvbjpjb21tYW5kfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdiYWNrJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249PEJhY2tJY29uLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQub25TZWxlY3Q9KCk9Pnt0aGlzLmNvbnRleHQucm91dGVyLmdvQmFjaygpfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J3JlZnJlc2gnICYmICFjb21tYW5kLmljb24pXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249PFJlZnJlc2hJY29uLz5cblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0nc2F2ZScgJiYgIWNvbW1hbmQuaWNvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj08U2F2ZUljb24vPlxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5Db21tYW5kIGtleT17Y29tbWFuZC5hY3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17Y29tbWFuZC5hY3Rpb249PXByaW1hcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fSB7Li4uY29tbWFuZH0vPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXG4gICAgc3RhdGljIERpYWxvZ0NvbW1hbmQ9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZT17b3BlbjpmYWxzZX1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHZhciB7b3Blbn09dGhpcy5zdGF0ZVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHBhZ2UgZGlhbG9nLWNvbW1hbmQgJHtvcGVuID8gXCJcIiA6IFwiaGlkZVwifWB9XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA9eygpPT50aGlzLmRpc21pc3MoKX0gPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2Ugb3ZlcmxheVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KGUpPT57ZS5zdG9wUHJvcGFnYXRpb24oKX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgICAgIHZhciB7Y2hpbGRyZW59PXRoaXMucHJvcHNcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlblxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgICAgIGlmKF9jdXJyZW50PXRoaXMpXG4gICAgICAgICAgICAgICAgX2N1cnJlbnQ9bnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgc2hvdygpe1xuICAgICAgICAgICAgX2N1cnJlbnQgJiYgKF9jdXJyZW50IT10aGlzKSAmJiBfY3VycmVudC5kaXNtaXNzKClcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW46dHJ1ZX0pXG4gICAgICAgICAgICBfY3VycmVudD10aGlzXG4gICAgICAgIH1cblxuICAgICAgICBkaXNtaXNzKCl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLm9uRGlzbWlzcylcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRGlzbWlzcygpXG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW46ZmFsc2V9KVxuICAgICAgICAgICAgX2N1cnJlbnQ9bnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIENvbW1hbmQ9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgY29uc3Qge3ByaW1hcnksIG9uU2VsZWN0LCBhY3Rpb24sIGxhYmVsLCBpY29uPSg8RGVmYXVsdEljb24vPiksIGxpbmssIGNoaWxkcmVufT10aGlzLnByb3BzXG4gICAgICAgICAgICB2YXIgcHJvcHM9e31cbiAgICAgICAgICAgIGlmKCFsaW5rKXtcblx0XHRcdFx0aWYocHJpbWFyeSlcblx0XHRcdFx0XHRwcm9wcy5jbGFzc05hbWU9XCJwcmltYXJ5XCJcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3tjdXJzb3I6J2RlZmF1bHQnfX1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+b25TZWxlY3QoYWN0aW9uLGUpfT5cblx0XHRcdFx0XHRcdFx0PGNlbnRlcj57aWNvbn08L2NlbnRlcj5cblx0XHRcdFx0XHRcdFx0PGNlbnRlciBzdHlsZT17e2ZvbnRTaXplOidzbWFsbGVyJ319PntsYWJlbHx8YWN0aW9ufTwvY2VudGVyPlxuXHRcdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0XHQ8TGluayBzdHlsZT17e2N1cnNvcjonZGVmYXVsdCd9fSB0bz17bGlua30gYWN0aXZlQ2xhc3NOYW1lPVwicHJpbWFyeVwiXG5cdFx0XHRcdFx0XHRcdG9ubHlBY3RpdmVPbkluZGV4PXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5vblNlbGVjdChhY3Rpb24sZSl9PlxuXHRcdFx0XHRcdFx0XHQ8Y2VudGVyPntpY29ufTwvY2VudGVyPlxuXHRcdFx0XHRcdFx0XHQ8Y2VudGVyIHN0eWxlPXt7Zm9udFNpemU6J3NtYWxsZXInfX0+e2xhYmVsfHxhY3Rpb259PC9jZW50ZXI+XG5cdFx0XHRcdFx0XHQ8L0xpbms+XG5cdFx0XHRcdFx0XHR7Y2hpbGRyZW59XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdClcblx0XHRcdH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBDb21tZW50PWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICByZW5kZXIoKXtcblx0XHRcdGNvbnN0IHt0eXBlOntfbmFtZX0sIG1vZGVsOntfaWR9fT10aGlzLnByb3BzXG5cdFx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcbiAgICAgICAgICAgIHJldHVybiAoPENvbW1hbmRCYXIuQ29tbWFuZCBcblx0XHRcdFx0bGFiZWw9XCJDb21tZW50XCIgXG5cdFx0XHRcdG9uU2VsZWN0PXthPT5yb3V0ZXIucHVzaChgL2NvbW1lbnQvJHtfbmFtZX0vJHtfaWR9YCl9XG4gICAgICAgICAgICAgICAgaWNvbj17PENvbW1lbnRJY29uLz59IFxuXHRcdFx0XHR7Li4udGhpcy5wcm9wc30vPilcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuICAgICAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgICAgIHR5cGU6UmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG1vZGVsOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICAgICAgICB9XG4gICAgfVxuXHRcbiAgICBzdGF0aWMgU2hhcmU9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgcmV0dXJuICg8Q29tbWFuZEJhci5Db21tYW5kIFxuXHRcdFx0XHRsYWJlbD1cIlNoYXJlXCIgXG5cdFx0XHRcdG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgaWNvbj17PFNoYXJlSWNvbi8+fSBcblx0XHRcdFx0ey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICBvblNlbGVjdCgpe1xuICAgICAgICAgICAgdmFyIHttZXNzYWdlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBpZih0eXBlb2YobWVzc2FnZSk9PSdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgbWVzc2FnZT1tZXNzYWdlKClcbiAgICAgICAgICAgIFdlQ2hhdC5zaGFyZShtZXNzYWdlLG51bGwsZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgICAgICAgICBNZXNzYWdlci5lcnJvcihyZWFzb24pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBwcm9wVHlwZXM9e21lc3NhZ2U6UmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxSZWFjdC5Qcm9wVHlwZXMuZnVuY10pfVxuICAgIH1cbn1cblxuXG5jb25zdCBTcGFuPXByb3BzPT4oPHNwYW4gey4uLnByb3BzfS8+KVxuIl19