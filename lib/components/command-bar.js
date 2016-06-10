'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var enhancedBack = false;
var _current;

var CommandBar = function (_Component) {
    _inherits(CommandBar, _Component);

    function CommandBar() {
        _classCallCheck(this, CommandBar);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CommandBar).apply(this, arguments));
    }

    _createClass(CommandBar, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.enhanceBack();
            var _props = this.props;
            var onSelect = _props.onSelect;
            var className = _props.className;
            var primary = _props.primary;
            var _props$items = _props.items;
            var items = _props$items === undefined ? [] : _props$items;
            var others = _objectWithoutProperties(_props, ['onSelect', 'className', 'primary', 'items']);
            var i = 0;
            var commands = items.map(function (command) {
                if (typedOf(command, Command)) return command;

                if (typedOf(command, DialogCommand)) throw new Error("Please use common command to trigger DialogCommand");

                if (_react2.default.isValidElement(command)) {
                    return _react2.default.createElement(
                        'div',
                        { key: i++ },
                        command
                    );
                }

                if (typeof command == 'string') command = { action: command };

                if (command.action.toLowerCase() == 'back') {
                    command.icon = _keyboardArrowLeft2.default;
                    command.onSelect = function () {
                        _this2.context.router.goBack();
                    };
                }

                if (command.action.toLowerCase() == 'refresh' && !command.icon) command.icon = _refresh2.default;

                if (command.action.toLowerCase() == 'save' && !command.icon) command.icon = _save2.default;

                return _react2.default.createElement(Command, _extends({ key: command.action, primary: command.action == primary, onSelect: onSelect }, command));
            });

            return _react2.default.createElement(
                'div',
                _extends({ className: 'commands ' + className }, others),
                commands
            );
        }
    }, {
        key: 'enhanceBack',
        value: function enhanceBack() {
            var router = this.context.router;
            if (enhancedBack || !router) return;
            enhancedBack = true;
        }
    }, {
        key: 'historyLength',
        value: function historyLength() {
            return 2;
        }
    }]);

    return CommandBar;
}(_react.Component);

exports.default = CommandBar;

CommandBar.contextTypes = { router: _react2.default.PropTypes.object };

var Command = function (_Component2) {
    _inherits(Command, _Component2);

    function Command() {
        _classCallCheck(this, Command);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Command).apply(this, arguments));
    }

    _createClass(Command, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var primary = _props2.primary;
            var onSelect = _props2.onSelect;
            var action = _props2.action;
            var label = _props2.label;
            var _props2$icon = _props2.icon;
            var Icon = _props2$icon === undefined ? _favoriteBorder2.default : _props2$icon;
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
                        _react2.default.createElement(Icon, null)
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

    return Command;
}(_react.Component);

CommandBar.Command = Command;

