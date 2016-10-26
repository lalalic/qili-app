'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

var _app = require('./db/app');

var _app2 = _interopRequireDefault(_app);

var _fileUpload = require('material-ui/svg-icons/file/file-upload');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _save = require('material-ui/svg-icons/content/save');

var _save2 = _interopRequireDefault(_save);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _.UI.CommandBar;
var fileSelector = _.UI.fileSelector;
var Messager = _.UI.Messager;

var Cloud = function (_Component) {
    _inherits(Cloud, _Component);

    function Cloud() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Cloud);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Cloud.__proto__ || Object.getPrototypeOf(Cloud)).call.apply(_ref, [this].concat(args))), _this), _this.state = { cloudCode: _this.context.app.cloudCode }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Cloud, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('textarea', { ref: 'cloudCode',
                    value: this.state.cloudCode,
                    onBlur: function onBlur(e) {
                        return _this2.setState({ cloudCode: e.target.value });
                    },
                    placeholder: 'Cloud code',
                    style: { position: 'absolute', height: '100%', top: 0, lineHeight: '2em',
                        margin: 0, width: '100%', padding: 10, paddingBottom: 51, border: 0 } }),
                _react2.default.createElement(CommandBar, { className: 'footbar',
                    onSelect: function onSelect(cmd) {
                        return _this2.onSelect(cmd);
                    },
                    items: [{ action: "Back" }, { action: "Upload", icon: _fileUpload2.default }, { action: "Save", icon: _save2.default }] })
            );
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            if (this.context.app != nextContext.app) this.setState({ cloudCode: nextContext.app.cloudCode });
        }
    }, {
        key: 'onSelect',
        value: function onSelect(cmd) {
            var _this3 = this;

            var app = this.context.app;
            switch (cmd) {
                case 'Upload':
                    fileSelector.selectTextFile().then(function (_ref2) {
                        var cloudCode = _ref2.data;

                        _this3.setState({ cloudCode: cloudCode });
                        _this3.onSelect('Save');
                    });
                    break;
                case 'Save':
                    var code = this.state.cloudCode;
                    if (code != app.cloudCode) {
                        try {
                            app.cloudCodecode = this.checkCode(value);
                            _app2.default.upsert(app);
                        } catch (e) {
                            Messager.show(e.message);
                        }
                    }
                    break;
            }
        }
    }, {
        key: 'checkCode',
        value: function checkCode(code) {
            new Function("Cloud", code);
        }
    }]);

    return Cloud;
}(_react.Component);

