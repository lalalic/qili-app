'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;

var _require = require('react-router');

var History = _require.History;

var _require2 = require('material-ui');

var SvgIcon = _require2.SvgIcon;
var EnhancedButton = _require2.EnhancedButton;
var RefreshIcon = require("material-ui/lib/svg-icons/navigation/refresh");
var DefaultIcon = require("material-ui/lib/svg-icons/action/favorite-border");
var HomeIcon = require("material-ui/lib/svg-icons/action/Home");
var BackIcon = require("material-ui/lib/svg-icons/hardware/keyboard-arrow-left");
var CommentIcon = require("material-ui/lib/svg-icons/communication/comment");
var ShareIcon = require("material-ui/lib/svg-icons/social/share");
var SaveIcon = require("material-ui/lib/svg-icons/content/save");
var Overlay = require('material-ui/lib/overlay');
var Messager = require('./messager');
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

                if (React.isValidElement(command)) {
                    return React.createElement(
                        'div',
                        { key: i++ },
                        command
                    );
                }

                if (typeof command == 'string') command = { action: command };

                if (command.action.toLowerCase() == 'back') {
                    if (_this2.historyLength() < 2) {
                        command.action = 'Home';
                        command.icon = HomeIcon;
                    } else {
                        command.icon = BackIcon;
                    }
                    command.onSelect = function () {
                        _this2.context.router.goBack();
                    };
                }

                if (command.action.toLowerCase() == 'refresh' && !command.icon) command.icon = RefreshIcon;

                if (command.action.toLowerCase() == 'save' && !command.icon) command.icon = SaveIcon;

                return React.createElement(Command, _extends({ key: command.action, primary: command.action == primary, onSelect: onSelect }, command));
            });

            return React.createElement(
                'div',
                _extends({ className: 'commands ' + className }, others),
                commands
            );
        }
    }, {
        key: 'enhanceBack',
        value: function enhanceBack() {
            var router = this.context.router;
            if (enhancedBack || !router) return;(function (goBack, histories) {
                router.goBack = function () {
                    if (histories() < 2) {
                        this.transitionTo("/");
                        return true;
                    }

                    return goBack.call.apply(goBack, [this].concat(Array.prototype.slice.call(arguments)));
                };
            })(router.goBack, this.historyLength);
            enhancedBack = true;
        }
    }, {
        key: 'historyLength',
        value: function historyLength() {
            return History.length;
        }
    }]);

    return CommandBar;
}(Component);

exports.default = CommandBar;

CommandBar.contextTypes = { router: React.PropTypes.func };

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
            var Icon = _props2$icon === undefined ? DefaultIcon : _props2$icon;
            var children = _props2.children;

            var props = {};
            if (primary) props.className = "primary";
            return React.createElement(
                'div',
                props,
                React.createElement(
                    'a',
                    { style: { cursor: 'default' },
                        onClick: function onClick(e) {
                            return onSelect(action, e);
                        } },
                    React.createElement(
                        'center',
                        null,
                        React.createElement(Icon, null)
                    ),
                    React.createElement(
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
}(Component);

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

            return React.createElement(Command, _extends({ label: 'Comment', onSelect: function onSelect() {
                    return _this5.onSelect();
                },
                icon: CommentIcon }, this.props));
        }
    }, {
        key: 'onSelect',
        value: function onSelect() {
            var _props3 = this.props;
            var _name = _props3.type._name;
            var _id = _props3.model._id;

            this.context.router.transitionTo("comment", { type: _name, _id: _id });
        }
    }]);

    return Comment;
}(Command);

CommandBar.Comment = Comment;
Comment.contextTypes = { router: React.PropTypes.func };
Comment.propTypes = {
    type: React.PropTypes.func.isRequired,
    model: React.PropTypes.object.isRequired
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
            return React.createElement(Command, _extends({ label: 'Share', onSelect: this.onSelect.bind(this),
                icon: ShareIcon }, this.props));
        }
    }, {
        key: 'onSelect',
        value: function onSelect() {
            var message = this.props.message;

            debugger;
            if (typeof message == 'function') message = message();
            WeChat.share(message, null, function (reason) {
                Messager.error(reason);
            });
        }
    }]);

    return Share;
}(Command);

