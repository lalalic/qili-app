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

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
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
                    _react2.default.createElement(_list2.default.Item, { primaryText: "\u8BBE\u7F6E",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FjY291bnQuanMiXSwibmFtZXMiOlsidXNlciIsImN1cnJlbnQiLCJyb3V0ZXIiLCJjb250ZXh0IiwiYXZhdGFyIiwicGhvdG8iLCJ1cmwiLCJ1cHNlcnQiLCJuYW1lIiwidXNlcm5hbWUiLCJwdXNoIiwibW9yZSIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUNBR1k7QUFBQTs7QUFDSixnQkFBSUEsT0FBSyxlQUFLQyxPQUFkO0FBQUEsZ0JBQ0pDLFNBQU8sS0FBS0MsT0FBTCxDQUFhRCxNQURoQjtBQUFBLGdCQUVKRSxNQUZJO0FBR0EsZ0JBQUdKLEtBQUtLLEtBQVIsRUFDSUQsU0FBTyxvREFBUSxLQUFLSixLQUFLSyxLQUFsQixHQUFQLENBREosS0FFSztBQUNERCx5QkFBTztBQUNILDZCQUFTLGlCQUFDRSxHQUFELEVBQU87QUFBQ04sNkJBQUtLLEtBQUwsR0FBV0MsR0FBWCxDQUFlLGVBQUtDLE1BQUwsQ0FBWVAsSUFBWjtBQUFrQixxQkFEL0M7QUFFSCwrQkFBVyxJQUFFLENBRlYsRUFFYSxPQUFPLEVBRnBCLEVBRXdCLFFBQVEsRUFGaEMsR0FBUDtBQUdIOztBQUVELG1CQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQTtBQUNJLGlFQUFNLElBQU4sSUFBVyxhQUFhQSxLQUFLUSxJQUFMLElBQVdSLEtBQUtTLFFBQXhDO0FBQ0ksb0NBQVlMLE1BRGhCO0FBRUksbUNBQVcsaUVBRmY7QUFHZCxpQ0FBUztBQUFBLG1DQUFHLE9BQUtELE9BQUwsQ0FBYUQsTUFBYixDQUFvQlEsSUFBcEIsQ0FBeUIsWUFBekIsQ0FBSDtBQUFBO0FBSEssc0JBREo7QUFPSSxpRUFBTSxPQUFOLElBQWMsT0FBTyxJQUFyQixHQVBKO0FBU1YseUJBQUtDLElBQUwsRUFUVTtBQVdJLGlFQUFNLE9BQU4sSUFBYyxPQUFPLElBQXJCLEdBWEo7QUFhSSxpRUFBTSxJQUFOLElBQVcsYUFBWSxjQUF2QjtBQUNJLGtDQUFVLHVEQURkO0FBRWQsbUNBQVcsaUVBRkc7QUFHSSxpQ0FBUztBQUFBLG1DQUFHLE9BQUtSLE9BQUwsQ0FBYUQsTUFBYixDQUFvQlEsSUFBcEIsQ0FBeUIsWUFBekIsQ0FBSDtBQUFBO0FBSGI7QUFiSjtBQURKLGFBREo7QUF1Qkg7OzsrQkFHRSxDQUVMOzs7Ozs7T0FHTUUsWSxHQUFhO0FBQ25CVixZQUFPLGdCQUFNVyxTQUFOLENBQWdCQztBQURKLEMiLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtBdmF0YXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBSaWdodEFycm93IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodCdcclxuaW1wb3J0IFNldHRpbmdJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2V0dGluZ3MnXHJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQtY2lyY2xlLW91dGxpbmVcIlxyXG5pbXBvcnQgSWNvbkl0ZW0gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodFwiXHJcblxyXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9saXN0XCJcclxuaW1wb3J0IFBob3RvIGZyb20gXCIuL3Bob3RvXCJcclxuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL2RiL3VzZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIgdXNlcj1Vc2VyLmN1cnJlbnRcclxuXHRcdFx0LHJvdXRlcj10aGlzLmNvbnRleHQucm91dGVyXHJcblx0XHRcdCxhdmF0YXJcclxuICAgICAgICBpZih1c2VyLnBob3RvKVxyXG4gICAgICAgICAgICBhdmF0YXI9PEF2YXRhciBzcmM9e3VzZXIucGhvdG99Lz5cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXZhdGFyPTxQaG90b1xyXG4gICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9Pnt1c2VyLnBob3RvPXVybDtVc2VyLnVwc2VydCh1c2VyKX19XHJcbiAgICAgICAgICAgICAgICBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfS8+XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPExpc3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17dXNlci5uYW1lfHx1c2VyLnVzZXJuYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXthdmF0YXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn0gXHJcblx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnbXkvcHJvZmlsZScpfVx0XHJcblx0XHRcdFx0XHRcdC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcblx0XHRcdFx0XHR7dGhpcy5tb3JlKCl9XHJcblx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5EaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLorr7nva5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PFNldHRpbmdJY29uLz59XHJcblx0XHRcdFx0XHRcdHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdteS9zZXR0aW5nJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0xpc3Q+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHRcclxuXHRcclxuXHRtb3JlKCl7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG4iXX0=