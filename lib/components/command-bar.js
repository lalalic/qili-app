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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1hbmQtYmFyLmpzIl0sIm5hbWVzIjpbIl9jdXJyZW50IiwiQ29tbWFuZEJhciIsInByb3BzIiwib25TZWxlY3QiLCJhIiwiY2xhc3NOYW1lIiwicHJpbWFyeSIsIml0ZW1zIiwiZGlzcGF0Y2giLCJvdGhlcnMiLCJtYXAiLCJjb21tYW5kIiwiaSIsIkNvbW1hbmQiLCJEaWFsb2dDb21tYW5kIiwiRXJyb3IiLCJpc1ZhbGlkRWxlbWVudCIsImFjdGlvbiIsInRvTG93ZXJDYXNlIiwiaWNvbiIsImxhYmVsIiwiY29udGV4dCIsInJvdXRlciIsImdvQmFjayIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsInN0YXRlIiwib3BlbiIsImRpc21pc3MiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwicmVuZGVyQ29udGVudCIsImNoaWxkcmVuIiwic2V0U3RhdGUiLCJvbkRpc21pc3MiLCJsaW5rIiwiY3Vyc29yIiwiZm9udFNpemUiLCJDb21tZW50IiwiX25hbWUiLCJ0eXBlIiwiX2lkIiwibW9kZWwiLCJwdXNoIiwicHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiLCJTaGFyZSIsImJpbmQiLCJtZXNzYWdlIiwiV2VDaGF0Iiwic2hhcmUiLCJyZWFzb24iLCJlcnJvciIsIm9uZU9mVHlwZSIsIlNwYW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxRQUFKOztJQUVxQkMsVTs7Ozs7Ozs7Ozs7aUNBQ1Q7QUFBQTs7QUFBQSx5QkFDb0UsS0FBS0MsS0FEekU7QUFBQSx5Q0FDR0MsUUFESDtBQUFBLGdCQUNHQSxRQURILG1DQUNZO0FBQUEsdUJBQUdDLENBQUg7QUFBQSxhQURaO0FBQUEsZ0JBQ2tCQyxTQURsQixVQUNrQkEsU0FEbEI7QUFBQSxnQkFDNkJDLE9BRDdCLFVBQzZCQSxPQUQ3QjtBQUFBLHNDQUNzQ0MsS0FEdEM7QUFBQSxnQkFDc0NBLEtBRHRDLGdDQUM0QyxFQUQ1QztBQUFBLGdCQUMrQ0MsUUFEL0MsVUFDK0NBLFFBRC9DO0FBQUEsZ0JBQzREQyxNQUQ1RDs7QUFFSixtQkFDSTtBQUFBO0FBQUEsMkJBQUsseUJBQXVCSixTQUE1QixJQUE2Q0ksTUFBN0M7QUFFSUYsc0JBQU1HLEdBQU4sQ0FBVSxVQUFDQyxPQUFELEVBQVNDLENBQVQsRUFBYTtBQUNuQix3QkFBR0QsbUJBQW1CVixXQUFXWSxPQUFqQyxFQUNJLE9BQU9GLE9BQVA7O0FBRUosd0JBQUdBLG1CQUFtQlYsV0FBV2EsYUFBakMsRUFDSSxNQUFNLElBQUlDLEtBQUosQ0FBVSxvREFBVixDQUFOOztBQUVKLHdCQUFHLGdCQUFNQyxjQUFOLENBQXFCTCxPQUFyQixDQUFILEVBQWlDO0FBQzdCLCtCQUNJO0FBQUE7QUFBQSw4QkFBSyxLQUFLQyxHQUFWO0FBQ0tEO0FBREwseUJBREo7QUFLSDs7QUFFRCx3QkFBRyxPQUFPQSxPQUFQLElBQWlCLFFBQXBCLEVBQ0lBLFVBQVEsRUFBQ00sUUFBT04sT0FBUixFQUFSOztBQUVKLHdCQUFHQSxRQUFRTSxNQUFSLENBQWVDLFdBQWYsTUFBOEIsTUFBakMsRUFBd0M7QUFDcENQLGdDQUFRUSxJQUFSLEdBQWEsZ0VBQWI7QUFDQSw0QkFBRyxDQUFDUixRQUFRUyxLQUFaLEVBQ0lULFFBQVFTLEtBQVIsR0FBYyxJQUFkO0FBQ0pULGdDQUFRUixRQUFSLEdBQWlCLFlBQUk7QUFBQyxtQ0FBS2tCLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsTUFBcEI7QUFBNkIseUJBQW5EO0FBQ0g7O0FBRUQsd0JBQUdaLFFBQVFNLE1BQVIsQ0FBZUMsV0FBZixNQUE4QixTQUE5QixJQUEyQyxDQUFDUCxRQUFRUSxJQUF2RCxFQUE0RDtBQUN4RCw0QkFBRyxDQUFDUixRQUFRUyxLQUFaLEVBQ0lULFFBQVFTLEtBQVIsR0FBYyxJQUFkO0FBQ0pULGdDQUFRUSxJQUFSLEdBQWEsc0RBQWI7QUFDSDs7QUFFRCx3QkFBR1IsUUFBUU0sTUFBUixDQUFlQyxXQUFmLE1BQThCLE1BQTlCLElBQXdDLENBQUNQLFFBQVFRLElBQXBELEVBQXlEO0FBQ3JEUixnQ0FBUVEsSUFBUixHQUFhLG1EQUFiO0FBQ0EsNEJBQUcsQ0FBQ1IsUUFBUVMsS0FBWixFQUNJVCxRQUFRUyxLQUFSLEdBQWMsSUFBZDtBQUNQOztBQUdELDJCQUNJLDhCQUFDLFVBQUQsQ0FBWSxPQUFaLGFBQW9CLEtBQUtULFFBQVFNLE1BQWpDO0FBQ0ksaUNBQVNOLFFBQVFNLE1BQVIsSUFBZ0JYLE9BRDdCO0FBRUksa0NBQVVILFFBRmQsSUFFNEJRLE9BRjVCLEVBREo7QUFLSCxpQkEzQ0Q7QUFGSixhQURKO0FBa0RIOzs7Ozs7QUFyRGdCVixVLENBc0RWdUIsWSxHQUFhLEVBQUNGLFFBQU8sZ0JBQU1HLFNBQU4sQ0FBZ0JDLE1BQXhCLEU7O0FBdERIekIsVSxDQXdEVmEsYTs7O0FBQ0gsb0JBQVlaLEtBQVosRUFBa0I7QUFBQTs7QUFBQSxxSEFDUkEsS0FEUTs7QUFFZCxlQUFLeUIsS0FBTCxHQUFXLEVBQUNDLE1BQUssS0FBTixFQUFYO0FBRmM7QUFHakI7Ozs7aUNBQ087QUFBQTs7QUFBQSxnQkFDQ0EsSUFERCxHQUNPLEtBQUtELEtBRFosQ0FDQ0MsSUFERDs7QUFFSixtQkFDSTtBQUFBO0FBQUE7QUFDSSx5REFBa0NBLE9BQU8sRUFBUCxHQUFZLE1BQTlDLENBREo7QUFFSSxnQ0FBWTtBQUFBLCtCQUFJLE9BQUtDLE9BQUwsRUFBSjtBQUFBLHFCQUZoQjtBQUdJLHVEQUFLLFdBQVUsY0FBZixHQUhKO0FBSUk7QUFBQTtBQUFBLHNCQUFLLFdBQVUsUUFBZjtBQUNJO0FBQUE7QUFBQSwwQkFBSyxXQUFVLFNBQWY7QUFDSSx3Q0FBWSxvQkFBQ0MsQ0FBRCxFQUFLO0FBQUNBLGtDQUFFQyxlQUFGO0FBQW9CLDZCQUQxQztBQUVLLDZCQUFLQyxhQUFMO0FBRkw7QUFESjtBQUpKLGFBREo7QUFhSDs7O3dDQUVjO0FBQUEsZ0JBQ05DLFFBRE0sR0FDSSxLQUFLL0IsS0FEVCxDQUNOK0IsUUFETTs7QUFFWCxtQkFBT0EsUUFBUDtBQUNIOzs7K0NBRXFCO0FBQ2xCLGdCQUFHakMsV0FBUyxJQUFaLEVBQ0lBLFdBQVMsSUFBVDtBQUNQOzs7K0JBRUs7QUFDRkEsd0JBQWFBLFlBQVUsSUFBdkIsSUFBZ0NBLFNBQVM2QixPQUFULEVBQWhDO0FBQ0EsaUJBQUtLLFFBQUwsQ0FBYyxFQUFDTixNQUFLLElBQU4sRUFBZDtBQUNBNUIsdUJBQVMsSUFBVDtBQUNIOzs7a0NBRVE7QUFDTCxnQkFBRyxLQUFLRSxLQUFMLENBQVdpQyxTQUFkLEVBQ0ksS0FBS2pDLEtBQUwsQ0FBV2lDLFNBQVg7O0FBRUosaUJBQUtELFFBQUwsQ0FBYyxFQUFDTixNQUFLLEtBQU4sRUFBZDtBQUNBNUIsdUJBQVMsSUFBVDtBQUNIOzs7Ozs7QUFwR1lDLFUsQ0F1R1ZZLE87Ozs7Ozs7Ozs7O2lDQUNLO0FBQUEsMEJBQzRFLEtBQUtYLEtBRGpGO0FBQUEsZ0JBQ0dJLE9BREgsV0FDR0EsT0FESDtBQUFBLGdCQUNZSCxRQURaLFdBQ1lBLFFBRFo7QUFBQSxnQkFDc0JjLE1BRHRCLFdBQ3NCQSxNQUR0QjtBQUFBLGdCQUM4QkcsS0FEOUIsV0FDOEJBLEtBRDlCO0FBQUEsdUNBQ3FDRCxJQURyQztBQUFBLGdCQUNxQ0EsSUFEckMsZ0NBQzJDLDZEQUQzQztBQUFBLGdCQUM0RGlCLElBRDVELFdBQzREQSxJQUQ1RDtBQUFBLGdCQUNrRUgsUUFEbEUsV0FDa0VBLFFBRGxFOztBQUVKLGdCQUFJL0IsUUFBTSxFQUFWO0FBQ0EsZ0JBQUcsQ0FBQ2tDLElBQUosRUFBUztBQUNqQixvQkFBRzlCLE9BQUgsRUFDQ0osTUFBTUcsU0FBTixHQUFnQixTQUFoQjs7QUFFRCx1QkFDQztBQUFBO0FBQVNILHlCQUFUO0FBQ0M7QUFBQTtBQUFBLDBCQUFNLE9BQU8sRUFBQ21DLFFBQU8sU0FBUixFQUFiO0FBQ0MscUNBQVM7QUFBQSx1Q0FBR2xDLFNBQVNjLE1BQVQsRUFBZ0JhLENBQWhCLENBQUg7QUFBQSw2QkFEVjtBQUVDO0FBQUE7QUFBQTtBQUFTWDtBQUFULHlCQUZEO0FBR0M7QUFBQTtBQUFBLDhCQUFRLE9BQU8sRUFBQ21CLFVBQVMsU0FBVixFQUFmO0FBQXNDbEIscUNBQU9IO0FBQTdDO0FBSEQscUJBREQ7QUFNRWdCO0FBTkYsaUJBREQ7QUFVQSxhQWRRLE1BY0o7QUFDSix1QkFDQztBQUFBO0FBQVMvQix5QkFBVDtBQUNDO0FBQUE7QUFBQSwwQkFBTSxPQUFPLEVBQUNtQyxRQUFPLFNBQVIsRUFBYixFQUFpQyxJQUFJRCxJQUFyQyxFQUEyQyxpQkFBZ0IsU0FBM0Q7QUFDQywrQ0FBbUIsSUFEcEI7QUFFQyxxQ0FBUztBQUFBLHVDQUFHakMsU0FBU2MsTUFBVCxFQUFnQmEsQ0FBaEIsQ0FBSDtBQUFBLDZCQUZWO0FBR0M7QUFBQTtBQUFBO0FBQVNYO0FBQVQseUJBSEQ7QUFJQztBQUFBO0FBQUEsOEJBQVEsT0FBTyxFQUFDbUIsVUFBUyxTQUFWLEVBQWY7QUFBc0NsQixxQ0FBT0g7QUFBN0M7QUFKRCxxQkFERDtBQU9FZ0I7QUFQRixpQkFERDtBQVdBO0FBQ0s7Ozs7OztBQXRJWWhDLFUsQ0F5SVZzQyxPOzs7Ozs7Ozs7OztpQ0FDSztBQUFBLDBCQUNxQixLQUFLckMsS0FEMUI7QUFBQSxnQkFDQXNDLEtBREEsV0FDTkMsSUFETSxDQUNBRCxLQURBO0FBQUEsZ0JBQ2VFLEdBRGYsV0FDUUMsS0FEUixDQUNlRCxHQURmO0FBQUEsZ0JBRU5wQixNQUZNLEdBRUUsS0FBS0QsT0FGUCxDQUVOQyxNQUZNOztBQUdKLG1CQUFRLDhCQUFDLFVBQUQsQ0FBWSxPQUFaO0FBQ2hCLHVCQUFNLGNBRFU7QUFFaEIsMEJBQVU7QUFBQSwyQkFBR0EsT0FBT3NCLElBQVAsZUFBd0JKLEtBQXhCLFNBQWlDRSxHQUFqQyxDQUFIO0FBQUEsaUJBRk07QUFHSixzQkFBTTtBQUhGLGVBSVosS0FBS3hDLEtBSk8sRUFBUjtBQUtIOzs7OzZCQUVNc0IsWSxHQUFhLEVBQUNGLFFBQU8sZ0JBQU1HLFNBQU4sQ0FBZ0JDLE1BQXhCLEUsVUFDYm1CLFMsR0FBVTtBQUNiSixVQUFLLGdCQUFNaEIsU0FBTixDQUFnQnFCLElBQWhCLENBQXFCQyxVQURiO0FBRWJKLFdBQU0sZ0JBQU1sQixTQUFOLENBQWdCQyxNQUFoQixDQUF1QnFCO0FBRmhCLEM7QUFySko5QyxVLENBMkpWK0MsSzs7Ozs7Ozs7Ozs7aUNBQ0s7QUFDSixtQkFBUSw4QkFBQyxVQUFELENBQVksT0FBWjtBQUNoQix1QkFBTSxvQkFEVTtBQUVoQiwwQkFBVSxLQUFLN0MsUUFBTCxDQUFjOEMsSUFBZCxDQUFtQixJQUFuQixDQUZNO0FBR0osc0JBQU07QUFIRixlQUlaLEtBQUsvQyxLQUpPLEVBQVI7QUFLSDs7O21DQUVTO0FBQUEsZ0JBQ0RnRCxPQURDLEdBQ1EsS0FBS2hELEtBRGIsQ0FDRGdELE9BREM7O0FBRU4sZ0JBQUcsT0FBT0EsT0FBUCxJQUFpQixVQUFwQixFQUNJQSxVQUFRQSxTQUFSO0FBQ0pDLG1CQUFPQyxLQUFQLENBQWFGLE9BQWIsRUFBcUIsSUFBckIsRUFBMEIsVUFBU0csTUFBVCxFQUFnQjtBQUN0QyxtQ0FBU0MsS0FBVCxDQUFlRCxNQUFmO0FBQ0gsYUFGRDtBQUdIOzs7OzZCQUNNUixTLEdBQVUsRUFBQ0ssU0FBUSxnQkFBTXpCLFNBQU4sQ0FBZ0I4QixTQUFoQixDQUEwQixDQUFDLGdCQUFNOUIsU0FBTixDQUFnQkMsTUFBakIsRUFBd0IsZ0JBQU1ELFNBQU4sQ0FBZ0JxQixJQUF4QyxDQUExQixDQUFULEU7a0JBNUtKN0MsVTs7O0FBaUxyQixJQUFNdUQsT0FBSyxTQUFMQSxJQUFLO0FBQUEsV0FBUSxzQ0FBVXRELEtBQVYsQ0FBUjtBQUFBLENBQVgiLCJmaWxlIjoiY29tbWFuZC1iYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQge1N2Z0ljb24sRW5oYW5jZWRCdXR0b24sUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5cclxuaW1wb3J0IFJlZnJlc2hJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9yZWZyZXNoXCJcclxuaW1wb3J0IERlZmF1bHRJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2Zhdm9yaXRlLWJvcmRlclwiXHJcbmltcG9ydCBIb21lSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9ob21lXCJcclxuaW1wb3J0IEJhY2tJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctbGVmdFwiXHJcbmltcG9ydCBDb21tZW50SWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vY29tbWVudFwiXHJcbmltcG9ydCBTaGFyZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvc2hhcmVcIlxyXG5pbXBvcnQgU2F2ZUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxyXG5pbXBvcnQgTWVzc2FnZXIgZnJvbSAnLi9tZXNzYWdlcidcclxuXHJcbnZhciBfY3VycmVudDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1hbmRCYXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7b25TZWxlY3Q9YT0+YSwgY2xhc3NOYW1lLCBwcmltYXJ5LCBpdGVtcz1bXSxkaXNwYXRjaCwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Bjb21tYW5kcyAke2NsYXNzTmFtZX1gfSB7Li4ub3RoZXJzfT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbXMubWFwKChjb21tYW5kLGkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZCBpbnN0YW5jZW9mIENvbW1hbmRCYXIuQ29tbWFuZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZCBpbnN0YW5jZW9mIENvbW1hbmRCYXIuRGlhbG9nQ29tbWFuZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGxlYXNlIHVzZSBjb21tb24gY29tbWFuZCB0byB0cmlnZ2VyIERpYWxvZ0NvbW1hbmRcIilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoUmVhY3QuaXNWYWxpZEVsZW1lbnQoY29tbWFuZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2krK30+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbW1hbmR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mKGNvbW1hbmQpPT0nc3RyaW5nJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZD17YWN0aW9uOmNvbW1hbmR9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdiYWNrJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj08QmFja0ljb24vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighY29tbWFuZC5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQubGFiZWw9XCLlkI7pgIBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLm9uU2VsZWN0PSgpPT57dGhpcy5jb250ZXh0LnJvdXRlci5nb0JhY2soKX1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNvbW1hbmQuYWN0aW9uLnRvTG93ZXJDYXNlKCk9PSdyZWZyZXNoJyAmJiAhY29tbWFuZC5pY29uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWNvbW1hbmQubGFiZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kLmxhYmVsPVwi5pu05pawXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5pY29uPTxSZWZyZXNoSWNvbi8+XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihjb21tYW5kLmFjdGlvbi50b0xvd2VyQ2FzZSgpPT0nc2F2ZScgJiYgIWNvbW1hbmQuaWNvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuaWNvbj08U2F2ZUljb24vPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighY29tbWFuZC5sYWJlbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQubGFiZWw9XCLkv53lrZhcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyLkNvbW1hbmQga2V5PXtjb21tYW5kLmFjdGlvbn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e2NvbW1hbmQuYWN0aW9uPT1wcmltYXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e29uU2VsZWN0fSB7Li4uY29tbWFuZH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XHJcblxyXG4gICAgc3RhdGljIERpYWxvZ0NvbW1hbmQ9Y2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHJvcHMpe1xyXG4gICAgICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZT17b3BlbjpmYWxzZX1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyKCl7XHJcbiAgICAgICAgICAgIHZhciB7b3Blbn09dGhpcy5zdGF0ZVxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHBhZ2UgZGlhbG9nLWNvbW1hbmQgJHtvcGVuID8gXCJcIiA6IFwiaGlkZVwifWB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KCk9PnRoaXMuZGlzbWlzcygpfSA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdlIG92ZXJsYXlcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXlvdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA9eyhlKT0+e2Uuc3RvcFByb3BhZ2F0aW9uKCl9fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckNvbnRlbnQoKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyQ29udGVudCgpe1xyXG4gICAgICAgICAgICB2YXIge2NoaWxkcmVufT10aGlzLnByb3BzXHJcbiAgICAgICAgICAgIHJldHVybiBjaGlsZHJlblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcclxuICAgICAgICAgICAgaWYoX2N1cnJlbnQ9dGhpcylcclxuICAgICAgICAgICAgICAgIF9jdXJyZW50PW51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNob3coKXtcclxuICAgICAgICAgICAgX2N1cnJlbnQgJiYgKF9jdXJyZW50IT10aGlzKSAmJiBfY3VycmVudC5kaXNtaXNzKClcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7b3Blbjp0cnVlfSlcclxuICAgICAgICAgICAgX2N1cnJlbnQ9dGhpc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGlzbWlzcygpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLm9uRGlzbWlzcylcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25EaXNtaXNzKClcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe29wZW46ZmFsc2V9KVxyXG4gICAgICAgICAgICBfY3VycmVudD1udWxsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBDb21tYW5kPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgICAgIHJlbmRlcigpe1xyXG4gICAgICAgICAgICBjb25zdCB7cHJpbWFyeSwgb25TZWxlY3QsIGFjdGlvbiwgbGFiZWwsIGljb249KDxEZWZhdWx0SWNvbi8+KSwgbGluaywgY2hpbGRyZW59PXRoaXMucHJvcHNcclxuICAgICAgICAgICAgdmFyIHByb3BzPXt9XHJcbiAgICAgICAgICAgIGlmKCFsaW5rKXtcclxuXHRcdFx0XHRpZihwcmltYXJ5KVxyXG5cdFx0XHRcdFx0cHJvcHMuY2xhc3NOYW1lPVwicHJpbWFyeVwiXHJcblxyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8ZGl2IHsuLi5wcm9wc30+XHJcblx0XHRcdFx0XHRcdDxzcGFuIHN0eWxlPXt7Y3Vyc29yOidkZWZhdWx0J319XHJcblx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+b25TZWxlY3QoYWN0aW9uLGUpfT5cclxuXHRcdFx0XHRcdFx0XHQ8Y2VudGVyPntpY29ufTwvY2VudGVyPlxyXG5cdFx0XHRcdFx0XHRcdDxjZW50ZXIgc3R5bGU9e3tmb250U2l6ZTonc21hbGxlcid9fT57bGFiZWx8fGFjdGlvbn08L2NlbnRlcj5cclxuXHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHR7Y2hpbGRyZW59XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHQ8ZGl2IHsuLi5wcm9wc30+XHJcblx0XHRcdFx0XHRcdDxMaW5rIHN0eWxlPXt7Y3Vyc29yOidkZWZhdWx0J319IHRvPXtsaW5rfSBhY3RpdmVDbGFzc05hbWU9XCJwcmltYXJ5XCJcclxuXHRcdFx0XHRcdFx0XHRvbmx5QWN0aXZlT25JbmRleD17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT5vblNlbGVjdChhY3Rpb24sZSl9PlxyXG5cdFx0XHRcdFx0XHRcdDxjZW50ZXI+e2ljb259PC9jZW50ZXI+XHJcblx0XHRcdFx0XHRcdFx0PGNlbnRlciBzdHlsZT17e2ZvbnRTaXplOidzbWFsbGVyJ319PntsYWJlbHx8YWN0aW9ufTwvY2VudGVyPlxyXG5cdFx0XHRcdFx0XHQ8L0xpbms+XHJcblx0XHRcdFx0XHRcdHtjaGlsZHJlbn1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgQ29tbWVudD1jbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuICAgICAgICByZW5kZXIoKXtcclxuXHRcdFx0Y29uc3Qge3R5cGU6e19uYW1lfSwgbW9kZWw6e19pZH19PXRoaXMucHJvcHNcclxuXHRcdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XHJcbiAgICAgICAgICAgIHJldHVybiAoPENvbW1hbmRCYXIuQ29tbWFuZFxyXG5cdFx0XHRcdGxhYmVsPVwi6K+E6K66XCJcclxuXHRcdFx0XHRvblNlbGVjdD17YT0+cm91dGVyLnB1c2goYC9jb21tZW50LyR7X25hbWV9LyR7X2lkfWApfVxyXG4gICAgICAgICAgICAgICAgaWNvbj17PENvbW1lbnRJY29uLz59XHJcblx0XHRcdFx0ey4uLnRoaXMucHJvcHN9Lz4pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cclxuICAgICAgICBzdGF0aWMgcHJvcFR5cGVzPXtcclxuICAgICAgICAgICAgdHlwZTpSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBtb2RlbDpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIFNoYXJlPWNsYXNzIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgICAgIHJlbmRlcigpe1xyXG4gICAgICAgICAgICByZXR1cm4gKDxDb21tYW5kQmFyLkNvbW1hbmRcclxuXHRcdFx0XHRsYWJlbD1cIuaci+WPi+WciFwiXHJcblx0XHRcdFx0b25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgICAgIGljb249ezxTaGFyZUljb24vPn1cclxuXHRcdFx0XHR7Li4udGhpcy5wcm9wc30vPilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uU2VsZWN0KCl7XHJcbiAgICAgICAgICAgIHZhciB7bWVzc2FnZX09dGhpcy5wcm9wc1xyXG4gICAgICAgICAgICBpZih0eXBlb2YobWVzc2FnZSk9PSdmdW5jdGlvbicpXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlPW1lc3NhZ2UoKVxyXG4gICAgICAgICAgICBXZUNoYXQuc2hhcmUobWVzc2FnZSxudWxsLGZ1bmN0aW9uKHJlYXNvbil7XHJcbiAgICAgICAgICAgICAgICBNZXNzYWdlci5lcnJvcihyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBwcm9wVHlwZXM9e21lc3NhZ2U6UmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxSZWFjdC5Qcm9wVHlwZXMuZnVuY10pfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuY29uc3QgU3Bhbj1wcm9wcz0+KDxzcGFuIHsuLi5wcm9wc30vPilcclxuIl19