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
                dispatch = _props.dispatch,
                others = _objectWithoutProperties(_props, ['onSelect', 'className', 'primary', 'items', 'dispatch']);

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
                label: '\u8BC4\u8BBA',
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
                label: '\u670B\u53CB\u5708',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbIl9jdXJyZW50IiwiQ29tbWFuZEJhciIsInByb3BzIiwib25TZWxlY3QiLCJhIiwiY2xhc3NOYW1lIiwicHJpbWFyeSIsIml0ZW1zIiwiZGlzcGF0Y2giLCJvdGhlcnMiLCJtYXAiLCJjb21tYW5kIiwiaSIsIkNvbW1hbmQiLCJEaWFsb2dDb21tYW5kIiwiRXJyb3IiLCJpc1ZhbGlkRWxlbWVudCIsImFjdGlvbiIsInRvTG93ZXJDYXNlIiwiaWNvbiIsImxhYmVsIiwiY29udGV4dCIsInJvdXRlciIsImdvQmFjayIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsInN0YXRlIiwib3BlbiIsImRpc21pc3MiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVuZGVyQ29udGVudCIsImNoaWxkcmVuIiwic2V0U3RhdGUiLCJvbkRpc21pc3MiLCJsaW5rIiwiY3Vyc29yIiwiZm9udFNpemUiLCJDb21tZW50IiwiX25hbWUiLCJ0eXBlIiwiX2lkIiwibW9kZWwiLCJwdXNoIiwicHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJTaGFyZSIsImJpbmQiLCJtZXNzYWdlIiwiV2VDaGF0Iiwic2hhcmUiLCJyZWFzb24iLCJlcnJvciIsIm9uZU9mVHlwZSIsIlNwYW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxRQUFKOztJQUVxQkMsVTs7Ozs7Ozs7Ozs7aUNBQ1Q7QUFBQTs7QUFBQSx5QkFDb0UsS0FBS0MsS0FEekU7QUFBQSx5Q0FDR0MsUUFESDtBQUFBLGdCQUNHQSxRQURILG1DQUNZO0FBQUEsdUJBQUdDLENBQUg7QUFBQSxhQURaO0FBQUEsZ0JBQ2tCQyxTQURsQixV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WSxHQUFhLEVBQUNGLFFBQU8sZ0JBQU1HLFNBQU4sQ0FBZ0JDLE1BQXhCLEUsVUFDYm1CLFMsR0FBVTtBQUNiSixVQUFLLGdCQUFNaEIsU0FBTixDQUFnQnFCLElBQWhCLENBQXFCQyxVQURiO0FBRWJKLFdBQU0sZ0JBQU1sQixTQUFOLENBQWdCQyxNQUFoQixDQUF1QnFCO0FBRmhCLEM7QUFySko5QyxVLENBMkpWK0MsSzs7Ozs7Ozs7Ozs7aUNBQ0s7QUFDSixtQkFBUSw4QkFBQyxVQUFELENBQVksT0FBWjtBQUNoQix1QkFBTSxvQkFEVTtBQUVoQiwwQkFBVSxLQUFLN0MsUUFBTCxDQUFjOEMsSUFBZCxDQUFtQixJQUFuQixDQUZNO0FBR0osc0JBQU07QUFIRixlQUlaLEtBQUsvQyxLQUpPLEVBQVI7QUFLSDs7O21DQUVTO0FBQUEsZ0JBQ0RnRCxPQURDLEdBQ1EsS0FBS2hELEtBRGIsQ0FDRGdELE9BREM7O0FBRU4sZ0JBQUcsT0FBT0EsT0FBUCxJQUFpQixVQUFwQixFQUNJQSxVQUFRQSxTQUFSO0FBQ0pDLG1CQUFPQyxLQUFQLENBQWFGLE9BQWIsRUFBcUIsSUFBckIsRUFBMEIsVUFBU0csTUFBVCxFQUFnQjtBQUN0QyxtQ0FBU0MsS0FBVCxDQUFlRCxNQUFmO0FBQ0gsYUFGRDtBQUdIOzs7OzZCQUNNUixTLEdBQVUsRUFBQ0ssU0FBUSxnQkFBTXpCLFNBQU4sQ0FBZ0I4QixTQUFoQixDQUEwQixDQUFDLGdCQUFNOUIsU0FBTixDQUFnQkMsTUFBakIsRUFBd0IsZ0JBQU1ELFNBQU4sQ0FBZ0JxQixJQUF4QyxDQUExQixDQUFULEU7a0JBNUtKN0MsVTs7O0FBaUxyQixJQUFNdUQsT0FBSyxTQUFMQSxJQUFLO0FBQUEsV0FBUSxzQ0FBVXRELEtBQVYsQ0FBUjtBQUFBLENBQVgiLCJmaWxlIjoiY29tbWFuZC1iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtTdmdJY29uLEVuaGFuY2VkQnV0dG9uLFBhcGVyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5cbmltcG9ydCBSZWZyZXNoSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vcmVmcmVzaFwiXG5pbXBvcnQgRGVmYXVsdEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZmF2b3JpdGUtYm9yZGVyXCJcbmltcG9ydCBIb21lSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9ob21lXCJcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuaW1wb3J0IENvbW1lbnRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9jb21tZW50XCJcbmltcG9ydCBTaGFyZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvc2hhcmVcIlxuaW1wb3J0IFNhdmVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tICcuL21lc3NhZ2VyJ1xuXG52YXIgX2N1cnJlbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRCYXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtvblNlbGVjdD1hPT5hLCBjbGFzc05hbWUsIHByaW1hcnksIGl0ZW1zPVtdLGRpc3BhdGNoLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tbWFuZHMgJHtjbGFzc05hbWV9YH0gey4uLm90aGVyc30+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbXMubWFwKChjb21tYW5kLGkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQgaW5zdGFuY2VvZiBDb21tYW5kQmFyLkNvbW1hbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQgaW5zdGFuY2VvZiBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmQpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgdXNlIGNvbW1vbiBjb21tYW5kIHRvIHRyaWdnZXIgRGlhbG9nQ29tbWFuZFwiKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNvbW1hbmQpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2krK30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb21tYW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGNvbW1hbmQpPT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ9e2FjdGlvbjpjb21tYW5kfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdiYWNrJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249PEJhY2tJY29uLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFjb21tYW5kLmxhYmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQubGFiZWw9XCLlkI7pgIBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5vblNlbGVjdD0oKT0+e3RoaXMuY29udGV4dC5yb3V0ZXIuZ29CYWNrKCl9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0ncmVmcmVzaCcgJiYgIWNvbW1hbmQuaWNvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighY29tbWFuZC5sYWJlbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmxhYmVsPVwi5pu05pawXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj08UmVmcmVzaEljb24vPlxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J3NhdmUnICYmICFjb21tYW5kLmljb24pe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPTxTYXZlSWNvbi8+XG4gICAgICAgICAgICAgICAgICAgICAgICBpZighY29tbWFuZC5sYWJlbClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmxhYmVsPVwi5L+d5a2YXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1hbmQga2V5PXtjb21tYW5kLmFjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtjb21tYW5kLmFjdGlvbj09cHJpbWFyeX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17b25TZWxlY3R9IHsuLi5jb21tYW5kfS8+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbiAgICBzdGF0aWMgRGlhbG9nQ29tbWFuZD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgICAgICB0aGlzLnN0YXRlPXtvcGVuOmZhbHNlfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgdmFyIHtvcGVufT10aGlzLnN0YXRlXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcGFnZSBkaWFsb2ctY29tbWFuZCAke29wZW4gPyBcIlwiIDogXCJoaWRlXCJ9YH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KCk9PnRoaXMuZGlzbWlzcygpfSA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZSBvdmVybGF5XCIvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoZSk9PntlLnN0b3BQcm9wYWdhdGlvbigpfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICAgICAgdmFyIHtjaGlsZHJlbn09dGhpcy5wcm9wc1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuXG4gICAgICAgIH1cblxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICAgICAgaWYoX2N1cnJlbnQ9dGhpcylcbiAgICAgICAgICAgICAgICBfY3VycmVudD1udWxsXG4gICAgICAgIH1cblxuICAgICAgICBzaG93KCl7XG4gICAgICAgICAgICBfY3VycmVudCAmJiAoX2N1cnJlbnQhPXRoaXMpICYmIF9jdXJyZW50LmRpc21pc3MoKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3Blbjp0cnVlfSlcbiAgICAgICAgICAgIF9jdXJyZW50PXRoaXNcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc21pc3MoKXtcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMub25EaXNtaXNzKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25EaXNtaXNzKClcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3BlbjpmYWxzZX0pXG4gICAgICAgICAgICBfY3VycmVudD1udWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgQ29tbWFuZD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICBjb25zdCB7cHJpbWFyeSwgb25TZWxlY3QsIGFjdGlvbiwgbGFiZWwsIGljb249KDxEZWZhdWx0SWNvbi8+KSwgbGluaywgY2hpbGRyZW59PXRoaXMucHJvcHNcbiAgICAgICAgICAgIHZhciBwcm9wcz17fVxuICAgICAgICAgICAgaWYoIWxpbmspe1xuXHRcdFx0XHRpZihwcmltYXJ5KVxuXHRcdFx0XHRcdHByb3BzLmNsYXNzTmFtZT1cInByaW1hcnlcIlxuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0PGRpdiB7Li4ucHJvcHN9PlxuXHRcdFx0XHRcdFx0PHNwYW4gc3R5bGU9e3tjdXJzb3I6J2RlZmF1bHQnfX1cblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+b25TZWxlY3QoYWN0aW9uLGUpfT5cblx0XHRcdFx0XHRcdFx0PGNlbnRlcj57aWNvbn08L2NlbnRlcj5cblx0XHRcdFx0XHRcdFx0PGNlbnRlciBzdHlsZT17e2ZvbnRTaXplOidzbWFsbGVyJ319PntsYWJlbHx8YWN0aW9ufTwvY2VudGVyPlxuXHRcdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdFx0e2NoaWxkcmVufVxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQ8ZGl2IHsuLi5wcm9wc30+XG5cdFx0XHRcdFx0XHQ8TGluayBzdHlsZT17e2N1cnNvcjonZGVmYXVsdCd9fSB0bz17bGlua30gYWN0aXZlQ2xhc3NOYW1lPVwicHJpbWFyeVwiXG5cdFx0XHRcdFx0XHRcdG9ubHlBY3RpdmVPbkluZGV4PXt0cnVlfVxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5vblNlbGVjdChhY3Rpb24sZSl9PlxuXHRcdFx0XHRcdFx0XHQ8Y2VudGVyPntpY29ufTwvY2VudGVyPlxuXHRcdFx0XHRcdFx0XHQ8Y2VudGVyIHN0eWxlPXt7Zm9udFNpemU6J3NtYWxsZXInfX0+e2xhYmVsfHxhY3Rpb259PC9jZW50ZXI+XG5cdFx0XHRcdFx0XHQ8L0xpbms+XG5cdFx0XHRcdFx0XHR7Y2hpbGRyZW59XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdClcblx0XHRcdH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBDb21tZW50PWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICByZW5kZXIoKXtcblx0XHRcdGNvbnN0IHt0eXBlOntfbmFtZX0sIG1vZGVsOntfaWR9fT10aGlzLnByb3BzXG5cdFx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcbiAgICAgICAgICAgIHJldHVybiAoPENvbW1hbmRCYXIuQ29tbWFuZFxuXHRcdFx0XHRsYWJlbD1cIuivhOiuulwiXG5cdFx0XHRcdG9uU2VsZWN0PXthPT5yb3V0ZXIucHVzaChgL2NvbW1lbnQvJHtfbmFtZX0vJHtfaWR9YCl9XG4gICAgICAgICAgICAgICAgaWNvbj17PENvbW1lbnRJY29uLz59XG5cdFx0XHRcdHsuLi50aGlzLnByb3BzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG4gICAgICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICAgICAgdHlwZTpSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgbW9kZWw6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgU2hhcmU9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgcmV0dXJuICg8Q29tbWFuZEJhci5Db21tYW5kXG5cdFx0XHRcdGxhYmVsPVwi5pyL5Y+L5ZyIXCJcblx0XHRcdFx0b25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICBpY29uPXs8U2hhcmVJY29uLz59XG5cdFx0XHRcdHsuLi50aGlzLnByb3BzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgb25TZWxlY3QoKXtcbiAgICAgICAgICAgIHZhciB7bWVzc2FnZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgaWYodHlwZW9mKG1lc3NhZ2UpPT0nZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2U9bWVzc2FnZSgpXG4gICAgICAgICAgICBXZUNoYXQuc2hhcmUobWVzc2FnZSxudWxsLGZ1bmN0aW9uKHJlYXNvbil7XG4gICAgICAgICAgICAgICAgTWVzc2FnZXIuZXJyb3IocmVhc29uKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgcHJvcFR5cGVzPXttZXNzYWdlOlJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1JlYWN0LlByb3BUeXBlcy5vYmplY3QsUmVhY3QuUHJvcFR5cGVzLmZ1bmNdKX1cbiAgICB9XG59XG5cblxuY29uc3QgU3Bhbj1wcm9wcz0+KDxzcGFuIHsuLi5wcm9wc30vPilcbiJdfQ==