Cloud.contextTypes = { app: _react2.default.PropTypes.object };
exports.default = Cloud;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiZmlsZVNlbGVjdG9yIiwiTWVzc2FnZXIiLCJDbG91ZCIsInN0YXRlIiwiY2xvdWRDb2RlIiwiY29udGV4dCIsImFwcCIsInNldFN0YXRlIiwiZSIsInRhcmdldCIsInZhbHVlIiwicG9zaXRpb24iLCJoZWlnaHQiLCJ0b3AiLCJsaW5lSGVpZ2h0IiwibWFyZ2luIiwid2lkdGgiLCJwYWRkaW5nIiwicGFkZGluZ0JvdHRvbSIsImJvcmRlciIsIm9uU2VsZWN0IiwiY21kIiwiYWN0aW9uIiwiaWNvbiIsIm5leHRQcm9wcyIsIm5leHRDb250ZXh0Iiwic2VsZWN0VGV4dEZpbGUiLCJ0aGVuIiwiZGF0YSIsImNvZGUiLCJjbG91ZENvZGVjb2RlIiwiY2hlY2tDb2RlIiwidXBzZXJ0Iiwic2hvdyIsIm1lc3NhZ2UiLCJGdW5jdGlvbiIsImNvbnRleHRUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU9BLFUsUUFBQUEsVTtJQUFZQyxZLFFBQUFBLFk7SUFBY0MsUSxRQUFBQSxROztJQUVaQyxLOzs7Ozs7Ozs7Ozs7Ozt3TEFFcEJDLEssR0FBTSxFQUFDQyxXQUFVLE1BQUtDLE9BQUwsQ0FBYUMsR0FBYixDQUFpQkYsU0FBNUIsRTs7Ozs7aUNBRUs7QUFBQTs7QUFDSixtQkFDSTtBQUFBO0FBQUE7QUFDSSw0REFBVSxLQUFJLFdBQWQ7QUFDSSwyQkFBTyxLQUFLRCxLQUFMLENBQVdDLFNBRHRCO0FBRUksNEJBQVE7QUFBQSwrQkFBRyxPQUFLRyxRQUFMLENBQWMsRUFBQ0gsV0FBVUksRUFBRUMsTUFBRixDQUFTQyxLQUFwQixFQUFkLENBQUg7QUFBQSxxQkFGWjtBQUdJLGlDQUFZLFlBSGhCO0FBSUksMkJBQU8sRUFBQ0MsVUFBUyxVQUFWLEVBQXNCQyxRQUFRLE1BQTlCLEVBQXNDQyxLQUFJLENBQTFDLEVBQTRDQyxZQUFXLEtBQXZEO0FBQ0hDLGdDQUFPLENBREosRUFDTUMsT0FBTSxNQURaLEVBQ29CQyxTQUFRLEVBRDVCLEVBQ2dDQyxlQUFjLEVBRDlDLEVBQ2lEQyxRQUFPLENBRHhELEVBSlgsR0FESjtBQU9JLDhDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCO0FBQ0ksOEJBQVU7QUFBQSwrQkFBSyxPQUFLQyxRQUFMLENBQWNDLEdBQWQsQ0FBTDtBQUFBLHFCQURkO0FBRUksMkJBQU8sQ0FDckIsRUFBQ0MsUUFBTyxNQUFSLEVBRHFCLEVBRUgsRUFBQ0EsUUFBTyxRQUFSLEVBQWtCQywwQkFBbEIsRUFGRyxFQUdILEVBQUNELFFBQU8sTUFBUixFQUFlQyxvQkFBZixFQUhHLENBRlg7QUFQSixhQURKO0FBZ0JIOzs7a0RBRXlCQyxTLEVBQVdDLFcsRUFBWTtBQUM3QyxnQkFBRyxLQUFLcEIsT0FBTCxDQUFhQyxHQUFiLElBQWtCbUIsWUFBWW5CLEdBQWpDLEVBQ0ksS0FBS0MsUUFBTCxDQUFjLEVBQUNILFdBQVVxQixZQUFZbkIsR0FBWixDQUFnQkYsU0FBM0IsRUFBZDtBQUNQOzs7aUNBRVFpQixHLEVBQUk7QUFBQTs7QUFDZixnQkFBSWYsTUFBSSxLQUFLRCxPQUFMLENBQWFDLEdBQXJCO0FBQ00sb0JBQU9lLEdBQVA7QUFDQSxxQkFBSyxRQUFMO0FBQ0xyQixpQ0FBYTBCLGNBQWIsR0FBOEJDLElBQTlCLENBQW1DLGlCQUFvQjtBQUFBLDRCQUFidkIsU0FBYSxTQUFsQndCLElBQWtCOztBQUMxQywrQkFBS3JCLFFBQUwsQ0FBYyxFQUFDSCxvQkFBRCxFQUFkO0FBQ0EsK0JBQUtnQixRQUFMLENBQWMsTUFBZDtBQUNILHFCQUhWO0FBSUs7QUFDQSxxQkFBSyxNQUFMO0FBQ0wsd0JBQUlTLE9BQUssS0FBSzFCLEtBQUwsQ0FBV0MsU0FBcEI7QUFDQSx3QkFBR3lCLFFBQU12QixJQUFJRixTQUFiLEVBQXVCO0FBQ3RCLDRCQUFHO0FBQ0ZFLGdDQUFJd0IsYUFBSixHQUFrQixLQUFLQyxTQUFMLENBQWVyQixLQUFmLENBQWxCO0FBQ0EsMENBQUlzQixNQUFKLENBQVcxQixHQUFYO0FBQ0EseUJBSEQsQ0FHQyxPQUFNRSxDQUFOLEVBQVE7QUFDUlAscUNBQVNnQyxJQUFULENBQWN6QixFQUFFMEIsT0FBaEI7QUFDQTtBQUNEO0FBQ0k7QUFqQkE7QUFtQkg7OztrQ0FFU0wsSSxFQUFLO0FBQ2pCLGdCQUFJTSxRQUFKLENBQWEsT0FBYixFQUFxQk4sSUFBckI7QUFDRzs7Ozs7O0FBckRnQjNCLEssQ0F1RGJrQyxZLEdBQWEsRUFBQzlCLEtBQUssZ0JBQU0rQixTQUFOLENBQWdCQyxNQUF0QixFO2tCQXZEQXBDLEsiLCJmaWxlIjoiY2xvdWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJfSBmcm9tICcuJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2RiL2FwcCdcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgZmlsZVNlbGVjdG9yLCBNZXNzYWdlcn09VUlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvdWQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFxuXHRzdGF0ZT17Y2xvdWRDb2RlOnRoaXMuY29udGV4dC5hcHAuY2xvdWRDb2RlfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIHJlZj1cImNsb3VkQ29kZVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmNsb3VkQ29kZX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT50aGlzLnNldFN0YXRlKHtjbG91ZENvZGU6ZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDbG91ZCBjb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3twb3NpdGlvbjonYWJzb2x1dGUnLCBoZWlnaHQ6ICcxMDAlJywgdG9wOjAsbGluZUhlaWdodDonMmVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjowLHdpZHRoOicxMDAlJywgcGFkZGluZzoxMCwgcGFkZGluZ0JvdHRvbTo1MSxib3JkZXI6MH19Lz5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVXBsb2FkXCIsIGljb246VXBsb2FkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJTYXZlXCIsaWNvbjpTYXZlfV19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KXtcbiAgICAgICAgaWYodGhpcy5jb250ZXh0LmFwcCE9bmV4dENvbnRleHQuYXBwKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2xvdWRDb2RlOm5leHRDb250ZXh0LmFwcC5jbG91ZENvZGV9KVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNtZCl7XG5cdFx0dmFyIGFwcD10aGlzLmNvbnRleHQuYXBwXG4gICAgICAgIHN3aXRjaChjbWQpe1xuICAgICAgICBjYXNlICdVcGxvYWQnOlxuXHRcdFx0ZmlsZVNlbGVjdG9yLnNlbGVjdFRleHRGaWxlKCkudGhlbigoe2RhdGE6Y2xvdWRDb2RlfSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjbG91ZENvZGV9KVxuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoJ1NhdmUnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnU2F2ZSc6XG5cdFx0XHRsZXQgY29kZT10aGlzLnN0YXRlLmNsb3VkQ29kZVxuXHRcdFx0aWYoY29kZSE9YXBwLmNsb3VkQ29kZSl7XG5cdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRhcHAuY2xvdWRDb2RlY29kZT10aGlzLmNoZWNrQ29kZSh2YWx1ZSlcblx0XHRcdFx0XHRBcHAudXBzZXJ0KGFwcClcblx0XHRcdFx0fWNhdGNoKGUpe1xuXHRcdFx0XHRcdE1lc3NhZ2VyLnNob3coZS5tZXNzYWdlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG4gICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0NvZGUoY29kZSl7XG5cdFx0bmV3IEZ1bmN0aW9uKFwiQ2xvdWRcIixjb2RlKVxuICAgIH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e2FwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cbiJdfQ==