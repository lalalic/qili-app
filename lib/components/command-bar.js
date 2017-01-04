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
                _props$onSelect = _props.onSelect,
                onSelect = _props$onSelect === undefined ? function (a) {
                return a;
            } : _props$onSelect,
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
    _inherits(_class3, _Component4);

    function _class3() {
        _classCallCheck(this, _class3);

        return _possibleConstructorReturn(this, (_class3.__proto__ || Object.getPrototypeOf(_class3)).apply(this, arguments));
    }

    _createClass(_class3, [{
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                _name = _props3.type._name,
                _id = _props3.model._id;
            var router = this.context.router;

            return _react2.default.createElement(CommandBar.Command, _extends({
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
    _inherits(_class4, _Component5);

    function _class4() {
        _classCallCheck(this, _class4);

        return _possibleConstructorReturn(this, (_class4.__proto__ || Object.getPrototypeOf(_class4)).apply(this, arguments));
    }

    _createClass(_class4, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(CommandBar.Command, _extends({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbIl9jdXJyZW50IiwiQ29tbWFuZEJhciIsInByb3BzIiwib25TZWxlY3QiLCJhIiwiY2xhc3NOYW1lIiwicHJpbWFyeSIsIml0ZW1zIiwib3RoZXJzIiwibWFwIiwiY29tbWFuZCIsImkiLCJDb21tYW5kIiwiRGlhbG9nQ29tbWFuZCIsIkVycm9yIiwiaXNWYWxpZEVsZW1lbnQiLCJhY3Rpb24iLCJ0b0xvd2VyQ2FzZSIsImljb24iLCJjb250ZXh0Iiwicm91dGVyIiwiZ29CYWNrIiwiY29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0Iiwic3RhdGUiLCJvcGVuIiwiZGlzbWlzcyIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJyZW5kZXJDb250ZW50IiwiY2hpbGRyZW4iLCJzZXRTdGF0ZSIsIm9uRGlzbWlzcyIsImxhYmVsIiwibGluayIsImN1cnNvciIsImZvbnRTaXplIiwiQ29tbWVudCIsIl9uYW1lIiwidHlwZSIsIl9pZCIsIm1vZGVsIiwicHVzaCIsInByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiU2hhcmUiLCJiaW5kIiwibWVzc2FnZSIsIldlQ2hhdCIsInNoYXJlIiwicmVhc29uIiwiZXJyb3IiLCJvbmVPZlR5cGUiLCJTcGFuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsUUFBSjs7SUFFcUJDLFU7Ozs7Ozs7Ozs7O2lDQUNUO0FBQUE7O0FBQUEseUJBQzBELEtBQUtDLEtBRC9EO0FBQUEseUNBQ0dDLFFBREg7QUFBQSxnQkFDR0EsUUFESCxtQ0FDWTtBQUFBLHVCQUFHQyxDQUFIO0FBQUEsYUFEWjtBQUFBLGdCQUNrQkMsU0FEbEIsVUFDa0JBLFNBRGxC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Qix1QkFBTSxPQURVO0FBRWhCLDBCQUFVLEtBQUs1QyxRQUFMLENBQWM2QyxJQUFkLENBQW1CLElBQW5CLENBRk07QUFHSixzQkFBTTtBQUhGLGVBSVosS0FBSzlDLEtBSk8sRUFBUjtBQUtIOzs7bUNBRVM7QUFBQSxnQkFDRCtDLE9BREMsR0FDUSxLQUFLL0MsS0FEYixDQUNEK0MsT0FEQzs7QUFFTixnQkFBRyxPQUFPQSxPQUFQLElBQWlCLFVBQXBCLEVBQ0lBLFVBQVFBLFNBQVI7QUFDSkMsbUJBQU9DLEtBQVAsQ0FBYUYsT0FBYixFQUFxQixJQUFyQixFQUEwQixVQUFTRyxNQUFULEVBQWdCO0FBQ3RDLG1DQUFTQyxLQUFULENBQWVELE1BQWY7QUFDSCxhQUZEO0FBR0g7Ozs7NkJBQ01SLFMsR0FBVSxFQUFDSyxTQUFRLGdCQUFNMUIsU0FBTixDQUFnQitCLFNBQWhCLENBQTBCLENBQUMsZ0JBQU0vQixTQUFOLENBQWdCQyxNQUFqQixFQUF3QixnQkFBTUQsU0FBTixDQUFnQnNCLElBQXhDLENBQTFCLENBQVQsRTtrQkFuS0o1QyxVOzs7QUF3S3JCLElBQU1zRCxPQUFLLFNBQUxBLElBQUs7QUFBQSxXQUFRLHNDQUFVckQsS0FBVixDQUFSO0FBQUEsQ0FBWCIsImZpbGUiOiJjb21tYW5kLWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1N2Z0ljb24sRW5oYW5jZWRCdXR0b24sUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IFJlZnJlc2hJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9yZWZyZXNoXCJcbmltcG9ydCBEZWZhdWx0SWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9mYXZvcml0ZS1ib3JkZXJcIlxuaW1wb3J0IEhvbWVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2hvbWVcIlxuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXG5pbXBvcnQgQ29tbWVudEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2NvbW1lbnRcIlxuaW1wb3J0IFNoYXJlSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9zaGFyZVwiXG5pbXBvcnQgU2F2ZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuaW1wb3J0IE1lc3NhZ2VyIGZyb20gJy4vbWVzc2FnZXInXG5cbnZhciBfY3VycmVudDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWFuZEJhciBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge29uU2VsZWN0PWE9PmEsIGNsYXNzTmFtZSwgcHJpbWFyeSwgaXRlbXM9W10sLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbW1hbmRzICR7Y2xhc3NOYW1lfWB9IHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGl0ZW1zLm1hcCgoY29tbWFuZCxpKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kIGluc3RhbmNlb2YgQ29tbWFuZEJhci5Db21tYW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRcblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kIGluc3RhbmNlb2YgQ29tbWFuZEJhci5EaWFsb2dDb21tYW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHVzZSBjb21tb24gY29tbWFuZCB0byB0cmlnZ2VyIERpYWxvZ0NvbW1hbmRcIilcblxuICAgICAgICAgICAgICAgICAgICBpZihSZWFjdC5pc1ZhbGlkRWxlbWVudChjb21tYW5kKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpKyt9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29tbWFuZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihjb21tYW5kKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kPXthY3Rpb246Y29tbWFuZH1cblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0nYmFjaycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPTxCYWNrSWNvbi8+XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLm9uU2VsZWN0PSgpPT57dGhpcy5jb250ZXh0LnJvdXRlci5nb0JhY2soKX1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdyZWZyZXNoJyAmJiAhY29tbWFuZC5pY29uKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPTxSZWZyZXNoSWNvbi8+XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J3NhdmUnICYmICFjb21tYW5kLmljb24pXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249PFNhdmVJY29uLz5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPENvbW1hbmRCYXIuQ29tbWFuZCBrZXk9e2NvbW1hbmQuYWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e2NvbW1hbmQuYWN0aW9uPT1wcmltYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH0gey4uLmNvbW1hbmR9Lz5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuICAgIHN0YXRpYyBEaWFsb2dDb21tYW5kPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgICAgIHRoaXMuc3RhdGU9e29wZW46ZmFsc2V9XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICB2YXIge29wZW59PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwYWdlIGRpYWxvZy1jb21tYW5kICR7b3BlbiA/IFwiXCIgOiBcImhpZGVcIn1gfVxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoKT0+dGhpcy5kaXNtaXNzKCl9ID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlIG92ZXJsYXlcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5b3V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA9eyhlKT0+e2Uuc3RvcFByb3BhZ2F0aW9uKCl9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KCl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgICAgICB2YXIge2NoaWxkcmVufT10aGlzLnByb3BzXG4gICAgICAgICAgICByZXR1cm4gY2hpbGRyZW5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgICAgICBpZihfY3VycmVudD10aGlzKVxuICAgICAgICAgICAgICAgIF9jdXJyZW50PW51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHNob3coKXtcbiAgICAgICAgICAgIF9jdXJyZW50ICYmIChfY3VycmVudCE9dGhpcykgJiYgX2N1cnJlbnQuZGlzbWlzcygpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOnRydWV9KVxuICAgICAgICAgICAgX2N1cnJlbnQ9dGhpc1xuICAgICAgICB9XG5cbiAgICAgICAgZGlzbWlzcygpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5vbkRpc21pc3MpXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkRpc21pc3MoKVxuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOmZhbHNlfSlcbiAgICAgICAgICAgIF9jdXJyZW50PW51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBDb21tYW5kPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIGNvbnN0IHtwcmltYXJ5LCBvblNlbGVjdCwgYWN0aW9uLCBsYWJlbCwgaWNvbj0oPERlZmF1bHRJY29uLz4pLCBsaW5rLCBjaGlsZHJlbn09dGhpcy5wcm9wc1xuICAgICAgICAgICAgdmFyIHByb3BzPXt9XG4gICAgICAgICAgICBpZighbGluayl7XG5cdFx0XHRcdGlmKHByaW1hcnkpXG5cdFx0XHRcdFx0cHJvcHMuY2xhc3NOYW1lPVwicHJpbWFyeVwiXG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgey4uLnByb3BzfT5cblx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7Y3Vyc29yOidkZWZhdWx0J319XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pm9uU2VsZWN0KGFjdGlvbixlKX0+XG5cdFx0XHRcdFx0XHRcdDxjZW50ZXI+e2ljb259PC9jZW50ZXI+XG5cdFx0XHRcdFx0XHRcdDxjZW50ZXIgc3R5bGU9e3tmb250U2l6ZTonc21hbGxlcid9fT57bGFiZWx8fGFjdGlvbn08L2NlbnRlcj5cblx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdFx0PExpbmsgc3R5bGU9e3tjdXJzb3I6J2RlZmF1bHQnfX0gdG89e2xpbmt9IGFjdGl2ZUNsYXNzTmFtZT1cInByaW1hcnlcIlxuXHRcdFx0XHRcdFx0XHRvbmx5QWN0aXZlT25JbmRleD17dHJ1ZX1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+b25TZWxlY3QoYWN0aW9uLGUpfT5cblx0XHRcdFx0XHRcdFx0PGNlbnRlcj57aWNvbn08L2NlbnRlcj5cblx0XHRcdFx0XHRcdFx0PGNlbnRlciBzdHlsZT17e2ZvbnRTaXplOidzbWFsbGVyJ319PntsYWJlbHx8YWN0aW9ufTwvY2VudGVyPlxuXHRcdFx0XHRcdFx0PC9MaW5rPlxuXHRcdFx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpXG5cdFx0XHR9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgQ29tbWVudD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgcmVuZGVyKCl7XG5cdFx0XHRjb25zdCB7dHlwZTp7X25hbWV9LCBtb2RlbDp7X2lkfX09dGhpcy5wcm9wc1xuXHRcdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG4gICAgICAgICAgICByZXR1cm4gKDxDb21tYW5kQmFyLkNvbW1hbmQgXG5cdFx0XHRcdGxhYmVsPVwiQ29tbWVudFwiIFxuXHRcdFx0XHRvblNlbGVjdD17YT0+cm91dGVyLnB1c2goYC9jb21tZW50LyR7X25hbWV9LyR7X2lkfWApfVxuICAgICAgICAgICAgICAgIGljb249ezxDb21tZW50SWNvbi8+fSBcblx0XHRcdFx0ey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbiAgICAgICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgICAgICB0eXBlOlJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtb2RlbDpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICAgICAgfVxuICAgIH1cblx0XG4gICAgc3RhdGljIFNoYXJlPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHJldHVybiAoPENvbW1hbmRCYXIuQ29tbWFuZCBcblx0XHRcdFx0bGFiZWw9XCJTaGFyZVwiIFxuXHRcdFx0XHRvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIGljb249ezxTaGFyZUljb24vPn0gXG5cdFx0XHRcdHsuLi50aGlzLnByb3BzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgb25TZWxlY3QoKXtcbiAgICAgICAgICAgIHZhciB7bWVzc2FnZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgaWYodHlwZW9mKG1lc3NhZ2UpPT0nZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2U9bWVzc2FnZSgpXG4gICAgICAgICAgICBXZUNoYXQuc2hhcmUobWVzc2FnZSxudWxsLGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgICAgICAgICAgTWVzc2FnZXIuZXJyb3IocmVhc29uKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgcHJvcFR5cGVzPXttZXNzYWdlOlJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1JlYWN0LlByb3BUeXBlcy5vYmplY3QsUmVhY3QuUHJvcFR5cGVzLmZ1bmNdKX1cbiAgICB9XG59XG5cblxuY29uc3QgU3Bhbj1wcm9wcz0+KDxzcGFuIHsuLi5wcm9wc30vPilcbiJdfQ==