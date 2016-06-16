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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CommandBar).apply(this, arguments));
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
            var i = 0;
            var commands = items.map(function (command) {
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
                    command.icon = _keyboardArrowLeft2.default;
                    command.onSelect = function () {
                        _this2.context.router.goBack();
                    };
                }

                if (command.action.toLowerCase() == 'refresh' && !command.icon) command.icon = _refresh2.default;

                if (command.action.toLowerCase() == 'save' && !command.icon) command.icon = _save2.default;

                return _react2.default.createElement(CommandBar.Command, _extends({ key: command.action,
                    primary: command.action == primary,
                    onSelect: onSelect }, command));
            });

            return _react2.default.createElement(
                'div',
                _extends({ className: 'commands ' + className }, others),
                commands
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

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props));

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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
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

    return _class2;
}(_react.Component);

CommandBar.Comment = (_temp = _class3 = function (_Component4) {
    _inherits(_class3, _Component4);

    function _class3() {
        _classCallCheck(this, _class3);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class3).apply(this, arguments));
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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class4).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQUo7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDs7O3lCQUNtRCxLQUFLLEtBQUwsQ0FEbkQ7Z0JBQ0MsMkJBREQ7Z0JBQ1csNkJBRFg7Z0JBQ3NCLHlCQUR0QjtzQ0FDK0IsTUFEL0I7Z0JBQytCLHFDQUFNLGtCQURyQztBQUNBLGdCQUEyQyx3RkFBM0MsQ0FEQTtBQUVBLG9CQUFFLENBQUYsQ0FGQTtBQUdBLDJCQUFTLE1BQU0sR0FBTixDQUFVLFVBQUMsT0FBRCxFQUFXO0FBQzFCLG9CQUFHLG1CQUFtQixXQUFXLE9BQVgsRUFDbEIsT0FBTyxPQUFQLENBREo7O0FBR0Esb0JBQUcsbUJBQW1CLFdBQVcsYUFBWCxFQUNsQixNQUFNLElBQUksS0FBSixDQUFVLG9EQUFWLENBQU4sQ0FESjs7QUFHQSxvQkFBRyxnQkFBTSxjQUFOLENBQXFCLE9BQXJCLENBQUgsRUFBaUM7QUFDN0IsMkJBQ0k7OzBCQUFLLEtBQUssR0FBTCxFQUFMO3dCQUNLLE9BREw7cUJBREosQ0FENkI7aUJBQWpDOztBQVFBLG9CQUFHLE9BQU8sT0FBUCxJQUFpQixRQUFqQixFQUNDLFVBQVEsRUFBQyxRQUFPLE9BQVAsRUFBVCxDQURKOztBQUdBLG9CQUFHLFFBQVEsTUFBUixDQUFlLFdBQWYsTUFBOEIsTUFBOUIsRUFBcUM7QUFDcEMsNEJBQVEsSUFBUiwrQkFEb0M7QUFFcEMsNEJBQVEsUUFBUixHQUFpQixZQUFJO0FBQUMsK0JBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsTUFBcEIsR0FBRDtxQkFBSixDQUZtQjtpQkFBeEM7O0FBS0Esb0JBQUcsUUFBUSxNQUFSLENBQWUsV0FB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QXVCLEtBQUssS0FBTCxDQURuQixDQUFSLENBREk7Ozs7bUNBS0U7MEJBQzBCLEtBQUssS0FBTCxDQUQxQjtnQkFDSyxnQkFBTixLQUFNLE1BREw7Z0JBQ29CLGNBQVAsTUFBTyxJQURwQjs7QUFFTixpQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixjQUFvQyxjQUFTLEdBQTdDLEVBRk07Ozs7OzZCQUtILGVBQWEsRUFBQyxRQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsWUFDckIsWUFBVTtBQUNiLFVBQUssZ0JBQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjtBQUNMLFdBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2Qjs7QUFoSUcsV0FtSVY7Ozs7Ozs7Ozs7O2lDQUNLO0FBQ0osbUJBQVEsOEJBQUMsV0FBVyxPQUFaLGFBQW9CLE9BQU0sT0FBTixFQUFjLFVBQVUsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFWO0FBQ3RDLHlDQUFxQixLQUFLLEtBQUwsQ0FEakIsQ0FBUixDQURJOzs7O21DQUtFO2dCQUNELFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEQzs7QUFFTixnQkFBRyxPQUFPLE9BQVAsSUFBaUIsVUFBakIsRUFDQyxVQUFRLFNBQVIsQ0FESjtBQUVBLG1CQUFPLEtBQVAsQ0FBYSxPQUFiLEVBQXFCLElBQXJCLEVBQTBCLFVBQVMsTUFBVCxFQUFnQjtBQUN0QyxtQ0FBUyxLQUFULENBQWUsTUFBZixFQURzQzthQUFoQixDQUExQixDQUpNOzs7Ozs2QkFRSCxZQUFVLEVBQUMsU0FBUSxnQkFBTSxTQUFOLENBQWdCLFNBQWhCLENBQTBCLENBQUMsZ0JBQU0sU0FBTixDQUFnQixNQUFoQixFQUF1QixnQkFBTSxTQUFOLENBQWdCLElBQWhCLENBQWxELENBQVI7a0JBakpMIiwiZmlsZSI6ImNvbW1hbmQtYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7U3ZnSWNvbixFbmhhbmNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgUmVmcmVzaEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL3JlZnJlc2hcIlxuaW1wb3J0IERlZmF1bHRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Zhdm9yaXRlLWJvcmRlclwiXG5pbXBvcnQgSG9tZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vaG9tZVwiXG5pbXBvcnQgQmFja0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1sZWZ0XCJcbmltcG9ydCBDb21tZW50SWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vY29tbWVudFwiXG5pbXBvcnQgU2hhcmVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL3NoYXJlXCJcbmltcG9ydCBTYXZlSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvc2F2ZVwiXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSAnLi9tZXNzYWdlcidcblxudmFyIF9jdXJyZW50O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tYW5kQmFyIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge29uU2VsZWN0LCBjbGFzc05hbWUsIHByaW1hcnksIGl0ZW1zPVtdLC4uLm90aGVyc309dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGk9MCxcbiAgICAgICAgICAgIGNvbW1hbmRzPWl0ZW1zLm1hcCgoY29tbWFuZCk9PntcbiAgICAgICAgICAgICAgICBpZihjb21tYW5kIGluc3RhbmNlb2YgQ29tbWFuZEJhci5Db21tYW5kKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZFxuXG4gICAgICAgICAgICAgICAgaWYoY29tbWFuZCBpbnN0YW5jZW9mIENvbW1hbmRCYXIuRGlhbG9nQ29tbWFuZClcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHVzZSBjb21tb24gY29tbWFuZCB0byB0cmlnZ2VyIERpYWxvZ0NvbW1hbmRcIilcblxuICAgICAgICAgICAgICAgIGlmKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNvbW1hbmQpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpKyt9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb21tYW5kfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YoY29tbWFuZCk9PSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kPXthY3Rpb246Y29tbWFuZH1cblxuICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdiYWNrJyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj1CYWNrSWNvblxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kLm9uU2VsZWN0PSgpPT57dGhpcy5jb250ZXh0LnJvdXRlci5nb0JhY2soKX1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0ncmVmcmVzaCcgJiYgIWNvbW1hbmQuaWNvbilcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPVJlZnJlc2hJY29uXG5cbiAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0nc2F2ZScgJiYgIWNvbW1hbmQuaWNvbilcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPVNhdmVJY29uXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8Q29tbWFuZEJhci5Db21tYW5kIGtleT17Y29tbWFuZC5hY3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtjb21tYW5kLmFjdGlvbj09cHJpbWFyeX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtvblNlbGVjdH0gey4uLmNvbW1hbmR9Lz5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGNvbW1hbmRzICR7Y2xhc3NOYW1lfWB9IHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAgICAgIHtjb21tYW5kc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXG4gICAgc3RhdGljIERpYWxvZ0NvbW1hbmQ9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZT17b3BlbjpmYWxzZX1cbiAgICAgICAgfVxuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHZhciB7b3Blbn09dGhpcy5zdGF0ZVxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHBhZ2UgZGlhbG9nLWNvbW1hbmQgJHtvcGVuID8gXCJcIiA6IFwiaGlkZVwifWB9XG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA9eygpPT50aGlzLmRpc21pc3MoKX0gPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2Ugb3ZlcmxheVwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KGUpPT57ZS5zdG9wUHJvcGFnYXRpb24oKX19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgICAgIHZhciB7Y2hpbGRyZW59PXRoaXMucHJvcHNcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlblxuICAgICAgICB9XG5cbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgICAgIGlmKF9jdXJyZW50PXRoaXMpXG4gICAgICAgICAgICAgICAgX2N1cnJlbnQ9bnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgc2hvdygpe1xuICAgICAgICAgICAgX2N1cnJlbnQgJiYgKF9jdXJyZW50IT10aGlzKSAmJiBfY3VycmVudC5kaXNtaXNzKClcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW46dHJ1ZX0pXG4gICAgICAgICAgICBfY3VycmVudD10aGlzXG4gICAgICAgIH1cblxuICAgICAgICBkaXNtaXNzKCl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLm9uRGlzbWlzcylcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uRGlzbWlzcygpXG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW46ZmFsc2V9KVxuICAgICAgICAgICAgX2N1cnJlbnQ9bnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIENvbW1hbmQ9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgdmFyIHtwcmltYXJ5LCBvblNlbGVjdCwgYWN0aW9uLCBsYWJlbCwgaWNvbjpJY29uPURlZmF1bHRJY29uLCBjaGlsZHJlbn09dGhpcy5wcm9wc1xuICAgICAgICAgICAgdmFyIHByb3BzPXt9XG4gICAgICAgICAgICBpZihwcmltYXJ5KVxuICAgICAgICAgICAgICAgIHByb3BzLmNsYXNzTmFtZT1cInByaW1hcnlcIlxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IHsuLi5wcm9wc30+XG4gICAgICAgICAgICAgICAgICAgIDxhIHN0eWxlPXt7Y3Vyc29yOidkZWZhdWx0J319XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSk9Pm9uU2VsZWN0KGFjdGlvbixlKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Y2VudGVyPjxJY29uLz48L2NlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjZW50ZXIgc3R5bGU9e3tmb250U2l6ZTonc21hbGxlcid9fT57bGFiZWx8fGFjdGlvbn08L2NlbnRlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgQ29tbWVudD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICByZXR1cm4gKDxDb21tYW5kQmFyLkNvbW1hbmQgbGFiZWw9XCJDb21tZW50XCIgb25TZWxlY3Q9eygpPT50aGlzLm9uU2VsZWN0KCl9XG4gICAgICAgICAgICAgICAgaWNvbj17Q29tbWVudEljb259IHsuLi50aGlzLnByb3BzfS8+KVxuICAgICAgICB9XG5cbiAgICAgICAgb25TZWxlY3QoKXtcbiAgICAgICAgICAgIHZhciB7dHlwZTp7X25hbWV9LCBtb2RlbDp7X2lkfX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBjb21tZW50LyR7X25hbWV9LyR7X2lkfWApXG4gICAgICAgIH1cblxuICAgICAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbiAgICAgICAgc3RhdGljIHByb3BUeXBlcz17XG4gICAgICAgICAgICB0eXBlOlJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtb2RlbDpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgU2hhcmU9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgcmV0dXJuICg8Q29tbWFuZEJhci5Db21tYW5kIGxhYmVsPVwiU2hhcmVcIiBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIGljb249e1NoYXJlSWNvbn0gey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICBvblNlbGVjdCgpe1xuICAgICAgICAgICAgdmFyIHttZXNzYWdlfT10aGlzLnByb3BzXG4gICAgICAgICAgICBpZih0eXBlb2YobWVzc2FnZSk9PSdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgbWVzc2FnZT1tZXNzYWdlKClcbiAgICAgICAgICAgIFdlQ2hhdC5zaGFyZShtZXNzYWdlLG51bGwsZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgICAgICAgICBNZXNzYWdlci5lcnJvcihyZWFzb24pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBwcm9wVHlwZXM9e21lc3NhZ2U6UmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxSZWFjdC5Qcm9wVHlwZXMuZnVuY10pfVxuICAgIH1cbn1cbiJdfQ==