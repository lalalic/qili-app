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

            debugger;
            if (typeof message == 'function') message = message();
            WeChat.share(message, null, function (reason) {
                _messager2.default.error(reason);
            });
        }
    }]);

    return _class4;
}(_react.Component), _class4.propTypes = {
    message: _react2.default.PropTypes.oneOfType(_react2.default.PropTypes.object, _react2.default.PropTypes.func)
}, _temp2);
exports.default = CommandBar;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQUo7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDs7O3lCQUNtRCxLQUFLLEtBQUwsQ0FEbkQ7Z0JBQ0MsMkJBREQ7Z0JBQ1csNkJBRFg7Z0JBQ3NCLHlCQUR0QjtzQ0FDK0IsTUFEL0I7Z0JBQytCLHFDQUFNLGtCQURyQztBQUNBLGdCQUEyQyx3RkFBM0MsQ0FEQTtBQUVBLG9CQUFFLENBQUYsQ0FGQTtBQUdBLDJCQUFTLE1BQU0sR0FBTixDQUFVLFVBQUMsT0FBRCxFQUFXO0FBQzFCLG9CQUFHLG1CQUFtQixXQUFXLE9BQVgsRUFDbEIsT0FBTyxPQUFQLENBREo7O0FBR0Esb0JBQUcsbUJBQW1CLFdBQVcsYUFBWCxFQUNsQixNQUFNLElBQUksS0FBSixDQUFVLG9EQUFWLENBQU4sQ0FESjs7QUFHQSxvQkFBRyxnQkFBTSxjQUFOLENBQXFCLE9BQXJCLENBQUgsRUFBaUM7QUFDN0IsMkJBQ0k7OzBCQUFLLEtBQUssR0FBTCxFQUFMO3dCQUNLLE9BREw7cUJBREosQ0FENkI7aUJBQWpDOztBQVFBLG9CQUFHLE9BQU8sT0FBUCxJQUFpQixRQUFqQixFQUNDLFVBQVEsRUFBQyxRQUFPLE9BQVAsRUFBVCxDQURKOztBQUdBLG9CQUFHLFFBQVEsTUFBUixDQUFlLFdBQWYsTUFBOEIsTUFBOUIsRUFBcUM7QUFDcEMsNEJBQVEsSUFBUiwrQkFEb0M7QUFFcEMsNEJBQVEsUUFBUixHQUFpQixZQUFJO0FBQUMsK0JBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsTUFBcEIsR0FBRDtxQkFBSixDQUZtQjtpQkFBeEM7O0FBS0Esb0JBQUcsUUFBUSxNQUFSLENBQWUsV0FBZixNQUE4QixTQUE5QixJQUEyQyxDQUFDLFFBQVEsSUFBUixFQUMzQyxRQUFRLElBQVIscUJBREo7O0FBR0Esb0JBQUcsUUFBUSxNQUFSLENBQWUsV0FBZixNQUE4QixNQUE5QixJQUF3QyxDQUFDLFFBQVEsSUFBUixFQUN4QyxRQUFRLElBQVIsa0JBREo7O0FBR0EsdUJBQ0ksOEJBQUMsV0FBVyxPQUFaLGFBQW9CLEtBQUssUUFBUSxNQUFSO0FBQ3JCLDZCQUFTLFFBQVEsTUFBUixJQUFnQixPQUFoQjtBQUNULDhCQUFVLFFBQVYsSUFBd0IsUUFGNUIsQ0FESixDQTdCMEI7YUFBWCxDQUFuQixDQUhBOztBQXVDSixtQkFDSTs7MkJBQUsseUJBQXVCLFNBQXZCLElBQXdDLE9BQTdDO2dCQUNLLFFBREw7YUFESixDQXZDSTs7OztXQURTOzs7V0E4Q1YsZUFBYSxFQUFDLFFBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUFoQjs7QUE5Q1gsV0FnRFY7OztBQUNILG9CQUFZLEtBQVosRUFBa0I7OzsrRkFDUixRQURROztBQUVkLGVBQUssS0FBTCxHQUFXLEVBQUMsTUFBSyxLQUFMLEVBQVosQ0FGYzs7S0FBbEI7Ozs7aUNBSVE7OztnQkFDQyxPQUFNLEtBQUssS0FBTCxDQUFOLEtBREQ7O0FBRUosbUJBQ0k7OztBQUNJLHlEQUFrQyxPQUFPLEVBQVAsR0FBWSxNQUFaLENBQWxDO0FBQ0EsZ0NBQVk7K0JBQUksT0FBSyxPQUFMO3FCQUFKLEVBRmhCO2dCQUdJLHVDQUFLLFdBQVUsY0FBVixFQUFMLENBSEo7Z0JBSUk7O3NCQUFLLFdBQVUsUUFBVixFQUFMO29CQUNJOzswQkFBSyxXQUFVLFNBQVY7QUFDRCx3Q0FBWSxvQkFBQyxDQUFELEVBQUs7QUFBQyxrQ0FBRSxlQUFGLEdBQUQ7NkJBQUwsRUFEaEI7d0JBRUssS0FBSyxhQUFMLEVBRkw7cUJBREo7aUJBSko7YUFESixDQUZJOzs7O3dDQWlCTztnQkFDTixXQUFVLEtBQUssS0FBTCxDQUFWLFNBRE07O0FBRVgsbUJBQU8sUUFBUCxDQUZXOzs7OytDQUtPO0FBQ2xCLGdCQUFHLFdBQVMsSUFBVCxFQUNDLFdBQVMsSUFBVCxDQURKOzs7OytCQUlFO0FBQ0Ysd0JBQWEsWUFBVSxJQUFWLElBQW1CLFNBQVMsT0FBVCxFQUFoQyxDQURFO0FBRUYsaUJBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxJQUFMLEVBQWYsRUFGRTtBQUdGLHVCQUFTLElBQVQsQ0FIRTs7OztrQ0FNRztBQUNMLGdCQUFHLEtBQUssS0FBTCxDQUFXLFNBQVgsRUFDQyxLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBREo7O0FBR0EsaUJBQUssUUFBTCxDQUFjLEVBQUMsTUFBSyxLQUFMLEVBQWYsRUFKSztBQUtMLHVCQUFTLElBQVQsQ0FMSzs7Ozs7OztBQXRGSSxXQStGVjs7Ozs7Ozs7Ozs7aUNBQ0s7MEJBQ29FLEtBQUssS0FBTCxDQURwRTtnQkFDQywwQkFERDtnQkFDVSw0QkFEVjtnQkFDb0Isd0JBRHBCO2dCQUM0QixzQkFENUI7dUNBQ21DLEtBRG5DO2dCQUN3Qyw0RUFEeEM7Z0JBQzBELDRCQUQxRDs7QUFFSixnQkFBSSxRQUFNLEVBQU4sQ0FGQTtBQUdKLGdCQUFHLE9BQUgsRUFDSSxNQUFNLFNBQU4sR0FBZ0IsU0FBaEIsQ0FESjtBQUVBLG1CQUNJOztnQkFBUyxLQUFUO2dCQUNJOztzQkFBRyxPQUFPLEVBQUMsUUFBTyxTQUFQLEVBQVI7QUFDQyxpQ0FBUyxpQkFBQyxDQUFEO21DQUFLLFNBQVMsTUFBVCxFQUFnQixDQUFoQjt5QkFBTCxFQURiO29CQUVJOzs7d0JBQVEsOEJBQUMsSUFBRCxPQUFSO3FCQUZKO29CQUdJOzswQkFBUSxPQUFPLEVBQUMsVUFBUyxTQUFULEVBQVIsRUFBUjt3QkFBc0MsU0FBTyxNQUFQO3FCQUgxQztpQkFESjtnQkFNSyxRQU5MO2FBREosQ0FMSTs7Ozs7OztBQWhHSyxXQWtIVjs7Ozs7Ozs7Ozs7aUNBQ0s7OztBQUNKLG1CQUFRLDhCQUFDLFdBQVcsT0FBWixhQUFvQixPQUFNLFNBQU4sRUFBZ0IsVUFBVTsyQkFBSSxPQUFLLFFBQUw7aUJBQUo7QUFDbEQsMkNBQXVCLEtBQUssS0FBTCxDQURuQixDQUFSLENBREk7Ozs7bUNBS0U7MEJBQzBCLEtBQUssS0FBTCxDQUQxQjtnQkFDSyxnQkFBTixLQUFNLE1BREw7Z0JBQ29CLGNBQVAsTUFBTyxJQURwQjs7QUFFTixpQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixjQUFvQyxjQUFTLEdBQTdDLEVBRk07Ozs7OzZCQUtILGVBQWEsRUFBQyxRQUFPLGdCQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsWUFDckIsWUFBVTtBQUNiLFVBQUssZ0JBQU0sU0FBTixDQUFnQixJQUFoQixDQUFxQixVQUFyQjtBQUNMLFdBQU0sZ0JBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2Qjs7QUFoSUcsV0FtSVY7Ozs7Ozs7Ozs7O2lDQUNLO0FBQ0osbUJBQVEsOEJBQUMsV0FBVyxPQUFaLGFBQW9CLE9BQU0sT0FBTixFQUFjLFVBQVUsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFWO0FBQ3RDLHlDQUFxQixLQUFLLEtBQUwsQ0FEakIsQ0FBUixDQURJOzs7O21DQUtFO2dCQUNELFVBQVMsS0FBSyxLQUFMLENBQVQsUUFEQzs7QUFFTixxQkFGTTtBQUdOLGdCQUFHLE9BQU8sT0FBUCxJQUFpQixVQUFqQixFQUNDLFVBQVEsU0FBUixDQURKO0FBRUEsbUJBQU8sS0FBUCxDQUFhLE9BQWIsRUFBcUIsSUFBckIsRUFBMEIsVUFBUyxNQUFULEVBQWdCO0FBQ3RDLG1DQUFTLEtBQVQsQ0FBZSxNQUFmLEVBRHNDO2FBQWhCLENBQTFCLENBTE07Ozs7OzZCQVNILFlBQVU7QUFDYixhQUFRLGdCQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsQ0FBMEIsZ0JBQU0sU0FBTixDQUFnQixNQUFoQixFQUF1QixnQkFBTSxTQUFOLENBQWdCLElBQWhCLENBQXpEOztrQkFuSlMiLCJmaWxlIjoiY29tbWFuZC1iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtTdmdJY29uLEVuaGFuY2VkQnV0dG9ufSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCBSZWZyZXNoSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vcmVmcmVzaFwiXG5pbXBvcnQgRGVmYXVsdEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vZmF2b3JpdGUtYm9yZGVyXCJcbmltcG9ydCBIb21lSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9ob21lXCJcbmltcG9ydCBCYWNrSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LWxlZnRcIlxuaW1wb3J0IENvbW1lbnRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9jb21tZW50XCJcbmltcG9ydCBTaGFyZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvc2hhcmVcIlxuaW1wb3J0IFNhdmVJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9zYXZlXCJcbmltcG9ydCBNZXNzYWdlciBmcm9tICcuL21lc3NhZ2VyJ1xuXG52YXIgX2N1cnJlbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRCYXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7b25TZWxlY3QsIGNsYXNzTmFtZSwgcHJpbWFyeSwgaXRlbXM9W10sLi4ub3RoZXJzfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgaT0wLFxuICAgICAgICAgICAgY29tbWFuZHM9aXRlbXMubWFwKChjb21tYW5kKT0+e1xuICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQgaW5zdGFuY2VvZiBDb21tYW5kQmFyLkNvbW1hbmQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kXG5cbiAgICAgICAgICAgICAgICBpZihjb21tYW5kIGluc3RhbmNlb2YgQ29tbWFuZEJhci5EaWFsb2dDb21tYW5kKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgdXNlIGNvbW1vbiBjb21tYW5kIHRvIHRyaWdnZXIgRGlhbG9nQ29tbWFuZFwiKVxuXG4gICAgICAgICAgICAgICAgaWYoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY29tbWFuZCkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2krK30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbW1hbmR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihjb21tYW5kKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ9e2FjdGlvbjpjb21tYW5kfVxuXG4gICAgICAgICAgICAgICAgaWYoY29tbWFuZC5hY3Rpb24udG9Mb3dlckNhc2UoKT09J2JhY2snKXtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPUJhY2tJY29uXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQub25TZWxlY3Q9KCk9Pnt0aGlzLmNvbnRleHQucm91dGVyLmdvQmFjaygpfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdyZWZyZXNoJyAmJiAhY29tbWFuZC5pY29uKVxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249UmVmcmVzaEljb25cblxuICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdzYXZlJyAmJiAhY29tbWFuZC5pY29uKVxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmljb249U2F2ZUljb25cblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1hbmQga2V5PXtjb21tYW5kLmFjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e2NvbW1hbmQuYWN0aW9uPT1wcmltYXJ5fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fSB7Li4uY29tbWFuZH0vPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgY29tbWFuZHMgJHtjbGFzc05hbWV9YH0gey4uLm90aGVyc30+XG4gICAgICAgICAgICAgICAge2NvbW1hbmRzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbiAgICBzdGF0aWMgRGlhbG9nQ29tbWFuZD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgICAgICB0aGlzLnN0YXRlPXtvcGVuOmZhbHNlfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcigpe1xuICAgICAgICAgICAgdmFyIHtvcGVufT10aGlzLnN0YXRlXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcGFnZSBkaWFsb2ctY29tbWFuZCAke29wZW4gPyBcIlwiIDogXCJoaWRlXCJ9YH1cbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KCk9PnRoaXMuZGlzbWlzcygpfSA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZSBvdmVybGF5XCIvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxheW91dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoZSk9PntlLnN0b3BQcm9wYWdhdGlvbigpfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICAgICAgdmFyIHtjaGlsZHJlbn09dGhpcy5wcm9wc1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuXG4gICAgICAgIH1cblxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICAgICAgaWYoX2N1cnJlbnQ9dGhpcylcbiAgICAgICAgICAgICAgICBfY3VycmVudD1udWxsXG4gICAgICAgIH1cblxuICAgICAgICBzaG93KCl7XG4gICAgICAgICAgICBfY3VycmVudCAmJiAoX2N1cnJlbnQhPXRoaXMpICYmIF9jdXJyZW50LmRpc21pc3MoKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3Blbjp0cnVlfSlcbiAgICAgICAgICAgIF9jdXJyZW50PXRoaXNcbiAgICAgICAgfVxuXG4gICAgICAgIGRpc21pc3MoKXtcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMub25EaXNtaXNzKVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25EaXNtaXNzKClcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3BlbjpmYWxzZX0pXG4gICAgICAgICAgICBfY3VycmVudD1udWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgQ29tbWFuZD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICB2YXIge3ByaW1hcnksIG9uU2VsZWN0LCBhY3Rpb24sIGxhYmVsLCBpY29uOkljb249RGVmYXVsdEljb24sIGNoaWxkcmVufT10aGlzLnByb3BzXG4gICAgICAgICAgICB2YXIgcHJvcHM9e31cbiAgICAgICAgICAgIGlmKHByaW1hcnkpXG4gICAgICAgICAgICAgICAgcHJvcHMuY2xhc3NOYW1lPVwicHJpbWFyeVwiXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgey4uLnByb3BzfT5cbiAgICAgICAgICAgICAgICAgICAgPGEgc3R5bGU9e3tjdXJzb3I6J2RlZmF1bHQnfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKT0+b25TZWxlY3QoYWN0aW9uLGUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjZW50ZXI+PEljb24vPjwvY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGNlbnRlciBzdHlsZT17e2ZvbnRTaXplOidzbWFsbGVyJ319PntsYWJlbHx8YWN0aW9ufTwvY2VudGVyPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBDb21tZW50PWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICByZW5kZXIoKXtcbiAgICAgICAgICAgIHJldHVybiAoPENvbW1hbmRCYXIuQ29tbWFuZCBsYWJlbD1cIkNvbW1lbnRcIiBvblNlbGVjdD17KCk9PnRoaXMub25TZWxlY3QoKX1cbiAgICAgICAgICAgICAgICBpY29uPXtDb21tZW50SWNvbn0gey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgICAgIH1cblxuICAgICAgICBvblNlbGVjdCgpe1xuICAgICAgICAgICAgdmFyIHt0eXBlOntfbmFtZX0sIG1vZGVsOntfaWR9fT10aGlzLnByb3BzXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGNvbW1lbnQvJHtfbmFtZX0vJHtfaWR9YClcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuICAgICAgICBzdGF0aWMgcHJvcFR5cGVzPXtcbiAgICAgICAgICAgIHR5cGU6UmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG1vZGVsOlJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBTaGFyZT1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcbiAgICAgICAgcmVuZGVyKCl7XG4gICAgICAgICAgICByZXR1cm4gKDxDb21tYW5kQmFyLkNvbW1hbmQgbGFiZWw9XCJTaGFyZVwiIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgaWNvbj17U2hhcmVJY29ufSB7Li4udGhpcy5wcm9wc30vPilcbiAgICAgICAgfVxuXG4gICAgICAgIG9uU2VsZWN0KCl7XG4gICAgICAgICAgICB2YXIge21lc3NhZ2V9PXRoaXMucHJvcHNcbiAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICBpZih0eXBlb2YobWVzc2FnZSk9PSdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgbWVzc2FnZT1tZXNzYWdlKClcbiAgICAgICAgICAgIFdlQ2hhdC5zaGFyZShtZXNzYWdlLG51bGwsZnVuY3Rpb24ocmVhc29uKXtcbiAgICAgICAgICAgICAgICBNZXNzYWdlci5lcnJvcihyZWFzb24pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBwcm9wVHlwZXM9e1xuICAgICAgICAgICAgbWVzc2FnZTpSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFJlYWN0LlByb3BUeXBlcy5vYmplY3QsUmVhY3QuUHJvcFR5cGVzLmZ1bmMpXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=