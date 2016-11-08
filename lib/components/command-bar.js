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
            var _this7 = this;

            return _react2.default.createElement(CommandBar.Command, (0, _extends3.default)({ label: 'Comment', onSelect: function onSelect() {
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
    (0, _inherits3.default)(_class4, _Component5);

    function _class4() {
        (0, _classCallCheck3.default)(this, _class4);
        return (0, _possibleConstructorReturn3.default)(this, (_class4.__proto__ || (0, _getPrototypeOf2.default)(_class4)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class4, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(CommandBar.Command, (0, _extends3.default)({ label: 'Share', onSelect: this.onSelect.bind(this),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbIl9jdXJyZW50IiwiQ29tbWFuZEJhciIsInByb3BzIiwib25TZWxlY3QiLCJhIiwiY2xhc3NOYW1lIiwicHJpbWFyeSIsIml0ZW1zIiwib3RoZXJzIiwibWFwIiwiY29tbWFuZCIsImkiLCJDb21tYW5kIiwiRGlhbG9nQ29tbWFuZCIsIkVycm9yIiwiaXNWYWxpZEVsZW1lbnQiLCJhY3Rpb24iLCJ0b0xvd2VyQ2FzZSIsImljb24iLCJjb250ZXh0Iiwicm91dGVyIiwiZ29CYWNrIiwiY29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0Iiwic3RhdGUiLCJvcGVuIiwiZGlzbWlzcyIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJyZW5kZXJDb250ZW50IiwiY2hpbGRyZW4iLCJzZXRTdGF0ZSIsIm9uRGlzbWlzcyIsImxhYmVsIiwibGluayIsImN1cnNvciIsImZvbnRTaXplIiwiQ29tbWVudCIsIl9uYW1lIiwidHlwZSIsIl9pZCIsIm1vZGVsIiwicHVzaCIsInByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiU2hhcmUiLCJiaW5kIiwibWVzc2FnZSIsIldlQ2hhdCIsInNoYXJlIiwicmVhc29uIiwiZXJyb3IiLCJvbmVPZlR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsUUFBSjs7SUFFcUJDLFU7Ozs7Ozs7Ozs7aUNBQ1Q7QUFBQTs7QUFBQSx5QkFDMEQsS0FBS0MsS0FEL0Q7QUFBQSx5Q0FDR0MsUUFESDtBQUFBLGdCQUNHQSxRQURILG1DQUNZO0FBQUEsdUJBQUdDLENBQUg7QUFBQSxhQURaO0FBQUEsZ0JBQ2tCQyxTQURsQixVQUNr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QU4sQ0FBZ0IrQixTQUFoQixDQUEwQixDQUFDLGdCQUFNL0IsU0FBTixDQUFnQkMsTUFBakIsRUFBd0IsZ0JBQU1ELFNBQU4sQ0FBZ0JzQixJQUF4QyxDQUExQixDQUFULEU7a0JBaEpKNUMsVSIsImZpbGUiOiJjb21tYW5kLWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1N2Z0ljb24sRW5oYW5jZWRCdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IFJlZnJlc2hJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9yZWZyZXNoXCJcbmltcG9ydCBEZWZhdWx0SWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9mYXZvcml0ZS1ib3JkZXJcIlxuaW1wb3J0IEhvbWVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2hvbWVcIlxuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5pbXBvcnQgQ29tbWVudEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2NvbW1lbnRcIlxuaW1wb3J0IFNoYXJlSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9zaGFyZVwiXG5pbXBvcnQgU2F2ZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gJy4vbWVzc2FnZXInXG5cbnZhciBfY3VycmVudDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWFuZEJhciBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge29uU2VsZWN0PWE9PmEsIGNsYXNzTmFtZSwgcHJpbWFyeSwgaXRlbXM9W10sLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbW1hbmRzICR7Y2xhc3NOYW1lfWB9IHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGl0ZW1zLm1hcCgoY29tbWFuZCxpKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kIGluc3RhbmNlb2YgQ29tbWFuZEJhci5Db21tYW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRcblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kIGluc3RhbmNlb2YgQ29tbWFuZEJhci5EaWFsb2dDb21tYW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHVzZSBjb21tb24gY29tbWFuZCB0byB0cmlnZ2VyIERpYWxvZ0NvbW1hbmRcIilcblxuICAgICAgICAgICAgICAgICAgICBpZihSZWFjdC5pc1ZhbGlkRWxlbWVudChjb21tYW5kKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpKyt9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29tbWFuZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihjb21tYW5kKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kPXthY3Rpb246Y29tbWFuZH1cblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0nYmFjaycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPTxCYWNrSWNvbi8+XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLm9uU2VsZWN0PSgpPT57dGhpcy5jb250ZXh0LnJvdXRlci5nb0JhY2soKX1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdyZWZyZXNoJyAmJiAhY29tbWFuZC5pY29uKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPTxSZWZyZXNoSWNvbi8+XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J3NhdmUnICYmICFjb21tYW5kLmljb24pXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249PFNhdmVJY29uLz5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuQ29tbWFuZCBrZXk9e2NvbW1hbmQuYWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e2NvbW1hbmQuYWN0aW9uPT1wcmltYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH0gey4uLmNvbW1hbmR9Lz5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuICAgIHN0YXRpYyBEaWFsb2dDb21tYW5kPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgICAgIHRoaXMuc3RhdGU9e29wZW46ZmFsc2V9XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICB2YXIge29wZW59PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwYWdlIGRpYWxvZy1jb21tYW5kICR7b3BlbiA/IFwiXCIgOiBcImhpZGVcIn1gfVxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoKT0+dGhpcy5kaXNtaXNzKCl9ID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlIG92ZXJsYXlcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA9eyhlKT0+e2Uuc3RvcFByb3BhZ2F0aW9uKCl9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgICAgICB2YXIge2NoaWxkcmVufT10aGlzLnByb3BzXG4gICAgICAgICAgICByZXR1cm4gY2hpbGRyZW5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgICAgICBpZihfY3VycmVudD10aGlzKVxuICAgICAgICAgICAgICAgIF9jdXJyZW50PW51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3coKXtcbiAgICAgICAgICAgIF9jdXJyZW50ICYmIChfY3VycmVudCE9dGhpcykgJiYgX2N1cnJlbnQuZGlzbWlzcygpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOnRydWV9KVxuICAgICAgICAgICAgX2N1cnJlbnQ9dGhpc1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzbWlzcygpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5vbkRpc21pc3MpXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkRpc21pc3MoKVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOmZhbHNlfSlcbiAgICAgICAgICAgIF9jdXJyZW50PW51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBDb21tYW5kPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIGNvbnN0IHtwcmltYXJ5LCBvblNlbGVjdCwgYWN0aW9uLCBsYWJlbCwgaWNvbj0oPERlZmF1bHRJY29uLz4pLCBsaW5rLCBjaGlsZHJlbn09dGhpcy5wcm9wc1xuICAgICAgICAgICAgdmFyIHByb3BzPXt9XG4gICAgICAgICAgICBpZihwcmltYXJ5KVxuICAgICAgICAgICAgICAgIHByb3BzLmNsYXNzTmFtZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7Y3Vyc29yOidkZWZhdWx0J319XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT5vblNlbGVjdChhY3Rpb24sZSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGNlbnRlcj57aWNvbn08L2NlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjZW50ZXIgc3R5bGU9e3tmb250U2l6ZTonc21hbGxlcid9fT57bGFiZWx8fGFjdGlvbn08L2NlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgQ29tbWVudD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICByZXR1cm4gKDxDb21tYW5kQmFyLkNvbW1hbmQgbGFiZWw9XCJDb21tZW50XCIgb25TZWxlY3Q9eygpPT50aGlzLm9uU2VsZWN0KCl9XG4gICAgICAgICAgICAgICAgaWNvbj17Q29tbWVudEljb259IHsuLi50aGlzLnByb3BzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgb25TZWxlY3QoKXtcbiAgICAgICAgICAgIHZhciB7dHlwZTp7X25hbWV9LCBtb2RlbDp7X2lkfX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBjb21tZW50LyR7X25hbWV9LyR7X2lkfWApXG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbiAgICAgICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgICAgICB0eXBlOlJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtb2RlbDpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgU2hhcmU9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgcmV0dXJuICg8Q29tbWFuZEJhci5Db21tYW5kIGxhYmVsPVwiU2hhcmVcIiBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIGljb249e1NoYXJlSWNvbn0gey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICBvblNlbGVjdCgpe1xuICAgICAgICAgICAgdmFyIHttZXNzYWdlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBpZih0eXBlb2YobWVzc2FnZSk9PSdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgbWVzc2FnZT1tZXNzYWdlKClcbiAgICAgICAgICAgIFdlQ2hhdC5zaGFyZShtZXNzYWdlLG51bGwsZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgICAgICAgICBNZXNzYWdlci5lcnJvcihyZWFzb24pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBwcm9wVHlwZXM9e21lc3NhZ2U6UmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxSZWFjdC5Qcm9wVHlwZXMuZnVuY10pfVxuICAgIH1cbn1cbiJdfQ==