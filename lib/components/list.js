"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _async = require("./async");

var _async2 = _interopRequireDefault(_async);

var _materialUi = require("material-ui");

var _reactable = require("reactable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_AsyncComponent) {
    _inherits(Main, _AsyncComponent);

    function Main() {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Main).apply(this, arguments));
    }

    _createClass(Main, [{
        key: "renderContent",
        value: function renderContent(loadingOrError) {
            var _props = this.props;
            var _props$children = _props.children;
            var children = _props$children === undefined ? [] : _props$children;
            var template = _props.template;
            var onItemClick = _props.onItemClick;
            var others = _objectWithoutProperties(_props, ["children", "template", "onItemClick"]);
            var data = this.state.data;var i = 0;

            if (!Array.isArray(children)) children = [children];

            Array.isArray(data) && data.forEach(function (model) {
                var props = {
                    model: model,
                    key: model._id || i++,
                    onClick: function onClick() {
                        onItemClick && onItemClick(model);
                    }
                },
                    el = _react2.default.createElement(template, props);
                children.push(el);
            });

            return _react2.default.createElement(
                "div",
                null,
                loadingOrError,
                _react2.default.createElement(
                    _materialUi.List,
                    others,
                    children
                )
            );
        }
    }]);

    return Main;
}(_async2.default);

exports.default = Main;

var Item = function (_Component) {
    _inherits(Item, _Component);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Item).apply(this, arguments));
    }

    _createClass(Item, [{
        key: "render",
        value: function render() {
            var _props2 = this.props;
            var model = _props2.model;

            var others = _objectWithoutProperties(_props2, ["model"]);

            return _react2.default.createElement(
                _materialUi.ListItem,
                _extends({ key: model._id }, others),
                model.name || model.title || model._id
            );
        }
    }]);

    return Item;
}(_react.Component);

var AsyncTable = function (_AsyncComponent2) {
    _inherits(AsyncTable, _AsyncComponent2);

    function AsyncTable() {
        _classCallCheck(this, AsyncTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AsyncTable).apply(this, arguments));
    }

    _createClass(AsyncTable, [{
        key: "renderContent",
        value: function renderContent(loadingOrError) {
            var data = this.state.data;
            var _props3 = this.props;
            var _props3$rowData = _props3.rowData;
            var rowData = _props3$rowData === undefined ? data : _props3$rowData;
            var model = _props3.model;

            var others = _objectWithoutProperties(_props3, ["rowData", "model"]);

            return _react2.default.createElement(
                "div",
                null,
                loadingOrError,
                _react2.default.createElement(_reactable.Table, _extends({ data: rowData }, others))
            ); //Table must be in a container
        }
    }]);

    return AsyncTable;
}(_async2.default);

Main.Table = AsyncTable;
Main.Divider = _materialUi.Divider;
Main.Item = _materialUi.ListItem;

