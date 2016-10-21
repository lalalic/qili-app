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
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Cloud);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cloud)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { cloudCode: _this.context.app.cloudCode }, _temp), _possibleConstructorReturn(_this, _ret);
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
                    fileSelector.selectTextFile().then(function (_ref) {
                        var cloudCode = _ref.data;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTztJQUFZO0lBQWM7O0lBRVo7Ozs7Ozs7Ozs7Ozs7O3VNQUVwQixRQUFNLEVBQUMsV0FBVSxNQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLFNBQWpCOzs7aUJBRkc7O2lDQUlUOzs7QUFDSixtQkFDSTs7O2dCQUNJLDRDQUFVLEtBQUksV0FBSjtBQUNOLDJCQUFPLEtBQUssS0FBTCxDQUFXLFNBQVg7QUFDUCw0QkFBUTsrQkFBRyxPQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVUsRUFBRSxNQUFGLENBQVMsS0FBVCxFQUF6QjtxQkFBSDtBQUNSLGlDQUFZLFlBQVo7QUFDQSwyQkFBTyxFQUFDLFVBQVMsVUFBVCxFQUFxQixRQUFRLE1BQVIsRUFBZ0IsS0FBSSxDQUFKLEVBQU0sWUFBVyxLQUFYO0FBQy9DLGdDQUFPLENBQVAsRUFBUyxPQUFNLE1BQU4sRUFBYyxTQUFRLEVBQVIsRUFBWSxlQUFjLEVBQWQsRUFBaUIsUUFBTyxDQUFQLEVBRHhELEVBSkosQ0FESjtnQkFPSSw4QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ1IsOEJBQVU7K0JBQUssT0FBSyxRQUFMLENBQWMsR0FBZDtxQkFBTDtBQUNWLDJCQUFPLENBQ3JCLEVBQUMsUUFBTyxNQUFQLEVBRG9CLEVBRUgsRUFBQyxRQUFPLFFBQVAsRUFBaUIsMEJBQWxCLEVBRkcsRUFHSCxFQUFDLFFBQU8sTUFBUCxFQUFjLG9CQUFmLEVBSEcsQ0FBUCxFQUZKLENBUEo7YUFESixDQURJOzs7O2tEQW1Ca0IsV0FBVyxhQUFZO0FBQzdDLGdCQUFHLEtBQUssT0FBTCxDQUFhLEdBQWIsSUFBa0IsWUFBWSxHQUFaLEVBQ2pCLEtBQUssUUFBTCxDQUFjLEVBQUMsV0FBVSxZQUFZLEdBQVosQ0FBZ0IsU0FBaEIsRUFBekIsRUFESjs7OztpQ0FJSyxLQUFJOzs7QUFDZixnQkFBSSxNQUFJLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FETztBQUVULG9CQUFPLEdBQVA7QUFDQSxxQkFBSyxRQUFMO0FBQ0wsaUNBQWEsY0FBYixHQUE4QixJQUE5QixDQUFtQyxnQkFBb0I7NEJBQWIsaUJBQUwsS0FBa0I7O0FBQzFDLCtCQUFLLFFBQUwsQ0FBYyxFQUFDLG9CQUFELEVBQWQsRUFEMEM7QUFFMUMsK0JBQUssUUFBTCxDQUFjLE1BQWQsRUFGMEM7cUJBQXBCLENBQW5DLENBREs7QUFLQSwwQkFMQTtBQURBLHFCQU9LLE1BQUw7QUFDTCx3QkFBSSxPQUFLLEtBQUssS0FBTCxDQUFXLFNBQVgsQ0FESjtBQUVMLHdCQUFHLFFBQU0sSUFBSSxTQUFKLEVBQWM7QUFDdEIsNEJBQUc7QUFDRixnQ0FBSSxhQUFKLEdBQWtCLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBbEIsQ0FERTtBQUVGLDBDQUFJLE1BQUosQ0FBVyxHQUFYLEVBRkU7eUJBQUgsQ0FHQyxPQUFNLENBQU4sRUFBUTtBQUNSLHFDQUFTLElBQVQsQ0FBYyxFQUFFLE9BQUYsQ0FBZCxDQURRO3lCQUFSO3FCQUpGO0FBUUssMEJBVkE7QUFQQSxhQUZTOzs7O2tDQXVCSCxNQUFLO0FBQ2pCLGdCQUFJLFFBQUosQ0FBYSxPQUFiLEVBQXFCLElBQXJCLEVBRGlCOzs7O1dBbkRFOzs7TUF1RGIsZUFBYSxFQUFDLEtBQUssZ0JBQU0sU0FBTixDQUFnQixNQUFoQjtrQkF2RE4iLCJmaWxlIjoiY2xvdWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJfSBmcm9tICcuJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2RiL2FwcCdcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgZmlsZVNlbGVjdG9yLCBNZXNzYWdlcn09VUlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvdWQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFxuXHRzdGF0ZT17Y2xvdWRDb2RlOnRoaXMuY29udGV4dC5hcHAuY2xvdWRDb2RlfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIHJlZj1cImNsb3VkQ29kZVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmNsb3VkQ29kZX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXtlPT50aGlzLnNldFN0YXRlKHtjbG91ZENvZGU6ZS50YXJnZXQudmFsdWV9KX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDbG91ZCBjb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3twb3NpdGlvbjonYWJzb2x1dGUnLCBoZWlnaHQ6ICcxMDAlJywgdG9wOjAsbGluZUhlaWdodDonMmVtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjowLHdpZHRoOicxMDAlJywgcGFkZGluZzoxMCwgcGFkZGluZ0JvdHRvbTo1MSxib3JkZXI6MH19Lz5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e2NtZD0+dGhpcy5vblNlbGVjdChjbWQpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2FjdGlvbjpcIkJhY2tcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVXBsb2FkXCIsIGljb246VXBsb2FkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJTYXZlXCIsaWNvbjpTYXZlfV19Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMsIG5leHRDb250ZXh0KXtcbiAgICAgICAgaWYodGhpcy5jb250ZXh0LmFwcCE9bmV4dENvbnRleHQuYXBwKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2xvdWRDb2RlOm5leHRDb250ZXh0LmFwcC5jbG91ZENvZGV9KVxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNtZCl7XG5cdFx0dmFyIGFwcD10aGlzLmNvbnRleHQuYXBwXG4gICAgICAgIHN3aXRjaChjbWQpe1xuICAgICAgICBjYXNlICdVcGxvYWQnOlxuXHRcdFx0ZmlsZVNlbGVjdG9yLnNlbGVjdFRleHRGaWxlKCkudGhlbigoe2RhdGE6Y2xvdWRDb2RlfSk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjbG91ZENvZGV9KVxuICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QoJ1NhdmUnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnU2F2ZSc6XG5cdFx0XHRsZXQgY29kZT10aGlzLnN0YXRlLmNsb3VkQ29kZVxuXHRcdFx0aWYoY29kZSE9YXBwLmNsb3VkQ29kZSl7XG5cdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRhcHAuY2xvdWRDb2RlY29kZT10aGlzLmNoZWNrQ29kZSh2YWx1ZSlcblx0XHRcdFx0XHRBcHAudXBzZXJ0KGFwcClcblx0XHRcdFx0fWNhdGNoKGUpe1xuXHRcdFx0XHRcdE1lc3NhZ2VyLnNob3coZS5tZXNzYWdlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG4gICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0NvZGUoY29kZSl7XG5cdFx0bmV3IEZ1bmN0aW9uKFwiQ2xvdWRcIixjb2RlKVxuICAgIH1cblx0XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e2FwcDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cbiJdfQ==