var Comment = function (_Command) {
    _inherits(Comment, _Command);

    function Comment() {
        _classCallCheck(this, Comment);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Comment).apply(this, arguments));
    }

    _createClass(Comment, [{
        key: 'render',
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(Command, _extends({ label: 'Comment', onSelect: function onSelect() {
                    return _this5.onSelect();
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

    return Comment;
}(Command);

CommandBar.Comment = Comment;
Comment.contextTypes = { router: _react2.default.PropTypes.object };
Comment.propTypes = {
    type: _react2.default.PropTypes.func.isRequired,
    model: _react2.default.PropTypes.object.isRequired
};

var Share = function (_Command2) {
    _inherits(Share, _Command2);

    function Share() {
        _classCallCheck(this, Share);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Share).apply(this, arguments));
    }

    _createClass(Share, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(Command, _extends({ label: 'Share', onSelect: this.onSelect.bind(this),
                icon: _share2.default }, this.props));
        }
    }, {
        key: 'onSelect',
        value: function onSelect() {
            var message = this.props.message;

            debugger;
            if (typeof message == 'function') message = message();
            WeChat.share(message, null, function (reason) {
                _messager2.default.error(reason);
            });
        }
    }]);

    return Share;
}(Command);

CommandBar.Share = Share;
Share.propTypes = {
    message: _react2.default.PropTypes.oneOfType(_react2.default.PropTypes.object, _react2.default.PropTypes.func)
};

var DialogCommand = function (_Component3) {
    _inherits(DialogCommand, _Component3);

    function DialogCommand(props) {
        _classCallCheck(this, DialogCommand);

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(DialogCommand).call(this, props));

        _this7.state = { open: false };
        return _this7;
    }

    _createClass(DialogCommand, [{
        key: 'render',
        value: function render() {
            var _this8 = this;

            var open = this.state.open;

            return _react2.default.createElement(
                'div',
                {
                    className: 'page overlay dialog-command ' + (open ? "" : "hide"),
                    onTouchTap: function onTouchTap() {
                        return _this8.dismiss();
                    } },
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

    return DialogCommand;
}(_react.Component);

CommandBar.DialogCommand = DialogCommand;

function typedOf(a, type) {
    return a instanceof type;

    if (typeof a.type == 'undefined') return false;

    if (a.type == type) return true;
    var child = a.type;
    while (child != null && typeof child.__proto__ != 'undefined') {
        if (child.__proto__ == type) return true;
        child = child.__proto__;
    }
    return false;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxlQUFhLEtBQWI7QUFDSixJQUFJLFFBQUo7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDs7O0FBQ0osaUJBQUssV0FBTCxHQURJO3lCQUVtRCxLQUFLLEtBQUwsQ0FGbkQ7Z0JBRUMsMkJBRkQ7Z0JBRVcsNkJBRlg7Z0JBRXNCLHlCQUZ0QjtzQ0FFK0IsTUFGL0I7Z0JBRStCLHFDQUFNLGtCQUZyQztBQUVBLGdCQUEyQyx3RkFBM0MsQ0FGQTtBQUdBLG9CQUFFLENBQUYsQ0FIQTtBQUlBLDJCQUFTLE1BQU0sR0FBTixDQUFVLFVBQUMsT0FBRCxFQUFXO0FBQzFCLG9CQUFHLFFBQVEsT0FBUixFQUFpQixPQUFqQixDQUFILEVBQ0ksT0FBTyxPQUFQLENBREo7O0FBR0Esb0JBQUcsUUFBUSxPQUFSLEVBQWlCLGFBQWpCLENBQUgsRUFDSSxNQUFNLElBQUksS0FBSixDQUFVLG9EQUFWLENBQU4sQ0FESjs7QUFHQSxvQkFBRyxnQkFBTSxjQUFOLENBQXFCLE9BQXJCLENBQUgsRUFBaUM7QUFDN0IsMkJBQ0k7OzBCQUFLLEtBQUssR0FBTCxFQUFMO3dCQUNLLE9BREw7cUJBREosQ0FENkI7aUJBQWpDOztBQVFBLG9CQUFHLE9BQU8sT0FBUCxJQUFpQixRQUFqQixFQUNDLFVBQVEsRUFBQyxRQUFPLE9BQVAsRUFBVCxDQURKOztBQUdBLG9CQUFHLFFBQVEsTUFBUixDQUFlLFdBQWYsTUFBOEIsTUFBOUIsRUFBcUM7QUFDcEMsNEJBQVEsSUFBUiwrQkFEb0M7QUFFcEMsNEJBQVEsUUFBUixHQUFpQixZQUFJO0FBQUMsK0JBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsTUFB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U0FBUyxPQUFULEVBQWhDLENBREU7QUFFRixpQkFBSyxRQUFMLENBQWMsRUFBQyxNQUFLLElBQUwsRUFBZixFQUZFO0FBR0YsdUJBQVMsSUFBVCxDQUhFOzs7O2tDQU1HO0FBQ0wsZ0JBQUcsS0FBSyxLQUFMLENBQVcsU0FBWCxFQUNDLEtBQUssS0FBTCxDQUFXLFNBQVgsR0FESjs7QUFHQSxpQkFBSyxRQUFMLENBQWMsRUFBQyxNQUFLLEtBQUwsRUFBZixFQUpLO0FBS0wsdUJBQVMsSUFBVCxDQUxLOzs7O1dBckNQOzs7QUE2Q04sV0FBVyxhQUFYLEdBQXlCLGFBQXpCOztBQUVBLFNBQVMsT0FBVCxDQUFpQixDQUFqQixFQUFvQixJQUFwQixFQUF5QjtBQUNyQixXQUFPLGFBQWEsSUFBYixDQURjOztBQUdyQixRQUFHLE9BQU8sRUFBRSxJQUFGLElBQVMsV0FBaEIsRUFDQyxPQUFPLEtBQVAsQ0FESjs7QUFHQSxRQUFHLEVBQUUsSUFBRixJQUFRLElBQVIsRUFDQyxPQUFPLElBQVAsQ0FESjtBQUVBLFFBQUksUUFBTSxFQUFFLElBQUYsQ0FSVztBQVNyQixXQUFNLFNBQU8sSUFBUCxJQUFlLE9BQU8sTUFBTSxTQUFOLElBQWtCLFdBQXpCLEVBQXFDO0FBQ3RELFlBQUcsTUFBTSxTQUFOLElBQWlCLElBQWpCLEVBQ0MsT0FBTyxJQUFQLENBREo7QUFFQSxnQkFBTSxNQUFNLFNBQU4sQ0FIZ0Q7S0FBMUQ7QUFLQSxXQUFPLEtBQVAsQ0FkcUI7Q0FBekIiLCJmaWxlIjoiY29tbWFuZC1iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtTdmdJY29uLEVuaGFuY2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBSZWZyZXNoSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vcmVmcmVzaFwiXG5pbXBvcnQgRGVmYXVsdEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZmF2b3JpdGUtYm9yZGVyXCJcbmltcG9ydCBIb21lSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9ob21lXCJcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuaW1wb3J0IENvbW1lbnRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9jb21tZW50XCJcbmltcG9ydCBTaGFyZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvc2hhcmVcIlxuaW1wb3J0IFNhdmVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tICcuL21lc3NhZ2VyJ1xuXG52YXIgZW5oYW5jZWRCYWNrPWZhbHNlO1xudmFyIF9jdXJyZW50O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kQmFyIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB0aGlzLmVuaGFuY2VCYWNrKClcbiAgICAgICAgdmFyIHtvblNlbGVjdCwgY2xhc3NOYW1lLCBwcmltYXJ5LCBpdGVtcz1bXSwuLi5vdGhlcnN9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBpPTAsXG4gICAgICAgICAgICBjb21tYW5kcz1pdGVtcy5tYXAoKGNvbW1hbmQpPT57XG4gICAgICAgICAgICAgICAgaWYodHlwZWRPZihjb21tYW5kLCBDb21tYW5kKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRcblxuICAgICAgICAgICAgICAgIGlmKHR5cGVkT2YoY29tbWFuZCwgRGlhbG9nQ29tbWFuZCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSB1c2UgY29tbW9uIGNvbW1hbmQgdG8gdHJpZ2dlciBEaWFsb2dDb21tYW5kXCIpXG5cbiAgICAgICAgICAgICAgICBpZihSZWFjdC5pc1ZhbGlkRWxlbWVudChjb21tYW5kKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aSsrfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29tbWFuZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKGNvbW1hbmQpPT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZD17YWN0aW9uOmNvbW1hbmR9XG5cbiAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0nYmFjaycpe1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249QmFja0ljb25cbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5vblNlbGVjdD0oKT0+e3RoaXMuY29udGV4dC5yb3V0ZXIuZ29CYWNrKCl9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J3JlZnJlc2gnICYmICFjb21tYW5kLmljb24pXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj1SZWZyZXNoSWNvblxuXG4gICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J3NhdmUnICYmICFjb21tYW5kLmljb24pXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj1TYXZlSWNvblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPENvbW1hbmQga2V5PXtjb21tYW5kLmFjdGlvbn0gcHJpbWFyeT17Y29tbWFuZC5hY3Rpb249PXByaW1hcnl9IG9uU2VsZWN0PXtvblNlbGVjdH0gey4uLmNvbW1hbmR9Lz5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbW1hbmRzICR7Y2xhc3NOYW1lfWB9IHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAgICAgIHtjb21tYW5kc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgZW5oYW5jZUJhY2soKXtcbiAgICAgICAgdmFyIHJvdXRlcj10aGlzLmNvbnRleHQucm91dGVyXG4gICAgICAgIGlmKGVuaGFuY2VkQmFjayB8fCAhcm91dGVyKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVuaGFuY2VkQmFjaz10cnVlXG4gICAgfVxuXG4gICAgaGlzdG9yeUxlbmd0aCgpe1xuICAgICAgICByZXR1cm4gMlxuICAgIH1cbn1cbkNvbW1hbmRCYXIuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuXG5jbGFzcyBDb21tYW5kIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3ByaW1hcnksIG9uU2VsZWN0LCBhY3Rpb24sIGxhYmVsLCBpY29uOkljb249RGVmYXVsdEljb24sIGNoaWxkcmVufT10aGlzLnByb3BzXG4gICAgICAgIHZhciBwcm9wcz17fVxuICAgICAgICBpZihwcmltYXJ5KVxuICAgICAgICAgICAgcHJvcHMuY2xhc3NOYW1lPVwicHJpbWFyeVwiXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgPGEgc3R5bGU9e3tjdXJzb3I6J2RlZmF1bHQnfX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpPT5vblNlbGVjdChhY3Rpb24sZSl9PlxuICAgICAgICAgICAgICAgICAgICA8Y2VudGVyPjxJY29uLz48L2NlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPGNlbnRlciBzdHlsZT17e2ZvbnRTaXplOidzbWFsbGVyJ319PntsYWJlbHx8YWN0aW9ufTwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbkNvbW1hbmRCYXIuQ29tbWFuZD1Db21tYW5kXG5cbmNsYXNzIENvbW1lbnQgZXh0ZW5kcyBDb21tYW5ke1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gKDxDb21tYW5kIGxhYmVsPVwiQ29tbWVudFwiIG9uU2VsZWN0PXsoKT0+dGhpcy5vblNlbGVjdCgpfVxuICAgICAgICAgICAgaWNvbj17Q29tbWVudEljb259IHsuLi50aGlzLnByb3BzfS8+KVxuICAgIH1cblxuICAgIG9uU2VsZWN0KCl7XG4gICAgICAgIHZhciB7dHlwZTp7X25hbWV9LCBtb2RlbDp7X2lkfX09dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGNvbW1lbnQvJHtfbmFtZX0vJHtfaWR9YClcbiAgICB9XG59XG5Db21tYW5kQmFyLkNvbW1lbnQ9Q29tbWVudFxuQ29tbWVudC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuQ29tbWVudC5wcm9wVHlwZXM9e1xuICAgIHR5cGU6UmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBtb2RlbDpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbn1cblxuY2xhc3MgU2hhcmUgZXh0ZW5kcyBDb21tYW5ke1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gKDxDb21tYW5kIGxhYmVsPVwiU2hhcmVcIiBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgaWNvbj17U2hhcmVJY29ufSB7Li4udGhpcy5wcm9wc30vPilcbiAgICB9XG5cbiAgICBvblNlbGVjdCgpe1xuICAgICAgICB2YXIge21lc3NhZ2V9PXRoaXMucHJvcHNcbiAgICAgICAgZGVidWdnZXJcbiAgICAgICAgaWYodHlwZW9mKG1lc3NhZ2UpPT0nZnVuY3Rpb24nKVxuICAgICAgICAgICAgbWVzc2FnZT1tZXNzYWdlKClcbiAgICAgICAgV2VDaGF0LnNoYXJlKG1lc3NhZ2UsbnVsbCxmdW5jdGlvbihyZWFzb24pe1xuICAgICAgICAgICAgTWVzc2FnZXIuZXJyb3IocmVhc29uKVxuICAgICAgICB9KVxuICAgIH1cbn1cbkNvbW1hbmRCYXIuU2hhcmU9U2hhcmVcblNoYXJlLnByb3BUeXBlcz17XG4gICAgbWVzc2FnZTpSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFJlYWN0LlByb3BUeXBlcy5vYmplY3QsUmVhY3QuUHJvcFR5cGVzLmZ1bmMpXG59XG5cbmNsYXNzIERpYWxvZ0NvbW1hbmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17b3BlbjpmYWxzZX1cbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7b3Blbn09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHBhZ2Ugb3ZlcmxheSBkaWFsb2ctY29tbWFuZCAke29wZW4gPyBcIlwiIDogXCJoaWRlXCJ9YH1cbiAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoKT0+dGhpcy5kaXNtaXNzKCl9ID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KGUpPT57ZS5zdG9wUHJvcGFnYXRpb24oKX19PlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2NoaWxkcmVufT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiBjaGlsZHJlblxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGlmKF9jdXJyZW50PXRoaXMpXG4gICAgICAgICAgICBfY3VycmVudD1udWxsXG4gICAgfVxuXG4gICAgc2hvdygpe1xuICAgICAgICBfY3VycmVudCAmJiAoX2N1cnJlbnQhPXRoaXMpICYmIF9jdXJyZW50LmRpc21pc3MoKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOnRydWV9KVxuICAgICAgICBfY3VycmVudD10aGlzXG4gICAgfVxuXG4gICAgZGlzbWlzcygpe1xuICAgICAgICBpZih0aGlzLnByb3BzLm9uRGlzbWlzcylcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25EaXNtaXNzKClcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOmZhbHNlfSlcbiAgICAgICAgX2N1cnJlbnQ9bnVsbFxuICAgIH1cbn1cbkNvbW1hbmRCYXIuRGlhbG9nQ29tbWFuZD1EaWFsb2dDb21tYW5kXG5cbmZ1bmN0aW9uIHR5cGVkT2YoYSwgdHlwZSl7XG4gICAgcmV0dXJuIGEgaW5zdGFuY2VvZiB0eXBlXG5cbiAgICBpZih0eXBlb2YoYS50eXBlKT09J3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmKGEudHlwZT09dHlwZSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgdmFyIGNoaWxkPWEudHlwZVxuICAgIHdoaWxlKGNoaWxkIT1udWxsICYmIHR5cGVvZihjaGlsZC5fX3Byb3RvX18pIT0ndW5kZWZpbmVkJyl7XG4gICAgICAgIGlmKGNoaWxkLl9fcHJvdG9fXz09dHlwZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjaGlsZD1jaGlsZC5fX3Byb3RvX19cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG59XG4iXX0=