CommandBar.Share = Share;
Share.propTypes = {
    message: React.PropTypes.oneOfType(React.PropTypes.object, React.PropTypes.func)
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

            var children = this.renderContent();
            return React.createElement(
                Overlay,
                {
                    className: 'dialog-command',
                    show: this.state.open,
                    autoLockScrolling: true,
                    onTouchTap: function onTouchTap() {
                        return _this8.dismiss();
                    } },
                React.createElement(
                    'div',
                    { className: 'layout' },
                    React.createElement(
                        'div',
                        { className: 'content',
                            onTouchTap: function onTouchTap(e) {
                                e.stopPropagation();
                            } },
                        children
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
        key: 'show',
        value: function show() {
            _current && _current.dismiss();
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
}(Component);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFJLFlBQU0sUUFBUSxPQUFSLENBQU47QUFDQSxJQUFDLFlBQVcsTUFBWCxTQUFEOztlQUNVLFFBQVEsY0FBUjs7QUFBVixJQUFDLDBCQUFEOztnQkFDeUIsUUFBUSxhQUFSOztJQUF4QjtBQUFELElBQVMseUNBQVQ7QUFDQSxrQkFBWSxRQUFRLDhDQUFSLENBQVo7QUFDQSxrQkFBWSxRQUFRLGtEQUFSLENBQVo7QUFDQSxlQUFTLFFBQVEsdUNBQVIsQ0FBVDtBQUNBLGVBQVMsUUFBUSx3REFBUixDQUFUO0FBQ0Esa0JBQVksUUFBUSxpREFBUixDQUFaO0FBQ0EsZ0JBQVUsUUFBUSx3Q0FBUixDQUFWO0FBQ0EsZUFBUyxRQUFRLHdDQUFSLENBQVQ7QUFDQSxjQUFRLFFBQVEseUJBQVIsQ0FBUjtBQUNBLGVBQVMsUUFBUSxZQUFSLENBQVQ7QUFDQSxtQkFBYSxLQUFiOztBQUVKLElBQUksUUFBSjs7SUFFcUI7Ozs7Ozs7Ozs7O2lDQUNUOzs7QUFDSixpQkFBSyxXQUFMLEdBREk7eUJBRW1ELEtBQUssS0FBTCxDQUZuRDtnQkFFQywyQkFGRDtnQkFFVyw2QkFGWDtnQkFFc0IseUJBRnRCO3NDQUUrQixNQUYvQjtnQkFFK0IscUNBQU0sa0JBRnJDO0FBRUEsZ0JBQTJDLHdGQUEzQyxDQUZBO0FBR0Esb0JBQUUsQ0FBRixDQUhBO0FBSUEsMkJBQVMsTUFBTSxHQUFOLENBQVUsVUFBQyxPQUFELEVBQVc7QUFDMUIsb0JBQUcsUUFBUSxPQUFSLEVBQWlCLE9BQWpCLENBQUgsRUFDSSxPQUFPLE9BQVAsQ0FESjs7QUFHQSxvQkFBRyxRQUFRLE9BQVIsRUFBaUIsYUFBakIsQ0FBSCxFQUNJLE1BQU0sSUFBSSxLQUFKLENBQVUsb0RBQVYsQ0FBTixDQURKOztBQUdBLG9CQUFHLE1BQU0sY0FBTixDQUFxQixPQUFyQixDQUFI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LGlCQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssS0FBTCxFQUFmLEVBSks7QUFLTCx1QkFBUyxJQUFULENBTEs7Ozs7V0FsQ1A7RUFBc0I7O0FBMEM1QixXQUFXLGFBQVgsR0FBeUIsYUFBekI7O0FBRUEsU0FBUyxPQUFULENBQWlCLENBQWpCLEVBQW9CLElBQXBCLEVBQXlCO0FBQ3JCLFdBQU8sYUFBYSxJQUFiLENBRGM7O0FBR3JCLFFBQUcsT0FBTyxFQUFFLElBQUYsSUFBUyxXQUFoQixFQUNDLE9BQU8sS0FBUCxDQURKOztBQUdBLFFBQUcsRUFBRSxJQUFGLElBQVEsSUFBUixFQUNDLE9BQU8sSUFBUCxDQURKO0FBRUEsUUFBSSxRQUFNLEVBQUUsSUFBRixDQVJXO0FBU3JCLFdBQU0sU0FBTyxJQUFQLElBQWUsT0FBTyxNQUFNLFNBQU4sSUFBa0IsV0FBekIsRUFBcUM7QUFDdEQsWUFBRyxNQUFNLFNBQU4sSUFBaUIsSUFBakIsRUFDQyxPQUFPLElBQVAsQ0FESjtBQUVBLGdCQUFNLE1BQU0sU0FBTixDQUhnRDtLQUExRDtBQUtBLFdBQU8sS0FBUCxDQWRxQjtDQUF6QiIsImZpbGUiOiJjb21tYW5kLWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdD1yZXF1aXJlKCdyZWFjdCcpLFxuICAgIHtDb21wb25lbnR9PVJlYWN0LFxuICAgIHtIaXN0b3J5fT1yZXF1aXJlKCdyZWFjdC1yb3V0ZXInKSxcbiAgICB7U3ZnSWNvbixFbmhhbmNlZEJ1dHRvbn09cmVxdWlyZSgnbWF0ZXJpYWwtdWknKSxcbiAgICBSZWZyZXNoSWNvbj1yZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL3JlZnJlc2hcIiksXG4gICAgRGVmYXVsdEljb249cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2Zhdm9yaXRlLWJvcmRlclwiKSxcbiAgICBIb21lSWNvbj1yZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vSG9tZVwiKSxcbiAgICBCYWNrSWNvbj1yZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCIpLFxuICAgIENvbW1lbnRJY29uPXJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2NvbW11bmljYXRpb24vY29tbWVudFwiKSxcbiAgICBTaGFyZUljb249cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvc29jaWFsL3NoYXJlXCIpLFxuICAgIFNhdmVJY29uPXJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiKSxcbiAgICBPdmVybGF5PXJlcXVpcmUoJ21hdGVyaWFsLXVpL2xpYi9vdmVybGF5JyksXG4gICAgTWVzc2FnZXI9cmVxdWlyZSgnLi9tZXNzYWdlcicpLFxuICAgIGVuaGFuY2VkQmFjaz1mYWxzZTtcblxudmFyIF9jdXJyZW50O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kQmFyIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB0aGlzLmVuaGFuY2VCYWNrKClcbiAgICAgICAgdmFyIHtvblNlbGVjdCwgY2xhc3NOYW1lLCBwcmltYXJ5LCBpdGVtcz1bXSwuLi5vdGhlcnN9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBpPTAsXG4gICAgICAgICAgICBjb21tYW5kcz1pdGVtcy5tYXAoKGNvbW1hbmQpPT57XG4gICAgICAgICAgICAgICAgaWYodHlwZWRPZihjb21tYW5kLCBDb21tYW5kKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRcblxuICAgICAgICAgICAgICAgIGlmKHR5cGVkT2YoY29tbWFuZCwgRGlhbG9nQ29tbWFuZCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSB1c2UgY29tbW9uIGNvbW1hbmQgdG8gdHJpZ2dlciBEaWFsb2dDb21tYW5kXCIpXG5cbiAgICAgICAgICAgICAgICBpZihSZWFjdC5pc1ZhbGlkRWxlbWVudChjb21tYW5kKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aSsrfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29tbWFuZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mKGNvbW1hbmQpPT0nc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZD17YWN0aW9uOmNvbW1hbmR9XG5cbiAgICAgICAgICAgICAgICBpZigoY29tbWFuZC5hY3Rpb24pLnRvTG93ZXJDYXNlKCk9PSdiYWNrJyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaGlzdG9yeUxlbmd0aCgpPDIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5hY3Rpb249J0hvbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249SG9tZUljb25cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249QmFja0ljb25cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kLm9uU2VsZWN0PSgpPT57dGhpcy5jb250ZXh0LnJvdXRlci5nb0JhY2soKX1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0ncmVmcmVzaCcgJiYgIWNvbW1hbmQuaWNvbilcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPVJlZnJlc2hJY29uXG5cbiAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0nc2F2ZScgJiYgIWNvbW1hbmQuaWNvbilcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPVNhdmVJY29uXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZCBrZXk9e2NvbW1hbmQuYWN0aW9ufSBwcmltYXJ5PXtjb21tYW5kLmFjdGlvbj09cHJpbWFyeX0gb25TZWxlY3Q9e29uU2VsZWN0fSB7Li4uY29tbWFuZH0vPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tbWFuZHMgJHtjbGFzc05hbWV9YH0gey4uLm90aGVyc30+XG4gICAgICAgICAgICAgICAge2NvbW1hbmRzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBlbmhhbmNlQmFjaygpe1xuICAgICAgICB2YXIgcm91dGVyPXRoaXMuY29udGV4dC5yb3V0ZXJcbiAgICAgICAgaWYoZW5oYW5jZWRCYWNrIHx8ICFyb3V0ZXIpXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICA7KGZ1bmN0aW9uKGdvQmFjaywgaGlzdG9yaWVzKXtcbiAgICAgICAgICAgIHJvdXRlci5nb0JhY2s9ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZihoaXN0b3JpZXMoKTwyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oXCIvXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdvQmFjay5jYWxsKHRoaXMsLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KShyb3V0ZXIuZ29CYWNrLCB0aGlzLmhpc3RvcnlMZW5ndGgpO1xuICAgICAgICBlbmhhbmNlZEJhY2s9dHJ1ZVxuICAgIH1cblxuICAgIGhpc3RvcnlMZW5ndGgoKXtcbiAgICAgICAgcmV0dXJuIEhpc3RvcnkubGVuZ3RoXG4gICAgfVxufVxuQ29tbWFuZEJhci5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuXG5jbGFzcyBDb21tYW5kIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3ByaW1hcnksIG9uU2VsZWN0LCBhY3Rpb24sIGxhYmVsLCBpY29uOkljb249RGVmYXVsdEljb24sIGNoaWxkcmVufT10aGlzLnByb3BzXG4gICAgICAgIHZhciBwcm9wcz17fVxuICAgICAgICBpZihwcmltYXJ5KVxuICAgICAgICAgICAgcHJvcHMuY2xhc3NOYW1lPVwicHJpbWFyeVwiXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgPGEgc3R5bGU9e3tjdXJzb3I6J2RlZmF1bHQnfX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpPT5vblNlbGVjdChhY3Rpb24sZSl9PlxuICAgICAgICAgICAgICAgICAgICA8Y2VudGVyPjxJY29uLz48L2NlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPGNlbnRlciBzdHlsZT17e2ZvbnRTaXplOidzbWFsbGVyJ319PntsYWJlbHx8YWN0aW9ufTwvY2VudGVyPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbkNvbW1hbmRCYXIuQ29tbWFuZD1Db21tYW5kXG5cbmNsYXNzIENvbW1lbnQgZXh0ZW5kcyBDb21tYW5ke1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gKDxDb21tYW5kIGxhYmVsPVwiQ29tbWVudFwiIG9uU2VsZWN0PXsoKT0+dGhpcy5vblNlbGVjdCgpfVxuICAgICAgICAgICAgaWNvbj17Q29tbWVudEljb259IHsuLi50aGlzLnByb3BzfS8+KVxuICAgIH1cblxuICAgIG9uU2VsZWN0KCl7XG4gICAgICAgIHZhciB7dHlwZTp7X25hbWV9LCBtb2RlbDp7X2lkfX09dGhpcy5wcm9wc1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbyhcImNvbW1lbnRcIix7dHlwZTpfbmFtZSxfaWQ6X2lkfSlcbiAgICB9XG59XG5Db21tYW5kQmFyLkNvbW1lbnQ9Q29tbWVudFxuQ29tbWVudC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cbkNvbW1lbnQucHJvcFR5cGVzPXtcbiAgICB0eXBlOlJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbW9kZWw6UmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59XG5cbmNsYXNzIFNoYXJlIGV4dGVuZHMgQ29tbWFuZHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuICg8Q29tbWFuZCBsYWJlbD1cIlNoYXJlXCIgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIGljb249e1NoYXJlSWNvbn0gey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgfVxuXG4gICAgb25TZWxlY3QoKXtcbiAgICAgICAgdmFyIHttZXNzYWdlfT10aGlzLnByb3BzXG4gICAgICAgIGRlYnVnZ2VyXG4gICAgICAgIGlmKHR5cGVvZihtZXNzYWdlKT09J2Z1bmN0aW9uJylcbiAgICAgICAgICAgIG1lc3NhZ2U9bWVzc2FnZSgpXG4gICAgICAgIFdlQ2hhdC5zaGFyZShtZXNzYWdlLG51bGwsZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgICAgIE1lc3NhZ2VyLmVycm9yKHJlYXNvbilcbiAgICAgICAgfSlcbiAgICB9XG59XG5Db21tYW5kQmFyLlNoYXJlPVNoYXJlXG5TaGFyZS5wcm9wVHlwZXM9e1xuICAgIG1lc3NhZ2U6UmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFJlYWN0LlByb3BUeXBlcy5mdW5jKVxufVxuXG5jbGFzcyBEaWFsb2dDb21tYW5kIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e29wZW46ZmFsc2V9XG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIgY2hpbGRyZW49dGhpcy5yZW5kZXJDb250ZW50KClcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxPdmVybGF5XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZGlhbG9nLWNvbW1hbmRcIlxuICAgICAgICAgICAgICAgIHNob3c9e3RoaXMuc3RhdGUub3Blbn1cbiAgICAgICAgICAgICAgICBhdXRvTG9ja1Njcm9sbGluZz17dHJ1ZX1cbiAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoKT0+dGhpcy5kaXNtaXNzKCl9ID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KGUpPT57ZS5zdG9wUHJvcGFnYXRpb24oKX19PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvT3ZlcmxheT5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHtjaGlsZHJlbn09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gY2hpbGRyZW5cbiAgICB9XG5cbiAgICBzaG93KCl7XG4gICAgICAgIF9jdXJyZW50ICYmIF9jdXJyZW50LmRpc21pc3MoKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOnRydWV9KVxuICAgICAgICBfY3VycmVudD10aGlzXG4gICAgfVxuXG4gICAgZGlzbWlzcygpe1xuICAgICAgICBpZih0aGlzLnByb3BzLm9uRGlzbWlzcylcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25EaXNtaXNzKClcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtvcGVuOmZhbHNlfSlcbiAgICAgICAgX2N1cnJlbnQ9bnVsbFxuICAgIH1cbn1cbkNvbW1hbmRCYXIuRGlhbG9nQ29tbWFuZD1EaWFsb2dDb21tYW5kXG5cbmZ1bmN0aW9uIHR5cGVkT2YoYSwgdHlwZSl7XG4gICAgcmV0dXJuIGEgaW5zdGFuY2VvZiB0eXBlXG5cbiAgICBpZih0eXBlb2YoYS50eXBlKT09J3VuZGVmaW5lZCcpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGlmKGEudHlwZT09dHlwZSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgdmFyIGNoaWxkPWEudHlwZVxuICAgIHdoaWxlKGNoaWxkIT1udWxsICYmIHR5cGVvZihjaGlsZC5fX3Byb3RvX18pIT0ndW5kZWZpbmVkJyl7XG4gICAgICAgIGlmKGNoaWxkLl9fcHJvdG9fXz09dHlwZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjaGlsZD1jaGlsZC5fX3Byb3RvX19cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG59XG4iXX0=