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


var Span = function Span(props) {
    return _react2.default.createElement('span', props);
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbIl9jdXJyZW50IiwiQ29tbWFuZEJhciIsInByb3BzIiwib25TZWxlY3QiLCJhIiwiY2xhc3NOYW1lIiwicHJpbWFyeSIsIml0ZW1zIiwib3RoZXJzIiwibWFwIiwiY29tbWFuZCIsImkiLCJDb21tYW5kIiwiRGlhbG9nQ29tbWFuZCIsIkVycm9yIiwiaXNWYWxpZEVsZW1lbnQiLCJhY3Rpb24iLCJ0b0xvd2VyQ2FzZSIsImljb24iLCJjb250ZXh0Iiwicm91dGVyIiwiZ29CYWNrIiwiY29udGV4dFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0Iiwic3RhdGUiLCJvcGVuIiwiZGlzbWlzcyIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJyZW5kZXJDb250ZW50IiwiY2hpbGRyZW4iLCJzZXRTdGF0ZSIsIm9uRGlzbWlzcyIsImxhYmVsIiwibGluayIsImN1cnNvciIsImZvbnRTaXplIiwiQ29tbWVudCIsIl9uYW1lIiwidHlwZSIsIl9pZCIsIm1vZGVsIiwicHVzaCIsInByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiU2hhcmUiLCJiaW5kIiwibWVzc2FnZSIsIldlQ2hhdCIsInNoYXJlIiwicmVhc29uIiwiZXJyb3IiLCJvbmVPZlR5cGUiLCJTcGFuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLFFBQUo7O0lBRXFCQyxVOzs7Ozs7Ozs7O2lDQUNUO0FBQUE7O0FBQUEseUJBQzBELEtBQUtDLEtBRC9EO0FBQUEseUNBQ0dDLFFBREg7QUFBQSxnQkFDR0EsUUFESCxtQ0FDWTtBQUFBLHVCQUFHQyxDQUFIO0FBQUEsYUFEWjtBQUFBLGdCQUNrQkMsU0FE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OEJBQUMsVUFBRCxDQUFZLE9BQVosMkJBQW9CLE9BQU0sT0FBMUIsRUFBa0MsVUFBVSxLQUFLNUMsUUFBTCxDQUFjNkMsSUFBZCxDQUFtQixJQUFuQixDQUE1QztBQUNKLHFDQURJLElBQ2lCLEtBQUs5QyxLQUR0QixFQUFSO0FBRUg7OzttQ0FFUztBQUFBLGdCQUNEK0MsT0FEQyxHQUNRLEtBQUsvQyxLQURiLENBQ0QrQyxPQURDOztBQUVOLGdCQUFHLE9BQU9BLE9BQVAsSUFBaUIsVUFBcEIsRUFDSUEsVUFBUUEsU0FBUjtBQUNKQyxtQkFBT0MsS0FBUCxDQUFhRixPQUFiLEVBQXFCLElBQXJCLEVBQTBCLFVBQVNHLE1BQVQsRUFBZ0I7QUFDdEMsbUNBQVNDLEtBQVQsQ0FBZUQsTUFBZjtBQUNILGFBRkQ7QUFHSDs7OzZCQUNNUixTLEdBQVUsRUFBQ0ssU0FBUSxnQkFBTTFCLFNBQU4sQ0FBZ0IrQixTQUFoQixDQUEwQixDQUFDLGdCQUFNL0IsU0FBTixDQUFnQkMsTUFBakIsRUFBd0IsZ0JBQU1ELFNBQU4sQ0FBZ0JzQixJQUF4QyxDQUExQixDQUFULEU7a0JBL0pKNUMsVTs7O0FBb0tyQixJQUFNc0QsT0FBSyxTQUFMQSxJQUFLO0FBQUEsV0FBUSxzQ0FBVXJELEtBQVYsQ0FBUjtBQUFBLENBQVgiLCJmaWxlIjoiY29tbWFuZC1iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtTdmdJY29uLEVuaGFuY2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCBSZWZyZXNoSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vcmVmcmVzaFwiXG5pbXBvcnQgRGVmYXVsdEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZmF2b3JpdGUtYm9yZGVyXCJcbmltcG9ydCBIb21lSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9ob21lXCJcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuaW1wb3J0IENvbW1lbnRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9jb21tZW50XCJcbmltcG9ydCBTaGFyZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvc2hhcmVcIlxuaW1wb3J0IFNhdmVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tICcuL21lc3NhZ2VyJ1xuXG52YXIgX2N1cnJlbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRCYXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtvblNlbGVjdD1hPT5hLCBjbGFzc05hbWUsIHByaW1hcnksIGl0ZW1zPVtdLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb21tYW5kcyAke2NsYXNzTmFtZX1gfSB7Li4ub3RoZXJzfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpdGVtcy5tYXAoKGNvbW1hbmQsaSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZCBpbnN0YW5jZW9mIENvbW1hbmRCYXIuQ29tbWFuZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZCBpbnN0YW5jZW9mIENvbW1hbmRCYXIuRGlhbG9nQ29tbWFuZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSB1c2UgY29tbW9uIGNvbW1hbmQgdG8gdHJpZ2dlciBEaWFsb2dDb21tYW5kXCIpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY29tbWFuZCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aSsrfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbW1hbmR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YoY29tbWFuZCk9PSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZD17YWN0aW9uOmNvbW1hbmR9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J2JhY2snKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj08QmFja0ljb24vPlxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5vblNlbGVjdD0oKT0+e3RoaXMuY29udGV4dC5yb3V0ZXIuZ29CYWNrKCl9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0ncmVmcmVzaCcgJiYgIWNvbW1hbmQuaWNvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj08UmVmcmVzaEljb24vPlxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdzYXZlJyAmJiAhY29tbWFuZC5pY29uKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPTxTYXZlSWNvbi8+XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1hbmQga2V5PXtjb21tYW5kLmFjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtjb21tYW5kLmFjdGlvbj09cHJpbWFyeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9IHsuLi5jb21tYW5kfS8+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbiAgICBzdGF0aWMgRGlhbG9nQ29tbWFuZD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgICAgICB0aGlzLnN0YXRlPXtvcGVuOmZhbHNlfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgdmFyIHtvcGVufT10aGlzLnN0YXRlXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcGFnZSBkaWFsb2ctY29tbWFuZCAke29wZW4gPyBcIlwiIDogXCJoaWRlXCJ9YH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KCk9PnRoaXMuZGlzbWlzcygpfSA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZSBvdmVybGF5XCIvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoZSk9PntlLnN0b3BQcm9wYWdhdGlvbigpfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICAgICAgdmFyIHtjaGlsZHJlbn09dGhpcy5wcm9wc1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuXG4gICAgICAgIH1cblxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICAgICAgaWYoX2N1cnJlbnQ9dGhpcylcbiAgICAgICAgICAgICAgICBfY3VycmVudD1udWxsXG4gICAgICAgIH1cblxuICAgICAgICBzaG93KCl7XG4gICAgICAgICAgICBfY3VycmVudCAmJiAoX2N1cnJlbnQhPXRoaXMpICYmIF9jdXJyZW50LmRpc21pc3MoKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3Blbjp0cnVlfSlcbiAgICAgICAgICAgIF9jdXJyZW50PXRoaXNcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc21pc3MoKXtcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMub25EaXNtaXNzKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25EaXNtaXNzKClcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3BlbjpmYWxzZX0pXG4gICAgICAgICAgICBfY3VycmVudD1udWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgQ29tbWFuZD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICBjb25zdCB7cHJpbWFyeSwgb25TZWxlY3QsIGFjdGlvbiwgbGFiZWwsIGljb249KDxEZWZhdWx0SWNvbi8+KSwgbGluaywgY2hpbGRyZW59PXRoaXMucHJvcHNcbiAgICAgICAgICAgIHZhciBwcm9wcz17fVxuICAgICAgICAgICAgaWYoIWxpbmspe1xuXHRcdFx0XHRpZihwcmltYXJ5KVxuXHRcdFx0XHRcdHByb3BzLmNsYXNzTmFtZT1cInByaW1hcnlcIlxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0XHQ8c3BhbiBzdHlsZT17e2N1cnNvcjonZGVmYXVsdCd9fVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5vblNlbGVjdChhY3Rpb24sZSl9PlxuXHRcdFx0XHRcdFx0XHQ8Y2VudGVyPntpY29ufTwvY2VudGVyPlxuXHRcdFx0XHRcdFx0XHQ8Y2VudGVyIHN0eWxlPXt7Zm9udFNpemU6J3NtYWxsZXInfX0+e2xhYmVsfHxhY3Rpb259PC9jZW50ZXI+XG5cdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHR7Y2hpbGRyZW59XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdClcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxkaXYgey4uLnByb3BzfT5cblx0XHRcdFx0XHRcdDxMaW5rIHN0eWxlPXt7Y3Vyc29yOidkZWZhdWx0J319IHRvPXtsaW5rfSBhY3RpdmVDbGFzc05hbWU9XCJwcmltYXJ5XCJcblx0XHRcdFx0XHRcdFx0b25seUFjdGl2ZU9uSW5kZXg9e3RydWV9XG5cdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pm9uU2VsZWN0KGFjdGlvbixlKX0+XG5cdFx0XHRcdFx0XHRcdDxjZW50ZXI+e2ljb259PC9jZW50ZXI+XG5cdFx0XHRcdFx0XHRcdDxjZW50ZXIgc3R5bGU9e3tmb250U2l6ZTonc21hbGxlcid9fT57bGFiZWx8fGFjdGlvbn08L2NlbnRlcj5cblx0XHRcdFx0XHRcdDwvTGluaz5cblx0XHRcdFx0XHRcdHtjaGlsZHJlbn1cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0KVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIENvbW1lbnQ9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgcmV0dXJuICg8Q29tbWFuZEJhci5Db21tYW5kIGxhYmVsPVwiQ29tbWVudFwiIG9uU2VsZWN0PXsoKT0+dGhpcy5vblNlbGVjdCgpfVxuICAgICAgICAgICAgICAgIGljb249e0NvbW1lbnRJY29ufSB7Li4udGhpcy5wcm9wc30vPilcbiAgICAgICAgfVxuXG4gICAgICAgIG9uU2VsZWN0KCl7XG4gICAgICAgICAgICB2YXIge3R5cGU6e19uYW1lfSwgbW9kZWw6e19pZH19PXRoaXMucHJvcHNcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgY29tbWVudC8ke19uYW1lfS8ke19pZH1gKVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG4gICAgICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICAgICAgdHlwZTpSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbW9kZWw6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIFNoYXJlPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHJldHVybiAoPENvbW1hbmRCYXIuQ29tbWFuZCBsYWJlbD1cIlNoYXJlXCIgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICBpY29uPXtTaGFyZUljb259IHsuLi50aGlzLnByb3BzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgb25TZWxlY3QoKXtcbiAgICAgICAgICAgIHZhciB7bWVzc2FnZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgaWYodHlwZW9mKG1lc3NhZ2UpPT0nZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2U9bWVzc2FnZSgpXG4gICAgICAgICAgICBXZUNoYXQuc2hhcmUobWVzc2FnZSxudWxsLGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgICAgICAgICAgTWVzc2FnZXIuZXJyb3IocmVhc29uKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgcHJvcFR5cGVzPXttZXNzYWdlOlJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1JlYWN0LlByb3BUeXBlcy5vYmplY3QsUmVhY3QuUHJvcFR5cGVzLmZ1bmNdKX1cbiAgICB9XG59XG5cblxuY29uc3QgU3Bhbj1wcm9wcz0+KDxzcGFuIHsuLi5wcm9wc30vPilcbiJdfQ==