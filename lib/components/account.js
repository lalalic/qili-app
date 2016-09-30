"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _settings = require("material-ui/svg-icons/action/settings");

var _settings2 = _interopRequireDefault(_settings);

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _list = require("./list");

var _list2 = _interopRequireDefault(_list);

var _photo = require("./photo");

var _photo2 = _interopRequireDefault(_photo);

var _user = require("../db/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var user = _user2.default.current,
                router = this.context.router,
                avatar;
            if (user.photo) avatar = _react2.default.createElement(_materialUi.Avatar, { src: user.photo });else {
                avatar = _react2.default.createElement(_photo2.default, {
                    onPhoto: function onPhoto(url) {
                        user.photo = url;_user2.default.upsert(user);
                    },
                    iconRatio: 2 / 3, width: 40, height: 40 });
            }

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _list2.default,
                    null,
                    _react2.default.createElement(_list2.default.Item, { primaryText: user.name || user.username,
                        leftAvatar: avatar,
                        rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
                        onClick: function onClick(e) {
                            return _this2.context.router.push('my/profile');
                        }
                    }),
                    _react2.default.createElement(_list2.default.Divider, { inset: true }),
                    this.more(),
                    _react2.default.createElement(_list2.default.Divider, { inset: true }),
                    _react2.default.createElement(_list2.default.Item, { primaryText: "设置",
                        leftIcon: _react2.default.createElement(_settings2.default, null),
                        rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
                        onClick: function onClick(e) {
                            return _this2.context.router.push('my/setting');
                        }
                    })
                )
            );
        }
    }, {
        key: "more",
        value: function more() {}
    }]);

    return _class;
}(_react.Component);

_class.contextTypes = {
    router: _react2.default.PropTypes.object
};
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FjY291bnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBR1k7OztBQUNKLGdCQUFJLE9BQUssZUFBSyxPQUFMO2dCQUNiLFNBQU8sS0FBSyxPQUFMLENBQWEsTUFBYjtnQkFDUCxNQUZJLENBREk7QUFJSixnQkFBRyxLQUFLLEtBQUwsRUFDQyxTQUFPLG9EQUFRLEtBQUssS0FBSyxLQUFMLEVBQWIsQ0FBUCxDQURKLEtBRUs7QUFDRCx5QkFBTztBQUNILDZCQUFTLGlCQUFDLEdBQUQsRUFBTztBQUFDLDZCQUFLLEtBQUwsR0FBVyxHQUFYLENBQUQsY0FBZ0IsQ0FBSyxNQUFMLENBQVksSUFBWixFQUFoQjtxQkFBUDtBQUNULCtCQUFXLElBQUUsQ0FBRixFQUFLLE9BQU8sRUFBUCxFQUFXLFFBQVEsRUFBUixFQUZ4QixDQUFQLENBREM7YUFGTDs7QUFRQSxtQkFDSTs7O2dCQUNJOzs7b0JBQ0ksNkNBQU0sSUFBTixJQUFXLGFBQWEsS0FBSyxJQUFMLElBQVcsS0FBSyxRQUFMO0FBQy9CLG9DQUFZLE1BQVo7QUFDQSxtQ0FBVyxpRUFBWDtBQUNsQixpQ0FBUzttQ0FBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLFlBQXpCO3lCQUFIO3FCQUhLLENBREo7b0JBT0ksNkNBQU0sT0FBTixJQUFjLE9BQU8sSUFBUCxFQUFkLENBUEo7b0JBU1YsS0FBSyxJQUFMLEVBVFU7b0JBV0ksNkNBQU0sT0FBTixJQUFjLE9BQU8sSUFBUCxFQUFkLENBWEo7b0JBYUksNkNBQU0sSUFBTixJQUFXLGFBQVksSUFBWjtBQUNQLGtDQUFVLHVEQUFWO0FBQ2xCLG1DQUFXLGlFQUFYO0FBQ2tCLGlDQUFTO21DQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsWUFBekI7eUJBQUg7cUJBSGIsQ0FiSjtpQkFESjthQURKLENBWkk7Ozs7K0JBc0NMOzs7Ozs7T0FLQyxlQUFhO0FBQ25CLFlBQU8sZ0JBQU0sU0FBTixDQUFnQixNQUFoQiIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0F2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgU2V0dGluZ0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZXR0aW5ncydcclxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZC1jaXJjbGUtb3V0bGluZVwiXHJcbmltcG9ydCBJY29uSXRlbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0XCJcclxuXHJcbmltcG9ydCBMaXN0IGZyb20gXCIuL2xpc3RcIlxyXG5pbXBvcnQgUGhvdG8gZnJvbSBcIi4vcGhvdG9cIlxyXG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vZGIvdXNlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHZhciB1c2VyPVVzZXIuY3VycmVudFxyXG5cdFx0XHQscm91dGVyPXRoaXMuY29udGV4dC5yb3V0ZXJcclxuXHRcdFx0LGF2YXRhclxyXG4gICAgICAgIGlmKHVzZXIucGhvdG8pXHJcbiAgICAgICAgICAgIGF2YXRhcj08QXZhdGFyIHNyYz17dXNlci5waG90b30vPlxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhdmF0YXI9PFBob3RvXHJcbiAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+e3VzZXIucGhvdG89dXJsO1VzZXIudXBzZXJ0KHVzZXIpfX1cclxuICAgICAgICAgICAgICAgIGljb25SYXRpbz17Mi8zfSB3aWR0aD17NDB9IGhlaWdodD17NDB9Lz5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8TGlzdD5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXt1c2VyLm5hbWV8fHVzZXIudXNlcm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9e2F2YXRhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fSBcclxuXHRcdFx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdteS9wcm9maWxlJyl9XHRcclxuXHRcdFx0XHRcdFx0Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuRGl2aWRlciBpbnNldD17dHJ1ZX0vPlxyXG5cclxuXHRcdFx0XHRcdHt0aGlzLm1vcmUoKX1cclxuXHRcdFx0XHRcdFxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuiuvue9rlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8U2V0dGluZ0ljb24vPn1cclxuXHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ215L3NldHRpbmcnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvTGlzdD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cdFxyXG5cdFxyXG5cdG1vcmUoKXtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRcclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==