Main.defaultProps = {
    template: Item,
    empty: null,
    loading: null
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztzQ0FDSCxnQkFBZTt5QkFDMkIsS0FBSyxLQUFMLENBRDNCO3lDQUNwQixTQURvQjtnQkFDcEIsMkNBQVMscUJBRFc7Z0JBQ1AsMkJBRE87Z0JBQ0csaUNBREg7QUFDckIsZ0JBQXdDLGtGQUF4QyxDQURxQjtBQUVyQixnQkFBQyxPQUFNLEtBQUssS0FBTCxDQUFOLElBQUQsQ0FGcUIsSUFFSCxJQUFFLENBQUYsQ0FGRzs7QUFJekIsZ0JBQUcsQ0FBQyxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQUQsRUFDQyxXQUFTLENBQUMsUUFBRCxDQUFULENBREo7O0FBR0Esa0JBQU0sT0FBTixDQUFjLElBQWQsS0FBdUIsS0FBSyxPQUFMLENBQWEsVUFBQyxLQUFELEVBQVM7QUFDekMsb0JBQUksUUFBTTtBQUNGLGdDQURFO0FBRUYseUJBQUssTUFBTSxHQUFOLElBQVcsR0FBWDtBQUNMLDZCQUFRLG1CQUFJO0FBQ1IsdUNBQWUsWUFBWSxLQUFaLENBQWYsQ0FEUTtxQkFBSjtpQkFIWjtvQkFPQSxLQUFHLGdCQUFNLGFBQU4sQ0FBb0IsUUFBcEIsRUFBNkIsS0FBN0IsQ0FBSCxDQVJxQztBQVN6Qyx5QkFBUyxJQUFULENBQWMsRUFBZCxFQVR5QzthQUFULENBQXBDLENBUHlCOztBQW1CekIsbUJBQ0k7OztnQkFDSyxjQURMO2dCQUVJOztvQkFBVSxNQUFWO29CQUNLLFFBREw7aUJBRko7YUFESixDQW5CeUI7Ozs7V0FEWjs7Ozs7SUFnQ2Y7Ozs7Ozs7Ozs7O2lDQUNNOzBCQUNtQixLQUFLLEtBQUwsQ0FEbkI7Z0JBQ0Msc0JBREQ7O2dCQUNXLHNEQURYOztBQUVKLG1CQUFROzsyQkFBVSxLQUFLLE1BQU0sR0FBTixJQUFlLE9BQTlCO2dCQUF1QyxNQUFNLElBQU4sSUFBWSxNQUFNLEtBQU4sSUFBYSxNQUFNLEdBQU47YUFBeEUsQ0FGSTs7OztXQUROOzs7SUFPQTs7Ozs7Ozs7Ozs7c0NBQ1ksZ0JBQWU7QUFDckIsZ0JBQUMsT0FBTSxLQUFLLEtBQUwsQ0FBTixJQUFELENBRHFCOzBCQUVHLEtBQUssS0FBTCxDQUZIOzBDQUU3QixRQUY2QjtnQkFFN0IsMENBQVEsdUJBRnFCO2dCQUVmLHNCQUZlOztnQkFFTCxpRUFGSzs7QUFJL0IsbUJBQ1U7OztnQkFDSyxjQURMO2dCQUVJLDJEQUFPLE1BQU0sT0FBTixJQUFtQixPQUExQixDQUZKO2FBRFY7QUFKK0I7OztXQUQzQjs7O0FBY04sS0FBSyxLQUFMLEdBQVcsVUFBWDtBQUNBLEtBQUssT0FBTDtBQUNBLEtBQUssSUFBTDs7QUFFQSxLQUFLLFlBQUwsR0FBa0I7QUFDZCxjQUFTLElBQVQ7QUFDQSxXQUFPLElBQVA7QUFDQSxhQUFTLElBQVQ7Q0FISiIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFzeW5jQ29tcG9uZW50IGZyb20gXCIuL2FzeW5jXCJcbmltcG9ydCB7TGlzdCxEaXZpZGVyLExpc3RJdGVtfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7VGFibGV9IGZyb20gJ3JlYWN0YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBleHRlbmRzIEFzeW5jQ29tcG9uZW50e1xuICAgIHJlbmRlckNvbnRlbnQobG9hZGluZ09yRXJyb3Ipe1xuICAgICAgICB2YXIge2NoaWxkcmVuPVtdLCB0ZW1wbGF0ZSwgb25JdGVtQ2xpY2ssIC4uLm90aGVyc309dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtkYXRhfT10aGlzLnN0YXRlLGk9MDtcblxuICAgICAgICBpZighQXJyYXkuaXNBcnJheShjaGlsZHJlbikpXG4gICAgICAgICAgICBjaGlsZHJlbj1bY2hpbGRyZW5dO1xuXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5mb3JFYWNoKChtb2RlbCk9PntcbiAgICAgICAgICAgIGxldCBwcm9wcz17XG4gICAgICAgICAgICAgICAgICAgIG1vZGVsLFxuICAgICAgICAgICAgICAgICAgICBrZXk6KG1vZGVsLl9pZHx8aSsrKSxcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazooKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgb25JdGVtQ2xpY2sgJiYgb25JdGVtQ2xpY2sobW9kZWwpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVsPVJlYWN0LmNyZWF0ZUVsZW1lbnQodGVtcGxhdGUscHJvcHMpO1xuICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChlbClcblx0XHR9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7bG9hZGluZ09yRXJyb3J9XG4gICAgICAgICAgICAgICAgPExpc3Qgey4uLm90aGVyc30+XG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L0xpc3Q+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuXG4gICAgfVxufVxuXG5jbGFzcyBJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsLCAuLi5vdGhlcnN9PXRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoPExpc3RJdGVtIGtleT17bW9kZWwuX2lkfSB7Li4ub3RoZXJzfT57bW9kZWwubmFtZXx8bW9kZWwudGl0bGV8fG1vZGVsLl9pZH08L0xpc3RJdGVtPilcbiAgICB9XG59XG5cbmNsYXNzIEFzeW5jVGFibGUgZXh0ZW5kcyBBc3luY0NvbXBvbmVudHtcbiAgICByZW5kZXJDb250ZW50KGxvYWRpbmdPckVycm9yKXtcbiAgICAgICAgdmFyIHtkYXRhfT10aGlzLnN0YXRlLFxuXHRcdFx0e3Jvd0RhdGE9ZGF0YSwgbW9kZWwsIC4uLm90aGVyc309dGhpcy5wcm9wcztcblxuXHRcdHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtsb2FkaW5nT3JFcnJvcn1cbiAgICAgICAgICAgICAgICA8VGFibGUgZGF0YT17cm93RGF0YX0gey4uLm90aGVyc30vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICkvL1RhYmxlIG11c3QgYmUgaW4gYSBjb250YWluZXJcbiAgICB9XG59XG5cbk1haW4uVGFibGU9QXN5bmNUYWJsZVxuTWFpbi5EaXZpZGVyPURpdmlkZXJcbk1haW4uSXRlbT1MaXN0SXRlbVxuXG5NYWluLmRlZmF1bHRQcm9wcz17XG4gICAgdGVtcGxhdGU6SXRlbSxcbiAgICBlbXB0eTogbnVsbCxcbiAgICBsb2FkaW5nOiBudWxsXG59XG4iXX0=