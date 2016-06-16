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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Cloud)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { cloudCode: _this.props.app.cloudCode }, _temp), _possibleConstructorReturn(_this, _ret);
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
                    items: [{ action: "Upload", icon: _fileUpload2.default }, { action: "Save", icon: _save2.default }] })
            );
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (this.props.app != newProps.app) this.setState({ cloudCode: newProps.app.cloudCode });
        }
    }, {
        key: 'onSelect',
        value: function onSelect(cmd) {
            var _this3 = this;

            var app = this.props.app;
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

exports.default = Cloud;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG91ZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTztJQUFZO0lBQWM7O0lBRVo7Ozs7Ozs7Ozs7Ozs7O3VNQUVwQixRQUFNLEVBQUMsV0FBVSxNQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsU0FBZjs7O2lCQUZHOztpQ0FJVDs7O0FBQ0osbUJBQ0k7OztnQkFDSSw0Q0FBVSxLQUFJLFdBQUo7QUFDTiwyQkFBTyxLQUFLLEtBQUwsQ0FBVyxTQUFYO0FBQ1AsNEJBQVE7K0JBQUcsT0FBSyxRQUFMLENBQWMsRUFBQyxXQUFVLEVBQUUsTUFBRixDQUFTLEtBQVQsRUFBekI7cUJBQUg7QUFDUixpQ0FBWSxZQUFaO0FBQ0EsMkJBQU8sRUFBQyxVQUFTLFVBQVQsRUFBcUIsUUFBUSxNQUFSLEVBQWdCLEtBQUksQ0FBSixFQUFNLFlBQVcsS0FBWDtBQUMvQyxnQ0FBTyxDQUFQLEVBQVMsT0FBTSxNQUFOLEVBQWMsU0FBUSxFQUFSLEVBQVksZUFBYyxFQUFkLEVBQWlCLFFBQU8sQ0FBUCxFQUR4RCxFQUpKLENBREo7Z0JBT0ksOEJBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVjtBQUNSLDhCQUFVOytCQUFLLE9BQUssUUFBTCxDQUFjLEdBQWQ7cUJBQUw7QUFDViwyQkFBTyxDQUNILEVBQUMsUUFBTyxRQUFQLEVBQWlCLDBCQUFsQixFQURHLEVBRUgsRUFBQyxRQUFPLE1BQVAsRUFBYyxvQkFBZixFQUZHLENBQVAsRUFGSixDQVBKO2FBREosQ0FESTs7OztrREFrQmtCLFVBQVM7QUFDL0IsZ0JBQUcsS0FBSyxLQUFMLENBQVcsR0FBWCxJQUFnQixTQUFTLEdBQVQsRUFDZixLQUFLLFFBQUwsQ0FBYyxFQUFDLFdBQVUsU0FBUyxHQUFULENBQWEsU0FBYixFQUF6QixFQURKOzs7O2lDQUlLLEtBQUk7OztBQUNmLGdCQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxDQURPO0FBRVQsb0JBQU8sR0FBUDtBQUNBLHFCQUFLLFFBQUw7QUFDTCxpQ0FBYSxjQUFiLEdBQThCLElBQTlCLENBQW1DLGdCQUFvQjs0QkFBYixpQkFBTCxLQUFrQjs7QUFDMUMsK0JBQUssUUFBTCxDQUFjLEVBQUMsb0JBQUQsRUFBZCxFQUQwQztBQUUxQywrQkFBSyxRQUFMLENBQWMsTUFBZCxFQUYwQztxQkFBcEIsQ0FBbkMsQ0FESztBQUtBLDBCQUxBO0FBREEscUJBT0ssTUFBTDtBQUNMLHdCQUFJLE9BQUssS0FBSyxLQUFMLENBQVcsU0FBWCxDQURKO0FBRUwsd0JBQUcsUUFBTSxJQUFJLFNBQUosRUFBYztBQUN0Qiw0QkFBRztBQUNGLGdDQUFJLGFBQUosR0FBa0IsS0FBSyxTQUFMLENBQWUsS0FBZixDQUFsQixDQURFO0FBRUYsMENBQUksTUFBSixDQUFXLEdBQVgsRUFGRTt5QkFBSCxDQUdDLE9BQU0sQ0FBTixFQUFRO0FBQ1IscUNBQVMsSUFBVCxDQUFjLEVBQUUsT0FBRixDQUFkLENBRFE7eUJBQVI7cUJBSkY7QUFRSywwQkFWQTtBQVBBLGFBRlM7Ozs7a0NBdUJILE1BQUs7QUFDakIsZ0JBQUksUUFBSixDQUFhLE9BQWIsRUFBcUIsSUFBckIsRUFEaUI7Ozs7V0FsREUiLCJmaWxlIjoiY2xvdWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1VJfSBmcm9tICcuJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2RiL2FwcCdcblxuaW1wb3J0IFVwbG9hZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvZmlsZS11cGxvYWRcIlxuaW1wb3J0IFNhdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L3NhdmVcIlxuXG5jb25zdCB7Q29tbWFuZEJhciwgZmlsZVNlbGVjdG9yLCBNZXNzYWdlcn09VUlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvdWQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFxuXHRzdGF0ZT17Y2xvdWRDb2RlOnRoaXMucHJvcHMuYXBwLmNsb3VkQ29kZX1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByZWY9XCJjbG91ZENvZGVcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5jbG91ZENvZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17ZT0+dGhpcy5zZXRTdGF0ZSh7Y2xvdWRDb2RlOmUudGFyZ2V0LnZhbHVlfSl9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQ2xvdWQgY29kZVwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cG9zaXRpb246J2Fic29sdXRlJywgaGVpZ2h0OiAnMTAwJScsIHRvcDowLGxpbmVIZWlnaHQ6JzJlbScsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46MCx3aWR0aDonMTAwJScsIHBhZGRpbmc6MTAsIHBhZGRpbmdCb3R0b206NTEsYm9yZGVyOjB9fS8+XG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXtjbWQ9PnRoaXMub25TZWxlY3QoY21kKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJVcGxvYWRcIiwgaWNvbjpVcGxvYWR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlNhdmVcIixpY29uOlNhdmV9XX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5hcHAhPW5ld1Byb3BzLmFwcClcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Nsb3VkQ29kZTpuZXdQcm9wcy5hcHAuY2xvdWRDb2RlfSlcbiAgICB9XG5cbiAgICBvblNlbGVjdChjbWQpe1xuXHRcdHZhciBhcHA9dGhpcy5wcm9wcy5hcHBcbiAgICAgICAgc3dpdGNoKGNtZCl7XG4gICAgICAgIGNhc2UgJ1VwbG9hZCc6XG5cdFx0XHRmaWxlU2VsZWN0b3Iuc2VsZWN0VGV4dEZpbGUoKS50aGVuKCh7ZGF0YTpjbG91ZENvZGV9KT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Nsb3VkQ29kZX0pXG4gICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdCgnU2F2ZScpXG4gICAgICAgICAgICB9KVxuICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdTYXZlJzpcblx0XHRcdGxldCBjb2RlPXRoaXMuc3RhdGUuY2xvdWRDb2RlXG5cdFx0XHRpZihjb2RlIT1hcHAuY2xvdWRDb2RlKXtcblx0XHRcdFx0dHJ5e1xuXHRcdFx0XHRcdGFwcC5jbG91ZENvZGVjb2RlPXRoaXMuY2hlY2tDb2RlKHZhbHVlKVxuXHRcdFx0XHRcdEFwcC51cHNlcnQoYXBwKVxuXHRcdFx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRcdFx0TWVzc2FnZXIuc2hvdyhlLm1lc3NhZ2UpXG5cdFx0XHRcdH1cblx0XHRcdH1cbiAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrQ29kZShjb2RlKXtcblx0XHRuZXcgRnVuY3Rpb24oXCJDbG91ZFwiLGNvZGUpXG4gICAgfVxufVxuIl19